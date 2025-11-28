# Doris3

Apache Doris 是一个用于实时分析的现代数据仓库。它可以对大规模实时数据进行闪电般的快速分析。

- [官网链接](https://doris.apache.org/zh-CN/docs/3.0/compute-storage-decoupled/overview)

Doris 存算分离架构：

- FE：负责接收用户请求，负责存储库表的元数据，目前是有状态的，未来会和 BE 类似，演化为无状态。
- BE：无状态化的 Doris BE 节点，负责具体的计算任务。BE 上会缓存一部分 Tablet 元数据和数据以提高查询性能。
- MS：存算分离模式新增模块，程序名为 doris_cloud，可通过启动不同参数来指定为以下两种角色之一
- - Meta Service：元数据管理，提供元数据操作的服务，例如创建 Tablet，新增 Rowset，Tablet 查询以及 Rowset 元数据查询等功能。
    - Recycler：数据回收。通过定期对记录已标记删除的数据的元数据进行扫描，实现对数据的定期异步正向回收（文件实际存储在 S3 或 HDFS 上），而无须列举数据对象进行元数据对比。



## 基础配置

**创建网络**

创建一个网络供Doris使用

```
docker network create ateng-network
```

**创建目录**

```
sudo mkdir -p /data/container/doris/{data,config}
```

**创建配置文件**

创建FE配置文件

```
sudo tee /data/container/doris/config/fe.conf <<"EOF"
CUR_DATE=`date +%Y%m%d-%H%M%S`
LOG_DIR = ${DORIS_HOME}/log
JAVA_HOME=/usr/lib/jvm/java
JAVA_OPTS="-Xms1024m -Xmx8192m -Dfile.encoding=UTF-8 -Djavax.security.auth.useSubjectCredsOnly=false -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -XX:+PrintGCDateStamps -XX:+PrintGCDetails -XX:+PrintClassHistogramAfterFullGC -Xloggc:$LOG_DIR/log/fe.gc.log.$CUR_DATE -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=50M -Dlog4j2.formatMsgNoLookups=true"
JAVA_OPTS_FOR_JDK_17="-Xms1024m -Xmx8192m -Dfile.encoding=UTF-8 -Djavax.security.auth.useSubjectCredsOnly=false -XX:+UseG1GC -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=$LOG_DIR -Xlog:gc*,classhisto*=trace:$LOG_DIR/fe.gc.log.$CUR_DATE:time,uptime:filecount=10,filesize=50M --add-opens=java.base/java.nio=ALL-UNNAMED --add-opens java.base/jdk.internal.ref=ALL-UNNAMED --add-opens java.base/sun.nio.ch=ALL-UNNAMED --add-opens java.xml/com.sun.org.apache.xerces.internal.jaxp=ALL-UNNAMED"
meta_dir = ${DORIS_HOME}/doris-meta
jdbc_drivers_dir = ${DORIS_HOME}/jdbc_drivers
http_port = 8030
rpc_port = 9020
query_port = 9030
edit_log_port = 9010
arrow_flight_sql_port = -1
log_roll_size_mb = 1024
# INFO, WARN, ERROR, FATAL
sys_log_level = WARN
# NORMAL, BRIEF, ASYNC
sys_log_mode = NORMAL
qe_max_connection = 1024
qe_query_timeout_second = 300
qe_slow_log_ms = 5000
enable_fqdn_mode = true
EOF
```

创建BE配置文件

```
sudo tee /data/container/doris/config/be.conf <<"EOF"
CUR_DATE=`date +%Y%m%d-%H%M%S`
LOG_DIR="$DORIS_HOME/log/"
JAVA_OPTS="-Xms1024m -Xmx8192m -Dfile.encoding=UTF-8 -DlogPath=$LOG_DIR/jni.log -Xloggc:$LOG_DIR/be.gc.log.$CUR_DATE -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=50M -Djavax.security.auth.useSubjectCredsOnly=false -Dsun.security.krb5.debug=true -Dsun.java.command=DorisBE -XX:-CriticalJNINatives"
JAVA_OPTS_FOR_JDK_17="-Xms1024m -Xmx8192m -Dfile.encoding=UTF-8 -Djol.skipHotspotSAAttach=true -DlogPath=$LOG_DIR/jni.log -Xlog:gc*:$LOG_DIR/be.gc.log.$CUR_DATE:time,uptime:filecount=10,filesize=50M -Djavax.security.auth.useSubjectCredsOnly=false -Dsun.security.krb5.debug=true -Dsun.java.command=DorisBE -XX:-CriticalJNINatives -XX:+IgnoreUnrecognizedVMOptions --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.lang.invoke=ALL-UNNAMED --add-opens=java.base/java.lang.reflect=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-opens=java.base/java.net=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED --add-opens=java.base/java.util=ALL-UNNAMED --add-opens=java.base/java.util.concurrent=ALL-UNNAMED --add-opens=java.base/java.util.concurrent.atomic=ALL-UNNAMED --add-opens=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/sun.nio.cs=ALL-UNNAMED --add-opens=java.base/sun.security.action=ALL-UNNAMED --add-opens=java.base/sun.util.calendar=ALL-UNNAMED --add-opens=java.security.jgss/sun.security.krb5=ALL-UNNAMED --add-opens=java.management/sun.management=ALL-UNNAMED -Darrow.enable_null_check_for_get=false"
JAVA_HOME=/usr/lib/jvm/java
JEMALLOC_CONF="percpu_arena:percpu,background_thread:true,metadata_thp:auto,muzzy_decay_ms:5000,dirty_decay_ms:5000,oversize_threshold:0,prof:true,prof_active:false,lg_prof_interval:-1,lg_extent_max_active_fit:8"
JEMALLOC_PROF_PRFIX="jemalloc_heap_profile_"
# ports for admin, web, heartbeat service
be_port = 9060
webserver_port = 8040
heartbeat_service_port = 9050
brpc_port = 8060
arrow_flight_sql_port = -1
storage_root_path = ${DORIS_HOME}/storage
jdbc_drivers_dir = ${DORIS_HOME}/jdbc_drivers
# INFO, WARNING, ERROR, FATAL
sys_log_level = INFO
EOF
```

## 运行服务

**运行FE服务**

```
docker run -d --name ateng-doris-fe \
  --net ateng-network -p 20024:8030 -p 20025:9030 --restart=always \
  -v /data/container/doris/config/fe.conf:/opt/apache-doris/fe/conf/fe.conf:ro \
  -v /data/container/doris/data/fe:/opt/apache-doris/fe/doris-meta \
  -e TZ=Asia/Shanghai \
  --entrypoint /opt/apache-doris/fe/bin/start_fe.sh \
  registry.lingo.local/service/doris:fe-3.1.3
```

查看日志

```
docker exec -it ateng-doris-fe tail -200f /opt/apache-doris/fe/log/fe.log
```

**运行BE服务**

```
docker run -d --name ateng-doris-be \
  --net ateng-network --restart=always \
  -v /data/container/doris/config/be.conf:/opt/apache-doris/fe/conf/be.conf:ro \
  -v /data/container/doris/data/be:/opt/apache-doris/be/storage \
  -e TZ=Asia/Shanghai \
  --entrypoint /opt/apache-doris/be/bin/start_be.sh \
  registry.lingo.local/service/doris:be-3.1.3
```

查看日志

```
docker exec -it ateng-doris-be tail -f /opt/apache-doris/be/log/be.INFO
```



## 配置服务

**进入FE容器**

```
docker exec -it ateng-doris-fe bash
```

**进入FE服务**

如果是在 FE 的同一台机器上的 MySQL 客户端连接 127.0.0.1, 不需要输入密码。

```
mysql -uroot -P9030 -h127.0.0.1
```

**查看FE服务状态**

```
show frontends\G;
```

**添加BE节点**

```
ALTER SYSTEM ADD BACKEND "ateng-doris-be:9050";
```

**查看BE服务状态**

Alive : true 表示节点正常运行

```
SHOW BACKENDS\G;
```

## 设置用户密码

Root 用户和 Admin 用户都属于 Apache Doris 安装完默认存在的 2 个账户。其中 Root 用户拥有整个集群的超级权限，可以对集群完成各种管理操作，比如添加节点，去除节点。Admin 用户没有管理权限，是集群中的 Superuser，拥有除集群管理相关以外的所有权限。建议只有在需要对集群进行运维管理超级权限时才使用 Root 权限。

**连接FE**

```
mysql -uroot -P9030 -h127.0.0.1
```

**设置root用户密码**

```
SET PASSWORD FOR 'root'@'%' = PASSWORD('Admin@123');
```

**设置admin用户密码**

```
SET PASSWORD FOR 'admin'@'%' = PASSWORD('Admin@123');
```

**创建普通用户**

```
create database kongyu;
create user kongyu identified by 'kongyu';
grant all on kongyu.* to kongyu;
```

**查看所有用户权限**

```
SHOW ALL GRANTS;
```



## 创建数据

**连接FE**

```
mysql -uroot -P9030 -h127.0.0.1
```

**创建表**

```
CREATE TABLE IF NOT EXISTS kongyu.user_info (
    id INT NOT NULL,
    name STRING,
    age INT,
    city STRING
)
DISTRIBUTED BY HASH(id) BUCKETS 4
PROPERTIES (
    "replication_num" = "1"
);
```

**插入数据**

```
INSERT INTO kongyu.user_info (id, name, age, city) VALUES
    (2, 'Bob', 30, 'Shanghai'),
    (3, 'Charlie', 28, 'Guangzhou'),
    (4, 'David', 35, 'Shenzhen');
```

**查询数据**

```
SELECT * FROM kongyu.user_info;
```



## 使用服务

**使用HTTP**

```
URL: http://192.168.1.12:20024
Username: admin
Password: Admin@123
```

**使用mysql协议**

```
Address: 192.168.1.12:20025
Username: admin
Password: Admin@123
```

例如使用mysql客户端：`mysql -uadmin -pAdmin@123 -h192.168.1.12 -P20025`



## 删除服务

**停止服务**

```
docker stop ateng-doris-be
docker stop ateng-doris-fe
```

**删除服务**

```
docker rm ateng-doris-be
docker rm ateng-doris-fe
```

**删除目录**

```
sudo rm -rf /data/container/doris
```

