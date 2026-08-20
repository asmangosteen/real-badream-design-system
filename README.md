# real-badream-design-system

배달라이더를 위한 전기바이크 플랫폼 **바드림**의 디자인 시스템 저장소입니다.
컬러, 타이포그래피, 스페이싱 등 디자인 토큰과 UI 원칙, 화면 흐름 문서, 로고·아이콘·폰트 원본 에셋을 관리합니다.

## 이 저장소는 무엇을 위한 건가요

- Figma 디자인 시스템 파일의 **코드/문서 버전**입니다. Figma가 원본이고, 이 저장소는 그걸 코드와 AI 도구가 읽을 수 있는 형태로 정리한 파생본입니다.
- Claude Design, Claude Code 등 AI 도구에 디자인 시스템을 연결할 때 이 저장소를 참조합니다.
- 개발자가 실제 컴포넌트를 구현할 때 토큰 값의 기준(source of truth)으로 사용합니다.

## 폴더 구조

| 폴더 | 내용 |
|---|---|
| `tokens/` | 컬러·타이포·스페이싱·라운드·그림자 값 (JSON + `tokens.css`) |
| `assets/logo/` | CI(사이클로이드)·BI(바드림) 로고, 앱 아이콘 |
| `assets/character/` | 드림맨·드림걸 캐릭터 (고객 응대용) |
| `assets/fonts/` | Pretendard 폰트 파일 + 라이선스 |
| `assets/icons/` | UI/Maker/BSS/Service 아이콘 전체 세트 |
| `docs/` | 디자인 원칙(DESIGN.md), 화면 흐름 및 UX 라이팅 가이드(SCREEN.md) |

## 사용 원칙

1. 색상은 항상 `tokens/tokens.css`의 CSS 변수로 참조하고, 임의 HEX 값을 새로 만들지 않습니다.
2. 로고·캐릭터·제조사 아이콘은 원본 그대로 사용하며 변형하지 않습니다.
3. UX 카피는 `docs/DESIGN.md`의 해요체 원칙을 따릅니다.
4. 토큰 값이나 원칙이 실제 Figma와 달라졌다면, Figma를 기준으로 이 저장소를 업데이트합니다 (Figma가 우선).

## 업데이트 방법

Figma 디자인 시스템이 바뀌면:
1. 변경된 Variables/컴포넌트를 확인
2. 해당 `tokens/*.json`, `tokens.css` 갱신
3. 필요 시 `docs/DESIGN.md` 반영
4. 커밋 메시지에 변경 내용 요약 (예: `update: primary color 값 변경`)

## 라이선스 / 사용 제한

- 폰트(Pretendard): SIL Open Font License 1.1 — `assets/fonts/LICENSE.txt` 참조
- 로고·캐릭터·아이콘: 바드림/사이클로이드 소유 자산, 외부 재배포 금지
