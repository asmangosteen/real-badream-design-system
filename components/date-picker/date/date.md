# Date

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2208-10687) — Frame `2208:10687` ("Date"), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`date.json`](./date.json)을 함께 참고합니다. 이 문서와 date.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-picker/`에 위치합니다 — [Week](../week/week.md) → [Month](../month/month.md) → [Date Picker](../date-picker/date-picker.md)로 이어지는 Date/Time Picker 컴포넌트 패밀리의 최하위 아톰(달력의 날짜 셀 1개)입니다. 다른 그룹(Text Input 등)에서 재사용되지 않으므로 `components/global/`이 아니라 이 패밀리 전용 폴더에 둡니다.

## 0. 문서 범위와 샘플링 방법

Date는 **Type(Default/Current/Selected/Pinned/Null) × Status(Default/Hover/Pressed/Disabled) 2축, 11-변형 컴포넌트**입니다. Type=Default·Current만 Status 4종을 모두 가지며(2×4=8), Type=Selected/Pinned/Null은 Status=Default 1개씩만 존재합니다(3×1=3) — 축이 비직교(non-orthogonal)입니다. `get_metadata`로 11개 심볼을 전수 확인했습니다.

- `get_design_context`를 최상위 프레임(`2208:10687`)에 1회 호출해 **11개 변형 전체가 하나의 병합 컴포넌트 코드**로 반환되었습니다 — Figma MCP가 조건부 prop(`type`/`status`)으로 변형을 합쳐 생성한 것으로, 11개 노드를 개별 호출할 필요가 없었습니다.
- `get_variable_defs`는 상위 그룹(`2497:13877`, Date/Time Picker 패밀리 전체)에서 1회 호출한 값을 재사용했습니다(패밀리 공용 변수맵).
- `get_motion_context`를 상위 그룹(`2497:13877`, recursive=true)에 호출해 Date/Time Picker 패밀리 전체(11개 컴포넌트)에 대해 빈 결과(`{"nodes":[]}`)를 확인했습니다 — 이 문서를 포함한 패밀리 전 문서에서 재사용합니다(6장).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Date는 달력에서 날짜 하나(예: "14")를 나타내는 **40×40px 원형 셀**입니다. 크기(Size) 축이 없고 모든 변형이 동일한 40×40px, `radius/12`(999px, 완전한 원)를 사용합니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Default / Current / Selected / Pinned / Null | 날짜의 의미론적 종류. Default=일반 날짜, Current=오늘, **Pinned=사용자가 직접 선택한 날짜(범위 선택의 시작/끝 앵커)**, **Selected=두 Pinned 날짜 사이의 기간(범위)이 잡혔을 때 그 사이 날짜들에 쓰이는 하이라이트**, **Null=문자 그대로 빈 칸**(사용자 확인 완료 — 4장) |
| **Status** | Default / Hover / Pressed / Disabled | 상호작용 상태. **Type=Default·Current에서만 4종 전부 존재**하고, Selected/Pinned/Null은 Status=Default 고정 — 의도된 설계(사용자 확인, 3장 참고) |

## 2. Type별 스펙

| Type | 배경 | 테두리 | 텍스트 색상/타이포 | 비고 |
|---|---|---|---|---|
| **Default** | `common/white-default`(#fdfdfd, Status=Default·Hover·Pressed 공통 베이스) | 없음 | `neutral/800`(#202837), Body 1/16 R | 일반 날짜 |
| **Current** | `common/white-default`(#fdfdfd) | `borderwidth/02`=1px, `neutral/600`(#5b616c) — Status=Default·Hover·Pressed 공통 | `neutral/800`(#202837), Body 1/16 R | 오늘. 테두리로만 구분되고 배경·텍스트 색은 Default와 동일 |
| **Selected** | `brand/primary-lightest`(#eef4fc) | 없음 | `neutral/800`(#202837), Body 1/16 R | **범위(range) 선택 시 두 Pinned 날짜 사이의 날짜들에 쓰이는 구간 하이라이트**(사용자 확인 완료). 테두리 없이 옅은 파란 배경만으로 표현 |
| **Pinned** | `brand/primary-default`(#2c7be2) | 없음 | `common/white-default`(#fdfdfd), **SubTitle/18 M**(다른 Type보다 크고 굵음) | **사용자가 직접 선택한 날짜(범위의 시작/끝 앵커)**(사용자 확인 완료). 유일하게 타이포가 다름 — 단일 날짜 선택 시에도 Pinned 하나만 찍힐 것으로 추정 |
| **Null** | `common/white-default`(#fdfdfd) | 없음 | 텍스트 없음(빈 원) | **문자 그대로 빈 칸**(사용자 확인 완료). 달력 그리드에서 이전/다음 달의 빈 칸 등으로 쓰일 것으로 추정 |

## 3. Status별 스펙 (Type=Default·Current 한정, 4종 전수 실측)

| Status | 배경 오버레이 | 텍스트 색상 | 기타 |
|---|---|---|---|
| **Default** | 없음(베이스 배경 그대로) | `neutral/800` | — |
| **Hover** | `color/gray/900-2`(rgba(3,9,26,0.02), 베이스 위에 2% 검정 오버레이) | `neutral/800`(변화 없음) | `cursor-pointer` |
| **Pressed** | `color/gray/900-5`(rgba(3,9,26,0.05), 베이스 위에 5% 검정 오버레이) — Figma 변수명은 `color/interaction/light-gray/hover`와 동일 값(`#03091a0d`)이나 이 컴포넌트에서는 Pressed 상태에 쓰임 | `neutral/800`(변화 없음) | 값이 클수록(5%>2%) Hover보다 진한 것으로 Pressed가 Hover보다 강한 인터랙션임을 시각적으로 표현 |
| **Disabled** | 없음(오버레이 없이 텍스트 색만 변경) | `neutral/400`(#c2c4c8, Default의 neutral/800보다 옅음). **Current+Disabled는 테두리 색도 `neutral/300`(#dbdcdf)으로 옅어짐**(Default/Hover/Pressed의 `neutral/600`보다 연함) | — |

Selected/Pinned/Null은 Status=Default 변형만 존재해 Hover/Pressed/Disabled 조합이 Figma 컴포넌트 자체에 없습니다.

> **사용자 확인 완료**: Pinned를 다시 클릭하면 별도의 Pressed 시각 효과 없이 배경색이 바로 빠지며 Type=Default로 전환(선택 해제)됩니다 — Hover/Pressed 변형이 없는 것은 의도된 설계입니다.

> **사용자 확인 완료(Type의 의미)**: Pinned=사용자가 직접 선택한 날짜(범위 선택의 시작/끝 앵커), Selected=두 Pinned 날짜 사이의 기간(범위)이 잡혔을 때 그 사이 날짜들에 쓰이는 하이라이트, Null=문자 그대로 빈 칸. 이는 이 컴포넌트가 **단일 날짜뿐 아니라 기간(range) 선택을 지원하도록 설계**되었음을 확정해줍니다 — [Date Picker Group](../date-picker-group/date-picker-group.md)의 좌우 비대칭 헤더 구조(한쪽은 드롭다운만, 한쪽은 이전/다음 이동만)도 범위 선택 UI라는 맥락에서 재해석할 수 있습니다.

## 4. 타이포그래피 상세

| 스타일 | 적용 대상 | 폰트 | 크기/줄높이/자간 |
|---|---|---|---|
| **Body 1/16 R** | Default·Current(Disabled 포함), Selected | `font/pretendard`, `weight/400` Regular | `size/Body1`=16px, `lineHeight/Body1`=24px, `letterSpacing/Body`=-0.04px |
| **SubTitle/18 M** | Pinned | `font/pretendard`, `weight/500` Medium | `size/Subtitle`=18px, `lineHeight/Subtitle`=24px, `letterSpacing/Subtitle`=-0.09px |

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Status 전환(Default↔Hover↔Pressed)에 대한 duration/easing 등 모션 값이 Figma 파일에 정의되어 있지 않습니다.

## 6. 접근성

- 날짜 셀이 실제로는 버튼(`<button type="button">`)이어야 할 것으로 보이나, Disabled 상태의 `disabled`/`aria-disabled` 속성 연결 규정이 Figma에 없습니다 — 확인 필요.
- Selected 상태에 `aria-selected`/`aria-current="date"`(Current 겸용 시) 등 스크린리더용 상태 전달 마크업이 필요해 보이나 Figma 파일에 규정 없음 — 확인 필요.
- Selected가 배경색(연한 파랑)만으로 표현되어 색상에만 의존하는 문제(WCAG 1.4.1)가 있을 수 있습니다 — Current(테두리)와 달리 형태적 구분이 없습니다. 실제 구현 시 아이콘/테두리 등 색 이외의 구분 수단 추가가 필요할 수 있음 — 확인 필요.
- Null(빈 셀)은 `aria-hidden="true"` 또는 빈 `<td>`로 처리되어야 포커스 트랩을 피할 수 있을 것으로 보이나 확인 필요.

## 7. 토큰 매칭 요약

**정확히 일치**
- 배경색: `common/white-default`(#fdfdfd) → `sys-color-common-white-default`, `brand/primary-lightest`(#eef4fc) → `sys-color-brand-primary-lightest`(`ref-color-blue-50`), `brand/primary-default`(#2c7be2) → `sys-color-brand-primary-default`
- 텍스트/테두리: `neutral/800`(#202837), `neutral/600`(#5b616c), `neutral/400`(#c2c4c8), `neutral/300`(#dbdcdf) 전부 `sys-color-neutral-*` → `ref-color-gray-*`와 일치
- Hover/Pressed 오버레이: `color/gray/900-2`(2%), `color/gray/900-5`(5%) → 저장소 `tokens/colors.json`의 `ref-color-alpha-gray-900-2/5`와 일치
- Radius: `radius/12`=999px → `ref-radius-12`
- Border width: `borderwidth/02`=1px → `ref-borderwidth-02`
- 타이포: Body 1/16 R, SubTitle/18 M 전부 `tokens/typography.json`과 일치

**기존 토큰에 없음**
- Type(Default/Current/Selected/Pinned/Null) 5종의 의미론적 이름 자체와 각각에 어떤 색상 조합을 쓸지 규정하는 "Date 셀 전용" 시맨틱 토큰은 저장소에 없음(개별 색상 값 자체는 토큰과 일치)
- Selected/Pinned/Null에 Hover/Pressed/Disabled가 없는 규칙을 명시하는 문서/토큰 없음

**확인 완료(사용자 확인)**
- Pinned=사용자가 직접 선택한 날짜(범위 선택 앵커), Selected=두 Pinned 사이 구간 하이라이트, Null=빈 칸 — 이 컴포넌트는 단일 날짜뿐 아니라 기간(range) 선택을 지원하도록 설계됨(3장)
- Pinned에 Hover/Pressed 변형이 없는 것은 의도된 설계임. **Pinned를 다시 누르면(클릭) 배경색이 빠지며 선택이 해제**되는 방식으로, 별도의 Pressed 시각 상태 없이 곧바로 Type=Default로 전환됨

**확인 필요**
- Null Type의 접근성 처리 방식(6장)
- 접근성 마크업(`aria-selected`, `aria-current`, `disabled` 등) 연결 규정

## 8. 샘플링에 사용한 노드 (부록, 11개 전수)

| Type＼Status | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| **Default** | `2208:10681` | `2208:10678` | `2208:10676` | `2208:10684` |
| **Current** | `2208:10685` | `2208:10677` | `2208:10675` | `2208:10682` |
| **Selected** | `2208:10680` | — | — | — |
| **Pinned** | `2208:10683` | — | — | — |
| **Null** | `2208:10679` | — | — | — |

11개 변형 전체가 `get_design_context` 1회 호출(`2208:10687`)로 병합 코드로 반환되었으며, 위 노드 ID는 그 코드에 `data-node-id`로 포함된 값을 정리한 것입니다. `get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 1회씩 확보했습니다.
