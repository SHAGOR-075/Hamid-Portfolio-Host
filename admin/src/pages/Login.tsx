import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { PwaInstallButton } from '../components/pwa/PwaInstallButton';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rawFrom = (location.state as any)?.from?.pathname;
  const targetDestination =
    rawFrom && rawFrom !== '/login' && rawFrom !== '/admin/login' ? rawFrom : '/admin/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(targetDestination, { replace: true });
    }
  }, [isAuthenticated, navigate, targetDestination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setIsLoading(true);
    const success = await login({ email, password, rememberMe });
    setIsLoading(false);

    if (success) {
      navigate(targetDestination, { replace: true });
    } else {
      setError('Invalid credentials. Please use admin@example.com / admin123');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    toast.success('Demo credentials loaded');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050505] text-zinc-100 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-700/5 rounded-full blur-2xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md bg-[#0B1511] border border-[#1E2E25] rounded-2xl p-8 sm:p-10 shadow-2xl shadow-emerald-950/20 z-10 text-left">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-950/50 mb-2">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            PORTFOLIO CMS
          </h1>
          <p className="text-xs font-medium tracking-wide uppercase text-emerald-400">
            Admin Panel Access
          </p>
          <div className="flex justify-center pt-2">
            <PwaInstallButton />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<Lock className="w-4 h-4" />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-500 hover:text-zinc-300 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-zinc-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-zinc-700 bg-[#07100C] text-emerald-500 focus:ring-emerald-500/40 w-4 h-4 accent-emerald-500"
              />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => toast('Use default demo credentials below', { icon: 'ℹ️' })}
              className="text-emerald-400 hover:text-emerald-300 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </form>

        {/* Demo Credentials Quick Fill Box */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Default Test Account:</span>
          </div>
          <p className="text-xs font-mono text-zinc-300">
            admin@example.com / admin123
          </p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs font-medium text-emerald-400 hover:underline inline-block pt-1"
          >
            Auto-fill demo credentials
          </button>
        </div>
      </div>
    </div>
  );
};
