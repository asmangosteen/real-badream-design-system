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
| Toggle | [components/toggle/toggle.md](./toggle/toggle.md) | 완료 | 24개 인스턴스 (Size S/L × Status Off/On × Disabled False/True × Label True/False × Label Location Left/Right/No, Location은 Label에 종속). Hover/Pressed/Focused 축 없음. 전수 실측 |
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
| Text Input | [components/text-input/text-input/text-input.md](./text-input/text-input/text-input.md) | 완료 | 768개 인스턴스 (Size S/M/L × State 6종 × Destructed(Selected·Typing 전용) × Show Button/Show Label/Supporting Text/Left Icon/Right Icon 각 2종) + 별도 boolean 프로퍼티 `Show Unit`(단위 텍스트 토글, variant 축 아님). Label/Type Box/Text Blinker/Supporting Text 4개 서브 아톰의 실 사용처. Type Box의 캐럿(Selected/Typing) 상태가 실제로 쓰임을 확인. 15개 노드 전략적 샘플링(0장 참고) |
| Text Input Group | [components/text-input/text-input-group/text-input-group.md](./text-input/text-input-group/text-input-group.md) | 완료 | 6개 인스턴스 (Size S/M/L × Field 2/3). Text Input 2~3개를 수직 정렬해 조합한 컴포넌트, 첫 번째 필드만 Label 표시. 전수 실측 |
| Date | [components/date-picker/date/date.md](./date-picker/date/date.md) | 완료 | 11개 인스턴스 (Type Default/Current/Selected/Pinned/Null × Status Default/Hover/Pressed/Disabled, Default·Current만 4종, 축 비직교). Date/Time Picker 패밀리 최하위 아톰(날짜 셀). 전수 실측 |
| Week | [components/date-picker/week/week.md](./date-picker/week/week.md) | 완료 | 1개 인스턴스(변형 축 없음). Date 7개를 가로로 묶은 한 주(週) 행. 전수 실측 |
| Week Header | [components/date-picker/week-header/week-header.md](./date-picker/week-header/week-header.md) | 완료 | 1개 인스턴스(변형 축 없음). 요일 라벨(일~토) 행, 일요일만 강조색. Month와 함께 쓰임을 Date Picker에서 후속 확인. 전수 실측 |
| Month | [components/date-picker/month/month.md](./date-picker/month/month.md) | 완료 | 2개 인스턴스 (Week Number 5/6). Week를 5~6개 세로로 쌓은 달력 그리드 본체(Week Header 미포함). 전수 실측 |
| Year and Month Wheel | [components/date-picker/year-month-wheel/year-month-wheel.md](./date-picker/year-month-wheel/year-month-wheel.md) | 완료 | 1개 인스턴스(변형 축 없음). 연/월을 한 쌍으로 스크롤하는 7행 휠 피커, 거리 기반 타이포·투명도 감쇠. 전수 실측 |
| Calendar Header | [components/date-picker/calendar-header/calendar-header.md](./date-picker/calendar-header/calendar-header.md) | 완료 | 6개 인스턴스 (Title Left/Center × With Arrows/Close/Nothing) + 별도 boolean 프로퍼티 `Show Dropdown`(확인 필요). 전수 실측 |
| Time Field | [components/date-picker/time-field/time-field.md](./date-picker/time-field/time-field.md) | 완료 | 3개 인스턴스 (State Default/Hover/Typing). 시간 값 2자리를 담는 최소 단위 입력 필드, Text Blinker 재사용. 전수 실측 |
| Time Picker | [components/date-picker/time-picker/time-picker.md](./date-picker/time-picker/time-picker.md) | 완료 | 3개 인스턴스 (Direction Down Only/Up Only/Both). Time Field를 조합한 위/아래 스테퍼. 전수 실측 |
| Time Picker Group | [components/date-picker/time-picker-group/time-picker-group.md](./date-picker/time-picker-group/time-picker-group.md) | 완료 | 2개 인스턴스 (Picker Count 2/3). Time Picker 2~3개를 콜론(`:`) 구분자로 조합. 전수 실측 |
| Date Picker | [components/date-picker/date-picker/date-picker.md](./date-picker/date-picker/date-picker.md) | 완료 | 4개 인스턴스 (State Default/Wheel × Time Picker Off/On). 달력 그리드+연월 휠+시간 선택을 한 패널에 담은 패밀리 플래그십 컴포넌트. 전수 실측 |
| Date Picker Group | [components/date-picker/date-picker-group/date-picker-group.md](./date-picker/date-picker-group/date-picker-group.md) | 완료 | 2개 인스턴스 (Type Horizontal/Vertical). Date Picker 2개를 Divider로 구분해 나란히 배치한 범위 선택 조합 컴포넌트. 전수 실측 |

## components/date-picker/란

`components/date-picker/` 폴더는 달력(Date Picker)·시간 선택(Time Picker) UI를 구성하는 **11개 컴포넌트로 이루어진 하나의 패밀리**를 모아두는 곳입니다. Button/Text Input 그룹과 같은 하위 폴더 패턴을 쓰지만, 이 패밀리는 [Date](./date-picker/date/date.md)(날짜 셀) → [Week](./date-picker/week/week.md)/[Week Header](./date-picker/week-header/week-header.md) → [Month](./date-picker/month/month.md) → [Calendar Header](./date-picker/calendar-header/calendar-header.md)/[Year and Month Wheel](./date-picker/year-month-wheel/year-month-wheel.md) → [Time Field](./date-picker/time-field/time-field.md) → [Time Picker](./date-picker/time-picker/time-picker.md) → [Time Picker Group](./date-picker/time-picker-group/time-picker-group.md) → **[Date Picker](./date-picker/date-picker/date-picker.md)**(플래그십) → [Date Picker Group](./date-picker/date-picker-group/date-picker-group.md)로 이어지는 명확한 조합 계층을 가진다는 점이 다릅니다. 서브 아톰들이 이 패밀리 밖(Text Input 등)에서 재사용되지 않아 `components/global/`이 아니라 전용 폴더에 두었습니다.

## components/global/이란

`components/global/` 폴더는 Input, TextField, TextArea 등 **여러 상위 컴포넌트에서 공통으로 재사용되는 작은 서브 아톰**을 모아두는 곳입니다. Avatar가 Chip의 서브컴포넌트로 쓰이는 것과 비슷하게, 이 폴더의 컴포넌트들은 단독으로 화면에 배치되는 완성형 컴포넌트가 아니라 다른 컴포넌트 내부의 한 조각(텍스트 커서, 필드 라벨, 글자 수 카운터 등)입니다. 문서 구조와 실측 원칙은 다른 컴포넌트와 동일합니다.

예외적으로 `Segmented Control Item`(`_Item`)과 `Tab Item`(`_Item`)은 실제로는 각각 [Segmented Control](./segmented-control/segmented-control.md), [Tab](./tab/tab.md) **단 하나**에서만 쓰이지만, Figma 파일 안에서 디자이너가 이를 독립된 별도 컴포넌트로 명시적으로 분리해둔 아토믹 디자인 의도를 존중해 같은 `components/global/` 패턴으로 문서화했습니다. 두 컴포넌트 모두 Figma 레이어명은 동일하게 `_Item`이지만 서로 다른 컴포넌트이므로, 폴더명은 `segmented-control-item`/`tab-item`으로 구분했습니다.

## 문서화 상태 범례

- **완료**: Figma에서 실측하여 축별 스펙, 인터랙션(또는 모션 데이터 없음 명시), 접근성, 토큰 매칭까지 작성 완료
- **진행중**: 일부 축만 조사됨
- **미착수**: 아직 문서화되지 않음
