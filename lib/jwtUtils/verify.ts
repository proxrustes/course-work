import { jwtVerify } from "jose"

export async function verify(token: string) {
  try {
    const secret = process.env.JWT_KEY
    await jwtVerify(token, new TextEncoder().encode(secret))
    return true
  } catch (e) {
    console.log("error:", e)
    return false
  }
}
