import TableRow from "@/components/TableRow";
import React from "react";

const Leaderboard = () => {
  const data = [
    { number: 1, name: "Thomas", points: "258.244", isGold: true },
    { number: 2, name: "Abhishek", points: "258.242" },
    { number: 3, name: "Mark Anderson", points: "258.223" },
    { number: 4, name: "Github", points: "258.212" },
    { number: 5, name: "Johnny Suh", points: "258.208" },
  ];
  return (
    <div className="h-full w-full min-h-screen bg-[#fbfaff] flex items-center justify-center">
      <main className="w-[40rem] h-[43rem] bg-white shadow-[0px_5px_15px_8px_#e4e7fb] flex flex-col items-center rounded-lg">
        <div
          id="header"
          className="w-full flex items-center justify-between p-10"
        >
          <h1 className="font-rubik text-[1.7rem] text-[#141a39] uppercase cursor-default">
            Ranking
          </h1>
        </div>
        <div id="leaderboard" className="w-full relative">
          <div className="w-[42rem] h-[5.5rem] bg-[#5c5be5] absolute top-[-0.5rem] left-[-1rem] shadow-[0px_15px_11px_-6px_#7a7a7d]">
            <div className="absolute bottom-[-0.8rem] left-[0.35rem] w-[1.5rem] h-[1.5rem] bg-[#5c5be5] rotate-45 z-[-1]"></div>
            <div className="absolute bottom-[-0.8rem] right-[0.35rem] w-[1.5rem] h-[1.5rem] bg-[#5c5be5] rotate-45 z-[-1]"></div>
          </div>
          <table className="w-full border-collapse table-fixed text-[#141a39] cursor-default">
            {data.map((row, index) => (
              <TableRow key={index} {...row} />
            ))}
          </table>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
