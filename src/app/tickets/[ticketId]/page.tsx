import Link from "next/link";
import { Placeholder } from "@/components/PlaceHolder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { ticketsPath } from "@/path";

interface Params {
  ticketId: string;
}

const ticketPage = ({ params }: { params: Params }) => {
  const ticket = initialTickets.find((ticket) => ticket.id === params.ticketId);

  if (!ticket) {
    return <Placeholder 
    label="Ticket not found" 
    button={
      <Button asChild variant="outline">
        <Link  href={ticketsPath()}>Go back to tickets</Link>
      </Button>
    }
    />;
  }

  return (
    <div className="p-4 border border-gray-200 rounded-md shadow-md">
      <h1 className="text-lg">Ticket</h1>

      <h2 className="text-md text-lime-300">{ticket?.title}</h2>
      <p className="text-sm">{ticket?.content}</p>
    </div>
  );
};

export default ticketPage;
