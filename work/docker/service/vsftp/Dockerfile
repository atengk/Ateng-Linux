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
