"use client";
import ResponsiveDailog from "@/components/responsive-dailog";
import React from "react";
import AgentFrom from "./agent-from";
import { AgentGetOne } from "../../type";

interface UpdateAgentDailogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: AgentGetOne
}
const UpdateAgentDailog = ({ open, onOpenChange ,initialValues }: UpdateAgentDailogProps) => {
  return (
    <ResponsiveDailog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Agent"
      discription="Update an agent details"
    >
      <AgentFrom
      onCancel={() => onOpenChange(false)}
      onSuccess={() => onOpenChange(false)}
      initialValues={initialValues}
      />
      
    </ResponsiveDailog>
  );
};

export default UpdateAgentDailog;
