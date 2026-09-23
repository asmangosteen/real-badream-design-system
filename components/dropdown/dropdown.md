# Dropdown

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2292-6651) — Frame `2292:6651` ("Dropdown")
> 기계 판독용 값은 [`dropdown.json`](./dropdown.json)을 함께 참고합니다. 이 문서와 dropdown.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Dropdown은 **Size(S/M/L) × State(Default/Hover/Selected/Disabled/Done) × Destructed(False/True, Selected 전용) × Show Button(False/True) × Show Label(False/True) × Supporting Text(False/True) × Left Icon(False/True) 총 7개 축, 288개 인스턴스**로 구성된 컴포넌트입니다. Button(935개)만큼은 아니지만 Supporting Text(36개)보다 훨씬 큰 규모이므로, 축별 전략적 샘플링으로 진행했습니다.

- `get_metadata`로 288개 인스턴스 전체의 레이어명·크기를 먼저 확보해 축 구조를 파악했습니다(정규식 파싱으로 각 축의 가능한 값과 조합 규칙을 도출).
- 그 결과를 바탕으로 **총 13개 노드**를 `get_design_context`로 개별 실측했습니다:
  1. **Size 축 3종**(M 기준 baseline, 나머지 축 전부 True 고정): S(`2292:6659`) · M(`2292:7119`) · L(`2292:7601`)
  2. **State 축 5종 + Destructed**(Size=M, 나머지 축 전부 True 고정): Default(`2292:7119`, 위와 중복) · Hover(`2292:7213`) · Selected/Destructed=False(`2292:7243`) · Selected/Destructed=True(`2292:7252`) · Disabled(`2292:7183`) · Done(`2292:7150`)
  3. **토글 축 4종**(Size=M, State=Default 고정, 한 축씩 False로): Show Button=False(`2292:7112`) · Left Icon=False(`2292:7366`) · Show Label=False만(`2292:9156`) · Supporting Text=False만(`2292:9884`) · 4개 전부 False(`2292:9568`)
- `get_variable_defs`는 대표 노드 5개(S/M/L 각 1회 + Disabled 1회)에서 호출해 확보했습니다.
- `get_motion_context`는 최상위 프레임(`2292:6651`)에 1회 호출했으며 빈 결과였습니다. **다만 이건 모션이 없다는 뜻이 아니었습니다** — 6장 참고(2026-09-15 정정).
- 나머지 275개(미실측)는 위 축들이 서로 독립적으로 조합된다는 규칙(Button/Supporting Text 문서와 동일한 방법론)에 따라 값이 예측 가능하지만, 개별 실측하지 않은 조합에 새 토큰명을 만들지는 않았습니다.

## 1. 컴포넌트 개요

Dropdown은 텍스트 입력 필드(Input) 형태를 하고 있지만 클릭 시 선택지 목록을 펼치는 **선택형 입력 컴포넌트**입니다. `components/global/`의 [Label](../global/label/label.md), [Type Box](../global/type-box/type-box.md), [Supporting Text](../global/supporting-text/supporting-text.md) 세 서브 아톰을 그대로 인스턴스로 조합해서 만들어져 있으며, 오른쪽에 별도의 확정/액션 버튼(`Button`, primary 색상)이 붙는다는 점이 Input류 컴포넌트와 다릅니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L | 필드 크기 단계(패딩·타이포·아이콘 크기·radius 스케일) |
| **State** | Default / Hover / Selected / Disabled / Done | 상호작용 상태. Selected=드롭다운이 열린 상태, Done=값이 선택되어 닫힌 상태(3장) |
| **Destructed** | False / True | 에러 상태 표시. **실측 결과 Selected 상태에서만 별도 Figma 변형으로 존재**(다른 State에는 Destructed=True 조합 자체가 없음 — 3장 참고) |
| **Show Button** | False / True | 우측 확정 버튼(파란 배경 "Text" 버튼) 표시 여부 |
| **Show Label** | False / True | 상단 [Label](../global/label/label.md) 표시 여부 |
| **Supporting Text** | False / True | 하단 [Supporting Text](../global/supporting-text/supporting-text.md) 표시 여부 |
| **Left Icon** | False / True | Input 왼쪽 아이콘(기본 `profile_filled`, 자유 교체 슬롯) 표시 여부 |

## 2. Size별 스펙 (3개 전체 실측)

| 요소 | S | M | L |
|---|---|---|---|
| **Input 컨테이너** | radius `radius/05`=10px, border `borderwidth/02`=1px, padding px `spacing/07`=10px / py `spacing/05`=6px, 내부 gap `spacing/06`=8px | radius `radius/05`=10px, border 1px, padding px `spacing/08`=12px / py `spacing/06`=8px, 내부 gap `spacing/06`=8px | radius `radius/06`=12px, border 1px, padding px `spacing/09`=14px / py `spacing/08`=12px, 내부 gap `spacing/07`=10px |
| **Input-Button 사이 gap** | `spacing/04`=4px | `spacing/05`=6px | `spacing/06`=8px |
| **좌측 아이콘 크기** | 16px | 16px | **20px** |
| **Chevron 아이콘 크기** | 16px | 16px | **20px** |
| **Button 패딩** | px `spacing/06`=8px / py `spacing/04`=4px | px `spacing/08`=12px / py `spacing/06`=8px | px `spacing/10`=16px / py `spacing/08`=12px |
| **Button radius** | `radius/05`=10px | `radius/05`=10px | `radius/06`=12px(Input과 동일) |
| **Button 텍스트** | Body2/14 Medium | Body2/14 Medium | Body1/16 Medium |
| **Label 하단 padding** | `spacing/02`=2px | `spacing/04`=4px | `spacing/05`=6px |
| **Label 타이포** | Caption1/12 SemiBold | Caption1/12 SemiBold | Body2/14 Medium |
| **TypeBox(placeholder) 타이포** | Caption1/12 Medium | Body2/14 Regular | Body1/16 Regular |
| **Supporting Text 아이콘/타이포** | 12px 아이콘, Caption2/10 Medium | 16px 아이콘, Caption1/12 Regular | 16px 아이콘, Caption1/12 Regular |
| **컨테이너 전체 높이(baseline, 전 축 True)** | 70px | 82px | 100px |

**핵심 확인**: Label/TypeBox/Supporting Text의 Size별 타이포·패딩 값은 각 서브컴포넌트 문서([label.md](../global/label/label.md) 2장, [type-box.md](../global/type-box/type-box.md) 2장, [supporting-text.md](../global/supporting-text/supporting-text.md) 3장)에 실측된 값과 **정확히 일치**합니다 — Dropdown은 이 세 아톰을 Size만 맞춰 그대로 인스턴스로 가져다 쓰고 있습니다.

**너비**: 컴포넌트 루트에 `w-[280px]`가 걸려 있지만, 이는 Figma 진열 프레임에서 샘플링할 때 찍힌 고정폭일 뿐 실제 의도는 **화면 폭에 따른 가변(fluid) 너비**입니다(확인 완료). 구현 시 `width: 100%`(또는 부모 컨테이너 기준 fluid)로 처리합니다.

## 3. State별 스펙 (5개 + Destructed 실측, Size=M 기준)

| State | Input 배경 | Input 테두리 | Button 배경 | TypeBox 표시 | Chevron | 기타 |
|---|---|---|---|---|---|---|
| **Default** | `common/white-default`(#fdfdfd) | `color/gray/900-10`(rgba(3,9,26,0.1)) | `brand/primary-default`(#2c7be2) | Placeholder(회색, `neutral/500`) | `chevron_down` | — |
| **Hover** | 동일 | `color/gray/900-20`(rgba(3,9,26,0.2)) — **Default보다 진한 테두리** | 동일 | Placeholder | `chevron_down` | 루트에 `cursor-pointer` 클래스 |
| **Selected**(열림) | 동일 | `brand/primary-default`(#2c7be2) | `brand/primary-default`(변화 없음) | 값 채워짐(진한 색, `neutral/800`) | **`chevron_up`**(방향 반전) | — |
| **Selected + Destructed=True**(열림+에러) | 동일 | `theme/destructed-default`(#e72f37) | **`theme/destructed-default`**(#e72f37로 변경) | 값 채워짐(`neutral/800`) | `chevron_up` | — |
| **Disabled** | `color/gray/900-5`(rgba(3,9,26,0.05)) — **테두리 없음, 채움만** | 없음 | `brand/primary-default` + `opacity/20`(0.2) 적용 | Placeholder, 색상 `neutral/400`(더 옅음) | `chevron_down` | Label 텍스트 색상도 `neutral/500`으로 dim |
| **Done**(닫힘, 값 선택됨) | `common/white-default` | `color/gray/900-10`(Default와 동일) | `brand/primary-default` | 값 채워짐(`neutral/800`) | `chevron_down`(**반전 없음** — 닫힌 상태이므로) | — |

### 3.1 좌·우 아이콘 색 (2026-09-15 신규 실측)

**이전 판에는 이 값이 아예 없었습니다.** 표에 Chevron의 *방향*은 적혀 있었지만 *색*이 없어,
구현이 아이콘을 상자 글자색(`neutral/800`)에 그대로 맡겨 **모든 State에서 새까맣게** 나왔습니다.
Figma 원본 SVG의 fill을 State별로 다시 쟀습니다.

| State | 좌측 아이콘 | Chevron | 근거 노드(좌측/Chevron, Size=M) |
|---|---|---|---|
| **Default** | `neutral/500`(#8c9199) | `neutral/500` | `2292:7123` / `2292:7125` |
| **Hover** | `neutral/500` | `neutral/500` | `2292:7217` / `2292:7219` |
| **Selected** | `neutral/800`(#202837) | **`brand/primary-default`**(#2c7be2) | `2292:7247` / `2292:7249` |
| **Selected + Destructed** | `neutral/800` | **`theme/destructed-default`**(#e72f37) | `2292:7256` / `2292:7258` |
| **Disabled** | `neutral/400`(#c2c4c8) | `neutral/400` | `2292:7187` / `2292:7189` |
| **Done** | `neutral/500` | `neutral/500` | `2292:7154` / `2292:7156` |

**좌우가 따로 움직입니다.** 좌측 아이콘은 [Text Input](../text-input/text-input/text-input.md)과
규칙이 같아(포커스가 가면 진해지고 그 외엔 placeholder 톤) 같은 CSS를 씁니다.
하지만 **Chevron만은 열려 있는 동안 회색이 아니라 테두리와 같은 색**이 됩니다 — 파란 테두리에
파란 화살표, 빨간 테두리에 빨간 화살표로 한 덩어리처럼 읽히게 한 것입니다.
Text Input에는 없는 Dropdown 고유 규칙이라 `storybook/src/components/Dropdown/Dropdown.css`에 따로 뒀습니다.

**Done의 반례가 여기도 있습니다** — 값이 `neutral/800`으로 진해지는데도 아이콘은 `neutral/500` 그대로입니다.
아이콘 색이 글자색을 따라가지 않는다는 근거입니다(Text Input 문서 5장과 동일한 관찰).

**핵심 발견**:
1. **Destructed는 Selected 상태 전용 변형입니다(확인 완료).** `get_metadata` 전수 조사 결과 288개 인스턴스 중 Destructed=True는 정확히 48개(Size 3 × 토글 4축 2⁴=16)이며, 전부 State=Selected였습니다. Default/Hover/Disabled/Done 상태에는 Destructed=True 조합 자체가 Figma 컴포넌트에 존재하지 않습니다 — 이 디자인 시스템은 "드롭다운이 열려있는 동안"만 필드 테두리·버튼 색으로 에러 스타일을 노출하도록 의도되어 있으며, **Done(닫힌) 상태에는 에러 변형이 없다는 것이 확정된 현재 스펙**입니다. 닫힌 상태에서 유효성 오류를 알려야 한다면 하단 [Supporting Text](../global/supporting-text/supporting-text.md)의 `Theme=Destructed`만으로 처리하는 것이 현재 컴포넌트가 제공하는 유일한 경로이며, 이 문서는 그 현재 상태를 그대로 반영합니다(별도 Done+Destructed 필드 변형을 새로 만들 계획은 없음).
2. **Selected와 Done의 차이는 "열려 있는지"입니다.** 둘 다 TypeBox에 값이 채워진(`neutral/800`) 상태를 보여주지만, Selected만 테두리가 파란색+Chevron이 위를 향하고, Done은 기본 회색 테두리+Chevron이 아래를 향합니다.
3. **Hover는 테두리 색상만 바뀝니다.** 배경·아이콘·버튼 등 다른 요소는 Default와 동일합니다.
4. **Disabled는 테두리를 아예 없애고 옅은 회색 채움으로 대체**합니다(다른 State들이 테두리 유지 방식인 것과 다른 처리 방식). Button은 색은 유지한 채 `opacity/20`(20%)만 적용됩니다.

## 4. 토글 축(Show Button / Left Icon / Show Label / Supporting Text)

4개 토글 전부 **독립적으로 구조 자체가 트리에서 나타나거나 사라지는 방식**입니다(값만 숨기는 것이 아니라 노드 자체가 없어짐 — Supporting Text 컴포넌트의 Text Count 축과 동일한 패턴).

| 토글 | False일 때 |
|---|---|
| **Show Button** | 우측 Button 요소가 사라지고, Input이 `Input Box`(Input+Button을 감싸던 flex row) 래퍼 없이 그 자체로 전체 너비(`w-full`)를 차지 |
| **Left Icon** | Input 내부 왼쪽 아이콘(`profile_filled`)만 사라짐. TypeBox·Chevron 위치·gap은 변화 없음 |
| **Show Label** | 상단 [Label](../global/label/label.md) 요소가 사라지고 컨테이너가 바로 Input Box로 시작 |
| **Supporting Text** | 하단 [Supporting Text](../global/supporting-text/supporting-text.md) 요소가 사라짐 |

4개 전부 False로 두면(`2292:9568`, M 기준) Input 한 줄(TypeBox+Chevron)만 남고 높이가 82px→38px로 줄어듭니다. Show Label/Supporting Text 중 하나만 True인 경우 높이는 60px, 둘 다 True면 82px, 둘 다 False면 38px — 두 토글이 완전히 독립적으로 세로 높이에 가산됨을 확인했습니다.

**좌측 아이콘 슬롯**: 코드상 prop명이 Size별로 `leftS`/`leftM`/`leftL`로 되어 있고 기본값이 `profile_filled` 아이콘입니다. Supporting Text의 아이콘 슬롯과 마찬가지로 **자유 교체용 placeholder**로 보이며, "이 필드엔 반드시 이 아이콘" 같은 고정 규정은 Figma 파일에 없습니다.

## 5. 서브컴포넌트 재사용 관계

- **Label**: [`components/global/label/label.md`](../global/label/label.md)의 Size S/M/L(Essential=Off) 스펙을 그대로 인스턴스로 사용. 타이포·하단 padding 전부 일치.
- **Type Box**: [`components/global/type-box/type-box.md`](../global/type-box/type-box.md)의 Size S/M/L을 사용하되, State는 `Placeholder`(빈 값)와 `Done`(값 채워짐)만 관찰됨. Type Box 자체의 `Selected`/`Typing`(캐럿 표시) 상태는 Dropdown 안에서는 쓰이지 않는 것으로 보임 — Dropdown은 텍스트를 직접 타이핑하는 필드가 아니라 목록에서 선택하는 컴포넌트이므로 캐럿이 필요 없기 때문으로 추정됩니다. **확인 필요**(다른 State 조합에 캐럿이 등장하는 케이스가 없는지는 288개 전수 검증하지 않음).
- **Supporting Text**: [`components/global/supporting-text/supporting-text.md`](../global/supporting-text/supporting-text.md)의 Size S/M/L, Theme=Gray(기본), Text Count=False 조합을 그대로 사용. 아이콘은 `warning_filled`로 Supporting Text 문서에서 이미 확인된 "자유 교체 placeholder" 패턴과 동일.

## 6. 인터랙션(모션) 스펙

> **⚠️ 2026-09-15 정정 — 이전 판의 "모션 데이터 없음"은 틀렸습니다.**
> *"열림/닫힘을 포함해 State 전환에 별도 트랜지션 모션이 없다는 것이 확인된 사항"* 이라고까지
> 적어 뒀지만, 확인된 게 아니라 **못 읽은 것**이었습니다.

`get_motion_context`는 **키프레임 애니메이션만** 읽습니다. 변형 사이의 프로토타입 전환은
`node.reactions`에 있어 Plugin API로 직접 읽어야 합니다. 다시 읽으니 반응이 있었습니다:

| 전환 | 트리거 | 방식 | Easing | Figma 표시 | API 값 |
|---|---|---|---|---|---|
| Default → Hover | `ON_HOVER` | Smart animate | Slow | **150ms** | 0.3125s |
| Hover → Selected | `ON_PRESS` | Smart animate | Slow | **50ms** | 0.1042s |

API 값이 Figma 표시의 정확히 2.0836배인 것은 Slow가 스프링이라 API가 **완전히 정착(settle)하는
시간**을 돌려주기 때문입니다(Time Field·Date 문서와 같은 관계).

Text Input 셋의 반응과 **값이 완전히 같습니다.** 그래서 구현도 스타일시트를 공유합니다
(`storybook/src/components/TextInput/TextInput.css` 하단).
State가 바뀔 때 테두리뿐 아니라 **좌우 아이콘·Type Box·Label 색까지 같이** 움직여야
한 덩어리로 보입니다.

**옵션 목록(펼침 리스트)의 열림/닫힘 모션은 여전히 이 Frame의 범위 밖입니다** — 7장 참고.

## 6.1 옵션 목록(Menu)은 별도 컴포넌트입니다

Dropdown의 `State=Selected`는 **"열린 모습"만** 그립니다 — 실제로 아래에 뜨는 선택지 목록은
이 Frame에 들어 있지 않습니다. Figma 파일에 **`❖ Menu` 페이지가 따로 있고**(같은 층에 `❖ List`,
`❖ Bottom Sheet`도 있음), 아직 문서화·구현하지 않았습니다.

구현은 목록이 붙을 자리를 미리 비워 뒀습니다 — 선택 상자를 `<div>`가 아니라 **`<button>`**으로 두고
`aria-haspopup="listbox"`와 `aria-expanded`를 이미 싣고 있습니다(7장). 나중에 Menu를 문서화하면
목록 컴포넌트와 열림/닫힘 콜백만 연결하면 됩니다.

## 7. 접근성

- Chevron 방향(`chevron_down`/`chevron_up`)이 열림/닫힘의 유일한 시각적 신호 중 하나입니다. **구현 반영 완료(2026-09-15)** — 선택 상자를 `<button type="button">`으로 두고 `aria-haspopup="listbox"`·`aria-expanded`를 싣습니다. Figma 파일에 규정이 없어 WAI-ARIA 패턴을 따랐습니다. 목록(Menu)을 붙일 때 `aria-controls`·`role="listbox"`가 추가로 필요합니다(6.1장).
- Disabled 상태에서 `pointer-events`/`aria-disabled`/`disabled` 속성 부여는 Figma 디자인만으로 확인 불가한 마크업 레벨 사안. **구현은 실제 `disabled`를 겁니다** — 선택 상자·확정 버튼 둘 다. 포커스에서도 빠집니다.
- Destructed(에러) 상태가 테두리·버튼 색상 변화만으로 표현되는 부분은 [Supporting Text 문서](../global/supporting-text/supporting-text.md) 6장에서 이미 지적된 것과 동일하게 **색상에만 의존하지 않기(WCAG 1.4.1)** 관점에서 하단 Supporting Text의 아이콘·문구가 항상 함께 노출되는지 확인이 필요합니다.
  > **디자이너 확정(2026-09-15)** — 하단 Supporting Text는 Destructed와 함께 `Theme=Destructed`(빨강)로 바뀝니다. Figma 변형은 아직 `Theme=Gray` 그대로지만(`2292:7252` 실측 — 테두리·버튼·Chevron만 빨강) **디자이너가 Figma 쪽을 맞추기로 했습니다.** [Text Input](../text-input/text-input/text-input.md) 7장도 같은 결정입니다.
  > ⚠️ 이 항목만 **구현이 Figma보다 앞서 있습니다.** 다음에 이 프레임을 재실측할 때 Gray로 되돌리지 마세요 — 실측값이 아니라 지시가 기준입니다.
- Label 연결(`<label for>`), 필수 입력 여부 등은 [Label 문서](../global/label/label.md) 5장의 확인 필요 사항과 동일하게 적용됩니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- 배경색: `common/white-default`(#fdfdfd) → `sys-color-common-white-default`, `color/gray/900-5/10/20` → `sys-color-alpha-gray-900-*`
- 강조 테두리·버튼: `brand/primary-default`(#2c7be2) → `sys-color-brand-primary-default`
- 에러: `theme/destructed-default`(#e72f37) → `sys-color-theme-destructed-default`
- Disabled 투명도: `opacity/20`(0.2) → `ref-opacity-20`
- Radius: S/M `radius/05`=10px → `ref-radius-05`, L `radius/06`=12px → `ref-radius-06`
- Spacing: `spacing/02,04,05,06,07,08,09,10` 전부 `ref-spacing-02~10`과 일치
- 타이포: Label/TypeBox/Button/Supporting Text 전부 저장소 `tokens/typography.json`과 일치(2장·5장 참고)

**기존 토큰에 없음**
- Size(S/M/L)별로 "Dropdown엔 이 padding+radius+아이콘크기 조합을 쓴다"는 시맨틱 토큰 자체는 저장소에 없음(개별 값은 토큰과 일치)
- Destructed가 Selected 상태에서만 노출되는 규칙을 명시하는 토큰/문서 없음

**확인 완료(작업지시 반영)**
- 컴포넌트 너비: 고정 280px가 아니라 **화면 폭에 따른 가변(fluid)** — `w-[280px]`는 Figma 진열 프레임의 표시값일 뿐
- Done(닫힌) 상태의 에러 표시: 별도 필드 변형 없음 — 현재 스펙 그대로(Destructed는 Selected 전용) 반영, 추가 변형 계획 없음
- 옵션 목록(펼침 리스트) UI: 이 컴포넌트 범위 밖, **별도 컴포넌트로 추후 문서화 예정**
- ~~열림/닫힘 트랜지션 모션: 없음~~ → **정정(2026-09-15).** State 전환에 반응이 있습니다 (Default→Hover 150ms · Hover→Selected 50ms, Smart animate·Slow). 6장 참고

**확인 필요**
- `<label for>` 연결 규정 (`aria-expanded`·`disabled`는 구현 반영 완료 — 7장)
- ~~Destructed에서 하단 Supporting Text를 빨강으로 바꾸는 것이 맞는지~~ → **확정(2026-09-15)**: 빨강이 맞습니다. Figma는 디자이너가 맞출 예정 — 7장
- 옵션 목록(`❖ Menu` 페이지)의 스펙 — 아직 문서화·구현하지 않음(6.1장)

## 9. 샘플링에 사용한 13개 노드 (부록)

| 목적 | 노드 |
|---|---|
| Size 축(M=baseline) | S `2292:6659` · M `2292:7119` · L `2292:7601` |
| State 축(Size=M) | Hover `2292:7213` · Selected `2292:7243` · Selected+Destructed `2292:7252` · Disabled `2292:7183` · Done `2292:7150` |
| 토글 축(Size=M, State=Default) | Show Button=False `2292:7112` · Left Icon=False `2292:7366` · Show Label=False만 `2292:9156` · Supporting Text=False만 `2292:9884` · 4개 전부 False `2292:9568` |

전체 288개 인스턴스의 레이어명·크기는 `get_metadata`(Frame `2292:6651`)로 전수 확보했으며, 이를 기반으로 축 구조(7개 축, 조합 규칙)를 도출했습니다. `get_variable_defs`는 S/M/L 대표 노드와 Disabled 노드에서 각각 호출해 확보했고, `get_motion_context`는 최상위 프레임에 1회 호출해 빈 결과를 확인했습니다.

## Corner Smoothing (2026-09-23 추가)

바드림 디자인시스템은 모든 Radius 에 **Corner Smoothing 60%** 를 함께 씁니다(`docs/DESIGN.md` 9.2). 이 컴포넌트가 직접 그리는 모서리에 Corner Smoothing 을 적용했습니다.

Figma 실측: 2026-09-23 Figma Plugin API `cornerSmoothing` 전수 조회(컴포넌트 셋 안의 모든 노드).

| 레이어 | Radius | Figma Smoothing | 구현 |
|---|---|---|---|
| Input 박스 S · M | 10px (`radius/05`) | 60% | 적용 |
| Input 박스 L | 12px (`radius/06`) | 60% | 적용 |
| 우측 버튼(Button 인스턴스) S · M | 10px | 60% | 적용 |
| 우측 버튼 L | 12px | 60% | 적용 |

- State 별 테두리도 같은 squircle 을 따릅니다. Text Input 과 CSS(`TextInput.css`)를 공유하므로 규칙도 한곳에 있습니다.
- 스토리북은 컴포넌트 요소를 직접 자르지 않고, 첫 자식 `<Squircle />` 레이어(`storybook/src/shared/Squircle.tsx`)가 배경·오버레이·테두리를 squircle 로 칠합니다. 요소를 직접 자르면 포커스 링과 바깥 그림자까지 잘리기 때문입니다.
- 포커스 링(`outline`)은 Figma 에 없는 구현 값이라 적용하지 않고 원호 그대로 둡니다(2026-09-23 결정).
