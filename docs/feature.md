## 技术栈

参考 [create t3 app](https://github.com/t3-oss/create-t3-app)

- [Next.js](./next.md)
- [tRPC](./trpc.md)
- [Zod](./zod.md)
- [Prisma](./prisma.md)
- [NextAuth.js](./next-auth.md)
- [TypeScript](./typescript.md)
- [Tailwind CSS](./tailwindcss.md)
- [Vercel](./vercel.md)
- [Docker](./docker.md)
- [other]('./other.md')：使用的其他工具库



## features 1.0 - 个人博客

因为是个人博客，不考虑用户管理，但是有一定的评论以及回复功能

### 前台：响应式 - SSR/SSG

- 首页：网站导航
  - 个性化首页
  - 全局搜索功能
- 分类页：文章分类检索
- 文章页：文章阅读、评论
- 其他


### 后台：SPA/响应式 - CSR

- 登录、注册
- 文章管理：新建、编辑、删除、发布
  - 两种编辑模式：Markdown，富文本
- 标签、分类管理：添加、编辑、删除
- 评论管理：增、删、查询
- 媒体资源管理：图片、视频



### 核心模块

- 文章编辑器：
  - 代码编辑器
    - [monaco-editor]()
    - [react-monaco-editor]()
  - markdown 编辑器，调研：
    - [remarkjs - react-markdown](https://github.com/remarkjs/react-markdown?tab=readme-ov-file#use-custom-components-syntax-highlight)
  - 富文本编辑器
    - [tinymce]()
- 媒体管理：
  - 图片上传、视频上传，大文件上传
  - 视频流
- 其他：
  - 函数库：[lodash](), [dayjs]()
  - 组件库：[Ant Design]()
  - 代码格式：[ESLint](), [Prettier](), [prettier-plugin-tailwindcss]()




## features 2.0 - 博客社区

考虑用户模式为知乎、掘金这样的平台


### 前台

- 用户中心：用户信息页面
  - 用户填写信息后，身份为 `Guest`，可以评论文章
  - 用户完善信息注册后，身份为 `User`，可以有自己的个人中心，历史记录？
  - 用户同意平台协议后，身份为 `User`，但有自己的后台管理页面，管理、分布文章


### 后台

- 用户管理：角色权限管理（网站管理端？）
  - 网站所有者身份为 `Super-Admin`，可以管理所有用户
  - `Super-Admin` 可以添加用户为管理员 `Admin`，并给予一部分网站管理权限


### 核心模块

- 用户注册、登录流程
  - 网站用户
    - `Guest`：能以邮箱、用户名发表评论
    - `User`：注册后可发布文章
  - 网站管理用户
    - `Admin`：管理员，有特定权限的 User
    - `Super Admin`：超级管理员（网站所有者）
