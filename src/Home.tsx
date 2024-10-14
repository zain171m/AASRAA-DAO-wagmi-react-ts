import { PiUserCircle } from "react-icons/pi";
import abi from "./abi/abi.json";
import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { Link } from "react-router-dom";
import { Tcampaign } from "./Types.ts";

// type Tcampaign = {
//   owner: string;
//   ownerName: string;
//   title: string;
//   description: string;
//   amountGoal: bigint;
//   deadline: number;
//   amountCollected: bigint;
//   imageUrl: string;
//   pId: number;
//   approved: boolean;
//   yesCount: bigint;
//   noCount: bigint;
//   donations: bigint[];
//   donors: string[];
// };

const Home = () => {
  const result = useReadContract({
    abi,
    address: "0xC6E864c9816FfD3fcc1C501ECCFB3c83EbD62be1",
    functionName: "getCampaigns",
  });

  if (result.error) {
    throw "campaings not loaded successfully";
  }

  let campaigns: Tcampaign[] = [];
  if (result.isFetched) {
    const ucampaigns: Tcampaign[] = result?.data as Tcampaign[];
    // Add the campaign_id to each object using map
    const campaignsWithId = ucampaigns.map((ucampaigns, index) => ({
      ...ucampaigns,
      pId: index,
    }));
    campaigns = campaignsWithId.filter(
      (campaign) => campaign.approved === true
    );
  }
  return (
    <div
      id="skills"
      className="bg-zinc-900 pb-8 px-4 xl:px-28 lg:px-20 sm:px-8"
    >
      <div className="py-3 flex flex-col gap-2">
        <h1 className="text-2xl text-white">All Campaigns</h1>
        <p className="text-sm text-zinc-300">
          Discover all approved campaings and donate"
        </p>
      </div>

      <div className=" grid lg:grid-cols-3 sm:grid-cols-2 xs:sm:grid-cols-1 gap-4">
        {result.isLoading && <div className="animate-pulse text-5xl">🔍</div>}
        {result.isFetched && campaigns?.length === 0 && (
          <p className="font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
        {result.isFetched &&
          campaigns?.map((campaign, i) => (
            <Link to={`/details/${campaign.pId}`} state={{ campaign }} key={i}>
              <div
                key={i}
                className="border border-zinc-600 bg-zinc-800 text-warm-white rounded-xl px-2"
              >
                <div className="flex items-center gap-1 p-3 overflow-hidden">
                  <PiUserCircle
                    size={20}
                    className="text-accent text-purple-600"
                  />
                  <span className="text-xs text-zinc-300 truncate">
                    {campaign.owner}
                  </span>
                </div>
                <img
                  //onClick={handleClick}
                  src={campaign.imageUrl}
                  //alt={title}
                  className="w-full aspect-video object-cover rounded-xl border border-zinc-600 cursor-pointer"
                />
                <div className="p-3">
                  <h2 className="text-white line-clamp-1 font-medium">
                    {campaign.title}
                  </h2>
                </div>

                <div className="p-3">
                  {/* <ProgressBar goal={target} raisedAmount={amountCollected} /> */}
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div className="flex flex-col gap-0">
                    <h2 className="text-lg font-bold text-white">
                      {formatEther(campaign.amountCollected)} ETH
                    </h2>
                    <p className="text-xs text-zinc-300">
                      Collected of {formatEther(campaign.amountGoal)} ETH
                    </p>
                  </div>

                  <div className="flex flex-col gap-0">
                    <h2 className="text-lg font-bold text-white">
                      6 {7 > 1 ? "days" : "day"}
                    </h2>
                    <p className="text-xs text-zinc-300">Remaining</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
