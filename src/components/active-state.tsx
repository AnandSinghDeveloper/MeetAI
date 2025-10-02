import { VideoIcon } from "lucide-react";
import EmptyState from "./empty-state";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
}

export const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col items-center justify-center gap-y-8">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is active"
        discription="Meeting will end once all participants have left"
      />

      <div className="flex items-center lg:justify-center flex-col-reverse lg:flex-row gap-2 w-full">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon className="size-4" />
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
