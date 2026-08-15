import React, { useState, useRef } from 'react';
import { Upload, X, RefreshCw, Image as ImageIcon, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';
import toast from 'react-hot-toast';

export interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  className?: string;
  maxSizeMB?: number;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label,
  helperText = 'Allowed formats: JPG, JPEG, PNG, WEBP (Max 5MB)',
  aspectRatio = 'auto',
  className,
  maxSizeMB = 5,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClass = {
    square: 'aspect-square max-w-[240px]',
    video: 'aspect-video max-w-md',
    portrait: 'aspect-[3/4] max-w-[240px]',
    auto: 'min-h-[160px] max-w-md',
  }[aspectRatio];

  const validateAndProcessFile = (file: File) => {
    setError(null);
    if (!ALLOWED_TYPES.includes(file.type)) {
      const err = 'Unsupported format. Please upload JPG, PNG or WEBP.';
      setError(err);
      toast.error(err);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      const err = `Image file exceeds maximum allowed size of ${maxSizeMB}MB.`;
      setError(err);
      toast.error(err);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onChange(e.target.result);
        toast.success('Image uploaded successfully');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput('');
    setIsUrlMode(false);
    toast.success('Image URL applied');
  };

  return (
    <div className={cn('w-full space-y-2 text-left', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setIsUrlMode(!isUrlMode)}
            className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <LinkIcon className="w-3 h-3" />
            {isUrlMode ? 'Upload from computer' : 'Paste web URL'}
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {isUrlMode ? (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="flex-1 rounded-lg text-sm bg-white dark:bg-[#0B1511] text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <Button type="submit" size="sm">
            Apply
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsUrlMode(false)}
          >
            Cancel
          </Button>
        </form>
      ) : value ? (
        /* Preview with Action Controls */
        <div className="relative group rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900">
          <div className={cn('relative w-full flex items-center justify-center overflow-hidden', aspectClass)}>
            <img
              src={value}
              alt="Uploaded Preview"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-lg"
              onError={() => setError('Image failed to load from provided URL.')}
            />

            {/* Overlay buttons */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5 p-4">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => {
                  onChange('');
                  toast.success('Image removed');
                }}
                leftIcon={<X className="w-3.5 h-3.5" />}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 text-center',
            isDragging
              ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-950/20'
              : 'border-zinc-300 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#0B1511]/40 hover:border-emerald-500/60 dark:hover:border-emerald-500/40 hover:bg-zinc-100/50 dark:hover:bg-[#0B1511]'
          )}
        >
          <div className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 mb-3 shadow-xs">
            <Upload className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Click to upload <span className="text-zinc-500 font-normal">or drag & drop</span>
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{helperText}</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
