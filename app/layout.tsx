import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import SideNav from "@/components/sidenav";
import { Separator } from "@/components/ui/separator";

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
        <h1 className="text-center p-8 text-4xl font-bold">
          UEFA Championship powered by Poe
        </h1>
        <Separator />
        <div className="flex">
          <aside className="hidden md:block md:min-w-40 md:w-1/5 lg:w-1/6 border-r">
            <SideNav />
          </aside>
          {children}
        </div>
      </body>
    </html>
  );
}
