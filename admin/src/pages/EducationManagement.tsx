import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Toggle } from '../components/common/Toggle';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { StatusBadge, Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { DragDropList } from '../components/common/DragDropList';
import { educationService } from '../services/educationService';
import { Education } from '../types';
import {
  Plus,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Edit2,
  Trash2,
  CheckCircle,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const EducationManagement: React.FC = () => {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReorderMode, setIsReorderMode] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [eduForm, setEduForm] = useState<Partial<Education>>({
    degree: '',
    institution: '',
    department: '',
    startYear: '2022',
    endYear: '2026',
    gpa: '',
    description: '',
    achievement: '',
    location: 'Dhaka, Bangladesh',
    icon: 'GraduationCap',
    active: true,
  });

  // Delete Confirmation
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eduToDelete, setEduToDelete] = useState<Education | null>(null);

  const fetchEducation = async () => {
    try {
      const data = await educationService.getEducation();
      setEducationList(data);
    } catch {
      toast.error('Failed to load education');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const openAddModal = () => {
    setEditingEdu(null);
    setEduForm({
      degree: '',
      institution: '',
      department: '',
      startYear: '2022',
      endYear: '2026',
      gpa: '',
      description: '',
      achievement: '',
      location: 'Dhaka, Bangladesh',
      icon: 'GraduationCap',
      active: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (edu: Education) => {
    setEditingEdu(edu);
    setEduForm(edu);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduForm.degree?.trim() || !eduForm.institution?.trim()) {
      toast.error('Degree and Institution are required.');
      return;
    }

    try {
      if (editingEdu) {
        const updated = await educationService.updateEducation(editingEdu.id, eduForm);
        setEducationList(educationList.map((e) => (e.id === updated.id ? updated : e)));
        toast.success(`Education "${updated.degree}" updated`);
      } else {
        const created = await educationService.createEducation({
          degree: eduForm.degree!,
          institution: eduForm.institution!,
          department: eduForm.department || '',
          startYear: eduForm.startYear || '2022',
          endYear: eduForm.endYear || '2026',
          gpa: eduForm.gpa || '',
          description: eduForm.description || '',
          achievement: eduForm.achievement || '',
          location: eduForm.location || '',
          icon: eduForm.icon || 'GraduationCap',
          order: educationList.length + 1,
          active: eduForm.active ?? true,
        });
        setEducationList([...educationList, created]);
        toast.success(`Added "${created.degree}" to education history`);
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || 'Action failed');
    }
  };

  const handleToggleActive = async (edu: Education) => {
    try {
      const updated = await educationService.updateEducation(edu.id, { active: !edu.active });
      setEducationList(educationList.map((e) => (e.id === updated.id ? updated : e)));
      toast.success(`"${edu.degree}" is now ${updated.active ? 'Active' : 'Inactive'}`);
    } catch {
      toast.error('Failed to toggle status');
    }
  };

  const confirmDelete = async () => {
    if (!eduToDelete) return;
    try {
      await educationService.deleteEducation(eduToDelete.id);
      setEducationList(educationList.filter((e) => e.id !== eduToDelete.id));
      toast.success(`Education record deleted`);
    } catch {
      toast.error('Failed to delete education item');
    } finally {
      setDeleteModalOpen(false);
      setEduToDelete(null);
    }
  };

  const handleReorder = async (reordered: Education[]) => {
    setEducationList(reordered);
    await educationService.reorderEducation(reordered);
    toast.success('Timeline reordered');
  };

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Education & Academic History"
        subtitle="Manage formal academic degrees, departments, CGPA grades, honors achievements, and graduation timeline."
        badge="Education CMS"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant={isReorderMode ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setIsReorderMode(!isReorderMode)}
              leftIcon={<ArrowUpDown className="w-4 h-4" />}
            >
              {isReorderMode ? 'Done Reordering' : 'Reorder Timeline'}
            </Button>
            <Button size="sm" onClick={openAddModal} leftIcon={<Plus className="w-4 h-4" />} id="add-education-button">
              Add Qualification
            </Button>
          </div>
        }
      />

      {/* Main Split View: Management on Left, Timeline Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (CRUD Cards) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Academic Records ({educationList.length})
            </h2>
            <span className="text-xs text-zinc-400">Manage, edit, and toggle records</span>
          </div>

          {isReorderMode ? (
            <div className="p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                Drag qualifications up or down to set timeline sequence
              </span>
              <DragDropList
                items={educationList}
                onReorder={handleReorder}
                keyExtractor={(item) => item.id}
                renderItem={(edu) => (
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {edu.institution} ({edu.startYear} — {edu.endYear})
                      </p>
                    </div>
                    {edu.gpa && (
                      <span className="text-xs font-mono font-bold text-emerald-500">
                        {edu.gpa}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          ) : educationList.length === 0 ? (
            <EmptyState
              icon={<GraduationCap className="w-8 h-8" />}
              title="No Education Records"
              description="Add your undergraduate degrees, high school qualifications, and academic milestones."
              actionLabel="Add Qualification"
              onAction={openAddModal}
            />
          ) : (
            <div className="space-y-4">
              {educationList.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-3 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                          {edu.degree}
                        </h3>
                        <StatusBadge active={edu.active} />
                      </div>
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {edu.department} • {edu.institution}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditModal(edu)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Edit entry"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEduToDelete(edu);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                      {edu.startYear} — {edu.endYear}
                    </span>
                    {edu.gpa && (
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                        {edu.gpa}
                      </span>
                    )}
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {edu.description}
                    </p>
                  )}

                  {edu.achievement && (
                    <div className="p-2.5 rounded-lg bg-emerald-500/5 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-medium">{edu.achievement}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Interactive Timeline Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Live Timeline Preview</span>
            </h2>
            <span className="text-[11px] text-zinc-400">As shown on public portfolio</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#07100C] border border-[#16261F] text-zinc-200 space-y-6">
            <div className="relative border-l-2 border-emerald-500/30 ml-4 pl-6 space-y-8">
              {educationList
                .filter((e) => e.active)
                .map((edu, idx) => (
                  <div key={edu.id} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#07100C] border-2 border-emerald-500 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider">
                        {edu.startYear} — {edu.endYear}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug">{edu.degree}</h4>
                      <p className="text-xs text-zinc-400 font-medium">
                        {edu.department} • {edu.institution}
                      </p>
                      {edu.gpa && (
                        <span className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                          {edu.gpa}
                        </span>
                      )}
                      {edu.achievement && (
                        <p className="text-[11px] text-zinc-400 italic pt-1">
                          ★ {edu.achievement}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Education Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingEdu ? 'Edit Qualification' : 'Add Academic Qualification'}
        description="Fill out institutional details, grading results, and milestone highlights."
        maxWidth="xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Degree / Qualification"
              value={eduForm.degree || ''}
              onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
              placeholder="e.g. Bachelor of Science"
              required
            />
            <Input
              label="Institution / University"
              value={eduForm.institution || ''}
              onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
              placeholder="e.g. Leading University"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Department / Major"
              value={eduForm.department || ''}
              onChange={(e) => setEduForm({ ...eduForm, department: e.target.value })}
              placeholder="e.g. Computer Science & Engineering"
            />
            <Input
              label="GPA / Result"
              value={eduForm.gpa || ''}
              onChange={(e) => setEduForm({ ...eduForm, gpa: e.target.value })}
              placeholder="e.g. CGPA: 3.82 / 4.00"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Start Year"
              value={eduForm.startYear || ''}
              onChange={(e) => setEduForm({ ...eduForm, startYear: e.target.value })}
              placeholder="2022"
            />
            <Input
              label="End Year / Expected"
              value={eduForm.endYear || ''}
              onChange={(e) => setEduForm({ ...eduForm, endYear: e.target.value })}
              placeholder="2026"
            />
            <Input
              label="Location"
              value={eduForm.location || ''}
              onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
              placeholder="Sylhet, Bangladesh"
            />
          </div>

          <Textarea
            label="Curriculum & Focus Description"
            value={eduForm.description || ''}
            onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })}
            placeholder="Key coursework, specialization, research thesis..."
            rows={2}
          />

          <Input
            label="Special Achievement / Honors"
            value={eduForm.achievement || ''}
            onChange={(e) => setEduForm({ ...eduForm, achievement: e.target.value })}
            placeholder="e.g. Dean's Honor List for 6 trimesters"
          />

          <Toggle
            label="Active Timeline Status"
            checked={eduForm.active ?? true}
            onChange={(checked) => setEduForm({ ...eduForm, active: checked })}
            description="When enabled, this degree appears in the public academic timeline."
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
              {editingEdu ? 'Update Qualification' : 'Save Qualification'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Qualification?"
        message={`Are you sure you want to remove "${eduToDelete?.degree}" from your timeline?`}
      />
    </div>
  );
};
