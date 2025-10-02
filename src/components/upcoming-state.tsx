import { BanIcon, VideoIcon } from "lucide-react";
import EmptyState from "./empty-state";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  onCancalMeeting: () => void;
  meetingId: string;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancalMeeting,
  isCancelling,
}: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center gap-y-8">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        discription="Once you start this meeting ,a summary will be displayed here"
      />

      <div className="flex items-center lg:justify-center flex-col-reverse lg:flex-row gap-2 w-full">
        <Button disabled={isCancelling} variant={"secondary"} className="w-full lg:w-auto">
          <BanIcon className="size-4" />
          Cancel Meeting
        </Button>
        <Button disabled={isCancelling} asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon className="size-4" />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
