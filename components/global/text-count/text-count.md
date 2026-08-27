# Text Count

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2114-3929) — Component Set `2114:3929` ("Text Count")
> 기계 판독용 값은 [`text-count.json`](./text-count.json)을 함께 참고합니다. 이 문서와 text-count.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/global/`에 위치합니다 — Input/TextField/TextArea 등 상위 컴포넌트 내부에서 재사용되는 공용 서브 아톰이며, 단독 컴포넌트가 아닙니다(상세: `components/README.md` "components/global/이란" 절 참고).

## 0. 문서 범위와 샘플링 방법

Text Count는 **Size(Small/Default) × State(3종) 두 축, 6-변형 컴포넌트 셋**입니다. 6개 노드 전부 `get_design_context`로 개별 실측했고, `get_variable_defs`는 컴포넌트 셋 전체에 1회 호출한 결과를 재사용했습니다(오케스트레이터가 사전 확보). `get_motion_context`는 컴포넌트 셋(`2114:3929`, recursive=true)에 이 문서 작성 과정에서 별도로 1회 호출했습니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.
- **Figma 소스 파일의 네이밍 불일치를 명시적으로 지적합니다**: 아래 1장에서 상세히 다룹니다.

## 1. 컴포넌트 개요

Text Count는 텍스트 입력 필드(TextArea 등) 근처에 표시되는 글자 수 카운터입니다(예: "12/50"). 현재 입력된 글자 수(분자)와 최대 허용 글자 수(분모)를 "/"로 구분해 표시하며, 입력 상태에 따라 분자 부분의 색상이 바뀝니다.

**⚠️ Figma 소스 파일의 네이밍 불일치**: 이 Component Set의 State 값은 Size 그룹마다 이름 붙이는 방식이 다릅니다.
- **Small** 그룹의 State는 `Default` / `Typing` / `Destructed`로, 의미가 드러나는 이름이 붙어 있습니다.
- **Default(Size)** 그룹의 State는 `State6` / `State5` / `State4`로, 의미 없는 자동 생성 이름 그대로 남아 있습니다.

작업 지시 단계에서는 이를 임의로 Small 그룹과 매칭시키지 말라고 명시했기에, **실제 렌더링 색상값을 `get_design_context`로 실측 비교**하여 매칭을 검증했습니다(2장 참고). 이는 추측이 아니라 색상 실측에 근거한 결론입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Size** | Small(Caption2, 10px) / Default(Caption1, 12px) | 카운터 텍스트 크기 |
| **State** | Default / Typing / Destructed (Small 그룹 명칭 기준) | 입력 안 함(회색) / 입력 중(진한 회색 강조) / 최대 글자수 초과 등 오류(빨강 강조) |

## 2. Size × State별 스펙 (6개 전체 실측)

| Size | State(실제 의미) | Figma 노드 | 노드상 State 이름 | 크기(실측) | 타이포 | 분자(입력된 수) 색상 | 슬래시·분모 색상 |
|---|---|---|---|---|---|---|---|
| Small | Default | `2114:3928` | `Default` | 42×16px | Caption2(10px) Medium(500), `lineHeight/Caption2`=16px | `neutral/500`=`#8c9199` (분자도 동일하게 회색) | `neutral/500`=`#8c9199` |
| Small | Typing | `2114:3927` | `Typing` | 42×16px | Caption2(10px) Medium(500) | `neutral/700`=`#454c58` (더 짙은 회색으로 강조) | `neutral/500`=`#8c9199` |
| Small | Destructed | `2114:3926` | `Destructed` | 42×16px | Caption2(10px) Medium(500) | `theme/destructed-default`=`#e72f37` (빨강) | `neutral/500`=`#8c9199` |
| Default | Default | `2114:4251` | `State6` | 49×18px | Caption1(12px) **Regular(400)**, `lineHeight/Caption1`=18px | `neutral/500`=`#8c9199` (분자도 동일하게 회색) | `neutral/500`=`#8c9199` |
| Default | Typing | `2114:4255` | `State5` | 49×18px | Caption1(12px) Regular(400) | `neutral/700`=`#454c58` (더 짙은 회색으로 강조) | `neutral/500`=`#8c9199` |
| Default | Destructed | `2114:4259` | `State4` | 49×18px | Caption1(12px) Regular(400) | `theme/destructed-default`=`#e72f37` (빨강) | `neutral/500`=`#8c9199` |

**State6/5/4 매칭 근거 (색상 실측 비교, 확정)**:
- `State6`(`2114:4251`)은 세 텍스트 조각(분자/슬래시/분모) 모두 부모 컨테이너의 공통 색상(`neutral/500`)만 상속하고 개별 색상 override가 전혀 없습니다 — Small 그룹의 `Default`(분자도 회색)와 정확히 같은 패턴 → **State6 = Default**
- `State5`(`2114:4255`)는 분자만 `neutral/700`(더 짙은 회색)로 override되고 슬래시·분모는 `neutral/500` 그대로입니다 — Small 그룹의 `Typing`과 정확히 같은 패턴 → **State5 = Typing**
- `State4`(`2114:4259`)는 분자만 `theme/destructed-default`(빨강)로 override되고 슬래시·분모는 `neutral/500` 그대로입니다 — Small 그룹의 `Destructed`와 정확히 같은 패턴 → **State4 = Destructed**

세 State 모두 "분자만 색이 바뀌고 슬래시·분모는 항상 `neutral/500` 고정"이라는 동일한 구조를 Small/Default 두 Size 그룹에서 공유하므로, 매칭에 모호함이 없습니다.

**Size 축의 실제 정체**: Small과 Default(Size)는 폰트 크기뿐 아니라 **weight도 다릅니다** — Small은 Caption2(10px) Medium(500), Default(Size)는 Caption1(12px) **Regular(400)**입니다. 노드 높이(16px vs 18px)는 각 lineHeight와 일치합니다.

## 3. 레이아웃 규칙

세 텍스트 조각(분자/`/`/분모)은 `flex items-center`로 나란히 배치되며 별도의 `gap` 클래스가 없습니다 — 즉 토큰화된 간격 없이 텍스트가 바로 붙어 "12/50" 형태로 표시됩니다. 노드 너비(42px/49px)는 placeholder 텍스트 "000/000"(7글자) 기준의 실측값이며, 실제 사용 시 글자 수 자릿수에 따라 너비가 가변적으로 변하는 content-hugging 요소로 추정됩니다(고정 너비 아님).

## 4. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`2114:3929`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. State 전환(Default→Typing→Destructed) 시 색상 트랜지션 애니메이션이 있을 것으로 추정되나, Figma 파일에 어떤 duration·easing 값도 정의되어 있지 않아 임의로 만들지 않았습니다 — 확인 필요.

## 5. 접근성

- 글자 수 초과(Destructed) 상태는 시각적 색상 변화만으로 표시되므로, 스크린리더 사용자에게는 `aria-live` 영역 등을 통해 "글자 수 초과" 같은 텍스트 안내가 별도로 필요할 수 있습니다 — Figma 파일에 규정 없음, 확인 필요.
- 색상만으로 상태를 구분하는 것은 색각 이상 사용자에게 정보 전달이 불충분할 수 있어(WCAG 1.4.1 색상 단독 사용 금지 원칙), 아이콘이나 텍스트 보강이 필요한지는 확인 필요.

## 6. 토큰 매칭 요약

**정확히 일치**
- Small 타이포 Caption2 Medium(10px/16px) → `Caption 2/10 M` 스타일
- Default(Size) 타이포 Caption1 Regular(12px/18px) → `Caption 1/12 R` 스타일
- Default(State) 분자 색상 `neutral/500`(#8c9199) → `sys-color-neutral-500`(두 Size 그룹 공통, 슬래시·분모도 항상 이 색)
- Typing 분자 색상 `neutral/700`(#454c58) → `sys-color-neutral-700`
- Destructed 분자 색상 `theme/destructed-default`(#e72f37) → `sys-color-theme-destructed-default`

**기존 토큰에 없음**
- Small/Default(Size) 조합 자체를 "Text Count 크기"로 지정하는 시맨틱 토큰은 저장소에 없음(개별 타이포 스타일 값은 토큰과 일치)

**확인 필요**
- Figma 소스의 `State6`/`State5`/`State4` 네이밍을 실제 의미 있는 이름(`Default`/`Typing`/`Destructed`)으로 Figma 파일 자체에서 정정할지 여부(디자이너 확인 필요)
- State 전환 시 색상 트랜지션 duration/easing (모션 데이터 없음)
- 접근성 `aria-live` 안내 필요 여부, 색상 단독 사용에 대한 보강 필요 여부

## 7. 샘플링에 사용한 노드 (부록, 6개 전수)

`2114:3928`(Small,Default) · `2114:3927`(Small,Typing) · `2114:3926`(Small,Destructed) · `2114:4251`(Default,State6→Default) · `2114:4255`(Default,State5→Typing) · `2114:4259`(Default,State4→Destructed)

변수 맵(`get_variable_defs`)은 컴포넌트 셋 `2114:3929`에서 사전 확보한 값을 재사용했으며(`neutral/500`, `letterSpacing/Caption`, `size/Caption2`, `weight/500`, `font/pretendard`, `paragraphSpacing/Caption2`, `lineHeight/Caption2`, `size/Caption1`, `weight/400`, `paragraphSpacing/Caption1`, `lineHeight/Caption1`, `neutral/700`, `theme/destructed-default`, `common/white-emphasis` 등), 모션(`get_motion_context`, recursive)은 이 문서 작성 과정에서 컴포넌트 셋 `2114:3929`에 별도로 1회 호출해 빈 결과를 확인했습니다.
