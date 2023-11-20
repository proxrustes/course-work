import { decodeJwt } from "jose"
import { User } from "../../definitions/types/user"
import { verify } from "./verify"

export async function parse(token: string) {
  try {
    if (token && (await verify(token))) {
      const user = decodeJwt(token) as User
      return user
    }
    return null
  } catch (e) {
    return null
  }
}
