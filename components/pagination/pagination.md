# Pagination

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2733-8561) — 캔버스 그룹 `2733:8561`(페이지 `❖ Pagination`) 안에 **7개 컴포넌트**가 있음
> 기계 판독용 값은 [`pagination.json`](./pagination.json)을 함께 참고합니다. 이 문서와 pagination.json은 항상 같은 소스에서 나온 값이어야 합니다.

> # ⚠️ 이 저장소에서 유일한 **웹 전용** 컴포넌트입니다
>
> 나머지 44개는 전부 모바일 기준인데 **Pagination만 웹에서만 씁니다**(2026-09-19 디자이너 지시).
>
> - **Hover가 1급 상태**입니다 — 모바일에는 hover가 없습니다.
> - **기준 폭이 1080px**입니다 — 모바일 390 폭에 9칸(342px) + 양옆이 들어가지 않습니다.
> - **칸이 38×38**이라 모바일 권장 터치 영역 44px에 못 미칩니다.
>
> 모바일 목록의 페이지 이동에는 이 컴포넌트를 쓰지 말고 무한 스크롤이나 [Page Control](../page-control/page-control.md)을 쓰세요.

## 0. 문서 범위와 샘플링 방법

| # | 컴포넌트 | 노드 ID | 타입 | 크기 | 변형 |
|---|---|---|---|---|---|
| 1 | Page Numbering | `2287:8217` | Component Set | 38×38 (4자리 44) | **15** |
| 2 | Page Direction | `2287:8556` | Component Set | 38×38 | **8** |
| 3 | Page Numbering Group | `2287:8450` | Component Set | 342×38 | **4** |
| 4 | Pagination | `2287:8785` | Component | 418×38 | — |
| 5 | Per Page | `2287:8764` | Component | 136×38 | — |
| 6 | Move to Page | `2287:8763` | Component | 179×38 | — |
| 7 | Pagination Group | `2287:13983` | Component | 1080×38 | — |

- **7개 전부를 Plugin API(`use_figma`)로 실측**했습니다 — 크기·`fills` 배열 전체·`cornerRadius` 변수 바인딩·자식 인스턴스·텍스트 스타일·`reactions`.
- 사용 예시는 같은 그룹 안의 **`Frame 1`(`2292:22294`, 1920×1080)** 7줄을 그대로 참고했습니다(9장).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "기존 토큰에 없음"으로 명시합니다.
- **⚠️ Figma에 근거가 없고 2026-09-19 디자이너 지시로 확정한 값은 본문에 ⚠️로 표시**했습니다(4·6·7·8장). 재실측 때 "Figma에 없다"고 되돌리지 마세요.

## 1. 구조 — 아톰 2개 → 조합 5개

```
Page Numbering  ─┐
                 ├─→ Page Numbering Group ─┐
Page Direction  ─┘                          ├─→ Pagination ─┐
                                            │               │
                    Per Page (Dropdown 재사용) ──────────────┼─→ Pagination Group
                    Move to Page (Text Input + Button 재사용) ┘
```

**기존 컴포넌트를 인스턴스로 재사용합니다** — `Per Page`는 [Dropdown](../dropdown/dropdown.md), `Move to Page`는 [Text Input](../text-input/text-input/text-input.md)과 [Button](../button/button/button.md)입니다. 겉모습만 흉내 내면 hover·pressed·포커스가 통째로 빠지므로 **반드시 해당 컴포넌트를 써야 합니다**(Calendar Header·Navigation Bar에서 실제로 겪은 문제).

### 1-1. 두 아톰의 공통 규격

| 항목 | 값 | 토큰 | 매칭 |
|---|---|---|---|
| 높이 | 38px | 기존 토큰에 없음 | — |
| radius | `radius/05` = 10px | `ref-radius-05` | **정확히 일치** |
| 배경(기본) | `common/white-default` `#fdfdfd` | `sys-color-common-white-default` | **정확히 일치** |
| 글자·아이콘 | `neutral/600` `#5b616c` | `sys-color-neutral-600` | **정확히 일치** |

## 2. Page Numbering — 번호 한 칸 (15변형)

**축**: `Contents`(0 ~ 000 / 0000 / Abbreviated) × `State`(Default / Hover / Pressed / Selected / Disabled)

### 2-1. Contents — 자릿수가 폭을 정합니다

| Contents | 폭 | 안쪽 칸 | 뜻 |
|---|---|---|---|
| `0 ~ 000` | **38px** | 30×22 | 1~3자리 |
| `0000` | **44px** | 36×22 | 4자리 이상 |
| `Abbreviated` | 38px | 30×22 (`ETC`) | `···` 생략 |

패딩은 셋 다 `8px 4px`이고 auto-layout은 HUG입니다. **구현은 `page` 자릿수로 자동 판정**하고, `contents`를 직접 줘서 덮어쓸 수도 있습니다.

`···`는 **글자가 아니라 2.5px 원 3개**입니다 — `gap: 3px`, 색 `neutral/600`. (텍스트 `…`으로 대체하면 자간이 달라집니다.)

### 2-2. State별 색

| State | 배경 | 글자 | 비고 |
|---|---|---|---|
| Default | `common/white-default` | `neutral/600` | — |
| Hover | + `color/gray/900-2`(검정 2%) 오버레이 | `neutral/600` | 흰 배경 오버레이 규칙 |
| Pressed | + `color/gray/900-5`(검정 5%) 오버레이 | `neutral/600` | |
| **Selected** | `neutral/700` `#454C58` **단색** | `common/white-default` | 오버레이가 아니라 배경 교체 |
| Disabled | `common/white-default` | `neutral/600` | **컴포넌트 전체 `opacity: 40%`** |

- Hover/Pressed 값이 **Checkbox 흰 배경 미선택·Chip Outlined과 같은 raw 알파 패밀리**입니다(2026-09-18 갱신된 규칙과 동일).
- Disabled는 색을 바꾸지 않고 **opacity 40%** 로 처리합니다 — Button·Chip과 같은 방식이고 Checkbox(테두리 알파)와는 다릅니다.
- 글자는 `Body 2/14 M`(Pretendard Medium 14/22, 자간 −0.04).

## 3. Page Direction — 이전/다음 한 칸 (8변형)

**축**: `State`(Default / Hover / Pressed / Disabled) × `Type`(Previous / Next)

- 38×38 **고정**(번호 칸과 달리 HUG가 아닙니다), radius 10.
- 아이콘: `Icon / Default / 20px / chevron_left`(Previous) · `chevron_right`(Next), 색 `neutral/600`.
- 배경·오버레이·Disabled는 2-2와 **완전히 동일**합니다.
- **`Selected` 축이 없습니다** — 번호 칸과 다른 유일한 점입니다.

### 3-1. ⚠️ 언제 비활성되나 (2026-09-19 디자이너 확인)

**현재가 1페이지면 `‹`, 마지막 페이지면 `›`가 Disabled**입니다. Figma `Frame 1` 마지막 줄(현재 20/20)에서 `›`가 흐리게 보이는 것과 일치합니다. 구현은 `autoDisableArrows`로 켜고 끌 수 있습니다.

## 4. Page Numbering Group — 번호 9칸 (4변형)

**축**: `State`(Stable / Abbreviated) × `Abbreviated`(None / Rear / Both / Front)
**크기**: 342×38 = **9칸 × 38, gap 0**. 간격은 칸 자체의 좌우 패딩(4px)이 만듭니다.

9개의 BOOLEAN 프로퍼티(`Page 1` ~ `Page 9`)로 칸을 켜고 끌 수 있게 돼 있습니다.

### 4-1. ⚠️ 생략 규칙 (2026-09-19 디자이너 확정)

번호 칸은 **항상 최대 9개**입니다. 9개를 넘으면 `···`로 접습니다.

| 조건 | 변형 | 모양 (총 20페이지 예시) |
|---|---|---|
| 총 ≤ 9 | `Stable / None` | `1 2 3 4 5 6 7 8 9` |
| **현재 ≤ 5** | `Abbreviated / Rear` | `1 2 3 4 5 6 7 ··· 20` |
| **현재 ≥ 총−4** | `Abbreviated / Front` | `1 ··· 14 15 16 17 18 19 20` |
| 그 외 | `Abbreviated / Both` | `1 ··· 12 13 [14] 15 16 ··· 20` |

- **레이아웃 3종은 Figma 실측**입니다(`Frame 1` 5~7번째 줄과 정확히 일치).
- **⚠️ 전환 경계는 Figma에 없습니다** — 2026-09-19 디자이너 지시가 출처입니다.
- **경계의 근거: 현재 페이지 좌우에 번호가 항상 2개씩 보이도록 잡았습니다.**
  Rear는 `1~7`을 보여주므로 현재가 7이면 오른쪽에 번호가 없어(`… 6 [7] ··· 20`) 어색합니다. 그래서 오른쪽 여유 2칸을 남기는 **5**까지만 Rear를 씁니다. Front도 대칭입니다.

> **⚠️ 같은 날 한 번 고쳤습니다.** 처음엔 `현재 ≤ 7`로 정했는데, 총 20페이지에서 현재가 14일 때 `1 ··· [14] 15 16 17 18 19 20`이 되어 **왼쪽에 이전 번호가 하나도 없었습니다.** 디자이너 지적으로 `≤ 5` / `≥ 총−4`로 바로잡았습니다. 되돌리지 마세요.
- 어느 경우에도 칸 수는 9개입니다 — Rear `7+1+1` · Front `1+1+7` · Both `1+1+5+1+1`.
- 구현은 `storybook/src/components/Pagination/pagination-logic.ts`의 순수 함수 **`buildPageSlots(total, current)`** 가 담당합니다. 컴포넌트 없이 따로 검증할 수 있습니다.

## 5. Pagination — 화살표 + 번호 (418×38)

`Page Direction`(Previous) + `Page Numbering Group` + `Page Direction`(Next), **gap 0**.
38 + 342 + 38 = **418** ✓

## 6. Per Page — 한 화면에 몇 개씩 (136×38)

`[10개 ∨]` + `씩 보기` 구성입니다.

| 부분 | 크기 | 내용 |
|---|---|---|
| Dropdown | 80×38 | [Dropdown](../dropdown/dropdown.md) `Size=M` 인스턴스. Show Button·Show Label·Supporting Text·Left Icon 전부 **False** |
| 문구칸 | 56×38 | 패딩 `0 8px` + `씩 보기` (`Body 2/14 R`, `neutral/600`) |

80 + 56 = **136** ✓ (gap 0)

### 6-1. ⚠️ Disabled 상태가 없습니다 (2026-09-19 디자이너 지시)

`Move to Page`와 같은 규칙입니다. **필요 없으면 비활성이 아니라 아예 노출하지 않습니다** — `Show Per Page`를 끕니다.

안에 든 [Dropdown](../dropdown/dropdown.md)은 Figma에 Disabled 변형이 있지만 **이 조합에서는 쓰지 않습니다.**

### 6-2. ⚠️ 눌렀을 때 열리는 것은 `Select Group`입니다 (2026-09-19 디자이너 지시)

드롭다운을 누르면 **드롭다운 바로 아래 4px 지점에 [`Select Group`] 패널이 뜹니다.**

- `Select Group` = Figma `2686:7432`, **36변형**(Size × Position × Show Label × Show Scroll). 그 안의 항목이 `Select` = `2662:5203`, **288변형**.
- **두 컴포넌트 모두 아직 저장소에 없습니다.** 이번 작업 범위 밖입니다.
- 저장소 스토리북은 **동작만 보여주는 임시 목록**으로 대체했습니다(디자이너 결정). **위치 규칙(아래 4px)만 지켰습니다.**
- `Select`가 문서화되면 이 자리를 교체해야 합니다 — 스토리북 `PerPage`의 `bd-per-page__list`가 그 자리입니다.

### 6-3. ⚠️ 선택지 목록 (2026-09-19 디자이너 지시)

Figma에는 **`10개` 하나만** 그려져 있습니다. 실제 목록은 **10 / 20 / 30 / 50**으로 정했습니다. 구현은 `options` prop으로 열어 뒀으니 화면마다 바꿀 수 있습니다.

## 7. Move to Page — 번호로 바로 이동 (179×38)

| 부분 | 크기 | 내용 |
|---|---|---|
| Text Input | **자릿수 비례**×38 | [Text Input](../text-input/text-input/text-input.md) `Size=M`. Show Button·Label·Supporting Text·**Left Icon·Right Icon 전부 False**. 폭은 7-1장 |
| `/ 9999` | 58×38 | 패딩 `0 8px`, gap **2px**, `Body 2/14 R` `neutral/600` |
| Button | 49×38 | [Button](../button/button/button.md) `Size=L, Type=Secondary, Text Color=Blue, Contents=Text` — 배경 `brand/primary-lightest` `#EEF4FC`, 글자 `brand/primary-default` `#2C7BE2` |

(64 + 58) + gap 8 + 49 = **179** ✓

> **⚠️ Text Input은 좌·우 아이콘이 기본 켜짐입니다.** Figma 인스턴스는 둘 다 False라 **반드시 꺼야 합니다.** 저장소 구현에서 실제로 사람 아이콘이 나왔던 부분입니다.

### 7-1. ⚠️ 입력칸 폭은 총 페이지 자릿수를 따릅니다 (2026-09-19 디자이너 지시)

> "100페이지가 최대면 text input 안에 100이 들어갔을 때의 너비로 고정. 최대는 9999까지."

```
입력칸 폭 = 좌우 패딩 24px + 총 페이지 자릿수 × 10px
```

Figma 실측이 **4자리(`9999`)에서 64px**이고 Text Input `Size=M`의 좌우 패딩이 12+12=**24px**이므로, 내용칸 40px ÷ 4자리 = **자리당 10px**입니다. 이 값을 기준으로 자릿수만큼 줄입니다.

| 총 페이지 | 자릿수 | 입력칸 폭 | 전체 폭 |
|---|---|---|---|
| 1~9 | 1 | 34px | 121px |
| 10~99 | 2 | 44px | 140px |
| 100~999 | 3 | 54px | 158px |
| **1000~9999** | 4 | **64px** | **177px** | ← Figma 실측(179px)과 2px 차이 |

- **최대는 9999(4자리)**입니다. 더 큰 값을 넘겨도 4자리 폭으로 고정되고 입력값도 9999로 보정됩니다.
- 전체 폭이 Figma 179 대신 177인 것은 `이동` 글자와 총 페이지 숫자의 **글리프 폭 차이**(각 1px)입니다 — 패딩·gap은 정확히 일치합니다. 구조 오류가 아닙니다.
- 구현은 CSS 변수 `--bd-mtp-digits`로 자릿수를 넘기고 `calc(24px + var(--bd-mtp-digits) * 10px)`로 계산합니다.
- ⚠️ **Figma에는 4자리 예시 하나뿐**입니다. 1~3자리 폭은 위 비례식으로 도출한 값입니다.

### 7-2. ⚠️ Disabled 상태가 없습니다 (2026-09-19 디자이너 지시)

> "move to page의 disable 상태는 없어. 필요없으면 아예 노출을 안시킬거야. 예를 들어 페이지 폭이 좁아서 다 못보여 줄 경우"

**`Move to Page`에는 비활성 상태가 없습니다.** 필요 없는 상황에서는 흐리게 만드는 게 아니라 **아예 노출하지 않습니다** — `Pagination Group`의 `Show Move to Page`를 끕니다.

- 대표적인 경우: **폭이 좁아 세 칸을 다 못 보여줄 때.**
- 구현에서도 `MoveToPage`에 `disabled` prop이 **없습니다.** `PaginationGroup`의 `disabled`도 이 칸에는 전달되지 않습니다.
- 안에 든 [Text Input](../text-input/text-input/text-input.md)·[Button](../button/button/button.md)은 각자 Disabled 변형을 갖고 있지만 **이 조합에서는 쓰지 않습니다.**

### 7-3. ⚠️ 범위를 벗어난 값은 자동 보정합니다 (2026-09-19 디자이너 지시)

> "만약에 100페이지까지 있는데 101, 130 등 입력하면 자동으로 100으로 입력되도록 하자"

- 총페이지 초과 → **마지막 페이지**로 보정
- 0 이하·빈 칸·숫자 아님 → **1**로 보정
- 보정된 값은 **입력칸에도 되돌려 표시**합니다(사용자가 결과를 알 수 있게).
- 에러 문구나 Destructed 상태를 쓰지 않습니다 — 조용히 맞춰 줍니다.
- 구현은 `pagination-logic.ts`의 `clampPage(page, total)`.

## 8. Pagination Group — 셋을 한 줄에

`Per Page` — `Pagination` — `Move to Page`를 `space-between`으로 배치하고 **gap 32px**입니다.

### 8-1. ⚠️ 안 쓰는 칸은 숨깁니다 — 비활성이 아닙니다 (2026-09-19 디자이너 지시)

**`Per Page`와 `Move to Page`에는 Disabled 상태가 아예 없습니다.** 필요 없는 상황에서는 흐리게 만들지 않고 `Show Per Page` / `Show Move to Page`로 **아예 노출하지 않습니다.**

- 대표적인 경우: **폭이 좁아 세 칸을 다 못 보여줄 때.**
- **언제 끄는지는 쓰는 화면이 정합니다.** 컴포넌트가 컨테이너 폭을 재서 자동으로 숨기지 않습니다 — Scroll Bar의 여백과 같은 방식입니다.
- 가운데 `Pagination`(번호 칸·화살표)에는 Disabled가 있습니다(Figma 실측 opacity 40%). 구현의 `disabled` prop도 이 칸에만 걸립니다.

### 8-2. ⚠️ 폭은 컨테이너 100%입니다 (2026-09-19 디자이너 확인)

**Figma는 폭 1080 고정이지만 그건 기준 폭일 뿐**이고, 웹에서는 컨테이너 폭을 따라갑니다.

> 고정 폭 프레임에서는 "어느 쪽이 fill인지"가 드러나지 않습니다 — Navigation Bar Top에서 같은 함정을 겪었습니다(`top.md` 2-1장). **"Figma 실측과 다르다"고 1080으로 되돌리지 마세요.**

- 세 슬롯 중 일부를 꺼도 **`Pagination`은 가운데 자리를 지킵니다** — 양옆 슬롯이 빈 자리를 차지합니다(`Frame 1` 2~4번째 줄).
- 3개의 BOOLEAN 프로퍼티: `Show Per Page` · `Show Move to Page` · `Show Pagination`.
- **gap 32px은 대응 토큰이 없습니다** — 스페이싱 스케일이 24px(`ref-spacing-12`)에서 끝납니다.

## 9. `Frame 1` 사용 예시 (`2292:22294`)

디자이너가 그려 둔 1920×1080 예시 프레임입니다. `Pagination Group` 인스턴스 7개로 구성됩니다.

| 줄 | Show Per Page | Show Pagination | Show Move to Page | 보여주는 것 |
|---|---|---|---|---|
| 1 | ✓ | ✓ | ✓ | 셋 다 |
| 2 | ✓ | ✓ | — | Move to Page 끔 |
| 3 | — | ✓ | ✓ | Per Page 끔 |
| 4 | — | ✓ | — | Pagination만 |
| 5 | ✓ | ✓ | ✓ | 생략 `Rear` (현재 1 / 총 20) |
| 6 | ✓ | ✓ | ✓ | 생략 `Both` (현재 9 / 총 20) |
| 7 | ✓ | ✓ | ✓ | 생략 `Front` (현재 20 / 총 20) |

**`Show Pagination=False` 예시는 없습니다.** 축은 존재하지만 실사용 사례가 그려져 있지 않습니다.

## 10. 인터랙션(모션) 스펙

**정본은 [`docs/INTERACTION.md`](../../docs/INTERACTION.md)입니다.**

전수 집계 결과 **반응 10건** — `Page Numbering` 6건(Contents 3종 × 2) + `Page Direction` 4건(Type 2종 × 2):

| Trigger | 전환 | API duration | 패널 표시값 | easing |
|---|---|---|---|---|
| `ON_HOVER` (Default → Hover) | Smart animate | 0.3125초 | **150ms** | `SLOW` |
| `ON_PRESS` (Hover → Pressed) | Smart animate | 0.1042초 | **50ms** | `SLOW` |

저장소 표준 인터랙션과 동일합니다. CSS 근사는 `cubic-bezier(0.17, 0, 0.19, 1)`.

**조합 4개(`Page Numbering Group`·`Pagination`·`Per Page`·`Move to Page`·`Pagination Group`)에는 반응이 0건**입니다 — 상태는 안에 든 아톰과 재사용 컴포넌트가 담당합니다.

**⚠️ `Selected` 축은 색을 전환하지 않습니다.** 배경이 흰색(98%)↔`neutral/700`(27%)로, 글자가 `neutral/600`(36%)↔흰색(98%)로 **서로 밝기가 뒤집힙니다.** 배경을 크로스페이드하면 중간에 글자와 같은 밝기를 지나가 숫자가 증발합니다 — Chip·Checkbox·Date Cell과 같은 규칙입니다(`docs/INTERACTION.md` 7.3절). Hover/Pressed 오버레이만 전환합니다.

## 11. 접근성

- **⚠️ 포커스 링이 Figma에 없습니다.** State 축에 Focused가 정의되어 있지 않아 구현에서 브랜드색 2px 링을 추가했습니다 — 웹 전용이라 **키보드 이동이 필수**인데 근거가 없는 건 확인이 필요합니다.
- **`···` 칸은 버튼이 아닙니다.** `disabled` + `aria-hidden`으로 처리했습니다 — 스크린리더가 "생략" 칸을 누를 수 있는 것처럼 읽으면 안 됩니다.
- **현재 페이지는 `aria-current="page"`** 로 표시합니다. 색(어두운 배경)만으로 구분하면 WCAG 1.4.1 위반입니다.
- 화살표는 아이콘만 있으므로 `aria-label`("이전 페이지"/"다음 페이지")이 필수입니다.
- **터치 영역 38×38은 44px 권장 기준 미달**입니다 — 웹 전용(마우스·키보드)이라 실무상 문제가 적지만, 태블릿 웹에서는 검토가 필요합니다.
- `Move to Page`의 자동 보정은 **조용히** 일어납니다. 스크린리더 사용자에게는 보정 사실이 전달되지 않으므로, 필요하면 `aria-live`로 "100페이지로 이동했습니다"를 알리는 것을 권장합니다 — Figma에 규정은 없습니다.

## 12. 토큰 매칭 요약

**정확히 일치**
- radius 10px → `ref-radius-05`
- 배경 `common/white-default` → `sys-color-common-white-default`
- 글자·아이콘 `neutral/600` → `sys-color-neutral-600`
- Selected 배경 `neutral/700` → `sys-color-neutral-700`
- Hover/Pressed 오버레이 `color/gray/900-2`·`color/gray/900-5` → `ref-color-gray-900-2` / `-5`
- Disabled `opacity/40` → `ref-opacity-40`
- 글자 `Body 2/14 M`(번호) · `Body 2/14 R`(문구) → `typography-body-2-*`
- `Move to Page` 버튼 `brand/primary-lightest` / `brand/primary-default` → `sys-color-brand-primary-lightest` / `-default`
- 내부 간격 8px·2px·4px → `ref-spacing-06` / `-02` / `-04`

**기존 토큰에 없음**
- 칸 높이 38px · 번호 칸 폭 38/44px · 화살표 20px 아이콘
- `Pagination Group` gap **32px** (스케일이 24px에서 끝남)
- `···` 원 지름 2.5px · 원 사이 gap 3px

**⚠️ Figma에 없는 값 (2026-09-19 디자이너 지시)**
- 생략 전환 경계 `현재 ≤ 5` / `현재 ≥ 총−4` — 현재 좌우에 번호 2개씩 보장 (4-1장)
- `Per Page` 선택지 10 / 20 / 30 / 50 (6-2장)
- `Move to Page` 입력칸 폭 = 24px + 자릿수 × 10px, 최대 4자리 (7-1장)
- `Per Page`·`Move to Page` 에 Disabled 상태 없음 — 필요 없으면 숨김 (6-1·7-2·8-1장)
- `Move to Page` 범위 자동 보정 (7-3장)
- 화살표 자동 비활성 조건 (3-1장)
- `Pagination Group` 폭 100% (8-2장)
- 포커스 링 (11장)

**확인 필요**
- 포커스 링 스타일 — 웹 전용이라 키보드 이동이 필수인데 Figma에 Focused 상태가 없습니다
- `Show Pagination=False` 조합의 실사용 사례 (축은 있으나 `Frame 1`에 예시 없음)
- `Select`·`Select Group` 문서화 — `Per Page`가 이 둘을 필요로 합니다(6-1장)

## 13. 샘플링에 사용한 노드 (부록)

**Page Numbering** (`2287:8217`) — Contents × State

| Contents | Default | Hover | Pressed | Selected | Disabled |
|---|---|---|---|---|---|
| `0 ~ 000` | `2287:8216` | `2287:8214` | `2287:8209` | `2287:8207` | `2287:8206` |
| `0000` | `2287:8213` | `2287:8204` | `2287:8203` | `2287:8212` | `2287:8202` |
| `Abbreviated` | `2287:8215` | `2287:8210` | `2287:8211` | `2287:8205` | `2287:8208` |

**Page Direction** (`2287:8556`) — State × Type

| Type | Default | Hover | Pressed | Disabled |
|---|---|---|---|---|
| Previous | `2287:8557` | `2287:8565` | `2287:8573` | `2287:8589` |
| Next | `2287:8741` | `2287:8743` | `2287:8745` | `2287:8749` |

**Page Numbering Group** (`2287:8450`): `2287:8449`(Stable/None) · `2287:8447`(Rear) · `2287:8448`(Both) · `2287:8446`(Front)

**단일 컴포넌트**: Pagination `2287:8785` · Per Page `2287:8764` · Move to Page `2287:8763` · Pagination Group `2287:13983`

**예시 프레임**: `Frame 1` = `2292:22294`

**⚠️ 상위 그룹 노드 ID는 깨질 수 있습니다.** 문서·코드에서 참조할 때는 그룹(`2733:8561`)이 아니라 **Component Set / Component ID**를 쓰세요. 다른 컴포넌트에서 실제로 그룹 ID가 바뀌어 스펙 10개 파일을 고친 적이 있습니다.
