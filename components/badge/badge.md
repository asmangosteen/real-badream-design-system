# Badge

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2482-1618) — 캔버스 그룹 `2482:1618` 안에 4개의 개별 Component Set이 있음
> 기계 판독용 값은 [`badge.json`](./badge.json)을 함께 참고합니다. 이 문서와 badge.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Badge는 Figma상에서 **하나의 컴포넌트 셋이 아니라 4개의 독립된 Component Set**으로 구성되어 있습니다(사용자가 준 URL의 프레임 `2482:1618`은 이 4개를 한 캔버스에 모아둔 그룹일 뿐, 실제 컴포넌트 정의 단위가 아닙니다).

| Component Set | 노드 ID | 변형 수 | 축 구성 |
|---|---|---|---|
| Badge / Content / Basic | `2106:1806` | 36 | Theme(Gray/Brand) × Size(S/M/L) × Type(Solid/Alpha/Outlined) × Show Icon(True/False) |
| Badge / Content / Theme | `2107:2167` | 90 | Theme(Success/Purple/Warning/Turquoise/Destructed) × Size(S/M/L) × Type(Solid/Alpha/Outlined) × Show Icon(True/False) |
| Badge / Numeric / Basic | `2108:1558` | 24 | Theme(Gray/Brand) × Size(S/M/L) × Count(0~9/10+) × Type(Solid/Empty) |
| Badge / Numeric / Theme | `2108:2211` | 60 | Theme(Success/Destructed/Warning/Purple/Turquoise) × Size(S/M/L) × Count(0~9/10+) × Type(Solid/Empty) |

Badge/Content(Basic+Theme)와 Badge/Numeric(Basic+Theme)는 각각 **Theme 축만 2개(Gray/Brand)+5개(테마색)로 나뉜 동일 계열**이므로, 이 문서에서는 "Content"와 "Numeric" 두 그룹으로 합쳐서 다룹니다. 전체 210개 인스턴스(126 Content + 84 Numeric) 중 **30개 대표 노드**를 `get_design_context`로 실측했습니다 — Content는 7개 Theme(Gray/Brand/Success/Destructed/Warning/Purple/Turquoise) 전체와 3개 Size, 3개 Type, Show Icon 양쪽을 모두 최소 1회 포함했고, Numeric도 동일하게 7개 Theme·3개 Size·Count 양쪽·Type 양쪽을 모두 포함했습니다. `get_variable_defs`는 상위 그룹(`2482:1618`)에 1회 호출해 4개 셋에서 쓰이는 모든 컬러/타이포/스페이싱 변수를 한 번에 확보했습니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요"로 명시합니다.
- Button 문서와 달리 Badge는 **State(Hover/Pressed/Disabled 등) 축 자체가 존재하지 않습니다** — Figma 컴포넌트 프로퍼티에 Hover/Pressed 관련 variant가 없고, `get_motion_context`도 빈 결과를 반환했습니다(6장 참고). Badge는 클릭 불가능한 정적 상태 표시자로 설계된 것으로 보입니다.

## 1. 컴포넌트 개요

Badge는 상태·카테고리·개수 등을 짧게 표시하는 비인터랙티브 라벨입니다. 두 가지 하위 유형이 있습니다.

- **Content Badge**: 텍스트(+선택적 아이콘)를 담는 필(pill) 모양 라벨. "신규", "진행중" 같은 상태/카테고리 표시에 사용.
- **Numeric Badge**: 숫자 카운트 전용. 한 자리(0~9)일 때는 정원(正圓), 두 자리 이상(10+)일 때는 캡슐형으로 자동 확장됨.

| 축(Axis) | Content 값 | Numeric 값 | 의미 |
|---|---|---|---|
| **Theme** | Gray / Brand / Success / Purple / Warning / Turquoise / Destructed (7종) | 동일 7종 | 배지의 의미/카테고리를 색상으로 구분 |
| **Size** | S / M / L | S / M / L | 배지 크기(패딩·폰트·아이콘) |
| **Type** | Solid / Alpha / Outlined | Solid / Empty | 배경 스타일: Solid=진한 채움, Alpha=연한 틴트 배경(Content 전용), Outlined=테두리만(Content 전용), Empty=배경 없이 텍스트만(Numeric 전용) |
| **Show Icon** (Content만) | True / False | — | 라벨 뒤에 "+" 플러스 아이콘 표시 여부 |
| **Count** (Numeric만) | — | 0~9 / 10+ | 한 자리(정원) vs 두 자리 이상(캡슐형) |

## 2. Content Badge — Size별 스펙

기준 조합: Theme=Brand, Type=Solid, Show Icon=True (S `2106:1990`) / Show Icon=False (S `2106:2101`) · M Show Icon=True(Gray) `2106:1942` / Show Icon=False `2106:2113` · L Show Icon=True(Brand,Alpha) `2106:1999` / Show Icon=False(Gray,Outlined) `2106:2143`

| Size | Padding (Show Icon=True) | Padding (Show Icon=False) | Gap | Radius | 폰트 스타일 | Weight | 아이콘 크기 | 전체 높이(실측) |
|---|---|---|---|---|---|---|---|---|
| **S** | pt `spacing/01`=1px · pb `spacing/02`=2px · px `spacing/05`=6px(좌우 동일) | True와 동일(패딩 불변) | `spacing/01`=1px | `radius/12`=999px | caption2 (10px/16px, -0.03px) | `weight/600` Semibold | **12px** | 19px |
| **M** | pl `spacing/06`=8px · pr `spacing/05`=6px · py `spacing/02`=2px(상하 동일) | px `spacing/06`=8px(좌우 동일) · py `spacing/02`=2px | `spacing/01`=1px | `radius/12`=999px | caption1 (12px/18px, -0.03px) | `weight/600` Semibold | **12px** | 22px |
| **L** | pl `spacing/07`=10px · pr `spacing/06`=8px · py `spacing/01`=1px(상하 동일) | px `spacing/07`=10px(좌우 동일) · py `spacing/01`=1px | `spacing/01`=1px | `radius/12`=999px | **body2** (14px/22px, -0.04px) | **`weight/500` Medium** | **16px** | 24px |

모든 padding/gap/radius/typography 값은 저장소 토큰(`tokens/spacing.json`, `tokens/radius.json`, `tokens/typography.json`)과 **정확히 일치**합니다.

관찰된 특이사항:

- **아이콘 크기가 텍스트 크기와 다르게 스케일됨**: S/M은 둘 다 **12px 고정**(사이즈가 커져도 아이콘은 그대로), L에서만 16px로 커집니다. Button의 아이콘(사이즈별로 세밀하게 스케일)과 다른 패턴입니다.
- **Show Icon=True일 때만 좌우 패딩이 비대칭**(M/L): 왼쪽이 한 단계 크고(M=8px/L=10px), 오른쪽이 한 단계 작습니다(M=6px/L=8px) — 아이콘 자체의 시각적 여백을 고려해 텍스트 쪽 패딩만 살짝 줄인 것으로 보입니다. **S는 예외적으로 Show Icon 여부와 무관하게 항상 좌우 6px 대칭**입니다(실측 확인, `2106:1939` vs `2106:2101`).
- **S만 상하 패딩이 비대칭(pt=1/pb=2), M/L은 상하 대칭**: S는 Button 문서에서도 관찰되지 않았던 배지 고유의 광학 보정으로 보이며, Show Icon 여부와 무관하게 고정입니다.
- **L만 폰트 Weight가 Medium(500)**: S/M은 Semibold(600)인데 L만 Medium(500)로 낮아집니다. Button은 반대로 S만 Semibold이고 나머지가 Medium이었는데, Badge는 L만 Medium이라는 점에서 규칙이 다릅니다 — 의도적 디자인으로 보이나 원본 파일 확인을 권장합니다.

## 3. Content Badge — Type/Theme별 색상 (Size=S, Show Icon=True 기준 실측 · 다른 Size에도 동일 적용 추정)

### 3-1. Solid (배경 진하게 채움, 텍스트/아이콘 흰색)

| Theme | 배경 | 텍스트 | 저장소 토큰(V3) | 매칭 여부 |
|---|---|---|---|---|
| **Gray** | `neutral/600` `#5b616c` | `common/white-default` `#fdfdfd` | `sys-color-neutral-600` / `sys-color-common-white-default` | **정확히 일치** |
| **Brand** | `brand/primary-default` `#2c7be2` | `common/white-default` `#fdfdfd` | `sys-color-brand-primary-default`(`ref-color-blue-500`) | **정확히 일치** |
| **Success** | `theme/success-default` `#1f8f30` | `common/white-default` | `sys-color-theme-success-default`(`ref-color-green-600`) | **정확히 일치** |
| **Destructed** | `theme/destructed-default` `#e72f37` | `common/white-default` | `sys-color-theme-destructed-default`(`ref-color-red-500`) | **정확히 일치** |
| **Warning** | `theme/warning-default` `#ff792c` | `common/white-default` | `sys-color-theme-warning-default`(`ref-color-orange-500`) | **정확히 일치** |
| **Purple** | `theme/purple-default` `#af3bc6` | `common/white-default` | `ref-color-purple-500`(V3 system.theme.purple.default) | **정확히 일치** |
| **Turquoise** | `theme/turquoise-default` `#00aca2` | `common/white-default` | `ref-color-turquoise-600`(V3 system.theme.turquoise.default) | **정확히 일치** |

### 3-2. Alpha (연한 틴트 배경, 텍스트/아이콘은 테마 진한 색)

| Theme | 배경 | 텍스트 | 저장소 토큰(V3) | 매칭 여부 |
|---|---|---|---|---|
| **Gray** | `neutral/100` `#f6f7f7` | `neutral/600` `#5b616c` | `sys-color-neutral-100` / `sys-color-neutral-600` | **정확히 일치** |
| **Brand** | `brand/primary-lightest` `#eef4fc` | `brand/primary-default` `#2c7be2` | `sys-color-brand-primary-lightest`(`ref-color-blue-50`) | **정확히 일치** (L 사이즈 `2106:1999`로 실측) |
| **Success** | `theme/success-bg` `#ebfaeb` | `theme/success-default` `#1f8f30` | `ref-color-green-50`(V3 system.theme.success.bg) | **정확히 일치** (변수맵으로 확인, 개별 렌더링은 Warning만 직접 실측) |
| **Destructed** | `theme/destructed-bg` `#ffedeb` | `theme/destructed-default` | `ref-color-red-50` | **정확히 일치** (변수맵 확인) |
| **Warning** | `theme/warning-bg` `#fff3ed` | `theme/warning-default` `#ff792c` | `ref-color-orange-50` | **정확히 일치** (`2107:2312`로 직접 실측) |
| **Purple** | `theme/purple-bg` `#faeffc` | `theme/purple-default` | `ref-color-purple-50` | **정확히 일치** (변수맵 확인) |
| **Turquoise** | `theme/turquoise-bg` `#e9fbf9` | `theme/turquoise-default` | `ref-color-turquoise-50` | **정확히 일치** (변수맵 확인) |

Success/Destructed/Purple/Turquoise의 Alpha 배경은 `get_variable_defs`로 값 자체는 확인했으나, Warning처럼 개별 노드 렌더링(`get_design_context`)까지 실측 확인한 것은 아닙니다 — 값 존재는 확실하나 **실제 적용 여부는 패턴 추정**입니다.

### 3-3. Outlined (흰 배경 + 1px 테두리, 텍스트/아이콘은 테마 진한 색)

| Theme | 배경 | 테두리 색상(알파) | Figma 변수 | 저장소 토큰(V3) | 매칭 여부 |
|---|---|---|---|---|---|
| **Gray** | `common/white-default` | `color/gray/900-20` = `rgba(3,9,26,0.2)` | `color/gray/900-20` | `ref-color-alpha-gray-900-20` | **정확히 일치** |
| **Brand** | `common/white-default` | `color/blue/500-40` = `rgba(44,123,226,0.4)` | `color/blue/500-40` | `ref-color-alpha-blue-500-40` | **정확히 일치** |
| **Success** | `common/white-default` | `color/green/600-40` = `rgba(31,143,48,0.4)` | `color/green/600-40` | `ref-color-alpha-green-600-40` | **정확히 일치**(변수맵 확인) |
| **Destructed** | `common/white-default` | `color/red/500-40` = `rgba(231,47,55,0.4)` | `color/red/500-40` | `ref-color-alpha-red-500-40` | **정확히 일치**(변수맵 확인) |
| **Warning** | `common/white-default` | `color/orange/500-40` = `rgba(255,121,44,0.4)` | `color/orange/500-40` | `ref-color-alpha-orange-500-40` | **정확히 일치**(변수맵 확인) |
| **Purple** | `common/white-default` | `color/purple/500-40` = `rgba(175,59,198,0.4)` | `color/purple/500-40` | `ref-color-alpha-purple-500-40` | **정확히 일치** (`2107:2492`로 직접 실측) |
| **Turquoise** | `common/white-default` | `color/turquoise/600-40` = `rgba(0,172,162,0.4)` | `color/turquoise/600-40` | `ref-color-alpha-turquoise-600-40` | **정확히 일치**(변수맵 확인) |

테두리 두께는 전 Theme 공통 `borderwidth/02`=1px(`ref-borderwidth-02`) — **정확히 일치**.

**비대칭 발견**: Gray만 알파 20%를 쓰고, 나머지 6개 컬러 Theme(Brand/Success/Destructed/Warning/Purple/Turquoise)는 전부 알파 40%를 씁니다. 또한 컬러 스텝도 통일되어 있지 않습니다 — Brand/Destructed/Warning/Purple는 `-500` 스텝, Success/Turquoise는 `-600` 스텝을 씁니다(단, 이는 `tokens/colors.json`의 `paletteDefaultStep`과 정확히 일치하는 패턴이라 토큰 설계상 의도된 것으로 보입니다).

## 4. Numeric Badge — Size/Type별 스펙

기준 조합: Theme=Gray/Brand 위주로 실측, 5개 색상 테마는 Success/Destructed/Warning/Purple/Turquoise 각 1개씩(Count=0~9, Type=Solid) 교차 확인.

### 4-1. Count=0~9 (정원, 한 자리 숫자)

| Size | 전체 크기 | 세로 패딩 보정 | 폰트 스타일 | Weight | 실측 노드 |
|---|---|---|---|---|---|
| **S** | 18×18px (정원) | `pb: spacing/01`=1px 추가(광학 보정, Solid/Empty 공통) | caption2 (10px/16px) | Semibold(600) | `2108:2104`(Gray Solid), `2108:2140`(Gray Empty) |
| **M** | 22×22px (정원) | 없음(flex 중앙 정렬만) | caption1 (12px/18px) | Semibold(600) | `2108:2106`(Gray Solid) |
| **L** | 24×24px (정원) | 없음 | body2 (14px/22px) | **Medium(500)** | `2108:2108`(Gray Solid), `2108:2254`(Destructed Empty) |

- 원의 지름은 저장소 스페이싱 스케일과 직접 대응하지 않는 **고정값**(18/22/24px)입니다 — 기존 토큰에 없음.
- **S에서만** 1px 추가 하단 패딩(`spacing/01`)이 붙습니다. M/L은 붙지 않습니다 — Content Badge의 S 전용 세로 광학 보정(2장)과 동일한 패턴입니다.
- **L만 Weight가 Medium(500)**으로 바뀌는 것도 Content Badge L과 동일한 패턴입니다(2장 참고).
- Radius는 3사이즈 공통 `radius/12`=999px(원형이므로 실질적으로 정원).

### 4-2. Count=10+ (캡슐형, 두 자리 이상)

| Size | 전체 크기(실측, "99" 기준) | 좌우 패딩 | 상하 패딩 | 폰트 스타일 | 실측 노드 |
|---|---|---|---|---|---|
| **S** | 21×18px | `spacing/04`=4px | 없음(고정 높이 18px) | caption2 (10px/16px) Semibold | `2108:2028`(Gray) |
| **M** | 28×22px | `spacing/05`=6px | `spacing/02`=2px | caption1 (12px/18px) Semibold | `2108:2032`(Gray) |
| **L** | 34×24px | `spacing/06`=8px | `spacing/01`=1px | body2 (14px/22px) Medium | `2108:2036`(Gray) |

- 10+ 캡슐 높이는 0~9 정원과 동일합니다(S=18, M=22, L=24) — 너비만 텍스트 길이에 맞춰 늘어납니다(`radius/12`=999px 유지로 양끝은 계속 반원).
- 좌우 패딩이 사이즈가 커질수록 한 단계씩 커집니다(`spacing/04`→`05`→`06` = 4→6→8px). 이 패턴은 Content Badge Show Icon=True의 좌우 비대칭 규칙과는 다른, Numeric 전용의 규칙입니다.
- 모든 padding 값은 `tokens/spacing.json`과 **정확히 일치**.

### 4-3. Type=Solid vs Empty

| Type | 배경 | 텍스트 | 비고 |
|---|---|---|---|
| **Solid** | Theme별 진한 색(3-1절과 동일한 컬러 세트) | `common/white-default` | 컨테이너 크기(4-1/4-2절)는 Empty와 동일 |
| **Empty** | 없음(투명) | Theme별 진한 색(Solid의 배경색과 동일 hex를 텍스트에 사용) | 배경만 사라지고 레이아웃 치수(원/캡슐 크기)는 Solid와 완전히 동일하게 유지됨(실측: `2108:2140` Gray S, `2108:2254` Destructed L 모두 크기 불변 확인) |

Numeric Badge는 Content Badge와 달리 **Alpha/Outlined 타입이 없고 Solid/Empty 2종뿐**입니다 — 두 배지 그룹의 Type 축이 서로 다른 열거값을 가진다는 점에 유의해야 합니다.

## 5. 컬러 팔레트 · 아이콘 (참고)

- 아이콘은 모든 Content Badge에서 "+"(plus) 모양의 단일 아이콘(`Icon / Default / 12px / plus`, `16px` 버전 포함) 하나만 사용되며, `showIcon=true`일 때 라벨 뒤(오른쪽)에 붙습니다. Button처럼 여러 아이콘 콘텐츠 축이 있는 게 아니라 "카운트/뱃지에 새 항목 추가됨"을 의미하는 고정 아이콘으로 보입니다.
- 아이콘 색상은 매 인스턴스마다 별도의 SVG 애셋 URL이 발급되어 있어(각 Theme/Type 조합마다 다른 애셋), 라벨 텍스트와 동일한 색으로 구워져(baked-in) 있는 것으로 추정되나 **SVG 내부 fill 값을 직접 디코딩하지는 않았으므로 색상 매핑 자체는 확인 필요**입니다(Button Spinner 문서의 "Subtract" 애셋과 동일한 한계).
- Turquoise 테마의 Figma 변수명은 `theme/turquoise-default`, `theme/turquoise-bg`이며, 값·이름 모두 저장소 토큰과 일치합니다.
- 두 배지 그룹의 컬러/토큰 값(Solid 배경, Alpha 배경/틴트, Outlined 테두리 알파, 텍스트 색)은 전부 `tokens/colors.json`의 V3 팔레트·시스템 롤·alpha 테이블과 **정확히 일치**합니다(3장·4-3절 표 참고). 새로 발견되거나 저장소에 없는 컬러 토큰은 없었습니다.

## 6. 인터랙션(모션) 및 State 스펙

**State 축 자체가 없고, 모션 데이터도 없습니다.**

- Figma 컴포넌트 프로퍼티 목록(4개 Component Set 전체)에 Hover/Pressed/Focused/Disabled 등 State 관련 variant가 전혀 존재하지 않습니다 — Badge는 클릭·포커스가 불가능한 순수 표시용(non-interactive) 컴포넌트로 설계된 것으로 보입니다.
- `get_motion_context`를 상위 그룹(`2482:1618`, recursive=true)에 호출했으나 빈 결과(`{"nodes":[]}`)를 반환했습니다. 프로토타입 인터랙션(스마트 애니메이트, 트랜지션)도 정의되어 있지 않습니다.
- 따라서 hover/pressed opacity, 트랜지션 duration/easing 등은 "확인 필요"가 아니라 **애초에 해당 사항 없음**으로 문서화합니다. 만약 실제 화면에서 Badge에 hover 등 피드백이 필요하다면, 이는 Badge 컴포넌트 자체가 아니라 Badge를 감싸는 상위 인터랙티브 요소(예: 클릭 가능한 리스트 아이템)의 책임입니다.

## 7. 접근성

- **색상만으로 의미 전달 금지**: Theme별 색상(Success=초록, Destructed=빨강 등)만으로 상태를 구분하는 경우, 스크린리더 사용자를 위해 라벨 텍스트가 항상 함께 제공되어야 합니다. Content Badge는 텍스트 라벨이 필수 요소라 문제없으나, **Numeric Badge(숫자만 표시)에 Theme만 다르게 써서 서로 다른 의미를 표현하는 경우** 별도의 `aria-label`(예: "긴급 알림 3건")이 필요할 수 있습니다 — 확인 필요.
- **명암비**: `docs/DESIGN.md` 전반의 "배경 요소 위의 텍스트/아이콘은 WCAG 기준을 준수해야 함" 원칙 외에, Badge 전용 명암비 수치 검증(특히 Alpha 배경 위 텍스트, Outlined 테두리 40% 알파의 시인성)은 이 조사에서 수행하지 않았습니다 — 확인 필요.
- **최소 크기**: Numeric Badge S(18×18px), Numeric Content Badge 등은 일반적인 44px 터치 타겟 권장 기준보다 훨씬 작지만, Badge 자체가 비인터랙티브 표시자이므로 별도 터치 영역 확장 요건은 없는 것으로 판단됩니다(Button의 Icon-only 최소 터치 영역 이슈와는 성격이 다름).

## 8. 토큰 매칭 요약

**정확히 일치**
- Content Badge 모든 Size의 padding/gap → `ref-spacing-01/02/05/06/07`
- Content/Numeric Badge 공통 radius → `ref-radius-12`(999px)
- 모든 typography(caption2/caption1/body2, weight 500/600) → `tokens/typography.json`
- Outlined 테두리 두께 1px → `ref-borderwidth-02`
- Solid/Alpha/Outlined의 모든 배경·텍스트 컬러(Gray/Brand/Success/Destructed/Warning/Purple/Turquoise 7종) → `tokens/colors.json`의 system 롤·reference 팔레트
- Outlined 테두리 알파 7종(gray-900-20, blue-500-40, green-600-40, red-500-40, orange-500-40, purple-500-40, turquoise-600-40) → `tokens/colors.json`의 `reference.alpha` 테이블과 **정확히 일치**
- Numeric Badge 10+ 캡슐의 padding → `ref-spacing-04/05/06`(좌우), `ref-spacing-01/02`(상하)

**기존 토큰에 없음**
- Numeric Badge 원형 고정 지름(18/22/24px)
- Content/Numeric Badge S 사이즈의 세로 광학 보정 값 자체(1px 추가, 토큰은 `ref-spacing-01`로 정확하나 "왜 S에만 붙는지"는 스케일 공식으로 역산 불가)

**확인 필요**
- Success/Destructed/Purple/Turquoise의 Alpha 배경, 그리고 Success/Destructed/Warning/Turquoise의 Outlined 테두리는 `get_variable_defs`로 값은 확인했으나 개별 노드 렌더링까지 실측하지 않음(Warning-Alpha, Purple-Outlined만 직접 실측)
- Numeric Badge 10+ M/L의 정확한 좌우 패딩은 실측했으나(4-2절), 나머지 5개 색상 Theme에서도 동일 패턴이 적용되는지는 개별 확인 안 함
- 아이콘 색상이 실제로 텍스트 색과 동일한지(SVG fill 값 직접 미확인)
- Numeric Badge의 Theme 차이만으로 의미를 구분할 때 필요한 `aria-label` 규정 여부
- Alpha 배경/Outlined 알파 테두리의 WCAG 명암비 수치 검증

## 9. 샘플링에 사용한 대표 노드 (부록)

**Content Badge** (Size/Type/ShowIcon 교차, 7개 Theme 전체 커버):
S: `2106:1939`(Gray Solid+Icon) · `2106:2101`(Gray Solid−Icon) · `2106:1807`(Gray Alpha+Icon) · `2106:1861`(Gray Outlined+Icon) · `2106:1990`(Brand Solid+Icon)
M: `2106:1942`(Gray Solid+Icon) · `2106:2113`(Gray Solid−Icon) · `2106:2008`(Brand Outlined+Icon)
L: `2106:2125`(Gray Solid−Icon) · `2106:1999`(Brand Alpha+Icon) · `2106:2143`(Gray Outlined−Icon)
Theme(색상 5종): `2107:2178`(Success Solid) · `2107:2183`(Destructed Solid) · `2107:2312`(Warning Alpha) · `2107:2492`(Purple Outlined) · `2107:2570`(Turquoise Solid−Icon)

**Numeric Badge**:
Basic(0~9): `2108:2104`(Gray S Solid) · `2108:2140`(Gray S Empty) · `2108:2084`(Brand S Solid) · `2108:2106`(Gray M Solid) · `2108:2108`(Gray L Solid)
Basic(10+): `2108:2028`(Gray S) · `2108:2032`(Gray M) · `2108:2036`(Gray L)
Theme(색상 5종, 0~9): `2108:2224`(Success Solid) · `2108:2220`(Destructed Solid) · `2108:2286`(Warning Empty) · `2108:2320`(Turquoise Solid) · `2108:2254`(Destructed L Empty)
Theme(10+): `2108:2356`(Purple Solid)

전체 변수 맵(`get_variable_defs`)과 모션(`get_motion_context`, recursive)은 상위 그룹 `2482:1618`에 각 1회 호출해 확보했습니다. 4개 Component Set 전체 구조는 `get_metadata`(`2482:1618`)로 1회 확인했습니다.
