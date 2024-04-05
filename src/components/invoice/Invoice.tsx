"use client";
import { useState, useEffect } from "react";
import { getProvider } from "@/utils/wallet/phantomWallet";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { encode } from "bs58";

export interface Document {
  signer: {
    address: string | null;
    signature: string | null;
  };
  owner: {
    address: string | null;
    signature: string | null;
  };
  id: string;
  content: {
    title: string | null;
    description: string | null;
    fileContent: string | ArrayBuffer | null;
  };
}

export default function DocuSign() {
  const router = useRouter();

  const [doc, setDoc] = useState<Document>({
    signer: {
      address: "BgyZX9JK65sHfmjr8raLNc5DCWx5WSVQdZfSoP58yUk5",
      signature: "",
    },
    owner: {
      address: "3J1LVuiwSy23KiRnnCFttxtpxwzRLMogJLqoDSou3ywP",
      signature: "",
    },
    id: uuidv4(),
    content: {
      title: "Business Contract",
      description: "Business contract between A and B",
      fileContent: null,
    },
  });

  const [docId, setDocId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("file update: ", e.target.files[0]);
      const file = e.target.files[0];

      /* create file reader */
      const reader = new FileReader();
      reader.onloadend = () => {
        // The result attribute contains the data as a Base64 encoded string
        const base64String = reader.result;
        console.log("File Base64 String: ", base64String);
        SetFileContent(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const SetTitle = (title: string) => {
    setDoc((currentDoc) => {
      let tempDoc = { ...currentDoc };
      tempDoc.content.title = title;
      return tempDoc;
    });
  };
  const SetDesc = (desc: string) => {
    setDoc((currentDoc) => {
      let tempDoc = { ...currentDoc };
      tempDoc.content.description = desc;
      return tempDoc;
    });
  };
  const SetSigner = (signer: string) => {
    setDoc((currentDoc) => {
      let tempDoc = { ...currentDoc };
      tempDoc.signer.address = signer;
      return tempDoc;
    });
  };
  const SetFileContent = (content: string | ArrayBuffer | null) => {
    setDoc((currentDoc) => {
      let tempDoc = { ...currentDoc };
      tempDoc.content.fileContent = content;
      return tempDoc;
    });
  };

  const ToPartnerSign = () => {
    router.push("/invoice/sign?id=" + docId);
  };

  const HandleSubmit = async () => {
    console.log("current contract info : ", doc);

    let docToSign = { ...doc };

    const provider = getProvider();
    const encodedMessage = new TextEncoder().encode(doc.id);
    const signedMessage = await provider.signMessage(encodedMessage, "utf8");
    const ownerSignature = encode(signedMessage.signature);
    docToSign.owner.signature = ownerSignature;

    console.log("full create payload is: ", docToSign);
    await fetch("http://localhost:3000/docs/create/pair-document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(docToSign),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response data is: ", data);
        setDocId(data.documentId);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=" w-full h-full flex  items-center justify-start p-10 gap-10">
      {/* contract upload */}
      <div className="flex flex-col items-center justify-center w-fit">
        {/* submit section */}
        <section className=" flex items-center gap-10">
          {/* submit */}
          <button
            onClick={HandleSubmit}
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
            Submit Contract
          </button>
          {/* partner sign */}
          {docId && (
            <button
              onClick={ToPartnerSign}
              type="button"
              className="px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Partner Sign
            </button>
          )}
        </section>
        {/* contract upload section */}
        <section className="w-[500px]">
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
                value={doc.content.title ? doc.content.title : undefined}
                onChange={(e) => SetTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className=" mb-10">
            {/* name */}
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
                  doc.content.description ? doc.content.description : undefined
                }
                onChange={(e) => SetDesc(e.target.value)}
                required
              />
            </div>
          </div>
          <div className=" mb-10">
            {/* name */}
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
                value={doc.signer.address ? doc.signer.address : undefined}
                onChange={(e) => SetSigner(e.target.value)}
                required
              />
            </div>
          </div>

          {/* pdf file upload  */}
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or PDF
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </section>
      </div>
      {/* contract display */}
      {doc.content.fileContent ? (
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
