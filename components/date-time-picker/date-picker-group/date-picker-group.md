# Date Picker Group

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2215-12847) — Component Set `2215:12847` ("Date Picker Group"), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`date-picker-group.json`](./date-picker-group.json)을 함께 참고합니다. 이 문서와 date-picker-group.json은 항상 같은 소스에서 나온 값이어야 합니다.
> [Date Picker](../date-picker/date-picker.md) 2개를 [Divider](../../divider/divider.md)로 구분해 나란히 배치한 **범위(range) 선택용 조합 컴포넌트**입니다. Date/Time Picker 패밀리에서 Date Picker보다 한 단계 더 높은 조합 레벨입니다.

## 0. 문서 범위와 샘플링 방법

Date Picker Group은 **Type(Horizontal/Vertical) 1축, 2-변형 컴포넌트**입니다. 2개 전수를 실측했습니다.

- `get_metadata`로 두 변형(`2215:12845` Horizontal, `2215:12846` Vertical)의 자식 구조(Date Picker 인스턴스 2개 + Divider 인스턴스 1개, 정확히 3자식)를 먼저 확인했습니다.
- `get_design_context`를 두 변형 각각에 호출해 내부 Date Picker 인스턴스의 헤더 구성·패딩·콘텐츠를 실측했습니다.
- `get_variable_defs`·`get_motion_context`는 패밀리 최상위 그룹(`2497:13877`)에서 확보한 값을 재사용했습니다(모션 데이터 없음 확인 — 5장).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Horizontal / Vertical | [Date Picker](../date-picker/date-picker.md) 2개의 배치 방향. Horizontal=가로 나열(721px), Vertical=세로 스택(352px) |

두 변형 모두 정확히 **Date Picker 인스턴스 2개 + [Divider](../../divider/divider.md) 인스턴스 1개**로만 구성됩니다(`get_metadata`로 확인, 자식 노드 수 3개 고정). 실측 노드의 두 Date Picker는 모두 **State=Default, Time Picker=Off**를 사용하며, 표시 값(연/월, 날짜 "00")은 두 패널이 동일한 플레이스홀더를 공유합니다(Text Input의 "00"/"Input Text" 진열 패턴과 동일 — 실제 사용 시 좌우/상하 패널은 서로 다른 달을 보여줄 것으로 추정).

## 2. Type=Horizontal (721×342px, 노드 `2215:12845`)

- Date Picker 인스턴스 2개(가로 나열) + 그 사이에 **90도 회전된 세로 [Divider](../../divider/divider.md)**(`neutral/200`, 1px 두께, `container-type: size` + `rotate-90` 기법으로 세로선 구현).
- **각 Date Picker 인스턴스가 360px로 확장되어 있습니다**(단독 [Date Picker](../date-picker/date-picker.md) 문서의 기본 352px보다 8px 넓음) — 360+1(Divider)+360=721px을 정확히 채우기 위한 인스턴스 단위 너비 오버라이드로 보입니다.
- **좌측 Date Picker**(`2224:3350`) 헤더: 제목 텍스트("2000년 1월", SubTitle/18 SB) + `arrowhead_down` 20px 아이콘만 있고 **이전/다음 달 Arrow Box가 없습니다.**
- **우측 Date Picker**(`2224:3449`) 헤더: 동일 제목 텍스트 + **드롭다운 화살표(`arrowhead_down`)** + Arrow Box(이전/다음 달 `chevron_left`/`chevron_right`). 즉 **양쪽 다 드롭다운이 있고**, 화살표만 우측에 더 붙습니다.
- 즉 좌우 두 패널은 `Show Dropdown=true` 로 같고, `With` 만 좌=`Nothing` · 우=`Arrows` 로 다릅니다.

> **⚠️ 2026-09-15 정정.** 이전 판은 "우측은 드롭다운 화살표 없이 Arrow Box 만 있습니다" 였습니다.
> Plugin API 로 확인하니 우측 헤더도 `Show Dropdown = true` 이고 `arrowhead_down` 노드가 `visible: true` 입니다
> (좌측 `Year and Month` 320×24 · 우측 240×24 + `Arrow Box` 80×40).
> 우측에도 드롭다운이 있어야 **두 패널이 각자의 휠을 열 수** 있습니다.

> **⚠️ 2026-09-15 정정 (사용자 지시).** 이전 판은 "두 패널은 동기화되지 않은 독립적인 캘린더입니다(사용자 확인)" 였는데 **반대입니다.**
>
> 두 패널은 **연속된 두 달**을 함께 보여 줍니다 — 그룹이 기준 달 하나를 들고, 첫 패널이 기준 달을 · 다음 패널이 그 다음 달을 그립니다.
> 어느 쪽에서 달을 옮기든(화살표든 휠이든) **둘이 같이** 움직이고 제목도 함께 바뀝니다.
> 따라서 우측에만 Arrow Box 가 있는 것은 진열 배치가 아니라 **고정 규칙**입니다 — 화살표 한 벌이 두 달을 함께 옮기므로 양쪽에 달 이유가 없습니다.
>
> 패널마다 따로인 것은 두 가지뿐입니다.
> - **연·월 휠**: 각 헤더의 제목을 눌러 그 패널의 휠을 엽니다(양쪽을 동시에 열어 둘 수도 있습니다).
>   어느 쪽 휠에서 고르든 **그 패널이 고른 달을 보여주도록** 기준 달이 옮겨지므로 두 달의 간격은 유지됩니다.
> - **Time Picker**: 켜면 패널마다 자기 시간 값을 가집니다.
- Calendar 콘텐츠 영역 패딩: 좌우 모두 `p=spacing/10`(16px, Date Picker 단독 문서의 `spacing/08`=12px보다 큼) — Group 안에서는 패딩이 확장되어 쓰입니다.
- 두 Date Picker 모두 Month는 **Week Number=5**(5주 그리드) 변형을 사용합니다.

## 3. Type=Vertical (352×661px, 노드 `2215:12846`)

- Date Picker 인스턴스 2개(세로 스택, 바깥 컨테이너 `gap=spacing/04`=4px) + 그 사이에 **가로 [Divider](../../divider/divider.md)**(`neutral/200`, `h-px`, `w-full`) — 두 Date Picker와 Divider 사이 각각 4px gap이 적용되어 총 분리 폭은 4+1+4=9px입니다.
- 두 Date Picker 모두 **352px 기본 너비 그대로**(Horizontal과 달리 확장 없음).
- **헤더가 Arrow Box·드롭다운 토글 둘 다 없이 제목 텍스트만** 표시됩니다("1월"/"2월" — **연도 없이 월(月)만** 표시, Horizontal의 "2000년 1월"과 달리 축약된 텍스트). [Calendar Header](../calendar-header/calendar-header.md)의 "Title=Left, With=Nothing" 변형에 대응하나, 텍스트 콘텐츠 자체가 "연+월"이 아닌 "월"만이라는 점은 Calendar Header 문서에 없는 이 컴포넌트 특유의 콘텐츠 오버라이드입니다.
- Calendar 콘텐츠 영역 패딩: `px=spacing/08`(12px), `py=spacing/06`(8px) — 좌우/상하 패딩이 다른 비대칭 패딩이며, Horizontal(균등 16px)·Date Picker 단독(균등 12px) 어느 쪽과도 다릅니다.
- **부수 화면이 전부 빠집니다**(사용자 지시, 2026-09-15). 연·월 휠도 Time Picker 도 쓰지 않고, 이전/다음 화살표도 없습니다 — 특정 상황에서만 쓰는 **고정 표시**라서 달력 격자만 그대로 씁니다. 두 패널이 연속된 두 달이라는 점은 Horizontal 과 같습니다.
- 두 Date Picker 모두 Month는 Week Number=5(5주 그리드) 변형을 사용합니다.

## 4. Type별 비교 요약

| 항목 | Horizontal | Vertical |
|---|---|---|
| 전체 크기 | 721×342px | 352×661px |
| Divider 방향 | 세로(90도 회전) | 가로 |
| Date Picker 인스턴스 너비 | 360px(확장) | 352px(기본) |
| 헤더 구성 | 좌: 드롭다운만 / 우: Arrow Box만(비대칭) | 둘 다 텍스트만(대칭, 월만 표시) |
| Calendar 콘텐츠 패딩 | 16px 균등 | 12px(좌우)/8px(상하) |
| 두 Date Picker 사이 간격 | Divider 두께(1px)만, 별도 gap 없음 | 4px+1px+4px=9px |

## 4.1 기간(range)은 두 패널에 걸쳐 이어집니다

`2612:15933` 주석의 마지막 줄이 이 컴포넌트를 직접 가리킵니다 — *"기간은 패널 두개가 붙어도 계속 이어짐"*.
`2612:15031`(가로 그룹)이 그 예시입니다:

| | 왼쪽 패널 | 오른쪽 패널 |
|---|---|---|
| 시작 앵커 | 2번째 줄 2번 칸 (Pinned) | — |
| 그 뒤 | 줄 끝까지 + 아래 3줄 전부 Selected | 1번째 줄 전부 Selected |
| 끝 앵커 | — | 2번째 줄 3번 칸 (Pinned) |

즉 **두 패널이 기간 하나를 나눠 그립니다.** 어느 패널에서 시작해 어느 패널에서 끝나든
사이의 날짜는 전부 Selected가 됩니다. 달을 옮기는 것과 같은 구조입니다 — 그룹이 값 하나를
들고 두 패널에 똑같이 내려 주면, 각 패널이 자기 달에 해당하는 만큼만 잘라 그립니다.

### 다만 띠는 패널 사이를 건너뛰지 않습니다

띠([Month](../month/month.md) 2.1장)는 각 패널의 **격자(328px) 안에서 끝납니다.** 절대 좌표 실측:

| | 왼쪽 Month | 가운데 | 오른쪽 Month |
|---|---|---|---|
| x 범위 | 2924 ~ 3252 | **3252 ~ 3285 (33px 비어 있음)** | 3285 ~ 3613 |

33px = 달력 여백 16 + Divider 1 + 달력 여백 16입니다. 왼쪽 패널의 마지막 줄 띠는 3252에서 끊기고,
오른쪽 패널의 첫 줄 띠는 3285에서 새로 시작합니다. **"이어진다"는 것은 기간의 논리가 이어진다는 뜻이지
칠이 물리적으로 연결된다는 뜻이 아닙니다.**

### Vertical에서는

세로형도 연속된 두 달이므로 기간 규칙은 같습니다. 다만 세로형은 **부수 화면 없이 고정 표시로만**
쓰기로 했으므로(3장) 실제로 기간을 잡는 화면으로 쓸지는 정해져 있지 않습니다. → 확인 필요

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다.

## 6. 접근성

- 두 패널이 **하나의 달력**으로 묶여 동작하므로(2장), 그룹 전체를 하나의 `role="group"` 으로 묶고 각 패널에 달 이름을 `aria-label` 로 다는 편이 맞아 보이나 정확한 규정은 Figma 파일에 없음 — 확인 필요.
- 개별 [Date](../date/date.md) 셀의 접근성 이슈(6장)가 이 컴포넌트에도 동일하게 적용됩니다.

## 7. 토큰 매칭 요약

**정확히 일치**
- Divider: `neutral/200`(#f1f2f3) → `sys-color-neutral-200`, [divider.md](../../divider/divider.md)의 스펙과 일치
- Vertical 바깥 gap `spacing/04`=4px, Horizontal 콘텐츠 패딩 `spacing/10`=16px, Vertical 콘텐츠 패딩 `spacing/08`=12px/`spacing/06`=8px 전부 저장소 spacing 토큰과 일치
- 서브컴포넌트([Date Picker](../date-picker/date-picker.md) 및 그 하위 전체) 값 전부 각 문서와 일치

**기존 토큰에 없음**
- Date Picker 인스턴스를 360px로 확장하는 규칙(Horizontal 전용) 자체는 별도 토큰이 아니라 이 조합 컴포넌트만의 레이아웃 오버라이드
- Horizontal 우측에만 Arrow Box 가 붙는 규칙을 명시하는 토큰/문서 없음(2장에 근거를 적어 둠)

**확인 완료(사용자 지시, 2026-09-15)**
- 두 패널은 **연속된 두 달**을 함께 보여 주며 기준 달 하나를 나눠 씁니다(2장). 우측에만 화살표가 있는 것은 고정 규칙입니다.
- 연·월 휠과 Time Picker 만 패널마다 따로입니다.
- Vertical 은 연도 없이 달만 쓰고 휠·Time Picker·화살표가 전부 없습니다(3장).

**확인 필요**
- 접근성 마크업(`role="group"`, `aria-label`) 규정(6장)

## 8. 샘플링에 사용한 노드 (부록, 2개 전수)

| Type | 노드 | Date Picker 좌/상 | Date Picker 우/하 | Divider |
|---|---|---|---|---|
| **Horizontal** | `2215:12845` | `2224:3350` | `2224:3449` | `2215:11760`(세로) |
| **Vertical** | `2215:12846` | `2224:3700` | `2224:3803` | `2215:11757`(가로) |

`get_metadata`로 두 변형의 정확한 자식 트리(각 3자식)를 확인했고, `get_design_context`를 두 변형에 각각 호출했습니다. `get_variable_defs`·`get_motion_context`는 패밀리 최상위 그룹(`2497:13877`)에서 공용으로 확보했습니다.

## Corner Smoothing (2026-09-23 추가)

바드림 디자인시스템은 모든 Radius 에 **Corner Smoothing 60%** 를 함께 씁니다(`docs/DESIGN.md` 9.2). 이 컴포넌트는 자기 모서리가 없고, 안에 든 컴포넌트가 각자 Corner Smoothing 을 적용합니다. 이 문서에서 따로 구현한 것은 없습니다.

Figma 실측: 2026-09-23 Figma Plugin API `cornerSmoothing` 전수 조회(컴포넌트 셋 안의 모든 노드).

| 레이어 | Radius | Figma Smoothing | 구현 |
|---|---|---|---|
| 헤더 화살표(Icon Button) | 12px | 60% | 적용 (Icon Button) |
| 날짜 칸(Date) | 999px | 60% | 변화 없음(원) |
