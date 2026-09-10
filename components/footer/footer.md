# Footer

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2589-16887) — Component Set `2589:16887` ("Footer")
> 기계 판독용 값은 [`footer.json`](./footer.json)을 함께 참고합니다. 이 문서와 footer.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Footer는 **State 축 하나(Close/Open)만 가진 2-변형 컴포넌트 셋**입니다. 2개 노드 전부 `get_design_context`로 개별 실측했고, `get_variable_defs`·`get_motion_context`는 컴포넌트 셋 전체에 각 1회 호출했습니다.

- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.
- **인터랙션 동작(0장 하단)은 사용자 확인 사항**입니다: Figma `get_motion_context`는 두 State 모두 빈 결과(`nodes: []`)를 반환해 프로토타입 트랜지션 데이터가 없으며, 아래 토글 동작은 사용자가 직접 알려준 사양입니다.

## 1. 컴포넌트 개요

Footer는 **바드림 앱 홈 화면 최하단에만 적용되는 전용 컴포넌트**입니다(사용자 확인 — 강한 제약사항, 다른 화면에 범용으로 재사용하지 않음). 사업자 정보(대표자·사업자등록번호 등)를 아코디언 형태로 접었다 펼 수 있고, 하단에 이용약관·개인정보처리방침·사업자정보확인 링크와 저작권 문구를 상시 노출합니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **State** | Close / Open | 사업자 정보(Information) 영역의 펼침 여부 |

**기본 상태는 Close이며, Header(`CYCLOID Corp. 사업자 정보`) 영역을 누르면 Open으로 펼쳐집니다. Open 상태에서 Header를 다시 누르면 동일하게 Close로 되돌아갑니다(토글, 사용자 확인).** Header 자체가 유일한 트리거이며, Close/Open 두 State 모두 Header는 항상 노출됩니다.

## 2. 구조 (State 공통)

Footer는 세로로 쌓인 3개 블록으로 구성되며, Close/Open은 가운데 `Information` 블록의 유무만 다릅니다.

```
Footer
├─ Main
│   ├─ Header  (상시 노출 — 라벨 + chevron 아이콘, 탭하면 State 토글)
│   └─ Information  (Open 상태에만 존재 — 사업자 정보 6행)
├─ Divider  (Horizontal, 1px)
└─ Sub
    ├─ 기타정보  (이용약관 | 개인정보처리방침 | 사업자정보확인, Divider Vertical로 구분)
    └─ 저작권 문구
```

## 3. State별 스펙 (2개 전체 실측)

| State | 노드 | 컨테이너 높이 | Header 아이콘 | Information |
|---|---|---|---|---|
| **Close** | `2589:16885` | 212px | `chevron_down`(닫힘 표시) | 없음 |
| **Open** | `2589:16886` | 334px | `chevron_up`(열림 표시) | 6행 노출 |

높이 차이(212px→334px, +122px)는 Information 블록(118px) + Main 내부 gap(spacing/04=4px) 추가분과 정확히 일치합니다. Header/Divider/Sub 블록의 레이아웃과 크기는 두 State에서 동일합니다.

### 3-1. Header

| 속성 | 값 |
|---|---|
| 라벨 텍스트 | `CYCLOID Corp. 사업자 정보` |
| 타이포 | Caption1/12 Medium (`size/Caption1`=12px, `weight/500`, `lineHeight/Caption1`=18px, `letterSpacing/Caption`=-0.03px) |
| 텍스트 색상 | `neutral/500` = `#8c9199` |
| 아이콘 | `Icon / Default / 16px / chevron_down`(Close) / `chevron_up`(Open), 16×16px |
| 라벨-아이콘 gap | `spacing/02` = 2px |

### 3-2. Information (Open 전용, 6행 전수 실측)

| 행 | 라벨 | 값(예시 데이터) |
|---|---|---|
| 1 | 대표자 | 권준일 |
| 2 | 사업자등록번호 | 815-81-03223 |
| 3 | 통신판매업신고번호 | 제 2023-서울마포-3590 호 |
| 4 | 주소 | 서울 광진구 광나루로 478 105호 |
| 5 | 운영시간 | 09:00 - 18:00 |
| 6 | 대표번호 | 010-6243-3223 |
| 7 | 고객문의 | contact@ba-dream.com |

(Figma 레이어 순서 기준 7행 — 대표자/사업자등록번호/통신판매업신고번호/주소/운영시간/대표번호/고객문의)

- 라벨: Caption2/10 Semibold, 값: Caption2/10 Regular — 둘 다 색상 `neutral/500`
- 라벨-값 gap: `spacing/04` = 4px (가로 배치, 값 영역은 `flex-1`로 나머지 폭 채움)
- 행간 gap: `spacing/01` = 1px
- 실제 값은 표시용 예시 데이터이며, 실 서비스 사업자 정보로 교체되어야 함(하드코딩 금지 대상)

### 3-3. Divider (Main과 Sub 사이)

- 두께 1px = `ref-borderwidth-02`, 방향 Horizontal, 너비는 부모(350px)에 맞춰 늘어남
- **배경색이 [Divider 컴포넌트](../divider/divider.md)의 기본값(`neutral/100`)이 아닌 `color/gray/900-10`(`rgba(3,9,26,0.1)`)로 오버라이드됨** — Divider 색상은 컴포넌트 자체가 상황에 맞춰 언제든 변경 가능한 속성이며(사용자 확인), 이 값은 Footer에서 쓰인 예시 오버라이드일 뿐 고정값이 아님

### 3-4. Sub

| 속성 | 값 |
|---|---|
| 기타정보 링크 | 이용약관 · 개인정보처리방침 · 사업자정보확인 (Caption2/10 Semibold, `neutral/500`) |
| 링크 구분자 | [Divider 컴포넌트](../divider/divider.md) Vertical, 높이 11px, 두께 1px(`ref-borderwidth-02`) — **배경색이 Divider 기본값이 아닌 `neutral/400`(`#c2c4c8`)로 오버라이드됨**(자유 변경 가능한 속성, 사용자 확인) |
| 링크 gap | `spacing/04` = 4px |
| 저작권 문구 | `ⓒ 2026. CYCLOID Corp. All rights reserved.` (Caption2/10 Regular, `neutral/500`) |
| 기타정보-저작권 gap | `spacing/01` = 1px |

## 4. 레이아웃(간격) 스펙

| 속성 | 토큰 | 값 |
|---|---|---|
| 바깥 배경색 | `neutral/200` | `#f1f2f3` |
| 좌우 padding | `spacing/11` | 20px |
| 위 padding | `spacing/11` | 20px |
| **아래 padding** | `spacing/22` | **120px** |
| Main/Divider/Sub 블록 간 gap | `spacing/07` | 10px |
| 콘텐츠 너비 | — | 350px (부모 390px 기준, 좌우 20px 마진) |

**아래 padding 120px은 Footer만의 의도된 예외입니다(사용자 확인).** 저장소 `tokens/spacing.json`의 모바일 그리드 규칙(`scrollRule`)은 스크롤 화면 하단 padding을 40px(`ref-spacing-16`)로 규정하지만, Footer는 홈 화면에 추후 추가될 **Bottom Navigation Bar와 겹치지 않도록 여유 공간을 미리 확보**하기 위해 120px(`ref-spacing-22`)을 예외적으로 적용합니다. 다른 컴포넌트에 이 값을 일반화하지 않습니다.

콘텐츠 너비 350px은 Figma 진열 프레임이 iPhone 14 기준 화면(390px, 좌우 20px 마진, `docs` 그리드 규칙과 일치)을 보여준 것입니다. Footer는 홈 화면 전용 컴포넌트이므로(1장) Divider처럼 임의 컨테이너 폭에 맞춰 늘어나는 범용 100% 설계인지, 아니면 화면 폭 고정 설계인지는 이 조사만으로 단정하지 않습니다 — 확인 필요.

## 5. 인터랙션 스펙

**Figma 프로토타입 모션 데이터 없음.** `get_motion_context`를 컴포넌트 셋 전체(`2589:16887`, recursive=true)에 호출했으나 `nodes: []`인 빈 결과를 반환했습니다 — Close/Open은 정적 스냅샷 2개로만 존재하고 전환 애니메이션(easing/duration)은 Figma에 정의되어 있지 않습니다.

**State 전환 규칙(사용자 확인)**:
- 기본 State는 **Close**
- **Header를 탭하면 Close → Open**
- **Open 상태에서 Header를 다시 탭하면 Open → Close** (동일한 토글 동작)
- Header 외 다른 영역(Information, Divider, Sub의 링크)은 State 토글과 무관 — 기타정보 링크는 각자 별도 페이지/모달로 이동하는 액션으로 추정되나 이 조사에서는 검증하지 않음(확인 필요)

## 6. 사용 제약사항

**Footer는 바드림 앱 홈 화면 최하단에만 적용되는 컴포넌트입니다(사용자 확인 — 강한 제약사항).** [Navigation Bar Top의 Home 타입](../navigation-bar/top/leading/leading.md)과 마찬가지로 범용 재사용 대상이 아니며, 다른 화면에 동일 컴포넌트를 배치하지 않습니다.

## 7. 접근성

- Header는 탭 가능한 토글 트리거이므로 버튼 역할(`role="button"`, `aria-expanded`)과 포커스 가능 여부가 필요하나, Figma 파일 자체에는 접근성 role 규정이 없습니다 — 확인 필요.
- 기타정보 3개 링크는 실제 네비게이션 액션이 있는 링크로 추정되며 `<a>` 또는 이에 준하는 시맨틱 마크업이 필요합니다 — 확인 필요.
- 색상 대비 등 WCAG 규정은 `docs/DESIGN.md`에 일반 원칙만 있고 Footer 전용 수치 검증은 이 조사에서 수행하지 않았습니다.

## 8. 토큰 매칭 요약

**정확히 일치**
- 배경색 `neutral/200`(`#f1f2f3`) → `sys-color-neutral-200`(`ref-color-gray-200`)
- 텍스트 색상 `neutral/500`(`#8c9199`) → `sys-color-neutral-500`(`ref-color-gray-500`)
- Divider(Sub 링크 구분자) 오버라이드 색상 `neutral/400`(`#c2c4c8`) → `sys-color-neutral-400`(`ref-color-gray-400`), Divider 색상은 언제든 자유 교체 가능한 속성(사용자 확인)
- Divider(Main-Sub 구분선) 오버라이드 색상 `color/gray/900-10`(`rgba(3,9,26,0.1)`) → `ref-color-alpha-gray-900-10`, 동일하게 자유 교체 가능(사용자 확인)
- 좌우/위 padding `spacing/11`(20px), 블록 간 gap `spacing/07`(10px), 세부 gap `spacing/01`(1px)·`spacing/02`(2px)·`spacing/04`(4px) → 전부 저장소 `tokens/spacing.json`의 `ref-spacing-*`와 일치
- 아래 padding `spacing/22`(120px) → `ref-spacing-22`, Footer 전용 의도된 예외(Bottom Navigation Bar 대비 여유 공간, 사용자 확인) — 4장 참고
- Divider 두께 1px → `ref-borderwidth-02` ([Divider 컴포넌트](../divider/divider.md) 참고)
- 타이포 Caption1/12 Medium, Caption2/10 Semibold/Regular → `tokens/typography.json`과 일치

**기존 토큰에 없음 / 확인 필요**
- Header 탭 시 State 전환 애니메이션(easing/duration) — Figma 프로토타입 데이터 없음, 구현 시 별도 정의 필요
- 접근성 role/aria(`aria-expanded` 등) 규정

## 9. 샘플링에 사용한 노드 (부록, 2개 전수)

`2589:16885`(Close) · `2589:16886`(Open)

전체 변수 맵(`get_variable_defs`)과 모션(`get_motion_context`, recursive)은 컴포넌트 셋 `2589:16887`에 각 1회 호출해 확보했습니다.
