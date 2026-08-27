# Radio Button

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2041-2075) — Frame `2041:2075` ("Radio Button")
> 기계 판독용 값은 [`radio-button.json`](./radio-button.json)을 함께 참고합니다. 이 문서와 radio-button.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Radio Button은 **Checked(False/True) × State(Default/Hover/Pressed/Disabled) × Size(S/M/L)** 축으로 구성된 24개 인스턴스 Frame입니다. Checkbox·Avatar 문서와 동일한 원칙으로 **24개 전부를 개별 실측**했습니다.

- `get_metadata`(`2041:2075`)로 24개 노드 ID·이름·좌표·크기를 먼저 전수 확인했습니다.
- `get_design_context` 24회를 각 노드에 개별 호출해 배경·테두리·오버레이·아이콘(내부 dot) 구조를 실측했습니다.
- `get_variable_defs`는 대표 노드 6개(Checked=False L/M/S Default 각 1개, Checked=True L Default/Hover/Pressed/Disabled)에서 호출해 색상 토큰의 실제 hex/변수명을 확보했습니다.
- Checked=True 변형은 Figma에서 단일 플랫 SVG(baked image)로 렌더링되어 `get_design_context`의 코드 출력만으로는 배경/dot 색상이 드러나지 않습니다. 이 경우 `get_metadata`로 내부 `Ellipse` 서브레이어의 위치·크기를 추가로 확인하고, `get_variable_defs`로 색상 변수를 대조하는 방식으로 실측을 보완했습니다.
- `get_motion_context`를 상위 Frame(`2041:2075`, recursive=true)에 1회 호출했습니다 — 빈 결과(`{"nodes":[]}`).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`(`colors.json`/`spacing.json`/`radius.json`)에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Radio Button은 다중 선택지 중 하나만 고를 수 있는 단일 선택 입력 컴포넌트입니다. 원형(radius 999px) 테두리 안에 선택 시 작은 원형 dot이 중앙에 표시되는 전형적인 라디오 버튼 구조입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Checked** | False / True | 선택 여부 |
| **State** | Default / Hover / Pressed / Disabled | 상호작용 피드백. **Focused 상태가 정의되어 있지 않음**(6장 참고) |
| **Size** | S(16px) / M(20px) / L(24px) | 전체 원 지름 |

Checkbox(Rounded)와 형태적으로 유사하지만, Radio Button은 **Size 축(S/M/L 3종)이 있다는 점**이 Checkbox(단일 16px 고정)와 다릅니다. 반대로 Indeterminate(부분선택) 축은 없습니다 — 라디오 버튼 특성상 선택/미선택 2가지뿐입니다.

## 2. Size별 스펙

| Size | 노드(Default 기준) | 전체 크기 | Radius | 미선택 테두리 두께 | Checked=True 내부 dot 크기 | dot/전체 비율 |
|---|---|---|---|---|---|---|
| **S** | `2041:2170` | 16×16px | `radius/12`=999px | `borderwidth/02`=1px | 8×8px (위치 `4,4`) | 정확히 50% |
| **M** | `2041:2146` | 20×20px | `radius/12`=999px | `borderwidth/02`=1px | 10×10px (위치 `5,5`) | 정확히 50% |
| **L** | `2041:2076` | 24×24px | `radius/12`=999px | `borderwidth/02`=1px | 12×12px (위치 `6,6`) | 정확히 50% |

- Radius(999px, 완전한 원)와 미선택 테두리 두께(`borderwidth/02`=1px)는 **Size와 무관하게 3종 전체 공통**입니다. Avatar 문서(12px에서만 `borderwidth/01`)와 달리, Radio Button은 가장 작은 S(16px)에서도 `borderwidth/02`(1px)를 그대로 씁니다.
- **핵심 규칙(신규 발견)**: Checked=True 상태의 내부 dot(`Ellipse` 서브레이어)은 3개 Size 전체에서 **정확히 컨테이너의 50%** 크기이며, 중앙에 정렬되어 있습니다(예: L 24px 컨테이너 → dot 12px, 좌표 `(6,6)` = `(24-12)/2`). `get_metadata`로 서브레이어 좌표·크기를 직접 확인해 검증한 값입니다.
- 이 dot 크기·비율은 State(Default/Hover/Pressed/Disabled)와 무관하게 동일합니다 — L Size의 Default(`2041:2078`)·Hover(`2041:2092`)·Disabled(`2041:2104`) 3개 State에서 모두 `x=6,y=6,width=12,height=12`로 확인했습니다.

## 3. State별 스펙 — Checked=False (미선택)

기준 실측: Default `2041:2170`(S)/`2041:2146`(M)/`2041:2076`(L) · Hover `2041:2171`/`2041:2147`/`2041:2086` · Pressed `2041:2172`/`2041:2148`/`2041:2097` · Disabled `2041:2173`/`2041:2149`/`2041:2103`

| State | 배경 | 테두리 | 비고 |
|---|---|---|---|
| Default | `common/white-default` `#fdfdfd` | 1px `color/gray/900-10` = `rgba(3,9,26,0.1)` | — |
| Hover | Default 배경 위에 `color/interaction/light-gray/hover`(`#03091A` 5%, `rgba(3,9,26,0.05)`) 오버레이 | 변화 없음 | `cursor: pointer` 추가. **Checkbox Angular 미선택 Hover(색상 변화 없음)와 달리, Radio Button은 Hover에서 실제로 옅은 회색 오버레이가 적용됨** — 두 컴포넌트 간 차이점 |
| Pressed | `color/interaction/light-gray/pressed`(`#03091A` 10%, `rgba(3,9,26,0.1)`) 오버레이 | 변화 없음 | Hover보다 짙은 오버레이. **Checkbox Angular 미선택 Pressed(피드백 없음)와 달리, Radio Button은 Pressed 시각 피드백이 존재함** |
| Disabled | Default와 동일한 배경/테두리 값에 **컴포넌트 전체 `opacity: 40%`**(`opacity/40`) 적용 | 동일(알파값 자체는 안 바뀜, 전체 레이어가 반투명 처리됨) | **Checkbox의 "테두리 알파값 자체를 10%→5%로 낮추는" 방식과 다름** — Radio Button 미선택 Disabled는 Button 컴포넌트와 동일하게 전체 레이어에 `opacity` 40%를 곱하는 방식 |

## 4. State별 스펙 — Checked=True (선택, 외곽 원 + 내부 dot)

기준 실측: Default `2041:2174`(S)/`2041:2150`(M)/`2041:2078`(L) · Hover `2041:2176`/`2041:2152`/`2041:2092` · Pressed `2041:2178`/`2041:2154`/`2041:2098` · Disabled `2041:2180`/`2041:2156`/`2041:2104`

이 24개 중 Checked=True 12개는 Figma에서 **플랫 SVG(baked image)**로 내보내져, `get_design_context`의 React/Tailwind 코드에는 배경색 클래스가 노출되지 않습니다(`<img src=".../xxx.svg" />` 형태). 아래 값은 `get_variable_defs`(대표 노드: L Default/Hover/Pressed/Disabled)로 확보한 실제 바인딩된 색상 변수입니다.

| State | 외곽 원 배경 | 내부 dot 색상 | 테두리 | 비고 |
|---|---|---|---|---|
| Default | `brand/primary-default` `#2c7be2` | `common/white-default` `#fdfdfd` | 없음 | dot은 항상 흰색, 외곽은 항상 파란색(Default 기준) |
| Hover | `brand/primary-default` 위에 `color/interaction/blue/hover`(`#0D2D57` 15%, `#0d2d5726`) 오버레이 | 동일(흰색) | 없음 | Checkbox Checked=True Hover와 동일한 `interaction/blue` 메커니즘 |
| Pressed | `color/interaction/blue/pressed`(`#0D2D57` 30%, `#0d2d574d`) 오버레이 | 동일(흰색) | 없음 | Checkbox Checked=True Pressed와 동일 토큰 |
| Disabled | `neutral/400` `#c2c4c8` (단색 교체, 오버레이 아님) | 동일(흰색 유지) | 없음 | **Checked=False Disabled(opacity 40%)와 메커니즘이 다름** — 선택 시 Disabled는 배경색 자체를 회색 단색으로 교체(Checkbox Checked=True Disabled와 동일 패턴) |

`get_variable_defs` 실측 원본:
- L Default(`2041:2078`): `{"common/white-default":"#fdfdfd","radius/12":"999","brand/primary-default":"#2c7be2"}`
- L Hover(`2041:2092`): `{"common/white-default":"#fdfdfd","radius/12":"999","brand/primary-default":"#2c7be2","color/interaction/blue/hover":"#0d2d5726"}`
- L Pressed(`2041:2098`): `{"common/white-default":"#fdfdfd","radius/12":"999","brand/primary-default":"#2c7be2","color/interaction/blue/pressed":"#0d2d574d"}`
- L Disabled(`2041:2104`): `{"common/white-default":"#fdfdfd","radius/12":"999","neutral/400":"#c2c4c8"}`

## 5. Checked=True/False 구조 차이 (내부 dot 유무)

- **Checked=False**: 컨테이너 자체가 배경+테두리만 있는 단순 `div` 구조입니다. 내부 아이콘/dot 레이어가 전혀 존재하지 않습니다(Checkbox Rounded 미선택처럼 "숨겨진 체크 아이콘 레이어"가 항상 존재하는 구조와 다름 — Radio Button 미선택에는 그런 구조 자체가 없습니다).
- **Checked=True**: 외곽 원(브랜드 블루 또는 회색) 위에 `Ellipse`라는 이름의 자식 레이어가 추가되며, 이 Ellipse가 흰색(`common/white-default`) 내부 dot입니다. 크기는 2장에서 확인한 대로 컨테이너의 정확히 50%, 중앙 정렬입니다.
- 미선택→선택 전환 시 테두리(1px `gray-900-10%`)가 사라지고 배경이 통짜 색상(블루/회색)으로 바뀌며 동시에 흰 dot이 나타나는 구조로, Checkbox Checked=True(체크 아이콘 표시)와 유사한 "테두리 제거 + 배경 단색화" 패턴을 공유합니다.

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 상위 Frame(`2041:2075`, recursive=true)에 호출했으나 빈 결과(`{"nodes":[]}`)를 반환했습니다. 프로토타입 인터랙션(스마트 애니메이트, 트랜지션, 선택 시 dot 등장 애니메이션)이 Figma 파일 안에 정의되어 있지 않습니다. State 간 색상값 자체는 3~4장에 실측되어 있으나 전환 duration/easing은 확인 필요이며 임의로 만들지 않았습니다.

## 7. 접근성

- **Focused 상태 없음**: State 축에 Default/Hover/Pressed/Disabled 4종만 있고, 키보드 포커스 상태(Focused)가 정의되어 있지 않습니다. 키보드로 라디오 버튼을 조작할 때 포커스 링/아웃라인 표시 방법이 Figma 파일에 명시되어 있지 않습니다 — 구현 시 별도의 접근성 포커스 스타일이 필요하며, 디자이너 확인이 필요합니다.
- **role/aria 매핑**: 라디오 버튼 그룹 구현 시 각 항목에 `role="radio"` 및 `aria-checked="true"/"false"`, 그룹 컨테이너에 `role="radiogroup"`을 부여하는 것이 일반적인 웹 접근성 규약입니다. Figma 파일 자체에는 그룹 구조나 ARIA 규정이 문서화되어 있지 않으므로 확인 필요입니다.
- **키보드 네비게이션**: 라디오 그룹 내에서 방향키(↑/↓ 또는 ←/→)로 항목 간 이동, Tab은 그룹 전체에 한 번만 정지하는 것이 일반적인 규약이나 Figma 파일에 명시된 바 없음 — 확인 필요.
- **최소 터치 영역**: S(16px)는 44px 권장 기준보다 훨씬 작습니다. L(24px)도 여전히 기준에 못 미칩니다 — 실제 구현 시 라벨 텍스트를 포함한 클릭 가능 영역 확장(hit area 확장)이 필요할 것으로 보이나 Figma 파일에 명시된 규정은 없습니다 — 확인 필요.
- **명암비**: 미선택 테두리(`gray-900-10%`, `rgba(3,9,26,0.1)`)가 흰 배경 위에서 매우 옅어, 저시력 사용자에게 경계가 잘 보이지 않을 수 있습니다. WCAG 명암비 기준 충족 여부는 Figma 파일에서 확인할 수 없어 확인 필요로 남깁니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- 전 Size 공통 Radius 999px → `ref-radius-12`
- 전 Size 공통 미선택 테두리 두께 1px → `ref-borderwidth-02`
- 미선택 테두리 색상 `color/gray/900-10`(10%) → `ref-color-alpha-gray-900-10`
- 미선택 배경 `common/white-default`(`#fdfdfd`) → `sys-color-common-white-default`
- Hover 오버레이 `color/interaction/light-gray/hover`(`#03091A` 5%) → `tokens/colors.json` `interaction.light-gray.hover`와 정확히 일치
- Pressed 오버레이 `color/interaction/light-gray/pressed`(`#03091A` 10%) → `interaction.light-gray.pressed`와 정확히 일치
- 선택 시 배경 `brand/primary-default`(`#2c7be2`) → `sys-color-brand-primary-default`(`ref-color-blue-500`)
- 선택 Hover 오버레이 `color/interaction/blue/hover`(`#0D2D57` 15%) → `interaction.blue.hover`와 정확히 일치
- 선택 Pressed 오버레이 `color/interaction/blue/pressed`(`#0D2D57` 30%) → `interaction.blue.pressed`와 정확히 일치
- 선택 Disabled 배경 `neutral/400`(`#c2c4c8`) → `sys-color-neutral-400`(`ref-color-gray-400`)
- 미선택 Disabled `opacity 40%` → `ref-opacity-40`(`tokens/radius.json`의 `opacity` 섹션과 정확히 일치, `usage.dimmed`와 동일 값)
- 내부 dot 색상 `common/white-default` → 미선택 배경과 동일 토큰

**기존 토큰에 없음**
- Size 스케일 16/20/24px 자체는 저장소에 별도의 "Radio Button 크기" 토큰으로 존재하지 않는 고정값입니다(Avatar의 12~48px 스케일과 일부 겹치나 Radio Button 전용 명명은 없음).
- 내부 dot 크기(8/10/12px, 컨테이너의 정확히 50%)라는 비율 규칙 자체가 토큰화되어 있지 않습니다 — 실측으로 발견한 파생값입니다.

**확인 필요**
- Focused 상태가 정의되지 않은 것에 대한 접근성 대응 방안
- `role="radio"`/`aria-checked`/`radiogroup` 등 ARIA 규정과 키보드 네비게이션 규약(Figma에 없음, 일반 웹 표준 권장)
- 최소 터치 영역 확장 규정 여부(S/M/L 전부 44px 미만)
- 미선택 테두리(10% 알파)의 WCAG 명암비 충족 여부
- 미선택 Disabled가 "전체 opacity 40%" 방식인 것과 선택 Disabled가 "단색 교체" 방식인 것, 두 메커니즘이 혼재하는 것이 의도적인지

## 9. 샘플링에 사용한 24개 노드 (부록, 전수)

**Checked=False**
- Default: `2041:2076`(L) · `2041:2146`(M) · `2041:2170`(S)
- Hover: `2041:2086`(L) · `2041:2147`(M) · `2041:2171`(S)
- Pressed: `2041:2097`(L) · `2041:2148`(M) · `2041:2172`(S)
- Disabled: `2041:2103`(L) · `2041:2149`(M) · `2041:2173`(S)

**Checked=True**
- Default: `2041:2078`(L) · `2041:2150`(M) · `2041:2174`(S)
- Hover: `2041:2092`(L) · `2041:2152`(M) · `2041:2176`(S)
- Pressed: `2041:2098`(L) · `2041:2154`(M) · `2041:2178`(S)
- Disabled: `2041:2104`(L) · `2041:2156`(M) · `2041:2180`(S)

전체 변수 맵(`get_variable_defs`)은 대표 노드 6개(`2041:2076`, `2041:2146`, `2041:2170`, `2041:2078`, `2041:2092`, `2041:2098`, `2041:2104` — 총 7개 호출)에 개별 호출해 확보했습니다. 모션(`get_motion_context`, recursive)과 구조 확인(`get_metadata`)은 상위 Frame `2041:2075`에 각 1회 호출했으며, Checked=True 내부 dot 좌표·크기 검증을 위해 `get_metadata`를 5개 노드(`2041:2078`, `2041:2150`, `2041:2174`, `2041:2092`, `2041:2104`)에 추가로 호출했습니다.
