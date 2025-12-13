# 安装OceanBase

## 安装软件包

**安装依赖包**

```
sudo dnf -y install libaio-devel
```

**解压软件包**

```
tar -zxvf oceanbase-4.4.1.tar.gz -C /usr/local/software/
ln -s /usr/local/software/oceanbase-4.4.1 /usr/local/software/oceanbase
```

**配置环境变量**

```bash
cat >> ~/.bash_profile <<"EOF"
## OCEANBASE_HOME
export OCEANBASE_HOME=/usr/local/software/oceanbase
export PATH=$PATH:$OCEANBASE_HOME/bin
EOF
source ~/.bash_profile
```

**查看版本**

```
$ observer -V
observer -V
observer (OceanBase_CE 4.4.1.0)

REVISION: 1-
BUILD_BRANCH:
BUILD_TIME: Dec 12 2025 08:21:10
BUILD_FLAGS: RelWithDebInfo
BUILD_INFO:

Copyright (c) 2011-present OceanBase Inc.
$ obclient -V
obclient  Ver  Distrib 10.4.18-MariaDB, for Linux (x86_64) using readline 5.1
```

## 初始化服务

**创建目录**

```
sudo mkdir -p /data/service/oceanbase/{sstable,slog,ilog,clog}
sudo chown -R admin:ateng /data/service/oceanbase
```

**运行服务**

```
cd /data/service/oceanbase
observer \
  -I 10.244.250.30 \
  -p 2881 \
  -P 2882 \
  -z zone1 \
  -d /data/service/oceanbase \
  -r '10.244.250.30:2882' \
  -c 2385569970 \
  -n AtengOceanBase \
  -l WARN \
  -o "memory_limit=16G,system_memory=4G,datafile_size=100G,syslog_level=WARN,enable_syslog_recycle=true,max_syslog_file_count=10,enable_sql_audit=false"
```

**执行 bootstrap**

```
obclient -h10.244.250.30 -P2881 -uroot
ALTER SYSTEM BOOTSTRAP ZONE 'zone1' SERVER '10.244.250.30:2882';
SHOW DATABASES;
SELECT * FROM oceanbase.__all_tenant;
```

**查看服务参数**

```
SHOW PARAMETERS LIKE 'memory_limit';
SHOW PARAMETERS LIKE 'system_memory';
```

## 设置密码

**设计集群管理员密码**

```
obclient -h127.0.0.1 -P2881 -uroot@sys
ALTER USER root IDENTIFIED BY 'Admin@123';
```

**创建租户**

```
-- 创建资源单元配置（以下是最小配置）
CREATE RESOURCE UNIT unit1 MAX_CPU 1, MEMORY_SIZE '5G', MAX_IOPS 1024, MIN_IOPS 1024, LOG_DISK_SIZE '10G';

-- 创建资源池
CREATE RESOURCE POOL pool1 UNIT = 'unit1', UNIT_NUM = 1;

-- 创建租户（MySQL 模式）
CREATE TENANT IF NOT EXISTS ateng
  LOCALITY = 'F@zone1',
  RESOURCE_POOL_LIST = ('pool1'),
  PRIMARY_ZONE = 'zone1',
  COMMENT 'OceanBase阿腾租户'
  SET ob_compatibility_mode = 'mysql';
```

**连接到新租户并设置密码**

```
obclient -h127.0.0.1 -P2881 -uroot@ateng
ALTER USER root IDENTIFIED BY 'Ateng@123';
```

## 使用测试

**创建表测试**

```sql
-- 进入数据库
obclient -h127.0.0.1 -P2881 -uroot@ateng -pAteng@123

-- 创建业务数据库
CREATE DATABASE myapp;
USE myapp;

-- 创建示例表
CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

-- 插入数据
INSERT INTO users (name, email) VALUES 
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');

-- 查询
SELECT * FROM users;
```

**停止服务**

```
killall observer
```

## system管理

**使用system管理服务**

```
sudo tee /etc/systemd/system/oceanbase.service <<EOF
[Unit]
Description=OceanBase Database Server
Documentation=https://www.oceanbase.com/docs
After=network-online.target
Wants=network-online.target

[Service]
# 显式设置工作目录
WorkingDirectory=/data/service/oceanbase
# 启动命令：只需 -d，其余配置从 etc/observer.config.bin 自动加载
ExecStart=/usr/local/software/oceanbase/bin/observer -d /data/service/oceanbase -N -l WARN
# 如果你的 observer 在其他路径，请修改上面的路径！

# 停止方式：通过 kill 发送 SIGTERM（observer 支持优雅退出）
KillMode=control-group
KillSignal=SIGTERM
TimeoutStopSec=120

# 重启策略
Restart=on-failure
RestartSec=10
StartLimitIntervalSec=600
StartLimitBurst=3

# 资源限制（OceanBase 高并发需要较高文件描述符）
LimitNOFILE=1048576
LimitNPROC=65536
LimitCORE=infinity

# 安全与权限
User=admin
Group=ateng

# 禁用 OOM killer（可选，生产建议）
OOMScoreAdjust=-999

[Install]
WantedBy=multi-user.target
EOF
```

**启动服务**

```
sudo systemctl daemon-reload
sudo systemctl start oceanbase
sudo systemctl enable oceanbase
```



## 添加节点

**添加第 2 个节点**

```
observer \
  -I 10.244.250.31 \
  -p 2881 \
  -P 2882 \
  -z zone2 \
  -d /data/service/oceanbase \
  -r '10.244.250.30:2882,10.244.250.31:2882' \
  -c 1 \
  -n AtengOceanBase \
  -l WARN \
  -o "memory_limit=16G,system_memory=4G,datafile_size=100G,syslog_level=WARN,enable_syslog_recycle=true,max_syslog_file_count=10,enable_sql_audit=false"
```

-   -r '10.244.250.30:2882' ：这里仍然只写 **已有 RS 列表**（即第一个节点）
-   -c 1 ： 必须和第一个节点 cluster_id 一致！

**连接第一个节点**

```
obclient -h10.244.250.30 -P2881 -uroot@sys -A
```

**创建新的 Zone**

```
ALTER SYSTEM ADD ZONE 'zone2';
SELECT * FROM oceanbase.DBA_OB_ZONES;
```

**添加server**

```
ALTER SYSTEM ADD SERVER '10.244.250.31:2882' ZONE 'zone2';
```

**查看集群信息**

```
-- 查看所有 server
SELECT * FROM oceanbase.DBA_OB_SERVERS;

-- 查看 zone 信息
SELECT * FROM oceanbase.DBA_OB_ZONES;
```

**添加第 3 个节点**

在 `10.244.250.32` 上启动：

```
observer \
  -I 10.244.250.32 \
  -p 2881 -P 2882 \
  -z zone3 \
  -d /data/service/oceanbase \
  -r '10.244.250.30:2882' \   # 仍只需指向任一已有 RS 节点
  -c 2385569970 \
  -n AtengOceanBase \
  -l WARN \
  -o "memory_limit=16G,system_memory=4G,datafile_size=100G,..."
```

**查询服务器列表**

```
SELECT * FROM oceanbase.DBA_OB_SERVERS;
```

**扩容后：调整租户副本数（让数据分布到新节点）**

假设你之前创建了一个租户 `ateng`，默认可能只有 1 个副本（在第一个节点）。

现在要让它变成 3 副本（分布在 3 个 zone）：

```
-- 修改资源池单元数（先确保有足够 Unit）
ALTER RESOURCE POOL pool_ateng UNIT_NUM = 3;

-- 修改租户 locality（指定 3 个 zone 各 1 副本）
ALTER TENANT ateng LOCALITY = 'F@zone1,F@zone2,F@zone3';
```

## 创建obproxy

...