import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Select } from '../components/common/Select';
import { Toggle } from '../components/common/Toggle';
import { ImageUploader } from '../components/common/ImageUploader';
import { TagInput } from '../components/common/TagInput';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { Save, ArrowLeft, Star, Github, Globe, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Machine Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Web Development',
  'Data Engineering',
  'Robotics & Embedded',
  'Other',
];

export const ProjectFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    category: 'Machine Learning',
    image:
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    technologies: ['Python', 'PyTorch'],
    githubUrl: '',
    liveUrl: '',
    featured: false,
    active: true,
  });

  useEffect(() => {
    if (isEditing && id) {
      const load = async () => {
        try {
          const project = await projectService.getProjectById(id);
          if (project) {
            setFormData(project);
          } else {
            toast.error('Project not found');
            navigate('/admin/projects');
          }
        } catch {
          toast.error('Failed to load project details');
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }
  }, [id, isEditing, navigate]);

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug && isEditing ? prev.slug : slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      toast.error('Project title is required');
      return;
    }
    if (!formData.shortDescription?.trim()) {
      toast.error('Short description is required');
      return;
    }

    setIsSaving(true);
    try {
      if (isEditing && id) {
        await projectService.updateProject(id, formData);
        toast.success(`Project "${formData.title}" updated successfully`);
      } else {
        await projectService.createProject({
          title: formData.title!,
          slug: formData.slug || formData.title!.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          shortDescription: formData.shortDescription!,
          description: formData.description || formData.shortDescription!,
          category: formData.category || 'Machine Learning',
          image: formData.image || '',
          technologies: formData.technologies || [],
          githubUrl: formData.githubUrl || '',
          liveUrl: formData.liveUrl || '',
          featured: formData.featured ?? false,
          active: formData.active ?? true,
          order: 1,
        });
        toast.success(`Project "${formData.title}" created successfully`);
      }
      navigate('/admin/projects');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-zinc-500">Loading project...</div>;
  }

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <PageHeader
        title={isEditing ? 'Edit Portfolio Project' : 'Add New Project'}
        subtitle="Specify technical details, stack dependencies, live repository links, and featured status."
        badge="Project Form"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/projects')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Projects
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              {isEditing ? 'Update Project' : 'Save Project'}
            </Button>
          </div>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            Project Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Project Title"
              value={formData.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. AgroVision: Deep Learning Crop Disease Classifier"
              required
            />
            <Input
              label="URL Slug"
              value={formData.slug || ''}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. agrovision-crop-classifier"
              helperText="Unique URL identifier for project deep linking"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Category"
              value={formData.category || 'Machine Learning'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              required
            />
            <div className="flex items-center pt-6">
              <Toggle
                label="Featured ML Project"
                checked={formData.featured ?? false}
                onChange={(checked) => setFormData({ ...formData, featured: checked })}
                description="Showcase prominently in the Featured ML section"
              />
            </div>
          </div>

          <Textarea
            label="Short Description (Summary Card)"
            value={formData.shortDescription || ''}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="A concise 1-2 sentence overview of the model, metrics, and architecture..."
            rows={2}
            required
          />

          <Textarea
            label="Full Comprehensive Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed writeup: datasets used, loss functions, benchmarks, deployment pipelines..."
            rows={5}
          />
        </div>

        {/* Project Image */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            Project Media & Thumbnail
          </h2>

          <ImageUploader
            label="Cover / Showcase Image"
            value={formData.image || ''}
            onChange={(url) => setFormData({ ...formData, image: url })}
            aspectRatio="video"
            helperText="Recommended: 16:9 ratio high-resolution image showing architecture or interface preview."
          />
        </div>

        {/* Technologies Tag Multi-Select */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            Tech Stack & Libraries
          </h2>

          <TagInput
            label="Technologies Used"
            tags={formData.technologies || []}
            onChange={(tags) => setFormData({ ...formData, technologies: tags })}
            placeholder="Type technology name (e.g. PyTorch, FastAPI, ONNX, React) and press Enter..."
            helperText="Press Enter or comma to add multiple tags."
          />
        </div>

        {/* External Links & Status */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            Deployment & Code Repository Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="GitHub Repository URL"
              value={formData.githubUrl || ''}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder=""
              leftIcon={<Github className="w-4 h-4" />}
            />
            <Input
              label="Live Production Demo URL"
              value={formData.liveUrl || ''}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              placeholder="https://hamidkhokon.sites.bd"
              leftIcon={<Globe className="w-4 h-4" />}
            />
          </div>

          <div className="pt-2">
            <Toggle
              label="Active Project"
              checked={formData.active ?? true}
              onChange={(checked) => setFormData({ ...formData, active: checked })}
              description="Make this project publicly visible on your portfolio website."
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/projects')}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            {isEditing ? 'Save Project Changes' : 'Publish Project'}
          </Button>
        </div>
      </form>
    </div>
  );
};
