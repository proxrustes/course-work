import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { decodeJwt } from "jose"
import { User } from "../../definitions/types/user"

const useCurrentUser = (): [User | null] => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = Cookies.get("currentUser")
    if (token) {
      const json = decodeJwt(token) as User
      setUser(json)
    } else {
      setUser({} as User)
    }
  }, [])

  return [user]
}

export default useCurrentUser
