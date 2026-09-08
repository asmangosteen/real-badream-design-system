# Leading

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2555-11928) — Frame `2555:11928` ("Leading"), 상위 그룹 `2555:16790`
> 기계 판독용 값은 [`leading.json`](./leading.json)을 함께 참고합니다. 이 문서와 leading.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/top/`에 위치합니다 — [Top](../top/top.md) Navigation Bar를 구성하는 좌측(Leading) 영역 서브 아톰입니다. 사용자 확인에 따라 Navigation Bar 그룹 안에서 이 노드를 포함한 좌측 프레임(Smalltitle/Leading/Trailing/_Trailing Components)은 "하위항목"(서브 아톰), 우측 `Top` 프레임은 "실제 쓰일 컴포넌트"(조합된 최종 컴포넌트)로 명확히 구분됩니다.

## 0. 문서 범위와 샘플링 방법

Leading은 **Type(Back/Close/Big Title) × Mode(Light/Dark) 2축, 6-변형 컴포넌트**로 완전 직교(3×2=6)입니다. `get_metadata`로 6개 심볼을 전수 확인한 뒤, `get_design_context`를 최상위 프레임(`2555:11928`)에 1회 호출해 6개 변형 전체가 병합 코드로 반환된 것을 실측했습니다.

- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2555:16790`, Navigation Bar 전체)에서 1회씩 확보한 값을 재사용했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Leading은 Navigation Bar 좌측에 오는 **뒤로가기/닫기 아이콘 또는 화면 제목**입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Back / Close / Big Title | Back=뒤로가기 아이콘(+선택적 라벨), Close=닫기 아이콘, Big Title=화면 대제목 텍스트 |
| **Mode** | Light / Dark | 밝은/어두운 배경에 맞춘 아이콘·텍스트 색상 |
| **Show Label**(비-variant 축, Back 전용) | False / True(기본 True) | Back 아이콘 옆에 "Label" 텍스트를 표시할지 여부. Close/Big Title에는 이 prop 자체가 없음 |

## 2. Type별 스펙 (6개 전수 실측)

| Type | 레이아웃 | 내용 | 타이포/아이콘 |
|---|---|---|---|
| **Back** | `pl=spacing/08`(12px) `py=spacing/08`(12px), hug-width | `Icon / Default / 24px / backward`(24px) + (Show Label=True 시) "Label" 텍스트(w=48px) | 라벨: `SubTitle/18 R`(Regular), 색상은 Mode에 따름(3장) |
| **Close** | `pl=spacing/11`(20px) `pr=spacing/16`(40px) `py=spacing/08`(12px) | `Icon / Default / 24px / close`(24px) 단독, 라벨 없음(showLabel prop 자체가 없음) | — |
| **Big Title** | `justify-center` `pl=spacing/11`(20px) `py=spacing/07`(10px) | "Big Title" 텍스트(w=230px, 중앙 정렬) | `Title/20 SB`(SemiBold, 저장소 `title` 스타일과 일치, 4장 참고) |

**핵심 발견**: Close 타입의 우측 패딩(`pr=spacing/16`=40px)이 Back(패딩 없음, hug)이나 Big Title보다 훨씬 넓습니다 — 이는 [Top](../top/top.md)에서 NoTitle_close/Seg_close/Smalltitle_close 조합 시 오른쪽 여백을 강제로 확보해 X 아이콘이 화면 좌측에 치우치지 않고 살짝 안쪽으로 들어오게 하려는 의도로 추정됩니다(확인 필요).

## 3. Mode별 색상 (Back·Big Title에서 전수 실측, Close는 아이콘 색만 해당)

| Mode | Back 아이콘 | Back 라벨 텍스트 | Close 아이콘 | Big Title 텍스트 |
|---|---|---|---|---|
| **Light** | `backward` 기본 SVG | `neutral/800`(#202837) | `close` 기본 SVG | `neutral/800`(#202837) |
| **Dark** | `backward` **별도 다크 SVG 에셋**(CSS 색반전 아님) | `common/white-default`(#fdfdfd) | `close` **별도 다크 SVG 에셋** | `common/white-default`(#fdfdfd) |

아이콘은 두 Mode 모두 **별도로 준비된 SVG 에셋**을 쓰며(색상 필터로 반전하는 방식이 아님), 텍스트만 CSS 색상 변수로 전환됩니다.

## 4. 타이포그래피 상세

| 스타일 | 적용 대상 | 크기/줄높이/자간 | 폰트 |
|---|---|---|---|
| **SubTitle/18 R** | Back의 "Label" | `size/Subtitle`=18px, `lineHeight/Subtitle`=24px, `letterSpacing/Subtitle`=-0.09px | `font/pretendard`, `weight/400` Regular |
| **Title/20 SB** | Big Title | 20px/28px, 자간 실측값 `-0.5`(Figma 퍼센트 단위로 추정 — 20px×0.5%=0.1px, 저장소 `title` 스타일의 `-0.1px`와 정확히 일치) | `Pretendard`, SemiBold(`weight/600`) |

**토큰 매칭**: `Title/20 SB`는 저장소 `tokens/typography.json`의 `title` 스타일(20px/28px/-0.1px, `weight-600`)과 **정확히 일치**합니다 — 단, Figma 변수맵에 자간이 `-0.5`(퍼센트 단위로 추정)로 기록되어 있어 그대로 읽으면 다른 스타일들의 px 단위 표기와 혼동될 수 있습니다. 퍼센트→px 환산(20px×0.5%=0.1px)으로 저장소 값과 일치함을 확인했습니다 — 정확한 단위 해석은 **확인 필요**(Figma 파일에서 직접 재확인 권장).

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Navigation Bar 상위 그룹(`2555:16790`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다 — 이 문서를 포함한 Navigation Bar/Top 전 문서에서 재사용합니다.

## 6. 접근성

- Back/Close는 아이콘 전용 버튼으로 보이며 `aria-label`("뒤로 가기"/"닫기") 연결 규정이 Figma 파일에 없습니다 — 확인 필요.
- Big Title은 화면의 주 제목(`<h1>` 등)에 대응할 가능성이 높으나 시맨틱 태그 규정은 확인 필요.
- Back의 Label 표시 여부(Show Label)가 순수 시각적 토글이라면, 라벨이 없을 때도 스크린리더가 "뒤로 가기"임을 인지할 수 있는 대체 텍스트가 필요합니다 — 확인 필요.

## 7. 토큰 매칭 요약

**정확히 일치**
- 패딩: `spacing/08`=12px, `spacing/11`=20px, `spacing/16`=40px, `spacing/07`=10px 전부 `ref-spacing-*`와 일치
- 색상: `neutral/800`(#202837), `common/white-default`(#fdfdfd) → `sys-color-*`와 일치
- 타이포: `SubTitle/18 R`, `Title/20 SB`(퍼센트 자간 환산 시) 전부 `tokens/typography.json`과 일치

**기존 토큰에 없음**
- Type(Back/Close/Big Title)별로 패딩·구조가 달라지는 규칙 자체를 명시하는 "Leading 전용" 시맨틱 토큰은 저장소에 없음(개별 값은 토큰과 일치)

**확인 필요**
- Close의 넓은 우측 패딩(40px)의 정확한 설계 의도(2장)
- Title/20 SB 자간 단위(퍼센트 vs px) 해석
- 접근성 마크업(`aria-label` 등) 연결 규정

## 8. 샘플링에 사용한 6개 노드 (부록, 전수)

| Type＼Mode | Light | Dark |
|---|---|---|
| **Back** | `2555:11927` | `2555:12468` |
| **Close** | `2555:11925` | `2555:12471` |
| **Big Title** | `2555:11924` | `2555:12473` |

6개 변형 전체가 `get_design_context` 1회 호출(`2555:11928`)로 병합 코드로 반환되었습니다. `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2555:16790`)에서 공용으로 확보했습니다.
