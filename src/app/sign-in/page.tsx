import Link from "next/link";
import { CardCompact } from "@/components/ui/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { passwordForgotPath, signUpPath } from "@/path";

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Sign In"
        content={<SignInForm />}
        description="Already have an account? Log in to access your account"
        className="w-full max-w-[420px]"
        footer={
          <div className="flex justify-between items-center w-full">
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account? Create one
            </Link>

            <Link
              className="text-sm text-muted-foreground"
              href={passwordForgotPath()}
            >
              Forgot password?
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default SignInPage;
