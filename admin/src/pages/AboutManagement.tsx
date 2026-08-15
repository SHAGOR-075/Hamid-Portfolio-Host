import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { ImageUploader } from '../components/common/ImageUploader';
import { DragDropList } from '../components/common/DragDropList';
import { Toggle } from '../components/common/Toggle';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { aboutService } from '../services/aboutService';
import { AboutData, AboutStat } from '../types';
import {
  Save,
  Plus,
  Trash2,
  Edit2,
  BarChart3,
  User,
  Image as ImageIcon,
  Sparkles,
  Link,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AboutManagement: React.FC = () => {
  const [formData, setFormData] = useState<AboutData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Stat Modal state
  const [statModalOpen, setStatModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<AboutStat | null>(null);
  const [statForm, setStatForm] = useState<Partial<AboutStat>>({
    value: '',
    label: '',
    iconName: 'Sparkles',
    active: true,
  });

  // Delete Stat Confirmation state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [statToDelete, setStatToDelete] = useState<AboutStat | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await aboutService.getAboutData();
        setFormData(data);
      } catch {
        toast.error('Failed to load about data');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData) return;

    setIsSaving(true);
    try {
      await aboutService.updateAboutData(formData);
      toast.success('About section saved successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  // Paragraph handlers
  const handleParagraphChange = (index: number, value: string) => {
    if (!formData) return;
    const updated = [...formData.paragraphs];
    updated[index] = value;
    setFormData({ ...formData, paragraphs: updated });
  };

  const addParagraph = () => {
    if (!formData) return;
    setFormData({
      ...formData,
      paragraphs: [...formData.paragraphs, ''],
    });
  };

  const removeParagraph = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      paragraphs: formData.paragraphs.filter((_, idx) => idx !== index),
    });
  };

  // Stat Modal handlers
  const openAddStat = () => {
    setEditingStat(null);
    setStatForm({
      value: '',
      label: '',
      iconName: 'Sparkles',
      active: true,
      order: (formData?.stats.length || 0) + 1,
    });
    setStatModalOpen(true);
  };

  const openEditStat = (stat: AboutStat) => {
    setEditingStat(stat);
    setStatForm(stat);
    setStatModalOpen(true);
  };

  const saveStatModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    if (!statForm.value || !statForm.label) {
      toast.error('Value and label are required');
      return;
    }

    let updatedStats: AboutStat[];
    if (editingStat) {
      updatedStats = formData.stats.map((s) =>
        s.id === editingStat.id ? ({ ...s, ...statForm } as AboutStat) : s
      );
      toast.success('Statistic updated');
    } else {
      const newStat: AboutStat = {
        id: `stat_${Date.now()}`,
        value: statForm.value || '',
        label: statForm.label || '',
        iconName: statForm.iconName || 'Sparkles',
        order: formData.stats.length + 1,
        active: statForm.active ?? true,
      };
      updatedStats = [...formData.stats, newStat];
      toast.success('Statistic added');
    }

    setFormData({ ...formData, stats: updatedStats });
    setStatModalOpen(false);
  };

  const confirmDeleteStat = () => {
    if (!formData || !statToDelete) return;
    const updatedStats = formData.stats.filter((s) => s.id !== statToDelete.id);
    setFormData({ ...formData, stats: updatedStats });
    setDeleteConfirmOpen(false);
    setStatToDelete(null);
    toast.success('Statistic removed');
  };

  const handleReorderStats = (reordered: AboutStat[]) => {
    if (!formData) return;
    const withUpdatedOrder = reordered.map((s, idx) => ({ ...s, order: idx + 1 }));
    setFormData({ ...formData, stats: withUpdatedOrder });
  };

  if (isLoading || !formData) {
    return <div className="p-8 text-center text-zinc-500">Loading About CMS...</div>;
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="About Section Management"
        subtitle="Manage personal narrative, background paragraphs, profile imagery, and portfolio impact metrics."
        badge="About CMS"
        actions={
          <Button
            onClick={() => handleSave()}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Changes
          </Button>
        }
      />

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section Header Info */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <User className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Section Headlines & Narrative
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Section Badge Text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. ABOUT ME"
              required
            />
            <Input
              label="Section Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Engineer, Learner & Explorer"
              required
            />
          </div>

          <Textarea
            label="Short Highlight / Tagline"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Focused on combining analytical problem solving..."
            rows={2}
          />
        </div>

        {/* Narrative Paragraphs Editor */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Detailed About Paragraphs
              </h2>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addParagraph}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add Paragraph
            </Button>
          </div>

          <div className="space-y-4">
            {formData.paragraphs.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-50/70 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800/70 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Paragraph #{idx + 1}
                  </span>
                  {formData.paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(idx)}
                      className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                      title="Delete paragraph"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Textarea
                  value={p}
                  onChange={(e) => handleParagraphChange(idx, e.target.value)}
                  placeholder="Write your story, expertise, or background paragraph here..."
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Media & Button Link */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <ImageIcon className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Profile Visual & Link Action
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImageUploader
              label="About Section Visual Image"
              value={formData.profileImage}
              onChange={(url) => setFormData({ ...formData, profileImage: url })}
              aspectRatio="square"
              helperText="Square or portrait photo with clean background."
            />

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800/60 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-700 dark:text-zinc-300">
                  <Link className="w-4 h-4 text-emerald-500" />
                  <span>Call-to-Action Link</span>
                </div>
                <Input
                  label="Button Text"
                  value={formData.buttonText}
                  onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                  placeholder="e.g. Get In Touch"
                />
                <Input
                  label="Button Link / Anchor"
                  value={formData.buttonLink}
                  onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                  placeholder="e.g. #contact or /contact"
                />
              </div>
            </div>
          </div>
        </div>

        {/* About Statistics CRUD */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  About Impact Statistics
                </h2>
                <p className="text-xs text-zinc-500">
                  Highlight key quantifiable achievements (e.g. 08+ ML Projects, 14+ Places)
                </p>
              </div>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={openAddStat}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Stat
            </Button>
          </div>

          {/* Reorderable Stat Cards */}
          <DragDropList
            items={formData.stats}
            onReorder={handleReorderStats}
            keyExtractor={(item) => item.id}
            renderItem={(stat) => (
              <div className="flex items-center justify-between w-full pr-2">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-500 font-mono font-bold text-lg min-w-[56px] text-center border border-emerald-500/20">
                    {stat.value}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {stat.label}
                    </h4>
                    <span className="text-xs text-zinc-500">
                      Icon: {stat.iconName} • {stat.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditStat(stat)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Edit stat"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatToDelete(stat);
                      setDeleteConfirmOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete stat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          />
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <Button type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            Save All About Changes
          </Button>
        </div>
      </form>

      {/* Add / Edit Stat Modal */}
      <Modal
        isOpen={statModalOpen}
        onClose={() => setStatModalOpen(false)}
        title={editingStat ? 'Edit Metric Statistic' : 'Add Impact Metric'}
        description="Provide high-impact values (e.g. 08+, 14+, ∞) and concise descriptor."
      >
        <form onSubmit={saveStatModal} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Metric Value"
              value={statForm.value || ''}
              onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
              placeholder="e.g. 08+, 10+, ∞"
              required
            />
            <Input
              label="Metric Label"
              value={statForm.label || ''}
              onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
              placeholder="e.g. ML Projects"
              required
            />
          </div>

          <Input
            label="Icon Descriptor"
            value={statForm.iconName || 'Sparkles'}
            onChange={(e) => setStatForm({ ...statForm, iconName: e.target.value })}
            placeholder="e.g. BrainCircuit, Layers, Compass, Sparkles"
            helperText="Suggested: BrainCircuit, Layers, Compass, Sparkles, Award, Code"
          />

          <Toggle
            label="Display on Portfolio"
            checked={statForm.active ?? true}
            onChange={(checked) => setStatForm({ ...statForm, active: checked })}
            description="When enabled, this statistic appears in the public about section."
          />

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStatModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editingStat ? 'Update Statistic' : 'Add Statistic'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Stat Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteStat}
        title="Delete Statistic?"
        message={`Are you sure you want to delete "${statToDelete?.label}" (${statToDelete?.value})?`}
      />
    </div>
  );
};
