# Toggle

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2207-8085) — Frame `2207:8085` ("Toggle")
> 기계 판독용 값은 [`toggle.json`](./toggle.json)을 함께 참고합니다. 이 문서와 toggle.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Toggle은 **Size(S/L) × Status(Off/On) × Disabled(False/True) × Label(True/False) × Label Location(Left/Right/No)** 축으로 구성된 24개 인스턴스 Frame입니다. Label과 Label Location은 종속 관계입니다 — Label=True일 때만 Location=Left 또는 Right, Label=False일 때는 항상 Location=No. Checkbox·Radio Button 문서와 동일한 원칙으로 **24개 전부를 개별 실측**했습니다.

- `get_metadata`(`2207:8085`)로 24개 노드 ID·이름·좌표·크기를 먼저 전수 확인했습니다.
- `get_design_context` 24회를 각 노드에 개별 호출해 트랙(pill)·thumb(원형 손잡이)·라벨 구조를 실측했습니다. Radio Button의 Checked=True와 달리, Toggle의 24개 변형은 **모두 baked SVG가 아닌 실제 코드(React+Tailwind 클래스)로 반환**되어 배경색·spacing 값이 직접 드러났습니다 — 별도 보완 실측(`get_metadata` 서브레이어 좌표 확인) 없이 `get_design_context` 결과만으로 전량 실측이 가능했습니다.
- `get_variable_defs`는 대표 노드 8개(S/L × Off/On/Disabled 조합 6개 + Label=True 포함 2개)에서 호출해 색상·spacing·radius·타이포 토큰의 실제 hex/변수명을 확보했습니다.
- `get_motion_context`를 상위 Frame(`2207:8085`, recursive=true)에 1회 호출했습니다 — 빈 결과(`{"nodes":[]}`). Off→On 전환 시 thumb가 슬라이딩하는 프로토타입 애니메이션이 있을 가능성을 배제하지 않고 확인했으나, Figma 파일 안에는 정의되어 있지 않습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`(`colors.json`/`spacing.json`/`radius.json`/`typography.json`)에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Toggle은 On/Off 이진 상태를 즉시 전환하는 스위치형 입력 컴포넌트입니다. 알약 모양(radius 999px) 트랙 안에서 원형 thumb가 좌측(Off)/우측(On)으로 이동하는 전형적인 스위치 구조이며, 선택적으로 트랙 좌우에 텍스트 라벨을 붙일 수 있습니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / L | 트랙·thumb 전체 크기 스케일 |
| **Status** | Off / On | 스위치 On/Off 상태 |
| **Disabled** | False / True | 비활성화 여부 |
| **Label** | True / False | 라벨 텍스트 표시 여부 |
| **Label Location** | Left / Right / No | **Label에 종속**. Label=True일 때만 Left 또는 Right 중 하나(No 아님). Label=False일 때는 항상 No |

Checkbox·Radio Button과 달리 Toggle에는 **Hover/Pressed 등 세분화된 State 축이 없습니다** — State는 사실상 Disabled(False/True) 하나뿐이며, Hover/Pressed에 대한 별도 시각 변형이 Figma 컴포넌트 셋에 정의되어 있지 않습니다(7장 참고).

실질 조합 수: Size(2) × Status(2) × Disabled(2) × [Label=True: Location 2가지 + Label=False: 1가지] = 2×2×2×3 = **24개**, 24개 인스턴스 Frame과 정확히 일치합니다.

## 2. Size별 스펙

| Size | 트랙(track) 크기 | 트랙 padding | thumb 크기 | thumb 이동 거리(Off→On) | radius(트랙/thumb 공통) | 라벨-트랙 gap |
|---|---|---|---|---|---|---|
| **S** | 40×24px | `spacing/02`=2px (전 방향) | 20×20px | 16px (40 − 2×2 − 20) | `radius/12`=999px | `spacing/06`=8px |
| **L** | 48×28px | `spacing/02`=2px (전 방향) | 24×24px | 20px (48 − 2×2 − 24) | `radius/12`=999px | `spacing/07`=10px |

- **핵심 규칙**: thumb 크기는 항상 `트랙 높이 − padding×2`와 정확히 일치합니다(S: 24−4=20, L: 28−4=24). 트랙 너비는 항상 thumb 크기의 정확히 2배입니다(S: 20×2=40, L: 24×2=48).
- thumb는 Figma 구조상 `justify-content`(Off일 때 `flex-start`/기본, On일 때 `justify-end`)로 좌우 배치가 결정됩니다 — 절대좌표(x,y) 이동이 아니라 flex 정렬 전환 방식입니다. 이는 6장(모션)에서 실제 전환 애니메이션이 없다는 것과 함께, 구현 시 CSS transition을 붙일 대상이 "thumb의 left/transform"이 아니라 "flex justify-content 전환(또는 이를 대체하는 absolute+transform 방식)"이어야 함을 시사합니다.
- 라벨 유무·Location과 무관하게 트랙·thumb 크기·padding·radius는 Size 축에만 의존합니다.
- 라벨 텍스트 스타일은 S/L 무관하게 **동일**합니다(5장 참고) — Toggle의 Size 축은 트랙/thumb에만 적용되고 라벨 타이포에는 적용되지 않습니다.

## 3. Status Off/On 구조·색상 차이

기준 실측(Label=False 대표): S Off `2207:8075` · S On `2207:8077` · L Off `2207:8074` · L On `2207:8073`

| Status | 트랙 배경 | thumb 색상 | thumb 위치 | 비고 |
|---|---|---|---|---|
| **Off** | `color/gray/300` `#dbdcdf` | `common/white-default` `#fdfdfd` | 좌측 정렬(`items-center`, 기본 `justify-content: flex-start`) | 트랙 컨테이너에 `justify-end` 클래스 없음 |
| **On** | `brand/primary-default` `#2c7be2` | `common/white-default` `#fdfdfd` (변화 없음) | 우측 정렬(`justify-end`) | 트랙 배경만 파란색으로 교체, thumb는 항상 흰색 유지 |

- thumb 색상은 Off/On 모두 항상 `common/white-default`(#fdfdfd)로 **변화 없음** — Checkbox/Radio Button의 "선택 시 내부 아이콘/dot이 별도 렌더링"되는 구조와 달리, Toggle의 thumb는 Off/On 공통 요소이며 위치와 트랙 배경색만 바뀝니다.
- Hover/Pressed 등 인터랙션 오버레이(`interaction/blue`, `interaction/light-gray` 계열)가 Toggle Off/On 어느 쪽에도 적용되어 있지 않습니다 — Radio Button·Checkbox와 달리 Toggle State 축 자체에 Hover/Pressed가 없기 때문입니다(7장 참고).
- 트랙에 테두리(border)는 Off/On 어느 쪽에도 없습니다.

## 4. Disabled 스펙

기준 실측: S Off Disabled `2207:8253` · S On Disabled `2207:8256` · L Off Disabled `2207:8297` · L On Disabled `2207:8300`

| Status | Disabled 시 배경 값 자체 | Disabled 메커니즘 |
|---|---|---|
| Off | `color/gray/300`(Default와 동일) | 값 자체는 그대로, 컴포넌트 전체에 `opacity/40`(40%) 적용 |
| On | `brand/primary-default`(Default와 동일) | 값 자체는 그대로, 컴포넌트 전체에 `opacity/40`(40%) 적용 |

- Disabled는 Off/On 공통으로 **컴포넌트 전체(트랙+thumb+라벨 wrapper) 레이어에 `opacity: 40%`**를 곱하는 방식입니다 — 배경색 자체를 별도의 회색(`neutral/400` 등)으로 교체하지 않습니다.
- 이는 Radio Button 미선택 Disabled("opacity 40% 전체 적용")와 동일한 메커니즘이며, Radio Button/Checkbox의 **Checked=True Disabled("neutral/400 단색 교체")** 방식과는 다릅니다. Toggle은 Off/On 두 상태 모두 색상 교체 없이 opacity만 적용한다는 점이 Radio Button·Checkbox와 구별되는 지점입니다.
- Disabled 시 thumb 색상(`common/white-default`)과 트랙 padding·radius 등 구조값은 전혀 바뀌지 않고, 전체 레이어의 시각적 투명도만 낮아집니다.

## 5. Label / Label Location 토글 효과

기준 실측: S Left `2207:8084`(Off)/`2207:8081`(On) · S Right `2207:8082`(Off)/`2207:8076`(On) · L Left `2207:8079`(Off)/`2207:8083`(On) · L Right `2207:8080`(Off)/`2207:8078`(On)

### Label=False (Location=No)

컨테이너는 트랙(track) 하나만 자식으로 갖는 단순 구조입니다(2~3장 참고). 라벨 관련 레이어 자체가 존재하지 않습니다.

### Label=True

| Location | 구조(children 순서) | 라벨 텍스트 정렬 |
|---|---|---|
| **Left** | `<p>라벨</p>` → `<div>트랙(thumb 포함)</div>` (라벨이 먼저, 트랙이 뒤) | `text-right`(트랙에 붙도록 텍스트가 오른쪽 정렬) |
| **Right** | `<div>트랙(thumb 포함)</div>` → `<p>라벨</p>` (트랙이 먼저, 라벨이 뒤) | 정렬 클래스 없음(기본 좌측 정렬) |

- 라벨 텍스트 스타일: **`Body 2/14 M`** — `font-family: Pretendard`, `weight: Medium(500)`, `size: 14px`, `lineHeight: 22px`, `letterSpacing: letterSpacing/Body`=-0.04px, 색상 `neutral/800` `#202837`. S/L Size 무관하게 **완전히 동일**합니다.
- 라벨-트랙 사이 gap은 Size에 종속됩니다(2장): S=`spacing/06`(8px), L=`spacing/07`(10px). Label Location(Left/Right)과는 무관하게 동일 gap 값입니다.
- 최상위 wrapper는 `content-stretch flex items-center` — 라벨과 트랙이 수직 중앙 정렬됩니다.
- Label=True/False 전환은 컨테이너 최상위 `<div>`의 자식 개수·순서만 바뀌는 구조이며, 트랙·thumb 자체의 크기/색상/padding에는 전혀 영향을 주지 않습니다(3~4장 값과 완전히 독립).

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 상위 Frame(`2207:8085`, recursive=true)에 호출했으나 빈 결과(`{"nodes":[]}`)를 반환했습니다. 프로토타입 인터랙션(스마트 애니메이트, Off→On 전환 시 thumb 슬라이딩 애니메이션 등)이 Figma 파일 안에 정의되어 있지 않습니다. Checkbox·Radio Button과 동일하게 이 컴포넌트도 모션이 문서화되어 있지 않으며, 스위치 특성상 슬라이딩 전환이 실제 구현에는 필요할 가능성이 높으나 **duration/easing 값은 확인 필요**이며 임의로 만들지 않았습니다.

2장에서 확인한 대로 thumb 위치는 `justify-content: flex-start`(Off) ↔ `justify-end`(On) 전환으로 구현되어 있어, 실제 구현 시 CSS `transition-property`를 트랙의 `justify-content`가 아니라(이 속성은 애니메이션 불가) thumb 자체의 `transform: translateX()` 또는 `left` 값으로 재구성해야 슬라이딩 애니메이션을 붙일 수 있습니다 — 이는 Figma 실측 사실이 아니라 구현 관점의 참고 메모입니다.

## 7. 접근성

- **Hover/Pressed/Focused 상태 자체가 정의되어 있지 않음(의도된 설계, 확인됨)**: Checkbox·Radio Button은 State 축(Default/Hover/Pressed/Disabled)이 있지만, Toggle의 Figma 컴포넌트 셋에는 Disabled 축만 있습니다. 다만 마우스 오버·클릭·키보드 포커스에 대한 시각적 피드백(포커스 링 등)은 실제 구현 시 별도로 설계해야 합니다 — 그 구체적인 스타일 값 자체는 Figma에 없어 확인 필요입니다.
- **role/aria 매핑**: 웹 표준상 `role="switch"` 및 `aria-checked="true"/"false"` 부여가 일반적인 접근성 규약입니다. `disabled` 상태는 `aria-disabled="true"` 또는 네이티브 `disabled` 속성과 매핑하는 것이 일반적입니다. Figma 파일 자체에는 이 규정이 문서화되어 있지 않으므로 확인 필요입니다.
- **키보드 조작**: 일반적으로 Tab으로 포커스, Space(또는 Enter)로 토글하는 것이 웹 표준 스위치 패턴이나 Figma 파일에 명시된 바 없음 — 확인 필요.
- **최소 터치 영역**: 트랙 자체 크기는 S 40×24px, L 48×28px로 44px 권장 기준보다 작습니다. 라벨이 있는 경우(Label=True) 라벨 텍스트까지 클릭 가능 영역에 포함할지(즉 라벨 클릭 시에도 토글되는지) Figma 파일에 명시된 규정이 없어 확인 필요입니다.
- **명암비**: Off 트랙 배경(`color/gray/300` `#dbdcdf`)과 흰색 thumb(`#fdfdfd`) 간 명암비, On 트랙 배경(`#2c7be2`)과 흰색 thumb 간 명암비가 WCAG 비텍스트 대비(non-text contrast, 3:1) 기준을 충족하는지는 Figma 파일에서 직접 확인할 수 없어 확인 필요로 남깁니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- 전 Size 공통 Radius 999px(트랙·thumb) → `ref-radius-12`
- 전 Size 공통 트랙 padding 2px → `ref-spacing-02`
- Off 트랙 배경 `color/gray/300`(`#dbdcdf`) → `tokens/colors.json` `reference.gray.300`과 정확히 일치
- On 트랙 배경 `brand/primary-default`(`#2c7be2`) → `sys-color-brand-primary-default`(`ref-color-blue-500`)와 정확히 일치
- thumb 색상(Off/On 공통) `common/white-default`(`#fdfdfd`) → `sys-color-common-white-default`(`ref-color-gray-50`)와 정확히 일치
- Disabled `opacity 40%` → `ref-opacity-40`(`tokens/radius.json` opacity 섹션, `usage.dimmed`와 동일 값)
- S 라벨-트랙 gap 8px → `ref-spacing-06`
- L 라벨-트랙 gap 10px → `ref-spacing-07`
- 라벨 색상 `neutral/800`(`#202837`) → `tokens/colors.json` `reference.gray.800`과 정확히 일치
- 라벨 타이포 `Body 2/14 M`(크기 14px·lineHeight 22px·letterSpacing -0.04px) → `tokens/typography.json` `body2` 스타일과 정확히 일치

**기존 토큰에 없음**
- 트랙 크기(40×24px S, 48×28px L)와 thumb 크기(20px S, 24px L) 자체는 저장소에 별도의 "Toggle 크기" 토큰으로 존재하지 않는 고정값입니다.
- "thumb = 트랙 높이 − padding×2", "트랙 너비 = thumb×2"라는 비율 규칙 자체가 토큰화되어 있지 않습니다 — 실측으로 발견한 파생값입니다.
- thumb 이동 거리(S 16px, L 20px)는 토큰이 아니라 위 크기 규칙에서 파생되는 값입니다.

**확인 완료**
- Hover/Pressed/Focused 상태 축이 Toggle에 없는 것은 Checkbox/Radio Button과 다른 의도된 설계입니다(확인됨). 다만 실제 구현 시 마우스 오버·클릭·키보드 포커스에 대한 시각 피드백은 별도로 설계해야 합니다(7장 참고).

**확인 필요**
- `role="switch"`/`aria-checked`/키보드 조작(Space/Enter) 등 ARIA·키보드 규약(Figma에 없음, 일반 웹 표준 권장).
- 최소 터치 영역 확장 규정 여부(S/L 모두 44px 미만) 및 라벨 클릭 시 토글 여부.
- Off→On 전환 애니메이션의 duration/easing(Figma에 모션 데이터 자체가 없음).
- Off/On 트랙 배경과 흰색 thumb 간 WCAG 비텍스트 대비(3:1) 충족 여부.

## 9. 샘플링에 사용한 24개 노드 (부록, 전수)

**Size=S**
- Label=False: Off `2207:8075` · Off+Disabled `2207:8253` · On `2207:8077` · On+Disabled `2207:8256`
- Label=True, Location=Left: Off `2207:8084` · Off+Disabled `2207:8237` · On `2207:8081` · On+Disabled `2207:8241`
- Label=True, Location=Right: Off `2207:8082` · Off+Disabled `2207:8245` · On `2207:8076` · On+Disabled `2207:8249`

**Size=L**
- Label=False: Off `2207:8074` · Off+Disabled `2207:8297` · On `2207:8073` · On+Disabled `2207:8300`
- Label=True, Location=Left: Off `2207:8079` · Off+Disabled `2207:8281` · On `2207:8083` · On+Disabled `2207:8285`
- Label=True, Location=Right: Off `2207:8080` · Off+Disabled `2207:8289` · On `2207:8078` · On+Disabled `2207:8293`

전체 변수 맵(`get_variable_defs`)은 대표 노드 8개(`2207:8075`, `2207:8077`, `2207:8256`, `2207:8074`, `2207:8073`, `2207:8300`, `2207:8081`, `2207:8080`)에 개별 호출해 확보했습니다. 모션(`get_motion_context`, recursive)과 전체 구조 확인(`get_metadata`)은 상위 Frame `2207:8085`에 각 1회 호출했습니다. 24개 인스턴스 전부에 `get_design_context`를 개별 호출했으며, Radio Button과 달리 baked SVG가 아니라 실제 코드로 반환되어 별도 보완 실측이 필요하지 않았습니다.
