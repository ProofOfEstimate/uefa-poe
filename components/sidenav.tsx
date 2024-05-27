"use client";

export default function SideNav() {
  return (
    <div className="flex flex-col items-center py-4 px-10 gap-8 mt-16 fixed hover:cursor-pointer">
      <div onClick={() => scrollTo("matchday1")} className="text-xl font-bold">
        Matchday 1
      </div>
      <div
        onClick={() => scrollTo("matchday2")}
        className="text-xl font-bold  hover:cursor-pointer"
      >
        Matchday 2
      </div>
      <div
        onClick={() => scrollTo("matchday3")}
        className="text-xl font-bold  hover:cursor-pointer"
      >
        Matchday 3
      </div>
      <div
        onClick={() => scrollTo("round16")}
        className="text-xl font-bold  hover:cursor-pointer"
      >
        Round of 16
      </div>
      <div
        onClick={() => scrollTo("quarter")}
        className="text-xl font-bold  hover:cursor-pointer"
      >
        Quarter Finals
      </div>
      <div
        onClick={() => scrollTo("semi")}
        className="text-xl font-bold  hover:cursor-pointer"
      >
        Semi Finals
      </div>
      <div
        onClick={() => scrollTo("final")}
        className="text-xl font-bold  hover:cursor-pointer"
      >
        Finals
      </div>
    </div>
  );
}

function scrollTo(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}
