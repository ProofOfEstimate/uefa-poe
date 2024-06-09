import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface TableRowProps {
  number: number;
  name: string;
  points: string;
  isGold?: boolean;
  highlight: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  number,
  name,
  points,
  isGold,
  highlight,
}) => {
  const hoverClasses =
    highlight && number !== 1
      ? "bg-blue-400 scale-110 shadow-[0px_5px_15px_8px_#e4e7fb]"
      : "";

  return (
    <tr
      className={clsx(
        `transition-all duration-200 ease-in-out rounded-md ${hoverClasses}`
      )}
    >
      <td className="h-[5rem] font-rubik text-[2.2rem] font-bold text-left">
        {number}
      </td>
      <td className="h-[5rem] font-rubik text-[1.2rem] text-left">{name}</td>
      <td className="h-[5rem] font-rubik text-[1.3rem] font-bold flex justify-end items-center">
        {points}
        {isGold && (
          <Image
            width={50}
            height={50}
            className="h-[3rem] ml-[1.5rem] hidden sm:block"
            src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
            alt="gold medal"
          />
        )}
      </td>
    </tr>
  );
};

export default TableRow;
