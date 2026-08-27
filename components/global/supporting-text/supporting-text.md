# Supporting Text

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2114-4182) — Component Set `2114:4182` ("Supporting Text")
> 기계 판독용 값은 [`supporting-text.json`](./supporting-text.json)을 함께 참고합니다. 이 문서와 supporting-text.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Supporting Text는 **Size(S/M/L) × Theme(Gray/Black/Brand/Destructed/Success/Warning) × Text Count(True/False) 3개 축, 36개 변형**으로 구성된 컴포넌트 셋입니다. Button(935개 인스턴스, 0장 참고)만큼 크지는 않지만, 36개 전부를 개별 실측하기엔 축 구조상 비효율적입니다 — Avatar·Divider처럼 "축 하나"짜리 단순 컴포넌트가 아니라 **3개 축이 서로 독립적으로 조합**되는 구조이기 때문에, 각 축이 다른 축과 무관하게 동일한 규칙으로 동작하는지만 교차 확인하면 전체 조합을 추정할 수 있습니다.

- **총 10개 노드**를 `get_design_context`로 실측했습니다(Button의 187개 고유 조합 대비 훨씬 적은 축 조합이므로 이 정도로 충분히 규칙을 특정할 수 있었습니다):
  1. **Theme 축 전수 확인**(Size=S, Text Count=True 고정): `2114:4181`(Gray) · `2114:4170`(Black) · `2114:4163`(Brand) · `2114:4158`(Destructed) · `2114:4173`(Success) · `2114:4150`(Warning) — 6개
  2. **Size 축 확인**(Theme=Gray, Text Count=True 고정): S(`2114:4181`, 위와 중복) · M(`2114:4164`) · L(`2114:4175`) — 2개 추가
  3. **Text Count 축 확인**(Theme=Gray, Size=S 고정): True(`2114:4181`, 위와 중복) · False(`2114:4178`) — 1개 추가
  4. **교차 검증**(다른 Size에서도 색상 규칙이 동일한지): M,Destructed,True(`2114:4161`) — 1개 추가
- 실측 결과 **세 축은 서로 완전히 독립적**임을 확인했습니다 — Theme은 오직 텍스트/아이콘 색상만, Size는 오직 타이포그래피·패딩·아이콘 크기만, Text Count는 오직 카운터 요소의 유무만 바꿉니다. 나머지 3개 Size와 조합해도 이 원칙에서 벗어나는 근거는 발견되지 않았습니다(교차 검증 1건이 이를 뒷받침).
- **실측하지 않은 나머지 26개 조합**은 위 세 축 독립성 규칙에 따라 값을 **추정(패턴 기반)** 했습니다. "정확히 일치"로 단정하지 않고 표에서 "추정 (패턴 기반), 개별 미실측"으로 별도 표기합니다. 개별 실측 없이 토큰명을 새로 만들지는 않았습니다 — 8장 부록에 실측/미실측 노드를 구분해 전부 나열합니다.
- `get_variable_defs`(컴포넌트 셋 전체)와 `get_motion_context`(컴포넌트 셋 전체, recursive)는 각 1회만 호출했습니다.

## 1. 컴포넌트 개요

Supporting Text는 Input/TextField 계열 컴포넌트 하단에 표시되는 **헬퍼·에러·성공 텍스트**용 글로벌 아톰입니다. 단독으로 쓰이기보다 입력 필드의 보조 설명(placeholder 이상의 안내), 유효성 검증 결과(에러/성공), 글자 수 제한 안내를 위한 서브컴포넌트로 재사용됩니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | S / M / L | 상위 Input/TextField의 크기에 맞춰 선택하는 타이포그래피·패딩 스케일 |
| **Theme** | Gray / Black / Brand / Destructed / Success / Warning | 안내 문구의 의미(상태)를 색상으로 구분 |
| **Text Count** | True / False | 글자 수 카운터(예: `000/000`)를 함께 표시할지 여부 |

**Theme별 사용 맥락 추정**(Figma 파일에 문서화된 규정은 없으며, 저장소의 컬러 롤 원칙(`design-system-spec.json`의 `colorRoles`)에 대입한 추정입니다):
- **Gray**: 기본 안내(디폴트 헬퍼 텍스트)
- **Black**: Gray보다 강조된 안내(포커스 상태 등 — 확인 필요)
- **Brand**: 브랜드 블루 강조 안내(포커스·정보성 강조 — 확인 필요)
- **Destructed**: 오류(유효성 검증 실패)
- **Success**: 성공(유효성 검증 통과)
- **Warning**: 경고(오류는 아니지만 주의가 필요한 상태)

Gray/Black 두 톤의 정확한 사용 구분 기준(예: Default 상태=Gray, Focus 상태=Black)은 이번 조사 범위(Supporting Text 컴포넌트 자체)에서 확정할 수 없어 **확인 필요**로 남깁니다.

## 2. Theme별 색상표 (6개 전체 실측, Size=S·Text Count=True 기준)

| Theme | Figma 변수 | 색상값(hex) | 저장소 토큰 | 매칭 여부 |
|---|---|---|---|---|
| **Gray** | `neutral/500` | `#8c9199` | `sys-color-neutral-500`(`ref-color-gray-500` `#8C9199`) | **정확히 일치** |
| **Black** | `neutral/700` | `#454c58` | `sys-color-neutral-700`(`ref-color-gray-700` `#454C58`) | **정확히 일치** |
| **Brand** | `brand/primary-default` | `#2c7be2` | `sys-color-brand-primary-default`(`ref-color-blue-500` `#2C7BE2`) | **정확히 일치** |
| **Destructed** | `theme/destructed-default` | `#e72f37` | `sys-color-theme-destructed-default`(`ref-color-red-500` `#E72F37`) | **정확히 일치** |
| **Success** | `theme/success-default` | `#1f8f30` | `sys-color-theme-success-default`(`ref-color-green-600` `#1F8F30`) | **정확히 일치** |
| **Warning** | `theme/warning-default` | `#ff792c` | `sys-color-theme-warning-default`(`ref-color-orange-500` `#FF792C`) | **정확히 일치** |

**핵심 규칙**: Theme은 본문 텍스트 색상과 아이콘 색상(둘 다 동일한 Theme 색상 사용)만 바꿉니다. 단, **글자 수 카운터("000/000") 요소는 Theme과 무관하게 항상 `neutral/500`(Gray) 고정**입니다 — Destructed/Success/Warning 등 어떤 Theme이어도 카운터 자체는 회색으로 남습니다(4장 참고). 실측한 6개 Theme, 그리고 교차 검증한 M,Destructed(`2114:4161`)까지 이 규칙에서 벗어나지 않았습니다. "Black" 테마는 이름과 달리 실제로는 완전한 검정(`gray-900`/`gray-1000`)이 아니라 `neutral/700`(`#454C58`, 진회색)임을 실측으로 확인했습니다.

## 3. Size별 타이포·스페이싱 표 (3개 전체 실측)

| Size | 노드(Gray,True) | 컨테이너 | Padding Top | Padding X | 내부 Gap(Icon-Text) | 외부 Gap(Content-Counter) | 텍스트 스타일 | 아이콘 크기 |
|---|---|---|---|---|---|---|---|---|
| **S** | `2114:4181` | 280×20px | `spacing/04`=4px(`ref-spacing-04`) | `spacing/07`=10px(`ref-spacing-07`) | `spacing/02`=2px(`ref-spacing-02`) | `spacing/06`=8px(`ref-spacing-06`) | Caption 2 / 10px·16px, Medium(500), `-0.03px` | 12px |
| **M** | `2114:4164` | 280×22px | `spacing/04`=4px | `spacing/08`=12px(`ref-spacing-08`) | `spacing/02`=2px | `spacing/06`=8px | Caption 1 / 12px·18px, Regular(400), `-0.03px` | 16px |
| **L** | `2114:4175` | 280×24px | `spacing/05`=6px(`ref-spacing-05`) | `spacing/09`=14px(`ref-spacing-09`) | `spacing/02`=2px | `spacing/06`=8px | Caption 1 / 12px·18px, Regular(400), `-0.03px`(M과 동일) | 16px(M과 동일) |

모든 padding/gap/타이포 값이 저장소 토큰(`tokens/spacing.json`, `tokens/typography.json`)과 **정확히 일치**합니다. 폰트 패밀리는 전 Size 공통 `font/pretendard` = Pretendard.

**핵심 규칙**:
- 컨테이너 높이(20/22/24px)는 `Padding Top + 텍스트 lineHeight`로 정확히 계산됩니다(S: 4+16=20, M: 4+18=22, L: 6+18=24).
- **M과 L은 타이포그래피·아이콘 크기가 완전히 동일**(Caption1/12px Regular, 아이콘 16px)하며, **패딩(px/pt)만 다릅니다**. 실제 크기 단계를 만드는 건 S→M(타이포 10→12px, 아이콘 12→16px)뿐이고, M→L은 여백만 커집니다.
- 카운터("000/000") 텍스트도 각 Size의 본문 텍스트와 동일한 스타일을 사용합니다(S=Caption2/10 Medium, M/L=Caption1/12 Regular) — Figma 컴포넌트 내부적으로 "State6" 변형으로 명명되어 있으나 실제로는 Size에 종속된 카운터 타이포 스케일일 뿐입니다.
- 컨테이너 너비는 실측 10개 노드 전부 `w-[280px]`(고정 Tailwind 클래스)로 나옵니다. Divider 문서(3장)처럼 `flex-[1_0_0]`으로 부모에 맞춰 늘어나는 구조가 아니라 **컴포넌트 자체에 고정폭이 박혀 있는 형태**로 보이며, 실제 Input/TextField 폭에 맞춰 늘어나도록 재구현해야 하는지, 아니면 280px 고정폭이 의도인지는 **확인 필요**입니다.

## 4. Text Count = True/False 차이

`get_design_context` 출력 구조를 직접 비교한 결과, Text Count는 다음과 같이 동작합니다.

- **True일 때**: 좌측 `Content`(아이콘 + 본문 텍스트) 그룹과 별도로, 우측에 `data-name="Text Count"`인 **완전히 별개의 텍스트 요소**가 추가됩니다. 이 요소는 `"000"` + `"/"` + `"000"` 세 개의 텍스트 런(run)으로 이루어진 자리표시자이며, 실제 구현 시 `{현재 글자 수}/{최대 글자 수}` 형태로 바인딩하는 슬롯입니다. 카운터 앞의 슬래시(`/`)도 별도 텍스트 런으로 하드코딩되어 있어, 실제 구현 시 `{count}/{max}` 포맷 문자열로 재구성하면 됩니다.
- **False일 때**: 이 "Text Count" 요소 자체가 트리에서 완전히 사라집니다(공백만 남기는 것이 아니라 노드 자체가 없음, 실측 `2114:4178` 확인). `Content` 그룹은 `flex-[1_0_0]`로 남은 공간을 전부 차지하도록 되어 있어, 카운터가 없으면 본문 텍스트 영역이 그만큼 넓어집니다.
- 컨테이너의 세로 높이는 True/False와 무관하게 동일합니다(3장의 Size별 높이 공식은 Text Count 축과 독립적).
- 카운터의 색상은 본문 Theme과 무관하게 항상 `neutral/500`(Gray)로 고정됩니다(2장 참고).

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`2114:4182`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Supporting Text에는 State(Hover/Pressed/Disabled) 축 자체가 없으므로, 이는 Avatar·Divider와 마찬가지로 애초에 인터랙션이 정의될 이유가 없는 순수 표시용 컴포넌트임을 뒷받침합니다.

## 6. 접근성

- **아이콘 슬롯은 자유 교체용 placeholder**: 6개 Theme 샘플에서 Figma 레이어명이 전부 동일하게 `"Icon / Default / 12px / warning_filled"`로 붙어있습니다. 이는 네이밍 오류가 아니라 **의도된 상태**입니다 — 현재는 임시로 하나의 아이콘으로 통일해둔 것이며, 실제 구현 시 Theme·문맥에 맞는 아이콘으로 언제든 자유롭게 교체하도록 설계된 슬롯입니다. 즉 "이 Theme엔 반드시 이 아이콘"이라는 고정 매핑이 없으므로, 아이콘 선택은 구현체 재량입니다.
- **아이콘 표시 여부가 인스턴스 속성(`showIcon`)으로 토글 가능**: 아이콘은 36개 변형 축에 포함되지 않는 별도의 boolean prop(`showIcon`)으로 켜고 끌 수 있습니다. 만약 아이콘을 끄고 텍스트 색상만으로 Destructed/Success/Warning 상태를 구분하게 되면, **색상 대비만으로 의미를 전달하는 것**이 되어 WCAG 1.4.1(색에만 의존하지 않기)을 위반할 소지가 있습니다. 아이콘을 항상 표시하도록 강제하는 규정이 Figma 파일에 있는지는 **확인 필요**입니다.
- **색상 명암비**: 각 Theme 텍스트 색상(`#8c9199`, `#454c58`, `#2c7be2`, `#e72f37`, `#1f8f30`, `#ff792c`)이 흰 배경 대비 WCAG AA(4.5:1, 소형 텍스트 기준)를 만족하는지 이 조사에서 별도로 계산하지 않았습니다 — 특히 `neutral/500`(`#8c9199`, Gray 테마)은 상대적으로 밝은 회색이라 명암비가 낮을 가능성이 있어 **확인 필요**입니다.
- 카운터(`000/000`) 텍스트에 스크린리더용 레이블(예: "50자 중 12자 입력함")이 필요한지, 아니면 시각 전용 요소인지 Figma 파일에 규정이 없어 **확인 필요**입니다.

## 7. 토큰 매칭 요약

**정확히 일치**
- Theme 6종 텍스트/아이콘 색상 전부 → `sys-color-neutral-500`, `sys-color-neutral-700`, `sys-color-brand-primary-default`, `sys-color-theme-destructed-default`, `sys-color-theme-success-default`, `sys-color-theme-warning-default`
- Size 3종 padding/gap 전부 → `ref-spacing-02/04/05/06/07/08/09`
- Size 3종 타이포그래피 전부 → `caption1`(Regular) / `caption2`(Medium), `tokens/typography.json`과 정확히 일치
- 카운터 텍스트 색상(Theme 무관 고정) → `sys-color-neutral-500`

**추정 (패턴 기반), 개별 미실측**
- 나머지 26개 조합(Theme × Size × Text Count의 미실측 교차)의 색상·타이포·패딩 값 — 2~4장의 축 독립성 규칙이 그대로 적용된다고 추정. 8장 부록에 목록.

**기존 토큰에 없음**
- 컨테이너 고정폭 280px — 저장소에 "Supporting Text 폭" 전용 토큰 없음(3장 참고, Input/TextField 폭 연동 여부 확인 필요)
- Text Count 카운터의 `{count}/{max}` 포맷 문자열 자체는 디자인 토큰이 아니라 컴포넌트 로직 영역

**확인 필요**
- Gray/Black 두 톤의 정확한 사용 구분 기준(1장)
- `showIcon=false` 시 색상 단독 의존에 대한 WCAG 대응 규정(6장)
- 각 Theme 색상의 명암비(AA) 수치 검증(6장)
- 카운터 텍스트의 스크린리더 접근성 규정(6장)
- 280px 고정폭이 실제 구현에서 Input/TextField 폭에 맞춰 늘어나야 하는지 여부(3장)

## 8. 샘플링에 사용한 노드 (부록)

**실측한 10개 노드**
- Theme 축(Size=S, Text Count=True): `2114:4181`(Gray) · `2114:4170`(Black) · `2114:4163`(Brand) · `2114:4158`(Destructed) · `2114:4173`(Success) · `2114:4150`(Warning)
- Size 축(Theme=Gray, Text Count=True): `2114:4164`(M) · `2114:4175`(L) — S는 위 `2114:4181`과 중복
- Text Count 축(Theme=Gray, Size=S): `2114:4178`(False) — True는 위 `2114:4181`과 중복
- 교차 검증: `2114:4161`(M, Destructed, True)

**미실측 26개 노드(패턴 기반 추정)**
`2114:4177`(M,Gray,False) · `2114:4167`(L,Gray,False) · `2114:4166`(S,Black,False) · `2114:4172`(M,Black,True) · `2114:4165`(M,Black,False) · `2114:4168`(L,Black,True) · `2114:4180`(L,Black,False) · `2114:4174`(S,Brand,False) · `2114:4176`(M,Brand,True) · `2114:4162`(M,Brand,False) · `2114:4160`(L,Brand,True) · `2114:4159`(L,Brand,False) · `2114:4156`(S,Destructed,False) · `2114:4179`(M,Destructed,False) · `2114:4155`(L,Destructed,True) · `2114:4171`(L,Destructed,False) · `2114:4154`(S,Success,False) · `2114:4153`(M,Success,True) · `2114:4169`(M,Success,False) · `2114:4151`(L,Success,True) · `2114:4152`(L,Success,False) · `2114:4149`(S,Warning,False) · `2114:4148`(M,Warning,True) · `2114:4147`(M,Warning,False) · `2114:4146`(L,Warning,True) · `2114:4157`(L,Warning,False)

전체 변수 맵(`get_variable_defs`)과 모션(`get_motion_context`, recursive)은 컴포넌트 셋 `2114:4182`에 각 1회 호출해 확보했습니다. 스크린샷은 Theme 축 6개 노드에 대해 각 1회씩 확보해 아이콘 색상·형태를 육안으로 교차 확인했습니다.
