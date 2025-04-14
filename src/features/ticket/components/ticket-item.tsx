import { Ticket } from "@prisma/client";
import clsx from "clsx";
import { MoreVertical, Pencil, SquareArrowOutUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ticketEditPath, ticketPath } from "@/path";
import { toCurrencyFromCent } from "@/utils/currency";
import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

interface TicketItemProps {
  ticket: Ticket;
  isDetail?: boolean;
}

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const detailButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketPath(ticket.id)} className="h-4 w-4">
        <SquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const editButton = (
    <Button asChild variant="outline" size="icon">
      <Link prefetch href={ticketEditPath(ticket.id)} className="h-4 w-4">
        <Pencil />
      </Link>
    </Button>
  );

  // issue faced - the delete btn was not working bcuz i didnt remove the asChild prop from the button.
  const deleteButton = (
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button variant="outline" size="icon">
        <Trash className="h-4 w-4" />
      </Button>
    </form>
  );

  const moreMenu = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      }
    />
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};

export { TicketItem };
