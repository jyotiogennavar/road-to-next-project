import { Ticket } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";

interface TicketUpsertFormProps {
  ticket?: Ticket;
}

const TicketUpsertForm = ({ticket}: TicketUpsertFormProps) => {
  return (
    <form action={upsertTicket.bind(null, ticket?.id)} className="flex flex-col gap-y-4">
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" name="title" defaultValue={ticket?.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket?.content}/>

      <Button type="submit">{ticket ? "Edit" : "Create"}</Button>
    </form>
  );
};

export { TicketUpsertForm };
