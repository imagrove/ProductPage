'use client';

import ContactModal from '@/components/ContactModal';

export const CONTACT_CTA_DESCRIPTION = '如果您对我们的公司或产品有任何疑问，欢迎随时联系我们。我们将竭诚为您提供专业的咨询和服务。';

export default function ContactCTASection({ description, className, title = '联系我们', buttonLabel = '提交咨询' }: { description?: string; className?: string; title?: string; buttonLabel?: string }) {
  const desc = description ?? CONTACT_CTA_DESCRIPTION;
  return (
    <section className={`py-12 sm:py-16 bg-blue-50 ${className || ''}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{desc}</p>
        <ContactModal label={buttonLabel} />
      </div>
    </section>
  );
}