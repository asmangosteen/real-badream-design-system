# Text Input

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2114-8709) — Frame `2114:8709` ("Text Input")
> 기계 판독용 값은 [`text-input.json`](./text-input.json)을 함께 참고합니다. 이 문서와 text-input.json은 항상 같은 소스에서 나온 값이어야 합니다.
> Text Input은 `components/global/`의 [Label](../../global/label/label.md), [Type Box](../../global/type-box/type-box.md), [Text Blinker](../../global/text-blinker/text-blinker.md), [Supporting Text](../../global/supporting-text/supporting-text.md)를 실제로 조합해서 만들어진 **상위 컴포넌트**입니다 — 이 문서가 그 4개 서브 아톰의 "실 사용처"를 확정합니다(5장).

## 0. 문서 범위와 샘플링 방법

Text Input은 **Size(S/M/L) × State(Default/Hover/Disabled/Done/Selected/Typing) × Destructed(False/True, Selected·Typing 2개 State에서만 존재) × Show Button(F/T) × Show Label(F/T) × Supporting Text(F/T) × Left Icon(F/T) × Right Icon(F/T) 총 8개 축, 768개 인스턴스**로 구성된 컴포넌트입니다.

- `get_metadata` 전수 조사(오케스트레이터가 사전 확보)로 축 구조를 먼저 파악했습니다: State 6종 중 Default/Hover/Disabled/Done 4종은 Destructed 축 자체가 없고(암묵적 False), Selected·Typing 2종만 Destructed=False/True 둘 다 존재합니다. 따라서 Size당 State×Destructed 조합은 4×1 + 2×2 = 8가지, 여기에 토글 5축(2⁵=32)을 곱하면 8×32=256, ×Size 3종 = **768개**로 정확히 일치합니다.
- 이 축 구조를 근거로 **총 15개 노드**를 `get_design_context`로 개별 실측했습니다:
  1. **베이스라인**(Size=M, State=Default, Destructed=False, 나머지 5토글 전부 True): `2119:10041`
  2. **Size 축**(State=Default, 나머지 전부 True): S(`2119:9843`) · M(`2119:10041`, 베이스라인과 중복) · L(`2119:10245`)
  3. **State 축**(Size=M, 나머지 전부 True): Hover(`2119:10082`) · Disabled(`2119:10069`) · Done(`2119:10054`) · Selected/Destructed=False(`2119:10095`) · Selected/Destructed=True(`2119:18801`) · Typing/Destructed=False(`2119:10121`) · Typing/Destructed=True(`2119:18818`)
  4. **토글 축 5종**(Size=M, State=Default, 한 축씩 False): Show Button=False(`2114:8648`) · Show Label=False(`2119:10903`) · Supporting Text=False(`2119:11203`) · Left Icon=False(`2119:10149`) · Right Icon=False(`2119:10048`) · 5개 전부 False(`2115:9089`)
- `get_variable_defs`는 대표 노드 4개(S/M/L 각 1회 + Disabled 1회)에서 호출했습니다.
- `get_motion_context`는 최상위 프레임(`2114:8709`, recursive=true)에 1회 호출했으며 모션 데이터 없음을 확인했습니다.
- 나머지 753개(미실측)는 위 축들이 서로 독립적으로 조합된다는 규칙(Dropdown·Supporting Text 문서와 동일한 방법론)에 따라 값이 예측 가능하지만, 개별 실측하지 않은 조합에 새 토큰명을 만들지는 않았습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Text Input은 사용자가 직접 텍스트를 입력하는 **입력형 필드 컴포넌트**입니다. [Dropdown](../../dropdown/dropdown.md)과 레이아웃 구조(Label → Input Box[Input(좌아이콘+TypeBox+우아이콘) + Button] → Supporting Text)가 거의 동일하지만, 다음 3가지가 다릅니다.

1. **Right Icon이 독립된 토글 축으로 존재**합니다(Dropdown은 우측 아이콘이 축 없이 항상 켜져 있는 chevron 고정 슬롯이었음). 기본 아이콘도 Dropdown의 `chevron_down`이 아니라 **`arrowhead_down`**입니다.
2. **Destructed가 Selected뿐 아니라 Typing에서도 분기**합니다(Dropdown은 Selected 전용).
3. **[Type Box](../../global/type-box/type-box.md)의 `Selected`/`Typing`(캐럿) 상태가 실제로 그대로 쓰입니다.** Dropdown 문서 5장에서 "캐럿이 Dropdown 안에서는 쓰이지 않는 것으로 보인다"고 확인 필요로 남겼던 것과 정반대로, Text Input은 State=Selected일 때 TypeBox의 `Selected` 변형(빈 값+캐럿)을, State=Typing일 때 TypeBox의 `Typing` 변형(값+캐럿)을 그대로 인스턴스로 사용합니다 — **직접 실측으로 확인 완료**(5장 상세).

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L | 필드 크기 단계(패딩·타이포·아이콘 크기·radius 스케일) |
| **State** | Default / Hover / Disabled / Done / Selected / Typing | 상호작용 상태. Selected=포커스+값 없음, Typing=포커스+입력 중, Done=입력 완료+비포커스(3장) |
| **Destructed** | False / True | 에러 상태 표시. **실측 결과 Selected·Typing 두 State에서만 별도 Figma 변형으로 존재**(Default/Hover/Disabled/Done에는 Destructed=True 조합 자체가 없음 — Dropdown의 "Selected 전용" 패턴과 유사하지만 대상 State가 2개로 늘어난 점이 다름) |
| **Show Button** | False / True | 우측 확정 버튼(파란 배경 "Text" 버튼) 표시 여부 |
| **Show Label** | False / True | 상단 [Label](../../global/label/label.md) 표시 여부 |
| **Supporting Text** | False / True | 하단 [Supporting Text](../../global/supporting-text/supporting-text.md) 표시 여부 |
| **Left Icon** | False / True | Input 왼쪽 아이콘(기본 `profile_filled`, 자유 교체 슬롯) 표시 여부 |
| **Right Icon** | False / True | Input 오른쪽 아이콘(기본 `arrowhead_down`, 자유 교체 슬롯) 표시 여부. **단, State=Typing에서는 이 슬롯이 강제로 `close_in_circle`(지우기 버튼)로 대체됨 — 4장 참고** |
| **Show Unit**(9번째, variant 축 아님) | False / True | 우측 아이콘 뒤에 단위 텍스트(예: "km") 표시 여부. Size×State×Destructed×5토글로 계산한 **768개(variant 조합 수)에는 포함되지 않는 별도 boolean 프로퍼티**(사용자 확인, Figma 프로퍼티 패널) — 3장 핵심 발견 5 참고 |

## 2. Size별 스펙 (3개 전체 실측, State=Default·나머지 토글 전부 True 기준)

| 요소 | S | M | L |
|---|---|---|---|
| **Input 컨테이너** | radius `radius/05`=10px, border `borderwidth/02`=1px, padding px `spacing/07`=10px / py `spacing/05`=6px, 내부 gap `spacing/06`=8px | radius `radius/05`=10px, border 1px, padding px `spacing/08`=12px / py `spacing/06`=8px, 내부 gap `spacing/06`=8px | radius `radius/06`=12px, border 1px, padding px `spacing/09`=14px / py `spacing/08`=12px, 내부 gap `spacing/07`=10px |
| **Input-Button 사이 gap** | `spacing/04`=4px | `spacing/05`=6px | `spacing/06`=8px |
| **좌측 아이콘 크기** | 16px | 16px | **20px** |
| **우측 아이콘 크기** | 16px | 16px | **20px** |
| **Button 패딩** | px `spacing/06`=8px / py `spacing/04`=4px | px `spacing/08`=12px / py `spacing/06`=8px | px `spacing/10`=16px / py `spacing/08`=12px |
| **Button radius** | `radius/05`=10px | `radius/05`=10px | `radius/06`=12px(Input과 동일) |
| **Button 텍스트** | Body2/14 Medium | Body2/14 Medium | Body1/16 Medium |
| **Label 하단 padding** | `spacing/02`=2px | `spacing/04`=4px | `spacing/05`=6px |
| **Label 타이포** | Caption1/12 SemiBold | Caption1/12 SemiBold | Body2/14 Medium |
| **TypeBox(Placeholder) 타이포** | Caption1/12 Medium | Body2/14 Regular | Body1/16 Regular |
| **Supporting Text 아이콘/타이포** | 12px 아이콘, Caption2/10 Medium | 16px 아이콘, Caption1/12 Regular | 16px 아이콘, Caption1/12 Regular |

**핵심 확인**: Label/TypeBox/Supporting Text의 Size별 타이포·패딩 값은 각 서브컴포넌트 문서([label.md](../../global/label/label.md) 2장, [type-box.md](../../global/type-box/type-box.md) 2장, [supporting-text.md](../../global/supporting-text/supporting-text.md) 3장)에 실측된 값과 **정확히 일치**합니다 — [Dropdown](../../dropdown/dropdown.md)과 마찬가지로 Text Input도 이 세 아톰을 Size만 맞춰 그대로 인스턴스로 가져다 씁니다.

**너비**: 컴포넌트 루트에 `w-[280px]`가 걸려 있지만, Dropdown 문서에서 이미 확인 완료한 것과 동일하게 이는 Figma 진열 프레임에서 샘플링할 때 찍힌 표시값일 뿐이며 실제 의도는 **화면 폭에 따른 가변(fluid) 너비**로 추정됩니다. 이번 조사에서 Text Input 자체에 대해 별도로 재확인하지는 않았으나 Dropdown·Text Input Group(본 문서 계열)이 동일한 Figma 진열 컨벤션을 쓰는 것으로 보여 동일하게 처리하는 것이 합리적입니다 — **확인 필요**(Dropdown만큼 명시적으로 재검증하지 않음).

**컨테이너 높이**: TypeBox·Label 등이 모두 hug-content(내용에 맞춰 늘어나는) 구조라 고정 높이 토큰이 없습니다. Dropdown 문서처럼 baseline 픽셀 높이를 별도로 측정하지 않았습니다(범위 밖) — 필요 시 4장의 토글별 구조 변화(요소 자체가 사라짐)로 높이가 결정됩니다.

## 3. State별 스펙 (6개 + Destructed 분기 2개 실측, Size=M 기준)

| State | Input 배경 | Input 테두리 | Button 배경 | TypeBox 상태 | 우측 아이콘 | 기타 |
|---|---|---|---|---|---|---|
| **Default** | `common/white-default`(#fdfdfd) | `color/gray/900-10`(rgba(3,9,26,0.1)) | `brand/primary-default`(#2c7be2) | `Placeholder`(회색, `neutral/500`) | `arrowhead_down` | — |
| **Hover** | 동일 | `color/gray/900-20`(rgba(3,9,26,0.2)) — Default보다 진함 | 동일 | `Placeholder` | `arrowhead_down` | 루트에 `cursor-pointer` 클래스 |
| **Disabled** | `color/gray/900-5`(rgba(3,9,26,0.05)) — 테두리 없음 | 없음 | `brand/primary-default` + `opacity/20`(0.2) | `Placeholder`, 텍스트 색상 **`neutral/400`**(Default의 `neutral/500`보다 한 단계 옅음) | `arrowhead_down` | Label 텍스트 색상도 `neutral/500`으로 dim(Default는 `neutral/700`) |
| **Done** | `common/white-default` | `color/gray/900-10`(Default와 동일) | `brand/primary-default` | `Done`(값 채워짐, `neutral/800`, 캐럿 없음) | `arrowhead_down` | 우측 아이콘 뒤 단위 텍스트("km") 슬롯 — **`Show Unit`이라는 별도 boolean 컴포넌트 프로퍼티로 확인됨**(사용자 확인, Figma 프로퍼티 패널). 8개 변형 축과는 다른 종류의 속성이라 축 개수(768개)에는 포함되지 않음 — 아래 핵심 발견 5 참고 |
| **Selected**(Destructed=False) | `common/white-default` | `brand/primary-default`(#2c7be2) — 파란 강조 | `brand/primary-default`(변화 없음) | **`Selected`**(값 없음, `neutral/500` placeholder + **캐럿이 텍스트 앞에 표시**, 캐럿 색상 `brand/primary-default`) | `arrowhead_down`(변화 없음) | 포커스 + 값 없음(빈 필드에 커서만 깜빡이는 상태로 추정) |
| **Selected + Destructed=True** | `common/white-default` | `theme/destructed-default`(#e72f37) | **`theme/destructed-default`**(#e72f37로 변경) | `Selected`(값 없음 + 캐럿, 단 **캐럿 색상이 `theme/destructed-default`로 오버라이드**됨) | `arrowhead_down`(변화 없음) | — |
| **Typing**(Destructed=False) | `common/white-default` | `brand/primary-default`(Selected와 동일) | `brand/primary-default`(변화 없음) | **`Typing`**(값 "Input Text", `neutral/800` + **캐럿이 텍스트 뒤에 표시**, 캐럿 색상 `brand/primary-default`) | **`close_in_circle`로 강제 대체**(자유 교체 슬롯이 아님 — 4장 참고) | 포커스 + 값 있음(입력 중) |
| **Typing + Destructed=True** | `common/white-default` | `theme/destructed-default` | **`theme/destructed-default`** | `Typing`(값 있음 + 캐럿, 캐럿 색상 `theme/destructed-default`로 오버라이드) | `close_in_circle`(강제, 변화 없음) | — |

**핵심 발견**:
1. **Destructed는 Selected·Typing 두 State에서만 노출되는 변형입니다(직접 실측으로 확인 완료).** Default/Hover/Disabled/Done 상태에는 Destructed=True 조합 자체가 Figma 컴포넌트에 존재하지 않습니다(0장 축 계산 근거). Dropdown이 "Selected 하나"였던 것과 달리 Text Input은 "포커스가 가 있는 두 State(Selected·Typing) 모두"에서 에러를 노출한다는 것이 이 컴포넌트의 확정 스펙입니다. 비포커스 상태(Default/Hover/Disabled/Done)에서 에러를 알려야 한다면, 현재 컴포넌트가 제공하는 유일한 경로는 하단 [Supporting Text](../../global/supporting-text/supporting-text.md)의 `Theme=Destructed`뿐입니다.
2. **TypeBox의 캐럿 상태가 실제로 쓰입니다.** Selected=`Selected`(캐럿+빈 placeholder), Typing=`Typing`(캐럿+값), 나머지(Default/Hover/Disabled/Done)=`Placeholder` 또는 `Done`. 이는 작업 지시에서 제기한 가설(Dropdown과 달리 Text Input은 실제 텍스트 타이핑 필드이므로 캐럿이 쓰일 것)을 그대로 확인시켜 줍니다.
3. **캐럿(Text Blinker) 색상이 Destructed에 따라 오버라이드됩니다.** [text-blinker.md](../../global/text-blinker/text-blinker.md)는 On 상태의 채우기 색상을 `brand/primary-default` 고정으로 문서화했지만, Text Input 안에서는 Destructed=True일 때 캐럿 색상이 `theme/destructed-default`로 바뀝니다 — Text Blinker 자체의 문서화된 스펙을 벗어나는 것이 아니라, **상위 컴포넌트가 인스턴스 프로퍼티/색상 오버라이드로 캐럿 색을 상황에 맞게 바꿔 쓰는 사례**입니다.
4. **Disabled의 Placeholder 색상이 Default보다 한 단계 더 옅습니다**(`neutral/400` vs `neutral/500`). Dropdown 문서에서도 동일하게 관찰된 패턴입니다.
5. **`Show Unit`은 정식 boolean 컴포넌트 프로퍼티입니다(사용자가 Figma 프로퍼티 패널에서 직접 확인).** 켜면 우측 아이콘 뒤에 단위 텍스트(관찰된 예: "km")가 표시됩니다. 실측 노드 중에는 `2119:10054`(Size=M, State=Done)에서 `Show Unit=True`로 켜진 인스턴스를 확인했습니다.
   - **왜 8개 공식 축(768개 계산)에 포함되지 않는가**: Figma 컴포넌트에는 두 종류의 프로퍼티가 있습니다 — ① **Variant 프로퍼티**(Size/State/Destructed/Show Button 등, 레이어 이름에 `"Size=M, State=Default, ..."` 식으로 박혀 있어 `get_metadata`로 셀 수 있는 것)와 ② **Boolean/Text/Instance-swap 프로퍼티**(레이어 이름이 아니라 인스턴스별 속성 패널에만 노출되는 것). `Show Unit`은 후자입니다. 즉 Size×State×Destructed×5토글(Show Button/Show Label/Supporting Text/Left Icon/Right Icon)로 계산한 768개는 어디까지나 **variant 조합 수**이고, `Show Unit`은 이 768개 각각에 독립적으로 True/False를 얹을 수 있는 **9번째 축**입니다(있다면 이론상 1,536개까지 늘어날 수 있는 구조).
   - **재실측(Hover `2119:10082`, Selected `2119:10095`, Size=S Default `2119:9843`)에서는 이 prop이 코드 출력에 아예 나타나지 않았는데**, 이는 인스턴스 자체에 이 프로퍼티가 없어서가 아니라 `get_design_context`의 코드 생성 방식상 **기본값(False)과 같은 프로퍼티는 생략되고, 기본값에서 오버라이드된 프로퍼티만 타입에 노출되는 것으로 보입니다.** 즉 세 노드 모두 `Show Unit=False`(기본값)라 코드에 드러나지 않았을 뿐, 사용자가 확인한 대로 프로퍼티 자체는 전 인스턴스에 공통으로 존재하는 것이 맞습니다.
   - Size=S/L 등 다른 Size, 또는 Default/Selected 등 Done 외 다른 State에서 `Show Unit=True`로 실제 켠 예시는 이번 15개 표본에는 없어, 다른 축과 조합했을 때의 정확한 레이아웃(간격, 텍스트 스타일, Right Icon과의 관계)까지는 이번 조사로 확정하지 못했습니다 — **확인 필요**.

## 4. 토글 축(Show Button / Show Label / Supporting Text / Left Icon / Right Icon)

5개 토글 모두 **독립적으로 구조 자체가 트리에서 나타나거나 사라지는 방식**입니다(값만 숨기는 것이 아니라 노드 자체가 없어짐 — Dropdown·Supporting Text와 동일한 패턴).

| 토글 | False일 때 |
|---|---|
| **Show Button** | 우측 Button 요소가 사라지고, Input이 `Input Box`(Input+Button을 감싸던 flex row) 래퍼 없이 그 자체로 전체 너비(`w-full`)를 차지(Dropdown과 동일 패턴) |
| **Show Label** | 상단 [Label](../../global/label/label.md) 요소가 사라지고 컨테이너가 바로 Input Box로 시작 |
| **Supporting Text** | 하단 [Supporting Text](../../global/supporting-text/supporting-text.md) 요소가 사라짐 |
| **Left Icon** | Input 내부 왼쪽 아이콘(`profile_filled`)이 완전히 사라짐(코드상 `leftM` prop 자체가 타입에서 빠짐). TypeBox·우측 아이콘 위치·gap은 변화 없음 |
| **Right Icon** | Input 내부 오른쪽 아이콘(`arrowhead_down`)이 완전히 사라짐(`rightM` prop 자체가 타입에서 빠짐). TypeBox가 `flex-[1_0_0]`로 남은 공간을 차지 |

5개 전부 False로 두면(`2115:9089`, M 기준) Label·Button·Supporting Text·좌우 아이콘이 모두 사라지고 **TypeBox 하나만 담긴 Input 박스 한 줄**만 남습니다.

**Right Icon과 State=Typing의 상호작용(중요)**: Typing 상태에서 샘플링한 두 노드(`2119:10121`, `2119:18818`)는 둘 다 `rightIcon` prop 타입은 존재하지만 `rightM`(자유 교체 슬롯) prop이 코드에 없고, 대신 `close_in_circle` 아이콘이 하드코딩되어 있습니다. 즉 **Typing 상태에서는 Right Icon 토글이 "arrowhead_down을 자유 아이콘으로 교체하는 슬롯"이 아니라 "입력값 지우기 버튼(고정 아이콘)을 켜고 끄는 스위치"로 의미가 바뀌는 것으로 보입니다.** 다만 Typing 상태에서 Right Icon=False인 노드는 이번 샘플링 범위에 포함되지 않아 그 경우 지우기 버튼이 완전히 사라지는지, 여전히 표시되는지는 **확인 필요**입니다.

## 5. 서브컴포넌트 재사용 관계

- **Label**: [`components/global/label/label.md`](../../global/label/label.md)의 Size S/M/L, **Essential=Off** 스펙을 그대로 인스턴스로 사용. 타이포·하단 padding 전부 정확히 일치. Text Input의 8개 공식 축에는 Essential 토글이 없으므로(768개 계산에 포함되지 않음), 이 컴포넌트 안에서 Label은 항상 Essential=Off로 고정되어 쓰이는 것으로 확인됩니다.
- **Type Box**: [`components/global/type-box/type-box.md`](../../global/type-box/type-box.md)의 Size S/M/L을 사용하며, **State 4종(Placeholder/Selected/Typing/Done)이 전부 실제로 쓰입니다** — Dropdown과 가장 크게 갈리는 지점입니다.
  - Default/Hover/Disabled → TypeBox `Placeholder`
  - Selected → TypeBox `Selected`(캐럿+빈 값)
  - Typing → TypeBox `Typing`(캐럿+값)
  - Done → TypeBox `Done`(값, 캐럿 없음)
  이는 Type Box 문서가 "확인 필요"로 남겨둔 "캐럿 상태가 실제로 어디서 쓰이는지"에 대한 답을 제공합니다: **Text Input이 바로 그 사용처입니다.**
- **Text Blinker**: [`components/global/text-blinker/text-blinker.md`](../../global/text-blinker/text-blinker.md)의 `On` 변형이 TypeBox의 Selected/Typing 상태를 통해 간접적으로 인스턴스화됩니다. 크기(1.5×20px)·radius(2px)는 문서 스펙과 일치하지만, **채우기 색상은 Destructed 여부에 따라 `brand/primary-default`↔`theme/destructed-default`로 오버라이드**됩니다(3장 핵심 발견 3 참고) — text-blinker.md 자체에는 없는, 상위 컴포넌트 레벨의 활용 사례입니다.
- **Supporting Text**: [`components/global/supporting-text/supporting-text.md`](../../global/supporting-text/supporting-text.md)의 Size S/M/L, **Theme=Gray**(기본), **Text Count=False** 조합을 그대로 사용. 아이콘은 `warning_filled`로, Supporting Text 문서에서 이미 확인된 "자유 교체 placeholder" 패턴과 동일합니다. Destructed 상태에서도 Supporting Text의 Theme이 자동으로 바뀌는 모습은 관찰되지 않았습니다(Input 테두리·Button만 색이 바뀌고 하단 Supporting Text는 계속 Gray 그대로) — Dropdown 문서에서 지적된 것과 동일한 WCAG 1.4.1 관련 우려가 그대로 적용됩니다(7장 참고).

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 최상위 프레임(`2114:8709`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Default↔Hover↔Selected↔Typing↔Done 전환, 그리고 캐럿의 깜빡임(blink) 자체에 대해서도 Figma 파일에 duration·easing 등 모션 값이 정의되어 있지 않습니다 — [text-blinker.md](../../global/text-blinker/text-blinker.md) 3장·[type-box.md](../../global/type-box/type-box.md) 5장에서 이미 확인 필요로 남긴 것과 동일하게, 실제 캐럿 깜빡임 주기는 구현 시 별도 결정이 필요합니다.

3장에서 관찰된 "Done 상태의 단위(unit) 텍스트 슬롯"에 대해서도 별도 모션은 없습니다.

## 7. 접근성

- **캐럿(Text Blinker) 접근성**: [text-blinker.md](../../global/text-blinker/text-blinker.md) 4장에서 이미 확인 필요로 명시된 `aria-hidden` 처리, 네이티브 브라우저 캐럿과의 중복 방지가 Text Input에도 그대로 적용됩니다. 실제 구현 시 이 캐럿이 네이티브 `<input>`의 진짜 캐럿을 대체하는 커스텀 UI라면 네이티브 캐럿은 투명 처리(`caret-color: transparent`)하는 등의 처리가 필요할 수 있습니다 — 확인 필요.
- **Typing 상태의 지우기 버튼(`close_in_circle`)**: 4장에서 확인한 대로 이 아이콘은 자유 교체 슬롯이 아니라 상태에 따라 강제로 나타나는 액션 버튼으로 보입니다. 스크린리더 사용자를 위한 `aria-label="입력값 지우기"` 등의 레이블 연결 규정이 Figma 파일에 없어 확인 필요입니다.
- **Disabled 상태**: `pointer-events`/`aria-disabled`/`disabled` 속성 부여는 Figma 디자인만으로 확인 불가 — Dropdown 문서와 동일하게 확인 필요.
- **Destructed(에러) 상태**: 테두리·버튼·캐럿 색상 변화로만 표현되며, 하단 Supporting Text는 Destructed와 무관하게 항상 Gray 톤으로 남습니다(5장). 색상에만 의존하지 않기(WCAG 1.4.1) 원칙에서, 실제 구현 시 Supporting Text의 Theme을 Destructed와 함께 전환하거나 최소한 텍스트 문구로 에러 내용을 명시하는 처리가 필요해 보입니다 — 확인 필요.
- **Label 연결**(`<label for>`), 필수 입력 여부 등은 [Label 문서](../../global/label/label.md) 5장의 확인 필요 사항과 동일하게 적용됩니다. Text Input에는 Essential 토글 자체가 없으므로(5장), 필수 입력 표시가 필요하다면 별도 처리 방식이 필요합니다 — 확인 필요.
- **`Show Unit` 단위 텍스트 슬롯**(3장 핵심 발견 5): 값과 단위(예: "12 km")가 스크린리더에 하나의 의미 단위로 읽히도록 구현할 필요가 있어 보이나, Figma 파일에 규정이 없어 확인 필요입니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- 배경색: `common/white-default`(#fdfdfd) → `sys-color-common-white-default`, `color/gray/900-5/10/20` → `sys-color-alpha-gray-900-*`
- 강조 테두리·버튼: `brand/primary-default`(#2c7be2) → `sys-color-brand-primary-default`
- 에러: `theme/destructed-default`(#e72f37) → `sys-color-theme-destructed-default`
- Disabled 투명도: `opacity/20`(0.2) → `ref-opacity-20`
- Radius: S/M `radius/05`=10px → `ref-radius-05`, L `radius/06`=12px → `ref-radius-06`
- Border width: `borderwidth/02`=1px → `ref-borderwidth-02`
- Spacing: `spacing/01,02,04,05,06,07,08,09,10` 전부 `ref-spacing-01~10`과 일치
- 타이포: Label/TypeBox/Button/Supporting Text 전부 저장소 `tokens/typography.json`과 일치(2장·5장 참고)
- 캐럿(Text Blinker) radius `radius/01`=2px, 색상 `brand/primary-default`/`theme/destructed-default` — 전부 `ref-radius-01`, `sys-color-*`와 일치

**기존 토큰에 없음**
- Size(S/M/L)별로 "Text Input엔 이 padding+radius+아이콘크기 조합을 쓴다"는 시맨틱 토큰 자체는 저장소에 없음(개별 값은 토큰과 일치)
- Destructed가 Selected·Typing 두 State에서만 노출되는 규칙을 명시하는 토큰/문서 없음
- Typing 상태에서 Right Icon이 "자유 아이콘 슬롯"에서 "지우기 버튼"으로 의미가 바뀌는 규칙을 명시하는 토큰/문서 없음
- `Show Unit` 단위 텍스트 슬롯 자체가 디자인 토큰이 아니라 컴포넌트 구조 영역(boolean 프로퍼티)

**확인 완료(사용자 확인)**
- `Show Unit`은 Figma 프로퍼티 패널에 등록된 정식 boolean 컴포넌트 프로퍼티입니다. 8개 variant 축(768개 계산)과는 별개의 9번째 축으로, 켜면 우측 아이콘 뒤에 단위 텍스트(예: "km")가 표시됩니다(1장·3장 핵심 발견 5 참고)

**확인 필요**
- 컴포넌트 너비: Dropdown처럼 화면 폭에 따른 가변(fluid)일 가능성이 높으나 Text Input 자체로는 재검증하지 않음(2장)
- 캐럿 깜빡임 애니메이션의 duration/easing/반복 주기(Figma에 모션 데이터 없음, text-blinker.md·type-box.md와 동일)
- `Show Unit=True`를 Done 외 다른 State·Size와 조합했을 때의 정확한 레이아웃(간격, 텍스트 스타일, Right Icon과의 관계) — 이번 15개 표본에는 Done 1건만 있어 확정하지 못함(3장 핵심 발견 5)
- Typing 상태에서 Right Icon=False일 때 지우기 버튼이 사라지는지 여부(4장)
- 접근성 마크업(`aria-hidden`, `aria-label`, `disabled`, `<label for>`) 연결 규정(7장)
- Destructed 상태에서 Supporting Text의 Theme이 함께 전환되어야 하는지(색상 단독 의존 이슈, 7장)

## 9. 샘플링에 사용한 15개 노드 (부록)

| 목적 | 노드 |
|---|---|
| 베이스라인(Size=M, State=Default, 전 토글 True) | `2119:10041` |
| Size 축(State=Default) | S `2119:9843` · M `2119:10041`(베이스라인과 중복) · L `2119:10245` |
| State 축(Size=M) | Hover `2119:10082` · Disabled `2119:10069` · Done `2119:10054` |
| Selected 축(Size=M) | Destructed=False `2119:10095` · Destructed=True `2119:18801` |
| Typing 축(Size=M) | Destructed=False `2119:10121` · Destructed=True `2119:18818` |
| 토글 축(Size=M, State=Default) | Show Button=False `2114:8648` · Show Label=False `2119:10903` · Supporting Text=False `2119:11203` · Left Icon=False `2119:10149` · Right Icon=False `2119:10048` · 5개 전부 False `2115:9089` |

전체 768개 인스턴스의 축 구조는 `get_metadata` 전수 조사(오케스트레이터 사전 확보)로 도출했습니다. `get_variable_defs`는 S/M/L 대표 노드와 Disabled 노드에서 각각 호출해 확보했고, `get_motion_context`는 최상위 프레임(`2114:8709`, recursive=true)에 1회 호출해 빈 결과를 확인했습니다.
