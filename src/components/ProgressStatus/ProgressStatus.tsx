"use client";
import { cropAtFirstColon, getAfterFirstColon } from "@/utils/converter";
import EvmAccSetupProgress from "./EvmAccProgress";
import SolAccSetupProgress from "./SolAccProgress";
import { useFlowStore } from "@/stores/flowStore";

export default function ProgressStatusInfo() {
  const stepStatus = useFlowStore.use.step();
  const stepResult = useFlowStore.use.stepResult();
  // const currentStep = useProgressStore.use.step();
  return (
    <div className=" border-r-2 border-slate-400 w-[800px] flex flex-col items-center justify-start">
      {/* verifying section */}
      {/* <div className="flex items-start w-full">
        <div className="w-1/2">
          <SolAccSetupProgress />
        </div>
        <div className="w-1/2">
          <EvmAccSetupProgress />
        </div>
      </div> */}
      <div className="w-full flex flex-col justify-start items-start gap-2">
        {stepStatus &&
          stepStatus.map((step, index) => {
            return (
              <div key={index} className="px-2 flex flex-col">
                <div> - {step}</div>
                {stepResult[index] ? (
                  <div>
                    <span className="font-semibold mr-2">
                      {cropAtFirstColon(stepResult[index])}
                    </span>
                    {getAfterFirstColon(stepResult[index])}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
