# Jenkins使用文档



## 基础配置

### 配置Location

**登录Web**

进入Jenkins Web，输入账号密码登录

![image-20250401105014976](./assets/image-20250401105014976.png)

**配置 Jenkins Location**

在 `Manage Jenkins` → `System` → `Jenkins Location` 里面配置 **Jenkins URL** 和 **邮箱**

![image-20250410162827627](./assets/image-20250410162827627.png)

### 安装插件

**进入安装插件页面**

在 `Manage Jenkins` → `Plugins` → `Available plugins` 安装插件

如果安装失败，重新输入插件名称可以再次安装

**设置国内镜像源**

```
sed -i "s#updates.jenkins.io/download#mirrors.tuna.tsinghua.edu.cn/jenkins#g" $JENKINS_HOME/plugins/updates/default.json
sed -i "s#www.google.com#www.baidu.com#g" $JENKINS_HOME/plugins/updates/default.json
```

**搜索插件**

- 中文插件

 Localization: Chinese (Simplified)

- SSH 插件

SSH Pipeline Steps、Publish Over SSH、SSH Agent

- 流水线 插件

Pipeline、Pipeline: Stage View

- 消息通知 插件

Email Extension、Qy Wechat Notification、DingTalk

- Git 插件

Git、GitLab（如果Git仓库是使用Gitlab可以安装）

- Webhook

Generic Webhook Trigger、Multibranch Scan Webhook Trigger

- NodeJS 插件

NodeJS

- Docker 插件

Docker、Docker Pipeline

- Kubernetes 插件

Kubernetes

**下载并安装**

搜索完下载的插件后开始下载并安装，安装完后重启Jenkins

![image-20250401105437136](./assets/image-20250401105437136.png)

![image-20250401105444518](./assets/image-20250401105444518.png)



### 全局工具配置

点击 `系统管理` → `全局工具配置` ，设置JDK、Maven、NodeJS等工具



#### Git

- [安装文档](/work/service/git/v2.49.0/README.md)

**Jenkins中配置**

![image-20250407153554330](./assets/image-20250407153554330.png)



#### JDK

- [安装文档](/work/service/openjdk/openjdk21/README.md)

**下载软件包**

- [下载地址](https://adoptium.net/zh-CN/temurin/releases/?os=linux&arch=x64&package=jdk&version=21)

**解压软件包**

将下载的软件包上传到 `JENKINS_HOME/tools` 目录下并解压，可以选择自定义最后的目录名称

```
tar -zxvf OpenJDK21U-jdk_x64_linux_hotspot_21.0.5_11.tar.gz
```

**Jenkins中配置**

设置别名，用于后续Jenkinsfile中的tools的名称

设置安装目录，指定实际路径

![image-20250403102237907](./assets/image-20250403102237907.png)

**使用工具**

```groovy
pipeline {
    agent any
    tools {
        jdk 'JDK-21'
    }
    stages {
        stage('env') {
            steps {
                sh 'env'
            }
        }
        stage('jdk') {
            steps {
                sh 'jdk -version'
            }
        }
    }
}
```



#### Maven

- [安装文档](/work/service/maven/v3.9.9/README.md)

**下载软件包**

- [下载地址](https://dlcdn.apache.org/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.tar.gz)

**解压软件包**

将下载的软件包上传到 `JENKINS_HOME/tools` 目录下并解压，可以选择自定义最后的目录名称

```
tar -zxvf apache-maven-3.9.9-bin.tar.gz
```

**配置本地仓库地址**

编辑 `conf/settings.xml` 配置文件修改以下内容。默认下载的地址会存放在JENKINS_HOME中，如果没有特定需求可以不用修改本地仓库地址

```xml
  <localRepository>/data/download/maven/repository/</localRepository>
```

**配置国内镜像源**

编辑 `conf/settings.xml` 配置文件修改以下内容

```xml
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
```

**Jenkins中配置**

设置别名，用于后续Jenkinsfile中的tools的名称

设置安装目录，指定实际路径

![image-20250403102754868](./assets/image-20250403102754868.png)

**使用工具**

```groovy
pipeline {
    agent any
    tools {
        maven 'Maven-3.9.9'
    }
    stages {
        stage('env') {
            steps {
                sh 'env'
            }
        }
        stage('maven') {
            steps {
                sh 'maven -version'
            }
        }
    }
}
```



#### NodeJS

需要安装 `NodeJS` 插件

- [安装文档](/work/service/nodejs/v22.14.0/README.md)

**下载软件包**

- [下载地址](https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-x64.tar.xz)

**解压软件包**

将下载的软件包上传到 `JENKINS_HOME/tools` 目录下并解压，可以选择自定义最后的目录名称

```
tar -xJf node-v22.14.0-linux-x64.tar.xz
```

**Jenkins中配置**

设置别名，用于后续Jenkinsfile中的tools的名称

设置安装目录，指定实际路径

![image-20250403103143591](./assets/image-20250403103143591.png)

**使用工具**

```groovy
pipeline {
    agent any
    tools {
        nodejs 'NodeJS-v22.14.0'
    }
    stages {
        stage('env') {
            steps {
                sh 'env'
            }
        }
        stage('nodejs') {
            steps {
                sh 'node -v'
            }
        }
    }
}
```



#### Docker

需要安装 `Docker、Docker Pipeline` 插件

- [安装文档](/work/docker/deploy/v27.3.1/README.md)

**下载软件包**

- [下载地址](https://download.docker.com/linux/static/stable/x86_64/docker-27.3.1.tgz)

**解压软件包**

将下载的软件包上传到 `JENKINS_HOME/tools` 目录下并解压，可以选择自定义最后的目录名称

需要将软件包放在bin目录下

```
tar -zxff docker-27.3.1.tgz
mkdir -p docker/bin
mv docker/* docker/bin
```

**Jenkins中配置**

设置别名，用于后续Jenkinsfile中的tools的名称

设置安装目录，指定实际路径

![image-20250408134720722](./assets/image-20250408134720722.png)

**使用工具**

有两种方式使用Docker命令

- 使用本机或者宿主机的Socket：`/var/run/docker.sock`，有了Socket后可以直接使用Docker命令
- 远程Docker服务器开放API，使用环境变量 `DOCKER_HOST` 指定远程服务器，配置了远程服务器后也可以直接使用Docker命令

```groovy
pipeline {
    agent any
    environment {
        DOCKER_HOST = 'tcp://10.244.172.126:2375'  // 配置 Docker 远程服务器的 API
    }
    tools {
        dockerTool 'Docker-27.3.1'
    }
    stages {
        stage('env') {
            steps {
                sh 'env'
            }
        }
        stage('docker') {
            steps {
                sh 'docker version'
            }
        }
    }
}
```



### 环境变量

**内置环境变量**

通过 `JENKINS_URL/env-vars.html/` 可以查看Jenkins支持的环境变量

**自定义环境变量**

在 `系统管理` → `系统配置` → `全局属性` → `环境变量`，新增自定义的环境变量

![image-20250401115458741](./assets/image-20250401115458741.png)

**使用环境变量**

后续可以使用这些环境变量，例如

```
echo "Job Name: $JOB_NAME"
echo "Build Number: $BUILD_NUMBER"
echo "Workspace: $WORKSPACE"
echo "Author: $Author"
```



### SSH秘钥配置

在 `JENKINS_HOME` 中生成SSH秘钥，用于后续通过SSH访问

这个生成的SSH秘钥存放在 `$JENKINS_HOME/.ssh` 目录下没什么特定含义，就是为了存储一下秘钥，实际使用是在Jenkins中配置私钥凭证来进行访问。

**自动生成**

生成秘钥到 `JENKINS_HOME` 下

```
mkdir -p $JENKINS_HOME/.ssh
chmod 700 $JENKINS_HOME/.ssh
ssh-keygen -t rsa -P "" -f $JENKINS_HOME/.ssh/id_rsa -C "2385569970@qq.com"
cat $JENKINS_HOME/.ssh/id_rsa.pub > $JENKINS_HOME/.ssh/authorized_keys
```

**手动生成**

```
mkdir -p $JENKINS_HOME/.ssh
cat > $JENKINS_HOME/.ssh/id_rsa <<"EOF"
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
NhAAAAAwEAAQAAAYEAqAairG04/j4EckmpTLgOSCzHz66wSiSJTaF4sqPOi2TqZF/1klrV
gN8+LJmdcHBuzibWaZE3lODGU6gHNh7Or5Xx8pKM80iMUK1+geZwrqH6qWbIv7+opKWrsG
UCZReWu749eo/AmNtnpJkSCpcV5G3qZ9Qacv9qdVEkWuwI4AHPxYbS5ORP0yC0NbUIADro
0jqLJ9XMm1qQhdgmL4yEpvrfLxi9bpC6FtIy9PRPvNDET+PUtehdiiTG+7rsAqT0E3nvJr
icNJNitDNJHcs/pxQzIcGoof8lPth9wBjzGKJ30avxcrQGIdtLo8OVanjac4kVzfJ1+Oe6
6OLPlvEWZY3j/idOHWJcExbHsHimRmeeFneVELgSq7ftGD9eeRpWf4LimRD7b83CSin9xU
c88niAmA7vpCSilAijSUuURYl0xE4388efTFMhz2gSenjtFca9rnzG/XT8K9BHemrCo3zv
fZa1ore0ZL0ox4BdHzp43N60x/hWxTKyLQVFeHVvAAAFiLcoWTG3KFkxAAAAB3NzaC1yc2
EAAAGBAKgGoqxtOP4+BHJJqUy4Dkgsx8+usEokiU2heLKjzotk6mRf9ZJa1YDfPiyZnXBw
bs4m1mmRN5TgxlOoBzYezq+V8fKSjPNIjFCtfoHmcK6h+qlmyL+/qKSlq7BlAmUXlru+PX
qPwJjbZ6SZEgqXFeRt6mfUGnL/anVRJFrsCOABz8WG0uTkT9MgtDW1CAA66NI6iyfVzJta
kIXYJi+MhKb63y8YvW6QuhbSMvT0T7zQxE/j1LXoXYokxvu67AKk9BN57ya4nDSTYrQzSR
3LP6cUMyHBqKH/JT7YfcAY8xiid9Gr8XK0BiHbS6PDlWp42nOJFc3ydfjnuujiz5bxFmWN
4/4nTh1iXBMWx7B4pkZnnhZ3lRC4Equ37Rg/XnkaVn+C4pkQ+2/Nwkop/cVHPPJ4gJgO76
QkopQIo0lLlEWJdMRON/PHn0xTIc9oEnp47RXGva58xv10/CvQR3pqwqN8732WtaK3tGS9
KMeAXR86eNzetMf4VsUysi0FRXh1bwAAAAMBAAEAAAGAGQt4JtxW4OqMjh51qjZLBq4KEG
Y456w/fP9C9tmcuUFPAKwe9fQtG7rq0QoKog5YLckzL2QSVVIVrbV/ca0w4JIokKAQe1jG
dWYO07zt8dG6A5MK/C3MrNH23+GGdFwKPyyxjDmuGvqlHa8lNcfkXvqVNGm0kYyJqTfxg8
3n2r/aYNZiS/TOAym+Qr0blrExL9jDEip3h3Z90T1xH6hBw4PkTWhSIA9ZdXpaVxGtavbx
M/lBJOYgPy2RLUdk01YTv4hh8Puvin4aVQN3o+tz7hnVsjKhidUsViqaqndOoiggR4bibh
BF4sdRhrQZpd4zjaY5Mzm7STShZ3LroiikLQ9Fm4vvcYrNH/VAQhB8L7pe2Xm2WmTzCvYx
iAs2NNlrbCT1zLK27wu8ykybZ5+9vjUobwkcros5bdI7B8KoXI42CyzGSczGKbDY8AdbOy
iHVv9awJxqEQqgJj41dTtr1z6z/HvY/Ic6EqEtDMBYh1ls/WcoUjgb/tbdaNr+uOEJAAAA
wQCH46NmVA8CBvedgiVk+vsU9ilsVZ5KrSX2OVVO44wC5iP3gjt/TVODYzfHhCHJjGSXHL
pZD03APHBkIjbNXDTHUn86+ME25fQaySCSONx2MocqmRLSeJbGHcz5jMi+Ne+Lvq98emd5
e2VFWpeJqrFZd07B4eslCpSzaAwL48oJHhIc98xogM0oLVQUqaNzahja8h8jUANP5HXu/K
ciS7AsqcMskmOilOOc0Fl6VdPqDVgwZZmA9a5z4BLXprnUwB4AAADBANlAnENlRr5FruxC
Kaf8174Qz0Z5SIh2nD5J+QAmsHWgE4fP1SrHfYruOrdSxwdb0mtSpMCyfujlYoWZ//jxJM
kFj4Ge3+y2vitEIt60alPGGHkJUTnQyCbGoqOTaPPZsBFTHety14WmrMo5KIxvqazfdDz2
tUAW1SB30TS+0EbmJ8oTKInsSdXEnNgZkqkpWSpuDxICMF0VGMA0x4+0+dZe55045+c1MH
2CgMKDw79MobBL2uRAc3onA5/jvITG2QAAAMEAxf5syKF0kJXGdp1cv1pXJk3BwRf6gq6f
RNpWwVYDcLY/+aMIj9ER/Wbkm4Yx2v/1BeYzYCtrMviX79yWnZYcyB2ZUrS4UPoP6TOx0p
//MfHene1Ryq7ot+HUPokSR9+IvI+OH/UGbOFW1QKl6bUJ0bONeJontuinwH3CV+jCz06E
+/Bb6KtWV4p0OSSqpu2GikWSI3ptLocWq8PdpYcRrXwUm6TMX3q+CI65ANlKl6Hv5Dnpsg
TnV+qxt25bmsGHAAAAETIzODU1Njk5NzBAcXEuY29tAQ==
-----END OPENSSH PRIVATE KEY-----
EOF
cat > $JENKINS_HOME/.ssh/id_rsa.pub <<"EOF"
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCoBqKsbTj+PgRySalMuA5ILMfPrrBKJIlNoXiyo86LZOpkX/WSWtWA3z4smZ1wcG7OJtZpkTeU4MZTqAc2Hs6vlfHykozzSIxQrX6B5nCuofqpZsi/v6ikpauwZQJlF5a7vj16j8CY22ekmRIKlxXkbepn1Bpy/2p1USRa7AjgAc/FhtLk5E/TILQ1tQgAOujSOosn1cybWpCF2CYvjISm+t8vGL1ukLoW0jL09E+80MRP49S16F2KJMb7uuwCpPQTee8muJw0k2K0M0kdyz+nFDMhwaih/yU+2H3AGPMYonfRq/FytAYh20ujw5VqeNpziRXN8nX457ro4s+W8RZljeP+J04dYlwTFseweKZGZ54Wd5UQuBKrt+0YP155GlZ/guKZEPtvzcJKKf3FRzzyeICYDu+kJKKUCKNJS5RFiXTETjfzx59MUyHPaBJ6eO0Vxr2ufMb9dPwr0Ed6asKjfO99lrWit7RkvSjHgF0fOnjc3rTH+FbFMrItBUV4dW8= 2385569970@qq.com
EOF
cat $JENKINS_HOME/.ssh/id_rsa.pub > $JENKINS_HOME/.ssh/authorized_keys
touch $JENKINS_HOME/.ssh/known_hosts
chmod 700 $JENKINS_HOME/.ssh
chmod 600 $JENKINS_HOME/.ssh/known_hosts
chmod 600 $JENKINS_HOME/.ssh/id_rsa
chmod 644 $JENKINS_HOME/.ssh/id_rsa.pub
```

**Git主机密钥校验配置**

在 `系统管理` → `全局安全配置` → `Git Host Key Verification Configuration` 里设置 **Git Host Key Verification Strategy** 为 `Accept First Connection`（接受第一次连接）

![image-20250403152842353](./assets/image-20250403152842353.png)



### 邮箱配置

详情参考博客：[链接](https://blog.csdn.net/weixin_36250977/article/details/140650994)

#### 基础配置

**安装插件**

Email Extension

**获取E-Mail授权码**

获取邮箱的授权码，一般在设置里面可以找到

- [QQ邮箱配置方法](https://wx.mail.qq.com/list/readtemplate?name=app_intro.html#/agreement/authorizationCode)



#### 创建凭证

创建凭证，使用 `Username with password` 类型，用户名填写邮箱号，密码填写授权码。

![image-20250407170237739](./assets/image-20250407170237739.png)



#### Jenkins配置

在 `系统管理` → `系统配置` → `Extended E-mail Notification`，配置邮箱

```
SMTP server: smtp.qq.com
SMTP Port: 465
高级-Credentials: 邮箱凭证
高级-Use SSL: 勾选
```

![image-20250407171609566](./assets/image-20250407171609566.png)

#### 发送消息

```groovy
pipeline {
    agent any
    stages {
        stage("msg"){
            steps {
                echo "发送消息测试"
            }
        }
    }
    post {
        // 无论构建结果如何都会执行（失败、成功、中断等）
        always {
            emailext(
                to: '2385569970@qq.com',
                subject: "[Jenkins构建通知] ${JOB_NAME} #${BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
🔔 Jenkins 构建通知

🧱 项目：${env.JOB_NAME}
🏗️ 构建编号：#${env.BUILD_NUMBER}
🌿 分支：${env.GIT_BRANCH}
💬 状态：${currentBuild.currentResult}
🕒 耗时：${currentBuild.durationString}
🔗 链接：${env.BUILD_URL}
""",
                attachLog: true
            )
        }
        // 仅当构建成功时执行
        success {
            echo 'This runs if build succeeds'
        }
        // 构建失败时执行
        failure {
            echo 'This runs if build fails'
        }
        // 构建结果为不稳定（如测试失败）时执行
        unstable {
            echo 'This runs if build is unstable'
        }
        // 构建被手动中止或由于某些原因中止时执行
        aborted {
            echo 'This runs if build was aborted'
        }
        // 构建结果与上次不同（成功变失败，或失败变成功）时执行
        changed {
            echo 'This runs if build status changed from last time'
        }

    }
    
}
```



### 其他通知配置

#### 钉钉

- [官方文档](https://jenkinsci.github.io/dingtalk-plugin/guide/getting-started.html)

**安装插件**

安装插件：`DingTalk`

**配置钉钉**

找到 `钉钉`，配置日志和新增机器人

![image-20250408083747532](./assets/image-20250408083747532.png)



![image-20250408084309382](./assets/image-20250408084309382.png)

![image-20250408084321241](./assets/image-20250408084321241.png)

**流水线脚本使用**

```groovy
pipeline {
    agent any
    stages {
        stage("msg"){
            steps {
                echo "发送消息测试"
            }
        }
    }
    post {
        always {
            dingtalk (
                robot: "ateng_dingtalk",
                type: "MARKDOWN",
                title: "Jenkins 构建通知",
                text: [
                    "# 🔔 Jenkins 构建通知",
                    "- 🧱 项目：${env.JOB_NAME}",
                    "- 🏗️ 构建编号：#${env.BUILD_NUMBER}",
                    "- 🌿 分支：${env.GIT_BRANCH}",
                    "- 💬 状态：${currentBuild.currentResult}",
                    "- 🕒 耗时：${currentBuild.durationString}",
                    "- 🔗 链接：${env.BUILD_URL}"
                ],
                at: [
                  "17623062936"
                ],
                atAll: false,
            )
        }
        // 仅当构建成功时执行
        success {
            echo 'This runs if build succeeds'
        }
        // 构建失败时执行
        failure {
            echo 'This runs if build fails'
        }
        // 构建结果为不稳定（如测试失败）时执行
        unstable {
            echo 'This runs if build is unstable'
        }
        // 构建被手动中止或由于某些原因中止时执行
        aborted {
            echo 'This runs if build was aborted'
        }
        // 构建结果与上次不同（成功变失败，或失败变成功）时执行
        changed {
            echo 'This runs if build status changed from last time'
        }
        
    }
}
```

#### 企业微信

```groovy
pipeline {
    agent any
    stages {
        stage("msg"){
            steps {
                echo "发送消息测试"
            }
        }
    }
    post {
        always {
            script {
                def content = """# 🔔 Jenkins 构建通知
    - 🧱 项目：${env.JOB_NAME}
    - 🏗️ 构建编号：#${env.BUILD_NUMBER}
    - 🌿 分支：${env.GIT_BRANCH}
    - 💬 状态：${currentBuild.currentResult}
    - 🕒 耗时：${currentBuild.durationString}
    - 🔗 链接：${env.BUILD_URL}
    """
    
                // 转义换行符，变成 JSON 支持的格式
                def escapedContent = content.replace("\\", "\\\\")
                                            .replace("\"", "\\\"")
                                            .replace("\n", "\\n")
    
                def json = """
                {
                    "msgtype": "markdown",
                    "markdown": {
                        "content": "${escapedContent}",
                        "mentioned_list": ["@all"],
                        "mentioned_mobile_list": ["@all"]
                    }
                }
                """
    
                // 单引号 shell 安全处理
                def safeJson = json.replace("'", "'\"'\"'")
    
                sh """
                    curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=693axxx6-7aoc-4bc4-97a0-0ec2sifa5aaa' \
                    -H 'Content-Type: application/json' \
                    -d '${safeJson}'
                """
            }
        }


        // 仅当构建成功时执行
        success {
            echo 'This runs if build succeeds'
        }
        // 构建失败时执行
        failure {
            echo 'This runs if build fails'
        }
        // 构建结果为不稳定（如测试失败）时执行
        unstable {
            echo 'This runs if build is unstable'
        }
        // 构建被手动中止或由于某些原因中止时执行
        aborted {
            echo 'This runs if build was aborted'
        }
        // 构建结果与上次不同（成功变失败，或失败变成功）时执行
        changed {
            echo 'This runs if build status changed from last time'
        }
        
    }
}
```



## SSH Server

需要安装插件，见 `基础配置的安装插件` 章节的 `SSH 插件`

### 添加SSH服务器

**进入配置**

点击 `系统管理` → `系统配置` → `SSH Servers` ，找到 SSH Servers，新增SSH服务器

**基础配置**

![image-20250401112223254](./assets/image-20250401112223254.png)

**高级配置**

在高级配置中使用密码或者秘钥、设置SSH端口

![image-20250401112309418](./assets/image-20250401112309418.png)

**测试连接**

配置完毕后点击测试结果为Success即连接成功

![image-20250401112405429](./assets/image-20250401112405429.png)

**保存配置**

最后点击 `Save` 保存配置



### SSH服务器配置

**查看秘钥**

```
cat .ssh/id_rsa
```

**创建目录**

```
mkdir -p /data/service/work/jenkins
```



### 创建任务

**新建任务**

任务名称不能中文

![image-20250401112815681](./assets/image-20250401112815681.png)

**配置构建步骤**

选择 Send files or execute commands over SSH

![image-20250401114106596](./assets/image-20250401114106596.png)

选择SSH服务器和开启详细日志

![image-20250401114223304](./assets/image-20250401114223304.png)

在 **"Exec Command"** 中填入要执行的 Linux 命令，如

```bash
echo "Hello from Jenkins"
whoami
uname -a
env
```

![image-20250401114257417](./assets/image-20250401114257417.png)

最后保存

### 构建任务

点击 `立即构建` 开始运行任务

![image-20250401114417065](./assets/image-20250401114417065.png)

任务运行完后查看控制台输出

![image-20250401114522911](./assets/image-20250401114522911.png)



### 上传文件到服务器执行命令

在 `Build Steps` 构建阶段，增加构建步骤 `执行 shell`，构建生成文件

```
echo jenkins-${JOB_NAME}-${BUILD_ID} > my_file_${BUILD_NUMBER}.txt
```

![image-20250403211322876](./assets/image-20250403211322876.png)

在 `Build Steps` 构建阶段，增加构建步骤 `Send files or execute commands over SSH`，将构建生成的文件上传到服务器并执行相关命令或者脚本

Source files：jenkins当前工作目录下的问题

Remote directory: 远程服务器的目录（会自动创建），是基于**SSH Server的Remote Directory**的相对路径

Exec command：远程服务器执行的命令，这里的环境变量可以使用Jenkins中的

```
mkdir -p /data/ateng/file
if [ -f /data/ateng/file/my_file.txt ]
then
  cp /data/ateng/file/my_file.txt /data/ateng/file//my_file_$(date "+%Y%m%d_%H%M%S").txt 
fi
\cp /data/service/work/jenkins/target/file/my_file_${BUILD_NUMBER}.txt /data/ateng/file/my_file.txt
```

高级：在高级选择里面还有许多选项，根据需要配置即可

![image-20250403213523880](./assets/image-20250403213523880.png)

构建任务后到远程服务器查看文件

```
[root@k8s-worker01 ~]# cd /data/ateng/file/
[root@k8s-worker01 file]# ll
total 8
-rw-r--r-- 1 root root 26 Jun  3 07:35 my_file_20260603_073524.txt
-rw-r--r-- 1 root root 27 Jun  3 07:35 my_file.txt
[root@k8s-worker01 file]# cat my_file.txt
jenkins-exec_ssh_server-10
```



### 上传文件到服务器执行脚本

在 `Build Steps` 构建阶段，增加构建步骤 `执行 shell`，构建生成文件

```
echo jenkins-${JOB_NAME}-${BUILD_ID} > my_file_${BUILD_NUMBER}.txt
```

![image-20250403211322876](./assets/image-20250403211322876.png)

在 `Build Steps` 构建阶段，增加构建步骤 `Send files or execute commands over SSH`，将构建生成的文件上传到服务器并执行相关命令或者脚本

Source files：jenkins当前工作目录下的问题

Remote directory: 远程服务器的目录（会自动创建），是基于**SSH Server的Remote Directory**的相对路径

Exec command：远程服务器执行的脚本，如果需要将Jenkins的环境变量传递到远程服务器的脚本中，需要先重新export

```
export BUILD_NUMBER=$BUILD_NUMBER
/data/ateng/file/run.sh
```

高级：在高级选择里面还有许多选项，根据需要配置即可

![image-20250403222809376](./assets/image-20250403222809376.png)

远端服务器的脚本

```
cat > /data/ateng/file/run.sh <<"EOF"
#!/bin/bash

mkdir -p /data/ateng/file
if [ -f /data/ateng/file/my_file.txt ]
then
  cp /data/ateng/file/my_file.txt /data/ateng/file//my_file_$(date "+%Y%m%d_%H%M%S").txt
fi
\cp /data/service/work/jenkins/target/file/my_file_${BUILD_NUMBER}.txt /data/ateng/file/my_file.txt
EOF
chmod +x /data/ateng/file/run.sh
```

构建任务后到远程服务器查看文件

```
[root@k8s-worker01 file]# cd /data/ateng/file/
[root@k8s-worker01 file]# ll
total 24
-rw-r--r-- 1 root root  26 Jun  3 07:35 my_file_20260603_073524.txt
-rw-r--r-- 1 root root  27 Jun  3 07:39 my_file_20260603_073941.txt
-rw-r--r-- 1 root root  27 Jun  3 07:42 my_file_20260603_074238.txt
-rw-r--r-- 1 root root  27 Jun  3 07:46 my_file_20260603_074636.txt
-rw-r--r-- 1 root root  27 Jun  3 07:46 my_file.txt
-rwxr-xr-x 1 root root 275 Jun  3 07:39 run.sh
[root@k8s-worker01 file]# cat my_file.txt
jenkins-exec_ssh_server-12
```



## 流水线-SSH

需要安装插件，见 `基础配置的安装插件` 章节的 `流水线 插件`

### 创建任务

**新建任务**

任务名称不能中文

![image-20250403224258615](./assets/image-20250403224258615.png)



### 创建流水线脚本

在 `流水线` 中的 `Pipeline script` 编写脚本

```
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'echo jenkins-${JOB_NAME}-${BUILD_ID} > my_file_${BUILD_NUMBER}.txt'
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'server_192.168.1.10_42231', // 配置的 SSH 服务器名称
                            transfers: [
                                sshTransfer(
                                    sourceFiles: 'my_file_${BUILD_NUMBER}.txt', // 需要上传的文件
                                    removePrefix: '', // 去掉本地的 ${removePrefix} 目录
                                    remoteDirectory: 'target/file', // 远程目录
                                    // 上传完成后执行命令
                                    execCommand: '''
                                    export BUILD_NUMBER=$BUILD_NUMBER
                                    /data/ateng/file/run.sh
                                    '''
                                )
                            ],
                            usePromotionTimestamp: false, // 是否使用 Promotion（推广/发布）阶段的时间戳 来命名或处理文件
                            useWorkspaceInPromotion: false, // 是否在 Promotion 过程中使用工作空间 (workspace) 作为上传文件的来源
                            verbose: true // 启用详细日志
                        )
                    ]
                )
            }
        }
    }
}
```



## 流水线-工具类

需要安装插件，见 `基础配置的安装插件` 章节的 `流水线 插件`

### 创建任务

**新建任务**

任务名称不能中文



![image-20250403154811435](./assets/image-20250403154811435.png)



### 创建流水线脚本

在 `流水线` 中的 `Pipeline script` 编写脚本

关键参数说明：

- tools jdk：指定JDK工具名称，与全局工具配置中的JDK名称匹配
- tools maven：指定Maven工具名称，与全局工具配置中的Maven名称匹配
- tools nodejs：指定NodeJS工具名称，与全局工具配置中的NodeJS名称匹配

```
pipeline {
    agent any
    tools {
        jdk 'JDK-21'
        maven 'Maven-3.9.9'
        nodejs 'NodeJS-v22.14.0'
    }
    stages {
        stage('jdk') {
            steps {
                sh 'java -version'
            }
        }
        stage('maven') {
            steps {
                sh 'mvn -version'
            }
        }
        stage('nodejs') {
            steps {
                sh 'node -v'
            }
        }
        stage('env') {
            steps {
                sh 'env'
            }
        }
    }
}
```



### 构建任务

运行流水线后查看 `控制台输出` ，观察 `env` 阶段的输出，其中 `PATH` 环境变量可以看到把其他工具的路径加入进来了

```
Started by user admin
[Pipeline] Start of Pipeline
[Pipeline] node
Running on Jenkins in /bitnami/jenkins/home/workspace/jenkinsfile-demo
[Pipeline] {
[Pipeline] stage
[Pipeline] { (Declarative: Tool Install)
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] }
[Pipeline] // stage
[Pipeline] withEnv
[Pipeline] {
[Pipeline] stage
[Pipeline] { (jdk)
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] withEnv
[Pipeline] {
[Pipeline] sh
+ java -version
openjdk version "21.0.5" 2024-10-15 LTS
OpenJDK Runtime Environment Temurin-21.0.5+11 (build 21.0.5+11-LTS)
OpenJDK 64-Bit Server VM Temurin-21.0.5+11 (build 21.0.5+11-LTS, mixed mode, sharing)
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] }
[Pipeline] // stage
[Pipeline] stage
[Pipeline] { (maven)
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] withEnv
[Pipeline] {
[Pipeline] sh
+ mvn -version
Apache Maven 3.9.9 (8e8579a9e76f7d015ee5ec7bfcdc97d260186937)
Maven home: /bitnami/jenkins/home/tools/apache-maven-3.9.9
Java version: 21.0.5, vendor: Eclipse Adoptium, runtime: /bitnami/jenkins/home/tools/jdk21
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "6.3.2-1.el7.elrepo.x86_64", arch: "amd64", family: "unix"
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] }
[Pipeline] // stage
[Pipeline] stage
[Pipeline] { (nodejs)
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] withEnv
[Pipeline] {
[Pipeline] sh
+ node -v
v22.14.0
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] }
[Pipeline] // stage
[Pipeline] stage
[Pipeline] { (env)
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] tool
[Pipeline] envVarsForTool
[Pipeline] withEnv
[Pipeline] {
[Pipeline] sh
+ env
BITNAMI_VOLUME_DIR=/bitnami
JENKINS_HOME=/bitnami/jenkins/home
JENKINS_LOG_FILE=/opt/bitnami/jenkins/logs/jenkins.log
NSS_WRAPPER_PASSWD=/tmp/tmp.aRxLNErllA
JENKINS_KEYSTORE_PASSWORD=bitnami
CI=true
RUN_CHANGES_DISPLAY_URL=http://192.168.1.12:20022/job/jenkinsfile-demo/2/display/redirect?page=changes
HOSTNAME=5ff95cfe5013
SHLVL=0
NODE_LABELS=built-in
HUDSON_URL=http://192.168.1.12:20022/
JENKINS_TEMPLATES_DIR=/opt/bitnami/scripts/jenkins/bitnami-templates
HOME=/bitnami/jenkins/home
JENKINS_DAEMON_GROUP=jenkins
JENKINS_DAEMON_USER=jenkins
BUILD_URL=http://192.168.1.12:20022/job/jenkinsfile-demo/2/
BITNAMI_ROOT_DIR=/opt/bitnami
JENKINS_DEFAULT_HTTP_PORT_NUMBER=8080
HUDSON_COOKIE=91837722-0648-4412-aba3-614db2acdab6
JENKINS_SERVER_COOKIE=durable-8e413aac860a4b0562da0a21d1ea7bbba1fa57295713ccda4c93e8e0734ffe77
MODULE=jenkins
MAVEN_HOME=/bitnami/jenkins/home/tools/apache-maven-3.9.9
NSS_WRAPPER_GROUP=/tmp/tmp.EiW1aD4wjh
JENKINS_DEFAULT_HTTP_LISTEN_ADDRESS=0.0.0.0
WORKSPACE=/bitnami/jenkins/home/workspace/jenkinsfile-demo
OS_ARCH=amd64
JENKINS_DEFAULT_HTTPS_PORT_NUMBER=8443
JENKINS_SKIP_IMAGE_PLUGINS=false
BITNAMI_APP_NAME=jenkins
NODE_NAME=built-in
OS_NAME=linux
JENKINS_OVERRIDE_PLUGINS=false
JENKINS_CERTS_DIR=/bitnami/jenkins/home
RUN_ARTIFACTS_DISPLAY_URL=http://192.168.1.12:20022/job/jenkinsfile-demo/2/display/redirect?page=artifacts
STAGE_NAME=env
EXECUTOR_NUMBER=1
JENKINS_DEFAULT_HTTPS_LISTEN_ADDRESS=0.0.0.0
JENKINS_PASSWORD=Admin@123
JENKINS_LOGS_DIR=/opt/bitnami/jenkins/logs
RUN_TESTS_DISPLAY_URL=http://192.168.1.12:20022/job/jenkinsfile-demo/2/display/redirect?page=tests
BUILD_DISPLAY_NAME=#2
HUDSON_HOME=/bitnami/jenkins/home
JENKINS_SWARM_USERNAME=swarm
JOB_BASE_NAME=jenkinsfile-demo
PATH=/bitnami/jenkins/home/tools/jdk21/bin:/bitnami/jenkins/home/tools/apache-maven-3.9.9/bin:/bitnami/jenkins/home/tools/node-v22.14.0-linux-x64/bin:/bitnami/jenkins/home/tools/jdk21/bin:/bitnami/jenkins/home/tools/apache-maven-3.9.9/bin:/bitnami/jenkins/home/tools/node-v22.14.0-linux-x64/bin:/opt/bitnami/common/bin:/opt/bitnami/java/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
LNAME=jenkins
BUILD_ID=2
JENKINS_FORCE_HTTPS=no
JAVA_OPTS=-server -Xms1g -Xmx2g
BUILD_TAG=jenkins-jenkinsfile-demo-2
NODE_HOME=/bitnami/jenkins/home/tools/node-v22.14.0-linux-x64
NODEJS_HOME=/bitnami/jenkins/home/tools/node-v22.14.0-linux-x64
JENKINS_EXTERNAL_HTTP_PORT_NUMBER=80
JENKINS_URL=http://192.168.1.12:20022/
JENKINS_EMAIL=2385569970@qq.com
LD_PRELOAD=/opt/bitnami/common/lib/libnss_wrapper.so
JOB_URL=http://192.168.1.12:20022/job/jenkinsfile-demo/
JENKINS_PLUGINS_LATEST=true
JENKINS_VOLUME_DIR=/bitnami/jenkins
JENKINS_MOUNTED_CONTENT_DIR=/usr/share/jenkins/ref
BUILD_NUMBER=2
JENKINS_NODE_COOKIE=5a7c8cec-609e-4a30-b459-d936f1bf9d94
RUN_DISPLAY_URL=http://192.168.1.12:20022/job/jenkinsfile-demo/2/display/redirect
JENKINS_TMP_DIR=/opt/bitnami/jenkins/tmp
JENKINS_EXTERNAL_HTTPS_PORT_NUMBER=443
Author=Ateng
HUDSON_SERVER_COOKIE=bd2d4d9931889436
JOB_DISPLAY_URL=http://192.168.1.12:20022/job/jenkinsfile-demo/display/redirect
JENKINS_ENABLE_SWARM=no
JENKINS_PLUGINS_LATEST_SPECIFIED=false
JENKINS_SKIP_BOOTSTRAP=no
JENKINS_BASE_DIR=/opt/bitnami/jenkins
JOB_NAME=jenkinsfile-demo
PWD=/bitnami/jenkins/home/workspace/jenkinsfile-demo
JAVA_HOME=/bitnami/jenkins/home/tools/jdk21
JENKINS_PID_FILE=/opt/bitnami/jenkins/tmp/jenkins.pid
M2_HOME=/bitnami/jenkins/home/tools/apache-maven-3.9.9
JENKINS_DEFAULT_JNLP_PORT_NUMBER=50000
TZ=Asia/Shanghai
OS_FLAVOUR=debian-12
WORKSPACE_TMP=/bitnami/jenkins/home/workspace/jenkinsfile-demo@tmp
BITNAMI_DEBUG=false
JENKINS_USERNAME=admin
APP_VERSION=2.492.2
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] }
[Pipeline] // stage
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] }
[Pipeline] // node
[Pipeline] End of Pipeline
Finished: SUCCESS
```



## 流水线-Docker

需要安装插件，见 `基础配置的安装插件` 章节的 `流水线 插件` 和 `Docker 插件`

如果Jenkins是容器部署的，那么访问docker的使用有以下两种方式：

- 重启Jenkins容器，并将宿主机的 `/var/run/docker.sock` 挂载到容器内部
- 开启 Docker 远程 API，然后使用 `export DOCKER_HOST=tcp://10.244.172.126:2375` 环境变量的方式使用docker客户端命令访问



### Jenkins添加Docker

#### 创建Docker Cloud-Socket

在 `Clouds` 配置里面选择 创建 Docker 云，这里名称为local_docker

![image-20250408221609600](./assets/image-20250408221609600.png)

配置以下参数

- Name：local_docker

- Docker Host URI: unix:///var/run/docker.sock
- Enabled: 勾选
- Expose DOCKER_HOST: 勾选

![image-20250408221730167](./assets/image-20250408221730167.png)

#### 创建Docker Cloud-API

在 `Clouds` 配置里面选择 创建 Docker 云，这里名称为remote_docker

![image-20250408221959427](./assets/image-20250408221959427.png)

配置以下参数

- Name：remote_docker

- Docker Host URI: tcp://10.244.172.126:2375
- Enabled: 勾选
- Expose DOCKER_HOST: 勾选

![image-20250408222226343](./assets/image-20250408222226343.png)



### 添加Docker Agent templates

注意添加Docker Agent templates是需要保证容器内部有java命令并且能正常执行。

一般不建议使用这种方式，局限性太多了。

#### Maven

**Labels和镜像配置**

Labels: remote-docker-agent-maven, 后续在流水线脚本中使用agent.label匹配这个agent

Name：Agent templates名称，没啥用，保持和Labels一致即可

Docker Image：需要使用的容器镜像名称，这里是maven:3.9.9-eclipse-temurin-21

![image-20250409084046275](./assets/image-20250409084046275.png)

**Container settings配置**

设置挂载卷

```
type=bind,source=/var/jenkins,target=/workspace
type=bind,source=/var/jenkins/downloads/maven,target=/data/download/maven
type=bind,source=/var/jenkins/downloads/maven/settings.xml,target=/usr/share/maven/conf/settings.xml,readonly
type=bind,source=/etc/localtime,target=/etc/localtime,readonly
```

挂载卷使用docker bind，相关文件或目录必须存在

![image-20250409085056818](./assets/image-20250409085056818.png)

在对应的远程docker节点创建相关目录和文件

```
sudo mkdir -p /var/jenkins /var/jenkins/downloads/maven
sudo tee /var/jenkins/downloads/maven/settings.xml <<EOF
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository>/data/download/maven/repository</localRepository>
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
</settings>
EOF
```

设置环境变量

```
TZ=Asia/Shanghai
Author=Ateng
```

![image-20250409085131738](./assets/image-20250409085131738.png)

**设置用法**

选择：Only build jobs with label expressions matching this node（仅使用与此节点匹配的标签表达式构建作业）

![image-20250409084233657](./assets/image-20250409084233657.png)



### 创建任务

**新建任务**

任务名称不能中文

![image-20250403230533507](./assets/image-20250403230533507.png)



### 创建流水线脚本

在 `流水线` 中的 `Pipeline script` 编写脚本

```groovy
pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "nginx:latest"
        DOCKER_REGISTRY = "registry.lingo.local/ateng"
        DOCKER_CREDENTIALS_ID = "harbor_admin"
    }
    stages {
        stage('Start') {
            steps {
                echo "任务开始"
                sh 'env'
            }
        }
        stage('Build with Maven') {
            agent {
                // 使用 Maven 容器
                docker {
                    image 'maven:3.9.9-eclipse-temurin-21'
                    args '-v /usr/local/software/maven/conf/settings.xml:/settings.xml:ro -v /data/service/jenkins/downloads:/data/download/maven/repository'
                }
            }
            steps {
                sh 'mvn --version'
                sh 'mvn help:system --settings /settings.xml'
            }
        }
        stage('Build with JDK') {
            agent { 
                docker { image 'eclipse-temurin:21' }  // 使用 JDK 容器
            }
            steps {
                sh 'java --version'
            }
        }
        stage('推送镜像到仓库-方式一') {
             // 一般情况下使用这种方式
            steps {
                sh 'docker pull $DOCKER_IMAGE'
                sh 'docker tag $DOCKER_IMAGE $DOCKER_REGISTRY/$DOCKER_IMAGE'
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE'
                }
            }
        }
        
        stage('推送镜像到仓库-方式二') {
            // 适用于docker命令不在PATH中，/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
            // 相当于是容器部署Jenkins，配置的全局工具Docker需要用到该方式，如果用方式一会存在docker命令找不到
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: "$DOCKER_CREDENTIALS_ID",
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh '''
                            echo "$DOCKER_PASS" | docker login $DOCKER_REGISTRY -u "$DOCKER_USER" --password-stdin
                            docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG
                        '''
                    }
                }
            }
        }
        
    }
}
```

镜像仓库的凭证

![image-20250403232744156](./assets/image-20250403232744156.png)

注意Maven镜像最好配置国内镜像仓库，也就是指定配置文件，配置文件也设置了本地仓库路径，对应修改即可。



## 流水线-Kubernetes

需要安装插件，见 `基础配置的安装插件` 章节的 `流水线 插件` 和 `Kubernetes 插件`



### K8S创建账户

参考文档：[链接](/work/kubernetes/OPS?id=创建普通用户并导出kubeconfig) ，得到kubeconfig，如下所示

![image-20250404230801161](./assets/image-20250404230801161.png)



### Jenkins添加K8S

方式一：手动配置秘钥和token

#### 创建token秘钥

在 `系统管理` → `凭证管理` 中 添加凭证，用于K8S的Token认证

进入凭证管理中创建类型为 `Secret text` 的token 秘钥，这里名称为 local_k8s_ns_kongyu_token。其中Secret为kubeconfig中的token选项。

![image-20250404230445106](./assets/image-20250404230445106.png)

#### 添加K8S

在 `Clouds` 配置里面选择 创建 Kubernetes 云，这里名称为local_k8s_ns_kongyu

![image-20250404231022049](./assets/image-20250404231022049.png)

填写以下关键信息：

- 名称：在Jenkins中的名称
- Kubernetes 地址：kubeconfig文件中的clusters[0].cluster.server
- Kubernetes 服务证书 key：kubeconfig文件中的clusters[0].cluster.certificate-authority-data
- Kubernetes 命名空间：k8s账户所分配的命名空间
- 凭据：选择上一个步骤创建的token秘钥
- WebSocket：勾选 `WebSocket`，Agent使用WebSocket的方式连接到Jenkins

![image-20250404231411962](./assets/image-20250404231411962.png)

![image-20250410161713526](./assets/image-20250410161713526.png)

#### 测试连接

配置正确的参数后点击 `连接测试`

![image-20250404231617312](./assets/image-20250404231617312.png)



### Jenkins添加K8S-kubeconfig

方式二：配置kubeconfig文件直接连接

#### 创建Secret file

在 `系统管理` → `凭证管理` 中 添加凭证，用于K8S的认证

进入凭证管理中创建类型为 `Secret file` 的token 秘钥，这里名称为 kubeconfig_local_k8s_ns_kongyu。其中File为kubeconfig文件。

![image-20250407105252379](./assets/image-20250407105252379.png)

#### 添加K8S

在 `Clouds` 配置里面选择 创建 Kubernetes 云，这里名称为local_k8s_ns_kongyu

![image-20250404231022049](./assets/image-20250404231022049.png)

填写以下关键信息：

- 名称：在Jenkins中的名称
- 凭据：选择创建的 `Secret file`
- WebSocket：勾选 `WebSocket`，Agent使用WebSocket的方式连接到Jenkins

![image-20250407105628257](./assets/image-20250407105628257.png)

![image-20250410161713526](./assets/image-20250410161713526.png)



#### 测试连接

配置正确的参数后点击 `连接测试`

![image-20250407105658240](./assets/image-20250407105658240.png)



### 添加Pod templates

添加命名为 `jenkins-agent-all` 的 Pod templates

填写以下参数：

- 名称：Pod templates的名称
- 命名空间：最终运行在k8s中的命名空间。如果k8s生成的时候设置了命名空间可以不用填写
- 标签列表：用于后续流水线脚本（Jenkinsfile）的agent.kubernetes的label配置，匹配Pod templates
- Raw YAML for the Pod：填写初始的yaml
- 工作空间卷：选择 `Host Path Workspace Volume` ，或者 `Generic Ephemeral Volume` 、`NFS Workspace Volume`。

基础配置

![image-20250406153900696](./assets/image-20250406153900696.png)



Raw YAML for the Pod，相当于这是个初始的yaml模版，其他的设置会覆盖这个yaml。

亲和性，使其尽量调度在集群节点有标签 `node-role.kubernetes.io/worker=ci` 上。

挂载hostPath（相关依赖建议挂载到NFS中，可以共享依赖，不然Agent调度到其他节点就会重新下载）

- Maven容器：设置路径挂载到 `/root/.m2` 中，持久化依赖的下载。启动工具类容器的挂载类似。
- Docker容器：将Docker的socket `/var/run/docker.sock` 挂载到容器内部，使内部可以使用docker命令build和push等。如果是其他容器运行时可以挂载相应的socket和相关命令。

在实际情况下，最好每一个容器设置一个pod templates，最小化管理。我这里全部弄在一起时方便演示

注意使用Bitnami镜像需要注意使用root用户运行容器，不然导致没有权限Jenkins Agent无法工作。

```yaml
apiVersion: "v1"
kind: "Pod"
metadata:
  name: "auto-generate"
spec:
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - preference:
            matchExpressions:
              - key: "node-role.kubernetes.io/worker"
                operator: "In"
                values:
                  - "ci"
          weight: 1
  containers:
    - name: "jdk"
      image: "eclipse-temurin:21"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}
      
    - name: "maven"
      image: "maven:3.9.9-eclipse-temurin-21"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      volumeMounts:
        - mountPath: "/root/.m2"
          name: "maven"
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}

    - name: "node"
      image: "node:22.14.0"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      volumeMounts:
        - mountPath: "/root/.npm"
          name: "npm"
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}
      
    - name: "golang"
      image: "golang:1.24"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      volumeMounts:
        - mountPath: "/root/.cache/go-build"
          name: "golang"
        - mountPath: "/go/pkg/mod"
          name: "golang"
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}

    - name: "docker"
      image: "docker:27.3.1"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      volumeMounts:
        - mountPath: "/var/run/docker.sock"
          name: "volume-0"
          readOnly: true
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}

    - name: "kubectl"
      image: "bitnami/kubectl:1.32.3"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      tty: true
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}
      securityContext:
        runAsUser: 0
        runAsGroup: 0
        privileged: false

    - name: "helm"
      image: "alpine/helm:3.17.2"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      tty: true
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}

    - name: "jnlp"
      image: "jenkins/inbound-agent:3301.v4363ddcca_4e7-3-jdk21"
      imagePullPolicy: "IfNotPresent"
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}

  volumes:
    - hostPath:
        path: "/var/run/docker.sock"
      name: "volume-0"
    - hostPath:
        path: "/etc/localtime"
      name: "volume-1"
    - hostPath:
        path: "/var/jenkins/downloads/maven"
      name: "maven"
    - hostPath:
        path: "/var/jenkins/downloads/npm"
      name: "npm"
    - hostPath:
        path: "/var/jenkins/downloads/golang"
      name: "golang"
```

工作空间卷，需要保证这个路径是权限是RWX=777。

![image-20250406154027341](./assets/image-20250406154027341.png)



### JNLP代理配置

**🔧 什么是 JNLP（在 Jenkins 中）？**

在 Jenkins 的上下文中，**JNLP 主要用于启动和连接“agent”（从节点）到 Jenkins master（主节点）**。JNLP 是一种 Java 网络启动协议，原始设计是为了通过网络启动 Java 应用。但在 Jenkins 中，它被用于一种特定方式：通过 JNLP 启动 agent 的 Java 程序，以便与 Jenkins master 通信。

开启 `TCP port for inbound agents` 

![image-20250404192428536](./assets/image-20250404192428536.png)

新安装完的Jenkins Master节点上面的代理默认是禁用状态， 如果这里不开启代理，后面添加JNLP连接模式的固定节点时会报以下报错。

![image-20250404193044925](./assets/image-20250404193044925.png)

也可以固定端口号

![image-20250407110835562](./assets/image-20250407110835562.png)



### 使用流水线

#### 创建任务

**新建任务**

任务名称不能中文

![image-20250404163750997](./assets/image-20250404163750997.png)



#### 创建流水线脚本

在 `流水线` 中的 `Pipeline script` 编写脚本

```
pipeline {
    agent {
        kubernetes {
            label 'jdk maven node golang docker kubectl'  // Pod templates中设置的标签列表的标签
        }
    }
    stages {
        stage('env') {
            steps {
                container('jdk') {
                    script {
                        sh 'env'
                        sh 'ls -l'
                    }
                }
            }
        }
        stage('jdk') {
            steps {
                container('jdk') {
                    script {
                        sh 'java -version'
                    }
                }
            }
        }
       stage('git') {
            steps {
                // maven、node、golang 这些基础容器中包含有git命令
                container('maven') {
                    script {
                        sh 'git -v'
                        echo "Cloning GitLab repository..."
                        checkout([$class: 'GitSCM',
                            branches: [[name: "*/master"]],
                            userRemoteConfigs: [[
                                url: "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git",
                                credentialsId: "gitlab_ssh"
                            ]]
                        ])
                        sh 'ls -l '
                    }
                }
            }
        }
        stage('maven') {
            steps {
                container('maven') {
                    script {
                        sh 'mvn -version'
                        sh 'mvn help:system'
                    }
                }
            }
        }
        stage('node') {
            steps {
                container('node') {
                    script {
                        sh 'npm -v'
                        sh 'npm install vue --prefix ~/.npm/my-project'
                    }
                }
            }
        }
        stage('golang') {
            steps {
                container('golang') {
                    script {
                        sh 'go version'
                    }
                }
            }
        }
        stage('docker') {
            steps {
                container('docker') {
                    script {
                        sh 'whoami'  // 注意 Docker Socket 的 权限
                        sh 'docker info'
                        sh 'docker pull nginx:latest'
                        sh 'docker tag nginx:latest registry.lingo.local/ateng/nginx:$BUILD_NUMBER'
                        withDockerRegistry([credentialsId: "harbor_admin", url: "http://registry.lingo.local/ateng"]) {
                            sh 'docker push registry.lingo.local/ateng/nginx:$BUILD_NUMBER'
                        }
                    }
                }
            }
        }
        stage('kubectl') {
            steps {
                container('kubectl') {
                    withCredentials([file(credentialsId: 'kubeconfig_local_k8s_ns_kongyu', variable: 'KUBECONFIG')]) {
                        sh 'kubectl version'
                        sh 'kubectl get pod'
                    }
                }
            }
        }
        stage('helm') {
            steps {
                container('helm') {
                    withCredentials([file(credentialsId: 'kubeconfig_local_k8s_ns_kongyu', variable: 'KUBECONFIG')]) {
                        sh 'helm version'
                        sh 'helm ls'
                    }
                }
            }
        }
    }
}
```

**注意事项：**

Git: git阶段拉取代码，需要创建Git仓库的凭证，具体参考 `Git` 章节

Maven：本地仓库的路径已经在pod template中配置了默认路径 `/root/.m2`，就不需要在额外设置

Node：依赖下载需要指定到 `/root/.npm` 目录下，并且区分项目，例如：`~/.npm/my-project`

Docker：push镜像需要设置仓库的凭证，凭证设置为`Username with password`的格式

Kuberctl/Helm：使用kubectl/helm需要设置`KUBECONFIG`环境变量指定配置文件，在凭证中创建 `Secret file` ，将kubeconfig文件上传

关于当前路径问题：jenkins在执行sh时，会将当起项目的命令设置为PWD，也就是 `$WORKSPACE` 会被设置为当起目录的路径，所有操作产生的文件都在这个路径下



## Git

需要安装插件，见 `基础配置的安装插件` 章节的 `Git 插件`

### Git 配置

#### Git主机密钥校验配置

在 `系统管理` → `全局安全配置` → `Git Host Key Verification Configuration` 里设置 **Git Host Key Verification Strategy** 为 `Accept First Connection`（接受第一次连接）

![image-20250403152842353](./assets/image-20250403152842353.png)

#### 添加凭证（账号密码）

在 `系统管理` → `凭证管理` 中 添加凭证，用于Git的HTTP认证

![image-20250403161520901](./assets/image-20250403161520901.png)

其中 `ID` 是后续使用 `credentialsId` 引用该凭证的字符

![image-20250403161706154](./assets/image-20250403161706154.png)



#### 添加凭证（秘钥）

参考 `基础配置/SSH秘钥配置` 生成秘钥

在 `系统管理` → `凭证管理` 中 添加凭证，用于Git的SSH认证

![image-20250403161520901](./assets/image-20250403161520901.png)

其中 `ID` 是后续使用 `credentialsId` 引用该凭证的字符，将私钥填写在凭证中

![image-20250403161910676](./assets/image-20250403161910676.png)



将公钥配置在Git仓库中，例如 Gitlab 如下所示

![image-20250403162714662](./assets/image-20250403162714662.png)





### 创建任务

**新建任务**

任务名称不能中文

![image-20250403160122727](./assets/image-20250403160122727.png)



### 创建流水线脚本

在 `流水线` 中的 `Pipeline script` 编写脚本

```
pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = 'gitlab_ssh'  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_REPO_URL = 'ssh://git@192.168.1.51:22/kongyu/springboot-demo.git'  // GitLab 仓库地址
        BRANCH = 'master'  // 要拉取的分支
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo "Cloning GitLab repository..."
                    checkout([$class: 'GitSCM',
                        branches: [[name: "*/${BRANCH}"]],
                        userRemoteConfigs: [[
                            url: "${GIT_REPO_URL}",
                            credentialsId: "${GIT_CREDENTIALS_ID}"
                        ]]
                    ])
                }
            }
        }

        stage('List Files') {
            steps {
                script {
                    echo "Listing repository files..."
                    sh 'ls -l'  // 查看当前目录的文件列表
                }
            }
        }

        stage('View File Content') {
            steps {
                script {
                    echo "Viewing README.md content..."
                    sh 'cat README.md'  // 查看 README.md 文件内容
                }
            }
        }
    }
}
```



### Git项目准备

这一步骤是用演示的数据，在实际情况下可以跳过该步骤

#### 下载代码

访问 https://start.spring.io/ 网站填写相关参数下载Springboot源码。也可以通过这里设置好的参数直接下载：[链接](https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.4.4&baseDir=springboot-demo&groupId=local.ateng.demo&artifactId=springboot-demo&name=springboot-demo&description=Demo%20project%20for%20Spring%20Boot&packageName=local.ateng.demo.springboot-demo&packaging=jar&javaVersion=21&dependencies=web)

#### 提交Git仓库

**解压文件**

```
unzip springboot-demo.zip
cd springboot-demo/
```

**Git 全局设置**

```
git config --global user.name "阿腾"
git config --global user.email "2385569970@qq.com"
```

**推送现有文件夹**

```
git init --initial-branch=master
git remote add origin http://gitlab.lingo.local/kongyu/springboot-demo.git
echo "version 1" > README.md
git add .
git commit -m "Initial commit"
git push -u origin master
```



### 构建任务

运行流水线后查看 `控制台输出`

```
Started by user admin
[Pipeline] Start of Pipeline
[Pipeline] node
Running on Jenkins in /bitnami/jenkins/home/workspace/jenkinsfile-git
[Pipeline] {
[Pipeline] withEnv
[Pipeline] {
[Pipeline] stage
[Pipeline] { (Clone Repository)
[Pipeline] script
[Pipeline] {
[Pipeline] echo
Cloning GitLab repository...
[Pipeline] checkout
The recommended git tool is: NONE
using credential gitlab_ssh
 > git rev-parse --resolve-git-dir /bitnami/jenkins/home/workspace/jenkinsfile-git/.git # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url ssh://git@192.168.1.51:22/kongyu/springboot-demo.git # timeout=10
Fetching upstream changes from ssh://git@192.168.1.51:22/kongyu/springboot-demo.git
 > git --version # timeout=10
 > git --version # 'git version 2.39.5'
using GIT_SSH to set credentials Gitlab仓库的SSH秘钥认证
Verifying host key using known hosts file, will automatically accept unseen keys
 > git fetch --tags --force --progress -- ssh://git@192.168.1.51:22/kongyu/springboot-demo.git +refs/heads/*:refs/remotes/origin/* # timeout=10
 > git rev-parse refs/remotes/origin/master^{commit} # timeout=10
Checking out Revision 97be39fd8ebbca81003e9b4158569ee305c8771f (refs/remotes/origin/master)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f 97be39fd8ebbca81003e9b4158569ee305c8771f # timeout=10
Commit message: "Initial commit"
 > git rev-list --no-walk 97be39fd8ebbca81003e9b4158569ee305c8771f # timeout=10
[Pipeline] }
[Pipeline] // script
[Pipeline] }
[Pipeline] // stage
[Pipeline] stage
[Pipeline] { (List Files)
[Pipeline] script
[Pipeline] {
[Pipeline] echo
Listing repository files...
[Pipeline] sh
+ ls -l
total 28
-rw-r--r-- 1 jenkins jenkins    10 Apr  3 16:29 README.md
-rwxr-xr-x 1 jenkins jenkins 10665 Apr  3 16:26 mvnw
-rw-r--r-- 1 jenkins jenkins  7061 Apr  3 16:26 mvnw.cmd
-rw-r--r-- 1 jenkins jenkins  1417 Apr  3 16:26 pom.xml
drwxr-xr-x 4 jenkins jenkins    42 Apr  3 16:26 src
[Pipeline] }
[Pipeline] // script
[Pipeline] }
[Pipeline] // stage
[Pipeline] stage
[Pipeline] { (View File Content)
[Pipeline] script
[Pipeline] {
[Pipeline] echo
Viewing README.md content...
[Pipeline] sh
+ cat README.md
version 1
[Pipeline] }
[Pipeline] // script
[Pipeline] }
[Pipeline] // stage
[Pipeline] }
[Pipeline] // withEnv
[Pipeline] }
[Pipeline] // node
[Pipeline] End of Pipeline
Finished: SUCCESS
```



### Jenkins配置Webhook-Generic

#### 安装插件

安装插件：Git仓库通用的Webhook触发Jenkins构建。插件名称：Generic Webhook Trigger Plugin

#### Jenkins配置Webhook

在流水线的配置 `Triggers`（触发器）中 勾选 `Generic Webhook Trigger` 其中 Webhook URL 是 `http://JENKINS_URL/generic-webhook-trigger/invoke`，关键地方在于 `Token` 的配置，设置token用于区分Jenkins项目Webhook，后续推送在Git仓库配置 `http://JENKINS_URL/generic-webhook-trigger/invoke?token=xxxx` 

![image-20250407141931539](./assets/image-20250407141931539.png)



### Jenkins配置Webhook-Gitlab

#### 安装插件

安装 GitLab 插件：GitLab触发Jenkins构建。插件名称：GitLab

#### Jenkins配置Webhook

在流水线的配置 `Triggers`（触发器）中 勾选 `Build when a change is pushed to GitLab.` 其中 Webhook URL 用于在Gitlab配置的URL，这里是：http://192.168.1.12:20022/project/jenkinsfile-git

![image-20250403164335214](./assets/image-20250403164335214.png)

其中的高级部分，生成 `Secret token` ，保存这个token，用于Gitlab配置Webhook，这里是：cea6247dbd3e0ff8ce25c3bc372f3cee

![image-20250403164415149](./assets/image-20250403164415149.png)



### Gitlab配置Webhook

在项目中的 `设置`  →  `Webhooks` ，填写 `网址` 和 `Secret Token`，最后再 `添加webhook`

![image-20250403164954038](./assets/image-20250403164954038.png)

推送事件，触发流水线自动构建

![image-20250403165159074](./assets/image-20250403165159074.png)

推送成功会返回200状态码

![image-20250403165228242](./assets/image-20250403165228242.png)

在Jenkins中查看流水线，可以看到已自动构建

![image-20250403165339421](./assets/image-20250403165339421.png)

### 推送代码触发自动构建

配置好Jenkins和Gitlab的Webhook后，就可以修改代码然后推送到Gitlab仓库就会触发自动构建

```
echo "version 2" > README.md
git add .
git commit -m "修改 README.md"
git push -u origin master
```

![image-20250403165625914](./assets/image-20250403165625914.png)

查看控制台输出，可以看到README.md文件已修改

![image-20250403165655584](./assets/image-20250403165655584.png)







## 项目实战：Linux部署Springboot项目

请先参考或熟悉以下章节完成相关配置

- 基础配置
- SSH Server
- 流水线-SSH
- 流水线-工具类
- Git

实现逻辑：在Jenkins的主机上，使用git拉取代码，然后再设置相关工具，最后使用通过SSH远程到服务器上镜像更新部署

### Git代码准备

这一步骤是用演示的数据，在实际情况下可以跳过该步骤

#### 下载代码

访问 https://start.spring.io/ 网站填写相关参数下载Springboot源码。也可以通过这里设置好的参数直接下载：[链接](https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.4.4&baseDir=springboot-demo&groupId=local.ateng.demo&artifactId=springboot-demo&name=springboot-demo&description=Demo%20project%20for%20Spring%20Boot&packageName=local.ateng.demo.springboot-demo&packaging=jar&javaVersion=21&dependencies=web)

#### 提交Git仓库

**解压文件**

```
unzip springboot-demo.zip
cd springboot-demo/
```

**Git 全局设置**

```
git config --global user.name "阿腾"
git config --global user.email "2385569970@qq.com"
```

**推送现有文件夹**

```
git init --initial-branch=master
git remote add origin http://gitlab.lingo.local/kongyu/springboot-demo.git
git add .
git commit -m "Initial commit"
git push -u origin master
```



### Jenkins任务配置

#### 创建Git仓库凭证

Git的认证方式有两种：HTTP和SSH，根据需要创建对应的凭证

![image-20250407151625942](./assets/image-20250407151625942.png)

#### 创建流水线任务

![image-20250407151414688](./assets/image-20250407151414688.png)

#### 配置Webhook

在流水线的配置 `Triggers`（触发器）中 勾选 `Generic Webhook Trigger` 其中 Webhook URL 是 `http://JENKINS_URL/generic-webhook-trigger/invoke`，关键地方在于 `Token` 的配置，设置token用于区分Jenkins项目Webhook，后续推送在Git仓库配置 `http://JENKINS_URL/generic-webhook-trigger/invoke?token=xxxx` 

关键参数配置：

Post content parameters：获取ref参数，用于后续匹配分支

```
Variable: ref
Expression: $.ref
```

Token：自定义设置（这里设置的是任务名称），用于后续Git仓库设置Webhook的URL

Optional filter：匹配特定分支才能触发Webhook，这里是master和production

```
Expression: ^refs/heads/(master|production)$
Text: $ref
```

![image-20250407175315146](./assets/image-20250407175315146.png)

![image-20250407175339182](./assets/image-20250407175339182.png)

![image-20250407175406702](./assets/image-20250407175406702.png)

### 编辑流水线脚本

#### 最小化配置

```groovy
pipeline {
    agent any

    environment {
        GIT_CREDENTIALS_ID = "gitlab_ssh"  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_URL = "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git"  // GitLab 仓库地址
        GIT_BRANCH = "master"  // 要拉取的分支
        SSH_SERVER_NAME = "server_192.168.1.10_15620"  // SSH Servers 配置中添加的服务器
    }

    tools {
        jdk 'JDK-21'
        maven "Maven-3.9.9"
    }

    stages {

        stage("查看环境变量") {
            steps {
                sh "env"
            }
        }

        stage("拉取代码") {
            steps {
                script {
                    checkout([$class: "GitSCM",
                        branches: [[name: "*/${GIT_BRANCH}"]],
                        userRemoteConfigs: [[
                            url: "${GIT_URL}",
                            credentialsId: "${GIT_CREDENTIALS_ID}"
                        ]]
                    ])
                }
            }
        }

        stage("项目打包") {
            steps {
                sh "mvn clean package -DskipTests"
            }
        }

        stage("上传Jar文件并更新") {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "$SSH_SERVER_NAME", // 配置的 SSH 服务器名称
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "target/*.jar", // 需要上传的文件
                                    removePrefix: "target/", // 去掉本地的 ${removePrefix} 目录
                                    remoteDirectory: "$JOB_NAME/$BUILD_NUMBER", // 远程目录：该目录是基于SSH Server的Remote Directory的路径
                                    // 上传完成后执行命令，更新软件包
                                    execCommand: """
                                    cd /data/service/work/jenkins/
                                    cp $JOB_NAME/$BUILD_NUMBER/*.jar /data/service/application/
                                    """
                                )
                            ],
                            verbose: true // 启用详细日志
                        )
                    ]
                )
            }
        }

        stage("重启服务") {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "$SSH_SERVER_NAME", // 配置的 SSH 服务器名称
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "",
                                    removePrefix: "",
                                    remoteDirectory: "",
                                    // 执行远程脚本或命令重启服务
                                    execCommand: """
                                    ## 使用脚本
                                    #source ~/.bash_profile
                                    #/data/service/application/spring-app.sh restart
                                    ## 使用Systemd
                                    sudo systemctl restart spring-app.service
                                    """
                                )
                            ],
                            verbose: true // 启用详细日志
                        )
                    ]
                )
            }
        }

    }
    
}
```

#### 更多配置

在更多配置中比最小化配置多了以下功能：

- 手动构建
    - 输入版本号，git仓库提交tag
    - 是否保存制品
- 执行完毕发送邮件

```groovy
pipeline {
    agent any

    // 手动运行发布版本时使用
    parameters {
        string(name: 'TAG_NUMBER', defaultValue: '', description: '请输入版本号，使用v开头，例如v1.0.0')
        booleanParam(name: 'IS_ARTIFACT', defaultValue: false, description: '是否保存制品')
    }

    // 环境变量
    environment {
        GIT_CREDENTIALS_ID = "gitlab_ssh"  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_URL = "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git"  // GitLab 仓库地址
        GIT_BRANCH = "master"  // 要拉取的分支
        SSH_SERVER_NAME = "server_192.168.1.10_15620"  // SSH Servers 配置中添加的服务器
    }

    // 工具指定
    tools {
        jdk "JDK-21"
        maven "Maven-3.9.9"
    }

    stages {

        stage("设置并查看环境变量") {
            steps {
                script {
                    env.TODAY = new Date().format("yyyy-MM-dd")
                }
                sh "env"
            }
        }

        stage("拉取代码") {
            steps {
                script {
                    checkout([$class: "GitSCM",
                        branches: [[name: "*/${GIT_BRANCH}"]],
                        userRemoteConfigs: [[
                            url: "${GIT_URL}",
                            credentialsId: "${GIT_CREDENTIALS_ID}"
                        ]]
                    ])
                }
            }
        }

        stage("项目打包") {
            steps {
                sh "mvn clean package -DskipTests"
            }
        }

        stage("上传Jar文件并更新") {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "$SSH_SERVER_NAME", // 配置的 SSH 服务器名称
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "target/*.jar", // 需要上传的文件
                                    removePrefix: "target/", // 去掉本地的 ${removePrefix} 目录
                                    remoteDirectory: "$JOB_NAME/$TODAY/$BUILD_NUMBER", // 远程目录：该目录是基于SSH Server的Remote Directory的路径
                                    // 上传完成后执行命令，更新软件包
                                    execCommand: """
                                    cd /data/service/work/jenkins/
                                    cp $JOB_NAME/$TODAY/$BUILD_NUMBER/*.jar /data/service/application/
                                    """
                                )
                            ],
                            verbose: true // 启用详细日志
                        )
                    ]
                )
            }
        }

        stage("重启服务") {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "$SSH_SERVER_NAME", // 配置的 SSH 服务器名称
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "",
                                    removePrefix: "",
                                    remoteDirectory: "",
                                    // 执行远程脚本或命令重启服务
                                    execCommand: """
                                    ## 使用脚本
                                    #source ~/.bash_profile
                                    #/data/service/application/spring-app.sh restart
                                    ## 使用Systemd
                                    sudo systemctl restart spring-app.service
                                    """
                                )
                            ],
                            verbose: true // 启用详细日志
                        )
                    ]
                )
            }
        }
        
        stage("保存制品文件") {
            when {
                expression {
                    return params.IS_ARTIFACT
                }
            }
            steps {
                script {
                    archiveArtifacts(artifacts: 'target/*.jar', followSymlinks: false)
                }
            }
        }
        
        stage("保存Tag") {
            when {
                expression {
                    return params.TAG_NUMBER =~ /v.*/
                }
            }
            steps {
                sh """
                    export GIT_SSH_COMMAND="ssh -i $JENKINS_HOME/.ssh/id_rsa -o StrictHostKeyChecking=no"
                    git tag -a $TAG_NUMBER-BUILD_$BUILD_NUMBER -m "$TODAY: version $TAG_NUMBER-BUILD_$BUILD_NUMBER"
                    git push origin $TAG_NUMBER-BUILD_$BUILD_NUMBER
                    git ls-remote --tags
                """
            }
        }

    }
    
    post {
        // 无论构建结果如何都会执行（失败、成功、中断等）
        always {
            emailext(
                to: '2385569970@qq.com',
                subject: "[Jenkins构建通知] ${JOB_NAME} #${BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
🔔 Jenkins 构建通知

🧱 项目：${env.JOB_NAME}
🏗️ 构建编号：#${env.BUILD_NUMBER}
🌿 分支：${env.GIT_BRANCH}
💬 状态：${currentBuild.currentResult}
🕒 耗时：${currentBuild.durationString}
🔗 链接：${env.BUILD_URL}
""",
                attachLog: true
            )
        }
        // 仅当构建成功时执行
        success {
            echo 'This runs if build succeeds'
        }
        // 构建失败时执行
        failure {
            echo 'This runs if build fails'
        }
        // 构建结果为不稳定（如测试失败）时执行
        unstable {
            echo 'This runs if build is unstable'
        }
        // 构建被手动中止或由于某些原因中止时执行
        aborted {
            echo 'This runs if build was aborted'
        }
        // 构建结果与上次不同（成功变失败，或失败变成功）时执行
        changed {
            echo 'This runs if build status changed from last time'
        }

    }
    
}
```

制品管理，在配置管理中，找到 `Discard old builds` 设置构建和制品管理

![image-20250408081919336](./assets/image-20250408081919336.png)



### 自动化部署

**推送代码触发自动构建**

配置好Jenkins和Gitlab的Webhook后，就可以修改代码然后推送到Gitlab仓库就会触发自动构建

```
echo "version $(date '+%Y-%m-%d %H:%M:%S')" > README.md
git add .
git commit -m "修改 README.md"
git push -u origin master
```

![image-20250408082258510](./assets/image-20250408082258510.png)



**手动构建**

手动构建输入版本号和勾选保存制品

![image-20250408081308671](./assets/image-20250408081308671.png)

制品

![image-20250408082727971](./assets/image-20250408082727971.png)

标签

![image-20250408082641517](./assets/image-20250408082641517.png)



### 多分支流水线

多分支流水线作用就是获取到项目中不同分支`Jenkinsfile`文件执行对应的构建

#### 创建Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        SSH_SERVER_NAME = "server_192.168.1.10_15620"  // SSH Servers 配置中添加的服务器
    }

    tools {
        jdk "JDK-21"
        maven "Maven-3.9.9"
    }

    stages {

        stage("查看环境变量") {
            steps {
                sh "env"
            }
        }

        stage("项目打包") {
            steps {
                sh "mvn clean package -DskipTests"
            }
        }

        stage("上传Jar文件并更新") {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "$SSH_SERVER_NAME", // 配置的 SSH 服务器名称
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "target/*.jar", // 需要上传的文件
                                    removePrefix: "target/", // 去掉本地的 ${removePrefix} 目录
                                    remoteDirectory: "$JOB_NAME/$BUILD_NUMBER", // 远程目录：该目录是基于SSH Server的Remote Directory的路径
                                    // 上传完成后执行命令，更新软件包
                                    execCommand: """
                                    cd /data/service/work/jenkins/
                                    cp $JOB_NAME/$BUILD_NUMBER/*.jar /data/service/application/
                                    """
                                )
                            ],
                            verbose: true // 启用详细日志
                        )
                    ]
                )
            }
        }

        stage("重启服务") {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "$SSH_SERVER_NAME", // 配置的 SSH 服务器名称
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "",
                                    removePrefix: "",
                                    remoteDirectory: "",
                                    // 执行远程脚本或命令重启服务
                                    execCommand: """
                                    ## 使用脚本
                                    #source ~/.bash_profile
                                    #/data/service/application/spring-app.sh restart
                                    ## 使用Systemd
                                    sudo systemctl restart spring-app.service
                                    """
                                )
                            ],
                            verbose: true // 启用详细日志
                        )
                    ]
                )
            }
        }

    }

}
```

#### Git创建分支

根据实际环境修改对应分支的`Jenkinsfile`

```
# 创建并切换到新分支
git checkout -b develop

# 例如修改文件
echo "分支：develop" >> README.md

# 添加更改到暂存区
git add README.md

# 提交更改
git commit -m "修改了 README.md，添加新内容"

# 推送到远程仓库
git push -u origin develop

# 查看本地分支
git branch

# 查看远程分支
git branch -r
```



#### 创建和配置

**创建多分支流水线**

![image-20250408094824283](./assets/image-20250408094824283.png)

**配置Git仓库**

![image-20250408100303911](./assets/image-20250408100303911.png)



**配置过滤分支**

设置 `Filter by name (with regular expression)` 规则，添加需要自动部署的分支

- `\b(master|develop)\b`：只构建 `master`、`develop`

![image-20250408103036034](./assets/image-20250408103036034.png)



**保存设置**

保存设置后会自动进行一次扫描，然后再自动构建

![image-20250408103637714](./assets/image-20250408103637714.png)

![image-20250408103650268](./assets/image-20250408103650268.png)



#### 触发构建

**手动扫描**

点击 `立刻 Scan 多分支流水线`，将构建有更新的分支

![image-20250408103937818](./assets/image-20250408103937818.png)

**自动扫描**

在设置的触发器里面配置1分钟自动扫描

![image-20250408104146772](./assets/image-20250408104146772.png)

**Webhook**

安装插件：[Multibranch Scan Webhook Trigger](JENKINS_URL/multibranch-webhook-trigger/invoke?token=TOKENHERE)

在设置的触发器里面配置Webhook，Token自定义设置，我这里是配置的项目名称ateng_ssh_springboot_multibranch

![image-20250408104822269](./assets/image-20250408104822269.png)

在Git仓库的Webhook配置URL：

JENKINS_URL/multibranch-webhook-trigger/invoke?token=ateng_ssh_springboot_multibranch



## 项目实战：Docker部署Springboot项目

请先参考或熟悉以下章节完成相关配置

- 基础配置
- 流水线-Docker
- Git

实现逻辑：在Jenkins的主机上，使用git拉取代码，然后再设置相关工具（和Linux部署一致），最后使用docker部署到本地或者远程

### Git代码准备

这一步骤是用演示的数据，在实际情况下可以跳过该步骤

#### 下载代码

访问 https://start.spring.io/ 网站填写相关参数下载Springboot源码。也可以通过这里设置好的参数直接下载：[链接](https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.4.4&baseDir=springboot-demo&groupId=local.ateng.demo&artifactId=springboot-demo&name=springboot-demo&description=Demo%20project%20for%20Spring%20Boot&packageName=local.ateng.demo.springboot-demo&packaging=jar&javaVersion=21&dependencies=web)

#### 提交Git仓库

**解压文件**

```
unzip springboot-demo.zip
cd springboot-demo/
```

**Git 全局设置**

```
git config --global user.name "阿腾"
git config --global user.email "2385569970@qq.com"
```

**推送现有文件夹**

```
git init --initial-branch=master
git remote add origin http://gitlab.lingo.local/kongyu/springboot-demo.git
git add .
git commit -m "Initial commit"
git push -u origin master
```



### Docker文件准备

更多的Dockerfile用法参考：[JDK和应用](/work/docker/dockerfile/java/README.md)

**编辑 Dockerfile 文件**

```
cat > Dockerfile <<"EOF"
FROM registry.lingo.local/service/java:debian12_temurin_openjdk-jdk-21-jre
COPY --chown=1001:1001 target/*.jar app.jar
ENTRYPOINT ["java"]
CMD ["-server", "-Xms128m", "-Xmx1024m", "-jar", "app.jar", "--server.port=8080"]
EOF
```

**推送到Git仓库**

```
git add Dockerfile
git commit -m "Add Dockerfile"
git push -u origin master
```



### Jenkins任务配置

#### 创建Git仓库凭证

Git的认证方式有两种：HTTP和SSH，根据需要创建对应的凭证

![image-20250407151625942](./assets/image-20250407151625942.png)

#### 创建流水线任务

![image-20250408105602577](./assets/image-20250408105602577.png)

#### 配置Webhook

在流水线的配置 `Triggers`（触发器）中 勾选 `Generic Webhook Trigger` 其中 Webhook URL 是 `http://JENKINS_URL/generic-webhook-trigger/invoke`，关键地方在于 `Token` 的配置，设置token用于区分Jenkins项目Webhook，后续推送在Git仓库配置 `http://JENKINS_URL/generic-webhook-trigger/invoke?token=xxxx` 

关键参数配置：

Post content parameters：获取ref参数，用于后续匹配分支

```
Variable: ref
Expression: $.ref
```

Token：自定义设置（这里设置的是任务名称），用于后续Git仓库设置Webhook的URL

Optional filter：匹配特定分支才能触发Webhook，这里是master和production

```
Expression: ^refs/heads/(master|production)$
Text: $ref
```

![image-20250407175315146](./assets/image-20250407175315146.png)

![image-20250408105808435](./assets/image-20250408105808435.png)

![image-20250407175406702](./assets/image-20250407175406702.png)

### 编辑流水线脚本

#### 最小化配置

如果想要把Docker相关的命令运行在远程服务器上，可以在环境变量中添加 `DOCKER_HOST`。例如：DOCKER_HOST = "tcp://10.244.172.126:2375"

```groovy
pipeline {
    agent any

    // 环境变量
    environment {
        // Git仓库
        GIT_CREDENTIALS_ID = "gitlab_ssh"  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_URL = "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git"  // GitLab 仓库地址
        GIT_BRANCH = "master"  // 要拉取的分支
        
        // Docker镜像和仓库
        DOCKER_IMAGE = "springboot3"  // 构建的镜像名称，标签自动生成
        DOCKER_REGISTRY = "registry.lingo.local/ateng"  // 镜像仓库地址
        DOCKER_CREDENTIALS_ID = "harbor_admin"  // 镜像仓库凭证
        DOCKER_HOST = "tcp://10.244.172.126:2375"  // Docker 主机的远程主机
    }

    // 工具类
    tools {
        jdk "JDK-21"
        maven "Maven-3.9.9"
    }

    stages {

        stage("设置并查看环境变量") {
            steps {
                script {
                    // 镜像标签生成规则
                    env.DOCKER_TAG = "$GIT_BRANCH-build-$BUILD_NUMBER"
                }
                sh "env"
            }
        }

        stage('拉取代码') {
            steps {
                script {
                    checkout([$class: "GitSCM",
                        branches: [[name: "*/${GIT_BRANCH}"]],
                        userRemoteConfigs: [[
                            url: "${GIT_URL}",
                            credentialsId: "${GIT_CREDENTIALS_ID}"
                        ]]
                    ])
                }
            }
        }

        stage('项目打包') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('构建容器镜像') {
            steps {
                sh 'docker build -f Dockerfile -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('推送镜像到仓库') {
            steps {
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                }
            }
        }

        stage("重启服务") {
            steps {
                sh "docker stop ateng-springboot3-demo &> /dev/null || true"
                sh "docker rm ateng-springboot3-demo &> /dev/null || true"
                sh """
                docker run -d --restart=always \
                    --name ateng-springboot3-demo \
                    -p 18080:8080 \
                    $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG \
                    -server \
                    -Xms128m -Xmx1024m \
                    -jar app.jar \
                    --server.port=8080 \
                    --spring.profiles.active=prod
                """
            }
        }

    }
    
}
```

#### 更多配置

在更多配置中比最小化配置多了以下功能：

- 手动构建
    - 输入版本号，git仓库提交tag
    - 是否保存制品
- 执行完毕发送邮件

```groovy
pipeline {
    agent any

    // 手动运行发布版本时使用
    parameters {
        string(name: 'TAG_NUMBER', defaultValue: '', description: '请输入版本号，使用v开头，例如v1.0.0')
        booleanParam(name: 'IS_ARTIFACT', defaultValue: false, description: '是否保存制品')
    }
    
    // 环境变量
    environment {
        // Git仓库
        GIT_CREDENTIALS_ID = "gitlab_ssh"  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_URL = "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git"  // GitLab 仓库地址
        GIT_BRANCH = "master"  // 要拉取的分支
        
        // Docker镜像和仓库
        DOCKER_IMAGE = "springboot3"  // 构建的镜像名称，标签自动生成
        DOCKER_REGISTRY = "registry.lingo.local/ateng"  // 镜像仓库地址
        DOCKER_CREDENTIALS_ID = "harbor_admin"  // 镜像仓库凭证
        DOCKER_HOST = "tcp://10.244.172.126:2375"  // Docker 远程主机
    }

    // 工具类
    tools {
        jdk "JDK-21"
        maven "Maven-3.9.9"
    }

    stages {

        stage("设置并查看环境变量") {
            steps {
                script {
                    env.TODAY = new Date().format("yyyyMMdd")
                    // 镜像标签生成规则
                    env.DOCKER_TAG = "$GIT_BRANCH-$TODAY-build-$BUILD_NUMBER"
                }
                sh "env"
            }
        }

        stage('拉取代码') {
            steps {
                script {
                    checkout([$class: "GitSCM",
                        branches: [[name: "*/${GIT_BRANCH}"]],
                        userRemoteConfigs: [[
                            url: "${GIT_URL}",
                            credentialsId: "${GIT_CREDENTIALS_ID}"
                        ]]
                    ])
                }
            }
        }

        stage('项目打包') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('构建容器镜像') {
            steps {
                sh 'docker build -f Dockerfile -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('推送镜像到仓库') {
            steps {
                sh 'docker tag $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG $DOCKER_REGISTRY/$DOCKER_IMAGE:latest'
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:latest'
                }
            }
        }

        stage("重启服务") {
            steps {
                sh "docker stop ateng-springboot3-demo &> /dev/null || true"
                sh "docker rm ateng-springboot3-demo &> /dev/null || true"
                sh """
                docker run -d --restart=always \
                    --name ateng-springboot3-demo \
                    -p 18080:8080 \
                    $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG \
                    -server \
                    -Xms128m -Xmx1024m \
                    -jar app.jar \
                    --server.port=8080 \
                    --spring.profiles.active=prod
                """
            }
        }
       
        stage("保存制品文件") {
            when {
                expression {
                    return params.IS_ARTIFACT
                }
            }
            steps {
                script {
                    archiveArtifacts(artifacts: 'target/*.jar', followSymlinks: false)
                }
            }
        }
        
        stage("保存Tag") {
            when {
                expression {
                    return params.TAG_NUMBER =~ /v.*/
                }
            }
            steps {
                sh """
                    git config user.email "2385569970@qq.com"
                    git config user.name "Ateng_Jenkins"
                    export GIT_SSH_COMMAND="ssh -i $JENKINS_HOME/.ssh/id_rsa -o StrictHostKeyChecking=no"
                    git tag -a $TAG_NUMBER-BUILD_$BUILD_NUMBER -m "$TODAY: version $TAG_NUMBER-BUILD_$BUILD_NUMBER"
                    git push origin $TAG_NUMBER-BUILD_$BUILD_NUMBER
                    git ls-remote --tags
                """
            }
        }

    }
    
    post {
        // 无论构建结果如何都会执行（失败、成功、中断等）
        always {
            emailext(
                to: '2385569970@qq.com',
                subject: "[Jenkins构建通知] ${JOB_NAME} #${BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
🔔 Jenkins 构建通知

🧱 项目：${env.JOB_NAME}
🏗️ 构建编号：#${env.BUILD_NUMBER}
🌿 分支：${env.GIT_BRANCH}
💬 状态：${currentBuild.currentResult}
🕒 耗时：${currentBuild.durationString}
🔗 链接：${env.BUILD_URL}
""",
                attachLog: true
            )
        }
        // 仅当构建成功时执行
        success {
            echo 'This runs if build succeeds'
        }
        // 构建失败时执行
        failure {
            echo 'This runs if build fails'
        }
        // 构建结果为不稳定（如测试失败）时执行
        unstable {
            echo 'This runs if build is unstable'
        }
        // 构建被手动中止或由于某些原因中止时执行
        aborted {
            echo 'This runs if build was aborted'
        }
        // 构建结果与上次不同（成功变失败，或失败变成功）时执行
        changed {
            echo 'This runs if build status changed from last time'
        }

    }

}
```

制品管理，在配置管理中，找到 `Discard old builds` 设置构建和制品管理

![image-20250408081919336](./assets/image-20250408081919336.png)



### 自动化部署

**推送代码触发自动构建**

配置好Jenkins和Gitlab的Webhook后，就可以修改代码然后推送到Gitlab仓库就会触发自动构建

```
echo "version $(date '+%Y-%m-%d %H:%M:%S')" > README.md
git add .
git commit -m "修改 README.md"
git push -u origin master
```

![image-20250409102829633](./assets/image-20250409102829633.png)



**手动构建**

手动构建输入版本号和勾选保存制品

![image-20250408144247729](./assets/image-20250408144247729.png)

制品

![image-20250408082727971](./assets/image-20250408082727971.png)

标签

![image-20250408082641517](./assets/image-20250408082641517.png)



### 多分支流水线

多分支流水线作用就是获取到项目中不同分支`Jenkinsfile`文件执行对应的构建

#### 创建Jenkinsfile

```groovy
pipeline {
    agent any

    // 环境变量
    environment {
        // Docker镜像和仓库
        DOCKER_IMAGE = "springboot3"  // 构建的镜像名称，标签自动生成
        DOCKER_REGISTRY = "registry.lingo.local/ateng"  // 镜像仓库地址
        DOCKER_CREDENTIALS_ID = "harbor_admin"  // 镜像仓库凭证
        DOCKER_HOST = "tcp://10.244.172.126:2375"  // Docker 主机的远程主机
    }

    // 工具类
    tools {
        jdk "JDK-21"
        maven "Maven-3.9.9"
    }

    stages {

        stage("设置并查看环境变量") {
            steps {
                script {
                    // 镜像标签生成规则
                    env.DOCKER_TAG = "$GIT_BRANCH-build-$BUILD_NUMBER"
                }
                sh "env"
            }
        }

        stage('项目打包') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('构建容器镜像') {
            steps {
                sh 'docker build -f Dockerfile -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('推送镜像到仓库') {
            steps {
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                }
            }
        }

        stage("重启服务") {
            steps {
                sh "docker stop ateng-springboot3-demo &> /dev/null || true"
                sh "docker rm ateng-springboot3-demo &> /dev/null || true"
                sh """
                docker run -d --restart=always \
                    --name ateng-springboot3-demo \
                    -p 18080:8080 \
                    $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG \
                    -server \
                    -Xms128m -Xmx1024m \
                    -jar app.jar \
                    --server.port=8080 \
                    --spring.profiles.active=prod
                """
            }
        }

    }
    
}
```

#### Git创建分支

根据实际环境修改对应分支的`Jenkinsfile`

```
# 创建并切换到新分支
git checkout -b develop

# 例如修改文件
echo "分支：develop" >> README.md

# 添加更改到暂存区
git add README.md

# 提交更改
git commit -m "修改了 README.md，添加新内容"

# 推送到远程仓库
git push -u origin develop

# 查看本地分支
git branch

# 查看远程分支
git branch -r
```



#### 创建和配置

**创建多分支流水线**

![image-20250409103555264](./assets/image-20250409103555264.png)

**配置Git仓库**

![image-20250408100303911](./assets/image-20250408100303911.png)



**配置过滤分支**

设置 `Filter by name (with regular expression)` 规则，添加需要自动部署的分支

- `\b(master|develop)\b`：只构建 `master`、`develop`

![image-20250408103036034](./assets/image-20250408103036034.png)



**保存设置**

保存设置后会自动进行一次扫描，然后再自动构建

![image-20250408103637714](./assets/image-20250408103637714.png)

![image-20250408103650268](./assets/image-20250408103650268.png)



#### 触发构建

**手动扫描**

点击 `立刻 Scan 多分支流水线`，将构建有更新的分支

![image-20250408103937818](./assets/image-20250408103937818.png)

**自动扫描**

在设置的触发器里面配置1分钟自动扫描

![image-20250408104146772](./assets/image-20250408104146772.png)

**Webhook**

安装插件：[Multibranch Scan Webhook Trigger](JENKINS_URL/multibranch-webhook-trigger/invoke?token=TOKENHERE)

在设置的触发器里面配置Webhook，Token自定义设置，我这里是配置的项目名称ateng_docker_springboot_multibranch

![image-20250408104822269](./assets/image-20250408104822269.png)

在Git仓库的Webhook配置URL：

JENKINS_URL/multibranch-webhook-trigger/invoke?token=ateng_docker_springboot_multibranch



## 项目实战：Kubernetes部署Springboot项目

请先参考或熟悉以下章节完成相关配置

- 基础配置
- 流水线-Kubernetes
- Git

实现逻辑：在Jenkins的主机上，使用配置的Pod Template，再远程创建这些Pod，在指定的节点进行容器构建。

### Git代码准备

这一步骤是用演示的数据，在实际情况下可以跳过该步骤

#### 下载代码

访问 https://start.spring.io/ 网站填写相关参数下载Springboot源码。也可以通过这里设置好的参数直接下载：[链接](https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.4.4&baseDir=springboot-demo&groupId=local.ateng.demo&artifactId=springboot-demo&name=springboot-demo&description=Demo%20project%20for%20Spring%20Boot&packageName=local.ateng.demo.springboot-demo&packaging=jar&javaVersion=21&dependencies=web)

#### 提交Git仓库

**解压文件**

```
unzip springboot-demo.zip
cd springboot-demo/
```

**Git 全局设置**

```
git config --global user.name "阿腾"
git config --global user.email "2385569970@qq.com"
```

**推送现有文件夹**

```
git init --initial-branch=master
git remote add origin http://gitlab.lingo.local/kongyu/springboot-demo.git
git add .
git commit -m "Initial commit"
git push -u origin master
```



### 部署文件准备

#### Docker

更多的Dockerfile用法参考：[JDK和应用](/work/docker/dockerfile/java/README.md)

**编辑 Dockerfile 文件**

```
cat > Dockerfile <<"EOF"
FROM registry.lingo.local/service/java:debian12_temurin_openjdk-jdk-21-jre
COPY --chown=1001:1001 target/*.jar app.jar
ENTRYPOINT ["java"]
CMD ["-server", "-Xms128m", "-Xmx1024m", "-jar", "app.jar", "--server.port=8080"]
EOF
```

**推送到Git仓库**

```
git add Dockerfile
git commit -m "Add Dockerfile"
git push -u origin master
```

#### Kubernetes

**编辑 deploy.yaml 文件**

注意镜像是变量，后续通过流水线脚本获取到具体的值

```
cat > deploy.yaml <<"EOF"
kind: Deployment
apiVersion: apps/v1
metadata:
  name: ateng-springboot3-demo
  labels:
    app: ateng-springboot3-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ateng-springboot3-demo
  template:
    metadata:
      labels:
        app: ateng-springboot3-demo
    spec:
      containers:
        - name: app
          image: $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG
          command:
            - java
          args:
            - -server
            - -Xms512m
            - -Xmx2048m
            - -jar
            - /opt/app/app.jar
            - --server.port=8080
            - --spring.profiles.active=prod
          ports:
            - name: web
              containerPort: 8080
              protocol: TCP
          resources:
            limits:
              cpu: '2'
              memory: 2Gi
            requests:
              cpu: 500m
              memory: 512Mi
          #livenessProbe:
          #  httpGet:
          #    path: /actuator/health
          #    port: 8080
          #    scheme: HTTP
          #  initialDelaySeconds: 30
          #  timeoutSeconds: 1
          #  periodSeconds: 10
          #  successThreshold: 1
          #  failureThreshold: 3
          #readinessProbe:
          #  httpGet:
          #    path: /actuator/health
          #    port: 8080
          #    scheme: HTTP
          #  initialDelaySeconds: 10
          #  timeoutSeconds: 1
          #  periodSeconds: 10
          #  successThreshold: 1
          #  failureThreshold: 3
          imagePullPolicy: IfNotPresent
      terminationGracePeriodSeconds: 60
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - podAffinityTerm:
                labelSelector:
                  matchLabels:
                    app: ateng-springboot3-demo
                topologyKey: kubernetes.io/hostname
              weight: 1
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - preference:
                matchExpressions:
                  - key: kubernetes.service/ateng-springboot3-demo
                    operator: In
                    values:
                      - "true"
              weight: 1
---
apiVersion: v1
kind: Service
metadata:
  name: ateng-springboot3-demo-service
  labels:
    app: ateng-springboot3-demo
spec:
  type: NodePort
  selector:
    app: ateng-springboot3-demo
  ports:
  - name: web
    protocol: TCP
    port: 8080
    targetPort: 8080
    nodePort: 30808
EOF
```

**推送到Git仓库**

```
git add deploy.yaml
git commit -m "Add deploy.yaml"
git push -u origin master
```



### Kubernetes环境准备

#### 创建kubeconfig

- K8S_UserName: 设置账户名称
- K8S_ClusterName: 设置集群名称，用于区分多个集群的名称
- K8S_API：设置集群地址
- K8S_NameSpace：应用的命名空间

```shell
export K8S_UserName=ateng-kongyu
export K8S_ClusterName=kubernetes.lingo.local
export K8S_API=https://192.168.1.18:6443
export K8S_NameSpace=ateng-kongyu

kubectl create ns ${K8S_NameSpace}
kubectl create ns ${K8S_NameSpace_DevOps}
kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ${K8S_UserName}
  namespace: ${K8S_NameSpace}
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ${K8S_UserName}
  namespace: ${K8S_NameSpace}
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ${K8S_UserName}-binding
  namespace: ${K8S_NameSpace}
subjects:
- kind: ServiceAccount
  name: ${K8S_UserName}
  namespace: ${K8S_NameSpace}
roleRef:
  kind: Role
  name: ${K8S_UserName}
  apiGroup: rbac.authorization.k8s.io
EOF
k8s_secret=$(kubectl get serviceaccount ${K8S_UserName} -n ${K8S_NameSpace} -o jsonpath='{.secrets[0].name}')
k8s_token=$(kubectl get -n ${K8S_NameSpace} secret ${k8s_secret} -n ${K8S_NameSpace} -o jsonpath='{.data.token}' | base64 -d)
k8s_ca=$(kubectl get secrets -n ${K8S_NameSpace} ${k8s_secret} -o "jsonpath={.data['ca\.crt']}")
cat > kubeconfig-${K8S_UserName}.yaml <<EOF
apiVersion: v1
kind: Config
clusters:
- cluster:
    certificate-authority-data: ${k8s_ca}
    server: ${K8S_API}
  name: ${K8S_ClusterName}
contexts:
- context:
    cluster: ${K8S_ClusterName}
    user: ${K8S_UserName}
    namespace: ${K8S_NameSpace}
  name: ${K8S_UserName}@${K8S_ClusterName}
current-context: ${K8S_UserName}@${K8S_ClusterName}
preferences: {}
users:
- name: ${K8S_UserName}
  user:
    token: ${k8s_token}
EOF
```

#### 添加Kubernetes Cloud

添加凭证，将 `kubeconfig `以 `Secret file` 的方式添加到凭证中，ID为：kubeconfig_local_k8s_ateng_kongyu

![image-20250409113117838](./assets/image-20250409113117838.png)

添加Kubernetes Cloud，名称为： `local_kubernetes_ateng_kongyu` 

![image-20250409112807891](./assets/image-20250409112807891.png)

指定凭证，选择创建的kubeconfig凭证，然后点击连接测试

![image-20250409113411456](./assets/image-20250409113411456.png)

WebSocket：勾选 `WebSocket`，Agent使用WebSocket的方式连接到Jenkins

![image-20250410161713526](./assets/image-20250410161713526.png)



### 添加Pod Templates

**创建Pod templates**

添加命名为 `jenkins-agent-ateng-k8s-springboot3` 的 Pod templates

填写以下参数：

- 名称：Pod templates的名称
- 命名空间：agent容器运行在k8s中的命名空间。为了降低耦合性，不配置命名空间，使用kubeconfig默认的。如果kubeconfig是配置的集群管理员，那么可以指定以下命名空间。
- 标签列表：用于后续流水线脚本（Jenkinsfile）的agent.kubernetes的label配置，匹配Pod templates
- Raw YAML for the Pod：填写初始的yaml
- 工作空间卷：选择 `Host Path Workspace Volume` ，或者 `Generic Ephemeral Volume` 、`NFS Workspace Volume`。

基础配置

![image-20250409144807785](./assets/image-20250409144807785.png)



Raw YAML for the Pod，相当于这是个初始的yaml模版，其他的设置会覆盖这个yaml。

亲和性，使其尽量调度在集群节点有标签 `node-role.kubernetes.io/worker=ci` 上。

挂载hostPath（相关依赖建议挂载到NFS中，可以共享依赖，不然Agent调度到其他节点就会重新下载）

- Maven容器：设置路径挂载到容器中，持久化依赖的下载。启动工具类容器的挂载类似。
- Docker容器：将Docker的socket `/var/run/docker.sock` 挂载到容器内部，使内部可以使用docker命令build和push等。如果是其他容器运行时可以挂载相应的socket和相关命令。
- Bitnami容器：如bitnami/kubectl，这一类容器的默认用户是1001，需要使用root用户运行Jenkins Agent才能正常工作

```yaml
apiVersion: "v1"
kind: "Pod"
metadata:
  name: "auto-generate"
spec:
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - preference:
            matchExpressions:
              - key: "node-role.kubernetes.io/worker"
                operator: "In"
                values:
                  - "ci"
          weight: 1
  containers:
    - name: "maven"
      image: "maven:3.9.9-eclipse-temurin-21"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      volumeMounts:
        - mountPath: "/data/download/maven"
          name: "maven"
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
        - name: "maven-config-volume"
          mountPath: "/usr/share/maven/conf/settings.xml"
          subPath: "settings.xml"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}

    - name: "docker"
      image: "docker:27.3.1"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      volumeMounts:
        - mountPath: "/var/run/docker.sock"
          name: "volume-0"
          readOnly: true
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}

    - name: "kubectl"
      image: "bitnami/kubectl:1.32.3"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      tty: true
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}
      # bitnami 容器默认是1001用户，需要使用root用户运行Jenkins Agent才能正常工作
      securityContext:
        runAsUser: 0
        runAsGroup: 0
        privileged: false

    - name: "jnlp"
      image: "jenkins/inbound-agent:3301.v4363ddcca_4e7-3-jdk21"
      imagePullPolicy: "IfNotPresent"
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "volume-1"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}

  volumes:
    - hostPath:
        path: "/var/run/docker.sock"
      name: "volume-0"
    - hostPath:
        path: "/etc/localtime"
      name: "volume-1"
    - hostPath:
        path: "/var/jenkins/downloads/maven"
      name: "maven"
    - name: "maven-config-volume"
      configMap:
        name: "maven-config"
```

工作空间卷，需要保证这个路径是权限是RWX=777。

![image-20250406154027341](./assets/image-20250406154027341.png)

**创建Maven的配置**

在Kubernetes集群创建configmap，作为Maven容器的配置文件

```shell
kubectl -n ateng-kongyu apply -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: maven-config
data:
  settings.xml: |
    <?xml version="1.0" encoding="UTF-8"?>
    <settings>
        <localRepository>/data/download/maven/repository</localRepository>
        <mirrors>
            <mirror>
                <id>aliyun</id>
                <mirrorOf>central</mirrorOf>
                <url>https://maven.aliyun.com/nexus/content/groups/public/</url>
            </mirror>
        </mirrors>
    </settings>
EOF
```



### Jenkins任务配置

#### 创建Git仓库凭证

Git的认证方式有两种：HTTP和SSH，根据需要创建对应的凭证

![image-20250407151625942](./assets/image-20250407151625942.png)

#### 创建流水线任务

![image-20250409104659676](./assets/image-20250409104659676.png)

#### 配置Webhook

在流水线的配置 `Triggers`（触发器）中 勾选 `Generic Webhook Trigger` 其中 Webhook URL 是 `http://JENKINS_URL/generic-webhook-trigger/invoke`，关键地方在于 `Token` 的配置，设置token用于区分Jenkins项目Webhook，后续推送在Git仓库配置 `http://JENKINS_URL/generic-webhook-trigger/invoke?token=xxxx` 

关键参数配置：

Post content parameters：获取ref参数，用于后续匹配分支

```
Variable: ref
Expression: $.ref
```

Token：自定义设置（这里设置的是任务名称），用于后续Git仓库设置Webhook的URL

Optional filter：匹配特定分支才能触发Webhook，这里是master和production

```
Expression: ^refs/heads/(master|production)$
Text: $ref
```

![image-20250407175315146](./assets/image-20250407175315146.png)

![image-20250409104743804](./assets/image-20250409104743804.png)

![image-20250407175406702](./assets/image-20250407175406702.png)

### 编辑流水线脚本

#### 最小化配置

```groovy
pipeline {
    agent {
        kubernetes {
            label 'jenkins-agent-ateng-k8s-springboot3'  // Pod templates中设置的标签
        }
    }

    // 环境变量
    environment {
        // Git仓库
        GIT_CREDENTIALS_ID = "gitlab_ssh"  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_URL = "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git"  // GitLab 仓库地址
        GIT_BRANCH = "master"  // 要拉取的分支
        
        // Docker镜像和仓库
        DOCKER_IMAGE = "springboot3"  // 构建的镜像名称，标签自动生成
        DOCKER_REGISTRY = "registry.lingo.local/ateng"  // 镜像仓库地址
        DOCKER_CREDENTIALS_ID = "harbor_admin"  // 镜像仓库凭证
        
        // Kubernetes的kubeconfig凭证
        KUBECONFIG_CREDENTIAL_ID = "kubeconfig_local_k8s_ateng_kongyu"
    }

    stages {

        stage('设置并查看环境变量') {
            steps {
                container('maven') {
                    script {
                        // 镜像标签生成规则
                        env.DOCKER_TAG = "$GIT_BRANCH-build-$BUILD_NUMBER"
                        sh "env"
                    }
                }
            }
        }

       stage('拉取代码') {
            steps {
                // maven、node、golang 这些基础容器中包含有git命令
                container('maven') {
                    script {
                        checkout([$class: "GitSCM",
                            branches: [[name: "*/${GIT_BRANCH}"]],
                            userRemoteConfigs: [[
                                url: "${GIT_URL}",
                                credentialsId: "${GIT_CREDENTIALS_ID}"
                            ]]
                        ])
                    }
                }
            }
        }

        stage('项目打包') {
            steps {
                container('maven') {
                    script {
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }

        stage('构建容器镜像') {
            steps {
                container('docker') {
                    script {
                        sh 'docker build -f Dockerfile -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
                    }
                }
            }
        }

        stage('推送镜像到仓库') {
            steps {
                container('docker') {
                    withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                        sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                    }
                }
            }
        }

        stage('重启服务') {
            steps {
                container('kubectl') {
                    withCredentials([file(credentialsId: "$KUBECONFIG_CREDENTIAL_ID", variable: "KUBECONFIG")]) {
                        sh 'envsubst < deploy.yaml | kubectl apply -f -'
                    }
                }
            }
        }

    }
    
}
```

#### 更多配置

在更多配置中比最小化配置多了以下功能：

- 手动构建
    - 输入版本号，git仓库提交tag
    - 是否保存制品
- 执行完毕发送邮件

```groovy
pipeline {
    agent {
        kubernetes {
            label 'jenkins-agent-ateng-k8s-springboot3'  // Pod templates中设置的标签
        }
    }

    // 手动运行发布版本时使用
    parameters {
        string(name: 'TAG_NUMBER', defaultValue: '', description: '请输入版本号，使用v开头，例如v1.0.0')
        booleanParam(name: 'IS_ARTIFACT', defaultValue: false, description: '是否保存制品')
    }
    
    // 环境变量
    environment {
        // Git仓库
        GIT_CREDENTIALS_ID = "gitlab_ssh"  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_URL = "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git"  // GitLab 仓库地址
        GIT_BRANCH = "master"  // 要拉取的分支
        
        // Docker镜像和仓库
        DOCKER_IMAGE = "springboot3"  // 构建的镜像名称，标签自动生成
        DOCKER_REGISTRY = "registry.lingo.local/ateng"  // 镜像仓库地址
        DOCKER_CREDENTIALS_ID = "harbor_admin"  // 镜像仓库凭证
        
        // Kubernetes的kubeconfig凭证
        KUBECONFIG_CREDENTIAL_ID = "kubeconfig_local_k8s_ateng_kongyu"
    }

    stages {

        stage("设置并查看环境变量") {
            steps {
                script {
                    env.TODAY = new Date().format("yyyyMMdd")
                    // 镜像标签生成规则
                    env.DOCKER_TAG = "$GIT_BRANCH-$TODAY-build-$BUILD_NUMBER"
                }
                sh "env"
            }
        }

       stage('拉取代码') {
            steps {
                // maven、node、golang 这些基础容器中包含有git命令
                container('maven') {
                    script {
                        checkout([$class: "GitSCM",
                            branches: [[name: "*/${GIT_BRANCH}"]],
                            userRemoteConfigs: [[
                                url: "${GIT_URL}",
                                credentialsId: "${GIT_CREDENTIALS_ID}"
                            ]]
                        ])
                    }
                }
            }
        }

        stage('项目打包') {
            steps {
                container('maven') {
                    script {
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }

        stage('构建容器镜像') {
            steps {
                container('docker') {
                    script {
                        sh 'docker build -f Dockerfile -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
                    }
                }
            }
        }

        stage('推送镜像到仓库') {
            steps {
                container('docker') {
                    sh 'docker tag $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG $DOCKER_REGISTRY/$DOCKER_IMAGE:latest'
                    withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                        sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                        sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:latest'
                    }
                }
            }
        }

        stage('重启服务') {
            steps {
                container('kubectl') {
                    withCredentials([file(credentialsId: "$KUBECONFIG_CREDENTIAL_ID", variable: "KUBECONFIG")]) {
                        sh 'envsubst < deploy.yaml | kubectl apply -f -'
                    }
                }
            }
        }
       
        stage("保存制品文件") {
            when {
                expression {
                    return params.IS_ARTIFACT
                }
            }
            steps {
                container('maven') {
                    script {
                        archiveArtifacts(artifacts: 'target/*.jar', followSymlinks: false)
                    }
                }
            }
        }
        
        stage("保存Tag") {
            when {
                expression {
                    return params.TAG_NUMBER =~ /v.*/
                }
            }
            steps {
                container('maven') {
                    sshagent (credentials: ["$GIT_CREDENTIALS_ID"]) {
                        sh """
                            git config --global --add safe.directory $WORKSPACE
                            git config user.email "2385569970@qq.com"
                            git config user.name "Ateng_Jenkins"
                            export GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no"
                            git tag -a $TAG_NUMBER-BUILD_$BUILD_NUMBER -m "$TODAY: version $TAG_NUMBER-BUILD_$BUILD_NUMBER"
                            git push origin $TAG_NUMBER-BUILD_$BUILD_NUMBER
                            git ls-remote --tags
                        """
                    }
                }
            }
        }

    }
    
    post {
        // 无论构建结果如何都会执行（失败、成功、中断等）
        always {
            emailext(
                to: '2385569970@qq.com',
                subject: "[Jenkins构建通知] ${JOB_NAME} #${BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
🔔 Jenkins 构建通知

🧱 项目：${env.JOB_NAME}
🏗️ 构建编号：#${env.BUILD_NUMBER}
🌿 分支：${env.GIT_BRANCH}
💬 状态：${currentBuild.currentResult}
🕒 耗时：${currentBuild.durationString}
🔗 链接：${env.BUILD_URL}
""",
                attachLog: true
            )
        }
        // 仅当构建成功时执行
        success {
            echo 'This runs if build succeeds'
        }
        // 构建失败时执行
        failure {
            echo 'This runs if build fails'
        }
        // 构建结果为不稳定（如测试失败）时执行
        unstable {
            echo 'This runs if build is unstable'
        }
        // 构建被手动中止或由于某些原因中止时执行
        aborted {
            echo 'This runs if build was aborted'
        }
        // 构建结果与上次不同（成功变失败，或失败变成功）时执行
        changed {
            echo 'This runs if build status changed from last time'
        }

    }

}
```

制品管理，在配置管理中，找到 `Discard old builds` 设置构建和制品管理

![image-20250408081919336](./assets/image-20250408081919336.png)



### 自动化部署

**推送代码触发自动构建**

配置好Jenkins和Gitlab的Webhook后，就可以修改代码然后推送到Gitlab仓库就会触发自动构建

```
echo "version $(date '+%Y-%m-%d %H:%M:%S')" > README.md
git add .
git commit -m "修改 README.md"
git push -u origin master
```

![image-20250409151536800](./assets/image-20250409151536800.png)



**手动构建**

手动构建输入版本号和勾选保存制品

![image-20250409151200266](./assets/image-20250409151200266.png)

制品

![image-20250409151421214](./assets/image-20250409151421214.png)

标签

![image-20250408082641517](./assets/image-20250408082641517.png)



### 多分支流水线

多分支流水线作用就是获取到项目中不同分支`Jenkinsfile`文件执行对应的构建

#### 创建Jenkinsfile

```groovy
pipeline {
    agent {
        kubernetes {
            label 'jenkins-agent-ateng-k8s-springboot3'  // Pod templates中设置的标签
        }
    }

    // 环境变量
    environment {
        // Docker镜像和仓库
        DOCKER_IMAGE = "springboot3"  // 构建的镜像名称，标签自动生成
        DOCKER_REGISTRY = "registry.lingo.local/ateng"  // 镜像仓库地址
        DOCKER_CREDENTIALS_ID = "harbor_admin"  // 镜像仓库凭证
        DOCKER_HOST = "tcp://10.244.172.126:2375"  // Docker 主机的远程主机
        
        // Kubernetes的kubeconfig凭证
        KUBECONFIG_CREDENTIAL_ID = "kubeconfig_local_k8s_ateng_kongyu"
    }

    stages {

        stage('设置并查看环境变量') {
            steps {
                container('maven') {
                    script {
                        // 镜像标签生成规则
                        env.DOCKER_TAG = "$GIT_BRANCH-build-$BUILD_NUMBER"
                        sh "env"
                    }
                }
            }
        }

        stage('项目打包') {
            steps {
                container('maven') {
                    script {
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }

        stage('构建容器镜像') {
            steps {
                container('docker') {
                    script {
                        sh 'docker build -f Dockerfile -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
                    }
                }
            }
        }

        stage('推送镜像到仓库') {
            steps {
                container('docker') {
                    withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                        sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                    }
                }
            }
        }

        stage('重启服务') {
            steps {
                container('kubectl') {
                    withCredentials([file(credentialsId: "$KUBECONFIG_CREDENTIAL_ID", variable: "KUBECONFIG")]) {
                        sh 'envsubst < deploy.yaml | kubectl apply -f -'
                    }
                }
            }
        }

    }
    
}
```

#### Git创建分支

根据实际环境修改对应分支的`Jenkinsfile`

```
# 创建并切换到新分支
git checkout -b develop

# 例如修改文件
echo "分支：develop" >> README.md

# 添加更改到暂存区
git add README.md

# 提交更改
git commit -m "修改了 README.md，添加新内容"

# 推送到远程仓库
git push -u origin develop

# 查看本地分支
git branch

# 查看远程分支
git branch -r
```



#### 创建和配置

**创建多分支流水线**

![image-20250409151946587](./assets/image-20250409151946587.png)

**配置Git仓库**

![image-20250409152148427](./assets/image-20250409152148427.png)



**配置过滤分支**

设置 `Filter by name (with regular expression)` 规则，添加需要自动部署的分支

- `\b(master|develop)\b`：只构建 `master`、`develop`

![image-20250408103036034](./assets/image-20250408103036034.png)



**保存设置**

保存设置后会自动进行一次扫描，然后再自动构建

![image-20250408103637714](./assets/image-20250408103637714.png)

![image-20250408103650268](./assets/image-20250408103650268.png)



#### 触发构建

**手动扫描**

点击 `立刻 Scan 多分支流水线`，将构建有更新的分支

![image-20250408103937818](./assets/image-20250408103937818.png)

**自动扫描**

在设置的触发器里面配置1分钟自动扫描

![image-20250408104146772](./assets/image-20250408104146772.png)

**Webhook**

安装插件：[Multibranch Scan Webhook Trigger](JENKINS_URL/multibranch-webhook-trigger/invoke?token=TOKENHERE)

在设置的触发器里面配置Webhook，Token自定义设置，我这里是配置的项目名称ateng_kubernetes_springboot_multibranch

![image-20250408104822269](./assets/image-20250408104822269.png)

在Git仓库的Webhook配置URL：

JENKINS_URL/multibranch-webhook-trigger/invoke?token=ateng_kubernetes_springboot_multibranch



## 使用自定义镜像

自定义构建容器镜像，用于Jenkins Agent的镜像，参考文档：[Agent镜像构建](/work/service/jenkins/images/)

以下示例是直接用的all这个镜像，如果需要使用特定的镜像请自行设置

### Docker Cloud

#### 配置templates

配置以下信息

- Labels: 流水线脚本匹配该镜像的标签，这里是 jenkins-agent-tools-all
- Enabled：勾选
- Name：Agent的名称（没啥用），和Labels保持一致
- Docker Image: 自定义构建的镜像名称，这里是 registry.lingo.local/service/jenkins-agent-tools-all:1.0.0
- Container settings: 主要是配置挂载卷，用户保存工具下载的依赖/软件等Mounts
    - Mounts:

```
type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock,readonly
type=bind,source=/var/jenkins/agent,target=/data/agent
type=bind,source=/var/jenkins/maven,target=/data/maven
type=bind,source=/var/jenkins/nodejs,target=/data/nodejs
type=bind,source=/var/jenkins/python,target=/data/python
type=bind,source=/var/jenkins/golang,target=/data/golang
```

使用docker命令有两种方式，一是挂载宿主机的socket，而是使用环境变量`DOCKER_HOST` 指定远程API地址

注意需要在宿主机创建这些目录并设置正确的权限

```
mkdir -p /var/jenkins/{agent,maven,nodejs,python,golang}
chown -R 1001:1001 /var/jenkins
```

- 用法：选择 Only build jobs with label expressions matching this node

![image-20250412211205861](./assets/image-20250412211205861.png)

#### 配置流水线脚本

设置 `agent.label` 和 Template 的 `label` 匹配

```groovy
pipeline {
    agent {
        label "jenkins-agent-tools-all"
    }

    // 环境变量
    environment {
        // Git仓库
        GIT_CREDENTIALS_ID = "gitlab_ssh"  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_URL = "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git"  // GitLab 仓库地址
        GIT_BRANCH = "master"  // 要拉取的分支
        
        // Docker镜像和仓库
        DOCKER_IMAGE = "springboot3"  // 构建的镜像名称，标签自动生成
        DOCKER_REGISTRY = "registry.lingo.local/ateng"  // 镜像仓库地址
        DOCKER_CREDENTIALS_ID = "harbor_admin"  // 镜像仓库凭证
    }

    stages {

        stage("设置并查看环境变量") {
            steps {
                script {
                    // 镜像标签生成规则
                    env.DOCKER_TAG = "$GIT_BRANCH-build-$BUILD_NUMBER"
                }
                sh "env"
            }
        }

        stage('拉取代码') {
            steps {
                script {
                    checkout([$class: "GitSCM",
                        branches: [[name: "*/${GIT_BRANCH}"]],
                        userRemoteConfigs: [[
                            url: "${GIT_URL}",
                            credentialsId: "${GIT_CREDENTIALS_ID}"
                        ]]
                    ])
                }
            }
        }

        stage('项目打包') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('构建容器镜像') {
            steps {
                sh 'docker build -f Dockerfile -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
            }
        }

        stage('推送镜像到仓库') {
            steps {
                withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                    sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                }
            }
        }

        stage("重启服务") {
            steps {
                sh "docker stop ateng-springboot3-demo &> /dev/null || true"
                sh "docker rm ateng-springboot3-demo &> /dev/null || true"
                sh """
                docker run -d --restart=always \
                    --name ateng-springboot3-demo \
                    -p 18080:8080 \
                    $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG \
                    -server \
                    -Xms128m -Xmx1024m \
                    -jar app.jar \
                    --server.port=8080 \
                    --spring.profiles.active=prod
                """
            }
        }
        
    }
    
}
```



### Kubernetes Cloud

#### 配置templates

添加命名为 `jenkins-agent-tools-all` 的 Pod templates

填写以下参数：

- 名称：Pod templates的名称
- 命名空间：agent容器运行在k8s中的命名空间。为了降低耦合性，不配置命名空间，使用kubeconfig默认的。如果kubeconfig是配置的集群管理员，那么可以指定以下命名空间。
- 标签列表：用于后续流水线脚本（Jenkinsfile）的agent.kubernetes的label配置，匹配Pod templates
- Raw YAML for the Pod：填写初始的yaml
- 工作空间卷：选择 `Host Path Workspace Volume` ，或者 `Generic Ephemeral Volume` 、`NFS Workspace Volume`。

基础配置

![image-20250412222808653](./assets/image-20250412222808653.png)

Raw YAML for the Pod，相当于这是个初始的yaml模版，其他的设置会覆盖这个yaml。

```yaml
apiVersion: "v1"
kind: "Pod"
metadata:
  name: "auto-generate"
spec:
  affinity:
    nodeAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - preference:
            matchExpressions:
              - key: "node-role.kubernetes.io/worker"
                operator: "In"
                values:
                  - "ci"
          weight: 1
  containers:
    - name: "jnlp"
      image: "jenkins/inbound-agent:3301.v4363ddcca_4e7-3-jdk21"
      imagePullPolicy: "IfNotPresent"
      volumeMounts:
        - mountPath: "/etc/localtime"
          name: "localtime"
          readOnly: true
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources: {}
    - name: "agent-tools"
      image: "registry.lingo.local/service/jenkins-agent-tools-all:1.0.0"
      imagePullPolicy: "IfNotPresent"
      command:
        - "sleep"
      args:
        - "infinity"
      volumeMounts:
        - mountPath: "/data"
          name: "data"
      env:
        - name: "TZ"
          value: "Asia/Shanghai"
      resources:
        limits:
          cpu: '2'
          memory: 2Gi
        requests:
          cpu: 100m
          memory: 256Mi
  volumes:
    - hostPath:
        path: "/etc/localtime"
      name: "localtime"
    - hostPath:
        path: "/var/jenkins/data"
      name: "data"
```

工作空间卷，需要保证 `1000:1000` 用户有权限，我这里是使用的 `Host Path Workspace Volume`

```
mkdir -p /var/jenkins /var/jenkins/data
chown -R 1000:1000 /var/jenkins
```

![image-20250414092409852](./assets/image-20250414092409852.png)



#### 配置流水线脚本

设置 `agent.kubernetes.label` 和 Template 的 `label` 匹配

```groovy
pipeline {
    agent {
        kubernetes {
            label 'jenkins-agent-tools-all'  // Pod templates中设置的标签
        }
    }

    // 环境变量
    environment {
        // Git仓库
        GIT_CREDENTIALS_ID = "gitlab_ssh"  // Jenkins 中配置的 GitLab 凭据 ID
        GIT_URL = "ssh://git@192.168.1.51:22/kongyu/springboot-demo.git"  // GitLab 仓库地址
        GIT_BRANCH = "master"  // 要拉取的分支
        
        // Docker镜像和仓库
        DOCKER_IMAGE = "springboot3"  // 构建的镜像名称，标签自动生成
        DOCKER_REGISTRY = "registry.lingo.local/ateng"  // 镜像仓库地址
        DOCKER_CREDENTIALS_ID = "harbor_admin"  // 镜像仓库凭证
        DOCKER_HOST = "tcp://192.168.1.19:2375"  // Docker 主机的远程主机
        
        // Kubernetes的kubeconfig凭证
        KUBECONFIG_CREDENTIAL_ID = "kubeconfig_local_k8s_ateng_kongyu"
    }

    stages {

        stage('设置并查看环境变量') {
            steps {
                container('agent-tools') {
                    script {
                        // 镜像标签生成规则
                        env.DOCKER_TAG = "$GIT_BRANCH-build-$BUILD_NUMBER"
                        sh "env"
                    }
                }
            }
        }

       stage('拉取代码') {
            steps {
                container('agent-tools') {
                    script {
                        sh "ls -la && pwd && hostname"
                        sh "cat /etc/passwd"
                        checkout([$class: "GitSCM",
                            branches: [[name: "*/${GIT_BRANCH}"]],
                            userRemoteConfigs: [[
                                url: "${GIT_URL}",
                                credentialsId: "${GIT_CREDENTIALS_ID}"
                            ]]
                        ])
                    }
                }
            }
        }

        stage('项目打包') {
            steps {
                container('agent-tools') {
                    script {
                        sh 'mvn clean package -DskipTests'
                    }
                }
            }
        }

        stage('构建容器镜像') {
            steps {
                container('agent-tools') {
                    script {
                        sh 'docker build -f Dockerfile -t $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG .'
                    }
                }
            }
        }

        stage('推送镜像到仓库') {
            steps {
                container('agent-tools') {
                    withDockerRegistry([credentialsId: "$DOCKER_CREDENTIALS_ID", url: "http://$DOCKER_REGISTRY"]) {
                        sh 'docker push $DOCKER_REGISTRY/$DOCKER_IMAGE:$DOCKER_TAG'
                    }
                }
            }
        }

        stage('重启服务') {
            steps {
                container('agent-tools') {
                    withCredentials([file(credentialsId: "$KUBECONFIG_CREDENTIAL_ID", variable: "KUBECONFIG")]) {
                        sh 'envsubst < deploy.yaml | kubectl apply -f -'
                    }
                }
            }
        }

    }
    
}
```

