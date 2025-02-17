// import clsx from "clsx";

import { Header } from "@/components/Header";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";



const ticketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-4">
      <Header title="Tickets" subtitle="Manage your tickets here" />

      <ul className="space-y-4 mt-4 flex flex-col items-center justify-center">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </ul>
    </div>
  );
};

export default ticketsPage;
