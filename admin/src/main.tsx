import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {registerSW} from 'virtual:pwa-register';
import toast from 'react-hot-toast';
import App from './App.tsx';
import './index.css';

registerSW({
  immediate: true,
  onNeedRefresh() {
    toast(
      (t) => (
        <span className="flex items-center gap-3">
          <span>New version available</span>
          <button
            type="button"
            className="px-2 py-1 text-xs font-semibold rounded-md bg-emerald-500 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              window.location.reload();
            }}
          >
            Reload
          </button>
        </span>
      ),
      {duration: Infinity}
    );
  },
  onOfflineReady() {
    toast.success('Admin app is ready for offline use');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
