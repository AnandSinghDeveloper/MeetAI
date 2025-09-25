"use client";
import ResponsiveDailog from "@/components/responsive-dailog";
import React from "react";
import MeetingFrom from "./meeting-form";
import { useRouter } from "next/navigation";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const NewMeetingDailog = ({ open, onOpenChange }: Props) => {
  const router=useRouter();
  return (
    <ResponsiveDailog
      open={open}
      onOpenChange={onOpenChange}
      title="New Meeting"
      discription="Create a new meeting"
    >
     <MeetingFrom
     onSuccess={(id)=>{
      onOpenChange(false);
      router.push(`/meetings/${id}`);
     }}
     onCancel={()=>onOpenChange}
     />
      
    </ResponsiveDailog>
  );
};

export default NewMeetingDailog;
