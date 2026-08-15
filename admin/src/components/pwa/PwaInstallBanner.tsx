import React, {useState} from 'react';
import {Download, X} from 'lucide-react';
import {usePwaInstall} from '../../hooks/usePwaInstall';
import {PwaInstallPrompt} from './PwaInstallPrompt';

export const PwaInstallBanner: React.FC = () => {
  const {shouldShowInstall, platform} = usePwaInstall();
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('pwa_banner_dismissed') === 'true'
  );

  if (!shouldShowInstall || dismissed) {
    return null;
  }

  const title =
    platform === 'ios' || platform === 'android'
      ? 'Install Admin CMS on your phone'
      : 'Install Admin CMS on your computer';

  return (
    <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
      <div className="flex items-start gap-3 min-w-0">
        <div className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 shrink-0">
          <Download className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            {title}
          </p>
          <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80">
            Use it like a mobile app or desktop software without opening the browser every time.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <PwaInstallPrompt variant="card" className="w-full sm:w-auto" />
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            sessionStorage.setItem('pwa_banner_dismissed', 'true');
          }}
          className="p-2 rounded-lg text-emerald-700/70 dark:text-emerald-300/70 hover:bg-emerald-500/10"
          aria-label="Dismiss install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
