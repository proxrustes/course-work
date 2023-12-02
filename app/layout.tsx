import { Header } from "@/components/common/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><Header/>{children}</body>
    </html>
  )
}
