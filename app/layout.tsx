import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import SideNav from "@/components/sidenav";
import { Separator } from "@/components/ui/separator";
import Providers from "./providers";
import { NavBar } from "@/components/nav-bar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <h1 className="text-center p-8 text-4xl font-bold">
            UEFA Championship powered by Poe
          </h1>
          <NavBar />
          <Separator />
          {children}
        </Providers>
      </body>
    </html>
  );
}
