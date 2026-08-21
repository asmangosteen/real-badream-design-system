# Button

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=409-6752) — Component Set `409:6752` ("Button")
> 기계 판독용 값은 [`button.json`](./button.json)을 함께 참고합니다. 이 문서와 button.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

이 Button 컴포넌트 셋은 **935개의 개별 변형 인스턴스**로 구성되어 있지만, 실제로는 **187개의 고유 조합 × 5개 Size(S/M/L/XL/2XL)**로 분해됩니다. Size 축은 스케일(치수/폰트/아이콘 크기)만 다르고 구조는 동일하므로, 935개를 전부 조회하는 대신 각 변형 축을 최소 1회 이상 포함하도록 **약 25개의 대표 노드를 선택 샘플링**하여 `get_design_context`/`get_variable_defs`/`get_motion_context`로 실측했습니다.

- 실측하지 않은 조합(예: 모든 Size × Type × State의 전체 교차)은 실측된 규칙(색상 오버레이 공식, 토큰 매핑)이 동일하게 적용된다고 **추정**한 것이며, 개별 검증하지 않은 값은 표에 **"확인 필요"**로 표시했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소의 `tokens/*.json`에 없는 값은 전부 "기존 토큰에 없음" 또는 "확인 필요"로 명시했습니다.

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

| Type | 배경 | 텍스트/아이콘 | 저장소 토큰 후보 | 매칭 여부 |
|---|---|---|---|---|
| **Primary** | `brand/primary-default` `#2c7be2` | `common/white-default` `#fdfdfd` | 배경: `sys-color-brand-primary-default`(`ref-color-blue-500` `#307EE8`) / 텍스트: `sys-color-common-white-default`(`#FDFDFD`) | 배경 **확인 필요**(근접하나 불일치, Δ최대 6) / 텍스트 **정확히 일치** |
| **Secondary** | `brand/primary-lightest` `#eef4fc` | `brand/primary-default` `#2c7be2` (Blue) | `sys-color-brand-primary-lightest`(`ref-color-blue-50` `#EAF2FD`) | **확인 필요**(근접하나 불일치) |
| **Tertiary (Gray 라벨)** | `neutral/100` `#f6f7f7` | `neutral/600` `#5b616c` | 배경: `sys-color-neutral-100`(`#F5F5F6`) / 텍스트: `sys-color-neutral-600`(`#5B606B`) | 배경 **확인 필요** / 텍스트 **거의 일치**(1 hex 단위 차, 반올림 수준) |
| **Tertiary (Blue 라벨)** | `neutral/100` `#f6f7f7` (Gray와 동일 배경) | `brand/primary-default` `#2c7be2` | 위와 동일 | 위와 동일 |
| **Tertiary (On=Dark, White 라벨)** | `neutral/600` `#5b616c` | `common/white-default` `#fdfdfd` | 배경 후보: `sys-color-neutral-600` / 텍스트: `sys-color-common-white-default` | 배경 **거의 일치** / 텍스트 **정확히 일치** |
| **Destructed** | `theme/destructed-default` `#e72f37` | `common/white-default` `#fdfdfd` | 배경 후보: `sys-color-theme-error-default`(`ref-color-red-500` `#E83030`). **저장소에 'destructed' 전용 색상 롤이 없음** | 배경 **확인 필요**(가장 근접한 error 롤과도 불일치, B채널 Δ7). 텍스트 **정확히 일치** |

> 참고: `docs/DESIGN.md` 18.1절은 "주요 CTA는 `sys-color-brand-primary-default` 사용"이라고 규정하지만, Figma 실측값(`#2c7be2`)은 현재 토큰 파일의 `#307EE8`과 정확히 일치하지 않습니다. 두 값이 다른 버전/브랜치를 반영하는지 확인이 필요합니다.

## 4. Stroke / Bold Stroke / On=Dark 규칙 (M 사이즈로 실측: `409:6238`, `409:6235`, `409:6642`, `409:6704`)

| 조합 | 배경 | 보더 | 토큰 매칭 |
|---|---|---|---|
| **Stroke=False** | Type별 색상(3장 참고) | 없음 | — |
| **Stroke=True, Bold Stroke=False** | `common/white-default` `#fdfdfd` | 1px(`borderwidth/02`=`ref-borderwidth-02`, **정확히 일치**), 색상 `color/gray/900-10` = `rgba(3,9,26,0.1)` | 보더 색상 후보 `ref-color-alpha-gray-900-10`(`colors.json`의 gray-900 10% alpha, 베이스 `#020B1C`) — **확인 필요**(근접하나 완전 일치 아님) |
| **Stroke=True, Bold Stroke=True** (Tertiary 전용) | `common/white-default` `#fdfdfd` | 1px, 색상 `neutral/400` `#c2c4c8`(불투명 단색) | 후보 `sys-color-neutral-400`(`ref-color-gray-400` `#C0C2C6`) — **확인 필요**(근접하나 불일치) |
| **On=Dark** (Tertiary 전용) | `neutral/600` `#5b616c` | 해당 없음 | 3장 참고 |

**명명 불일치 주의**: 935개 심볼 목록과 컴포넌트 프로퍼티상 "Text Color=Blue"로 표기된 Destructed+Stroke 변형(`409:6642` 등)이 실제로는 파란색이 아니라 `theme/destructed-default`(빨강 `#e72f37`) 텍스트로 렌더링됩니다. Figma 변형 축 이름과 실제 렌더링 결과가 일치하지 않는 것으로 실측 확인되었습니다 — 원본 파일에서 명명을 재확인해야 합니다.

## 5. State별 색상 변화

### 5-1. Default
3장(Type별 색상)의 값을 그대로 사용합니다.

### 5-2. Hover / Pressed
배경 위에 반투명 오버레이를 블렌드하는 방식입니다(box-shadow가 아니라 배경색과 합성된 flat color로 렌더링됨). 오버레이 색상/농도는 배경 계열(Primary·Secondary·Tertiary-Light·Tertiary-Dark·Destructed)별로 다른 전용 변수를 사용하며, **저장소 `tokens/colors.json`에는 이 인터랙션 전용 색상이 정의되어 있지 않습니다**(기존 토큰에 없음).

| 배경 계열 | Hover 오버레이 | Pressed 오버레이 | 실측 노드 |
|---|---|---|---|
| Primary(블루 배경) | `color/interaction/blue/hover` `rgba(13,45,87,0.15)` | `color/interaction/blue/pressed` `rgba(13,45,87,0.3)` | Hover `410:3436`,`409:6156`(S) / Pressed `410:3463` |
| Secondary(연한 블루 배경) | `color/interaction/light-blue/hover` `rgba(44,123,226,0.08)` | `color/interaction/light-blue/pressed` `rgba(44,123,226,0.15)` 추정 | Hover `409:6150` (실측) / Pressed는 `get_variable_defs` 값만 확인, 개별 노드 미검증 — **확인 필요** |
| Tertiary-Light(연한 그레이 배경) | `color/interaction/light-gray/hover` `rgba(3,9,26,0.05)` | `color/interaction/light-gray/pressed` `rgba(3,9,26,0.1)` 추정 | Hover `409:6149` (실측) / Pressed **확인 필요** |
| Tertiary-Dark(그레이 배경, On=Dark) | `color/interaction/gray/hover` `rgba(3,9,26,0.15)` 추정 | `color/interaction/gray/pressed` `rgba(3,9,26,0.3)` 추정 | 개별 노드 미검증, 변수값만 확인 — **확인 필요** |
| Destructed(빨강 배경) | `color/interaction/red/hover` `rgba(94,19,20,0.15)` | `color/interaction/red/pressed` `rgba(94,19,20,0.3)` | Hover `410:3570` (실측) / Pressed는 변수값만 확인 — **확인 필요** |

Hover 상태에는 `cursor: pointer` 힌트도 함께 붙습니다. Pressed 오버레이는 대체로 Hover의 약 2배 alpha 값입니다(정확히 2배는 아니며 실측값 기준 표기).

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

**정확히 일치**
- 모든 Size의 padding/gap → `ref-spacing-02/04/06/08/10`
- 모든 Size의 radius → `ref-radius-04/05/06`
- 모든 Size의 typography(caption1/body2/body1/subtitle, weight 500/600) → `tokens/typography.json`
- border-width 1px → `ref-borderwidth-02`
- Disabled opacity 20% → `ref-opacity-20`
- White 텍스트 → `sys-color-common-white-default`

**근접하나 확인 필요** (기존 토큰과 유사하지만 정확히 일치하지 않음 — 임의로 토큰명을 확정하지 않음)
- Primary/Secondary 브랜드 블루 계열 색상 (`#2c7be2` vs 토큰 `#307EE8`)
- Tertiary 배경 `neutral/100` (`#f6f7f7` vs 토큰 `#F5F5F6`)
- Tertiary Bold Stroke 보더 `neutral/400` (`#c2c4c8` vs 토큰 `#C0C2C6`)
- Destructed 배경 (`#e72f37` vs 가장 근접한 `error` 롤 `#E83030`, 저장소에 destructed 전용 롤 없음)
- Stroke 보더 색상 gray-900 10% 알파

**기존 토큰에 없음**
- `color/interaction/*` 인터랙션 전용 색상 5쌍(hover/pressed) 10개
- Icon-only 정사각형 고정 크기(26/30/38/48/56px)
- Loading 스피너 치수(컨테이너 패딩 3.5px, 아이콘 15px)
- `opacity/40` 변수(사용처 미확인)

## 9. 샘플링에 사용한 대표 노드 (부록)

Size: `409:6441`(S) · `409:6750`(M) · `409:6544`(L) · `409:6721`(XL) · `2002:11644`(2XL)
Contents: `410:3382`(Text) · `409:6245`(Icon) · `409:6363`(Icon+Text) · `439:18792`(Loading)
State: `410:3436`(Hover) · `410:3463`(Pressed) · `410:3409`(Disabled)
Type: `409:6702`(Secondary) · `409:6666`(Tertiary-Gray) · `409:6448`(Destructed) · `409:6231`(Tertiary-Blue)
Stroke/Bold/Dark: `409:6238` · `409:6235` · `409:6642` · `409:6704`
교차검증(Hover 계열별): `409:6156`(S Primary) · `409:6149`(Tertiary) · `410:3570`(Destructed) · `409:6150`(Secondary)
Icon-only 전 사이즈: `409:6217`(S) · `409:6245`(M) · `409:6329`(L) · `409:6472`(XL) · `2002:11666`(2XL)

전체 변수 맵은 `get_variable_defs`를 컴포넌트 셋 `409:6752`에 1회 호출해 확보했습니다(단일 호출로 전체 반환됨).
