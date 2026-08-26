# Icon Button

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2209-2320) — Component Set `2209:2320` ("Icon Button")
> 기계 판독용 값은 [`icon-button.json`](./icon-button.json)을 함께 참고합니다. 이 문서와 icon-button.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

이 Icon Button 컴포넌트 셋은 **아이콘 전용 정사각형 버튼**으로, `Size × Type × State × Icon Color × Stroke × Bold Stroke` 축을 조합해 다수의 변형 인스턴스로 구성됩니다. Size 축은 스케일(정사각형 치수/패딩/radius/아이콘 크기)만 다르고 구조는 동일하므로, 전체를 조회하는 대신 각 변형 축을 최소 1회 이상 포함하도록 **대표 노드를 선택 샘플링**하여 `get_design_context`/`get_variable_defs`/`get_motion_context`로 실측했습니다.

- 실측한 노드: Size 3개(S/M/L), Type 7개(Ghost/Tertiary-Black/Tertiary-White/Primary/Secondary/Destructed/Destructed-Subtle), State 4개(Primary의 Default/Hover/Pressed/Disabled), Stroke 2개(Tertiary True/Bold-False·True/Bold-True), 교차검증 Hover 2개(Destructed·Secondary). 총 16개 노드 + 전체 셋 변수맵 1회 + 모션 1회.
- 실측하지 않은 조합(예: 모든 Size × Type × State의 전체 교차)은 실측된 규칙(치수 공식, 오버레이 메커니즘, 토큰 매핑)이 동일하게 적용된다고 **추정**한 것이며, 개별 검증하지 않은 값은 **"확인 필요"**로 표시했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소의 `tokens/*.json`에 없는 값은 "기존 토큰에 없음" 또는 "확인 필요"로 명시했습니다.

> **정정 완료(중요)**: 이 컴포넌트의 hover/pressed 오버레이는 Figma의 `color/interaction/*` **변수**를 사용합니다. 그 실측 resolved 값이 정답이며(base=`[color]-900` 15%/30%, light=`[color]-500` 8%/15%, light-gray=`gray-900` 5%/10%), 초기엔 저장소 `tokens/colors.json`·`docs/DESIGN.md`가 잘못된 값을 담고 있어 불일치했으나 **2026-08-26 실측값으로 정정하여 현재 일치**합니다. 자세한 비교·원인은 5-2절 참고.

## 1. 컴포넌트 개요

Icon Button은 라벨 없이 아이콘 하나만으로 액션을 제공하는 **정사각형** 버튼입니다. 툴바, 리스트 행 액션, 닫기/더보기/추가 등 공간이 제한된 곳에서 사용합니다. 라벨 텍스트가 없으므로 접근성 대체 텍스트가 필수입니다(7장).

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L | 정사각형 전체 크기를 결정. 실측 외곽 정사각형: **S 28px / M 36px / L 40px**(패딩+아이콘으로 산출되는 값, 고정 width/height 프레임이 아님 — 2장) |
| **Type** | Ghost / Tertiary / Primary / Secondary / Destructed / Destructed-Subtle | 액션의 강조도·의미를 배경/아이콘 색으로 구분 |
| **State** | Default / Hover / Pressed / Disabled | 상호작용 피드백 상태 |
| **Icon Color** | Black / White / Blue / Red | Type에 종속적으로 결정되는 아이콘 색. Ghost·Tertiary=Black(다크 배경 Tertiary는 White), Primary·Destructed=White, Secondary=Blue, Destructed-Subtle=Red |
| **Stroke** | False / True | 1px 보더 사용 여부. **Tertiary**에서 관측됨 |
| **Bold Stroke** | False / True | Stroke=True일 때 옅은 반투명 보더 대신 진한 단색(neutral/400) 보더 사용 여부. **Tertiary**에서 관측됨 |

### 1-1. 이 컴포넌트에만 있는 Type 설명

- **Ghost**: 배경 채움이 전혀 없는(투명) 아이콘 버튼. 아이콘만 검정(Black)으로 표시됩니다. Button 컴포넌트에는 없는 타입으로, 배경 없이 아이콘만 얹어야 하는 헤더/툴바용입니다.
- **Destructed-Subtle**: 파괴적 액션의 저강조 버전. 채도 높은 빨강 채움(Destructed) 대신 **연한 빨강 surface**(`theme/destructed-bg` `#ffedeb`)에 빨강 아이콘(`Red`)을 얹습니다. Button 컴포넌트에는 없는 이 컴포넌트 고유 타입입니다.
- **Tertiary**: 중립 회색 버튼. 밝은 배경에서는 `neutral/100`(`#f6f7f7`) 배경 + Black 아이콘, 어두운 배경(Icon Color=White)에서는 `neutral/600`(`#5b616c`) 배경 + White 아이콘으로 반전됩니다. Stroke/Bold Stroke 옵션은 Tertiary에서만 관측됩니다.

## 2. Size별 스펙 (Type=Primary, State=Default, Icon Color=White로 실측: S=`2209:2303`, M=`2209:2301`, L=`2209:2299`)

Icon Button은 **고정 width/height 프레임이 아니라**, 정사각형 아이콘에 상하좌우 동일 패딩을 적용해 정사각형이 되는 구조입니다(auto-layout `p-[…]` 균등 패딩). 외곽 정사각형 한 변은 `패딩×2 + 아이콘`으로 산출됩니다.

| Size | 패딩(4방향 동일) | Radius | 아이콘 크기 | 외곽 정사각형(산출값) |
|---|---|---|---|---|
| **S** | `spacing/05` = 6px (`ref-spacing-05`) | `radius/04` = 8px (`ref-radius-04`) | 16px | **28px** (6+16+6) |
| **M** | `spacing/06` = 8px (`ref-spacing-06`) | `radius/06` = 12px (`ref-radius-06`) | 20px | **36px** (8+20+8) |
| **L** | `spacing/06` = 8px (`ref-spacing-06`) | `radius/06` = 12px (`ref-radius-06`) | 24px | **40px** (8+24+8) |

- 패딩/radius 값은 저장소 토큰(`tokens/spacing.json`, `tokens/radius.json`)과 **정확히 일치**합니다.
- 특이사항: **S만 radius가 8px(`radius/04`)**이고 M/L은 12px(`radius/06`)로 점프합니다. 패딩도 S=6px, M/L=8px입니다.
- 외곽 정사각형 값(28/36/40px)은 실측 아이콘·패딩으로 산출한 값이며, Figma에 별도의 고정 크기 토큰으로 정의되어 있지는 않습니다 — 치수 자체에 대응하는 토큰은 **기존 토큰에 없음**(패딩·아이콘 토큰의 합성 결과).
- Size 축의 치수는 Type과 무관하게 동일합니다(샘플링한 Ghost/Tertiary/Secondary/Destructed/Destructed-Subtle의 M 노드가 전부 패딩 8px·radius 12px·아이콘 20px로 동일).

## 3. Type별 색상 (Size=M, State=Default 기준으로 실측)

| Type | 배경 | 아이콘(Icon Color) | 저장소 토큰(V3) | 매칭 여부 | 실측 노드 |
|---|---|---|---|---|---|
| **Ghost** | 없음(투명) | Black | 배경: 해당 없음(fill 없음) | — | `2209:2311` |
| **Primary** | `brand/primary-default` `#2c7be2` | White `#fdfdfd` | 배경 `sys-color-brand-primary-default`(`ref-color-blue-500` `#2C7BE2`) | 배경 **정확히 일치** | `2209:2301` |
| **Secondary** | `brand/primary-lightest` `#eef4fc` | Blue `#2c7be2` | `sys-color-brand-primary-lightest`(`ref-color-blue-50` `#EEF4FC`) | **정확히 일치** | `2209:2302` |
| **Tertiary** (Black) | `neutral/100` `#f6f7f7` | Black | `sys-color-neutral-100`(`ref-color-gray-100` `#F6F7F7`) | 배경 **정확히 일치** | `2209:2279` |
| **Tertiary** (On-Dark, White) | `neutral/600` `#5b616c` | White `#fdfdfd` | `sys-color-neutral-600`(`ref-color-gray-600` `#5B616C`) | 배경 **정확히 일치** | `2209:4312` |
| **Destructed** | `theme/destructed-default` `#e72f37` | White `#fdfdfd` | `sys-color-theme-destructed-default`(`ref-color-red-500` `#E72F37`) | 배경 **정확히 일치** | `2209:2317` |
| **Destructed-Subtle** | `theme/destructed-bg` `#ffedeb` | Red `#e72f37` | `sys-color-theme-destructed-bg`(`ref-color-red-50` `#FFEDEB`) | 배경 **정확히 일치** | `2209:2288` |

### 3-1. 아이콘 색상(Icon Color) 토큰 매핑

아이콘은 개별 SVG 애셋으로 렌더링되며 fill 색이 애셋에 baked되어 있어 `get_design_context` 코드 문자열에서 **직접 hex를 읽을 수 없습니다**. 아래는 Icon Color 변형 이름 + 전체 셋 변수맵(`get_variable_defs`)으로 추정한 매핑입니다.

| Icon Color | 추정 토큰 | resolved 값 | 신뢰도 |
|---|---|---|---|
| White | `sys-color-common-white-default`(`common/white-default`) | `#fdfdfd`(`ref-color-gray-50`) | 높음(변수맵에 존재, 배경 대비 명확) |
| Blue | `sys-color-brand-primary-default`(`brand/primary-default`) | `#2c7be2`(`ref-color-blue-500`) | 높음 |
| Red | `sys-color-theme-destructed-default`(`theme/destructed-default`) | `#e72f37`(`ref-color-red-500`) | 높음 |
| Black | `sys-color-neutral-800`(`neutral/800`) | `#202837`(`ref-color-gray-800`) | **확인 필요** — 변수맵에 `neutral/800 #202837`가 있고 어떤 배경에도 쓰이지 않아 Black 아이콘 색으로 추정하나, SVG baked라 직접 검증 못함 |

## 4. Stroke / Bold Stroke 규칙 (Size=M, Type=Tertiary, Icon Color=Black로 실측: `2209:2286`, `2209:2285`)

| 조합 | 배경 | 보더 | 토큰 매칭 |
|---|---|---|---|
| **Stroke=False** | Type별 색상(3장) | 없음 | — |
| **Stroke=True, Bold Stroke=False** | `neutral/100` `#f6f7f7` (Tertiary 배경 유지) | 1px, `color/gray/900-10` = `rgba(3,9,26,0.1)` | 보더폭 1px = `ref-borderwidth-02` **정확히 일치**; 색상 = gray-900 10% alpha(`ref-color-alpha-gray-900-10`, 베이스 `#03091A`) **정확히 일치** |
| **Stroke=True, Bold Stroke=True** | `neutral/100` `#f6f7f7` | 1px, `neutral/400` `#c2c4c8`(불투명 단색) | 보더폭 1px = `ref-borderwidth-02` **정확히 일치**; 색상 = `sys-color-neutral-400`(`ref-color-gray-400` `#C2C4C8`) **정확히 일치** |

- **Button 컴포넌트와의 차이**: Button은 Stroke=True일 때 배경이 흰색(`common/white-default`)으로 바뀌었으나, Icon Button의 Tertiary Stroke 변형은 배경이 **`neutral/100`(회색)으로 유지**되고 그 위에 보더만 추가됩니다.
- 보더폭은 Tailwind 기본 `border`(1px)로 렌더링되며 코드 출력에 별도 폭 변수는 바인딩되어 있지 않습니다(1px = `ref-borderwidth-02`로 해석).
- Stroke/Bold Stroke 조합은 샘플링 범위에서 **Tertiary 타입에서만** 관측되었습니다.

## 5. State별 색상 변화 (Size=M, Type=Primary로 실측: Default=`2209:2301`, Hover=`2209:2271`, Pressed=`2209:2250`, Disabled=`2209:2232`)

### 5-1. Default
3장(Type별 색상)의 값을 그대로 사용합니다.

### 5-2. Hover / Pressed
배경 위에 반투명 오버레이를 **사전 합성(pre-composite)한 플랫 그라디언트**로 렌더링됩니다(box-shadow가 아니라, `linear-gradient(overlay) , linear-gradient(base)`를 겹친 `backgroundImage`). 오버레이 색은 Figma 파일의 `color/interaction/*` 변수를 사용합니다.

**실측 확인된 3개 계열(Primary/Destructed/Secondary):**

| Type / 배경 계열 | Figma 변수 | Hover(실측) | Pressed(실측) |
|---|---|---|---|
| Primary(블루 채움) | `color/interaction/blue/*` | 베이스 `#2c7be2` + `rgba(13,45,87,0.15)` = blue-900 **15%** | 베이스 `#2c7be2` + blue-900 **30%** (`rgba(13,45,87,0.3)`) |
| Destructed(빨강 채움) | `color/interaction/red/*` | 베이스 `#e72f37` + `rgba(94,19,20,0.15)` = red-900 **15%** | (미실측, 변수맵상 red-900 **30%** 추정 — 확인 필요) |
| Secondary(연한 블루 surface) | `color/interaction/light-blue/*` | 베이스 `#eef4fc` + `rgba(44,123,226,0.08)` = blue-500 **8%** | (미실측, 변수맵상 blue-500 **15%** 추정 — 확인 필요) |

**미실측 계열(변수맵 기반 추정 — 확인 필요):**

| Type / 배경 계열 | 추정 Figma 변수 | Hover | Pressed |
|---|---|---|---|
| Tertiary(회색 surface) | `color/interaction/light-gray/*` 또는 `gray/*` | gray-900 5% 또는 15% — **확인 필요** | gray-900 10% 또는 30% — **확인 필요** |
| Ghost(투명) | `color/interaction/gray/*` 또는 `light-gray/*` | **확인 필요** | **확인 필요** |
| Destructed-Subtle(연한 빨강 surface) | `color/interaction/light-red/*` | red-500 8% 추정 | red-500 15% 추정 — **확인 필요** |

- Hover 상태에는 `cursor: pointer` 힌트가 함께 붙습니다.
- 오버레이 메커니즘(사전 합성 그라디언트)과 채움 계열의 hover→pressed 진행(alpha 15%→30%)은 Primary/Destructed에서 실측 확인되었습니다.

> **정정 완료(중요)**: 위 Figma `color/interaction/*` 변수의 resolved 값(실측)이 정답이며, 초기에는 저장소 `tokens/colors.json`·`docs/DESIGN.md` 12.3 표가 잘못된 값(blue-500 20% 등)을 담고 있어 불일치했습니다. **2026-08-26 저장소 토큰과 DESIGN.md를 아래 실측값으로 정정하여 현재는 일치**합니다. 아래 표의 `colors.json(정정 전)` 컬럼은 참고용 옛 값입니다.
>
> | 변수 | Figma 실측(정답) | colors.json (정정 전) | 현재 |
> |---|---|---|---|
> | `interaction/blue/hover` | blue-900 `#0D2D57` 15% (`#0D2D5726`) | blue-500 20% | 정정 후 일치 |
> | `interaction/blue/pressed` | blue-900 30% (`#0D2D574D`) | blue-500 40% | 정정 후 일치 |
> | `interaction/red/hover` | red-900 `#5E1314` 15% (`#5E131426`) | red-500 20% | 정정 후 일치 |
> | `interaction/red/pressed` | red-900 30% (`#5E13144D`) | red-500 40% | 정정 후 일치 |
> | `interaction/light-blue/hover` | blue-500 8% (`#2C7BE214`) | blue-50 solid | 정정 후 일치 |
> | `interaction/light-blue/pressed` | blue-500 15% (`#2C7BE226`) | blue-100 solid | 정정 후 일치 |
> | `interaction/gray/hover` | gray-900 15% (`#03091A26`) | gray-900 5% | 정정 후 일치 |
> | `interaction/gray/pressed` | gray-900 30% (`#03091A4D`) | gray-900 10% | 정정 후 일치 |
> | `interaction/light-gray/hover` | gray-900 5% (`#03091A0D`) | gray-100 solid | 정정 후 일치 |
> | `interaction/light-gray/pressed` | gray-900 10% (`#03091A1A`) | gray-200 solid | 정정 후 일치 |
> | `interaction/light-red/hover` | red-500 8% (`#E72F3714`) | red-50 solid | 정정 후 일치 |
> | `interaction/light-red/pressed` | red-500 15% (`#E72F3726`) | red-100 solid | 정정 후 일치 |
>
> **원인**: `docs/DESIGN.md` 12.3 표가 최초 작성될 때 ref 매핑이 잘못 기재되었고(interaction/blue를 blue-500 20%로), 그 잘못된 표값이 `tokens/colors.json`에 그대로 이식되어 있었습니다. 실제 Figma 변수는 base=`[color]-900` 15%/30%, light-chromatic=`[color]-500` 8%/15%, light-gray=`gray-900` 5%/10% 입니다. 세 컴포넌트(Button/Text/Icon)의 반복 실측이 모두 이 값을 가리켜 정정했습니다.

### 5-3. Disabled (실측: `2209:2232`)
버튼 전체(배경 + 아이콘)에 **opacity 20%**를 적용합니다. 색상값 자체는 변하지 않습니다.

- `opacity/20` = 20% = `ref-opacity-20` — **정확히 일치**
- 참고: 전체 셋 변수맵에 `opacity/40`(40%) 변수도 존재하나 샘플링한 노드에서 사용처를 찾지 못했습니다 — **확인 필요**(다른 컴포넌트용이거나 미사용 변수일 수 있음).

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`2209:2320`, recursive=true)에 호출했으나 빈 결과(`{"nodes":[]}`)를 반환했습니다. Figma 파일 안에 Hover/Pressed 전환에 대한 프로토타입 인터랙션(스마트 애니메이트, 트랜지션, 키프레임)이 정의되어 있지 않습니다.

State 간 **색상/opacity 값 자체**는 5장에 실측되어 있지만, 그 전환의 duration이나 easing은 Figma에 정의된 바가 없으므로 임의 수치(예: "200ms ease-out")를 만들어내지 않았습니다. 구현 시 duration/easing이 필요하면 디자이너 확인이 필요합니다.

## 7. 접근성

- **최소 터치 영역(아이콘 버튼에서 특히 중요)**: 실측 외곽 정사각형은 **S 28px / M 36px / L 40px**로, **세 사이즈 모두 흔히 권장되는 44px(WCAG 2.5.5 / Apple 44pt) 기준보다 작습니다**(Google Material 48dp 기준으로도 전부 미달). 아이콘 버튼은 라벨이 없어 물리적 타깃이 곧 히트 영역이므로, 실제 적용 시 투명 히트 영역(hit area) 확장이 필요한지 확인이 필요합니다. Figma 파일에는 명시적 최소 터치 영역 정의가 없습니다 — **확인 필요**.
- **대체 텍스트**: 라벨이 없는 아이콘 전용 버튼이므로 `aria-label`(또는 대체 텍스트)이 필수입니다. `docs/DESIGN.md`에 "접근성 라벨이 필요한 버튼형 아이콘에는 `aria-label` 또는 대체 텍스트를 제공합니다" 규정이 있습니다.
- **색상 명암비**: `docs/DESIGN.md` 전반에 "배경 요소 위의 텍스트/아이콘/컴포넌트는 WCAG 기준 준수" 원칙만 있고, Icon Button 전용 명암비 수치 검증은 이 조사에서 수행하지 않았습니다 — **확인 필요**. 특히 Ghost(투명 배경 위 Black 아이콘)와 Destructed-Subtle(연한 빨강 위 빨강 아이콘)은 배경 맥락에 따라 대비가 달라질 수 있어 주의가 필요합니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- 모든 Size 패딩 → `ref-spacing-05`(6px, S) · `ref-spacing-06`(8px, M/L)
- 모든 Size radius → `ref-radius-04`(8px, S) · `ref-radius-06`(12px, M/L)
- Primary 배경 `#2c7be2` → `sys-color-brand-primary-default`(`ref-color-blue-500`)
- Secondary 배경 `#eef4fc` → `sys-color-brand-primary-lightest`(`ref-color-blue-50`)
- Tertiary 배경 `#f6f7f7` → `sys-color-neutral-100`(`ref-color-gray-100`)
- Tertiary On-Dark 배경 `#5b616c` → `sys-color-neutral-600`(`ref-color-gray-600`)
- Destructed 배경 `#e72f37` → `sys-color-theme-destructed-default`(`ref-color-red-500`)
- Destructed-Subtle 배경 `#ffedeb` → `sys-color-theme-destructed-bg`(`ref-color-red-50`)
- Stroke 보더폭 1px → `ref-borderwidth-02`
- Stroke(Bold=False) 보더색 gray-900 10% alpha → `ref-color-alpha-gray-900-10`(베이스 `#03091A`)
- Stroke(Bold=True) 보더색 `#c2c4c8` → `sys-color-neutral-400`(`ref-color-gray-400`)
- Disabled opacity 20% → `ref-opacity-20`
- Icon Color White `#fdfdfd` → `sys-color-common-white-default`(`ref-color-gray-50`)

**추정(SVG baked라 직접 검증 불가) — 확인 필요**
- Icon Color Black → `sys-color-neutral-800`(`#202837`) (변수맵상 존재로 추정)

**불일치 — 확인 필요 (가장 주목할 항목)**
- hover/pressed 오버레이의 `color/interaction/*` 변수 resolved 값이 저장소 `tokens/colors.json`의 `interaction` 섹션과 계열 전반에서 다름(5-2절 표 참조). 저장소 토큰 stale 여부 또는 컴포넌트별 오버레이 차이 여부 확인 필요.

**기존 토큰에 없음**
- 외곽 정사각형 치수(28/36/40px) — 패딩+아이콘 합성 결과, 전용 크기 토큰 없음
- `opacity/40` 변수(사용처 미확인)

**미실측(추정) — 확인 필요**
- Tertiary / Ghost / Destructed-Subtle의 hover/pressed 오버레이 계열 매핑(5-2절)
- Destructed / Secondary의 pressed 오버레이(hover만 실측)

## 9. 샘플링에 사용한 대표 노드 (부록)

- Size(Primary/Default/White): `2209:2303`(S) · `2209:2301`(M) · `2209:2299`(L)
- Type(M/Default): `2209:2311`(Ghost/Black) · `2209:2279`(Tertiary/Black) · `2209:4312`(Tertiary/White,On-Dark) · `2209:2301`(Primary/White) · `2209:2302`(Secondary/Blue) · `2209:2317`(Destructed/White) · `2209:2288`(Destructed-Subtle/Red)
- State(M/Primary): `2209:2301`(Default) · `2209:2271`(Hover) · `2209:2250`(Pressed) · `2209:2232`(Disabled)
- Stroke(M/Tertiary/Black): `2209:2286`(Stroke=True/Bold=False) · `2209:2285`(Stroke=True/Bold=True)
- 교차검증 Hover: `2209:2268`(Destructed M) · `2209:2273`(Secondary M)

전체 변수 맵은 `get_variable_defs`를 컴포넌트 셋 `2209:2320`에 1회 호출해 확보했습니다. 모션은 `get_motion_context`(`2209:2320`, recursive)로 확인했으며 빈 결과였습니다.
