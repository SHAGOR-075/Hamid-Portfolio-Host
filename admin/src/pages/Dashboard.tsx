import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Wrench,
  FolderGit2,
  GraduationCap,
  Compass,
  ArrowUpRight,
  Plus,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/common/Button';
import { storage } from '../services/storage';
import { Skill, Project, Education, TravelPost, ActivityLog } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [travel, setTravel] = useState<TravelPost[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    setSkills(storage.getSkills());
    setProjects(storage.getProjects());
    setEducation(storage.getEducation());
    setTravel(storage.getTravel());
    setActivities(storage.getActivities());
  }, []);

  // Skill category breakdown for chart
  const categoryCounts: Record<string, number> = {};
  skills.forEach((s) => {
    categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1;
  });

  const skillChartData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  const pieData = [
    { name: 'Featured Projects', value: projects.filter((p) => p.featured).length, color: '#10B981' },
    { name: 'Standard Projects', value: projects.filter((p) => !p.featured).length, color: '#059669' },
    { name: 'Travel Posts', value: travel.length, color: '#34D399' },
  ];

  const COLORS = ['#10B981', '#059669', '#34D399', '#6EE7B7', '#047857', '#A7F3D0'];

  return (
    <div className="space-y-8 text-left">
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#07100C] via-[#0B1511] to-[#07100C] border border-[#1A2E24] shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SaaS Portfolio CMS Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {user?.name || 'Admin'}
            </h1>
            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              Here’s what’s happening with your portfolio. All dynamic sections, media assets, and content blocks are synchronized and ready to publish.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(storage.getSettings().previewUrl || 'https://shagorahmed.dev', '_blank')}
              rightIcon={<ExternalLink className="w-4 h-4" />}
              className="w-full xs:w-auto justify-center"
            >
              Live Portfolio
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/admin/projects/new')}
              leftIcon={<Plus className="w-4 h-4" />}
              className="w-full xs:w-auto justify-center"
            >
              Add Project
            </Button>
          </div>
        </div>
      </div>

      {/* Primary Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Skills"
          value={skills.length}
          icon={<Wrench className="w-5 h-5" />}
          trend="8 Active Tech Stacks"
          description="• 95% Top Proficiency"
          onClick={() => navigate('/admin/skills')}
        />
        <StatCard
          label="Projects"
          value={projects.length}
          icon={<FolderGit2 className="w-5 h-5" />}
          trend={`${projects.filter((p) => p.featured).length} Featured ML`}
          description="• Live Deployments"
          onClick={() => navigate('/admin/projects')}
        />
        <StatCard
          label="Education"
          value={education.length}
          icon={<GraduationCap className="w-5 h-5" />}
          trend="B.Sc. CSE & Honors"
          description="• Timeline active"
          onClick={() => navigate('/admin/education')}
        />
        <StatCard
          label="Travel Posts"
          value={travel.length}
          icon={<Compass className="w-5 h-5" />}
          trend={`${travel.reduce((acc, t) => acc + (t.photos?.length || 0), 0)} Photos Logged`}
          description="• Multi-gallery active"
          onClick={() => navigate('/admin/travel')}
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/home')}
            className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-[#0E1B15] transition-all group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <Edit3 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Edit Home
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/skills')}
            className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-[#0E1B15] transition-all group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Add Skill
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/projects/new')}
            className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-[#0E1B15] transition-all group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Add Project
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/travel/new')}
            className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-[#0E1B15] transition-all group shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <Plus className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Add Travel
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Analytics Charts & Recent Updates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Content Distribution Visualizer */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Skills & Tech Stack Distribution
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Breakdown of competencies by technical area
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Balanced Profile</span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillChartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#71717A' }}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#71717A' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1511',
                    border: '1px solid #1E2E25',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {skillChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Recent Updates Stream */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Recent Updates
            </h3>
            <span className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wider">
              Activity Feed
            </span>
          </div>

          <div className="space-y-3.5">
            {activities.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-2.5 rounded-lg bg-zinc-50/50 dark:bg-[#07100C] border border-zinc-100 dark:border-zinc-800/60"
              >
                <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                    {log.action}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {log.section}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/admin/settings"
            className="block text-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
          >
            Manage System & CMS Settings →
          </Link>
        </div>
      </div>
    </div>
  );
};
