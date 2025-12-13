# 编译OceanBase

使用容器编译OceanBase，可以根据后续需要部署服务器的操作系统选择相应的容器

- [参考文档](https://oceanbase.github.io/oceanbase/zh/build-and-run/)

**下载源码**

```
mkdir build
wget -O oceanbase-4.4.1_CE_HF1.tar.gz https://github.com/oceanbase/oceanbase/archive/refs/tags/v4.4.1_CE_HF1.tar.gz
```

**创建容器**

```
docker run --rm -it \
    -v $(pwd)/build:/usr/local/software \
    openeuler/openeuler:24.03 bash
```

**解压源码包**

```
tar -zxvf oceanbase-4.4.1_CE_HF1.tar.gz
cd oceanbase-4.4.1_CE_HF1
```

**安装编译依赖包**

```
dnf install -y wget cpio git cmake ninja-build \
    autoconf automake libtool bison flex \
    openssl-devel ncurses-devel libaio-devel unzip
```

**设置Python链接**

```
ln -s /usr/bin/python3 /usr/bin/python
```

**构建**

> 构建过程会很久，挂机等待...

```
bash build.sh release --init --make
```

**构建后得到文件**

以下文件可以复制出来打包成制品，后续可以在同一类系统上运行（注意需要安装编译依赖）

```
$ ll ./tools/deploy ./deps/3rd/u01/obclient build_release/src/observer/observer
-rwxr-xr-x 1 root root 4998529576 12月 12 16:22 build_release/src/observer/observer

./deps/3rd/u01/obclient:
总用量 8
drwxr-xr-x 2 root root 4096 12月 12 08:58 bin
drwxr-xr-x 4 root root 4096 12月 12 08:58 include
drwxr-xr-x 4 root root   99 12月 12 08:58 lib

./tools/deploy:
总用量 60
-rw-rw-r-- 1 root root  3316 12月  5 13:50 activate_obd.sh
-rwxrwxr-x 1 root root  3935 12月  5 13:50 copy.sh
-rw-rw-r-- 1 root root 13636 12月  5 13:50 init_create_tenant_routines.sql
-rw-rw-r-- 1 root root  3410 12月  5 13:50 init_for_ce.sql
-rw-rw-r-- 1 root root   309 12月  5 13:50 init_user.sql
drwxrwxr-x 6 root root    57 12月  5 13:50 mysql_test
drwxrwxr-x 2 root root  4096 12月  5 13:50 obd
-rwxrwxr-x 1 root root 23787 12月  5 13:50 obd.sh
```

**打包制品**

```
mkdir oceanbase-4.4.1
cp -r ./tools/deploy oceanbase-4.4.1/
cp -r ./deps/3rd/u01/obclient/* oceanbase-4.4.1/
cp build_release/src/observer/observer oceanbase-4.4.1/bin/
tar -czvf oceanbase-4.4.1.tar.gz oceanbase-4.4.1
```

**退出容器保存制品**

```
mv build/oceanbase-4.4.1_CE_HF1/oceanbase-4.4.1.tar.gz .
ll oceanbase-4.4.1.tar.gz
```

