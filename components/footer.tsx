import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2 bottom-0 w-full">
      <div className="flex justify-center space-x-8">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://discord.gg/HNxstUVC"}
        >
          <FaDiscord size={40} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://twitter.com/ProofOfEstimate"}
        >
          <FaXTwitter size={40} />
        </Link>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={"https://t.me/+19Jfbq7Pl1phNWIy"}
        >
          <FaTelegramPlane size={40} />
        </Link>
      </div>
      <div className="text-center text-sm">
        &copy; {new Date().getFullYear()} Poe. All rights reserved.
      </div>
    </footer>
  );
};
