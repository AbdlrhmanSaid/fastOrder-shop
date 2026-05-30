import Image from "next/image";
import Link from "next/link";
import { getProducts, getOffers } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import OfferCard from "@/components/OfferCard";
import { ArrowLeft, ShoppingBag, Tag, Truck } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let products = [];
  let offers = [];

  try {
    products = await getProducts();
    offers = await getOffers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // عرض أول 4 منتجات فقط
  const featuredProducts = products.slice(0, 4);
  // عرض أول 3 عروض فقط
  const featuredOffers = offers.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 flex items-center justify-center overflow-hidden bg-slate-900">
        {/* خلفية داكنة ثابتة */}
        <div className="absolute inset-0 bg-slate-900 h-screen"></div>
        {/* أشكال هندسية خفيفة جداً لكسر الملل مع الالتزام بالألوان الثابتة */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-600 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="relative container mx-auto px-6 z-10 flex flex-col items-center text-center h-screen">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
              أسرع وأسهل <br />
              <span className="text-indigo-500 block mt-2">طريقة للطلب</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed">
              نظام FastOrder لطلب احتيجاتك المفضلة أونلاين. نوفر لك أسرع تجربة
              توصيل وأفضل العروض في مدينتك.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="group bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black text-lg md:text-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-xl shadow-indigo-900/50"
              >
                اطلب الآن
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
              </Link>

              <Link
                href="/offers"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-lg md:text-xl transition-all flex items-center gap-3"
              >
                تصفح العروض
                <Tag className="w-6 h-6" />
              </Link>
            </div>

            {/* المميزات */}
            <div className="mt-16 flex flex-wrap justify-center gap-4 md:gap-6 text-white/90">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10 shadow-sm">
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                <span className="text-sm md:text-base font-bold">
                  توصيل سريع
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10 shadow-sm">
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                <span className="text-sm md:text-base font-bold">
                  جودة مضمونة
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10 shadow-sm">
                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                <span className="text-sm md:text-base font-bold">
                  عروض يومية
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* مميزات الخدمة */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <ShoppingBag className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                خيارات متنوعة
              </h3>
              <p className="text-slate-500 font-medium">
                تصفح قائمة واسعة من المنتجات والوجبات بكل سهولة
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                <Truck className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                توصيل سريع
              </h3>
              <p className="text-slate-500 font-medium">
                نوصل طلبك لجميع المناطق في أسرع وقت وفي أفضل حالة
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <Tag className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                عروض حصرية
              </h3>
              <p className="text-slate-500 font-medium">
                استمتع بخصومات وعروض مميزة بشكل يومي
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* العروض المميزة */}
      {featuredOffers.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                العروض المميزة
              </h2>
              <Link
                href="/offers"
                className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2"
              >
                عرض الكل
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredOffers.map((offer: any) => (
                <OfferCard key={offer._id} offer={offer} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* المنتجات المميزة */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                المنتجات المميزة
              </h2>
              <Link
                href="/products"
                className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-2"
              >
                عرض الكل
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* رسالة إذا لم تكن هناك بيانات */}
      {products.length === 0 && offers.length === 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                جاري تحميل المنتجات...
              </h3>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
