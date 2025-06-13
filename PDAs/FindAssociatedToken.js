import { PublicKey } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token"

// Replace these with your actual values
const userAddress = new PublicKey('A47eAaGzVVSBKoPzkNvBdLh3oMEJUn9TKixbPcEhHXfP');
const tokenMintAddress = new PublicKey('4188asth49QkyyxiiXMjTKpjdFdhzU8LX7VucVp2sa3u');

// Derive the associated token address
const getAssociatedTokenAddress = (mintAddress, ownerAddress) => {
    return PublicKey.findProgramAddressSync(
        [
            ownerAddress.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintAddress.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
};

const [associatedTokenAddress, bump] = getAssociatedTokenAddress(tokenMintAddress, userAddress);
console.log(`Associated Token Address: ${associatedTokenAddress.toBase58()}, bump: ${bump}`);


const PDA = PublicKey.createProgramAddressSync(
  [userAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer(), Buffer.from([bump])],
  ASSOCIATED_TOKEN_PROGRAM_ID,
);
 
console.log(`PDA: ${PDA}`);