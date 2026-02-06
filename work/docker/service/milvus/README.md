# Milvus

Milvus 是一款开源的高性能向量数据库，专为存储、管理和检索大规模向量数据而设计，广泛应用于 AI、推荐系统、图像搜索和自然语言处理等场景。它支持高效的相似度搜索、多种索引结构、分布式部署和水平扩展，能够处理亿级别的向量数据，同时提供易用的 SDK 和 SQL 式查询接口，帮助开发者快速构建智能应用。

- [官方文档](https://milvus.io/zh)

**下载镜像**

```
docker pull milvusdb/milvus:v2.6.6
docker pull zilliz/attu:v2.6.4
```

**推送到仓库**

```
docker tag milvusdb/milvus:v2.6.6 registry.lingo.local/service/milvus:v2.6.6
docker push registry.lingo.local/service/milvus:v2.6.6

docker tag zilliz/attu:v2.6.4 registry.lingo.local/service/zilliz-attu:v2.6.4
docker push registry.lingo.local/service/zilliz-attu:v2.6.4
```

**保存镜像**

```
docker save registry.lingo.local/service/milvus:v2.6.6 registry.lingo.local/service/zilliz-attu:v2.6.4 | gzip -c > image-milvus_v2.6.6.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/milvus/{data,config}
sudo chown -R 1001 /data/container/milvus
```

**创建配置文件**

```
cat << EOF > /data/container/milvus/config/embedEtcd.yaml
listen-client-urls: http://0.0.0.0:2379
advertise-client-urls: http://0.0.0.0:2379
quota-backend-bytes: 4294967296
auto-compaction-mode: revision
auto-compaction-retention: '1000'
EOF

cat << EOF > /data/container/milvus/config/user.yaml
common:
  security:
    authorizationEnabled: true
EOF
```

**运行服务**

```
docker run -d --name ateng-milvus --user=1001 \
  --security-opt seccomp:unconfined \
  -p 20040:19530 -p 20041:9091 -p 20042:2379 --restart=always \
  -v /data/container/milvus/data:/var/lib/milvus \
  -v /data/container/milvus/config/embedEtcd.yaml:/milvus/configs/embedEtcd.yaml \
  -v /data/container/milvus/config/user.yaml:/milvus/configs/user.yaml \
  -e ETCD_USE_EMBED=true \
  -e ETCD_DATA_DIR=/var/lib/milvus/etcd \
  -e ETCD_CONFIG_PATH=/milvus/configs/embedEtcd.yaml \
  -e COMMON_STORAGETYPE=local \
  -e DEPLOY_MODE=STANDALONE \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/milvus:v2.6.6 \
  milvus run standalone
```

**启动 GUI**

```
docker run -d --name ateng-milvus-attu \
  --restart=always \
  -p 20043:3000 \
  registry.lingo.local/service/zilliz-attu:v2.6.4
```

**查看日志**

```
docker logs -f ateng-milvus
```

**使用服务**

进入容器

```
docker exec -it ateng-milvus bash
```

访问服务

```
API Address: http://192.168.1.12:20040
Web Address: http://192.168.1.12:20041/webui/
GUI Address: http://192.168.1.12:20043
Username: root
Password: Milvus
```

**删除服务**

停止服务

```
docker stop ateng-milvus
docker stop ateng-milvus-attu
```

删除服务

```
docker rm ateng-milvus
docker rm ateng-milvus-attu
```

删除目录

```
sudo rm -rf /data/container/milvus
```

