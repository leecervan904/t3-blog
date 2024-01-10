


## 渲染


Next 可以构建 hybrid 应用，支持将某部分代码配置在客户端或服务端渲染。
- 客户端渲染：客户端请求一个 html 骨架（通常只包含一个 app 的挂载点），其他部分通过请求 js/css 资源后，在**客户端浏览器**完成渲染
- 服务端渲染：服务端编译相关的代码并缓存起来，客户端发起请求时返回完整的 html


可以使用如下方式在组件内声明使用哪一种环境，使用方式为在组件顶部声明：
```js
'use client'  // 客户端渲染

'use server' // 服务端渲染，(默认)
```


### 请求-响应生命周期

Next 定义了一个概念：[请求-响应生命周期](https://nextjs.org/docs/app/building-your-application/rendering#request-response-lifecycle)，他将网站的请求-响应表示为一下过程：
1. User Action：用户和页面发生交互，如 url 跳转、点击链接、提交表单等
2. HTTP Request：客户端像服务器发送 HTTP 请求，包含请求信息
3. Server：服务端处理请求
4. HTTP Response：服务端将资源返回给客户端，包含响应信息
5. Client：客户端解析资源渲染界面
6. User Action：页面更新后，可以继续下一轮操作周期


> 还强调了一点：构建 hybrid 应用的一个主要部分是如何根据 **请求-响应生命周期** 拆分代码，以及将网络边界放置在何处。


### 网络边界

上述提到的 `'use client'`, `'use server'` 用来指定边界，`'use server'` 表示会在服务端进行一些计算/渲染工作，因此服务端的压力较大。


### 渲染模式的区别


| 对比 | CSR | SSR |
| - | - | - |
Interactivity 可交互性|✅ 客户端组件可以使用 state、effect、event listeners，可以在用户交互时提供即时反馈并更新 UI|
Browser APIs 浏览器 API|✅ 可以访问浏览器 API，如地理位置、本地存储等|
Data Fetching 数据获取||✅ 在服务端请求数据，减少请求数量、降低网络延迟
Security 安全||✅ 敏感的数据和逻辑在服务端操作，减少 token 和 API 密钥的泄漏
Caching 缓存||✅ 服务端渲染可以缓存结果并在后续的请求中重用
Bundle Size 打包体积||✅ 一些依赖保留在服务端，而不是打包到 js 中由客户端下载、执行
Initial Page Load and First Contentful Paint 初次加载和 FCP||✅ 用户能够直接查看内容，无需等待客户端下载、解析和执行 js 代码
Search Engine Optimization and Social Network Shareability 搜索引擎优化和社区网络可共享性||✅ SEO 优化、生成社交卡片以供阅览
Streaming 流式传输||✅ 服务端组件可以将渲染工作分为多个块，并在准备就绪时流式传输到客户端，提供更友好的页面展示



### 服务端组件


服务端组件支持三种渲染策略：
- 静态渲染 Static Rendering
- 动态渲染 Dynamic Rendering
- 流 Streaming


> Q：如何启用服务端组件？
> A：Next 默认使用服务端渲染(`use server`)，可以通过 `use client` 手动切换为客户端渲染



#### 服务端组件如何渲染


在服务器上，Next 使用 React 提供的 API 来编排渲染，渲染工作分为多个块（如路由和 Suspense 边界）


每个块分两步渲染：
1. React 将服务器组件呈现为一种特殊的数据格式，称为 React 服务器组件 payload（RSC Payload）
2. Next.js 使用 RSC payload 和客户端组件 JavaScript 指令在服务器上呈现 HTML


在客户端上：
1. HTML 用于快速显示路由的非交互阅览，仅用于页面的初始化加载
2. React 服务器组件 payload 用于协调(reconcile)客户端和服务器组件树，并更新 DOM
3. JavaScript 指令用于水合(hydrate)客户端组件并使应用程序具有交互性


关于 RSC Payload：渲染的 React 服务端组件树的紧凑二进制表示，其包括
- 服务端组件的渲染结果
- 客户端组件的占位（包含其对 js 文件的引用）
- 从服务端组件传递到客户端组件的任何 props



#### 三种渲染策略

|渲染策略|简介|应用|
|-|-|-|
Static Rendering 静态渲染 |路由在构建时渲染或在数据重新验证时在后台渲染，结果被缓存被可以部署到 CDN|在构建时便已知数据：如静态博客、产品页面、官网等
Dynamic Rendering 动态渲染 |路由具有某些动态数据如用户信息等，仅在请求时才获取得到如 cookie 或 URL 的查询参数|大部分场景
Streaming 流渲染 |允许逐步渲染界面，页面的各个部分在准备就绪时会流式传输到客户端，有助于提高初始页面加载性能，以及依赖于较慢数据获取的 UI|页面内容的优先渲染，未渲染部分显示 loading 或骨架屏：如页面的评论部分


> Q：如何切换动态渲染？
> A：Next 在渲染过程中，若发现了动态函数或未缓存的数据请求，会自动切换为动态渲染整个路由。也就是说，仅在未使用动态函数以及数据请求被缓存时，才会使用静态渲染。**作为开发人员，您无需在静态渲染和动态渲染之间进行选择，因为 Next.js 会根据所使用的功能和 API 自动为每个路线选择最佳渲染策略**
> 动态函数 [dynamic function](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions)：在需要获取请求信息时使用，如 `cookie()`, `headers()`, `searchParams` 等
> 未缓存的数据 [uncached data request]()：


> Q：如何切换流式渲染？
> A：流式渲染默认内置在 App Router 中，也可以使用 `loading.js` 和配置了 `Suspense` 的 UI 组件实现



### 客户端组件

客户端组件允许编写可在请求时在客户端上呈现的交互式 UI

> Q：如何启用客户端组件
> A：在组件顶部声明 `'use client'`
> 客户端组件只需定义一次，后续的子组件都会视为 client bundle 的一部分


#### 客户端组件渲染方式

区分为两部分：
- 整页加载：页面初始化渲染、浏览器刷新
- 后续导航：


**整页加载**：Next 为了优化体验，使用 React API 在服务器上呈现完整的客户端和服务端组件，这样请求页面时会获取到完整的页面内容，而不用等待客户端 js 的下载和执行
- 在服务器上：
  1. React 将服务端组件呈现为一种特殊的数据格式：RSC Payload，它包含了对客户端组件的引用
  2. Next 使用 RSC Payload 和 js 在服务器上呈现路由对应的 HTML
- 在客户端上：
  1. HTML 用于立即显示路由的快速非交互式初始预览
  2. RSC Payload 用于协调(reconcile)客户端和服务端组件树，并更新 DOM
  3. js 用于水合(hydration)客户端组件并使界面变得可交互


> Q：什么是水合(hydration)？
> A：水合将事件监听器绑定到 DOM 上，使静态 HTML 具有可交互性，水合依赖 React 的 `hydrateRoot` API


**后续导航**：在后续导航中，客户端组件完全在客户端上呈现，不需要再依赖服务端的 HTML，也就是说客户端的 js 已下载并执行，后续只需依赖 RSC Payload 来协调(reconcile) 客户端和服务端组件树实现 DOM 更新。



### 组合渲染

官方建议选择服务端组件和客户端组件的场景：

|场景|服务端组件|客户端组件|
|-|-|-|
数据请求|❌|✅
直接访问后端资源|❌|✅
在服务器上保留敏感信息(token, API key)|❌|✅
保留服务端依赖、减少客户端 js 体积|❌|✅
添加交互性和事件监听|✅|❌
使用状态和生命周期(`useState`, `useReducer`, `useEffect` 等)|✅|❌
使用浏览器 API|✅|❌
使用依赖 state、effect、浏览器 API 的 hooks|✅|❌
使用 React Class 组件|✅|❌



#### 使用服务器组件的一些场景

- 组件间共享数据：可以使用 `fetch` 或 React 的 `cache` 来代替组件间的通信（React Context, props），这样可以减少发送重复请求的心智负担
- 将服务器代码排除在客户端之外：通常为一些数据敏感操作，或者限制代码只能在服务端上执行；此外，可以使用 `server-only`/`client-only` 包来限制代码在不正确的地方被使用
- 使用第三方包和 Provider：Provider 不能在服务端使用，一些第三方包在开发的时候通常没有指定 `use client`，这会导致在服务端组件上直接使用会报错
  - 使用 Provider：在根的 `page` 中使用 Provider 会报错，一种变通方式为通过包装一个带有 `use client` 的组件，然后引入使用，这样 Next 会将其当作客户端组件处理
  - 同理，如果一些第三方包没有使用 `use client`，也需要包装一个组件，并在组件头部指定 `use client`，再引入使用；因此，Next 建议第三方包的开发者在开发 Next 相关的包时按需指定 `use client`



#### 使用客户端组件的一些场景

- 分离静态的客户端组件到服务端组件中：保证一些静态内容不会打包到客户端 js，减少代码体积
- 将属性从服务端组件传递到客户端组件：从服务端传递到客户端的 props 需要经过 React 的 **序列化**；如果依赖的是不可序列化的数据，可以使用第三方库在客户端上获取数据、或者通过路由处理器在s服务器上获取数据
- 在客户端组件中使用服务端组件：
  - **不允许** 在客户端组件中引入服务端组件
  - 可以将服务端组件作为客户端组件的 `props`，然后客户端组件自行决定如何渲染服务端组件



### Edge 和 Node.js 运行时

在服务器上，有两种运行时可以用于呈现部分程序代码：
- Node.js：可以使用所有 Node.js API 以及生态环境包
- Edge：基于 Web API


[官方对比](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes#runtime-differences)不同运行时的差异：

||Node |	Serverless | Edge
|-|-|-|-|
Cold Boot	| /	| Normal | Low
HTTP Streaming | Yes | Yes | Yes
IO | All | All | fetch
Scalability | /	| High | Highest
Security | Normal | High | High
Latency | Normal | Low | Lowest
npm Packages | All | All | A smaller subset
Static Rendering | Yes | Yes | No
Dynamic Rendering | Yes | Yes | Yes
Data Revalidation / fetch | Yes | Yes | Yes


各个运行时适用场景：
- Edge：适合开发 小型、简单的功能以低延迟交付动态、个性化的内容，但是 Vercel 上的 Edge Runtime 中执行的代码体积限制为 4 MB
- Node.js：可以访问所有 Node.js API 以及依赖它们的所有 npm 包，但是启动速度较慢
- Vercel Serverless：折中的可扩展方案，能够处理比 Edge 更复杂的的计算负载、代码体积支持 50MB？但是需要数百毫秒的时间来启动路由




## 路由

重定向：Next >= 13，可以使用 redirect 直接重定向
```tsx
// /app/admin/page.tsx
import { redirect } from "next/navigation"

export default async function AdminPage() {
  redirect('/admin/dashboard') // 重定向
}


// /app/admin/dashboard.tsx
export default async function Page() {
  return (
    <div className="ant-btn-primary">
      admin content
    </div>
  )
}
```

