PROTO_PATH := third_party/googleapis

all: proto/js

proto/js:
	protoc --proto_path $(PROTO_PATH) \
		--js_out=import_style=commonjs:javascript \
		third_party/googleapis/google/rpc/*.proto
