import Link from "next/link";
import { Placeholder } from "@/components/PlaceHolder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { ticketsPath } from "@/path";

interface Params {
  ticketId: string;
}

const ticketPage = ({ params }: { params: Params }) => {
  const ticket = initialTickets.find((ticket) => ticket.id === params.ticketId);

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go back to tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex justify-center">
      <TicketItem ticket={ticket} isDetail/>
    </div>
  );
};

export default ticketPage;
