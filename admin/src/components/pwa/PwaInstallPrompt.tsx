import React, {useState} from 'react';
import {
  Download,
  Monitor,
  Smartphone,
  X,
  Chrome,
  Share,
  MoreVertical,
} from 'lucide-react';
import {usePwaInstall, type InstallPlatform} from '../../hooks/usePwaInstall';
import {cn} from '../../lib/utils';

interface PwaInstallPromptProps {
  className?: string;
  variant?: 'button' | 'sidebar' | 'card';
  compact?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function getInstallTitle(platform: InstallPlatform): string {
  if (platform === 'ios' || platform === 'android') {
    return 'Download Mobile App';
  }

  return 'Install Desktop App';
}

function getInstallLabel(platform: InstallPlatform): string {
  if (platform === 'ios' || platform === 'android') {
    return 'Download App';
  }

  return 'Install App';
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({
  className,
  variant = 'button',
  compact = false,
  onOpenChange,
}) => {
  const {shouldShowInstall, canNativeInstall, platform, install, isInstalled} =
    usePwaInstall();
  const [open, setOpen] = useState(false);

  if (!shouldShowInstall || isInstalled) {
    return null;
  }

  const setPanelOpen = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  const handleClick = async () => {
    if (canNativeInstall) {
      const accepted = await install();
      if (accepted) return;
    }

    setPanelOpen(true);
  };

  const triggerClassName =
    variant === 'sidebar'
      ? 'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors text-left'
      : variant === 'card'
        ? 'inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-lg shadow-emerald-950/20'
        : 'inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-all shadow-xs';

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={handleClick}
        className={triggerClassName}
        title={getInstallTitle(platform)}
      >
        <Download className={cn('shrink-0', variant === 'card' ? 'w-4 h-4' : 'w-3.5 h-3.5')} />
        {!compact && (
          <span className={variant === 'button' ? 'text-[11px] sm:text-xs' : undefined}>
            {getInstallLabel(platform)}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-[1px]" onClick={() => setPanelOpen(false)} />
          <div
            className={cn(
              'fixed z-[70] w-[calc(100vw-2rem)] max-w-md rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-[#1E2E25] shadow-2xl p-5 text-left',
              variant === 'sidebar'
                ? 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                : 'right-4 top-20 sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:translate-x-0 sm:translate-y-0'
            )}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500">
                  {platform === 'desktop' ? (
                    <Monitor className="w-5 h-5" />
                  ) : (
                    <Smartphone className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {getInstallTitle(platform)}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Install Admin CMS on your device
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close install panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {canNativeInstall ? (
              <div className="space-y-3">
                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  Your browser supports one-click install. Tap the button below to add the admin app.
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    const accepted = await install();
                    if (accepted) setPanelOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Install Now
                </button>
              </div>
            ) : (
              <InstallInstructions platform={platform} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

function InstallInstructions({platform}: {platform: InstallPlatform}) {
  if (platform === 'ios') {
    return (
      <ol className="space-y-3 text-xs text-zinc-600 dark:text-zinc-300">
        <li className="flex items-start gap-2.5">
          <Share className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>Open Safari and tap the <strong>Share</strong> button at the bottom.</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Download className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>Scroll down and choose <strong>Add to Home Screen</strong>.</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Smartphone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>Tap <strong>Add</strong>. The Admin CMS app will appear on your home screen.</span>
        </li>
      </ol>
    );
  }

  if (platform === 'android') {
    return (
      <ol className="space-y-3 text-xs text-zinc-600 dark:text-zinc-300">
        <li className="flex items-start gap-2.5">
          <MoreVertical className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>Open Chrome menu (three dots) at the top-right.</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Download className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.</span>
        </li>
        <li className="flex items-start gap-2.5">
          <Smartphone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>Confirm install. The app will open like a native mobile app.</span>
        </li>
      </ol>
    );
  }

  return (
    <ol className="space-y-3 text-xs text-zinc-600 dark:text-zinc-300">
      <li className="flex items-start gap-2.5">
        <Chrome className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <span>Use Chrome or Edge browser on this device.</span>
      </li>
      <li className="flex items-start gap-2.5">
        <Download className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <span>Look for the install icon in the address bar, or open browser menu and choose <strong>Install Admin CMS</strong>.</span>
      </li>
      <li className="flex items-start gap-2.5">
        <Monitor className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <span>After install, open it from your desktop or app list like software.</span>
      </li>
    </ol>
  );
}
