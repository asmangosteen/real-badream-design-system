# Week

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2208-10748) — Symbol `2208:10748` ("Week"), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`week.json`](./week.json)을 함께 참고합니다. 이 문서와 week.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-picker/`에 위치합니다 — Date/Time Picker 컴포넌트 패밀리 중 [Date](../date/date.md) 셀 7개를 가로로 묶어 "한 주(週)" 행을 만드는 컴포넌트입니다. [Month](../month/month.md)이 이 컴포넌트를 세로로 5~6개 쌓아 만들어집니다(5장).

## 0. 문서 범위와 샘플링 방법

Week는 **변형(variant) 축이 없는 단일 심볼**입니다. `get_metadata`(오케스트레이터 사전 확보)로 `2208:10748` 하나만 존재함을 확인했고, `get_design_context`를 이 노드에 1회 호출해 전체 구조를 실측했습니다.

- `get_design_context`(`2208:10748`) 1회 호출로 트리 전체(7개 Date 인스턴스 + 레이아웃)를 확인했습니다.
- `get_variable_defs`는 상위 그룹(`2497:13877`, Date/Time Picker 패밀리 전체)에서 이미 확보된 공용 변수맵을 재사용했습니다 — 이 노드에서 새로 등장한 변수는 없었습니다(전부 공용 맵에 존재).
- `get_motion_context`는 패밀리 최상위 그룹(`2497:13877`, recursive=true)에서 이미 확인되어 모션 데이터 없음이 확정되어 있습니다(재호출하지 않음, 4장 참고).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Week는 달력 그리드의 **한 주(週) 행**을 나타내는 328×40px 컴포넌트입니다. [Date](../date/date.md) 컴포넌트 7개(일~토, 요일 하루치 셀)를 가로로 배열해서 만들어졌음을 `get_design_context` 실측으로 확인했습니다 — 반환된 코드에 `Date` 함수가 [date.md](../date/date.md)에서 실측한 것과 **동일한 구조**(40×40px, `radius/12`, 텍스트 `Body 1/16 R`)로 그대로 재정의되어 있고, `Week`는 이 `Date`를 7회 인스턴스화한 얇은 래퍼입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| — | 없음(단일 인스턴스) | Size·State 등 별도 variant 축이 이 노드 자체에는 없음. 각 셀의 Type/Status는 내부에 인스턴스화된 [Date](../date/date.md) 7개 각각의 variant로 결정됨(이 Week 인스턴스에서는 7개 전부 `Type=Default, Status=Default`, 표시값 `"00"`으로 고정되어 있음 — 실사용 시 각 셀에 실제 날짜·상태를 넣어 오버라이드하는 방식으로 추정) |

**실측 결과**: 이 Week 인스턴스는 7개 Date 셀 모두 `Type=Default`·`Status=Default`·표시 텍스트 `"00"`(플레이스홀더)로 고정된 진열용 샘플입니다. 실제 달력에서는 각 셀이 [Date](../date/date.md) 문서의 11개 변형(Type=Default/Current/Selected/Pinned/Null × Status) 중 해당 날짜에 맞는 조합으로 개별 교체되어 쓰일 것으로 추정됩니다 — 확인 필요(이 Week 심볼 자체에는 "몇 번째 요일이 오늘/선택됨"인지를 나타내는 실제 사례가 없음).

## 2. 레이아웃 스펙 (전수 실측)

| 요소 | 값 |
|---|---|
| **컨테이너** | `display: flex`, `flex-direction: row`, `align-items: center` |
| **셀 간 gap** | `spacing/06` = 8px |
| **셀 크기** | 40×40px × 7개 (= [Date](../date/date.md) 컴포넌트와 동일 스펙) |
| **전체 너비** | 328px = 40px×7 + 8px×6 (측정값과 정확히 일치) |
| **전체 높이** | 40px (Date 셀 높이와 동일, 별도 패딩 없음) |
| **셀 구성** | [Date](../date/date.md) 컴포넌트 7개, 좌→우로 일·월·화·수·목·금·토 순으로 배치되는 것으로 추정(이 Week 심볼 자체는 요일 라벨을 포함하지 않으므로 순서는 [Week Header](../week-header/week-header.md)와의 세로 정렬 위치로 추정 — 확인 필요) |

## 3. 서브컴포넌트 재사용 관계

- **Date**: [`components/date-picker/date/date.md`](../date/date.md)의 컴포넌트를 7회 그대로 인스턴스화합니다. `get_design_context`가 반환한 `Date` 함수 정의(배경 `common/white-default`, radius `radius/12`=999px, 크기 40×40px, 텍스트 `neutral/800`·`Body 1/16 R`)가 date.md에 실측된 스펙과 **정확히 일치**합니다. 이번 실측에서는 7개 셀 전부 `Type=Default`·`Status=Default`로 고정되어 있어, Date의 11개 변형(Current/Selected/Pinned/Null 포함) 중 다른 조합이 Week 안에서 실제로 쓰이는 모습은 이 샘플 하나로는 확인하지 못했습니다 — 사용 규칙(어떤 셀이 언제 Current/Selected가 되는지)은 [Date Picker](../date-picker/date-picker.md) 등 상위 컴포넌트 문서에서 확인이 필요합니다.

## 4. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`가 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에서 이미 호출되어 `{"nodes":[]}`(빈 결과)로 확인되었습니다 — 패밀리 전체(Date/Week/Week Header/Month/Year and Month Wheel 포함 11개 서브프레임) 공용으로 재사용합니다. Week 자체에 대해 별도로 재호출하지 않았습니다.

## 5. 접근성

- Week 자체는 시맨틱 그룹(예: 달력의 한 행, `<tr>` 또는 `role="row"`)으로 마크업되어야 할 것으로 보이나 Figma 파일에 규정 없음 — 확인 필요.
- 각 셀의 접근성 처리는 [Date 문서](../date/date.md) 6장의 확인 필요 사항(`aria-selected`, `aria-current`, `disabled` 등)을 그대로 따릅니다.
- 7개 셀의 순서(일~토 등)가 스크린리더에 논리적으로 읽히려면 요일 라벨([Week Header](../week-header/week-header.md))과의 명시적 연결(`aria-label` 등)이 필요해 보이나 Figma 파일에 규정 없음 — 확인 필요.

## 6. 토큰 매칭 요약

**정확히 일치**
- 셀 간 gap: `spacing/06`=8px → `ref-spacing-06`
- 셀 자체 스펙(배경·radius·타이포)은 [Date 문서](../date/date.md) 7장과 동일 — 전부 정확히 일치

**기존 토큰에 없음**
- "Week(주 단위 행)"이라는 레이아웃 자체를 규정하는 시맨틱 토큰은 저장소에 없음(개별 gap 값은 토큰과 일치)

**확인 필요**
- 각 셀에 실제 날짜·Type(Current/Selected/Pinned/Null)이 어떻게 매핑되는지 (이 심볼은 7개 전부 Default 플레이스홀더로 고정된 진열용 샘플)
- Week 컨테이너 자체의 시맨틱 마크업(행 역할) 규정

## 7. 샘플링에 사용한 노드 (부록)

| 목적 | 노드 |
|---|---|
| Week 전체(7개 Date 인스턴스 포함) | `2208:10748` |

`get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 이미 확보된 값을 재사용했습니다(재호출 없음).
