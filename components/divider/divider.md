# Divider

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2041-2838) — Component Set `2041:2838` ("Divider")
> 기계 판독용 값은 [`divider.json`](./divider.json)을 함께 참고합니다. 이 문서와 divider.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Divider는 **Height 축 하나만 가진 8-변형 컴포넌트 셋**입니다(`1/2/4/6/8/10/12/14px`). 8개 노드 전부 `get_design_context`로 개별 실측했고, `get_variable_defs`·`get_motion_context`는 컴포넌트 셋 전체에 각 1회 호출했습니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.
- **State(Hover/Pressed/Disabled) 축이 없습니다** — Avatar와 마찬가지로 인터랙션 상태를 갖지 않는 순수 표시용(non-interactive) 컴포넌트입니다.

## 1. 컴포넌트 개요

Divider는 화면 안에서 콘텐츠 영역을 시각적으로 구분하는 얇은 가로줄(rule) 컴포넌트입니다. 리스트 항목 사이, 섹션 구분 등에 쓰이는 아톰입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Height** | 1 / 2 / 4 / 6 / 8 / 10 / 12 / 14px | 구분선의 두께. 다른 축(색상/State/방향)은 없음 |

## 2. Height별 스펙 (8개 전체 실측)

| Height | 노드 | 두께 토큰 | 배경색 |
|---|---|---|---|
| **1px** | `2041:2834` | `borderwidth/02` = 1px (`ref-borderwidth-02`) | `neutral/100` = `#f6f7f7` |
| **2px** | `2041:2843` | `borderwidth/03` = 2px (`ref-borderwidth-03`) | 동일 |
| **4px** | `2041:2847` | `borderwidth/04` = 4px (`ref-borderwidth-04`) | 동일 |
| **6px** | `2041:2851` | `borderwidth/05` = 6px (`ref-borderwidth-05`) | 동일 |
| **8px** | `2041:2855` | `borderwidth/06` = 8px (`ref-borderwidth-06`) | 동일 |
| **10px** | `2041:2859` | `borderwidth/07` = 10px (`ref-borderwidth-07`) | 동일 |
| **12px** | `2041:2863` | `borderwidth/08` = 12px (`ref-borderwidth-08`) | 동일 |
| **14px** | `2041:2867` | `borderwidth/09` = 14px (`ref-borderwidth-09`) | 동일 |

모든 두께 값이 저장소 토큰(`tokens/radius.json`의 `borderWidth`)과 **정확히 일치**합니다(`ref-borderwidth-01`=0.5px만 이 컴포넌트 셋에 존재하지 않음 — Divider의 최솟값은 1px부터 시작). 배경색 `neutral/100`(`#f6f7f7`)은 저장소 `sys-color-neutral-100`(`ref-color-gray-100`)과 **정확히 일치**하며, 8개 Height 전부 동일한 색상을 씁니다.

**핵심 규칙**: Height 값과 `ref-borderwidth-0N` 토큰이 정확히 1:1로 대응합니다(1px→02, 2px→03, 4px→04 … 14px→09). 색상·radius·State 변형은 전혀 없고, 오직 두께만 8단계로 스케일링되는 가장 단순한 컴포넌트입니다.

## 3. 너비(가로) 규칙 — 확인 필요

실측한 8개 노드 모두 컨테이너 너비가 **고정 390px**로 렌더링되어 있습니다(내부 `Rectangle`은 `flex-[1_0_0]`로 부모를 꽉 채우도록 설정되어 있으나, 부모 자체가 390px 고정). 이 390px는 Figma의 컴포넌트 셋 진열 프레임(`2041:2838`, 전체 폭 430px에 좌우 20px 여백)의 폭과 일치하는 값이라, **실제 디자인 의도가 "항상 390px 고정"인지, 아니면 컨테이너에 맞춰 늘어나는(`width: 100%`) 것을 이 진열 프레임 크기로 보여준 것인지 Figma 파일만으로는 판단할 수 없습니다.** 구분선(rule) 컴포넌트의 일반적 관례상 부모 너비에 맞춰 늘어나는(`100%`) 설계일 가능성이 높지만, 임의로 단정하지 않고 확인 필요로 남깁니다.

## 4. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`2041:2838`, recursive=true)에 호출했으나 `motionSummary: null`, `codeSnippets: {}`인 빈 결과를 반환했습니다. Divider에는 State 축 자체가 없으므로(0장 참고), 이는 애초에 인터랙션이 정의될 이유가 없는 순수 표시용 컴포넌트임을 뒷받침합니다.

## 5. 접근성

- **의미론적 역할**: 순수 시각적 구분선이므로 스크린리더에 내용으로 읽히지 않아야 합니다. 웹 구현 시 `<hr>` 또는 `role="separator"`(+ `aria-hidden="true"` 필요 여부는 컨텍스트에 따름) 사용을 권장하나, Figma 파일 자체에는 접근성 role 규정이 없습니다 — 확인 필요.
- 색상 대비 등 WCAG 규정은 `docs/DESIGN.md`에 일반 원칙만 있고 Divider 전용 수치 검증은 이 조사에서 수행하지 않았습니다.

## 6. 토큰 매칭 요약

**정확히 일치**
- Height 8단계 전부 → `ref-borderwidth-02`~`ref-borderwidth-09`
- 배경색 `neutral/100`(`#f6f7f7`) → `sys-color-neutral-100`(`ref-color-gray-100`)

**기존 토큰에 없음**
- Height 8단계라는 스케일 자체(1/2/4/6/8/10/12/14px)를 "Divider 두께"로 지정하는 별도 시맨틱 토큰은 저장소에 없음(각 값 자체는 `ref-borderwidth-*`와 일치하지만, "Divider엔 이 스텝들을 쓴다"는 규칙은 문서화되어 있지 않음)

**확인 필요**
- 너비가 고정값인지 컨테이너에 맞춰 늘어나는지(3장 참고)
- 접근성 role/aria 규정
- WCAG 명암비 수치 검증

## 7. 샘플링에 사용한 노드 (부록, 8개 전수)

`2041:2834`(1px) · `2041:2843`(2px) · `2041:2847`(4px) · `2041:2851`(6px) · `2041:2855`(8px) · `2041:2859`(10px) · `2041:2863`(12px) · `2041:2867`(14px)

전체 변수 맵(`get_variable_defs`)과 모션(`get_motion_context`, recursive)은 컴포넌트 셋 `2041:2838`에 각 1회 호출해 확보했습니다.
