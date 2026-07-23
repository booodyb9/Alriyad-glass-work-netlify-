import { useState } from 'react';
import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { supabase } from '../../lib/supabase';
import { CheckCircle2 } from 'lucide-react';

export default function RequestQuote() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const { error } = await supabase.from('messages').insert({
        name: formData.name,
        phone: formData.phone,
        service: formData.service,
        message: formData.message || 'طلب عرض سعر (بدون تفاصيل إضافية)',
      });
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <SEO title="طلب عرض سعر | شركة زجاج الرياض" description="اطلب عرض سعر مجاني لمشروعك من شركة زجاج الرياض، وسيتواصل معك فريقنا في أقرب وقت." />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">طلب عرض سعر</h1>
        <p className="text-gray-600 mb-8">املأ البيانات التالية وسيتواصل معك فريقنا خلال 24 ساعة لتقديم عرض سعر دقيق لمشروعك.</p>

        {status === 'success' ? (
          <div className="bg-white shadow rounded-lg p-8 text-center border border-gray-100">
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">تم استلام طلبك بنجاح</h2>
            <p className="text-gray-600">سيتواصل معك فريقنا في أقرب وقت ممكن.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-5 border border-gray-100">
            <div>
              <label htmlFor="rq-name" className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
              <input
                id="rq-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0284C7] transition-colors bg-[#F9FAFB] outline-none"
              />
            </div>

            <div>
              <label htmlFor="rq-phone" className="block text-sm font-bold text-gray-700 mb-2">رقم الجوال</label>
              <input
                id="rq-phone"
                type="tel"
                required
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+966 5X XXX XXXX"
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0284C7] transition-colors bg-[#F9FAFB] outline-none text-right"
              />
            </div>

            <div>
              <label htmlFor="rq-service" className="block text-sm font-bold text-gray-700 mb-2">نوع الخدمة المطلوبة</label>
              <select
                id="rq-service"
                required
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0284C7] transition-colors bg-[#F9FAFB] outline-none appearance-none"
              >
                <option value="">اختر الخدمة...</option>
                <option value="facade">واجهات زجاجية</option>
                <option value="partition">قواطع مكتبية</option>
                <option value="doors">أبواب ونوافذ</option>
                <option value="shower">كبائن شاور</option>
                <option value="mirrors">مرايا ديكور</option>
                <option value="railing">درابزين زجاج</option>
                <option value="other">أخرى</option>
              </select>
            </div>

            <div>
              <label htmlFor="rq-message" className="block text-sm font-bold text-gray-700 mb-2">تفاصيل إضافية (اختياري)</label>
              <textarea
                id="rq-message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="مساحة المشروع، الموقع، أي تفاصيل تساعدنا في تحديد السعر بدقة..."
                className="w-full px-4 py-3 border-2 border-gray-200 focus:border-[#0284C7] transition-colors bg-[#F9FAFB] outline-none resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm">حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-[#0284C7] text-white font-bold py-3 hover:bg-[#0369A1] transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
