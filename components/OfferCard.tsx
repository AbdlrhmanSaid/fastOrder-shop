"use client";

import Image from "next/image";
import { Offer } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, Check, Package, Plus, Minus, Zap } from "lucide-react";
import { useState } from "react";

interface OfferCardProps {
  offer: Offer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: offer._id,
      name: offer.title,
      price: offer.price,
      quantity,
      unit: "عرض",
      image: offer.image,
      type: "offer",
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* شارة عرض خاص - لافتة بارزة */}
      <div className="absolute top-0 right-0 z-20">
        <div className="bg-linear-to-l from-red-600 to-rose-500 text-white text-xs font-black px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5 shadow-lg">
          <Zap className="w-3.5 h-3.5 fill-white" />
          عرض خاص
        </div>
      </div>

      {/* صورة العرض */}
      <div className="relative h-52 overflow-hidden shrink-0 bg-linear-to-br from-indigo-50 to-gray-50">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />

        {/* تأثير عدم التوفر */}
        {!offer.isActive && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-white text-red-600 px-6 py-2 rounded-full font-black shadow-xl transform -rotate-12 border-2 border-red-600 text-sm">
              نفذت الكمية
            </span>
          </div>
        )}
      </div>

      {/* محتوى الكرت */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-lg font-black text-gray-800 mb-3 line-clamp-1 group-hover:text-indigo-700 transition-colors">
          {offer.title}
        </h3>

        {/* صندوق المحتويات */}
        <div className="relative bg-linear-to-br from-indigo-50 to-purple-50/30 rounded-xl p-4 mb-4 border border-indigo-100/70 grow overflow-hidden">
          {/* خلفية زخرفية */}
          <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-indigo-100 rounded-full opacity-40" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2 text-indigo-700">
              <Package className="w-4 h-4 shrink-0" />
              <span className="text-sm font-black">مكونات العرض:</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {offer.description}
            </p>
          </div>
        </div>

        {/* السعر والكمية */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              السعر الإجمالي
            </span>
            <span className="text-3xl font-black text-indigo-600 flex items-baseline gap-1 leading-tight">
              {offer.price.toLocaleString("ar-EG")}
              <span className="text-sm font-medium text-gray-500">جنيه</span>
            </span>
          </div>

          {offer.isActive && (
            <div className="flex items-center bg-gray-100 rounded-xl p-1 shadow-inner border border-gray-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-red-500 transition-colors shadow-sm"
                aria-label="تقليل الكمية"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-black text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-gray-600 hover:text-indigo-600 transition-colors shadow-sm"
                aria-label="زيادة الكمية"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* زر الإضافة */}
        {offer.isActive && (
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full py-3.5 rounded-xl font-black flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 text-base ${
              added
                ? "bg-gray-800 text-white shadow-none"
                : "bg-linear-to-l from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg shadow-indigo-200 hover:shadow-indigo-300"
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
        )}
      </div>
    </div>
  );
}
