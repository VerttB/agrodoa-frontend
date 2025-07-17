"use client";

import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function CausaSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const current = searchParams.get("nome") || "";
    setSearch(current);
  }, [searchParams]);

  function handleSearch() {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("nome", search);
    } else {
      params.delete("nome");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center lg:w-128 ">
      <Input
        className="w-full rounded-r-none border-r-0 h-full lg:h-10"
        placeholder="Insira o nome do anúncio"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
      <Button className="rounded-l-none lg:h-10 relative -translate-x-0.5" onClick={handleSearch}>
        <Search size={18}></Search>
      </Button>
    </div>
  );
}
