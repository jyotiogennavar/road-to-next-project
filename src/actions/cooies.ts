"use server"
import { cookies } from "next/headers"

export const getCookiebyKey = async (Key: string) => {
   const cookie =  (await cookies()).get(Key);

   if (!cookie) {
      return null
   }

    return cookie.value;
}

export const setCookiebyKey = async (Key: string, value: string) => {
   (await cookies()).set(Key, value)
}

export const deleteCookiebyKey = async (Key: string) => {
    (await cookies()).delete(Key)
  }