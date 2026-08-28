# Time Picker

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2229-8835) — Frame `2229:8835`("Time Picker", 진열 프레임 248×156px), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`time-picker.json`](./time-picker.json)을 함께 참고합니다. 이 문서와 time-picker.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-picker/`에 위치하는 Date/Time Picker 패밀리의 구성원입니다. [Time Field](../time-field/time-field.md)를 인스턴스로 그대로 조합해서 만들어진 **상위 컴포넌트**이며, 역으로 [Time Picker Group](../time-picker-group/time-picker-group.md)에서 이 컴포넌트를 다시 인스턴스로 재사용합니다(5장) — Text Input/Dropdown이 서로를 재사용하는 계층 구조와 동일한 패턴입니다.

## 0. 문서 범위와 샘플링 방법

Time Picker는 **Direction(Down Only/Up Only/Both) 단일 축, 3-변형 컴포넌트**입니다. 3개 변형 전부 동일한 56×116px 크기입니다.

- `get_design_context`를 최상위 프레임(`2229:8835`)에 **1회** 호출해 3개 변형 전체가 조건부 prop(`direction`)으로 병합된 하나의 코드로 반환되었습니다 — 개별 노드 3개를 따로 호출할 필요가 없었습니다. 코드의 `id={...}` 삼항식에 박힌 3개 `data-node-id`(`2229:8832`/`2229:8833`/`2229:8834`)가 작업 지시의 노드 ID와 **정확히 일치**함을 확인했습니다(7장 부록).
- 이 병합 코드 안에는 [Time Field](../time-field/time-field.md)의 축약 정의가 함께 포함되어 있어, **Time Picker가 실제로 Time Field를 인스턴스로 조합해서 만들어졌음을 코드 레벨에서 직접 확인**했습니다(5장).
- `get_variable_defs`는 상위 그룹(`2497:13877`)에서 이미 확보된 공용 변수맵을 재사용했습니다 — 이 컴포넌트에서 쓰인 변수(`spacing/02,06`, `radius/06`)가 전부 공용 맵에 포함되어 있어 개별 재호출을 하지 않았습니다.
- **모션 데이터 없음** — `get_motion_context`를 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출한 결과 `{"nodes":[]}`였습니다(오케스트레이터 사전 확보, 패밀리 전체 11개 컴포넌트 공용 — 6장 참고).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Time Picker는 위/아래 화살표로 시간 값을 증감시키는 **스테퍼(stepper) UI**입니다. 세로로 [위쪽 화살표 버튼] → [Time Field 값] → [아래쪽 화살표 버튼]이 쌓인 구조입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Direction** | Down Only / Up Only / Both | 어느 방향의 증감이 활성화되어 있는지. 활성 방향의 화살표 아이콘은 진하게, 비활성 방향은 옅게 렌더링됨(실측 확인, 3장) |

## 2. 레이아웃 구조

루트: `flex-col`, `items-center`, gap `spacing/02`=2px.

1. **위쪽 화살표 Icon Button**: `p-spacing/06`=8px, `radius/06`=12px, 내부 20px 아이콘(chevron_up 계열)
2. **[Time Field](../time-field/time-field.md) 인스턴스**: `h-40px w-full`, State가 **항상 Default로 고정**됨(5장)
3. **아래쪽 화살표 Icon Button**: 위쪽과 동일 스타일, 내부 20px 아이콘(chevron_down 계열)

**크기 산출**: Icon Button은 20px 아이콘 + `spacing/06`×2(16px) 패딩 = 36×36px 정사각형. 전체 높이 = 36(위 버튼) + `spacing/02`(2px) + 40(Time Field) + `spacing/02`(2px) + 36(아래 버튼) = **116px**. 폭은 `items-center`로 정렬된 자식 중 가장 넓은 Time Field(56px) 기준 **56px** — 작업 지시의 "전부 56×116px" 실측과 정확히 일치합니다.

## 3. Direction별 아이콘 활성/비활성 표현 (3개 전수 실측)

| Direction | 위쪽 화살표 | 아래쪽 화살표 |
|---|---|---|
| **Down Only** | `chevron_up`(옅은 회색, 비활성으로 보임) | `chevron_down`(진한 회색, 활성) |
| **Up Only** | `chevron_up`("1" 접미사 에셋, 진한 회색, 활성) | `chevron_down`("1" 접미사 에셋, 옅은 회색, 비활성) |
| **Both** | `chevron_up`("1" 접미사 에셋, 진한, 활성) | `chevron_down`(진한, 활성) |

코드상 각 화살표 방향마다 서로 다른 두 개의 SVG 에셋 URL(기본형과 `1` 접미사형)이 `direction` 값에 따라 스위칭되며, 스크린샷으로 육안 대조한 결과 활성 방향은 진한 회색, 비활성 방향은 옅은 회색으로 시각적으로 구분됩니다. 다만 `get_design_context`가 반환하는 것은 외부 SVG 에셋 URL뿐이라 **정확한 hex 색상값은 코드로 확인되지 않습니다** — 확인 필요.

## 4. 핵심 발견

1. **Time Picker는 Time Field를 실제로 인스턴스로 조합합니다.** 병합 코드에 Time Field의 축약 정의(`state?: "Default"`만 남은 타입)가 그대로 포함되어 있어, 별도 구조가 아니라 Time Field 컴포넌트를 그대로 가져다 쓰는 것이 코드 레벨에서 확인됩니다.
2. **Time Picker 안의 Time Field는 진열 변형상 State=Default로 고정되어 보였습니다.** Time Picker 자신의 3개 Direction 변형 어디에도 내장 Time Field의 Hover/Typing이 노출되어 있지 않았습니다. **사용자 확인 완료** — 실제로는 Figma 변형 스냅샷에 반영되지 않았을 뿐, Time Picker 안의 Time Field도 클릭하면 Typing 상태로 전환되어 직접 타이핑 입력이 가능합니다. 즉 Time Picker는 스테퍼 버튼(증감)과 직접 타이핑을 모두 지원하는 하이브리드 입력입니다.
3. **비활성 방향은 완전히 사라지지 않고 옅은 색 아이콘으로 남습니다.** 예: Down Only에서 위쪽 화살표 버튼 자체는 여전히 렌더링되고 자리를 차지하되, 아이콘만 옅은 톤으로 바뀝니다. **사용자 확인 완료** — 이 버튼은 실제로 `disabled` 처리되어 클릭이 막힙니다(단순 시각적 처리가 아님).

## 5. 서브컴포넌트 재사용 관계

- **Time Field**: [`components/date-picker/time-field/time-field.md`](../time-field/time-field.md)를 그대로 인스턴스로 사용. State=Default로 고정(4장 핵심 발견 2).
- **Time Picker Group에서 재사용**: [`components/date-picker/time-picker-group/time-picker-group.md`](../time-picker-group/time-picker-group.md)가 이 컴포넌트를 2~3개 인스턴스로 조합합니다. Time Picker Group 자신의 병합 변형 코드 안에서는 내장 Time Picker가 진열상 Direction=Down Only로 고정되어 보였으나, **사용자 확인 완료** — 실제로는 Picker Count(2/3)와 Direction(Up Only/Down Only/Both) 모두 다양하게 조합되어 쓰입니다.

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출한 결과(오케스트레이터 사전 확보, 패밀리 11개 컴포넌트 전체 공용) `{"nodes":[]}`였습니다. 값 증감 시 숫자가 바뀌는 전환 효과, 버튼 Pressed 피드백 등에 대한 duration/easing 값이 Figma 파일에 정의되어 있지 않습니다.

## 7. 접근성

- 위/아래 스테퍼 버튼은 `aria-label`("시간 증가"/"시간 감소" 등) 연결 규정이 Figma에 없습니다 — 확인 필요.
- 비활성 방향(예: Down Only의 위쪽 화살표)은 실제로 `disabled` 처리되어 클릭이 막힙니다(사용자 확인, 4장 핵심 발견 3). 다만 `aria-disabled` 등 정확한 접근성 속성 연결 규정은 Figma에 없음 — 확인 필요.
- 내장된 Time Field의 접근성 요구사항([time-field.md](../time-field/time-field.md) 7장)이 그대로 적용됩니다.
- 스테퍼 전체가 `<input type="number">` 네이티브 스핀 버튼을 대체하는 커스텀 UI일 가능성이 높아, 키보드 조작(↑/↓ 화살표 키)과의 매핑 규정이 필요해 보이나 Figma에 명시되어 있지 않습니다 — 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- Spacing: `spacing/02`=2px, `spacing/06`=8px → `ref-spacing-02/06`과 일치
- Radius: `radius/06`=12px → `ref-radius-06`
- 아이콘 크기: 20px(다른 컴포넌트의 20px 아이콘 규칙과 일관)
- 내장 Time Field의 모든 토큰(5장 참고, [time-field.md](../time-field/time-field.md) 8장과 동일)

**확인 완료(사용자 확인)**
- Time Picker 내부 Time Field가 실제로 Hover/Typing 상태로 작동함(직접 타이핑 가능)
- Time Picker Group 안에서 Picker Count(2/3)·Direction(Up/Down/Both) 모두 다양하게 조합되어 쓰임
- 비활성 방향 버튼은 실제로 `disabled` 처리되어 클릭이 막힘(시각적으로만 옅어지는 것이 아님)

**기존 토큰에 없음 / 확인 필요**
- 활성/비활성 화살표 아이콘의 정확한 색상값 — 에셋 URL로만 확인되어 hex 대조 불가
- Direction 3종의 활성/비활성 표현 규칙(진한 vs 옅은 아이콘) 자체를 규정하는 토큰/문서 없음

## 9. 샘플링에 사용한 노드 (부록, 3개 전수)

| Direction | 노드 ID |
|---|---|
| Down Only | `2229:8834` |
| Up Only | `2229:8833` |
| Both | `2229:8832` |

3개 변형 전체가 `get_design_context` 1회 호출(`2229:8835`)로 병합 코드로 반환되었으며, 위 노드 ID는 그 코드의 조건부 `id={...}` 분기에 박힌 `data-node-id`를 정리한 것입니다. `get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 확보한 값을 재사용했습니다.
