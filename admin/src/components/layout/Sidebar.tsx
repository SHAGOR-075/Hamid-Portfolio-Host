import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  User,
  Wrench,
  GraduationCap,
  FolderGit2,
  Compass,
  Mail,
  Share2,
  Settings,
  UserCheck,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import { storage } from '../../services/storage';
import { PwaInstallPrompt } from '../pwa/PwaInstallPrompt';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const settings = storage.getSettings();
  const isCollapsed = collapsed && !mobileOpen;

  const contentNavItems = [
    { label: 'Home', path: '/admin/home', icon: Home },
    { label: 'About', path: '/admin/about', icon: User },
    { label: 'Skills', path: '/admin/skills', icon: Wrench },
    { label: 'Education', path: '/admin/education', icon: GraduationCap },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Travel', path: '/admin/travel', icon: Compass },
    { label: 'Contact', path: '/admin/contact', icon: Mail },
    { label: 'Social Links', path: '/admin/socials', icon: Share2 },
  ];

  const websiteNavItems = [
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePreview = () => {
    window.open(settings.previewUrl || (import.meta as any).env?.VITE_PREVIEW_URL || 'https://hamidkhokon.sites.bd', '_blank', 'noopener,noreferrer');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group select-none',
      isActive
        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-950/70 border border-emerald-500/30'
        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-[#0E1B15]'
    );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-[#07100C] border-r border-zinc-200 dark:border-[#16261F] transition-all duration-300 ease-in-out select-none shadow-2xl lg:shadow-none',
          isCollapsed ? 'w-20' : 'w-72 sm:w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-200 dark:border-[#16261F]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-950/40 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 text-left">
                <span className="block text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight truncate">
                  PORTFOLIO CMS
                </span>
                <span className="block text-[10px] font-medium tracking-wide uppercase text-emerald-600 dark:text-emerald-400 truncate">
                  Admin Panel
                </span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 lg:hidden hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto overflow-x-hidden">
          {/* Main Dashboard Link */}
          <div>
            <NavLink to="/admin" end className={navLinkClass} onClick={onCloseMobile}>
              <LayoutDashboard className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>Dashboard</span>}
            </NavLink>
          </div>

          {/* Content Group */}
          <div>
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[11px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                Content
              </p>
            )}
            <div className="space-y-1">
              {contentNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={navLinkClass}
                    onClick={onCloseMobile}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Website Group */}
          <div>
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[11px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                Website
              </p>
            )}
            <div className="space-y-1">
              <button
                type="button"
                onClick={handlePreview}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors text-left"
                title={isCollapsed ? 'Preview Website' : undefined}
              >
                <ExternalLink className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="truncate">Preview Website</span>}
              </button>

              {websiteNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={navLinkClass}
                    onClick={onCloseMobile}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* System Group */}
          <div>
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[11px] font-bold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                System
              </p>
            )}
            <div className="space-y-1">
              <NavLink
                to="/admin/profile"
                className={navLinkClass}
                onClick={onCloseMobile}
                title={isCollapsed ? 'Admin Profile' : undefined}
              >
                <UserCheck className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="truncate">Admin Profile</span>}
              </NavLink>

              <PwaInstallPrompt
                variant="sidebar"
                compact={isCollapsed}
                onOpenChange={(open) => open && onCloseMobile()}
              />

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors text-left"
                title={isCollapsed ? 'Logout' : undefined}
              >
                <LogOut className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="truncate">Logout</span>}
              </button>
            </div>
          </div>
        </div>

        {/* User Mini Profile Footer */}
        <div className="p-3 border-t border-zinc-200 dark:border-[#16261F] bg-zinc-50/60 dark:bg-[#09140F]">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
              }
              alt="Admin"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-emerald-500/30 shrink-0"
            />
            {!isCollapsed && (
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                  {user?.email || 'admin@example.com'}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
