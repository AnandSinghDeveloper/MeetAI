import { useTRPC } from "@/trpc/client";
import { useMeetingFilter } from "../../hooks/use-meeting-filter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CommandSelect from "./command-select";
import { agents } from "@/db/schema";
import GeneratedAvtar from "@/components/generated-avtar";

export const AgentIdFilter = () => {
  const [filters, setFilters] = useMeetingFilter();

  const trpc = useTRPC();

  const [agentSearch, setAgentSearch] = useState("");

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={(data?.items ?? []).map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className=" flex items-center gap-x-2">
            <GeneratedAvtar
              seed={agent.name}
              varient="botttsNeutral"
              className="size-6"
            />
            {agent.name}
          </div>
        ),
      }))}
      value={filters.agentId ?? ""}
      onSearch={setAgentSearch}
      onSelect={(id) => setFilters({ agentId: id })}
    />
  );
};
