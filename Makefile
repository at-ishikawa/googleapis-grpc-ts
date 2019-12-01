PROTO_PATH := --proto_path third_party/googleapis --proto_path third_party/protobuf/src

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

all: proto/js

proto/js:
	protoc $(PROTO_PATH) \
		--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
		--js_out=import_style=commonjs,binary:javascript \
		--ts_out=javascript \
		third_party/googleapis/google/rpc/*.proto \
		third_party/protobuf/src/google/protobuf/any.proto

publish: publish/js

publish/js:
	cd javascript && npm publish --access public && cd ..
