import StepInfo from "./StepInfo/StepInfo";
import SetupSolana from "./SetupSolana";
import SetupEVM from "./SetupMetamask";
import ProgressStatusInfo from "./ProgressStatus/ProgressStatus";
import TransferButton from "./TransferButton";

export default function TestBridge() {
  return (
    <div className="flex items-start w-full pt-10 justify-between">
      <StepInfo />
      <ProgressStatusInfo />
      {/* Flow simulator */}
      <div className="flex flex-col items-center justify-start w-[250px]">
        <div className="flex flex-col items-center mb-20 gap-10">
          <SetupEVM />
          <SetupSolana />
        </div>
        <TransferButton />
      </div>
    </div>
  );
}
