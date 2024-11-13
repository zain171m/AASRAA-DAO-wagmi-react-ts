import CountBox from "./Countbox";
import { useLocation } from "react-router-dom";
import { Tcampaign } from "./Types.ts";
//import { daysLeft } from "./utils";
import { formatEther, parseEther } from "viem";
import { useWriteContract, useReadContract } from "wagmi";
import abi from "./abi/abi.json";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const CampaignDetails = () => {
  const [showModal, setShowModal] = useState<string>();
  const { writeContractAsync } = useWriteContract();
  const location = useLocation();
  const { campaign } = location.state as { campaign: Tcampaign };

  const result = useReadContract({
    abi,
    address: "0xC6E864c9816FfD3fcc1C501ECCFB3c83EbD62be1",
    functionName: "getDonors",
    args: [campaign.pId],
  });

  if (result.error) {
    throw "campaings not loaded successfully";
  }

  const [donors, setDonors] = useState<string[]>([]);
  const [balances, setBalances] = useState<bigint[]>([]);

  useEffect(() => {
    if (result.isFetched && result?.data) {
      // Type assertion for donations
      const donations = result.data as [string[], bigint[]];

      if (donations) {
        // Update the state
        setDonors(donations[0]);
        setBalances(donations[1]);
      }
    }
  }, [result]);

  // if (result.isFetched) {
  //   const donations: any = result?.data;
  //   console.log(result);
  //   //console.log(donations[0][0]);
  //   if (donations) {
  //     const numberOfDonations = donations[0]?.length;
  //     console.log(numberOfDonations);
  //   }

  //   const [donors, balances]: [string[], string[]] = donations;
  // }

  // const parsedDonations = [];
  // if (parsedDonations.length === 1)
  //   for (let i = 0; i < numberOfDonations; i++) {
  //     parsedDonations.push({
  //       donator: donations[0][i],
  //       donation: formatEther(donations[1][i].toString()),
  //     });
  //   }

  return (
    // <div>
    //   <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
    //     <div className="flex-1 flex-col">
    //       <img
    //         src="https://images.newscientist.com/wp-content/uploads/2021/12/14153826/PRI_214936025.jpg"
    //         alt="campaign"
    //         className="w-full h-[410px] object-cover rounded-xl"
    //       />
    //       <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
    //         <div className="absolute h-full bg-[#4acd8d]"></div>
    //       </div>
    //     </div>

    //     <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
    //       <CountBox title="Days Left" value="5" />
    //       <CountBox title={`Raised of 8`} value="5" />
    //       <CountBox title="Total Backers" value="6" />
    //     </div>
    //   </div>

    //   <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
    //     <div className="flex-[2] flex flex-col gap-[40px]">
    //       <div>
    //         <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
    //           Creator
    //         </h4>

    //         <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
    //           <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
    //             <img
    //               src="https://images.newscientist.com/wp-content/uploads/2021/12/14153826/PRI_214936025.jpg"
    //               alt="user"
    //               className="w-[60%] h-[60%] object-contain"
    //             />
    //           </div>
    //           <div>
    //             <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
    //               {campaign.ownerName}
    //             </h4>
    //             <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
    //               10 Campaigns
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       <div>
    //         <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
    //           Story
    //         </h4>

    //         <div className="mt-[20px]">
    //           <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
    //             {campaign.description}
    //           </p>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="mt-[20px] flex flex-col gap-4">
    //           <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
    //             No donators yet. Be the first one!
    //           </p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex-1">
    //       <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
    //         Vote
    //       </h4>

    //       <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
    //         <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
    //           Vote for campaign approval or dissapproval
    //         </p>
    //         <div className="mt-[30px]">
    //           <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
    //             <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
    //               Back it because you believe in it.
    //             </h4>
    //             <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
    //               Vote the campaign to approve it to receive donations
    //             </p>
    //           </div>

    //           <button
    //             type="button"
    //             className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd]`}
    //           >
    //             Vote for approval
    //           </button>

    //           <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
    //             <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
    //               Skeptical about campaign legitimacy? No worries.
    //             </h4>
    //             <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
    //               You can vote for the dissapproval of the campaign
    //             </p>
    //           </div>

    //           <button
    //             type="button"
    //             className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd]`}
    //           >
    //             Vote for dissapproval
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="px-5">
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={campaign.imageUrl}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]"></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value="56" />
          <CountBox
            title={`Raised of ${formatEther(campaign.amountGoal)}`}
            value={formatEther(campaign.amountCollected)}
          />
          <CountBox
            title="Total Backers"
            value={campaign.donors.length.toString()}
          />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-lg text-white uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={campaign.imageUrl}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {campaign.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-lg text-white uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {campaign.description}
              </p>
            </div>
          </div>
          {campaign.approved ? (
            <div>
              <div className="mt-[20px] flex flex-col gap-4">
                {donors.length > 0 ? (
                  donors.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                        {index + 1}. {item}
                      </p>
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                        {formatEther(balances[index])}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className="my-2 font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                Votes are based on number of ASRA tokens donors hold
              </p>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Approval Votes
              </h4>
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {formatEther(campaign.yesCount)}
              </p>

              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Disapproval Votes
              </h4>
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {formatEther(campaign.noCount)}
              </p>
            </div>
          )}
        </div>
        {campaign.approved ? (
          <form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formObj = new FormData(e.currentTarget);
              console.log("arrived");
              const amount = formObj.get("amount")?.toString() ?? "0";
              try {
                const tnx = await writeContractAsync({
                  abi,
                  address: "0xC6E864c9816FfD3fcc1C501ECCFB3c83EbD62be1",
                  functionName: "donateCampaign",
                  args: [campaign.pId],
                  value: parseEther(amount),
                });
                setShowModal(
                  `Transaction in progress with hash ${tnx.substring(
                    0,
                    10
                  )}....`
                );
                // Wait for approximately 6 seconds for 3 block confirmations
                await new Promise((resolve) => setTimeout(resolve, 7000));
                window.location.reload();
              } catch (error) {
                setShowModal(
                  `Transaction Failed with error ${(error as string).substring(
                    0,
                    20
                  )}`
                );
              }
            }}
          >
            <div className="flex-1">
              <h4 className="font-epilogue font-semibold text-lg text-white uppercase">
                Fund
              </h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue fount-medium text-lg leading-[30px] text-center text-[#808191]">
                  Fund the campaign
                </p>
                <div className="mt-[30px]">
                  <input
                    id="amount"
                    required
                    name="amount"
                    type="number"
                    placeholder="CANTO 0.1"
                    step="0.01"
                    className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  />

                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Support the project and receive AASRA tokens to vote other
                      campaigns
                    </p>
                  </div>

                  <button
                    type="submit"
                    className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd]`}
                  >
                    Fund Campaign
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          // const vote = async (pId) => {
          //   const data = await contract.call('castVote', [pId, true]);
          //   return data;
          // }
          <form
            onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const nativeEvent = e.nativeEvent as SubmitEvent;
              const button = nativeEvent.submitter as HTMLButtonElement;
              const isApproved = button.value === "approve";
              try {
                const tnx = await writeContractAsync({
                  abi,
                  address: "0xC6E864c9816FfD3fcc1C501ECCFB3c83EbD62be1",
                  functionName: "castVote",
                  args: [campaign.pId, isApproved],
                });
                setShowModal(
                  `Transaction in progress with hash ${tnx.substring(0, 4)}`
                );
                await new Promise((resolve) => setTimeout(resolve, 9000));
                window.location.reload();
              } catch (error) {
                setShowModal(`Transaction Failed`);
                await new Promise((resolve) => setTimeout(resolve, 9000));
                setShowModal("");
              }
            }}
          >
            <div className="flex-1">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Vote
              </h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                  Vote for campaign approval or dissapproval
                </p>
                <div className="mt-[30px]">
                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Vote the campaign to approve it to receive donations
                    </p>
                  </div>

                  <button
                    type="submit"
                    name="vote"
                    value="approve"
                    className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd]`}
                  >
                    Vote for approval
                  </button>

                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Skeptical about campaign legitimacy? No worries.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      You can vote for the dissapproval of the campaign
                    </p>
                  </div>

                  <button
                    type="submit"
                    name="vote"
                    value="disapprove"
                    className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] w-full bg-[#8c6dfd]`}
                  >
                    Vote for dissapproval
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {showModal ? (
          <Modal>
            <div>
              <div className="flex justify-center items-center w-full h-screen fixed bg-slate-900 bg-opacity-90 z-20">
                <div className="w-full md:w-1/2 lg:w-1/3 bg-slate-800 p-12 mx-6 sm:mx-12 md:mx-18 rounded">
                  <h1 className="text-center text-white text-2xl">
                    {showModal}
                  </h1>
                  <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                      <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* <button
                      className="button"
                      onClick={() => {
                        // setAdoptedPet(pet);
                        // navigate("/");
                      }}
                    >
                      Yes
                    </button> */}
                  {/* <button
                    className="text-white h-3 text-center"
                    onClick={() => setShowModal("")}
                  >
                    Ok
                  </button> */}
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignDetails;
