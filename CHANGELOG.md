## 2024-01-12

### updates

- 前台暗黑模式主题切换
- 搜索页面：考虑使用静态检索分类
- 初始化 Post 前台页面，待添加 markdown 阅览样式
- 修改目录解构，将前台移动到 `/post` 目录，后续可自由扩展自定义页面，如 `/about-me`, `/timeline`, `/project`, `/notes`, `/docs` 等


### bugs




### todos

- 考虑使用静态文档检索：如 Algolia



## 2024-01-11


### updates

- admin 不考虑做响应式，只提供 sidebar 的展开/收起
- 添加 `useBreakPoint`，用于后续前台页面的响应式
- 完成 `/admin/page` 的部分表单、表格逻辑，分页查询部分需要完善
- `/admin/dashboard` 添加 `@ant-design/charts` 绘制图表


### bugs

- `/admin` 下的 `DynamicSelect` 组件中 Select 的 option 删除操作会触发 `onChange` 事件，需要修改



### todos

- `/admin/post` 页面需要添加表单筛选查询，并且完善分页参数
