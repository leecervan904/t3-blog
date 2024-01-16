
## 主题管理



### 使用第三方 ui

- 官方只支持亮色/暗色切换：`color light:color dark:color` 的模式
- 如果要支持多色主题，需要预设多部分属性，而且像 `dark:color` 的使用比较繁琐，不如动态修改 `text-primary` 的方式便利，如：
```jsx
// text-primary 会自动切换 css 样式变量，在不同的主题下切换为不同的颜色
// 如 data-theme="light" --color-primary: color-blue-800 => text-primary: var(--color-primary)
// 如 data-theme="dark"  --color-primary: color-blue-600 => text-primary: var(--color-primary)
// ...
<div className="text-primary"><div>
```

主题颜色控制顺序（优先级依次递增）：
1. 全局设置的 CSS 变量 `--color-primary`
2. tailwindcss 自定义 color `primary`
3. daisyui 注入 `primary`



## daisyui


