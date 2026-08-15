import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Toggle } from '../components/common/Toggle';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { StatusBadge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { DragDropList } from '../components/common/DragDropList';
import { socialService } from '../services/socialService';
import { SocialLink } from '../types';
import {
  Plus,
  Share2,
  ExternalLink,
  Edit2,
  Trash2,
  ArrowUpDown,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Terminal,
} from 'lucide-react';
import toast from 'react-hot-toast';

const PRESETS = [
  { platform: 'GitHub', icon: 'Github', defaultUrl: 'https://github.com/' },
  { platform: 'LinkedIn', icon: 'Linkedin', defaultUrl: 'https://linkedin.com/in/' },
  { platform: 'Kaggle', icon: 'Terminal', defaultUrl: 'https://kaggle.com/' },
  { platform: 'Twitter / X', icon: 'Twitter', defaultUrl: 'https://x.com/' },
  { platform: 'Instagram', icon: 'Instagram', defaultUrl: 'https://instagram.com/' },
  { platform: 'HuggingFace', icon: 'Terminal', defaultUrl: 'https://huggingface.co/' },
  { platform: 'YouTube', icon: 'Youtube', defaultUrl: 'https://youtube.com/@' },
  { platform: 'LeetCode', icon: 'Code', defaultUrl: 'https://leetcode.com/' },
  { platform: 'Substack / Blog', icon: 'Globe', defaultUrl: 'https://' },
];

export const SocialsManagement: React.FC = () => {
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReorderMode, setIsReorderMode] = useState(false);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);
  const [socialForm, setSocialForm] = useState<Partial<SocialLink>>({
    platform: 'GitHub',
    url: '',
    username: '',
    icon: 'Github',
    active: true,
  });

  // Delete
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [socialToDelete, setSocialToDelete] = useState<SocialLink | null>(null);

  const fetchSocials = async () => {
    try {
      const data = await socialService.getSocials();
      setSocials(data);
    } catch {
      toast.error('Failed to load social links');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const openAddModal = (preset?: typeof PRESETS[0]) => {
    setEditingSocial(null);
    setSocialForm({
      platform: preset ? preset.platform : 'GitHub',
      url: preset ? preset.defaultUrl : '',
      username: '',
      icon: preset ? preset.icon : 'Github',
      active: true,
      order: socials.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (link: SocialLink) => {
    setEditingSocial(link);
    setSocialForm(link);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialForm.platform?.trim() || !socialForm.url?.trim()) {
      toast.error('Platform name and URL are required');
      return;
    }

    try {
      if (editingSocial) {
        const updated = await socialService.updateSocial(editingSocial.id, socialForm);
        setSocials(socials.map((s) => (s.id === updated.id ? updated : s)));
        toast.success(`Updated ${updated.platform}`);
      } else {
        const created = await socialService.createSocial({
          platform: socialForm.platform!,
          url: socialForm.url!,
          username: socialForm.username || '',
          icon: socialForm.icon || 'Globe',
          order: socials.length + 1,
          active: socialForm.active ?? true,
        });
        setSocials([...socials, created]);
        toast.success(`Added ${created.platform} link`);
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    }
  };

  const handleToggleActive = async (link: SocialLink) => {
    try {
      const updated = await socialService.updateSocial(link.id, { active: !link.active });
      setSocials(socials.map((s) => (s.id === updated.id ? updated : s)));
      toast.success(`${link.platform} is now ${updated.active ? 'Active' : 'Inactive'}`);
    } catch {
      toast.error('Failed to toggle status');
    }
  };

  const confirmDelete = async () => {
    if (!socialToDelete) return;
    try {
      await socialService.deleteSocial(socialToDelete.id);
      setSocials(socials.filter((s) => s.id !== socialToDelete.id));
      toast.success(`Removed ${socialToDelete.platform}`);
    } catch {
      toast.error('Failed to delete social link');
    } finally {
      setDeleteModalOpen(false);
      setSocialToDelete(null);
    }
  };

  const handleReorder = async (reordered: SocialLink[]) => {
    setSocials(reordered);
    await socialService.reorderSocials(reordered);
    toast.success('Social links reordered');
  };

  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Social & Professional Profiles"
        subtitle="Manage personal profiles, GitHub repositories, Kaggle handles, and contact channels."
        badge="Social CMS"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant={isReorderMode ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setIsReorderMode(!isReorderMode)}
              leftIcon={<ArrowUpDown className="w-4 h-4" />}
            >
              {isReorderMode ? 'Done Reordering' : 'Reorder Links'}
            </Button>
            <Button
              size="sm"
              onClick={() => openAddModal()}
              leftIcon={<Plus className="w-4 h-4" />}
              id="add-social-button"
            >
              Add Social Link
            </Button>
          </div>
        }
      />

      {/* Fast Presets Tray */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Quick-Add Platform Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const alreadyAdded = socials.some(
              (s) => s.platform.toLowerCase() === preset.platform.toLowerCase()
            );
            return (
              <button
                key={preset.platform}
                type="button"
                onClick={() => openAddModal(preset)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  alreadyAdded
                    ? 'border-zinc-200 dark:border-zinc-800 text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50'
                    : 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10'
                }`}
              >
                {renderIcon(preset.icon)}
                <span>{preset.platform}</span>
                {!alreadyAdded && <Plus className="w-3 h-3 text-emerald-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main List */}
      {isReorderMode ? (
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
            Drag to change footer & hero social icon ordering
          </span>
          <DragDropList
            items={socials}
            onReorder={handleReorder}
            keyExtractor={(item) => item.id}
            renderItem={(item) => (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-emerald-500">
                    {renderIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {item.platform}
                    </h4>
                    <p className="text-xs text-zinc-400">{item.url}</p>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      ) : socials.length === 0 ? (
        <EmptyState
          icon={<Share2 className="w-8 h-8" />}
          title="No Social Links Configured"
          description="Add your GitHub, LinkedIn, or Kaggle links to connect with recruiters and visitors."
          actionLabel="Add Social Link"
          onAction={() => openAddModal()}
        />
      ) : (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0B1511] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-[#07100C] text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Profile URL / Target</th>
                  <th className="py-3 px-4">Username</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-sm">
                {socials.map((link, index) => (
                  <tr
                    key={link.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-[#0E1B15] transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center text-xs font-mono font-medium text-zinc-400">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800 text-emerald-500">
                          {renderIcon(link.icon)}
                        </div>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">
                          {link.platform}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline max-w-xs truncate"
                      >
                        <span>{link.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-zinc-500">
                      {link.username || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(link)}
                        title="Click to toggle status"
                        className="cursor-pointer"
                      >
                        <StatusBadge active={link.active} />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(link)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          title="Edit link"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSocialToDelete(link);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSocial ? 'Edit Social Link' : 'Add Social Platform'}
        description="Provide profile URL, username tag, and display icon descriptor."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Platform Name"
            value={socialForm.platform || ''}
            onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
            placeholder="e.g. GitHub, Kaggle, LinkedIn, HuggingFace"
            required
          />

          <Input
            label="Profile / Destination URL"
            value={socialForm.url || ''}
            onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
            placeholder="https://..."
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Username / Handle"
              value={socialForm.username || ''}
              onChange={(e) => setSocialForm({ ...socialForm, username: e.target.value })}
              placeholder="@abdulhamidkhokon"
            />
            <Input
              label="Icon Identifier"
              value={socialForm.icon || 'Globe'}
              onChange={(e) => setSocialForm({ ...socialForm, icon: e.target.value })}
              placeholder="Github, Linkedin, Twitter, Globe..."
            />
          </div>

          <Toggle
            label="Active Link"
            checked={socialForm.active ?? true}
            onChange={(checked) => setSocialForm({ ...socialForm, active: checked })}
            description="Display this social link on your public website."
          />

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {editingSocial ? 'Update Link' : 'Save Social Link'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Social Link?"
        message={`Are you sure you want to remove ${socialToDelete?.platform}?`}
      />
    </div>
  );
};
