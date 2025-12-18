'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';

interface DownloadButtonProps {
  onDownload: () => Promise<void>;
  label?: string;
  className?: string;
}

export default function DownloadButton({
  onDownload,
  label = 'PDF로 저장하기',
  className = '',
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClick = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      await onDownload();
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      // 약간의 딜레이 후 상태 복구 (UX 향상)
      setTimeout(() => {
        setIsDownloading(false);
      }, 500);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDownloading}
      className={`
        w-full py-3 rounded-2xl font-medium transition-all flex items-center justify-center gap-2
        ${isDownloading
          ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
        }
        ${className}
      `}
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          다운로드 중...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          {label}
        </>
      )}
    </button>
  );
}
