# WPS Office

商业／免费混合办公套件（含免费 + 付费），界面设计接近 MS Office，易上手，兼容多平台，还有移动端支持。

- [官方文档](https://www.wps.com/)



**下载镜像**

```
docker pull linuxserver/wps-office:11.1.0
```

**推送到仓库**

```
docker tag linuxserver/wps-office:11.1.0 registry.lingo.local/service/wps-office:11.1.0
docker push registry.lingo.local/service/wps-office:11.1.0
```

**保存镜像**

```
docker save registry.lingo.local/service/wps-office:11.1.0 | gzip -c > image-wps-office_11.1.0.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/wps-office/
sudo chown -R 1001:1001 /data/container/wps-office
```

**创建配置文件**

```

```

**运行服务**

```
docker run -d --name ateng-wps-office \
  -p 20049:3000 -p 20050:3001 \
  --restart=always --shm-size="1gb" \
  -v /data/container/wps-office:/config \
  -e PUID=1001 \
  -e PGID=1001 \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/wps-office:11.1.0
```

**查看日志**

```
docker logs -f ateng-wps-office
```

**使用服务**

进入容器

```
docker exec -it ateng-wps-office bash
```

访问服务

```
Address: https://192.168.1.12:20050
```

**删除服务**

停止服务

```
docker stop ateng-wps-office
```

删除服务

```
docker rm ateng-wps-office
```

删除目录

```
sudo rm -rf /data/container/wps-office
```

