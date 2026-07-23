import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useContent } from '../../contexts/ContentContext';
import { sanitizeHtml } from '../../lib/sanitize';

export default function ServiceDetails() {
  const { slug } = useParams();
  const { getContent, loading: contentLoading } = useContent();
  const [service, setService] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (contentLoading) return;
    const servicesContent = getContent('services_items');
    if (servicesContent && servicesContent.body) {
      try {
        const services = JSON.parse(servicesContent.body);
        const found = services.find((s: any) => s.title === decodeURIComponent(slug || ''));
        if (found) {
          setService(found);
        } else {
          setNotFound(true);
        }
      } catch (e) {
        console.error('Failed to parse services content:', e);
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
  }, [slug, getContent, contentLoading]);

  if (contentLoading || (!service && !notFound)) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">جاري التحميل...</h1>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !service) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">الخدمة غير موجودة</h1>
          <Link to="/services" className="text-[#0284C7] hover:underline font-bold">العودة للخدمات</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${service.title} | شركة زجاج الرياض`} 
        description={service.description}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {service.image && (
            <div className="h-[400px] w-full overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{service.title}</h1>
            <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.description) }} />
            
            <div className="mt-12 flex gap-4">
              <a href="https://wa.me/966510233706" className="bg-[#0284C7] text-white px-8 py-3 rounded-md hover:bg-[#0369A1] transition-colors font-bold text-center inline-block">
                طلب تسعيرة لهذه الخدمة
              </a>
              <Link to="/services" className="bg-gray-100 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-200 transition-colors font-bold text-center inline-block">
                العودة للخدمات
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
