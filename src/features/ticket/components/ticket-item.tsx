import clsx from "clsx";
import { SquareArrowOutUpRight } from "lucide-react";
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
import { TICKET_ICONS } from "../constants";
import { Ticket } from "../types";

interface TicketItemProps {
  ticket: Ticket;
  isDetail?: boolean;
}

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  console.log('where am i displaying? (TicketItem) ');
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link href={ticketPath(ticket.id)} className="h-4 w-4">
        <SquareArrowOutUpRight />
      </Link>
    </Button>
  );
  return (
    <div className={clsx("w-full  flex gap-x-2", {
      'max-w-[580px]' : isDetail,
      'max-w-[420px]' : !isDetail
    })}>
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span>{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className={clsx("whitespace-break-space", {
            'line-clamp-3' : isDetail,
          })}>
            {ticket.content}
          </CardDescription>
        </CardContent>
      </Card>
      {isDetail ? null : (<div className="flex flex-col gap-x-1">{detailButton}</div>)}
      
    </div>
  );
};

export { TicketItem };
