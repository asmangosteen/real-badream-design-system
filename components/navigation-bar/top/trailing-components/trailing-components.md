# Trailing Components

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2551-10163) — Frame `2551:10163`, Figma 레이어명 `_Trailing Components` (밑줄 접두 — 아토믹 디자인 목적의 내부 서브 아톰 표기, Segmented Control Item의 `_Item`과 동일 컨벤션)
> 기계 판독용 값은 [`trailing-components.json`](./trailing-components.json)을 함께 참고합니다. 이 문서와 trailing-components.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/top/`에 위치합니다 — [Trailing](../trailing/trailing.md)이 이 컴포넌트를 1~3회 인스턴스로 조합해 만들어지는 최하위 서브 아톰입니다.

## 0. 문서 범위와 샘플링 방법

Trailing Components(`_Trailing Components`)는 **Type(Icon/Button) × Mode(Light/Dark) 2축, 4-변형 컴포넌트**로 완전 직교(2×2=4)입니다. `get_metadata`로 4개 심볼을 전수 확인한 뒤, `get_design_context`를 최상위 프레임(`2551:10163`)에 1회 호출해 4개 변형 전체가 병합 코드로 반환된 것을 실측했습니다.

- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2555:16790`, Navigation Bar 전체)에서 확보한 값을 재사용했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Trailing Components는 Navigation Bar 우측에 반복 배치되는 **개별 액션 아이템**(아이콘 버튼 또는 텍스트 버튼) 1개입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Icon / Button | Icon=아이콘 전용 버튼, Button=텍스트 버튼("Button" 라벨) |
| **Mode** | Light / Dark | 밝은/어두운 배경에 맞춘 아이콘 색상(Button 텍스트는 Mode 무관, 3장 참고) |

## 2. Type별 스펙 (4개 전수 실측)

| Type | 레이아웃 | 내용 |
|---|---|---|
| **Icon** | `items-center justify-center py=spacing/04`(4px), 내부 "Icon Button" 래퍼 `p=spacing/06`(8px) `radius/06`(12px) | `Icon / Default / 24px / plus`(24px) — 플레이스홀더 글리프, 실제 사용 시 자유 교체 슬롯으로 추정 |
| **Button** | `flex-col items-start py=spacing/08`(12px), 내부 "Text Button" 래퍼 `w=64px` | "Button" 텍스트, `text-right` 정렬 |

## 3. 서브컴포넌트 재사용 관계 — Button 타입은 Text Button 재사용

**핵심 발견**: Type=Button의 내부 "Text Button" 래퍼는 이미 문서화된 [Text Button](../../../button/text-button/text-button.md) 컴포넌트를 **Size=XL, Text Color=Blue, State=Default, Contents=Text**로 그대로 인스턴스화한 것입니다. 실측 타이포(`font/pretendard`, `weight/500` Medium, `size/Subtitle`=18px, `lineHeight/Subtitle`=24px, `letterSpacing/Subtitle`=-0.09px)와 색상(`brand/primary-default`=#2c7be2)이 Text Button 문서의 Size=XL·Text Color=Blue·State=Default 스펙과 **정확히 일치**합니다.

- Mode=Dark에서도 Button 타입의 텍스트 색상이 별도로 바뀌지 않고 `brand/primary-default`(파란색) 그대로입니다 — 어두운 배경 위에서도 브랜드 블루가 색 대비를 유지할 수 있다는 전제로 보입니다(확인 필요, WCAG 명암비 미검증).
- Type=Icon의 아이콘만 Light/Dark 별도 SVG 에셋을 씁니다(Button 텍스트는 Mode 영향 없음).

## 4. Mode별 아이콘 (Icon 타입 한정, 2개 전수 실측)

| Mode | 아이콘 |
|---|---|
| **Light** | `plus` 기본 SVG 에셋 |
| **Dark** | `plus` **별도 다크 SVG 에셋**(색반전 아님) |

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Navigation Bar 상위 그룹(`2555:16790`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다 — Navigation Bar/Top 전 문서에서 재사용합니다.

## 6. 접근성

- Icon 타입은 아이콘 전용 버튼으로 `aria-label` 연결 규정이 Figma 파일에 없습니다 — 확인 필요.
- Button 타입이 재사용하는 Text Button의 접근성 요구사항([text-button.md](../../../button/text-button/text-button.md) 7장)이 그대로 적용됩니다.
- Dark 배경 위 Button(브랜드 블루) 텍스트의 WCAG 명암비 수치 검증 미실시 — 확인 필요.

## 7. 토큰 매칭 요약

**정확히 일치**
- Icon 래퍼: `spacing/04`=4px, `spacing/06`=8px, `radius/06`=12px 전부 `ref-spacing-*`/`ref-radius-06`과 일치
- Button 래퍼: `spacing/08`=12px → `ref-spacing-08`
- Button 텍스트: Text Button(Size=XL, Text Color=Blue, State=Default) 스펙과 정확히 일치([text-button.md](../../../button/text-button/text-button.md) 참고)

**기존 토큰에 없음**
- Button 너비 64px(hug-content 기반 고정값으로 보임) — 별도 토큰 없음

**확인 필요**
- Dark 배경 위 브랜드 블루 Button 텍스트의 WCAG 명암비
- 아이콘 전용 버튼 `aria-label` 연결 규정
- Icon 타입의 `plus` 아이콘이 고정 글리프인지 자유 교체 슬롯인지

## 8. 샘플링에 사용한 4개 노드 (부록, 전수)

| Type＼Mode | Light | Dark |
|---|---|---|
| **Icon** | `2551:10162` | `2555:12410` |
| **Button** | `2551:10160` | `2555:12412` |

4개 변형 전체가 `get_design_context` 1회 호출(`2551:10163`)로 병합 코드로 반환되었습니다. `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2555:16790`)에서 공용으로 확보했습니다.
