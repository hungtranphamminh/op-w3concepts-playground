import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError
} from "@solana/spl-token";

import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { BNB_NATIVE_SOURCE_ASSET, SOL_WRAP_BNB } from "./const";


/** 
 * @description Check if the current solana account has an ATA with the incoming bridge token or not,
 * Auto suggest a transaction that create the ATA if it doesn't exist yet.
 * 
 * Return true if ATA created, false otherwise.
 * 
 * @param Connection Connection -> solana host connection 
 * @param provider Phantom Provider
 * @param owner string -> publickey as string of the current connected wallet account
 *  */  
export const VerifySolanaATA = async(connection:Connection, provider:any, owner:any) => {
  /* retrieve ATA for this publickey + token address pair */
  const associatedTokenAccount = await getAssociatedTokenAddress(new PublicKey(SOL_WRAP_BNB),new PublicKey(owner))
  
  let accountStatus = true

  try {
    const account = await getAccount(connection, associatedTokenAccount);
  } catch (error: unknown) {
    /* TokenAccountNotFoundError can be possible if the associated address has already received some lamports,
     becoming a system account. Assuming program derived addressing is safe, this is the only case for the
     TokenInvalidAccountOwnerError in this code path.*/
    if (error instanceof TokenAccountNotFoundError || error instanceof TokenInvalidAccountOwnerError) {
      try{
        const createTokenAccountInstruction = await createAssociatedTokenAccountInstruction(new PublicKey(owner), associatedTokenAccount, new PublicKey(owner), new PublicKey(SOL_WRAP_BNB))
        const createTokenAccountTransaction = new Transaction().add(createTokenAccountInstruction)    
        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        createTokenAccountTransaction.recentBlockhash = blockhash;
        createTokenAccountTransaction.feePayer = new PublicKey(owner)
    
        const { signature } = await provider.signAndSendTransaction(createTokenAccountTransaction)
        await connection.getSignatureStatus(signature);
      }
      catch(err){
        console.log("error when creating account: ", err)
        accountStatus = false
      }
    }    
  }
  return accountStatus
}