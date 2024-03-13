import {grpc} from "@improbable-eng/grpc-web";
import { RPC_HOST, SIGN_VAA_HOST } from "../const";
import minimalProto, { Long } from "protobufjs/minimal";

const methodName = "GetSignedVAA";

const MessageID = {
  encode: function (message:any, writer:any) {
    if (writer === void 0) { writer = minimalProto.Writer.create(); }
    if (message.emitterChain !== 0) {
        writer.uint32(8).int32(message.emitterChain);
    }
    if (message.emitterAddress !== "") {
        writer.uint32(18).string(message.emitterAddress);
    }
    if (message.sequence !== "0") {
        writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode: function (input:any, length:any) {
    var reader = input instanceof minimalProto.Reader ? input : new minimalProto.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    // var message = __assign({}, baseMessageID);
    var message:any = {}
    while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
            case 1:
                message.emitterChain = reader.int32();
                break;
            case 2:
                message.emitterAddress = reader.string();
                break;
            case 3:
                message.sequence = longToString(reader.uint64());
                break;
            default:
                reader.skipType(tag & 7);
                break;
        }
    }
    return message;
},
  fromPartial: function (object:any) {
    var message:any = {}
    if (object.emitterChain !== undefined && object.emitterChain !== null) {
      message.emitterChain = object.emitterChain;
    }
    else {
      message.emitterChain = 0;
    }
    if (object.emitterAddress !== undefined && object.emitterAddress !== null) {
      message.emitterAddress = object.emitterAddress;
    }
    else {
      message.emitterAddress = "";
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence;
    }
    else {
      message.sequence = "0";
    }
    return message;
},
}

export var GetSignedVAAResponse = {
  encode: function (message:any, writer:any) {
      if (writer === void 0) { writer = minimalProto.Writer.create(); }
      if (message.vaaBytes.length !== 0) {
          writer.uint32(10).bytes(message.vaaBytes);
      }
      return writer;
  },
  decode: function (input:any, length:any) {
      var reader = input instanceof minimalProto.Reader ? input : new minimalProto.Reader(input);
      var end = length === undefined ? reader.len : reader.pos + length;
      // var message = __assign({}, baseGetSignedVAAResponse);
      var message:any = {}
      message.vaaBytes = new Uint8Array();
      while (reader.pos < end) {
          var tag = reader.uint32();
          switch (tag >>> 3) {
              case 1:
                  message.vaaBytes = reader.bytes();
                  break;
              default:
                  reader.skipType(tag & 7);
                  break;
          }
      }
      return message;
  },
  // fromJSON: function (object) {
  //     var message = __assign({}, baseGetSignedVAAResponse);
  //     message.vaaBytes = new Uint8Array();
  //     if (object.vaaBytes !== undefined && object.vaaBytes !== null) {
  //         message.vaaBytes = bytesFromBase64(object.vaaBytes);
  //     }
  //     return message;
  // },
  // toJSON: function (message) {
  //     var obj = {};
  //     message.vaaBytes !== undefined &&
  //         (obj.vaaBytes = base64FromBytes(message.vaaBytes !== undefined ? message.vaaBytes : new Uint8Array()));
  //     return obj;
  // },
  // fromPartial: function (object) {
  //     var message = __assign({}, baseGetSignedVAAResponse);
  //     if (object.vaaBytes !== undefined && object.vaaBytes !== null) {
  //         message.vaaBytes = object.vaaBytes;
  //     }
  //     else {
  //         message.vaaBytes = new Uint8Array();
  //     }
  //     return message;
  // },
};

const GetSignedVAARequest = {
  encode: function (message:any) {
      const writer = minimalProto.Writer.create(); 
      if (message.messageId !== undefined) {
          MessageID.encode(message.messageId, writer.uint32(10).fork()).ldelim();
      }
      return writer;
  },
  decode: function (input:any, length:any) {
    var reader = input instanceof minimalProto.Reader ? input : new minimalProto.Reader(input);
    var end = length === undefined ? reader.len : reader.pos + length;
    // var message = __assign({}, baseGetSignedVAARequest);
    var message:any={}
    while (reader.pos < end) {
        var tag = reader.uint32();
        switch (tag >>> 3) {
            case 1:
                message.messageId = MessageID.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
        }
    }
    console.log("message from decode: ", message)
    return message;
  },
  fromPartial: function (object:any) {
    var message:any = {}
    if (object.messageId !== undefined && object.messageId !== null) {
      message.messageId = MessageID.fromPartial(object.messageId);
    }
    else {
      message.messageId = undefined;
    }
    return message;
  },
}


// Define your rpcImpl
const rpcImpl = function(method:any, request:any, callback:any) {
  console.log("request is: ", request)
  grpc.unary(method, {
    request: request,
    host: RPC_HOST,
    metadata:undefined,
    onEnd: function(response) {
      if (response.status !== grpc.Code.OK) {
        callback(new Error(`Error code ${response.status}: ${response.statusMessage}`));
      } else {
        callback(null, response.message);
      }
    }
  });
};

const PublicRPCServiceDesc = {
  serviceName: "publicrpc.v1.PublicRPCService",
};

// Define your method descriptor
const methodDescriptor = {
  service: PublicRPCServiceDesc,
  methodName: methodName,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary: function() {
      return GetSignedVAARequest.encode(this).finish();
    }
  },
  responseType: {
    deserializeBinary: function(data:any) {
      const resToVaaBytes = GetSignedVAAResponse.decode(data, undefined)
      console.log("vaaa bytes: ", resToVaaBytes)
      const res = {...resToVaaBytes, toObject: function () {
        return this;
      }}
      return res;
    }
  }
};


// Make the RPC call
export const GrpcWebImplUnary = async(request:any)=>{
  return new Promise((resolve, reject) => {
    rpcImpl(methodDescriptor, request, function(err:any, response:any){
      if (err) {
        console.error(err);
        reject({status:"rejected",...err})
      } else {
        console.log("grpc res is: ",response);
        resolve({status:"fulfilled",...response})
      }
    });
  })
  
}

export const GetSignedVAA = async(request:any) => {
  console.log("raw msg info: ", request)
  const combinedRequest = {...request,serializeBinary:methodDescriptor.requestType.serializeBinary}

  const requestRes = await GrpcWebImplUnary(combinedRequest)
  console.log("requestRes: ", requestRes)
  return requestRes
}

function longToString(long:Long) {
  return long.toString();
}
