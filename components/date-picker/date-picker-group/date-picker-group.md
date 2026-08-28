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
- **우측 Date Picker**(`2224:3449`) 헤더: 동일 제목 텍스트지만 **드롭다운 화살표(`arrowhead_down`) 없이 Arrow Box(이전/다음 달 `chevron_left`/`chevron_right`)만 있습니다.**
- 즉 좌우 두 패널이 [Calendar Header](../calendar-header/calendar-header.md)의 서로 다른 두 변형(좌="With=Nothing"+커스텀 드롭다운 토글, 우="With=Arrows")을 나눠 쓰는 비대칭 구조입니다.

> **사용자 확인 완료**: 두 패널은 **동기화되지 않은 독립적인 캘린더**입니다(한쪽 조작이 반대쪽에 영향을 주지 않음). 좌우가 서로 다른 헤더 컨트롤(드롭다운만/화살표만)을 나눠 쓰는 것은 진열 샘플의 배치일 뿐, "동기화된 range 캘린더"를 의도한 구조는 아닙니다. 실제 사용 시에는 각 Date Picker 인스턴스가 필요에 따라 [Calendar Header](../calendar-header/calendar-header.md)의 6개 변형 중 원하는 것을 독립적으로 선택해 쓰는 것으로 이해하는 것이 맞습니다 — 이 진열 노드의 좌우 조합 자체를 고정 규칙으로 보지 말 것.
- Calendar 콘텐츠 영역 패딩: 좌우 모두 `p=spacing/10`(16px, Date Picker 단독 문서의 `spacing/08`=12px보다 큼) — Group 안에서는 패딩이 확장되어 쓰입니다.
- 두 Date Picker 모두 Month는 **Week Number=5**(5주 그리드) 변형을 사용합니다.

## 3. Type=Vertical (352×661px, 노드 `2215:12846`)

- Date Picker 인스턴스 2개(세로 스택, 바깥 컨테이너 `gap=spacing/04`=4px) + 그 사이에 **가로 [Divider](../../divider/divider.md)**(`neutral/200`, `h-px`, `w-full`) — 두 Date Picker와 Divider 사이 각각 4px gap이 적용되어 총 분리 폭은 4+1+4=9px입니다.
- 두 Date Picker 모두 **352px 기본 너비 그대로**(Horizontal과 달리 확장 없음).
- **헤더가 Arrow Box·드롭다운 토글 둘 다 없이 제목 텍스트만** 표시됩니다("1월"/"2월" — **연도 없이 월(月)만** 표시, Horizontal의 "2000년 1월"과 달리 축약된 텍스트). [Calendar Header](../calendar-header/calendar-header.md)의 "Title=Left, With=Nothing" 변형에 대응하나, 텍스트 콘텐츠 자체가 "연+월"이 아닌 "월"만이라는 점은 Calendar Header 문서에 없는 이 컴포넌트 특유의 콘텐츠 오버라이드입니다.
- Calendar 콘텐츠 영역 패딩: `px=spacing/08`(12px), `py=spacing/06`(8px) — 좌우/상하 패딩이 다른 비대칭 패딩이며, Horizontal(균등 16px)·Date Picker 단독(균등 12px) 어느 쪽과도 다릅니다.
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

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다.

## 6. 접근성

- 두 Date Picker 패널이 서로 독립적이므로(사용자 확인), 각 패널을 독립된 `role="group"`으로 마크업하는 정도면 충분해 보이나 정확한 `aria-label` 규정은 Figma 파일에 없음 — 확인 필요.
- 개별 [Date](../date/date.md) 셀의 접근성 이슈(6장)가 이 컴포넌트에도 동일하게 적용됩니다.

## 7. 토큰 매칭 요약

**정확히 일치**
- Divider: `neutral/200`(#f1f2f3) → `sys-color-neutral-200`, [divider.md](../../divider/divider.md)의 스펙과 일치
- Vertical 바깥 gap `spacing/04`=4px, Horizontal 콘텐츠 패딩 `spacing/10`=16px, Vertical 콘텐츠 패딩 `spacing/08`=12px/`spacing/06`=8px 전부 저장소 spacing 토큰과 일치
- 서브컴포넌트([Date Picker](../date-picker/date-picker.md) 및 그 하위 전체) 값 전부 각 문서와 일치

**기존 토큰에 없음**
- Date Picker 인스턴스를 360px로 확장하는 규칙(Horizontal 전용) 자체는 별도 토큰이 아니라 이 조합 컴포넌트만의 레이아웃 오버라이드
- 좌우/상하 비대칭 헤더 구성(Horizontal의 드롭다운 vs Arrow Box 분리) 규칙을 명시하는 토큰/문서 없음

**확인 완료(사용자 확인)**
- 두 Date Picker 패널은 동기화되지 않은 독립적인 캘린더입니다(2장). Horizontal의 좌우 비대칭 헤더 구성은 진열 배치일 뿐 고정 규칙이 아닙니다.

**확인 필요**
- Time Picker 통합 여부(Date Picker Group 자체에는 Time Picker 섹션이 관찰되지 않음 — Time Picker=Off 조합만 샘플링됨)
- 접근성 마크업(`role="group"`, `aria-label`) 규정(6장)

## 8. 샘플링에 사용한 노드 (부록, 2개 전수)

| Type | 노드 | Date Picker 좌/상 | Date Picker 우/하 | Divider |
|---|---|---|---|---|
| **Horizontal** | `2215:12845` | `2224:3350` | `2224:3449` | `2215:11760`(세로) |
| **Vertical** | `2215:12846` | `2224:3700` | `2224:3803` | `2215:11757`(가로) |

`get_metadata`로 두 변형의 정확한 자식 트리(각 3자식)를 확인했고, `get_design_context`를 두 변형에 각각 호출했습니다. `get_variable_defs`·`get_motion_context`는 패밀리 최상위 그룹(`2497:13877`)에서 공용으로 확보했습니다.
