# Button

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=409-6752) — Component Set `409:6752` ("Button")
> 기계 판독용 값은 [`button.json`](./button.json)을 함께 참고합니다. 이 문서와 button.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

이 Button 컴포넌트 셋은 **935개의 개별 변형 인스턴스**로 구성되어 있지만, 실제로는 **187개의 고유 조합 × 5개 Size(S/M/L/XL/2XL)**로 분해됩니다. Size 축은 스케일(치수/폰트/아이콘 크기)만 다르고 구조는 동일하므로, 935개를 전부 조회하는 대신 각 변형 축을 최소 1회 이상 포함하도록 **약 25개의 대표 노드를 선택 샘플링**하여 `get_design_context`/`get_variable_defs`/`get_motion_context`로 실측했습니다.

- 실측하지 않은 조합(예: 모든 Size × Type × State의 전체 교차)은 실측된 규칙(색상 오버레이 공식, 토큰 매핑)이 동일하게 적용된다고 **추정**한 것이며, 개별 검증하지 않은 값은 표에 **"확인 필요"**로 표시했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소의 `tokens/*.json`에 없는 값은 전부 "기존 토큰에 없음" 또는 "확인 필요"로 명시했습니다.

> **2026-08-21 갱신 (1차)**: 초판 작성 시 `tokens/colors.json`이 V2(구버전) 팔레트였고, 여기서 여러 색상값이 Figma 실측치와 "근접하나 불일치"로 표시됐었습니다. 이후 `docs/DESIGN3.md`(바드림 디자인시스템 V3.pdf)로 저장소 토큰을 V3로 갱신하면서 재검증했고, 아래 3장·4장·8장의 "확인 필요" 항목 대부분이 V3 토큰과 **정확히 일치**로 해소되었습니다. Border-width는 V2→V3 구조 자체가 바뀌었습니다.
>
> **2026-08-21 갱신 (2차)**: `docs/DESIGN3.md`가 "attached interaction token family reference"를 포함한 버전으로 갱신되어, 12.3절에 `interaction/*` 토큰 패밀리(hover/pressed/selected/disabled 피드백용)가 새로 정의됐습니다. `tokens/colors.json`의 `interaction` 섹션에 이식했으나, **이 Button 컴포넌트의 Figma 실측값과 대조하면 Tertiary(gray) 계열만 일치하고 Primary/Secondary/Destructed(blue·red 계열)는 불일치**합니다(5-2절 표 참고) — 베이스 컬러 스텝(500 vs 900)과 alpha%가 다르거나, 아예 솔리드 스텝 방식 vs 알파 오버레이 방식으로 다릅니다. 실측값을 임의로 문서 공식에 맞춰 고치지 않고 그대로 기록했습니다.

## 1. 컴포넌트 개요

Button은 화면 이동, 확인, 제출 등 사용자의 주요 액션을 유도하는 CTA 컴포넌트입니다. 8개의 변형 축을 조합해 935개의 인스턴스를 구성합니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L / XL / 2XL | 버튼의 전체 크기(패딩·폰트·아이콘·radius)를 결정. 화면 내 위계(주요 CTA는 크게, 인라인 액션은 작게)에 따라 선택 |
| **Type** | Primary / Secondary / Tertiary / Destructed | 액션의 중요도·의미를 색상으로 구분. Primary=주요 CTA(브랜드 블루), Secondary=보조 CTA(연한 블루), Tertiary=중립/저강조(그레이 또는 스트로크), Destructed=파괴적 액션(빨강) |
| **State** | Default / Hover / Pressed / Disabled / Loading | 사용자 상호작용에 따른 시각적 피드백 상태 |
| **Text Color** | White / Blue / Gray | Type/On에 종속적으로 결정되는 라벨·아이콘 색상 (Tertiary는 Blue/Gray/White 중 선택 가능, Destructed는 White가 기본이고 Stroke=True일 때만 별도 색 라벨을 가짐 — 3장 참고) |
| **Stroke** | False / True | 배경 채움 대신(또는 배경 채움과 함께) 1px 보더를 사용할지 여부. Tertiary와 Destructed(Blue 라벨)에서 관측됨 |
| **Bold Stroke** | False / True | Stroke=True일 때, 옅은 반투명 보더 대신 진한 단색 보더를 사용할지 여부. **Tertiary 타입에서만** 관측됨(935개 심볼 목록 기준 Destructed는 Bold Stroke=True 조합이 존재하지 않음) |
| **On** | Light / Dark | 버튼이 놓이는 배경이 밝은지 어두운지. **Tertiary + Text Color=White 조합에서만** On=Dark가 관측됨(어두운 배경 위에 놓이는 Tertiary 버튼) |
| **Contents** | Text / Icon / Text + Icon / Icon + Text | 라벨과 아이콘의 유무 및 순서. "Text + Icon"은 아이콘이 텍스트 뒤(오른쪽), "Icon + Text"는 아이콘이 텍스트 앞(왼쪽) |

## 2. Size별 스펙

기준 조합: Type=Primary, State=Default, Contents=Text + Icon (5개 Size 전체 실측: `409:6441`(S), `409:6750`(M), `409:6544`(L), `409:6721`(XL), `2002:11644`(2XL))

| Size | Padding X | Padding Y | Gap | Radius | 폰트 스타일 | Weight | 아이콘 크기 |
|---|---|---|---|---|---|---|---|
| **S** | `spacing/06` = 8px (`ref-spacing-06`) | `spacing/04` = 4px (`ref-spacing-04`) | `spacing/02` = 2px (`ref-spacing-02`) | `radius/04` = 8px (`ref-radius-04`) | caption1 (12px/18px, -0.03px) | `weight/600` Semibold | 12px |
| **M** | `spacing/06` = 8px | `spacing/04` = 4px | `spacing/02` = 2px | `radius/05` = 10px (`ref-radius-05`) | body2 (14px/22px, -0.04px) | `weight/500` Medium | 16px |
| **L** | `spacing/08` = 12px (`ref-spacing-08`) | `spacing/06` = 8px | `spacing/02` = 2px | `radius/05` = 10px | body2 (14px/22px, -0.04px) | `weight/500` Medium | 16px |
| **XL** | `spacing/10` = 16px (`ref-spacing-10`) | `spacing/08` = 12px | `spacing/02` = 2px | `radius/06` = 12px (`ref-radius-06`) | body1 (16px/24px, -0.04px) | `weight/500` Medium | 16px |
| **2XL** | 16px (4방향 동일, `spacing/10`) | 〃 | `spacing/02` = 2px | `radius/06` = 12px | subtitle (18px/24px, -0.09px) | `weight/500` Medium | 20px |

모든 padding/gap/radius/typography 값은 저장소 토큰(`tokens/spacing.json`, `tokens/radius.json`, `tokens/typography.json`)과 **정확히 일치**합니다. 폰트 패밀리는 전 사이즈 공통 `font/pretendard` = Pretendard(저장소 `tokens/typography.json`의 fontFamily와 일치).

특이사항: **S 사이즈만 Semibold(600), 나머지(M/L/XL/2XL)는 전부 Medium(500)** 라벨 굵기를 사용합니다.

### 2-1. Contents=Icon(아이콘 전용) 정사각형 크기

Icon-only 변형은 위 패딩 공식을 따르지 않고 **고정 정사각형**입니다(실측: `409:6217` S, `409:6245` M, `409:6329` L, `409:6472` XL, `2002:11666` 2XL).

| Size | 정사각형 한 변 | 내부 아이콘 크기 | 토큰 매칭 |
|---|---|---|---|
| S | 26px | 12px | 기존 토큰에 없음(패딩 공식 역산 불가, 고정값) |
| M | 30px | 16px | 기존 토큰에 없음 |
| L | 38px | **20px** | 기존 토큰에 없음. Text+Icon 조합의 16px과 다름 — 확인 필요 |
| XL | 48px | **20px** | 기존 토큰에 없음. Text+Icon 조합의 16px과 다름 — 확인 필요 |
| 2XL | 56px | 24px | 기존 토큰에 없음 |

L/XL에서 Icon-only 아이콘이 Text+Icon 조합보다 큰 것(20px vs 16px)은 Figma 실측으로 확인된 사실이며, 의도적 디자인인지 오타인지는 이 문서 조사 범위에서 판단할 수 없어 **확인 필요**로 남깁니다.

## 3. Type별 색상 (State=Default 기준, M 사이즈로 실측 · 다른 Size에도 동일 적용 추정)

| Type | 배경 | 텍스트/아이콘 | 저장소 토큰(V3) | 매칭 여부 |
|---|---|---|---|---|
| **Primary** | `brand/primary-default` `#2c7be2` | `common/white-default` `#fdfdfd` | 배경: `sys-color-brand-primary-default`(`ref-color-blue-500` `#2C7BE2`) / 텍스트: `sys-color-common-white-default`(`#FDFDFD`) | 배경 **정확히 일치** / 텍스트 **정확히 일치** |
| **Secondary** | `brand/primary-lightest` `#eef4fc` | `brand/primary-default` `#2c7be2` (Blue) | `sys-color-brand-primary-lightest`(`ref-color-blue-50` `#EEF4FC`) | **정확히 일치** |
| **Tertiary (Gray 라벨)** | `neutral/100` `#f6f7f7` | `neutral/600` `#5b616c` | 배경: `sys-color-neutral-100`(`#F6F7F7`) / 텍스트: `sys-color-neutral-600`(`#5B616C`) | 배경 **정확히 일치** / 텍스트 **정확히 일치** |
| **Tertiary (Blue 라벨)** | `neutral/100` `#f6f7f7` (Gray와 동일 배경) | `brand/primary-default` `#2c7be2` | 위와 동일 | 위와 동일 |
| **Tertiary (On=Dark, White 라벨)** | `neutral/600` `#5b616c` | `common/white-default` `#fdfdfd` | 배경 후보: `sys-color-neutral-600`(`#5B616C`) / 텍스트: `sys-color-common-white-default` | 배경 **정확히 일치** / 텍스트 **정확히 일치** |
| **Destructed** | `theme/destructed-default` `#e72f37` | `common/white-default` `#fdfdfd` | 배경: `sys-color-theme-destructed-default`(`ref-color-red-500` `#E72F37`) — V3에서 'destructed' 전용 롤이 정식 추가됨 | 배경 **정확히 일치** / 텍스트 **정확히 일치** |

> **2026-08-21 갱신**: 초판 작성 시엔 저장소 `tokens/colors.json`이 V2 팔레트(`docs/DESIGN.md`/DESIGN2.md 원본 기준)여서 위 항목들이 전부 "근접하나 불일치"로 표시됐었습니다. `docs/DESIGN3.md`(바드림 디자인시스템 V3.pdf)로 토큰을 갱신한 뒤 재검증한 결과, Figma 실측값은 V2가 아니라 **V3와 정확히 일치**하는 것으로 확인됐습니다. 즉 Figma가 항상 최신이었고 저장소 토큰 파일이 구버전이었던 것입니다. 'Destructed' 색상 롤도 V2에는 없었으나(가장 가까운 `error` 롤과도 값이 달랐음) V3에서 `sys-color-theme-destructed-*`로 정식 정의되어 정확히 일치합니다(`error` 롤은 V2 하위호환용 alias로 값은 동일하게 유지).

## 4. Stroke / Bold Stroke / On=Dark 규칙 (M 사이즈로 실측: `409:6238`, `409:6235`, `409:6642`, `409:6704`)

| 조합 | 배경 | 보더 | 토큰 매칭 |
|---|---|---|---|
| **Stroke=False** | Type별 색상(3장 참고) | 없음 | — |
| **Stroke=True, Bold Stroke=False** | `common/white-default` `#fdfdfd` | 1px(`borderwidth/02`=`ref-borderwidth-02`, **정확히 일치**), 색상 `color/gray/900-10` = `rgba(3,9,26,0.1)` | 보더 색상 `ref-color-alpha-gray-900-10`(`colors.json`의 gray-900 10% alpha, 베이스 `#03091A` = rgb(3,9,26)) — **정확히 일치**(V3 갱신 후) |
| **Stroke=True, Bold Stroke=True** (Tertiary 전용) | `common/white-default` `#fdfdfd` | 1px, 색상 `neutral/400` `#c2c4c8`(불투명 단색) | `sys-color-neutral-400`(`ref-color-gray-400` `#C2C4C8`) — **정확히 일치**(V3 갱신 후) |
| **On=Dark** (Tertiary 전용) | `neutral/600` `#5b616c` | 해당 없음 | 3장 참고 |

**명명 불일치 주의**: 935개 심볼 목록과 컴포넌트 프로퍼티상 "Text Color=Blue"로 표기된 Destructed+Stroke 변형(`409:6642` 등)이 실제로는 파란색이 아니라 `theme/destructed-default`(빨강 `#e72f37`) 텍스트로 렌더링됩니다. Figma 변형 축 이름과 실제 렌더링 결과가 일치하지 않는 것으로 실측 확인되었습니다 — 원본 파일에서 명명을 재확인해야 합니다.

## 5. State별 색상 변화

### 5-1. Default
3장(Type별 색상)의 값을 그대로 사용합니다.

### 5-2. Hover / Pressed
배경 위에 반투명 오버레이를 블렌드하는 방식입니다(box-shadow가 아니라 색상+opacity 페인트로 렌더링됨).

| 배경 계열 | Hover 오버레이(Figma 실측) | Pressed 오버레이(Figma 실측) | 실측 노드 |
|---|---|---|---|
| Primary(블루 배경) | `#0D2D57`(=`ref-color-blue-900`) 15% | `#0D2D57` 30% | Hover `410:3436`,`409:6156`(S) / Pressed `410:3463` |
| Secondary(연한 블루 배경) | `#2C7BE2`(=`ref-color-blue-500`) 8% | `#2C7BE2` 15% 추정 | Hover `409:6150`(실측) / Pressed는 `get_variable_defs` 값만 확인, 개별 노드 미검증 — **확인 필요** |
| Tertiary-Light(연한 그레이 배경) | `#03091A`(=`ref-color-gray-900`) 5% | `#03091A` 10% 추정 | Hover `409:6149`(실측) / Pressed **확인 필요** |
| Tertiary-Dark(그레이 배경, On=Dark) | `#03091A` 15% 추정 | `#03091A` 30% 추정 | 개별 노드 미검증, 변수값만 확인 — **확인 필요** |
| Destructed(빨강 배경) | `#5E1314`(=`ref-color-red-900`) 15% | `#5E1314` 30% | Hover `410:3570`(실측) / Pressed는 변수값만 확인 — **확인 필요** |

Hover 상태에는 `cursor: pointer` 힌트도 함께 붙습니다. Pressed 오버레이는 Hover의 정확히 2배 alpha 값입니다(15%→30%, 8%→15%는 반올림, 5%→10%).

**⚠️ DESIGN3.md 12.3절(Interaction 토큰)과의 불일치 — 확인 필요**

`docs/DESIGN3.md` 최신판(2026-08-21, "attached interaction token family reference" 출처 추가)에 `interaction/*` 토큰 패밀리가 공식 정의되어 `tokens/colors.json`의 `interaction` 섹션에 이식했습니다. 그런데 이 Button 컴포넌트를 Figma에서 직접 실측한 값과 대조하면 **패밀리마다 일치 여부가 다릅니다**:

| 계열 | DESIGN3.md `interaction/*` 공식 값 | Figma 실측값(이 버튼) | 일치 여부 |
|---|---|---|---|
| Tertiary(그레이) hover/pressed | `interaction/gray`: gray-900 5%/10% | gray-900 5%/10% | **정확히 일치** |
| Primary(블루) hover/pressed | `interaction/blue`: **blue-500** 20%/40% | **blue-900** 15%/30% | **불일치** (베이스 색상과 alpha % 둘 다 다름) |
| Secondary(연한 블루) | `interaction/light-blue`: default=blue-50, pressed=blue-100 (알파 없는 솔리드 스텝) | blue-500 8%(hover) / 15% 추정(pressed) — 알파 오버레이 방식 | **불일치** (방식 자체가 다름: 솔리드 컬러 스텝 vs 알파 오버레이) |
| Destructed(빨강) hover/pressed | `interaction/red`: **red-500** 20%/40% | **red-900** 15%/30% | **불일치** (베이스 색상과 alpha % 둘 다 다름) |

즉 이 Button 컴포넌트의 실제 Figma 구현은 (Tertiary/gray 계열을 제외하면) DESIGN3.md에 새로 문서화된 공식 `interaction/*` 토큰 공식을 따르지 않습니다. 두 가지 가능성이 있습니다: ① 이 Button 컴포넌트가 아직 신규 interaction 토큰으로 마이그레이션되지 않은 구버전 구현이거나, ② `interaction/*` 문서가 아직 실제 컴포넌트에 완전히 반영되지 않은 목표 스펙(target spec)일 수 있습니다. 이 문서는 **Figma 실측값을 그대로 기록**했고, 어느 쪽이 최종 기준인지는 디자이너 확인이 필요합니다. `tokens/colors.json`의 `interaction` 섹션은 DESIGN3.md 문서값 그대로 보관해뒀습니다.

### 5-3. Disabled (실측: `410:3409`)
버튼 전체(배경 + 텍스트 + 아이콘)에 **opacity 20%**를 적용합니다. 색상값 자체는 변하지 않습니다.

- `opacity/20` = 20% = `ref-opacity-20` — **정확히 일치**
- 참고: `get_variable_defs`에서 `opacity/40`(40%) 변수도 발견되었으나, 샘플링한 노드 중 실제 사용처를 찾지 못했습니다 — **확인 필요**

### 5-4. Loading (실측: `439:18792`)
라벨 텍스트를 그대로 유지한 채, 텍스트 뒤에 `spacing/02`(2px) 간격으로 스피너를 추가합니다.

- 935개 심볼 목록 기준, **Loading 상태는 항상 Contents=Text와만 조합**됩니다(Icon, Text+Icon, Icon+Text 조합에는 Loading이 존재하지 않음).
- 스피너 컨테이너 패딩 3.5px(모든 방향), 내부 아이콘 15px×15px, "Subtract"라는 이름의 단일 프레임 이미지 애셋 사용.
- 3.5px/15px는 저장소 스페이싱 스케일과 일치하지 않는 고정값입니다 — 기존 토큰에 없음.

## 6. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 다음 대상에 호출했으나 전부 빈 결과(`{"nodes":[]}`)를 반환했습니다:
- 컴포넌트 셋 전체(`409:6752`, recursive=true)
- Primary M Default 개별 노드(`409:6750`, recursive=true)
- Primary M Loading 개별 노드(`439:18792`, recursive=true)

Figma 파일 안에 Hover/Pressed 전환이나 Loading 스피너 회전에 대한 프로토타입 인터랙션(스마트 애니메이트, 트랜지션, 키프레임)이 전혀 정의되어 있지 않습니다.

| 트리거 | 대상 프로퍼티 | Duration | Easing | 시작값 | 종료값 |
|---|---|---|---|---|---|
| Default → Hover | 배경 오버레이 | 모션 데이터 없음 | 모션 데이터 없음 | 오버레이 0% | 5장 참고 오버레이 값 |
| Hover → Pressed | 배경 오버레이 | 모션 데이터 없음 | 모션 데이터 없음 | Hover 오버레이 | Pressed 오버레이 |
| Default → Disabled | opacity | 모션 데이터 없음 | 모션 데이터 없음 | 100% | 20% |
| Loading 스피너 회전 | transform: rotate | 모션 데이터 없음 | 모션 데이터 없음 | 모션 데이터 없음 | 모션 데이터 없음 |

State 간 **색상/opacity 값 자체**는 5장에 실측되어 있지만, 그 전환에 걸리는 duration이나 easing 곡선은 Figma에 정의된 바가 없으므로 임의의 수치(예: "200ms ease-out")를 만들어내지 않았습니다. 구현 시 duration/easing이 필요하다면 별도로 디자이너 확인이 필요합니다.

## 7. 접근성

- **최소 터치 영역**: 확인 필요. Figma 파일에서 명시적인 최소 터치 영역 정의를 찾지 못했습니다. Icon-only 버튼의 실측 크기(S 26px, M 30px, L 38px, XL 48px, 2XL 56px)는 흔히 권장되는 44px 기준보다 S/M/L에서 작아, 실제 적용 시 히트 영역(hit area) 확장이 필요한지 확인이 필요합니다.
- **aria-label**: `docs/DESIGN.md` 1141번째 줄에 "접근성 라벨이 필요한 버튼형 아이콘에는 `aria-label` 또는 대체 텍스트를 제공합니다"라는 규정이 있습니다. Contents=Icon(아이콘 전용) 변형에 적용해야 합니다.
- **색상 명암비**: `docs/DESIGN.md` 전반에 "배경 요소 위의 텍스트/아이콘/컴포넌트는 WCAG 기준을 준수해야 함"이라는 원칙만 있고, Button 전용 명암비 수치 검증은 이 조사에서 수행하지 않았습니다 — 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치** (V3 토큰 갱신 후, 2026-08-21 기준)
- 모든 Size의 padding/gap → `ref-spacing-02/04/06/08/10`
- 모든 Size의 radius → `ref-radius-04/05/06`
- 모든 Size의 typography(caption1/body2/body1/subtitle, weight 500/600) → `tokens/typography.json`
- border-width 1px → `ref-borderwidth-02`
- Disabled opacity 20% → `ref-opacity-20`
- White 텍스트 → `sys-color-common-white-default`
- Primary/Secondary 브랜드 블루 계열 색상 (`#2c7be2` = `ref-color-blue-500`/`ref-color-blue-50`)
- Tertiary 배경 `neutral/100` (`#f6f7f7` = `ref-color-gray-100`)
- Tertiary Bold Stroke 보더 `neutral/400` (`#c2c4c8` = `ref-color-gray-400`)
- Destructed 배경 (`#e72f37` = `sys-color-theme-destructed-default`, V3에서 신설된 전용 롤)
- Stroke 보더 색상 gray-900 10% 알파 (베이스 `#03091A` = `ref-color-gray-900`)

**기존 토큰에 없음**
- Icon-only 정사각형 고정 크기(26/30/38/48/56px)
- Loading 스피너 치수(컨테이너 패딩 3.5px, 아이콘 15px)
- `opacity/40` 변수(사용처 미확인)

**토큰은 생겼으나 실측값과 불일치 — 확인 필요** (2026-08-21, DESIGN3.md 12.3절 Interaction 토큰 반영 후)
- `interaction/blue`(hover/pressed) — 문서 공식은 blue-500 20%/40%, 이 버튼 실측은 blue-900 15%/30%
- `interaction/light-blue` — 문서 공식은 blue-50/blue-100 솔리드 스텝, 이 버튼 실측은 blue-500 알파 오버레이(8%/15%)
- `interaction/red`(hover/pressed) — 문서 공식은 red-500 20%/40%, 이 버튼 실측은 red-900 15%/30%
- `interaction/gray`(hover/pressed)만 문서 공식(gray-900 5%/10%)과 실측이 **정확히 일치**

**구조적 차이 — 확인 필요** (V2→V3에서 정의 자체가 바뀜)
- Border-width: V2는 `ref-borderwidth-07=12px, 08=16px`였으나 V3는 `07=10px, 08=12px, 09=14px`(16px 스텝 없음). 이 Button 컴포넌트가 실제로 쓰는 보더는 `ref-borderwidth-02`(1px)뿐이라 직접 영향은 없으나, 다른 컴포넌트 문서 작성 시 주의 필요.

## 9. 샘플링에 사용한 대표 노드 (부록)

Size: `409:6441`(S) · `409:6750`(M) · `409:6544`(L) · `409:6721`(XL) · `2002:11644`(2XL)
Contents: `410:3382`(Text) · `409:6245`(Icon) · `409:6363`(Icon+Text) · `439:18792`(Loading)
State: `410:3436`(Hover) · `410:3463`(Pressed) · `410:3409`(Disabled)
Type: `409:6702`(Secondary) · `409:6666`(Tertiary-Gray) · `409:6448`(Destructed) · `409:6231`(Tertiary-Blue)
Stroke/Bold/Dark: `409:6238` · `409:6235` · `409:6642` · `409:6704`
교차검증(Hover 계열별): `409:6156`(S Primary) · `409:6149`(Tertiary) · `410:3570`(Destructed) · `409:6150`(Secondary)
Icon-only 전 사이즈: `409:6217`(S) · `409:6245`(M) · `409:6329`(L) · `409:6472`(XL) · `2002:11666`(2XL)

전체 변수 맵은 `get_variable_defs`를 컴포넌트 셋 `409:6752`에 1회 호출해 확보했습니다(단일 호출로 전체 반환됨).
