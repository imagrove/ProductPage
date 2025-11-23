'use client';

import { useState, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';

export default function ContactModal({ label = '提交咨询' }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={openModal}
        className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={closeModal}>
          <div className="relative max-w-xl w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded shadow">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">联系表单</h3>
                <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">✕</button>
              </div>
              <div className="p-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}