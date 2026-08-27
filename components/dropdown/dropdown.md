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
- `get_motion_context`는 최상위 프레임(`2292:6651`)에 1회 호출했으며 모션 데이터 없음을 확인했습니다.
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

## 3. State별 스펙 (5개 + Destructed 실측, Size=M 기준)

| State | Input 배경 | Input 테두리 | Button 배경 | TypeBox 표시 | Chevron | 기타 |
|---|---|---|---|---|---|---|
| **Default** | `common/white-default`(#fdfdfd) | `color/gray/900-10`(rgba(3,9,26,0.1)) | `brand/primary-default`(#2c7be2) | Placeholder(회색, `neutral/500`) | `chevron_down` | — |
| **Hover** | 동일 | `color/gray/900-20`(rgba(3,9,26,0.2)) — **Default보다 진한 테두리** | 동일 | Placeholder | `chevron_down` | 루트에 `cursor-pointer` 클래스 |
| **Selected**(열림) | 동일 | `brand/primary-default`(#2c7be2) | `brand/primary-default`(변화 없음) | 값 채워짐(진한 색, `neutral/800`) | **`chevron_up`**(방향 반전) | — |
| **Selected + Destructed=True**(열림+에러) | 동일 | `theme/destructed-default`(#e72f37) | **`theme/destructed-default`**(#e72f37로 변경) | 값 채워짐(`neutral/800`) | `chevron_up` | — |
| **Disabled** | `color/gray/900-5`(rgba(3,9,26,0.05)) — **테두리 없음, 채움만** | 없음 | `brand/primary-default` + `opacity/20`(0.2) 적용 | Placeholder, 색상 `neutral/400`(더 옅음) | `chevron_down` | Label 텍스트 색상도 `neutral/500`으로 dim |
| **Done**(닫힘, 값 선택됨) | `common/white-default` | `color/gray/900-10`(Default와 동일) | `brand/primary-default` | 값 채워짐(`neutral/800`) | `chevron_down`(**반전 없음** — 닫힌 상태이므로) | — |

**핵심 발견**:
1. **Destructed는 Selected 상태 전용 변형입니다.** `get_metadata` 전수 조사 결과 288개 인스턴스 중 Destructed=True는 정확히 48개(Size 3 × 토글 4축 2⁴=16)이며, 전부 State=Selected였습니다. Default/Hover/Disabled/Done 상태에는 Destructed=True 조합 자체가 Figma 컴포넌트에 존재하지 않습니다 — 즉 이 디자인 시스템은 "드롭다운이 열려있는 동안"만 에러 스타일을 노출하도록 의도된 것으로 보이며, 닫힌 상태(Done)에서의 에러 표시는 아마도 하단 [Supporting Text](../global/supporting-text/supporting-text.md)의 `Theme=Destructed`만으로 처리하는 구조로 추정됩니다 — **확인 필요**.
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

**모션 데이터 없음.**

`get_motion_context`를 최상위 프레임(`2292:6651`)에 호출했으나 `motionSummary: null`, `codeSnippets: {}`인 빈 결과를 반환했습니다. Default→Hover, Default→Selected(열림) 등 State 전환 시 실제 애니메이션(예: 드롭다운 목록 펼침 트랜지션)이 있을 가능성이 높지만 Figma 파일 자체에는 정의되어 있지 않습니다 — 실제 구현 시 임의로 duration/easing을 정하지 말고 확인 필요.

또한 이번 조사는 Dropdown "닫힌 상태"의 필드 UI만 다룹니다. **클릭 시 펼쳐지는 옵션 목록(리스트) 자체는 이 Frame(`2292:6651`)에 포함되어 있지 않아 조사 범위 밖입니다** — 확인 필요.

## 7. 접근성

- Chevron 방향(`chevron_down`/`chevron_up`)이 열림/닫힘의 유일한 시각적 신호 중 하나입니다. 실제 구현 시 `aria-expanded`를 함께 제공해야 스크린리더 사용자도 열림 상태를 인지할 수 있습니다 — Figma 파일에 규정 없음.
- Disabled 상태에서 `pointer-events`/`aria-disabled`/`disabled` 속성 부여는 Figma 디자인만으로 확인 불가한 마크업 레벨 사안 — 확인 필요.
- Destructed(에러) 상태가 테두리·버튼 색상 변화만으로 표현되는 부분은 [Supporting Text 문서](../global/supporting-text/supporting-text.md) 6장에서 이미 지적된 것과 동일하게 **색상에만 의존하지 않기(WCAG 1.4.1)** 관점에서 하단 Supporting Text의 아이콘·문구가 항상 함께 노출되는지 확인이 필요합니다.
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

**확인 필요**
- 컴포넌트 루트 `w-[280px]` 고정폭이 실제 의도인지, 부모 폭에 맞춰 늘어나야 하는지(Label·Supporting Text 문서와 동일한 이슈)
- Done 상태 등 닫힌 상태에서의 에러(Destructed) 표시 방식 — Supporting Text의 Theme만으로 처리되는지
- 옵션 목록(펼침 리스트) UI — 이 Frame에 포함되지 않아 별도 조사 필요
- 열림/닫힘 트랜지션 모션 값
- 접근성 마크업(`aria-expanded`, `disabled`, `<label for>`) 연결 규정

## 9. 샘플링에 사용한 13개 노드 (부록)

| 목적 | 노드 |
|---|---|
| Size 축(M=baseline) | S `2292:6659` · M `2292:7119` · L `2292:7601` |
| State 축(Size=M) | Hover `2292:7213` · Selected `2292:7243` · Selected+Destructed `2292:7252` · Disabled `2292:7183` · Done `2292:7150` |
| 토글 축(Size=M, State=Default) | Show Button=False `2292:7112` · Left Icon=False `2292:7366` · Show Label=False만 `2292:9156` · Supporting Text=False만 `2292:9884` · 4개 전부 False `2292:9568` |

전체 288개 인스턴스의 레이어명·크기는 `get_metadata`(Frame `2292:6651`)로 전수 확보했으며, 이를 기반으로 축 구조(7개 축, 조합 규칙)를 도출했습니다. `get_variable_defs`는 S/M/L 대표 노드와 Disabled 노드에서 각각 호출해 확보했고, `get_motion_context`는 최상위 프레임에 1회 호출해 빈 결과를 확인했습니다.
