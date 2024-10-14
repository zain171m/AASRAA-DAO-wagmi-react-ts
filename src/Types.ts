export type Tcampaign = {
  owner: string;
  ownerName: string;
  title: string;
  description: string;
  amountGoal: bigint;
  deadline: number;
  amountCollected: bigint;
  imageUrl: string;
  pId: number;
  approved: boolean;
  yesCount: bigint;
  noCount: bigint;
  donations: bigint[];
  donors: string[];
};
