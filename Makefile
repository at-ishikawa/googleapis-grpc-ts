PROTO_PATH := third_party/googleapis

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

all: proto/js

proto/js:
	protoc --proto_path $(PROTO_PATH) \
		--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
		--js_out=import_style=commonjs,binary:javascript \
		--ts_out=javascript \
		third_party/googleapis/google/rpc/*.proto

publish: publish/js

publish/js:
	npm publish --access public
