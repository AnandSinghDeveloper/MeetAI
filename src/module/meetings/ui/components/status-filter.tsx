import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUp,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import { MeetingsStatus } from "../../type";
import { useMeetingFilter } from "../../hooks/use-meeting-filter";
import CommandSelect from "./command-select";

const options = [
  {
    id: MeetingsStatus.Upcoming,
    value: MeetingsStatus.Upcoming,
    children: (
      <div className=" flex items-center gap-x-2 capitalize">
        <ClockArrowUp className="h-4 w-4" />
        {MeetingsStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingsStatus.Active,
    value: MeetingsStatus.Active,
    children: (
      <div className=" flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingsStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingsStatus.Completed,
    value: MeetingsStatus.Completed,
    children: (
      <div className=" flex items-center gap-x-2 capitalize">
        <CircleCheckIcon />
        {MeetingsStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingsStatus.Processing,
    value: MeetingsStatus.Processing,
    children: (
      <div className=" flex items-center gap-x-2 capitalize">
        <LoaderIcon className="h-4 w-4" />
        {MeetingsStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingsStatus.Cancelled,
    value: MeetingsStatus.Cancelled,
    children: (
      <div className=" flex items-center gap-x-2 capitalize">
        <CircleXIcon className="h-4 w-4" />
        {MeetingsStatus.Cancelled}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filter, setFilter] = useMeetingFilter();

  return (
    <CommandSelect
      options={options}
      placeholder="Status"
      className="h-9"
      value={filter.status ?? ""}
      onSelect={(value) => setFilter({ status: value as MeetingsStatus })}
    />
  );
};
