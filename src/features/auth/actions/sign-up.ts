"use server";
import {hash} from "@node-rs/argon2"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";


const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(20)
      .refine((value) => !value.includes(" "), {
        message: "Username cannot contain spaces",
      }),
    email: z.string().email().min(1, { message: "Email is required" }).max(191),
    password: z
      .string()
      .min(8)
      .max(100, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (_actionState: ActionState, formData: FormData) => {
  try {
    // doing all the validation in one go
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData.entries())
    );

    // hashing the password
const passwordHash = await hash(password);

// creating the user in the database with the hashed password
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    // creating a session for the user
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};
