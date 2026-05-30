"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import {
  ShoppingCart,
  Check,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      unit: product.unit,
      image: images[0] || "",
      type: "product",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const prevImage = () =>
    setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16" dir="rtl">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* ---- قسم الصور ---- */}
            <div className="bg-gray-50 p-6 flex flex-col gap-4">
              {/* الصورة الرئيسية */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                {images.length > 0 ? (
                  <Image
                    src={images[activeIdx]}
                    alt={`${product.name} - صورة ${activeIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-4"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    لا توجد صورة
                  </div>
                )}

                {/* أسهم التنقل بين الصور */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-indigo-600 transition-colors z-10"
                      aria-label="الصورة السابقة"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-indigo-600 transition-colors z-10"
                      aria-label="الصورة التالية"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* مؤشر رقم الصورة */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {activeIdx + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* الصور المصغرة */}
              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        activeIdx === idx
                          ? "border-indigo-500 shadow-md shadow-indigo-100"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                      aria-label={`صورة ${idx + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ---- تفاصيل المنتج ---- */}
            <div className="p-6 md:p-8 flex flex-col">
              {/* الاسم */}
              <div className="mb-2">
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-bold">
                  {product.unit}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">
                {product.name}
              </h1>

              {/* الوصف */}
              {product.description && (
                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5 border-b border-gray-100 pb-5">
                  {product.description}
                </p>
              )}

              {/* السعر */}
              <div className="mb-6">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                  السعر
                </p>
                <span className="text-4xl font-black text-indigo-600 flex items-baseline gap-2">
                  {product.price}
                  <span className="text-base font-medium text-gray-500">
                    جنيه / {product.unit}
                  </span>
                </span>
              </div>

              {/* حالة التوفر */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    متوفر في المخزن
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold border border-red-200">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    غير متوفر حالياً
                  </span>
                )}
              </div>

              {product.inStock && (
                <div className="mt-auto space-y-4">
                  {/* التحكم في الكمية */}
                  <div>
                    <p className="text-sm font-bold text-gray-600 mb-2">
                      الكمية
                    </p>
                    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3 border border-gray-100 w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-red-500 shadow-sm border border-gray-100 transition-colors"
                        aria-label="تقليل الكمية"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-black text-gray-800 min-w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-indigo-600 shadow-sm border border-gray-100 transition-colors"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* الإجمالي */}
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-indigo-700">
                        الإجمالي
                      </span>
                      <span className="text-2xl font-black text-indigo-700">
                        {(product.price * quantity).toLocaleString("ar-EG")}{" "}
                        <span className="text-sm font-medium">جنيه</span>
                      </span>
                    </div>
                  </div>

                  {/* زر الإضافة */}
                  <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`w-full py-4 rounded-xl font-black flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 shadow-lg text-base ${
                      added
                        ? "bg-gray-800 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        تمت الإضافة للسلة
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        إضافة لطلبك
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
