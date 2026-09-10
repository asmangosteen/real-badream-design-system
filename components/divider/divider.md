# Divider

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2587-2620) — Component Set `2587:2620` ("Divider")
> 기계 판독용 값은 [`divider.json`](./divider.json)을 함께 참고합니다. 이 문서와 divider.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Divider는 **Type(Horizontal/Vertical) × Size(1/2/4/6/8/10/12/14px)의 2축, 16-변형 컴포넌트 셋**입니다. 16개 노드 전부 `get_design_context`로 개별 실측했고, `get_variable_defs`·`get_motion_context`는 컴포넌트 셋 전체에 각 1회 호출했습니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.
- **State(Hover/Pressed/Disabled) 축이 없습니다** — Avatar와 마찬가지로 인터랙션 상태를 갖지 않는 순수 표시용(non-interactive) 컴포넌트입니다.
- 이전 버전(컴포넌트 셋 `2041:2838`)은 Height 축 하나만 가진 8-변형이었으나, Figma 원본이 Type(Horizontal/Vertical) 축을 추가해 16-변형으로 개편되었습니다. 본 문서는 개편된 버전을 반영합니다.

## 1. 컴포넌트 개요

Divider는 화면 안에서 콘텐츠 영역을 시각적으로 구분하는 얇은 선(rule) 컴포넌트입니다. 리스트 항목 사이, 섹션 구분, 툴바 내 항목 구분 등에 쓰이는 아톰입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Type** | Horizontal / Vertical | 구분선의 방향 |
| **Size** | 1 / 2 / 4 / 6 / 8 / 10 / 12 / 14px | 구분선의 두께. 색상 축은 없음 |

**색상 오버라이드**: Figma 컴포넌트 셋 자체에는 색상 축이 없고 16개 변형 전부 기본값 `neutral/100`(`#f6f7f7`)을 씁니다. 다만 이 기본 색상은 고정 규칙이 아니라 **사용 맥락에 따라 언제든 자유롭게 오버라이드 가능한 속성**입니다(사용자 확인). 실사용 예시로 [Footer 컴포넌트](../footer/footer.md)는 내부 Divider 2곳(Main-Sub 구분선, Sub 링크 구분자)의 색상을 각각 `color/gray/900-10`, `neutral/400`으로 오버라이드해서 씁니다.

## 2. Type별 자유 치수(free dimension) 규칙

- **Horizontal**: 두께 = `height`, **너비(`width`)는 자유** — 부모 컨테이너 폭에 맞춰 늘어나는 `width: 100%` 설계.
- **Vertical**: 두께 = `width`, **높이(`height`)는 자유** — 부모 컨테이너 높이에 맞춰 늘어나는 `height: 100%` 설계.

실측 프레임 상에서는 Horizontal 16개 노드가 컨테이너 너비 390px로, Vertical 8개 노드가 컨테이너 높이 198px로 렌더링되어 있으나, 이는 **고정값이 아니라 Figma 컴포넌트 셋 진열 프레임(`2587:2620`)의 크기를 그대로 보여준 것**입니다. 내부 `Rectangle`이 `flex-[1_0_0]`로 부모를 꽉 채우도록 설정되어 있어, 실제 구현 시 각 Type의 자유 치수는 부모 컨테이너 크기에 맞춰 늘어납니다.

## 3. Size별 스펙 (16개 전체 실측)

| Size | Horizontal 노드 | Vertical 노드 | 두께 토큰 | 배경색 |
|---|---|---|---|---|
| **1px** | `2587:2619` | `2587:2609` | `borderwidth/02` = 1px (`ref-borderwidth-02`) | `neutral/100` = `#f6f7f7` |
| **2px** | `2587:2615` | `2587:2608` | `borderwidth/03` = 2px (`ref-borderwidth-03`) | 동일 |
| **4px** | `2587:2611` | `2587:2618` | `borderwidth/04` = 4px (`ref-borderwidth-04`) | 동일 |
| **6px** | `2587:2617` | `2587:2606` | `borderwidth/05` = 6px (`ref-borderwidth-05`) | 동일 |
| **8px** | `2587:2614` | `2587:2613` | `borderwidth/06` = 8px (`ref-borderwidth-06`) | 동일 |
| **10px** | `2587:2616` | `2587:2610` | `borderwidth/07` = 10px (`ref-borderwidth-07`) | 동일 |
| **12px** | `2587:2607` | `2587:2605` | `borderwidth/08` = 12px (`ref-borderwidth-08`) | 동일 |
| **14px** | `2587:2612` | `2587:2604` | `borderwidth/09` = 14px (`ref-borderwidth-09`) | 동일 |

모든 두께 값이 저장소 토큰(`tokens/radius.json`의 `borderWidth`)과 **정확히 일치**합니다(`ref-borderwidth-01`=0.5px만 이 컴포넌트 셋에 존재하지 않음 — Divider의 최솟값은 1px부터 시작). 배경색 `neutral/100`(`#f6f7f7`)은 저장소 `sys-color-neutral-100`(`ref-color-gray-100`)과 **정확히 일치**하며, Horizontal/Vertical 16개 변형 전부 동일한 색상을 씁니다.

**핵심 규칙**: Size 값과 `ref-borderwidth-0N` 토큰이 정확히 1:1로 대응합니다(1px→02, 2px→03, 4px→04 … 14px→09). 이 매핑은 Type(Horizontal/Vertical)과 무관하게 동일합니다. 색상·radius·State 변형은 전혀 없고, Type(방향) + Size(두께)만 조합되는 단순한 컴포넌트입니다.

## 4. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 컴포넌트 셋 전체(`2587:2620`, recursive=true)에 호출했으나 빈 결과(`nodes: []`)를 반환했습니다. Divider에는 State 축 자체가 없으므로(0장 참고), 이는 애초에 인터랙션이 정의될 이유가 없는 순수 표시용 컴포넌트임을 뒷받침합니다.

## 5. 접근성

- **의미론적 역할**: 순수 시각적 구분선이므로 스크린리더에 내용으로 읽히지 않아야 합니다. 웹 구현 시 `<hr>`(Horizontal) 또는 `role="separator"`(Vertical 포함, `aria-orientation` 지정 권장) 사용을 권장하나, Figma 파일 자체에는 접근성 role 규정이 없습니다 — 확인 필요.
- 색상 대비 등 WCAG 규정은 `docs/DESIGN.md`에 일반 원칙만 있고 Divider 전용 수치 검증은 이 조사에서 수행하지 않았습니다.

## 6. 토큰 매칭 요약

**정확히 일치**
- Size 8단계 전부, Horizontal/Vertical 공통 → `ref-borderwidth-02`~`ref-borderwidth-09`
- 배경색 `neutral/100`(`#f6f7f7`) → `sys-color-neutral-100`(`ref-color-gray-100`)
- Horizontal 너비 / Vertical 높이 = 자유 치수(부모 컨테이너에 맞춰 늘어남, 2장 참고)

**기존 토큰에 없음**
- Size 8단계라는 스케일 자체(1/2/4/6/8/10/12/14px)를 "Divider 두께"로 지정하는 별도 시맨틱 토큰은 저장소에 없음(각 값 자체는 `ref-borderwidth-*`와 일치하지만, "Divider엔 이 스텝들을 쓴다"는 규칙은 문서화되어 있지 않음)

**확인 필요**
- 접근성 role/aria 규정 (특히 Vertical의 `aria-orientation`)
- WCAG 명암비 수치 검증

## 7. 샘플링에 사용한 노드 (부록, 16개 전수)

**Horizontal**: `2587:2619`(1px) · `2587:2615`(2px) · `2587:2611`(4px) · `2587:2617`(6px) · `2587:2614`(8px) · `2587:2616`(10px) · `2587:2607`(12px) · `2587:2612`(14px)

**Vertical**: `2587:2609`(1px) · `2587:2608`(2px) · `2587:2618`(4px) · `2587:2606`(6px) · `2587:2613`(8px) · `2587:2610`(10px) · `2587:2605`(12px) · `2587:2604`(14px)

전체 변수 맵(`get_variable_defs`)과 모션(`get_motion_context`, recursive)은 컴포넌트 셋 `2587:2620`에 각 1회 호출해 확보했습니다.
