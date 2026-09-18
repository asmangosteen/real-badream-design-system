# INTERACTION.md - Badream Design System 인터랙션 기준서

> Source: Figma 디자인 시스템 파일(`2OcDq1pJgavJMLHvsdpf8S`)의 **프로토타입 반응(prototype reactions) 전수 조회**, 2026-09-15.
> 컴포넌트 페이지 24개 · 컴포넌트 셋 58개 · 변형 3,130개를 Plugin API 로 직접 읽어 집계했습니다.
> Purpose: 상태가 바뀔 때 **무엇이 · 얼마 동안 · 어떤 곡선으로** 움직이는지를 한 곳에 정리해,
> 웹/앱/AI 개발 환경에서 같은 감각으로 재현할 수 있게 합니다.
> 구현 참조: `storybook/src/styles/motion.css` (토큰·근거), 각 컴포넌트의 `*.css` "상태 전환" 절.

## 0. Application Contract

1. **Figma 에 프로토타입 반응이 정의된 컴포넌트는 그 값을 그대로 씁니다.** 임의로 바꾸지 않습니다.
2. **정의가 없는 컴포넌트는 구현에서 이미 정해 둔 값을 유지합니다.** 정의가 없다는 이유로 임의 통일하지 않습니다.
3. 값이 아예 없는 새 컴포넌트만, 성격이 가장 가까운 기존 컴포넌트의 값을 따릅니다.
4. duration 은 반드시 토큰으로 참조합니다. 하드코딩하면 "움직임 최소화" 설정이 걸리지 않습니다.
5. 전환 대상 속성은 **명시적으로 나열**합니다. `transition: all` 은 금지입니다 (7.3 참고).
6. Figma 와 값이 달라졌다면 Figma 를 기준으로 이 문서를 갱신합니다.

---

## 1. 표준 인터랙션

반응이 걸려 있는 컴포넌트는 **예외 없이 아래 두 가지가 전부이며, 값이 모두 동일**합니다.

| 전환 | Trigger | Animation | Easing | Duration (패널) | Duration (API) |
|---|---|---|---|---|---|
| Default → Hover | While hovering | Smart animate | Slow | **150ms** | 312.53ms |
| Hover → Pressed / 선택 / 입력 | While pressing | Smart animate | Slow | **50ms** | 104.18ms |

### 1.1 패널 값과 API 값이 다른 이유

Figma 패널에 보이는 150ms/50ms 와 API 가 돌려주는 312.53ms/104.18ms 의 비율은
**두 경우 모두 정확히 2.0836배**입니다. `Slow` 는 스프링이고,

- 패널 값 = 디자이너가 입력하는 **공칭 duration**
- API 값 = 스프링이 **완전히 정착(settle)** 하는 데 걸리는 실제 시간

입니다. 구현에서는 **패널 값(150/50ms)** 을 씁니다. 공칭 duration 시점에 이미 98.6% 진행되어,
색 전환에서는 남은 1.4% 가 보이지 않기 때문입니다.

---

## 2. Easing `Slow` 의 정체와 CSS 변환

`Slow` 는 Figma 타입 정의상 `GENTLE · QUICK · BOUNCY · SLOW · CUSTOM_SPRING` 그룹, 즉 **스프링**입니다.
베지어 곡선이 아니므로 CSS 로 옮기려면 모델을 먼저 알아야 합니다.

### 2.1 Figma 는 Apple 의 스프링 모델을 씁니다

`figma.motion.physicalSpringToNormalized({mass, stiffness, damping})` 를 감쇠비(ζ)별로 넣어 보면
**`bounce = 1 − ζ` 가 정확히 성립**합니다.

| mass / stiffness / damping | ζ | 반환된 bounce |
|---|---|---|
| 1 / 100 / 20 | 1.0 | 0 |
| 1 / 100 / 18 | 0.9 | 0.1 |
| 1 / 100 / 10 | 0.5 | 0.5 |
| 1 / 100 / 4 | 0.2 | 0.8 |
| 1 / 80 / 20 | 1.118 (과감쇠) | 0 |

이는 Apple 의 `spring(duration:bounce:)` 와 동일한 파라미터화입니다.
그 모델에서 `stiffness = (2π/duration)²`, `damping = 4π(1−bounce)/duration` 이므로,

> **Slow = bounce 0 (오버슈트 없음) · ω = 2π/duration 인 임계감쇠 스프링**
> `x(t) = 1 − (1 + ωt)·e^(−ωt)`

### 2.2 CSS cubic-bezier 근사

위 곡선을 최소자승 피팅한 결과입니다.

```css
--bd-motion-easing: cubic-bezier(0.17, 0, 0.19, 1);
```

| 곡선 | 최대 오차 |
|---|---|
| **`cubic-bezier(0.17, 0, 0.19, 1)`** | **1.2%** |
| `ease` `cubic-bezier(.25,.1,.25,1)` | 6.7% |
| `ease-out` `cubic-bezier(0,0,.58,1)` | 15.6% |
| `Material standard` `cubic-bezier(.4,0,.2,1)` | 23.8% |
| `ease-in-out` `cubic-bezier(.42,0,.58,1)` | 39.9% |

정지 상태에서 출발해(초기 속도 0) 빠르게 치고 나간 뒤 부드럽게 감속합니다.

> ⚠️ **스프링을 베지어로 근사하는 것은 오버슈트가 없을 때만 유효합니다.**
> Slow 는 bounce 0 이라 형태가 보존되지만, `Bouncy` 등 다른 프리셋에는 이 방법을 쓸 수 없습니다.

### 2.3 실측 검증

스토리북에서 `Text Button` 의 글자색 합성 비율을 시간축으로 샘플링한 값입니다.

| 경과 | 0ms | 25ms | 50ms | 75ms | 100ms | 150ms |
|---|---|---|---|---|---|---|
| 진행률 | 0% | 28.9% | 62.7% | 82.2% | 93.1% | 100% |

이론 스프링 곡선과 소수점 단위로 일치합니다.

---

## 3. 컴포넌트별 적용 현황

### 3.1 Figma 에 반응이 정의된 컴포넌트 — 표준 인터랙션(150/50ms · Slow)

| Figma 컴포넌트 셋 | 변형 | 반응 | 저장소 구현 |
|---|---|---|---|
| Button | 935 | 440 | `components/button/button/` |
| Text Button | 156 | 72 | `components/button/text-button/` |
| Icon Button | 108 | 54 | `components/button/icon-button/` |
| Checkbox / Angular · Rounded | 24+24 | 24 | `components/checkbox/` |
| Radio Button | 24 | 12 | `components/radio-button/` |
| Chip / Selection · Filter | 150+40 | 76 | `components/chip/` |
| Date | 11 | 4 | `components/date-time-picker/date/` |
| Time Field | 3 | 2 | `components/date-time-picker/time-field/` |
| Text Input | 768 | 192 | `components/text-input/text-input/` |
| Dropdown | 288 | 96 | `components/dropdown/` |
| Page Numbering · Page Direction | 15+10 | 10 | 저장소 미구현 |
| Search Box | 16 | 19 | 저장소 미구현 |

**예외 — Search Box** 만 Trigger 구성이 다릅니다.
`ON_HOVER` 150ms · **`ON_CLICK`** 50ms · **`ON_KEY_DOWN`** 150ms
(누르는 중이 아니라 클릭으로 입력 상태에 들어가고, 키 입력은 Hover 와 같은 시간을 씁니다.)

### 3.2 반응이 정의되지 않은 컴포넌트

Type Box · Label · Text Count · Supporting Text · Avatar · Badge(4종) · Divider ·
Month · Calendar Header · Date Picker(+Group) · Time Picker(+Group) · Footer ·
List(6종) · Menu(3종) · Navigation Bar(5종) · Page Control · **Scroll Bar** · Segmented Control(+_Item) ·
Status Bar · Tab(+_Item) · Text Input Group · Toggle · Top Bar · _ButtonSpinner

이들은 **구현에서 이미 정해 둔 값을 유지**합니다(Application Contract 2번). 아래 4장 참고.

> **다만 안에 든 아톰의 반응까지 없는 건 아닙니다.** 이 목록은 "**컴포넌트 셋 자신이 추가한** 반응이 없다"는 뜻입니다.
> Time Picker 는 위/아래 화살표가 [Icon Button](../components/button/icon-button/icon-button.md) 인스턴스라 3.1 의 Icon Button 반응을 그대로 상속받고,
> 안의 Time Field 도 자기 반응을 그대로 씁니다 — 실측하면 Time Picker 안에 **9개**(3변형 × 자식 3개),
> Time Picker Group 안에 **15개**(Count=2 는 6, Count=3 은 9)가 잡힙니다. 전부 `ON_HOVER` · Smart animate · Slow · 150ms 입니다.
> Calendar Header 도 같습니다.
>
> 그래서 **이 목록을 "hover 를 붙이지 않아도 된다"로 읽으면 안 됩니다.** 실제로 Time Picker 의 화살표를 맨 `<button>` 으로
> 구현해 두는 바람에 hover 가 통째로 빠져 있었고, Icon Button 인스턴스로 바로잡고서야 반응이 살아났습니다.

### 3.3 Text Blinker — 유일한 반복 애니메이션

| From | Trigger | To | Animation | Easing | Duration |
|---|---|---|---|---|---|
| `State=On` | After delay **200ms** | `State=Off` | Smart animate | **Ease in and out** | **150ms** |
| `State=Off` | After delay **200ms** | `State=On` | Smart animate | **Ease in and out** | **150ms** |

한 주기 = (200 유지 + 150 전환) × 2 = **700ms**이며, 껐다 켰다 하는 계단(step)이 아니라
**부드럽게 사라졌다 나타나는 페이드**입니다.

> 이전 스펙 문서는 이 값을 "Figma 에 모션 데이터 없음"으로 적고 있었습니다. 원인은 8장 참고.

### 3.4 Scroll Bar — 유일한 자동 노출/숨김

프로토타입 반응은 **0건**이지만(3.2 목록에 포함), 컴포넌트 설명에
*"스크롤을 하면 노출되며, 멈춰있는 상태일 경우 노출하지 않습니다"* 라는 **동작 규정**이 있습니다.
상태 전환이 아니라 **스크롤 이벤트에 반응하는 자동 노출/숨김**이라 표준 인터랙션(150/50ms)과는 별개입니다.

| 구간 | 값 |
|---|---|
| 등장 | 즉시 (`0ms`) |
| 머무름 | 스크롤이 멈춘 뒤 **`1000ms`** 대기 (스크롤 재개 시 리셋) |
| 사라짐 | **`300ms`** 페이드아웃 (`opacity` 1 → 0) |

> **⚠️ 이 세 값은 Figma 에 없습니다.** iOS 기본 스크롤 인디케이터 관례값이며 **2026-09-18 디자이너 지시**가 출처입니다.
> 재실측 때 "Figma 에 근거가 없다"는 이유로 지우지 마세요. 스펙 원본은
> [`components/scroll-bar/scroll-bar.md`](../components/scroll-bar/scroll-bar.md) 5장.

`prefers-reduced-motion` 에서는 페이드 없이 즉시 사라집니다(6장 공통 규칙).

---

## 4. 곡선이 3종 공존하는 이유

"정의가 없으면 기존 값 유지"(Application Contract 2번)를 그대로 적용한 결과입니다.
의도된 상태이며, 임의로 하나로 합치지 않습니다.

| 곡선 | duration | 적용 대상 | 출처 |
|---|---|---|---|
| `cubic-bezier(0.17, 0, 0.19, 1)`<br>(Figma Slow 근사) | 150 / 50ms | 3.1 의 컴포넌트 전부 | **Figma 실측** |
| `cubic-bezier(0.32, 0.72, 0, 1)` | 200ms | **인디케이터** — Tab 밑줄+글자색, Segmented Control 알약+글자색, Page Control 도트, TabItem·SegmentedControlItem 단독 사용 | Segmented Control 에 원래 쓰던 값 |
| `ease` | 150ms | Toggle 트랙 색 · thumb 이동 | Toggle 에 원래 쓰던 값 |
| `ease` | 200ms | Tab 오버플로우 페이드 | Tab 에 원래 쓰던 값 |

**인디케이터**란 색이 바뀌거나 자리를 옮겨서 "지금 선택된 것"을 가리키는 요소를 말합니다.
Page Control 도트는 원래 값이 없어 Application Contract 3번에 따라 Segmented Control 값을 따랐습니다.

---

## 5. 시간 토큰

`storybook/src/styles/motion.css` 에 정의돼 있습니다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `--bd-motion-easing` | `cubic-bezier(0.17, 0, 0.19, 1)` | Figma Slow 근사 곡선 |
| `--bd-motion-hover` | `150ms` | Default → Hover |
| `--bd-motion-pressed` | `50ms` | Hover → Pressed / 선택 / 입력 |
| `--bd-motion-slide` | `200ms` | 인디케이터 |
| `--bd-motion-slide-easing` | `cubic-bezier(0.32, 0.72, 0, 1)` | 인디케이터 곡선 |
| `--bd-motion-duration` | `var(--bd-motion-hover)` | **컴포넌트가 실제로 읽는 값** |

> ⚠️ 이 값들은 `tokens/tokens.css` 에 없습니다. Figma **Variables 가 아니라 프로토타입 설정**이라
> Variables 를 내보내는 경로로는 나오지 않기 때문입니다. 위치를 옮기려면 별도 결정이 필요합니다.

`--bd-motion-duration` 은 **상속되는 값**입니다. 부모(`.bd-checkbox`)에서 덮으면
자식(`.bd-checkbox__box`)까지 함께 바뀌므로, 상태 규칙을 한 곳에만 쓰면 됩니다.

---

## 6. 시간 결정 우선순위

CSS 는 전환이 시작될 때 **도착 상태(after-change style)** 의 `transition-duration` 을 씁니다.
따라서 각 컴포넌트는 아래 순서로 선언합니다. **뒤에 올수록 이깁니다.**

| 순위 | 조건 | 값 |
|---|---|---|
| 1 | 선택·입력 상태 (`[data-selected]` `[data-checked]` `[data-state='typing']` …) | 50ms |
| 2 | 마우스가 올라와 있는 동안 (`:hover`) | 150ms |
| 3 | 누르는 중 (`:active`) | 50ms |

마우스 상태를 선택 상태보다 위에 둔 이유는, Hover 가 사용자가 계속 겪는 전환이라
값이 일정하지 않으면 바로 티가 나기 때문입니다.

---

## 7. 구현 규칙 (CSS)

### 7.1 오버레이 커스텀 속성은 반드시 `@property` 로 등록

바드림의 Hover/Pressed 는 Figma 와 동일하게 "베이스 색 위에 `interaction/*` 오버레이를 합성"하는
방식이고, 구현에서는 그 오버레이를 CSS 커스텀 속성으로 들고 있습니다.
**커스텀 속성은 등록하지 않으면 애니메이션되지 않고 뚝 끊깁니다.**

```css
@property --bd-btn-overlay { syntax: '<color>'; inherits: true; initial-value: transparent; }
```

- `syntax` 를 알려 줘야 색으로 보간됩니다.
- `inherits: true` 인 이유 — Checkbox·Radio 는 값을 루트(`<button>`)에 선언하고
  실제로는 자식(`__box`·`__circle`)에서 읽습니다.
- `transparent` 와의 보간은 프리멀티플라이드라 회색을 거치지 않습니다.
- Text Button 은 배경이 없어 색 합성 비율을 움직이므로 `syntax: '<percentage>'` 로 등록합니다.

### 7.2 두께가 0 인 테두리는 전환되지 않습니다

`border-width` 를 0 → 1px 로 바꾸면 전환 도중 테두리가 갑자기 나타납니다.
미리 투명 border 를 깔면 `border-box` 기준 content 폭이 줄어 규격이 깨집니다.

→ **`box-shadow: inset 0 0 0 <두께> <색>`** 으로 그립니다.
border-box 의 border 와 같은 자리에 같은 두께로 그려지면서 레이아웃에 전혀 영향을 주지 않습니다.
(Time Field 의 Typing 상태 파란 테두리가 이 방식입니다.)

### 7.3 상태 축(선택·체크)은 색을 전환하지 않습니다

색을 전환하면 중간 프레임은 **어느 상태도 아닌 제3의 모습**이 됩니다.
디자인에 없는 상태가 하나 더 있는 것처럼(1 → 2 → 3) 보이기 때문에,
"한 상태에서 다른 상태로 바뀌었다(1 → 3)"로 읽히지 않습니다.

특히 **밝기가 서로 뒤집히는** 조합에서는 라벨이 아예 사라집니다.
Chip Filled 의 `Default ↔ Selected` 는 배경 89% ↔ 2%, 글자 12% ↔ 98% 입니다.
배경을 크로스페이드하면 중간에 반드시 글자와 같은 밝기를 지나갑니다 —
라벨이 읽히려면(대비 4.5 이상) 배경이 **71% 이상**(어두운 글자)이거나
**17.9% 이하**(흰 글자)여야 하는데, 배경이 그 사이를 통과할 수밖에 없기 때문입니다.
150ms 로 재생하면 **55ms(60fps 기준 3~4프레임) 동안 라벨이 증발**합니다.
글자색을 어떻게 잡아도 피할 수 없고, 전환을 짧게 하면 사라지는 시간만 줄 뿐입니다.

배경만 즉시 바꿔 그 교차를 없애는 방법도 시도했지만, 이번에는
"네이비 배경 + 회색 라벨"이라는 **역시 존재하지 않는 상태**가 보입니다.

**결론: 상태 축은 한 번에 바꿉니다. 움직임은 입력 피드백(hover/pressed 오버레이)이 담당합니다.**
Figma 도 같습니다 — Chip 셋의 반응은 `Default→Hover`, `Hover→Pressed` 두 개뿐이고
**Selected 축에는 전환이 연결돼 있지 않습니다.** 원본이 이미 즉시 전환입니다.

```css
/* 오버레이(입력 피드백)와 opacity(disabled)만 전환하고,
   background-color · border-color · color 는 목록에서 뺍니다 */
.bd-chip {
  transition-property: --bd-chip-overlay, opacity;
  transition-duration: var(--bd-motion-duration);
  transition-timing-function: var(--bd-motion-easing);
}
```

**적용 현황 (2026-09-15 기준)** — 상태 축을 가진 컴포넌트 전부에 적용했습니다.

| 컴포넌트 | 전환하지 않는 축 | 전환을 뺀 이유 |
|---|---|---|
| Chip | Selected | 배경 89% ↔ 2% · 글자 12% ↔ 98% 로 뒤집혀 라벨이 사라짐 |
| Date Cell | Type(Selected·Pinned) | Pinned 가 배경 98% ↔ 20% · 글자 12% ↔ 98% 로 뒤집혀 대비 1.17 까지 하락 |
| Checkbox | Checked | 흰 체크가 흰 배경에서 시작해 앞 25ms 동안 보이지 않음(대비 1.0 → 3.12) |
| Radio Button | Checked | 흰 dot 이 같은 이유로 보이지 않음 |

네 컴포넌트 모두 Figma 에도 해당 축의 전환이 연결돼 있지 않습니다. 원본이 이미 즉시 전환입니다.
입력 피드백(hover/pressed 오버레이)은 전부 그대로 애니메이션됩니다.

> 참고 — Date Cell `Pinned`(`brand/primary-default` 배경 + 흰 글자)의 대비는 4.1 입니다.
> WCAG AA 기준(4.5)보다 낮지만 **의도된 값으로 확정했습니다**(2026-09-15 디자이너 확인).
> 브랜드 색을 그대로 쓰기 위한 선택이며, 다시 지적 사항으로 올리지 않습니다.

### 7.4 `transition: all` 금지

`all` 을 쓰면 Storybook Controls 에서 Size 변형을 바꿀 때 `padding`·`font-size` 까지
애니메이션돼 글자가 꿈틀거립니다. **색·opacity 등 전환할 속성만 명시적으로 나열**합니다.

타이포가 함께 바뀌는 변형(예: Date 의 `Pinned`)에서도 글자 크기·굵기는 전환 대상에서 뺍니다.

### 7.5 움직임 최소화 설정은 토큰 한 곳에서 처리

```css
@media (prefers-reduced-motion: reduce) {
  :root { --bd-motion-hover: 0ms; --bd-motion-pressed: 0ms; --bd-motion-slide: 0ms; }
}
```

컴포넌트마다 `@media` 를 중복 선언하지 않습니다. duration 을 하드코딩하면 이 처리가 걸리지 않습니다.

### 7.6 토큰을 지울 때

존재하지 않는 `var()` 를 참조하면 **`transition` 선언 전체가 무효**가 되는데,
**빌드는 그대로 통과합니다.** 토큰 이름을 바꾸거나 지울 때는 `grep -rn "<토큰명>"` 으로
잔존 참조를 반드시 확인하세요.

---

## 8. 값을 다시 확인하는 방법

> ⚠️ **`get_motion_context` 로 "모션 없음" 을 결론짓지 마세요.**
> 이 도구는 **키프레임 애니메이션만** 읽습니다. 변형 사이의 전환(Default→Hover 등)은
> **프로토타입 반응**에 들어 있어 이 도구로는 보이지 않습니다.
> 저장소 스펙 `components/global/text-blinker/` 가 이 착각으로 "모션 데이터 없음"이라고
> 잘못 기록돼 있었고, 2026-09-15 에 정정했습니다.

Figma Plugin API 로 직접 읽습니다. `page.loadAsync()` 를 쓰면 현재 페이지를 바꾸지 않고
여러 페이지를 **한 번의 호출에서** 훑을 수 있습니다.

```js
const page = await figma.getNodeByIdAsync(PAGE_ID);
await page.loadAsync();
const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
const tally = {};
for (const s of sets) {
  for (const v of s.children) {
    for (const r of (v.reactions || [])) {
      for (const a of (r.actions || [])) {
        const t = a.transition;
        const key = [s.name, r.trigger.type, t?.type, t?.easing?.type, t && Math.round(t.duration * 1000) + 'ms'].join(' | ');
        tally[key] = (tally[key] || 0) + 1;
      }
    }
  }
}
return tally;
```

### 8.1 브라우저에서 전환을 측정할 때

브라우저 탭이나 패널이 **숨겨져 있으면 렌더링이 멈춰** 전환이 진행되지 않습니다.
오프스크린 iframe(`left: -9999px`)도 같은 이유로 스로틀링됩니다.
확실히 재려면 Web Animations API 로 시간을 직접 지정하세요.

```js
el.setAttribute('data-force-state', 'hover');
const anims = el.getAnimations();          // CSSTransition 목록
anims.forEach(a => a.currentTime = 75);    // 75ms 지점으로 이동
getComputedStyle(el).getPropertyValue('--bd-btn-overlay');
```

---

## 9. 알려진 한계

1. **마우스를 올린 채로 선택이 바뀌는 순간** (체크박스를 클릭해 손을 뗄 때)
   도착 상태가 "hover + 선택"이라 CSS 로는 둘 중 무엇이 바뀐 것인지 구분할 수 없습니다.
   **Hover 우선(150ms)** 으로 정했습니다(2026-09-15).
   선택 우선으로 바꾸면 체크되는 순간은 50ms 가 되지만, 그 대가로
   **이미 체크된 요소에 마우스를 올릴 때도 50ms** 가 됩니다. 둘 다 가질 수는 없습니다.
   해당 컴포넌트는 hover 와 선택 상태를 둘 다 가진 **Checkbox · Radio · Chip** 3개뿐입니다.

2. **Pressed 에서 손을 떼 Hover 로 돌아갈 때**도 150ms 입니다.
   Figma 는 While pressing 의 역방향이라 50ms 이지만, CSS 는 도착 상태가 Hover 라
   Hover 값을 씁니다. 색이 옅어지는 방향이라 눈에 띄지 않습니다.

3. **미선택 → 선택에서 사라지는 테두리**(Checkbox·Radio, 1px → 0)는 즉시 사라집니다.
   `border-width` 는 부드럽게 줄일 수 없습니다. 테두리 색이 `gray-900 10%` 로 아주 옅고
   그 위를 파란 배경이 덮어서 실제로는 보이지 않습니다.
