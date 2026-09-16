# Checkbox

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2662-5344) — 캔버스 그룹 `2662:5344`(페이지 `❖ Checkbox` = `2171:6427`) 안에 2개의 개별 Component Set이 있음
> 기계 판독용 값은 [`checkbox.json`](./checkbox.json)을 함께 참고합니다. 이 문서와 checkbox.json은 항상 같은 소스에서 나온 값이어야 합니다.

> **⚠️ 2026-09-16 갱신 — Figma에 `Size` 축(`16px` / `20px`)이 추가되었습니다.**
> 각 Component Set이 12개 → **24개**, 합계 24개 → **48개** 변형이 되었습니다.
> 초판 문서의 "Checkbox에는 Size 축이 없습니다"는 더 이상 유효하지 않습니다.
> 함께 바뀐 것: 상위 그룹 노드 ID `2483:12499` → `2662:5344`(**옛 노드는 삭제됨**).
> **Component Set 노드 ID(`2173:6696` / `2173:6709`)와 기존 16px 변형의 노드 ID는 그대로입니다.**

## 0. 문서 범위와 샘플링 방법

Checkbox는 Badge와 마찬가지로 **하나가 아니라 2개의 독립된 Component Set**으로 구성됩니다.

| Component Set | 노드 ID | 변형 수 | 축 구성 |
|---|---|---|---|
| Checkbox / Angular | `2173:6696` | 24 | Checked(False/True) × Indeterminate(Off/On, Checked=True에서만 의미 있음) × State(Default/Hover/Pressed/Disabled) × **Size(16px/20px)** |
| Checkbox / Rounded | `2173:6709` | 24 | Checked(False/True) × Outlined(True/False, Checked=False에서만 의미 있음) × State(Default/Hover/Pressed/Disabled) × **Size(16px/20px)** |

Button/Badge와 달리 Checkbox는 **총 48개뿐**이라 두 Component Set의 **전체 48개 변형을 모두 개별 실측**했습니다. 추정이나 패턴 외삽 없이 모든 값이 직접 실측 확인된 값입니다.

- 초판(24개)은 `get_design_context` 전수 호출로 실측했고, **2026-09-16 Size 축 추가분은 Plugin API(`use_figma`)로 48개 전 변형의 `fills` 배열 전체·`strokes`·`cornerRadius` 변수 바인딩·자식 인스턴스·`reactions`를 다시 읽어 재검증**했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요"로 명시합니다.
- 두 Size의 **색상 값은 완전히 동일**합니다. Size가 바꾸는 것은 박스 한 변·Angular radius·Rounded 아이콘 크기 세 가지뿐입니다.

## 1. 컴포넌트 개요

Checkbox는 폼 요소에서 다중 선택·동의·전체선택 등에 쓰이는 체크 입력 컴포넌트입니다. 두 가지 시각적 스타일이 있습니다.

- **Angular**: 사각형 체크박스(radius 4px / 20px에서 6px). 미선택/선택/부분선택(Indeterminate) 3가지 콘텐츠 상태를 가짐.
- **Rounded**: 원형(radius 999px) 체크박스. Indeterminate 없이 미선택/선택만 가지며, 미선택 상태에 테두리 유무(Outlined) 변형이 추가로 있음.

| 축(Axis) | Angular 값 | Rounded 값 | 의미 |
|---|---|---|---|
| **Checked** | False / True | False / True | 선택 여부 |
| **Indeterminate** (Angular만) | Off / On | — | Checked=True일 때만 의미 있음. On이면 체크 대신 "－"(minus) 아이콘 표시(부분 선택 상태) |
| **Outlined** (Rounded만) | — | True / False | Checked=False일 때만 의미 있음. True=테두리 있는 흰 배경, False=테두리 없는 연한 회색 배경 |
| **State** | Default / Hover / Pressed / Disabled | Default / Hover / Pressed / Disabled | 상호작용 피드백. **Focused 상태가 정의되어 있지 않음**(7장 참고) |
| **Size** | 16px / 20px | 16px / 20px | 박스 한 변의 길이. 기본값은 두 Set 모두 **16px**. 2장 참고 |

## 2. Size 축 (2026-09-16 추가)

**Size가 바꾸는 것은 세 가지뿐입니다.** 배경·테두리·오버레이 색과 알파는 두 Size가 완전히 같습니다.

| 항목 | Size=16px | Size=20px | 토큰 매칭 |
|---|---|---|---|
| 박스 | 16×16px | 20×20px | 기존 토큰에 없음(고정 치수) |
| **Angular radius** | `radius/02` = 4px | `radius/03` = **6px** | `ref-radius-02` / `ref-radius-03` — **둘 다 정확히 일치**(변수 바인딩으로 확인) |
| Rounded radius | `radius/12` = 999px | `radius/12` = 999px | `ref-radius-12` — **Size와 무관하게 동일** |
| **Angular 아이콘** | `Icon / Default / 16px` — **박스를 꽉 채움**(0,0) | `Icon / Default / 16px` — **크기 그대로**, 중앙(2,2) 배치 → 사방 2px 여백 | — |
| **Rounded 아이콘** | `Icon / Default / 12px` — 중앙(2,2) | `Icon / Default / 16px` — 중앙(2,2) | — |
| 테두리 두께 | 1px, `strokeAlign: INSIDE` | 1px, `strokeAlign: INSIDE` | `ref-borderwidth-02` |

### 2-1. ⚠️ 아이콘은 두 슬롯이 서로 다른 계단을 탑니다

**Angular의 아이콘은 Size가 커져도 16px 그대로입니다.** 박스만 20px로 커지므로 사방에 2px 여백이 생깁니다.
**Rounded의 아이콘만 12px → 16px로 함께 커집니다**(항상 박스보다 4px 작음).

그 결과 실제로 그려지는 체크 글리프(벡터)의 크기는 이렇게 됩니다.

| | Angular | Rounded |
|---|---|---|
| Size=16px | 10.94 × 8.08px | 8.21 × 6.06px |
| Size=20px | 10.94 × 8.08px (**변화 없음**) | 10.94 × 8.08px (**Angular와 같아짐**) |

즉 **16px에서는 두 스타일의 체크 크기가 다르고, 20px에서는 같아집니다.** 전수 실측값이며 비율로 계산한 값이 아닙니다 — Chip에서 겪은 "한 Size만 재고 나머지를 비율로 외삽" 오류를 피하려고 네 조합을 모두 따로 읽었습니다.

Angular의 minus(부분선택) 글리프는 11.33 × 1.33px로 **두 Size가 완전히 동일**합니다.

## 3. 색상 · State별 스펙

**아래 색상 값은 `16px` / `20px` 두 Size에 공통입니다.** 기준 노드 ID는 16px과 20px을 함께 적었습니다.

### 3-1. Checkbox / Angular

**Checked=False (미선택)**
기준 실측 16px: `2173:6695`(Default) · `2173:6691`(Hover) · `2173:6693`(Pressed) · `2173:6690`(Disabled)
기준 실측 20px: `2662:5232`(Default) · `2662:5234`(Hover) · `2662:5233`(Pressed) · `2662:5235`(Disabled)

| State | 배경 | 테두리 | 비고 |
|---|---|---|---|
| Default | `common/white-default` `#fdfdfd` | 1px `color/gray/900-10` = `rgba(3,9,26,0.1)` | — |
| Hover | Default와 동일 | Default와 동일 | `cursor: pointer`만 추가, **색상 변화 없음** |
| Pressed | Default와 동일 | Default와 동일 | **색상 변화 전혀 없음** — 눌림 피드백이 시각적으로 구현되어 있지 않음 |
| Disabled | Default와 동일(흰색 유지) | 1px `color/gray/900-5` = `rgba(3,9,26,0.05)` (10%→5%로 더 옅어짐) | Button의 "opacity 20%" 방식과 다르게, **테두리 알파 자체를 낮추는 방식**으로 비활성 표현 |

**Checked=True, Indeterminate=Off (체크)**
기준 실측 16px: `2173:6688`(Default) · `2173:6692`(Hover) · `2173:6694`(Pressed) · `2173:6689`(Disabled)
기준 실측 20px: `2662:5236`(Default) · `2662:5240`(Hover) · `2662:5238`(Pressed) · `2662:5242`(Disabled)

| State | 배경 | 아이콘 | 비고 |
|---|---|---|---|
| Default | `brand/primary-default` `#2c7be2` | check (흰색 `common/white-default`) | 테두리 없음 |
| Hover | `brand/primary-default` 위에 `color/interaction/blue/hover`(`#0D2D57` 15%) 오버레이 | 동일 | `fills` 배열이 **2겹**(베이스+오버레이)으로 들어 있음 — Button Primary Hover와 동일한 메커니즘 |
| Pressed | `color/interaction/blue/pressed`(`#0D2D57` 30%) 오버레이 | 동일 | Button Primary Pressed와 동일 토큰 |
| Disabled | `neutral/400` `#c2c4c8` (단색으로 교체, 오버레이 아님) | 동일 아이콘 유지 | Button의 opacity 방식이 아니라 **배경색 자체를 회색 단색으로 교체**하는 방식 |

**Checked=True, Indeterminate=On (부분선택)**
기준 실측 16px: `2173:6687`(Default) · `2173:6685`(Hover) · `2173:6686`(Pressed) · `2173:6684`(Disabled)
기준 실측 20px: `2662:5244`(Default) · `2662:5248`(Hover) · `2662:5246`(Pressed) · `2662:5250`(Disabled)

색상·오버레이 메커니즘은 Indeterminate=Off와 **완전히 동일**하며, 아이콘만 check 대신 minus로 교체됩니다.

### 3-2. Checkbox / Rounded

**Checked=False, Outlined=True (테두리 있는 원)**
기준 실측 16px: `2173:6708`(Default) · `2173:6706`(Hover) · `2173:6698`(Pressed) · `2173:6705`(Disabled)
기준 실측 20px: `2662:5296`(Default) · `2662:5298`(Hover) · `2662:5300`(Pressed) · `2662:5302`(Disabled)

| State | 배경 | 테두리 | 아이콘 색 | 비고 |
|---|---|---|---|---|
| Default | `common/white-default` | 1px `color/gray/900-10` | `neutral/400` `#c2c4c8` | 미선택에도 **회색 체크가 보입니다**(6장 참고) |
| Hover | `common/white-default` 위에 `color/interaction/light-gray/hover`(`gray-900` 5%) 오버레이 | 변화 없음 | `neutral/400` | Button Tertiary(라이트) Hover와 동일 토큰 |
| Pressed | `interaction/light-gray/pressed`(`gray-900` 10%) 오버레이 | 변화 없음 | `neutral/400` | — |
| Disabled | 변화 없음(흰색 유지) | `color/gray/900-5`로 옅어짐(10%→5%) | **`neutral/300` `#dbdcdf`** | 체크도 한 단계 더 옅어집니다 |

**Checked=False, Outlined=False (테두리 없는 연한 회색 원)**
기준 실측 16px: `2173:6707`(Default) · `2173:6703`(Hover) · `2173:6704`(Pressed) · `2173:6702`(Disabled)
기준 실측 20px: `2662:5304`(Default) · `2662:5306`(Hover) · `2662:5308`(Pressed) · `2662:5310`(Disabled)

| State | 배경 | 아이콘 색 | 비고 |
|---|---|---|---|
| Default | `neutral/100` `#f6f7f7` | `neutral/400` | 테두리 없음 |
| Hover | `neutral/100` 위에 `interaction/light-gray/hover`(5%) 오버레이 | `neutral/400` | — |
| Pressed | `interaction/light-gray/pressed`(10%) 오버레이 | `neutral/400` | — |
| Disabled | **Default와 배경이 완전히 동일**(`neutral/100`, 변화 없음) | **`neutral/300`** | 배경/테두리는 전혀 변하지 않고 **체크 색만 옅어집니다** — 이것이 유일한 Disabled 신호 |

**Checked=True (항상 Outlined=False)**
기준 실측 16px: `2173:6700`(Default) · `2173:6699`(Hover) · `2173:6701`(Pressed) · `2173:6697`(Disabled)
기준 실측 20px: `2662:5312`(Default) · `2662:5314`(Hover) · `2662:5316`(Pressed) · `2662:5318`(Disabled)

| State | 배경 | 아이콘 색 | 비고 |
|---|---|---|---|
| Default | `brand/primary-default` `#2c7be2` | `common/white-default` | — |
| Hover | `interaction/blue/hover`(15%) 오버레이 | 동일 | Angular Checked=True Hover와 동일 토큰·메커니즘 |
| Pressed | `interaction/blue/pressed`(30%) 오버레이 | 동일 | — |
| Disabled | `neutral/400` `#c2c4c8` (단색 교체) | 동일 | Angular Checked=True Disabled와 동일 패턴 |

**참고**: Rounded는 Checked=True 조합에 Outlined=True 변형이 아예 존재하지 않습니다(48개 전수 확인). 테두리 유무는 미선택 상태에만 의미가 있는 축입니다.

## 4. 인터랙션 오버레이 토큰 요약

| 상황 | 토큰 | Hover | Pressed |
|---|---|---|---|
| 채워진 배경(Checked=True, 파란색) | `color/interaction/blue` | `#0D2D57` 15% | `#0D2D57` 30% |
| 흰/연회색 배경(Checked=False) | `color/interaction/light-gray` | `#03091A` 5% | `#03091A` 10% |

두 토큰 모두 `docs/DESIGN.md`·`tokens/colors.json`의 `interaction.blue`/`interaction.light-gray` 계열과 **정확히 일치**하며, Button 문서(5-2절)에서 Primary/Tertiary(라이트)에 쓰인 것과 동일한 패밀리입니다.

**오버레이는 `fills` 배열의 2번째 항목**입니다(1번째가 베이스). 색을 읽을 때 `fills[0]`만 보면 오버레이를 놓칩니다 — Chip Filled Hover에서 실제로 겪은 오류입니다.

## 5. 인터랙션(모션) 스펙

**정본은 [`docs/INTERACTION.md`](../../docs/INTERACTION.md)입니다.**

> ⚠️ 초판 문서에는 "모션 데이터 없음"으로 적혀 있었으나 **틀린 기록**이었습니다.
> `get_motion_context`는 **키프레임 애니메이션만** 읽습니다. 변형 사이의 전환은
> 프로토타입 반응(`node.reactions`)에 들어 있어 Plugin API로만 보입니다.

전수 집계 결과 **반응 24건**(Angular 12 + Rounded 12, Size 축 추가로 12건 → 24건으로 늘어남):

| Trigger | 전환 | API duration | 패널 표시값 | easing |
|---|---|---|---|---|
| `ON_HOVER` (Default → Hover) | Smart animate | 0.3125초 | **150ms** | `SLOW` |
| `ON_PRESS` (Hover → Pressed) | Smart animate | 0.1042초 | **50ms** | `SLOW` |

저장소 표준 인터랙션과 동일한 값입니다. CSS 근사는 `cubic-bezier(0.17, 0, 0.19, 1)`입니다(`docs/INTERACTION.md` 2장).

**Checked 축은 전환하지 않습니다.** 흰 체크가 흰 배경에서 시작해 전환 앞부분에 보이지 않기 때문이며(대비 1.0 → 3.12), Figma 원본도 Checked 축에는 반응이 연결되어 있지 않습니다. 근거와 규칙은 `docs/INTERACTION.md` 7.3절.

**Size 축에도 반응이 없습니다** — 크기 전환은 정의되어 있지 않습니다.

## 6. Rounded 미선택의 회색 체크 (초판 "확인 필요" 해소)

> **초판 서술 정정.** 초판은 "Rounded 미선택의 체크 아이콘 레이어는 구조적으로 존재하지만 육안으로 보이지 않는다 / 상태별로 고스트 아이콘이 교체되는 것으로 **추정**"이라고 적었습니다. **틀렸습니다.**

Plugin API로 벡터의 `fills`를 직접 읽은 결과, Rounded 미선택의 체크는 **실제로 보이는 회색 체크**입니다.

| 상태 | 체크 색 | 변수 |
|---|---|---|
| Checked=False · Default / Hover / Pressed | `#c2c4c8` | `neutral/400` |
| Checked=False · **Disabled** | `#dbdcdf` | `neutral/300` |
| Checked=True (전 State) | `#fdfdfd` | `common/white-default` |

- `visible: true` · `opacity: 1` 이며, 스크린샷에서도 흰/연회색 배경 위에 회색 체크가 분명히 보입니다.
- 상태마다 SVG 애셋 URL이 다르게 발급되는 것은 "다른 아이콘 파일"이어서가 아니라 **같은 벡터의 채우기 색이 변수로 바인딩되어 있기** 때문입니다. (Navigation Bar·Status Bar 문서에서도 같은 오기가 세 번 반복됐던 패턴입니다.)
- Angular에는 이 구조가 없습니다 — Checked=False에는 아이콘 레이어 자체가 존재하지 않습니다.

**✅ 2026-09-16 디자이너 결정으로 구현에 반영했습니다.** 스토리북 `Checkbox`는 `type="rounded"`이면 미선택에도 체크를 렌더하고, 색은 CSS 변수 `--bd-cb-fg`로 `neutral/400`(Disabled `neutral/300`)를 줍니다. Angular 미선택은 Figma와 동일하게 아이콘을 렌더하지 않습니다.

## 7. 접근성

- **Focused 상태 없음**: Figma State 축에 Default/Hover/Pressed/Disabled 4종만 있고 **키보드 포커스 상태(Focused)가 정의되어 있지 않습니다**. 구현에서는 브랜드색 2px 포커스 링을 추가했으며 디자이너 확인이 필요합니다.
- **Pressed 상태의 시각 피드백 부재(Angular 미선택)**: Angular Checked=False의 Pressed가 Default와 완전히 동일해, 마우스/터치 다운 시 아무런 시각적 피드백이 없습니다 — 의도적인지 확인 필요. **두 Size 모두 동일합니다.**
- **Indeterminate의 ARIA 매핑**: Indeterminate=On은 HTML `input[type=checkbox]`의 `indeterminate` DOM 프로퍼티(및 `aria-checked="mixed"`)로 매핑해야 합니다. Figma 파일 자체에는 이 규정이 문서화되어 있지 않습니다.
- **최소 터치 영역**: 16×16px는 물론 **새로 추가된 20×20px도 44px 권장 기준에 한참 못 미칩니다.** 실제 구현에서는 라벨 텍스트를 포함한 히트 영역 확장이 필요할 것으로 보이나 Figma 파일에 명시된 규정은 없습니다 — 확인 필요.
- **Rounded 미선택 회색 체크의 대비**: `neutral/400`(#c2c4c8) 체크가 흰 배경 위에서 대비 약 2.0, Disabled의 `neutral/300`은 약 1.6입니다. 선택 여부를 색·형태만으로 구분하게 되므로 라벨을 함께 제공해야 합니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- Angular radius 4px(16px) → `ref-radius-02` · **6px(20px) → `ref-radius-03`**
- Rounded radius 999px(두 Size 공통) → `ref-radius-12`
- 테두리 두께 1px(두 Size 공통) → `ref-borderwidth-02`
- 미선택 테두리 `color/gray/900-10`(10%), Disabled 시 `color/gray/900-5`(5%) → `ref-color-alpha-gray-900-10`/`-5`
- 선택 시 배경 `brand/primary-default`(`#2c7be2`) → `sys-color-brand-primary-default`(`ref-color-blue-500`)
- Disabled 선택 상태 배경 `neutral/400`(`#c2c4c8`) → `sys-color-neutral-400`(`ref-color-gray-400`)
- Rounded 미선택(Outlined=False) 배경 `neutral/100`(`#f6f7f7`) → `sys-color-neutral-100`(`ref-color-gray-100`)
- Rounded 미선택 체크 `neutral/400` · Disabled `neutral/300` → `sys-color-neutral-400` / `sys-color-neutral-300`
- Hover/Pressed 오버레이 → `interaction/blue`(15%/30%), `interaction/light-gray`(5%/10%)

**기존 토큰에 없음**
- 박스 고정 치수 16×16px · 20×20px
- 아이콘 크기 16px(Angular 두 Size 공통) · 12px/16px(Rounded)

**확인 필요**
- Focused 상태가 정의되지 않은 것에 대한 접근성 대응 방안
- Angular 미선택 Pressed에 시각 피드백이 없는 것이 의도적인지
- Rounded Outlined=False Disabled가 배경은 그대로 두고 체크 색만 바꾸는 것이 의도적인지
- 최소 터치 영역 확장 규정 여부(20px에서도 44px 미만)
- Angular 아이콘이 20px에서도 16px로 고정인 것이 의도적인지(Rounded만 커짐)

## 9. 샘플링에 사용한 노드 (부록, 48개 전수)

**Angular** (`2173:6696`) — `Size=16px` / `Size=20px` 순

| 조합 | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| Checked=False | `2173:6695` / `2662:5232` | `2173:6691` / `2662:5234` | `2173:6693` / `2662:5233` | `2173:6690` / `2662:5235` |
| Checked=True, Indeterminate=Off | `2173:6688` / `2662:5236` | `2173:6692` / `2662:5240` | `2173:6694` / `2662:5238` | `2173:6689` / `2662:5242` |
| Checked=True, Indeterminate=On | `2173:6687` / `2662:5244` | `2173:6685` / `2662:5248` | `2173:6686` / `2662:5246` | `2173:6684` / `2662:5250` |

**Rounded** (`2173:6709`) — `Size=16px` / `Size=20px` 순

| 조합 | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| Checked=False, Outlined=True | `2173:6708` / `2662:5296` | `2173:6706` / `2662:5298` | `2173:6698` / `2662:5300` | `2173:6705` / `2662:5302` |
| Checked=False, Outlined=False | `2173:6707` / `2662:5304` | `2173:6703` / `2662:5306` | `2173:6704` / `2662:5308` | `2173:6702` / `2662:5310` |
| Checked=True | `2173:6700` / `2662:5312` | `2173:6699` / `2662:5314` | `2173:6701` / `2662:5316` | `2173:6697` / `2662:5318` |

**⚠️ 상위 그룹 노드 ID는 깨질 수 있습니다.** 초판이 적어 둔 `2483:12499`는 현재 존재하지 않고 `2662:5344`로 바뀌었습니다. Component Set 노드 ID(`2173:6696` / `2173:6709`)는 유지되므로, 문서·코드에서 참조할 때는 **그룹이 아니라 Component Set ID**를 쓰는 편이 안전합니다.
