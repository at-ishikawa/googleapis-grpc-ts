const { Code } = require('@at-ishikawa/googleapis-protobuf/javascript/google/rpc/code_pb.js');
const { Status } = require('@at-ishikawa/googleapis-protobuf/javascript/google/rpc/status_pb.js');
const {
  BadRequest
} = require('@at-ishikawa/googleapis-protobuf/javascript/google/rpc/error_details_pb.js');
const { Any } = require('google-protobuf/google/protobuf/any_pb.js');

const BAD_REQUEST_TYPE_URL = 'Example_BadRequest';

const getStatus = () => {
  const fv = new BadRequest.FieldViolation();
  fv.setField('email');
  fv.setDescription('Email is required');
  const br = new BadRequest();
  br.setFieldViolationsList([
    fv,
  ]);
  const any = new Any();
  any.setTypeUrl(BAD_REQUEST_TYPE_URL);
  any.setValue(br.serializeBinary());

  const message = new Status();
  message.setCode(Code.INVALID_ARGUMENT);
  message.setMessage('Input is not valid');
  message.setDetailsList([
    any,
  ]);
  return message;
}

const deserializeStatus = (bin) => {
  const deserialized = Status.deserializeBinary(bin);
  return {
    'code': deserialized.getCode(),
    'message': deserialized.getMessage(),
    'details': deserialized.getDetailsList().map(detail =>{
      const typeUrl = detail.getTypeUrl();
      if (typeUrl === BAD_REQUEST_TYPE_URL) {
        const br = BadRequest.deserializeBinary(detail.getValue());
        const errors = br.getFieldViolationsList().map(fv => {
          return fv.getField() + ': ' + fv.getDescription();
        });
        return detail.getTypeUrl() + ': ' + errors.join(' ');
      }
      return typeUrl;
    })
  };
}

const message = getStatus();
const bin = message.serializeBinary();
console.log('serialized', bin);
console.log('data', deserializeStatus(bin));
