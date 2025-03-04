import Link from "next/link";
import { Placeholder } from "@/components/PlaceHolder";
import { Button } from "@/components/ui/button";
import { ticketsPath } from "@/path";

export default function NotFound() {
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
