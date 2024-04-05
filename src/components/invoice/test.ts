// // import { encode } from "bs58";


// const doc = {
//   signer: {
//     address: "BgyZX9JK65sHfmjr8raLNc5DCWx5WSVQdZfSoP58yUk5",
//     signature: "",
//   },
//   id: documentId,
// };

// const encodedMessage = new TextEncoder().encode(doc.id);
// const signedMessage = await provider.signMessage(encodedMessage, "utf8");
// const signerSignature = encode(signedMessage.signature);
// doc.signer.signature = signerSignature;

// // await fetch("http://localhost:3000/docs/create/pair-document", {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   body: JSON.stringify(doc),
// // })




// const signData = {
//   signer: {
//     address: "BgyZX9JK65sHfmjr8raLNc5DCWx5WSVQdZfSoP58yUk5",
//     signature: signerSig,
//   },
//   id: documentId,
// };

// await fetch("http://localhost:3000/docs/sign/pair-document", {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(signData),
// });