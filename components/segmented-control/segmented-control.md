# Segmented Control

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2197-8777) — Frame `Segmented Control` (node `2197:8777`)
> 기계 판독용 값은 [`segmented-control.json`](./segmented-control.json)을 함께 참고합니다. 이 문서와 segmented-control.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Segmented Control은 **Size(S/M/L/XL) × Count(2/3/4/5, 세그먼트 개수) 2개 축, 20개 인스턴스**로 구성됩니다(Size=S에서만 구/신 두 벌의 노드가 존재해 4×4=16이 아니라 20개입니다 — 4장 참고). Dropdown(288개)만큼 크지 않으므로 전략적 샘플링으로 충분합니다.

- `get_metadata`로 20개 인스턴스 전체의 레이어명·크기를 사전 확보해 축 구조를 파악했습니다(오케스트레이터가 사전 확보, 작업 지시에 포함됨).
- 그 결과를 바탕으로 **총 10개 노드**를 `get_design_context`로 개별 실측했습니다:
  1. **Size 4종 비교**(Count=2 고정): S-구버전(`2197:8776`) · S-신버전(`2215:13505`) · M(`2197:8774`) · L(`2197:8772`) · XL(`2197:8773`) — 5개
  2. **Count 축 확인**(Size=M 고정): Count=3(`2197:8767`) · Count=4(`2197:8763`) · Count=5(`2197:8769`) — 3개 추가
  3. **S 신버전의 Count 축 일관성 확인**: Count=3(`2215:13508`) · Count=4(`2215:13512`) — 2개 추가
- `get_variable_defs`는 대표 노드 2개(M/`2197:8774`, S-신버전/`2215:13505`)에서 호출했습니다.
- `get_motion_context`는 최상위 프레임(`2197:8777`, recursive=true)에 1회 호출했습니다.
- **나머지 10개(미실측)**: S-구버전의 Count=3/4/5(`2197:8771`/`8775`/`8761`), L/XL의 Count=3/4/5(6개), 총 9개는 M의 Count 축 실측 결과("Count가 늘어도 컨테이너 padding·gap·radius·높이는 불변, 세그먼트 개수만 바뀜")가 그대로 적용된다고 **추정(패턴 기반)** 했습니다. 개별 실측하지 않은 조합에 새 토큰명을 만들지는 않았습니다 — 9장 부록에 실측/미실측 노드를 구분해 표기합니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Segmented Control은 여러 개의 [`_Item`](../global/segmented-control-item/segmented-control-item.md)(세그먼트/탭)을 가로로 배열한 조합형 선택 컨트롤입니다. 회색 트랙(container) 위에 세그먼트들이 나란히 놓이고, 선택된 세그먼트만 흰 배경 pill + 그림자로 부상해 보입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L / XL | 컨트롤 전체의 크기 단계(컨테이너 padding·radius·gap 및 내부 `_Item`의 크기 스케일). **XS는 Segmented Control 레벨에는 존재하지 않음**(관찰 사실, 3장 참고) |
| **Count** | 2 / 3 / 4 / 5 | 세그먼트(탭) 개수. 세그먼트가 늘어나도 컨테이너 자체의 padding/gap/radius/높이는 불변, 각 `_Item`이 폭만 나눠 가짐(3장) |

**Size=S 구/신버전**: Size=S에서만 Figma 노드가 두 벌(`2197:87xx` 구버전, `2215:135xx` 신버전) 존재하며 실측 결과 서로 다른 내부 구성을 가집니다 — **확인 필요** 항목으로 4장에서 상세히 다룹니다.

## 2. 컨테이너 스펙 (Count=2 기준, Size별)

| Size | 노드 | 배경 | radius | 컨테이너 padding | 세그먼트 간 gap | 컨테이너 전체 높이(실측) | 내부 `_Item` 크기 |
|---|---|---|---|---|---|---|---|
| **S(구버전)** | `2197:8776` | `color/gray/200`=`#f1f2f3` | `radius/04`=8px | `spacing/02`=2px | `spacing/05`=6px | **30px** | **S**-sized `_Item`(px 8 / py 4, `radius/03`, Caption1/12 SB) |
| **S(신버전)** | `2215:13505` | `color/gray/200`=`#f1f2f3` | `radius/04`=8px | `spacing/02`=2px | `spacing/05`=6px | **26px** | **XS**-sized `_Item`(px 8 / py 3, `radius/03`, Caption2/10 SB) — 4장 참고 |
| **M** | `2197:8774` | `color/gray/200`=`#f1f2f3` | `radius/06`=12px | `spacing/04`=4px | `spacing/06`=8px | 42px | **M**-sized `_Item`(px 10 / py 6, `radius/04`, Body2/14 M) |
| **L** | `2197:8772` | `color/gray/200`=`#f1f2f3` | `radius/07`=16px | `spacing/04`=4px | `spacing/06`=8px | 48px | **L**-sized `_Item`(px 12 / py 8, `radius/06`, Body1/16 M) |
| **XL** | `2197:8773` | `color/gray/200`=`#f1f2f3` | `radius/07`=16px | `spacing/04`=4px | `spacing/06`=8px | 56px | **XL**-sized `_Item`(px 16 / py 12, `radius/06`, Subtitle/18 M) |

**핵심 발견**:
1. **컨테이너 높이 = 내부 `_Item` 표준 높이 + 컨테이너 padding×2**가 M/L/XL/S(구버전) 4곳 전부에서 정확히 성립합니다(예: M=34+4×2=42, L=40+4×2=48, XL=48+4×2=56, S구버전=26+2×2=30). `_Item` 단독 실측값([segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md) 2장)과 완전히 정합합니다.
2. **M의 컨테이너 radius(`radius/06`=12px)가 L/XL(`radius/07`=16px)보다 작습니다.** S(8px)→M(12px)→L·XL(16px)로, `_Item` 자체의 radius 계단(XS·S 공유→M 단독→L·XL 공유, [segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md) 2장)과는 다른 자체 계단을 가집니다.
3. **컨테이너 padding은 S(2px)만 다르고 M/L/XL은 전부 4px로 동일**합니다. gap도 S(6px)만 다르고 M/L/XL은 전부 8px로 동일합니다 — S만 한 단계 더 촘촘한 스케일을 씁니다.
4. **너비 390px는 고정값이 아닐 가능성이 높습니다 — 확인 필요.** Dropdown 문서에서 확인된 것과 같은 패턴(Figma 진열 프레임 표시값)으로 보이나, Segmented Control 자체에서 "화면 폭 가변"이 명시적으로 확인되지는 않았습니다(개별 노드 코드에 `w-[390px]`가 직접 박혀 있음). 실제 화면(다양한 컨테이너 폭)에서 어떻게 동작하는지는 이 조사 범위에서 확정할 수 없어 확인 필요로 남깁니다.

## 3. Count별 아이템 배치 규칙 (Size=M 기준 3/4/5 실측 + S신버전 3/4 실측)

| Count | 노드(Size=M) | 컨테이너 padding/gap/radius | 컨테이너 높이 | 세그먼트 폭 배치 방식 |
|---|---|---|---|---|
| 2 | `2197:8774` | 4px / 8px / 12px(동일) | 42px(동일) | `_Item` 2개, 각각 `flex-[1_0_0] min-w-px` |
| 3 | `2197:8767` | 4px / 8px / 12px(동일) | 42px(동일) | `_Item` 3개, 각각 `flex-[1_0_0] min-w-px` |
| 4 | `2197:8763` | 4px / 8px / 12px(동일) | 42px(동일) | `_Item` 4개, 각각 `flex-[1_0_0] min-w-px` |
| 5 | `2197:8769` | 4px / 8px / 12px(동일) | 42px(동일) | `_Item` 5개, 각각 `flex-[1_0_0] min-w-px` |

**핵심 발견**: Count가 늘어나도 **컨테이너의 padding·gap·radius·높이는 전혀 변하지 않습니다.** 유일한 변화는 `_Item` 자식 개수뿐이며, 각 `_Item`은 `flex-[1_0_0] min-w-px`(flex-grow:1, flex-basis:0, min-width:0)로 지정되어 **컨테이너 폭을 세그먼트 개수만큼 균등 분할**합니다. 즉 실제 개별 세그먼트 폭 = `(컨테이너폭 - 컨테이너 padding×2 - gap×(Count-1)) / Count`로 계산되는 완전한 flex 균등분할이며, Figma 노드에 찍힌 개별 폭 숫자는 390px 진열 프레임을 그 공식대로 나눈 결과일 뿐 별도로 지정된 고정폭이 아닙니다.

**S 신버전의 Count 축 일관성**: `2215:13508`(Count=3) · `2215:13512`(Count=4)도 Count=2(`2215:13505`)와 동일하게 컨테이너(padding 2px/gap 6px/radius 8px)와 내부 `_Item`(XS-sized, px 8/py 3/`radius/03`/Caption2·10 SB) 구성이 그대로 유지됨을 확인했습니다 — S 신버전이 "XS-sized `_Item`을 담은 컨트롤"이라는 성격이 Count 축과 무관하게 일관됩니다(4장 참고).

**미실측 조합**: S-구버전의 Count=3/4/5, L/XL의 Count=3/4/5(총 9개)는 위 규칙("Count 독립적, 세그먼트 개수만 변화")이 그대로 적용된다고 **추정(패턴 기반)**했습니다. 개별 실측은 하지 않았습니다.

## 4. Size=S 구/신버전 불일치 상세 (확인 필요)

작업 지시 단계의 가설은 "`_Item`의 실제 S 사이즈(26px)와 일치하는 신버전(`2215:135xx`)이 맞고, 구버전(`2197:87xx`, 30px)이 어긋난 레거시"였습니다. 실제로 두 버전을 각각 실측하고 내부 구성을 코드 레벨까지 뜯어본 결과, **단순히 "신버전이 맞다"고 정리할 수 없는 더 미묘한 차이**가 발견되었습니다.

| | S-구버전(`2197:87xx`) | S-신버전(`2215:135xx`) |
|---|---|---|
| **컨테이너 높이(실측)** | 30px | 26px |
| **컨테이너 padding/gap/radius** | 2px / 6px / 8px | 2px / 6px / 8px — **구/신 완전히 동일** |
| **내부 `_Item`의 실제 정체** | **`_Item` Size=S** 그대로(px 8 / py 4 / `radius/03` / Caption1/12 SemiBold) — [segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md) 2장 S행과 100% 일치 | **`_Item` Size=XS**(px 8 / py 3 / `radius/03` / Caption2/10 SemiBold) — 같은 문서 2장 **XS**행과 100% 일치, **S행과는 불일치**(padding-y 4→3px, 타이포 Caption1/12→Caption2/10) |
| **30px/26px가 나오는 계산식** | `_Item`(S) 높이 26px + 컨테이너 padding 2px×2 = 30px | `_Item`(XS) 높이 22px + 컨테이너 padding 2px×2 = 26px |

**핵심 재정정**: 작업 지시에서 가정했던 "신버전(26px)이 `_Item`의 실제 S 사이즈(26px)와 일치한다"는 진술은 **숫자(26px)만 우연히 일치할 뿐, 그 26px를 만드는 방식이 전혀 다릅니다.**

- 구버전은 "Segmented Control Size=S" 라벨에 맞게 **진짜 `_Item` Size=S**를 담고 있습니다. 다만 컨테이너 자체의 padding(2px×2=4px)이 더해지면서 최종 높이가 `_Item` S의 단독 높이(26px)보다 4px 더 큰 **30px**가 됩니다 — 이는 M/L/XL이 전부 "내부 `_Item` 표준 높이 + 컨테이너 padding×2" 공식을 따르는 것(2장 참고)과 정확히 같은 패턴이며, 오히려 **구버전 쪽이 M/L/XL과 일관된 합성 규칙을 따르고 있습니다.**
- 신버전은 "Segmented Control Size=S" 라벨을 달고 있지만, 실제로 담긴 것은 **`_Item` Size=XS**입니다(패딩 8/3, 타이포 Caption2/10 — S가 아니라 XS의 스펙과 정확히 일치). 그 결과 `_Item`(XS) 22px + 컨테이너 padding 4px = **26px**가 나오는데, 이 26px는 우연히 `_Item` S의 단독 실측값(26px)과 숫자가 같을 뿐, "S 아이템을 올바르게 담아서" 나온 값이 아닙니다.

**확인이 필요한 진짜 질문**:
1. **Segmented Control "Size=S"의 현재 유효한 스펙은 어느 쪽인가?** — (a) 구버전: 라벨과 내용물이 일치(진짜 S 아이템)하지만 M/L/XL 대비 "패턴은 일관되되 숫자가 `_Item` 문서의 S 단독값과 다른(30≠26)" 버전, 또는 (b) 신버전: 최종 높이 숫자는 `_Item` S와 우연히 같지만(26px) 실제로는 **XS 아이템이 잘못 담긴** 버전.
2. 신버전이 의도된 최신 스펙이라면, **"Segmented Control Size=S"가 실제로는 `_Item` Size=XS를 쓰도록 재정의된 것인지**, 아니면 컴포넌트 교체 작업 중 실수로 XS 인스턴스가 S 슬롯에 들어간 것인지 Figma 파일만으로는 판단할 수 없습니다.
3. 만약 신버전이 맞다면, Segmented Control에는 `_Item`의 XS 사이즈를 "S"라는 이름으로 노출하는 셈이 되어, **Segmented Control 자체에 별도의 "XS" Size는 존재하지 않는다는 관찰(1장)과 합쳐 볼 때 "`_Item`의 XS 사이즈가 Segmented Control 레벨에서는 `S`라는 이름으로만 쓰인다"는 의도적 설계일 수도 있습니다** — 그러나 이 역시 Figma 레이어명·문서만으로는 확정할 수 없습니다.

이 문서는 위 어느 쪽도 "정답"으로 단정하지 않고, **관찰된 사실**(구버전=S 아이템+비표준 합성 4px 초과, 신버전=XS 아이템+"S"라는 이름)만을 기록합니다. 신규 구현 시에는 이 페이지를 디자이너와 함께 검토해 Figma에서 어느 노드를 삭제/유지할지 결정하는 것을 권장합니다.

**추가 관찰 사실**: `_Item`에는 XS 사이즈가 별도로 존재하지만([segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md) 참고), Segmented Control 조합에는 "Size=XS"라는 이름의 Count 조합 자체가 없습니다(1장). 즉 XS `_Item`은 오직 이 "S(신버전)" 노드들을 통해서만 Segmented Control에 등장합니다.

## 5. `_Item` 서브컴포넌트 재사용 관계

- Segmented Control은 [`components/global/segmented-control-item/segmented-control-item.md`](../global/segmented-control-item/segmented-control-item.md)의 `_Item`을 그대로 인스턴스로 조합해서 만들어집니다.
- **M/L/XL/S(구버전)**: 각 Size 라벨과 정확히 일치하는 `_Item` Size를 사용합니다(M→M, L→L, XL→XL, S구버전→S). padding·radius·타이포 전부 `_Item` 문서의 해당 Size 행과 100% 일치합니다.
- **S(신버전)**: 라벨은 "S"이지만 실제로는 `_Item` **Size=XS**를 사용합니다(4장 참고). 이는 이 저장소에서 처음 확인된 "라벨과 실제 서브컴포넌트 크기가 어긋나는" 사례입니다.
- Segmented Control 안에서 각 `_Item`은 항상 Selected 축만 조합에 노출됩니다(첫 번째 세그먼트=Selected True, 나머지=False인 조합이 실측 샘플 전부에서 관찰됨) — 실제로는 어느 세그먼트든 선택될 수 있어야 하므로, 이는 Figma 진열용 기본값일 뿐 규칙은 아닙니다.

## 6. 모션 스펙

**모션 데이터 없음.**

`get_motion_context`를 최상위 프레임(`2197:8777`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. **Selected 세그먼트가 바뀔 때 흰 배경 pill이 슬라이딩(밀려서 이동)하는 애니메이션이 있는지 특히 주의 깊게 확인했으나, Figma 파일에는 그런 트랜지션이 정의되어 있지 않습니다.** `_Item` 자체의 모션 조사([segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md) 4장)와 마찬가지로 빈 결과이며, 이는 곧 **Selected 전환이 Figma 스펙상 즉시(instant) 전환**이라는 뜻입니다. 실제 프로덕트에서 슬라이딩 인디케이터를 구현하고 싶다면 이는 Figma 디자인에 없는 별도의 구현 판단(모션 시스템 자체 결정)이 필요합니다.

## 7. 접근성

- 컨테이너는 `role="tablist"`, 각 세그먼트(`_Item`)는 `role="tab"` `aria-selected={Selected}`로 마크업하는 것이 웹 접근성 표준(WAI-ARIA Tabs 패턴과 유사한 구조)에 부합해 보이나, Figma 파일에 이 규정은 없습니다 — 확인 필요.
- 키보드 네비게이션(좌/우 화살표로 세그먼트 간 포커스 이동, Home/End로 처음/끝 이동 등)은 WAI-ARIA Tabs 패턴의 일반적 관례이나 Figma로는 확인 불가 — 확인 필요.
- Selected 상태가 배경 pill + 텍스트 명도 차이로만 표현되므로([segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md) 3장), 저시력 사용자를 위해 `aria-selected` 등 프로그램적 상태 전달이 시각 스타일과 별개로 반드시 필요합니다.
- Disabled 전체/개별 세그먼트 비활성화 상태가 Figma 컴포넌트에 정의되어 있지 않습니다 — Dropdown과 달리 Segmented Control에는 Disabled 축 자체가 없는 것으로 보이며, 이는 확인된 관찰 사실입니다(20개 인스턴스 전체가 Size×Count 2축뿐).

## 8. 토큰 매칭 요약

**정확히 일치**
- 배경 `color/gray/200`(#f1f2f3) → 저장소 `tokens/colors.json` `reference.gray.200`(#F1F2F3)과 일치
- Radius: `radius/04`(8px) → `ref-radius-04`, `radius/06`(12px) → `ref-radius-06`, `radius/07`(16px) → `ref-radius-07`
- Spacing(padding/gap): `spacing/02,04,05,06` 전부 `ref-spacing-02~06`과 일치
- 내부 `_Item`의 padding·radius·타이포는 [segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md)와 정확히 일치(S-구버전/M/L/XL). S-신버전은 `_Item` **XS** 행과 정확히 일치(S 행과는 불일치, 4장)

**기존 토큰에 없음**
- Size(S/M/L/XL)별 "이 padding+gap+radius 조합을 쓴다"는 컨테이너 레벨 시맨틱 토큰은 저장소에 없음(개별 값은 토큰과 일치)
- 컨테이너 높이 = `_Item` 표준 높이 + 컨테이너 padding×2라는 합성 규칙 자체를 지정하는 토큰/문서 없음

**확인 필요**
- Size=S 구/신버전 중 현재 유효한 스펙(4장, 이 저장소의 가장 중요한 미해결 항목)
- 컨테이너 너비 390px가 Dropdown처럼 화면 폭 가변인지, Segmented Control 자체에서는 확인되지 않음
- `role="tablist"`/`role="tab"`/`aria-selected`/키보드 네비게이션 등 접근성 마크업 연결 규정
- 개별 세그먼트 Disabled 상태의 존재 여부(현재 Figma에는 없음)

## 9. 샘플링에 사용한 10개 노드 (부록)

| 목적 | 노드 |
|---|---|
| Size 축(Count=2 고정) | S-구버전 `2197:8776` · S-신버전 `2215:13505` · M `2197:8774` · L `2197:8772` · XL `2197:8773` |
| Count 축(Size=M 고정) | Count=3 `2197:8767` · Count=4 `2197:8763` · Count=5 `2197:8769` |
| S-신버전 Count 축 일관성 확인 | Count=3 `2215:13508` · Count=4 `2215:13512` |

**미실측(추정, 패턴 기반)**: S-구버전 Count=3(`2197:8771`) · Count=4(`2197:8775`) · Count=5(`2197:8761`), L Count=3(`2197:8770`) · Count=4(`2197:8764`) · Count=5(`2197:8768`), XL Count=3(`2197:8766`) · Count=4(`2197:8762`) · Count=5(`2197:8765`) — 총 9개. M의 Count 축 실측 결과(3장)에 따라 컨테이너 스펙은 Count 무관하게 동일할 것으로 추정하나 개별 실측하지 않았습니다.

전체 20개 인스턴스의 레이어명·크기는 작업 지시 단계에서 `get_metadata`로 사전 확보되어 있었습니다. `get_variable_defs`는 M(`2197:8774`)과 S-신버전(`2215:13505`) 노드에서 각각 호출했고, `get_motion_context`는 최상위 프레임(`2197:8777`, recursive=true)에 1회 호출해 빈 결과를 확인했습니다.
