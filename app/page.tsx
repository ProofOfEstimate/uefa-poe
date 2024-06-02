"use client";
import Link from "next/link";
import React from "react";

export default function App() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <PiIcon className="h-6 w-6" />
          <span className="sr-only">Poe</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/betting"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Predictions
          </Link>
          <Link
            href="/leaderboard"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Leaderboard
          </Link>
          <Link
            href="https://get.poe.ag/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 w-full">
        <section className="w-full pt-12 md:pt-18 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16 mb-5">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter mb-3 md:mb-8 sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Where Knowledge Pays Off
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Poe is a platform that empowers users to participate in
                  prediction markets by predicting probabilities rather than
                  just outcomes. It's a fair, scalable, and the future of
                  predictions.
                </p>
                <div className="my-3 sm:my-7">
                  <Link
                    href="/betting"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-[#6c5ce7] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#6c5ce7]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#6c5ce7] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-18">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get to know Poe
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Poe is a platform that empowers users to participate in
                  prediction markets by predicting probabilities rather than
                  just outcomes. Users bet on the likelihood of events and get
                  payouts based on the accuracy of their forecasts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Fairness</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Poe's decentralized platform ensures fair and transparent
                  prediction markets, where users can trust the integrity of the
                  system.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Scalability</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Poe's scalable infrastructure allows for high-volume
                  prediction markets, enabling users to participate in a wide
                  range of events.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">The Future of Predictions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Poe's innovative approach to prediction markets represents the
                  future of forecasting, where users can leverage their
                  knowledge to earn rewards.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          &copy; 2024 Poe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function PiIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="9" x2="9" y1="4" y2="20" />
      <path d="M4 7c0-1.7 1.3-3 3-3h13" />
      <path d="M18 20c-1.7 0-3-1.3-3-3V4" />
    </svg>
  );
}
