# Chip

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2483-12764) — 캔버스 그룹 `2483:12764` 안에 2개의 개별 Component Set이 있음
> 기계 판독용 값은 [`chip.json`](./chip.json)을 함께 참고합니다. 이 문서와 chip.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Chip은 Badge와 마찬가지로 **하나가 아니라 2개의 독립된 Component Set**으로 구성됩니다.

| Component Set | 노드 ID | 변형 수 | 축 구성 |
|---|---|---|---|
| Chip / Selection | `2270:842` | 150 | Size(S/M/L) × Type(Outlined/Filled) × State(Default/Hover/Pressed/Disabled/Selected) × Contents(Text/Avatar+Text/Avatar+Text+Icon/Icon+Text/Text+Icon) |
| Chip / Filter | `2275:3087` | 40 | Type(Outlined/Filled) × State(Default/Hover/Pressed/Disabled/Selected) × Contents(Avatar+Icon/Icon/Avatar+Text+Icon/Text+Icon) |

총 **190개 인스턴스** 중 **25개 대표 노드**를 `get_design_context`로 실측했습니다. Selection은 3개 Size·2개 Type·5개 State·5개 Contents를 모두 최소 1회 이상 포함했고, Filter는 Size 축이 없어 2개 Type·5개 State·4개 Contents를 모두 최소 1회 포함했습니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요"로 명시합니다.
- Chip에는 Button/Badge의 Loading 같은 State는 없고, 대신 **Selected**(선택됨) State가 있습니다 — 필터·태그 선택 UI에 특화된 컴포넌트입니다.

## 1. 컴포넌트 개요

- **Chip / Selection**: 다중 선택, 태그, 카테고리 선택 등에 쓰이는 범용 칩. Size 3단계, 아바타/아이콘을 자유롭게 조합 가능.
- **Chip / Filter**: 드롭다운 필터 트리거 전용 칩. 항상 `chevron_down` 아이콘이 고정으로 붙어 "탭하면 옵션 목록이 펼쳐짐"을 암시하며, Size 축이 없습니다(단일 크기, Selection의 M~L 사이 크기).

| 축(Axis) | Selection 값 | Filter 값 | 의미 |
|---|---|---|---|
| **Size** | S / M / L | — (단일 크기) | 칩의 패딩·폰트·radius를 결정 |
| **Type** | Outlined / Filled | Outlined / Filled | Outlined=흰 배경+테두리, Filled=연한 회색 배경(테두리 없음) |
| **State** | Default / Hover / Pressed / Disabled / Selected | 동일 | Selected는 선택된 상태(체크박스의 Checked에 해당) |
| **Contents** | Text / Avatar+Text / Avatar+Text+Icon / Icon+Text / Text+Icon | Avatar+Icon / Icon / Avatar+Text+Icon / Text+Icon | 라벨·아바타·아이콘의 조합. Filter는 아이콘이 항상 `chevron_down`(사용자 지정 불가), Selection은 아이콘이 `plus`(swap 가능한 슬롯) |

## 2. Chip / Selection — Size별 스펙

기준 조합: Type=Outlined, State=Default, Contents=Text (S `2273:2741` · M `2270:841` · L `2270:827`)

| Size | Padding | Radius | 폰트 스타일 | Weight |
|---|---|---|---|---|
| **S** | px `spacing/06`=8px · py `spacing/03`=3px | `radius/03`=6px | caption1 (12px/18px, -0.03px) | `weight/500` Medium |
| **M** | px `spacing/08`=12px · py `spacing/05`=6px | `radius/05`=10px | body2 (14px/22px, -0.04px) | `weight/500` Medium |
| **L** | px `spacing/08`=12px(M과 동일) · py `spacing/06`=8px | `radius/06`=12px | body1 (16px/24px, -0.04px) | `weight/500` Medium |

모든 padding/radius/typography 값은 저장소 토큰과 **정확히 일치**합니다. 3개 Size 전부 **Weight는 Medium(500) 고정**입니다(Button/Badge처럼 사이즈별로 Weight가 바뀌지 않음).

특이사항: **M과 L의 좌우 패딩(px)이 12px로 동일**하고, 세로 패딩(py)과 radius·폰트만 커집니다. S만 좌우 패딩이 8px로 더 작습니다.

## 3. Chip / Selection — Type/State별 색상 (M 사이즈, Contents=Text 기준 실측)

| State | Outlined | Filled |
|---|---|---|
| **Default** | 배경 `common/white-default`, 테두리 1px `color/gray/900-10`(10%), 텍스트 `neutral/600` | 배경 `color/gray/900-5`(5%, 반투명 회색), 테두리 없음, 텍스트 `neutral/600` |
| **Hover** | Default와 동일 배경/테두리 위에 `color/gray/900-2`(2%) 오버레이 | Default 배경(`gray/900-5`) 위에 `color/interaction/light-gray/hover`(5%) 오버레이 합성(2겹) — 합성 알파 **5% → 9.75%** |
| **Pressed** | `color/gray/900-5`(5%) 오버레이 | `rgba(3,9,26,0.05)` 베이스 위에 `rgba(3,9,26,0.1)`(10%) 오버레이 합성(2겹 gradient) — 실질적으로 Default보다 진해짐 |
| **Disabled** | 배경/테두리 불변 + 전체 `opacity/40`(40%) 적용 | 배경(`gray/900-5`) 불변 + 전체 `opacity/40`(40%) 적용 |
| **Selected** | 배경 `brand/primary-lightest`(`#eef4fc`), 테두리 `color/blue/500-60`(60%, `rgba(44,123,226,0.6)`), 텍스트 `brand/primary-default`(파랑) | 배경 `neutral/800`(`#202837`, 진한 남색 단색), 텍스트 `common/white-default`(흰색) |

**주요 발견**:
- **Type에 따라 오버레이 토큰 패밀리가 다릅니다.** Outlined는 raw 알파 스텝(`gray-900-2%`/`gray-900-5%`)을, Filled는 Button/Checkbox와 같은 `interaction/light-gray/*`(5%/10%) 시맨틱 패밀리를 참조합니다. 값은 서로 같지만 바인딩 경로가 다릅니다.
- **⚠️ 2026-09-15 정정 — "Filled Hover는 Default와 동일해 피드백이 없다"는 서술은 틀렸습니다.** Figma의 Filled/Hover는 채우기가 **2겹**입니다(베이스 `gray/900-5` + `interaction/light-gray/hover`). 두 겹의 **값이 우연히 같아서**(둘 다 `#03091a @5%`) 채우기를 하나만 읽고 "Default와 동일"로 잘못 판단했던 것입니다. 실제 합성 알파는 **5% → 9.75%**(흰 배경 위 `#f2f3f4` → `#e6e7e9`)로 뚜렷하게 어두워집니다. 이 오류 때문에 구현에 Filled hover 피드백이 아예 빠져 있었고, 함께 수정했습니다.
  > 교훈: `fills` 배열의 **마지막 하나만 읽지 말 것.** Hover/Pressed는 2겹이고, 오버레이 값이 베이스와 같을 수 있습니다.
- **Disabled의 `opacity/40`은 Button 문서에서 "사용처 미확인"으로 남겼던 바로 그 토큰**입니다. Chip이 이 토큰의 실제 사용처임이 이번 조사로 확인되었습니다.
- **Selected 상태에서 Outlined와 Filled가 완전히 다른 전략을 씁니다**: Outlined는 옅은 파란 배경+파란 테두리(브랜드 색 강조), Filled는 진한 남색 단색 배경(거의 검정에 가까움)으로 전환됩니다. Button의 Primary/Secondary처럼 "하나의 브랜드 컬러로 통일"하지 않고 Type별로 서로 다른 강조 방식을 택한 점이 특이합니다.

## 4. Chip / Selection — Contents별 구조 (2026-09-15 Size 3종 전수 실측)

> **정정**: 초판은 M 사이즈만 실측하고 "S/L도 동일 비율일 것"으로 추정했습니다.
> 전수 실측 결과 **동일 비율이 아닙니다.** 아래가 실측값입니다.

### 4-1. 외곽 패딩 — 붙는 쪽만 줄어들고, 줄어드는 값이 Size마다 다릅니다

| Size | 기본 좌우 | 왼쪽에 아이콘 | 왼쪽에 아바타 | 오른쪽에 아이콘 |
|---|---|---|---|---|
| **S** | `spacing/06`=8px | `spacing/05`=6px | **`spacing/04`=4px** | `spacing/05`=6px |
| **M** | `spacing/08`=12px | `spacing/06`=8px | `spacing/06`=8px | `spacing/06`=8px |
| **L** | `spacing/08`=12px | `spacing/06`=8px | **`spacing/05`=6px** | `spacing/06`=8px |

**아바타 쪽이 아이콘 쪽보다 더 많이 줄어듭니다** (S 4 vs 6 · L 6 vs 8). M만 우연히 둘 다 8px로 같습니다 — 초판이 M만 보고 "아바타=아이콘"으로 묶은 원인입니다.

### 4-2. 내부 컨테이너 — 아바타·아이콘 크기도 Size마다 다릅니다

| Size | 아바타 컨테이너 | 아바타 | 아이콘 컨테이너 | 아이콘 |
|---|---|---|---|---|
| **S** | 18×18 · px `spacing/03`=3px · py 3px | **12px** | 14×18 · px `spacing/01`=1px · py 3px | **12px** |
| **M** | 24×22 · px `spacing/04`=4px · py 3px | 16px | 20×22 · px `spacing/02`=2px · py 3px | 16px |
| **L** | 32×24 · px `spacing/05`=6px · py `spacing/02`=2px | **20px** | 20×24 · px 2px · py `spacing/04`=4px | **16px** |

⚠️ **L에서 아바타는 20px로 커지는데 아이콘은 16px 그대로**입니다(M과 동일). 두 슬롯의 크기 계단이 다릅니다.

칩의 `gap`은 전 변형 **0**이고, 라벨과의 간격은 전부 이 컨테이너 패딩이 만듭니다.

### 4-3. 검증 (전체 폭 = 좌패딩 + 컨테이너 + 텍스트 + 우패딩)

| 조합 | 계산 | Figma |
|---|---|---|
| S Avatar+Text | 4 + 18 + 24 + 8 | **54×24** |
| M Avatar+Text | 8 + 24 + 28 + 12 | **72×34** |
| L Avatar+Text | 6 + 32 + 32 + 12 | **82×40** |
| S Avatar+Text+Icon | 4 + 18 + 24 + 14 + 6 | **66×24** |
| M Avatar+Text+Icon | 8 + 24 + 28 + 20 + 8 | **88×34** |
| L Avatar+Text+Icon | 6 + 32 + 32 + 20 + 8 | **98×40** |

- **Avatar**: 재사용 서브컴포넌트. 테두리 1px(`borderwidth/02`) `color/gray/900-5`(5%), `radius/12`(999px, 원형), 이미지 `object-cover`. **Chip에서 12 / 16 / 20px 세 가지 크기를 모두 씁니다** — 초판의 "항상 16px 버전만 사용"은 M만 보고 내린 결론이라 틀렸습니다.
- **Icon**: Selection은 `plus`가 기본이며 교체 가능한 슬롯입니다. 크기는 S만 12px, M·L은 16px입니다.
- Icon/Avatar가 옆에 붙을 때 그쪽 외곽 패딩이 줄어드는 비대칭 규칙 자체는 Badge Content(Show Icon=True)·Button과 같은 패턴입니다.

### 4-4. 스트로크는 박스 크기를 키우지 않습니다

Outlined의 테두리는 `strokeAlign: INSIDE` · 두께 1px이라 **Outlined와 Filled의 실측 크기가 같습니다**(S 둘 다 40×24).
CSS `border`는 바깥 크기에 더해지므로 그대로 옮기면 Outlined만 가로·세로 2px씩 커집니다 —
구현에서는 `box-shadow: inset 0 0 0 1px`으로 그려 레이아웃 영향을 없앴습니다(2026-09-15 수정).

## 5. Chip / Filter 스펙

기준 실측: Outlined/Contents=Text+Icon (`2275:3568` Default · `2275:3576` Hover · `2275:3584` Pressed · `2275:3592` Disabled · `2275:3632` Selected), Filled Default(`2275:3600`), Contents=Icon(`2275:4023`)·Avatar+Icon(`2275:3893`)·Avatar+Text+Icon(`2275:3268`)

| 항목 | 값 |
|---|---|
| Radius | `radius/12`=999px (Size 축 없이 항상 완전한 필 형태) |
| 폰트 | body2 (14px/22px, -0.04px) Medium — Size 축이 없어 고정 |
| Padding(Text+Icon) | pl `spacing/08`=12px · pr `spacing/06`=8px · py `spacing/05`=6px |
| Padding(Icon만) | `spacing/05`=6px 4방향 균등, 내부 Icon Container `spacing/03`=3px |
| Padding(Avatar+Icon) | pl `spacing/05`=6px(Selection의 Avatar+Text pl=8px보다 작음) · pr `spacing/06`=8px · py `spacing/05`=6px |
| Padding(Avatar+Text+Icon) | pl `spacing/05`=6px · pr `spacing/06`=8px · py `spacing/05`=6px — **Avatar+Icon과 완전히 동일** (`2275:3268` 실측) |
| 아이콘 | `Icon / Default / 16px / chevron_down` — **항상 고정**, Selection처럼 스왑 가능한 슬롯이 아님 |

**Filter의 왼쪽 패딩 규칙**: 기본은 `spacing/08`=12px 이지만, **왼쪽에 아바타가 붙는 Contents(Avatar+Icon · Avatar+Text+Icon)는 `spacing/05`=6px 로 줄어듭니다.** Contents 4종 중 왼쪽이 12px인 것은 `Text+Icon` 하나뿐이고, `Icon`만은 4방향 6px 균등입니다. 초판 문서에 Avatar+Text+Icon 값이 빠져 있어 구현에서 이 조합만 12px로 남는 버그가 있었습니다(2026-09-14 정정).

색상/State 메커니즘은 Selection과 **완전히 동일**합니다(Outlined Hover=`gray-900-2%`·Pressed=`gray-900-5%`, Filled Hover=`interaction/light-gray/hover`·Pressed=`interaction/light-gray/pressed`, Disabled=`opacity/40`, Selected는 Outlined=브랜드 라이트+블루 테두리 / Filled=neutral/800 — 전부 3장과 동일 토큰).

**Selected 상태에서 아이콘 애셋 자체가 교체됩니다**: Default의 `chevron_down` 아이콘과 Selected의 `chevron_down` 아이콘이 서로 다른 SVG URL로 발급되어, 색상이 다르게 구워진(baked-in) 별도 애셋으로 추정됩니다(라벨 텍스트가 파란색으로 바뀌는 것과 짝을 맞추기 위함으로 보이나, SVG 내부 fill 직접 확인은 안 함 — 확인 필요).

## 6. 인터랙션 토큰 요약

| 상황 | 토큰 | 값 |
|---|---|---|
| Outlined Hover | `color/gray/900-2` | `rgba(3,9,26,0.02)` |
| Outlined/Filled Pressed | `color/gray/900-5`(Outlined 오버레이) / 추가 10% 합성(Filled) | `rgba(3,9,26,0.05)` / `+rgba(3,9,26,0.1)` |
| Disabled | `opacity/40` | 40% |
| Selected 테두리(Outlined) | `color/blue/500-60` | `rgba(44,123,226,0.6)` |
| Selected 배경(Filled) | `neutral/800` | `#202837` |

이 토큰들은 모두 `tokens/colors.json`의 `reference.alpha`/시스템 롤 테이블에 **정확히 일치**하는 값이지만, Button/Checkbox가 쓰는 `interaction/*` 시맨틱 패밀리(blue, light-gray 등)와는 다른 경로(raw alpha 스텝, 시스템 컬러 직접 참조)를 씁니다 — 3장 참고.

## 7. 인터랙션(모션) 스펙

**정본은 [`docs/INTERACTION.md`](../../docs/INTERACTION.md)입니다.**

> **⚠️ 2026-09-16 정정 — 이전 판의 "모션 데이터 없음"은 틀린 기록이었습니다.**
> `get_motion_context`(`2483:12764`, recursive)가 빈 결과였던 건 사실이지만, 이 도구는 **키프레임 애니메이션만** 읽습니다.
> 변형 사이의 전환은 **프로토타입 반응(`node.reactions`)** 에 들어 있고 Plugin API(`use_figma`)로만 보입니다.

전수 집계 결과 **반응 76건** — Selection 60건(`2270:842`) + Filter 16건(`2275:3087`):

| 트리거 | 전환 | API duration | 패널 표시값 | Easing |
|---|---|---|---|---|
| `ON_HOVER` | Default → Hover | 0.3125초 | **150ms** | `SLOW` |
| `ON_PRESS` | Hover → Pressed | 0.1042초 | **50ms** | `SLOW` |

저장소 표준 인터랙션과 동일한 값입니다. CSS 근사는 `cubic-bezier(0.17, 0, 0.19, 1)`입니다(`docs/INTERACTION.md` 2장).

**⚠️ `Selected` 축에는 반응이 없고, 구현에서도 색을 전환하지 않습니다.**
Filled은 Default↔Selected에서 배경 밝기 89%↔2% · 글자 12%↔98%로 **서로 자리를 바꾸기** 때문에, 배경을 크로스페이드하면 중간에 반드시 글자와 같은 밝기를 지나가며 라벨이 잠깐 증발합니다. 전환 시간을 줄여도 사라지는 시간만 짧아질 뿐이라 **상태 축은 즉시 전환**합니다. Outlined도 같은 이유로 통일했습니다 — 규칙과 근거는 `docs/INTERACTION.md` 7.3절.

## 8. 접근성

- **Selected 상태의 의미 전달**: Outlined의 Selected는 옅은 파란 배경, Filled의 Selected는 진한 남색 배경으로 서로 다른 방식이라, 스크린리더 사용자에게는 `aria-pressed`/`aria-selected` 같은 명시적 속성이 필요합니다. Figma 파일 자체에는 이 규정이 없습니다.
- **Disabled의 opacity 40%**: Button의 Disabled(20%)보다 낮은 불투명도(40%)를 씁니다 — Chip이 상대적으로 더 흐릿하게 보이는 규칙이 의도적인지, 아니면 컴포넌트별로 다른 opacity 토큰이 임의로 쓰인 것인지 확인 필요.
- **Filter Chip의 드롭다운 트리거 시맨틱**: `chevron_down` 아이콘이 항상 붙는 구조상, 실제 구현 시 `aria-haspopup`/`aria-expanded` 속성이 필요할 것으로 보이나 Figma에 명시된 바 없음.
- **최소 터치 영역**: S 사이즈 칩은 전체 높이가 24px(py 3px×2 + lineHeight 18px)로 44px 권장 기준보다 작습니다 — Button/Badge와 동일한 이슈.

## 9. 토큰 매칭 요약

**정확히 일치**
- Selection 모든 Size의 padding/radius → `ref-spacing-03/05/06/08`, `ref-radius-03/05/06`
- 모든 typography(caption1/body2/body1, weight 500) → `tokens/typography.json`
- Outlined 테두리 1px `gray-900-10%` → `ref-color-alpha-gray-900-10`
- Filled 배경 `gray-900-5%` → `ref-color-alpha-gray-900-5`
- Hover `gray-900-2%` → `ref-color-alpha-gray-900-2`
- Selected(Outlined) 테두리 `blue-500-60%` → `ref-color-alpha-blue-500-60`
- Selected(Filled) 배경 `neutral/800`(`#202837`) → `sys-color-neutral-800`(`ref-color-gray-800`)
- Disabled `opacity/40` → `ref-opacity-40` (Button 문서의 "사용처 미확인" 토큰이 Chip에서 실사용됨을 확인)
- Filter Radius 999px → `ref-radius-12`
- Avatar 서브컴포넌트 테두리 `gray-900-5%`, `borderwidth/02`(1px) → 정확히 일치

**기존 토큰에 없음**
- 없음 (실측된 모든 값이 저장소 토큰과 매칭됨)

**확인 필요**
- ~~Filled Hover가 Default와 값이 동일해 시각적 피드백이 없는 것이 의도적인지~~ → **2026-09-15 해소.** 오독이었습니다. 2겹 합성이라 실제로는 5%→9.75%로 어두워집니다(3장 정정 참고).
- ~~Contents 구조(Avatar/Icon 조합 시 패딩 비대칭)가 S/L 사이즈에도 동일 비율로 적용되는지(M만 실측)~~ → **2026-09-15 해소.** 전수 실측 결과 **동일 비율이 아닙니다.** 4장 참고.
- Filter Chip Selected 시 아이콘 애셋이 교체되는 정확한 색상 값(SVG fill 미확인)
- Chip Disabled가 40% opacity를 쓰는 것과 Button이 20%를 쓰는 것의 차이가 의도적인지
- Selected 상태의 `aria-pressed`/`aria-selected`, Filter Chip의 `aria-haspopup`/`aria-expanded` 규정 여부

## 10. 샘플링에 사용한 노드 (부록)

**Chip / Selection**:
Size/State(M, Outlined, Text): `2270:841`(Default) · `2270:836`(Hover) · `2270:824`(Pressed) · `2270:761`(Disabled) · `2270:798`(Selected)
Type(M, Filled, Text): `2270:793`(Default) · `2270:837`(Hover) · `2270:835`(Pressed) · `2270:829`(Disabled) · `2270:833`(Selected)
Size(S/L, Outlined, Text): `2273:2741`(S Default) · `2270:827`(L Default) · `2270:782`(L Selected)
Contents(M, Outlined, Default): `2270:819`(Avatar+Text) · `2270:821`(Avatar+Text+Icon) · `2270:755`(Icon+Text) · `2270:757`(Text+Icon)

**Chip / Filter**:
State(Outlined, Text+Icon): `2275:3568`(Default) · `2275:3576`(Hover) · `2275:3584`(Pressed) · `2275:3592`(Disabled) · `2275:3632`(Selected)
Type(Filled, Text+Icon): `2275:3600`(Default)
Contents(Outlined, Default): `2275:4023`(Icon) · `2275:3893`(Avatar+Icon) · `2275:3268`(Avatar+Text+Icon)

전체 변수 맵(`get_variable_defs`)과 모션(`get_motion_context`, recursive)은 상위 그룹 `2483:12764`에 각 1회 호출해 확보했습니다. 2개 Component Set 전체 구조는 `get_metadata`(`2483:12764`)로 1회 확인했습니다.
