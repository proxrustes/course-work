"use client"
import { useParams } from "next/navigation"
import { ERROR_TYPES } from "../../../components/common/enums/errors"
import { ErrorMessage } from "../../../components/common/ErrorMessage"

export default function ErrorPage() {
  const params = useParams()
  switch (params.type) {
    case ERROR_TYPES.ACCESS_DENIED:
      return <ErrorMessage errorCode={401} errorText="you really shouldn't be here" />
    default:
      return <div>an error occured</div>
  }
}
