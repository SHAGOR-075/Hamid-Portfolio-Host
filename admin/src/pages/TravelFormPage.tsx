import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Toggle } from '../components/common/Toggle';
import { ImageUploader } from '../components/common/ImageUploader';
import { DragDropList } from '../components/common/DragDropList';
import { travelService } from '../services/travelService';
import { TravelPost, TravelPhoto, TravelCarouselSettings } from '../types';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Check,
  Star,
  Sliders,
  Image as ImageIcon,
  Compass,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const TravelFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const multiPhotoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<TravelPost>>({
    location: '',
    country: 'Bangladesh',
    date: '2025',
    shortDescription: '',
    longDescription: '',
    coverImage: '',
    photos: [],
    featured: true,
    active: true,
    carouselSettings: {
      autoplay: true,
      autoplaySpeed: 4000,
      loop: true,
      navigation: true,
      pagination: true,
    },
  });

  useEffect(() => {
    if (isEditing && id) {
      const load = async () => {
        try {
          const post = await travelService.getTravelPostById(id);
          if (post) {
            setFormData(post);
          } else {
            toast.error('Travel post not found');
            navigate('/admin/travel');
          }
        } catch {
          toast.error('Failed to load travel post');
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location?.trim()) {
      toast.error('Location name is required');
      return;
    }
    if (!formData.shortDescription?.trim()) {
      toast.error('Short description is required');
      return;
    }

    const coverUrl =
      formData.coverImage ||
      formData.photos?.find((p) => p.isCover)?.url ||
      formData.photos?.[0]?.url ||
      '';

    setIsSaving(true);
    try {
      if (isEditing && id) {
        await travelService.updateTravelPost(id, {
          ...formData,
          coverImage: coverUrl,
        });
        toast.success(`Travel post "${formData.location}" updated`);
      } else {
        await travelService.createTravelPost({
          location: formData.location!,
          country: formData.country || 'Bangladesh',
          date: formData.date || '2025',
          shortDescription: formData.shortDescription!,
          longDescription: formData.longDescription || formData.shortDescription!,
          coverImage: coverUrl,
          photos: formData.photos || [],
          featured: formData.featured ?? false,
          active: formData.active ?? true,
          carouselSettings: formData.carouselSettings || {
            autoplay: true,
            autoplaySpeed: 4000,
            loop: true,
            navigation: true,
            pagination: true,
          },
          order: 1,
        });
        toast.success(`Travel post "${formData.location}" created`);
      }
      navigate('/admin/travel');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save travel post');
    } finally {
      setIsSaving(false);
    }
  };

  // Multi-photo handlers
  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error(`File ${file.name} format unsupported`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          const newPhoto: TravelPhoto = {
            id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            url: event.target.result,
            caption: '',
            isCover: (formData.photos?.length || 0) === 0,
            showInGallery: true,
            order: (formData.photos?.length || 0) + 1,
          };
          setFormData((prev) => {
            const nextPhotos = [...(prev.photos || []), newPhoto];
            return {
              ...prev,
              photos: nextPhotos,
              coverImage: prev.coverImage || newPhoto.url,
            };
          });
        }
      };
      reader.readAsDataURL(file);
    });
    toast.success('Photos added to story collection');
  };

  const handleSetCover = (photoId: string) => {
    if (!formData.photos) return;
    const target = formData.photos.find((p) => p.id === photoId);
    if (!target) return;

    const updated = formData.photos.map((p) => ({
      ...p,
      isCover: p.id === photoId,
    }));

    setFormData({
      ...formData,
      photos: updated,
      coverImage: target.url,
    });
    toast.success('Cover photo updated');
  };

  const handleToggleGallery = (photoId: string) => {
    if (!formData.photos) return;
    const updated = formData.photos.map((p) =>
      p.id === photoId ? { ...p, showInGallery: !p.showInGallery } : p
    );
    setFormData({ ...formData, photos: updated });
  };

  const handleUpdateCaption = (photoId: string, caption: string) => {
    if (!formData.photos) return;
    const updated = formData.photos.map((p) =>
      p.id === photoId ? { ...p, caption } : p
    );
    setFormData({ ...formData, photos: updated });
  };

  const handleRemovePhoto = (photoId: string) => {
    if (!formData.photos) return;
    const filtered = formData.photos.filter((p) => p.id !== photoId);
    setFormData({ ...formData, photos: filtered });
    toast.success('Photo removed');
  };

  const handleReorderPhotos = (reordered: TravelPhoto[]) => {
    const withUpdatedOrder = reordered.map((p, idx) => ({ ...p, order: idx + 1 }));
    setFormData({ ...formData, photos: withUpdatedOrder });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-zinc-500">Loading travel story...</div>;
  }

  const carouselSettings = formData.carouselSettings || {
    autoplay: true,
    autoplaySpeed: 4000,
    loop: true,
    navigation: true,
    pagination: true,
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <PageHeader
        title={isEditing ? 'Edit Travel Post & Gallery' : 'Add Travel Post'}
        subtitle="Manage destination narratives, multi-photo captures, carousel sliders, and gallery exhibitions."
        badge="Travel Editor"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/admin/travel')}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Travel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
            >
              {isEditing ? 'Update Story' : 'Save Story'}
            </Button>
          </div>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Story Details */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-500" />
            <span>Destination Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Input
              label="Location Name"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Sreemangal & Lawachara"
              required
            />
            <Input
              label="Country"
              value={formData.country || ''}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="e.g. Bangladesh"
            />
            <Input
              label="Travel Date / Year"
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="e.g. 2025"
            />
          </div>

          <Textarea
            label="Short Summary"
            value={formData.shortDescription || ''}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="A peaceful journey through misty tea gardens..."
            rows={2}
            required
          />

          <Textarea
            label="Full Travel Story Narrative"
            value={formData.longDescription || ''}
            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
            placeholder="Detailed memories, cultural experiences, flora and fauna observations..."
            rows={4}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Toggle
              label="Featured Highlight Story"
              checked={formData.featured ?? false}
              onChange={(checked) => setFormData({ ...formData, featured: checked })}
              description="Display prominently in the top carousel"
            />
            <Toggle
              label="Active Status"
              checked={formData.active ?? true}
              onChange={(checked) => setFormData({ ...formData, active: checked })}
              description="Make visible on public portfolio"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            Primary Story Cover Image
          </h2>

          <ImageUploader
            label="Cover Photo"
            value={formData.coverImage || ''}
            onChange={(url) => setFormData({ ...formData, coverImage: url })}
            aspectRatio="video"
            helperText="Main banner image used on cards and carousel sliders."
          />
        </div>

        {/* Multi-Photo Manager & Gallery Settings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-500" />
                <span>Multi-Photo Collection ({formData.photos?.length || 0})</span>
              </h2>
              <p className="text-xs text-zinc-500">
                Upload, order, set cover photos, and toggle appearance in public gallery
              </p>
            </div>

            <div>
              <input
                ref={multiPhotoInputRef}
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleAddPhotos}
                className="hidden"
              />
              <Button
                type="button"
                size="sm"
                onClick={() => multiPhotoInputRef.current?.click()}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Upload Photos
              </Button>
            </div>
          </div>

          {/* Photo list reorderable */}
          {(!formData.photos || formData.photos.length === 0) ? (
            <div className="p-8 text-center border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl space-y-2">
              <ImageIcon className="w-8 h-8 text-zinc-400 mx-auto" />
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                No photos in this story yet
              </p>
              <p className="text-xs text-zinc-500">
                Click "Upload Photos" above to select multiple high-resolution photos.
              </p>
            </div>
          ) : (
            <DragDropList
              items={formData.photos}
              onReorder={handleReorderPhotos}
              keyExtractor={(item) => item.id}
              renderItem={(photo) => (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full pr-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Travel snap'}
                      referrerPolicy="no-referrer"
                      className="w-16 h-12 object-cover rounded-lg shrink-0 border border-zinc-200 dark:border-zinc-700"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <input
                        type="text"
                        value={photo.caption || ''}
                        onChange={(e) => handleUpdateCaption(photo.id, e.target.value)}
                        placeholder="Add photo caption..."
                        className="w-full text-xs bg-zinc-50 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1 text-zinc-800 dark:text-zinc-200"
                      />
                      <div className="flex items-center gap-2">
                        {photo.isCover && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                            Cover Image
                          </span>
                        )}
                        <label className="flex items-center gap-1.5 text-[11px] text-zinc-500 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={photo.showInGallery}
                            onChange={() => handleToggleGallery(photo.id)}
                            className="rounded border-zinc-700 bg-[#07100C] text-emerald-500 w-3.5 h-3.5 accent-emerald-500"
                          />
                          <span>Show in Gallery</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!photo.isCover && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetCover(photo.id)}
                        className="text-xs"
                      >
                        Set Cover
                      </Button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            />
          )}
        </div>

        {/* Carousel Slider Controls Settings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-500" />
            <span>Travel Carousel Slider Configuration</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Toggle
              label="Autoplay Slides"
              checked={carouselSettings.autoplay}
              onChange={(checked) =>
                setFormData({
                  ...formData,
                  carouselSettings: { ...carouselSettings, autoplay: checked },
                })
              }
              description="Automatically advance slider photos"
            />

            <Toggle
              label="Infinite Loop"
              checked={carouselSettings.loop}
              onChange={(checked) =>
                setFormData({
                  ...formData,
                  carouselSettings: { ...carouselSettings, loop: checked },
                })
              }
              description="Cycle endlessly from first to last"
            />

            <Toggle
              label="Navigation Arrows"
              checked={carouselSettings.navigation}
              onChange={(checked) =>
                setFormData({
                  ...formData,
                  carouselSettings: { ...carouselSettings, navigation: checked },
                })
              }
              description="Display next/prev chevron buttons"
            />

            <Toggle
              label="Pagination Dots"
              checked={carouselSettings.pagination}
              onChange={(checked) =>
                setFormData({
                  ...formData,
                  carouselSettings: { ...carouselSettings, pagination: checked },
                })
              }
              description="Display progress indicators"
            />
          </div>

          <div className="max-w-xs pt-2">
            <Input
              label="Autoplay Speed (milliseconds)"
              type="number"
              step="500"
              min="1000"
              max="15000"
              value={carouselSettings.autoplaySpeed || 4000}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  carouselSettings: {
                    ...carouselSettings,
                    autoplaySpeed: Number(e.target.value),
                  },
                })
              }
              helperText="Default: 4000ms (4 seconds per slide)"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/travel')}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
            {isEditing ? 'Save Travel Story' : 'Publish Travel Story'}
          </Button>
        </div>
      </form>
    </div>
  );
};
