# Redis

Redis 是一个开源的内存数据库，支持多种数据结构，如字符串、哈希、列表、集合和有序集合等。它常用于缓存、会话管理和实时数据分析等场景，具有高性能和低延迟的特点。Redis 支持数据持久化，可以将内存中的数据保存到磁盘，重启后恢复数据。

- [官方文档](https://redis.io/)

**下载镜像**

```
docker pull redis:8.6.0
```

**推送到仓库**

```
docker tag redis:8.6.0 registry.lingo.local/service/redis:8.6.0
docker push registry.lingo.local/service/redis:8.6.0
```

**保存镜像**

```
docker save registry.lingo.local/service/redis:8.6.0 | gzip -c > image-redis_8.6.0.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/redis/{data,logs,config}
sudo chown -R 1001 /data/container/redis
```

**创建配置文件**

```
sudo tee /data/container/redis/config/redis.conf <<"EOF"
bind 0.0.0.0
protected-mode yes
port 6379
timeout 0
tcp-keepalive 300
tcp-backlog 511
databases 16
requirepass Admin@123

save 900 1
save 300 10
save 60 10000

dbfilename dump.rdb
dir /data/service/redis/data

appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb

maxclients 1024
maxmemory 4gb
maxmemory-policy allkeys-lfu

loglevel notice
logfile "/data/service/redis/logs/redis.log"

loadmodule /usr/local/lib/redis/modules/redisbloom.so
loadmodule /usr/local/lib/redis/modules/redisearch.so
loadmodule /usr/local/lib/redis/modules/rejson.so
loadmodule /usr/local/lib/redis/modules/redistimeseries.so
EOF
```

**运行服务**

```
docker run -d --name ateng-redis --user 1001 \
  -p 20003:6379 --restart=always \
  -v /data/container/redis/config/redis.conf:/usr/local/etc/redis/redis.conf:ro \
  -v /data/container/redis/data:/data/service/redis/data \
  -v /data/container/redis/logs:/data/service/redis/logs
  -e TZ=Asia/Shanghai \
  --entrypoint redis-server 
  registry.lingo.local/service/redis:8.6.0 \
  /usr/local/etc/redis/redis.conf
```

**查看日志**

```
docker logs -f ateng-redis
```

**使用服务**

进入容器

```
docker exec -it ateng-redis bash
```

访问服务

```
export REDISCLI_AUTH=Admin@123
redis-cli -h 192.168.1.12 -p 20003 info server
```

查看模块信息

```
redis-cli -h 192.168.1.12 -p 20003 module list
```

**删除服务**

停止服务

```
docker stop ateng-redis
```

删除服务

```
docker rm ateng-redis
```

删除目录

```
sudo rm -rf /data/container/redis
```

