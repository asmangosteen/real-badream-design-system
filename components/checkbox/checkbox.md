# Checkbox

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2483-12499) — 캔버스 그룹 `2483:12499` 안에 2개의 개별 Component Set이 있음
> 기계 판독용 값은 [`checkbox.json`](./checkbox.json)을 함께 참고합니다. 이 문서와 checkbox.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Checkbox는 Badge와 마찬가지로 **하나가 아니라 2개의 독립된 Component Set**으로 구성됩니다.

| Component Set | 노드 ID | 변형 수 | 축 구성 |
|---|---|---|---|
| Checkbox / Angular | `2173:6696` | 12 | Checked(False/True) × Indeterminate(Off/On, Checked=True에서만 의미 있음) × State(Default/Hover/Pressed/Disabled) |
| Checkbox / Rounded | `2173:6709` | 12 | Checked(False/True) × Outlined(True/False, Checked=False에서만 의미 있음) × State(Default/Hover/Pressed/Disabled) |

Button/Badge와 달리 Checkbox는 **총 24개뿐**이라 두 Component Set의 **전체 24개 변형을 모두 개별 실측**했습니다(`get_design_context` 24회 + `get_variable_defs`·`get_motion_context`·`get_metadata` 각 1회, 상위 그룹 `2483:12499` 기준). 추정이나 패턴 외삽 없이 모든 값이 직접 실측 확인된 값입니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요"로 명시합니다.
- Checkbox에는 **Size 축이 없습니다** — Angular/Rounded 둘 다 16×16px 고정 크기 하나뿐입니다(Button/Badge의 S/M/L 스케일과 다른 점).

## 1. 컴포넌트 개요

Checkbox는 폼 요소에서 다중 선택·동의·전체선택 등에 쓰이는 체크 입력 컴포넌트입니다. 두 가지 시각적 스타일이 있습니다.

- **Angular**: 사각형(radius 4px) 체크박스. 미선택/선택/부분선택(Indeterminate) 3가지 콘텐츠 상태를 가짐.
- **Rounded**: 원형(radius 999px) 체크박스. Indeterminate 없이 미선택/선택만 가지며, 미선택 상태에 테두리 유무(Outlined) 변형이 추가로 있음.

| 축(Axis) | Angular 값 | Rounded 값 | 의미 |
|---|---|---|---|
| **Checked** | False / True | False / True | 선택 여부 |
| **Indeterminate** (Angular만) | Off / On | — | Checked=True일 때만 의미 있음. On이면 체크 대신 "－"(minus) 아이콘 표시(부분 선택 상태) |
| **Outlined** (Rounded만) | — | True / False | Checked=False일 때만 의미 있음. True=테두리 있는 흰 배경, False=테두리 없는 연한 회색 배경 |
| **State** | Default / Hover / Pressed / Disabled | Default / Hover / Pressed / Disabled | 상호작용 피드백. **Focused 상태가 정의되어 있지 않음**(7장 참고) |

**Figma 명명 오탈자 2건 발견** (기능에는 영향 없음, 문서에는 실측값 그대로 기재):
- Angular의 Hover 상태 변형들은 `Checked` 속성값이 `True`가 아니라 리터럴 `"Hover"`로 등록되어 있습니다(예: `Checked=Hover, Indeterminate=Off, State=Hover`). Checked=False Hover는 정상적으로 `Checked=False`로 등록되어 있어, True 계열에서만 발생한 오탈자로 보입니다.
- Rounded의 모든 `Disabled` 상태 변형은 `State` 속성값이 `Deisabled`(오탈자)로 등록되어 있습니다. Angular의 Disabled는 정상 표기(`Disabled`)입니다.

## 2. 공통 스펙 (Angular/Rounded 동일)

| 항목 | 값 | 토큰 | 매칭 여부 |
|---|---|---|---|
| 전체 크기 | 16×16px (고정, Size 축 없음) | 기존 토큰에 없음 | — |
| Angular radius | `radius/02` = 4px | `ref-radius-02` | **정확히 일치** |
| Rounded radius | `radius/12` = 999px | `ref-radius-12` | **정확히 일치** |
| Angular 아이콘 크기 | 16×16px (컨테이너 전체를 채움) | — | — |
| Rounded 아이콘 크기 | 12×12px (컨테이너보다 작게, 중앙 정렬) | — | — |

Angular와 Rounded는 아이콘 크기가 다릅니다 — Angular는 체크/마이너스 아이콘이 박스 전체(16px)를 채우고, Rounded는 원 안에 작은 아이콘(12px)이 중앙 배치됩니다.

## 3. 색상 · State별 스펙

### 3-1. Checkbox / Angular

**Checked=False (미선택)** — 기준 실측: `2173:6695`(Default) · `2173:6691`(Hover) · `2173:6693`(Pressed) · `2173:6690`(Disabled)

| State | 배경 | 테두리 | 비고 |
|---|---|---|---|
| Default | `common/white-default` `#fdfdfd` | 1px `color/gray/900-10` = `rgba(3,9,26,0.1)` | — |
| Hover | Default와 동일 | Default와 동일 | `cursor: pointer`만 추가, **색상 변화 없음** |
| Pressed | Default와 동일 | Default와 동일 | **색상 변화 전혀 없음** — 눌림 피드백이 시각적으로 구현되어 있지 않음 |
| Disabled | Default와 동일(흰색 유지) | 1px `color/gray/900-5` = `rgba(3,9,26,0.05)` (10%→5%로 더 옅어짐) | Button의 "opacity 20%" 방식과 다르게, **테두리 알파 자체를 낮추는 방식**으로 비활성 표현 |

**Checked=True, Indeterminate=Off (체크)** — 기준 실측: `2173:6688`(Default) · `2173:6692`(Hover) · `2173:6694`(Pressed) · `2173:6689`(Disabled)

| State | 배경 | 아이콘 | 비고 |
|---|---|---|---|
| Default | `brand/primary-default` `#2c7be2` | `Icon / Default / 16px / check` | 테두리 없음 |
| Hover | `brand/primary-default` 위에 `color/interaction/blue/hover`(`#0D2D57` 15%, `rgba(13,45,87,0.15)`) 오버레이 | 동일 | 배경이 2겹 `linear-gradient`(오버레이+베이스)로 합성 렌더링됨 — Button Primary Hover와 동일한 메커니즘(`interaction/blue`) |
| Pressed | `color/interaction/blue/pressed`(`#0D2D57` 30%) 오버레이 | 동일 | Button Primary Pressed와 동일 토큰 |
| Disabled | `neutral/400` `#c2c4c8` (단색으로 교체, 오버레이 아님) | 동일 아이콘 유지 | Button의 opacity 방식이 아니라 **배경색 자체를 회색 단색으로 교체**하는 방식 |

**Checked=True, Indeterminate=On (부분선택)** — 기준 실측: `2173:6687`(Default) · `2173:6685`(Hover) · `2173:6686`(Pressed) · `2173:6684`(Disabled)

색상·오버레이 메커니즘은 Indeterminate=Off와 **완전히 동일**하며, 아이콘만 `Icon / Default / 16px / check` 대신 `Icon / Default / 16px / minus`로 교체됩니다.

### 3-2. Checkbox / Rounded

**Checked=False, Outlined=True (테두리 있는 원)** — 기준 실측: `2173:6708`(Default) · `2173:6706`(Hover) · `2173:6698`(Pressed) · `2173:6705`(Disabled)

| State | 배경 | 테두리 | 비고 |
|---|---|---|---|
| Default | `common/white-default` | 1px `color/gray/900-10` | 아이콘 슬롯(`Icon / Default / 12px / check`)이 구조적으로는 항상 존재하나, 실제 스크린샷상 미선택 상태에서는 육안으로 보이지 않음(6장 참고) |
| Hover | `common/white-default` 위에 `color/interaction/light-gray/hover`(`gray-900` 5%) 오버레이 | 변화 없음 | Button Tertiary(라이트) Hover와 동일 토큰(`interaction/light-gray`) |
| Pressed | `interaction/light-gray/pressed`(`gray-900` 10%) 오버레이 | 변화 없음 | — |
| Disabled | 변화 없음(흰색 유지) | `color/gray/900-5`로 옅어짐(10%→5%) | Angular 미선택 Disabled와 동일 패턴. 내부 아이콘 애셋도 별도 파일로 교체됨(6장 참고) |

**Checked=False, Outlined=False (테두리 없는 연한 회색 원)** — 기준 실측: `2173:6707`(Default) · `2173:6703`(Hover) · `2173:6704`(Pressed) · `2173:6702`(Disabled)

| State | 배경 | 비고 |
|---|---|---|
| Default | `neutral/100` `#f6f7f7` | 테두리 없음 |
| Hover | `neutral/100` 위에 `interaction/light-gray/hover`(5%) 오버레이 | — |
| Pressed | `interaction/light-gray/pressed`(10%) 오버레이 | — |
| Disabled | **Default와 배경이 완전히 동일**(`neutral/100`, 변화 없음) | Outlined=True와 달리 배경/테두리 변화가 전혀 없고, 내부(비가시) 아이콘 애셋만 교체됨 — 실측으로 확인된 사실이며 의도적인지는 확인 필요 |

**Checked=True (항상 Outlined=False)** — 기준 실측: `2173:6700`(Default) · `2173:6699`(Hover) · `2173:6701`(Pressed) · `2173:6697`(Disabled)

| State | 배경 | 아이콘 | 비고 |
|---|---|---|---|
| Default | `brand/primary-default` `#2c7be2` | `Icon / Default / 12px / check` (선택 시 실제로 보이는 체크) | — |
| Hover | `interaction/blue/hover`(15%) 오버레이 | 동일 | Angular Checked=True Hover와 동일 토큰·메커니즘 |
| Pressed | `interaction/blue/pressed`(30%) 오버레이 | 동일 | — |
| Disabled | `neutral/400` `#c2c4c8` (단색 교체) | 동일 | Angular Checked=True Disabled와 동일 패턴 |

**참고**: Rounded는 935개 심볼 목록 같은 전수 조사가 필요 없을 만큼 작은 셋이라, Checked=True 조합에는 Outlined=True 변형이 아예 존재하지 않음을 12개 전수 확인으로 검증했습니다(테두리 유무는 미선택 상태에만 의미가 있는 축).

## 4. 인터랙션 오버레이 토큰 요약

| 상황 | 토큰 | Hover | Pressed |
|---|---|---|---|
| 채워진 배경(Checked=True, 파란색) | `color/interaction/blue` | `#0D2D57` 15% | `#0D2D57` 30% |
| 흰/연회색 배경(Checked=False) | `color/interaction/light-gray` | `#03091A` 5% | `#03091A` 10% |

두 토큰 모두 `docs/DESIGN.md`·`tokens/colors.json`의 `interaction.blue`/`interaction.light-gray` 계열과 **정확히 일치**하며, Button 문서(5-2절)에서 Primary/Tertiary(라이트)에 쓰인 것과 동일한 패밀리입니다.

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 상위 그룹(`2483:12499`, recursive=true)에 호출했으나 빈 결과(`{"nodes":[]}`)를 반환했습니다. 프로토타입 인터랙션(스마트 애니메이트, 트랜지션, 체크 애니메이션)이 Figma 파일 안에 정의되어 있지 않습니다. State 간 색상/배경 값 자체는 3장에 실측되어 있으나 전환 duration/easing은 확인 필요이며 임의로 만들지 않았습니다.

## 6. 아이콘 애셋 관련 관찰 사항 (확인 필요)

- Rounded의 모든 변형(Outlined=True/False, Checked=False/True 불문)에는 `Icon / Default / 12px / check`라는 이름의 자식 레이어가 **구조적으로 항상 존재**합니다. 그런데 실제 스크린샷에서는 Checked=False 상태에서 아이콘이 전혀 보이지 않습니다.
- 각 State/변형마다 서로 다른 SVG 애셋 URL이 발급되는 것으로 보아(예: Default용 애셋과 Disabled용 애셋이 다른 파일), 아이콘 자체가 상태별로 "보이는 체크" ↔ "투명/배경색과 동일한 색으로 구워진 고스트 아이콘" 두 종류로 미리 렌더링되어 교체되는 구조로 추정됩니다.
- 다만 이 추정은 SVG 내부 fill 값을 직접 디코딩해 확인한 것이 아니므로 **확인 필요**로 남깁니다(Badge/Button Spinner 문서와 동일한 한계).
- Angular는 이런 구조가 없습니다 — Checked=False에는 아이콘 레이어 자체가 존재하지 않고, Checked=True일 때만 아이콘이 렌더링됩니다.

## 7. 접근성

- **Focused 상태 없음**: Figma 컴포넌트의 State 축에 Default/Hover/Pressed/Disabled 4종만 있고 **키보드 포커스 상태(Focused)가 정의되어 있지 않습니다**. 키보드로 체크박스를 조작할 때 포커스 링/아웃라인이 어떻게 표시되어야 하는지 Figma 파일 안에 명시된 바가 없습니다 — 구현 시 별도의 접근성 포커스 스타일이 필요하며, 디자이너 확인이 필요합니다.
- **Pressed 상태의 시각 피드백 부재(Angular 미선택)**: Angular Checked=False의 Pressed 상태가 Default와 완전히 동일해, 마우스/터치 다운 시 사용자에게 아무런 시각적 피드백이 없습니다 — 의도적인지 확인 필요.
- **Indeterminate의 ARIA 매핑**: 체크박스 구현 시 Indeterminate=On은 HTML `input[type=checkbox]`의 `indeterminate` DOM 프로퍼티(및 `aria-checked="mixed"`)로 매핑해야 합니다. Figma 파일 자체에는 이 규정이 문서화되어 있지 않으므로 일반적인 웹 접근성 규약을 따르는 것을 권장합니다.
- **최소 터치 영역**: 16×16px는 44px 권장 기준보다 훨씬 작습니다. Button 문서에서도 동일한 이슈가 있었으며, 실제 구현 시 라벨 텍스트를 포함한 클릭 가능 영역 확장(hit area 확장)이 필요할 것으로 보이나 Figma 파일에 명시된 규정은 없습니다 — 확인 필요.

## 8. 토큰 매칭 요약

**정확히 일치**
- Angular radius 4px → `ref-radius-02`
- Rounded radius 999px → `ref-radius-12`
- 미선택 테두리 `color/gray/900-10`(10%), Disabled 시 `color/gray/900-5`(5%) → `ref-color-alpha-gray-900-10`/`-5`
- 선택 시 배경 `brand/primary-default`(`#2c7be2`) → `sys-color-brand-primary-default`(`ref-color-blue-500`)
- Disabled 선택 상태 배경 `neutral/400`(`#c2c4c8`) → `sys-color-neutral-400`(`ref-color-gray-400`)
- Rounded 미선택(Outlined=False) 배경 `neutral/100`(`#f6f7f7`) → `sys-color-neutral-100`(`ref-color-gray-100`)
- Hover/Pressed 오버레이 → `interaction/blue`(15%/30%), `interaction/light-gray`(5%/10%) — `tokens/colors.json`과 정확히 일치

**기존 토큰에 없음**
- 전체 크기 16×16px 고정값(Size 축 자체가 없음)
- Rounded 내부 아이콘 12px(Angular의 16px과 다른 고정값)

**확인 필요**
- Rounded 미선택 상태의 "항상 존재하는 숨겨진 체크 아이콘 레이어" 구조와 실제 fill/visibility 값
- Focused 상태가 정의되지 않은 것에 대한 접근성 대응 방안
- Angular 미선택 Pressed에 시각 피드백이 없는 것이 의도적인지
- Rounded Outlined=False Disabled가 Default와 완전히 동일한 배경을 유지하는 것이 의도적인지
- 최소 터치 영역 확장 규정 여부

## 9. 샘플링에 사용한 노드 (부록, 24개 전수)

**Angular** (`2173:6696`):
Checked=False: `2173:6695`(Default) · `2173:6691`(Hover) · `2173:6693`(Pressed) · `2173:6690`(Disabled)
Checked=True, Indeterminate=Off: `2173:6688`(Default) · `2173:6692`(Hover) · `2173:6694`(Pressed) · `2173:6689`(Disabled)
Checked=True, Indeterminate=On: `2173:6687`(Default) · `2173:6685`(Hover) · `2173:6686`(Pressed) · `2173:6684`(Disabled)

**Rounded** (`2173:6709`):
Checked=False, Outlined=True: `2173:6708`(Default) · `2173:6706`(Hover) · `2173:6698`(Pressed) · `2173:6705`(Disabled)
Checked=False, Outlined=False: `2173:6707`(Default) · `2173:6703`(Hover) · `2173:6704`(Pressed) · `2173:6702`(Disabled)
Checked=True: `2173:6700`(Default) · `2173:6699`(Hover) · `2173:6701`(Pressed) · `2173:6697`(Disabled)

전체 변수 맵(`get_variable_defs`)과 모션(`get_motion_context`, recursive)은 상위 그룹 `2483:12499`에 각 1회 호출해 확보했습니다. 2개 Component Set 전체 구조는 `get_metadata`(`2483:12499`)로 1회 확인했습니다.
