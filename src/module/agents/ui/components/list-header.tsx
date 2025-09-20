"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import NewAgentDailog from "./new-agent-dailog";

const AgentListHeader = () => {

  const [isDialogOpen, setIsDialogOpen]= useState(false);

  return (
    <>
     <NewAgentDailog  open={isDialogOpen} onOpenChange={setIsDialogOpen}/>
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-semibold">My Agents</h4>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className=" h-4 w-4" />
            Invite Agent
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgentListHeader;
