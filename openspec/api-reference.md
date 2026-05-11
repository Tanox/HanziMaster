# API 참조

## 환경 변수
애플리케이션은 다음 환경 변수를 사용합니다:

```bash
GEMINI_API_KEY=<your-api-key>
APP_URL=<application-url>
SHARED_APP_URL=<shared-application-url>
```

## 브라우저 요구사항
- 최신 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- JavaScript 활성화 필요
- localStorage 지원 필요

## 빌드 및 배포

### 개발 서버 시작
```bash
npm install
npm start
```
개발 서버: http://localhost:3000

### 프로덕션 빌드
```bash
npm run build
```
출력 디렉토리: `dist/hanzi-master`

### 테스트 실행
```bash
npm test
```

### 린트 검사
```bash
npm run lint
```

## 번들 크기 예산
- 초기 번들: 최대 500KB (현재 594KB - 최적화 필요)
- 컴포넌트 스타일: 최대 4KB

## 애니메이션 프로바이더
Angular Material 애니메이션을 위해 `provideAnimationsAsync()` 사용:

```typescript
// app/app.config.ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync()
  ]
};
```
