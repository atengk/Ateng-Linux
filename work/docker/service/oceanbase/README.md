# OceanBase CE

OceanBase CE（Community Edition）是阿里巴巴开源的分布式关系型数据库，兼容 MySQL 语法与生态，支持水平扩展和多副本高可用，适用于金融级事务场景。具备高性能、强一致性、在线扩容、自动容错等能力，同时提供 OBD 管理工具快速部署，单机可体验，多节点适用于生产环境。OceanBase CE 提供事务、分析、向量检索等综合能力，适合企业核心业务及混合负载场景。

- [官方地址](https://www.oceanbase.com/community)

- [Docker Hub](https://hub.docker.com/r/oceanbase/oceanbase-ce)



| 项目             | **sys tenant**                                      | **普通 tenant**（如 prod、dev、test）     |
| ---------------- | --------------------------------------------------- | ----------------------------------------- |
| **定位 / 角色**  | 系统级租户，相当于集群管理员                        | 业务租户，承载业务数据库                  |
| **权限级别**     | 最高权限，管理整个集群                              | 只管理自身租户内部对象和资源              |
| **作用**         | 管理集群、节点、资源池、租户等系统功能              | 存储业务数据、用户表、索引、SQL、应用访问 |
| **可访问内容**   | 全集群信息（所有 tenant）                           | 仅自己 tenant 的数据和配置                |
| **数据库协议**   | 仅支持内部管理用途                                  | 支持 MySQL / Oracle 模式                  |
| **典型使用场景** | 创建、修改、删除 tenant<br>集群资源管理、扩容、监控 | 正常业务使用：建库、建表、CRUD、连接应用  |
| **连接方式**     | `root@sys`                                          | `root@tenantName`                         |
| **风险级别**     | 误操作影响整个集群                                  | 只影响自己的业务                          |

- sys tenant = 集群管理员（超级管理员层）

- 普通 tenant = 业务数据库实例



**下载镜像**

```
docker pull oceanbase/oceanbase-ce:4.3.5-lts
```

**推送到仓库**

```
docker tag oceanbase/oceanbase-ce:4.3.5-lts registry.lingo.local/service/oceanbase-ce:4.3.5-lts
docker push registry.lingo.local/service/oceanbase-ce:4.3.5-lts
```

**保存镜像**

```
docker save registry.lingo.local/service/oceanbase-ce:4.3.5-lts | gzip -c > image-oceanbase-ce_4.3.5-lts.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/oceanbase/{ob,cluster}
```

**创建配置文件**

```

```

**运行服务**

```
docker run -d --name ateng-oceanbase \
  -p 20044:2881 --restart=always \
  -v /data/container/oceanbase/ob:/root/ob/observer \
  -v /data/container/oceanbase/cluster:/root/.obd/cluster \
  -e MODE=normal \
  -e OB_CLUSTER_NAME=AtengCluster \
  -e OB_MEMORY_LIMIT=8G \
  -e OB_DATAFILE_SIZE=100G \
  -e OB_LOG_DISK_SIZE=5G \
  -e OB_SYSTEM_MEMORY=1G \
  -e OB_SYS_PASSWORD=Admin@123 \
  -e OB_TENANT_NAME=ateng \
  -e OB_TENANT_PASSWORD=Ateng@123 \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/oceanbase-ce:4.3.5-lts
```

OceanBase-CE Docker 支持的环境变量说明

| 变量名称                    | 默认值               | 实际作用                                                     | 使用建议                                                     |
| --------------------------- | -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **MODE**                    | mini / slim / normal | 控制 OceanBase 在容器中的部署模式：<br>**mini**：极简资源（开发/学习/快速测试）<br>**slim**：仅启动 observer，不创建租户（tenant）资源配置参数也不生效<br>**normal**：完整配置，可修改资源和租户 | **本地测试用 mini / slim**<br> **需要资源控制与租户配置用 normal** |
| **EXIT_WHILE_ERROR**        | true                 | 启动 observer 出错是否退出容器。<br>true：失败直接退出<br>false：失败不退出，可进入容器调试 | 开发调试时建议：`false`                                      |
| **OB_CLUSTER_NAME**         | obcluster            | OceanBase 集群名称（类似 tidb-cluster-name）                 | 多集群部署时修改                                             |
| **OB_TENANT_NAME**          | test                 | MySQL 模式的租户名称                                         | 正式测试建议换成业务名                                       |
| **OB_MEMORY_LIMIT**         | 6G                   | 整个集群可使用的内存上限（memory_limit）                     | 机器少内存建议改小，如 `2G~4G`                               |
| **OB_DATAFILE_SIZE**        | 5G                   | 数据文件大小（datafile_size）                                | 适当调大避免数据写满导致错误                                 |
| **OB_LOG_DISK_SIZE**        | 5G                   | 日志（log）文件空间大小                                      | WAL 写多时要调整                                             |
| **OB_SYS_PASSWORD**         | 空                   | sys 租户 root 用户密码                                       | 建议必须设置                                                 |
| **OB_TENANT_PASSWORD**      | 空                   | MySQL 租户 root 用户密码                                     | 同上                                                         |
| **OB_SYSTEM_MEMORY**        | 1G                   | 内部系统内存 system_memory                                   | 不建议改太小，会影响运行                                     |
| **OB_TENANT_MINI_CPU**      | 空                   | tenant mini_cpu（CPU 资源下限）                              | 多租户控制资源时设置                                         |
| **OB_TENANT_MEMORY_SIZE**   | 空                   | tenant memory_size 内存配置                                  | 必要时设置，例如 `2G`                                        |
| **OB_TENANT_LOG_DISK_SIZE** | 空                   | tenant log_disk_size                                         | 根据大小调整                                                 |

**查看日志**

```
docker logs -f ateng-oceanbase
```

**使用服务**

进入容器

```
docker exec -it ateng-oceanbase bash
```

登录 ateng 租户

```
obclient -h127.0.0.1 -uroot@ateng -P2881 -pAteng@123
```

登录 sys 租户（集群管理员）

```
obclient -h127.0.0.1 -uroot@sys -P2881 -pAdmin@123
```

外部访问

```
Address: 47.108.128.105:20044
Username: root@ateng
Password: Ateng@123
```

**删除服务**

停止服务

```
docker stop ateng-oceanbase
```

删除服务

```
docker rm ateng-oceanbase
```

删除目录

```
sudo rm -rf /data/container/oceanbase
```

