# Trailing

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2555-11972) — Frame `2555:11972` ("Trailing"), 상위 그룹 `2612:16631`
> 기계 판독용 값은 [`trailing.json`](./trailing.json)을 함께 참고합니다. 이 문서와 trailing.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/top/`에 위치합니다 — [Trailing Components](../trailing-components/trailing-components.md)를 1~3개 조합해 만들어지는 서브 아톰이며, [Top](../top/top.md) Navigation Bar 우측 영역에 쓰입니다.

## 0. 문서 범위와 샘플링 방법

Trailing은 **Number(1/2/3) 단일 축, 3-변형 컴포넌트**입니다. `get_metadata`로 3개 심볼을 전수 확인한 뒤, `get_design_context`를 최상위 프레임(`2555:11972`)에 1회 호출해 3개 변형 전체가 병합 코드로 반환된 것을 실측했습니다.

- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2612:16631`, Navigation Bar 전체)에서 확보한 값을 재사용했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Trailing은 Navigation Bar 우측에 배치되는 **액션 아이템 묶음**입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Number** | 1 / 2 / 3 | [Trailing Components](../trailing-components/trailing-components.md) 인스턴스 개수 |

> **사용자 확인 완료 — Number는 정확한 개수가 아니라 최대 허용치입니다.** [Top](../top/top.md)에서 각 화면 Type마다 정해지는 Number(1/2/3)는 그 자리에 넣을 수 있는 **최댓값**이며, 실제로는 0개(전부 숨김)부터 최댓값까지 자유롭게 조절할 수 있습니다. 또한 [Trailing Components](../trailing-components/trailing-components.md)의 Icon 타입과 Button 타입을 **섞어서** 배치할 수 있습니다(단, 화면에 따라 중앙 Smalltitle 영역을 침범하지 않는 선에서 — 정확한 폭 계산 규칙은 확인 필요).

**핵심 발견 — Mode 축이 Trailing 자체에는 없습니다.** 이 컴포넌트 단독으로는 항상 `Type=Icon, Mode=Light`의 Trailing Components만 인스턴스화합니다(`get_design_context` 병합 코드에서 Mode prop 자체가 노출되지 않음). [Top](../top/top.md)에서 Dark 모드로 조합될 때는 Top이 각 Trailing Components 인스턴스를 개별적으로 `Mode=Dark`로 재정의하는 방식입니다 — 즉 Trailing 자체는 "Light 전용 진열 샘플"이고, 실제 Mode 대응은 상위 [Top](../top/top.md) 컴포넌트가 담당합니다(확인 완료, top.md 참고).

## 2. Number별 스펙 (3개 전수 실측)

| Number | 구성 | 컨테이너 | 크기 |
|---|---|---|---|
| **1** | [Trailing Components](../trailing-components/trailing-components.md) × 1 | `items-center justify-end pr=spacing/08`(12px) | 52×48 |
| **2** | × 2 | 동일 | 92×48 |
| **3** | × 3 | 동일 | 132×48 |

인스턴스 사이 **gap은 0**이라, 인스턴스 자체의 `py=spacing/04`(4px) 패딩이 서로 맞닿는 방식으로 배치됩니다(40×n + 우측 12px = 위 크기).

**⚠️ 단 하나의 예외 — 버튼이 아이콘과 맞닿을 때는 그 쪽에 `spacing/06`(8px)을 더합니다** (2026-09-15 디자이너 확인).

[Trailing Components](../trailing-components/trailing-components.md)의 `Button` 자리는 폭이 hug라서, 아이콘 옆에 그냥 붙이면 둘 사이가 8px(Icon Button 안쪽 여백)밖에 안 남아 **아이콘끼리(8+8=16px)보다 좁아 보입니다.** 8px을 더하면 아이콘↔버튼도 16px이 되어 아이콘끼리와 같아집니다.

| 인접 쌍 | 박스 간격 | 실제 보이는 간격 |
|---|---|---|
| 아이콘 ↔ 아이콘 | 0px (Figma 그대로) | **16px** |
| 아이콘 ↔ 버튼 | **8px** (`spacing/06`) | **16px** |

### ⚠️ 맨 오른쪽이 버튼이면 우측 끝에서 20px (사용자 지시, 2026-09-15)

같은 이유가 오른쪽 끝에도 적용됩니다. 아이콘은 Icon Button 안쪽 여백 8px을 자기가 갖고 있어서, 묶음 패딩이 12px이어도 **글리프는 우측 끝에서 20px**(12+8)에 놓입니다. 반면 버튼 자리는 hug라 여백이 없어 글자가 12px에 붙고 **혼자 바깥으로 튀어나와** 보입니다.

그래서 **마지막 항목이 버튼일 때만** 8px을 더해 `12 + 8 = 20px`로, 아이콘 글리프와 같은 자리에 맞춥니다.

| 마지막 항목 | 묶음 우측 여백 | 실제 보이는 여백 |
|---|---|---|
| 아이콘 | 12px(`spacing/08`) | **20px** |
| 버튼 | **20px**(`spacing/08` + `spacing/06`) | **20px** |

> ⚠️ **이 값의 근거는 Figma가 아니라 사용자 지시입니다.** Figma의 Trailing 3개 변형은 전부 `paddingRight: spacing/08`(12px) 하나뿐이고, Button 이 들어간 샘플 자체가 없습니다(2026-09-15 재실측 확인). 이 저장소는 "값이 충돌하면 Figma가 기준"([README](../../../../README.md) 사용 원칙 5)이므로, **근거가 Figma가 아닌 이 항목을 재실측 후 12px로 되돌리지 마세요.**

실측: Icon+Button 묶음 = 40 + 8 + 31("완료") + 20 = **99px**. 아이콘만 쓰면 Figma 그대로 52 / 92 / 132px.

> Figma에서 `Number=1` 변형만 `itemSpacing: 10`이 남아 있지만 자식이 하나뿐이라 **효과가 없습니다**(Number 2·3은 0). 기본값 잔재이므로 구현에서는 0으로 통일합니다(2026-09-15 확인).

**Top 안에서는 가로로 늘어납니다.** [Top](../top/top.md)의 Trailing 인스턴스는 `layoutGrow: 1`이라 남는 공간을 전부 차지하고, 그 안에서 `justify-end`로 오른쪽 끝에 붙습니다 — 예를 들어 Big Title에서는 132→**140px**, Seg_back에서는 52→**188px**로 늘어나지만 아이콘의 화면상 위치는 변하지 않습니다.

## 3. 서브컴포넌트 재사용 관계

- **Trailing Components**: [`components/navigation-bar/top/trailing-components/trailing-components.md`](../trailing-components/trailing-components.md)를 1~3회 그대로 인스턴스화(Type=Icon, Mode=Light 고정, 1장 참고).
- **Top에서 재사용**: [`Top`](../top/top.md)이 Type에 따라 최대 Number=1(Seg_back/Seg_close), 2(Smalltitle_back/Smalltitle_close), 3(Big Title/NoTitle_back/NoTitle_close)을 배정합니다 — 중앙 콘텐츠(Smalltitle 등)가 많을수록 Trailing 최대 허용량이 줄어드는 규칙입니다(top.md 2장 참고). 각 Type 안에서는 이 최댓값 이하로 자유롭게 줄이거나 비울 수 있고, Icon/Button을 섞어 쓸 수 있습니다(사용자 확인).

## 4. 인터랙션(모션) 스펙

**묶음 자체에는 반응이 없지만, 각 항목은 Icon Button·Text Button의 상태를 그대로 갖습니다** — [trailing-components.md](../trailing-components/trailing-components.md) 5장 참고.

> ⚠️ 예전 판의 "모션 데이터 없음"은 `get_motion_context`(키프레임 전용)만 보고 내린 결론이었습니다. 변형 사이 전환은 `node.reactions`에 있습니다([`docs/INTERACTION.md`](../../../../docs/INTERACTION.md)).

## 5. 접근성

- 각 Trailing Components 항목의 접근성 요구사항([trailing-components.md](../trailing-components/trailing-components.md) 6장)이 그대로 적용됩니다.
- 여러 액션이 나열되므로 `role="toolbar"` 또는 개별 `aria-label`로 각 항목을 구분하는 처리가 필요해 보이나 Figma 파일에 규정 없음 — 확인 필요.

## 6. 토큰 매칭 요약

**정확히 일치**
- 컨테이너 우측 패딩 `spacing/08`=12px → `ref-spacing-08`
- 내부 Trailing Components 스펙 전부 [trailing-components.md](../trailing-components/trailing-components.md)와 일치

**확인 완료**
- Trailing 자체에는 Mode 축이 없고 Top이 Mode 대응을 담당함(1장)
- 항목 사이 gap은 0이고, `Number=1`의 `itemSpacing: 10`은 자식이 하나뿐이라 효과 없는 잔재(2장, 2026-09-15)
- Top 안에서는 `layoutGrow: 1`로 늘어나되 아이콘 위치는 그대로(2장, 2026-09-15)

**확인 필요**
- 여러 액션 항목의 접근성 그룹핑(`role="toolbar"` 등) 규정

## 7. 샘플링에 사용한 3개 노드 (부록, 전수)

| Number | 노드 |
|---|---|
| 1 | `2555:11971` |
| 2 | `2555:11970` |
| 3 | `2555:11969` |

3개 변형 전체가 `get_design_context` 1회 호출(`2555:11972`)로 병합 코드로 반환되었습니다. `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2612:16631`)에서 공용으로 확보했습니다.

## Corner Smoothing (2026-09-23 추가)

바드림 디자인시스템은 모든 Radius 에 **Corner Smoothing 60%** 를 함께 씁니다(`docs/DESIGN.md` 9.2). 이 컴포넌트는 자기 모서리가 없고, 안에 든 컴포넌트가 각자 Corner Smoothing 을 적용합니다. 이 문서에서 따로 구현한 것은 없습니다.

Figma 실측: 2026-09-23 Figma Plugin API `cornerSmoothing` 전수 조회(컴포넌트 셋 안의 모든 노드).

| 레이어 | Radius | Figma Smoothing | 구현 |
|---|---|---|---|
| Icon Button 인스턴스 | 12px | 60% | 적용 (Icon Button) |
