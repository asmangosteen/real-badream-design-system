# Trailing

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2555-11972) — Frame `2555:11972` ("Trailing"), 상위 그룹 `2555:16790`
> 기계 판독용 값은 [`trailing.json`](./trailing.json)을 함께 참고합니다. 이 문서와 trailing.json은 항상 같은 소스에서 나온 값이어야 합니다.
> 이 컴포넌트는 `components/navigation-bar/top/`에 위치합니다 — [Trailing Components](../trailing-components/trailing-components.md)를 1~3개 조합해 만들어지는 서브 아톰이며, [Top](../top/top.md) Navigation Bar 우측 영역에 쓰입니다.

## 0. 문서 범위와 샘플링 방법

Trailing은 **Number(1/2/3) 단일 축, 3-변형 컴포넌트**입니다. `get_metadata`로 3개 심볼을 전수 확인한 뒤, `get_design_context`를 최상위 프레임(`2555:11972`)에 1회 호출해 3개 변형 전체가 병합 코드로 반환된 것을 실측했습니다.

- `get_variable_defs`·`get_motion_context`는 상위 그룹(`2555:16790`, Navigation Bar 전체)에서 확보한 값을 재사용했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Trailing은 Navigation Bar 우측에 배치되는 **액션 아이템 묶음**입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **Number** | 1 / 2 / 3 | [Trailing Components](../trailing-components/trailing-components.md) 인스턴스 개수 |

**핵심 발견 — Mode 축이 Trailing 자체에는 없습니다.** 이 컴포넌트 단독으로는 항상 `Type=Icon, Mode=Light`의 Trailing Components만 인스턴스화합니다(`get_design_context` 병합 코드에서 Mode prop 자체가 노출되지 않음). [Top](../top/top.md)에서 Dark 모드로 조합될 때는 Top이 각 Trailing Components 인스턴스를 개별적으로 `Mode=Dark`로 재정의하는 방식입니다 — 즉 Trailing 자체는 "Light 전용 진열 샘플"이고, 실제 Mode 대응은 상위 [Top](../top/top.md) 컴포넌트가 담당합니다(확인 완료, top.md 참고).

## 2. Number별 스펙 (3개 전수 실측)

| Number | 구성 | 컨테이너 |
|---|---|---|
| **1** | [Trailing Components](../trailing-components/trailing-components.md) × 1 | `items-center justify-end pr=spacing/08`(12px) |
| **2** | × 2 | 동일 |
| **3** | × 3 | 동일 |

Trailing Components 인스턴스 간 별도 gap 클래스가 코드에 없어, 인스턴스 자체의 `py=spacing/04`(4px) 패딩이 서로 맞닿는 방식으로 배치됩니다.

## 3. 서브컴포넌트 재사용 관계

- **Trailing Components**: [`components/navigation-bar/top/trailing-components/trailing-components.md`](../trailing-components/trailing-components.md)를 1~3회 그대로 인스턴스화(Type=Icon, Mode=Light 고정, 1장 참고).
- **Top에서 재사용**: [`Top`](../top/top.md)이 Type에 따라 Number=1(Seg_back/Seg_close), 2(Smalltitle_back/Smalltitle_close), 3(Big Title/NoTitle_back/NoTitle_close)을 선택적으로 조합합니다 — 중앙 콘텐츠(Smalltitle 등)가 많을수록 Trailing 슬롯 수가 줄어드는 규칙입니다(top.md 3장 참고).

## 4. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 Navigation Bar 상위 그룹(`2555:16790`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다.

## 5. 접근성

- 각 Trailing Components 항목의 접근성 요구사항([trailing-components.md](../trailing-components/trailing-components.md) 6장)이 그대로 적용됩니다.
- 여러 액션이 나열되므로 `role="toolbar"` 또는 개별 `aria-label`로 각 항목을 구분하는 처리가 필요해 보이나 Figma 파일에 규정 없음 — 확인 필요.

## 6. 토큰 매칭 요약

**정확히 일치**
- 컨테이너 우측 패딩 `spacing/08`=12px → `ref-spacing-08`
- 내부 Trailing Components 스펙 전부 [trailing-components.md](../trailing-components/trailing-components.md)와 일치

**확인 완료**
- Trailing 자체에는 Mode 축이 없고 Top이 Mode 대응을 담당함(1장)

**확인 필요**
- 여러 액션 항목의 접근성 그룹핑(`role="toolbar"` 등) 규정

## 7. 샘플링에 사용한 3개 노드 (부록, 전수)

| Number | 노드 |
|---|---|
| 1 | `2555:11971` |
| 2 | `2555:11970` |
| 3 | `2555:11969` |

3개 변형 전체가 `get_design_context` 1회 호출(`2555:11972`)로 병합 코드로 반환되었습니다. `get_variable_defs`·`get_motion_context`는 Navigation Bar 상위 그룹(`2555:16790`)에서 공용으로 확보했습니다.
