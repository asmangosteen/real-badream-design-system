# Date Picker

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2224-3250) — Component Set `2224:3250` ("Date Picker"), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`date-picker.json`](./date-picker.json)을 함께 참고합니다. 이 문서와 date-picker.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-picker/` 패밀리의 **플래그십(최상위) 컴포넌트**입니다 — [Date](../date/date.md) → [Week](../week/week.md) → [Month](../month/month.md) → [Calendar Header](../calendar-header/calendar-header.md) → [Year and Month Wheel](../year-month-wheel/year-month-wheel.md) → [Time Field](../time-field/time-field.md) → [Time Picker](../time-picker/time-picker.md) → [Time Picker Group](../time-picker-group/time-picker-group.md)를 전부 조합해서 만들어집니다. [Date Picker Group](../date-picker-group/date-picker-group.md)은 이 컴포넌트를 2개 조합해서 만든 상위 컴포넌트입니다.

## 0. 문서 범위와 샘플링 방법

Date Picker는 **State(Default/Wheel) × Time Picker(Off/On) 2축, 4-변형 컴포넌트**입니다. 4개 전수를 실측했습니다.

- `get_metadata`로 4개 변형 전부의 자식 구조(Calendar Header + Calendar[Week Header+Month 또는 Year and Month Wheel] + 선택적 Time Picker Group 섹션)를 먼저 확인했습니다: `2224:3249`(Default,Off), `2224:3248`(Wheel,Off), `2229:9130`(Default,On), `2229:9135`(Wheel,On).
- `get_design_context`를 Default·Wheel 두 State가 병합된 노드(`2224:3248`, State=Wheel 노드를 호출하면 Default/Wheel 조건부 컴포넌트가 함께 반환됨)와 Time Picker=On 섹션 단독(`2229:9303`)에 각각 호출해 전체 구조를 실측했습니다.
- `get_variable_defs`·`get_motion_context`는 패밀리 최상위 그룹(`2497:13877`)에서 확보한 값을 재사용했습니다(모션 데이터 없음 확인 — 6장).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Date Picker는 **날짜(달력 그리드 또는 연/월 휠) + 선택적 시간 선택 UI를 한 패널에 담은 완성형 날짜/시간 선택 컴포넌트**입니다. 항상 352px 고정 너비이며, `common/white-default`(#fdfdfd) 배경입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **State** | Default / Wheel | 날짜 탐색 방식. Default=달력 그리드([Week Header](../week-header/week-header.md)+[Month](../month/month.md)) 브라우징, Wheel=[Year and Month Wheel](../year-month-wheel/year-month-wheel.md)로 연/월을 빠르게 스크롤 선택 |
| **Time Picker** | Off / On | 하단 [Time Picker Group](../time-picker-group/time-picker-group.md)(시:분 스테퍼) 섹션 표시 여부 |

**전체 레이아웃**: [Calendar Header](../calendar-header/calendar-header.md)(항상 표시, 56px 고정 높이) → Calendar 콘텐츠 영역(State에 따라 그리드/휠 전환) → (Time Picker=On일 때만) 구분선 + Time Picker Group 섹션.

## 2. Calendar Header 상세 (State에 따른 변화)

Calendar Header 자체는 [별도 문서](../calendar-header/calendar-header.md)에서 6개 변형(Title=Left/Center × With=Arrows/Close/Nothing)으로 전수 문서화되어 있으나, Date Picker 안에서는 아래 2가지 조합만 실제로 쓰입니다.

| Date Picker State | Calendar Header 구성 | 대응하는 Calendar Header 변형 |
|---|---|---|
| **Default** | "연도 월"(예: "2000년 1월", SubTitle/18 SB) + `arrowhead_down` 20px 아이콘(Wheel 모드로 전환하는 토글로 추정) + Arrow Box(이전/다음 달 이동, `chevron_left`/`chevron_right` 24px, Icon Button 2개) | Title=Left, With=Arrows |
| **Wheel** | 동일 텍스트 + `arrowhead_up` 20px 아이콘(Default로 되돌리는 토글, 방향만 반전) + 우측에 Icon Button 1개(`close`/X 아이콘, 휠 모드 취소로 추정) | Title=Left, With=Close(Arrow Box 없이 단일 닫기 버튼) |

공통 스펙: 컨테이너 `h-[56px]`, `pl=spacing/11`(20px) `pr=spacing/06`(8px) `py=spacing/06`(8px), 내부 gap `spacing/08`(12px). Icon Button은 `p=spacing/06`(8px), `radius=radius/06`(12px) — [Icon Button 문서](../../button/icon-button/icon-button.md)의 패턴과 일치.

**Figma 레이어명 주의**: Arrow Box·Wheel 닫기 버튼 안의 아이콘 레이어명이 전부 `Icon / Default / 24px / plus`로 되어 있으나, 실제 렌더링되는 SVG 에셋은 `chevron_left`/`chevron_right`/`close`입니다(2224:2812;2212:1650의 레이어명은 "plus"지만 asset URL은 chevron-left 아이콘). 레이어 이름이 복사·붙여넣기 과정에서 갱신되지 않은 것으로 보이며, 실제 아이콘은 스크린샷/asset URL 기준으로 판단했습니다 — 확인 필요(사용자에게).

## 3. Calendar 콘텐츠 영역 (State별)

| State | 콘텐츠 | 컨테이너 스타일 |
|---|---|---|
| **Default** | [Week Header](../week-header/week-header.md) + [Month](../month/month.md)(Week Number=5, 5주 그리드) | `p=spacing/08`(12px), 배경/테두리 없음, `w-full` |
| **Wheel** | [Year and Month Wheel](../year-month-wheel/year-month-wheel.md) 단독(328×254px) | `p=spacing/08`(12px), **배경 `neutral/100`(#f6f7f7) + 상단 테두리 `neutral/200`(#f1f2f3) 추가**, `w-[352px]` 고정. Calendar Header와 시각적으로 구분되는 패널로 전환됨 |

두 State 모두 Calendar 콘텐츠 영역 높이는 278px로 고정되어(56px 헤더 + 278px = 334px 전체) Week Header+Month(그리드)와 Year and Month Wheel(휠)이 같은 높이 예산 안에서 서로 대체되는 구조입니다.

## 4. Time Picker 섹션 (Time Picker=On)

Time Picker=On일 때 Calendar 콘텐츠 영역 아래에 148px 높이의 섹션이 추가됩니다(`2229:9303`/`2229:9327`, 전체 높이 334→482px).

- 컨테이너: 상단 테두리 `color/gray/200`(#f1f2f3, `neutral/200`과 동일 값)만 있는 구분선 역할 + `p=spacing/10`(16px) + `flex flex-col items-center justify-center`(가로 중앙 정렬)
- 내부 콘텐츠: [Time Picker Group](../time-picker-group/time-picker-group.md)의 **Picker Count=2** 변형(Time Picker 2개 + 가운데 Colon(":") 구분자, 132×116px)이 그대로 인스턴스로 쓰입니다. Picker Count=3(시:분:초) 조합은 이 컴포넌트에서 관찰되지 않았습니다 — 확인 필요.
- Time Picker Group의 각 [Time Picker](../time-picker/time-picker.md)는 위/아래 Icon Button(`chevron_up`/`chevron_down` 20px, `p=spacing/06`=8px, `radius=radius/06`=12px) + 가운데 [Time Field](../time-field/time-field.md)(`bg=neutral/200`, `radius=radius/06`=12px, `px=spacing/07`=10px `py=spacing/06`=8px, 내부 "00" 텍스트 Body1/16 R neutral/800)로 구성됩니다. 이 문서에서 실측된 Time Field는 State=Default 1종만 확인되었습니다(Hover/Typing은 [time-field.md](../time-field/time-field.md)에서 별도 실측).

## 5. 크기 요약

| 변형 | 전체 크기(w×h) |
|---|---|
| Default, Time Picker=Off | 352×334px |
| Wheel, Time Picker=Off | 352×334px |
| Default, Time Picker=On | 352×482px |
| Wheel, Time Picker=On | 352×482px |

Time Picker=On이 추가하는 148px는 State(Default/Wheel)와 무관하게 고정값입니다.

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다 — State 전환(Default↔Wheel 토글, 이전/다음 달 이동, Time Picker=On/Off 전환)에 대한 duration/easing 등 모션 값이 Figma 파일에 정의되어 있지 않습니다.

## 7. 접근성

- Default↔Wheel 토글 아이콘(`arrowhead_down`/`arrowhead_up`)에 `aria-expanded`/`aria-label`("연월 빠른 선택 전환" 등) 연결 규정이 Figma에 없습니다 — 확인 필요.
- Wheel 모드의 닫기 버튼(`close`)에 `aria-label` 규정 없음 — 확인 필요.
- Arrow Box(이전/다음 달 버튼)에 대한 `aria-label="이전 달"`/`"다음 달"` 등 스크린리더 레이블 규정 없음 — 확인 필요.
- Year and Month Wheel은 시각적으로 hover/focus 없이 스크롤로만 조작되는 것으로 보이는데, 키보드 전용 사용자를 위한 대체 조작(예: 네이티브 `<select>` 대체 UI, 화살표 키 증감) 규정이 Figma에 없습니다 — [year-month-wheel.md](../year-month-wheel/year-month-wheel.md) 접근성 절 참고, 확인 필요.
- Time Picker 섹션의 위/아래 스테퍼 버튼에 `aria-label` 및 값 변경을 알리는 `aria-live`/`role="spinbutton"` 등 규정 없음 — [time-picker.md](../time-picker/time-picker.md) 참고, 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- Calendar Header 패딩(`spacing/11`=20px, `spacing/06`=8px), 내부 gap(`spacing/08`=12px), 높이(56px 고정)
- Icon Button 패턴(`spacing/06`=8px 패딩, `radius/06`=12px) → [Icon Button 문서](../../button/icon-button/icon-button.md)와 일치
- Wheel 콘텐츠 배경 `neutral/100`(#f6f7f7), 테두리 `neutral/200`/`color/gray/200`(#f1f2f3) → `sys-color-neutral-100/200`
- Time Picker 섹션 패딩 `spacing/10`=16px
- 서브컴포넌트([Date](../date/date.md), [Week Header](../week-header/week-header.md), [Month](../month/month.md), [Year and Month Wheel](../year-month-wheel/year-month-wheel.md), [Time Field](../time-field/time-field.md), [Time Picker](../time-picker/time-picker.md), [Time Picker Group](../time-picker-group/time-picker-group.md)) 전부 각 서브컴포넌트 문서와 정확히 일치하는 값으로 인스턴스화됨

**기존 토큰에 없음**
- State(Default/Wheel) × Time Picker(Off/On) 조합 규칙 자체를 명시하는 시맨틱 토큰/문서는 저장소에 없음
- Time Picker 섹션의 148px 고정 높이는 별도 토큰이 아니라 Figma 진열값

**확인 필요**
- Arrow Box·Wheel 닫기 버튼 아이콘의 실제 레이어명("plus")과 렌더링 에셋(chevron/close) 불일치 — 실측 코드/스크린샷 기준으로 chevron·close로 판단(2장)
- Default↔Wheel 토글이 정확히 Calendar Header의 어느 요소를 클릭해 발생하는지(제목 텍스트? 아이콘만?)
- Time Picker Group의 Picker Count=3(시:분:초) 조합이 Date Picker에서 실제로 쓰이는지(관찰된 예시는 Count=2뿐)
- 접근성 마크업(`aria-expanded`, `aria-label`, `role="spinbutton"` 등) 연결 규정 전반(7장)

## 9. 샘플링에 사용한 노드 (부록, 4개 전수)

| State＼Time Picker | Off | On |
|---|---|---|
| **Default** | `2224:3249` | `2229:9130` |
| **Wheel** | `2224:3248` | `2229:9135` |

`get_design_context`는 `2224:3248`(State=Wheel 노드 호출 시 Default/Wheel 병합 코드 반환) + `2229:9303`(Time Picker=On 섹션 단독)에 호출했으며, `get_metadata`로 4개 변형 전체의 자식 트리를 먼저 확인했습니다. `get_variable_defs`·`get_motion_context`는 패밀리 최상위 그룹(`2497:13877`)에서 공용으로 확보했습니다.
