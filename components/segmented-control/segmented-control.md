# Segmented Control

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2197-8777) — Frame `Segmented Control` (node `2197:8777`)
> 기계 판독용 값은 [`segmented-control.json`](./segmented-control.json)을 함께 참고합니다. 이 문서와 segmented-control.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Segmented Control은 **Size(XS/S/M/L/XL) × Count(2/3/4/5, 세그먼트 개수) 2개 축, 20개 인스턴스**로 구성됩니다. Dropdown(288개)만큼 크지 않으므로 전략적 샘플링으로 충분합니다.

- `get_metadata`로 20개 인스턴스 전체의 레이어명·크기를 확보해 축 구조를 파악했습니다.
- 그 결과를 바탕으로 **총 10개 노드**를 `get_design_context`로 개별 실측했습니다:
  1. **Size 5종 비교**(Count=2 고정): XS(`2215:13505`) · S(`2197:8776`) · M(`2197:8774`) · L(`2197:8772`) · XL(`2197:8773`) — 5개
  2. **Count 축 확인**(Size=M 고정): Count=3(`2197:8767`) · Count=4(`2197:8763`) · Count=5(`2197:8769`) — 3개 추가
  3. **XS의 Count 축 일관성 확인**: Count=3(`2215:13508`) · Count=4(`2215:13512`) — 2개 추가
- `get_variable_defs`는 대표 노드 2개(M/`2197:8774`, XS/`2215:13505`)에서 호출했습니다.
- `get_motion_context`는 최상위 프레임(`2197:8777`, recursive=true)에 1회 호출했습니다.
- **나머지 10개(미실측)**: XS의 Count=5(`2215:13517`), S의 Count=3/4/5(`2197:8771`/`8775`/`8761`), L/XL의 Count=3/4/5(6개)는 M의 Count 축 실측 결과("Count가 늘어도 컨테이너 padding·gap·radius·높이는 불변, 세그먼트 개수만 바뀜")가 그대로 적용된다고 **추정(패턴 기반)** 했습니다. 개별 실측하지 않은 조합에 새 토큰명을 만들지는 않았습니다 — 9장 부록에 실측/미실측 노드를 구분해 표기합니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 0-1. 이전 조사에서 발견했던 이슈와 해결 경위

이 문서의 첫 조사(2026-08-27 오전)에서는 Size=S에 두 벌의 노드(`2197:87xx`, 30px / `2215:135xx`, 26px)가 존재했고, 실측 결과 `2215:135xx` 쪽은 Figma 레이어 라벨이 "S"인데 실제 내부에 담긴 것은 [`_Item`](../global/segmented-control-item/segmented-control-item.md) **Size=XS**여서(padding-y 4→3px, 타이포 Caption1/12→Caption2/10) 26px라는 최종 높이 숫자가 `_Item` S 단독 실측값과 우연히 일치할 뿐이라는 점을 "확인 필요"로 남겼습니다.

**해결됨**: 사용자가 Figma에서 해당 계열(`2215:135xx`)의 variant 속성값을 "S"에서 "XS"로 정정했습니다(Edit variant property 패널에서 Size 값이 XS/S/M/L/XL 5개로 확인됨). 노드의 실제 레이아웃·크기·내부 `_Item` 구성 자체는 변경되지 않았고, **라벨만 실제 내용물과 일치하도록 수정**되었습니다. `get_metadata`로 재조회해 `2215:13505`/`13508`/`13512`/`13517`이 전부 `Size=XS`로 표시됨을 확인했고, `get_design_context`로 컴포넌트 prop 타입이 `size?: "S"` → `size?: "XS"`로 바뀐 것도 코드 레벨에서 재확인했습니다.

결과적으로 이제 **Size 축이 XS/S/M/L/XL 5종 × Count 4종 = 20개로 완전히 orthogonal**하며, 5개 Size 전부가 [`_Item`](../global/segmented-control-item/segmented-control-item.md)의 동일한 이름의 Size 행과 라벨-내용 모두 정확히 일치합니다. 아래 1~9장은 이 수정된 상태를 기준으로 작성되었습니다.

## 1. 컴포넌트 개요

Segmented Control은 여러 개의 [`_Item`](../global/segmented-control-item/segmented-control-item.md)(세그먼트/탭)을 가로로 배열한 조합형 선택 컨트롤입니다. 회색 트랙(container) 위에 세그먼트들이 나란히 놓이고, 선택된 세그먼트만 흰 배경 pill + 그림자로 부상해 보입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | XS / S / M / L / XL | 컨트롤 전체의 크기 단계(컨테이너 padding·radius·gap 및 내부 `_Item`의 크기 스케일). `_Item`의 5단 Size 스케일과 1:1로 정확히 대응 |
| **Count** | 2 / 3 / 4 / 5 | 세그먼트(탭) 개수. 세그먼트가 늘어나도 컨테이너 자체의 padding/gap/radius/높이는 불변, 각 `_Item`이 폭만 나눠 가짐(3장) |

## 2. 컨테이너 스펙 (Count=2 기준, Size별 전체 실측)

| Size | 노드 | 배경 | radius | 컨테이너 padding | 세그먼트 간 gap | 컨테이너 전체 높이(실측) | 내부 `_Item` 크기 |
|---|---|---|---|---|---|---|---|
| **XS** | `2215:13505` | `color/gray/200`=`#f1f2f3` | `radius/04`=8px | `spacing/02`=2px | `spacing/05`=6px | 26px | **XS**-sized `_Item`(px 8 / py 3, `radius/03`, Caption2/10 SB) |
| **S** | `2197:8776` | `color/gray/200`=`#f1f2f3` | `radius/04`=8px | `spacing/02`=2px | `spacing/05`=6px | 30px | **S**-sized `_Item`(px 8 / py 4, `radius/03`, Caption1/12 SB) |
| **M** | `2197:8774` | `color/gray/200`=`#f1f2f3` | `radius/06`=12px | `spacing/04`=4px | `spacing/06`=8px | 42px | **M**-sized `_Item`(px 10 / py 6, `radius/04`, Body2/14 M) |
| **L** | `2197:8772` | `color/gray/200`=`#f1f2f3` | `radius/07`=16px | `spacing/04`=4px | `spacing/06`=8px | 48px | **L**-sized `_Item`(px 12 / py 8, `radius/06`, Body1/16 M) |
| **XL** | `2197:8773` | `color/gray/200`=`#f1f2f3` | `radius/07`=16px | `spacing/04`=4px | `spacing/06`=8px | 56px | **XL**-sized `_Item`(px 16 / py 12, `radius/06`, Subtitle/18 M) |

**핵심 발견**:
1. **컨테이너 높이 = 내부 `_Item` 표준 높이 + 컨테이너 padding×2**가 5개 Size 전부에서 정확히 성립합니다(예: XS=22+2×2=26, S=26+2×2=30, M=34+4×2=42, L=40+4×2=48, XL=48+4×2=56). [`_Item`](../global/segmented-control-item/segmented-control-item.md) 단독 실측값과 완전히 정합합니다.
2. **컨테이너 radius는 3단 계단**: XS·S 공유 `radius/04`(8px) → M 단독 `radius/06`(12px) → L·XL 공유 `radius/07`(16px). `_Item` 자체의 radius 계단(XS·S 공유 `radius/03` → M 단독 `radius/04` → L·XL 공유 `radius/06`, [_Item 문서](../global/segmented-control-item/segmented-control-item.md) 2장)과 실제 값은 다르지만, **그룹핑 패턴(XS+S 묶음 / M 단독 / L+XL 묶음)은 동일**합니다.
3. **컨테이너 padding·gap도 같은 그룹핑**: XS·S만 2px/6px, M/L/XL은 전부 4px/8px로 동일합니다.
4. **너비 390px는 고정값이 아닐 가능성이 높습니다 — 확인 필요.** Dropdown 문서에서 확인된 것과 같은 패턴(Figma 진열 프레임 표시값)으로 보이나, Segmented Control 자체에서 "화면 폭 가변"이 명시적으로 확인되지는 않았습니다(개별 노드 코드에 `w-[390px]`가 직접 박혀 있음). 실제 화면(다양한 컨테이너 폭)에서 어떻게 동작하는지는 이 조사 범위에서 확정할 수 없어 확인 필요로 남깁니다.

## 3. Count별 아이템 배치 규칙 (Size=M 기준 2/3/4/5 실측 + XS 2/3/4 실측)

| Count | 노드(Size=M) | 컨테이너 padding/gap/radius | 컨테이너 높이 | 세그먼트 폭 배치 방식 |
|---|---|---|---|---|
| 2 | `2197:8774` | 4px / 8px / 12px(동일) | 42px(동일) | `_Item` 2개, 각각 `flex-[1_0_0] min-w-px` |
| 3 | `2197:8767` | 4px / 8px / 12px(동일) | 42px(동일) | `_Item` 3개, 각각 `flex-[1_0_0] min-w-px` |
| 4 | `2197:8763` | 4px / 8px / 12px(동일) | 42px(동일) | `_Item` 4개, 각각 `flex-[1_0_0] min-w-px` |
| 5 | `2197:8769` | 4px / 8px / 12px(동일) | 42px(동일) | `_Item` 5개, 각각 `flex-[1_0_0] min-w-px` |

**핵심 발견**: Count가 늘어나도 **컨테이너의 padding·gap·radius·높이는 전혀 변하지 않습니다.** 유일한 변화는 `_Item` 자식 개수뿐이며, 각 `_Item`은 `flex-[1_0_0] min-w-px`(flex-grow:1, flex-basis:0, min-width:0)로 지정되어 **컨테이너 폭을 세그먼트 개수만큼 균등 분할**합니다. 즉 실제 개별 세그먼트 폭 = `(컨테이너폭 - 컨테이너 padding×2 - gap×(Count-1)) / Count`로 계산되는 완전한 flex 균등분할이며, Figma 노드에 찍힌 개별 폭 숫자는 390px 진열 프레임을 그 공식대로 나눈 결과일 뿐 별도로 지정된 고정폭이 아닙니다.

**XS의 Count 축 일관성**: `2215:13508`(Count=3) · `2215:13512`(Count=4)도 Count=2(`2215:13505`)와 동일하게 컨테이너(padding 2px/gap 6px/radius 8px)와 내부 `_Item`(XS-sized, px 8/py 3/`radius/03`/Caption2·10 SB) 구성이 그대로 유지됨을 확인했습니다.

**미실측 조합**: XS의 Count=5, S의 Count=3/4/5, L/XL의 Count=3/4/5(총 10개)는 위 규칙("Count 독립적, 세그먼트 개수만 변화")이 그대로 적용된다고 **추정(패턴 기반)**했습니다. 개별 실측은 하지 않았습니다.

## 4. `_Item` 서브컴포넌트 재사용 관계

- Segmented Control은 [`components/global/segmented-control-item/segmented-control-item.md`](../global/segmented-control-item/segmented-control-item.md)의 `_Item`을 그대로 인스턴스로 조합해서 만들어집니다.
- **XS/S/M/L/XL 전부**: 각 Size 라벨과 정확히 일치하는 `_Item` Size를 사용합니다(라벨-내용 일치가 재라벨링 후 5개 Size 전부에서 확인됨). padding·radius·타이포 전부 `_Item` 문서의 해당 Size 행과 100% 일치합니다.
- Segmented Control 안에서 각 `_Item`은 항상 Selected 축만 조합에 노출됩니다(첫 번째 세그먼트=Selected True, 나머지=False인 조합이 실측 샘플 전부에서 관찰됨) — 실제로는 어느 세그먼트든 선택될 수 있어야 하므로, 이는 Figma 진열용 기본값일 뿐 규칙은 아닙니다.

## 5. 모션 스펙

**모션 데이터 없음.**

`get_motion_context`를 최상위 프레임(`2197:8777`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. **Selected 세그먼트가 바뀔 때 흰 배경 pill이 슬라이딩(밀려서 이동)하는 애니메이션이 있는지 특히 주의 깊게 확인했으나, Figma 파일에는 그런 트랜지션이 정의되어 있지 않습니다.** `_Item` 자체의 모션 조사([segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md) 4장)와 마찬가지로 빈 결과이며, 이는 곧 **Selected 전환이 Figma 스펙상 즉시(instant) 전환**이라는 뜻입니다. 실제 프로덕트에서 슬라이딩 인디케이터를 구현하고 싶다면 이는 Figma 디자인에 없는 별도의 구현 판단(모션 시스템 자체 결정)이 필요합니다.

## 6. 접근성

- 컨테이너는 `role="tablist"`, 각 세그먼트(`_Item`)는 `role="tab"` `aria-selected={Selected}`로 마크업하는 것이 웹 접근성 표준(WAI-ARIA Tabs 패턴과 유사한 구조)에 부합해 보이나, Figma 파일에 이 규정은 없습니다 — 확인 필요.
- 키보드 네비게이션(좌/우 화살표로 세그먼트 간 포커스 이동, Home/End로 처음/끝 이동 등)은 WAI-ARIA Tabs 패턴의 일반적 관례이나 Figma로는 확인 불가 — 확인 필요.
- Selected 상태가 배경 pill + 텍스트 명도 차이로만 표현되므로([segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md) 3장), 저시력 사용자를 위해 `aria-selected` 등 프로그램적 상태 전달이 시각 스타일과 별개로 반드시 필요합니다.
- Disabled 전체/개별 세그먼트 비활성화 상태가 Figma 컴포넌트에 정의되어 있지 않습니다 — Dropdown과 달리 Segmented Control에는 Disabled 축 자체가 없는 것으로 보이며, 이는 확인된 관찰 사실입니다(20개 인스턴스 전체가 Size×Count 2축뿐).

## 7. 토큰 매칭 요약

**정확히 일치**
- 배경 `color/gray/200`(#f1f2f3) → 저장소 `tokens/colors.json` `reference.gray.200`(#F1F2F3)과 일치
- Radius: `radius/04`(8px) → `ref-radius-04`, `radius/06`(12px) → `ref-radius-06`, `radius/07`(16px) → `ref-radius-07`
- Spacing(padding/gap): `spacing/02,04,05,06` 전부 `ref-spacing-02~06`과 일치
- 내부 `_Item`의 padding·radius·타이포는 [segmented-control-item.md](../global/segmented-control-item/segmented-control-item.md)의 XS/S/M/L/XL 각 행과 **정확히 1:1 일치**(재라벨링 후 5개 Size 전부 라벨-내용 일치 확인됨)

**기존 토큰에 없음**
- Size(XS/S/M/L/XL)별 "이 padding+gap+radius 조합을 쓴다"는 컨테이너 레벨 시맨틱 토큰은 저장소에 없음(개별 값은 토큰과 일치)
- 컨테이너 높이 = `_Item` 표준 높이 + 컨테이너 padding×2라는 합성 규칙 자체를 지정하는 토큰/문서 없음

**확인 필요**
- 컨테이너 너비 390px가 Dropdown처럼 화면 폭 가변인지, Segmented Control 자체에서는 확인되지 않음
- `role="tablist"`/`role="tab"`/`aria-selected`/키보드 네비게이션 등 접근성 마크업 연결 규정
- 개별 세그먼트 Disabled 상태의 존재 여부(현재 Figma에는 없음)

## 8. 샘플링에 사용한 10개 노드 (부록)

| 목적 | 노드 |
|---|---|
| Size 축(Count=2 고정) | XS `2215:13505` · S `2197:8776` · M `2197:8774` · L `2197:8772` · XL `2197:8773` |
| Count 축(Size=M 고정) | Count=3 `2197:8767` · Count=4 `2197:8763` · Count=5 `2197:8769` |
| XS Count 축 일관성 확인 | Count=3 `2215:13508` · Count=4 `2215:13512` |

**미실측(추정, 패턴 기반)**: XS Count=5(`2215:13517`), S Count=3(`2197:8771`) · Count=4(`2197:8775`) · Count=5(`2197:8761`), L Count=3(`2197:8770`) · Count=4(`2197:8764`) · Count=5(`2197:8768`), XL Count=3(`2197:8766`) · Count=4(`2197:8762`) · Count=5(`2197:8765`) — 총 10개. M의 Count 축 실측 결과(3장)에 따라 컨테이너 스펙은 Count 무관하게 동일할 것으로 추정하나 개별 실측하지 않았습니다.

전체 20개 인스턴스의 레이어명·크기는 `get_metadata`로 확보되어 있습니다(Size=S였던 일부 노드가 Size=XS로 재라벨링된 이후 재조회로 재확인함, 0-1장 참고). `get_variable_defs`는 M(`2197:8774`)과 XS(`2215:13505`) 노드에서 각각 호출했고, `get_motion_context`는 최상위 프레임(`2197:8777`, recursive=true)에 1회 호출해 빈 결과를 확인했습니다.
