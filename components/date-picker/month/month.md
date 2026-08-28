# Month

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2208-10947) — 진열 프레임 `2208:10947` ("Month", 716×310px) 안에 두 변형 심볼 `2208:10946`("Week Number=5")·`2208:10945`("Week Number=6"), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`month.json`](./month.json)을 함께 참고합니다. 이 문서와 month.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-picker/`에 위치합니다 — Date/Time Picker 컴포넌트 패밀리 중 [Week](../week/week.md)를 세로로 5~6개 쌓아 만드는 **달력 한 달치 그리드**입니다.

## 0. 문서 범위와 샘플링 방법

`get_metadata`(오케스트레이터 사전 확보)로 상위 프레임 `2208:10947`("Month", 716×310px)의 구조를 먼저 조회했습니다. 그 결과 이 프레임은 실제 컴포넌트가 아니라 **두 개의 독립된 심볼을 나란히 진열해둔 Figma 진열용 컨테이너**임이 확인되었습니다:

```
<frame id="2208:10947" name="Month" x="252" y="-417" width="716" height="310">
  <symbol id="2208:10946" name="Week Number=5" x="20" y="20" width="328" height="224" />
  <symbol id="2208:10945" name="Week Number=6" x="368" y="20" width="328" height="270" />
</frame>
```

두 심볼 각각에 `get_design_context`를 호출해 실측했습니다.

- `get_design_context`(`2208:10946`, Week Number=5) — 5개 Week 행이 세로로 쌓인 구조를 확인
- `get_design_context`(`2208:10945`, Week Number=6) — 6개 Week 행이 세로로 쌓인 구조를 확인
- `get_variable_defs`는 상위 그룹(`2497:13877`)에서 이미 확보된 공용 변수맵을 재사용했습니다 — 새로 등장한 변수는 없었습니다.
- `get_motion_context`는 패밀리 최상위 그룹(`2497:13877`, recursive=true)에서 이미 확인되어 모션 데이터 없음이 확정되어 있습니다(재호출하지 않음, 5장 참고).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Month는 한 달의 날짜를 담는 **달력 그리드 본체**입니다. [Week](../week/week.md) 행을 세로로 5개 또는 6개 쌓아서 만들어지며, 실측 결과 그 자체로는 [Week Header](../week-header/week-header.md)(요일 라벨 행)를 포함하지 않습니다 — Month는 순수하게 날짜 행(Week)들의 스택입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Week Number** | 5 / 6 | 해당 달이 달력 그리드에서 몇 개의 주(週) 행을 차지하는지. 5주에 걸치는 달(예: 28~31일이 5개 행 안에 들어가는 배치)은 `Week Number=5`, 6주에 걸치는 달(월 초/말 여백까지 포함해 6개 행이 필요한 배치)은 `Week Number=6` |

**"Week Number=5/6"가 실제 variant 프로퍼티인지 확인**: 두 심볼의 레이어 이름이 Figma의 표준 variant 인스턴스 명명 규칙인 `"PropertyName=Value"` 형식(`Week Number=5`, `Week Number=6`)을 그대로 따르고 있고, `get_design_context`가 각 노드에서 `MonthProps` 타입에 `weekNumber?: "5"`/`weekNumber?: "6"`를 변형 프로퍼티로 인식해 반환했습니다. 이는 단순히 "5주짜리 달과 6주짜리 달의 예시 두 개를 나란히 진열해둔 것"이 아니라, **`Week Number`라는 이름의 실제 컴포넌트 variant 프로퍼티(값 5/6)로 정의되어 있다는 강한 근거**입니다 — 다만 두 심볼이 하나의 COMPONENT_SET으로 그룹화되어 있는지(진짜 Figma variant) 아니면 이름만 같은 규칙을 따르는 별개의 두 컴포넌트인지는 `get_metadata`/`get_design_context` 응답만으로는 100% 확정할 수 없어 **정황상 확인, 완전한 확정은 아님**으로 명시합니다.

**너비**: 두 변형 모두 328px 고정([Week](../week/week.md)와 동일 — Week 자체가 이미 고정폭이므로 Month도 동일 폭을 상속).

**높이**: Week Number에 따라 결정되는 가변값 — 아래 2장 계산식 참고.

## 2. Week Number별 스펙 (2개 전수 실측)

| 항목 | Week Number=5 | Week Number=6 |
|---|---|---|
| **노드 ID** | `2208:10946` | `2208:10945` |
| **Week 행 개수** | 5개 | 6개 |
| **전체 크기** | 328×224px | 328×270px |
| **높이 계산식** | 40px×5 + `spacing/05`(6px)×4 = 200+24 = **224px**(실측값과 정확히 일치) | 40px×6 + `spacing/05`(6px)×5 = 240+30 = **270px**(실측값과 정확히 일치) |
| **Week 행 간 세로 gap** | `spacing/05` = 6px | `spacing/05` = 6px(동일) |
| **컨테이너** | `display: flex`, `flex-direction: column`, `align-items: flex-start` | 동일 |

**핵심 확인**: [Week](../week/week.md) 문서에서 실측한 그대로(40×40px 셀 7개, gap `spacing/06`=8px, 전체 328×40px) 두 변형 모두 정확히 재사용되고 있습니다. Week 행 자체의 내부 구조(Date 셀 7개)는 Month 안에서 전혀 변형되지 않고, **Week 행이 세로로 몇 번 반복되는지(5회 vs 6회)만** 두 변형의 차이입니다.

## 3. Week Header와의 조합 여부

이번 실측(`2208:10946`, `2208:10945` 두 노드의 `get_design_context` 코드 트리) 안에는 **[Week Header](../week-header/week-header.md)(요일 라벨 행)가 포함되어 있지 않습니다.** Month 컴포넌트 자체는 순수하게 Week 행들의 세로 스택일 뿐이며, 요일 라벨은 별도 컴포넌트로 분리되어 있습니다.

작업 지시에서 제기된 "Week/Week Header를 조합해서 만들어졌는지" 가설에 대한 답: **Month는 Week만 조합해서 만들어졌고, Week Header는 조합되어 있지 않습니다.** 두 컴포넌트가 실제 화면(예: [Date Picker](../date-picker/date-picker.md))에서 함께(Week Header 위 + Month 아래) 배치되는지는, [Week Header](../week-header/week-header.md) 문서 5장에서도 언급했듯 치수(너비 328px, 열 너비 40px, gap 8px)가 정확히 일치해 세로 정렬되도록 의도된 것으로 강하게 추정되었습니다.

> **후속 확인 완료**: [Date Picker](../date-picker/date-picker.md) 문서 작성 과정에서 `2224:3249`(State=Default)를 `get_metadata`로 실측한 결과, Calendar 컨테이너 안에 Week Header(y=12, h=22px)와 Month·Week Number=5(y=42, h=224px)가 실제로 세로로 조합되어 쓰이는 것을 확인했습니다. 둘 사이 간격은 8px(`spacing/06`)이며, 컨테이너 좌우 패딩(12px) 안에서 두 컴포넌트의 328px 너비가 정확히 일치해 열이 자연스럽게 세로 정렬됩니다. 이 실측은 Default State가 항상 **Week Number=5**를 쓴다는 것도 함께 확인시켜 줍니다(위 1장의 정황 증거를 실제 사용 사례로 보강).

## 4. 서브컴포넌트 재사용 관계

- **Week**: [`components/date-picker/week/week.md`](../week/week.md)를 5회(Week Number=5) 또는 6회(Week Number=6) 그대로 인스턴스화합니다. `get_design_context`가 반환한 `Week` 함수 정의가 week.md에 실측된 스펙(gap `spacing/06`=8px, 7개 Date 셀, 전체 328×40px)과 **정확히 일치**합니다.
- **Date**: Week를 통해 간접적으로 재사용됩니다. 두 변형 모두 각 Week 행의 Date 셀이 7개 전부 `Type=Default, Status=Default, "00"` 플레이스홀더로 고정되어 있어([Week](../week/week.md) 1장과 동일한 관찰), 실제 달력에서 각 셀에 실제 날짜·Type이 어떻게 매핑되는지는 이번 실측 범위로는 확인하지 못했습니다.

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`가 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에서 이미 호출되어 `{"nodes":[]}`(빈 결과)로 확인되었습니다 — 패밀리 전체 공용으로 재사용합니다.

> **사용자 확인 완료**: Week Number=5↔6 전환(월 이동 시 그리드 행 수 변화) 시 그리드 높이는 **즉시(애니메이션 없이) 변경**됩니다. 별도의 리사이즈 트랜지션은 없습니다.

## 6. 접근성

- Month 전체가 시맨틱하게 `role="grid"` 또는 `<table>`로 마크업되고, 각 Week 행이 `role="row"`/`<tr>`로 감싸여야 할 것으로 보이나 Figma 파일에 규정 없음 — 확인 필요(이는 [Week](../week/week.md) 5장에서 이미 확인 필요로 남긴 사항과 연결됩니다).
- Week Number=5/6에 따라 그리드의 총 행 수가 달라지므로, 스크린리더 사용자가 "이번 달은 몇 주에 걸쳐 있는지"를 인지할 수 있는 방법(예: `aria-rowcount`)이 필요해 보이나 확인 필요.
- 각 셀의 접근성 처리는 [Date](../date/date.md) 6장·[Week](../week/week.md) 5장의 확인 필요 사항을 그대로 따릅니다.

## 7. 토큰 매칭 요약

**정확히 일치**
- Week 행 간 세로 gap: `spacing/05`=6px → `ref-spacing-05`
- 전체 너비: 328px(Week와 동일)
- 높이 계산식(224px/270px)이 Week 행 개수×40px + gap×(개수-1) 공식과 정확히 일치
- Week/Date 서브컴포넌트 스펙 전부 [week.md](../week/week.md)·[date.md](../date/date.md)와 일치

**기존 토큰에 없음**
- "Month(달력 한 달 그리드)"라는 레이아웃 자체를 규정하는 시맨틱 토큰은 저장소에 없음
- Week Number가 5/6 두 가지로만 존재하는 규칙(달력 그리드 계산 로직 자체)을 명시하는 토큰/문서 없음

**확인 필요**
- "Week Number=5/6"가 진짜 Figma COMPONENT_SET variant인지, 이름만 같은 규칙을 따른 별개 컴포넌트인지(1장 — 정황상 variant로 추정되나 100% 확정은 아님)
- Month와 Week Header가 실제로 함께(세로 정렬) 쓰이는 조합 인스턴스 확인(3장)
- 각 Week 행의 Date 셀에 실제 날짜·Type이 매핑되는 규칙(이 샘플은 전부 Default 플레이스홀더)
- 접근성 마크업(`role="grid"`, `aria-rowcount` 등) 연결 규정
- ~~Month와 Week Header가 실제로 함께 쓰이는지~~ — **해소됨**(3장 후속 확인 참고, [Date Picker](../date-picker/date-picker.md)에서 확인)
- ~~Week Number=5↔6 전환 시 모션 처리~~ — **해소됨**(사용자 확인, 즉시 변경/애니메이션 없음, 5장 참고)

## 8. 샘플링에 사용한 노드 (부록)

| 목적 | 노드 |
|---|---|
| 상위 진열 프레임(구조 파악용, 컴포넌트 아님) | `2208:10947` |
| Week Number=5 (5개 Week 행, 328×224px) | `2208:10946` |
| Week Number=6 (6개 Week 행, 328×270px) | `2208:10945` |

`get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 이미 확보된 값을 재사용했습니다(재호출 없음).
