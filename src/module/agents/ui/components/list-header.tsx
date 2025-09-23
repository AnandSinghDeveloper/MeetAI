"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import NewAgentDailog from "./new-agent-dailog";
import { Funnel_Display } from "next/font/google";
import SearchFilter from "./agent-search-filter";
import { useAgentFilter } from "../../hooks/use-agent-filter";
import { DEFAULT_PAGE } from "@/constants";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const AgentListHeader = () => {
  const [filter, setFilter] = useAgentFilter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModifed = !!filter.search;

  const onClearFilter = () => setFilter({ search: "", page: DEFAULT_PAGE });

  return (
    <>
      <NewAgentDailog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h4 className={`text-xl font-semibold ${funnelDisplay.className}`}>
            My Agents
          </h4>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className=" h-4 w-4" />
            Invite Agent
          </Button>
        </div>
        <div className=" flex items-center p-1 gap-x-2">
          <SearchFilter />
          {isAnyFilterModifed && (
            <Button variant="outline" onClick={onClearFilter}>
              Clear
              <XCircleIcon />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentListHeader;
