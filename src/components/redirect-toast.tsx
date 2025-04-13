"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookiebyKey, getCookiebyKey } from "@/actions/cookies";


const RedirectToast = () => {
  const pathname = usePathname();
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookiebyKey("toast");

      if (message) {
        toast.success(message);
        deleteCookiebyKey("toast");
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
