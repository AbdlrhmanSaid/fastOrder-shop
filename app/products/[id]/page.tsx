import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  try {
    const product = await getProduct(id);
    return {
      title: `${product.name} - FastOrder`,
      description:
        product.description ||
        `اشترِ ${product.name} بسعر ${product.price} جنيه`,
    };
  } catch {
    return { title: "منتج - FastOrder" };
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product;

  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="container mx-auto max-w-5xl flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 opacity-40" />
          <Link
            href="/products"
            className="hover:text-indigo-600 transition-colors"
          >
            المنتجات
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 opacity-40" />
          <span className="text-gray-800 font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      {/* محتوى الصفحة */}
      <ProductDetailClient product={product} />
    </div>
  );
}
