# Top (Navigation Bar)

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2555-12827) — Frame `2555:12827` ("Top"), 상위 그룹 `2612:16631`
> 기계 판독용 값은 [`top.json`](./top.json)을 함께 참고합니다. 이 문서와 top.json은 항상 같은 소스에서 나온 값이어야 합니다.
> ⚠️ 상위 그룹 노드 ID가 바뀌었습니다 — 예전 판의 `2555:16790`은 **더 이상 존재하지 않고**, 현재는 `2612:16631`(레이어명 `Group 1`, 페이지 `❖ Navigation Bar`)입니다(2026-09-15 확인). 컴포넌트 셋 자체의 ID(`2555:12827` 등)는 그대로입니다.
> 이 컴포넌트는 `components/navigation-bar/top/`의 **플래그십(최상위) 컴포넌트**입니다 — [Leading](../leading/leading.md), [Trailing](../trailing/trailing.md)(+[Trailing Components](../trailing-components/trailing-components.md)), [Smalltitle](../smalltitle/smalltitle.md)을 조합해 만들어집니다. **사용자 확인**: Navigation Bar 그룹(`2612:16631`) 안에서 Leading/Trailing/Trailing Components/Smalltitle 4개 프레임은 "하위항목"(서브 아톰)이고, 이 `Top` 프레임이 실제로 화면에 쓰일 **완성형 상단 내비게이션 바**입니다. Bottom Navigation Bar는 별도로 추후 `components/navigation-bar/bottom/`에 문서화될 예정입니다.

## 0. 문서 범위와 샘플링 방법

Top은 **Type(Big Title/NoTitle_back/NoTitle_close/Smalltitle_back/Smalltitle_close/Seg_back/Seg_close/Home) × Mode(Light/Dark) × Background(Off/On) 3축, 32-변형 컴포넌트**로 완전 직교(8×2×2=32).

- `get_metadata`로 32개 심볼을 전수 확인했습니다.
- 변형 수가 많아 **8개 Type 전부 + Background/Mode 조합 일부를 포함한 13개 노드**를 `get_design_context`로 개별 실측했습니다: Big Title(Light·Off) `2555:12819`, NoTitle_back(Light·Off) `2555:12820`, NoTitle_close(Light·Off) `2555:12818`, Smalltitle_back(Light·Off) `2555:12813`, Seg_back(Light·Off) `2555:12817`, Seg_close(Light·Off) `2555:13056`, Big Title(Light·On) `2555:12825`, Big Title(Dark·On) `2555:12821`, Home(Light·Off) `2573:12778`, Home(Light·On) `2573:12781`, Home(Dark·On) `2573:12842`, Home(Dark·Off) `2573:12845`.
- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2612:16631`)에 각 1회 호출해 확보했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

**추가(2026-09-09) — Type=Home 신규 추가.** 홈 화면(첫 진입 화면) 헤더용 Type으로, Big Title과 같은 justify-between 컨테이너 + Leading(로고)+Trailing(최대 3개) 구조입니다. **사용자 확인(강한 제약사항)**: Home은 나머지 7개 Type과 달리 여러 화면에서 범용 재사용하는 Type이 아니라 홈 화면 전용입니다(4장·constraints 참고).

## 1. 컴포넌트 개요

Top은 화면 최상단에 오는 **완성형 상단 내비게이션 바**입니다. 높이는 전 변형 공통 48px이고, Figma 프레임 폭은 `w=390px`(모바일 목업 표준 폭)입니다 — 다만 **실제 구현에서 390은 고정값이 아니라 기준 폭이며 화면 폭을 따릅니다**(2-1장). 항상 [Leading](../leading/leading.md)(좌측)과 [Trailing](../trailing/trailing.md)(우측)을 기본으로 갖고, Type에 따라 중앙에 [Smalltitle](../smalltitle/smalltitle.md)이 추가됩니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Big Title / NoTitle_back / NoTitle_close / Smalltitle_back / Smalltitle_close / Seg_back / Seg_close / Home | 화면 성격에 따른 헤더 구성 조합(2장 상세). **Home은 홈 화면 전용 — 나머지 7개와 달리 범용 재사용 불가(사용자 확인)** |
| **Mode** | Light / Dark | 밝은/어두운 화면에 맞춘 색상 팔레트 |
| **Background** | Off / On | Off=투명(화면 콘텐츠 위에 얹는 용도), On=단색 배경 채움. Figma의 배경색(Mode별 예시)은 고정값이 아니라 예시이며 실제 화면에 맞게 자유롭게 교체 가능(사용자 확인, 4장) |
| **Show Leading**(비-variant) | False / True(기본 True) | Leading 표시 여부. 숨겨도 Trailing/Smalltitle 위치는 고정(reflow 없음, 사용자 확인, 3-1장) |
| **Show Trailing**(비-variant) | False / True(기본 True) | Trailing 표시 여부. 숨겨도 다른 항목 위치는 고정 |
| **Show Smalltitle**(비-variant, Smalltitle 포함 Type 한정) | False / True(기본 True) | Smalltitle 표시 여부. 숨겨도 다른 항목 위치는 고정 |

## 2. Type별 조합 구조 (8개 전수 실측)

| Type | 컨테이너 정렬 | Leading(폭) | Trailing(최대 아이콘 수 · 폭@x) | Smalltitle |
|---|---|---|---|---|
| **Big Title** | `justify-between`(gap 0) | type=Big Title (250) | **최대 3**(사용자 확인) · 140@250 | 없음 |
| **NoTitle_back** | `gap-166px`(고정) | type=Back, Show Label **True** (84) | 최대 3 · 140@250 | 없음 |
| **NoTitle_close** | `gap-166px` | type=Close (84) | 최대 3 · 140@250 | 없음 |
| **Smalltitle_back** | `gap-166px` | type=Back, Show Label **True** (84) | 최대 2 · 140@250 | type=Default, 컨테이너 중앙에 `absolute` 배치(190@100) |
| **Smalltitle_close** | `gap-166px` | type=Close (84) | 최대 2(사용자 제공 스크린샷으로 확인 완료) · 140@250 | type=Default (190@100) |
| **Seg_back** | `gap-166px` | type=Back, Show Label **False** (36) | 최대 1 · 188@202 | type=Segmented Control(Size=S, Count=2), `absolute` 배치(190@100) |
| **Seg_close** | `gap-166px` | type=Close, Show Label False (84) | 최대 1 · 140@250 | type=Segmented Control(Size=S, Count=2), `absolute` 배치(190@100) |
| **Home**(신규) | `justify-between`(Big Title과 동일 패턴) | type=Home(로고) (250) | 최대 3 · 140@250 | 없음 |

**컨테이너 공통**: Figma 프레임 `w=390` · 높이는 내용에 맞춰 **48px** · 패딩 0 · `items-center` · `clipsContent: false`.
**자식 배치 규칙(전 Type 공통, 2026-09-15 실측)**
- **Leading** — `layoutGrow: 0`, hug.
- **Trailing** — `layoutGrow: 1`(FILL). 남는 공간을 전부 차지한 뒤 내부에서 `justify-end`로 오른쪽 끝에 붙습니다. 그래서 Trailing 폭이 Type마다 140/188px로 달라져도 아이콘의 화면상 위치는 같습니다. **⚠️ 구현은 이 축만 반대로 뒤집었습니다 — 2-1장 참고.**
- **Smalltitle** — `layoutPositioning: ABSOLUTE`(흐름에서 빠짐), 폭 190 고정, `constraints: CENTER/MIN`, x=100 → 중심 195px = 390÷2. 즉 **컨테이너 정중앙**입니다.

> Seg 계열의 `Show Label=False`는 Figma 샘플의 기본값일 뿐이고, 라벨은 어느 Type에서든 자유 토글입니다(아래 정정 참고).

## 2-1. 폭 — 390은 기준 폭이고, 넓어질 때 늘어나는 곳이 정해져 있습니다 (2026-09-15 디자이너 확인)

**이 컴포넌트는 모바일 전용이고, 폭은 화면(부모) 폭을 그대로 따릅니다.** Figma의 390px은 목업 기준 폭일 뿐 고정값이 아닙니다 — 실제 기기(390·393·412·430…)에 맞춰 늘어납니다.

**390보다 넓어질 때**

| 영역 | 동작 |
|---|---|
| **Trailing** | **항상 고정.** 내용만큼만 차지하고(40×n + 우측 12 — **맨 끝이 버튼이면 20**) 오른쪽 끝에 붙습니다. 화면 끝에서 보이는 것까지의 거리는 아이콘·버튼 모두 **20px**입니다([trailing.md](../trailing/trailing.md) 2장) |
| **Leading** | **중앙이 없는 Type**(Big Title·Home·NoTitle_back·NoTitle_close)에서 남는 폭을 가져갑니다 — Big Title 제목이 길어질 여유가 생깁니다 |
| **Smalltitle · Segmented Control** | **중앙이 있는 Type**(Smalltitle_back/close·Seg_back/close)에서 늘어납니다. 좌우 여백 100px을 똑같이 유지하므로 **어떤 폭에서도 화면 정중앙**입니다 |

Back 라벨(48px)과 Home 로고칸(230px)은 내용이 왼쪽 정렬이라 늘릴 이유가 없어 **고정 폭 그대로** 둡니다.

**⚠️ 이 부분만 Figma 원본과 반대로 구현했습니다.** Figma는 Trailing이 `layoutGrow: 1`로 남는 공간을 먹고 Leading은 hug입니다. 프레임이 390 고정이라 그 안에서는 어느 쪽이 늘어나든 **렌더링 결과가 같지만**, 390을 넘어가면 늘어나야 할 것(제목·Segmented Control)이 늘어나지 않고 빈 Trailing만 커집니다. 그래서 뒤집었습니다.

**390에서는 아이콘·제목의 화면상 위치가 Figma와 픽셀 단위로 동일합니다.** 달라지는 건 보이지 않는 박스 폭 배분뿐입니다:

| Type | Figma(Trailing fill) | 구현(Leading fill) | 아이콘 위치 |
|---|---|---|---|
| Big Title·Home | leading 250 / trailing 140@250 | leading 258 / trailing 132@258 | 258~378 (동일) |
| NoTitle_* | leading 84 / trailing 140@250 | leading 92 / trailing 132@258 | 258~378 (동일) |
| Smalltitle_* | leading 84 / trailing 140@250 | leading 132 / trailing 92@298 | 298~378 (동일) |
| Seg_back | leading 36 / trailing 188@202 | leading 172 / trailing 52@338 | 338~378 (동일) |

같은 이유로 Big Title 텍스트 칸도 390에서 Figma의 230px이 아니라 238px입니다 — 텍스트가 왼쪽 정렬이라 글자 위치는 그대로입니다(x=20).

**Home 실사용 예시(사용자 제공 스크린샷)**: Trailing 최대 3개 중 실제로는 2개(알림 벨 아이콘 + 햄버거 메뉴 아이콘)만 사용 — 나머지 7개 Type과 동일하게 "최대치는 자유롭게 줄일 수 있다"는 규칙이 그대로 적용됩니다(아래 문단 참고). Figma 샘플 자체에는 다른 Type과 마찬가지로 자리표시용 `+` 아이콘이 들어있고, 실제 벨/햄버거 아이콘은 제품 화면에서 골라 쓰는 값입니다.

**사용자 확인 완료 — Trailing "Number"는 정확한 개수가 아니라 Type별 최대 허용치입니다.** Figma에 샘플링된 각 Type의 아이콘 개수(3/2/1)는 그 Type에서 쓸 수 있는 **최댓값**이며, 실제 화면에서는 그보다 적게 쓰거나(예: Big Title에서 아이콘 1개만) 아예 비울 수 있습니다. 다만 최댓값을 초과해서 늘릴 수는 없습니다 — 즉 Trailing 최대 허용량이 중앙 콘텐츠 크기에 반비례하는 규칙(중앙 없음=3, Smalltitle 텍스트=2, Segmented Control=1)은 유지되지만, 각 Type 안에서는 0~최댓값 사이로 자유롭게 조절 가능합니다.

**사용자 확인 완료 — Trailing에는 아이콘과 버튼([Trailing Components](../trailing-components/trailing-components.md)의 Icon/Button 두 타입)을 섞어 쓸 수 있습니다.** 단, 화면 상황에 따라 Smalltitle(중앙 콘텐츠) 영역을 침범하지 않는 선에서만 사용 가능합니다 — 정확한 상한 규칙(예: 버튼 1개=아이콘 몇 개분 폭인지)은 Figma에 수치로 정의되어 있지 않아 **확인 필요**입니다.

**정정(재실측) — 컨테이너 정렬 속성값 자체는 Type에 따라 갈리지만, 시각적으로는 차이가 없습니다.** Figma 원본 코드상 Big Title 컨테이너는 `justify-between`, 나머지 6개 Type은 `gap-166px`(스페이싱 토큰이 아닌 고정 리터럴 값)를 쓰는 게 맞습니다. 하지만 Trailing 래퍼 자체가 모든 Type에서 공통으로 `flex-grow:1` + 내부 `justify-end`를 갖고 있어서, Trailing이 항상 남는 공간을 전부 차지한 뒤 그 안에서 아이콘을 오른쪽 끝에 붙입니다. 그 결과 부모 컨테이너가 `justify-between`이든 `gap-166px`이든 **렌더링 결과가 완전히 동일**합니다 — Leading 텍스트 길이(Big Title/Label/X 등)와 무관하게 Trailing 아이콘들은 항상 같은 x 위치(컨테이너 우측 끝)에 정렬됩니다(사용자 스크린샷으로 확인). `gap-166px`는 Leading 콘텐츠가 비정상적으로 길어질 때의 최소 간격 보장 정도로만 의미가 있을 수 있으나, 그런 변형은 Figma에 존재하지 않아 실질적 효과가 없습니다. 이전 버전에서 이 속성값 차이를 "컨테이너 정렬 방식이 갈린다"는 핵심 구조적 차이처럼 서술한 것은 과장된 표현이었습니다 — 정정합니다.

**Dark 모드에서도 Seg 계열의 Smalltitle은 `Mode=Light` 인스턴스를 그대로 씁니다(2026-09-15 실측).** Smalltitle의 Segmented Control은 Light/Dark 값이 완전히 같기 때문에 시각적 차이는 없습니다. 반면 Smalltitle_back/close의 Dark 변형은 `Mode=Dark` Smalltitle을 씁니다(제목 색이 흰색으로 바뀌어야 하므로).

**사용자 확인 완료 — Back의 Label 표시 여부는 Type과 무관하게 항상 자유롭게 켜고 끌 수 있습니다.** 최초 샘플링에서 Seg_back/Seg_close 노드가 `showLabel=false`로 관측되어 "Seg 계열은 라벨을 강제로 숨긴다"고 잘못 추정했으나, **사용자 확인 결과 이는 그 샘플의 설정값일 뿐이며 실제로는 Back 타입이 어느 Top Type에 들어가든(NoTitle_back/Smalltitle_back/Seg_back 무관) Label을 붙이고 뗄 수 있는 자유 토글입니다.** 이전 판단을 정정합니다.

**사용자 확인 완료(강한 제약사항) — Home Type은 홈 화면 전용입니다.** Big Title/NoTitle_back/NoTitle_close/Smalltitle_back/Smalltitle_close/Seg_back/Seg_close 7개 Type은 화면 성격에 따라 여러 화면에서 범용으로 골라 쓰는 재사용 가능한 헤더 구성이지만, **Home은 앱의 홈 화면(첫 진입 화면)에서만 쓰도록 의도된 전용 Type입니다.** 다른 화면에 Home Type을 가져다 쓰는 것은 이 컴포넌트의 의도된 사용 범위를 벗어납니다 — [leading.md](../leading/leading.md)의 동일한 제약과 짝을 이룹니다.

## 3. Leading·Trailing·Smalltitle의 실제 사용 값

Top 안에서 각 서브 아톰은 아래처럼 특정 값으로 고정되어 인스턴스화됩니다(추가 발견, 각 서브 문서에 없는 "실 사용처" 정보):

- **Leading**: `type=Back|Close|Big Title`(Type에 종속). `showLabel`은 Back 타입에서 **어느 Top Type에 들어가든 자유롭게 토글 가능**합니다(사용자 확인 — 위 정정 사항 참고).
- **Trailing**: 각 Type의 최대 아이콘 수(3/2/1)까지 [Trailing Components](../trailing-components/trailing-components.md)를 조합하며, Icon·Button 타입을 섞어 쓸 수 있습니다(사용자 확인, 2장). Trailing 자체는 Mode 축이 없으므로([trailing.md](../trailing/trailing.md) 1장), Top이 내부 Trailing Components 인스턴스 각각을 Mode에 맞게 개별 재정의합니다 — Dark 조합에서는 각 항목이 `_Trailing Components / Type=Icon, Mode=Dark`(`2555:12410`)로 바뀌고, 그 안의 Icon Button 아이콘 색이 `common/white-default`로 오버라이드됩니다. **별도 다크 SVG 파일로 교체되는 것이 아니라 벡터의 채우기 색만 바뀝니다**(2026-09-15 정정).
- **Smalltitle**: `type=Default|Segmented Control`만 관찰됨(`type=Selection`/`Caption`은 Top의 7개 Type 어디에도 쓰이지 않음 — [smalltitle.md](../smalltitle/smalltitle.md)의 Selection/Caption이 Top 밖의 다른 맥락에서 쓰이는지는 확인 필요).

## 3-1. Leading·Trailing·Smalltitle 개별 표시/숨김 규칙 (사용자 확인)

**Leading, Trailing, Smalltitle은 각 화면 상태에서 개별적으로 숨길(hide) 수 있으며, 한 항목이 사라져도 다른 항목의 위치는 고정됩니다.** 즉 예를 들어 Leading을 숨겨도 Smalltitle이 진짜 중앙(화면 중심)으로 재정렬되지 않고, Trailing도 원래 자리에 그대로 남습니다 — `showLeading`/`showTrailing`/`showSmalltitle` 토글은 순수하게 해당 요소의 표시 여부만 결정하며 나머지 레이아웃을 재계산(reflow)하지 않습니다. 이는 이전 문서에서 "확인 필요"로 남겼던 사항이 해소된 것입니다.

## 4. Mode × Background별 배경·색상 (실측 4개 조합 + 추정)

| Mode | Background | 컨테이너 배경 | 텍스트/아이콘 색 |
|---|---|---|---|
| Light | Off | 없음(투명) | `neutral/800`(#202837) |
| **Light** | **On** | **`common/white-default`(#fdfdfd)** | `neutral/800`(#202837, 변화 없음) |
| Dark | Off | 없음(투명) — **2026-09-15 32개 변형 전수 실측으로 확인 완료**(`fills: []`) | `common/white-default`(#fdfdfd) |
| **Dark** | **On** | **`common/black-default`(#03091a)** | `common/white-default`(#fdfdfd, 변화 없음) |

> ⚠️ **구현에서 실제로 났던 오류** — Dark·On 배경을 `neutral/800`(#202837)으로 칠하고 있었습니다. 실측값은 `common/black-default`(#03091a)입니다(변수 바인딩 `VariableID:61:8372`). 2026-09-15에 교정했습니다.

**중요 — Status Bar와 다른 토큰을 씁니다.** 같은 저장소에 이미 문서화된 [Status Bar](../../../status-bar/status-bar.md)의 Background=On은 `common/white-emphasis`(#ffffff)/`common/black-emphasis`(#000000)를 쓰지만, **Navigation Bar Top은 `common/white-default`(#fdfdfd)/`common/black-default`(#03091a)를 씁니다.** 둘 다 시각적으로는 흰색/검정에 가깝지만 정확한 HEX가 다르므로, 컴포넌트별로 실측값을 그대로 써야 합니다(추정으로 대체하면 안 됨 — 이번 조사에서 직접 검증한 원칙이 실제로 다른 값을 잡아낸 사례).

**사용자 확인 완료 — Background=On의 배경색은 고정값이 아니라 Figma에 넣어둔 예시(placeholder)이며, 실제 화면에서는 자유롭게 다른 색으로 바꿔 쓸 수 있습니다.** 위 표의 `common/white-default`/`common/black-default`는 "이런 식으로 Mode에 맞춰 단색을 채운다"는 예시일 뿐, 반드시 이 두 토큰만 써야 하는 고정 규칙이 아닙니다 — 실제 화면(예: 브랜드 컬러 배경, 반투명 배경 등)에 맞게 배경색을 교체하는 것은 의도된 사용 범위입니다.

**Home Type도 위 표와 완전히 동일한 배경 토큰**(Light On=`common/white-default`, Dark On=`common/black-default`)을 씁니다 — Big Title과 배경 처리가 동일함을 4개 변형 전수 실측으로 확인했습니다. 다만 Home의 Leading 콘텐츠는 CSS로 색상을 입히는 텍스트가 아니라 Mode별로 별도 제작된 로고 SVG 이미지([leading.md](../leading/leading.md) 3장)이므로, 위 표의 "텍스트/아이콘 색" 개념이 문자 그대로 적용되진 않습니다.

아이콘(backward/close/plus/arrowhead_down 등)은 전부 Light/Dark **별도 SVG 에셋**이며 CSS 색상 반전이 아닙니다([leading.md](../leading/leading.md), [trailing-components.md](../trailing-components/trailing-components.md) 참고).

## 5. 인터랙션(모션) 스펙

**Navigation Bar의 5개 컴포넌트 셋(Top·Leading·Smalltitle·Trailing·_Trailing Components) 전부 프로토타입 반응(`reactions`)이 0건입니다** — 컴포넌트 셋 자체에도, 개별 변형에도 없습니다(2026-09-15 Plugin API 전수 확인).

그래서 상태 피드백은 **안에 든 인스턴스가 전부 담당합니다**.

| 영역 | 피드백 |
|---|---|
| 우측 [Trailing Components](../trailing-components/trailing-components.md) `Icon` | Icon Button `Ghost` — Hover 검정 5% · Pressed 검정 10% 오버레이 |
| 우측 `Button` | Text Button `Blue` — 텍스트 색 `#2c7be2` → `#276fcd` → `#2364b8` |
| 중앙 Segmented Control | Segmented Control 자체의 인디케이터 전환(200ms) |
| **좌측 [Leading](../leading/leading.md)(뒤로/닫기)** | **색 변화 없음** — Icon Button 인스턴스가 아니라 아이콘을 얹은 프레임입니다. 좌우가 비대칭이지만 **의도된 상태입니다**(디자이너 확인, 2026-09-15). 다만 아이콘+라벨 전체가 하나의 `<button>`이라 커서·키보드 포커스는 동작합니다(leading.md 5장) |

전환 시간·이징은 [`docs/INTERACTION.md`](../../../../docs/INTERACTION.md)의 공통 규칙(Hover 150ms · Pressed 50ms · Figma `Slow`)을 따릅니다.

Type 전환(예: 스크롤에 따라 Big Title → NoTitle_back으로 축소되는 iOS 스타일 collapsing header)은 여전히 Figma에 정의가 없습니다 — 실제 구현 시 별도 결정이 필요합니다.

> ⚠️ 예전 판의 "모션 데이터 없음"은 `get_motion_context`만 보고 내린 결론이었습니다. 이 도구는 **키프레임 애니메이션만** 읽고 변형 전환은 `node.reactions`에 있으므로, 이것만으로 "모션 없음"을 결론지으면 안 됩니다.

## 6. 접근성

- Top 전체는 시맨틱하게 `<header>` 또는 `role="banner"`(화면 최상단 헤더)로 마크업되는 것이 일반적이나 Figma 파일에 규정 없음 — 확인 필요.
- Leading/Trailing/Smalltitle 각 서브 아톰의 접근성 요구사항(각 문서 참고)이 그대로 적용됩니다.
- Big Title 같은 화면 주 제목은 `<h1>` 등 헤딩 레벨과 연결되어야 페이지 구조가 스크린리더에 올바르게 전달됩니다 — 확인 필요.

## 7. 토큰 매칭 요약

**정확히 일치**
- Background=On 배경색(예시값): Light→`common/white-default`(#fdfdfd), Dark→`common/black-default`(#03091a) → `sys-color-common-*`와 일치
- 컨테이너 너비 390px(모바일 목업 표준 폭, [Status Bar](../../../status-bar/status-bar.md)와 동일)
- Leading/Trailing/Smalltitle 서브 아톰 스펙 전부 각 문서와 일치

**기존 토큰에 없음**
- `gap-166px`(Big Title 제외 6개 Type 공통 고정 간격) — spacing 토큰 체계(8/12/16/20...px 스케일)에 없는 값, Navigation Bar 전용 상수로 추정

**확인 완료(사용자 확인)**
- Smalltitle_close의 Trailing 최대 아이콘 수 — 2(Smalltitle_back과 동일, 사용자 제공 스크린샷으로 확인)
- Trailing "Number"(3/2/1)는 정확한 개수가 아니라 Type별 **최대 허용치**이며, 0~최댓값 사이로 자유 조절 가능(2장)
- Trailing에 Icon·Button을 섞어 쓸 수 있음(Smalltitle 영역을 침범하지 않는 선에서, 2장)
- Back의 showLabel은 Top의 어느 Type에 들어가든 자유 토글(이전에 "Seg 계열 강제 false"로 잘못 문서화했던 것 정정, 2장)
- Leading/Trailing/Smalltitle을 개별적으로 숨겨도 나머지 항목의 위치는 고정됨(reflow 없음, 3-1장)
- Background=On의 배경색은 고정값이 아니라 예시이며 실제 화면에서 자유롭게 교체 가능(4장)
- (2026-09-09) Home Type 추가 — 나머지 7개 Type과 동일한 Top 공통 규칙(Trailing 자유조절+혼용, 개별 hide 시 reflow 없음, Background=On 배경색 예시)을 그대로 적용받음(2장)
- (2026-09-09) Home Type은 홈 화면 전용이며 다른 화면에서 범용 재사용하지 않음 — 강한 제약사항으로 명시(2장)
- Big Title과 나머지 6개 Type의 컨테이너 정렬 속성값(justify-between vs gap-166px) 차이는 Figma 원본 그대로지만, Trailing의 flex-grow+justify-end 때문에 렌더링 결과는 동일 — 핵심 구조 차이처럼 서술했던 이전 버전을 정정(2장)

**확인 필요**
- `gap-166px`의 설계 근거
- Trailing에서 Icon·Button 혼용 시 Smalltitle을 침범하지 않는 정확한 폭 계산 규칙
- `<header>`/`role="banner"`/헤딩 레벨 등 접근성 마크업 연결 규정
- Type 전환(collapsing header) 시 모션 처리 여부

## 7-1. 2026-09-15 전수 재실측 요약

32개 변형 전부와 4개 서브 아톰 컴포넌트 셋을 Plugin API로 다시 읽어 구현과 대조했습니다. **찾아 고친 것은 전부 구현 쪽 잘못이었고, 스펙 쪽 오기도 함께 정정했습니다.**

| 위치 | 문제 | 조치 |
|---|---|---|
| Top | Dark·On 배경이 `neutral/800`(#202837) | `common/black-default`(#03091a)로 교정(4장) |
| Top | 컨테이너의 `gap 166px` / `justify-between` 구분이 구현에 없었음 | Type별로 반영(2장) |
| Top | 폭이 `390px`로 박혀 있고 Figma대로 **Trailing이 늘어나는** 구조였음 | 화면 폭을 따르게 바꾸고 늘어나는 쪽을 Leading/Smalltitle로 뒤집음(2-1장) |
| Smalltitle | 가운데 Segmented Control이 제어 모드로 꽂혀 **눌러도 전환되지 않았음** | 비제어 지원 추가 |
| Leading | Back·Close가 커서도 안 바뀌는 `<div>`였음 | 아이콘+라벨을 묶은 `<button>`으로 교체(색 오버레이는 없음) |
| Leading | 아이콘↔라벨 `gap`이 8px로 들어가 있었음(실측 0) | 0으로 교정 — Back 전체 92→**84px** |
| Leading | Home 로고를 흰 배경 컬러 로고 이미지로 그림 | 단색 워드마크 + 토큰 색(`neutral/600`↔흰색)으로 교체, 에셋 신규 추가 |
| Smalltitle | Selection 화살표가 제목 색(`neutral/800`)을 상속 | `neutral/600`으로 교정 |
| Smalltitle | Caption 보조 텍스트 weight 누락(Regular로 렌더) | **Medium(500)** |
| Smalltitle | Caption의 음수 gap(-2px)이 CSS `gap`이라 무시됨 | 음수 margin으로 옮겨 높이 50→**48px** |
| Trailing Components | Icon·Button을 **흉내만 내서** hover/pressed가 통째로 없었음 | 실제 Icon Button·Text Button 인스턴스 재사용 |
| 전 문서 | 상위 그룹 ID `2555:16790`이 더 이상 존재하지 않음 | `2612:16631`로 갱신 |
| 전 문서 | "Mode는 별도 다크 SVG 에셋을 쓴다"는 서술 | 실제로는 **변수 바인딩된 채우기 색**만 바뀜 — 각 문서 정정 |
| 전 문서 | "모션 데이터 없음"(`get_motion_context`만 보고 판단) | 셋 자체는 반응 0건이 맞지만, 내부 인스턴스의 인터랙션이 살아 있음(5장) |

**디자이너 확인(2026-09-15)**
- Figma에 고정 폭으로 박힌 값(Back 라벨 48 · Big Title 230 · Home 로고칸 230)은 **그대로 고정 폭으로 구현**합니다(hug 아님).
- **단 Trailing의 Button 자리는 예외로 hug입니다**(2026-09-15 정정) — 버튼이 들어가면 글자 폭만큼만 차지합니다([trailing-components.md](../trailing-components/trailing-components.md) 2장).
- Dark의 hover/pressed 오버레이는 **Figma 원본대로 `interaction/light-gray` 유지**합니다(어두운 배경에서 잘 안 보이는 것을 감수).
- 폭은 **화면 폭을 따르고**, 넓어질 때 Trailing은 고정, 중앙이 없으면 Leading이·있으면 Smalltitle이 늘어납니다(2-1장).
- 가운데 Segmented Control은 **기존 컴포넌트를 그대로 넣은 것이므로 인터랙션도 그대로 동작**해야 합니다.
- 좌측 Leading은 **아이콘+라벨 영역 전체가 클릭 대상**이어야 합니다(커서가 바뀌어야 함).
- Leading에는 **hover/pressed를 넣지 않습니다**.

## 8. 샘플링에 사용한 13개 노드 (부록)

| 목적 | 노드 |
|---|---|
| Big Title(Light·Off) | `2555:12819` |
| NoTitle_back(Light·Off) | `2555:12820` |
| NoTitle_close(Light·Off) | `2555:12818` |
| Smalltitle_back(Light·Off) | `2555:12813` |
| Seg_back(Light·Off) | `2555:12817` |
| Seg_close(Light·Off) | `2555:13056` |
| Big Title(Light·On) — Background 대조 | `2555:12825` |
| Big Title(Dark·On) — Mode+Background 대조 | `2555:12821` |
| Home(Light·Off) | `2573:12778` |
| Home(Light·On) — Background 대조 | `2573:12781` |
| Home(Dark·On) — Mode+Background 대조 | `2573:12842` |
| Home(Dark·Off) — Mode 대조 | `2573:12845` |

`get_metadata`로 32개 변형 전체의 심볼 목록을 확인했고, `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2612:16631`)에서 공용으로 확보했습니다. Smalltitle_close(`2555:12810`류)는 이번 표본에 포함되지 않았으나, 사용자가 제공한 스크린샷(Close+Subtitle+아이콘 2개 구성)으로 Trailing 최대치가 Smalltitle_back과 동일한 2임을 확인했습니다. Home은 4개 변형(Light/Dark×Off/On) 전수를 실측했습니다(2026-09-09 추가).
