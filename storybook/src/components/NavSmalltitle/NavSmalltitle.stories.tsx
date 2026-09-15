import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavSmalltitle } from './NavSmalltitle';
import { Cell, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Navigation Bar/Top/Smalltitle',
  component: NavSmalltitle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Navigation Bar Top 의 **중앙 영역**입니다. **Type(4) × Mode(2) = 8개 변형**(완전 직교, 전수 실측).',
          '폭 **190px 고정**이 전 Type 공통입니다. `components/navigation-bar/top/` 소속입니다.',
          '',
          '| Type | 패딩 | 내용 |',
          '|---|---|---|',
          '| Default | 세로 12px | 제목 Subtitle 18 Medium (폭 전체 채움 · 가운데) |',
          '| Selection | 세로 12px · gap 2px | 제목(내용 폭) + `arrowhead_down` 20px **`neutral/600`** |',
          '| Segmented Control | 세로 **9px** ⚠️ | [Segmented Control](/docs/components-segmented-control--docs) (Size=S · Count=2) 재사용 |',
          '| Caption | 세로 4px · gap **-2px** | 제목 + 보조 설명 Caption 1 **12 Medium** |',
          '',
          '## 눈여겨볼 지점 4가지',
          '',
          '**1. Segmented Control 타입의 세로 패딩 `9px`는 토큰이 아닙니다.** Figma에 박힌 리터럴 값입니다.',
          '',
          '**2. Caption의 gap이 음수(-2px)입니다.** 두 줄을 바짝 붙이려는 의도입니다 (`spacing/00`).',
          '',
          '**3. Caption의 보조 텍스트는 Mode와 무관하게 항상 `neutral/500` 회색입니다.**',
          '어두운 배경 위에서 명암비가 충분한지는 미검증입니다.',
          '',
          '## Segmented Control 은 그냥 눌러서 전환됩니다',
          '기존 [Segmented Control](/docs/components-segmented-control--docs)을 **그대로 인스턴스화**한 것이라',
          '알약이 미끄러지는 인터랙션(200ms)도 원본 그대로입니다.',
          '`segmentValue` 를 넘기면 제어 모드가 되므로 `onSegmentChange` 를 함께 줘야 하고,',
          '처음 선택값만 정하려면 `defaultSegmentValue` 를 씁니다.',
          '',
          '**4. Segmented Control은 Light/Dark 값이 완전히 같습니다.** Figma의 Dark 변형도 Light와 동일하고,',
          'Top의 Seg 계열 Dark 변형은 아예 `Mode=Light` Smalltitle을 그대로 씁니다 (실측 확인).',
          '',
          '## 2026-09-15 Figma 재실측으로 고친 것',
          '- Selection의 화살표가 제목 색(`neutral/800`)을 물려받고 있었습니다 → 실측값 **`neutral/600`**.',
          '- Caption 보조 텍스트의 굵기가 빠져 Regular로 나오고 있었습니다 → **Medium(500)**.',
          '',
          '스펙 원본: [`components/navigation-bar/top/smalltitle/smalltitle.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/navigation-bar/top/smalltitle/smalltitle.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['default', 'selection', 'segmented-control', 'caption'] },
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
    defaultSegmentValue: {
      control: 'inline-radio',
      options: [0, 1],
      description: '처음 선택돼 있을 세그먼트. 이후에는 눌러서 바꿀 수 있습니다',
    },
    className: { table: { disable: true } },
    onSegmentChange: { table: { disable: true } },
    /* 제어 모드 전용 — Controls 에서 켜면 눌러도 안 움직여서 고장처럼 보입니다 */
    segmentValue: { table: { disable: true } },
  },
} satisfies Meta<typeof NavSmalltitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { type: 'default', mode: 'light', title: '착한구독', caption: '월 9만원부터' },
};

/** 8개 변형 전체입니다. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['light', 'dark'] as const).map((mode) => (
        <Section key={mode} title={`Mode = ${mode}`}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 12, background: mode === 'dark' ? 'var(--sys-color-common-black-default)' : 'transparent', borderRadius: 8, width: 'fit-content' }}>
            {([
              ['default', 'Default'],
              ['selection', 'Selection · 드롭다운'],
              ['segmented-control', 'Segmented Control · 세로 9px'],
              ['caption', 'Caption · gap -2px'],
            ] as const).map(([type, label]) => (
              <Cell key={type} label={label}>
                <NavSmalltitle type={type} mode={mode} title="착한구독" caption="월 9만원부터" />
              </Cell>
            ))}
          </div>
        </Section>
      ))}
    </div>
  ),
};
