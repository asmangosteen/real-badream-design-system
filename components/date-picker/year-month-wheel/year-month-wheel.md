# Year and Month Wheel

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2224-3190) — Symbol `2224:3190` ("Year and Month Wheel"), 상위 그룹 `2497:13877`
> 기계 판독용 값은 [`year-month-wheel.json`](./year-month-wheel.json)을 함께 참고합니다. 이 문서와 year-month-wheel.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/date-picker/`에 위치합니다 — Date/Time Picker 패밀리 중 연/월을 선택하는 **휠(스크롤) 피커**입니다. [Week](../week/week.md)·[Week Header](../week-header/week-header.md)·[Month](../month/month.md)과 달리 달력 그리드 계열이 아니라 별도의 입력 UI 패턴이지만, 작업 지시에 따라 이번 4개 문서화 범위에 함께 포함합니다.

## 0. 문서 범위와 샘플링 방법

Year and Month Wheel은 **변형(variant) 축이 없는 단일 심볼**입니다. `get_metadata`(오케스트레이터 사전 확보)로 `2224:3190` 하나만 존재함을 확인했고, `get_design_context`를 이 노드에 1회 호출해 내부 구조(연도/월 목록, 선택 하이라이트, 거리별 타이포·투명도 감쇠)를 전수 실측했습니다.

- `get_design_context`(`2224:3190`) 1회 호출로 7개 행(Last×2, Middle×2, Next×2, Selected×1) 전체 트리를 실측했습니다.
- `get_variable_defs`는 상위 그룹(`2497:13877`)에서 이미 확보된 공용 변수맵을 재사용했습니다 — `opacity/30·50·70`, `spacing/01·04·06·08·14`, `radius/06`, `brand/primary-lightest`, `SubTitle/18 R·M`, `Body 1/16 R`, `Body 2/14 R` 등 이 노드에 등장한 변수가 전부 공용 맵에 이미 포함되어 있어 새로 조회할 변수가 없었습니다.
- `get_motion_context`는 패밀리 최상위 그룹(`2497:13877`, recursive=true)에서 이미 확인되어 모션 데이터 없음이 확정되어 있습니다(재호출하지 않음, 5장 참고) — 휠 스크롤 자체의 관성/스냅 애니메이션이 이 컴포넌트의 핵심 인터랙션일 것으로 예상되지만 Figma에 모션 데이터가 없어 확인 필요입니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Year and Month Wheel은 328×254px 컴포넌트로, **연도+월을 한 쌍으로 묶은 값이 세로로 나열된 7행 목록**입니다. 가운데(4번째) 행이 현재 선택된 값으로 하이라이트되고, 위아래로 멀어질수록 텍스트 크기와 투명도가 단계적으로 줄어들어 iOS 스타일 롤링 휠(피커)의 원근 효과를 정적 스냅샷으로 표현하고 있습니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| — | 없음(단일 인스턴스) | Size·State 등 별도 variant 축이 없는 고정 진열 샘플. 실측된 7행의 연/월 값(1997~2003년 10월~4월)은 스크롤 위치의 한 예시일 뿐, 실제로는 연속적으로 스크롤 가능한 무한 목록으로 추정됨(2장 참고) |

## 2. 내부 구조 상세 (전수 실측)

컨테이너(`2224:3190`): `flex-direction: column`, `align-items: center`, `justify-content: center`, `padding: spacing/14(32px) 수직 / spacing/06(8px) 수평`, 크기 328×254px.

7개 행이 중앙(Selected)을 기준으로 대칭 구조로 배치되어 있습니다. 위→아래 순서(실측 원문 그대로):

| 순서 | 행 이름(Figma 레이어) | 표시값(연/월) | 타이포 | 투명도 | 비고 |
|---|---|---|---|---|---|
| 1 (맨 위) | Last | 1997년 / 10월 | Body 2/14 R | `opacity/30`(30%) | 선택 위치에서 3칸 |
| 2 | Middle | 1998년 / 11월 | Body 1/16 R | `opacity/50`(50%) | 선택 위치에서 2칸 |
| 3 | Next(Upper Box 내) | 1999년 / 12월 | SubTitle/18 R | `opacity/70`(70%) | 선택 바로 위 |
| 4 (중앙) | **Selected** | 2000년 / 1월 | **SubTitle/18 M**(굵기만 Medium으로 전환) | 100%(투명도 클래스 없음) | `brand/primary-lightest` 배경 하이라이트 |
| 5 | Next(Lower Box 내) | 2001년 / 2월 | SubTitle/18 R | `opacity/70`(70%) | 선택 바로 아래 |
| 6 | Middle | 2002년 / 3월 | Body 1/16 R | `opacity/50`(50%) | 선택 위치에서 2칸 |
| 7 (맨 아래) | Last | 2003년 / 4월 | Body 2/14 R | `opacity/30`(30%) | 선택 위치에서 3칸 |

**핵심 발견 1 — 거리 기반 크기·투명도 감쇠 규칙**: 선택된 행에서 멀어질수록 (거리 1→2→3) 타이포가 `SubTitle/18`→`Body 1/16`→`Body 2/14`로 단계적으로 작아지고, 투명도도 `70%`→`50%`→`30%`로 단계적으로 옅어집니다. 상하 대칭입니다(거리 1=Next 양쪽 동일, 거리 2=Middle 양쪽 동일, 거리 3=Last 양쪽 동일).

**핵심 발견 2 — 값이 연속 시퀀스로 함께 증가**: 7행의 연도와 월이 동시에 1씩 증가하며(1997→2003, 10월→익월 순환하여 4월), 연도 변경 지점(1999→2000, 12월→1월)에서 두 컬럼이 함께 롤오버됩니다. 이는 이 컴포넌트가 **연도와 월을 독립적으로 스크롤하는 두 개의 휠이 아니라, "연-월" 값 하나를 한 덩어리로 스크롤하는 단일 시퀀스 휠일 가능성**을 시사합니다 — 다만 두 컬럼(연/월)이 실제로 독립적으로 움직이는 별도 휠인지, 함께 묶여 움직이는 단일 값인지는 이 정적 진열 샘플 하나만으로는 완전히 확정할 수 없어 **확인 필요**로 남깁니다.

**레이아웃 세부 gap**(전수 실측, 아래 3장에서 높이 계산으로 재검증):
- 최상위 그룹(`2224:3164`) 내 Upper Box / Selected / Lower Box 사이: `spacing/04`(4px)
- Upper Box(`2224:3165`) 내 Box / Next 사이: `spacing/04`(4px)
- Box(`2224:3166`, `2224:3183`) 내 Last / Middle(또는 Middle / Last) 사이: `spacing/01`(1px) — 가장 옅은(거리 2·3) 두 행끼리는 유독 좁게 붙어 있음
- Lower Box(`2224:3179`) 내 Next / Box 사이: `spacing/04`(4px)
- 각 행 내부 연도-월 컬럼 사이: `spacing/08`(12px)
- 연도 컬럼 너비: 80px, 월 컬럼 너비: 40px(둘 다 리터럴 값, 텍스트 정렬용 고정폭)
- Selected 행 자체의 상하 padding: `spacing/04`(4px), 배경 `brand/primary-lightest`, radius `radius/06`(12px)

## 3. 높이 계산 검증

컨테이너 254px = 상하 패딩 `spacing/14`(32px)×2 + 내부 콘텐츠 190px.

내부 콘텐츠 190px를 각 행의 line-height와 gap을 모두 더해 재검증했습니다:

```
Last(22) + gap1(1) + Middle(24) + gap4(4) + Next(24) + gap4(4)
+ Selected(4+24+4=32) + gap4(4)
+ Next(24) + gap4(4) + Middle(24) + gap1(1) + Last(22)
= 190px
```

254 − 32×2 = 190px과 **정확히 일치**합니다 — 2장에서 실측한 gap·line-height·padding 값이 모두 정확함을 재확인했습니다.

## 4. 서브컴포넌트 재사용 관계

Year and Month Wheel은 [Date](../date/date.md)·[Week](../week/week.md)·[Week Header](../week-header/week-header.md)·[Month](../month/month.md)의 서브컴포넌트를 재사용하지 않는 **독립된 구조**입니다. 달력 그리드 계열(날짜 셀 기반)과 달리 텍스트 목록 기반의 별도 UI 패턴이며, 색상·spacing·radius·타이포 토큰만 공유합니다.

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`가 Date/Time Picker 패밀리 최상위 그룹(`2497:13877`, recursive=true)에서 이미 호출되어 `{"nodes":[]}`(빈 결과)로 확인되었습니다 — 패밀리 전체 공용으로 재사용합니다. 휠 피커의 핵심 인터랙션(드래그/스와이프로 스크롤, 관성, 중앙 스냅, 값 변경 시 텍스트 크기·투명도 전환)에 대한 duration/easing 등 모션 값이 Figma 파일에 전혀 정의되어 있지 않습니다 — 실제 구현 시 네이티브 스크롤 스냅 또는 별도 애니메이션 라이브러리로 이 롤링 효과를 구현해야 하며, 구체적인 물리 값(감쇠·스냅 속도 등)은 확인 필요입니다.

## 6. 접근성

- 휠 피커는 일반적으로 `<select>` 네이티브 엘리먼트 또는 `role="listbox"`+`role="option"` 조합, 혹은 커스텀 슬라이더 패턴(`role="slider"`, 화살표 키 대응)으로 구현되는데, Figma 파일에는 이 중 무엇을 의도했는지 규정이 없습니다 — 확인 필요.
- 시각적으로만 투명도·크기로 "선택된 값"을 구분하고 있어(테두리 등 형태적 표식 없음, 배경 하이라이트만 있음), 스크린리더 사용자에게는 `aria-selected`/`aria-activedescendant` 등 명시적 상태 전달이 필요해 보이나 확인 필요.
- 터치/드래그 스크롤이 유일한 조작 수단이라면 키보드 전용 사용자를 위한 대체 입력 수단(예: 텍스트 직접 입력, 화살표 버튼)이 필요해 보이나 Figma 파일에서 확인되지 않습니다.

## 7. 토큰 매칭 요약

**정확히 일치**
- 컨테이너 패딩: `spacing/14`(32px), `spacing/06`(8px) → `ref-spacing-14`, `ref-spacing-06`
- 그룹 간 gap: `spacing/04`(4px) → `ref-spacing-04`
- Box 내부 gap: `spacing/01`(1px) → `ref-spacing-01`
- 컬럼 간 gap: `spacing/08`(12px) → `ref-spacing-08`
- Selected 상하 padding: `spacing/04`(4px) → `ref-spacing-04`
- Selected 배경: `brand/primary-lightest`(#eef4fc) → `sys-color-brand-primary-lightest`
- Selected radius: `radius/06`(12px) → `ref-radius-06`
- 투명도: `opacity/30·50·70` → `ref-opacity-30·50·70`
- 타이포: `Body 2/14 R`, `Body 1/16 R`, `SubTitle/18 R`, `SubTitle/18 M` 전부 `tokens/typography.json`과 일치

**기존 토큰에 없음**
- 거리 기반 크기·투명도 감쇠 규칙(거리 1→SubTitle/70%, 거리 2→Body1/50%, 거리 3→Body2/30%) 자체를 명시하는 시맨틱 토큰/문서는 저장소에 없음(개별 값 자체는 토큰과 일치)
- "휠 피커"라는 컴포넌트 패턴 자체를 규정하는 토큰 없음

**확인 필요**
- 연도·월이 독립된 두 휠인지, 하나로 묶여 스크롤되는 단일 시퀀스인지(2장 핵심 발견 2)
- 스크롤/스냅/관성 등 모션의 구체적 물리 값(Figma에 모션 데이터 없음)
- 접근성 패턴(`<select>` vs `listbox` vs `slider`) 및 키보드 대체 입력 수단
- 실제 목록의 최솟값/최댓값 범위(연도·월의 상하한)는 이 정적 샘플만으로 알 수 없음

## 8. 샘플링에 사용한 노드 (부록)

| 목적 | 노드 |
|---|---|
| Year and Month Wheel 전체(7행 전수) | `2224:3190` |

`get_variable_defs`·`get_motion_context`는 상위 그룹(`2497:13877`)에서 패밀리 공용으로 이미 확보된 값을 재사용했습니다(재호출 없음).
