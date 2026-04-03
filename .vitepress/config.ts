import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/Ateng-Linux',
    title: "运维技术网站",
    description: "",
    themeConfig: {
        siteTitle: '阿腾集团',
        logo: '/logo.svg',

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },

            {
                text: '基础设施',
                items: [
                    { text: 'Linux 服务', link: '/work/service/' },
                    { text: 'Shell 脚本', link: '/work/shell/' },
                    { text: '系统与软件', link: '/work/syssoft/' }
                ]
            },

            {
                text: '容器与虚拟化',
                items: [
                    { text: 'Docker', link: '/work/docker/' },
                    { text: 'Kubernetes', link: '/work/kubernetes/' },
                    { text: 'KVM 虚拟化', link: '/work/kvm/' }
                ]
            },

            {
                text: '大数据',
                items: [
                    { text: '大数据平台', link: '/work/bigdata/' }
                ]
            },

            {
                text: '关于',
                items: [
                    { text: '运维技术网站', link: 'https://atengk.github.io/linux/' },
                    { text: '后端技术网站', link: 'https://atengk.github.io/java/' },
                    { text: '前端技术网站', link: 'https://atengk.github.io/vue/' },
                    { text: '工程化框架技术网站', link: 'https://atengk.github.io/project/' },
                    { text: 'VitePress', link: 'https://vitejs.cn/vitepress/' }
                ]
            }
        ],

        sidebar: {
            '/work/service/': [
                {
                    text: '服务器管理',
                    collapsed: true,
                    items: [
                        {text: '基础配置', link: '/work/service/00-basic/README'},
                        {text: '网络配置', link: '/work/service/network/README'},
                        {text: '软件源配置', link: '/work/service/mirrors/README'},
                        {text: '系统性能监控', link: '/work/linux/metrics/README'},
                        {text: '时间同步服务', link: '/work/service/chrony/README'}
                    ]
                },
                {
                    text: '安全管理',
                    collapsed: true,
                    items: [
                        {
                            text: '用户管理',
                            items: [
                                {text: '用户管理', link: '/work/service/security/user/README'}
                            ]
                        },
                        {
                            text: 'OpenSSH',
                            items: [
                                {text: '使用文档', link: '/work/service/openssh/OPS'},
                                {text: '升级服务', link: '/work/service/openssh/v10.0/README'}
                            ]
                        },
                        {
                            text: 'TLS证书',
                            items: [
                                {text: 'cfssl创建证书', link: '/work/service/security/tls/tls-cfssl/v1.6.5/README'},
                                {text: 'openssl创建证书', link: '/work/service/security/tls/tls-openssl/README'}
                            ]
                        }
                    ]
                },
                {
                    text: '存储服务',
                    collapsed: true,
                    items: [
                        {
                            text: '文件共享',
                            items: [
                                {text: 'NFS', link: '/work/service/nfs/README'},
                                {text: 'Samba', link: '/work/service/samba/README'},
                                {text: 'VSFTP', link: '/work/service/ftp/README'}
                            ]
                        },
                        {
                            text: '对象/分布式存储',
                            items: [
                                {
                                    text: 'MinIO',
                                    items: [
                                        {text: '安装文档', link: '/work/service/minio/v20241107/README'},
                                        {text: '使用文档', link: '/work/service/minio/OPS'}
                                    ]
                                },
                                {
                                    text: 'JuiceFS',
                                    items: [
                                        {text: '安装文档', link: '/work/service/juicefs/v1.2.1/README'},
                                        {text: '使用文档', link: '/work/service/juicefs/OPS'}
                                    ]
                                },
                                {
                                    text: 'Ceph',
                                    items: [
                                        {text: 'Quincy', link: '/work/service/ceph/quincy/README'},
                                        {text: 'Reef', link: '/work/service/ceph/reef/README'},
                                        {text: '使用文档', link: '/work/service/ceph/README'}
                                    ]
                                }
                            ]
                        },
                        {
                            text: '备份工具',
                            items: [
                                {text: 'Restic', link: '/work/service/restic/README'}
                            ]
                        }
                    ]
                },
                {
                    text: '数据库服务',
                    collapsed: true,
                    items: [
                        {
                            text: '关系型数据库',
                            items: [
                                {
                                    text: 'MySQL',
                                    items: [
                                        {text: '编译安装', link: '/work/service/mysql/v8.4.3/make/README'},
                                        {text: '安装文档', link: '/work/service/mysql/v8.4.3/README'},
                                        {text: 'MGR集群', link: '/work/service/mysql/v8.4.3/MGR'},
                                        {text: '使用文档', link: '/work/service/mysql/OPS'}
                                    ]
                                },
                                {text: 'MariaDB Galera', link: '/work/service/mariadb/v11.4.4/README'},
                                {
                                    text: 'PostgreSQL',
                                    items: [
                                        {text: '编译安装', link: '/work/service/postgresql/v17.2.0/README'},
                                        {text: 'PostGIS', link: '/work/service/postgresql/v17.2.0/postgis/README'},
                                        {text: '使用文档', link: '/work/service/postgresql/OPS'}
                                    ]
                                },
                                {
                                    text: 'OceanBase',
                                    items: [
                                        {text: '编译文档', link: '/work/service/oceanbase/BUILD'},
                                        {text: '安装文档', link: '/work/service/oceanbase/README'}
                                    ]
                                }
                            ]
                        },
                        {
                            text: 'NoSQL / KV',
                            items: [
                                {
                                    text: 'Redis',
                                    items: [
                                        {text: '编译文档', link: '/work/service/redis/v8.2.2/BUILD'},
                                        {text: '安装文档', link: '/work/service/redis/v8.2.2/README'},
                                        {text: '使用文档', link: '/work/service/redis/OPS'}
                                    ]
                                },
                                {
                                    text: 'ETCD',
                                    items: [
                                        {text: '安装文档', link: '/work/service/etcd/v3.5.17/README'},
                                        {text: '使用文档', link: '/work/service/etcd/OPS'}
                                    ]
                                },
                                {
                                    text: 'FoundationDB',
                                    items: [
                                        {text: '安装文档', link: '/work/service/foundationdb/v7.1.38/README'},
                                        {text: '使用文档', link: '/work/service/foundationdb/OPS'}
                                    ]
                                }
                            ]
                        },
                        {
                            text: '搜索引擎',
                            items: [
                                {
                                    text: 'ElasticSearch',
                                    items: [
                                        {
                                            text: '单机模式',
                                            link: '/work/service/elastic/elasticsearch/standalone/README'
                                        },
                                        {text: '集群模式', link: '/work/service/elastic/elasticsearch/cluster/README'}
                                    ]
                                },
                                {
                                    text: 'OpenSearch',
                                    items: [
                                        {text: '1.x', link: '/work/service/opensearch/v1.3.19/README'},
                                        {text: '2.x', link: '/work/service/opensearch/v2.18.0/README'},
                                        {text: '使用文档', link: '/work/service/opensearch/OPS'}
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    text: '消息队列',
                    collapsed: true,
                    items: [
                        {
                            text: 'RabbitMQ',
                            items: [
                                {text: '安装文档', link: '/work/service/rabbitmq/README'},
                                {text: '使用文档', link: '/work/service/rabbitmq/OPS'}
                            ]
                        }
                    ]
                },
                {
                    text: 'Web服务',
                    collapsed: true,
                    items: [
                        {
                            text: 'Nginx',
                            items: [
                                {text: '安装文档', link: '/work/service/nginx/v1.27.3/README'},
                                {text: '使用文档', link: '/work/service/nginx/OPS'}
                            ]
                        },
                        {
                            text: 'OpenResty',
                            items: [
                                {text: '安装文档', link: '/work/service/openresty/v1.27.1.2/README'},
                                {text: '使用文档', link: '/work/service/openresty/OPS'}
                            ]
                        },
                        {
                            text: 'Haproxy',
                            items: [
                                {text: '安装文档', link: '/work/service/haproxy/README'},
                                {text: '使用文档', link: '/work/service/haproxy/OPS'}
                            ]
                        }
                    ]
                },
                {
                    text: 'CI/CD',
                    collapsed: true,
                    items: [
                        {
                            text: 'Jenkins',
                            items: [
                                {text: '安装文档', link: '/work/service/jenkins/README'},
                                {text: '使用文档', link: '/work/service/jenkins/OPS'},
                                {text: 'Agent镜像构建', link: '/work/service/jenkins/images/README'},
                                {text: 'Builder方式', link: '/work/service/jenkins/images/README_BUILER'}
                            ]
                        },
                        {
                            text: 'Argo CD',
                            items: [
                                {text: '安装文档', link: '/work/service/argo-cd/README'},
                                {text: '使用文档', link: '/work/service/argo-cd/OPS'}
                            ]
                        }
                    ]
                },
                {
                    text: '可观测',
                    collapsed: true,
                    items: [
                        {
                            text: '链路追踪',
                            items: [
                                {text: 'OpenTelemetry', link: '/work/service/opentelemetry/README'},
                                {text: 'Jaeger', link: '/work/service/jaeger/README'}
                            ]
                        },
                        {
                            text: '监控',
                            items: [
                                {text: 'Beszel', link: '/work/service/beszel/README'},
                                {text: '1panel', link: '/work/service/1panel/README'},
                                {text: 'Prometheus', link: '/work/service/prometheus/v3.2.1/README'},
                                {text: 'Grafana', link: '/work/service/grafana/v11.5.3/README'},
                                {text: 'Alertmanager', link: '/work/service/alertmanager/v0.28.1/README'}
                            ]
                        }
                    ]
                },
                {
                    text: '开发工具',
                    collapsed: true,
                    items: [
                        {
                            text: 'Java',
                            items: [
                                {text: 'OpenJDK8', link: '/work/service/openjdk/openjdk8/README'},
                                {text: 'OpenJDK11', link: '/work/service/openjdk/openjdk11/README'},
                                {text: 'OpenJDK17', link: '/work/service/openjdk/openjdk17/README'},
                                {text: 'OpenJDK21', link: '/work/service/openjdk/openjdk21/README'},
                                {text: '使用文档', link: '/work/service/openjdk/OPS'}
                            ]
                        },
                        {
                            text: '构建工具',
                            items: [
                                {text: 'Maven', link: '/work/service/maven/v3.9.9/README'}
                            ]
                        },
                        {
                            text: '开发环境',
                            items: [
                                {text: 'Git', link: '/work/service/git/v2.49.0/README'},
                                {text: 'Node.js', link: '/work/service/nodejs/v22.14.0/README'},
                                {text: 'NVM', link: '/work/service/nvm/v0.40.2/README'},
                                {text: 'Python', link: '/work/service/python/v3.13.3/README'}
                            ]
                        },
                        {
                            text: 'SpringCloud Alibaba',
                            items: [
                                {text: 'Nacos', link: '/work/service/springcloudalibaba/nacos'},
                                {text: 'Sentinel', link: '/work/service/springcloudalibaba/sentinel/README'},
                                {text: 'Seata', link: '/work/service/springcloudalibaba/seata/README'},
                                {text: 'RocketMQ', link: '/work/service/springcloudalibaba/rocketmq/standalone/README'}
                            ]
                        }
                    ]
                },
                {
                    text: '流媒体服务',
                    collapsed: true,
                    items: [
                        {text: 'FFmpeg', link: '/work/service/ffmpeg/README'},
                        {
                            text: 'ZLMediaKit',
                            items: [
                                {text: '安装文档', link: '/work/service/zlmediakit/README'},
                                {text: '使用文档', link: '/work/service/zlmediakit/OPS'}
                            ]
                        },
                        {
                            text: 'SRS',
                            items: [
                                {text: '安装文档', link: '/work/service/srs/README'},
                                {text: '使用文档', link: '/work/service/srs/OPS'}
                            ]
                        }
                    ]
                },
                {
                    text: '其他服务',
                    collapsed: true,
                    items: [
                        {text: '内网穿透FRP', link: '/work/service/frp/README'},
                        {text: 'CoreDNS', link: '/work/service/coredns/README'}
                    ]
                }
            ],

            '/work/shell/': [

                {
                    text: 'Spring',
                    items: [
                        {text: '应用管理', link: '/work/shell/java/README'}
                    ]
                },
                {
                    text: '服务备份脚本',
                    items: [
                        {text: 'mysql', link: '/work/shell/backups/mysql/README'},
                        {text: 'postgresql', link: '/work/shell/backups/postgresql/README'},
                        {text: 'etcd', link: '/work/shell/backups/etcd/README'},
                        {text: 'minio', link: '/work/shell/backups/minio/README'},
                        {text: 'mongodb', link: '/work/shell/backups/mongodb/README'}
                    ]
                }
            ],

            '/work/docker/': [

                {
                    text: '使用文档',
                    items: [
                        {text: '安装文档', link: '/work/docker/deploy/v27.3.1/README'},
                        {text: '快速安装文档', link: '/work/docker/deploy/quick_install'},
                        {text: '使用文档', link: '/work/docker/OPS'}
                    ]
                },
                {
                    text: 'Dockerfile',
                    items: [
                        {text: 'JDK和应用', link: '/work/docker/dockerfile/java/README'},
                        {text: 'kkFileView', link: '/work/docker/dockerfile/kkfileview/v4.4.0/README'},
                        {
                            text: 'kkFileView-Alpine',
                            link: '/work/docker/dockerfile/kkfileview/v4.4.0/alpine/README'
                        },
                        {text: '操作系统集合', link: '/work/docker/dockerfile/os/README'}
                    ]
                },
                {
                    text: '服务安装文档',
                    items: [
                        {
                            text: '数据库',
                            collapsed: true,
                            items: [
                                {text: 'mysql', link: '/work/docker/service/mysql/README'},
                                {text: 'postgresql', link: '/work/docker/service/postgresql/README'},
                                {text: 'mongodb', link: '/work/docker/service/mongodb/README'},
                                {text: 'redis', link: '/work/docker/service/redis/README'},
                                {text: 'TiDB', link: '/work/docker/service/tidb/README'},
                                {text: 'OceanBase CE', link: '/work/docker/service/oceanbase/README'},
                                {text: '达梦数据库', link: '/work/docker/service/dm8/v20241230/README'}
                            ]
                        },
                        {
                            text: '中间件',
                            collapsed: true,
                            items: [
                                {text: 'kafka', link: '/work/docker/service/kafka/README'},
                                {text: 'kafka-ui', link: '/work/docker/service/kafka-ui/README'},
                                {text: 'rabbitmq', link: '/work/docker/service/rabbitmq/README'},
                                {text: 'rocketmq', link: '/work/docker/service/rocketmq/README'},
                                {text: 'zookeeper', link: '/work/docker/service/zookeeper/README'},
                                {text: 'nacos', link: '/work/docker/service/nacos/README'},
                                {text: 'EMQX', link: '/work/docker/service/emqx/README'}
                            ]
                        },
                        {
                            text: '搜索与分析',
                            collapsed: true,
                            items: [
                                {text: 'elasticsearch', link: '/work/docker/service/elasticsearch/README'},
                                {text: 'opensearch', link: '/work/docker/service/opensearch/README'},
                                {text: 'elastic-view', link: '/work/docker/service/elastic-view/README'}
                            ]
                        },
                        {
                            text: '存储与文件',
                            collapsed: true,
                            items: [
                                {text: 'minio', link: '/work/docker/service/minio/README'},
                                {text: 'Samba', link: '/work/docker/service/samba/README'},
                                {text: 'VSFTP', link: '/work/docker/service/vsftp/README'},
                                {
                                    text: 'Nextcloud私有云存储平台',
                                    link: '/work/docker/service/nextcloud/README'
                                },
                                {text: 'Cloudreve网盘服务', link: '/work/docker/service/cloudreve/README'},
                                {text: 'FileGator文件管理器', link: '/work/docker/service/filegator/README'},
                                {text: 'RustFS', link: '/work/docker/service/rustfs/README'}
                            ]
                        },
                        {
                            text: 'DevOps / 运维',
                            collapsed: true,
                            items: [
                                {text: 'jenkins', link: '/work/docker/service/jenkins/README'},
                                {text: 'gitlab', link: '/work/docker/service/gitlab/README'},
                                {text: 'gitea', link: '/work/docker/service/gitea/README'},
                                {text: 'jumpserver', link: '/work/docker/service/jumpserver/README'},
                                {
                                    text: 'DPanel-Docker可视化管理面板',
                                    link: '/work/docker/service/dpanel/README'
                                }
                            ]
                        },
                        {
                            text: '应用服务',
                            collapsed: true,
                            items: [
                                {text: 'Java应用', link: '/work/docker/service/java/README'},
                                {text: 'nginx', link: '/work/docker/service/nginx/README'},
                                {text: 'doris', link: '/work/docker/service/doris/README'},
                                {text: 'kkfileview', link: '/work/docker/service/kkfileview/v4.4.0/README'},
                                {text: 'OnlyOffice', link: '/work/docker/service/onlyoffice/README'},
                                {text: 'Nexus 3', link: '/work/docker/service/nexus/README'},
                                {text: 'Milvus', link: '/work/docker/service/milvus/README'},
                                {text: 'Snail-Job', link: '/work/docker/service/snail-job/README'},
                                {text: '禅道', link: '/work/docker/service/zentao/README'},
                                {
                                    text: 'BaseMetas Fileview',
                                    link: '/work/docker/service/basemetas-fileview/README'
                                }
                            ]
                        },
                        {
                            text: '其他',
                            collapsed: true,
                            items: [
                                {text: 'windows', link: '/work/docker/service/windows/README'},
                                {text: 'mind map 思维导图', link: '/work/docker/service/mind-map/README'}
                            ]
                        }
                    ]
                }
            ],

            '/work/kubernetes/': [

                {
                    text: '使用文档',
                    collapsed: true,
                    items: [
                        {text: 'K8S使用文档', link: '/work/kubernetes/OPS'},
                        {text: 'Helm使用文档', link: '/work/kubernetes/deploy/helm/OPS'}
                    ]
                },
                {
                    text: '安装文档',
                    collapsed: true,
                    items: [
                        {text: 'kubekey', link: '/work/kubernetes/deploy/kubekey/v3.1.7/README'},
                        {text: 'kubesphere3', link: '/work/kubernetes/deploy/kubesphere/v3.4.1/README'},
                        {text: 'kubesphere4', link: '/work/kubernetes/deploy/kubesphere/v4.1.2/README'},
                        {text: 'kubeadm', link: '/work/kubernetes/deploy/kubeadm/v1.23.12/README'},
                        {text: 'kubevirt', link: '/work/kubernetes/deploy/kubevirt/deploy/v1.3.0/README'},
                        {text: 'helm', link: '/work/kubernetes/deploy/helm/README'}
                    ]
                },
                {
                    text: '镜像仓库',
                    collapsed: true,
                    items: [
                        {text: 'Harbor', link: '/work/kubernetes/deploy/harbor/v2.12.0/README'},
                        {text: 'Registry', link: '/work/kubernetes/deploy/harbor/registry/README'}
                    ]
                },
                {
                    text: '网络服务',
                    collapsed: true,
                    items: [
                        {text: 'Calico', link: '/work/kubernetes/deploy/network/calico/README'},
                        {text: 'Flannel', link: '/work/kubernetes/deploy/network/flannel/README'},
                        {text: 'Cilium', link: '/work/kubernetes/deploy/network/cilium/README'},
                        {text: '插件', link: '/work/kubernetes/deploy/network/plugins/README'},
                        {text: '卸载网络', link: '/work/kubernetes/deploy/network/uninstall'}
                    ]
                },
                {
                    text: '存储服务',
                    collapsed: true,
                    items: [
                        {
                            text: 'OpenEBS',
                            items: [
                                {
                                    text: 'localpv',
                                    link: '/work/kubernetes/deploy/storage/openebs/localpv-provisioner/v4.1.0/README'
                                },
                                {
                                    text: 'nfs',
                                    link: '/work/kubernetes/deploy/storage/openebs/nfs-provisioner/v0.11.0/README'
                                }
                            ]
                        },
                        {
                            text: 'NFS',
                            items: [
                                {text: 'client', link: '/work/kubernetes/deploy/storage/nfs/nfs-client/README'},
                                {text: 'server', link: '/work/kubernetes/deploy/storage/nfs/nfs-server/README'}
                            ]
                        },
                        {
                            text: '其他存储',
                            items: [
                                {
                                    text: 'juicefs-csi',
                                    link: '/work/kubernetes/deploy/storage/juicefs-csi/v0.24.4/README'
                                },
                                {text: 'rook-ceph', link: '/work/kubernetes/deploy/storage/rook/ceph/README'},
                                {text: 'rook-nfs', link: '/work/kubernetes/deploy/storage/rook/nfs/README'},
                                {text: 'longhorn', link: '/work/kubernetes/deploy/storage/longhorn/v1.4.0/README'},
                                {text: 'kadalu', link: '/work/kubernetes/deploy/storage/kadalu/v1.0.0/README'}
                            ]
                        }
                    ]
                },

                // ===== 核心大块（重点分组）=====
                {
                    text: '中间件服务',
                    collapsed: true,
                    items: [
                        {
                            text: '数据存储',
                            collapsed: true,
                            items: [
                                {
                                    text: 'Redis',
                                    items: [
                                        {text: '单机', link: '/work/kubernetes/service/redis/v8.0.1/standalone/README'},
                                        {
                                            text: '主从',
                                            link: '/work/kubernetes/service/redis/v8.0.1/replication/README'
                                        },
                                        {text: '哨兵', link: '/work/kubernetes/service/redis/v8.0.1/sentinel/README'},
                                        {text: '集群', link: '/work/kubernetes/service/redis/v8.0.1/cluster/README'}
                                    ]
                                },
                                {text: 'Valkey', link: '/work/kubernetes/service/redis/valkey/v8.0.2/README'},
                                {text: 'MariaDB Galera', link: '/work/kubernetes/service/mariadb/v11.4.6/README'},
                                {
                                    text: 'PostgreSQL',
                                    items: [
                                        {
                                            text: '单机',
                                            link: '/work/kubernetes/service/postgresql/v17.2.0/standalone/README'
                                        },
                                        {
                                            text: '主从',
                                            link: '/work/kubernetes/service/postgresql/v17.2.0/replication/README'
                                        },
                                        {text: '集群', link: '/work/kubernetes/service/postgresql/v17.2.0/ha/README'}
                                    ]
                                },
                                {
                                    text: 'MongoDB',
                                    items: [
                                        {
                                            text: '单机',
                                            link: '/work/kubernetes/service/mongodb/v8.0.3/standalone/README'
                                        },
                                        {
                                            text: '副本集',
                                            link: '/work/kubernetes/service/mongodb/v8.0.3/replicaset/README'
                                        },
                                        {text: '分片', link: '/work/kubernetes/service/mongodb/v8.0.3/sharded/README'}
                                    ]
                                },
                                {
                                    text: 'MySQL',
                                    items: [
                                        {text: '单机', link: '/work/kubernetes/service/mysql/v8.4.3/standalone/README'},
                                        {
                                            text: '主从',
                                            link: '/work/kubernetes/service/mysql/v8.4.3/replication/README'
                                        },
                                        {text: 'metrics', link: '/work/kubernetes/service/mysql/v8.4.3/metrics/README'}
                                    ]
                                },
                                {text: 'Doris2', link: '/work/kubernetes/service/doris/v2.1.7/README'},
                                {text: 'Doris3', link: '/work/kubernetes/service/doris/v3.0.3/README'},
                                {text: 'Clickhouse', link: '/work/kubernetes/service/clickhouse/v25.1.3/README'}
                            ]
                        },

                        {
                            text: '消息队列',
                            collapsed: true,
                            items: [
                                {text: 'RabbitMQ', link: '/work/kubernetes/service/rabbitmq/v4.0.2/README'},
                                {text: 'Kafka-单机', link: '/work/kubernetes/service/kafka/v3.8.1/standalone/README'},
                                {text: 'Kafka-集群', link: '/work/kubernetes/service/kafka/v3.8.1/cluster/README'},
                                {text: 'Kafka-HA', link: '/work/kubernetes/service/kafka/v3.8.1/cluster-ha/README'},
                                {text: 'Kafka-认证', link: '/work/kubernetes/service/kafka/v3.8.1/auth/README'},
                                {text: 'Kafka UI', link: '/work/kubernetes/service/kafka-ui/v0.7.2/README'}
                            ]
                        },

                        {
                            text: 'CI/CD',
                            collapsed: true,
                            items: [
                                {text: 'Gitlab', link: '/work/kubernetes/service/gitlab/v17.6.1/README'},
                                {text: 'Gitea', link: '/work/kubernetes/service/gitea/v1.23.7/README'},
                                {text: 'Jenkins', link: '/work/kubernetes/service/jenkins/v2.492.3/README'},
                                {text: 'Argo CD', link: '/work/kubernetes/service/argo-cd/v2.14.8/README'},
                                {text: 'Sonarqube', link: '/work/kubernetes/service/sonarqube/v10.7.0/README'}
                            ]
                        },

                        {
                            text: '可观测',
                            collapsed: true,
                            items: [
                                {text: 'Prometheus', link: '/work/kubernetes/service/prometheus/v2.55.1/README'},
                                {text: 'Grafana', link: '/work/kubernetes/service/grafana/v11.5.3/README'},
                                {text: 'Loki', link: '/work/kubernetes/service/grafana-loki/v3.4.2/README'},
                                {text: 'Mimir', link: '/work/kubernetes/service/grafana-mimir/v2.15.1/README'},
                                {text: 'Tempo', link: '/work/kubernetes/service/grafana-tempo/v2.7.2/README'},
                                {text: 'Fluentd', link: '/work/kubernetes/service/fluentd/v.18.0/README'},
                                {text: 'Fluent Bit', link: '/work/kubernetes/service/fluent-bit/v3.2.10/README'},
                                {text: 'Logstash', link: '/work/kubernetes/service/logstash/v8.16.1/README'},
                                {text: 'SkyWalking', link: '/work/kubernetes/service/skywalking/v10.1.0/README'},
                                {text: 'Zipkin', link: '/work/kubernetes/service/zipkin/v3.5.0/README'},
                                {text: 'Jaeger', link: '/work/kubernetes/service/jaeger/v2.4.0/README'}
                            ]
                        },

                        {
                            text: '开发服务',
                            collapsed: true,
                            items: [
                                {text: 'Java应用', link: '/work/kubernetes/service/java-app/v1.1/README'},
                                {text: 'Snail-Job', link: '/work/kubernetes/service/snail-job/v1.4.0/README'},
                                {text: 'PowerJob', link: '/work/kubernetes/service/powerjob/v5.1.1/README'},
                                {
                                    text: 'Spring Boot Admin',
                                    link: '/work/kubernetes/service/springboot-admin/v3.3.0/README'
                                },
                                {text: 'Nacos', link: '/work/kubernetes/service/nacos/v2.4.3/README'},
                                {text: 'Seata', link: '/work/kubernetes/service/seata/README'},
                                {text: 'Sentinel', link: '/work/kubernetes/service/sentinel/README'}
                            ]
                        }
                    ]
                },

                {
                    text: '备份服务',
                    collapsed: true,
                    items: [
                        {text: 'Velero', link: '/work/kubernetes/deploy/backups/velero/v1.11.0/README'},
                        {text: 'ETCD-本地', link: '/work/kubernetes/deploy/backups/etcd/local/README'},
                        {text: 'ETCD-MinIO', link: '/work/kubernetes/deploy/backups/etcd/minio/README'},
                        {text: 'MySQL-本地', link: '/work/kubernetes/deploy/backups/mysql/local/README'},
                        {text: 'MySQL-MinIO', link: '/work/kubernetes/deploy/backups/mysql/minio/README'},
                        {text: 'PostgreSQL-本地', link: '/work/kubernetes/deploy/backups/postgresql/local/README'},
                        {text: 'PostgreSQL-MinIO', link: '/work/kubernetes/deploy/backups/postgresql/minio/README'}
                    ]
                },

                {
                    text: '服务测试',
                    collapsed: true,
                    items: [
                        {text: '存储测试', link: '/work/kubernetes/deploy/test/storage/README'},
                        {text: '网络测试', link: '/work/kubernetes/deploy/test/network/README'}
                    ]
                }
            ],

            '/work/kvm/': [
                {
                    text: 'KVM',
                    items: [
                        {text: '使用文档', link: '/work/kvm/README'}
                    ]
                }
            ],

            '/work/bigdata/': [

                {
                    text: '基础服务',
                    collapsed: true,
                    items: [
                        {
                            text: '基础配置',
                            items: [
                                {text: '基础配置', link: '/work/bigdata/00-basic/README'}
                            ]
                        },
                        {
                            text: 'JDK',
                            items: [
                                {text: '安装OpenJDK8', link: '/work/bigdata/01-jdk/README'}
                            ]
                        },
                        {
                            text: 'Zookeeper',
                            items: [
                                {text: '单机', link: '/work/bigdata/02-zookeeper/standalone/README'},
                                {text: '集群', link: '/work/bigdata/02-zookeeper/cluster/README'},
                                {text: '使用文档', link: '/work/bigdata/02-zookeeper/OPS'}
                            ]
                        },
                        {
                            text: 'Hadoop',
                            items: [
                                {text: '单机', link: '/work/bigdata/03-hadoop/standalone/README'},
                                {text: '集群', link: '/work/bigdata/03-hadoop/cluster/README'},
                                {text: '高可用集群', link: '/work/bigdata/03-hadoop/cluster-ha/README'},
                                {text: '使用文档', link: '/work/bigdata/03-hadoop/OPS'}
                            ]
                        },
                        {
                            text: 'Kafka',
                            items: [
                                {text: '单机', link: '/work/bigdata/03-kafka/standalone/README'},
                                {text: '集群', link: '/work/bigdata/03-kafka/cluster/README'},
                                {text: '高可用集群', link: '/work/bigdata/03-kafka/cluster-ha/README'},
                                {text: '使用文档', link: '/work/bigdata/03-kafka/OPS'}
                            ]
                        }
                    ]
                },
                {
                    text: '数据存储',
                    collapsed: true,
                    items: [
                        {
                            text: 'HBase',
                            items: [
                                {text: '单机', link: '/work/bigdata/04-hbase/standalone/README'},
                                {text: '集群', link: '/work/bigdata/04-hbase/cluster/README'},
                                {text: '高可用集群', link: '/work/bigdata/04-hbase/cluster-ha/README'},
                                {text: '使用文档', link: '/work/bigdata/04-hbase/OPS'}
                            ]
                        },
                        {
                            text: 'Hive',
                            items: [
                                {text: '单机', link: '/work/bigdata/04-hive/standalone/README'},
                                {text: '集群', link: '/work/bigdata/04-hive/cluster/README'},
                                {text: '高可用集群', link: '/work/bigdata/04-hive/cluster-ha/README'},
                                {text: '集成TEZ', link: '/work/bigdata/04-hive/tez/README'},
                                {text: '使用文档', link: '/work/bigdata/04-hive/OPS'}
                            ]
                        },
                        {
                            text: 'Doris',
                            items: [
                                {
                                    text: 'Doris v2.1.7',
                                    items: [
                                        {text: '单机', link: '/work/bigdata/05-doris/v2.1.7/standalone/README'},
                                        {text: '集群', link: '/work/bigdata/05-doris/v2.1.7/cluster/README'},
                                        {text: '高可用集群', link: '/work/bigdata/05-doris/v2.1.7/cluster-ha/README'}
                                    ]
                                },
                                {
                                    text: 'Doris v3.0.3',
                                    items: [
                                        {text: '单机', link: '/work/bigdata/05-doris/v3.0.3/standalone/README'},
                                        {text: '集群', link: '/work/bigdata/05-doris/v3.0.3/cluster/README'},
                                        {text: '高可用集群', link: '/work/bigdata/05-doris/v3.0.3/cluster-ha/README'}
                                    ]
                                },
                                {text: '使用文档', link: '/work/bigdata/05-doris/OPS'}
                            ]
                        },
                        {
                            text: 'Iceberg',
                            items: [
                                {text: '使用文档', link: '/work/bigdata/06-iceberg/README'}
                            ]
                        }
                    ]
                },
                {
                    text: '数据计算',
                    collapsed: true,
                    items: [
                        {
                            text: 'Spark',
                            items: [
                                {text: '单机', link: '/work/bigdata/05-spark/standalone/README'},
                                {text: '集群', link: '/work/bigdata/05-spark/cluster/README'},
                                {text: '高可用集群', link: '/work/bigdata/05-spark/cluster-ha/README'},
                                {text: 'YARN', link: '/work/bigdata/05-spark/yarn/README'},
                                {
                                    text: 'Kubernetes Operator',
                                    link: '/work/bigdata/05-spark/kubernetes-operator/README'
                                },
                                {
                                    text: 'Operator使用文档',
                                    link: '/work/bigdata/05-spark/kubernetes-operator/examples/README'
                                },
                                {text: '集成Hive', link: '/work/bigdata/05-spark/hive/README'},
                                {text: '使用文档', link: '/work/bigdata/05-spark/OPS'}
                            ]
                        },
                        {
                            text: 'Flink',
                            items: [
                                {text: '单机', link: '/work/bigdata/05-flink/standalone/README'},
                                {text: '集群', link: '/work/bigdata/05-flink/cluster/README'},
                                {text: '高可用集群', link: '/work/bigdata/05-flink/cluster-ha/README'},
                                {text: 'YARN', link: '/work/bigdata/05-flink/yarn/README'},
                                {
                                    text: 'Kubernetes Operator',
                                    link: '/work/bigdata/05-flink/kubernetes-operator/README'
                                },
                                {
                                    text: 'Operator使用文档',
                                    link: '/work/bigdata/05-flink/kubernetes-operator/examples/README'
                                },
                                {text: 'Flink CDC', link: '/work/bigdata/05-flink/cdc/README'},
                                {text: '使用文档', link: '/work/bigdata/05-flink/OPS'}
                            ]
                        }
                    ]
                },
                {
                    text: '调度平台',
                    collapsed: true,
                    items: [
                        {
                            text: 'Dolphinscheduler',
                            items: [
                                {text: '单机', link: '/work/bigdata/06-dolphinscheduler/standalone/README'},
                                {text: '集群', link: '/work/bigdata/06-dolphinscheduler/cluster/README'}
                            ]
                        }
                    ]
                }
            ],

            '/work/syssoft/': [

                {
                    text: '操作系统',
                    items: [
                        {text: 'Windows', link: '/work/syssoft/os/windows/README'},
                        {text: 'OpenEuler', link: '/work/syssoft/os/openeuler/README'},
                        {text: 'CentOS', link: '/work/syssoft/os/centos/README'}
                    ]
                },
                {
                    text: '开发软件',
                    items: [
                        {text: 'JDK', link: '/work/syssoft/dev/jdk/README'},
                        {text: 'Maven', link: '/work/syssoft/dev/maven/README'},
                        {text: 'Git', link: '/work/syssoft/dev/git/README'},
                        {text: 'IntelliJ IDEA', link: '/work/syssoft/dev/idea/README'},
                        {text: 'DataGrip', link: '/work/syssoft/dev/datagrip/README'}
                    ]
                },
                {
                    text: '系统软件',
                    items: [
                        {text: '常用软件', link: '/work/syssoft/software/primary/README'},
                        {text: '其他软件', link: '/work/syssoft/software/others/README'}
                    ]
                },
                {
                    text: '相关文档',
                    items: [
                        {text: '技术文档', link: '/work/syssoft/doc/nb/README'},
                        {text: '其他文档', link: '/work/syssoft/doc/others/README'}
                    ]
                }
            ],
        },

        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/atengk',
                ariaLabel: 'GitHub'
            },
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="fav_grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#38bdf8;stop-opacity:1" /><stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" /></linearGradient><filter id="glow_icon" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="M40 70 L60 30 L80 70" fill="none" stroke="url(#fav_grad)" stroke-width="10" stroke-linecap="round" filter="url(#glow_icon)" /><path d="M40 45 L80 45" fill="none" stroke="url(#fav_grad)" stroke-width="10" stroke-linecap="round" filter="url(#glow_icon)" /></svg>'
                },
                link: 'https://atengk.github.io',
                ariaLabel: '阿腾技术网站'
            },
            {
                icon: {
                    svg: '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="726.000000pt" height="726.000000pt" viewBox="0 0 726.000000 726.000000"><g transform="translate(0.000000,726.000000) scale(0.100000,-0.100000)" stroke="none"><path fill="#18a058" d="M3255 7239 c-112 -39 -191 -120 -230 -238 -14 -43 -17 -88 -17 -237 0 -144 -3 -186 -14 -195 -8 -6 -14 -9 -14 -6 0 3 -23 -1 -52 -9 -28 -9 -60 -17 -71 -19 -10 -3 -28 -7 -40 -11 -12 -5 -26 -8 -32 -9 -5 -1 -17 -4 -25 -7 -8 -3 -53 -19 -100 -34 -47 -15 -89 -31 -94 -36 -6 -4 -16 -8 -24 -8 -15 0 -68 -22 -114 -46 -16 -9 -28 -12 -28 -7 0 4 -4 4 -8 -2 -6 -9 -103 -58 -109 -56 -2 0 -46 -24 -99 -54 -53 -30 -100 -55 -105 -55 -5 0 -9 -3 -9 -7 0 -9 -57 -43 -71 -43 -5 0 -69 60 -142 133 -132 130 -163 152 -264 185 -76 24 -223 -4 -292 -57 -56 -42 -441 -432 -466 -471 -60 -96 -75 -246 -32 -325 6 -11 12 -25 13 -32 4 -23 60 -88 177 -205 64 -64 117 -120 117 -123 0 -4 -13 -25 -29 -48 -15 -23 -31 -52 -35 -64 -4 -13 -11 -23 -15 -23 -5 0 -14 -15 -22 -32 -7 -18 -16 -35 -19 -38 -5 -4 -82 -157 -85 -170 -1 -3 -9 -23 -19 -45 -41 -92 -103 -255 -111 -290 -1 -5 -5 -17 -8 -25 -9 -20 -47 -164 -59 -222 -6 -27 -13 -48 -17 -49 -3 0 -91 -2 -196 -3 -105 -1 -208 -8 -231 -14 -120 -35 -230 -160 -251 -287 -5 -27 -8 -185 -7 -350 1 -282 3 -303 23 -357 41 -106 113 -177 222 -220 48 -18 77 -21 249 -22 l195 -1 13 -50 c7 -27 15 -58 17 -68 2 -10 7 -27 10 -37 3 -10 7 -27 9 -37 15 -75 116 -345 128 -341 5 2 186 180 402 396 l393 393 -8 44 c-24 126 -32 424 -15 550 5 33 9 71 10 85 10 99 86 364 138 480 70 156 158 310 222 392 12 14 32 41 46 59 85 113 253 277 380 372 116 87 304 191 440 244 120 47 141 55 155 58 6 2 35 10 65 19 30 8 73 18 95 22 22 3 44 8 48 11 4 2 22 7 40 9 18 3 43 7 57 9 112 18 365 24 485 11 299 -32 547 -112 810 -260 39 -22 72 -43 75 -46 3 -3 26 -19 52 -35 27 -17 48 -33 48 -37 0 -5 5 -8 11 -8 11 0 84 -59 168 -135 41 -37 58 -54 141 -145 50 -54 142 -178 194 -258 90 -142 216 -429 241 -552 2 -8 8 -33 13 -55 6 -22 13 -53 16 -70 3 -16 7 -41 10 -55 7 -36 17 -109 21 -155 6 -61 6 -315 0 -360 -25 -201 -29 -221 -80 -405 -31 -114 -117 -310 -183 -420 -12 -19 -29 -48 -38 -65 -9 -16 -20 -32 -23 -35 -3 -3 -19 -24 -34 -48 -32 -50 -172 -217 -215 -259 -95 -90 -183 -165 -242 -206 -154 -107 -272 -173 -410 -230 -79 -33 -223 -82 -266 -92 -228 -50 -308 -60 -499 -59 -170 0 -297 10 -355 29 -14 4 -111 -87 -414 -390 -218 -218 -396 -400 -396 -405 0 -4 24 -16 53 -26 28 -9 57 -20 62 -24 6 -4 57 -22 115 -39 58 -18 116 -37 130 -41 14 -5 50 -14 80 -20 106 -23 97 -1 98 -223 0 -122 5 -203 12 -216 6 -12 8 -21 5 -21 -3 0 6 -22 20 -49 27 -53 103 -141 123 -141 7 0 12 -4 12 -9 0 -5 17 -15 38 -22 20 -6 43 -17 51 -23 10 -8 117 -11 350 -11 307 0 341 2 394 20 31 10 57 23 57 27 0 4 6 8 14 8 20 0 112 96 131 137 36 75 42 119 42 307 1 103 2 189 5 191 2 2 15 6 28 9 140 29 398 113 533 174 37 17 67 28 67 24 0 -4 4 -2 8 3 4 6 43 28 87 49 44 22 82 42 85 45 3 4 17 12 32 18 15 7 46 25 70 40 98 64 83 69 228 -76 138 -139 184 -172 270 -193 92 -23 172 -12 265 36 40 21 440 412 487 476 77 107 85 261 19 386 -12 23 -83 103 -157 178 l-136 137 19 26 c22 32 48 75 76 128 12 22 24 42 28 45 6 6 102 202 103 211 1 3 12 30 25 60 13 30 27 63 32 74 17 42 71 203 85 255 19 69 45 170 48 190 2 13 32 15 187 16 201 2 230 5 296 35 46 21 70 38 110 79 24 24 75 104 80 125 1 5 7 31 13 56 12 49 9 646 -3 688 -33 117 -150 231 -262 257 -16 3 -115 7 -219 8 -211 3 -199 -2 -216 83 -5 26 -19 80 -30 118 -12 39 -22 77 -25 85 -2 8 -4 16 -5 18 -2 1 -3 5 -5 10 -1 4 -5 14 -8 22 -4 8 -14 38 -23 65 -9 28 -21 61 -27 75 -5 14 -11 30 -12 36 -7 29 -149 311 -202 400 l-60 102 136 138 c91 92 144 155 159 187 68 144 44 300 -63 415 -114 123 -402 403 -435 424 -95 58 -234 73 -325 34 -22 -9 -42 -17 -45 -18 -13 -1 -86 -67 -191 -172 -64 -64 -124 -116 -132 -116 -9 0 -25 10 -37 22 -11 12 -20 18 -20 12 0 -5 -4 -4 -8 2 -9 13 -185 111 -277 154 -73 34 -263 111 -280 114 -5 1 -14 4 -20 7 -5 4 -37 14 -70 24 -33 10 -87 26 -120 36 -33 10 -85 23 -115 29 l-55 12 0 207 -1 206 -29 60 c-29 60 -125 165 -151 165 -8 0 -14 4 -14 8 0 5 -26 16 -57 25 -48 13 -115 16 -373 16 -293 1 -319 -1 -375 -20z"/><path fill="#1e1e1e" d="M3577 5134 c-1 -1 -44 -4 -94 -8 -51 -4 -98 -8 -105 -11 -7 -2 -24 -6 -38 -9 -106 -19 -283 -79 -375 -126 -65 -34 -177 -100 -185 -109 -3 -4 -23 -18 -45 -33 -22 -15 -56 -42 -76 -60 -20 -18 -47 -43 -60 -55 -74 -66 -182 -197 -237 -288 -56 -90 -130 -249 -152 -325 -13 -41 -27 -80 -31 -86 -5 -6 -7 -13 -4 -16 3 -2 0 -20 -5 -39 -6 -19 -13 -52 -16 -74 -3 -22 -8 -51 -10 -65 -3 -14 -6 -88 -8 -165 -3 -123 7 -245 28 -345 3 -14 8 -35 10 -48 3 -12 15 -54 28 -92 l22 -71 -1037 -1037 c-570 -570 -1053 -1059 -1072 -1086 -19 -27 -35 -55 -35 -63 0 -7 -3 -13 -8 -13 -8 0 -31 -48 -37 -79 -2 -12 -6 -25 -9 -29 -21 -34 -29 -211 -14 -291 9 -51 55 -180 67 -191 3 -3 12 -17 19 -31 17 -33 116 -137 162 -171 110 -80 245 -120 388 -114 110 5 176 22 277 74 65 33 151 116 1128 1092 l1058 1058 49 -19 c27 -10 59 -20 72 -23 13 -3 32 -7 43 -10 148 -34 189 -39 350 -39 150 -1 226 7 345 34 82 19 233 70 275 92 11 6 22 12 25 12 23 4 240 133 260 155 3 3 25 21 50 41 134 108 265 260 348 404 49 86 121 250 137 315 1 3 4 12 7 20 10 24 37 146 44 195 11 70 14 116 15 215 0 101 -8 237 -16 250 -2 3 -6 26 -10 50 -22 151 -160 233 -287 171 -28 -14 -133 -111 -303 -282 -143 -144 -282 -279 -309 -301 -131 -104 -308 -135 -469 -81 -39 14 -74 28 -77 31 -3 4 -17 13 -32 21 -39 20 -109 89 -144 142 -106 157 -115 340 -26 513 31 59 78 111 328 362 160 161 298 306 307 322 8 16 14 57 15 90 0 63 -24 113 -73 154 -34 29 -172 62 -280 68 -69 4 -175 6 -178 4z"/></g></svg>'
                },
                link: 'https://atengk.github.io/tools/',
                ariaLabel: 'IT TOOLS'
            },
            {
                icon: {
                    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="193" viewBox="0 0 256 193"><path fill="#4285f4" d="M58.182 192.05V93.14L27.507 65.077L0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455z"/><path fill="#34a853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837l-27.026 25.798z"/><path fill="#ea4335" d="m58.182 93.14l-4.174-38.647l4.174-36.989L128 69.868l69.818-52.364l4.669 34.992l-4.669 40.644L128 145.504z"/><path fill="#fbbc04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945z"/><path fill="#c5221f" d="m0 49.504l26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23z"/></svg>'
                },
                link: 'mailto:kongyu2385569970@gmail.com',
                ariaLabel: '邮箱联系我'
            },
            {
                icon: {
                    svg: '<svg t="1774506302010" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13242" width="200" height="200"><path d="M511.09761 957.257c-80.159 0-153.737-25.019-201.11-62.386-24.057 6.702-54.831 17.489-74.252 30.864-16.617 11.439-14.546 23.106-11.55 27.816 13.15 20.689 225.583 13.211 286.912 6.767v-3.061z" fill="#FAAD08" p-id="13243"></path><path d="M496.65061 957.257c80.157 0 153.737-25.019 201.11-62.386 24.057 6.702 54.83 17.489 74.253 30.864 16.616 11.439 14.543 23.106 11.55 27.816-13.15 20.689-225.584 13.211-286.914 6.767v-3.061z" fill="#FAAD08" p-id="13244"></path><path d="M497.12861 474.524c131.934-0.876 237.669-25.783 273.497-35.34 8.541-2.28 13.11-6.364 13.11-6.364 0.03-1.172 0.542-20.952 0.542-31.155C784.27761 229.833 701.12561 57.173 496.64061 57.162 292.15661 57.173 209.00061 229.832 209.00061 401.665c0 10.203 0.516 29.983 0.547 31.155 0 0 3.717 3.821 10.529 5.67 33.078 8.98 140.803 35.139 276.08 36.034h0.972z" fill="#000000" p-id="13245"></path><path d="M860.28261 619.782c-8.12-26.086-19.204-56.506-30.427-85.72 0 0-6.456-0.795-9.718 0.148-100.71 29.205-222.773 47.818-315.792 46.695h-0.962C410.88561 582.017 289.65061 563.617 189.27961 534.698 185.44461 533.595 177.87261 534.063 177.87261 534.063 166.64961 563.276 155.56661 593.696 147.44761 619.782 108.72961 744.168 121.27261 795.644 130.82461 796.798c20.496 2.474 79.78-93.637 79.78-93.637 0 97.66 88.324 247.617 290.576 248.996a718.01 718.01 0 0 1 5.367 0C708.80161 950.778 797.12261 800.822 797.12261 703.162c0 0 59.284 96.111 79.783 93.637 9.55-1.154 22.093-52.63-16.623-177.017" fill="#000000" p-id="13246"></path><path d="M434.38261 316.917c-27.9 1.24-51.745-30.106-53.24-69.956-1.518-39.877 19.858-73.207 47.764-74.454 27.875-1.224 51.703 30.109 53.218 69.974 1.527 39.877-19.853 73.2-47.742 74.436m206.67-69.956c-1.494 39.85-25.34 71.194-53.24 69.956-27.888-1.238-49.269-34.559-47.742-74.435 1.513-39.868 25.341-71.201 53.216-69.974 27.909 1.247 49.285 34.576 47.767 74.453" fill="#FFFFFF" p-id="13247"></path><path d="M683.94261 368.627c-7.323-17.609-81.062-37.227-172.353-37.227h-0.98c-91.29 0-165.031 19.618-172.352 37.227a6.244 6.244 0 0 0-0.535 2.505c0 1.269 0.393 2.414 1.006 3.386 6.168 9.765 88.054 58.018 171.882 58.018h0.98c83.827 0 165.71-48.25 171.881-58.016a6.352 6.352 0 0 0 1.002-3.395c0-0.897-0.2-1.736-0.531-2.498" fill="#FAAD08" p-id="13248"></path><path d="M467.63161 256.377c1.26 15.886-7.377 30-19.266 31.542-11.907 1.544-22.569-10.083-23.836-25.978-1.243-15.895 7.381-30.008 19.25-31.538 11.927-1.549 22.607 10.088 23.852 25.974m73.097 7.935c2.533-4.118 19.827-25.77 55.62-17.886 9.401 2.07 13.75 5.116 14.668 6.316 1.355 1.77 1.726 4.29 0.352 7.684-2.722 6.725-8.338 6.542-11.454 5.226-2.01-0.85-26.94-15.889-49.905 6.553-1.579 1.545-4.405 2.074-7.085 0.242-2.678-1.834-3.786-5.553-2.196-8.135" fill="#000000" p-id="13249"></path><path d="M504.33261 584.495h-0.967c-63.568 0.752-140.646-7.504-215.286-21.92-6.391 36.262-10.25 81.838-6.936 136.196 8.37 137.384 91.62 223.736 220.118 224.996H506.48461c128.498-1.26 211.748-87.612 220.12-224.996 3.314-54.362-0.547-99.938-6.94-136.203-74.654 14.423-151.745 22.684-215.332 21.927" fill="#FFFFFF" p-id="13250"></path><path d="M323.27461 577.016v137.468s64.957 12.705 130.031 3.91V591.59c-41.225-2.262-85.688-7.304-130.031-14.574" fill="#EB1C26" p-id="13251"></path><path d="M788.09761 432.536s-121.98 40.387-283.743 41.539h-0.962c-161.497-1.147-283.328-41.401-283.744-41.539l-40.854 106.952c102.186 32.31 228.837 53.135 324.598 51.926l0.96-0.002c95.768 1.216 222.4-19.61 324.6-51.924l-40.855-106.952z" fill="#EB1C26" p-id="13252"></path></svg>'
                },
                link: 'http://wpa.qq.com/msgrd?v=3&uin=2385569970&Menu=yes',
                ariaLabel: 'QQ 联系我'
            }
        ],
        notFound: {
            code: '404',
            title: '页面未找到',
            quote: '您访问的页面不存在',
            linkLabel: '返回首页',
            linkText: '点击这里返回主页'
        },
        footer: {
            message: 'MIT License · Built with VitePress',
            copyright: `© ${new Date().getFullYear()} Ateng`
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        editLink: {
            pattern: 'https://github.com/atengk/Ateng-Linux/edit/main/:path',
            text: '在 GitHub 上编辑此页'
        },
        outline: {
            level: 'deep',
            label: '目录'
        },
        search: {
            provider: 'local',
            options: {
                detailedView: true,
                disableQueryPersistence: false,
                translations: {
                    button: {
                        buttonText: '搜索',
                        buttonAriaLabel: '搜索文档'
                    },
                    modal: {
                        noResultsText: '未找到结果',
                        resetButtonTitle: '清除查询',
                        footer: {
                            selectText: '选择',
                            navigateText: '切换',
                            closeText: '关闭'
                        }
                    }
                }
            }
        },
        lastUpdated: {
            text: '🕒 最后更新',
            formatOptions: {
                // @ts-ignore
                dateStyle: 'medium',
                timeStyle: 'short'
            }
        },
        externalLinkIcon: true,
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
    },
    head: [
        ['link', {rel: 'icon', type: 'image/svg+xml', href: '/work/favicon.svg'}]
    ],
    markdown: {
        lineNumbers: true,
        image: {
            lazyLoading: true // 基于浏览器原生懒加载
        }
    },
    // 死链处理策略
    ignoreDeadLinks: true,
})
