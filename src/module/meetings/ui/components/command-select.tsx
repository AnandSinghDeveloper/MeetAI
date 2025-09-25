import { Button } from "@/components/ui/button";
import { CommandResponsiveDialog } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  option: Array<{
    id: string;
    value: string;
    children: React.ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  isSearchable?: boolean;
  className?: string;
  placeholder?: string;
}

const CommandSelect = ({
  option,
  onSelect,
  onSearch,
  value,
  isSearchable,
  className,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = option.find((option) => option.id === value);
  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        className={cn(
          `h-9 justify-between font-normal px-2 `,
          !selectedOption && `text-muted-foreground`,
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon/>
      </Button>
      <CommandResponsiveDialog>
        
      </CommandResponsiveDialog>

    </>
  );
};

export default CommandSelect;
