import React from "react";
import { useAgentFilter } from "../../hooks/use-agent-filter";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const SearchFilter = () => {
  const [filter, setFilter] = useAgentFilter();
  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
        className="h-9 w-[200px] bg-white pl-7"
      />
      <SearchIcon className=" absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
    </div>
  );
};

export default SearchFilter;
