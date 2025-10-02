"use client";
import ResponsiveDailog from "@/components/responsive-dailog";
import React from "react";
import MeetingFrom from "./meeting-form";
import { MeetingsGetOne } from "../../type";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingsGetOne;
}
const UpdateMeetingDailog = ({ open, onOpenChange, initialValues }: Props) => {
  
  return (
    <ResponsiveDailog
      open={open}
      onOpenChange={onOpenChange}
      title="Update Meeting"
      discription="Update a meeting details"
    >
      <MeetingFrom
        onSuccess={() => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDailog>
  );
};

export default UpdateMeetingDailog;
