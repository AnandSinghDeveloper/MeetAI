"use client";
import { DataTable } from "@/components/data-table";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/columns";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return <div className=" flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8 ">
     <DataTable data={data.items}  columns={columns} />
  </div>;
};

export default MeetingsView;

export function MeetingsViewError() {
  return <ErrorState title="Error" discription="Something went wrong" />;
}
export function MeetingsViewLoading() {
  return <LoadingState title="Loading Meetings " discription=" This might take a while" />;
}
