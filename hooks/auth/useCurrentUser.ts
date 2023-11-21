import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { decodeJwt } from "jose"
import { user } from "@prisma/client"

const useCurrentUser = (): [user | null] => {
  const [currentUser, setUser] = useState<user | null>(null)

  useEffect(() => {
    const token = Cookies.get("currentUser")
    if (token) {
      const json = decodeJwt(token) as user
      setUser(json)
    } else {
      setUser({} as user)
    }
  }, [])

  return [currentUser]
}

export default useCurrentUser
