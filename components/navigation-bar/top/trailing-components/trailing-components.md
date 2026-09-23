# Trailing Components

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2551-10163) — Frame `2551:10163`, Figma 레이어명 `_Trailing Components` (밑줄 접두 — 아토믹 디자인 목적의 내부 서브 아톰 표기, Segmented Control Item의 `_Item`과 동일 컨벤션)
> 기계 판독용 값은 [`trailing-components.json`](./trailing-components.json)을 함께 참고합니다. 이 문서와 trailing-components.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/top/`에 위치합니다 — [Trailing](../trailing/trailing.md)이 이 컴포넌트를 1~3회 인스턴스로 조합해 만들어지는 최하위 서브 아톰입니다.

## 0. 문서 범위와 샘플링 방법

Trailing Components(`_Trailing Components`)는 **Type(Icon/Button) × Mode(Light/Dark) 2축, 4-변형 컴포넌트**로 완전 직교(2×2=4)입니다. `get_metadata`로 4개 심볼을 전수 확인한 뒤, `get_design_context`를 최상위 프레임(`2551:10163`)에 1회 호출해 4개 변형 전체가 병합 코드로 반환된 것을 실측했습니다.

- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2612:16631`, Navigation Bar 전체)에서 확보한 값을 재사용했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Trailing Components는 Navigation Bar 우측에 반복 배치되는 **개별 액션 아이템**(아이콘 버튼 또는 텍스트 버튼) 1개입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Icon / Button | Icon=아이콘 전용 버튼, Button=텍스트 버튼("Button" 라벨) |
| **Mode** | Light / Dark | 밝은/어두운 배경에 맞춘 아이콘 색상(Button 텍스트는 Mode 무관, 3장 참고) |

## 2. Type별 스펙 (4개 전수 실측)

| Type | 바깥 프레임 | 안에 들어가는 **인스턴스** |
|---|---|---|
| **Icon** | 40×48 · `items-center justify-center py=spacing/04`(4px) | [**Icon Button**](../../../button/icon-button/icon-button.md) `Size=L · Type=Ghost · State=Default · Icon Color=Black · Stroke=False · Bold Stroke=False` (40×40 · `p=spacing/06`8px · `radius/06`12px · `plus` 24px) |
| **Button** | 높이 48 · `flex-col items-start py=spacing/08`(12px) · **폭 hug** | [**Text Button**](../../../button/text-button/text-button.md) `Size=XL · Text Color=Blue · State=Default · Contents=Text` (Figma 샘플은 64px 고정이지만 구현은 hug — 아래 참고) |

**정정(2026-09-15 재실측) — Icon 타입의 내부는 "래퍼"가 아니라 Icon Button 인스턴스입니다.** 예전 판이 `p=8px · radius=12px`인 이름만 "Icon Button"인 프레임처럼 적어 두어, 구현이 두 버튼을 **흉내만 내고 hover/pressed 피드백을 통째로 빠뜨리고** 있었습니다. `node.type === 'INSTANCE'` + `getMainComponentAsync()`로 확인하면 `Icon Button / Size=L, Type=Ghost, State=Default, Icon Color=Black, Stroke=False, Bold Stroke=False`가 나옵니다. 따라서 **Icon Button·Text Button의 상태·인터랙션이 그대로 적용됩니다**(5장).

## 3. 서브컴포넌트 재사용 관계 — 두 Type 모두 기존 버튼 재사용

**핵심 발견**: Type=Button의 내부 "Text Button"은 이미 문서화된 [Text Button](../../../button/text-button/text-button.md) 컴포넌트를 **Size=XL, Text Color=Blue, State=Default, Contents=Text**로 그대로 인스턴스화한 것입니다. 실측 타이포(`font/pretendard`, `weight/500` Medium, `size/Subtitle`=18px, `lineHeight/Subtitle`=24px, `letterSpacing/Subtitle`=-0.09px)와 색상(`brand/primary-default`=#2c7be2)이 Text Button 문서의 Size=XL·Text Color=Blue·State=Default 스펙과 **정확히 일치**합니다.

- Mode=Dark에서도 Button 타입의 텍스트 색상이 별도로 바뀌지 않고 `brand/primary-default`(파란색) 그대로입니다 — 어두운 배경 위에서도 브랜드 블루가 색 대비를 유지할 수 있다는 전제로 보입니다(확인 필요, WCAG 명암비 미검증).
- Type=Icon의 아이콘만 Mode에 따라 색이 바뀝니다(Button 텍스트는 Mode 영향 없음).

## 4. Mode별 아이콘 (Icon 타입 한정, 2개 전수 실측)

| Mode | 아이콘 색 |
|---|---|
| **Light** | `neutral/800`(#202837) — Icon Button `Ghost · Black`의 **기본값**(벡터 fill이 `neutral/800` 변수에 바인딩) |
| **Dark** | `common/white-default`(#fdfdfd) — Icon Button 기본값이 아니라 **인스턴스 오버라이드** |

**정정(2026-09-15 재실측)** — 예전 판의 "별도 다크 SVG 에셋"은 사실과 다릅니다. 파일은 하나이고 벡터의 채우기 색만 바뀝니다. Dark 값은 Icon Button 원본의 기본값이 아니라 Navigation Bar 쪽 인스턴스 오버라이드이므로, 구현에서도 **Icon Button의 Ghost 기본색을 Nav CSS에서만 덮어쓰는 방식**이어야 합니다(Calendar Header가 `neutral/600`을 덮어쓰는 것과 같은 패턴).

## 5. 인터랙션(모션) 스펙

**이 컴포넌트 셋 자체에는 반응이 없지만, 안에 든 두 버튼의 인터랙션이 그대로 살아 있습니다.**

- **Icon**: Icon Button `Ghost`의 오버레이 — Hover `interaction/light-gray/hover`(`gray-900` 5%) · Pressed `interaction/light-gray/pressed`(10%). 전환은 Hover 150ms · Pressed 50ms, easing은 Figma `Slow`([`docs/INTERACTION.md`](../../../../docs/INTERACTION.md)).
- **Button**: Text Button `Blue`의 텍스트 색 합성 — `#2c7be2` → `#276fcd`(hover) → `#2364b8`(pressed).

**⚠️ Dark에서는 Icon의 hover/pressed가 사실상 보이지 않습니다.** 오버레이가 검정 5%/10%라 어두운 배경에서 변화가 거의 없습니다. Figma에 Navigation Bar 전용 다크 hover 정의가 없어 **원본 그대로 두기로 했습니다**(디자이너 확인, 2026-09-15).

> ⚠️ `get_motion_context`는 키프레임 애니메이션만 읽습니다. 예전 판의 "모션 데이터 없음"은 이 도구만 보고 내린 잘못된 결론이었습니다 — 변형 사이 전환은 `node.reactions`에 있습니다.

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
- Button 너비는 **hug**(토큰 아님). ⚠️ **폭은 내용에 맞춰 hug 합니다**(2026-09-15 디자이너 확인 — 앞서 "고정 폭"으로 정했던 것을 이 항목만 정정). Figma 인스턴스는 64px로 고정돼 있지만 실제로는 버튼이 들어가면 그 자리가 글자 폭만큼만 차지합니다. 라벨은 두 글자를 넘는 일이 거의 없어(완료·저장·편집…) 줄바꿈 대비는 두지 않습니다 — Text Button 자체가 `white-space: nowrap`입니다. 예: "완료" = 약 31px, 그래서 Icon+Button 조합의 Trailing 폭은 40+31+12 = 83px입니다.

**확인 완료(2026-09-15)**
- Icon·Button 모두 **기존 버튼 컴포넌트의 인스턴스**이며 상태·인터랙션을 그대로 갖는다(2·3·5장)
- Dark의 아이콘 흰색은 인스턴스 오버라이드, hover/pressed 오버레이는 Light와 동일하게 유지(4·5장, 디자이너 확인)

**확인 필요**
- Dark 배경 위 브랜드 블루 Button 텍스트의 WCAG 명암비
- 아이콘 전용 버튼 `aria-label` 연결 규정
- Icon 타입의 `plus` 아이콘이 고정 글리프인지 자유 교체 슬롯인지

## 8. 샘플링에 사용한 4개 노드 (부록, 전수)

| Type＼Mode | Light | Dark |
|---|---|---|
| **Icon** | `2551:10162` | `2555:12410` |
| **Button** | `2551:10160` | `2555:12412` |

4개 변형 전체가 `get_design_context` 1회 호출(`2551:10163`)로 병합 코드로 반환되었습니다. `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2612:16631`)에서 공용으로 확보했습니다.

## Corner Smoothing (2026-09-23 추가)

바드림 디자인시스템은 모든 Radius 에 **Corner Smoothing 60%** 를 함께 씁니다(`docs/DESIGN.md` 9.2). 이 컴포넌트는 자기 모서리가 없고, 안에 든 컴포넌트가 각자 Corner Smoothing 을 적용합니다. 이 문서에서 따로 구현한 것은 없습니다.

Figma 실측: 2026-09-23 Figma Plugin API `cornerSmoothing` 전수 조회(컴포넌트 셋 안의 모든 노드).

| 레이어 | Radius | Figma Smoothing | 구현 |
|---|---|---|---|
| Icon Button 인스턴스 | 12px | 60% | 적용 (Icon Button) |
