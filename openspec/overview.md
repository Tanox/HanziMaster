# 프로젝트 개요

## 기본 정보
- **프로젝트 이름**: HanziMaster 汉字大师
- **버전**: v2.1.3
- **설명**: AI 기반 중국어 문자 학습 플랫폼
- **프레임워크**: Angular 21 (Zoneless)
- **스타일링**: Tailwind CSS 4.0

## 핵심 기능
1. AI 기반 손글씨 분석 및 실시간 피드백
2. 적응형 학습 경로
3. 문자와 문화 어원 학습
4. 다크/라이트 모드 지원

## 기술 스택
- **프론트엔드**: Angular 21
- **스타일링**: Tailwind CSS 4.0
- **AI**: Google Gemini AI
- **아이콘**: Angular Material Icons
- **애니메이션**: Motion (Vanilla JS)
- **폰트**: Inter, JetBrains Mono, Noto Sans SC

## 프로젝트 구조
```
app/
├── components/
│   └── theme-toggle.ts
├── pages/
│   ├── home/
│   │   └── home.ts
│   └── learn/
│       └── learn.ts
├── app.config.ts
├── app.routes.ts
├── app.ts
├── globals.d.ts
├── index.html
├── main.ts
└── styles.css
```

## 환경 변수
- `GEMINI_API_KEY`: Gemini AI API 키
- `APP_URL`: 애플리케이션 URL
- `SHARED_APP_URL`: 공유 애플리케이션 URL
