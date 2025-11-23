'use client';

import { useEffect, useState } from 'react';

interface GalleryItem {
  image: string;
  title?: string;
  description?: string;
}

export default function CaseGallery({ gallery, title }: { gallery: GalleryItem[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = () => setOpen(false);
  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setIndex((i) => (i + 1) % gallery.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {gallery.map((g, i) => (
          <button key={i} onClick={() => openAt(i)} className="bg-white rounded-md shadow focus:outline-none">
            <img src={g.image} alt={(g.title || title) + ` 图 ${i + 1}`} className="w-full h-40 object-contain p-4 bg-gray-50" />
            {(g.title || g.description) && (
              <div className="px-4 py-2 text-left">
                {g.title && <div className="text-sm font-semibold">{g.title}</div>}
                {g.description && <div className="text-xs text-gray-600 mt-1">{g.description}</div>}
              </div>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="relative max-w-4xl w-full mx-6">
            <img src={gallery[index].image} alt={gallery[index].title || title} className="w-full max-h-[70vh] object-contain bg-white rounded" />
            <div className="mt-3 bg-white/90 rounded p-3">
              <div className="text-base font-semibold">{gallery[index].title || title}</div>
              {gallery[index].description && <div className="text-sm text-gray-700 mt-1">{gallery[index].description}</div>}
            </div>
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={close} className="bg-white/90 text-gray-800 px-3 py-1 rounded">关闭</button>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button onClick={prev} className="bg-white/80 text-gray-800 px-3 py-2 rounded-l">上一张</button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button onClick={next} className="bg-white/80 text-gray-800 px-3 py-2 rounded-r">下一张</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}