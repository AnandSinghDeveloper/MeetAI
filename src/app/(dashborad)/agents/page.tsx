import LoadingState from "@/components/loading-state";
import AgentsView, {
  AgentsViewError,
} from "@/module/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/sever";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import AgentListHeader from "@/module/agents/ui/components/list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {

   const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
      redirect("/SignIn");
    }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
    <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading agents"
              discription="Please wait while agents are loading"
            />
          }
        >
          <ErrorBoundary fallback={<AgentsViewError />}>
            {" "}
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
