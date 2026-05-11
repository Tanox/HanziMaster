# 코딩 컨벤션

## 파일 헤더 주석
모든 코드 파일의 첫 번째 줄은 다음 형식의 단일 줄 주석이어야 합니다:
```
// <root_relative_path> v<version>
```

예시:
```typescript
// app/app.ts v2.1.3
```

## 버전 관리 (SemVer 2.0.0)
코드 수정 시 다음 파일의 버전을 동시에 업데이트해야 합니다:
1. 현재 파일 헤더
2. HTML `<title>` 태그
3. `metadata.json`의 `AppName vX.Y.Z`
4. `CHANGELOG.md`에 새 항목 추가 (패치 버전 증가, 날짜 미기록)

## TypeScript 스타일
- **엄격 모드**: `strict: true` 활성화
- **변경 감지**: `ChangeDetectionStrategy.OnPush` 사용
- **Standalone 컴포넌트**: 모든 컴포넌트는 standalone으로 작성
- **신호(Signals)**: Angular 21 신호 활용

## Angular 컴포넌트 규칙
```typescript
@Component({
  selector: 'app-[component-name]',
  imports: [...],
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

## CSS/Tailwind 규칙
- Tailwind CSS 4.0 사용
- 다크 모드: `dark:` 접두사 활용
- hanzi 폰트: `.hanzi-font` 클래스 사용
- 의미론적 ID 추가

## 라우팅 규칙
- 지연 로딩 사용: `loadComponent`
- 경로 별칭: `@app/*` → `app/*`

## 주석 규칙
- 모든 함수에 간결한 주석 포함
- 복잡한 로직에 설명 추가
- 주석은 한 줄로 유지
