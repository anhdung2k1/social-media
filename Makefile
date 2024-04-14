RELEASE := false
USERNAME := $(USER)
VAS_GIT := $(shell git rev-parse --show-toplevel)
BUILD_DIR := $(VAS_GIT)/build
VAR_DIR := $(BUILD_DIR)/var

# Clean the repository
clean:
	@echo "Clean Repository"
	./vas.sh clean
# init the repository
init:
	@echo "mkdir build and variables directory"
	./vas.sh dir_est
	@echo "Get version"
	./vas.sh get_version > $(VAR_DIR)/.version
	@echo "Get commit hash"
	git rev-parse --short=7 HEAD > $(VAR_DIR)/.commit_hash
	@echo "Generate release version"
	@git tag | grep -v + | sort -V | tail -1 | sed 's/-/+/g' > $(VAR_DIR)/.released-version

#Build process 
build: build-server \
	build-client

build-server:
	@echo "build server Repository"
	./vas.sh build_repo --name=server
build-client:
	@echo "build client"
	./vas.sh build_repo --name=client

image: image-server \
	image-client

image-server:
	@echo "build server Image"
	./vas.sh build_image --name=server
	./vas.sh save_image --name=server
image-socket-server:
	@echo "build client Image"
	./vas.sh build_image --name=client
	./vas.sh save_image --name=client

push: push-server \
	push-client

push-server:
	@echo "push image-server"
	./vas.sh push_image --name=server
push-socket-server:
	@echo "push image-client"
	./vas.sh push_image --name=client