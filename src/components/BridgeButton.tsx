import SetupSolana from "./SetupSolana";
import SetupEVM from "./SetupMetamask";
import TWTextInput from "./TailwindUI/Input";
import ProgressStatusInfo from "./ProgressStatus/ProgressStatus";
import TransferButton from "./TransferButton";
// import BridgeFromEvmButton from "./BridgeEvmToOthersBtn";

export default function TestBridge() {
  return (
    <div className="flex items-start w-full pt-10 justify-between">
      {/* <StepInfo /> */}
      <ProgressStatusInfo />
      {/* Flow simulator */}
      <div className="flex flex-col items-center justify-start w-[250px]">
        <TWTextInput />
        {/* Basic wormhole flow */}
        <TransferButton />
        {/* X-Bridge project - pending */}
        {/* <BridgeFromEvmButton /> */}
      </div>
    </div>
  );
}
