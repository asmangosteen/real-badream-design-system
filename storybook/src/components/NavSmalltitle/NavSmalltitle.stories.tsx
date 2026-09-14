import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavSmalltitle } from './NavSmalltitle';
import { Cell, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Navigation Bar/Smalltitle',
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
          '| Default | 세로 12px | 제목 Subtitle 18 Medium |',
          '| Selection | 세로 12px · gap 2px | 제목 + `arrowhead_down` 20px |',
          '| Segmented Control | 세로 **9px** ⚠️ | [Segmented Control](/docs/components-segmented-control--docs) (Size=S · Count=2) 재사용 |',
          '| Caption | 세로 4px · gap **-2px** | 제목 + 보조 설명 2줄 |',
          '',
          '## 눈여겨볼 지점 3가지',
          '',
          '**1. Segmented Control 타입의 세로 패딩 `9px`는 토큰이 아닙니다.** Figma에 박힌 리터럴 값입니다.',
          '',
          '**2. Caption의 gap이 음수(-2px)입니다.** 두 줄을 바짝 붙이려는 의도입니다 (`spacing/00`).',
          '',
          '**3. Caption의 보조 텍스트는 Mode와 무관하게 항상 `neutral/500` 회색입니다.**',
          '어두운 배경 위에서 명암비가 충분한지는 미검증입니다.',
          '',
          '스펙 원본: [`components/navigation-bar/top/smalltitle/smalltitle.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/navigation-bar/top/smalltitle/smalltitle.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['default', 'selection', 'segmented-control', 'caption'] },
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
    className: { table: { disable: true } },
    onSegmentChange: { table: { disable: true } },
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
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', padding: 12, background: mode === 'dark' ? '#202837' : 'transparent', borderRadius: 8, width: 'fit-content' }}>
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
