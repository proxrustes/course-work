"use client"

import ThemeRegistry from "@/components/ThemeRegistry"
import { CssBaseline } from "@mui/material"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
 
  return (
    <html lang="en">
      <body>  <ThemeRegistry options={{ key: "mui" }}>
      <CssBaseline />
            {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
