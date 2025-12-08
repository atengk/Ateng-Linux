# OnlyOffice

兼顾桌面与在线／服务器端的办公套件，兼容 MS Office 格式，支持多人/团队协作、云/私有部署、在线编辑 + API／服务端集成。

- [官方文档](https://www.onlyoffice.com/)



**下载镜像**

```
docker pull onlyoffice/documentserver:9.2
```

**推送到仓库**

```
docker tag onlyoffice/documentserver:9.2 registry.lingo.local/service/onlyoffice-documentserver:9.2
docker push registry.lingo.local/service/onlyoffice-documentserver:9.2
```

**保存镜像**

```
docker save registry.lingo.local/service/onlyoffice-documentserver:9.2 | gzip -c > image-onlyoffice-documentserver_9.2.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/onlyoffice/{data,logs,lib,db}
```

**创建配置文件**

```

```

**运行服务**

```
docker run -d --name ateng-onlyoffice \
  -p 20046:80 --restart=always \
  -v /data/container/onlyoffice/logs:/var/log/onlyoffice \
  -v /data/container/onlyoffice/data:/var/www/onlyoffice/Data \
  -v /data/container/onlyoffice/lib:/var/lib/onlyoffice \
  -v /data/container/onlyoffice/db:/var/lib/postgresql \
  -e JWT_SECRET=Admin@123 \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/onlyoffice-documentserver:9.2
```

**查看日志**

```
docker logs -f ateng-onlyoffice
```

**使用服务**

进入容器

```
docker exec -it ateng-onlyoffice-documentserver bash
```

访问服务

```
Address: https://192.168.1.12:20046
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

