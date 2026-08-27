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
| Radio Button | [components/radio-button/radio-button.md](./radio-button/radio-button.md) | 완료 | 24개 인스턴스 (Checked False/True × State 4종 × Size S/M/L). 전수 실측 |
| Text Blinker | [components/global/text-blinker/text-blinker.md](./global/text-blinker/text-blinker.md) | 완료 | 2개 인스턴스 (State On/Off). `components/global/` 소속 — Input/TextField 서브 아톰(커서 표시) |
| Label | [components/global/label/label.md](./global/label/label.md) | 완료 | 6개 인스턴스 (Size S/M/L × Essential Off/On). `components/global/` 소속 — Input/TextField 서브 아톰(필드 라벨) |
| Text Count | [components/global/text-count/text-count.md](./global/text-count/text-count.md) | 완료 | 6개 인스턴스 (Size Small/Default × State 3종). `components/global/` 소속 — Input/TextField/TextArea 서브 아톰(글자 수 카운터) |
| Supporting Text | [components/global/supporting-text/supporting-text.md](./global/supporting-text/supporting-text.md) | 완료 | 36개 인스턴스 (Size S/M/L × Theme 6종 × Text Count True/False). `components/global/` 소속 — Input/TextField 하단 헬퍼·에러·성공 텍스트 서브 아톰. 10개 노드 선택 샘플링(0장 참고) |
| Type Box | [components/global/type-box/type-box.md](./global/type-box/type-box.md) | 완료 | 12개 인스턴스 (Size S/M/L × State Selected/Placeholder/Typing/Done). `components/global/` 소속 — Input/TextField 서브 아톰(입력값 타이포·캐럿 미리보기) |
| Dropdown | [components/dropdown/dropdown.md](./dropdown/dropdown.md) | 완료 | 288개 인스턴스 (Size S/M/L × State 5종 × Destructed(Selected 전용) × Show Button/Show Label/Supporting Text/Left Icon 각 2종). Label/Type Box/Supporting Text를 서브 아톰으로 재사용. 13개 노드 전략적 샘플링(0장 참고) |
| Segmented Control Item(`_Item`) | [components/global/segmented-control-item/segmented-control-item.md](./global/segmented-control-item/segmented-control-item.md) | 완료 | 10개 인스턴스 (Size XS/S/M/L/XL × Selected True/False). `components/global/` 소속 — Segmented Control 전용 서브 아톰(디자이너가 아토믹 디자인 목적으로 분리). 전수 실측 |
| Segmented Control | [components/segmented-control/segmented-control.md](./segmented-control/segmented-control.md) | 완료 | 20개 인스턴스 (Size XS/S/M/L/XL × Count 2~5). `_Item`을 조합해 만들어짐, 5개 Size 전부 `_Item`과 1:1 대응. 10개 노드 전략적 샘플링. (초기 조사 시 Size=S 노드 일부의 라벨-내용 불일치를 발견했고, 이후 Figma에서 Size=XS로 정정되어 해소됨 — 0-1장 참고) |
| Tab Item(`_Item`) | [components/global/tab-item/tab-item.md](./global/tab-item/tab-item.md) | 완료 | 12개 인스턴스 (Size S/L × Active On/Off × Disabled False/True × Emphasize Off/On, 축 비직교). `components/global/` 소속 — Tab 전용 서브 아톰(디자이너가 아토믹 디자인 목적으로 분리, Segmented Control Item과 동명이나 별개 컴포넌트). 전수 실측 |
| Tab | [components/tab/tab.md](./tab/tab.md) | 완료 | 10개 인스턴스 (Size S/L × Type Hug/Fill × Tailing Icon × Side Padding, 축 비직교). `_Item`(Tab Item)을 조합해 만들어짐 — Hug는 인스턴스 재사용(최대 8슬롯), Fill은 내부 구조를 5슬롯으로 인라인 복제. 오버플로우 마스크(`Alpha Gradient Mask`, node 2262:1908)로 가로 스크롤 페이드 구현. 전수 실측 |

## components/global/이란

`components/global/` 폴더는 Input, TextField, TextArea 등 **여러 상위 컴포넌트에서 공통으로 재사용되는 작은 서브 아톰**을 모아두는 곳입니다. Avatar가 Chip의 서브컴포넌트로 쓰이는 것과 비슷하게, 이 폴더의 컴포넌트들은 단독으로 화면에 배치되는 완성형 컴포넌트가 아니라 다른 컴포넌트 내부의 한 조각(텍스트 커서, 필드 라벨, 글자 수 카운터 등)입니다. 문서 구조와 실측 원칙은 다른 컴포넌트와 동일합니다.

예외적으로 `Segmented Control Item`(`_Item`)과 `Tab Item`(`_Item`)은 실제로는 각각 [Segmented Control](./segmented-control/segmented-control.md), [Tab](./tab/tab.md) **단 하나**에서만 쓰이지만, Figma 파일 안에서 디자이너가 이를 독립된 별도 컴포넌트로 명시적으로 분리해둔 아토믹 디자인 의도를 존중해 같은 `components/global/` 패턴으로 문서화했습니다. 두 컴포넌트 모두 Figma 레이어명은 동일하게 `_Item`이지만 서로 다른 컴포넌트이므로, 폴더명은 `segmented-control-item`/`tab-item`으로 구분했습니다.

## 문서화 상태 범례

- **완료**: Figma에서 실측하여 축별 스펙, 인터랙션(또는 모션 데이터 없음 명시), 접근성, 토큰 매칭까지 작성 완료
- **진행중**: 일부 축만 조사됨
- **미착수**: 아직 문서화되지 않음
