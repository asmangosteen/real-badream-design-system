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

크기(1.5×20px)와 radius(2px)는 On/Off 공통이며 State에 따라 변하지 않습니다.

## 3. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`2111:7483`, recursive=true)에 호출했으나 `{"nodes":[]}`인 완전히 빈 결과를 반환했습니다. 이름("Blinker")과 On/Off 두 상태 구조로 미루어 실제 프로덕트에서는 두 상태를 일정 주기로 토글하는 깜빡임(blink) 애니메이션이 구현될 것으로 강하게 추정되지만, **Figma 파일 자체에는 duration·easing·반복 주기 등 어떤 모션 값도 정의되어 있지 않습니다.** 임의로 타이밍(예: "500ms", "1s")을 만들어내지 않았습니다 — 실제 구현 시 브라우저의 네이티브 텍스트 커서 깜빡임 주기(일반적으로 OS/브라우저 설정을 따름) 또는 별도 UX 결정이 필요하며, 이는 **확인 필요**입니다.

## 4. 접근성

- 이 아톰은 순수 시각 장식 요소(입력 커서 표시)로, 스크린리더에 별도로 읽힐 필요가 없는 요소로 추정됩니다. 실제 구현 시 `aria-hidden="true"` 처리를 고려할 수 있으나, Figma 파일에 접근성 규정이 명시되어 있지 않아 **확인 필요**입니다.
- 커서 표시는 실제로는 네이티브 `<input>`/`<textarea>`의 브라우저 기본 캐럿을 대체하거나 보강하는 커스텀 요소일 가능성이 높습니다 — 네이티브 캐럿과 병행 사용 시 중복 표시되지 않도록 구현 시 주의가 필요합니다(확인 필요).

## 5. 토큰 매칭 요약

**정확히 일치**
- Radius 2px → `ref-radius-01`
- On 채우기 색상 `brand/primary-default`(#2c7be2) → `sys-color-brand-primary-default`
- Off는 On과 동일 색상 토큰 + alpha 0% (별도 토큰 아님)

**기존 토큰에 없음**
- 크기 1.5 × 20px 자체를 "Text Blinker 크기"로 지정하는 별도 토큰은 저장소에 없는 고정값입니다.

**확인 필요**
- 실제 깜빡임 애니메이션의 duration·easing·반복 주기 (Figma에 모션 데이터 없음 — 4장 참고)
- `aria-hidden` 등 접근성 규정
- 네이티브 브라우저 캐럿과의 중복 방지 처리 방식

## 6. 샘플링에 사용한 노드 (부록, 2개 전수)

`2111:7482`(On) · `2111:7481`(Off)

변수 맵(`get_variable_defs`)은 컴포넌트 셋 `2111:7483`에서 사전 확보한 값을 재사용했으며(`brand/primary-default`, `radius/01`, `common/white-emphasis`), 모션(`get_motion_context`, recursive)은 이 문서 작성 과정에서 컴포넌트 셋 `2111:7483`에 별도로 1회 호출해 빈 결과를 확인했습니다.
