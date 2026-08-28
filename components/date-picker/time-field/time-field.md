# Time Field

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2229-8789) — Frame `2229:8789`("Time Field", 진열 프레임 248×80px), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`time-field.json`](./time-field.json)을 함께 참고합니다. 이 문서와 time-field.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-picker/`에 위치하는 Date/Time Picker 패밀리의 최하위 아톰입니다. [Time Picker](../time-picker/time-picker.md)가 이 컴포넌트를 그대로 인스턴스로 재사용합니다(5장) — Text Input 패밀리의 [Type Box](../../global/type-box/type-box.md)와 유사한 위치의 서브 아톰입니다.

## 0. 문서 범위와 샘플링 방법

Time Field는 **State(Default/Hover/Typing) 단일 축, 3-변형 컴포넌트**입니다. 3개 변형 전부 동일한 56×40px(hug-content로 산출됨, 2장 참고) 크기입니다.

- `get_design_context`를 최상위 프레임(`2229:8789`)에 **1회** 호출해 3개 변형 전체가 조건부 prop(`state`)으로 병합된 하나의 코드로 반환되었습니다 — 개별 노드 3개를 따로 호출할 필요가 없었습니다. 코드의 `id={...}` 삼항식에 박힌 3개 `data-node-id`(`2229:8786`/`2229:8787`/`2229:8788`)가 작업 지시의 노드 ID와 **정확히 일치**함을 확인했습니다(6장 부록).
- `get_variable_defs`는 상위 그룹(`2497:13877`)에서 이미 확보된 공용 변수맵을 재사용했습니다 — 이 컴포넌트에서 쓰인 변수(`spacing/01,06,07`, `radius/01,06`, `borderwidth/02`, `neutral/200,800`, `common/white-default`, `brand/primary-default`, `color/gray/900-5`, `Body 1/16 R`)가 전부 공용 맵에 이미 포함되어 있어 개별 재호출을 하지 않았습니다.
- **모션 데이터 없음** — `get_motion_context`를 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출한 결과 `{"nodes":[]}`였습니다(오케스트레이터 사전 확보, 패밀리 전체 11개 컴포넌트 공용 — 6장 참고).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Time Field는 시(時)/분(分)/초(秒) 등 시간 값 **2자리 숫자 하나**를 표시·입력하는 작은 필드입니다("00" 샘플 텍스트로 확인). Text Input과 달리 Size 축, Label, Supporting Text, 좌우 아이콘이 전혀 없는 순수 최소 단위 컴포넌트입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **State** | Default / Hover / Typing | 상호작용 상태. Default=비활성 배경(회색 채움), Hover=Default 위에 어두운 오버레이 추가, Typing=포커스 상태(흰 배경+파란 테두리+캐럿) |

**중요**: 3개 State 전부 텍스트 색상이 `neutral/800`로 동일합니다 — Text Input의 Placeholder(옅은 회색)처럼 값이 없을 때 색을 죽이는 처리가 없습니다. 즉 이 컴포넌트에서 샘플링된 "00"은 **항상 실제 값처럼 렌더링되는 표시**로 보이며, 별도의 "빈 값/placeholder" 변형은 Figma 컴포넌트 자체에 존재하지 않습니다.

> **사용자 확인 완료**: Time Field는 클릭해서 숫자를 **직접 타이핑으로 입력할 수 있습니다**(스테퍼 전용 디스플레이가 아님). 즉 Typing 상태(흰 배경+파란 테두리+캐럿, 3장)가 실제 사용자 입력 흐름에서 그대로 쓰입니다 — [Time Picker](../time-picker/time-picker.md) 안에서 State=Default로 고정되어 보였던 것은 진열 샘플의 한계였을 뿐, 실제로는 Time Picker 안에서도 클릭 시 Typing 상태로 전환되어 타이핑이 가능한 것으로 이해해야 합니다.

## 2. State별 스펙 (3개 전수 실측)

| State | 배경 | 테두리 | 텍스트 | 커서 | 기타 |
|---|---|---|---|---|---|
| **Default** | `neutral/200`(#f1f2f3) | 없음 | "00", Body 1/16 R, `neutral/800`(#202837), 중앙 정렬 | — | — |
| **Hover** | `neutral/200` 베이스 위에 `color/gray/900-5`(rgba(3,9,26,0.05), 5% 검정) 오버레이 | 없음 | 동일(변화 없음) | `cursor-pointer` | 값은 Default와 동일하고 배경만 살짝 어두워짐(Date 컴포넌트의 Hover 오버레이와 동일한 5% 패턴) |
| **Typing** | `common/white-default`(#fdfdfd) | `borderwidth/02`=1px, `brand/primary-default`(#2c7be2) | 동일(변화 없음) | — | 텍스트 뒤에 [Text Blinker](../../global/text-blinker/text-blinker.md) 캐럿 인스턴스가 추가됨(3장) |

**구조**: 루트 `flex` row, `items-center`, gap `spacing/07`=10px, padding-x `spacing/07`=10px, padding-y `spacing/06`=8px, `radius/06`=12px. 내부에 "Number Input" 래퍼(`flex` row, `items-center justify-center`, 고정 폭 36px, `px-[8px]` — 값은 `spacing/06`(8px)과 일치하나 코드상 CSS 변수로 바인딩되지 않은 하드코딩 클래스로 보임, 8장 참고)가 있고 그 안에 "00" 텍스트가 들어갑니다.

**크기 산출**: 고정 width/height 토큰은 없고 padding + hug-content로 56×40px가 산출됩니다 — 폭 `spacing/07`×2(20px) + Number Input 36px = 56px, 높이 `spacing/06`×2(16px) + Body1 line-height 24px = 40px. 작업 지시의 "전부 56×40px" 실측과 정확히 일치합니다.

## 3. Typing 상태의 캐럿(Text Blinker)

Typing 상태에서만 "Number Input" 래퍼에 gap `spacing/01`=1px이 추가되고, 텍스트("00") **뒤에** [Text Blinker](../../global/text-blinker/text-blinker.md) `On` 변형이 인스턴스로 붙습니다.

- 크기 1.5×20px, `radius/01`=2px, 채우기 색상 `brand/primary-default`(#2c7be2) — text-blinker.md 문서 스펙과 **정확히 일치**, 별도 오버레이/색상 오버라이드 없음(Text Input의 Destructed 오버라이드와 달리 Time Field에는 Destructed/에러 축 자체가 없음).
- 캐럿이 텍스트 뒤(오른쪽)에 위치 — Text Input의 Typing 상태(값 뒤에 캐럿)와 동일한 패턴입니다.

## 4. 핵심 발견

1. **Size 축, Label, Supporting Text, 좌우 아이콘이 전혀 없습니다.** Text Input·Dropdown 계열과 달리 이 컴포넌트는 숫자 2자리만 담는 최소 단위 필드입니다.
2. **텍스트 색상이 State와 무관하게 항상 `neutral/800`로 동일합니다.** Text Input의 Placeholder처럼 "값 없음"을 색으로 표현하는 변형이 없어, 빈 값 상태를 어떻게 표시하는지는 Figma 컴포넌트만으로 확인할 수 없습니다.
3. **Hover 오버레이가 [Date](../date/date.md) 컴포넌트와 동일한 5% 검정 오버레이(`color/gray/900-5`) 패턴을 씁니다** — 같은 패밀리 안에서 재사용되는 인터랙션 표현 규칙으로 보입니다.
4. **Disabled 상태가 Figma 컴포넌트에 존재하지 않습니다.** Default/Hover/Typing 3종뿐입니다. **사용자 확인 완료** — 이는 의도된 설계로, 실제 제품에서 시간 필드를 비활성화할 일이 없어 Disabled 변형이 필요하지 않습니다.

## 5. 재사용 관계

- **Text Blinker**: [`components/global/text-blinker/text-blinker.md`](../../global/text-blinker/text-blinker.md)의 `On` 변형을 Typing 상태에서 색상 오버라이드 없이 그대로 인스턴스로 사용(3장).
- **Time Picker가 이 컴포넌트를 그대로 인스턴스로 재사용**합니다 — [`time-picker.md`](../time-picker/time-picker.md) 참고. Time Picker 자체의 병합 변형 코드 안에서는 내장된 Time Field가 State=Default로 고정되어 보였으나(Hover/Typing 옵션이 코드 타입에서 제외), **사용자 확인 완료** — 실제로는 Time Picker 안에서도 클릭 시 Typing 상태로 전환되어 직접 타이핑이 가능합니다. Figma 변형 스냅샷에 없다고 해서 실제 인터랙션이 없는 것은 아니었습니다.

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출한 결과(오케스트레이터 사전 확보, 패밀리 11개 컴포넌트 전체 공용) `{"nodes":[]}`였습니다. Default↔Hover↔Typing 전환, 캐럿 깜빡임 모두 Figma 파일에 모션 값이 정의되어 있지 않습니다([text-blinker.md](../../global/text-blinker/text-blinker.md) 3장과 동일한 확인 필요 사항).

## 7. 접근성

- 캐럿(Text Blinker) 접근성: [text-blinker.md](../../global/text-blinker/text-blinker.md) 4장과 동일하게 `aria-hidden`, 네이티브 캐럿과의 중복 방지 확인 필요.
- 실제 구현 시 `<input type="text" inputmode="numeric" maxlength="2">` 등으로 매핑될 것으로 보이나, 값의 범위 제약(예: 분은 0~59)이나 자동 포맷팅 규칙은 Figma 디자인만으로 확인 불가 — 확인 필요.
- Hover 상태에 `cursor-pointer`가 적용되어 있어 전체 박스가 클릭 가능한 포커스 타겟으로 보이나, 실제 `<input>` 포커스와 클릭 영역이 일치하는지는 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- 배경: `neutral/200`(#f1f2f3) → `sys-color-neutral-200`(`ref-color-gray-200`), `common/white-default`(#fdfdfd) → `sys-color-common-white-default`
- 강조 테두리: `brand/primary-default`(#2c7be2) → `sys-color-brand-primary-default`, `borderwidth/02`=1px → `ref-borderwidth-02`
- Hover 오버레이: `color/gray/900-5`(rgba(3,9,26,0.05)) → `ref-color-alpha-gray-900-5`
- 텍스트: `neutral/800`(#202837) → `sys-color-neutral-800`, Body 1/16 R → `tokens/typography.json` body1 스타일과 일치
- Radius: `radius/06`=12px → `ref-radius-06`, 캐럿 `radius/01`=2px → `ref-radius-01`
- Spacing: `spacing/01`=1px, `spacing/06`=8px, `spacing/07`=10px 전부 `ref-spacing-01/06/07`과 일치

**확인 완료(사용자 확인)**
- Time Field는 클릭해 직접 타이핑 입력이 가능함(스테퍼 전용 디스플레이 아님)
- Disabled 상태가 없는 것은 의도된 설계(실제 제품에서 비활성화 불필요)

**기존 토큰에 없음 / 확인 필요**
- "Number Input" 래퍼의 고정 폭 36px — 값 자체는 `ref-spacing-15`(36px)와 우연히 일치하나, 코드상 변수로 바인딩되지 않은 하드코딩(`w-[36px]`)이라 의도적으로 그 토큰을 참조한 것인지는 확인 필요
- "Number Input" 내부 `px-[8px]` — 값은 `spacing/06`(8px)과 일치하나 코드에 CSS 변수 주석이 없어(다른 곳은 전부 `var(--spacing\/XX,...)` 형태) 하드코딩으로 추정
- State와 무관하게 텍스트 색이 항상 `neutral/800`인 것에 대응하는 "빈 값" 표현 규칙 자체가 저장소에 없음

## 9. 샘플링에 사용한 노드 (부록, 3개 전수)

| State | 노드 ID |
|---|---|
| Default | `2229:8788` |
| Hover | `2229:8787` |
| Typing | `2229:8786` |

3개 변형 전체가 `get_design_context` 1회 호출(`2229:8789`)로 병합 코드로 반환되었으며, 위 노드 ID는 그 코드의 조건부 `id={...}` 분기에 박힌 `data-node-id`를 정리한 것입니다. `get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 확보한 값을 재사용했습니다.
