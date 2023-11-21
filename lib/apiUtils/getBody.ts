export async function getBody(req: Request) {
    try {
      return await req.json()
    } catch {
      return await req.body
    }
  }
  