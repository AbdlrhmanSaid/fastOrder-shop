import Link from "next/link";
import { Phone, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* معلومات التواصل */}
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+201234567890"
                className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>01016113879 - 01206734290</span>
              </a>
              <Link
                href="https://asportfolio-mu.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300"
              >
                <User className="w-5 h-5" />
                <span>Abdelrhman Saeid</span>
              </Link>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="hover:text-indigo-400 transition-colors text-slate-300"
              >
                الرئيسية
              </Link>
              <Link
                href="/products"
                className="hover:text-indigo-400 transition-colors text-slate-300"
              >
                المنتجات
              </Link>
              <Link
                href="/offers"
                className="hover:text-indigo-400 transition-colors text-slate-300"
              >
                العروض
              </Link>
              <Link
                href="/track-order"
                className="hover:text-indigo-400 transition-colors text-slate-300"
              >
                تتبع الطلب
              </Link>
            </div>
          </div>

          {/* عن المتجر */}
          <div>
            <h3 className="text-xl font-bold mb-4">عن FastOrder</h3>
            <p className="text-gray-300 leading-relaxed">
              تطبيق FastOrder يوفر لك أسرع تجربة لطلب احتياجاتك أونلاين بضغطة
              زر. نوفر خدمة التوصيل لجميع المناطق بجودة وسرعة استثنائية.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© 2026 FastOrder. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
