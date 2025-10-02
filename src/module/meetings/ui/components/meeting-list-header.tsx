"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { Funnel_Display } from "next/font/google";
import NewMeetingDailog from "./new-meeting-dailog";
import MeetingsSearchFilter from "./meeting-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingFilter } from "../../hooks/use-meeting-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const MeetingListHeader = () => {
  const [filter, setFilter] = useMeetingFilter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModifed =
    !!filter.search || !!filter.status || !!filter.agentId;

  const onClearFilter = () =>
    setFilter({ search: "", page: 1, status: null, agentId: "" });
  return (
    <>
      <NewMeetingDailog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h4 className={`text-xl font-semibold ${funnelDisplay.className}`}>
            My Meetings
          </h4>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className=" h-4 w-4" />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
        <div className=" flex items-center p-1 gap-x-2">
          <MeetingsSearchFilter />
          <StatusFilter />
          <AgentIdFilter />
          {isAnyFilterModifed && (
            <Button onClick={onClearFilter} variant="outline">
              Clear
              <XCircleIcon />
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingListHeader;
