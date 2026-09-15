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
