import React, { useEffect, useState, useRef } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { TagInput } from '../components/common/TagInput';
import { ImageUploader } from '../components/common/ImageUploader';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { settingsService } from '../services/settingsService';
import { storage } from '../services/storage';
import { SiteSettings } from '../types';
import {
  Settings,
  Save,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  BarChart2,
  Code2,
  AlertTriangle,
  Globe,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsManagement: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch {
        toast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setIsSaving(true);
    try {
      await settingsService.updateSettings(settings);
      toast.success('Site settings and SEO metadata saved');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportBackup = () => {
    const jsonStr = storage.exportDatabase();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Database backup exported as JSON');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storage.importDatabase(content);
      if (success) {
        toast.success('Database backup restored successfully!');
        window.location.reload();
      } else {
        toast.error('Invalid backup JSON format');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    storage.resetToDefaults();
    setResetModalOpen(false);
    toast.success('Database reset to clean factory defaults');
    window.location.reload();
  };

  if (isLoading || !settings) {
    return <div className="p-8 text-center text-zinc-500">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <PageHeader
        title="Global Website Settings & SEO"
        subtitle="Control portfolio metadata, OpenGraph social cards, analytics scripts, and database backup/restore utilities."
        badge="Settings"
        actions={
          <Button
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Settings
          </Button>
        }
      />

      <form onSubmit={handleSave} className="space-y-8">
        {/* SEO & Meta Config */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-500" />
            <span>Search Engine Optimization (SEO) & Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Website Title"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              placeholder="Shagor Ahmed | Machine Learning & CSE Portfolio"
              required
            />
            <Input
              label="Site Tagline"
              value={settings.siteTagline}
              onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
              placeholder="Intelligent Systems & Computational Research"
            />
          </div>

          <Textarea
            label="Meta Description (Search Snippet)"
            value={settings.metaDescription}
            onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
            placeholder="Official portfolio of Shagor Ahmed, Computer Science graduate specializing in ML..."
            rows={2}
          />

          <TagInput
            label="SEO Meta Keywords"
            tags={settings.keywords || []}
            onChange={(tags) => setSettings({ ...settings, keywords: tags })}
            placeholder="Add keywords (e.g. Machine Learning, Computer Vision, CSE) and press Enter..."
          />
        </div>

        {/* Media & OpenGraph */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span>OpenGraph Social Preview & Favicon</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ImageUploader
              label="Social Sharing Banner (OG Image)"
              value={settings.ogImage}
              onChange={(url) => setSettings({ ...settings, ogImage: url })}
              aspectRatio="video"
              helperText="1200x630px recommended for social card unfurling."
            />
            <ImageUploader
              label="Website Favicon"
              value={settings.favicon}
              onChange={(url) => setSettings({ ...settings, favicon: url })}
              aspectRatio="square"
              helperText="32x32px or 64x64px square icon or logo."
            />
          </div>
        </div>

        {/* Analytics & Verification */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-500" />
            <span>Analytics & Google Webmaster</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Google Analytics ID (GA4)"
              value={settings.googleAnalyticsId || ''}
              onChange={(e) =>
                setSettings({ ...settings, googleAnalyticsId: e.target.value })
              }
              placeholder="G-XXXXXXXXXX"
              helperText="Enables visitor telemetry and engagement tracking"
            />
            <Input
              label="Google Search Console Meta Tag"
              value={settings.searchConsoleTag || ''}
              onChange={(e) =>
                setSettings({ ...settings, searchConsoleTag: e.target.value })
              }
              placeholder="google-site-verification=..."
              helperText="Verification token for domain indexing"
            />
          </div>
        </div>

        {/* Custom Header & Footer Scripts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-500" />
            <span>Custom Injected Scripts</span>
          </h2>

          <Textarea
            label="Header Custom Scripts (<head>)"
            value={settings.customHeaderScript || ''}
            onChange={(e) =>
              setSettings({ ...settings, customHeaderScript: e.target.value })
            }
            placeholder="<script>/* custom font or tracking tag */</script>"
            rows={3}
          />
        </div>

        {/* Database Management & Backups */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Database Backup, Import & Factory Reset</span>
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleExportBackup}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export JSON Backup
            </Button>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<Upload className="w-4 h-4" />}
              >
                Import JSON Backup
              </Button>
            </div>

            <Button
              type="button"
              variant="danger"
              onClick={() => setResetModalOpen(true)}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Factory Reset Data
            </Button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <Button type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            Save All Settings
          </Button>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleResetData}
        title="Factory Reset CMS Database?"
        message="This will overwrite all your custom changes and restore default mock data for Projects, Education, Travel stories, and Hero sections. Are you sure?"
        confirmText="Yes, Reset Everything"
      />
    </div>
  );
};
