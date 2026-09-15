# 바드림 디자인 시스템 — 스토리북

`components/` 의 Figma 스펙 문서를 **실제로 동작하는 컴포넌트**로 구현한 카탈로그입니다.
브라우저에서 열어 옵션을 바꿔보고, 직접 클릭해 볼 수 있습니다.

## 실행하기

처음 한 번만:

```bash
npm install
```

그다음부터는 이것만:

```bash
npm run storybook
```

브라우저에서 <http://localhost:6006> 이 열립니다. 끌 때는 터미널에서 `Ctrl + C`.

## 구조

```
storybook/
├── .storybook/          스토리북 설정 (토큰·폰트 연결)
└── src/
    ├── styles/          폰트·타이포 유틸·미리보기 배경
    ├── foundations/     컬러·타이포·스페이싱 문서 (tokens.css 를 직접 파싱)
    ├── shared/          스토리에서 공용으로 쓰는 표시용 헬퍼
    ├── Intro.stories.tsx
    └── components/
        └── [Name]/
            ├── Name.tsx          컴포넌트
            ├── Name.css          스타일 (토큰 변수만 사용)
            └── Name.stories.tsx  스토리 + 스펙 문서
```

### 사이드바는 `components/` 폴더 구조를 그대로 따릅니다

스토리 **제목**이 저장소 `components/` 의 폴더 경로와 1:1 로 대응합니다.
소스 폴더명(`src/components/[Name]/`)은 상관없습니다 — 사이드바를 만드는 건 제목입니다.

| `components/` | 스토리 제목 |
|---|---|
| `button/icon-button/` | `Components/Button/Icon Button` |
| `text-input/text-input-group/` | `Components/Text Input/Text Input Group` |
| `navigation-bar/top/leading/` | `Components/Navigation Bar/Top/Leading` |
| `global/type-box/` | `Components/Global/Type Box` |

순서는 `.storybook/preview.ts` 의 `storySort` 가 **제목 경로를 마디별로** 비교해 맞춥니다.
기본 정렬은 제목이 아니라 **스토리 파일이 로딩되는 순서**라, 폴더명과 제목이 다르면
엉뚱한 자리에 끼어듭니다(`Calendar/` 가 만드는 `Date Time Picker` 그룹이 Button Spinner 뒤에
붙어 있었습니다). `method: 'alphabetical'` 은 **한 페이지 안의 스토리까지 이름순으로 섞기 때문에**
쓰지 않습니다.

> ⚠️ `storySort` 함수는 **인라인으로, 바깥 값을 참조하지 않게** 써야 합니다.
> Storybook 이 preview 를 정적 파싱해 그 자리의 소스만 떼어다 평가하므로,
> 밖에 선언한 함수를 가리키면 `/index.json` 이 500 으로 죽고 사이드바가 통째로 사라집니다.

**폴더 하나에 페이지 하나가 아닌 곳**(패밀리 서브 아톰을 한 페이지에 모아 둔 자리):

| 스토리 페이지 | 함께 다루는 `components/` 폴더 |
|---|---|
| `Date Time Picker/Week · Month` | `week`, `week-header`, `month` |
| `Date Time Picker/Date Picker` | `date-picker`, `date-picker-group`, `calendar-header`, `year-month-wheel` |
| `Navigation Bar/Top/Trailing` | `trailing`, `trailing-components` |

반대로 `Components/Icon` 은 스펙 폴더가 없습니다 — 아이콘 **에셋 목록**이라 실측 대상이 아닙니다.


## 지켜야 할 규칙

1. **토큰을 복사하지 않습니다.** `tokens/tokens.css` 와 `assets/` 를 원본 경로에서 직접 읽습니다.
   복사본을 두면 원본과 어긋나기 때문입니다. 토큰을 고치면 이 스토리북도 즉시 따라 바뀝니다.
2. **CSS 에 임의의 HEX 값을 쓰지 않습니다.** 반드시 `var(--sys-color-…)` 같은 토큰 변수를 씁니다.
3. **Figma 에 없는 값을 넣었으면 반드시 표시합니다.** 코드 주석에 `⚠️` 로 남기고,
   스토리의 Docs 설명에도 "확인이 필요한 것들"로 적습니다. 임의로 만든 값을 조용히 섞지 않습니다.
4. **값이 충돌하면 Figma 가 기준입니다.** 저장소는 Figma 의 파생본, 스토리북은 저장소의 파생본입니다.
5. **테두리는 `border` 가 아니라 `box-shadow: inset` 으로 그립니다.**
   Figma 의 스트로크는 전부 `strokeAlign: INSIDE` 라 **박스 크기를 키우지 않습니다.**
   (실측: Button M 은 `Stroke=False` 도 `True` 도 똑같이 44×30, Icon Button M 은 둘 다 36×36)
   CSS `border` 는 크기가 auto 인 축에서 바깥 크기에 더해지므로, 그대로 옮기면
   테두리가 있는 변형만 가로·세로 2px 씩 커집니다. `box-shadow: inset 0 0 0 <두께> <색>` 은
   border-box 의 border 와 같은 자리에 같은 두께로 그려지면서 레이아웃에 영향이 없습니다.
   **예외** — `width`/`height` 가 고정된 요소(Checkbox·Radio·Date Cell·Avatar)는
   `box-sizing: border-box` 덕분에 테두리가 안쪽에 그려지므로 `border` 를 그대로 써도 됩니다.
6. **한 Size 만 재고 나머지를 추정하지 않습니다.** 바드림은 Size 별 계단이 불규칙합니다 —
   Chip 은 아바타가 붙는 쪽 패딩이 S 4 · M 8 · L 6px 이고, 아이콘은 S 6 · M 8 · L 8px 로 다릅니다.
   "M 만 실측하고 S/L 도 같은 비율" 로 적었다가 전부 틀린 적이 있습니다.
7. **Figma 색을 읽을 때 `fills` 배열 전체를 봅니다.** Hover/Pressed 는 보통
   **베이스 + interaction 오버레이 2겹**이고, 오버레이 값이 베이스와 같을 수 있습니다.
   한 겹만 읽으면 "변화 없음" 으로 잘못 읽힙니다 (Chip Filled Hover 가 그랬습니다).

8. **Figma 의 hug 프레임은 `width: fit-content` 로 옮깁니다.** `display: flex` 는 블록 레벨이라
   아무것도 안 적으면 **부모 폭을 그대로 채웁니다** — Figma 에서 56px 로 하드코딩된 크기라도
   마찬가지입니다. 부모가 좁은 진열 칸이면 안 드러나다가 넓은 곳에 놓는 순간 터집니다.
   Time Picker Group(992px 로 늘어남) · Time Field · Time Picker 가 차례로 같은 이유로 걸렸습니다.

9. **내용이 비는 칸은 높이를 고정합니다.** 글자 높이로 칸이 결정되게 두면 값을 다 지웠을 때
   칸이 주저앉습니다 (Time Field 가 40 → 36px 로 줄었습니다).
   Figma 에서 잰 내부 프레임 높이를 그대로 박아 둡니다.

10. **컴포넌트 밖에 놓인 도형·글자도 스펙입니다.** 변형 심볼만 보면 규칙의 절반을 놓칩니다.
    기간 띠(`2612:15600` 등 사각형 7개)는 Date 컴포넌트가 아니라 **Month 프레임의 자식**으로 놓여
    있었는데, Week 가 인스턴스라 그 안에 넣을 수 없었기 때문이지 장식이라서가 아니었습니다.
    같은 프레임의 **글자 노드 3개**(`2612:15931~15933`)도 "오늘 날짜 = current" 처럼
    규칙을 그대로 적어 둔 것이었습니다. 컴포넌트 셋만 읽고 *"Type 이 언제 쓰이는지는 Figma 에 없음"*
    으로 적어 뒀던 게 그래서 틀렸습니다 — **컴포넌트를 쓰고 있는 프레임을 같이 열어 봅니다.**

## 각 컴포넌트의 스토리 구성

| 스토리 | 용도 |
|---|---|
| **Playground** | Controls 패널로 모든 축을 직접 조작 |
| **All Variants** | 전체 변형을 한 화면에 펼침 — Figma 와 1:1 대조용 |
| 축별 스토리 | Sizes / States / Contents 등 축 하나씩 비교 |
| **Docs 탭** | 스펙 요약 + 주의점 + ⚠️ 확인 필요 목록 |

Hover / Pressed 는 실제로 마우스를 올려도 동작하고, 변형 목록에서는 `forceState` 로 강제 표시합니다.
`forceState` 는 **문서 표시 전용**이므로 실제 서비스 코드에서는 쓰지 않습니다.

## 웹사이트로 배포하기

`.github/workflows/storybook.yml` 이 준비되어 있습니다.
저장소 **Settings → Pages → Source** 를 `GitHub Actions` 로 한 번만 바꾸면,
이후 `main` 에 푸시할 때마다 자동으로 배포됩니다.

배포 주소: <https://asmangosteen.github.io/real-badream-design-system/>

## 만들어진 것 / 남은 것

**완료 (13)** — Button · Text Button · Icon Button · Button Spinner · Badge · Checkbox ·
Radio Button · Toggle · Divider · Avatar · Page Control · Status Bar · Icon(648개 갤러리)

**남음 (30)** — `components/` 의 나머지 컴포넌트. 의존 순서상 다음 차례는
`global/` 서브 아톰(Label · Text Blinker · Text Count · Supporting Text · Type Box)이고,
그다음이 이를 조합하는 Text Input · Dropdown · Chip · Segmented Control · Tab 입니다.
