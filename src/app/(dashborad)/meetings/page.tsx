import { auth } from "@/lib/auth";
import MeetingListHeader from "@/module/meetings/ui/components/meeting-list-header";
import MeetingsView, {
  MeetingsViewError,
  MeetingsViewLoading,
} from "@/module/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/sever";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs/server";
import { loadsearchParams } from "@/module/meetings/params";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props  {
  searchParams: Promise<SearchParams>
}
const page = async ({ searchParams }: Props) => {
  const filter = await loadsearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/SignIn");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({
   ...filter, 
  }));

  return (
    <>
      <MeetingListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
