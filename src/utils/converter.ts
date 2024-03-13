import {ethers, Contract, ContractFactory} from "ethers";
import { bridgeAbi, guardianFactoryAbi } from "./abi/WormholeBridge";
import { hexZeroPad } from "@ethersproject/bytes";
import base58 from "bs58";
import { CONTRACT_BC } from "./const";
import { zeroPad, arrayify} from "@ethersproject/bytes";

export const AddressShortener = (address:string, partialLength:number):string => {
  return address.slice(0, partialLength) +"..." +address.slice(-partialLength)
}

export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

// export const contractDecoder = () => {
//   const contractInterface = new ethers.Interface(bridgeAbi)
//   const txData = "0x9981509f0000000000000000000000000000000000000000000000000000000000000001b06e80faea6c811ba5e49a7c7753d25fc0403d6c26219cf593158dffef94daa60000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004b6a0000"
//   const decodedData = contractInterface.parseTransaction({data:txData})
//   const params = decodedData?.args
//   console.log("contract's params are: ", params)
// } 

export const convert58to32bit = (_58bit:string) => {
  return hexZeroPad(
    "0x" +
      Buffer.from(
        base58.decode("CsiV8P16kxCwSRhiDf1BnqRd67c7VwxXZbr96ZsmAcNH")
      ).toString("hex"),
    32
  )
}

export const cropAtFirstColon = (info:string) => {
  const colonIndex = info.indexOf(':');
  if (colonIndex >= 0) {
    return info.slice(0, colonIndex + 1);
  } else {
    return info;
  }
}

export const getAfterFirstColon = (info:string) => {
  const colonIndex = info.indexOf(':');
  if (colonIndex >= 0) {
    return info.slice(colonIndex + 1).trim();
  } else {
    return info;
  }
}

export const decimalValueToHex=(value:string, decimal:number):string=>{
  return "0x"+(parseFloat(value)*Math.pow(10,decimal)).toString(16)
}

export function parseSequencesFromLogEth(receipt:any, bridgeAddress:any, guardianFactoryAbi:any) { 
  const guardianContract = new ethers.ContractFactory(guardianFactoryAbi,CONTRACT_BC)
  const guardianContractInterface = guardianContract.interface
  const bridgeLog = receipt.logs.filter((l: any) => {
    return l.address.toLowerCase() === bridgeAddress.toLowerCase();
  })[0];
  const parsedLog = guardianContractInterface.parseLog(bridgeLog);
  const {
    args: { sequence },
  } = parsedLog
  return sequence.toString()
}

export function getEmitterAddressEth(contractAddress:string) {
  return Buffer.from(zeroPad(arrayify(contractAddress), 32)).toString("hex");
}
