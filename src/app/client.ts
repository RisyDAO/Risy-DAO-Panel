import { createThirdwebClient, getContract } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { CONTRACTS } from "./constants";

// Replace this with your client ID string
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

// Create the thirdweb client
export const client = createThirdwebClient({
  clientId: clientId,
});

// Get RISY token contract
export const risyTokenContract = getContract({
  client,
  chain: polygon,
  address: CONTRACTS.RISY_TOKEN,
});
