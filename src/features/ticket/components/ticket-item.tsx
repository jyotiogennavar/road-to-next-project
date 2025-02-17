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
}

const TicketItem = ({ ticket }: TicketItemProps) => {
  return (
    <div className="w-full max-w-96 flex gap-x-2">
      <Card key={ticket.id} className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span>{ticket.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="line-clamp-3 whitespace-break-space">
            {ticket.content}
          </CardDescription>
        </CardContent>
      </Card>
      <Button asChild variant="outline" size="icon">
        <Link href={ticketPath(ticket.id)} className="h-4 w-4">
          <SquareArrowOutUpRight />
        </Link>
      </Button>
    </div>
  );
};

export { TicketItem };
