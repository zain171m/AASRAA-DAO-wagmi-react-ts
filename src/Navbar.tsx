import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";

import { useReadContract } from "wagmi";
import abi from "./abi/abi.json";
import { formatEther } from "viem";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  //const [Account, setAccount] = useState<UseAccountReturnType>(useAccount());
  let Account = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const result = useReadContract({
    abi,
    address: "0xC6E864c9816FfD3fcc1C501ECCFB3c83EbD62be1",
    functionName: "balanceOf",
    args: [Account.address],
    account: Account.address,
  });

  const balance = result.data
    ? formatEther(BigInt(result.data.toString()))
    : "0";

  //const [balance, setbalance] = useState(weitoeth);

  return (
    <div className="py-3 bg-zinc-900 flex flex-row justify-between align-middle mb-11 flex-wrap px-4">
      <div className="flex flex-row gap-6">
        <button>
          <span className=" text-3xl  font-bold text-white">💰AASRAA💰</span>
        </button>
        <div className="w-80 hidden md:block">
          <label className="mb-2 text-sm font-medium sr-only bg-zinc-900 text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-zinc-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-2 ps-10 text-sm  border rounded-sm bg-zinc-800  border-zinc-700 placeholder-zinc-400 text-white focus:ring-purple-800 focus:border-purple-800"
              placeholder="Search a Campaign"
              required
            />
          </div>
        </div>
      </div>
      <button
        className="text-white text-2xl 2xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖️" : "☰"}
      </button>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } 2xl:flex flex flex-col 2xl:flex-row 2xl:justify-items-center w-full 2xl:w-auto gap-4 mt-4 2xl:mt-0`}
      >
        {/* <button
          // onClick={() => scrollToSection("skills")}
          className="text-white text-lg sm:text-xl hover:bg-purple-800 px-5 rounded-sm shadow-md "
        >
          Skills
        </button> */}

        {Account.address ? (
          <button
            onClick={() => {
              if (Account.address) navigate("create");
            }}
            className="text-white bg-zinc-800 font-bold text-sm h-10 hover:bg-purple-800 px-3 rounded-lg shadow-md "
          >
            Create New Campaign
          </button>
        ) : (
          <div></div>
        )}
        <button
          // onClick={() => scrollToSection("courses")}
          className="text-zinc-400 bg-zinc-800 font-bold text-sm h-10 hover:bg-purple-800 px-3 rounded-lg shadow-md "
        >
          My Balance
          <span className="px-2 text-white">{balance} AASRAA</span>
        </button>

        {Account.address ? (
          <>
            <button className="text-zinc-400 bg-zinc-800 text-sm h-10 hover:bg-purple-800 px-3 rounded-lg shadow-md flex flex-row justify-center gap-2 pt-2">
              <img
                src="https://img.icons8.com/?size=100&id=Oi106YG9IoLv&format=png&color=000000"
                alt="Logo"
                className="object-fill w-6 rounded-full"
              />
              {Account.address?.toString().slice(0, 7) +
                "..." +
                Account.address?.toString().slice(34, 42)}
            </button>
            <button
              onClick={() => disconnect()}
              className="text-white bg-zinc-800 font-bold text-base h-10 hover:bg-purple-800 px-3 rounded-lg shadow-md"
            >
              Disconnect Wallet
            </button>
          </>
        ) : (
          <button
            onClick={() => connect({ connector: metaMask() })}
            className="text-white bg-zinc-800 font-bold text-base h-10 hover:bg-purple-800 px-3 rounded-lg shadow-md"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;

/* <div className=" font-bold rounded-lg bg-gray-900 text-[18px] text-[#3b88c3] p-2">
          <p>Balance: 67 ASRA</p>
        </div> */
