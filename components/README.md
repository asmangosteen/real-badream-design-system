# Components

바드림 디자인 시스템의 개별 컴포넌트 스펙 색인입니다. 각 컴포넌트는 `components/[name]/[name].md`(사람이 읽는 상세 스펙, 한국어)와 `components/[name]/[name].json`(기계 판독용 원시 값) 두 파일로 구성됩니다.

값의 출처는 Figma 파일이며, 색상/스페이싱/라운드/타이포그래피 토큰은 `tokens/` 폴더의 값과 대조하여 일치 여부를 표시합니다. 애매하거나 확인되지 않은 값은 "확인 필요"로 명시하고 임의로 만들지 않습니다.

## 컴포넌트 목록

| 컴포넌트 | 문서 | 상태 | 변형 수 |
|---|---|---|---|
| Button | [components/button/button/button.md](./button/button/button.md) | 완료 | 935개 인스턴스 (187개 고유 조합 × 5 Size) |
| Text Button | [components/button/text-button/text-button.md](./button/text-button/text-button.md) | 완료 | ~156 (Size 4 × Text Color 3 × State 5 × Contents 3) |
| Icon Button | [components/button/icon-button/icon-button.md](./button/icon-button/icon-button.md) | 완료 | ~108 (Size 3 × Type 6 × State 4 + Stroke/Icon Color 변형) |
| Button Spinner | [components/button/button-spinner/button-spinner.md](./button/button-spinner/button-spinner.md) | 완료 | 4 (Size S/M/L/XL). 버튼 Loading 상태의 스피너 아톰 |
| Badge | [components/badge/badge.md](./badge/badge.md) | 완료 | 210개 인스턴스 (Content 126 + Numeric 84). Figma상 4개 Component Set으로 분리됨 |
| Checkbox | [components/checkbox/checkbox.md](./checkbox/checkbox.md) | 완료 | 24개 인스턴스 (Angular 12 + Rounded 12). Figma상 2개 Component Set으로 분리됨 |
| Chip | [components/chip/chip.md](./chip/chip.md) | 완료 | 190개 인스턴스 (Selection 150 + Filter 40). Figma상 2개 Component Set으로 분리됨 |
| Avatar | [components/avatar/avatar.md](./avatar/avatar.md) | 완료 | 7개 인스턴스 (Size 12~48px). State 축 없는 순수 표시용 컴포넌트 |
| Divider | [components/divider/divider.md](./divider/divider.md) | 완료 | 8개 인스턴스 (Height 1~14px). State 축 없는 순수 표시용 컴포넌트 |

## 문서화 상태 범례

- **완료**: Figma에서 실측하여 축별 스펙, 인터랙션(또는 모션 데이터 없음 명시), 접근성, 토큰 매칭까지 작성 완료
- **진행중**: 일부 축만 조사됨
- **미착수**: 아직 문서화되지 않음
