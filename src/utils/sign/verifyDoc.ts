import { Connection, clusterApiUrl } from "@solana/web3.js";
import { MEMO_PROGRAM_ID } from '@solana/spl-memo';

async function checkTransactionStatus(signature: string, connection: Connection) {
  let status = null;

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      status = await connection.getSignatureStatus(signature);
      console.log("Status retrieve: ", status);

      if (status && status.value && status.value.confirmations === null) {
        console.log('Transaction is finalized');
        clearInterval(intervalId);
        resolve(true)
      }
    }, 2500);
  })
}

export async function getTransactionDetails(signature: string) {
  const connection = new Connection(clusterApiUrl('devnet'));
  console.log("signature  is: ", signature)

  await checkTransactionStatus(signature, connection)
    .then(async (res) => {

      const parsedTransaction = await connection.getParsedTransaction(signature);
      await getTransactionMemo(parsedTransaction)
    })
}

async function getTransactionMemo(parsedTransaction: any) {
  if (parsedTransaction) {
    for (let instruction of parsedTransaction.transaction.message.instructions) {
      if (instruction.programId.equals(MEMO_PROGRAM_ID)) {
        let memo;
        if ('parsed' in instruction) {
          console.log("instruction parsed: ", instruction.parsed)
          return instruction.parsed
        }
      }
    }
  }
}
