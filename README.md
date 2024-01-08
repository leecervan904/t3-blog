## 快速开始


### 环境配置

1. 安装依赖
```sh
nvm use 18  # Next v14 需要 Node.js >= 18

pnpm i
```

2. 使用 docker-compose 启动 mysql 镜像
```sh
docker-compose up -d
```

3. 使用 prisma 初始化数据库
```sh
pnpm db:push
```

4. 启动项目
```sh
pnpm dev
```


### 项目目录介绍

```conf
|- project
  |-prisma      # prisma model 配置
  |- src
    |- styles   # 全局样式配置
    |- app      # 前端代码
      |- admin  # 后台管理页面
      |- api    # 后端接口预览
    |- server   # 后端代码
      |- api    # 接口目录
    |- trpc     # trpc 代码
  ｜- .         # 其他配置文件
```





## features

前台：响应式 - SSG
- 首页：文章列表
- 分类页：文章检索
- 文章详情页：文章阅读、评论
- 用户中心：用户信息页面


后台：SPA/响应式 - CSR
- 登录、注册
- 文章管理：文章发布、文章编辑、文章删除
- 分类管理：分类添加、分类编辑、分类删除
- 评论管理：评论增删改查
- 媒体资源管理：图片、视频
- 用户管理：用户权限修改



## 核心模块

- 用户注册、登录流程
  - Guest：能以邮箱、用户名发表评论
  - User：注册后可发布文章
  - Admin：管理员，有特定权限的 User
  - Super Admin：超级管理员（网站所有者）
- 文章编辑器：
  - markdown 编辑器
  - 富文本编辑器
- 媒体管理：
  - 图片上传
  - 视频上传、视频流

