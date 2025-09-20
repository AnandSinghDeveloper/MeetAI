"use client";
import ResponsiveDailog from "@/components/responsive-dailog";
import React from "react";
import AgentFrom from "./agent-from";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const NewAgentDailog = ({ open, onOpenChange }: Props) => {
  return (
    <ResponsiveDailog
      open={open}
      onOpenChange={onOpenChange}
      title="New Agent"
      discription="Create a new agent"
    >
      <AgentFrom
      onCancel={() => onOpenChange(false)}
      onSuccess={() => onOpenChange(false)}
      />
      
    </ResponsiveDailog>
  );
};

export default NewAgentDailog;
