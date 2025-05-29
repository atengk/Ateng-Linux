# Samba

Samba SMB server in a Docker container.

- [Github](https://github.com/dockur/samba)



## 保存镜像

**拉取镜像**

```shell
docker pull dockurr/samba:4.21.4
```

**推送到仓库**

```
docker tag dockurr/samba:4.21.4 registry.lingo.local/service/samba:4.21.4
docker push registry.lingo.local/service/samba:4.21.4
```

**保存镜像**

```
docker save registry.lingo.local/service/samba:4.21.4 | gzip -c > image-samba_4.21.4.tar.gz
```



## 运行服务

**创建目录**

```
sudo mkdir -p /data/container/samba
sudo chown 1000:1000 /data/container/samba
```

**运行服务**

```shell
docker run --name ateng-samba -d --restart=always \
    -p 445:445 \
    -e USER=admin \
    -e PASS=Admin@123 \
    -e NAME=data \
    -v /data/container/samba:/storage \
    registry.lingo.local/service/samba:4.21.4
```

**查看日志**

```
docker logs -f ateng-samba
```

**访问系统**

```
Address: \\192.168.116.137
```

**删除服务**

停止服务

```
docker stop ateng-samba
```

删除服务

```
docker rm ateng-samba
```

删除目录

```
sudo rm -rf /data/container/samba
```


