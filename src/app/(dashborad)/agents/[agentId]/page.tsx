interface Props {
  params: Promise<{ agentId: string }>;
}

import AgentIdView, {
  AgentIdViewError,
  AgentsIdViewLoading,
} from "@/module/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/sever";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async ({ params }: Props) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({
      id: agentId,
    })
  );

  return (
    <HydrationBoundary>
      <Suspense fallback={<AgentsIdViewLoading />}>
        <ErrorBoundary fallback={<AgentIdViewError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
