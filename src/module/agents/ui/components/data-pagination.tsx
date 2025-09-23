import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}
const DataPagination = ({ page, totalPage, onPageChange }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className=" flex-1 text-muted-foreground text-sm">
        Page {page} of {totalPage || 1}
      </div>
      <div className="flex items-center space-x-2 py-4 justify-end">
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => onPageChange(Math.min(page + 1, totalPage))}
          disabled={page === totalPage || totalPage === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataPagination;
