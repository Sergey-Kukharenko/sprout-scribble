import Algolia from '@/components/products/aloglia';
import Products from '@/components/products/products';
import { db } from '@/server';
import ProductTags from './dashboard/products/product-tags';

export const revalidate = 60 * 60;

export default async function Home() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)]
  });

  return (
    <main className='text-4xl'>
      <Algolia />
      <ProductTags />
      <Products variants={data} />
    </main>
  );
}
