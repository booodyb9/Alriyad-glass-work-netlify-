import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useContent } from '../../contexts/ContentContext';
import { sanitizeHtml } from '../../lib/sanitize';

const defaultBody = `
  <h2>الشروط العامة</h2>
  <p>باستخدامك لهذا الموقع أو طلبك لأي من خدماتنا، فإنك توافق على الشروط والأحكام الموضحة أدناه.</p>

  <h2>الخدمات</h2>
  <p>تقدم شركة زجاج الرياض خدمات تركيب الواجهات الزجاجية، القواطع، كبائن الشاور، المرايا الديكورية، والدرابزين الزجاجي. يتم تحديد نطاق العمل والتكلفة النهائية بعد المعاينة الفعلية للموقع.</p>

  <h2>عروض الأسعار</h2>
  <p>عروض الأسعار المقدمة عبر الموقع هي تقديرية وقابلة للتغيير بناءً على المعاينة الفعلية للموقع والمواصفات النهائية المتفق عليها مع العميل.</p>

  <h2>الضمان</h2>
  <p>نقدم ضمانًا على جودة الزجاج المستخدم وجودة التركيب، وفقًا للتفاصيل المتفق عليها في عقد كل مشروع على حدة.</p>

  <h2>الإلغاء والتعديل</h2>
  <p>يحق للعميل طلب إلغاء أو تعديل الطلب قبل بدء التنفيذ الفعلي، مع مراعاة أي تكاليف تم تكبدها بالفعل (مثل شراء المواد المخصصة).</p>

  <h2>التواصل</h2>
  <p>لأي استفسار بخصوص هذه الشروط، يرجى التواصل معنا عبر صفحة "تواصل معنا".</p>
`;

export default function Terms() {
  const { getContent } = useContent();
  const content = getContent('terms_body');
  const body = content?.body || defaultBody;

  return (
    <>
      <SEO title="الشروط والأحكام | شركة زجاج الرياض" description="الشروط والأحكام الخاصة بموقع وخدمات شركة زجاج الرياض." />
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">الشروط والأحكام</h1>
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}
        />
      </main>
      <Footer />
    </>
  );
}
