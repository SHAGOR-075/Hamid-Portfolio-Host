import React, {useState} from 'react';
import {Download, Smartphone, X} from 'lucide-react';
import {usePwaInstall} from '../../hooks/usePwaInstall';
import {cn} from '../../lib/utils';

interface PwaInstallButtonProps {
  className?: string;
  showLabel?: boolean;
}

export const PwaInstallButton: React.FC<PwaInstallButtonProps> = ({
  className,
  showLabel = true,
}) => {
  const {canInstall, isInstalled, isIos, install, dismiss} = usePwaInstall();
  const [showIosHelp, setShowIosHelp] = useState(false);

  if (isInstalled || !canInstall) {
    return null;
  }

  const handleClick = async () => {
    if (isIos) {
      setShowIosHelp((current) => !current);
      return;
    }

    await install();
  };

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-all shadow-xs"
        title="Install Admin App"
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        {showLabel && <span className="hidden sm:inline">Install App</span>}
      </button>

      {showIosHelp && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowIosHelp(false)}
          />
          <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-[#1E2E25] shadow-xl z-50 p-4 text-left">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Install on iOS
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowIosHelp(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                aria-label="Close install help"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ol className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300 list-decimal list-inside">
              <li>Tap the Share button in Safari</li>
              <li>Scroll down and choose Add to Home Screen</li>
              <li>Tap Add to install the admin app</li>
            </ol>
            <button
              type="button"
              onClick={dismiss}
              className="mt-3 text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              Don&apos;t show again
            </button>
          </div>
        </>
      )}
    </div>
  );
};
