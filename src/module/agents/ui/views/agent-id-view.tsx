"use client";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import AgentIdViewHeader from "../components/agent-id-view-header";

interface Props {
  agentId: string;
}
const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <div className=" flex flex-1 flex-col px-4 md:px-8 py-4 gap-y-4">
      <AgentIdViewHeader agentId={data.id} agentName={data.name} onEdit={()=>{}} onRemove={()=>{}} />
    </div>
  );
};

export default AgentIdView;
export function AgentIdViewError() {
  return <ErrorState title="Error" discription="Something went wrong" />;
}
export function AgentsIdViewLoading() {
  return <LoadingState title="Loading Agent " discription="Please wait" />;
}