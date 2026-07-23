import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useContent } from '../../contexts/ContentContext';
import { sanitizeHtml } from '../../lib/sanitize';

const defaultBody = `
  <h2>مقدمة</h2>
  <p>تحترم شركة زجاج الرياض خصوصية زوارها وعملائها، وتلتزم بحماية أي بيانات شخصية يتم جمعها عبر هذا الموقع. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لبياناتك.</p>

  <h2>البيانات التي نجمعها</h2>
  <p>عند تعبئتك لنماذج التواصل أو طلب عرض السعر، قد نجمع: الاسم، رقم الجوال، نوع الخدمة المطلوبة، وأي تفاصيل إضافية تشاركها معنا طواعية.</p>

  <h2>كيفية استخدام البيانات</h2>
  <p>نستخدم البيانات المقدمة حصريًا للتواصل معك بخصوص طلبك أو استفسارك، وتقديم عروض الأسعار والمتابعة الخاصة بالخدمات التي تطلبها. لا نقوم ببيع أو مشاركة بياناتك مع أطراف ثالثة لأغراض تسويقية.</p>

  <h2>حماية البيانات</h2>
  <p>نتخذ إجراءات تقنية وتنظيمية معقولة لحماية بياناتك من الوصول أو الاستخدام أو الإفصاح غير المصرح به.</p>

  <h2>حقوقك</h2>
  <p>يحق لك في أي وقت طلب الاطلاع على البيانات التي قدمتها لنا أو طلب حذفها، وذلك عبر التواصل معنا مباشرة.</p>

  <h2>التواصل معنا</h2>
  <p>لأي استفسار بخصوص سياسة الخصوصية هذه، يرجى التواصل معنا عبر صفحة "تواصل معنا".</p>
`;

export default function PrivacyPolicy() {
  const { getContent } = useContent();
  const content = getContent('privacy_policy_body');
  const body = content?.body || defaultBody;

  return (
    <>
      <SEO title="سياسة الخصوصية | شركة زجاج الرياض" description="سياسة الخصوصية الخاصة بموقع شركة زجاج الرياض." />
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">سياسة الخصوصية</h1>
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}
        />
      </main>
      <Footer />
    </>
  );
}
