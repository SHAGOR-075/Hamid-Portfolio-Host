import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { SearchBar } from '../components/common/SearchBar';
import { StatusBadge, Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { DragDropList } from '../components/common/DragDropList';
import { travelService } from '../services/travelService';
import { TravelPost } from '../types';
import {
  Plus,
  Compass,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Edit2,
  Trash2,
  ArrowUpDown,
  Sliders,
  Star,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const TravelManagement: React.FC = () => {
  const navigate = useNavigate();
  const [travelPosts, setTravelPosts] = useState<TravelPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [isReorderMode, setIsReorderMode] = useState(false);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<TravelPost | null>(null);

  const fetchTravel = async () => {
    try {
      const data = await travelService.getTravelPosts();
      setTravelPosts(data);
    } catch {
      toast.error('Failed to load travel posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTravel();
  }, []);

  const years = useMemo(() => {
    const set = new Set<string>();
    travelPosts.forEach((p) => {
      if (p.date) set.add(p.date);
    });
    return ['All', ...Array.from(set)];
  }, [travelPosts]);

  const filteredPosts = useMemo(() => {
    return travelPosts.filter((post) => {
      const matchesSearch =
        post.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = yearFilter === 'All' || post.date === yearFilter;
      return matchesSearch && matchesYear;
    });
  }, [travelPosts, searchQuery, yearFilter]);

  const handleToggleFeatured = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const post = travelPosts.find((p) => p.id === id);
    if (!post) return;
    try {
      const updated = await travelService.updateTravelPost(id, { featured: !post.featured });
      setTravelPosts(travelPosts.map((p) => (p.id === id ? updated : p)));
      toast.success(
        `"${updated.location}" is ${updated.featured ? 'Featured in Highlights ★' : 'Standard'}`
      );
    } catch {
      toast.error('Failed to update featured flag');
    }
  };

  const handleToggleStatus = async (id: string) => {
    const post = travelPosts.find((p) => p.id === id);
    if (!post) return;
    try {
      const updated = await travelService.updateTravelPost(id, { active: !post.active });
      setTravelPosts(travelPosts.map((p) => (p.id === id ? updated : p)));
      toast.success(`"${updated.location}" is ${updated.active ? 'Active' : 'Inactive'}`);
    } catch {
      toast.error('Failed to toggle status');
    }
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    try {
      await travelService.deleteTravelPost(postToDelete.id);
      setTravelPosts(travelPosts.filter((p) => p.id !== postToDelete.id));
      toast.success(`Travel post "${postToDelete.location}" deleted`);
    } catch {
      toast.error('Failed to delete travel post');
    } finally {
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  const handleReorder = async (reordered: TravelPost[]) => {
    setTravelPosts(reordered);
    await travelService.reorderTravelPosts(reordered);
    toast.success('Travel posts reordered');
  };

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Travel Journal CMS"
        subtitle="Manage photo stories, remote travel journeys, carousel sliders, and gallery exhibitions."
        badge="Travel CMS"
        actions={
          <div className="flex items-center gap-2.5">
            <Button
              variant={isReorderMode ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setIsReorderMode(!isReorderMode)}
              leftIcon={<ArrowUpDown className="w-4 h-4" />}
            >
              {isReorderMode ? 'Done Reordering' : 'Reorder Stories'}
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/admin/travel/new')}
              leftIcon={<Plus className="w-4 h-4" />}
              id="add-travel-button"
            >
              Add Travel Post
            </Button>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search destination, country, or keyword..."
        />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-500">Filter Year:</span>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="text-xs font-medium rounded-lg px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 focus:outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === 'All' ? 'All Years' : y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reorder Mode List */}
      {isReorderMode ? (
        <div className="p-4 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
            Drag travel posts up or down to set display order
          </span>
          <DragDropList
            items={travelPosts}
            onReorder={handleReorder}
            keyExtractor={(item) => item.id}
            renderItem={(post) => (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <img
                    src={post.coverImage}
                    alt={post.location}
                    referrerPolicy="no-referrer"
                    className="w-12 h-10 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {post.location}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {post.country} • {post.date}
                    </p>
                  </div>
                </div>
                <Badge variant="default" size="sm">
                  {post.photos?.length || 0} Photos
                </Badge>
              </div>
            )}
          />
        </div>
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          icon={<Compass className="w-8 h-8" />}
          title="No Travel Stories Yet"
          description={
            searchQuery || yearFilter !== 'All'
              ? 'No travel entries matched your filter.'
              : 'Add your first travel memory with multiple photo captures and sliders.'
          }
          actionLabel="Add Travel Story"
          onAction={() => navigate('/admin/travel/new')}
        />
      ) : (
        /* Travel Posts Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs overflow-hidden flex flex-col hover:border-emerald-500/50 transition-all duration-200"
            >
              {/* Cover Image & Badges */}
              <div className="relative aspect-4/3 w-full bg-zinc-900 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.location}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Badge variant="default" size="sm" className="backdrop-blur-md bg-black/60 text-white border-white/20">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {post.country}
                  </Badge>
                  {post.featured && <Badge variant="featured">★ FEATURED</Badge>}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => handleToggleFeatured(post.id, e)}
                    className={`p-2 rounded-full backdrop-blur-md transition-all ${
                      post.featured
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-black/60 text-white hover:text-amber-400'
                    }`}
                    title={post.featured ? 'Featured Travel Highlight' : 'Mark as featured'}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>
                </div>

                {/* Photo count pill */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-semibold text-white flex items-center gap-1">
                  <ImageIcon className="w-3 h-3 text-emerald-400" />
                  <span>{post.photos?.length || 0} Photos</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-1">
                        {post.location}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        <Calendar className="w-3 h-3" />
                        <span>Year: {post.date}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(post.id)}
                      className="cursor-pointer"
                      title="Toggle active status"
                    >
                      <StatusBadge active={post.active} />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {post.shortDescription}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                    <span>
                      Gallery:{' '}
                      <strong className="text-zinc-300">
                        {post.photos?.filter((p) => p.showInGallery).length || 0}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/travel/${post.id}/edit`)}
                      leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                    >
                      Edit Post
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        setPostToDelete(post);
                        setDeleteModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete post"
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

      {/* Delete Travel Confirmation */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Travel Story?"
        message={`Are you sure you want to delete "${postToDelete?.location}" (${postToDelete?.photos?.length || 0} photos)?`}
      />
    </div>
  );
};
