'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProductTags() {
  const router = useRouter();
  const params = useSearchParams();
  const tag = params.get('get');

  const setFilter = (tag: string) => {
    const routeTo = tag ? `?tag=${tag}` : '/';
    router.push(routeTo);
  };

  return (
    <div className='my-4 flex gap-4 items-center justify-center'>
      <Badge
        onClick={() => setFilter('')}
        className={cn(
          'cursor-pointer bg-muted-foreground hover:bg-black/75 hover:opacity-100',
          !tag ? 'opacity-100' : 'opacity-50'
        )}
      >
        All
      </Badge>
      <Badge
        onClick={() => setFilter('blue')}
        className={cn(
          'cursor-pointer bg-blue-500 hover:bg-blue-600 hover:opacity-100',
          tag === 'blue' && tag ? 'opacity-100' : 'opacity-50'
        )}
      >
        Blue
      </Badge>
      <Badge
        onClick={() => setFilter('turquoise')}
        className={cn(
          'cursor-pointer bg-green-500 hover:bg-green-600 hover:opacity-100',
          tag === 'turquoise' && tag ? 'opacity-100' : 'opacity-50'
        )}
      >
        Green
      </Badge>
      <Badge
        onClick={() => setFilter('rose')}
        className={cn(
          'cursor-pointer bg-pink-500 hover:bg-pink-600 hover:opacity-100',
          tag === 'rose' && tag ? 'opacity-100' : 'opacity-50'
        )}
      >
        Rose
      </Badge>
      <Badge
        onClick={() => setFilter('purple')}
        className={cn(
          'cursor-pointer bg-purple-500 hover:bg-purple-600 hover:opacity-100',
          tag === 'purple' && tag ? 'opacity-100' : 'opacity-50'
        )}
      >
        Purple
      </Badge>
    </div>
  );
}
