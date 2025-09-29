import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, Command } from "lucide-react";
import React, { useState } from "react";

interface Props {
  options: Array<{
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
  options,
  onSelect,
  onSearch,
  value,
  isSearchable,
  className,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant={"outline"}
        className={cn(
          `h-9 justify-between font-normal px-2 `,
          !selectedOption && `text-muted-foreground`,
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find a meeting or Agent..." />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground">No results found.</span>
          </CommandEmpty>
          {options.map((options) => (
            <CommandItem
              key={options.id}
              onSelect={() => {
                onSelect(options.id);
                setOpen(false);
              }}
            >
              {options.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;
