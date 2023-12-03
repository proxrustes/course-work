import { decodeJwt } from "jose"
import { verify } from "./verify"
import { user } from "@prisma/client"

export async function parse(token: string) {
  try {
    if (token && (await verify(token))) {
      const user = decodeJwt(token) as user
      return user
    }
    return null
  } catch (e) {
    return null
  }
}
