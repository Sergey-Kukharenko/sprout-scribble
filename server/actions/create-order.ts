'use server';

import { actionClient } from '@/lib/safe-action';
import { CreateOrderSchema } from '@/types/order-schema';
import { auth } from '../auth';
import { db } from '..';
import { orderProduct, orders } from '../schema';

export const createOrder = actionClient
  .schema(CreateOrderSchema)
  .action(
    async ({ parsedInput: { products, status, total, paymentIntentID } }) => {
      const user = await auth();
      if (!user) return { error: 'user not found' };

      const order = await db
        .insert(orders)
        .values({
          status,
          paymentIntentID,
          total,
          userID: user.user.id
        })
        .returning();

      const orderProducts = products.map(
        async ({ productID, quantity, variantID }) => {
          const newOrderProduct = await db.insert(orderProduct).values({
            quantity,
            orderID: order[0].id,
            productID,
            productVariantID: variantID
          });
        }
      );
      return { success: 'Order has been added' };
    }
  );
