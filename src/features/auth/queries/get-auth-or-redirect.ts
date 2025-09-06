import { redirect } from "next/navigation";
import { getAuth } from "@/features/auth/queries/get-auth";
import { signInPath } from "@/path";

export const getAuthOrRedirect = async () => {
  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }
};
