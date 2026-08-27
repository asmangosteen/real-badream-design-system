# Segmented Control Item (`_Item`)

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2196-8568) — Component `_Item` (node `2196:8568`)
> 기계 판독용 값은 [`segmented-control-item.json`](./segmented-control-item.json)을 함께 참고합니다. 이 문서와 segmented-control-item.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/global/`에 위치합니다 — 다른 global 서브 아톰(Label/Type Box/Supporting Text 등)이 Input류 여러 컴포넌트에서 재사용되는 것과 달리, `_Item`은 [Segmented Control](../../segmented-control/segmented-control.md) **단 하나**에서만 쓰입니다. 다만 Figma 파일 안에서 디자이너가 이를 독립된 별도 Frame(`2196:8568`)으로 명시적으로 분리해두었습니다 — "Segmented Control을 구성하는 재사용 가능한 최소 단위"라는 아토믹 디자인 의도를 존중해, 조합형 컴포넌트인 Segmented Control 문서와 분리하여 이 폴더의 다른 서브 아톰과 동일한 패턴으로 문서화합니다(상세: `components/README.md` "components/global/이란" 절 참고).

## 0. 문서 범위와 샘플링 방법

`_Item`은 **Size(XS/S/M/L/XL) × Selected(True/False) 두 축, 10-변형 컴포넌트**입니다. 10개뿐이므로 **전수 실측**했습니다 — `get_design_context`를 10개 노드 전부에 개별 호출했습니다.

- `get_variable_defs`는 대표 노드 2개(M,Selected=True `2196:8564` / Segmented Control Size=XS,Count=2 조합 확인용 `2215:13505`)에서 호출해 변수 맵을 확보했습니다.
- `get_motion_context`는 컴포넌트 최상위(`2196:8568`, recursive=true)에 1회 호출했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

`_Item`은 [Segmented Control](../../segmented-control/segmented-control.md)의 세그먼트 하나(탭 하나)를 나타내는 서브 아톰입니다. 텍스트 레이블 하나만 가진 단순 컨테이너로, "선택된 세그먼트"(Selected=True)는 흰 배경 pill + 옅은 그림자로 부상(浮上)해 보이고, "선택되지 않은 세그먼트"(Selected=False)는 배경/그림자 없이 텍스트만 표시됩니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | XS / S / M / L / XL | 세그먼트 크기 단계(패딩·타이포·radius 스케일) |
| **Selected** | True / False | 현재 활성 탭 여부. True=흰 배경 pill + 그림자 + 진한 텍스트, False=배경 없음 + 옅은 텍스트 |

**Hover/Pressed/Disabled 등 다른 상태 축은 Figma에 존재하지 않습니다** — Dropdown(5개 State)이나 Chip 등 다른 상호작용 컴포넌트와 달리, `_Item`은 Size×Selected 2축 10개 변형이 전부입니다. 클릭 시 hover/pressed 피드백을 어떻게 줄지는 이 컴포넌트 자체에 규정되어 있지 않습니다 — 확인 필요(5장 참고).

## 2. Size별 스펙 (10개 전체 실측)

| Size | 노드(Selected=True / False) | 크기(실측, 단일 인스턴스) | 가로 padding | 세로 padding | radius | 타이포 | lineHeight | letterSpacing |
|---|---|---|---|---|---|---|---|---|
| **XS** | `2217:13546` / `2217:13548` | 41×22px | `spacing/06`=8px | `spacing/03`=3px | `radius/03`=6px | Caption2/10 **SemiBold(600)** | 16px | -0.03px |
| **S** | `2196:8567` / `2196:8565` | 46×26px | `spacing/06`=8px | `spacing/04`=4px | `radius/03`=6px | Caption1/12 **SemiBold(600)** | 18px | -0.03px |
| **M** | `2196:8564` / `2196:8566` | 55×34px | `spacing/07`=10px | `spacing/05`=6px | `radius/04`=8px | Body2/14 **Medium(500)** | 22px | -0.04px |
| **L** | `2196:8563` / `2196:8562` | 64×40px | `spacing/08`=12px | `spacing/06`=8px | `radius/06`=12px | Body1/16 **Medium(500)** | 24px | -0.04px |
| **XL** | `2196:8561` / `2196:8560` | 77×48px | `spacing/10`=16px | `spacing/08`=12px | `radius/06`=12px | Subtitle/18 **Medium(500)** | 24px | -0.09px |

**핵심 실측 발견**:

1. **높이는 `lineHeight + 세로padding×2`와 정확히 일치**합니다(예: L=24+8×2=40, XL=24+12×2=48). 5개 Size 전부 이 공식이 성립합니다.
2. **타이포 weight가 S→M 사이에서 전환됩니다**: XS·S는 **SemiBold(600)**(Caption2/Caption1), M·L·XL은 **Medium(500)**(Body2/Body1/Subtitle)입니다. Label 컴포넌트가 "S/M 타이포 동일, L만 다름"이었던 것과 달리, `_Item`은 "**XS/S 동일 계열, M부터 weight+스타일이 함께 바뀜**"이라는 다른 분기 지점을 가집니다.
3. **가로 padding 스텝이 균등하지 않습니다**: XS=S=8px(`spacing/06`)로 동일 → M=10px(`spacing/07`) → L=12px(`spacing/08`) → XL=16px(`spacing/10`, **`spacing/09`=14px를 건너뜀**).
4. **세로 padding 스텝도 마찬가지로 균등하지 않습니다**: XS=3px(`spacing/03`) → S=4px(`spacing/04`) → M=6px(`spacing/05`) → L=8px(`spacing/06`) → XL=12px(`spacing/08`, **`spacing/07`=10px를 건너뜀**).
5. **radius는 3단계로만 나뉩니다**: XS·S 공유 `radius/03`(6px), M 단독 `radius/04`(8px), L·XL 공유 `radius/06`(12px). **`radius/05`(10px)는 아예 쓰이지 않습니다.**
6. **너비(41~77px)는 고정값이 아닙니다 — 확인 완료.** [Segmented Control](../../segmented-control/segmented-control.md) 안에 실제로 조합된 형태를 보면 각 `_Item` 인스턴스는 `flex-[1_0_0] min-w-px`(flex-grow:1, flex-basis:0, min-width:0)로 지정되어 있어, 부모 컨테이너 폭을 세그먼트 개수만큼 균등 분할해서 채웁니다. 여기서 실측한 41~77px는 독립 진열 프레임에서 placeholder 텍스트 "Label" + 좌우 padding만으로 hug된 값일 뿐이며, 실제 사용 시에는 컨테이너 폭에 따라 가변입니다.

## 3. Selected True/False 색상 차이 (5개 Size 공통 규칙)

| 요소 | Selected=True | Selected=False |
|---|---|---|
| **배경** | `common/white-default`=`#fdfdfd` | 없음(투명) |
| **그림자** | 있음: `offset-y` `shadow_unit/2`=2px, `blur` `shadow_unit/4`/2=2px, 색상 `color/gray/900-5`=`rgba(3,9,26,0.05)` | 없음 |
| **텍스트 색상** | `neutral/800`=`#202837` | `neutral/500`=`#8c9199` |
| **padding·radius·타이포(family/size/weight/lineHeight/letterSpacing)** | Size별 2장 표와 동일 | Size별 2장 표와 동일(True와 완전히 동일) |

**핵심 발견**: Selected 축은 **배경·그림자·텍스트 색상 3가지만** 바꾸고, 레이아웃(padding·radius)과 타이포그래피(family/size/weight)는 전혀 건드리지 않습니다. 5개 Size 전부에서 이 규칙이 동일하게 확인되었습니다(10개 노드 전수 실측이므로 예외 없음이 확정적입니다).

**그림자 토큰 이슈(확인 필요)**: 이 그림자는 저장소 `tokens/colors.json`의 `shadow.01/02/03`(색상 `#454C58`, opacity 20/24/32%) 시맨틱 토큰을 쓰지 않고, `color/gray/900-5`(즉 `alpha.gray-900.5` = `rgba(3,9,26,0.05)`)라는 **다른 alpha 토큰을 그림자 색상으로 직접 참조**합니다. `shadow_unit/0,2,4`(오프셋·블러 계산용 원시 숫자 0/2/4)도 저장소에 별도 정의된 그림자 전용 토큰 세트가 아닙니다 — Divider/Avatar처럼 그림자가 없는 컴포넌트와 달리 `_Item`은 그림자를 쓰지만, 그 표현 방식이 저장소 문서화된 `shadow/01~03` 체계와 다른 별개 조합이라는 점이 확인 필요 항목입니다.

## 4. 모션 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 최상위(`2196:8568`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Selected=False→True 전환 시의 배경/그림자 페이드나 텍스트 색상 트랜지션에 대한 모션 정의는 Figma 파일에 없습니다. (Segmented Control 조합 레벨에서의 "슬라이딩 인디케이터" 애니메이션 유무는 [segmented-control.md](../../segmented-control/segmented-control.md) 6장에서 별도로 확인했습니다 — 마찬가지로 모션 데이터 없음.)

## 5. 접근성

- `_Item`은 단독으로 쓰이지 않고 항상 Segmented Control 안에서 탭(tab) 역할을 하므로, 실제 구현 시 개별 `_Item`에는 `role="tab"` `aria-selected={Selected}`를 부여하는 것이 적절해 보이나 Figma 파일에 규정은 없습니다 — 확인 필요.
- Hover/Focus/Pressed 상태에 대한 시각적 피드백이 Figma 컴포넌트 자체에 정의되어 있지 않습니다(1장 참고) — 키보드 포커스 링, 클릭 시 프레스 피드백 등은 구현 시 별도로 설계해야 합니다 — 확인 필요.
- Selected=True/False 구분이 배경·그림자·텍스트 명도 차이로만 표현됩니다. 텍스트 색상 대비(`neutral/800` #202837 vs `neutral/500` #8c9199, 둘 다 흰 배경 위)는 WCAG 기준 확인이 필요합니다 — 확인 필요.
- 키보드 네비게이션(좌우 화살표로 세그먼트 간 이동 등)은 [segmented-control.md](../../segmented-control/segmented-control.md) 7장에서 다룹니다.

## 6. 토큰 매칭 요약

**정확히 일치**
- 배경 `common/white-default`(#fdfdfd) → `sys-color-common-white-default`
- 텍스트 색상 `neutral/800`(#202837) → `sys-color-neutral-800`, `neutral/500`(#8c9199) → `sys-color-neutral-500`
- Radius: `radius/03`(6px) → `ref-radius-03`, `radius/04`(8px) → `ref-radius-04`, `radius/06`(12px) → `ref-radius-06`
- Spacing(padding): `spacing/03,04,05,06,07,08,10` 전부 `ref-spacing-03~10`과 일치
- 타이포: Caption2/10 SB, Caption1/12 SB, Body2/14 M, Body1/16 M, Subtitle/18 M 전부 저장소 `tokens/typography.json`의 caption2/caption1/body2/body1/subtitle 스타일과 정확히 일치

**기존 토큰에 없음**
- Size(XS/S/M/L/XL)별로 "이 padding+radius+타이포 조합을 쓴다"는 규칙 자체를 지정하는 시맨틱 토큰은 저장소에 없음(개별 값 자체는 토큰과 일치)
- 그림자에 쓰인 `color/gray/900-5` + `shadow_unit/0,2,4` 조합을 저장소의 `shadow/01~03` 시맨틱 토큰으로 매핑하는 규정이 없음(3장 참고)

**확인 필요**
- 그림자 색상이 `shadow/01~03`이 아닌 `color/gray/900-5`(alpha 토큰)를 직접 참조하는 것이 의도인지
- Hover/Focus/Pressed 상태의 시각 피드백 규정
- `role="tab"`/`aria-selected` 등 접근성 마크업 연결 규정
- Selected=False 텍스트(`neutral/500`) 명암비가 WCAG 기준을 충족하는지

## 7. 샘플링에 사용한 노드 (부록, 10개 전수)

| Size | Selected=True | Selected=False |
|---|---|---|
| XS | `2217:13546` | `2217:13548` |
| S | `2196:8567` | `2196:8565` |
| M | `2196:8564` | `2196:8566` |
| L | `2196:8563` | `2196:8562` |
| XL | `2196:8561` | `2196:8560` |

`get_variable_defs`는 `2196:8564`(M,True)와 `2215:13505`(Segmented Control Size=XS, Count=2 — `_Item` XS 변형이 내부에 쓰이는지 교차 확인용, [segmented-control.md](../../segmented-control/segmented-control.md) 2장 참고. 실측 당시 이 노드는 Figma에서 "Size=S"로 잘못 라벨링되어 있었으나 이후 "Size=XS"로 정정됨 — segmented-control.md 0-1장 참고)에서 호출했습니다. `get_motion_context`는 컴포넌트 최상위(`2196:8568`, recursive=true)에 1회 호출해 빈 결과를 확인했습니다.
