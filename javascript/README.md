# Google APIs Protobuffers

This is the unofficial library to store generated files for protocol buffers for Google APIs, that are not stored in other it's [official library](https://github.com/googleapis/googleapis).

# Supported Protocol Buffers
* google/rpc

# Installation
```
npm install @at-ishikawa/googleapis-protobuf
```

# Example Usage
```node
const { Status } = require('@at-ishikawa/googleapis-protobuf/google/rpc/status_pb.js');
const { Code } = require('@at-ishikawa/googleapis-protobuf/google/rpc/code_pb.js');
const {
  BadRequest
} = require('@at-ishikawa/googleapis-protobuf/google/rpc/error_details_pb.js');
```
