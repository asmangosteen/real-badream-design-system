# Tab

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2262-2251) — Frame `Tab` (node `2262:2251`)
> 기계 판독용 값은 [`tab.json`](./tab.json)을 함께 참고합니다. 이 문서와 tab.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Tab은 **Size(S/L) × Type(Hug/Fill) × Tailing Icon(True/False) × Side Padding(True/False) 4개 축, 10-인스턴스 컴포넌트**입니다. 10개뿐이므로 **전수 실측**했습니다 — `get_design_context`를 10개 노드 전부에 개별 호출했습니다.

- `get_metadata`로 10개 인스턴스 전체의 레이어명·크기를 사전 확보해 축 구조를 파악했습니다.
- `get_variable_defs`는 대표 노드 2개(S,Hug,TailingIcon=True,SidePadding=False `2262:2250` / S,Fill `2262:2247`)에서 호출했습니다.
- `get_motion_context`는 최상위 프레임(`2262:2251`, recursive=true)에 1회 호출했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Tab은 여러 개의 [`_Item`(Tab Item)](../global/tab-item/tab-item.md)을 가로로 배열한 탭 바(tab bar) 컨테이너입니다. Segmented Control과 달리 배경 트랙이나 pill이 없고, 하단에 옅은 회색 구분선(전체 폭) 위에 탭들이 나열되며 활성 탭만 자신의 밑줄 인디케이터로 표시됩니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / L | 탭 바 전체의 크기 단계(내부 `_Item`의 세로 padding·타이포 스케일과 1:1 대응) |
| **Type** | Hug / Fill | 탭들의 너비 배치 방식. Hug=탭마다 콘텐츠 너비만큼만 차지(가로 스크롤 가능한 목록), Fill=탭 5개가 컨테이너 폭을 균등 분할 |
| **Tailing Icon** | True / False | 탭 목록 오른쪽에 "+"(탭 추가) 아이콘 버튼 표시 여부. **Type=Fill에는 이 축이 없음**(항상 False로만 존재) |
| **Side Padding** | True / False | 탭 바 좌우에 여백을 둘지 여부. **Type=Fill에는 이 축이 없음**(항상 False로만 존재) |

**핵심 관찰(축 비직교성)**: 10개 인스턴스는 Size(2) × [Type=Hug의 TailingIcon×SidePadding 2×2=4가지 + Type=Fill의 1가지] = 2×5=10개입니다. Type=Fill은 Size별로 **정확히 1개**(Tailing Icon=False, Side Padding=False 조합)만 존재하고, Type=Hug만 Tailing Icon×Side Padding 2×2=4개 전부 존재합니다.

Fill이 다른 토글 조합과 결합되지 않는 이유는 Figma에 별도로 주석되어 있지 않아 단정할 수 없으나, 5장에서 확인하듯 **Fill은 구조 자체가 Hug와 달라 Trailing 아이콘 슬롯이 없고**, 컨테이너 폭을 이미 꽉 채우므로 Side Padding 개념이 무의미할 가능성이 있습니다 — 이는 추정이며 확인 필요로 남깁니다.

**Count(탭 개수) 축이 없음**: Segmented Control은 Count(2~5) 축이 명시적 변형으로 존재했지만, Tab에는 그런 축이 Figma 컴포넌트 속성(variant property)으로 노출되어 있지 않습니다. 대신 `get_design_context`로 실제 코드를 확인한 결과, Type=Hug는 `showTab1~showTab8`이라는 **불리언 prop 8개**로 탭 개수를 토글하고, Type=Fill은 `showTab1~showTab5` **5개**로 고정되어 있습니다 — 4장에서 상세히 다룹니다.

## 2. Size별 컨테이너 스펙 (Type=Hug, Tailing Icon=False, Side Padding=False 기준)

| Size | 노드 | 탭 바 높이(실측) | 내부 `_Item` padding | 아이템 간 gap(Side Padding=False) | 하단 구분선 |
|---|---|---|---|---|---|
| **S** | `2262:2248` | 42px | `_Item` S(`spacing/07`=10px 세로) | `spacing/12`=24px | 높이 `borderwidth/02`=1px, 색상 `neutral/100`=`#f6f7f7`, 전체 폭 |
| **L** | `2262:2564` | 48px | `_Item` L(`spacing/08`=12px 세로) | `spacing/12`=24px | 높이 `borderwidth/02`=1px, 색상 `neutral/100`=`#f6f7f7`, 전체 폭 |

**핵심 발견**:
1. **탭 바 높이는 내부 `_Item` 높이와 정확히 같습니다**(S=42px, L=48px) — Segmented Control처럼 컨테이너 자체 padding이 추가되지 않고, `_Item`의 높이가 그대로 탭 바 높이가 됩니다.
2. **컨테이너 좌우 padding은 Size와 무관하게 0px(Side Padding=False 기준)** — Segmented Control 컨테이너가 항상 padding을 가졌던 것과 다른 지점입니다.
3. **아이템 간 gap은 Side Padding=False일 때 두 Size 모두 `spacing/12`=24px로 동일**합니다(3장에서 Side Padding=True일 때 20px로 바뀌는 것과 대비).
4. **하단 구분선(전체 폭, `neutral/100`)의 정확한 세로 위치가 인스턴스마다 미세하게 다르게 기록되어 있습니다**(예: S는 `inset-[97.62%_0_0_0]`, L 인스턴스별로 `97.62%~97.77%`, 하단 오프셋도 `0`/`0.15%`/`0.3%`로 편차). 이는 percentage 기반 절대 위치 지정에서 발생하는 반올림 편차로 보이며, 실제 렌더링 높이(1px, `borderwidth/02`)는 전 인스턴스 동일합니다 — 의미 있는 디자인 차이가 아닌 것으로 판단되나 확인 필요로 남깁니다.
5. **너비 390px는 고정값이 아닐 가능성이 높습니다 — 확인 필요.** Segmented Control과 동일한 패턴(Figma 진열 프레임 표시값)으로 보이나, Tab 자체에서 "화면 폭 가변"이 명시적으로 확인되지는 않았습니다.

## 3. Type=Hug/Fill 차이

| 요소 | Type=Hug | Type=Fill |
|---|---|---|
| **탭 구현 방식** | [`_Item`(Tab Item)](../global/tab-item/tab-item.md) 컴포넌트 인스턴스를 그대로 사용(`<Item active={...} label={...} />` 형태로 props 주입) | `_Item`을 컴포넌트 인스턴스로 호출하지 않고, `_Item`의 내부 구조(Container/텍스트/밑줄)를 그대로 복제한 "Tab 1"~"Tab 5"라는 개별 named div로 인라인 구성 |
| **탭 너비** | 콘텐츠(레이블 텍스트) 크기만큼(hug), `min-w-[32px]` | `flex-[1_0_0]`으로 컨테이너 폭을 탭 개수만큼 균등 분할(균등 fill) |
| **탭 간 gap** | `spacing/12`=24px(Side Padding=False) 또는 `spacing/11`=20px(Side Padding=True) | **없음**(gap 클래스 자체가 없음, 탭이 서로 맞닿음) |
| **Trailing "+" 아이콘 슬롯** | Tailing Icon=True일 때 존재 | **존재하지 않음**(Fill 인스턴스에는 Trailing 블록 자체가 없음) |
| **오버플로우 마스크(스크롤 페이드)** | 있음(4장 참고) | 없음(Fill은 5개로 고정, 넘칠 수 없음) |
| **하단 구분선(전체 폭)** | 있음 | 있음(동일) |

**핵심 발견**: Type=Fill은 단순히 `_Item`에 `flex-[1_0_0]`을 씌운 것이 아니라, **탭 목록 구조 자체가 Hug와 근본적으로 다릅니다.** Hug는 `_Item` 컴포넌트를 재사용 인스턴스로 호출하는 반면, Fill은 `_Item`의 서브레이어(Container/텍스트/밑줄 노드 id를 instance-swap으로 참조)를 개별 "Tab N" 컨테이너 안에 펼쳐놓은 형태입니다. 시각적 상태(Active=On/Off에 따른 밑줄·텍스트 색상)는 `_Item`과 동일한 규칙을 따르지만, Trailing 아이콘 버튼과 탭 간 gap이 전혀 없다는 점에서 Hug와 명확히 구분되는 별도 레이아웃입니다.

## 4. Tailing Icon / Side Padding 토글 효과 (Type=Hug 전용, 4개 노드 실측: S/L × 조합)

| Size | Tailing Icon | Side Padding | 노드 | 컨테이너 좌우 padding | 아이템 간 gap | Trailing 슬롯 |
|---|---|---|---|---|---|---|
| S | True | False | `2262:2250` | 0 | `spacing/12`=24px | 42×42px, `+`아이콘 20px |
| S | False | False | `2262:2248` | 0 | `spacing/12`=24px | 없음 |
| S | True | True | `2262:2246` | 좌 `spacing/11`=20px / 우 **하드코딩 12px**(변수 미바인딩) | `spacing/11`=20px | 42×42px, `+`아이콘 20px |
| S | False | True | `2262:2249` | 좌우 `spacing/11`=20px(대칭) | `spacing/11`=20px | 없음 |
| L | True | False | `2262:2801` | 0 | `spacing/12`=24px | 48×48px, `+`아이콘 24px |
| L | False | False | `2262:2564` | 0 | `spacing/12`=24px | 없음 |
| L | True | True | `2262:2948` | 좌 `spacing/11`=20px / 우 **하드코딩 12px**(변수 미바인딩) | `spacing/12`=24px | 48×48px, `+`아이콘 24px |
| L | False | True | `2262:2929` | 좌우 `spacing/11`=20px(대칭) | `spacing/12`=24px | 없음 |

**핵심 발견**:
1. **Tailing Icon=True는 오른쪽에 정사각형 아이콘 버튼 슬롯(탭 바 높이와 동일한 42px/48px 정사각형)을 추가합니다.** 내부에 `spacing/06`=8px padding과 `radius/06`=12px radius를 가진 "Icon Button" 컨테이너가 있고, 그 안에 "plus"(+) 아이콘(S=20px, L=24px)이 들어갑니다. 탭 개수를 늘리는 액션으로 추정됩니다.
2. **Side Padding=True는 컨테이너 좌우에 여백을 추가하지만, Tailing Icon 유무에 따라 비대칭적으로 구현되어 있습니다.** Tailing Icon=False일 때는 좌우 대칭 `spacing/11`=20px(`px-[20px]`)이지만, Tailing Icon=True일 때는 왼쪽만 `spacing/11`=20px 변수를 쓰고 오른쪽은 **`12px`이 변수 바인딩 없이 하드코딩**되어 있습니다(`pr-[12px]`, `var(--spacing/...)` 형태가 아님). 우연히 `spacing/08`(12px)과 값이 같지만 토큰으로 연결되어 있지 않습니다 — 확인 필요.
3. **아이템 간 gap이 Side Padding에 따라 바뀝니다**: Side Padding=False → `spacing/12`=24px, Side Padding=True(Size=S만) → `spacing/11`=20px로 축소됩니다. 다만 **Size=L에서는 Side Padding=True여도 gap이 24px(`spacing/12`) 그대로 유지**되어 S와 다른 패턴을 보입니다 — Size와 Side Padding의 상호작용에 예외가 있다는 관찰이며, 의도적 설계인지 인스턴스별 편차인지는 확인 필요입니다.
4. **오버플로우 마스크**: Tabs 행에는 항상 SVG 마스크 이미지가 씌워져 있고(`mask-image`, `mask-size`가 가용 폭에 맞춰 정확히 계산됨: 예 S/TailingIcon=True/SidePadding=False는 336×42px, S/TailingIcon=False/SidePadding=False는 390×42px), 이는 탭 목록이 가로로 넘칠 때 경계 근처에서 점점 옅어지는 페이드 효과를 만듭니다. 실제 스크린샷에서도 마지막 탭 1~2개가 옅게 흐려진 채 잘리는 모습이 확인됩니다(9장 스크린샷 요약 참고). 이는 **탭 목록이 가로 스크롤 가능하다는 시각적 힌트**로 해석되나, 실제 스크롤 인터랙션(overflow-x: auto 등)이 Figma 스펙에 명시되어 있지는 않습니다 — 확인 필요.

   **이 마스크는 별도 Figma 컴포넌트로 실측 완료됨**: 같은 페이지의 `Alpha Gradient Mask`(node `2262:1908`, 336×42px)가 정확히 이 오버플로우 마스크의 원본 애셋입니다. 구조는 좌측 `Front Gradient`(고정 42px) + 가운데 `Rectangle`(완전 불투명, 가변폭) + 우측 `Back Gradient`(고정 42px)이며, 각 gradient는 선형이 아니라 **7개 정지점(0/15/30/50/70/85/100%)에 alpha 0/0.08/0.22/0.42/0.64/0.82/1.00을 배치한 이징(ease) 곡선**입니다(가장자리 근처는 느리게, 중간에서 빠르게 변화). 실제 CSS로 옮길 때는 이 정지점을 `px`/`calc(100% - Npx)`로 고정해 페이드 폭이 컨테이너 폭과 무관하게 항상 42px가 되도록 해야 하며, Figma가 내보내는 `rgba(0,0,0,α)`(검정+알파)를 그대로 쓰면 브라우저의 luminance 기반 마스크 계산에서 깨질 수 있어 `rgba(255,255,255,α)`(흰색+알파)로 바꿔야 합니다. 정확한 정지점 표·CSS는 [tab.json](./tab.json)의 `overflowMask` 필드에 기록되어 있습니다.

## 5. `_Item`(Tab Item) 재사용 관계 — 실측 사실

- Tab(Type=Hug)은 [`components/global/tab-item/tab-item.md`](../global/tab-item/tab-item.md)의 `_Item`을 컴포넌트 인스턴스로 그대로 조합해서 만들어집니다. `get_design_context` 코드에서 `<Item active={...} label={...} />` 호출로 직접 확인했습니다.
- **`_Item`이 몇 개 들어있는지(실측 사실)**: Type=Hug의 컴포넌트 정의(TypeScript 타입)에는 `showTab1`부터 `showTab8`까지 **불리언 prop 8개**가 있습니다 — 즉 Figma 컴포넌트 레벨에서 **최대 8개의 `_Item`을 토글로 켜고 끌 수 있게 설계되어 있습니다.** 10개 진열 인스턴스 각각은 이 중 일부만 `true`로 켜서(6~8개 정도, 인스턴스별로 상이) 진열해두었고 나머지는 오버플로우 마스크로 옅게 가려지거나 표시 폭을 넘어갑니다. Segmented Control의 Count(2~5) 같은 명시적 variant 축이 아니라, **prop 토글 방식으로 탭 개수를 제어**한다는 점이 다릅니다.
- Type=Fill은 `showTab1`~`showTab5` **5개로 고정**되어 있으며, `_Item` 컴포넌트 인스턴스가 아니라 그 내부 구조를 인라인 복제한 별도 마크업입니다(3장 참고). 즉 Fill 모드에서는 탭 개수 자체가 5개로 상한선이 있는 것으로 보이나, 이는 진열 인스턴스에서 관찰된 사실이며 실제 컴포넌트 설계 의도(5개가 하드 제한인지, 진열 편의상 5개만 보여준 것인지)는 Figma 데이터만으로 단정할 수 없습니다 — 확인 필요.
- 각 `_Item`(Hug)의 Size(S/L)는 Tab의 Size와 1:1로 대응합니다(Tab Size=S → 내부 `_Item` 모두 Size=S). 10개 샘플 전체에서 예외 없이 확인되었습니다.
- 실측 샘플 전부에서 **첫 번째 탭(Tab1)만 Active=On, 나머지는 Active=Off**로 진열되어 있습니다 — Segmented Control과 동일하게 이는 Figma 진열용 기본값일 뿐, 실제로는 어느 탭이든 활성화될 수 있어야 합니다.
- `_Item`의 Disabled/Emphasize 축이 Tab 조합 안에서 실제로 쓰이는 예시는 10개 샘플에 없었습니다(전부 Disabled=False, Emphasize=Off인 `_Item`만 사용) — Tab 안에서 개별 탭을 Disabled/Emphasize로 설정하는 실사용 예시는 확인되지 않았습니다.

## 6. 모션 스펙

**모션 데이터 없음.**

`get_motion_context`를 최상위 프레임(`2262:2251`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. **Active 탭이 바뀔 때 밑줄 인디케이터가 이전 탭에서 새 탭 위치로 슬라이딩하는 애니메이션이 있는지 특히 주의 깊게 확인했으나, Figma 파일에는 그런 트랜지션이 정의되어 있지 않습니다.** `_Item` 자체의 모션 조사([tab-item.md](../global/tab-item/tab-item.md) 6장)와 마찬가지로 빈 결과이며, Segmented Control·Segmented Control Item에서도 동일하게 빈 결과였던 것과 같은 패턴입니다. 실제 프로덕트에서 밑줄 슬라이딩 인디케이터를 구현하고 싶다면 이는 Figma 디자인에 없는 별도의 구현 판단(모션 시스템 자체 결정)이 필요합니다.

## 7. 접근성

- 탭 바 컨테이너는 `role="tablist"`, 각 탭(`_Item`)은 `role="tab"` `aria-selected={Active}` `aria-disabled={Disabled}`로 마크업하는 것이 WAI-ARIA Tabs 패턴에 부합해 보이나, Figma 파일에 이 규정은 없습니다 — 확인 필요.
- 키보드 네비게이션(좌/우 화살표로 탭 간 포커스 이동, Home/End로 처음/끝 이동 등)은 WAI-ARIA Tabs 패턴의 일반적 관례이나 Figma로는 확인 불가 — 확인 필요.
- Active 상태가 밑줄 인디케이터 + 텍스트 명도 차이로만 표현되므로([tab-item.md](../global/tab-item/tab-item.md) 3장), 저시력 사용자를 위해 `aria-selected` 등 프로그램적 상태 전달이 시각 스타일과 별개로 반드시 필요합니다.
- 오버플로우 마스크로 시사되는 가로 스크롤 목록(4장)은 키보드/스크린리더 사용자를 위한 스크롤 컨트롤(예: 좌우 화살표 버튼, `overflow-x` 포커스 관리)이 필요할 수 있으나 Figma 스펙 범위 밖입니다 — 확인 필요.
- Trailing "+" 아이콘 버튼은 `role="button"` `aria-label="탭 추가"`(또는 유사한 레이블)가 필요해 보이나 Figma에 텍스트 대체 레이블이 지정되어 있지 않습니다 — 확인 필요.
- Tab 컨테이너 자체에는 Disabled 축이 없습니다(개별 `_Item`에만 존재) — Segmented Control과 동일한 패턴입니다(관찰 사실).

## 8. 토큰 매칭 요약

**정확히 일치**
- 하단 구분선 색상 `neutral/100`(#f6f7f7) → 저장소 `tokens/colors.json` `reference.gray.100`(#F6F7F7)과 일치
- 하단 구분선 두께 `borderwidth/02`(1px) → `tokens/radius.json` `borderWidth.ref-borderwidth-02`(1px)와 정확히 일치
- Trailing 아이콘 버튼 radius `radius/06`(12px) → `ref-radius-06`과 일치
- Spacing: `spacing/06`(8px), `spacing/07`(10px), `spacing/08`(12px), `spacing/11`(20px), `spacing/12`(24px) 전부 `ref-spacing-06~12`와 일치
- 내부 `_Item`의 padding·타이포는 [tab-item.md](../global/tab-item/tab-item.md)의 S/L 각 행과 **정확히 1:1 일치**

**기존 토큰에 없음**
- Size(S/L)별 "탭 바 높이=내부 `_Item` 높이" 규칙 자체를 지정하는 토큰/문서 없음
- 오버플로우 마스크(페이드 그라디언트)의 정확한 그라디언트 폭/정지점(stop)을 지정하는 시맨틱 토큰 없음(SVG 마스크 애셋으로만 존재)

**확인 필요**
- Tailing Icon=True + Side Padding=True 조합에서 오른쪽 padding이 `12px`로 하드코딩되어 변수 바인딩이 없는 것이 의도인지(4장)
- Size=L에서 Side Padding=True여도 아이템 gap이 24px로 유지되어 S(20px로 축소)와 다른 패턴을 보이는 것이 의도인지(4장)
- 컨테이너 너비 390px의 화면 폭 가변 여부
- Type=Hug의 최대 탭 개수(8개, prop 기준)와 Type=Fill의 고정 개수(5개)가 실제 프로덕트 제약인지, 진열 편의상 값인지
- 가로 스크롤 마스크가 시사하는 실제 스크롤 인터랙션의 존재 여부
- `role="tablist"`/`role="tab"`/`aria-selected`/`aria-disabled`/키보드 네비게이션/"+" 버튼 aria-label 등 접근성 마크업 연결 규정

## 9. 샘플링에 사용한 10개 노드 (부록, 전수)

| Size | Type | Tailing Icon | Side Padding | 노드 | 크기 |
|---|---|---|---|---|---|
| S | Hug | True | False | `2262:2250` | 390×42 |
| S | Hug | False | False | `2262:2248` | 390×42 |
| S | Hug | True | True | `2262:2246` | 390×42 |
| S | Hug | False | True | `2262:2249` | 390×42 |
| S | Fill | False | False | `2262:2247` | 390×42 |
| L | Hug | False | False | `2262:2564` | 390×48 |
| L | Hug | True | False | `2262:2801` | 390×48 |
| L | Hug | False | True | `2262:2929` | 390×48 |
| L | Hug | True | True | `2262:2948` | 390×48 |
| L | Fill | False | False | `2262:3123` | 390×48 |

`get_metadata`로 10개 인스턴스 전체의 레이어명·크기를 사전 확보했고, `get_design_context`를 10개 전부에 개별 호출했습니다(전수 실측, 미실측 조합 없음 — Fill이 Size당 1개뿐이라 애초에 다른 토글 조합 자체가 Figma에 존재하지 않습니다). `get_variable_defs`는 `2262:2250`(S,Hug,TailingIcon=True,SidePadding=False)과 `2262:2247`(S,Fill)에서 각각 호출했고, `get_motion_context`는 최상위 프레임(`2262:2251`, recursive=true)에 1회 호출해 빈 결과를 확인했습니다.
