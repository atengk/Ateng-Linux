# SQL使用

## 创建表

### `accounts` 表（用户账户信息）

```sql
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    account_id        BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '账户ID，主键自增',
    username          VARCHAR(50) NOT NULL UNIQUE COMMENT '唯一用户名',
    password_hash     VARBINARY(255) NOT NULL COMMENT '用户密码哈希（加密存储）',
    email             VARCHAR(255) NOT NULL UNIQUE COMMENT '电子邮箱地址',
    avatar_url        VARCHAR(500) COMMENT '用户头像URL（推荐使用对象存储）',
    preferences       JSON COMMENT '用户偏好配置（JSON）',
    status            ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active' COMMENT '账户状态',
    role              ENUM('user', 'admin', 'moderator') DEFAULT 'user' COMMENT '角色权限',
    credit_score      SMALLINT UNSIGNED DEFAULT 500 COMMENT '信用评分（0-1000）',
    reputation        DECIMAL(5,2) DEFAULT 0.00 COMMENT '用户声望分',
    birth_date        DATE COMMENT '用户生日',
    is_verified       TINYINT(1) NOT NULL DEFAULT 0 COMMENT '邮箱是否验证',
    is_deleted        TINYINT(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除标志',
    last_login_ip     VARBINARY(16) COMMENT '最近登录IP（支持IPv6）',
    signup_location   POINT NOT NULL SRID 4326 COMMENT '注册地理位置（经纬度）',
    created_by        BIGINT COMMENT '创建者ID',
    updated_by        BIGINT COMMENT '最后更新者ID',
    created_at        DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted_at        DATETIME COMMENT '删除时间（软删）'
) ENGINE=InnoDB COMMENT='账户基本信息表';

-- 空间索引：注册位置
CREATE SPATIAL INDEX idx_location ON accounts(signup_location);

-- JSON虚拟列索引（如已添加 theme 列）
ALTER TABLE accounts
ADD COLUMN theme VARCHAR(20)
    GENERATED ALWAYS AS (JSON_UNQUOTE(preferences->'$.theme')) STORED;
CREATE INDEX idx_accounts_theme ON accounts(theme);
```

------

### `projects` 表（项目信息）

```sql
CREATE TABLE projects (
    project_id        BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())) COMMENT '项目ID，压缩存储UUID',
    account_id        BIGINT NOT NULL COMMENT '项目所有者账户ID',
    name              VARCHAR(200) NOT NULL COMMENT '项目名称',
    description       TEXT COMMENT '项目描述',
    status            ENUM('draft', 'in_progress', 'completed', 'archived') DEFAULT 'draft' COMMENT '项目状态',
    visibility        TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否公开可见',
    funding_goal      DECIMAL(12,2) COMMENT '筹资目标金额',
    amount_raised     DECIMAL(12,2) DEFAULT 0.00 COMMENT '当前筹资金额',
    task_count        INT UNSIGNED DEFAULT 0 COMMENT '任务数量',
    progress_percent  TINYINT UNSIGNED DEFAULT 0 COMMENT '完成度百分比',
    metadata          JSON COMMENT '扩展元数据',
    is_starred        TINYINT(1) DEFAULT 0 COMMENT '是否被收藏',
    created_by        BIGINT COMMENT '创建人ID',
    updated_by        BIGINT COMMENT '更新人ID',
    start_at          DATETIME COMMENT '项目开始时间',
    end_at            DATETIME COMMENT '项目结束时间',
    created_at        DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    is_deleted        TINYINT(1) NOT NULL DEFAULT 0 COMMENT '软删除标志',
    deleted_at        DATETIME COMMENT '删除时间',
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='项目信息表';

-- 唯一约束：同一账户下项目名唯一
CREATE UNIQUE INDEX uq_account_name ON projects(account_id, name);

-- 全文索引：项目描述全文搜索
CREATE FULLTEXT INDEX idx_project_description ON projects(description);
```

------

### `activity_logs` 表（用户行为日志）

```sql
CREATE TABLE activity_logs (
    log_id            BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '日志ID',
    account_id        BIGINT NOT NULL COMMENT '操作者账户ID',
    project_id        BINARY(16) COMMENT '关联项目ID',
    action_type       VARCHAR(20) NOT NULL COMMENT '操作类型，如 login/update/delete 等',
    action_detail     TEXT COMMENT '操作详情内容',
    device_info       JSON COMMENT '操作设备信息',
    ip_address        VARCHAR(45) COMMENT 'IP地址（IPv4/IPv6）',
    timezone          VARCHAR(50) COMMENT '用户时区',
    duration_seconds  INT UNSIGNED COMMENT '操作耗时（秒）',
    data_used_mb      DECIMAL(10,3) COMMENT '本次操作流量（MB）',
    created_at        DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '日志记录时间',
    FOREIGN KEY (account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE SET NULL
) ENGINE=InnoDB COMMENT='用户行为日志记录表';

-- 组合索引：账户 + 项目 + 时间（常用于查询日志）
CREATE INDEX idx_account_project_time ON activity_logs(account_id, project_id, created_at);

-- IP 地址查询索引
CREATE INDEX idx_ip ON activity_logs(ip_address);
```

------

### `project_stars` 表（收藏关系）

```sql
CREATE TABLE project_stars (
    account_id   BIGINT NOT NULL COMMENT '收藏者账户ID',
    project_id   BINARY(16) NOT NULL COMMENT '被收藏项目ID',
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
    PRIMARY KEY (account_id, project_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
) ENGINE=InnoDB COMMENT='用户收藏的项目记录表';

-- 项目反向查询收藏者（可选）
CREATE INDEX idx_project_fans ON project_stars(project_id);
```

## 写入数据

一点也不难，下面是四个表（`accounts`、`projects`、`activity_logs`、`project_stars`）各自插入 **10 条示例数据的完整 SQL**，全部字段均使用中文内容或说明，适合教学或演示用途。

------

### ✅ `accounts` 示例数据（10条）：

```sql
INSERT INTO accounts (username, password_hash, email, avatar_url, preferences, status, role, credit_score, reputation, birth_date, is_verified, is_deleted, last_login_ip, signup_location, created_by, updated_by, created_at)
VALUES 
('张三', UNHEX(SHA2('password1', 256)), 'zhangsan@example.com', 'https://img.example.com/zhangsan.jpg', '{"theme": "dark", "language": "zh"}', 'active', 'user', 700, 85.5, '1990-01-01', 1, 0, UNHEX('C0A80101'), ST_GeomFromText('POINT(39.9075 116.3913)', 4326), NULL, NULL, NOW()),
('李四', UNHEX(SHA2('password2', 256)), 'lisi@example.com', 'https://img.example.com/lisi.jpg', '{"theme": "light", "language": "zh"}', 'active', 'admin', 820, 90.0, '1988-03-12', 1, 0, UNHEX('C0A80102'), ST_GeomFromText('POINT(31.2304 121.4737)', 4326), NULL, NULL, NOW()),
('王五', UNHEX(SHA2('password3', 256)), 'wangwu@example.com', 'https://img.example.com/wangwu.jpg', '{"theme": "dark"}', 'active', 'user', 600, 70.0, '1995-05-20', 0, 0, UNHEX('C0A80103'), ST_GeomFromText('POINT(23.1291 113.2644)', 4326), NULL, NULL, NOW()),
('赵六', UNHEX(SHA2('password4', 256)), 'zhaoliu@example.com', 'https://img.example.com/zhaoliu.jpg', '{"theme": "light"}', 'inactive', 'moderator', 550, 60.0, '1992-07-15', 0, 0, UNHEX('C0A80104'), ST_GeomFromText('POINT(29.5630 106.5516)', 4326), NULL, NULL, NOW()),
('孙七', UNHEX(SHA2('password5', 256)), 'sunqi@example.com', 'https://img.example.com/sunqi.jpg', '{"language": "zh"}', 'active', 'user', 780, 88.0, '1985-11-30', 1, 0, UNHEX('C0A80105'), ST_GeomFromText('POINT(30.5723 104.0665)', 4326), NULL, NULL, NOW()),
('周八', UNHEX(SHA2('password6', 256)), 'zhouba@example.com', 'https://img.example.com/zhouba.jpg', NULL, 'suspended', 'user', 500, 50.0, '1993-09-01', 0, 0, UNHEX('C0A80106'), ST_GeomFromText('POINT(30.5931 114.3054)', 4326), NULL, NULL, NOW()),
('吴九', UNHEX(SHA2('password7', 256)), 'wujiu@example.com', 'https://img.example.com/wujiu.jpg', '{"theme": "dark"}', 'active', 'moderator', 880, 95.0, '1991-02-25', 1, 0, UNHEX('C0A80107'), ST_GeomFromText('POINT(39.1333 117.2000)', 4326), NULL, NULL, NOW()),
('郑十', UNHEX(SHA2('password8', 256)), 'zhengshi@example.com', 'https://img.example.com/zhengshi.jpg', '{"language": "zh"}', 'active', 'user', 640, 73.0, '1989-08-18', 1, 0, UNHEX('C0A80108'), ST_GeomFromText('POINT(30.2741 120.1551)', 4326), NULL, NULL, NOW()),
('冯一', UNHEX(SHA2('password9', 256)), 'fengyi@example.com', 'https://img.example.com/fengyi.jpg', NULL, 'inactive', 'user', 720, 81.0, '1994-12-10', 0, 0, UNHEX('C0A80109'), ST_GeomFromText('POINT(32.0603 118.7969)', 4326), NULL, NULL, NOW()),
('陈二', UNHEX(SHA2('password10', 256)), 'chener@example.com', 'https://img.example.com/chener.jpg', '{"theme": "light"}', 'active', 'admin', 900, 99.0, '1987-06-22', 1, 0, UNHEX('C0A80110'), ST_GeomFromText('POINT(36.0611 103.8236)', 4326), NULL, NULL, NOW());
```

------

### ✅ `projects` 示例数据（10条）：

```sql
INSERT INTO projects (project_id, account_id, name, description, tags, status, visibility, funding_goal, amount_raised, task_count, progress_percent, metadata, is_starred, created_by, updated_by, start_date, end_date, created_at)
VALUES 
(UUID(), 1, '智能家居助手', '控制家中灯光和电器', 'AI,IoT', 'in_progress', 1, 100000, 25800, 5, 25, '{"difficulty": "中等"}', 1, 1, 1, NOW(), NULL, NOW()),
(UUID(), 2, '校园问答平台', '学生提问与答疑平台', 'Web', 'draft', 1, 50000, 0, 0, 0, '{"difficulty": "简单"}', 0, 2, 2, NOW(), NULL, NOW()),
(UUID(), 3, '本地生活服务', '提供附近商家信息和评价', 'Mobile,Other', 'in_progress', 1, 80000, 15000, 12, 48, '{"difficulty": "中等"}', 0, 3, 3, NOW(), NULL, NOW()),
(UUID(), 4, '在线翻译系统', '支持多语言互译', 'AI,Web', 'completed', 1, 120000, 120000, 30, 100, '{"difficulty": "困难"}', 1, 4, 4, NOW(), NULL, NOW()),
(UUID(), 5, '虚拟宠物社区', '用户可以养宠物互动', 'GameDev,Other', 'in_progress', 1, 60000, 30000, 8, 35, '{"platform": "Android"}', 1, 5, 5, NOW(), NULL, NOW()),
(UUID(), 6, '中医知识库', '收录传统医学文献', 'Web', 'draft', 1, 30000, 2000, 4, 15, '{"language": "zh"}', 0, 6, 6, NOW(), NULL, NOW()),
(UUID(), 7, '书籍推荐引擎', '根据兴趣推荐书籍', 'AI,Web', 'in_progress', 1, 45000, 30000, 6, 40, '{"tags": ["推荐", "图书"]}', 0, 7, 7, NOW(), NULL, NOW()),
(UUID(), 8, '健康饮食指南', '智能搭配食谱', 'AI,Mobile', 'completed', 1, 70000, 70000, 10, 100, '{"calorie_calc": true}', 1, 8, 8, NOW(), NULL, NOW()),
(UUID(), 9, '旅游分享平台', '用户发布游记和攻略', 'Web,Mobile', 'in_progress', 1, 95000, 35000, 9, 60, '{"content": "图文"}', 1, 9, 9, NOW(), NULL, NOW()),
(UUID(), 10, '智能健身教练', '提供个性化训练计划', 'AI,Mobile', 'draft', 1, 110000, 10000, 2, 10, '{"coach": "虚拟"}', 0, 10, 10, NOW(), NULL, NOW());
```

------

### ✅ `activity_logs` 示例数据（10条）：

```sql
INSERT INTO activity_logs (account_id, project_id, action_type, action_detail, device_info, ip_address, timezone, duration_seconds, data_used_mb, created_at)
VALUES 
(1, UUID(), 'login', '用户登录系统', '{"device": "安卓手机", "os": "Android"}', '192.168.1.1', 'Asia/Shanghai', 30, 0.12, NOW()),
(2, UUID(), 'update', '更新了项目信息', '{"device": "笔记本", "os": "Windows"}', '192.168.1.2', 'Asia/Shanghai', 45, 0.34, NOW()),
(3, UUID(), 'create', '创建了新项目', '{"device": "iPhone", "os": "iOS"}', '192.168.1.3', 'Asia/Shanghai', 20, 0.25, NOW()),
(4, UUID(), 'delete', '删除了旧数据', '{"device": "平板", "os": "Android"}', '192.168.1.4', 'Asia/Shanghai', 15, 0.11, NOW()),
(5, UUID(), 'logout', '用户退出登录', '{"device": "台式机", "os": "Linux"}', '192.168.1.5', 'Asia/Shanghai', 10, 0.05, NOW()),
(6, UUID(), 'login', '重新登录系统', '{"device": "安卓手机", "os": "Android"}', '192.168.1.6', 'Asia/Shanghai', 25, 0.22, NOW()),
(7, UUID(), 'share', '分享了一个项目链接', '{"device": "MacBook", "os": "macOS"}', '192.168.1.7', 'Asia/Shanghai', 50, 0.44, NOW()),
(8, UUID(), 'update', '编辑了项目内容', '{"device": "iPhone", "os": "iOS"}', '192.168.1.8', 'Asia/Shanghai', 18, 0.19, NOW()),
(9, UUID(), 'create', '添加新内容模块', '{"device": "安卓手机", "os": "Android"}', '192.168.1.9', 'Asia/Shanghai', 22, 0.28, NOW()),
(10, UUID(), 'delete', '移除了一条记录', '{"device": "平板", "os": "Android"}', '192.168.1.10', 'Asia/Shanghai', 12, 0.14, NOW());
```

------

### ✅ `project_stars` 示例数据（10条）：

```sql
INSERT INTO project_stars (account_id, project_id, created_at)
VALUES 
(1, UUID(), NOW()),
(2, UUID(), NOW()),
(3, UUID(), NOW()),
(4, UUID(), NOW()),
(5, UUID(), NOW()),
(6, UUID(), NOW()),
(7, UUID(), NOW()),
(8, UUID(), NOW()),
(9, UUID(), NOW()),
(10, UUID(), NOW());
```

> 📝 提示：

- 你需要把 `UUID()` 替换成你项目表中的实际 `project_id` 值（可 SELECT 出来使用）。
- 所有数据中文化处理完毕，适合用于演示 SQL 查询、筛选、统计、关联、全文检索、空间索引等多种功能。

如需我将这些整理成 `.sql` 文件以供下载，请告诉我。