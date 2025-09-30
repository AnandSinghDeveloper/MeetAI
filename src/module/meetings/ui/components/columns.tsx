"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeetingsGetMany } from "../../type";
import GeneratedAvtar from "@/components/generated-avtar";
import { CornerDownRight, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import  humanizeDuration  from "humanize-duration";
import { format} from "date-fns"
import { cn } from "@/lib/utils";
import {
  ClockArrowUp,
  Loader2Icon,
  CircleCheckIcon,
  CircleXIcon,
} from "lucide-react";

const statusIconMap = {
  upcoming: "ClockArrowUp",
  active: "Loader2Icon",
  completed: "CircleCheckIcon",
  cancelled: "CircleXIcon",
  processing: "Loader2Icon",
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  processing: " bg-gray-300/20 text-gray-800 border-gray-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
};

function formatDuration(secconds: number){
  return humanizeDuration(secconds * 1000,{
    largest: 2,
    round: true,
   units : ["h", "m", "s"],
  })
}

export const columns: ColumnDef<MeetingsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className=" flex flex-col gap-y-1">
        <div className=" flex items-center gap-x-2">
          <GeneratedAvtar
            seed={row.original.name}
            varient="botttsNeutral"
            className="size-6"
          />
          <span className=" font-semibold capitalize ">
            {row.original.name}
          </span>
        </div>
        <div className=" flex items-center gap-x-2">
          <div className=" flex items-center gap-x-2">
            <CornerDownRight className=" size-3 text-muted-foreground" />
            <span className=" text-sm text-muted-foreground max-[200px] truncate">
              {row.original.instructions}
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className=" flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className=" text-blue-700" />
        {row.original.meetingCount}
        {row.original.meetingCount === 1 ? " Meeting" : " Meetings"}
      </Badge>
    ),
  },
];
