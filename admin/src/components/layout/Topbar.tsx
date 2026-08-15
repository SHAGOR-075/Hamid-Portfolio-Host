import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  ExternalLink,
  Bell,
  User,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { storage } from '../../services/storage';

interface TopbarProps {
  onToggleMobileSidebar: () => void;
  collapsed: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileSidebar, collapsed }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const settings = storage.getSettings();
  const activities = storage.getActivities().slice(0, 5);

  const getPageTitle = (pathname: string) => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname === '/admin/home') return 'Home Hero Management';
    if (pathname === '/admin/about') return 'About Management';
    if (pathname === '/admin/skills') return 'Technical Skills';
    if (pathname === '/admin/education') return 'Education & Timeline';
    if (pathname === '/admin/projects') return 'Projects Portfolio';
    if (pathname.startsWith('/admin/projects/new')) return 'Add New Project';
    if (pathname.includes('/edit') && pathname.includes('projects')) return 'Edit Project';
    if (pathname === '/admin/travel') return 'Travel Journal & Stories';
    if (pathname.startsWith('/admin/travel/new')) return 'Add Travel Story';
    if (pathname.includes('/edit') && pathname.includes('travel')) return 'Edit Travel Story';
    if (pathname === '/admin/socials') return 'Social Network Links';
    if (pathname === '/admin/contact') return 'Contact & Inquiries';
    if (pathname === '/admin/settings') return 'Website & SEO Settings';
    if (pathname === '/admin/profile') return 'Admin Account Profile';
    return 'CMS Dashboard';
  };

  const handlePreview = () => {
    window.open(settings.previewUrl || (import.meta as any).env?.VITE_PREVIEW_URL || 'https://hamid-portfolio-host.vercel.app', '_blank', 'noopener,noreferrer');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-8 bg-white/90 dark:bg-[#07100C]/90 backdrop-blur-md border-b border-zinc-200 dark:border-[#16261F] transition-all duration-300 ${
        collapsed ? 'lg:pl-24' : 'lg:pl-68'
      }`}
    >
      {/* Left side: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 min-w-0">
          <span className="hidden sm:inline">Admin</span>
          <ChevronRight className="w-3.5 h-3.5 hidden sm:inline shrink-0" />
          <span className="font-bold sm:font-semibold text-zinc-800 dark:text-zinc-200 truncate">
            {getPageTitle(location.pathname)}
          </span>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Preview Website Button */}
        <button
          type="button"
          onClick={handlePreview}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-all shadow-xs"
        >
          <ExternalLink className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span className="hidden sm:inline">↗ Preview Website</span>
          <span className="sm:hidden text-[11px]">Preview</span>
        </button>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-80 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-[#1E2E25] shadow-xl z-50 py-2 text-left">
                <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Recent Activity
                  </span>
                  <span className="text-[10px] text-emerald-500 font-medium">Live</span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {activities.map((act) => (
                    <div key={act.id} className="p-3 text-xs space-y-0.5 hover:bg-zinc-50 dark:hover:bg-[#0E1B15]">
                      <p className="font-medium text-zinc-800 dark:text-zinc-200">{act.action}</p>
                      <div className="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
                        <span className="text-emerald-600 dark:text-emerald-400">{act.section}</span>
                        <span>{act.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-emerald-500/40 transition-all"
          >
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
              }
              alt="Admin avatar"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-emerald-500/40"
            />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-[#1E2E25] shadow-xl z-50 py-1.5 text-left">
                <div className="px-3.5 py-2 border-b border-zinc-100 dark:border-zinc-800/80">
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                </div>
                <Link
                  to="/admin/profile"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#0E1B15]"
                >
                  <User className="w-4 h-4 text-zinc-400" />
                  Admin Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
