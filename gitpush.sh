#!/bin/bash

# 检查是否在Git仓库中
if [ ! -d ".git" ]; then
    echo "错误：当前目录不是Git仓库"
    exit 1
fi

echo "=== 开始执行Git操作 ===="

# 执行git add .
echo "1. 执行 git add ."
git add .
if [ $? -ne 0 ]; then
    echo "错误：git add 失败"
    exit 1
fi

# 执行git commit
echo "2. 执行 git commit -m\"update\""
git commit -m"update"
if [ $? -ne 0 ]; then
    echo "警告：git commit 失败，可能没有需要提交的更改"
fi

# 执行git pull
echo "3. 执行 git pull"
git pull
if [ $? -ne 0 ]; then
    echo "错误：git pull 失败，请手动解决冲突"
    exit 1
fi

# 执行git push到origin仓库（会同时推送到Gitee和GitHub）
echo "4. 执行 git push (origin 仓库 - 同时推送到Gitee和GitHub)"
git push origin
if [ $? -ne 0 ]; then
    echo "错误：git push 失败"
    exit 1
fi

echo "=== Git操作完成 ===="