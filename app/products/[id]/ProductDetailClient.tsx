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
  Tag,
  PackageCheck,
  PackageX,
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

  // دعم الصور الجديدة (images[]) والقديمة (image)
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

  const total = product.price * quantity;

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* ════════════════ قسم الصور ════════════════ */}
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6 flex flex-col gap-4 border-b md:border-b-0 md:border-l border-gray-100">
              {/* الصورة الرئيسية */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                {images.length > 0 ? (
                  <Image
                    src={images[activeIdx]}
                    alt={`${product.name} - صورة ${activeIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-6 transition-opacity duration-200"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-3">
                    <Tag className="w-16 h-16 opacity-30" />
                    <span className="text-sm">لا توجد صورة</span>
                  </div>
                )}

                {/* أسهم التنقل */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:shadow-indigo-100 transition-all z-10"
                      aria-label="الصورة السابقة"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:shadow-indigo-100 transition-all z-10"
                      aria-label="الصورة التالية"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* مؤشر الصور */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {activeIdx + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* الصور المصغرة */}
              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeIdx === idx
                          ? "border-indigo-500 shadow-md shadow-indigo-100 scale-105"
                          : "border-gray-200 hover:border-indigo-300 opacity-70 hover:opacity-100"
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

            {/* ════════════════ تفاصيل المنتج ════════════════ */}
            <div className="p-6 md:p-8 flex flex-col gap-5">
              {/* الوحدة + الاسم */}
              <div>
                <span className="inline-block text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold mb-3">
                  {product.unit}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* الوصف */}
              {product.description ? (
                <p className="text-gray-500 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                  {product.description}
                </p>
              ) : null}

              {/* السعر */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">
                  السعر
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-indigo-600">
                    {product.price.toLocaleString("ar-EG")}
                  </span>
                  <span className="text-base font-medium text-gray-400">
                    جنيه / {product.unit}
                  </span>
                </div>
              </div>

              {/* حالة التوفر */}
              <div>
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200">
                    <PackageCheck className="w-4 h-4" />
                    متوفر في المخزن
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold border border-red-200">
                    <PackageX className="w-4 h-4" />
                    غير متوفر حالياً
                  </span>
                )}
              </div>

              {/* التحكم في الكمية + الإجمالي + الزر */}
              {product.inStock && (
                <div className="border-t border-gray-100 pt-5 space-y-4 mt-auto">
                  {/* الكمية */}
                  <div>
                    <p className="text-sm font-bold text-gray-600 mb-2">
                      الكمية
                    </p>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 border border-gray-100 w-fit">
                      <button
                        onClick={() =>
                          setQuantity(Math.max(1, quantity - 1))
                        }
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
                  <div className="flex items-center justify-between bg-indigo-50 rounded-xl px-5 py-3 border border-indigo-100">
                    <span className="text-sm font-bold text-indigo-700">
                      الإجمالي
                    </span>
                    <span className="text-2xl font-black text-indigo-700 flex items-baseline gap-1">
                      {total.toLocaleString("ar-EG")}
                      <span className="text-sm font-medium">جنيه</span>
                    </span>
                  </div>

                  {/* زر الإضافة للسلة */}
                  <button
                    id="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={added}
                    className={`w-full py-4 rounded-xl font-black flex items-center justify-center gap-3 text-base transition-all duration-300 active:scale-95 ${
                      added
                        ? "bg-gray-800 text-white shadow-none"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
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
