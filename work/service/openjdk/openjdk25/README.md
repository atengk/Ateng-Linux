# OpenJDK25

Eclipse Temurin 是一个由 Eclipse 基金会支持的开源 Java 运行时环境（JRE）和 Java 开发工具包（JDK）。它提供了一个高性能、可靠的 OpenJDK 构建版本，旨在为开发人员和企业提供一个免费的、符合标准的 Java 发行版。Temurin 的构建遵循 OpenJDK 的规范，并且得到了持续的社区支持和更新。

OpenJDK 25 是 2025 年 9 月发布的长期支持（LTS）版本，对应 Java SE 25 平台。该版本在语言特性、虚拟机性能、标准库以及工具链等方面都有显著改进。语言层面引入了基本类型的模式匹配（Pattern Matching for Primitive Types）、模块导入声明（Module Import Declarations）以及更简洁的源文件编写方式（Compact Source Files），让开发者能够以更直观、更简练的语法构建应用程序。

在运行时和标准库方面，OpenJDK 25 引入了作用域值（Scoped Values）来替代 ThreadLocal，更安全高效地传递线程上下文；改进了垃圾回收机制与内存分配性能；并持续优化了启动速度与监控工具。总体而言，OpenJDK 25 不仅提升了开发体验，也进一步强化了 Java 在大型系统与云原生环境中的稳定性与性能。

- [官网地址](https://adoptium.net/zh-CN/)



**下载软件包**

- [下载地址](https://adoptium.net/zh-CN/temurin/releases/?os=linux&arch=x64&package=jdk&version=25)

**解压软件包**

```
tar -zxvf OpenJDK25U-jdk_x64_linux_hotspot_25.0.1_8.tar.gz -C /usr/local/software/
ln -s /usr/local/software/jdk-25.0.1+8 /usr/local/software/jdk25
```

**配置环境变量**

```
cat >> ~/.bash_profile <<"EOF"
## JAVA_HOME
export JAVA_HOME=/usr/local/software/jdk25
export PATH=$PATH:$JAVA_HOME/bin
EOF
source ~/.bash_profile
```

**查看版本**

```
java -version
```
