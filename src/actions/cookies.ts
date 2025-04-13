"use server"
import { cookies } from "next/headers"

export const getCookieByKey = async (Key: string) => {
   const cookie =  (await cookies()).get(Key);

   if (!cookie) {
      return null
   }

    return cookie.value;
}

export const setCookieByKey = async (Key: string, value: string) => {
   (await cookies()).set(Key, value)
}

export const deleteCookieByKey = async (Key: string) => {
    (await cookies()).delete(Key);
   }