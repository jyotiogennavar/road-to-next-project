import { notFound } from "next/navigation";
import { CardCompact } from "@/components/ui/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketEditPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit ticket"
        content={<TicketUpsertForm ticket={ticket} />}
        description="Edit an existing ticket"
        className="w-full max-w-[420px]"
      />
    </div>
  );
};

export default TicketEditPage;
