import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopBar } from './TopBar';
import { Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Top Bar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '화면 최상단 **전체 영역**입니다. **10개 변형**(전수 실측).',
          '[Status Bar](/docs/components-status-bar--docs) 와 [Navigation Bar Top](/docs/components-navigation-bar-top--docs) 을',
          '세로로 쌓은 **최종 합성 컴포넌트**입니다.',
          '',
          '두 서브 컴포넌트를 **각각 독립적으로 켜고 끌 수 있고**, 하위 속성은 전부 자유롭게 승계됩니다',
          '(Status Bar의 OS, Navigation Bar Top의 Type 8종 — Home의 홈 전용 제약도 그대로 상속).',
          '',
          '## Background 3종',
          '',
          '| Background | 처리 | Light | Dark |',
          '|---|---|---|---|',
          '| No | 완전 투명 | — | — |',
          '| Default | 단색 채움 | `common/white-default` `#FDFDFD` | `common/black-emphasis` **`#000000`** |',
          '| Blur | `backdrop-blur(40px)` + 반투명 | 흰색 **60%** | 검정 **40%** |',
          '',
          '**Light와 Dark의 Default 토큰 계열이 다른 것은 의도입니다.**',
          'Light는 실제 페이지 바탕색(`white-default`)을, Dark는 순수 검정(`black-emphasis`)을 씁니다.',
          '"같은 규칙의 반전"이 아니라 각각 **"이 Mode에서 실제 페이지 배경이 무엇이냐"** 에 대한 답입니다.',
          '',
          '**Blur의 오버레이도 단순 반전이 아닙니다** — 톤과 강도(60% vs 40%)가 Mode별로 따로 튜닝되어 있습니다.',
          '`backdrop-blur` 반경 40px만 공통입니다.',
          '',
          '## ⚠️ Navigation Bar Top의 배경색과 성격이 다릅니다',
          'Navigation Bar Top의 Background=On 색은 **"예시"라 자유 교체 가능**하지만,',
          'Top Bar의 색은 **실제 페이지 배경 규칙을 반영한 의도된 값**이라 임의로 바꾸는 슬롯이 아닙니다.',
          '화면 배경이 바뀌면 이 값도 함께 따라가야 합니다.',
          '',
          '## Line은 Background=No에 존재하지 않습니다',
          '`Background=No`에는 **`Line=On` 심볼 자체가 Figma에 없습니다.** 그래서 10개입니다 —',
          '`No`(2) + `Default`·`Blur` 각각 Line Off/On(8) = 10.',
          '',
          '구분선 색은 Mode의 **반대 톤 뉴트럴 5%** 입니다 (Light엔 `gray/900` 5%, Dark엔 `gray/50` 5%).',
          '',
          '## ⚠️ 확인이 필요한 것',
          '- Blur + Line 조합은 **실측 표본에 없었습니다.** Default와 같은 패턴일 것으로 추정해 구현했습니다.',
          '',
          '스펙 원본: [`components/top-bar/top-bar.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/top-bar/top-bar.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
    background: { control: 'inline-radio', options: ['no', 'default', 'blur'] },
    os: { control: 'inline-radio', options: ['ios', 'android'] },
    className: { table: { disable: true } },
    navProps: { table: { disable: true } },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { mode: 'light', background: 'default', line: false, showStatusBar: true, showNavigationBar: true, os: 'ios' },
  render: (args) => (
    <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
      <TopBar {...args} navProps={{ type: 'smalltitle-back', title: '착한구독', backLabel: '뒤로' }} />
    </div>
  ),
};

/** 10개 변형 전체입니다. No에는 Line 조합이 없습니다. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['light', 'dark'] as const).map((mode) => (
        <Section key={mode} title={`Mode = ${mode}`}>
          {([
            ['no', false, 'No · Line 축 없음'],
            ['default', false, 'Default · Line Off'],
            ['default', true, 'Default · Line On'],
            ['blur', false, 'Blur · Line Off'],
            ['blur', true, 'Blur · Line On ⚠️ 미실측'],
          ] as const).map(([bg, line, label]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <span className="bd-cell__label">{label}</span>
              <div
                style={{
                  width: 'fit-content',
                  background:
                    mode === 'dark'
                      ? 'linear-gradient(135deg, #202837 0%, #36517E 100%)'
                      : 'linear-gradient(135deg, #EEF4FC 0%, #FFFFFF 100%)',
                }}
              >
                <TopBar
                  mode={mode}
                  background={bg}
                  line={line}
                  navProps={{ type: 'smalltitle-back', title: '착한구독', backLabel: '뒤로' }}
                />
              </div>
            </div>
          ))}
        </Section>
      ))}
    </div>
  ),
};

/** Status Bar와 Navigation Bar를 각각 끌 수 있습니다. */
export const 개별숨김: Story = {
  name: '개별 숨김',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {([
        ['둘 다 표시', { showStatusBar: true, showNavigationBar: true }],
        ['Status Bar 만', { showStatusBar: true, showNavigationBar: false }],
        ['Navigation Bar 만', { showStatusBar: false, showNavigationBar: true }],
      ] as const).map(([label, extra]) => (
        <div key={label} style={{ marginBottom: 14 }}>
          <span className="bd-cell__label">{label}</span>
          <div style={{ outline: '1px solid #EDEEF0', width: 'fit-content' }}>
            <TopBar line navProps={{ type: 'smalltitle-back', title: '착한구독' }} {...extra} />
          </div>
        </div>
      ))}
    </div>
  ),
};
