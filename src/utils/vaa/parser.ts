import { Bytes } from "ethers";
import { ethers } from "ethers";

export function keccak256(data:any) {
    return Buffer.from(ethers.utils.arrayify(ethers.utils.keccak256(data)));
}


function isInteger(value: number) {
  return (typeof(value) === "number" && value == value && (value % 1) === 0);
}

export function isBytes(value: any): value is Bytes {
  if (value == null) { return false; }

  if (value.constructor === Uint8Array) { return true; }
  if (typeof(value) === "string") { return false; }
  if (!isInteger(value.length) || value.length < 0) { return false; }

  for (let i = 0; i < value.length; i++) {
      const v = value[i];
      if (!isInteger(v) || v < 0 || v >= 256) { return false; }
  }
  return true;
}

export function parseVaa(vaa:any) {
  const signedVaa = Buffer.isBuffer(vaa) ? vaa : Buffer.from(vaa);
  const sigStart = 6;
  const numSigners = signedVaa[5];
  const sigLength = 66;
  const guardianSignatures = [];
  for (let i = 0; i < numSigners; ++i) {
      const start = sigStart + i * sigLength;
      guardianSignatures.push({
          index: signedVaa[start],
          signature: signedVaa.subarray(start + 1, start + 66),
      });
  }
  const body = signedVaa.subarray(sigStart + sigLength * numSigners);
  return {
      version: signedVaa[0],
      guardianSetIndex: signedVaa.readUInt32BE(1),
      guardianSignatures,
      timestamp: body.readUInt32BE(0),
      nonce: body.readUInt32BE(4),
      emitterChain: body.readUInt16BE(8),
      emitterAddress: body.subarray(10, 42),
      sequence: body.readBigUInt64BE(42),
      consistencyLevel: body[50],
      payload: body.subarray(51),
      hash: keccak256(body),
  };
}
