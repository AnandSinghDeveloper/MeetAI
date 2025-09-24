"use client";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import AgentIdViewHeader from "../components/agent-id-view-header";
import GeneratedAvtar from "@/components/generated-avtar";
import { VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/use-confirm";
import UpdateAgentDailog from "../components/update-agent-dailog";

interface Props {
  agentId: string;
}
const AgentIdView = ({ agentId }: Props) => {

  const [updateAgentDailogopen, setUpdateAgentDailogopen]= useState(false)
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );

        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Delete Agent",
    "Are you sure you want to delete this agent? and all meetings will be deleted"
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) {
      return;
    }

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
    <UpdateAgentDailog open={updateAgentDailogopen} onOpenChange={setUpdateAgentDailogopen} initialValues={data} />
      <RemoveConfirmation />
      <div className=" flex flex-1 flex-col px-4 md:px-8 py-4 gap-y-4">
        <AgentIdViewHeader
          agentId={data.id}
          agentName={data.name}
          onEdit={() => setUpdateAgentDailogopen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className=" bg-white rounded-lg border">
          <div className=" px-5 py-5 gap-y-5 flex flex-col col-span-5">
            <div className="gap-x-3 flex items-center">
              <GeneratedAvtar
                seed={data.name}
                varient="botttsNeutral"
                className="size-10"
              />
              <h2 className=" font-semibold text-2xl">{data.name}</h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="size-4 text-blue-700 " />5 meetings
            </Badge>
            <div className=" gap-y-4 flex flex-col">
              <p className=" text-lg font-medium">Instruction</p>
              <p className=" text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentIdView;
export function AgentIdViewError() {
  return <ErrorState title="Error" discription="Something went wrong" />;
}
export function AgentsIdViewLoading() {
  return <LoadingState title="Loading Agent " discription="Please wait" />;
}
