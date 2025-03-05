"use client";

import { Ticket } from "@prisma/client";
import clsx from "clsx";
import { SquareArrowOutUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ticketPath } from "@/path";
import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "../constants";


interface TicketItemProps {
  ticket: Ticket;
  isDetail?: boolean;
}

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)} className="h-4 w-4">
        <SquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const handleDeleteTicket = async () => {
    await deleteTicket(ticket.id);
  };

  const deleteButton = (
    <Button asChild variant="outline" size="icon" onClick={handleDeleteTicket}>
      <Trash className="h-4 w-4" />
    </Button>
  );
  return (
    <div
      className={clsx("w-full  flex gap-x-2", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span>{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription
            className={clsx("whitespace-break-space", {
              "line-clamp-3": isDetail,
            })}
          >
            {ticket.content}
          </CardDescription>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-x-1">
        {isDetail ? deleteButton : detailButton}
      </div>
    </div>
  );
};

export { TicketItem };
