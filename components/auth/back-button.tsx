'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

type BackButtonType = {
  href: string;
  label: string;
};

export const BackButton = ({ href, label }: BackButtonType) => {
  return (
    <Button asChild variant='link' className='font-medium w-full'>
      <Link href={href} aria-label={label}>
        {label}
      </Link>
    </Button>
  );
};
