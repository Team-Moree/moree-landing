# moree-landing

Moree 랜딩 페이지. moree-admin과 **완전히 분리된 별도 프로젝트**로, 독립 Vercel 프로젝트로 배포한다.

## 스택
- Vite + React 18
- 의존성 최소 (react, react-dom만)

## 로컬 실행
```bash
npm install
npm run dev      # http://localhost:3001
```

## 빌드
```bash
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 미리보기
```

## 배포 (Vercel)
1. 이 레포를 Vercel 대시보드에서 **새 프로젝트로 Import**
2. Framework Preset: **Vite** 자동 감지 (Build: `npm run build`, Output: `dist`)
3. Production Branch: `main`
4. Settings → Domains 에서 커스텀 도메인 연결

> moree-admin과 별개 프로젝트라 서로 배포/환경변수 영향 없음.
