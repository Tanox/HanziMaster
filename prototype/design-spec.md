# HanziMaster 设计系统规范 v4.0

基于 shadcn/ui (radix-nova preset) 的 Apple 风格设计系统

---

## 目录

1. [设计系统规范](#设计系统规范)
   - [色彩规范](#色彩规范)
   - [字体规范](#字体规范)
   - [间距与布局规范](#间距与布局规范)
   - [图标规范](#图标规范)
   - [动效规范](#动效规范)

2. [组件库规范](#组件库规范)
   - [基础组件](#基础组件)
   - [复合组件](#复合组件)
   - [业务组件](#业务组件)
   - [组件使用规则](#组件使用规则)

3. [交互标准](#交互标准)
   - [交互模式库](#交互模式库)
   - [交互反馈规范](#交互反馈规范)
   - [错误处理规范](#错误处理规范)
   - [空状态设计规范](#空状态设计规范)

---

## 设计系统规范

### 色彩规范

#### 语义化颜色系统 (shadcn/ui)

基于 OKLCH 色彩空间，提供语义化的颜色变量：

| 变量名 | 用途 | 浅色模式 | 深色模式 |
|--------|------|----------|----------|
| `--background` | 页面背景 | `oklch(1 0 0)` (纯白) | `oklch(0.145 0 0)` (深灰) |
| `--foreground` | 主要文本 | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--card` | 卡片背景 | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `--card-foreground` | 卡片文本 | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--popover` | 弹出层背景 | `oklch(1 0 0)` | `oklch(0.205 0 0)` |
| `--primary` | 主要操作色 | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` |
| `--primary-foreground` | 主要操作文本 | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` |
| `--secondary` | 次要背景 | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--muted` | 柔和背景 | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--muted-foreground` | 柔和文本 | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` |
| `--accent` | 强调背景 | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` |
| `--destructive` | 危险/删除 | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` |
| `--border` | 边框 | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `--input` | 输入框边框 | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` |
| `--ring` | 焦点环 | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` |

#### Apple 品牌色

用于特殊强调和品牌识别：

| 颜色名 | 用途 | 色值 |
|--------|------|------|
| Apple Blue | 主品牌色、链接、交互 | `#007aff` |
| Apple Purple | 辅助品牌色、渐变 | `#af52de` |
| Apple Green | 成功、完成状态 | `#34c759` |
| Apple Red | 错误、危险操作 | `#ff3b30` |
| Apple Orange | 警告、提醒 | `#ff9500` |
| Apple Pink | 特殊强调 | `#ff2d55` |

#### 渐变规范

```css
/* 主渐变 - 蓝紫渐变 */
--gradient-primary: linear-gradient(135deg, #007aff 0%, #af52de 100%);

/* 辅助渐变 - 紫粉渐变 */
--gradient-secondary: linear-gradient(135deg, #af52de 0%, #ff2d55 100%);

/* 柔和渐变 - 蓝绿渐变 */
--gradient-cool: linear-gradient(135deg, #5ac8fa 0%, #007aff 100%);
```

#### 使用规则

1. **优先使用语义化颜色**：使用 `bg-background`、`text-foreground` 而非硬编码颜色值
2. **品牌色仅用于特殊强调**：Apple Blue 用于主按钮、链接；其他品牌色用于状态指示
3. **深色模式自动适配**：所有语义化颜色自动适配深色模式，无需手动添加 `dark:` 前缀
4. **避免直接使用灰度值**：使用 `text-muted-foreground` 替代灰色文本

---

### 字体规范

#### 字体家族

| 用途 | 字体 | CSS 变量 |
|------|------|----------|
| 主字体 (UI) | Inter | `--font-sans` |
| 汉字展示 | Noto Sans SC | `--font-hanzi` |
| 代码/等宽 | JetBrains Mono | `--font-mono` |

#### 字体大小系统

遵循 Apple Human Interface Guidelines 的字体大小：

| 级别 | 尺寸 | 用途 | Tailwind 类 |
|------|------|------|-------------|
| xs | 11px | 辅助标签、徽章 | `text-xs` |
| sm | 13px | 小型文本、按钮 | `text-sm` |
| base | 15px | 正文、默认 | `text-base` |
| lg | 17px | 强调文本 | `text-lg` |
| xl | 19px | 小标题 | `text-xl` |
| 2xl | 24px | 中标题 | `text-2xl` |
| 3xl | 32px | 大标题 | `text-3xl` |
| 4xl | 40px | 页面标题 | `text-4xl` |
| 5xl | 56px | Hero 标题 | `text-5xl` |
| 6xl | 72px | 特大展示 | `text-6xl` |

#### 字重规范

| 字重 | 数值 | 用途 |
|------|------|------|
| Light | 300 | 大字展示、装饰性文字 |
| Regular | 400 | 正文、描述文本 |
| Medium | 500 | 按钮、导航、标签 |
| Semibold | 600 | 小标题、强调 |
| Bold | 700 | 大标题、Hero |
| Extrabold | 800 | 特大展示标题 |

#### 行高规范

| 类型 | 行高 | 用途 |
|------|------|------|
| 紧凑 | 1.25 | 标题、单行文本 |
| 正常 | 1.47 | 正文、段落 |
| 宽松 | 1.65 | 长文本、描述 |

#### 字间距

| 类型 | 值 | 用途 |
|------|------|------|
| 紧凑 | -0.02em | 大标题 |
| 正常 | -0.01em | 正文 |
| 宽松 | 0.05em | 标签、徽章 |

---

### 间距与布局规范

#### 间距系统

基于 4px 基础单位的间距系统：

| 变量 | 值 | 用途 |
|------|------|------|
| `--space-xs` | 4px | 最小间距 |
| `--space-sm` | 8px | 元素内部间距 |
| `--space-md` | 16px | 默认间距 |
| `--space-lg` | 24px | 区块间距 |
| `--space-xl` | 32px | 大区块间距 |
| `--space-2xl` | 48px | 页面区块间距 |
| `--space-3xl` | 64px | 大页面区块 |
| `--space-4xl` | 80px | Hero 区域 |
| `--space-5xl` | 120px | 页面顶部/底部 |

#### Tailwind 间距映射

```css
gap-1  /* 4px */
gap-2  /* 8px */
gap-4  /* 16px */
gap-6  /* 24px */
gap-8  /* 32px */
gap-12 /* 48px */
gap-16 /* 64px */
```

#### 圆角系统

| 变量 | 值 | 用途 |
|------|------|------|
| `--radius` | 10px (0.625rem) | 默认圆角 |
| `--radius-sm` | 6px | 小元素圆角 |
| `--radius-md` | 8px | 中等元素圆角 |
| `--radius-lg` | 10px | 大元素圆角 |
| `--radius-xl` | 14px | 卡片圆角 |
| `--radius-2xl` | 18px | 大卡片圆角 |
| `--radius-3xl` | 22px | Hero 区域圆角 |
| `--radius-4xl` | 26px | 特大元素圆角 |

#### Apple 风格圆角

| 变量 | 值 | 用途 |
|------|------|------|
| `--radius-xs` | 8px | 按钮、小卡片 |
| `--radius-sm` | 12px | 中等元素 |
| `--radius-md` | 16px | 卡片、面板 |
| `--radius-lg` | 20px | 大卡片 |
| `--radius-xl` | 24px | 特大卡片 |
| `--radius-2xl` | 32px | Hero 区域 |
| `--radius-3xl` | 44px | 页面级元素 |
| `--radius-pill` | 980px | 胶囊按钮 |

#### 阴影系统

| 变量 | 值 | 用途 |
|------|------|------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.06)` | 微阴影 |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.08)` | 中阴影 |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.12)` | 大阴影 |
| `--shadow-xl` | `0 12px 48px rgba(0,0,0,0.16)` | 特大阴影 |
| `--shadow-glow` | `0 0 40px rgba(0,122,255,0.15)` | 发光效果 |

#### 响应式断点

| 断点 | 宽度 | 用途 |
|------|------|------|
| sm | 640px | 手机横屏 |
| md | 768px | 平板 |
| lg | 1024px | 小桌面 |
| xl | 1280px | 大桌面 |
| 2xl | 1536px | 超大屏幕 |

---

### 图标规范

#### 图标库

使用 **Lucide React** 作为默认图标库（shadcn/ui 标准）

```tsx
import { 
  Home, 
  BookOpen, 
  Pencil, 
  Settings, 
  Sun, 
  Moon,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  Menu,
  // ...
} from 'lucide-react'
```

#### 图标尺寸

| 尺寸 | 值 | 用途 | Tailwind 类 |
|------|------|------|-------------|
| xs | 12px | 极小图标 | `size-3` |
| sm | 14px | 小图标 | `size-3.5` |
| default | 16px | 默认图标 | `size-4` |
| lg | 18px | 大图标 | `size-4.5` |
| xl | 20px | 特大图标 | `size-5` |
| 2xl | 24px | 超大图标 | `size-6` |

#### 图标使用规则

1. **按钮内图标使用 `data-icon` 属性**：
   ```tsx
   <Button>
     <SearchIcon data-icon="inline-start" />
     Search
   </Button>
   ```

2. **不添加尺寸类**：组件自动处理图标尺寸，无需手动添加 `size-4` 等

3. **装饰性图标添加 `aria-hidden`**：
   ```tsx
   <svg aria-hidden="true" className="size-4">...</svg>
   ```

4. **功能性图标需要可访问性标签**：
   ```tsx
   <button aria-label="Close">
     <XIcon aria-hidden="true" />
   </button>
   ```

---

### 动效规范

#### 动画时长

| 变量 | 值 | 用途 |
|------|------|------|
| `--duration-fast` | 0.15s | 微交互（hover、focus） |
| `--duration-normal` | 0.25s | 默认过渡 |
| `--duration-slow` | 0.4s | 页面过渡、展开 |
| `--duration-lg` | 0.6s | 大动画、Hero |

#### 缓动函数

| 变量 | 值 | 用途 |
|------|------|------|
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | 平滑过渡 |
| `--ease-out` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | 退出动画 |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | 弹性动画 |

#### 预设动画

| 动画名 | 用途 | CSS |
|--------|------|-----|
| `fade-in-up` | 页面进入 | `animation: fade-in-up 0.6s ease-out` |
| `scale-in` | 弹出层进入 | `animation: scale-in 0.3s ease-out` |
| `slide-in-right` | 侧边栏进入 | `animation: slide-in-right 0.3s ease-out` |
| `fade-in` | 简单淡入 | `animation: fade-in 0.3s ease-out` |
| `slide-up` | 底部元素上升 | `animation: slide-up 0.4s ease-out` |

#### Tailwind 动画类

```css
.animate-fade-in-up
.animate-scale-in
.animate-slide-in-right
.animate-fade-in
.animate-slide-up
```

#### 过渡规则

1. **避免 `transition-all`**：明确指定过渡属性
   ```css
   /* 正确 */
   transition: transform 0.3s ease, opacity 0.3s ease;
   
   /* 错误 */
   transition: all 0.3s ease;
   ```

2. **hover 状态过渡**：
   ```css
   transition: transform 0.25s var(--ease-smooth);
   ```

3. **焦点状态过渡**：
   ```css
   transition: border-color 0.15s ease, box-shadow 0.15s ease;
   ```

#### 无障碍动效

支持 `prefers-reduced-motion` 媒体查询：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 组件库规范

### 基础组件

#### Button 按钮

**变体 (Variants)**

| 变体 | 用途 | 样式 |
|------|------|------|
| `default` | 主要操作 | 黑色背景（浅色）/ 白色背景（深色） |
| `outline` | 次要操作 | 边框按钮 |
| `secondary` | 辅助操作 | 灰色背景 |
| `ghost` | 低调操作 | 无背景，hover 时显示 |
| `destructive` | 危险操作 | 红色背景 |
| `link` | 链接样式 | 文本链接 |

**尺寸 (Sizes)**

| 尺寸 | 高度 | 用途 |
|------|------|------|
| `xs` | 24px | 极小按钮 |
| `sm` | 28px | 小按钮 |
| `default` | 32px | 默认按钮 |
| `lg` | 36px | 大按钮 |
| `icon` | 32px | 图标按钮 |
| `icon-xs` | 24px | 小图标按钮 |
| `icon-sm` | 28px | 中图标按钮 |
| `icon-lg` | 36px | 大图标按钮 |

**使用示例**

```tsx
import { Button } from '@/components/ui/button'

// 主要按钮
<Button>开始学习</Button>

// 次要按钮
<Button variant="outline">取消</Button>

// 图标按钮
<Button variant="icon" aria-label="设置">
  <SettingsIcon data-icon="inline-start" />
</Button>

// 带图标按钮
<Button>
  <SearchIcon data-icon="inline-start" />
  搜索
</Button>

// 危险按钮
<Button variant="destructive">删除</Button>
```

#### Input 输入框

**状态**

| 状态 | 样式 |
|------|------|
| 默认 | 边框 `border-input`，透明背景 |
| 焦点 | 边框 `border-ring`，ring 效果 |
| 错误 | `aria-invalid` 红色边框 |
| 禁用 | 半透明，禁止交互 |

**使用示例**

```tsx
import { Input } from '@/components/ui/input'

<Input 
  type="text"
  placeholder="输入汉字..."
  aria-label="搜索汉字"
/>

<Input 
  aria-invalid  // 错误状态
  className="border-destructive"
/>
```

#### Label 标签

```tsx
import { Label } from '@/components/ui/label'

<Label htmlFor="email">邮箱地址</Label>
<Input id="email" type="email" />
```

#### Select 选择器

```tsx
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'

<Select>
  <SelectTrigger>
    <SelectValue placeholder="选择级别" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="beginner">初学者</SelectItem>
    <SelectItem value="intermediate">中级</SelectItem>
    <SelectItem value="advanced">高级</SelectItem>
  </SelectContent>
</Select>
```

#### Switch 开关

```tsx
import { Switch } from '@/components/ui/switch'

<div className="flex items-center gap-2">
  <Switch id="dark-mode" />
  <Label htmlFor="dark-mode">深色模式</Label>
</div>
```

#### Tabs 标签页

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="learn">
  <TabsList>
    <TabsTrigger value="learn">学习</TabsTrigger>
    <TabsTrigger value="practice">练习</TabsTrigger>
    <TabsTrigger value="stats">统计</TabsTrigger>
  </TabsList>
  <TabsContent value="learn">学习内容...</TabsContent>
  <TabsContent value="practice">练习内容...</TabsContent>
  <TabsContent value="stats">统计内容...</TabsContent>
</Tabs>
```

#### Badge 徽章

```tsx
import { Badge } from '@/components/ui/badge'

<Badge>新功能</Badge>
<Badge variant="secondary">次要</Badge>
<Badge variant="destructive">错误</Badge>
<Badge variant="outline">边框</Badge>
```

---

### 复合组件

#### Card 卡片

**结构**

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardAction 
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述</CardDescription>
    <CardAction>操作按钮</CardAction>
  </CardHeader>
  <CardContent>
    卡片内容
  </CardContent>
  <CardFooter>
    卡片底部
  </CardFooter>
</Card>
```

**尺寸**

| 尺寸 | 间距 | 用途 |
|------|------|------|
| `default` | 16px | 默认卡片 |
| `sm` | 12px | 小型卡片 |

#### Dialog 对话框

```tsx
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>打开对话框</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>确认操作</DialogTitle>
      <DialogDescription>确定要执行此操作吗？</DialogDescription>
    </DialogHeader>
    <div className="py-4">内容...</div>
  </DialogContent>
</Dialog>
```

#### Sheet 侧边面板

```tsx
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild>
    <Button variant="icon">
      <MenuIcon />
    </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>菜单</SheetTitle>
      <SheetDescription>导航菜单</SheetDescription>
    </SheetHeader>
    <nav>...</nav>
  </SheetContent>
</Sheet>
```

#### Tooltip 提示

```tsx
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="icon">
      <HelpIcon />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>帮助信息</p>
  </TooltipContent>
</Tooltip>
```

#### DropdownMenu 下拉菜单

```tsx
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="icon">
      <MoreIcon />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>编辑</DropdownMenuItem>
    <DropdownMenuItem>删除</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### 业务组件

#### FeatureCard 功能卡片

用于首页功能展示：

```tsx
import { FeatureCard } from '@/components/feature-card'

<FeatureCard 
  titleKey="features.learn.title"
  descKey="features.learn.desc"
  icon={<BookOpenIcon />}
/>
```

**样式规范**
- 居中布局
- 渐变图标背景
- hover 时上移 `-translate-y-1`
- 图标 hover 时放大 `scale-105`

#### StatsCard 统计卡片

用于数据展示：

```tsx
import { StatsCard } from '@/components/stats-card'

<StatsCard 
  label="stats.characters"
  value="1,234"
  icon={<BookIcon />}
/>
```

**样式规范**
- 居中布局
- 大数值字体 `text-3xl font-bold`
- 小标签字体 `text-sm text-muted-foreground`

---

### 组件使用规则

#### 通用规则

1. **使用语义化颜色**：`bg-background`、`text-foreground`、`text-muted-foreground`
2. **使用 `cn()` 合并类名**：
   ```tsx
   import { cn } from '@/lib/utils'
   
   <div className={cn("base-class", condition && "conditional-class")} />
   ```

3. **间距使用 `gap-*`**：避免 `space-x-*` 或 `space-y-*`
   ```tsx
   // 正确
   <div className="flex gap-4">
   
   // 错误
   <div className="flex space-x-4">
   ```

4. **等宽等高使用 `size-*`**：
   ```tsx
   // 正确
   <div className="size-10">
   
   // 错误
   <div className="w-10 h-10">
   ```

5. **truncate 替代三属性**：
   ```tsx
   // 正确
   <div className="truncate">
   
   // 错误
   <div className="overflow-hidden text-ellipsis whitespace-nowrap">
   ```

#### 表单规则

1. **使用 FieldGroup + Field 结构**（如果项目有定义）
2. **验证状态**：`data-invalid` 在 Field，`aria-invalid` 在控件
3. **InputGroup 使用专用组件**：`InputGroupInput`、`InputGroupTextarea`

#### Overlay 规则

1. **Dialog/Sheet 必须有 Title**：使用 `className="sr-only"` 隐藏标题
2. **使用 `asChild` 传递触发器**：
   ```tsx
   <DialogTrigger asChild>
     <Button>打开</Button>
   </DialogTrigger>
   ```

3. **不手动设置 z-index**：组件自动处理层级

---

## 交互标准

### 交互模式库

#### 导航模式

| 模式 | 用途 | 实现 |
|------|------|------|
| 顶部导航 | 主要页面导航 | 固定顶部，毛玻璃效果 |
| 底部导航 | 移动端导航 | 固定底部，图标+文字 |
| 侧边导航 | 复杂应用导航 | Sheet 组件 |
| 标签导航 | 内容分类 | Tabs 组件 |

#### 操作模式

| 模式 | 用途 | 实现 |
|------|------|------|
| 主操作 | 页面主要动作 | Button `variant="default"` |
| 次操作 | 辅助动作 | Button `variant="outline"` |
| 危险操作 | 删除、确认 | Dialog + Button `variant="destructive"` |
| 快捷操作 | 常用功能 | Button `variant="icon"` |

#### 选择模式

| 模式 | 用途 | 实现 |
|------|------|------|
| 单选下拉 | 选项选择 | Select 组件 |
| 开关选择 | 二元选择 | Switch 组件 |
| 标签选择 | 分类切换 | Tabs 组件 |
| 多选 | 多项选择 | Checkbox 组 |

---

### 交互反馈规范

#### Hover 状态

| 元素 | 反馈 |
|------|------|
| 按钮 | 轻微放大 `scale(1.02)`，背景变化 |
| 卡片 | 上移 `-translate-y-1`，阴影增强 |
| 链接 | 下划线显示，颜色变化 |
| 图标按钮 | 背景显示，图标放大 `scale(1.1)` |

#### Focus 状态

| 元素 | 反馈 |
|------|------|
| 输入框 | 边框颜色变化，ring 效果 |
| 按钮 | 边框 ring 效果 |
| 链接 | ring 效果 |

**焦点环规范**
```css
focus-visible:border-ring
focus-visible:ring-3
focus-visible:ring-ring/50
```

#### Active 状态

| 元素 | 反馈 |
|------|------|
| 按钮 | 轻微缩小 `translate-y-px` |
| 卡片 | 无额外反馈 |

#### Loading 状态

使用 Skeleton 组件：

```tsx
import { Skeleton } from '@/components/ui/skeleton'

<Skeleton className="h-8 w-full" />
```

#### Success 状态

| 元素 | 反馈 |
|------|------|
| 输入框 | 绿色边框 `border-[#34c759]` |
| 操作 | Toast 提示 |

---

### 错误处理规范

#### 表单错误

1. **输入框错误状态**：
   ```tsx
   <Input 
     aria-invalid 
     className="border-destructive"
   />
   ```

2. **错误消息**：
   ```tsx
   <p className="text-sm text-destructive font-medium">
     请输入有效的汉字
   </p>
   ```

#### 操作错误

使用 Toast 提示（sonner）：

```tsx
import { toast } from 'sonner'

toast.error('操作失败', {
  description: '请稍后重试'
})
```

#### 页面错误

1. **404 页面**：友好的空状态设计
2. **网络错误**：提示重试按钮
3. **权限错误**：提示登录/权限不足

---

### 空状态设计规范

#### 空状态元素

| 元素 | 规范 |
|------|------|
| 图标 | 大尺寸图标，柔和颜色 |
| 标题 | `text-lg font-medium` |
| 描述 | `text-muted-foreground` |
| 操作 | 主要操作按钮 |

#### 空状态示例

```tsx
<div className="flex flex-col items-center justify-center py-16 gap-4">
  <div className="size-16 rounded-full bg-muted flex items-center justify-center">
    <BookOpenIcon className="size-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-medium">暂无学习记录</h3>
  <p className="text-muted-foreground text-center max-w-sm">
    开始你的汉字学习之旅，记录每一次进步
  </p>
  <Button>开始学习</Button>
</div>
```

#### 空状态场景

| 场景 | 图标 | 标题 | 操作 |
|------|------|------|------|
| 无数据 | 空盒子图标 | "暂无数据" | "添加数据" |
| 无搜索结果 | 搜索图标 | "未找到结果" | "清除搜索" |
| 无学习记录 | 书本图标 | "暂无学习记录" | "开始学习" |
| 无练习记录 | 铅笔图标 | "暂无练习记录" | "开始练习" |
| 错误状态 | 错误图标 | "加载失败" | "重新加载" |

---

## 附录

### CSS 变量完整列表

```css
:root {
  /* 语义化颜色 */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
  
  /* 字体 */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  --font-hanzi: 'Noto Sans SC', sans-serif;
  
  /* 触控目标 */
  --touch-target-min: 44px;
}
```

### 深色模式变量

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}
```

### 可访问性检查清单

- [ ] 所有装饰性 SVG 图标添加 `aria-hidden="true"`
- [ ] 功能性图标按钮添加 `aria-label`
- [ ] Dialog/Sheet 有 Title（可隐藏）
- [ ] 表单控件有 Label 关联
- [ ] 错误状态使用 `aria-invalid`
- [ ] 支持 `prefers-reduced-motion`
- [ ] 支持 `color-scheme: light dark`
- [ ] 焦点可见 (`focus-visible`)
- [ ] 触控目标最小 44px

---

**版本**: 4.0  
**更新日期**: 2025-06-11  
**基于**: shadcn/ui radix-nova preset + Apple Human Interface Guidelines