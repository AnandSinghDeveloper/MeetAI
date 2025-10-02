import React from "react";
import { useMeetingFilter } from "../../hooks/use-meeting-filter";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const MeetingsSearchFilter = () => {
  const [filter, setFilter] = useMeetingFilter();
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

export default MeetingsSearchFilter;
