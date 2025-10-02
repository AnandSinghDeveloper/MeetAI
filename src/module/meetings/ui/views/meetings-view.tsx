"use client";
import { DataTable } from "@/components/data-table";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingFilter } from "../../hooks/use-meeting-filter";
import DataPagination from "@/module/agents/ui/components/data-pagination";

const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filter, setFilter] = useMeetingFilter();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filter,
    })
  );
  return (
    <div className=" flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8 ">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filter.page}
        totalPage={data.totalPages}
        onPageChange={(page) => setFilter({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          discription="Create your meeting to join your meetings. Each agent follow your insteruction and can interact  with prarticipants during the call"
        />
      )}
    </div>
  );
};

export default MeetingsView;

export function MeetingsViewError() {
  return <ErrorState title="Error" discription="Something went wrong" />;
}
export function MeetingsViewLoading() {
  return (
    <LoadingState
      title="Loading Meetings "
      discription=" This might take a while"
    />
  );
}
