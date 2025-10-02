"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingIdViewHeader from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/module/agents/hooks/use-confirm";
import { toast } from "sonner";
import UpdateMeetingDailog from "../components/update-meeting-dailog";
import { useState } from "react";
import { UpcomingState } from "@/components/upcoming-state";
import { ActiveState } from "@/components/active-state";
import { ProcessingState } from "@/components/processing-state";
import { CancelledState } from "@/components/cancel-state";

interface Props {
  meetingId: string;
}
const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [upadateMeetingDailogopen, setUpadateMeetingDailogopen] =
    useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to delete this meeting?",
    "This following action will permanently delete this meeting and all associated data."
  );
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) {
      return;
    }
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isUpcoming = data.status === "upcoming";
  const isActive = data.status === "active";
  const isCanceled = data.status === "cancelled";
  const isProcessing = data.status === "processing";
  const isCompleted = data.status === "completed";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDailog
        open={upadateMeetingDailogopen}
        onOpenChange={setUpadateMeetingDailogopen}
        initialValues={data}
      />
      <div className="flex flex-col py-4 gap-y-4 flex-1  md:px-8 px-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpadateMeetingDailogopen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancalMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed</div>}
        {isCanceled && <CancelledState />}
      </div>
    </>
  );
};

export default MeetingIdView;

export function MeetingIdViewError() {
  return (
    <ErrorState title="Error Loading meeting" discription="Please try again" />
  );
}
export function MeetingIdViewLoading() {
  return (
    <LoadingState
      title="Loading Meetings "
      discription="Please wait , this might take a while"
    />
  );
}
