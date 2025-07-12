'use client';
 
import { Input } from '../ui/input';
import { Search } from 'lucide-react'; 
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function CausaSearch() {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const current = searchParams.get('nome') || '';
    setSearch(current);
  }, [searchParams]);

  function handleSearch() {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set('nome', search);
    } else {
      params.delete('nome');
    }

    replace(`${pathname}?${params.toString()}`)
  }
 
  return (
  <div className='flex'>
    <Input
    className='w-full'
    placeholder='Insira o nome do anúncio'
    onChange={(e) => {
      setSearch(e.target.value)
    }}
    value={search}
   
    />
    <Button
      onClick={handleSearch}
    ><Search></Search></Button>
    </div>
  );
}