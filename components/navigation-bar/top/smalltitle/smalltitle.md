# Smalltitle

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2555-12097) — Frame `2555:12097` ("Smalltitle"), 상위 그룹 `2612:16631`
> 기계 판독용 값은 [`smalltitle.json`](./smalltitle.json)을 함께 참고합니다. 이 문서와 smalltitle.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/top/`에 위치합니다 — [Top](../top/top.md) Navigation Bar 중앙 영역(화면 제목·필터)에 쓰이는 서브 아톰입니다.

## 0. 문서 범위와 샘플링 방법

Smalltitle은 **Type(Default/Selection/Segmented Control/Caption) × Mode(Light/Dark) 2축, 8-변형 컴포넌트**로 완전 직교(4×2=8)입니다. `get_metadata`로 8개 심볼을 전수 확인한 뒤, `get_design_context`를 최상위 프레임(`2555:12097`)에 1회 호출해 8개 변형 전체가 병합 코드로 반환된 것을 실측했습니다.

- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2612:16631`, Navigation Bar 전체)에서 확보한 값을 재사용했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Smalltitle은 Navigation Bar 중앙에 오는 **작은 제목/필터 영역**으로, 전 Type 공통 `w=190px`입니다(단독으로 쓸 때).

⚠️ [Top](../top/top.md) 안에서는 화면이 390보다 넓어질 때 **같이 늘어납니다** — 좌우 여백 100px을 유지해 항상 화면 정중앙이고, 제목과 Segmented Control이 그만큼 넓어집니다([top.md](../top/top.md) 2-1장, 2026-09-15 디자이너 확인).

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Default / Selection / Segmented Control / Caption | Default=단순 제목 텍스트, Selection=드롭다운 화살표가 붙은 선택형 제목, Segmented Control=탭 전환 UI 내장, Caption=제목+보조 설명 2줄 |
| **Mode** | Light / Dark | 밝은/어두운 배경에 맞춘 텍스트·아이콘 색상 |

## 2. Type별 스펙 (8개 전수 실측)

| Type | 레이아웃 | 내용 | 비고 |
|---|---|---|---|
| **Default** | `py=spacing/08`(12px), `flex-1` 중앙 정렬 | "Subtitle" 텍스트(`SubTitle/18 M`) | 순수 제목 표시 |
| **Selection** | `gap=spacing/02`(2px) `py=spacing/08`(12px) | "Subtitle" 텍스트(내용 폭) + `arrowhead_down` 아이콘(20px, **`neutral/600`**) | 드롭다운 트리거로 추정(확인 필요) |
| **Segmented Control** | `py=9px`(리터럴 값, 토큰 아님) | [Segmented Control](../../../segmented-control/segmented-control.md) 인스턴스(Size=S, Count=2) | **기존 문서화된 Segmented Control을 그대로 재사용**(3장) |
| **Caption** | `flex-col gap=spacing/00`(**-2px**) `py=spacing/04`(4px), 두 줄 모두 190px 채움 | "Subtitle"(`SubTitle/18 M`) + "Caption 1"(`Caption 1/12 M`, `neutral/500`) 2줄 | 제목 아래 보조 설명. 음수 gap 으로 두 줄을 바짝 붙임 — ⚠️ CSS `gap` 은 음수를 못 받으므로 구현에서는 **음수 margin** 으로 옮겨야 합니다(5장) |

## 3. 서브컴포넌트 재사용 관계 — Segmented Control

**핵심 발견**: Type=Segmented Control은 이미 문서화된 [Segmented Control](../../../segmented-control/segmented-control.md)(및 그 서브 아톰 [`_Item`](../../../global/segmented-control-item/segmented-control-item.md))을 **Size=S, Count=2**로 그대로 인스턴스화한 것입니다. 실측 구조(배경 `color/gray/200`=#f1f2f3, radius `radius/04`=8px, padding `spacing/02`=2px, 내부 gap `spacing/02`=2px, Item 2개 중 1개는 선택되어 `common/white-default` 배경+그림자, 텍스트 `Caption 1/12 SB`)가 Segmented Control 문서의 Size=S 스펙과 **정확히 일치**합니다.

## 4. Mode별 색상 (전수 실측)

| Mode | Default/Selection/Caption 제목 텍스트 | Selection 아이콘 | Caption 보조 텍스트 |
|---|---|---|---|
| **Light** | `neutral/800`(#202837) | **`neutral/600`(#5b616c)** | `neutral/500`(#8c9199) |
| **Dark** | `common/white-default`(#fdfdfd) | `common/white-default`(#fdfdfd) | `neutral/500`(#8c9199, **변화 없음** — Caption 텍스트는 Mode 무관) |

**정정(2026-09-15 재실측)** — 예전 판은 Selection 화살표를 "별도 다크 SVG 에셋"으로 적었으나 사실과 다릅니다. 아이콘 벡터의 `fills`가 색상 변수에 바인딩돼 값만 바뀝니다. 그리고 **Light에서 화살표는 제목(`neutral/800`)보다 한 단계 옅은 `neutral/600`** 입니다 — 구현이 제목 색을 그대로 물려받고 있어 이번에 고쳤습니다.

**Segmented Control은 Light/Dark 값이 완전히 같습니다.** Dark 변형(`2555:12445`)도 배경 `#f1f2f3`·라벨 `#202837`/`#8c9199`로 Light와 동일하고, [Top](../top/top.md)의 Seg 계열 Dark 변형은 아예 `Mode=Light` Smalltitle 인스턴스를 그대로 씁니다(실측 확인).

**핵심 발견**: Caption의 보조 설명 텍스트(`neutral/500`)는 Light/Dark 모드와 무관하게 동일한 회색을 유지합니다 — 어두운 배경 위에서 명암비가 충분한지는 **확인 필요**입니다(WCAG 미검증).

## 5. 타이포그래피 상세

| 스타일 | 적용 대상 | 크기/줄높이/자간 |
|---|---|---|
| **SubTitle/18 M** | Default/Selection/Caption 상단의 제목 텍스트 | `size/Subtitle`=18px, `lineHeight/Subtitle`=24px, `letterSpacing/Subtitle`=-0.09px, `weight/500` Medium |
| **Caption 1/12 M** | Caption 하단 보조 텍스트 | `size/Caption1`=12px, `lineHeight/Caption1`=18px, `letterSpacing/Caption`=-0.03px, **`weight/500` Medium**(2026-09-15 확정 — 텍스트 스타일명이 `Caption 1/12 M`) |

## 6. 인터랙션(모션) 스펙

**Smalltitle 컴포넌트 셋 자체에는 상태 전환이 없습니다.** 프로토타입 반응(`reactions`)이 0건입니다(2026-09-15 Plugin API 확인). 안에 들어가는 Segmented Control 인스턴스는 자기 컴포넌트의 인터랙션을 그대로 갖습니다([`docs/INTERACTION.md`](../../../../docs/INTERACTION.md)) — 알약이 미끄러지는 전환 **200ms · `cubic-bezier(0.32,0.72,0,1)`**.

**⚠️ 구현 주의 — Segmented Control은 완전 제어형입니다.** `value`만 꽂고 `onChange`를 주지 않으면 눌러도 움직이지 않습니다. 실제로 이 상태로 들어가 있어서 **내비게이션 바 안에서는 세그먼트가 전혀 전환되지 않았습니다**(2026-09-15 교정). Smalltitle은 `segmentValue`를 주지 않으면 내부 state로 동작하고, 초기값만 정하려면 `defaultSegmentValue`를 씁니다.

> ⚠️ `get_motion_context`는 **키프레임 애니메이션만** 읽습니다 — "모션 없음" 판단의 근거로 쓰면 안 됩니다.

### ⚠️ 구현 주의 — 음수 gap

Caption의 `spacing/00`(-2px)은 **CSS `gap`으로 옮기면 선언째로 무시됩니다**(`gap`은 음수를 받지 않음). 실제로 이 때문에 높이가 48px이 아니라 50px로 렌더되고 있었습니다. 두 번째 줄에 `margin-top: -2px`를 주는 방식으로 옮겨야 Figma와 같은 **190×48**이 나옵니다.

## 7. 접근성

- Selection의 드롭다운 화살표가 실제 드롭다운 트리거라면 `aria-haspopup`/`aria-expanded` 연결 규정이 필요해 보이나 Figma 파일에 없음 — 확인 필요.
- Segmented Control 재사용 부분의 접근성 요구사항([segmented-control.md](../../../segmented-control/segmented-control.md) 참고)이 그대로 적용됩니다.
- Caption의 보조 텍스트가 Dark 모드에서도 동일한 회색(`neutral/500`)을 유지해 명암비 우려가 있습니다 — 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- 패딩: `spacing/08`=12px, `spacing/04`=4px, `spacing/02`=2px, `spacing/00`=-2px 전부 `ref-spacing-*`와 일치
- 색상: `neutral/800`, `neutral/500`, `common/white-default` → `sys-color-*`와 일치
- 타이포: `SubTitle/18 M`, Caption1 계열 → `tokens/typography.json`과 일치
- Segmented Control 재사용 부분 전부 [segmented-control.md](../../../segmented-control/segmented-control.md)와 일치

**기존 토큰에 없음**
- Segmented Control 타입의 `py=9px`(리터럴, 스페이싱 토큰 아님)

**확인 완료(2026-09-15 재실측)**
- Caption 하단 텍스트 weight = **Medium(500)**, 스타일명 `Caption 1/12 M`
- Selection 화살표 색 = **`neutral/600`**(제목보다 한 단계 옅음), Dark에서만 흰색
- Segmented Control 인스턴스 내부 gap = `spacing/02`(2px) — 예전 판의 `spacing/05`(6px)는 오기

**확인 필요**
- Selection 드롭다운 화살표의 실제 인터랙션(클릭 시 무엇이 열리는지)
- Caption 보조 텍스트가 Dark 모드에서 명암비를 만족하는지(WCAG)

## 9. 샘플링에 사용한 8개 노드 (부록, 전수)

| Type＼Mode | Light | Dark |
|---|---|---|
| **Default** | `2555:12096` | `2555:12440` |
| **Selection** | `2555:12093` | `2555:12442` |
| **Segmented Control** | `2555:12095` | `2555:12445` |
| **Caption** | `2555:12094` | `2555:12447` |

8개 변형 전체가 `get_design_context` 1회 호출(`2555:12097`)로 병합 코드로 반환되었습니다. `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2612:16631`)에서 공용으로 확보했습니다.
