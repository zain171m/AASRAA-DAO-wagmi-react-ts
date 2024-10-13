import { defineChain } from "viem";

const Canto = defineChain({
  id: 7701,
  name: "Canto Testnet",
  nativeCurrency: { name: "CANTO", symbol: "CANTO", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://canto-testnet.plexnode.wtf"] },
  },
  blockExplorers: {
    default: { name: "tuber", url: "https://testnet.tuber.build/" },
  },
});

export default Canto;
