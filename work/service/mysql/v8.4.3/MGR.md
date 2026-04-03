# MySQL Group Replication (MGR)

MySQL 是一个流行的开源关系型数据库管理系统（RDBMS），广泛用于Web应用、企业系统和数据仓库等场景。它采用结构化查询语言（SQL）进行数据管理，支持多种存储引擎、事务处理和复杂查询操作。MySQL 以高性能、可靠性和易用性著称，同时具有强大的社区支持和广泛的第三方工具兼容性，适合各种规模的应用程序。

**MySQL Group Replication（MGR）** 是 MySQL 原生支持的高可用分布式复制方案，支持自动成员管理、一致性复制和故障自动恢复。它基于 Paxos 协议，实现单主或多主复制，常用于 MySQL InnoDB Cluster 架构中。

- [官网链接](https://www.mysql.com/)
- [二进制安装文档](https://dev.mysql.com/doc/refman/8.4/en/binary-installation.html)
-  [MySQL Group Replication 官方文档](https://dev.mysql.com/doc/refman/8.4/en/group-replication.html)
- [MySQL Router 官方文档](https://dev.mysql.com/doc/mysql-router/8.4/en/)

## 前置条件

- 参考：[基础配置](/work/service/00-basic/README.md)

服务器信息，推荐使用奇数节点

| 主机名                | IP            | 角色 |
| --------------------- | ------------- | ---- |
| service01.ateng.local | 10.244.250.10 | 主机 |
| service02.ateng.local | 10.244.250.20 | 成员 |
| service03.ateng.local | 10.244.250.30 | 成员 |



## 安装服务

### 安装软件包

**下载链接**

- https://dev.mysql.com/downloads/mysql/

**查看glibc版本**

```
[admin@localhost ~]$ rpm -qa glibc
glibc-2.38-29.oe2403.x86_64
```

**设置MySQL的glibc的版本**

查看glibc的版本取值范围如下：

- 当 version > 2.17，则 version=2.28
- 当 2.17 <= version < 2.28，则 version=2.17
- 当 version < 2.17，则不支持这种方式安装

```
export MYSQL_GLIBC_VERSION=2.28
```

**下载软件包**

```
wget https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86_64.tar.xz
```

**解压软件包**

```
tar -xvf mysql-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86_64.tar.xz -C /usr/local/software
ln -s /usr/local/software/mysql-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86_64 /usr/local/software/mysql
```



### 配置环境变量

**配置环境变量**

```
cat >> ~/.bash_profile <<"EOF"
## MYSQL_HOME
export MYSQL_HOME=/usr/local/software/mysql
export PATH=$PATH:$MYSQL_HOME/bin
EOF
source ~/.bash_profile
```

**查看版本**

```
mysql -V
```



### 编辑配置文件

**编辑服务配置文件**

```
cat > $MYSQL_HOME/my.cnf <<"EOF"
[mysqld]
# 基础配置
authentication_policy=caching_sha2_password
skip-name-resolve
mysqlx=0
explicit_defaults_for_timestamp
basedir=/usr/local/software/mysql
port=3306
socket=/usr/local/software/mysql/mysql.sock
datadir=/data/service/mysql/data
tmpdir=/data/service/mysql/tmp
max_allowed_packet=100M
bind-address=0.0.0.0
pid-file=/usr/local/software/mysql/mysqld.pid
log-error=/data/service/mysql/logs/mysqld.log
character-set-server=utf8mb4
collation-server=utf8mb4_general_ci
init_connect='SET NAMES utf8mb4'
slow_query_log=1
slow_query_log_file=/data/service/mysql/logs/slow_query.log
long_query_time=10.0
default_time_zone="+8:00"
lower_case_table_names=0
max_connections=1024
max_connect_errors=1024

[client]
# 客户端配置
port=3306
socket=/usr/local/software/mysql/mysql.sock
EOF
```

**创建目录**

```
mkdir -p /data/service/mysql/{data,tmp,logs}
```

**安装依赖包**

在初始化时需要用到这两个依赖包

```
sudo dnf install -y libaio numactl
```

**初始化服务**

```
mysqld --defaults-file=$MYSQL_HOME/my.cnf --initialize-insecure
```



## 启动服务

**配置systemd**

注意这里使用非root用户，如果非要使用root用户在命令后面加上 `--user=root`，相关用户和组改为root

```
sudo tee /etc/systemd/system/mysqld.service <<"EOF"
[Unit]
Description=MySQL Community Server
After=network-online.target

[Service]
User=admin
Group=ateng
Type=simple
WorkingDirectory=/usr/local/software/mysql
ExecStart=/usr/local/software/mysql/bin/mysqld_safe --defaults-file=/usr/local/software/mysql/my.cnf
ExecStop=/bin/kill -SIGTERM $MAINPID
Restart=on-failure
RestartSec=30
TimeoutStartSec=120
TimeoutStopSec=180
StartLimitIntervalSec=600
StartLimitBurst=3
KillMode=control-group
KillSignal=SIGTERM

[Install]
WantedBy=multi-user.target
EOF
```

**启动服务**

```
sudo systemctl daemon-reload
sudo systemctl enable --now mysqld
```

**查看日志**

```
tail -f /data/service/mysql/logs/mysqld.log
```



## 启用 MGR

### 编辑配置文件

**编辑服务配置文件**

注意修改相应的`server_id`和`MGR配置`

```
$ vi $MYSQL_HOME/my.cnf
[mysqld]
# ...
# 复制配置
server_id=1                # 每个节点不同
log-bin=mysql-bin
max_binlog_size=102400M
binlog_expire_logs_seconds=2592000
gtid_mode=ON
enforce-gtid-consistency=ON
plugin_load_add='group_replication.so'

# MGR配置
group_replication_group_name="6eec5432-2bba-11f0-9837-aa308bc01e57" # 所有节点相同，使用uuidgen -t生成
group_replication_ip_allowlist="127.0.0.1/8,10.244.250.0/24"
group_replication_start_on_boot=off
group_replication_local_address="service01:33061"   # 每个节点不同
group_replication_group_seeds="service01:33061,service02:33061,service03:33061"
group_replication_bootstrap_group=off
group_replication_single_primary_mode=ON     # 单主模式，如为多主，改为OFF
group_replication_enforce_update_everywhere_checks=OFF  # 多主需要ON
group_replication_recovery_use_ssl=ON
group_replication_recovery_ssl_verify_server_cert=OFF
```

**重启服务**

```
sudo systemctl restart mysqld.service
```



### 创建用户

创建用户步骤在第一个节点执行

**访问服务**

```
mysql -uroot
```

**设置管理员用户**

```sql
alter user user() identified by "Admin@123";
create user root@'%' identified by 'Admin@123';
grant all privileges on *.* to root@'%' with grant option;
```

**创建复制账户**

```sql
CREATE USER 'replica'@'%' IDENTIFIED BY 'Replica@123';
GRANT REPLICATION SLAVE ON *.* TO 'replica'@'%';
FLUSH PRIVILEGES;
```

### 启动 MGR

**设置复制账号**

设置复制账号步骤在所有节点执行

```sql
CHANGE REPLICATION SOURCE TO
  SOURCE_USER='replica',
  SOURCE_PASSWORD='Replica@123'
FOR CHANNEL 'group_replication_recovery';
```

**启动第一个节点**

只在第一个节点执行 bootstrap

```sql
SET GLOBAL group_replication_bootstrap_group=ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group=OFF;
```

**启动其他节点**

```sql
START GROUP_REPLICATION;
```

### 检查状态

**查看集群状态**

```sql
SELECT * FROM performance_schema.replication_group_members;
```

**查看当前主节点（单主模式）**

```sql
SELECT * FROM performance_schema.replication_group_members WHERE MEMBER_ROLE='PRIMARY';
```

**查看组状态**

```
SHOW STATUS LIKE 'group_replication%';
```

### 节点管理

**主从切换（仅限单主模式）**

在新主节点上执行

```sql
STOP GROUP_REPLICATION;
SET GLOBAL group_replication_single_primary_mode=OFF;
START GROUP_REPLICATION;
```

**移除节点**

停止组复制

```sql
STOP GROUP_REPLICATION;
```

停止 MySQL 服务

```
systemctl stop mysqld
```



## 创建数据

**创建数据库**

```sql
create database kongyu;
```

**创建用户**

```sql
create user kongyu@'%' identified by 'kongyu';
grant all privileges on kongyu.* to kongyu@'%' with grant option;
create user kongyu@'localhost' identified by 'kongyu';
grant all privileges on kongyu.* to kongyu@'localhost' with grant option;
```

**创建用户表**

```sql
USE kongyu;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**插入示例数据**

```sql
INSERT INTO users (username, password, email) VALUES
('user1', 'password1', 'user1@example.com'),
('user2', 'password2', 'user2@example.com'),
('user3', 'password3', 'user3@example.com');
```

**查看数据**

```
SELECT * FROM users;
```



## 创建 InnoDB Cluster

### 安装MySQL Shell

**下载链接**

- https://downloads.mysql.com/archives/router/

**查看glibc版本**

```
[admin@localhost ~]$ rpm -qa glibc
glibc-2.38-29.oe2403.x86_64
```

**设置MySQL的glibc的版本**

查看glibc的版本取值范围如下：

- 当 version > 2.17，则 version=2.28
- 当 2.17 <= version < 2.28，则 version=2.17
- 当 version < 2.17，则不支持这种方式安装

```
export MYSQL_GLIBC_VERSION=2.28
```

**下载软件包**

```
wget https://dev.mysql.com/get/Downloads/MySQL-Shell/mysql-shell-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86-64bit.tar.gz
```

**解压软件包**

```
tar -xvf mysql-shell-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86-64bit.tar.gz -C /usr/local/software
ln -s /usr/local/software/mysql-shell-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86-64bit /usr/local/software/mysql-shell
```

**配置环境变量**

```
cat >> ~/.bash_profile <<"EOF"
## MYSQL_SHELL_HOME
export MYSQL_SHELL_HOME=/usr/local/software/mysql-shell
export PATH=$PATH:$MYSQL_SHELL_HOME/bin
EOF
source ~/.bash_profile
```

**查看版本**

```
mysqlsh -V
```

### 创建 InnoDB Cluster

在 MGR 中 PRIMARY 节点上执行

**登录 MySQL Shell**

```
mysqlsh --js --uri root@service01:3306
```

**创建 InnoDB Cluster**

```
dba.configureInstance('root@localhost:3306')
dba.createCluster("atengCluster")
```

**获取 InnoDB Cluster**

```
var cluster = dba.getCluster("atengCluster")
```

**查看 InnoDB Cluster**

```
cluster.status()
```

**查看集群信息**

```
cluster.describe()
```

**添加新实例（如果后续有新节点）**

```
cluster.addInstance('root@newnode:3306')
```



## 安装MySQL Router

### 安装软件包

**下载链接**

- https://downloads.mysql.com/archives/router/

**查看glibc版本**

```
[admin@localhost ~]$ rpm -qa glibc
glibc-2.38-29.oe2403.x86_64
```

**设置MySQL的glibc的版本**

查看glibc的版本取值范围如下：

- 当 version > 2.17，则 version=2.28
- 当 2.17 <= version < 2.28，则 version=2.17
- 当 version < 2.17，则不支持这种方式安装

```
export MYSQL_GLIBC_VERSION=2.28
```

**下载软件包**

```
wget https://dev.mysql.com/get/Downloads/MySQL-Router/mysql-router-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86_64.tar.xz
```

**解压软件包**

```
tar -xvf mysql-router-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86_64.tar.xz -C /usr/local/software
ln -s /usr/local/software/mysql-router-8.4.3-linux-glibc${MYSQL_GLIBC_VERSION}-x86_64 /usr/local/software/mysql-router
```

### 注册路由器

**创建注册用户**

在 MGR 中 PRIMARY 节点上执行

```sql
CREATE USER 'router'@'%' IDENTIFIED BY 'Router@123';
GRANT ALL PRIVILEGES ON *.* TO 'router'@'%';
```

> 🚨 安全起见，也可以限制来源，如 `'router'@'10.244.250.%'`

使用命令注册路由器，最终会在指定目录下生成数据

```
/usr/local/software/mysql-router/bin/mysqlrouter \
    --bootstrap router@service01:3306 --user=admin \
    --directory /usr/local/software/mysql-router/data \
    --account=router
```



### 启动服务

**配置systemd**

```
sudo tee /etc/systemd/system/mysqlrouter.service <<"EOF"
[Unit]
Description=MySQL Router
After=network-online.target

[Service]
User=admin
Group=ateng
Type=simple
WorkingDirectory=/usr/local/software/mysql
ExecStart=/usr/local/software/mysql-router/bin/mysqlrouter -c /usr/local/software/mysql-router/data/mysqlrouter.conf
ExecStop=/bin/kill -SIGTERM $MAINPID
Restart=on-failure
RestartSec=30
TimeoutStartSec=120
TimeoutStopSec=180
StartLimitIntervalSec=600
StartLimitBurst=3
KillMode=control-group
KillSignal=SIGTERM

[Install]
WantedBy=multi-user.target
EOF
```

**启动服务**

```
sudo systemctl daemon-reload
sudo systemctl enable --now mysqlrouter
```

**查看日志**

```
tail -f /usr/local/software/mysql-router/data/log/mysqlrouter.log
```

### 使用 Router

**使用读写**

```
mysql -u kongyu -p -h 127.0.0.1 -P 6446
```

**使用只读**

```
mysql -u kongyu -p -h 127.0.0.1 -P 6447
```

