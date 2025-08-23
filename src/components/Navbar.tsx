"use client";

import { LogOut, SquareKanban } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions/sign-out";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/path";
import { SubmitButton } from "./form/submit-button";
import { ThemeSwitcher } from "./theme/theme-switcher";

const Navbar = () => {

  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return <div>Loading...</div>;
  }


  const navItems = user ? (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>
      <form action={signOut}>
        <SubmitButton label="Sign Out" icon={<LogOut />} />
      </form>
    </>
  ) : (
    <>

      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <>
      <nav className="animate-in fade-in duration-100 supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
        <Button asChild variant="ghost">
          <Link href={homePath()}>
            <SquareKanban />
            TicketBounty
          </Link>
        </Button>

        <div className="flex gap-x-2">
          <ThemeSwitcher />
          {navItems}
        </div>
      </nav>
    </>
  );
};

export { Navbar };
