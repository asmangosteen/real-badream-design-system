import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBarTop, NAVBAR_TOP_TYPES, NAVBAR_TOP_CONFIG } from './NavBarTop';
import { Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Navigation Bar/Top',
  component: NavBarTop,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '화면 최상단 **상단 내비게이션 바**입니다. **Type(8) × Mode(2) × Background(2) = 32개 변형.**',
          '전 변형 공통 **390px 고정 폭**입니다.',
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
          '**1. Trailing 개수는 최댓값일 뿐입니다.** 0개부터 최댓값까지 자유롭게 조절하고,',
          'Icon·Button을 섞어 쓸 수 있습니다.',
          '',
          '**2. Back의 라벨은 어느 Type에서든 자유 토글입니다.** 초기 조사에서 "Seg 계열은 라벨을 강제로 숨긴다"고',
          '추정했으나, 그건 그 샘플의 설정값일 뿐이었습니다.',
          '',
          '**3. `justify-between`과 `gap-166px`의 차이는 렌더링에 나타나지 않습니다.**',
          'Trailing 래퍼가 항상 남는 공간을 차지한 뒤 오른쪽 끝에 붙기 때문에 결과가 동일합니다.',
          '초기 판에서 이를 "구조적 차이"처럼 쓴 것은 과장이었고 정정됐습니다.',
          '',
          '## 항목을 숨겨도 나머지 위치가 고정됩니다',
          'Leading·Trailing·Smalltitle을 각각 끌 수 있지만, 숨겨도 **다른 항목이 밀려나지 않습니다**(reflow 없음).',
          '',
          '**Background=On의 배경색은 "예시"입니다** — 실제 화면에 맞게 자유롭게 교체할 수 있습니다.',
          '(Top Bar의 배경색은 성격이 다르니 그쪽 문서를 참고하세요.)',
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
    className: { table: { disable: true } },
    onSegmentChange: { table: { disable: true } },
    trailingItems: { table: { disable: true } },
  },
} satisfies Meta<typeof NavBarTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    type: 'smalltitle-back',
    mode: 'light',
    background: 'on',
    showBackLabel: true,
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
          <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
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
        <div key={type} style={{ marginBottom: 16 }}>
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
          <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
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
          <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
            <NavBarTop type="big-title" title="바드림" trailingItems={[...items]} />
          </div>
        </div>
      ))}
    </Section>
  ),
};
