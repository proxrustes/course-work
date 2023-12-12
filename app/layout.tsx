"use client"
import { Header } from "@/components/common/Header"
import { user } from "@prisma/client";
import { decodeJwt } from "jose";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
 
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
