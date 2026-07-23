import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Testimonials from '../../components/Testimonials';

export default function TestimonialsPage() {
  return (
    <>
      <SEO title="آراء العملاء | شركة زجاج الرياض" description="تعرف على تجارب عملائنا مع خدمات تركيب الزجاج والمرايا والواجهات." />
      <Navbar />
      <main className="pt-20">
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
