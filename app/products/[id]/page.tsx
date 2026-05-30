import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
  try {
    const product = await getProduct(params.id);
    return {
      title: `${product.name} - FastOrder`,
      description: product.description || `اشترِ ${product.name} بسعر ${product.price} جنيه`,
    };
  } catch {
    return { title: "منتج - FastOrder" };
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductPage({ params }: ProductPageProps) {
  let product;

  try {
    product = await getProduct(params.id);
  } catch {
    notFound();
  }

  if (!product) notFound();

  return (
    <div>
      {/* Breadcrumb */}
      <div className="fixed top-16 right-0 left-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 py-2">
        <div className="container mx-auto max-w-5xl flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            الرئيسية
          </Link>
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <Link href="/products" className="hover:text-indigo-600 transition-colors">
            المنتجات
          </Link>
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <span className="text-gray-800 font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      <ProductDetailClient product={product} />
    </div>
  );
}
