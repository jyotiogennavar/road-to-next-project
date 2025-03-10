import { SquareKanban } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { homePath, ticketsPath } from "@/path";
import { ThemeSwitcher } from "./theme/theme-switcher";

const Navbar = () => {
  return (
    <>
      <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
        <Button asChild variant="ghost">
          <Link href={homePath()}>
            <SquareKanban />
            TicketBounty
          </Link>
        </Button>

        <div className="flex gap-x-2">
          <ThemeSwitcher />
          <Link
            href={ticketsPath()}
            className={buttonVariants({ variant: "ghost" })}
          >
            Tickets
          </Link>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
