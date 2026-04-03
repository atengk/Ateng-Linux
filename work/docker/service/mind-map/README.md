# Simple mind map

Web思维导图

- [官网链接](https://github.com/wanglin2/mind-map)



**下载镜像**

```
docker pull hraulein/mind-map:latest
```

**推送到仓库**

```
docker tag hraulein/mind-map:latest registry.lingo.local/service/mind-map:latest
docker push registry.lingo.local/service/mind-map:latest
```

**保存镜像**

```
docker save registry.lingo.local/service/mind-map:latest | gzip -c > image-mind-map_latest.tar.gz
```

**创建目录**

```

```

**运行服务**

```
docker run -d --name ateng-mind-map \
  -p 20031:8080 --restart=always \
  registry.lingo.local/service/mind-map:latest
```

**查看日志**

```
docker logs -f ateng-mind-map
```

**使用服务**

```
URL: http://192.168.1.12:20031
```

**删除服务**

停止服务

```
docker stop ateng-mind-map
```

删除服务

```
docker rm ateng-mind-map
```

删除目录

```

```

