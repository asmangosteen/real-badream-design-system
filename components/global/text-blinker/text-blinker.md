# Text Blinker

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2111-7483) — Component Set `2111:7483` ("Text Blinker")
> 기계 판독용 값은 [`text-blinker.json`](./text-blinker.json)을 함께 참고합니다. 이 문서와 text-blinker.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/global/`에 위치합니다 — Input/TextField 등 상위 컴포넌트 내부에서 재사용되는 공용 서브 아톰이며, 단독 컴포넌트가 아닙니다(상세: `components/README.md` "components/global/이란" 절 참고).

## 0. 문서 범위와 샘플링 방법

Text Blinker는 **State 축 하나만 가진 2-변형 컴포넌트 셋**입니다(`On` / `Off`). 2개 노드 전부 `get_design_context`로 개별 실측했고, `get_variable_defs`는 컴포넌트 셋 전체에 1회 호출한 결과를 재사용했습니다(오케스트레이터가 사전 확보). `get_motion_context`는 컴포넌트 셋(`2111:7483`, recursive=true)에 이 문서 작성 과정에서 별도로 1회 호출했습니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.
- **Size/Type/Theme 축이 없습니다** — On/Off 두 상태만 존재하는 가장 단순한 축 구조입니다.

## 1. 컴포넌트 개요

Text Blinker는 텍스트 입력 필드(Input/TextField/TextArea 등) 안에서 커서 위치를 표시하는 얇은 세로 막대(caret)입니다. 이름과 형태로 보아 텍스트 입력 시 깜빡이는(blink) 커서를 시각적으로 나타내는 용도로 추정되나, 실제 깜빡임 애니메이션이 Figma 파일에 정의되어 있는지는 4장에서 별도로 확인했습니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **State** | On / Off | 커서가 보이는 상태(On) / 보이지 않는 상태(Off). 깜빡임 애니메이션의 두 프레임에 해당하는 것으로 추정 |

## 2. State별 스펙 (2개 전체 실측)

| State | 노드 | 크기 | Radius | 채우기 색상 |
|---|---|---|---|---|
| **On** | `2111:7482` | 1.5 × 20px | `radius/01` = 2px (`ref-radius-01`) | `brand/primary-default` = `#2c7be2` (불투명, 100%) |
| **Off** | `2111:7481` | 1.5 × 20px | `radius/01` = 2px (`ref-radius-01`) | `rgba(44, 123, 226, 0)` — **동일 색상이나 alpha 0%** |

**핵심 확인 사항 (Off가 "다른 색"인지 "투명"인지)**: `get_design_context` 실측 결과, Off 상태는 별도의 회색·연한 색이 **아니라** On과 정확히 동일한 `brand/primary-default`(#2c7be2) 색상에서 **alpha 값만 0%로 낮춘 것**입니다(`rgba(44,123,226,0)`). 즉 Off는 완전히 투명하여 눈에 보이지 않습니다 — 이는 Figma 컴포넌트 구조 자체가 "커서가 꺼진 프레임"을 색상으로 표현한 것으로, 실제 구현 시 `opacity: 0` 또는 `background: transparent` 두 방식 모두 동일한 시각 결과를 냅니다.

**후속 확인(추가 조사): 채우기 색상이 상위 컴포넌트에서 오버라이드됨**. 이 문서는 On 채우기 색상을 `brand/primary-default` 고정으로 실측했지만, 실제 사용처인 [Text Input](../../text-input/text-input/text-input.md)에서는 State=Selected/Typing이면서 Destructed=True(에러)일 때 캐럿 색상이 `theme/destructed-default`(#e72f37)로 바뀝니다. Text Blinker 컴포넌트 자체의 변형 축에는 없는 값이며, 상위 컴포넌트가 인스턴스 색상을 상황에 맞게 오버라이드해 쓰는 사례입니다 — [text-input.md](../../text-input/text-input/text-input.md) 3장·5장 참고.

크기(1.5×20px)와 radius(2px)는 On/Off 공통이며 State에 따라 변하지 않습니다.

> **2026-09-14 추가 — 높이는 상위 컴포넌트에서 리사이즈됩니다.** 이 컴포넌트 자체의 기본 높이는 20px 이지만, [Type Box](../type-box/type-box.md)는 **각 Size 의 lineHeight 에 맞춰 인스턴스를 리사이즈**해 씁니다. 20px 을 고정값으로 구현하면 Size=S 에서 캐럿이 줄 높이(18px)보다 커져 밖으로 삐져나옵니다.
>
> | Type Box Size | 줄 높이 | 캐럿 래퍼 | **캐럿 인스턴스 높이** | 위 오프셋 |
> |---|---|---|---|---|
> | S | 18px | 1.5×18 | **16px** | 1px |
> | M | 22px | 1.5×22 | **18px** | 2px |
> | L | 24px | 1.5×24 | **20px** | 2px |
>
> 래퍼 프레임은 줄 높이만큼이고 그 안에서 캐럿이 세로 중앙에 놓입니다. 너비 1.5px 와 radius 2px 는 세 Size 공통입니다. `Selected`(캐럿이 앞) · `Typing`(캐럿이 뒤) 6개 조합 전수 실측했습니다 — 노드 `2111:7568/7570/7566`(Selected) · `2111:7574/7573/7567`(Typing).

## 3. 인터랙션(모션) 스펙

**반응 2건 — 한 주기 700ms 페이드.** 정본은 [`docs/INTERACTION.md`](../../../docs/INTERACTION.md)입니다.

> **2026-09-15 정정 — 깜빡임 값은 Figma에 정의되어 있습니다.**
> 아래 단락은 `get_motion_context`의 빈 결과만 보고 "모션 값 없음"으로 단정했으나 사실과 다릅니다.
> `get_motion_context`는 **키프레임 애니메이션**만 읽습니다. 이 컴포넌트의 깜빡임은 키프레임이 아니라
> **프로토타입 반응(`node.reactions`)** 으로 걸려 있어서 그 도구로는 보이지 않았을 뿐입니다.
> Plugin API(`use_figma`)로 두 변형의 `reactions`를 직접 읽은 실측값은 다음과 같습니다.
>
> | From | Trigger | To | Animation | Easing | Duration |
> |---|---|---|---|---|---|
> | `State=On` (`2111:7482`) | After delay **200ms** | `State=Off` | Smart animate | Ease in and out | **150ms** |
> | `State=Off` (`2111:7481`) | After delay **200ms** | `State=On` | Smart animate | Ease in and out | **150ms** |
>
> 따라서 한 주기 = (200 유지 + 150 전환) × 2 = **700ms**이고, 껐다 켰다 하는 계단(step)이 아니라
> **부드럽게 사라졌다 나타나는 페이드**입니다. 스토리북 구현(`storybook/src/components/TextBlinker/TextBlinker.css`)은
> 이 값을 그대로 옮겼습니다.
>
> 교훈: **모션을 확인할 때 `get_motion_context`만으로 "없음"을 결론짓지 말 것.** 변형 사이의 전환은
> 프로토타입 반응에 들어 있고, 이는 `use_figma`로 `node.reactions`를 읽어야 보입니다.

~~`get_motion_context`를 컴포넌트 셋 전체(`2111:7483`, recursive=true)에 호출했으나 `{"nodes":[]}`인 완전히 빈 결과를 반환했습니다. 이름("Blinker")과 On/Off 두 상태 구조로 미루어 실제 프로덕트에서는 두 상태를 일정 주기로 토글하는 깜빡임(blink) 애니메이션이 구현될 것으로 강하게 추정되지만, **Figma 파일 자체에는 duration·easing·반복 주기 등 어떤 모션 값도 정의되어 있지 않습니다.**~~ (위 정정 참고)

## 4. 접근성

- 이 아톰은 순수 시각 장식 요소(입력 커서 표시)로, 스크린리더에 별도로 읽힐 필요가 없는 요소로 추정됩니다. 실제 구현 시 `aria-hidden="true"` 처리를 고려할 수 있으나, Figma 파일에 접근성 규정이 명시되어 있지 않아 **확인 필요**입니다.
- 커서 표시는 실제로는 네이티브 `<input>`/`<textarea>`의 브라우저 기본 캐럿을 대체하거나 보강하는 커스텀 요소일 가능성이 높습니다 — 네이티브 캐럿과 병행 사용 시 중복 표시되지 않도록 구현 시 주의가 필요합니다(확인 필요).

## 5. 토큰 매칭 요약

**정확히 일치**
- Radius 2px → `ref-radius-01`
- On 채우기 색상 `brand/primary-default`(#2c7be2) → `sys-color-brand-primary-default`
- Off는 On과 동일 색상 토큰 + alpha 0% (별도 토큰 아님)

**기존 토큰에 없음**
- 너비 1.5px 자체를 "Text Blinker 크기"로 지정하는 별도 토큰은 저장소에 없는 고정값입니다.
- 높이도 토큰이 아니며, 컴포넌트 기본값 20px + 상위(Type Box)에서의 Size 별 리사이즈(16/18/20px)로 결정됩니다(2장).

**확인 필요**
- ~~실제 깜빡임 애니메이션의 duration·easing·반복 주기 (Figma에 모션 데이터 없음 — 4장 참고)~~ → **2026-09-15 해소.** 프로토타입 반응에 200ms 유지 + 150ms Ease in and out 전환(한 주기 700ms)으로 정의되어 있습니다. 4장 정정 참고.
- `aria-hidden` 등 접근성 규정
- 네이티브 브라우저 캐럿과의 중복 방지 처리 방식

## 6. 샘플링에 사용한 노드 (부록, 2개 전수)

`2111:7482`(On) · `2111:7481`(Off)

변수 맵(`get_variable_defs`)은 컴포넌트 셋 `2111:7483`에서 사전 확보한 값을 재사용했으며(`brand/primary-default`, `radius/01`, `common/white-emphasis`), 모션(`get_motion_context`, recursive)은 이 문서 작성 과정에서 컴포넌트 셋 `2111:7483`에 별도로 1회 호출해 빈 결과를 확인했습니다.
