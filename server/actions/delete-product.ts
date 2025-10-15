'use server';

import { actionClient } from '@/lib/safe-action';
import { db } from '..';
import { eq } from 'drizzle-orm';
import { products } from '../schema';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export const deleteProduct = actionClient
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const data = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

      revalidatePath('/dashboard/products');
      return { success: `Product ${data[0].title} has been deleted` };
    } catch (err) {
      console.log(err);
      return { error: 'Failed to delete product' };
    }
  });
