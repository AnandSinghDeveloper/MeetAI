"use client";
import React, { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { meetingsInsertSchema } from "../../schema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GeneratedAvtar from "@/components/generated-avtar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MeetingsGetOne } from "../../type";
import CommandSelect from "./command-select";

interface MeetingFromProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingsGetOne;
}

const MeetingFrom = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFromProps) => {
  const trpc = useTRPC();
  // const router = useRouter();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [agentSearch, setAgentSearch]= useState("");

  const agents = useQuery(trpc.agents.getMany.queryOptions({
    search: agentSearch,
     pageSize: 100
  }));

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({
              id: initialValues.id,
            })
          );
        }

        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({
              id: initialValues.id,
            })
          );
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues?.id ?? "" });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pt-2">Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder=" e.g Coding Consultation " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pt-2">Agent</FormLabel>
              <FormControl>
                <CommandSelect options={(agents.data?.items ?? []).map((agent) =>({
                  id: agent.idl,
                  value: agent.id
                  ,children: (
                    <div>

                    </div>
                  )

                }) )} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         
         
        <div className="flex justify-between gap-x-2 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={() => onCancel()}
              className="border"
            >
              {" "}
              Cancel
            </Button>
          )}

          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MeetingFrom;
