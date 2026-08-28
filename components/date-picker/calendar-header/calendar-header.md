# Calendar Header

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2212-2712) — Frame `2212:2712`("Calendar Header", 진열 프레임 792×256px), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`calendar-header.json`](./calendar-header.json)을 함께 참고합니다. 이 문서와 calendar-header.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-picker/`에 위치하는 Date/Time Picker 패밀리의 구성원입니다. [Date](../date/date.md)(날짜 셀), [Week](../week/week.md)(주 단위 로우)와 마찬가지로 달력/시간 선택 UI 상단에 쓰이는 헤더로 추정되며, 다른 그룹(Text Input 등)에서 재사용되지 않아 `components/global/`이 아니라 이 패밀리 전용 폴더에 둡니다.

## 0. 문서 범위와 샘플링 방법

Calendar Header는 **Title(Left/Center) × With(Arrows/Close/Nothing) 2축, 6-변형 컴포넌트**입니다. 6개 변형 전부 동일한 352×56px 프레임입니다.

- `get_design_context`를 최상위 프레임(`2212:2712`)에 **1회** 호출해 6개 변형 전체가 조건부 prop(`title`/`propWith`/`showDropdown`)으로 병합된 하나의 코드로 반환되었습니다 — 개별 노드 6개를 따로 호출할 필요가 없었습니다. 반환된 코드의 `id={...}` 삼항식에 박혀 있는 6개 `data-node-id`를 대조한 결과, 작업 지시에 제시된 6개 노드 ID와 **정확히 일치**함을 확인했습니다(8장 부록).
- `get_variable_defs`는 상위 그룹(`2497:13877`, Date/Time Picker 패밀리 전체)에서 이미 확보된 공용 변수맵을 재사용했습니다 — 이 컴포넌트에서 쓰인 변수(`spacing/02,06,08,11`, `radius/06`, `neutral/800`, `font/pretendard`, `weight/600`, `SubTitle/18 SB`, `Body 1/16 SB`)가 전부 공용 맵에 이미 포함되어 있어 개별 재호출을 하지 않았습니다.
- **모션 데이터 없음** — `get_motion_context`를 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출한 결과 `{"nodes":[]}`였습니다(오케스트레이터 사전 확보, 패밀리 전체 11개 컴포넌트 공용 — 6장 참고).
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Calendar Header는 달력(월/연도 선택) 상단에 위치하는 **352×56px 헤더 바**입니다. "연·월" 텍스트(예: Figma 샘플 데이터상 `"2000년 1월"`)와, 상황에 따라 이전/다음 달 이동 화살표 또는 닫기 버튼을 조합해 보여줍니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Title** | Left / Center | "연·월" 텍스트의 정렬 위치. Left는 SubTitle/18 SemiBold(18px, 더 큼), Center는 Body 1/16 SemiBold(16px, 더 작음) — **정렬뿐 아니라 타이포 크기 자체가 다릅니다**(실측 확인, 3장) |
| **With** | Arrows / Close / Nothing | 우측(또는 좌우)에 배치되는 부가 컨트롤. Arrows=이전/다음 달 이동 화살표, Close=닫기(X) 버튼(+ 제목 옆 위쪽 화살표), Nothing=제목만(부가 컨트롤 없음) — 실측으로 확인 완료(3장) |
| **Show Dropdown**(비-variant 축) | False / True(기본 True) | 제목 텍스트 옆에 작은 20px 화살표 아이콘(펼침/접힘 표시)을 보여줄지 여부. 코드에 `showDropdown` prop으로 존재하며 **6개 공식 variant 축과는 별개의 boolean 컴포넌트 프로퍼티입니다**(Text Input의 `Show Unit`과 동일한 패턴 — 4장 참고). **사용자 확인 완료** — 정식 boolean 컴포넌트 프로퍼티가 맞습니다 |

## 2. 6개 변형 매핑 (전수 실측)

`get_design_context` 1회 호출로 반환된 병합 코드의 `id={...}` 조건부 분기를 노드 ID와 대조한 결과입니다.

| Title | With | 노드 ID | 텍스트 스타일 | 부가 컨트롤 |
|---|---|---|---|---|
| Left | Arrows | `2212:2711` | SubTitle/18 SB | 우측에 이전/다음 화살표 2개(붙어있는 "Arrow Box") |
| Left | Close | `2224:3073` | SubTitle/18 SB | 제목 옆 위쪽 화살표(arrowhead_up) + 우측 닫기(X) 버튼 |
| Left | Nothing | `2212:2710` | SubTitle/18 SB | 제목 옆 아래쪽 화살표(arrowhead_down)만(Show Dropdown=True 시) |
| Center | Nothing | `2212:2709` | Body 1/16 SB, 중앙 정렬 | 제목 옆 아래쪽 화살표(arrowhead_down)만(Show Dropdown=True 시) |
| Center | Arrows | `2224:3104` | Body 1/16 SB, 중앙 정렬 | 좌측 이전 화살표 버튼 + 제목(flex-1, 중앙) + 우측 다음 화살표 버튼(3분할 레이아웃) |
| Center | Close | `2224:3126` | Body 1/16 SB, 중앙 정렬 | 제목 옆 위쪽 화살표(arrowhead_up) + 우측 닫기(X) 버튼 |

## 3. 레이아웃 구조 상세

**루트 컨테이너**: `flex` row, `w-352px h-56px`, `items-center`, 기본 gap `spacing/08`=12px. 패딩은 조합별로 다릅니다(전부 실측 확인):

| 조합 | 패딩 |
|---|---|
| Center + Close | `justify-center`, **`pl-60px`(하드코딩, 토큰 없음)** / `pr-spacing/06`=8px / `py-spacing/06`=8px |
| Center + (Arrows 또는 Nothing) | `justify-center`, `p-spacing/06`=8px(사방 동일) |
| Left + Nothing | `px-spacing/11`=20px / `py-spacing/06`=8px |
| Left + Arrows, Left + Close | `pl-spacing/11`=20px / `pr-spacing/06`=8px / `py-spacing/06`=8px |

**"Year and Month" 텍스트 블록**(`flex` row, gap `spacing/02`=2px, `items-center`): Center+Arrows를 제외한 5개 조합에서 공통으로 쓰이며, `flex-[1_0_0]`(가변 폭, 남는 공간을 채움)로 배치됩니다. Center+Arrows만 이 블록을 별도 인스턴스로 분리해 좌우 화살표 버튼 사이(3분할 레이아웃 중앙)에 배치합니다 — 즉 **레이아웃 구조 자체가 Center+Arrows에서만 갈라집니다**.

- Title=Left: 텍스트 SubTitle/18 SemiBold, 색상 `neutral/800`
- Title=Center(Arrows 제외): 텍스트 Body 1/16 SemiBold, `text-center`, 색상 `neutral/800`
- 아이콘(20px, `Show Dropdown=True`일 때만):
  - With=Arrows 또는 Nothing → `arrowhead_down`(닫힌/접힌 상태 암시)
  - With=Close → `arrowhead_up`(펼쳐진 상태 암시 — 아래 닫기 버튼과 짝을 이룸)

**이전/다음 달 이동 컨트롤**(Icon Button, `p-spacing/06`=8px, `radius/06`=12px, 내부 아이콘 24px):
- Left+Arrows: 텍스트 블록 뒤(우측, flex-1로 밀림)에 gap 없이 붙은 "Arrow Box" 안에 `chevron_left` → `chevron_right` 순서로 2개
- Center+Arrows: 좌측에 `chevron_left` 버튼 1개, 우측에 `chevron_right` 버튼 1개(텍스트 블록을 사이에 두고 분리 배치)

**닫기 버튼**(Icon Button, 동일 스타일, 내부 아이콘 24px `close`): With=Close(Left/Center 공통)에서 텍스트 블록 뒤에 1개.

With=Nothing 조합(Left/Center 공통)은 이전/다음·닫기 버튼이 전혀 없고 텍스트 블록만 전체 폭을 채웁니다.

## 4. 핵심 발견

1. **Title=Left/Center는 정렬뿐 아니라 타이포 크기 자체가 다릅니다.** Left는 SubTitle/18(18px), Center는 Body1/16(16px) — 작업 지시의 가설("정렬 위치 차이로 추정")보다 한 단계 더 구체적인 차이가 실측으로 확인되었습니다.
2. **With=Close는 "제목 옆 위쪽 화살표 + 우측 닫기 버튼"의 조합입니다.** 단순히 닫기 버튼만 추가되는 것이 아니라, 제목 옆 화살표도 `arrowhead_down`→`arrowhead_up`으로 바뀝니다 — 달력/드롭다운이 펼쳐진 상태를 아이콘 방향 반전으로 표현하고, Close 버튼으로 그 펼쳐진 상태를 닫는 구조로 추정됩니다.
3. **With=Arrows에서 레이아웃 골격이 Title에 따라 달라집니다.** Left+Arrows는 화살표 2개가 텍스트 오른쪽에 붙어 한 그룹으로 이동하지만, Center+Arrows는 화살표가 좌/우로 완전히 분리되어 제목을 감싸는 3분할(prev - title - next) 레이아웃입니다.
4. **Center+Close의 `pl-60px`는 토큰에 없는 하드코딩 값입니다.** `justify-center`와 함께 좌우 패딩이 비대칭(60px vs 8px)이라 텍스트 블록이 352px 전체 폭 기준으로 정확히 중앙 정렬되지 않고, 우측 닫기 버튼의 시각적 무게를 상쇄하는 방향(좌측으로 살짝 이동)으로 치우쳐 있습니다. **사용자 확인 완료** — 이 값은 **좌측에 아이콘이 없다(비어있다)는 것을 명시적으로 표현하기 위해 의도적으로 하드코딩**한 여백입니다. 토큰화되지 않은 것도 의도적(범용 spacing 토큰이 아니라 이 조합 전용 보정값)으로 이해하면 됩니다.
5. **`Show Dropdown`은 6개 공식 축과 별개의 정식 boolean 프로퍼티입니다(사용자 확인 완료).** 코드에 `showDropdown = true` 기본값으로 존재하며 꺼지면 제목 옆 화살표 아이콘만 사라집니다. Text Input의 `Show Unit`과 동일한 패턴(Variant 프로퍼티가 아니라 인스턴스별 속성 패널 프로퍼티)입니다.

## 5. 서브컴포넌트/아이콘 사용

Calendar Header 자체는 Date/Time Picker 패밀리의 다른 서브 아톰(Date, Time Field 등)을 조합하지 않는 **독립적인 헤더 바**입니다. 사용된 아이콘:

| 아이콘 | 크기 | 사용처 |
|---|---|---|
| `arrowhead_down` | 20px | With=Arrows/Nothing에서 제목 옆(펼침 표시) |
| `arrowhead_up` | 20px | With=Close에서 제목 옆(접힘/펼쳐진 상태 표시) |
| `chevron_left` | 24px | 이전 달 이동(With=Arrows) |
| `chevron_right` | 24px | 다음 달 이동(With=Arrows) |
| `close`(X) | 24px | 닫기(With=Close) |

Icon Button 래퍼(`p-spacing/06`=8px, `radius/06`=12px)는 다른 컴포넌트(Time Picker의 스테퍼 버튼 등)와 동일한 크기 규칙을 씁니다 — 저장소 전역에서 재사용되는 아이콘 버튼 패턴으로 보이나, 별도의 `Icon Button` 컴포넌트 문서가 아직 없어 직접 링크하지는 않습니다.

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출한 결과(오케스트레이터 사전 확보, 패밀리 11개 컴포넌트 전체 공용) `{"nodes":[]}`였습니다. With=Nothing↔Close 전환(화살표 방향 반전, 달력 펼침/접힘) 자체에 대한 duration/easing 등 모션 값이 Figma 파일에 정의되어 있지 않습니다.

## 7. 접근성

- 이전/다음 달, 닫기 버튼은 아이콘만 있는 버튼(icon-only button)으로 보이며, `aria-label`("이전 달", "다음 달", "닫기" 등) 연결 규정이 Figma 파일에 없습니다 — 확인 필요.
- 제목 텍스트 + 화살표 아이콘이 실제로는 월/연도 선택 드롭다운을 여는 트리거 버튼일 가능성이 높습니다(With=Close 상태의 위쪽 화살표가 "펼쳐짐"을 암시). 그렇다면 `aria-expanded`, `aria-haspopup` 등의 마크업이 필요해 보이나 Figma에는 규정이 없습니다 — 확인 필요.
- 화살표 아이콘 방향 반전(down↔up)만으로 펼침/접힘 상태를 전달하는 것은 스크린리더 사용자에게 전달되지 않으므로, 텍스트 레이블이나 `aria-expanded` 등 보조 수단이 필요해 보입니다 — 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- Spacing: `spacing/02`=2px, `spacing/06`=8px, `spacing/08`=12px, `spacing/11`=20px → 각각 `ref-spacing-02/06/08/11`과 일치
- Radius: `radius/06`=12px → `ref-radius-06`
- 색상: `neutral/800`(#202837) → `sys-color-neutral-800`(`ref-color-gray-800`)
- 타이포: `SubTitle/18 SB`(18px/24px/-0.09px, Semibold), `Body 1/16 SB`(16px/24px/-0.04px, Semibold) 전부 `tokens/typography.json`의 subtitle·body1 스타일 + weight-600과 정확히 일치
- 프레임 크기: 352×56px는 Figma 컴포넌트 루트에 명시적으로 박힌 고정값(`w-[352px] h-[56px]`)

**기존 토큰에 없음**
- Center+Close의 `pl-60px`: 저장소 `tokens/spacing.json`의 `ref-spacing-*` 중 60px에 해당하는 값이 없음(가장 가까운 값은 `ref-spacing-18`=56px, `ref-spacing-19`=64px) — 좌측에 아이콘이 없음을 의도적으로 표현하기 위한 전용 보정값(사용자 확인, 토큰화 대상 아님)
- Title(Left/Center)별로 타이포가 SubTitle18↔Body1/16으로 바뀌는 규칙 자체를 명시하는 시맨틱 토큰은 저장소에 없음
- With(Arrows/Close/Nothing)별 레이아웃 골격 차이(특히 Center+Arrows의 3분할 구조)를 규정하는 토큰/문서 없음

**확인 완료(사용자 확인)**
- `Show Dropdown`은 정식 boolean 컴포넌트 프로퍼티입니다(Text Input의 `Show Unit`과 동일한 패턴)
- Center+Close의 `pl-60px`는 좌측에 아이콘이 없음을 의도적으로 표현하기 위한 전용 하드코딩 보정값입니다
- ~~"연·월" 텍스트 실제 포맷~~ — **정정**: 최초 초안에 `"2000월 1월"`로 오기됨. [Date Picker](../date-picker/date-picker.md)·[Date Picker Group](../date-picker-group/date-picker-group.md) 문서 작성 과정에서 동일 노드를 재조회한 결과 실제 값은 `"2000년 1월"`(연·월 정상 포맷)임을 확인, 본 문서도 정정함

**확인 필요**
- 아이콘 전용 버튼의 `aria-label`, `aria-expanded`/`aria-haspopup` 등 접근성 마크업 연결 규정

## 9. 샘플링에 사용한 노드 (부록, 6개 전수)

| Title＼With | Arrows | Close | Nothing |
|---|---|---|---|
| **Left** | `2212:2711` | `2224:3073` | `2212:2710` |
| **Center** | `2224:3104` | `2224:3126` | `2212:2709` |

6개 변형 전체가 `get_design_context` 1회 호출(`2212:2712`)로 병합 코드로 반환되었으며, 위 노드 ID는 그 코드의 조건부 `id={...}` 분기에 박힌 `data-node-id`를 정리한 것입니다. `get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 확보한 값을 재사용했습니다.
