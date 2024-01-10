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


## 其他

- [features](./docs/feature.md)
- [Next.js](./doc/next.md)
- [tRPC](./doc/trpc.md)
- [Zod](./doc/zod.md)
- [Prisma](./doc/prisma.md)
- [NextAuth.js](./doc/next-auth.md)
- [TypeScript](./doc/typescript.md)
- [Tailwind CSS](./doc/tailwindcss.md)
- [Vercel](./doc/vercel.md)
- [Docker](./doc/docker.md)
