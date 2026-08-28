# Week Header

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2208-10944) — Symbol `2208:10944` ("Week Header"), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`week-header.json`](./week-header.json)을 함께 참고합니다. 이 문서와 week-header.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-time-picker/`에 위치합니다 — Date/Time Picker 컴포넌트 패밀리 중 달력 그리드 상단의 **요일 라벨 행**입니다. [Week](../week/week.md)와 같은 열 너비(40px)·같은 gap(8px)을 써서 [Month](../month/month.md) 위에 세로로 정렬되도록 설계된 것으로 보입니다.

## 0. 문서 범위와 샘플링 방법

Week Header는 **변형(variant) 축이 없는 단일 심볼**입니다. `get_metadata`(오케스트레이터 사전 확보)로 `2208:10944` 하나만 존재함을 확인했고, `get_design_context`를 이 노드에 1회 호출해 텍스트 내용·타이포·색상·정렬을 전수 실측했습니다.

- `get_design_context`(`2208:10944`) 1회 호출로 7개 텍스트 노드(일~토) 전체를 실측했습니다.
- `get_variable_defs`는 상위 그룹(`2497:13877`)에서 이미 확보된 공용 변수맵을 재사용했습니다 — `theme/destructed-default`, `neutral/600`이 이 맵에 이미 포함되어 있어 새로 조회할 변수가 없었습니다.
- `get_motion_context`는 패밀리 최상위 그룹(`2497:13877`, recursive=true)에서 이미 확인되어 모션 데이터 없음이 확정되어 있습니다(재호출하지 않음, 4장 참고).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Week Header는 달력 그리드 최상단에 오는 **요일 라벨 행**(328×22px)입니다. "일, 월, 화, 수, 목, 금, 토" 7개 텍스트가 가로로 배열되어 있음을 실측으로 확인했습니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| — | 없음(단일 인스턴스) | 7개 요일 라벨이 고정 텍스트로 하드코딩된 정적 표시 컴포넌트. 텍스트를 교체 가능한 slot/prop으로 노출하는 구조가 아님(`get_design_context` 반환 코드에 prop 자체가 없음) |

## 2. 텍스트·레이아웃 상세 (전수 실측)

| 항목 | 값 |
|---|---|
| **컨테이너** | `display: flex`, `flex-direction: row`, `align-items: center` |
| **항목 간 gap** | `spacing/06` = 8px ([Week](../week/week.md)와 동일 — 아래 셀과 열이 세로로 맞춰지도록 설계된 것으로 추정) |
| **항목 너비** | 40px × 7개 ([Week](../week/week.md)의 Date 셀 40px과 동일) |
| **전체 너비** | 328px = 40px×7 + 8px×6 (Week와 정확히 일치) |
| **전체 높이** | 22px(텍스트 line-height 그대로, 별도 패딩 없음) |
| **정렬** | `text-align: center`(각 항목 내부) |

**텍스트 내용(좌→우 순서, 7개 전수)**: 일, 월, 화, 수, 목, 금, 토

## 3. 색상 스펙 (전수 실측)

| 요일 | 색상 |
|---|---|
| **일(Sunday)** | `theme/destructed-default`(#e72f37, 빨강) |
| **월/화/수/목/금/토** | `neutral/600`(#5b616c, 회색) — 6개 요일 전부 동일 색상 |

**핵심 발견**: 일요일만 강조색(에러 테마와 같은 빨강)으로 구분되고, **토요일은 평일과 동일한 회색**입니다. 흔한 캘린더 UI 관례(토요일을 파란색 등으로 별도 강조)와 달리 이 컴포넌트는 일요일 단독 강조 규칙을 씁니다.

## 4. 타이포그래피 상세 (전수 실측)

| 속성 | 실측값 |
|---|---|
| 폰트 | `Pretendard`, Medium(`weight/500`) |
| 크기 | 14px(리터럴 값 — `size/Body2` 변수 참조가 아닌 하드코딩된 숫자) |
| 줄높이 | 22px(리터럴 값 — `lineHeight/Body2` 변수 참조 아님) |
| 자간 | **-0.035px(리터럴 값)** |
| 정렬 | center |

**핵심 발견 — 토큰 변수 미바인딩**: 색상(`theme/destructed-default`, `neutral/600`)은 CSS 변수로 바인딩되어 있었지만, **타이포그래피 값(크기·줄높이·자간)은 변수 참조 없이 리터럴 숫자로 하드코딩**되어 있었습니다(`get_design_context` 반환 코드에서 색상만 `var(--theme/destructed-default,...)` 형태였고 크기·줄높이·자간은 순수 숫자). 크기(14px)·줄높이(22px)·굵기(Medium)는 저장소 `tokens/typography.json`의 `body2`(Medium 웨이트) 스타일과 정확히 일치하지만, **자간만 -0.035px로 측정되어 토큰의 `letterSpacing/Body`(-0.04px, `tokens/typography.json`의 body2 자간과도 동일)와 완전히 일치하지 않습니다.** 0.005px 차이는 Figma가 자간을 퍼센트 단위(글자 크기의 -0.25%)로 저장하고 이를 픽셀로 환산하는 과정에서 발생한 반올림 오차로 추정되나, 확인 필요입니다.

## 5. 서브컴포넌트 재사용 관계

Week Header는 다른 서브컴포넌트를 인스턴스로 재사용하지 않는, 텍스트 노드 7개로 구성된 **말단(leaf) 컴포넌트**입니다.

- 레이아웃 치수(항목 너비 40px, gap 8px)가 [Week](../week/week.md)의 Date 셀 치수·gap과 정확히 일치해, [Month](../month/month.md)/[Date Picker](../date-picker/date-picker.md) 상위 조합에서 Week Header가 Week 위에 놓였을 때 열이 세로로 정렬되도록 의도적으로 맞춘 것으로 보입니다.

> **후속 확인 완료**: [Date Picker](../date-picker/date-picker.md) 문서 작성 과정에서 `2224:3249`(State=Default)를 `get_metadata`로 실측한 결과, Calendar 컨테이너 안에 Week Header(y=12, h=22px)가 실제로 Month(y=42, h=224px, Week Number=5) 바로 위에 8px gap으로 조합되어 쓰이는 것을 확인했습니다. 위 추정이 실제 사용 사례로 확인되었습니다 — [month.md](../month/month.md) 3장 참고.

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`가 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에서 이미 호출되어 `{"nodes":[]}`(빈 결과)로 확인되었습니다 — 패밀리 전체 공용으로 재사용합니다. Week Header 자체는 순수 정적 텍스트 표시 컴포넌트로, 애초에 인터랙션 상태(Hover/Pressed 등) 축 자체가 없습니다.

## 7. 접근성

- 요일 라벨은 시맨틱하게 테이블 헤더(`<th scope="col">`) 또는 `role="columnheader"`로 마크업되어야 할 것으로 보이나 Figma 파일에 규정 없음 — 확인 필요.
- 스크린리더가 "일"을 "일요일"로 완전하게 읽도록 `aria-label="일요일"` 등 전체 명칭 연결이 필요해 보이나 Figma 파일에 규정 없음 — 확인 필요.
- 일요일의 빨강 강조가 **색상에만 의존**하고 있어(예: 굵기·아이콘 등 형태적 구분 없음) WCAG 1.4.1 관점에서 확인이 필요합니다 — Date 문서 6장에서 지적된 Selected 상태와 유사한 우려입니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- 항목 간 gap: `spacing/06`=8px → `ref-spacing-06`
- 색상: `theme/destructed-default`(#e72f37) → `sys-color-theme-destructed-default`, `neutral/600`(#5b616c) → `sys-color-neutral-600`
- 타이포 크기·줄높이·굵기: 14px/22px/Medium → `tokens/typography.json`의 `body2`(Medium) 스타일과 일치

**기존 토큰에 없음**
- "요일 헤더 행"이라는 레이아웃 자체를 규정하는 시맨틱 토큰은 저장소에 없음
- 일요일만 강조하고 토요일은 강조하지 않는 색상 규칙을 명시하는 토큰/문서 없음

**확인 필요**
- 자간 리터럴값(-0.035px)이 토큰(`letterSpacing/Body`=-0.04px)과 정확히 일치하지 않는 원인(반올림 오차 추정)
- 타이포가 변수가 아닌 리터럴로 하드코딩된 것이 의도적인지(다른 컴포넌트는 대부분 변수 바인딩을 사용함)
- 접근성 마크업(`scope="col"`, `aria-label`) 연결 규정
- 일요일 강조의 색상 단독 의존 여부(WCAG 1.4.1)
- ~~Month와 실제로 세로 정렬되어 함께 쓰이는지~~ — **해소됨**(5장 후속 확인 참고, [Date Picker](../date-picker/date-picker.md)에서 확인)

## 9. 샘플링에 사용한 노드 (부록)

| 목적 | 노드 |
|---|---|
| Week Header 전체(요일 라벨 7개 전수) | `2208:10944` |

`get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 이미 확보된 값을 재사용했습니다(재호출 없음).
