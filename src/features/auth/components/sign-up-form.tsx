"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <Input className="mt-2" type="text" name="username" placeholder="Username" required />
      <FieldError name="username" actionState={actionState} />
      
      <Input className="mt-2" type="email" name="email" placeholder="Email" required />
      <FieldError name="email" actionState={actionState} />
      
      <Input className="mt-2" type="password" name="password" placeholder="Password" required />
      <FieldError name="password" actionState={actionState} />
      
      <Input className="mt-2" type="password" name="confirmPassword" placeholder="Confirm Password" required />
      <FieldError name="confirmPassword" actionState={actionState} />
      
      
      <SubmitButton label="Sign Up" />
  
    </Form>
  );
};

export { SignUpForm };
