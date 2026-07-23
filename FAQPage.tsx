import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';

export default function FAQPage() {
  return (
    <>
      <SEO title="الأسئلة الشائعة | شركة زجاج الرياض" description="إجابات على أكثر الأسئلة شيوعًا حول خدمات تركيب الزجاج والمرايا والواجهات." />
      <Navbar />
      <main className="pt-20">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
