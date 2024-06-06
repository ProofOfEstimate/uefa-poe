"use client";

import QuickTourDialog from "./quick-tour-dialog";

export default function SideNav() {
  return (
    <div className="flex flex-col items-start py-4 px-10 gap-8 mt-4 pb-40 fixed h-full overflow-scroll">
      <QuickTourDialog />
      <SideNavItem id="matchday1" title="Matchday 1" />
      <SideNavItem id="matchday2" title="Matchday 2" />
      <SideNavItem id="matchday3" title="Matchday 3" />
      <SideNavItem id="round16" title="Round of 16" />
      <SideNavItem id="quarter" title="Quarter Finals" />
      <SideNavItem id="semi" title="Semi Finals" />
      <SideNavItem id="final" title="Finals" />
    </div>
  );
}

function scrollTo(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}

const SideNavItem = ({ id, title }: { id: string; title: string }) => {
  return (
    <div
      onClick={() => scrollTo(id)}
      className="text-lg p-2 rounded-md font-semibold hover:cursor-pointer hover:bg-slate-300"
    >
      {title}
    </div>
  );
};
