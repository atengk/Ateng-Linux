# EMQX

EMQX 是一款高性能、可扩展的 MQTT 消息服务器，支持 MQTT 3.1.1、MQTT 5.0 等协议，广泛应用于物联网（IoT）、实时消息推送和事件驱动架构中。
EMQX 支持集群部署、规则引擎、认证鉴权、多种协议接入，具备高并发、低延迟和高可用特性。

- [官方文档](https://www.emqx.io/docs/zh/latest/)

------

**下载镜像**

```
docker pull emqx/emqx:6.1.0
```

------

**推送到仓库**

```
docker tag emqx/emqx:6.1.0 registry.lingo.local/service/emqx:6.1.0
docker push registry.lingo.local/service/emqx:6.1.0
```

------

**保存镜像**

```
docker save registry.lingo.local/service/emqx:6.1.0 | gzip -c > image-emqx_6.1.0.tar.gz
```

------

**创建目录**

```
sudo mkdir -p /data/container/emqx/{data,log}
sudo chown -R 1000:1000 /data/container/emqx
```

------

**运行服务**

```
docker run -d --name ateng-emqx \
  --restart=always \
  -p 1883:1883 -p 8083:8083 -p 8084:8084 \
  -p 8883:8883 -p 18083:18083 \
  -v /data/container/emqx/data:/opt/emqx/data \
  -v /data/container/emqx/log:/opt/emqx/log \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/emqx:6.1.0
```

| 宿主机端口 | EMQX 内部端口 | 用途 / 协议           | 说明                                                         |
| ---------- | ------------- | --------------------- | ------------------------------------------------------------ |
| **1883**   | 1883          | MQTT TCP *非加密*     | 标准的 MQTT 协议端口，用于普通 MQTT 客户端连接（最常用）     |
| **8883**   | 8883          | MQTT TLS/SSL *加密*   | 用于安全的 MQTT 连接（SSL/TLS 加密），客户端使用 `mqtts://`/有证书时连接 |
| **8083**   | 8083          | WebSocket *非加密*    | 支持 **MQTT over WebSocket**（ws://），适合 Web 客户端或浏览器连接 |
| **8084**   | 8084          | WebSocket TLS/SSL     | 支持 **MQTT over WSS**（wss://），WebSocket 的安全 TLS 版本  |
| **18083**  | 18083         | Dashboard & HTTP 管理 | EMQX 内置的 Web 管理界面端口，可在浏览器访问监控/配置等      |

------

**查看日志**

```
docker logs -f ateng-emqx
```

------

**使用服务**

访问 Dashboard

```
http://192.168.1.12:18083
```

默认账号：

- 用户名：`admin`
- 密码：`public`

------

进入容器

```
docker exec -it ateng-emqx bash
```

------

查看节点状态

```
emqx ctl status
```

------

查看集群信息

```
emqx ctl cluster status
```

------

**删除服务**

停止服务

```
docker stop ateng-emqx
```

删除服务

```
docker rm ateng-emqx
```

删除目录

```
sudo rm -rf /data/container/emqx
```

------

