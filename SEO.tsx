import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  path?: string;
  structuredData?: any;
}

export default function SEO({ title, description, keywords, image, path = '', structuredData }: SEOProps) {
  const { language } = useLanguage();
  const defaultSeoData = {
    ar: {
      title: 'شركة زجاج الرياض | تركيب زجاج الرياض | واجهات، كبائن شاور، ومرايا',
      description: 'شركة زجاج الرياض لتركيب وتفصيل الزجاج في الرياض. متخصصون في الواجهات الزجاجية (ستركشر)، القواطع المكتبية، كبائن الشاور، المرايا الديكورية، وزجاج السيكوريت بأسعار منافسة وجودة عالية.',
      keywords: 'زجاج الرياض, شركة زجاج الرياض, تركيب زجاج بالرياض, محلات زجاج في الرياض, مصنع زجاج الرياض, زجاج سيكوريت الرياض, تفصيل زجاج بالرياض, كبائن شاور الرياض, واجهات زجاجية الرياض, قواطع زجاجية للمكاتب, مرايا ديكور الرياض, أبواب زجاجية',
    },
    en: {
      title: 'Riyadh Glass Company | Glass Installation Riyadh | Facades & Partitions',
      description: 'Riyadh Glass Company for glass installation and fabrication in Riyadh. We specialize in structural glass facades, office partitions, shower cabins, decorative mirrors, and tempered glass with high quality and competitive prices.',
      keywords: 'Riyadh Glass Company, glass Riyadh, glass installation Riyadh, glass shops in Riyadh, glass factory Riyadh, tempered glass Riyadh, custom glass Riyadh, shower cabins Riyadh, glass facades Riyadh, office glass partitions, decorative mirrors Riyadh',
    }
  };

  const defaultData = defaultSeoData[language];
  const pageTitle = title ? `${title}` : defaultData.title;
  const pageDescription = description || defaultData.description;
  const pageKeywords = keywords || defaultData.keywords;
  
  // Update domain here if needed
  const baseUrl = 'https://riyadhglass.com';
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/og-image.jpg`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "شركة زجاج الرياض",
    "image": ogImage,
    "description": pageDescription,
    "url": baseUrl,
    "telephone": "+966510233706",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "الرياض",
      "addressCountry": "SA"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={language === 'ar' ? 'شركة زجاج الرياض' : 'Riyadh Glass Company'} />

      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="fDAXcSUws--VipnkqaDbj574LpBOVvs-jTNC4wZQW7w" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={language === 'ar' ? 'شركة زجاج الرياض' : 'Riyadh Glass Company'} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_SA' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
}
