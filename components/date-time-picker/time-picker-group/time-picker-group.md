# Time Picker Group

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2229-8932) — Frame `2229:8932`("Time Picker Group", 진열 프레임 248×304px), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`time-picker-group.json`](./time-picker-group.json)을 함께 참고합니다. 이 문서와 time-picker-group.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-time-picker/`에 위치하는 Date/Time Picker 패밀리의 최상위 조합 컴포넌트입니다. [Time Picker](../time-picker/time-picker.md) 2~3개를 콜론(`:`) 구분자와 함께 가로로 배열해서 만들어졌습니다(5장) — Text Input Group이 Text Input을 조합하는 것과 동일한 패턴입니다.

## 0. 문서 범위와 샘플링 방법

Time Picker Group은 **Picker Count(2/3) 단일 축, 2-변형 컴포넌트**입니다.

- `get_design_context`를 최상위 프레임(`2229:8932`)에 **1회** 호출해 2개 변형 전체가 조건부 prop(`pickerCount`)으로 병합된 하나의 코드로 반환되었습니다 — 개별 노드 2개를 따로 호출할 필요가 없었습니다. 코드의 `id={...}` 삼항식에 박힌 2개 `data-node-id`(`2229:8930`/`2229:8931`)가 작업 지시의 노드 ID와 **정확히 일치**함을 확인했습니다(7장 부록).
- 이 병합 코드 안에는 [Time Picker](../time-picker/time-picker.md)의 축약 정의(및 그 내부의 [Time Field](../time-field/time-field.md) 축약 정의)가 함께 포함되어 있어, **Time Picker Group이 실제로 Time Picker를 인스턴스로 조합해서 만들어졌음을 코드 레벨에서 직접 확인**했습니다(5장).
- `get_variable_defs`는 상위 그룹(`2497:13877`)에서 이미 확보된 공용 변수맵을 재사용했습니다 — 이 컴포넌트에서 쓰인 변수(`spacing/06`)가 공용 맵에 포함되어 있어 개별 재호출을 하지 않았습니다.
- **모션 데이터 없음** — `get_motion_context`를 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출한 결과 `{"nodes":[]}`였습니다(오케스트레이터 사전 확보, 패밀리 전체 11개 컴포넌트 공용 — 6장 참고).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Time Picker Group은 [Time Picker](../time-picker/time-picker.md) 스테퍼 2개(시:분) 또는 3개(시:분:초 등)를 콜론(`:`) 구분자와 함께 가로로 배열한 **완성형 시간 선택 컴포넌트**입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Picker Count** | 2 / 3 | 몇 개의 Time Picker를 조합할지. 2개는 132×116px, 3개는 208×116px |

## 2. 레이아웃 구조

루트: `flex-row`, `items-center`, gap `spacing/06`=8px.

- **Count=2**: [Time Picker] → [Colon] → [Time Picker]
- **Count=3**: [Time Picker] → [Colon] → [Time Picker] → [Colon] → [Time Picker]

**Colon(구분자)**: 고정 이미지 에셋(SVG), 4×14px. 실측 결과 폭 4px·높이 14px 값 자체는 `ref-spacing-04`(4px)·`ref-spacing-09`(14px)와 우연히 일치하나, 레이아웃 박스가 아니라 그림 형태의 이미지 에셋이라 토큰으로 바인딩된 값이 아닙니다(8장).

**크기 산출**(gap `spacing/06`=8px 기준, [Time Picker](../time-picker/time-picker.md) 폭 56px·Colon 폭 4px):
- Count=2: 56 + 8 + 4 + 8 + 56 = **132px** ✅ 작업 지시 실측값과 정확히 일치
- Count=3: 56 + 8 + 4 + 8 + 56 + 8 + 4 + 8 + 56 = **208px** ✅ 작업 지시 실측값과 정확히 일치
- 높이: 두 변형 모두 Time Picker 자체 높이인 **116px**로 동일

이 산술이 정확히 맞아떨어져 gap 값이 `spacing/06`(8px)임을 교차 검증할 수 있었습니다.

## 3. 핵심 발견

1. **Time Picker Group은 Time Picker를 실제로 인스턴스로 조합합니다.** 병합 코드에 Time Picker의 축약 정의(및 그 내부 Time Field 축약 정의)가 그대로 포함되어 있어, 코드 레벨에서 조합 관계가 확인됩니다 — 작업 지시에서 제기한 가설을 그대로 확인시켜 줍니다.
2. **이 컴포넌트의 병합 변형 안에서는 내장 Time Picker가 진열상 Direction=Down Only로 고정되어 보였습니다.** Count=2/3 두 변형 모두 안의 모든 Time Picker 인스턴스가 Down Only 하나만 쓰고 있었습니다(스크린샷상 모든 칸의 위쪽 화살표가 옅고 아래쪽 화살표만 진함). **사용자 확인 완료** — 실제 제품에서는 Picker Count(2/3)와 각 자리(시/분/초)의 Direction(Up Only/Down Only/Both) 모두 다양하게 조합되어 쓰입니다. 이 진열 노드가 Down Only만 보여준 것은 샘플링의 한계였을 뿐입니다.
3. **Colon 구분자는 텍스트가 아니라 고정 이미지 에셋입니다.** 폰트 스타일이 아니라 SVG 그림으로 그려져 있습니다. **사용자 확인 완료** — 실제 구현에서도 텍스트 문자(`:`)로 대체하지 않고 Figma의 이미지 에셋을 그대로 사용합니다.

## 4. 콜론 사이 간격의 대칭성

콜론 앞뒤 gap이 모두 컨테이너 공통 `spacing/06`=8px로 동일합니다(콜론 전용 별도 gap 토큰 없이 flex `gap` 속성 하나가 모든 자식 사이에 균등 적용되는 구조) — Time Picker(56px)와 Colon(4px)이 번갈아 배치되며 그 사이사이 간격이 전부 8px로 통일되어 있습니다.

## 5. 서브컴포넌트 재사용 관계

- **Time Picker**: [`components/date-time-picker/time-picker/time-picker.md`](../time-picker/time-picker.md)를 그대로 인스턴스로 2~3회 사용. 진열 샘플에서는 Direction=Down Only로 고정되어 보였으나, 실제로는 각 자리마다 Direction이 다양하게 쓰임(사용자 확인, 3장 핵심 발견 2).
- **Time Field**: Time Picker를 통해 간접적으로 인스턴스화됨 — [`time-field.md`](../time-field/time-field.md) 참고. State=Default로 고정(Time Picker 문서 5장과 동일).

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출한 결과(오케스트레이터 사전 확보, 패밀리 11개 컴포넌트 전체 공용) `{"nodes":[]}`였습니다. Picker Count 전환(2↔3 추가/제거) 자체는 이 컴포넌트가 지원하는 것으로 보이지 않으며(고정된 두 변형일 뿐, 동적 추가/삭제 애니메이션 정의 없음), 값 증감 시 전환 효과도 정의되어 있지 않습니다.

## 7. 접근성

- 시:분(:초) 형태의 그룹 입력이므로 `<fieldset>`+`<legend>` 또는 `aria-labelledby`로 전체를 하나의 논리적 그룹으로 묶는 처리가 필요해 보이나 Figma에 규정이 없습니다 — 확인 필요.
- Colon 구분자는 순수 장식 요소로 보여 `aria-hidden="true"` 처리가 적절해 보이나 확인 필요.
- 내장된 Time Picker/Time Field의 접근성 요구사항([time-picker.md](../time-picker/time-picker.md) 7장, [time-field.md](../time-field/time-field.md) 7장)이 그대로 적용됩니다.
- 각 Time Picker 필드(시/분/초)를 스크린리더가 구분할 수 있도록 `aria-label`("시", "분", "초" 등)이 필요해 보이나 Figma 파일에 규정이 없습니다 — 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- Spacing: `spacing/06`=8px(컨테이너 gap) → `ref-spacing-06`과 일치
- 전체 크기 산술(132px/208px, 116px 높이)이 하위 컴포넌트의 실측 크기 + gap 토큰으로 정확히 재현됨
- 내장 Time Picker/Time Field의 모든 토큰([time-picker.md](../time-picker/time-picker.md) 8장, [time-field.md](../time-field/time-field.md) 8장과 동일)

**기존 토큰에 없음**
- Colon 에셋의 4×14px 크기는 값 자체가 `ref-spacing-04`/`ref-spacing-09`와 우연히 일치하나 레이아웃 토큰이 아닌 이미지 에셋 크기라 토큰 매칭 대상이 아님
- Picker Count 2/3별로 "몇 개를 조합할지" 규정하는 시맨틱 토큰은 저장소에 없음(개별 값 자체는 하위 컴포넌트 토큰과 일치)

**확인 완료(사용자 확인)**
- Group 내부 Time Picker의 Picker Count(2/3)·Direction(Up/Down/Both) 모두 실제 제품에서 다양하게 조합되어 쓰임 — 이 진열 노드는 Down Only 샘플만 보여준 것일 뿐
- Colon은 실제 구현에서도 텍스트 문자로 대체하지 않고 Figma의 이미지 에셋을 그대로 사용

**확인 필요**
- 그룹 전체 및 개별 필드의 접근성 마크업(`fieldset`/`aria-label`/`aria-hidden`) 연결 규정

## 9. 샘플링에 사용한 노드 (부록, 2개 전수)

| Picker Count | 노드 ID | 크기 |
|---|---|---|
| 2 | `2229:8931` | 132×116px |
| 3 | `2229:8930` | 208×116px |

2개 변형 전체가 `get_design_context` 1회 호출(`2229:8932`)로 병합 코드로 반환되었으며, 위 노드 ID는 그 코드의 조건부 `id={...}` 분기에 박힌 `data-node-id`를 정리한 것입니다. `get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 확보한 값을 재사용했습니다.
