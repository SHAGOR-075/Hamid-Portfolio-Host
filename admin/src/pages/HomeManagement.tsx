import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { ImageUploader } from '../components/common/ImageUploader';
import { DragDropList } from '../components/common/DragDropList';
import { homeService } from '../services/homeService';
import { HomeData } from '../types';
import { Save, Plus, X, Sparkles, UserCheck, Tag, Link2, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

export const HomeManagement: React.FC = () => {
  const [formData, setFormData] = useState<HomeData | null>(null);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await homeService.getHomeData();
        setFormData(data);
      } catch (err) {
        toast.error('Failed to load hero section data');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData) return;

    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!formData.heading.trim()) {
      toast.error('Main heading is required');
      return;
    }

    setIsSaving(true);
    try {
      await homeService.updateHomeData(formData);
      toast.success('Home section updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const addFloatingTag = () => {
    if (!formData || !newTag.trim()) return;
    const trimmed = newTag.trim();
    if (formData.floatingTags.includes(trimmed)) {
      toast.error('Tag already exists');
      return;
    }
    setFormData({
      ...formData,
      floatingTags: [...formData.floatingTags, trimmed],
    });
    setNewTag('');
  };

  const removeFloatingTag = (tagToRemove: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      floatingTags: formData.floatingTags.filter((t) => t !== tagToRemove),
    });
  };

  const handleReorderTags = (reordered: string[]) => {
    if (!formData) return;
    setFormData({
      ...formData,
      floatingTags: reordered,
    });
  };

  if (isLoading || !formData) {
    return <div className="p-8 text-center text-zinc-500">Loading Home CMS...</div>;
  }

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Home Section Management"
        subtitle="Configure the hero introduction, headline typography, avatar visual, call-to-actions, and interactive floating badges."
        badge="Hero CMS"
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
        {/* Basic Information Block */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <UserCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Basic Hero Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Abdul Hamid Khokon"
              required
            />
            <Input
              label="Badge / Subtitle Text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g. CSE GRADUATE • MACHINE LEARNING ENTHUSIAST"
              required
            />
          </div>

          <Input
            label="Main Hero Heading"
            value={formData.heading}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            placeholder="e.g. Turning Ideas Into Intelligent Digital Experiences."
            required
          />

          <Textarea
            label="Hero Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="A short summary of your background, passion, and expertise..."
            rows={3}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Dhaka, Bangladesh"
            />
            <Input
              label="Availability Status"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              placeholder="e.g. Available for full-time roles & projects"
            />
          </div>
        </div>

        {/* Hero Image Block */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Hero Profile Image
            </h2>
          </div>

          <ImageUploader
            label="Profile / Hero Banner Image"
            value={formData.heroImage}
            onChange={(url) => setFormData({ ...formData, heroImage: url })}
            aspectRatio="portrait"
            helperText="Recommended: High-resolution portrait photo (min 600x800px). JPG, PNG, WEBP allowed."
          />
        </div>

        {/* Hero Call To Action Buttons */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <Link2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Hero Call-to-Action Buttons
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800/60 space-y-3">
              <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                Primary Button (Main CTA)
              </span>
              <Input
                label="Button Label"
                value={formData.primaryButtonText}
                onChange={(e) =>
                  setFormData({ ...formData, primaryButtonText: e.target.value })
                }
                placeholder="e.g. Explore Projects"
              />
              <Input
                label="Target URL / Anchor"
                value={formData.primaryButtonUrl}
                onChange={(e) =>
                  setFormData({ ...formData, primaryButtonUrl: e.target.value })
                }
                placeholder="e.g. #projects or /projects"
              />
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800/60 space-y-3">
              <span className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">
                Secondary Button (Auxiliary CTA)
              </span>
              <Input
                label="Button Label"
                value={formData.secondaryButtonText}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryButtonText: e.target.value })
                }
                placeholder="e.g. Download CV"
              />
              <Input
                label="Target URL / File"
                value={formData.secondaryButtonUrl}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryButtonUrl: e.target.value })
                }
                placeholder="e.g. /resume.pdf or https://..."
              />
            </div>
          </div>
        </div>

        {/* Floating Tags Block */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-emerald-500" />
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Interactive Floating Tags
              </h2>
            </div>
            <span className="text-xs text-zinc-500">Drag items to change order</span>
          </div>

          {/* Add Tag Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addFloatingTag();
                }
              }}
              placeholder="Enter tag (e.g. PyTorch, Computer Vision, React)..."
              className="flex-1 rounded-lg text-sm bg-zinc-50 dark:bg-[#07100C] text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
            <Button
              type="button"
              onClick={addFloatingTag}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Tag
            </Button>
          </div>

          {/* Reorderable Tag List */}
          <DragDropList
            items={formData.floatingTags}
            onReorder={handleReorderTags}
            keyExtractor={(item) => item}
            renderItem={(item) => (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {item}
                </span>
                <button
                  type="button"
                  onClick={() => removeFloatingTag(item)}
                  className="p-1 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Remove tag"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          />
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              const data = await homeService.getHomeData();
              setFormData(data);
              toast('Changes reverted', { icon: '🔄' });
            }}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </Button>
          <Button type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            Save All Home Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
