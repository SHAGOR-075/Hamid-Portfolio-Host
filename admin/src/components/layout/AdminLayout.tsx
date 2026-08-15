import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-200 overflow-x-hidden">
      {/* Fixed Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Top Header */}
      <Topbar
        onToggleMobileSidebar={() => setMobileOpen(true)}
        collapsed={collapsed}
      />

      {/* Main Content Viewport */}
      <main
        className={`transition-all duration-300 min-h-[calc(100vh-4rem)] p-3.5 sm:p-6 lg:p-8 overflow-x-hidden ${
          collapsed ? 'lg:pl-24' : 'lg:pl-68'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
