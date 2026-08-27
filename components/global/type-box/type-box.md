# Type Box

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2111-7576) — Component Set `2111:7576` ("Type Box")
> 기계 판독용 값은 [`type-box.json`](./type-box.json)을 함께 참고합니다. 이 문서와 type-box.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/global/`에 위치합니다 — Input/TextField 등 상위 컴포넌트 내부에서 재사용되는 공용 서브 아톰이며, 단독 컴포넌트가 아닙니다. 같은 그룹의 [`Text Blinker`](../text-blinker/text-blinker.md)를 서브컴포넌트로 포함합니다.

## 0. 문서 범위와 샘플링 방법

Type Box는 **Size(S/M/L) × State(Selected/Placeholder/Typing/Done) 2축, 12-변형 컴포넌트 셋**입니다. 12개 노드 전부 `get_design_context`로 개별 실측했습니다.

- `get_variable_defs`는 컴포넌트 셋 전체(`2111:7576`)에 1회 호출한 결과를 재사용했습니다(오케스트레이터가 사전 확보).
- `get_motion_context`를 컴포넌트 셋 전체(`2111:7576`, recursive=true)에 이 문서 작성 과정에서 별도로 1회 호출했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Type Box는 텍스트 입력 필드(Input/TextField 등) 안에서 **사용자가 입력 중이거나 입력한 값의 타이포그래피(글자 스타일·색상)와 커서(caret) 표시를 미리보기하는 아톰**입니다. 실측 결과, Type Box 자체는 테두리·배경·라운드 같은 "필드 프레임" 요소를 전혀 갖지 않고, 오직 텍스트 노드와 `Text Blinker`(캐럿) 서브컴포넌트의 조합으로만 구성되어 있습니다 — 즉 Input 컴포넌트의 프레임(테두리, 배경, 패딩 등) 안에 얹히는 "콘텐츠 레이어"로 추정됩니다.

같은 Figma "global" 그룹에 `Label`, `Text Blinker`, `Text Count`, `Supporting Text` 4개의 형제 아톰이 더 있습니다(다른 에이전트가 병행 조사). 컴포넌트 이름과 배치로 미루어 Type Box는 이들과 함께 실제 Input 컴포넌트 내부에 조합되어 쓰일 것으로 추정되나, **상위 Input 컴포넌트 자체는 이번 조사 범위에 포함되지 않아 정확한 조합 규칙(레이아웃 순서, 위계 등)은 확인하지 않았습니다** — 확인 필요.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L | 타이포그래피 스케일(Caption 1 → Body 2 → Body 1). Input 필드의 크기 변형에 대응하는 것으로 추정 |
| **State** | Selected / Placeholder / Typing / Done | 입력 필드의 포커스 여부 × 값 존재 여부 조합 (2절 참고) |

**State 실측 결과 요약** (3절에서 상세):

| State | 표시 텍스트 | 텍스트 색상 | 캐럿(Text Blinker) | 추정 의미 |
|---|---|---|---|---|
| **Placeholder** | "Placeholder" (플레이스홀더 문구) | `neutral/500` (회색) | 없음 | 비포커스 + 값 없음 |
| **Selected** | "Placeholder" (플레이스홀더 문구, 그대로 회색) | `neutral/500` (회색) | **있음** (텍스트 앞) | 포커스 + 값 없음 (빈 필드에 커서만 깜빡임) |
| **Typing** | "Input Text" (입력된 값) | `neutral/800` (진한 색) | **있음** (텍스트 뒤) | 포커스 + 값 있음 (입력 중) |
| **Done** | "Input Text" (입력된 값) | `neutral/800` (진한 색) | 없음 | 비포커스 + 값 있음 (입력 완료/커밋) |

**핵심 확인 사항**: `Selected` 상태는 텍스트 색상이 바뀌는 것이 아니라 `Placeholder`와 동일하게 회색 플레이스홀더 문구를 유지한 채로 캐럿만 추가된 상태입니다. 즉 State 축은 "텍스트 색상이 바뀌는 것(Placeholder↔Typing/Done)"과 "캐럿이 보이는 것(Selected/Typing↔Placeholder/Done)"이라는 두 개의 독립적인 하위 신호가 조합된 4가지 경우의 수로 보입니다.

> **너비/높이 관련 확인**: 12개 노드의 실측 크기(예: S,Selected=67.5×18px)는 각 변형에 채워진 기본 텍스트("Placeholder" 또는 "Input Text")의 hug-content(내용에 맞춰 늘어나는) 결과값입니다. Divider·Avatar와 달리 Type Box에 고정 너비 토큰은 없으며, 실제 구현 시 입력된 텍스트 길이에 따라 너비가 가변적으로 늘어나는 것이 맞습니다.

## 2. Size별 타이포그래피 스펙 (3개 전체 실측)

| Size | Figma 스타일명 | 폰트 | Weight | 크기(size) | 줄높이(lineHeight) | 자간(letterSpacing) | 단락간격(paragraphSpacing) |
|---|---|---|---|---|---|---|---|
| **S** | Caption 1/12 M | `font/pretendard` (Pretendard) | `weight/500` = Medium | `size/Caption1` = 12px | `lineHeight/Caption1` = 18px | `letterSpacing/Caption` = -0.03px | `paragraphSpacing/Caption1` = 12px |
| **M** | Body 2/14 R | `font/pretendard` (Pretendard) | `weight/400` = Regular | `size/Body2` = 14px | `lineHeight/Body2` = 22px | `letterSpacing/Body` = -0.04px | `paragraphSpacing/Body2` = 14px |
| **L** | Body 1/16 R | `font/pretendard` (Pretendard) | `weight/400` = Regular | `size/Body1` = 16px | `lineHeight/Body1` = 24px | `letterSpacing/Body` = -0.04px | `paragraphSpacing/Body1` = 16px |

**토큰 매칭**: 저장소 `tokens/typography.json`의 `availableWeightsPerStyle` 표와 3개 Size 전부 **정확히 일치**합니다.
- S = `caption1` style + `medium` weight 행(`font-weight-500`, 12px/18px/-0.03px) 정확히 일치
- M = `body2` style + `regular` weight 행(`font-weight-400`, 14px/22px/-0.04px) 정확히 일치
- L = `body1` style + `regular` weight 행(`font-weight-400`, 16px/24px/-0.04px) 정확히 일치

각 Size는 12개 변형 중 State와 무관하게 동일한 타이포 스타일을 씁니다(Placeholder/Selected/Typing/Done 4개 State 모두 같은 폰트 크기·줄높이·자간).

## 3. State별 색상 및 캐럿 스펙 (4개 전체 실측)

| State | 텍스트 색상 (Figma 변수) | Resolved 값 | 캐럿(Text Blinker) 표시 |
|---|---|---|---|
| **Placeholder** | `neutral/500` | `#8c9199` | 없음 |
| **Selected** | `neutral/500` | `#8c9199` | 있음 — `brand/primary-default`(`#2c7be2`), 텍스트 **앞**에 배치 |
| **Typing** | `neutral/800` | `#202837` | 있음 — `brand/primary-default`(`#2c7be2`), 텍스트 **뒤**에 배치 |
| **Done** | `neutral/800` | `#202837` | 없음 |

**토큰 매칭**: 저장소 `tokens/colors.json`의 `system.neutral` 매핑과 **정확히 일치**합니다.
- `neutral/500`(`#8c9199`) → `sys-color-neutral-500`(`ref-color-gray-500`)
- `neutral/800`(`#202837`) → `sys-color-neutral-800`(`ref-color-gray-800`)
- 캐럿 색상 `brand/primary-default`(`#2c7be2`) → `sys-color-brand-primary-default`(`ref-color-blue-500`)

캐럿은 자체 컴포넌트가 아니라 `Text Blinker`(Component Set `2111:7483`, `On` 변형)를 그대로 인스턴스로 가져와 쓴 것이며, 색상·radius 값이 [`text-blinker.md`](../text-blinker/text-blinker.md)에 이미 문서화된 `On` 상태 스펙과 **정확히 일치**합니다.

## 4. Radius/Spacing 요소 설명 (`radius/01`, `spacing/01`, `spacing/02`)

Type Box 자체에는 배경·테두리·선택 하이라이트 같은 별도의 사각형(rect) 요소가 없습니다. 실측 결과 `radius/01`·`spacing/01`·`spacing/02`는 다음 두 곳에만 쓰입니다.

1. **`radius/01`(2px)**: Type Box 자체가 아니라, 내부에 인스턴스로 삽입된 `Text Blinker`(캐럿) 막대 자신의 모서리 radius입니다(`rounded-[2px]`). `text-blinker.md` 2절에 문서화된 값과 동일하며, Type Box 문서에서 새로 발견된 용도는 아닙니다.
2. **`spacing/01`(1px)**: 두 가지 역할을 겸합니다.
   - **(a) 캐럿-텍스트 간 gap**: Type Box 최상위 컨테이너의 flex `gap`이 모든 Size·State에서 `spacing/01`(1px)로 지정되어 있습니다. `Selected`·`Typing`처럼 캐럿과 텍스트가 함께 있는 State에서만 시각적으로 드러나며, `Placeholder`·`Done`처럼 자식이 텍스트 하나뿐인 State에서는 값은 존재하나 효과가 없습니다.
   - **(b) S 사이즈 캐럿의 세로 padding**: `S,Selected`/`S,Typing`에서 캐럿을 감싸는 wrapper의 `py`(상하 padding)가 `spacing/01`(1px)로 지정되어, 행 높이(18px) 대비 캐럿의 시각적 세로 길이를 좌우합니다.
3. **`spacing/02`(2px)**: S를 제외한 **M·L 사이즈 캐럿의 세로 padding**입니다. `M,Selected`/`M,Typing`/`L,Selected`/`L,Typing`에서 캐럿 wrapper의 `py`가 `spacing/02`(2px)로, S보다 한 단계 큰 값이 쓰입니다.

**정리**: 캐럿의 세로 padding은 Size에 따라 `spacing/01`(S, 1px) → `spacing/02`(M·L, 2px)로 커지며, 이는 각 Size의 줄높이(18/22/24px)가 커지는 것과 같은 방향입니다. `spacing/01`은 이와 별개로 모든 Size·State에 공통으로 적용되는 캐럿-텍스트 flex gap이기도 해, 하나의 토큰이 두 가지 역할(S 캐럿 padding + 전 Size 공통 gap)을 겸하는 구조입니다.

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`2111:7576`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Type Box 자체에는 State 전환 애니메이션이 정의되어 있지 않으며, 내부에 삽입된 `Text Blinker`(캐럿) 역시 [별도 문서](../text-blinker/text-blinker.md) 3절에서 이미 확인한 대로 모션 데이터가 없습니다(캐럿의 실제 깜빡임 주기는 두 문서 모두에서 확인 필요로 남아 있습니다).

## 6. 접근성

- Type Box는 순수 "미리보기 텍스트 레이어"로 추정되며, 실제 접근 가능한 입력 요소(`<input>`/`<textarea>`)는 상위 Input 컴포넌트가 담당할 것으로 보입니다. Figma 파일 자체에는 이 레이어의 접근성 역할(예: 네이티브 `<input>`의 값 표시를 그대로 대체하는지, 별도 오버레이인지)이 명시되어 있지 않습니다 — 확인 필요.
- `Placeholder`/`Selected` 상태의 회색 텍스트(`neutral/500`, `#8c9199`)가 실제 플레이스홀더 문구라면, WCAG 명암비 검증이 필요합니다 — 이번 조사에서 수치 검증은 수행하지 않았습니다(확인 필요).
- 캐럿(Text Blinker) 관련 접근성 이슈(`aria-hidden`, 네이티브 캐럿과의 중복 표시 방지)는 [`text-blinker.md`](../text-blinker/text-blinker.md) 4절에서 이미 확인 필요로 명시되어 있으며, Type Box에도 동일하게 적용됩니다.

## 7. 토큰 매칭 요약

**정확히 일치**
- S 타이포 → `caption1` + `medium`(저장소 `tokens/typography.json` 행과 일치)
- M 타이포 → `body2` + `regular`(동일 일치)
- L 타이포 → `body1` + `regular`(동일 일치)
- `Placeholder`/`Selected` 텍스트 색상 `neutral/500`(`#8c9199`) → `sys-color-neutral-500`
- `Typing`/`Done` 텍스트 색상 `neutral/800`(`#202837`) → `sys-color-neutral-800`
- 캐럿 색상 `brand/primary-default`(`#2c7be2`) → `sys-color-brand-primary-default`
- 캐럿 radius 2px → `ref-radius-01`
- 캐럿-텍스트 gap 1px → `ref-spacing-01`
- M·L 캐럿 세로 padding 2px → `ref-spacing-02`
- S 캐럿 세로 padding 1px → `ref-spacing-01`

**기존 토큰에 없음**
- Size(S/M/L)를 특정 타이포 스타일(Caption1/Body2/Body1)에 매핑하는 "Type Box 전용 Size 스케일" 자체는 저장소에 별도 시맨틱 토큰으로 존재하지 않습니다(각 스타일 값 자체는 토큰과 일치하나, "Input Size S=Caption1을 쓴다"는 매핑 규칙은 문서화되어 있지 않음).
- 12개 변형의 실측 너비/높이(예: 67.5×18px)는 hug-content 결과값이며 고정 토큰이 아닙니다(1절 참고).

**확인 필요**
- 상위 Input 컴포넌트와의 정확한 조합/레이아웃 규칙 (이번 조사 범위 밖)
- Type Box 레이어의 접근성 역할(네이티브 `<input>`과의 관계)
- `Placeholder`/`Selected` 회색 텍스트의 WCAG 명암비 수치
- 캐럿 깜빡임 애니메이션의 duration/easing/반복 주기 (Figma에 모션 데이터 없음, `text-blinker.md`와 동일)

## 8. 샘플링에 사용한 노드 (부록, 12개 전수)

| Size | Selected | Placeholder | Typing | Done |
|---|---|---|---|---|
| **S** | `2111:7568` (67.5×18) | `2111:7575` (65×18) | `2111:7574` (57.5×18) | `2111:7571` (55×18) |
| **M** | `2111:7570` (76.5×22) | `2111:7569` (74×22) | `2111:7573` (64.5×22) | `2111:7572` (62×22) |
| **L** | `2111:7566` (87.5×24) | `2111:7565` (85×24) | `2111:7567` (73.5×24) | `2111:7564` (71×24) |

전체 변수 맵(`get_variable_defs`)은 컴포넌트 셋 `2111:7576`에서 사전 확보한 값을 재사용했으며, 모션(`get_motion_context`, recursive)은 이 문서 작성 과정에서 컴포넌트 셋 `2111:7576`에 별도로 1회 호출해 빈 결과를 확인했습니다.
