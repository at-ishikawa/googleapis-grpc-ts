import { Code } from '@at-ishikawa/googleapis-protobuf/google/rpc/code_pb.js';
import { Status } from '@at-ishikawa/googleapis-protobuf/google/rpc/status_pb.js';
import { BadRequest } from '@at-ishikawa/googleapis-protobuf/google/rpc/error_details_pb.js';
import { Any } from '@at-ishikawa/googleapis-protobuf/google/protobuf/any_pb.js';

const BAD_REQUEST_TYPE_URL = 'Example_BadRequest';

const getStatus = () => {
  const fv: BadRequest.FieldViolation = new BadRequest.FieldViolation();
  fv.setField('email');
  fv.setDescription('Email is required');
  const br: BadRequest = new BadRequest();
  br.setFieldViolationsList([
    fv,
  ]);
  const any: Any = new Any();
  any.setTypeUrl(BAD_REQUEST_TYPE_URL);
  any.setValue(br.serializeBinary());

  const message: Status = new Status();
  message.setCode(Code.INVALID_ARGUMENT);
  message.setMessage('Input is not valid');
  message.setDetailsList([
    any,
  ]);
  return message;
}

const deserializeStatus = (bin) => {
  const deserialized: Status = Status.deserializeBinary(bin);
  return {
    'code': deserialized.getCode(),
    'message': deserialized.getMessage(),
    'details': deserialized.getDetailsList().map((detail: Any) =>{
      const typeUrl: string = detail.getTypeUrl();
      if (typeUrl === BAD_REQUEST_TYPE_URL) {
        const br: BadRequest = BadRequest.deserializeBinary(detail.getValue_asU8());
        const errors: string[] = br.getFieldViolationsList().map(fv => {
          return fv.getField() + ': ' + fv.getDescription();
        });
        return detail.getTypeUrl() + ': ' + errors.join(' ');
      }
      return typeUrl;
    })
  };
}

const message: Status = getStatus();
const bin: Uint8Array = message.serializeBinary();
console.log('serialized', bin);
console.log('data', deserializeStatus(bin));
