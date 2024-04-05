import { Connection, Transaction, PublicKey, TransactionInstruction, SystemProgram, clusterApiUrl } from '@solana/web3.js';
import { MEMO_PROGRAM_ID } from '@solana/spl-memo';

export async function createDocumentPublishTx(
  signerPublickKey: string,
  memo: string
) {

  const connection = new Connection(clusterApiUrl('devnet'));
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;

  const signerAccount = new PublicKey(signerPublickKey);

  const transaction = new Transaction();

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: signerAccount,
      toPubkey: signerAccount,
      lamports: 10000,
    })
  );

  // Add a memo to the transaction
  const memoInstruction = new TransactionInstruction({
    keys: [],
    programId: MEMO_PROGRAM_ID,
    data: Buffer.from(memo),
  });
  transaction.add(memoInstruction);
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = signerAccount

  return transaction
}
