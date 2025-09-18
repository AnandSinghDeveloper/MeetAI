"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  PanelLeftCloseIcon,
  PanelLeftIcon,
  Search,
  SearchIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboredCommand from "./dashbored-command";

const DashboredNavber = () => {
  const { toggleSidebar, isMobile, state } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!commandOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboredCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className=" flex px-4 py-3 bg-background items-center gap-x-2  border-b">
        <Button onClick={toggleSidebar} variant="outline" className="size-9">
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className=" h-4 w-4" />
          ) : (
            <PanelLeftCloseIcon className=" h-4 w-4" />
          )}
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setCommandOpen(!commandOpen)}
          className=" h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground "
        >
          <SearchIcon className=" h-4 w-4" />
          Search
          <kbd className=" pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 ml-auto ">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboredNavber;
