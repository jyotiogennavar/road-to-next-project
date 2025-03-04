

import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

interface Params {
  ticketId: string;
}

const ticketPage = async ({ params }: { params: Params }) => {
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <TicketItem ticket={ticket} isDetail/>
    </div>
  );
};

export default ticketPage;
