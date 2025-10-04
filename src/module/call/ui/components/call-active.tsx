import Image from "next/image";
import Link from "next/link";
import React from "react";
import {CallControls, SpeakerLayout} from "@stream-io/video-react-sdk"

interface Props {
  onLeave: () => void;
  meetingName: string;
}

const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className=" flex flex-col h-screen bg-accent-foreground p-4 justify-between text-white">
      <div className=" flex items-center gap-4 p-4 rounded-full bg-[#101213] ">
        <Link href={'/'} className=" flex items-center justify-center p-1 rounded-full w-fit bg-white/10">
        <Image src="/logo.svg" alt="Logo" width={22} height={22}></Image>
        </Link>
        <h4 className=" text-base ">
          {meetingName}
        </h4>
      </div>
      <SpeakerLayout/>
      <div className=" rounded-full bg-[#101213] px-4">
         <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};

export default CallActive;
