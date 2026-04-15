# pgvector

pgvector 是一个基于 PostgreSQL 的向量扩展，允许在数据库中直接存储、查询和索引向量数据，广泛应用于语义搜索、推荐系统、相似度匹配和 RAG（Retrieval-Augmented Generation）等场景。它支持多种向量距离计算方式，并提供高性能索引（如 HNSW、IVFFlat），能够在关系型数据库中实现接近向量数据库的能力。

- [GitHub](https://github.com/pgvector/pgvector)

**下载镜像**

```
docker pull pgvector/pgvector:0.8.2-pg18-trixie
```

**推送到仓库**

```
docker tag pgvector/pgvector:0.8.2-pg18-trixie registry.lingo.local/service/pgvector:0.8.2-pg18-trixie
docker push registry.lingo.local/service/pgvector:0.8.2-pg18-trixie
```

**保存镜像**

```
docker save registry.lingo.local/service/pgvector:0.8.2-pg18-trixie | gzip -c > image-pgvector_0.8.2-pg18-trixie.tar.gz
```

**创建目录**

```
sudo mkdir -p /data/container/postgresql/{data,config}
```

**运行服务**

```
docker run -d \
  --name ateng-pgvector \
  --restart unless-stopped \
  -p 20002:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=Admin@123 \
  -e POSTGRES_DB=kongyu \
  -e TZ=Asia/Shanghai \
  -v /data/container/postgresql/data:/var/lib/postgresql/data \
  registry.lingo.local/service/pgvector:0.8.2-pg18-trixie
```

**查看日志**

```
docker logs -f ateng-pgvector
```

**使用服务**

进入容器

```
docker exec -it ateng-pgvector bash
```

访问服务

```
export PGPASSWORD=Admin@123
psql --host 192.168.1.12 -U postgres -d kongyu -p 20002 -c "\l"
```

**删除服务**

停止服务

```
docker stop ateng-pgvector
```

删除服务

```
docker rm ateng-pgvector
```

删除目录

```
sudo rm -rf /data/container/postgresql
```

