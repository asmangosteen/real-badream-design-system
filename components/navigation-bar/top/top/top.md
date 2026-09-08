# Top (Navigation Bar)

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2555-12827) — Frame `2555:12827` ("Top"), 상위 그룹 `2555:16790`
> 기계 판독용 값은 [`top.json`](./top.json)을 함께 참고합니다. 이 문서와 top.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/top/`의 **플래그십(최상위) 컴포넌트**입니다 — [Leading](../leading/leading.md), [Trailing](../trailing/trailing.md)(+[Trailing Components](../trailing-components/trailing-components.md)), [Smalltitle](../smalltitle/smalltitle.md)을 조합해 만들어집니다. **사용자 확인**: Navigation Bar 그룹(`2555:16790`) 안에서 Leading/Trailing/Trailing Components/Smalltitle 4개 프레임은 "하위항목"(서브 아톰)이고, 이 `Top` 프레임이 실제로 화면에 쓰일 **완성형 상단 내비게이션 바**입니다. Bottom Navigation Bar는 별도로 추후 `components/navigation-bar/bottom/`에 문서화될 예정입니다.

## 0. 문서 범위와 샘플링 방법

Top은 **Type(Big Title/NoTitle_back/NoTitle_close/Smalltitle_back/Smalltitle_close/Seg_back/Seg_close) × Mode(Light/Dark) × Background(Off/On) 3축, 28-변형 컴포넌트**로 완전 직교(7×2×2=28)입니다.

- `get_metadata`로 28개 심볼을 전수 확인했습니다.
- 변형 수가 많아 **7개 Type 전부 + Background/Mode 조합 일부를 포함한 9개 노드**를 `get_design_context`로 개별 실측했습니다: Big Title(Light·Off) `2555:12819`, NoTitle_back(Light·Off) `2555:12820`, NoTitle_close(Light·Off) `2555:12818`, Smalltitle_back(Light·Off) `2555:12813`, Seg_back(Light·Off) `2555:12817`, Seg_close(Light·Off) `2555:13056`, Big Title(Light·On) `2555:12825`, Big Title(Dark·On) `2555:12821`.
- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2555:16790`)에 각 1회 호출해 확보했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Top은 화면 최상단에 오는 **완성형 상단 내비게이션 바**입니다. 전 변형 공통으로 `w=390px` 고정 폭이며, 항상 [Leading](../leading/leading.md)(좌측)과 [Trailing](../trailing/trailing.md)(우측)을 기본으로 갖고, Type에 따라 중앙에 [Smalltitle](../smalltitle/smalltitle.md)이 추가됩니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Big Title / NoTitle_back / NoTitle_close / Smalltitle_back / Smalltitle_close / Seg_back / Seg_close | 화면 성격에 따른 헤더 구성 조합(2장 상세) |
| **Mode** | Light / Dark | 밝은/어두운 화면에 맞춘 색상 팔레트 |
| **Background** | Off / On | Off=투명(화면 콘텐츠 위에 얹는 용도), On=단색 배경 채움. Figma의 배경색(Mode별 예시)은 고정값이 아니라 예시이며 실제 화면에 맞게 자유롭게 교체 가능(사용자 확인, 4장) |
| **Show Leading**(비-variant) | False / True(기본 True) | Leading 표시 여부. 숨겨도 Trailing/Smalltitle 위치는 고정(reflow 없음, 사용자 확인, 3-1장) |
| **Show Trailing**(비-variant) | False / True(기본 True) | Trailing 표시 여부. 숨겨도 다른 항목 위치는 고정 |
| **Show Smalltitle**(비-variant, Smalltitle 포함 Type 한정) | False / True(기본 True) | Smalltitle 표시 여부. 숨겨도 다른 항목 위치는 고정 |

## 2. Type별 조합 구조 (7개 전수 실측)

| Type | 컨테이너 정렬 | Leading | Trailing(최대 아이콘 수) | Smalltitle |
|---|---|---|---|---|
| **Big Title** | `justify-between`(gap 없음) | type=Big Title | **최대 3**(사용자 확인) | 없음 |
| **NoTitle_back** | `gap-166px`(고정) | type=Back | 최대 3 | 없음 |
| **NoTitle_close** | `gap-166px` | type=Close | 최대 3 | 없음 |
| **Smalltitle_back** | `gap-166px` | type=Back | 최대 2 | type=Default, 컨테이너 중앙에 `absolute` 배치 |
| **Smalltitle_close** | `gap-166px` | type=Close | 최대 2(사용자 제공 스크린샷으로 확인 완료) | type=Default |
| **Seg_back** | `gap-166px` | type=Back | 최대 1 | type=Segmented Control(Size=S, Count=2), `absolute` 배치 |
| **Seg_close** | `gap-166px` | type=Close | 최대 1 | type=Segmented Control(Size=S, Count=2), `absolute` 배치 |

**사용자 확인 완료 — Trailing "Number"는 정확한 개수가 아니라 Type별 최대 허용치입니다.** Figma에 샘플링된 각 Type의 아이콘 개수(3/2/1)는 그 Type에서 쓸 수 있는 **최댓값**이며, 실제 화면에서는 그보다 적게 쓰거나(예: Big Title에서 아이콘 1개만) 아예 비울 수 있습니다. 다만 최댓값을 초과해서 늘릴 수는 없습니다 — 즉 Trailing 최대 허용량이 중앙 콘텐츠 크기에 반비례하는 규칙(중앙 없음=3, Smalltitle 텍스트=2, Segmented Control=1)은 유지되지만, 각 Type 안에서는 0~최댓값 사이로 자유롭게 조절 가능합니다.

**사용자 확인 완료 — Trailing에는 아이콘과 버튼([Trailing Components](../trailing-components/trailing-components.md)의 Icon/Button 두 타입)을 섞어 쓸 수 있습니다.** 단, 화면 상황에 따라 Smalltitle(중앙 콘텐츠) 영역을 침범하지 않는 선에서만 사용 가능합니다 — 정확한 상한 규칙(예: 버튼 1개=아이콘 몇 개분 폭인지)은 Figma에 수치로 정의되어 있지 않아 **확인 필요**입니다.

**컨테이너 정렬 방식이 Type에 따라 갈립니다.** Big Title만 `justify-between`(Leading·Trailing이 각각 끝에 붙고 사이 공간은 비워짐)이고, 나머지 6개 Type은 전부 `gap-166px`라는 **고정 간격 값**을 씁니다(스페이싱 토큰이 아닌 리터럴 값 — 확인 필요, Big Title을 제외한 모든 Type이 정확히 동일한 166px를 공유한다는 점에서 의도된 디자인 상수로 보입니다).

**사용자 확인 완료 — Back의 Label 표시 여부는 Type과 무관하게 항상 자유롭게 켜고 끌 수 있습니다.** 최초 샘플링에서 Seg_back/Seg_close 노드가 `showLabel=false`로 관측되어 "Seg 계열은 라벨을 강제로 숨긴다"고 잘못 추정했으나, **사용자 확인 결과 이는 그 샘플의 설정값일 뿐이며 실제로는 Back 타입이 어느 Top Type에 들어가든(NoTitle_back/Smalltitle_back/Seg_back 무관) Label을 붙이고 뗄 수 있는 자유 토글입니다.** 이전 판단을 정정합니다.

## 3. Leading·Trailing·Smalltitle의 실제 사용 값

Top 안에서 각 서브 아톰은 아래처럼 특정 값으로 고정되어 인스턴스화됩니다(추가 발견, 각 서브 문서에 없는 "실 사용처" 정보):

- **Leading**: `type=Back|Close|Big Title`(Type에 종속). `showLabel`은 Back 타입에서 **어느 Top Type에 들어가든 자유롭게 토글 가능**합니다(사용자 확인 — 위 정정 사항 참고).
- **Trailing**: 각 Type의 최대 아이콘 수(3/2/1)까지 [Trailing Components](../trailing-components/trailing-components.md)를 조합하며, Icon·Button 타입을 섞어 쓸 수 있습니다(사용자 확인, 2장). Trailing 자체는 Mode 축이 없으므로([trailing.md](../trailing/trailing.md) 1장), Top이 내부 Trailing Components 인스턴스 각각을 Mode에 맞게 개별 재정의합니다 — Dark 모드 조합(예: Big Title·Dark·On)에서는 각 아이콘이 `2555:12411`류의 Dark 전용 노드로 교체되어 있음을 실측으로 확인했습니다.
- **Smalltitle**: `type=Default|Segmented Control`만 관찰됨(`type=Selection`/`Caption`은 Top의 7개 Type 어디에도 쓰이지 않음 — [smalltitle.md](../smalltitle/smalltitle.md)의 Selection/Caption이 Top 밖의 다른 맥락에서 쓰이는지는 확인 필요).

## 3-1. Leading·Trailing·Smalltitle 개별 표시/숨김 규칙 (사용자 확인)

**Leading, Trailing, Smalltitle은 각 화면 상태에서 개별적으로 숨길(hide) 수 있으며, 한 항목이 사라져도 다른 항목의 위치는 고정됩니다.** 즉 예를 들어 Leading을 숨겨도 Smalltitle이 진짜 중앙(화면 중심)으로 재정렬되지 않고, Trailing도 원래 자리에 그대로 남습니다 — `showLeading`/`showTrailing`/`showSmalltitle` 토글은 순수하게 해당 요소의 표시 여부만 결정하며 나머지 레이아웃을 재계산(reflow)하지 않습니다. 이는 이전 문서에서 "확인 필요"로 남겼던 사항이 해소된 것입니다.

## 4. Mode × Background별 배경·색상 (실측 4개 조합 + 추정)

| Mode | Background | 컨테이너 배경 | 텍스트/아이콘 색 |
|---|---|---|---|
| Light | Off | 없음(투명) | `neutral/800`(#202837) |
| **Light** | **On** | **`common/white-default`(#fdfdfd)** | `neutral/800`(#202837, 변화 없음) |
| Dark | Off | 없음(투명) — 직접 미측정, Light Off와 대칭 구조로 추정 | `common/white-default`(#fdfdfd) |
| **Dark** | **On** | **`common/black-default`(#03091a)** | `common/white-default`(#fdfdfd, 변화 없음) |

**중요 — Status Bar와 다른 토큰을 씁니다.** 같은 저장소에 이미 문서화된 [Status Bar](../../../status-bar/status-bar.md)의 Background=On은 `common/white-emphasis`(#ffffff)/`common/black-emphasis`(#000000)를 쓰지만, **Navigation Bar Top은 `common/white-default`(#fdfdfd)/`common/black-default`(#03091a)를 씁니다.** 둘 다 시각적으로는 흰색/검정에 가깝지만 정확한 HEX가 다르므로, 컴포넌트별로 실측값을 그대로 써야 합니다(추정으로 대체하면 안 됨 — 이번 조사에서 직접 검증한 원칙이 실제로 다른 값을 잡아낸 사례).

**사용자 확인 완료 — Background=On의 배경색은 고정값이 아니라 Figma에 넣어둔 예시(placeholder)이며, 실제 화면에서는 자유롭게 다른 색으로 바꿔 쓸 수 있습니다.** 위 표의 `common/white-default`/`common/black-default`는 "이런 식으로 Mode에 맞춰 단색을 채운다"는 예시일 뿐, 반드시 이 두 토큰만 써야 하는 고정 규칙이 아닙니다 — 실제 화면(예: 브랜드 컬러 배경, 반투명 배경 등)에 맞게 배경색을 교체하는 것은 의도된 사용 범위입니다.

아이콘(backward/close/plus/arrowhead_down 등)은 전부 Light/Dark **별도 SVG 에셋**이며 CSS 색상 반전이 아닙니다([leading.md](../leading/leading.md), [trailing-components.md](../trailing-components/trailing-components.md) 참고).

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Navigation Bar 상위 그룹(`2555:16790`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Type 전환(예: 스크롤에 따라 Big Title → NoTitle_back으로 축소되는 iOS 스타일 collapsing header 애니메이션)이 있을 법하나 Figma 파일에 모션 값이 정의되어 있지 않습니다 — 실제 구현 시 별도 결정이 필요합니다.

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

**확인 필요**
- Dark·Background=Off 조합의 배경 처리(Light·Off와 대칭으로 추정, 직접 미확인)
- `gap-166px`의 설계 근거
- Trailing에서 Icon·Button 혼용 시 Smalltitle을 침범하지 않는 정확한 폭 계산 규칙
- `<header>`/`role="banner"`/헤딩 레벨 등 접근성 마크업 연결 규정
- Type 전환(collapsing header) 시 모션 처리 여부

## 8. 샘플링에 사용한 9개 노드 (부록)

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

`get_metadata`로 28개 변형 전체의 심볼 목록을 확인했고, `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2555:16790`)에서 공용으로 확보했습니다. Smalltitle_close(`2555:12810`류)는 이번 9개 표본에 포함되지 않았으나, 사용자가 제공한 스크린샷(Close+Subtitle+아이콘 2개 구성)으로 Trailing 최대치가 Smalltitle_back과 동일한 2임을 확인했습니다.
