# TiDB

TiDB 是一款由 PingCAP 开发的开源分布式关系型数据库，兼容 MySQL 协议，具备水平弹性扩展、高可用、强一致性和实时 HTAP 混合负载处理能力。它将计算与存储分离，适用于金融、电商、数据中台等需要大规模并发与实时分析的业务场景。支持 ACID 事务、云原生架构、在线扩缩容和无限容量扩展，为企业提供高性能与灵活性兼具的数据库解决方案。

- [官方地址](https://www.pingcap.com)
- [伪集群参考文档](/work/docker/service/tidb/cluster.md)

**下载镜像**

```
docker pull pingcap/tidb:v8.5.4
```

**推送到仓库**

```
docker tag pingcap/tidb:v8.5.4 registry.lingo.local/service/tidb:v8.5.4
docker push registry.lingo.local/service/tidb:v8.5.4
```

**保存镜像**

```
docker save registry.lingo.local/service/tidb:v8.5.4 | gzip -c > image-tidb_v8.5.4.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/tidb
```

**创建配置文件**

```

```

**运行服务**

```
docker run -d --name ateng-tidb \
  -p 20047:4000 -p 20048:10080 --restart=always \
  -v /data/container/tidb:/tmp/tidb \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/tidb:v8.5.4
```

**查看日志**

```
docker logs -f ateng-tidb
```

**使用服务**

进入容器

```
docker exec -it ateng-tidb bash
```

访问服务

```
Address: 47.108.128.105:20047
Status Address: 47.108.128.105:20048
Username: root
```

连接后设置密码

```
SET PASSWORD FOR 'root'@'%' = 'Admin@123';
```

**删除服务**

停止服务

```
docker stop ateng-tidb
```

删除服务

```
docker rm ateng-tidb
```

删除目录

```
sudo rm -rf /data/container/tidb
```

