# Text Input Group

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2125-8048) — Frame `2125:8048` ("Text Input Group")
> 기계 판독용 값은 [`text-input-group.json`](./text-input-group.json)을 함께 참고합니다. 이 문서와 text-input-group.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 사용자 제공 배경: 이 컴포넌트는 [Text Input](../text-input/text-input.md) 2개 또는 3개를 수직으로 정렬해 하나의 그룹으로 묶어 쓰는 패턴을 컴포넌트화한 것으로 추정됩니다(예: 주소 1줄/2줄처럼 연속된 필드 그룹). Figma 파일 자체에 정확한 사용 맥락 주석은 없어 이 부분은 추정으로 남깁니다.

## 0. 문서 범위와 샘플링 방법

Text Input Group은 **Size(S/M/L) × Field(2/3) 2개 축, 6-변형 컴포넌트**입니다. 규모가 작아 **6개 전부** `get_design_context`로 개별 실측했습니다.

- 실측 6개 노드: `2125:8045`(S,Field=2) · `2125:8047`(M,Field=2) · `2125:8046`(L,Field=2) · `2125:8043`(S,Field=3) · `2125:8042`(M,Field=3) · `2125:8044`(L,Field=3)
- `get_metadata`로 6개 인스턴스의 프레임 크기(width×height)를 먼저 확보했습니다(8장 부록).
- `get_motion_context`를 최상위 프레임(`2125:8048`, recursive=true)에 1회 호출했으며 모션 데이터 없음을 확인했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Text Input Group은 [Text Input](../text-input/text-input.md) 인스턴스를 세로로 쌓아 만든 **조합형 컴포넌트**입니다. 내부 각 필드는 Text Input 컴포넌트를 그대로 인스턴스로 사용하지만, 아래처럼 대부분의 토글 축이 꺼진 "간소화된" 형태로 고정되어 있습니다(4장 상세).

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L | 그룹 크기 단계. 내부 Text Input들의 Size와 1:1로 대응(3장) |
| **Field** | 2 / 3 | 그룹에 포함되는 Text Input 필드 개수 |

## 2. Size별 스펙 (3개 전체 실측, Field=2 기준)

| 요소 | S | M | L |
|---|---|---|---|
| **필드 간 세로 gap** | `spacing/04`=4px | `spacing/05`=6px | `spacing/06`=8px |
| **내부 Text Input Size** | S | M | L |
| **내부 Input 컨테이너**(각 필드) | radius `radius/05`=10px, border `borderwidth/02`=1px, padding px `spacing/07`=10px / py `spacing/05`=6px, 내부 gap `spacing/06`=8px | radius `radius/05`=10px, border 1px, padding px `spacing/08`=12px / py `spacing/06`=8px, 내부 gap `spacing/06`=8px | radius `radius/06`=12px, border 1px, padding px `spacing/09`=14px / py `spacing/08`=12px, 내부 gap `spacing/07`=10px |
| **첫 번째 필드 Label** | 있음, pb `spacing/02`=2px, Caption1/12 SB | 있음, pb `spacing/04`=4px, Caption1/12 SB | 있음, pb `spacing/05`=6px, Body2/14 M |
| **전체 컨테이너 너비**(실측 샘플값) | `w-[280px]` | `w-[280px]` | `w-[280px]` |
| **전체 높이**(Field=2, `get_metadata`) | 84px | 104px | 132px |

**핵심 발견**: 각 Size의 **필드 간 세로 gap 값이 [Text Input 문서](../text-input/text-input.md) 2장의 "Input-Button 사이 gap" 값과 정확히 동일**합니다(S=`spacing/04`=4px, M=`spacing/05`=6px, L=`spacing/06`=8px). 우연의 일치일 수도 있으나, 동일한 Size 스케일 토큰 체계를 그대로 재사용한 결과로 보입니다.

내부 Input 컨테이너의 radius·border·padding·gap 값은 [text-input.md](../text-input/text-input.md) 2장의 Size별 스펙과 **정확히 일치**합니다 — Text Input Group은 Size만 맞춰 Text Input을 그대로 인스턴스로 쌓아 쓰고 있습니다.

**너비**: 6개 노드 전부 `w-[280px]`(고정 Tailwind 클래스)로 표시되지만, Dropdown·Supporting Text 문서에서 이미 확인된 것과 동일한 Figma 진열 프레임 컨벤션으로 보이며 실제로는 화면 폭에 따른 가변(fluid) 너비일 가능성이 높습니다 — 이 컴포넌트 자체로 재검증하지는 않아 **확인 필요**로 남깁니다.

## 3. Field=2 / Field=3 차이

`get_design_context` 결과를 직접 비교한 결과, Field 축의 동작은 다음과 같습니다.

- **필드 개수만 다릅니다.** Field=2는 Text Input 인스턴스 2개, Field=3은 3개가 세로로 쌓여 있으며(코드에서 실제로 확인), **필드 개수 외에 다른 구조 차이는 없습니다** — 필드 간 gap, 각 필드의 크기·패딩·radius, Label 유무 규칙(첫 필드만 Label 표시, 3장 참고) 모두 Field=2/3 사이에 동일합니다.
- **인접 필드 간 테두리 병합·radius 통합 처리는 관찰되지 않았습니다.** 각 필드(Text Input 인스턴스)는 자신의 독립된 `border`+`rounded`(전체 4방향 radius)를 그대로 유지한 채 작은 세로 gap을 두고 쌓여 있을 뿐입니다 — 즉 세그먼트 리스트처럼 위/아래 필드가 하나의 테두리를 공유하거나 중간 필드만 radius가 없어지는 식의 특수 처리가 **없다는 것이 확인된 사실**입니다.
- Size별 컨테이너 총 높이(`get_metadata` 실측): S/M/L × Field=2는 84/104/132px, Field=3은 118/148/188px — 필드 하나가 추가될 때마다 "필드 높이 + gap"만큼 정확히 늘어나는 구조입니다.

## 4. Text Input 재사용 관계

6개 노드 전부에서 각 필드는 [Text Input](../text-input/text-input.md) 컴포넌트의 인스턴스이며(내부 코드에 `data-name="Text Input"` 래퍼로 확인), 다음과 같이 토글 축이 고정되어 있습니다.

| Text Input 토글 축 | Text Input Group 내부에서의 값 |
|---|---|
| **Show Label** | **첫 번째 필드만 True**(Label 표시), 두 번째·세 번째 필드는 **False**(Label 없음) |
| **Show Button** | 모든 필드 **False**(확정 버튼 없음) |
| **Supporting Text** | 모든 필드 **False**(하단 헬퍼 텍스트 없음) |
| **Left Icon** | 모든 필드 **False** |
| **Right Icon** | 모든 필드 **False** |
| **State** | 전부 `Default`(Placeholder 표시), Destructed 등 다른 State는 6개 샘플에서 관찰되지 않음 |

즉 Text Input Group 안의 각 필드는 [text-input.md](../text-input/text-input.md) 4장에서 "5개 토글 전부 False"로 문서화한 최소 형태(`2115:9089`, TypeBox만 담긴 Input 한 줄)와 동일한 구조이며, 유일한 예외가 **첫 번째 필드에만 Label을 붙인다는 규칙**입니다. 이는 그룹 전체에 필드별 개별 라벨을 달지 않고 그룹 상단에 대표 라벨 하나만 두는 디자인 의도로 추정됩니다(예: "주소" 라벨 하나 아래 1줄/2줄 입력 필드).

내부 코드에서 두 번째·세 번째 필드가 참조하는 컴포넌트 노드 id(예: M 기준 `2115:9090`)가 첫 번째 필드가 참조하는 id(`2114:6337`)와 다른 것도 이 규칙과 일치합니다 — 서로 다른 Show Label 변형의 Text Input 인스턴스를 각각 가져다 쓰고 있는 것으로 확인됩니다.

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 최상위 프레임(`2125:8048`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Text Input Group 자체에도, 내부 Text Input 인스턴스들에도 모션이 정의되어 있지 않습니다 — [text-input.md](../text-input/text-input.md) 6장과 동일한 결론입니다.

## 6. 접근성

- **필드 간 시각적 그룹핑**: 첫 번째 필드에만 Label이 붙는 구조상, 스크린리더 사용자가 두 번째·세 번째 필드도 같은 그룹(예: "주소")에 속한다는 것을 인지하려면 `fieldset`+`legend` 또는 `role="group"`+`aria-labelledby` 같은 시맨틱 그룹핑이 실제 구현에서 필요해 보입니다. Figma 파일에 이 마크업 규정은 없어 **확인 필요**입니다.
- 개별 필드의 접근성 이슈(Label 연결, `aria-required` 등)는 [text-input.md](../text-input/text-input.md) 7장 및 [label.md](../global/label/label.md) 5장의 확인 필요 사항이 그대로 적용됩니다.
- Field=2/3 각각에서 어떤 필드가 어떤 의미(예: "주소1"/"주소2"/"상세주소")를 갖는지는 Figma 컴포넌트 자체에 문서화되어 있지 않아 실제 사용 맥락은 확인 필요입니다.

## 7. 토큰 매칭 요약

**정확히 일치**
- 필드 간 세로 gap: S `spacing/04`=4px → `ref-spacing-04`, M `spacing/05`=6px → `ref-spacing-05`, L `spacing/06`=8px → `ref-spacing-06`
- 내부 Text Input의 radius·border·padding·타이포 전부 [text-input.md](../text-input/text-input.md) 2장 값과 정확히 일치, 저장소 토큰과도 일치

**기존 토큰에 없음**
- "Text Input Group엔 이 gap을 쓴다"는 Size별 시맨틱 토큰 자체는 저장소에 없음(개별 spacing 값 자체는 토큰과 일치)
- 첫 번째 필드에만 Label을 붙이는 규칙을 명시하는 토큰/문서 없음

**확인 필요**
- 컴포넌트 너비: Dropdown처럼 화면 폭에 따른 가변(fluid)일 가능성이 높으나 재검증하지 않음(2장)
- 필드 간 시맨틱 그룹핑(`fieldset`/`aria-labelledby`) 마크업 규정(6장)
- Field=2/3 각 필드의 실제 의미·사용 맥락(예: 주소 1줄/2줄 여부, 6장)
- Destructed 등 Default 외 State가 그룹 내부에서 어떻게 동작하는지(6개 샘플 전부 Default만 관찰됨)

## 8. 샘플링에 사용한 6개 노드 (부록, 전수)

| Size | Field=2 | Field=3 |
|---|---|---|
| **S** | `2125:8045` (280×84) | `2125:8043` (280×118) |
| **M** | `2125:8047` (280×104) | `2125:8042` (280×148) |
| **L** | `2125:8046` (280×132) | `2125:8044` (280×188) |

`get_metadata`(Frame `2125:8048`)로 6개 인스턴스 전체의 크기를 전수 확보했으며, `get_design_context`도 6개 전부 개별 실측했습니다(0장). `get_motion_context`는 최상위 프레임에 1회 호출해 빈 결과를 확인했습니다.
