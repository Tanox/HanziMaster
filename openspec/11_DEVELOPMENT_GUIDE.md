
# 11. 开发指南 (Development Guide)

## 1. 技术栈 (Tech Stack)

### 1.1 核心框架
*   **Runtime**: React 19
*   **Language**: TypeScript 5.7+
*   **Build Tool**: Vite 6+
*   **Styling**: Tailwind CSS 3.4+

### 1.2 关键库
*   **AI SDK**: `@google/genai` (Google 官方 Gemini SDK)
*   **PWA**: `vite-plugin-pwa` (基于 Workbox)
*   **Icons**: `lucide-react`
*   **Data**: `hanzi-writer-data` (笔画数据源)

## 2. 环境搭建 (Setup)

### 2.1 前置要求
*   Node.js v18.0.0+
*   npm v9+ 或 bun v1+

### 2.2 初始化
```bash
# 1. 克隆仓库
git clone https://github.com/sutchan/hanzimaster.git

# 2. 安装依赖 (同时会触发 postinstall 钩子准备数据)
npm install

# 3. 环境变量配置
# 复制 .env.example 为 .env
# 填入 VITE_API_KEY (开发用，非必须，App 支持用户端输入 Key)
```

### 2.3 启动开发服务器
```bash
npm run dev
# 访问 http://localhost:5173
```

### 2.4 离线数据准备
若发现汉字无法加载，请手动运行数据拷贝脚本：
```bash
npm run copy-data
```

## 3. 代码规范 (Coding Standards)

### 3.1 React 组件
*   **函数式组件**: 必须使用 `React.FC<Props>` 类型定义。
*   **Props 接口**: 必须显式定义 Interface，禁止使用 `any`。
*   **Hooks**: 遵循 Hooks 规则，复杂的 `useEffect` 必须在注释中说明依赖逻辑。

### 3.2 异步处理
*   **Async/Await**: 优于 `.then()` 链式调用。
*   **错误处理**: 所有 API 调用必须包裹在 `try/catch` 中，并提供 UI 层的 Fallback 反馈（如“网络不可用”状态）。

### 3.3 TypeScript
*   **严禁 Implicit Any**: `tsconfig.json` 已开启 `strict: true`。
*   **类型复用**: 通用类型定义在 `src/types/index.ts` 中，禁止在组件内部定义复杂的领域模型类型。

## 4. 提交规范 (Git Convention)

遵循 **Conventional Commits** 规范：
*   `feat: ...` : 新功能 (Feature)
*   `fix: ...` : 修复 Bug
*   `docs: ...` : 文档变更 (OpenSpec 更新)
*   `style: ...` : 代码格式调整 (不影响逻辑)
*   `refactor: ...` : 重构 (无新功能或 Bug 修复)
*   `chore: ...` : 构建过程或辅助工具变动

**示例**: `feat: 增加端午节时令推荐算法`

---
*文档维护: HanziMaster DevRel Team*
