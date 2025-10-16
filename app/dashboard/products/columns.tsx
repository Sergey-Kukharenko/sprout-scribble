'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { VariantsWithImagesTags } from '@/lib/infer-type';
import { deleteProduct } from '@/server/actions/delete-product';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ColumnDef, Row } from '@tanstack/react-table';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { ProductVariant } from './product-variant';

export type ProductColumn = {
  title: string;
  price: number;
  image: string;
  variants: VariantsWithImagesTags[];
  id: number;
};

const ActionCell = ({ row }: { row: Row<ProductColumn> }) => {
  const { execute } = useAction(deleteProduct, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    },
    onExecute: () => {
      toast.loading('Deleting Product');
    }
  });

  const product = row.original;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <MoreHorizontal className='h-8 w-8 p-0' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='dark:focus:bg-primary focus:bg-primary/50 cursor-pointer'>
          <Link href={`/dashboard/add-product?id=${product.id}`}>
            Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => execute({ id: product.id })}
          className='dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer'
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'variants',
    header: 'Variants',
    cell: ({ row }) => {
      const variants = row.getValue('variants') as VariantsWithImagesTags[];
      return (
        <div className='flex items-center gap-2'>
          {variants.map((variant) => (
            <div key={variant.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ProductVariant
                    productID={variant.productID}
                    variant={variant}
                    editMode={true}
                  >
                    <div
                      className='w-5 h-5 rounded-full'
                      key={variant.id}
                      style={{ background: variant.color }}
                    />
                  </ProductVariant>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{variant.productType}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <ProductVariant productID={row.original.id} editMode={false}>
                  <PlusCircle />
                </ProductVariant>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new product variant</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
      }).format(price);
      return <div className='font-medium text-xs'>{formatted}</div>;
    }
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const cellImage = row.getValue('image') as string;
      const cellTitle = row.getValue('title') as string;
      return (
        <div>
          <Image
            src={cellImage}
            alt={cellTitle}
            width={50}
            height={50}
            className='rounded-md'
          />
        </div>
      );
    }
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ActionCell
  }
];
