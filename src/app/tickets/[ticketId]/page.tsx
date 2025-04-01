import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

const ticketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <>
      <div className="flex justify-center">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </>
  );
};

// export async function generateStaticParams() {
//   const tickets = await getTickets();

//   return tickets.map((ticket) => ({
//     params: { ticketId: ticket.id },
//   }));
// }
export default ticketPage;
