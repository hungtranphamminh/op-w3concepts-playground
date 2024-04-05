"use client";
import { AUTH_TOKEN } from "@/utils/authToken";
// import { createDocumentPublishTx } from "@/utils/sign/signDoc";
// import { getTransactionDetails } from "@/utils/sign/verifyDoc";
import { getProvider } from "@/utils/wallet/phantomWallet";
import { encode } from "bs58";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PartnerDocuSignV2() {
  const searchParams = useSearchParams();
  const documentId = searchParams.get("id");

  const [doc, setDoc] = useState<any>(null);

  useEffect(() => {
    console.log("document id is: ", documentId);
    RetrieveDocToSign();
  }, []);

  const RetrieveDocToSign = async () => {
    await fetch(
      `http://localhost:3000/docs/pair-document-wsig/retrieve?id=${documentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("document retrieve is: ", data);
        setDoc(data[0]);
      })
      .catch((error) => console.error("Error:", error));
  };

  const signOffChain = async (provider: any) => {
    const encodedMessage = new TextEncoder().encode(doc.id);
    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
    const signerSignature = encode(signedMessage.signature);
    return signerSignature;
  };

  const publishMessage = async () => {};

  const HandleSignAndSubmit = async () => {
    const provider = getProvider();

    const signerSig = await signOffChain(provider);
    console.log("signer signature is: ", signerSig);
    console.log("owner signature is: ", doc.owner.signature);
    // const publishTx = await createDocumentPublishTx(
    //   doc.signer.address,
    //   signerSig + " with " + doc.owner.signature
    // );
    // console.log("publish tx: ", publishTx);
    // const signature = await provider.signAndSendTransaction(publishTx);
    // await getTransactionDetails(signature.signature);

    const signData = {
      signer: {
        address: "BgyZX9JK65sHfmjr8raLNc5DCWx5WSVQdZfSoP58yUk5",
        signature: signerSig,
      },
      id: documentId,
    };

    await fetch("http://localhost:3000/docs/sign/pair-document", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signData),
    });
  };

  return (
    <div className="w-full h-full flex  items-center justify-start p-10 gap-10">
      {/* document info */}
      <section className="w-[500px]">
        <section className=" flex items-center gap-10 mb-10">
          {/* submit */}
          <button
            onClick={HandleSignAndSubmit}
            type="button"
            className="px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4 text-white me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
            Sign Contract
          </button>
        </section>

        {/* contract name */}
        <div className=" mb-10">
          {/* name */}
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Document Title
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input Document Title"
              value={doc?.content.title ? doc.content.title : undefined}
              required
              readOnly
            />
          </div>
        </div>
        <div className=" mb-10">
          {/* desc */}
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Document Description
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input Document Description"
              value={
                doc?.content.description ? doc.content.description : undefined
              }
              required
              readOnly
            />
          </div>
        </div>
        <div className=" mb-10">
          {/* owner */}
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Owner Address
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input Partner Address"
              value={doc?.owner.address ? doc.owner.address : undefined}
              required
            />
          </div>
        </div>
        <div className=" mb-10">
          {/* parter */}
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Partner Address
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Input Partner Address"
              value={doc?.signer.address ? doc.signer.address : undefined}
              required
            />
          </div>
        </div>
      </section>
      {/* contract display */}
      {doc?.content.fileContent ? (
        <object
          data={`${doc.content.fileContent}`}
          type="application/pdf"
          width="100%"
          height="800px"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
