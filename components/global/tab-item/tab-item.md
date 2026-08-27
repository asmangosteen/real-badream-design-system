# Tab Item (`_Item`)

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2262-1461) — Component `_Item` (node `2262:1461`)
> 기계 판독용 값은 [`tab-item.json`](./tab-item.json)을 함께 참고합니다. 이 문서와 tab-item.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/global/`에 위치합니다. **주의**: Figma 레이어명은 [Segmented Control Item](../segmented-control-item/segmented-control-item.md)과 동일하게 `_Item`이지만, 완전히 다른 별개의 컴포넌트입니다(전자는 Segmented Control 전용, 이것은 [Tab](../../tab/tab.md) 전용). 폴더명이 겹치지 않도록 이 문서는 `global/tab-item/`에 위치하며, 저장소 내부 문서 링크에서는 "Tab Item"으로 지칭해 구분합니다. `_Item`은 실제로는 [Tab](../../tab/tab.md) **단 하나**에서만 쓰이지만, Figma 파일 안에서 디자이너가 이를 독립된 별도 Frame(`2262:1461`)으로 명시적으로 분리해둔 아토믹 디자인 의도를 존중해, Segmented Control Item과 동일한 `components/global/` 패턴으로 문서화합니다(상세: `components/README.md` "components/global/이란" 절 참고).

## 0. 문서 범위와 샘플링 방법

`_Item`(Tab)은 **Size(S/L) × Active(On/Off) × Disabled(False/True) × Emphasize(Off/On) 4개 축, 12-인스턴스 컴포넌트**입니다. 12개뿐이므로 **전수 실측**했습니다 — `get_design_context`를 12개 노드 전부에 개별 호출했습니다.

- `get_variable_defs`는 대표 노드 3개(S,Active On/Disabled False/Emphasize Off `2262:1460` / S,Active On/Emphasize On `2262:3855` / S,Active On/Disabled True `2262:1456`)에서 호출해 변수 맵을 확보했습니다.
- `get_motion_context`는 컴포넌트 최상위(`2262:1461`, recursive=true)에 1회 호출했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

`_Item`(Tab)은 [Tab](../../tab/tab.md)을 구성하는 탭 하나(레이블 + 활성 밑줄)를 나타내는 서브 아톰입니다. 텍스트 레이블 하나만 가진 단순 컨테이너로, "활성 탭"(Active=On)은 텍스트 아래 2px 밑줄(divider)이 나타나 부상해 보이고, "비활성 탭"(Active=Off)은 밑줄 없이 옅은 텍스트만 표시됩니다. Segmented Control의 `_Item`이 배경 pill + 그림자로 선택 상태를 표현하는 것과 달리, Tab의 `_Item`은 **밑줄 인디케이터** 방식으로 표현합니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / L | 탭 크기 단계(세로 padding·타이포 스케일). Segmented Control Item과 달리 **2단계뿐**(XS/M/XL 없음) |
| **Active** | On / Off | 현재 활성 탭 여부. On=텍스트 아래 2px 밑줄 표시, Off=밑줄 없음 |
| **Disabled** | False / True | 비활성화 여부. True면 텍스트(및 밑줄) 색상이 `neutral/400`으로 고정 |
| **Emphasize** | Off / On | 강조(경고/오류성 탭) 여부. On이면 텍스트(및 밑줄) 색상이 `theme/destructed-default`(빨강)로 고정 |

**핵심 관찰(축 비직교성)**: 12개 인스턴스는 Size(2) × Active(2) × [Disabled/Emphasize 조합 3종] = 12개입니다(2×2×3=12). Disabled×Emphasize의 4개 조합 중 **3개만 존재**합니다:

| Disabled | Emphasize | 존재 여부 |
|---|---|---|
| False | Off | 존재 (기본) |
| False | On | 존재 (강조/오류 탭) |
| True | Off | 존재 (비활성화) |
| **True** | **On** | **Figma에 없음** |

Emphasize=On(강조)은 항상 Disabled=False와만 짝지어지고, Disabled=True는 항상 Emphasize=Off와만 짝지어집니다 — [Segmented Control Item](../segmented-control-item/segmented-control-item.md)에는 없던 축이지만, Dropdown 문서의 "Destructed는 Selected 상태에서만 존재" 사례와 같은 패턴으로, 비활성화된 탭에는 강조(빨강) 스타일을 적용하지 않는다는 의도된 축 제약으로 보입니다. 오류로 단정하지 않고 관찰 사실로만 기술합니다.

## 2. Size별 스펙 (12개 전체 실측)

| Size | 노드(Active=On, Disabled=False, Emphasize=Off / Active=Off, 같은 조건) | 크기(실측) | 세로 padding | 최소 너비 | 타이포 | lineHeight | letterSpacing |
|---|---|---|---|---|---|---|---|
| **S** | `2262:1460` / `2262:1458` | 32×42px | `spacing/07`=10px | 32px(`min-w-[32px]`) | Body2/14 **SemiBold(600)** | 22px | -0.04px |
| **L** | `2262:1457` / `2262:1459` | 33×48px | `spacing/08`=12px | 32px(`min-w-[32px]`) | Body1/16 **SemiBold(600)** | 24px | -0.04px |

**핵심 실측 발견**:

1. **높이는 `lineHeight + 세로padding×2`와 정확히 일치**합니다(S=22+10×2=42, L=24+12×2=48). Segmented Control Item과 동일한 공식이 성립합니다.
2. **가로 padding(paddingX)이 전혀 없습니다.** Segmented Control Item(모든 Size가 `spacing/06~10`의 가로 padding을 가짐)과 달리, Tab의 `_Item`은 `min-w-[32px]`(최소 너비 32px)만 지정되어 있고 별도의 좌우 padding 클래스가 없습니다. 실측된 너비(32~33px)는 이 최소 너비값과 거의 동일하며, "Text"/"Tab1" 같은 짧은 레이블이 최소 너비에 딱 걸치는 수준이라 실제로는 레이블 텍스트 길이에 따라 너비가 가변적일 가능성이 높습니다 — 확인 필요(placeholder 레이블만으로는 긴 레이블에서의 동작을 확정할 수 없음).
3. **타이포 weight가 Size와 무관하게 항상 SemiBold(600)입니다.** Segmented Control Item은 S→M 사이에서 SemiBold→Medium으로 전환되었지만, Tab의 `_Item`은 S(Body2/14)·L(Body1/16) 둘 다 SemiBold(600)로 고정입니다 — Size가 2단계뿐이라 전환 지점 자체가 없습니다.
4. **letterSpacing이 두 Size 모두 -0.04px(Body 계열)입니다.** Segmented Control Item의 S(Caption, -0.03px)와 다른 스케일입니다 — Tab의 `_Item`은 XS/S가 없어 Caption 스타일을 전혀 쓰지 않습니다.

## 3. Active On/Off 구조 차이 (Disabled=False, Emphasize=Off 기준)

| 요소 | Active=On | Active=Off |
|---|---|---|
| **레이블 텍스트** | 있음 | 있음(동일 타이포) |
| **밑줄(Divider)** | 있음: 하단 절대 위치, 높이 2px, 너비 100%, 색상은 텍스트 색상과 동일 | 없음 |
| **텍스트 색상(기본)** | `neutral/800`=`#202837` | `neutral/500`=`#8c9199` |
| **padding·min-width·타이포(family/size/weight/lineHeight/letterSpacing)** | Size별 2장 표와 동일 | Size별 2장 표와 동일(On과 완전히 동일) |

**핵심 발견**: Active 축은 **밑줄 유무와 텍스트 색상(기본 상태 기준)** 두 가지만 바꾸고, 레이아웃(padding·min-width)과 타이포그래피(family/size/weight)는 전혀 건드리지 않습니다. 밑줄 색상은 항상 텍스트 색상과 동일합니다(3~5장에서 Disabled/Emphasize별로 재확인). Segmented Control Item이 "배경 pill + 그림자"로 선택 상태를 표현한 것과 달리, Tab의 `_Item`은 배경 변화가 전혀 없고 순수하게 밑줄 인디케이터로만 표현합니다.

## 4. Disabled 스펙 (Disabled=True, Emphasize=Off, 4개 노드 실측: S/L × Active On/Off)

| Size | Active | 노드 | 텍스트 색상 | 밑줄 |
|---|---|---|---|---|
| S | On | `2262:1456` | `neutral/400`=`#c2c4c8` | 있음, 색상 `neutral/400` |
| S | Off | `2262:1455` | `neutral/400`=`#c2c4c8` | 없음 |
| L | On | `2262:1454` | `neutral/400`=`#c2c4c8` | 있음, 색상 `neutral/400` |
| L | Off | `2262:1453` | `neutral/400`=`#c2c4c8` | 없음 |

**핵심 발견**: Disabled=True는 Active On/Off와 무관하게 텍스트(및 존재할 경우 밑줄) 색상을 `neutral/400`으로 고정합니다. 밑줄의 유무 자체는 여전히 Active 축이 결정합니다 — 즉 Disabled은 "색상만" 오버라이드하고 "밑줄 유무"는 건드리지 않습니다. 1장에서 확인했듯 Disabled=True는 Emphasize=On과 조합되지 않으므로, "Disabled 상태에서 강조(빨강) 스타일이 어떻게 보이는지"는 Figma에 정의되어 있지 않습니다.

## 5. Emphasize 스펙 (Emphasize=On, Disabled=False, 4개 노드 실측: S/L × Active On/Off)

| Size | Active | 노드 | 텍스트 색상 | 밑줄 |
|---|---|---|---|---|
| S | On | `2262:3855` | `theme/destructed-default`=`#e72f37` | 있음, 색상 `theme/destructed-default` |
| S | Off | `2262:3863` | `theme/destructed-default`=`#e72f37` | 없음 |
| L | On | `2262:3871` | `theme/destructed-default`=`#e72f37` | 있음, 색상 `theme/destructed-default` |
| L | Off | `2262:3879` | `theme/destructed-default`=`#e72f37` | 없음 |

**핵심 발견**: Emphasize=On은 Active On/Off와 무관하게 텍스트(및 존재할 경우 밑줄) 색상을 `theme/destructed-default`(#e72f37, 빨강)로 고정합니다. **Active=Off인데도 Emphasize=On이면 텍스트가 빨간색으로 표시됩니다** — 즉 "비활성 탭인데 강조색"이라는 조합이 실제로 존재하며(`2262:3863`), 이는 "읽지 않은 알림/오류가 있는 비활성 탭"과 같은 용도로 추정되나 Figma에 그 의미가 별도로 주석되어 있지는 않습니다 — 확인 필요. Disabled과 마찬가지로 Emphasize도 "색상만" 오버라이드하고 "밑줄 유무"는 Active 축이 그대로 결정합니다.

**세 상태 그룹 요약(1장 비직교 관찰과 연결)**: Disabled(neutral/400)과 Emphasize(theme/destructed-default)는 서로 배타적으로만 존재하는 두 개의 "색상 오버라이드 레이어"이며, 어느 쪽도 적용되지 않으면 기본 Active 색상(neutral/800 On / neutral/500 Off)이 쓰입니다. 우선순위 규칙(둘 다 정의된 인스턴스가 있다면 어느 것이 이기는지)은 Figma에 해당 조합이 없어 확인 불가합니다.

## 6. 모션 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 최상위(`2262:1461`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Active=Off→On 전환 시 밑줄이 슬라이딩하며 나타나는 애니메이션이 있는지 특히 주의 깊게 확인했으나(다른 탭에서 현재 탭으로 밑줄이 옮겨가는 인디케이터 모션을 기대할 만한 UI 패턴이므로), Figma 파일에 그런 트랜지션 정의는 없습니다. [Segmented Control Item](../segmented-control-item/segmented-control-item.md)·[Segmented Control](../../segmented-control/segmented-control.md)에서도 동일하게 모션 데이터가 없었던 것과 같은 패턴입니다. ([Tab](../../tab/tab.md) 조합 레벨에서도 별도로 확인했습니다 — tab.md 6장 참고, 마찬가지로 빈 결과.)

## 7. 접근성

- `_Item`은 단독으로 쓰이지 않고 항상 [Tab](../../tab/tab.md) 안에서 탭(tab) 역할을 하므로, 실제 구현 시 개별 `_Item`에는 `role="tab"` `aria-selected={Active}` `aria-disabled={Disabled}`를 부여하는 것이 적절해 보이나 Figma 파일에 규정은 없습니다 — 확인 필요.
- Hover/Focus/Pressed 상태에 대한 시각적 피드백이 Figma 컴포넌트 자체에 정의되어 있지 않습니다 — 키보드 포커스 링, 클릭 시 프레스 피드백 등은 구현 시 별도로 설계해야 합니다 — 확인 필요.
- Active=True/False 구분이 밑줄 유무 + 텍스트 명도 차이로만 표현됩니다. 비활성 텍스트 색상(`neutral/500` #8c9199, 흰 배경 위) 및 Disabled 텍스트(`neutral/400` #c2c4c8)의 명암비는 WCAG 기준 확인이 필요합니다 — 확인 필요.
- Emphasize=On 상태(빨강 텍스트)가 색상만으로 의미를 전달하므로, 저시력 사용자를 위해 아이콘이나 텍스트 등 색상 외의 보조 표시가 필요한지는 Figma로 확인할 수 없습니다 — 확인 필요.
- 키보드 네비게이션(좌우 화살표로 탭 간 이동 등)은 [tab.md](../../tab/tab.md) 7장에서 다룹니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- 텍스트/밑줄 색상 `neutral/800`(#202837) → `sys-color-neutral-800`, `neutral/500`(#8c9199) → `sys-color-neutral-500`, `neutral/400`(#c2c4c8) → `sys-color-neutral-400`(reference.gray.400과 일치)
- 강조 색상 `theme/destructed-default`(#e72f37) → 저장소 `tokens/colors.json` `system.theme.destructed.default`(`ref-color-red-500`=#E72F37)와 정확히 일치
- Spacing(세로 padding): `spacing/07`(10px), `spacing/08`(12px) → `ref-spacing-07`, `ref-spacing-08`과 일치
- 타이포: Body2/14 SB, Body1/16 SB 둘 다 저장소 `tokens/typography.json`의 body2/body1 스타일(letterSpacing -0.04px 포함)과 정확히 일치

**기존 토큰에 없음**
- Size(S/L)별로 "이 padding+타이포 조합을 쓴다"는 규칙 자체를 지정하는 시맨틱 토큰은 저장소에 없음(개별 값 자체는 토큰과 일치)
- 최소 너비 32px(`min-w-[32px]`)를 지정하는 시맨틱 토큰 없음(2장 참고)

**확인 필요**
- 가로 padding이 전혀 없고 `min-w-32px`만 있다는 것이 실제 레이아웃 의도인지(긴 레이블에서의 동작 미검증)
- Disabled=True + Emphasize=On 조합이 Figma에 없는 것이 의도된 제약인지, 우선순위 규칙이 있다면 무엇인지
- Active=Off + Emphasize=On("비활성인데 강조색") 조합의 실제 사용 의미(알림/오류 표시 추정, 주석 없음)
- Hover/Focus/Pressed 상태의 시각 피드백 규정
- `role="tab"`/`aria-selected`/`aria-disabled` 등 접근성 마크업 연결 규정
- 비활성/Disabled 텍스트 명암비의 WCAG 충족 여부

## 9. 샘플링에 사용한 노드 (부록, 12개 전수)

| Size | Active | Disabled | Emphasize | 노드 | 크기 |
|---|---|---|---|---|---|
| S | On | False | Off | `2262:1460` | 32×42 |
| S | On | False | On | `2262:3855` | 32×42 |
| S | Off | False | Off | `2262:1458` | 32×42 |
| S | Off | False | On | `2262:3863` | 32×42 |
| S | On | True | Off | `2262:1456` | 32×42 |
| S | Off | True | Off | `2262:1455` | 32×42 |
| L | On | False | Off | `2262:1457` | 33×48 |
| L | On | False | On | `2262:3871` | 33×48 |
| L | Off | False | Off | `2262:1459` | 33×48 |
| L | Off | False | On | `2262:3879` | 33×48 |
| L | On | True | Off | `2262:1454` | 33×48 |
| L | Off | True | Off | `2262:1453` | 33×48 |

`get_variable_defs`는 `2262:1460`(S,On/False/Off), `2262:3855`(S,On/False/On), `2262:1456`(S,On/True/Off) 3개 노드에서 호출했습니다. `get_motion_context`는 컴포넌트 최상위(`2262:1461`, recursive=true)에 1회 호출해 빈 결과를 확인했습니다.
