# OnlyOffice

兼顾桌面与在线／服务器端的办公套件，兼容 MS Office 格式，支持多人/团队协作、云/私有部署、在线编辑 + API／服务端集成。

- [官方文档](https://www.onlyoffice.com/)



**下载镜像**

```
docker pull linuxserver/onlyoffice:9.1.0
```

**推送到仓库**

```
docker tag linuxserver/onlyoffice:9.1.0 registry.lingo.local/service/onlyoffice:9.1.0
docker push registry.lingo.local/service/onlyoffice:9.1.0
```

**保存镜像**

```
docker save registry.lingo.local/service/onlyoffice:9.1.0 | gzip -c > image-onlyoffice_9.1.0.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/onlyoffice/
sudo chown -R 1001:1001 /data/container/onlyoffice
```

**创建配置文件**

```

```

**运行服务**

```
docker run -d --name ateng-onlyoffice \
  -p 20046:3000 -p 20047:3001 \
  --restart=always --shm-size="1gb" \
  -v /data/container/onlyoffice:/config \
  -e PUID=1001 \
  -e PGID=1001 \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/onlyoffice:9.1.0
```

**查看日志**

```
docker logs -f ateng-onlyoffice
```

**使用服务**

进入容器

```
docker exec -it ateng-onlyoffice bash
```

访问服务

```
Address: https://192.168.1.12:20047
```

**删除服务**

停止服务

```
docker stop ateng-onlyoffice
```

删除服务

```
docker rm ateng-onlyoffice
```

删除目录

```
sudo rm -rf /data/container/onlyoffice
```

