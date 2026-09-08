# Top Bar

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2555-13875) — Frame `2555:13875` ("Top Bar")
> 기계 판독용 값은 [`top-bar.json`](./top-bar.json)을 함께 참고합니다. 이 문서와 top-bar.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/`의 **최종 합성 컴포넌트**입니다 — [Status Bar](../../status-bar/status-bar.md)와 [Navigation Bar Top](../top/top/top.md)을 세로로 쌓아 화면 최상단에 그대로 얹는 완성형 "기기 상단 전체" 컴포넌트입니다. Bottom Navigation Bar 작업이 끝나면 이와 대응하는 하단 합성 컴포넌트가 별도로 문서화될 예정입니다.

## 0. 문서 범위와 샘플링 방법

Top Bar는 **Mode(Light/Dark) × Background(No/Default/Blur) × Line(Off/On) 3축, 10-변형 컴포넌트**입니다. `Background=No`일 때는 `Line=On` 조합 자체가 Figma에 존재하지 않아(사용자 확인 — 배경 없음에는 구분선도 없음) 2×3×2=12가 아니라 **10개**로 비직교(non-orthogonal)입니다.

- `get_metadata`로 10개 심볼을 전수 확인했습니다.
- **6개 노드**를 `get_design_context`로 실측했습니다: Light·Default·Off(`2555:13871`), Light·Default·On(`2555:13874`), Light·No·Off(`2555:14327`), Light·Blur·Off(`2555:13869`), Dark·Default·On(`2555:13873`), Dark·Blur·Off(`2555:13870`) — Background 3종 × Line 2종(가능한 조합) × 대표 Mode를 교차 확인하도록 샘플링했습니다.
- `get_variable_defs`·`get_motion_context`는 최상위 프레임(`2555:13875`)에 각 1회 호출해 확보했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Top Bar는 [Status Bar](../../status-bar/status-bar.md)(기기 상태바)와 [Navigation Bar Top](../top/top/top.md)(내비게이션 바)을 `flex-col`로 세로로 쌓은 **화면 최상단 전체 영역** 컴포넌트입니다. 두 서브 컴포넌트를 각각 개별적으로 켜고 끌 수 있어(3장), 필요에 따라 상태바만/내비게이션 바만/둘 다를 배치할 수 있습니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Mode** | Light / Dark | 밝은/어두운 화면에 맞춘 배경·전경색 팔레트. [Status Bar](../../status-bar/status-bar.md)·[Navigation Bar Top](../top/top/top.md)에도 동일하게 전파됨 |
| **Background** | No / Default / Blur | No=배경 없음(투명), Default=단색 배경 채움, Blur=반투명 배경+backdrop blur(사용자 확인 — 3가지 배경 처리, 2장) |
| **Line**(Background=No에서는 존재하지 않음) | Off / On | 컴포넌트 하단에 구분선(divider)을 표시할지 여부. **Background=No일 때는 Line 자체가 없음**(사용자 확인, 2장) |
| **Show Status Bar**(비-variant) | False / True(기본 True) | Status Bar 표시 여부, 독립적으로 hide 가능(사용자 확인, 3장) |
| **Show Navigation Bar**(비-variant) | False / True(기본 True) | Navigation Bar Top 표시 여부, 독립적으로 hide 가능(사용자 확인, 3장) |

## 2. Background 3종 상세 (사용자 확인 + 실측)

**사용자 확인 완료 — 배경은 "없는 것", "들어가있는 것(Default)", "블러 처리된 것(Blur)" 3가지입니다.**

| Background | 처리 방식 | Light 실측값 | Dark 실측값 |
|---|---|---|---|
| **No** | 배경 클래스 자체가 없음(완전 투명) | — | — |
| **Default** | 단색 배경 채움 | `common/white-default`(#fdfdfd) | `common/black-emphasis`(#000000) |
| **Blur** | `backdrop-blur(40px)` + 반투명 오버레이 | `color/gray/50-60`(rgba(253,253,253,0.6), 흰색 60%) | `color/gray/900-40`(rgba(3,9,26,0.4), 검정 40%) |

**핵심 발견 1 — Default의 Light/Dark 배경 토큰 계열이 서로 다릅니다.** Light는 `common/white-**default**`(#fdfdfd)를 쓰지만 Dark는 `common/black-**emphasis**`(#000000, `-default`가 아님)를 씁니다 — Light와 Dark가 대칭적인 토큰 페어(`white-default`/`black-default` 또는 `white-emphasis`/`black-emphasis`)를 이루지 않는 비대칭 사례입니다. 값 자체는 실측대로 정확하나, 의도된 비대칭인지 Figma 파일의 일관성 오류인지는 **확인 필요**입니다.

**핵심 발견 2 — Blur의 오버레이 색상·불투명도가 Mode마다 다릅니다.** Light는 흰색 60% 오버레이, Dark는 검정 40% 오버레이로, 오버레이 자체의 톤과 강도가 Mode에 맞춰 별도로 튜닝되어 있습니다(단순히 같은 규칙을 색만 반전한 것이 아님). `backdrop-blur` 반경(40px)은 Mode·조합 전체 공통입니다.

**참고**: Background=Default·Blur의 배경/오버레이 색상은 [Navigation Bar Top](../top/top/top.md) 4장에서 이미 확인된 원칙("Background=On의 배경색은 Figma 예시일 뿐 고정 규칙이 아니며 자유 교체 가능", 사용자 확인)과 동일하게, 이 값들도 예시로 간주하고 실제 화면에 맞게 조정 가능할 것으로 추정됩니다 — 다만 Top Bar 자체에 대해 별도로 재확인하지는 않았습니다(확인 필요).

## 3. Line(구분선) 규칙 (사용자 확인 + 실측)

**사용자 확인 완료 — Line(구분선)은 배경이 없는 경우(Background=No)에는 들어가지 않습니다.** `get_metadata` 실측으로도 이를 확인했습니다 — 10개 변형 중 Background=No 조합(Light·Dark 각 1개)에는 애초에 `Line=On` 심볼 자체가 Figma에 존재하지 않습니다(2×1 = 2개뿐). Background=Default·Blur는 각각 Line Off/On 두 개씩 존재합니다(2×2×2=8). 2+8=10으로 전체 변형 수와 일치합니다.

| Line=On 조건 | 구분선 스펙 |
|---|---|
| Light + Default | `border-bottom`, `borderwidth/02`=1px, 색상 `color/gray/900-5`(rgba(3,9,26,0.05)) |
| Dark + Default | `border-bottom`, `borderwidth/02`=1px, 색상 `color/gray/50-5`(rgba(253,253,253,0.05)) |
| Light/Dark + Blur | 실측하지 않음(2·5개 노드 표본에 미포함) — Default와 동일한 패턴(반대 톤 뉴트럴 5%)일 것으로 추정, **확인 필요** |

**핵심 발견**: 구분선 색상이 Mode의 "반대 톤" 뉴트럴을 5% 불투명도로 씁니다 — Light 배경 위에는 어두운 톤(`gray/900`) 5%, Dark 배경 위에는 밝은 톤(`gray/50`) 5%를 써서, 어느 Mode에서든 배경과 미세하게 대비되는 얇은 선을 만드는 방식입니다.

## 4. Status Bar·Navigation Bar 개별 hide (사용자 확인)

**사용자 확인 완료 — Status Bar와 Navigation Bar는 각각 독립적으로 hide할 수 있습니다.** `TopBarProps`에 `statusBar`(기본 true)·`navigationBar`(기본 true) 두 boolean prop이 별도로 존재하며, 실측 코드에서도 두 서브 컴포넌트가 각각 별도 조건부 렌더링 블록으로 분리되어 있어 독립 토글이 코드 레벨로 확인됩니다.

- Show Status Bar=False: [Status Bar](../../status-bar/status-bar.md) 영역이 완전히 사라지고 Navigation Bar Top이 맨 위로 올라옵니다(Top Bar 자체가 `flex-col`이라 자연스럽게 붙음).
- Show Navigation Bar=False: [Navigation Bar Top](../top/top/top.md) 영역이 사라지고 Status Bar만 남습니다.
- [Navigation Bar Top](../top/top/top.md) 자체의 Leading/Trailing/Smalltitle 개별 hide(사용자 확인, top.md 3-1장)와는 별개의 상위 레벨 토글입니다.

## 5. 서브컴포넌트 재사용 관계 — 실제 구성값

Top Bar 안에서 두 서브 컴포넌트는 아래 값으로 고정 조립됩니다:

- **[Status Bar](../../status-bar/status-bar.md)**: `os=iOS` 고정, Mode는 Top Bar의 Mode를 그대로 전파. Background는 항상 관찰되지 않음(Status Bar 자체의 Background 축과 Top Bar의 Background 축은 서로 무관 — Status Bar는 자신의 `Background=Off`(투명) 상태로만 쓰이고, 진짜 배경은 Top Bar 컨테이너가 담당).
- **[Navigation Bar Top](../top/top/top.md)**: **`type="Smalltitle_back"`으로 고정**되어 있습니다(실측된 6개 노드 전부 동일). [Top](../top/top/top.md) 자체가 Figma 컴포넌트 인스턴스이므로, 실제 사용 시 이 인스턴스의 Type을 7종(Big Title/NoTitle_back/NoTitle_close/Smalltitle_back/Smalltitle_close/Seg_back/Seg_close) 중 다른 것으로 교체(swap)하는 것이 구조적으로 가능할 것으로 보이나, Top Bar 컴포넌트 자체의 공식 variant 축으로는 노출되어 있지 않습니다 — Type을 자유롭게 바꿔써도 되는지는 **확인 필요**(Navigation Bar Top 문서에서 이미 확인된 "28개 변형이 전부가 아니다"라는 원칙과 같은 맥락일 가능성이 높음).

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 최상위 프레임(`2555:13875`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Background=Blur의 `backdrop-blur` 진입/이탈 트랜지션(예: 스크롤에 따라 투명→블러로 전환되는 애니메이션)이 있을 법하나 Figma 파일에 모션 값이 정의되어 있지 않습니다.

## 7. 접근성

- Top Bar 전체는 시맨틱하게 `<header>`로 마크업되는 것이 일반적이나 Figma 파일에 규정 없음 — [Navigation Bar Top](../top/top/top.md) 6장과 동일한 확인 필요 사항입니다.
- Status Bar는 [status-bar.md](../../status-bar/status-bar.md) 6장에서 이미 확인된 대로 순수 목업이라 실제 구현에서는 보통 제외되거나 `aria-hidden` 처리됩니다.
- Background=Blur는 배경 콘텐츠가 비쳐 보이는 디자인이므로, 그 위에 얹히는 텍스트/아이콘의 명암비가 배경에 따라 달라질 수 있습니다 — 실제 스크롤 콘텐츠와 겹쳤을 때의 WCAG 명암비 검증은 Figma 정적 디자인만으로 확인할 수 없습니다 — 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- Background=Default: `common/white-default`(#fdfdfd), `common/black-emphasis`(#000000) → `sys-color-common-*`와 일치
- Background=Blur 오버레이: `color/gray/50-60`(rgba(253,253,253,0.6)), `color/gray/900-40`(rgba(3,9,26,0.4)) → 저장소 alpha 팔레트와 일치
- Line: `borderwidth/02`=1px, `color/gray/900-5`/`color/gray/50-5` → `ref-borderwidth-02`, alpha 팔레트와 일치
- Status Bar·Navigation Bar Top 서브컴포넌트 스펙 전부 각 문서와 일치

**기존 토큰에 없음**
- `backdrop-blur` 반경 40px 자체를 규정하는 blur 스케일 토큰이 저장소에 없음(단일 고정값)

**확인 완료(사용자 확인)**
- 배경 3종(No/Default/Blur) 구분(2장)
- Background=No에서는 Line이 존재하지 않음(3장)
- Status Bar·Navigation Bar 각각 독립적으로 hide 가능(4장)

**확인 필요**
- Default의 Light(`white-default`)/Dark(`black-emphasis`) 배경 토큰 페어가 비대칭인 이유(2장 핵심 발견 1)
- Background=Blur일 때 Line=On의 구분선 색상이 Default와 동일한 패턴인지(3장, 미실측)
- Navigation Bar Top의 Type을 Smalltitle_back 외 다른 6종으로 자유롭게 교체해도 되는지(5장)
- Background=Default/Blur 배경색이 Top Bar에서도 예시일 뿐 자유 교체 가능한지(2장 참고, Navigation Bar Top에서는 사용자 확인됨)
- Blur의 backdrop-blur 진입/이탈 모션 처리 여부
- Blur 배경 위 텍스트/아이콘의 실제 명암비(배경 콘텐츠에 따라 가변적)

## 9. 샘플링에 사용한 6개 노드 (부록)

| 목적 | 노드 |
|---|---|
| Light·Default·Off | `2555:13871` |
| Light·Default·On(Line 구분선 확인) | `2555:13874` |
| Light·No·Off(배경 없음 기준) | `2555:14327` |
| Light·Blur·Off | `2555:13869` |
| Dark·Default·On(Line 구분선 Dark 대조) | `2555:13873` |
| Dark·Blur·Off | `2555:13870` |

`get_metadata`로 10개 변형 전체의 심볼 목록을 확인했고(Background=No에는 Line=On 조합 자체가 없음을 이때 확인), `get_variable_defs`·`get_motion_context`는 최상위 프레임(`2555:13875`)에서 공용으로 확보했습니다. Blur+Line=On 조합(Light `2555:13868`, Dark `2555:13867`)은 이번 6개 표본에 포함되지 않아 구분선 색상 패턴은 Default 기준으로 추정만 했습니다(확인 필요, 3장).
