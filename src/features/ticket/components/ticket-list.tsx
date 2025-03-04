import { getTickets } from "@/features/ticket/queries/get-tickets";
import { TicketItem } from "./ticket-item";

export const TicketList = async () => {
  const tickets = await getTickets();
  return (
    <div className="space-y-4 mt-4 flex flex-col items-center justify-center">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
