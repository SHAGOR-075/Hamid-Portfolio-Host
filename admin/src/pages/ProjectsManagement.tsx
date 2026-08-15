import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { SearchBar } from '../components/common/SearchBar';
import { StatusBadge, Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { DragDropList } from '../components/common/DragDropList';
import { projectService } from '../services/projectService';
import { Project } from '../types';
import { formatDate } from '../lib/utils';
import {
  Plus,
  FolderGit2,
  Star,
  ExternalLink,
  Github,
  Edit2,
  Trash2,
  ArrowUpDown,
  CheckCircle2,
  Sparkles,
  Calendar,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ProjectsManagement: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState<'All' | 'Featured' | 'Standard'>('All');
  const [isReorderMode, setIsReorderMode] = useState(false);

  // Delete Confirm
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
      const matchesFeatured =
        featuredFilter === 'All'
          ? true
          : featuredFilter === 'Featured'
          ? p.featured
          : !p.featured;

      return matchesSearch && matchesCat && matchesFeatured;
    });
  }, [projects, searchQuery, categoryFilter, featuredFilter]);

  const handleToggleFeatured = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = await projectService.toggleFeatured(id);
      setProjects(projects.map((p) => (p.id === id ? updated : p)));
      toast.success(
        `Project "${updated.title}" is ${updated.featured ? 'now Featured ★' : 'standard'}`
      );
    } catch {
      toast.error('Failed to update featured flag');
    }
  };

  const handleToggleStatus = async (id: string) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj) return;
    try {
      const updated = await projectService.updateProject(id, { active: !proj.active });
      setProjects(projects.map((p) => (p.id === id ? updated : p)));
      toast.success(`"${updated.title}" is ${updated.active ? 'Active' : 'Inactive'}`);
    } catch {
      toast.error('Failed to toggle status');
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await projectService.deleteProject(projectToDelete.id);
      setProjects(projects.filter((p) => p.id !== projectToDelete.id));
      toast.success(`Project "${projectToDelete.title}" deleted successfully`);
    } catch {
      toast.error('Failed to delete project');
    } finally {
      setDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleReorder = async (reordered: Project[]) => {
    setProjects(reordered);
    await projectService.reorderProjects(reordered);
    toast.success('Projects reordered');
  };

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Portfolio Projects"
        subtitle="Manage Machine Learning applications, full-stack systems, research demos, and featured showcase projects."
        badge="Projects CMS"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant={isReorderMode ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setIsReorderMode(!isReorderMode)}
              leftIcon={<ArrowUpDown className="w-4 h-4" />}
            >
              {isReorderMode ? 'Done Reordering' : 'Reorder Projects'}
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/admin/projects/new')}
              leftIcon={<Plus className="w-4 h-4" />}
              id="add-project-button"
            >
              Add New Project
            </Button>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, technology, or tag..."
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Featured Filter */}
          <div className="inline-flex rounded-lg p-1 bg-zinc-100 dark:bg-zinc-800 text-xs">
            {(['All', 'Featured', 'Standard'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setFeaturedFilter(filter)}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  featuredFilter === filter
                    ? 'bg-white dark:bg-[#0B1511] text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs font-medium rounded-lg px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reorder Mode List */}
      {isReorderMode ? (
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
            Drag projects up or down to set featured order
          </span>
          <DragDropList
            items={projects}
            onReorder={handleReorder}
            keyExtractor={(item) => item.id}
            renderItem={(proj) => (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-10 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-zinc-400">{proj.category}</p>
                  </div>
                </div>
                {proj.featured && <Badge variant="featured">★ Featured</Badge>}
              </div>
            )}
          />
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="w-8 h-8" />}
          title="No Projects Found"
          description={
            searchQuery || categoryFilter !== 'All' || featuredFilter !== 'All'
              ? 'No projects match the current search filters.'
              : 'Start building your portfolio by adding your first project.'
          }
          actionLabel="Add Project"
          onAction={() => navigate('/admin/projects/new')}
        />
      ) : (
        /* Project Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs overflow-hidden flex flex-col hover:border-emerald-500/50 transition-all duration-200"
            >
              {/* Card Image Banner & Badges */}
              <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge variant="default" size="sm" className="backdrop-blur-md bg-black/60 text-white border-white/20">
                    {project.category}
                  </Badge>
                  {project.featured && <Badge variant="featured">★ FEATURED</Badge>}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleToggleFeatured(project.id, e)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      project.featured
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-black/60 text-white hover:text-amber-400'
                    }`}
                    title={project.featured ? 'Featured ML Project' : 'Mark as featured'}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(project.id)}
                      className="cursor-pointer"
                      title="Toggle active status"
                    >
                      <StatusBadge active={project.active} />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Card Footer: Metadata & Actions */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(project.updatedAt)}
                    </span>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-emerald-500"
                        title="Live demo link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-emerald-500"
                        title="GitHub source code"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                      leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                    >
                      Edit
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        setProjectToDelete(project);
                        setDeleteModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Project Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Portfolio Project?"
        message={`Are you sure you want to delete "${projectToDelete?.title}"?`}
      />
    </div>
  );
};
