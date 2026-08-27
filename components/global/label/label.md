# Label

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2114-3775) — Component Set `2114:3775` ("Label")
> 기계 판독용 값은 [`label.json`](./label.json)을 함께 참고합니다. 이 문서와 label.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/global/`에 위치합니다 — Input/TextField/TextArea 등 상위 컴포넌트 내부에서 재사용되는 공용 서브 아톰이며, 단독 컴포넌트가 아닙니다(상세: `components/README.md` "components/global/이란" 절 참고).

## 0. 문서 범위와 샘플링 방법

Label은 **Size(S/M/L) × Essential(Off/On) 두 축, 6-변형 컴포넌트 셋**입니다. 6개 노드 전부 `get_design_context`로 개별 실측했고, `get_variable_defs`는 컴포넌트 셋 전체에 1회 호출한 결과를 재사용했습니다(오케스트레이터가 사전 확보). `get_motion_context`는 컴포넌트 셋(`2114:3775`, recursive=true)에 이 문서 작성 과정에서 별도로 1회 호출했습니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.
- **사전 추정과 다른 실측 결과가 나와 정정합니다**: 작업 지시 단계에서는 "S=Caption1 Semibold, M/L=Body2 Medium"으로 추정했으나, 실제 `get_design_context` 실측 결과 **S와 M은 둘 다 Caption1(12px) SemiBold이고, L만 Body2(14px) Medium**입니다. S/M의 차이는 타이포그래피가 아니라 하단 padding(spacing 토큰) 값입니다. 2장에서 상세히 다룹니다.

## 1. 컴포넌트 개요

Label은 텍스트 입력 필드(Input/TextField/TextArea 등) 상단에 붙는 필드명 텍스트입니다. Essential=On일 때 필수 입력 항목임을 나타내는 빨간 별표(*)가 라벨 텍스트 옆에 붙습니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L | 라벨의 크기 단계. 실측 결과 S·M은 타이포그래피가 동일(Caption1 SemiBold)하고 하단 padding만 다름, L만 타이포그래피 자체가 다름(Body2 Medium) |
| **Essential** | Off / On | On이면 라벨 텍스트 뒤에 필수 표시 별표(*)가 추가됨 |

## 2. Size × Essential별 스펙 (6개 전체 실측)

| Size | Essential | 노드 | 크기(실측) | 라벨 타이포 | 라벨 색상 | 하단 padding | 별표 유무·스타일 |
|---|---|---|---|---|---|---|---|
| **S** | Off | `2114:3785` | 60×20px | Caption1(12px) SemiBold(600), `lineHeight/Caption1`=18px, `letterSpacing/Caption`=-0.03px | `neutral/700`=`#454c58` | `spacing/02`=2px | 없음 |
| **S** | On | `2114:3787` | 60×20px | 라벨: 위와 동일(Caption1 SemiBold) | `neutral/700` | `spacing/02`=2px | 있음: `*`, Caption1(12px) **Medium(500)**, 색상 `theme/destructed-default`=`#e72f37`, 라벨과의 gap `spacing/02`=2px |
| **M** | Off | `2114:3774` | 60×22px | Caption1(12px) SemiBold(600) — **S와 동일 타이포** | `neutral/700` | `spacing/04`=4px | 없음 |
| **M** | On | `2114:3773` | 60×22px | 라벨: 위와 동일(Caption1 SemiBold) | `neutral/700` | `spacing/04`=4px | 있음: `*`, Caption1(12px) **Medium(500)**, 색상 `theme/destructed-default`, gap `spacing/02`=2px |
| **L** | Off | `2114:3771` | 60×28px | Body2(14px) Medium(500), `lineHeight/Body2`=22px, `letterSpacing/Body`=-0.04px | `neutral/700` | `spacing/05`=6px | 없음 |
| **L** | On | `2114:3772` | 60×28px | 라벨: 위와 동일(Body2 Medium) | `neutral/700` | `spacing/05`=6px | 있음: `*`, Body2(14px) **Medium(500) — 라벨과 동일 weight**, 색상 `theme/destructed-default`, gap `spacing/02`=2px |

**핵심 실측 발견 (S/M/L 축의 실제 정체)**:
1. **S와 M은 타이포그래피가 완전히 동일**합니다(Caption1 12px SemiBold, lineHeight 18px). 두 Size의 유일한 차이는 **하단 padding**입니다 — S는 `spacing/02`(2px), M은 `spacing/04`(4px). 노드 높이가 S=20px, M=22px로 2px 차이 나는 것과 정확히 일치합니다(18px 텍스트 lineHeight + 2px 또는 4px padding).
2. **L만 타이포그래피 자체가 Body2(14px) Medium**으로 바뀝니다. lineHeight 22px + `spacing/05`(6px) padding = 28px, 노드 높이와 일치합니다.
3. **별표(*) 스타일이 Size별로 다릅니다**: S·M에서는 별표가 라벨(SemiBold 600)보다 한 단계 가벼운 **Medium(500)**으로 스타일이 분리되어 있지만, **L에서는 별표와 라벨이 같은 Medium(500)**을 공유합니다(부모 컨테이너 자체에 폰트 스타일이 걸려 있고 별표/라벨 모두 개별 override 없이 상속). 즉 S/M은 라벨-별표 weight가 다르고, L은 라벨-별표 weight가 같습니다.
4. 별표 색상(`theme/destructed-default` = `#e72f37`)과 라벨-별표 간 gap(`spacing/02`=2px)은 S/M/L 전 Size 공통입니다.

## 3. 너비(가로) 규칙

6개 노드 전부 컴포넌트 루트에 `w-[60px]`(고정 60px)가 명시적으로 걸려 있습니다. Divider 문서의 "진열 프레임 크기" 사례와 달리, 이 60px는 부모 프레임이 아니라 **컴포넌트 자신의 클래스에 직접 지정**되어 있어 겉보기엔 고정값처럼 보입니다. 다만 Figma 인스턴스의 placeholder 텍스트가 "Label"(5글자)로 고정되어 있어, 이 60px가 실제 의도된 고정 너비인지 아니면 단순히 placeholder 텍스트 길이에 맞춘 표시 폭인지는 Figma 파일만으로 단정할 수 없습니다 — **확인 필요**입니다. 실제 필드 라벨은 텍스트 길이가 다양하므로(예: "이름", "전화번호(선택)") 구현 시 `width: auto`/`fit-content`로 처리하는 편이 안전해 보입니다.

## 4. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`2114:3775`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Label에는 State(Hover/Pressed/Disabled) 축 자체가 없는 순수 텍스트 표시 아톰이므로, 인터랙션이 정의될 이유가 없습니다.

## 5. 접근성

- **필수 입력 표시**: Essential=On의 별표(`*`)는 시각적 표시일 뿐이며, 스크린리더가 이를 "필수"로 인식하려면 실제 구현 시 연결된 `<input>`에 `required`/`aria-required="true"`를 별도로 부여해야 합니다. Figma 파일 자체에는 이 연결 규정이 없습니다 — 확인 필요.
- 별표 자체에 `aria-label="필수"` 등 대체 텍스트를 주는 것이 스크린리더 사용자에게 의미를 명확히 전달하는 데 도움이 될 수 있으나, 이 역시 Figma 파일에 규정되어 있지 않습니다 — 확인 필요.
- `<label for="...">` 같은 네이티브 폼 라벨 연결 여부는 Figma 디자인 자체로는 확인할 수 없는 마크업 레벨의 사안입니다 — 확인 필요.

## 6. 토큰 매칭 요약

**정확히 일치**
- S/M 라벨 타이포 Caption1 SemiBold(12px/18px/-0.03px) → `Caption 1/12 SB` 스타일, 색상 `neutral/700`(#454c58) → `sys-color-neutral-700`
- L 라벨 타이포 Body2 Medium(14px/22px/-0.04px) → `Body 2/14 M` 스타일, 색상 `neutral/700`
- 별표 색상 `theme/destructed-default`(#e72f37) → `sys-color-theme-destructed-default`
- 별표-라벨 gap 2px → `ref-spacing-02`
- S 하단 padding 2px → `ref-spacing-02`, M 하단 padding 4px → `ref-spacing-04`, L 하단 padding 6px → `ref-spacing-05`

**기존 토큰에 없음**
- Size(S/M/L)별로 "라벨엔 이 타이포+padding 조합을 쓴다"는 규칙 자체를 지정하는 시맨틱 토큰은 저장소에 없음(개별 타이포/스페이싱 값 자체는 토큰과 일치)

**확인 필요**
- 60px 고정 너비가 실제 의도인지 placeholder 텍스트 길이에 따른 표시일 뿐인지 (3장)
- Essential=On의 `required`/`aria-required` 연결 규정
- 별표에 대한 보조 텍스트(`aria-label`) 필요 여부
- `<label for>` 등 네이티브 폼 연결 규정

## 7. 샘플링에 사용한 노드 (부록, 6개 전수)

`2114:3785`(S,Off) · `2114:3787`(S,On) · `2114:3774`(M,Off) · `2114:3773`(M,On) · `2114:3771`(L,Off) · `2114:3772`(L,On)

변수 맵(`get_variable_defs`)은 컴포넌트 셋 `2114:3775`에서 사전 확보한 값을 재사용했으며(`neutral/700`, `letterSpacing/Caption`, `size/Caption1`, `weight/600`, `font/pretendard`, `paragraphSpacing/Caption1`, `lineHeight/Caption1`, `spacing/04`, `spacing/02`, `letterSpacing/Body`, `size/Body2`, `weight/500`, `paragraphSpacing/Body2`, `lineHeight/Body2`, `spacing/05`, `theme/destructed-default` 등), 모션(`get_motion_context`, recursive)은 이 문서 작성 과정에서 컴포넌트 셋 `2114:3775`에 별도로 1회 호출해 빈 결과를 확인했습니다.
