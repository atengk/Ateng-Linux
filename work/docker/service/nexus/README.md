# Nexus 3

Nexus 3 是 Sonatype 推出的企业级制品仓库，支持 Maven、npm、Docker 等多种格式，用于统一管理、代理和分发构建产物，是现代 DevOps 流程中常用的私有仓库解决方案。



**下载镜像**

```
docker pull sonatype/nexus3:3.85.0
```

**推送到仓库**

```
docker tag sonatype/nexus3:3.85.0 registry.lingo.local/service/nexus3:3.85.0
docker push registry.lingo.local/service/nexus3:3.85.0
```

**保存镜像**

```
docker save registry.lingo.local/service/nexus3:3.85.0 | gzip -c > image-nexus3_3.85.0.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/nexus
sudo chown -R 200 /data/container/nexus
```

**运行服务**

```
docker run -d --name ateng-nexus \
  -p 20033:8081 --restart=always \
  -v /data/container/nexus:/nexus-data \
  -e INSTALL4J_ADD_VM_PARAMS="-Xms2703m -Xmx2703m -XX:MaxDirectMemorySize=2703m -Djava.util.prefs.userRoot=${NEXUS_DATA}/javaprefs" \
  -e TZ=Asia/Shanghai \
  registry.lingo.local/service/nexus3:3.85.0
```

**查看日志**

```
docker logs -f ateng-nexus
```

**使用服务**

```
Address: http://192.168.1.12:20033
Username: admin
Password: $(cat /data/container/nexus/admin.password)
```

**删除服务**

停止服务

```
docker stop ateng-nexus
```

删除服务

```
docker rm ateng-nexus
```

删除目录

```
sudo rm -rf /data/container/nexus
```

