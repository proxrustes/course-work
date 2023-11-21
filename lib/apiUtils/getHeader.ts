export async function getHeader(req: Request, header: string) {
    const headers = await req.headers
    try {
      return headers.get(header)
    } catch (e) {
      return e
    }
  }
  