"use client";
import React from "react";
import { AgentGetOne } from "../../type";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentsInsertSchema } from "../../schema";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AgentFromProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

const AgentFrom = ({ onSuccess, onCancel, initialValues }: AgentFromProps) => {
  const trpc = useTRPC();
  // const router = useRouter();
  const queryClient = useQueryClient();
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {},
      onError: () => {},
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("update agent");
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvtar
          seed={form.watch("name")}
          varient="botttsNeutral"
          className="border size-16 "
        />
      </form>
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder=" e.g Coding tuter" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="instructions"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instructions</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder=" e.g You are helpful coading assistant ,that is expert in react and nextjs and that can explain concepts in simple way"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-between gap-x-2 ">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            disabled={isPending}
            onClick={() => onCancel()}
            className="border"
          > Cancel</Button>
        )}

        <Button disabled={isPending} type="submit"  > 
        {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default AgentFrom;
