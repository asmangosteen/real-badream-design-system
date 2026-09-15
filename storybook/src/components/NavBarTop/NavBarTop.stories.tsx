import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBarTop, NAVBAR_TOP_TYPES, NAVBAR_TOP_CONFIG } from './NavBarTop';
import { Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Navigation Bar/Top/Top',
  component: NavBarTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '화면 최상단 **상단 내비게이션 바**입니다. **Type(8) × Mode(2) × Background(2) = 32개 변형.**',
          '높이는 전 변형 공통 **48px**이고, **폭은 화면(부모) 폭을 그대로 따릅니다** — 390px은 Figma 기준 폭일 뿐입니다.',
          '',
          '**이 패밀리의 플래그십**입니다 — Leading·Trailing·Smalltitle 서브 아톰을 조합한,',
          '실제 화면에 쓰이는 컴포넌트입니다.',
          '',
          '## Type별 구성 — Trailing 최댓값이 중앙 콘텐츠 크기에 반비례합니다',
          '',
          '| Type | Leading | 중앙 | Trailing 최대 |',
          '|---|---|---|---|',
          '| Big Title | Big Title | 없음 | **3** |',
          '| NoTitle_back | Back | 없음 | **3** |',
          '| NoTitle_close | Close | 없음 | **3** |',
          '| Smalltitle_back | Back | Default | **2** |',
          '| Smalltitle_close | Close | Default | **2** |',
          '| Seg_back | Back | Segmented Control | **1** |',
          '| Seg_close | Close | Segmented Control | **1** |',
          '| **Home** ⚠️ | 로고 | 없음 | **3** |',
          '',
          '중앙이 없으면 3개, 텍스트면 2개, Segmented Control이면 1개 — 공간을 나눠 갖는 구조입니다.',
          '',
          '## ⚠️ Home은 홈 화면 전용입니다',
          '나머지 7개 Type과 달리 **범용 재사용이 불가**합니다 (사용자 확인, 강한 제약).',
          '',
          '## 사용자 확인으로 정정된 것 3가지',
          '',
          '**1. Trailing 개수는 "최댓값"이지 "고정 개수"가 아닙니다.** 위 표의 3/2/1은 그 Type에서 쓸 수 있는 상한이고,',
          '실제로는 **0개부터 최댓값까지** 자유롭게 줄일 수 있습니다. 넘겨서 늘리는 것만 불가합니다.',
          '',
          '**아이콘 자리에 버튼이 들어갈 수도 있습니다.** Icon·Button을 섞어 쓸 수 있고, 아이콘 글리프도 자유 교체입니다.',
          '',
          '아래 Controls의 `trailingItems`로 바로 바꿔 보세요 — 비워 두면 Type별 최댓값만큼 아이콘이 들어갑니다.',
          '',
          '```jsx',
          '<NavBarTop type="big-title" trailingItems={[]} />                                   {/* 0개 */}',
          '<NavBarTop type="big-title" trailingItems={[{ type: "icon", iconName: "bell" }]} /> {/* 1개 */}',
          '<NavBarTop type="big-title" trailingItems={[',
          '  { type: "icon", iconName: "bell" },',
          '  { type: "button", label: "완료" },        {/* 버튼 혼용 */}',
          ']} />',
          '```',
          '',
          '**2. Back의 라벨은 어느 Type에서든 자유 토글입니다.** 초기 조사에서 "Seg 계열은 라벨을 강제로 숨긴다"고',
          '추정했으나, 그건 그 샘플의 설정값일 뿐이었습니다. `showBackLabel`을 비워 두면 Figma 샘플의 기본값을 따르고',
          '(Seg 계열만 꺼짐), 언제든 켜고 끌 수 있습니다.',
          '',
          '**3. `justify-between`과 `gap-166px`의 차이는 렌더링에 나타나지 않습니다.**',
          'Trailing 래퍼가 항상 남는 공간을 차지한 뒤(`layoutGrow: 1`) 오른쪽 끝에 붙기 때문에 결과가 동일합니다.',
          '초기 판에서 이를 "구조적 차이"처럼 쓴 것은 과장이었고 정정됐습니다. 다만 **두 속성값 자체는 원본대로 구현**해',
          'Leading 콘텐츠가 길어졌을 때의 최소 간격(166px) 보장까지 재현합니다.',
          '',
          '## 가운데 Segmented Control 은 그냥 눌러서 전환됩니다',
          'Seg_back/Seg_close 의 가운데는 [Segmented Control](/docs/components-segmented-control--docs)(Size=S · Count=2)을',
          '**그대로 인스턴스화**한 것이라 알약이 미끄러지는 인터랙션(200ms)도 원본 그대로입니다.',
          '',
          '`segmentValue` 를 넘기면 **제어 모드**가 되어 그 값이 그대로 표시되므로 `onSegmentChange` 를 함께 줘야 합니다.',
          '비워 두면 내부 state 로 동작합니다 — 처음 선택값만 정하고 싶으면 `defaultSegmentValue` 를 쓰세요.',
          '',
          '## 폭 — 모바일 화면 폭을 그대로 따릅니다',
          '',
          '390px은 Figma 기준 폭이고 고정값이 아닙니다. 실제 기기(390·393·412·430…)에 맞춰 늘어납니다.',
          '**390보다 넓어질 때의 규칙** (디자이너 확인, 2026-09-15):',
          '',
          '| 영역 | 넓어질 때 |',
          '|---|---|',
          '| **Trailing** | **항상 고정.** 내용만큼만 차지하고 오른쪽 끝에 붙습니다 — 화면 끝에서 보이는 것까지는 아이콘·버튼 모두 **20px**입니다 |',
          '| **Leading** | 중앙이 없는 Type(Big Title·Home·NoTitle)에서 늘어납니다 — Big Title 제목이 길어질 여유가 생깁니다 |',
          '| **Smalltitle · Segmented Control** | 중앙이 있는 Type에서 늘어납니다. 좌우 여백 100px을 똑같이 유지해 **항상 화면 정중앙**입니다 |',
          '',
          '`폭 대응` 스토리에서 390 / 412 / 430을 나란히 볼 수 있습니다.',
          '',
          '> ⚠️ Figma 원본은 반대로 **Trailing이 `layoutGrow: 1`** 로 남는 공간을 먹는 구조입니다.',
          '> Figma 프레임이 390 고정이라 그 안에서는 결과가 같지만, 넓어지면 늘어나야 할 것이 늘어나지 않습니다.',
          '> **390에서는 아이콘 위치가 픽셀 단위로 Figma와 동일**하고, 박스 폭 배분만 다릅니다.',
          '',
          '## 항목을 숨겨도 나머지 위치가 고정됩니다',
          'Leading·Trailing·Smalltitle을 각각 끌 수 있지만, 숨겨도 **다른 항목이 밀려나지 않습니다**(reflow 없음).',
          'Smalltitle은 흐름에서 빠져 컨테이너 정중앙(195px)에 절대 배치되고, Trailing은 항상 오른쪽 끝에 붙습니다.',
          '',
          '**Background=On의 배경색은 "예시"입니다** — 실제 화면에 맞게 자유롭게 교체할 수 있습니다.',
          '(Top Bar의 배경색은 성격이 다르니 그쪽 문서를 참고하세요.)',
          '',
          '## 2026-09-15 Figma 재실측(32개 변형 전수)으로 고친 것',
          '',
          '- **Dark · Background=On 배경이 틀렸습니다.** `neutral/800`(#202837)으로 칠하고 있었으나',
          '  실측값은 **`common/black-default`(#03091a)** 입니다. Status Bar가 쓰는 `*-emphasis`와도 다른 값입니다.',
          '- 컨테이너의 `gap 166px` / `space-between` 구분이 빠져 있었습니다 → Type별로 반영.',
          '- 하위 아톰에서도 여러 건을 고쳤습니다 — Leading의 gap(8px→0)·Home 로고 처리,',
          '  Smalltitle Selection 화살표 색(`neutral/600`)·Caption 굵기(Medium),',
          '  그리고 **Trailing 아이콘/버튼이 Icon Button·Text Button 인스턴스가 아니어서 빠져 있던 hover/pressed 피드백**.',
          '  각 서브 아톰 문서를 참고하세요.',
          '- 가운데 Segmented Control 이 제어 모드로 꽂혀 있어 **눌러도 전환되지 않았습니다** → 비제어 지원 추가.',
          '- 좌측 Back·Close 가 커서도 안 바뀌는 `<div>` 였습니다 → 아이콘+라벨을 묶은 `<button>` 으로 교체.',
          '- 폭이 `390px` 로 박혀 있었고 Figma 대로 **Trailing 이 늘어나는** 구조였습니다 →',
          '  화면 폭을 따르게 바꾸고, 늘어나는 쪽을 **Leading / Smalltitle** 로 뒤집었습니다(위 "폭" 절).',
          '',
          '스펙 원본: [`components/navigation-bar/top/top/top.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/navigation-bar/top/top/top.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: NAVBAR_TOP_TYPES },
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
    background: { control: 'inline-radio', options: ['on', 'off'] },
    showBackLabel: {
      control: 'boolean',
      description: '비워 두면 Type 별 Figma 기본값(Seg 계열만 꺼짐)을 따릅니다',
    },
    defaultSegmentValue: {
      control: 'inline-radio',
      options: [0, 1],
      description: 'Seg 계열에서 처음 선택돼 있을 세그먼트. 이후에는 눌러서 바꿀 수 있습니다',
    },
    className: { table: { disable: true } },
    onSegmentChange: { table: { disable: true } },
    /* 제어 모드 전용 — Controls 에서 켜면 눌러도 안 움직여서 고장처럼 보입니다 */
    segmentValue: { table: { disable: true } },
    trailingItems: {
      control: 'object',
      description:
        '우측 액션 목록. **비워 두면 Type 별 최댓값만큼 아이콘**이 들어갑니다. ' +
        '`[]` 로 비우거나 최댓값 이하로 줄일 수 있고, `{ type: "button", label: "완료" }` 로 버튼을 섞을 수 있습니다',
    },
  },
} satisfies Meta<typeof NavBarTop>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma 기준 폭. 컴포넌트 자체는 `width: 100%` 라 실제로는 화면 폭을 따릅니다 */
const FRAME = 390;

export const Playground: Story = {
  decorators: [(Story) => <div style={{ width: FRAME }}><Story /></div>],
  args: {
    type: 'smalltitle-back',
    mode: 'light',
    background: 'on',
    backLabel: '뒤로',
    title: '착한구독',
    showLeading: true,
    showTrailing: true,
    showSmalltitle: true,
  },
};

/** 8개 Type 전체입니다 (Light · Background=On). */
export const Types: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {NAVBAR_TOP_TYPES.map((type) => (
        <div key={type} style={{ marginBottom: 16 }}>
          <span className="bd-cell__label">
            {type} · Trailing 최대 {NAVBAR_TOP_CONFIG[type].maxTrailing}개
            {type === 'home' ? ' ⚠️ 홈 화면 전용' : ''}
          </span>
          <div style={{ outline: '1px solid #EDEEF0', width: FRAME }}>
            <NavBarTop type={type} title="착한구독" backLabel="뒤로" />
          </div>
        </div>
      ))}
    </div>
  ),
};

/** Dark 모드입니다. */
export const Dark: Story = {
  args: {},
  parameters: { controls: { disable: true }, backgrounds: { value: 'dark' } },
  render: () => (
    <div>
      {(['big-title', 'smalltitle-back', 'seg-close', 'home'] as const).map((type) => (
        <div key={type} style={{ marginBottom: 16, width: FRAME }}>
          <span className="bd-cell__label">{type}</span>
          <NavBarTop type={type} mode="dark" title="착한구독" backLabel="뒤로" />
        </div>
      ))}
    </div>
  ),
};

/** 항목을 숨겨도 나머지 위치가 밀리지 않습니다. */
export const 항목숨김: Story = {
  name: '항목 숨김 (reflow 없음)',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Section title="Smalltitle_back 기준">
      {([
        ['전부 표시', {}],
        ['Leading 숨김', { showLeading: false }],
        ['Trailing 숨김', { showTrailing: false }],
        ['Smalltitle 숨김', { showSmalltitle: false }],
      ] as const).map(([label, extra]) => (
        <div key={label} style={{ marginBottom: 12 }}>
          <span className="bd-cell__label">{label}</span>
          <div style={{ outline: '1px solid #EDEEF0', width: FRAME }}>
            <NavBarTop type="smalltitle-back" title="착한구독" backLabel="뒤로" {...extra} />
          </div>
        </div>
      ))}
    </Section>
  ),
};

/** Trailing을 최댓값보다 적게 쓰거나 Button을 섞을 수 있습니다. */
export const Trailing자유도: Story = {
  name: 'Trailing 자유도',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Section title="Big Title (최대 3개) 에서 개수·종류를 바꿔본 예">
      {([
        ['3개 (최댓값)', [{ type: 'icon' as const, iconName: 'search' }, { type: 'icon' as const, iconName: 'bell' }, { type: 'icon' as const, iconName: 'menu_hamburger' }]],
        ['2개 — 홈 실사용 예시', [{ type: 'icon' as const, iconName: 'bell' }, { type: 'icon' as const, iconName: 'menu_hamburger' }]],
        ['Icon + Button 혼용', [{ type: 'icon' as const, iconName: 'bell' }, { type: 'button' as const, label: '완료' }]],
        ['0개', []],
      ] as const).map(([label, items]) => (
        <div key={label} style={{ marginBottom: 12 }}>
          <span className="bd-cell__label">{label}</span>
          <div style={{ outline: '1px solid #EDEEF0', width: FRAME }}>
            <NavBarTop type="big-title" title="바드림" trailingItems={[...items]} />
          </div>
        </div>
      ))}
    </Section>
  ),
};

/**
 * 폭은 화면(부모)을 그대로 따릅니다 — 390px 은 Figma 기준 폭일 뿐입니다.
 * 넓어질 때 **Trailing 은 절대 늘어나지 않고**, 중앙이 없는 Type 은 Leading 이,
 * 중앙이 있는 Type 은 Smalltitle 이 남는 폭을 가져갑니다.
 */
export const 폭대응: Story = {
  name: '폭 대응 (390 / 412 / 430)',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {([
        ['big-title', '중앙 없음 → Big Title 제목이 늘어납니다'],
        ['smalltitle-back', '중앙 있음 → 제목 칸이 늘어나고 화면 정중앙을 유지합니다'],
        ['seg-back', '중앙 있음 → Segmented Control 이 늘어납니다'],
      ] as const).map(([type, note]) => (
        <Section key={type} title={`${type} — ${note}`}>
          {[390, 412, 430].map((w) => (
            <div key={w} style={{ marginBottom: 8 }}>
              <span className="bd-cell__label">{w}px</span>
              <div style={{ outline: '1px solid #EDEEF0', width: w }}>
                <NavBarTop type={type} title="착한구독 서비스" backLabel="뒤로" />
              </div>
            </div>
          ))}
        </Section>
      ))}
    </div>
  ),
};
