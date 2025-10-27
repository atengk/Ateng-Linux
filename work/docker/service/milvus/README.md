# milvus

Milvus 是一款开源的高性能向量数据库，专为存储、管理和检索大规模向量数据而设计，广泛应用于 AI、推荐系统、图像搜索和自然语言处理等场景。它支持高效的相似度搜索、多种索引结构、分布式部署和水平扩展，能够处理亿级别的向量数据，同时提供易用的 SDK 和 SQL 式查询接口，帮助开发者快速构建智能应用。

- [官方文档](https://milvus.io/zh)

**下载镜像**

```
docker pull bitnamilegacy/milvus:2.6.0
```

**推送到仓库**

```
docker tag bitnamilegacy/milvus:2.6.0 registry.lingo.local/bitnami/milvus:2.6.0
docker push registry.lingo.local/bitnami/milvus:2.6.0
```

**保存镜像**

```
docker save registry.lingo.local/bitnami/milvus:2.6.0 | gzip -c > image-milvus_2.6.0 .tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/milvus/{data,config}
sudo chown -R 1001 /data/container/milvus
```

**创建配置文件**

```
sudo tee /data/container/milvus/config/override.conf <<"EOF"
databases 20
appendonly yes
appendfsync always
save ""
maxclients 1024
maxmemory 8GB
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
maxmemory-policy volatile-lru
io-threads 8
io-threads-do-reads yes
loadmodule /opt/bitnami/milvus/lib/milvus/modules/milvusbloom.so
loadmodule /opt/bitnami/milvus/lib/milvus/modules/milvusearch.so
loadmodule /opt/bitnami/milvus/lib/milvus/modules/rejson.so
loadmodule /opt/bitnami/milvus/lib/milvus/modules/milvustimeseries.so
EOF
```

**运行服务**

```
docker run -d --name ateng-milvus \
  -p 20003:6379 --restart=always \
  -v /data/container/milvus/config/override.conf:/opt/bitnami/milvus/mounted-etc/overrides.conf:ro \
  -v /data/container/milvus/data:/bitnami/milvus/data \
  -e milvus_PASSWORD=Admin@123 \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/bitnamilegacy/milvus:2.6.0
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
export milvusCLI_AUTH=Admin@123
milvus-cli -h 192.168.1.12 -p 20003 info server
```

查看模块信息

```
milvus-cli -h 192.168.1.12 -p 20003 module list
```

**删除服务**

停止服务

```
docker stop ateng-milvus
```

删除服务

```
docker rm ateng-milvus
```

删除目录

```
sudo rm -rf /data/container/milvus
```

