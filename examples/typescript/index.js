"use strict";
exports.__esModule = true;
var code_pb_js_1 = require("@at-ishikawa/googleapis-protobuf/google/rpc/code_pb.js");
var status_pb_js_1 = require("@at-ishikawa/googleapis-protobuf/google/rpc/status_pb.js");
var error_details_pb_js_1 = require("@at-ishikawa/googleapis-protobuf/google/rpc/error_details_pb.js");
var any_pb_js_1 = require("@at-ishikawa/googleapis-protobuf/google/protobuf/any_pb.js");
var BAD_REQUEST_TYPE_URL = 'Example_BadRequest';
var getStatus = function () {
    var fv = new error_details_pb_js_1.BadRequest.FieldViolation();
    fv.setField('email');
    fv.setDescription('Email is required');
    var br = new error_details_pb_js_1.BadRequest();
    br.setFieldViolationsList([
        fv,
    ]);
    var any = new any_pb_js_1.Any();
    any.setTypeUrl(BAD_REQUEST_TYPE_URL);
    any.setValue(br.serializeBinary());
    var message = new status_pb_js_1.Status();
    message.setCode(code_pb_js_1.Code.INVALID_ARGUMENT);
    message.setMessage('Input is not valid');
    message.setDetailsList([
        any,
    ]);
    return message;
};
var deserializeStatus = function (bin) {
    var deserialized = status_pb_js_1.Status.deserializeBinary(bin);
    return {
        'code': deserialized.getCode(),
        'message': deserialized.getMessage(),
        'details': deserialized.getDetailsList().map(function (detail) {
            var typeUrl = detail.getTypeUrl();
            if (typeUrl === BAD_REQUEST_TYPE_URL) {
                var br = error_details_pb_js_1.BadRequest.deserializeBinary(detail.getValue_asU8());
                var errors = br.getFieldViolationsList().map(function (fv) {
                    return fv.getField() + ': ' + fv.getDescription();
                });
                return detail.getTypeUrl() + ': ' + errors.join(' ');
            }
            return typeUrl;
        })
    };
};
var message = getStatus();
var bin = message.serializeBinary();
console.log('serialized', bin);
console.log('data', deserializeStatus(bin));
