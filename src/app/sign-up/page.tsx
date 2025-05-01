import Link from "next/link";
import { CardCompact } from "@/components/ui/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/path";

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign Up"
        content={<SignUpForm />}
        description="Create a new account to get started"
        className="w-full max-w-[420px]"
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath()}>
            Already have an account? Log in
          </Link>
        }
      />
    </div>
  );
};

export default SignUpPage;
