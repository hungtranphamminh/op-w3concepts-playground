"use client";
export default function StepInfo() {
  return (
    <div className="flex flex-col items-start p-7 border-r-2 border-slate-400 grow">
      {/* Account setup step */}
      <h1 className="font-bold">SETUP account progess with info:</h1>
      <div>
        <span className="font-semibold">Solana Account:</span>
        {/* {solanaAccount ? solanaAccount.toString() : <></>} */}
      </div>
      <div>
        <span className="font-semibold">BNB address:</span>
        {/* {BNB_NATIVE_SOURCE_ASSET} */}
      </div>
      <div>
        <span className="font-semibold">
          Wormhole Wrapped BNB token address:
        </span>
        {/* {SOL_WRAP_BNB} */}
      </div>
    </div>
  );
}
