# Leading

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2555-11928) — Frame `2555:11928` ("Leading"), 상위 그룹 `2612:16631`
> 기계 판독용 값은 [`leading.json`](./leading.json)을 함께 참고합니다. 이 문서와 leading.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/top/`에 위치합니다 — [Top](../top/top.md) Navigation Bar를 구성하는 좌측(Leading) 영역 서브 아톰입니다. 사용자 확인에 따라 Navigation Bar 그룹 안에서 이 노드를 포함한 좌측 프레임(Smalltitle/Leading/Trailing/_Trailing Components)은 "하위항목"(서브 아톰), 우측 `Top` 프레임은 "실제 쓰일 컴포넌트"(조합된 최종 컴포넌트)로 명확히 구분됩니다.

## 0. 문서 범위와 샘플링 방법

Leading은 **Type(Back/Close/Big Title/Home) × Mode(Light/Dark) 2축, 8-변형 컴포넌트**로 완전 직교(4×2=8)입니다. `get_metadata`로 8개 심볼을 전수 확인한 뒤, `get_design_context`를 최상위 프레임(`2555:11928`)에 호출해 6개 변형(Back/Close/Big Title)이 병합 코드로 반환된 것과, Home 2개 변형(Light `2573:12732`, Dark `2573:12736`)을 개별 실측했습니다.

**추가(2026-09-09) — Type=Home 신규 추가.** 사용자 확인: Home은 홈 화면(첫 화면) 전용이며, Back/Close/Big Title처럼 여러 화면에서 범용으로 재사용하는 Type이 아닙니다(1장 참고).

- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2612:16631`, Navigation Bar 전체)에서 1회씩 확보한 값을 재사용했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Leading은 Navigation Bar 좌측에 오는 **뒤로가기/닫기 아이콘 또는 화면 제목**입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Back / Close / Big Title / Home | Back=뒤로가기 아이콘(+선택적 라벨), Close=닫기 아이콘, Big Title=화면 대제목 텍스트, Home=바드림 로고(홈 화면 전용) |
| **Mode** | Light / Dark | 밝은/어두운 배경에 맞춘 아이콘·텍스트·로고 색상 |
| **Show Label**(비-variant 축, Back 전용) | False / True(기본 True) | Back 아이콘 옆에 "Label" 텍스트를 표시할지 여부. Close/Big Title/Home에는 이 prop 자체가 없음 |

**사용 범위 제약(사용자 확인, 강한 제약사항) — Home은 다른 3개 Type과 성격이 다릅니다.** Back/Close/Big Title은 여러 화면에서 범용으로 골라 쓰는 재사용 가능한 헤더 콘텐츠인 반면, **Home은 앱의 홈 화면(첫 진입 화면)에서만 쓰도록 의도된 전용 Type입니다.** 다른 화면에 Home Type을 가져다 쓰는 것은 이 컴포넌트의 의도된 사용 범위를 벗어납니다.

## 2. Type별 스펙 (8개 전수 실측)

| Type | 레이아웃 | 내용 | 타이포/아이콘 |
|---|---|---|---|
| **Back** | `pl=spacing/08`(12px) `py=spacing/08`(12px), **gap 0**, hug-width | `Icon / Default / 24px / backward`(24px) + (Show Label=True 시) "Label" 텍스트(**폭 48px 고정**) | 라벨: `SubTitle/18 R`(Regular), 색상은 Mode에 따름(3장) |
| **Close** | `pl=spacing/11`(20px) `pr=spacing/16`(40px) `py=spacing/08`(12px) | `Icon / Default / 24px / close`(24px) 단독, 라벨 없음(showLabel prop 자체가 없음) | — |
| **Big Title** | `justify-center` `pl=spacing/11`(20px) `py=spacing/07`(10px) | "Big Title" 텍스트(w=230px, 중앙 정렬) | `Title/20 SB`(SemiBold, 저장소 `title` 스타일과 일치, 4장 참고) |
| **Home**(신규) | `justify-center` `pl=spacing/11`(20px) `py=spacing/08`(12px) | 폭 230px 칸(`Frame 1`) 안에 `logo`(104×24) 왼쪽 정렬. 로고는 **단색 벡터 1개**(`Union` 102×22)이고 채우기가 색상 변수에 바인딩돼 있습니다 | 해당 없음(벡터 에셋, 타이포 없음) |

**Home과 Big Title의 차이**: 레이아웃 패턴(justify-center + pl=spacing/11)은 동일하지만, 세로 패딩이 Big Title은 `spacing/07`(10px), Home은 `spacing/08`(12px)로 실측상 다릅니다(오독 아님, 두 Type 모두 재확인 완료). 또한 Big Title은 텍스트 콘텐츠, Home은 로고 이미지 콘텐츠라는 근본적 차이가 있습니다.

**정정(2026-09-15 재실측)** — 예전 판에는 아이콘과 라벨 사이 간격이 적혀 있지 않았고 구현이 8px을 넣고 있었습니다. Figma 실측 `itemSpacing`은 **0**입니다(아이콘 12~36, 라벨 36에서 시작 → Back 전체 12+24+48=**84px**). 라벨·제목·로고칸의 폭이 전부 **고정값**이라는 것도 이때 확인했습니다(디자이너 확인 — 내용에 맞춰 줄어드는 hug 방식이 아닙니다).

**핵심 발견**: Close 타입의 우측 패딩(`pr=spacing/16`=40px)이 Back(패딩 없음, hug)이나 Big Title보다 훨씬 넓습니다 — 이는 [Top](../top/top.md)에서 NoTitle_close/Seg_close/Smalltitle_close 조합 시 오른쪽 여백을 강제로 확보해 X 아이콘이 화면 좌측에 치우치지 않고 살짝 안쪽으로 들어오게 하려는 의도로 추정됩니다(확인 필요).

## 3. Mode별 색상 (Back·Big Title·Home에서 전수 실측, Close는 아이콘 색만 해당)

| Mode | Back 아이콘 | Back 라벨 텍스트 | Close 아이콘 | Big Title 텍스트 | Home 로고 |
|---|---|---|---|---|---|
| **Light** | `neutral/800`(#202837) | `neutral/800`(#202837) | `neutral/800`(#202837) | `neutral/800`(#202837) | **`neutral/600`(#5b616c)** |
| **Dark** | `common/white-default`(#fdfdfd) | `common/white-default`(#fdfdfd) | `common/white-default`(#fdfdfd) | `common/white-default`(#fdfdfd) | `common/white-default`(#fdfdfd) |

**정정(2026-09-15 재실측) — Mode는 에셋을 교체하지 않습니다.** 예전 판은 "두 Mode가 별도로 준비된 SVG 에셋을 쓴다"고 적었으나 사실과 다릅니다. 아이콘·로고 모두 **파일은 하나**이고, 벡터 노드의 `fills`가 색상 변수에 바인딩되어 Mode에 따라 값만 바뀝니다(`node.fills` / `boundVariables.fills`로 직접 확인 — 예: Back 아이콘 벡터 `2551:11849` → `VariableID:61:8387` = `neutral/800`, Dark 대응 노드 `2555:12469` → `VariableID:61:8370` = `common/white-default`).

**로고만 `neutral/600`입니다.** 같은 Light 화면에서 제목·아이콘(`neutral/800`)보다 한 단계 옅습니다. Dark에서는 나머지와 같은 `common/white-default`입니다.

> 저장소에는 이 단색 워드마크가 없었습니다(있던 것은 그라디언트·흰 배경이 깔린 컬러 로고와 알약형 CI). 2026-09-15에 Figma 원본을 그대로 내보내 `assets/logo/bi/signature/bi-signature-horizontal-mono.svg`(104×24, `fill="currentColor"`)로 추가했습니다.
>
> **이 파일은 "로고는 원본 그대로, 색상 변경 금지" 규칙의 확정된 예외입니다**(2026-09-15 디자이너 확인, [README](../../../../README.md) 사용 원칙 3번·[llms.txt](../../../../llms.txt)). 단 예외는 **이 자리 한정**입니다 — 다른 화면에서 컬러 로고 대신 이 파일을 칠해 쓰면 안 됩니다.

## 4. 타이포그래피 상세

| 스타일 | 적용 대상 | 크기/줄높이/자간 | 폰트 |
|---|---|---|---|
| **SubTitle/18 R** | Back의 "Label" | `size/Subtitle`=18px, `lineHeight/Subtitle`=24px, `letterSpacing/Subtitle`=-0.09px | `font/pretendard`, `weight/400` Regular |
| **Title/20 SB** | Big Title | 20px/28px, 자간 **`-0.5%`**(Plugin API `letterSpacing` = `{unit:"PERCENT", value:-0.5}` — 20px×0.5%=0.1px, 저장소 `title` 스타일의 `-0.1px`와 정확히 일치) | `Pretendard`, SemiBold(`weight/600`) |

**토큰 매칭**: `Title/20 SB`는 저장소 `tokens/typography.json`의 `title` 스타일(20px/28px/-0.1px, `weight-600`)과 **정확히 일치**합니다. 자간 `-0.5`의 단위는 2026-09-15 Plugin API로 확인해 **퍼센트로 확정**했습니다(다른 스타일들은 `{unit:"PIXELS"}`로 기록돼 있어 Title만 단위가 다릅니다 — 표기만 다를 뿐 값은 같습니다).

## 5. 인터랙션(모션) 스펙

**색이 변하는 hover/pressed 상태는 없습니다. 다만 아이콘+라벨 전체가 하나의 클릭 대상입니다.**

Leading의 아이콘은 [Icon Button](../../../button/icon-button/icon-button.md) **인스턴스가 아니라** `Icon / Default / 24px / *` 인스턴스를 그냥 얹은 프레임이고, 컴포넌트 셋에 프로토타입 반응(`reactions`)도 없습니다(2026-09-15 Plugin API 전수 확인). 우측 [Trailing Components](../trailing-components/trailing-components.md)가 Icon Button이라 색까지 바뀌는 것과 대비되지만, **의도된 상태입니다**(디자이너 확인, 2026-09-15).

**구현 규칙(2026-09-15 디자이너 요청)**: Figma의 프레임 구조(아이콘과 라벨을 묶은 하나의 프레임)를 그대로 살려 **Back·Close는 항상 `<button>`으로 렌더**합니다 — 아이콘 위든 라벨 위든 같은 대상이고, 커서가 바뀌며 키보드로도 잡힙니다. Big Title·Home은 제목/로고라 정적이고 `onClick`을 줄 때만 버튼이 됩니다. **색 오버레이는 넣지 않고 커서와 포커스 링만** 제공합니다(⚠️ 포커스 링은 Figma에 정의가 없어 구현에서 추가한 값 — Icon Button과 같은 방식).

> ⚠️ `get_motion_context`는 **키프레임 애니메이션만** 읽습니다. 변형 사이의 전환은 `node.reactions`에 들어 있으므로, "모션 없음"을 결론짓기 전에 Plugin API로 반드시 확인해야 합니다([`docs/INTERACTION.md`](../../../../docs/INTERACTION.md)).

## 6. 접근성

- **Back/Close는 `<button>`으로 렌더되고, 아이콘은 장식(`aria-hidden`)입니다.** 접근성 이름은 Back에 라벨이 보이면 그 라벨 텍스트, 라벨을 끄면 기본값 "뒤로 가기", Close는 "닫기"입니다. 필요하면 `aria-label`로 덮어쓸 수 있습니다(2026-09-15 구현 확정 — Figma 파일에는 규정이 없어 구현에서 정한 값입니다).
- Big Title은 화면의 주 제목(`<h1>` 등)에 대응할 가능성이 높으나 시맨틱 태그 규정은 확인 필요.

## 7. 토큰 매칭 요약

**정확히 일치**
- 패딩: `spacing/08`=12px, `spacing/11`=20px, `spacing/16`=40px, `spacing/07`=10px 전부 `ref-spacing-*`와 일치
- 색상: `neutral/800`(#202837), `common/white-default`(#fdfdfd) → `sys-color-*`와 일치
- 타이포: `SubTitle/18 R`, `Title/20 SB`(퍼센트 자간 환산 시) 전부 `tokens/typography.json`과 일치

**기존 토큰에 없음**
- Type(Back/Close/Big Title)별로 패딩·구조가 달라지는 규칙 자체를 명시하는 "Leading 전용" 시맨틱 토큰은 저장소에 없음(개별 값은 토큰과 일치)

**확인 완료(2026-09-15 재실측·디자이너 확인)**
- Back의 아이콘↔라벨 간격은 **0**(2장)
- Title/20 SB 자간 단위는 **퍼센트**(4장)
- Mode는 에셋을 교체하는 게 아니라 **변수 바인딩된 채우기 색**을 바꾼다(3장)
- Home 로고 색은 `neutral/600` ↔ `common/white-default`(3장)
- Leading에는 hover/pressed가 없다(5장)

**확인 필요**
- Close의 넓은 우측 패딩(40px)의 정확한 설계 의도(2장)
- Big Title의 시맨틱 헤딩 레벨(`<h1>` 등) 연결 규정

> ⚠️ 아래는 Figma에 정의가 없어 **구현에서 정한 값**입니다 — Back/Close의 접근성 이름("뒤로 가기"/"닫기"), 포커스 링(브랜드 색 2px).

## 8. 샘플링에 사용한 8개 노드 (부록, 전수)

| Type＼Mode | Light | Dark |
|---|---|---|
| **Back** | `2555:11927` | `2555:12468` |
| **Close** | `2555:11925` | `2555:12471` |
| **Big Title** | `2555:11924` | `2555:12473` |
| **Home** | `2573:12732` | `2573:12736` |

Back/Close/Big Title 6개 변형은 `get_design_context` 1회 호출(`2555:11928`)로 병합 코드로 반환되었고, Home 2개 변형은 각 노드를 개별 호출해 실측했습니다. `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2612:16631`)에서 공용으로 확보했습니다.
