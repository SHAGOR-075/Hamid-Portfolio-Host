import React, { useEffect, useState, useMemo } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Select } from '../components/common/Select';
import { Toggle } from '../components/common/Toggle';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { SearchBar } from '../components/common/SearchBar';
import { StatusBadge, Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { DragDropList } from '../components/common/DragDropList';
import { skillService } from '../services/skillService';
import { Skill, SkillCategory } from '../types';
import {
  Plus,
  Wrench,
  Edit2,
  Trash2,
  Terminal,
  Code2,
  BrainCircuit,
  Database,
  Container,
  Cpu,
  Layers,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES: SkillCategory[] = [
  'Programming',
  'Machine Learning',
  'Web Development',
  'Database',
  'Tools',
  'Other',
];

export const SkillsManagement: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isReorderMode, setIsReorderMode] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillForm, setSkillForm] = useState<Partial<Skill>>({
    name: '',
    category: 'Programming',
    icon: 'Code2',
    description: '',
    level: 85,
    active: true,
  });

  // Delete Confirm State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const fetchSkills = async () => {
    try {
      const data = await skillService.getSkills();
      setSkills(data);
    } catch {
      toast.error('Failed to load skills');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, searchQuery, selectedCategory]);

  const openAddModal = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '',
      category: 'Programming',
      icon: 'Code2',
      description: '',
      level: 85,
      active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setSkillForm(skill);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name?.trim()) {
      toast.error('Skill name is required');
      return;
    }

    try {
      if (editingSkill) {
        const updated = await skillService.updateSkill(editingSkill.id, skillForm);
        setSkills(skills.map((s) => (s.id === updated.id ? updated : s)));
        toast.success(`Skill "${updated.name}" updated successfully`);
      } else {
        const newSkill = await skillService.createSkill({
          name: skillForm.name,
          category: (skillForm.category as SkillCategory) || 'Programming',
          icon: skillForm.icon || 'Code2',
          description: skillForm.description || '',
          level: Number(skillForm.level) || 80,
          order: skills.length + 1,
          active: skillForm.active ?? true,
        });
        setSkills([...skills, newSkill]);
        toast.success(`Skill "${newSkill.name}" created successfully`);
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    }
  };

  const handleToggleActive = async (skill: Skill) => {
    try {
      const updated = await skillService.updateSkill(skill.id, { active: !skill.active });
      setSkills(skills.map((s) => (s.id === updated.id ? updated : s)));
      toast.success(`"${skill.name}" is now ${updated.active ? 'Active' : 'Inactive'}`);
    } catch {
      toast.error('Failed to toggle status');
    }
  };

  const confirmDelete = async () => {
    if (!skillToDelete) return;
    try {
      await skillService.deleteSkill(skillToDelete.id);
      setSkills(skills.filter((s) => s.id !== skillToDelete.id));
      toast.success(`Skill "${skillToDelete.name}" deleted successfully`);
    } catch {
      toast.error('Failed to delete skill');
    } finally {
      setDeleteModalOpen(false);
      setSkillToDelete(null);
    }
  };

  const handleReorder = async (reordered: Skill[]) => {
    setSkills(reordered);
    await skillService.reorderSkills(reordered);
    toast.success('Skills reordered');
  };

  const getCategoryIcon = (category: SkillCategory) => {
    switch (category) {
      case 'Programming':
        return <Terminal className="w-4 h-4 text-emerald-500" />;
      case 'Machine Learning':
        return <BrainCircuit className="w-4 h-4 text-emerald-400" />;
      case 'Web Development':
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-amber-400" />;
      case 'Tools':
        return <Container className="w-4 h-4 text-purple-400" />;
      default:
        return <Cpu className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Technical Skills Management"
        subtitle="Maintain all programming languages, ML toolsets, databases, and proficiency percentages shown on your portfolio."
        badge="Skills CMS"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant={isReorderMode ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setIsReorderMode(!isReorderMode)}
              leftIcon={<ArrowUpDown className="w-4 h-4" />}
            >
              {isReorderMode ? 'Done Reordering' : 'Reorder List'}
            </Button>
            <Button size="sm" onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />} id="add-skill-button">
              Add New Skill
            </Button>
          </div>
        }
      />

      {/* Filter & Search Bar Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search skill, category, or tool..."
        />

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'All'
                ? 'bg-emerald-500 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            All ({skills.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Reorder Mode List */}
      {isReorderMode ? (
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Drag skills up or down to set public order
            </span>
            <Button size="sm" onClick={() => setIsReorderMode(false)}>
              Done
            </Button>
          </div>
          <DragDropList
            items={skills}
            onReorder={handleReorder}
            keyExtractor={(item) => item.id}
            renderItem={(skill) => (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-zinc-100 dark:bg-zinc-800">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-zinc-400">{skill.category}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-500">
                  {skill.level}%
                </span>
              </div>
            )}
          />
        </div>
      ) : filteredSkills.length === 0 ? (
        <EmptyState
          icon={<Wrench className="w-8 h-8" />}
          title="No Skills Found"
          description={
            searchQuery || selectedCategory !== 'All'
              ? 'No skills matched your search or category filter.'
              : 'Start building your portfolio by adding your first technical skill.'
          }
          actionLabel="Add Skill"
          onAction={openAddModal}
        />
      ) : (
        /* Responsive Table & Card View */
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0B1511] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-[#07100C] text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Skill & Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 w-44">Proficiency Level</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-sm">
                {filteredSkills.map((skill, index) => (
                  <tr
                    key={skill.id}
                    className="hover:bg-zinc-50/80 dark:hover:bg-[#0E1B15] transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center text-xs font-mono font-medium text-zinc-400">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0">
                          {getCategoryIcon(skill.category)}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-zinc-100">
                            {skill.name}
                          </p>
                          {skill.description && (
                            <p className="text-xs text-zinc-400 line-clamp-1 max-w-sm">
                              {skill.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="default" size="sm">
                        {skill.category}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-zinc-500">Mastery</span>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(skill)}
                        title="Click to toggle status"
                        className="cursor-pointer"
                      >
                        <StatusBadge active={skill.active} />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(skill)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          title="Edit skill"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSkillToDelete(skill);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete skill"
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

      {/* Add / Edit Skill Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSkill ? 'Edit Technical Skill' : 'Add Technical Skill'}
        description="Fill out the skill details, domain category, and proficiency level."
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            label="Skill Name"
            value={skillForm.name || ''}
            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
            placeholder="e.g. PyTorch, FastAPI, React, PostgreSQL"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Skill Category"
              value={skillForm.category || 'Programming'}
              onChange={(e) =>
                setSkillForm({ ...skillForm, category: e.target.value as SkillCategory })
              }
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
              required
            />

            <Input
              label="Icon Descriptor"
              value={skillForm.icon || 'Code2'}
              onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
              placeholder="e.g. Terminal, Code2, BrainCircuit"
            />
          </div>

          <Textarea
            label="Short Description / Scope"
            value={skillForm.description || ''}
            onChange={(e) => setSkillForm({ ...skillForm, description: e.target.value })}
            placeholder="e.g. Deep neural networks, CNNs, Transformers, and transfer learning workflows."
            rows={2}
          />

          {/* Level slider */}
          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Proficiency Level
              </label>
              <span className="text-xs font-mono font-bold text-emerald-500">
                {skillForm.level || 80}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={skillForm.level || 80}
              onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
              className="w-full accent-emerald-500 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <Toggle
            label="Skill Active Status"
            checked={skillForm.active ?? true}
            onChange={(checked) => setSkillForm({ ...skillForm, active: checked })}
            description="Active skills will be visible on the public website."
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
              {editingSkill ? 'Update Skill' : 'Save Skill'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Technical Skill?"
        message={`Are you sure you want to remove "${skillToDelete?.name}" from your portfolio?`}
      />
    </div>
  );
};
