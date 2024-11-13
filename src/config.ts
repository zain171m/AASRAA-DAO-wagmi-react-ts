import { createConfig, http } from "@wagmi/core";
import { createClient } from "viem";
import { type Config } from "@wagmi/core";
import Canto from "./Canto.ts";

const config: Config = createConfig({
  chains: [Canto],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

export default config;
