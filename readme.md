# 🛡️ Personal Security Portfolio & Chat-DLP Home

这是一个基于 Next.js 构建的个人作品集网站，旨在展示我的安全技术栈以及作为 Chat-DLP 插件的官方落地页。

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📅 Development Roadmap (项目进度表)

### Phase 1: Infrastructure & MVP (进行中)
- [x] 初始化 Next.js 项目环境
- [x] 配置 Tailwind CSS
- [ ] **Task 1:** 完成首页 (`app/page.tsx`) 开发
  - 包含 Hero Section (打字机效果)
  - 包含 Tech Stack 展示
  - 包含 Chat-DLP 项目卡片
- [ ] **Task 2:** 部署 `security.txt`
  - 路径: `public/.well-known/security.txt`
  - 内容: 符合 RFC 9116 标准

### Phase 2: Chat-DLP Product Page (产品详情页)
- [ ] 创建独立页面 `app/chat-dlp/page.tsx`
- [ ] 编写隐私政策 (`app/privacy/page.tsx`) - Chrome 商店发布必需
- [ ] 添加下载/安装引导教程

### Phase 3: Polish & SEO
- [ ] 添加 Open Graph (社交媒体分享时的预览图)
- [ ] 优化 SEO Meta tags (针对 "Security Researcher" 关键词)

## 📂 Project Structure Note
- `app/`: 主要页面逻辑
- `components/`: 可复用的 UI 组件 (如按钮、卡片)
- `public/`: 静态资源 (图片、PDF简历、security.txt)

## 🚀 Quick Start
```bash
npm run dev