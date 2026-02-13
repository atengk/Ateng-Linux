#!/bin/bash

WORK_DIR=/data/file/kongyu/ops

# 输入参数
COMMIT_MSG="${1:-修改文档}"

set -x

# 拉取代码
git pull -v

# 上传代码
git add -v ${WORK_DIR}
git commit -m $COMMIT_MSG
git push
