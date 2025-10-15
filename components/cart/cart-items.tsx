'use client';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader
} from '@/components/ui/table';
import { CartItem, useCartStore } from '@/lib/client-store';
import formatPrice from '@/lib/format-price';
import { MinusCircle, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import emptyCart from '@/public/empty-box.json';
import { createId } from '@paralleldrive/cuid2';
import { Button } from '../ui/button';

export default function CartItems() {
  const { cart, addToCart, removeFromCart, setCheckoutProgress } =
    useCartStore();

  const itemForCart = (item: CartItem) => ({
    ...item,
    variant: {
      quantity: 1,
      variantID: item.variant.variantID
    }
  });

  const onAddToCart = (item: CartItem) => {
    addToCart(itemForCart(item));
  };

  const onRemoveFromCart = (item: CartItem) => {
    removeFromCart(itemForCart(item));
  };

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.variant.quantity,
      0
    );
  }, [cart]);

  const priceInLetters = useMemo(() => {
    return [...totalPrice.toFixed(2).toString()].map((letter) => ({
      letter,
      id: createId()
    }));
  }, [totalPrice]);

  return (
    <motion.div className='flex flex-col items-center'>
      {cart.length === 0 && (
        <div className='flex-col w-full flex item-center justify-center'>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className='text-2xl text-muted-foreground text-center'>
              Your cart is empty
            </h2>
            <Lottie className='h-64' animationData={emptyCart} />
          </motion.div>
        </div>
      )}
      {cart.length > 0 && (
        <div className='max-h-80 w-full overflow-y-auto'>
          <Table className='max-w-2xl mx-auto'>
            <TableHeader>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{formatPrice(item.price)}</TableCell>
                  <TableCell>
                    <div>
                      <Image
                        width={48}
                        height={48}
                        src={item.image}
                        alt={item.name}
                        priority
                        className='rounded-md'
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-between'>
                      <MinusCircle
                        size={14}
                        onClick={() => onRemoveFromCart(item)}
                        className='cursor-pointer hover:text-muted-foreground duration-300 transition-colors'
                      />
                      <p className='text-md font-bold'>
                        {item.variant.quantity}
                      </p>
                      <PlusCircle
                        size={14}
                        onClick={() => onAddToCart(item)}
                        className='cursor-pointer hover:text-muted-foreground duration-300 transition-colors'
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <motion.div className='flex items-center justify-center relative my-4 overflow-hidden'>
        <span className='text-md'>Total: $</span>
        <AnimatePresence mode='popLayout'>
          {priceInLetters.map((item, i) => (
            <motion.div key={item.id}>
              <motion.span
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ delay: i * 0.1 }}
                className='text-md inline-block'
              >
                {item.letter}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Button
        onClick={() => setCheckoutProgress('payment-page')}
        className='max-w-md w-full'
        disabled={cart.length === 0}
      >
        Checkout
      </Button>
    </motion.div>
  );
}
