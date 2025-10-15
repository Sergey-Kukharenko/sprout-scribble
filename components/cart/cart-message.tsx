'use client';

import { useCartStore } from '@/lib/client-store';
import { motion } from 'framer-motion';
import { DrawerDescription, DrawerTitle } from '../ui/drawer';
import { ArrowLeft } from 'lucide-react';

export default function CartMessage() {
  const { checkoutProgress, setCheckoutProgress } = useCartStore();

  const getTitle = () => {
    if (checkoutProgress === 'cart-page') {
      return 'Your Cart Items';
    }
    if (checkoutProgress === 'payment-page') {
      return 'Choose a payment';
    }
    if (checkoutProgress === 'confirmation-page') {
      return 'Order Confirmed';
    }
  };

  const getDescription = () => {
    if (checkoutProgress === 'cart-page') {
      return 'View and edit your bag.';
    }
    if (checkoutProgress === 'payment-page') {
      return (
        <span
          onClick={() => setCheckoutProgress('cart-page')}
          className='flex items-center justify-center gap-1 cursor-pointer hover:text-primary'
        >
          <ArrowLeft size={14} />
          Head back to cart
        </span>
      );
    }
    if (checkoutProgress === 'confirmation-page') {
      return 'You will receive an email with your receipt!';
    }
  };

  return (
    <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 10 }}>
      <DrawerTitle>{getTitle()}</DrawerTitle>
      <DrawerDescription className='py-1'>{getDescription()}</DrawerDescription>
    </motion.div>
  );
}
