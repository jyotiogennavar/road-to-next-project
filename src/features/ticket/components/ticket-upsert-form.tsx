"use client";
import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import { SubmitButton } from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: "",
      fieldErrors: {},
    }
  );
  return (
    <form action={action} className="flex flex-col gap-y-4">
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <span className="text-xs text-red-500">{actionState.fieldErrors?.content?.[0]}</span>

      <SubmitButton label={ticket ? "Edit" : "Create"} />

      {actionState.message && <p>{actionState.message}</p>}
    </form>
  );
};

export { TicketUpsertForm };
