import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { sanitizeHtml } from '../../lib/sanitize';
import { supabase } from '../../lib/supabase';

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);

    const fetchProject = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('title', decodeURIComponent(slug || ''))
          .maybeSingle();
        if (error) throw error;
        if (!active) return;
        if (data) {
          setProject(data);
        } else {
          setNotFound(true);
        }
      } catch (e) {
        console.error('Failed to fetch project:', e);
        if (active) setNotFound(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProject();
    return () => { active = false; };
  }, [slug]);

  if (loading) {
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

  if (notFound || !project) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-12 px-4 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">المشروع غير موجود</h1>
          <Link to="/portfolio" className="text-[#0284C7] hover:underline font-bold">العودة لمعرض الأعمال</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${project.title} | شركة زجاج الرياض`}
        description={project.description}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {project.image && (
            <div className="h-[500px] w-full overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{project.title}</h1>
              {project.category && (
                <span className="bg-[#0284C7]/10 text-[#0284C7] px-4 py-2 rounded-full font-bold text-sm">
                  {project.category}
                </span>
              )}
            </div>
            <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: sanitizeHtml(project.description) }} />

            <div className="mt-12">
              <Link to="/portfolio" className="bg-gray-100 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-200 transition-colors font-bold text-center inline-block">
                العودة لمعرض الأعمال
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
