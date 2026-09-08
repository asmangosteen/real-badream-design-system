# Status Bar

> Figma 파일: [바드림 Design System](https://www.figma.com/design/2OcDq1pJgavJMLHvsdpf8S/%EB%B0%94%EB%93%9C%EB%A6%BC-Design-System?node-id=2551-9511) — 진열 프레임 `2551:9511` ("Status Bar")
> 기계 판독용 값은 [`status-bar.json`](./status-bar.json)을 함께 참고합니다. 이 문서와 status-bar.json은 항상 같은 소스에서 나온 값이어야 합니다.

## 0. 문서 범위와 샘플링 방법

Status Bar는 **OS(iOS/Android) × Mode(Light/Dark) × Background(Off/On) 3축, 8-변형 컴포넌트**로 완전 직교(2×2×2=8)입니다. 8개 전수를 `get_design_context`로 개별 실측했습니다.

- `get_metadata`로 8개 심볼을 전수 확인한 뒤, 8개 노드 전부 개별 실측했습니다.
- `get_variable_defs`는 진열 프레임 전체(`2551:9511`)에 1회 호출했습니다.
- `get_motion_context`를 진열 프레임 전체(`2551:9511`, recursive=true)에 호출해 빈 결과(`{"nodes":[]}`)를 확인했습니다.
- 절대 추측으로 토큰명을 만들지 않았습니다. 저장소 `tokens/*.json`에 없는 값은 "확인 필요" 또는 "기존 토큰에 없음"으로 명시합니다.

## 1. 컴포넌트 개요

Status Bar는 화면 목업/프로토타입 상단에 얹는 **기기 상태바(시간·통신·배터리 등) 목업**입니다. State(Hover/Pressed/Disabled) 축이 없는 순수 표시용 컴포넌트이며, 실제 인터랙션 요소가 아니라 화면 디자인 시 상단에 얹어 실제 기기처럼 보이게 하는 장식용 프레임입니다.

| 축(Axis) | 값 | 의미 |
|---|---|---|
| **OS** | iOS / Android | 모사할 운영체제. 레이아웃 구조·아이콘 세트·타이포가 완전히 다름(2장) |
| **Mode** | Light / Dark | 밝은/어두운 화면 배경에 맞춘 아이콘·텍스트 색상 |
| **Background** | Off / On | Off=투명(배경 없음, 화면 콘텐츠 위에 바로 얹는 용도), On=Mode에 맞는 단색 배경이 채워짐(3장) |

**공통 치수**: 8개 변형 모두 컨테이너 크기 **390×50px**로 고정되어 있습니다(모바일 화면 목업 표준 폭인 390px, iPhone 12~14 계열 논리 해상도와 동일).

## 2. OS별 레이아웃 구조 (전수 실측)

### 2-1. iOS

| 요소 | 스펙 |
|---|---|
| **컨테이너** | `flex` row, `justify-center items-center`, gap 6px, padding `px=16px py=11px` |
| **Time** | `flex-[1_0_0]`(좌측 절반 폭 안에서 중앙 정렬), 텍스트 "9:41"(Apple 데모 표준 시각), `SF Pro Semibold`, **font-weight 590**(가변 폰트의 커스텀 굵기 — 일반 Semibold 600과 다른 값), 17px/22px, `fontVariationSettings: "wdth" 100` |
| **Dynamic Island spacer** | 125×37px, `radius=100px`(완전 캡슐형), 내용 없는 빈 사각형 — 노치/Dynamic Island가 차지하는 중앙 공간을 레이아웃상으로만 비워두는 스페이서 |
| **Levels(우측 아이콘 그룹)** | `flex-[1_0_0]`, gap 7px, `items-center justify-center` — Cellular Connection(19.2×12.2px) → Wifi(17.1×12.3px) → Battery(27.3×13px) 순서, 3개 모두 SVG 이미지 에셋 |

Time과 Levels가 각각 `flex-1`로 컨테이너 좌/우 절반을 차지하고 그 안에서 중앙 정렬되며, 사이의 Dynamic Island spacer(고정 폭)가 실제 아이폰의 노치 영역만큼 공간을 벌려주는 3분할 구조입니다.

### 2-2. Android

| 요소 | 스펙 |
|---|---|
| **컨테이너** | `flex` row, `justify-between items-center`(gap 없음), padding `px=24px py=10px` |
| **Time** | 텍스트 "9:30"(Google 데모 표준 시각), `Roboto Medium`, 14px/20px, `tracking 0.14px`, `fontFeatureSettings: "ss02" 1, "dlig" 1, "lnum" 1, "pnum" 1`(Roboto의 테이블형 숫자 스타일리스틱 세트) |
| **right icons** | `inline-grid`(grid 컨테이너에 자식들을 `margin-left` 오프셋으로 겹치지 않게 배치) — Wifi(17×17px, ml 0) → Signal(17×17px, ml 16px) → Battery(8×15px, ml 38px) 순서 |

**핵심 발견**: iOS와 Android는 **레이아웃 방식 자체가 다릅니다.** iOS는 Time-Spacer-Icons 3분할 + flex `gap`이지만, Android는 좌우 양끝 정렬(`justify-between`)에 아이콘 그룹은 `gap` 없이 개별 `margin-left`로 위치를 잡는 grid 구조입니다. Dynamic Island spacer 같은 노치 공간도 Android에는 없습니다(펀치홀 카메라 등은 이 컴포넌트가 별도로 표현하지 않음 — 확인 필요).

**데모 시각도 OS 관례를 따릅니다**: iOS는 애플이 마케팅·목업에 전통적으로 쓰는 "9:41", Android는 구글이 쓰는 "9:30"으로, 실제 각 OS 공식 목업 표준을 그대로 재현했습니다.

## 3. Mode × Background별 색상 (8개 전수 실측)

| OS | Mode | Background | 컨테이너 배경 | Time 텍스트 색 | 아이콘 |
|---|---|---|---|---|---|
| iOS | Light | Off | 없음(투명) | `common/black-emphasis`(#000000) | 라이트용 흑색 계열 아이콘 에셋 |
| iOS | Light | On | `common/white-emphasis`(#ffffff) | `common/black-emphasis`(#000000) | 라이트용 아이콘 에셋(Off와 동일) |
| iOS | Dark | Off | 없음(투명) | `common/white-emphasis`(#ffffff) | **다크 전용 별도 아이콘 에셋**(단순 색 반전 CSS가 아니라 다른 SVG 파일) |
| iOS | Dark | On | `common/black-emphasis`(#000000) | `common/white-emphasis`(#ffffff) | 다크용 아이콘 에셋(Off와 동일) |
| Android | Light | Off | 없음(투명) | `common/black-emphasis`(#000000) | 라이트용 아이콘 에셋 |
| Android | Light | On | `common/white-emphasis`(#ffffff) | `common/black-emphasis`(#000000) | 라이트용 아이콘 에셋(Off와 동일) |
| Android | Dark | Off | 없음(투명) | `common/white-emphasis`(#ffffff) | 다크 전용 별도 아이콘 에셋 |
| Android | Dark | On | `common/black-emphasis`(#000000) | `common/white-emphasis`(#ffffff) | 다크용 아이콘 에셋(Off와 동일) |

**핵심 규칙**:
1. **Background=On은 Mode와 같은 색의 단색 배경을 채웁니다**(Light→흰색, Dark→검정). Background=Off는 배경이 아예 없어(투명) 실제 화면 콘텐츠 위에 겹쳐 쓰는 용도로 설계된 것으로 보입니다.
2. **Background 축은 Time·아이콘 색이나 구조에 영향을 주지 않습니다** — On/Off 전환은 순수하게 컨테이너 배경 유무만 바뀌며, 콘텐츠(시간·아이콘) 스펙은 Mode에 의해서만 결정됩니다.
3. **아이콘은 색상 반전(CSS filter 등)이 아니라 Light/Dark 각각 별도의 SVG 에셋**입니다. Cellular/Wifi/Battery(iOS), Wifi/Signal/Battery(Android) 전부 Light·Dark 두 세트의 벡터 아이콘이 개별 준비되어 있습니다.

## 4. 토큰 매칭

| Figma 변수 | 값 | 저장소 토큰 | 매칭 여부 |
|---|---|---|---|
| `common/black-emphasis` | `#000000` | `sys-color-common-black-emphasis`(`ref-color-gray-1000`) | **정확히 일치** |
| `common/white-emphasis` | `#ffffff` | `sys-color-common-white-emphasis`(`ref-color-gray-0`) | **정확히 일치** |

`neutral/200`(`#f1f2f3`)도 `get_variable_defs`에 포함되어 있으나, 8개 변형 코드 어디에도 이 변수가 바인딩된 요소가 없어 진열 프레임(캔버스) 배경색으로 추정됩니다 — 컴포넌트 자체 스펙과는 무관합니다.

## 5. 인터랙션(모션) 스펙

**모션 데이터 없음.**

`get_motion_context`를 진열 프레임 전체(`2551:9511`, recursive=true)에 호출했으나 `{"nodes":[]}`인 빈 결과를 반환했습니다. Status Bar는 State 축 자체가 없는 순수 표시용 목업 컴포넌트로, 애초에 인터랙션 전환이 정의될 이유가 없습니다.

## 6. 접근성

- Status Bar는 실제 OS가 렌더링하는 시스템 UI를 디자인 목업에서 재현한 것으로, **실제 웹/앱 구현에서는 이 컴포넌트를 코드로 그대로 옮기지 않는 것이 일반적**입니다(모바일 웹뷰에서는 실제 기기의 네이티브 상태바가 이 자리를 대체함). 화면 디자인 시안의 "테두리 장식" 정도로만 취급하고 `aria-hidden="true"` 처리하는 것을 권장하나, Figma 파일에 명시적 규정은 없습니다 — 확인 필요.
- 시간 텍스트("9:41"/"9:30")는 고정 목업 값이며 실제 표시 시각이 아니므로, 실제 구현 시 이 컴포넌트를 사용하지 않거나 텍스트를 라이브 데이터로 교체해야 합니다.

## 7. 토큰 매칭 요약

**정확히 일치**
- `common/black-emphasis`(#000000) → `sys-color-common-black-emphasis`(`ref-color-gray-1000`)
- `common/white-emphasis`(#ffffff) → `sys-color-common-white-emphasis`(`ref-color-gray-0`)
- 컨테이너 크기 390×50px(모바일 목업 표준 폭)

**기존 토큰에 없음**
- iOS `font-weight 590`(SF Pro의 커스텀 가변 굵기 값) — 저장소 `tokens/typography.json`의 4종 웨이트(regular/medium/semibold/bold, 대응 weight 400/500/600/700) 체계에 없는 값. Status Bar가 시스템 폰트(SF Pro/Roboto)를 그대로 쓰는 목업이라 저장소 타이포 스케일 대상이 아닌 것으로 보임
- Android `Roboto` 폰트, `tracking 0.14px`, 테이블형 숫자 스타일리스틱 세트 — 저장소 폰트 정책(Pretendard 고정)과 무관한 시스템 목업 전용 값
- iOS Dynamic Island spacer 125×37px, radius 100px — 특정 기기(노치가 있는 iPhone) 전용 고정값, 범용 토큰 대상 아님
- Android 아이콘 그룹의 개별 오프셋(16px/38px) — 저장소 spacing 토큰과 무관한 아이콘 조합 전용 고정값

**확인 필요**
- Android의 펀치홀 카메라 등 다른 노치 형태를 이 컴포넌트가 표현하는지(iOS만 Dynamic Island spacer가 있음)
- 실제 구현 시 이 컴포넌트를 코드로 옮길지, 목업 전용으로만 쓸지에 대한 접근성/사용 가이드

## 8. 샘플링에 사용한 8개 노드 (부록, 전수)

| OS | Mode | Background=Off | Background=On |
|---|---|---|---|
| **iOS** | Light | `2551:9510` | `2551:9509` |
| **iOS** | Dark | `2551:9508` | `2551:9506` |
| **Android** | Light | `2551:9507` | `2551:9504` |
| **Android** | Dark | `2551:9503` | `2551:9505` |

`get_variable_defs`·`get_motion_context`는 진열 프레임(`2551:9511`)에서 각 1회 호출해 확보했습니다(모션 없음 확인).
