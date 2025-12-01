# LibreOffice

开源免费办公套件，包含文档（Writer）、表格（Calc）、演示（Impress）、绘图（Draw）、数据库（Base）、公式编辑（Math）等模块。适合 Linux、macOS、Windows。

- [官方文档](https://www.libreoffice.org/)



**下载镜像**

```
docker pull linuxserver/libreoffice:25.2.5
```

**推送到仓库**

```
docker tag linuxserver/libreoffice:25.2.5 registry.lingo.local/service/libreoffice:25.2.5
docker push registry.lingo.local/service/libreoffice:25.2.5
```

**保存镜像**

```
docker save registry.lingo.local/service/libreoffice:25.2.5 | gzip -c > image-libreoffice_25.2.5.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/libreoffice/
sudo chown -R 1001:1001 /data/container/libreoffice
```

**创建配置文件**

```

```

**运行服务**

```
docker run -d --name ateng-libreoffice \
  -p 20044:3000 -p 20045:3001 \
  --restart=always --shm-size="1gb" \
  -v /data/container/libreoffice:/config \
  -e PUID=1001 \
  -e PGID=1001 \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/libreoffice:25.2.5
```

**查看日志**

```
docker logs -f ateng-libreoffice
```

**使用服务**

进入容器

```
docker exec -it ateng-libreoffice bash
```

访问服务

```
Address: https://192.168.1.12:20045
```

**删除服务**

停止服务

```
docker stop ateng-libreoffice
```

删除服务

```
docker rm ateng-libreoffice
```

删除目录

```
sudo rm -rf /data/container/libreoffice
```

