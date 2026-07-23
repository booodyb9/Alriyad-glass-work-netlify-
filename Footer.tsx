import { Link } from "react-router-dom";
import { Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-400 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="col-span-1 md:col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-[#0284C7]" />
              <span className="font-bold text-xl text-white">شركة زجاج الرياض</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              شركتك الموثوقة لجميع أعمال وتوريدات الزجاج في مدينة الرياض. نقدم الجودة والإتقان بأسعار تنافسية تلبي احتياجات مشاريعكم السكنية والتجارية.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#0284C7] transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="hover:text-[#0284C7] transition-colors">من نحن</Link></li>
              <li><Link to="/services" className="hover:text-[#0284C7] transition-colors">خدماتنا</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#0284C7] transition-colors">أعمالنا</Link></li>
              <li><Link to="/contact" className="hover:text-[#0284C7] transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">موارد</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-[#0284C7] transition-colors">المدونة</Link></li>
              <li><Link to="/testimonials" className="hover:text-[#0284C7] transition-colors">آراء العملاء</Link></li>
              <li><Link to="/faq" className="hover:text-[#0284C7] transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link to="/request-quote" className="hover:text-[#0284C7] transition-colors">اطلب تسعيرة</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">خدماتنا</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-[#0284C7] transition-colors">الواجهات الزجاجية</Link></li>
              <li><Link to="/services" className="hover:text-[#0284C7] transition-colors">القواطع المكتبية</Link></li>
              <li><Link to="/services" className="hover:text-[#0284C7] transition-colors">كبائن الشاور</Link></li>
              <li><Link to="/services" className="hover:text-[#0284C7] transition-colors">الأبواب والنوافذ</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <h4 className="text-white font-bold tracking-widest uppercase text-sm mb-6">نطاق التغطية</h4>
            <div className="rounded-sm overflow-hidden border border-gray-800 relative h-32 group block bg-gray-900">
              <a href="https://maps.google.com/maps?q=Riyadh&t=&z=10" target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <iframe 
                  src="https://maps.google.com/maps?q=Riyadh&t=&z=10&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ border: 0 }} 
                  loading="lazy"
                  title="خريطة الرياض"
                ></iframe>
                <div className="absolute inset-0 bg-[#0284C7]/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <div className="bg-[#0F172A]/90 text-white text-xs font-bold px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity border border-[#0284C7]/30 shadow-lg">
                    عرض على خرائط جوجل
                  </div>
                </div>
              </a>
            </div>
            <p className="text-xs mt-3 text-gray-500">نغطي جميع أحياء مدينة الرياض وضواحيها</p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-sm text-center md:text-right flex flex-col md:flex-row justify-between items-center gap-4">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} شركة زجاج الرياض</p>
          <div className="flex gap-4 items-center flex-wrap justify-center">
            <Link to="/privacy-policy" className="hover:text-[#0284C7] transition-colors">سياسة الخصوصية</Link>
            <span className="text-gray-700">|</span>
            <Link to="/terms" className="hover:text-[#0284C7] transition-colors">الشروط والأحكام</Link>
            <span className="text-gray-700">|</span>
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
