# Text Button

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=439-21305) — Component Set `439:21305` ("Text Button")
> 기계 판독용 값은 [`text-button.json`](./text-button.json)을 함께 참고합니다. 이 문서와 text-button.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Text Button은 **Size(4) × Text Color(3) × State(5) × Contents(3)** 축으로 구성된 컴포넌트 셋입니다. Size 축은 타이포/아이콘 스케일만 다르고 구조는 동일하므로, 전체 교차를 전수 조회하는 대신 각 변형 축을 최소 1회 이상 포함하도록 **대표 노드 15개를 선택 샘플링**하여 `get_design_context`/`get_variable_defs`/`get_motion_context`로 실측했습니다.

- 실측하지 않은 조합(예: Size × Text Color × State의 전체 교차)은 실측된 규칙(오버레이 합성 공식, 토큰 매핑)이 동일하게 적용된다고 **추정**한 것이며, 개별 검증하지 않은 값은 **"확인 필요"**로 표시했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`·`docs/DESIGN.md`에 없는 값은 전부 "기존 토큰에 없음" 또는 "확인 필요"로 명시했습니다.
- 모든 토큰 값은 `docs/DESIGN.md`(바드림 디자인시스템 V3, source of truth)와 `tokens/*.json`을 기준으로 정렬했습니다.

> **Button과의 근본 차이**: Text Button은 **배경 채움·패딩·radius가 전혀 없는 텍스트/라벨형 버튼**입니다. 색상은 배경이 아니라 텍스트(+아이콘)에만 적용되며, hover/pressed도 배경 오버레이가 아니라 **텍스트·아이콘 색을 직접 어둡게 합성**하는 방식으로 표현됩니다(5장 참고). 이 점이 채움 배경 위에 오버레이를 얹는 `Button` 컴포넌트와 결정적으로 다릅니다.

## 1. 컴포넌트 개요

Text Button은 배경 없이 라벨(과 선택적 아이콘)만으로 저강조 액션을 유도하는 인라인/텍스트형 버튼입니다. 링크성 액션, 보조 액션, 리스트/카드 내부의 인라인 액션 등에 사용합니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L / XL | 라벨 타이포와 아이콘 크기의 스케일을 결정. 배경·패딩이 없으므로 "버튼 크기"는 곧 텍스트 크기 |
| **Text Color** | Blue / Gray / Red | 라벨·아이콘 색상. Blue=주요/링크성, Gray=중립/저강조, Red=파괴적(destructed) 액션 |
| **State** | Default / Hover / Pressed / Disabled / Loading | 상호작용 피드백 상태. Loading은 라벨 대신 스피너로 대체됨 |
| **Contents** | Text / Text + Icon / Icon + Text | 라벨과 아이콘의 유무·순서. "Text + Icon"은 아이콘이 텍스트 뒤(오른쪽), "Icon + Text"는 아이콘이 텍스트 앞(왼쪽). Loading 변형은 Contents=Default(스피너만) |

> **공통 구조(전 사이즈·전 상태 실측)**: 최상위 래퍼는 `flex items-center justify-center`이며 **background/fill 없음, padding 없음(0), border-radius 없음**입니다. 아이콘이 있는 경우에만 라벨↔아이콘 사이 `gap = spacing/02`(2px)가 적용됩니다.

## 2. Size별 스펙 (Text Color=Blue, State=Default 기준 실측)

기준 노드: S=`439:21290`, M=`439:21298`, L=`439:21249`, XL=`439:21304` (모두 Contents=Text)

| Size | 배경 | Padding | Radius | Gap(아이콘 시) | 폰트 스타일 | Weight | 아이콘 크기 |
|---|---|---|---|---|---|---|---|
| **S** | 없음 | 없음(0) | 없음 | `spacing/02`=2px (`ref-spacing-02`) | caption1 (12px/18px, ls -0.03px) | `weight/600` Semibold | 확인 필요 (S Contents=Icon 조합 미측정) |
| **M** | 없음 | 없음(0) | 없음 | `spacing/02`=2px | body2 (14px/22px, ls -0.04px) | `weight/500` Medium | **16px** (실측 `439:21278`) |
| **L** | 없음 | 없음(0) | 없음 | `spacing/02`=2px | body1 (16px/24px, ls -0.04px) | `weight/500` Medium | 확인 필요 (L Contents=Icon 조합 미측정) |
| **XL** | 없음 | 없음(0) | 없음 | `spacing/02`=2px | subtitle (18px/24px, ls -0.09px) | `weight/500` Medium | 확인 필요 (XL Contents=Icon 조합 미측정) |

- 타이포 값(size/lineHeight/letterSpacing)은 저장소 `tokens/typography.json`의 caption1/body2/body1/subtitle 행과 **정확히 일치**합니다. 폰트 패밀리는 전 사이즈 공통 `font/pretendard` = Pretendard(`tokens/typography.json` fontFamily와 일치).
- 특이사항: **S만 Semibold(`weight/600`), M/L/XL은 전부 Medium(`weight/500`)** 라벨 굵기를 사용합니다.
- Size 스케일이 Button과 다릅니다. Text Button은 S=caption1 → M=body2 → L=**body1** → XL=**subtitle** 로 올라갑니다(Button의 L은 body2였음). Button 문서와 Size별 타이포 매핑이 다르므로 혼동 주의.
- 아이콘 크기는 Contents=Text+Icon/Icon+Text(M)에서만 16px로 실측되었습니다. S/L/XL의 아이콘 크기는 개별 노드를 샘플링하지 않아 **확인 필요**로 남깁니다. 아이콘 애셋 이름은 `Icon / Default / 16px / plus`(기본 플레이스홀더 글리프)입니다.

## 3. Text Color별 색상 (Size=M, State=Default 기준 실측)

기준 노드: Blue=`439:21298`, Gray=`439:21293`, Red=`439:21291`

| Text Color | Figma 변수 | 값(HEX) | 저장소 토큰(V3) | 매칭 여부 |
|---|---|---|---|---|
| **Blue** | `brand/primary-default` | `#2c7be2` | `sys-color-brand-primary-default` (→ `ref-color-blue-500` `#2C7BE2`) | **정확히 일치** |
| **Gray** | `neutral/600` | `#5b616c` | `sys-color-neutral-600` (→ `ref-color-gray-600` `#5B616C`) | **정확히 일치** |
| **Red** | `theme/destructed-default` | `#e72f37` | `sys-color-theme-destructed-default` (→ `ref-color-red-500` `#E72F37`) | **정확히 일치** |

세 색상 모두 텍스트와 아이콘에 동일하게 적용됩니다(아이콘은 벡터라 currentColor처럼 텍스트 색을 따름). 배경은 전 색상 공통으로 없음입니다.

## 4. State별 색상 변화 (Size=M, Text Color=Blue 기준 실측)

기준 노드: Default=`439:21298`, Hover=`439:21230`, Pressed=`439:21226`, Disabled=`439:21171`, Loading=`439:21250`

### 4-1. Default
3장의 Text Color 값을 그대로 사용합니다.

### 4-2. Hover / Pressed — 텍스트·아이콘 색 직접 합성
Button처럼 배경 오버레이를 얹는 것이 아니라, **텍스트/아이콘 색 자체를 어둡게 합성한 플랫 컬러**로 렌더링됩니다(래퍼에 배경이 없으므로 오버레이 얹을 대상이 없음). 합성에 쓰이는 오버레이는 컴포넌트 셋에 바인딩된 `color/interaction/{blue|gray|red}/{hover|pressed}` 변수이며, 결과적으로 라벨 색이 hover에서 한 단계, pressed에서 두 단계 어두워집니다.

실측(Blue):

| State | 실측 라벨 색(HEX) | 합성 공식(실측값과 일치 확인) |
|---|---|---|
| Default | `#2c7be2` | `brand/primary-default` (blue-500) |
| Hover | `#276fcd` | blue-500 위에 `color/interaction/blue/hover`(= blue-900 `#0D2D57` 15%) 합성 |
| Pressed | `#2364b8` | blue-500 위에 `color/interaction/blue/pressed`(= blue-900 `#0D2D57` 30%) 합성 |

- 합성 공식 검증: `#2c7be2`에 `#0d2d57`을 15%/30% 알파로 오버레이하면 각각 `#276fcd`/`#2364b8`가 되어 **실측 라벨 색과 정확히 일치**합니다. 즉 hover/pressed는 이 interaction 변수를 텍스트 색에 구워 넣은 것입니다.
- **Size 독립 확인**: S 사이즈 Hover(`439:21240`)의 라벨 색도 `#276fcd`로 M과 동일합니다. State 색 규칙은 Size에 무관합니다.

컴포넌트 셋에 바인딩된 interaction 오버레이 변수 전체(`get_variable_defs` 실측):

| Figma 변수 | 값 | 베이스 색 | 알파 |
|---|---|---|---|
| `color/interaction/blue/hover` | `#0d2d5726` | `#0D2D57` (blue-900) | 약 15% (0x26=38/255) |
| `color/interaction/blue/pressed` | `#0d2d574d` | `#0D2D57` (blue-900) | 약 30% (0x4d=77/255) |
| `color/interaction/gray/hover` | `#03091a26` | `#03091A` (gray-900) | 약 15% |
| `color/interaction/gray/pressed` | `#03091a4d` | `#03091A` (gray-900) | 약 30% |
| `color/interaction/red/hover` | `#5e131426` | `#5E1314` (red-900) | 약 15% |
| `color/interaction/red/pressed` | `#5e13144d` | `#5E1314` (red-900) | 약 30% |
| `color/interaction/light-blue/pressed` | `#2c7be226` | `#2C7BE2` (blue-500) | 약 15% (샘플 노드에서 사용처 미확인) |

> **정정 완료 — 중요**: 이 `color/interaction/*` 변수들의 실제 resolved 값(**blue-900/gray-900/red-900 계열 15%/30%**)이 정답입니다. 초기엔 `docs/DESIGN.md` 12.3절과 `tokens/colors.json`이 잘못된 값(`interaction/blue`=blue-500 20% 등)을 담고 있어 불일치했으나, **2026-08-26 저장소 토큰(colors.json/tokens.css)과 DESIGN.md 12.3 표를 이 실측값으로 정정하여 현재는 일치**합니다. 원인: DESIGN.md 12.3 표의 최초 ref 매핑 오류(base 계열을 `[color]-500`로 잘못 기재)를 colors.json에 그대로 이식했던 것. Button/Text/Icon 세 컴포넌트의 반복 실측이 모두 이 값을 가리켜 확정했습니다.

Gray/Red의 hover/pressed 최종 라벨 색은 개별 노드로 실측하지 않았습니다. 메커니즘(Blue에서 확인된 "베이스 색 + interaction 오버레이 합성")은 동일하게 적용될 것으로 추정하되, **정확한 합성 HEX는 확인 필요**로 남깁니다.

### 4-3. Disabled (실측: `439:21171`)
버튼 전체(텍스트+아이콘)에 **opacity 20%**를 적용합니다. 색상값 자체는 변하지 않습니다(라벨은 `brand/primary-default` 유지).

- `opacity/20` = 20% = `ref-opacity-20` — **정확히 일치** (래퍼에 `opacity: 0.2` 바인딩 실측).

### 4-4. Loading (실측: `439:21250`)
Loading 변형은 **Contents=Default**로, 라벨 텍스트를 표시하지 않고 **스피너만** 중앙에 렌더링합니다(Button의 Loading이 라벨을 유지한 것과 다름 — Text Button은 라벨을 스피너로 대체).

- 스피너는 내부용 아톰 `_ButtonSpinner`(컴포넌트 셋 `439:19645`)의 인스턴스입니다. 실측된 M 변형 구조: 컨테이너 프레임 `_ButtonSpinner`에 **패딩 3.5px(4방향)**, 내부 링 아이콘 **15px × 15px**, 이름 `Subtract`의 **단일 프레임 래스터(PNG) 이미지**.
- 3.5px/15px는 저장소 스페이싱·아이콘 스케일과 일치하지 않는 고정값입니다 → **기존 토큰에 없음**. (자세한 Size별 스피너 스펙은 `components/button-spinner/button-spinner.md` 참고.)
- 스피너 링 색상은 `_ButtonSpinner`에 바인딩된 `neutral/800`(`#202837`) 또는 `common/white-default`(`#fdfdfd`) 중 하나이나(둘 다 저장소 토큰과 정확히 일치), 링이 플랫 이미지라 어느 색이 이 Text Button 문맥에 적용되는지는 코드에서 분해되지 않습니다 → **매핑 확인 필요**(밝은 배경 위 텍스트 버튼이므로 `neutral/800`일 가능성이 높음).

## 5. Contents별 gap·아이콘 규칙 (Size=M 기준 실측)

기준 노드: Text=`439:21298`, Text + Icon=`439:21278`, Icon + Text=`439:21279`

| Contents | 구성/순서 | Gap | 아이콘 크기(M) |
|---|---|---|---|
| **Text** | 라벨만 | 없음(아이콘 없음) | — |
| **Text + Icon** | 라벨 → 아이콘 (아이콘이 오른쪽) | `spacing/02`=2px (`ref-spacing-02`, **정확히 일치**) | 16px |
| **Icon + Text** | 아이콘 → 라벨 (아이콘이 왼쪽) | `spacing/02`=2px (**정확히 일치**) | 16px |
| **Default (Loading 전용)** | 스피너만 | — | 스피너 15px (4-4 참고) |

- 두 아이콘 조합 모두 `flex items-center justify-center`에 `gap: 2px`만 추가되며, 그 외 padding/radius/background는 여전히 없습니다.
- M 아이콘은 16px(`Icon / Default / 16px / plus`)로 실측되었습니다. 다른 Size의 아이콘 크기는 미측정 → 확인 필요(2장 참고).

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`439:21305`, recursive=true)에 호출한 결과 빈 결과(`{"nodes":[]}`)를 반환했습니다. Hover/Pressed 색 전환이나 Loading 스피너 회전에 대한 프로토타입 인터랙션(스마트 애니메이트, 트랜지션, 키프레임)이 Figma 파일에 정의되어 있지 않습니다.

| 트리거 | 대상 프로퍼티 | Duration | Easing | 시작값 | 종료값 |
|---|---|---|---|---|---|
| Default → Hover | 텍스트/아이콘 color | 모션 데이터 없음 | 모션 데이터 없음 | `#2c7be2`(Blue) | `#276fcd`(Blue) |
| Hover → Pressed | 텍스트/아이콘 color | 모션 데이터 없음 | 모션 데이터 없음 | `#276fcd` | `#2364b8` |
| Default → Disabled | opacity | 모션 데이터 없음 | 모션 데이터 없음 | 100% | 20% |
| Loading 스피너 회전 | transform: rotate | 모션 데이터 없음 | 모션 데이터 없음 | 모션 데이터 없음 | 모션 데이터 없음 |

State 간 색/opacity 값 자체는 4장에 실측되어 있으나, 전환 duration/easing은 Figma에 정의된 바가 없어 임의 수치를 만들지 않았습니다. 구현 시 필요하면 디자이너 확인이 필요합니다.

## 7. 접근성

- **최소 터치 영역**: **확인 필요.** Text Button은 padding이 0이라 히트 영역이 곧 텍스트 바운드(라인 높이 18/22/24/24px)입니다. 세로 높이가 흔히 권장되는 44px 최소 터치 영역보다 작으므로, 실제 구현 시 텍스트 바깥으로 히트 영역(hit area)을 확장해야 하는지 확인이 필요합니다. Figma 파일에는 명시적 최소 터치 영역 정의가 없습니다.
- **aria-label**: `docs/DESIGN.md`에 "접근성 라벨이 필요한 버튼형 아이콘에는 `aria-label` 또는 대체 텍스트를 제공합니다"라는 규정이 있습니다. 아이콘 조합(특히 아이콘 비중이 큰 경우)에 적용해야 합니다.
- **색상 명암비**: `docs/DESIGN.md` 전반에 "배경 요소 위의 텍스트/아이콘/컴포넌트는 WCAG 기준을 준수해야 함"이라는 원칙만 있고, Text Button 전용 명암비 수치 검증(특히 배경색과의 대비, Disabled 20% opacity 상태 포함)은 이 조사에서 수행하지 않았습니다 → 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- 모든 Size의 아이콘 조합 gap → `ref-spacing-02` (2px)
- 모든 Size의 타이포(caption1/body2/body1/subtitle, weight `font-weight-500/600`) → `tokens/typography.json`
- Disabled opacity 20% → `ref-opacity-20`
- Blue 텍스트 → `sys-color-brand-primary-default` (`ref-color-blue-500` `#2C7BE2`)
- Gray 텍스트 → `sys-color-neutral-600` (`ref-color-gray-600` `#5B616C`)
- Red 텍스트 → `sys-color-theme-destructed-default` (`ref-color-red-500` `#E72F37`)
- Loading 스피너 색 후보 `neutral/800`(`#202837`)·`common/white-default`(`#FDFDFD`) — 값은 일치, 적용 매핑은 확인 필요

**정정 완료 (실측값이 정답, 저장소 반영됨)**
- hover/pressed 합성 오버레이(`color/interaction/blue|gray|red/hover|pressed`) → 실측 resolved 값 blue-900/gray-900/red-900 계열 15%/30%. 2026-08-26 `tokens/colors.json`·`tokens.css`·`docs/DESIGN.md` 12.3 표를 이 값으로 정정하여 현재 일치. (base 계열은 alpha 램프에 없어 직접 색+alpha로 정의)
- Loading 스피너 치수(컨테이너 패딩 3.5px, 링 아이콘 15px)

**구조적 특성 (Button과의 차이)**
- 배경 채움·패딩·radius 없음(전 사이즈·전 상태)
- Size별 타이포 매핑이 Button과 다름(L=body1, XL=subtitle)
- hover/pressed가 배경 오버레이가 아니라 텍스트 색 직접 합성
- Loading이 라벨을 유지하지 않고 스피너로 대체(Contents=Default)

**확인 필요 (미측정)**
- S/L/XL의 아이콘 크기(M만 16px 실측)
- Gray/Red의 hover/pressed 최종 합성 라벨 색(메커니즘만 Blue에서 확인)
- Loading 스피너 링 색상의 문맥별 적용 매핑

## 9. 샘플링에 사용한 대표 노드 (부록)

- Size(Blue·Default·Text): `439:21290`(S) · `439:21298`(M) · `439:21249`(L) · `439:21304`(XL)
- Text Color(M·Default·Text): `439:21298`(Blue) · `439:21293`(Gray) · `439:21291`(Red)
- State(M·Blue·Text): `439:21298`(Default) · `439:21230`(Hover) · `439:21226`(Pressed) · `439:21171`(Disabled)
- Loading(M·Blue·Contents=Default): `439:21250`
- Contents(M·Blue·Default): `439:21298`(Text) · `439:21278`(Text + Icon) · `439:21279`(Icon + Text)
- 교차검증(State size 독립): `439:21240`(Hover · S · Blue · Text) → M과 동일한 `#276fcd`

변수 맵은 `get_variable_defs`를 컴포넌트 셋 `439:21305`에 1회 호출해 확보했습니다(단일 호출로 전체 반환). `get_motion_context`(`439:21305`, recursive=true)는 빈 결과를 반환했습니다.
