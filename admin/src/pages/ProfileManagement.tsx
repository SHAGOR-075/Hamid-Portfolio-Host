import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { ImageUploader } from '../components/common/ImageUploader';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Shield,
  Key,
  Save,
  Lock,
  Clock,
  Laptop,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfileManagement: React.FC = () => {
  const { user, updateProfile, changePassword } = useAuth();

  // Profile info state
  const [name, setName] = useState(user?.name || 'Abdul Hamid Khokon');
  const [email, setEmail] = useState(user?.email || 'hamidkhokon8@gmail.com');
  const [avatar, setAvatar] = useState(
    user?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Name and email are required');
      return;
    }
    setIsUpdatingProfile(true);
    try {
      await updateProfile({ name, email, avatar });
      toast.success('Admin profile credentials updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error('Current password is required');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        toast.success('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      <PageHeader
        title="Admin Profile & Security"
        subtitle="Manage administrator identity, credentials, root master access, and security logs."
        badge="Account Security"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Info Form */}
        <form
          onSubmit={handleSaveProfile}
          className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5"
        >
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-500" />
            <span>Administrator Identity</span>
          </h2>

          <div className="space-y-4">
            <Input
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Abdul Hamid Khokon"
              required
            />
            <Input
              label="Admin Email (Login ID)"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hamidkhokon8@gmail.com"
              required
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Role & Authority Level
              </label>
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Super Administrator (Root)
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-mono text-[10px]">
                  Full Access
                </span>
              </div>
            </div>

            <ImageUploader
              label="Avatar Thumbnail"
              value={avatar}
              onChange={(url) => setAvatar(url)}
              aspectRatio="square"
              helperText="Small square avatar for the topbar profile menu."
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isUpdatingProfile}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Update Profile Info
            </Button>
          </div>
        </form>

        {/* Change Password Form */}
        <form
          onSubmit={handleChangePassword}
          className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5"
        >
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-500" />
            <span>Change Master Password</span>
          </h2>

          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password (demo: admin123)"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Default demo credential is <strong>admin123</strong>. After updating, use your new password on the next login.
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isChangingPassword}
              leftIcon={<Shield className="w-4 h-4" />}
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>

      {/* Security Sessions / Logs Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
          <Laptop className="w-5 h-5 text-emerald-500" />
          <span>Active Sessions & Security Activity</span>
        </h2>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">
                  Current Web Browser Session (Chrome / macOS / Linux)
                </p>
                <p className="text-zinc-400">IP: 192.168.1.104 • AI Studio Preview Host</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 font-semibold font-mono">
              Active Now
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-zinc-800 dark:text-zinc-200">
                  JWT Session Token Refreshed
                </p>
                <p className="text-zinc-400">Authenticated via Secure Storage Interceptor</p>
              </div>
            </div>
            <span className="text-zinc-400 font-mono">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};
