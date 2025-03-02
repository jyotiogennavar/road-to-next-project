// import clsx from "clsx";
"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTickets } from "@/features/ticket/queries/get-tickets";
import { Ticket } from "@/features/ticket/types";

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await getTickets();

      setTickets(result as Ticket[]);
    };
    fetchTickets();
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-y-4">
      <Header title="Tickets" subtitle="Manage your tickets here" />

      <ul className="space-y-4 mt-4 flex flex-col items-center justify-center">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </ul>
    </div>
  );
};

export default TicketsPage;
