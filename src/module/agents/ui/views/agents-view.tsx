"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import React from "react";
import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";


const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className=" flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8 ">
      <DataTable data={data} columns={columns} />
      {data.length === 0 && <EmptyState title="Create your first agent" discription="Create your agent to join your meetings. Each agent follow your insteruction and can interact  with prarticipants during the call" />}
    </div>
  );
};

export default AgentsView;

export function AgentsViewError() {
  return <ErrorState title="Error" discription="Something went wrong" />;
}
