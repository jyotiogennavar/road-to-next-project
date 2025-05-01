import { SquareKanban } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/path";
import { ThemeSwitcher } from "./theme/theme-switcher";

const Navbar = () => {
  const navitems = (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign In
      </Link>
    </>
  );

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
          {navitems}
        </div>
      </nav>
    </>
  );
};

export { Navbar };
