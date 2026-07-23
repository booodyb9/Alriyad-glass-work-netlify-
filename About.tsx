import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useContent } from '../../contexts/ContentContext';
import { sanitizeHtml } from '../../lib/sanitize';
import { Award, Users, Clock, ShieldCheck } from 'lucide-react';

const defaultBody = `
  <p>شركة زجاج الرياض هي إحدى الشركات الرائدة في مجال تركيب الواجهات الزجاجية، القواطع، كبائن الشاور، والمرايا الديكورية في مدينة الرياض. نعمل منذ سنوات على تقديم حلول زجاجية عالية الجودة تجمع بين الفخامة والمتانة، لتلبية احتياجات عملائنا من الأفراد والشركات على حد سواء.</p>
  <p>يعتمد فريقنا على أحدث المعدات والتقنيات في التصنيع والتركيب، مع الالتزام بأعلى معايير السلامة والجودة في كل مشروع، بدءًا من المعاينة الأولية وحتى التسليم النهائي.</p>
  <p>نفخر بثقة عملائنا التي بنيناها عبر سنوات من الالتزام بالمواعيد، الشفافية في التسعير، وجودة التنفيذ التي تدوم.</p>
`;

const stats = [
  { icon: Award, label: 'سنوات خبرة', value: '+10' },
  { icon: Users, label: 'عميل راضٍ', value: '+500' },
  { icon: Clock, label: 'تسليم في الموعد', value: '%98' },
  { icon: ShieldCheck, label: 'ضمان على التركيب', value: '10 سنوات' },
];

export default function About() {
  const { getContent } = useContent();
  const aboutContent = getContent('about_intro');
  const body = aboutContent?.body || defaultBody;

  return (
    <>
      <SEO title="من نحن | شركة زجاج الرياض" description="تعرف على شركة زجاج الرياض، خبرتنا في تركيب الواجهات والقواطع الزجاجية والمرايا في الرياض." />
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">من نحن</h1>

        <div
          className="prose prose-lg max-w-none text-gray-700 mb-12"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-6 text-center border border-gray-100">
              <stat.icon className="w-8 h-8 text-[#0284C7] mx-auto mb-3" />
              <div className="text-2xl font-extrabold text-[#0F172A]">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
