# TiDB

TiDB 是一款由 PingCAP 开发的开源分布式关系型数据库，兼容 MySQL 协议，具备水平弹性扩展、高可用、强一致性和实时 HTAP 混合负载处理能力。它将计算与存储分离，适用于金融、电商、数据中台等需要大规模并发与实时分析的业务场景。支持 ACID 事务、云原生架构、在线扩缩容和无限容量扩展，为企业提供高性能与灵活性兼具的数据库解决方案。

TiDB 最小可运行集群通常由 **PD、TiKV、TiDB 三类服务**组成。**PD（Placement Driver）** 是整个集群的大脑，负责元数据管理、调度、Region 分布规划与时间戳分发。**TiKV** 是分布式行存储引擎，采用 Raft 多副本保证高可用，并承担分布式事务和数据存储，是 TiDB 的核心基础。通常生产环境至少需要三个 TiKV 才能形成副本集。**TiDB Server** 是无状态 SQL 层，兼容 MySQL 协议，负责解析、优化与执行 SQL，可按需水平扩容。开发环境中，使用 Docker Compose 安装时，一般只需要这三类容器即可完成基本部署。

- [官方地址](https://www.pingcap.com)
- [官网docker-compose](https://github.com/pingcap/tidb-docker-compose/blob/master/docker-compose.yml)

**创建目录**

```
sudo mkdir -p /data/container/tidb/{pd,tikv}
```

**创建配置文件**

```

```

**运行服务**

```
cat > /data/container/tidb/docker-compose.yaml <<EOF
version: "3.8"

services:
  ateng-pd:
    image: registry.lingo.local/service/pd:v8.5.4
    container_name: ateng-pd
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "20050:2379"
      - "20051:2380"
    command:
      - --name=ateng-pd
      - --client-urls=http://0.0.0.0:2379
      - --peer-urls=http://0.0.0.0:2380
      - --advertise-client-urls=http://ateng-pd:2379
      - --advertise-peer-urls=http://ateng-pd:2380
      - --initial-cluster=ateng-pd=http://ateng-pd:2380
      - --data-dir=/data/pd
    volumes:
      - /data/container/tidb/pd:/data/pd
    restart: always

  ateng-tikv:
    image: registry.lingo.local/service/tikv:v8.5.4
    container_name: ateng-tikv
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "20049:20160"
    command:
      - --addr=0.0.0.0:20160
      - --advertise-addr=ateng-tikv:20160
      - --pd=ateng-pd:2379
      - --data-dir=/data/tikv
    depends_on:
      - ateng-pd
    volumes:
      - /data/container/tidb/tikv:/data/tikv
    restart: always

  ateng-tidb:
    image: registry.lingo.local/service/tidb:v8.5.4
    container_name: ateng-tidb
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "20047:4000"
      - "20048:10080"
    command:
      - --store=tikv
      - --path=ateng-pd:2379
      - --advertise-address=ateng-tidb
      - --log-slow-query=300ms
    depends_on:
      - ateng-tikv
    restart: always
EOF
```

**启动服务**

```
cd /data/container/tidb
docker-compose up -d
```

**查看日志**

```
docker-compose logs -f --tail=200
```

**使用服务**

运行MySQL客户端

```
docker run --name ateng-mysql-client --rm -it --entrypoint bash registry.lingo.local/service/mysql:8.4.7
```

登录TiDB

```
mysql -h47.108.128.105 -P20047 -uroot
```

连接后设置密码

```
ALTER USER 'root'@'%' IDENTIFIED BY 'Admin@123';
FLUSH PRIVILEGES;
```

访问服务

```
Address: 47.108.128.105:20047
Status Address: 47.108.128.105:20048
Username: root
Password: Admin@123
```

**删除服务**

停止服务

```
cd /data/container/tidb
docker-compose stop
```

删除服务

```
docker-compose down
```

删除目录

```
sudo rm -rf /data/container/tidb
```

