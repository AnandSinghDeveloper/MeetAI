import { Button } from "@/components/ui/button";
import Link from "next/link";

const CallEnded = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar">
      <div className=" flex flex-1 py-4 px-8 items-center justify-center">
        <div className=" flex flex-col items-center justify-center gap-y-6 p-10 bg-background rounded-lg shadow-sm ">
          <div className=" flex flex-col gap-y-2 text-center ">
            <h6 className=" text-lg font-medium">You have ended the call</h6>
            <p>Summary will appear few minutes later</p>
          </div>
          <Button asChild>
            <Link href="/meetings">Go Back to Meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallEnded;
