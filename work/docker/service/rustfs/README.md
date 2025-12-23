# RustFS

RustFS 是一款简单、高效、分布式的对象存储。 同时，也是一种高效、开源、自由的对象存储解决方案。它 100% 兼容 S3 协议，使用 Apache2 许可证发行的开源软件。

- [官网地址](https://docs.rustfs.com/zh/introduction.html)

**下载镜像**

```
docker pull rustfs/rustfs:1.0.0-alpha.76
```

**推送到仓库**

```
docker tag rustfs/rustfs:1.0.0-alpha.76 registry.lingo.local/service/rustfs:1.0.0
docker push registry.lingo.local/service/rustfs:1.0.0
```

**保存镜像**

```
docker save registry.lingo.local/service/rustfs:1.0.0 | gzip -c > image-rustfs_1.0.0.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/rustfs/data
sudo chown -R 10001:10001 /data/container/rustfs
```

**运行服务**

```
docker run -d --name ateng-rustfs \
  -p 20031:9000 -p 20032:9001 --restart=always \
  -v /data/container/rustfs/data:/data \
  -e RUSTFS_VOLUMES=/data \
  -e RUSTFS_ACCESS_KEY=admin \
  -e RUSTFS_SECRET_KEY=Admin@123 \
  -e RUSTFS_CONSOLE_ENABLE=true \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/rustfs:1.0.0
```

**查看日志**

```
docker logs -f ateng-rustfs
```

**使用服务**

```
API URL: http://192.168.1.114:20031
Web URL: http://192.168.1.114:20032
Username: admin
Password: Admin@123
```

**删除服务**

停止服务

```
docker stop ateng-rustfs
```

删除服务

```
docker rm ateng-rustfs
```

删除目录

```
sudo rm -rf /data/container/rustfs
```

