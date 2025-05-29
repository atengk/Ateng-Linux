# VSFTP

vsftp（Very Secure FTP）是一个轻量、高效、安全的FTP服务器，常用于Linux系统下的文件传输服务，支持多种配置和安全特性。 官网链接：[vsftpd](https://security.appspot.com/vsftpd.html)



## 构建镜像

**创建配置文件**

```
cat > vsftpd.conf <<"EOF"
anonymous_enable=YES
anon_root=/data
anon_upload_enable=YES
anon_world_readable_only=YES
anon_mkdir_write_enable=YES
anon_other_write_enable=YES
anon_umask=022
write_enable=YES
listen=YES
listen_ipv6=NO
pasv_enable=YES
pasv_min_port=34500
pasv_max_port=34600
pasv_address=47.108.79.14
EOF
```

**创建Dockerfile**

```
cat > Dockerfile <<"EOF"
FROM alpine:latest

# 安装 vsftpd 和 bash（用于调试，非必需）
RUN sed -i 's|dl-cdn.alpinelinux.org|mirrors.aliyun.com|g' /etc/apk/repositories && \
    apk update && apk add --no-cache vsftpd bash

# 添加 vsftpd 配置文件
COPY vsftpd.conf /etc/vsftpd/vsftpd.conf

# 创建目录
RUN mkdir -p /data/upload /var/run/vsftpd && \
    chmod 777 /data/upload

# 暴露 FTP 端口（控制端口21，PASV 端口范围）
EXPOSE 21 34500-34600

# 启动 vsftpd
CMD ["/usr/sbin/vsftpd", "/etc/vsftpd/vsftpd.conf"]
EOF
```

**构建镜像**

```
docker build -t registry.lingo.local/service/vsftpd:alpine .
```

**启动测试**

```
docker run --rm --name ateng-vsftpd \
    -p 21:21 -p 34500-34600:34500-34600 \
    registry.lingo.local/service/vsftpd:alpine
```

**推送到仓库**

```
docker push registry.lingo.local/service/vsftpd:alpine
```

**保存镜像**

```
docker save registry.lingo.local/service/vsftpd:alpine | gzip -c > image-vsftpd_alpine.tar.gz
```



## 启动服务

**创建目录**

```
sudo mkdir -p /data/container/vsftpd/data/public
sudo chmod 777 /data/container/vsftpd/data/public
```

**创建配置文件**

注意将 `pasv_address` 填写为最终要访问的IP

```
sudo tee /data/container/vsftpd/vsftpd.conf <<"EOF"
anonymous_enable=YES
anon_root=/data
anon_upload_enable=YES
anon_world_readable_only=YES
anon_mkdir_write_enable=YES
anon_other_write_enable=YES
anon_umask=022
write_enable=YES
listen=YES
listen_ipv6=NO
pasv_enable=YES
pasv_min_port=34500
pasv_max_port=34600
pasv_address=47.108.79.14
EOF
```

**运行服务**

```
docker run -d --name ateng-vsftpd \
  -p 21:21 -p 34500-34600:34500-34600 \
  --restart=always \
  -v /data/container/vsftpd/vsftpd.conf:/etc/vsftpd/vsftpd.conf:ro \
  -v /data/container/vsftpd/data:/data \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/vsftpd:alpine
```

**查看日志**

没有日志就是正常的

```
docker logs -f ateng-vsftpd
```

**使用服务**

访问服务

```
Address: ftp://47.108.79.14
Username: anonymous
Password: 无
```

**删除服务**

停止服务

```
docker stop ateng-vsftpd
```

删除服务

```
docker rm ateng-vsftpd
```

删除目录

```
sudo rm -rf /data/container/vsftpd
```