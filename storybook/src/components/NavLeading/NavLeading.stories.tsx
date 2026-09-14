import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavLeading } from './NavLeading';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Navigation Bar/Leading',
  component: NavLeading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Navigation Bar Top 의 **좌측 영역**입니다. **Type(4) × Mode(2) = 8개 변형**(완전 직교, 전수 실측).',
          '`components/navigation-bar/top/` 소속 서브 아톰입니다.',
          '',
          '## ⚠️ Home은 홈 화면 전용입니다',
          'Back·Close·Big Title은 여러 화면에서 골라 쓰는 범용 헤더이지만,',
          '**Home은 앱 첫 진입 화면에서만 쓰도록 의도된 Type**입니다 (사용자 확인, 강한 제약).',
          '다른 화면에 Home을 가져다 쓰면 의도된 사용 범위를 벗어납니다.',
          '',
          '## Type별 패딩이 전부 다릅니다',
          '',
          '| Type | 패딩 | 내용 |',
          '|---|---|---|',
          '| Back | 좌 12 · 세로 12 | `backward` 24px + (선택) 라벨 Subtitle 18 Regular |',
          '| Close | 좌 20 · **우 40** · 세로 12 | `close` 24px |',
          '| Big Title | 좌 20 · 세로 **10** | 제목 Title 20 SemiBold |',
          '| Home | 좌 20 · 세로 **12** | 바드림 로고 (104×24) |',
          '',
          '**Close의 우측 패딩 40px이 유독 넓습니다** — X 아이콘이 화면 좌측 끝에 치우치지 않고',
          '살짝 안쪽으로 들어오게 하려는 의도로 추정됩니다.',
          '',
          '**Big Title과 Home은 레이아웃 패턴이 같지만 세로 패딩이 다릅니다** (10px vs 12px, 실측 확인).',
          '',
          '## Mode는 에셋 자체를 교체합니다',
          '아이콘·로고 모두 Light/Dark **별도 SVG 파일**을 씁니다 (CSS 색 반전이 아닙니다).',
          '텍스트만 색상 변수로 전환됩니다.',
          '',
          '## ⚠️ 확인이 필요한 것',
          '- 이 구현은 **UI 아이콘의 `currentColor` 재색상**으로 Dark를 처리합니다. Figma처럼 별도 다크 에셋을 쓰려면 해당 SVG를 저장소에 추가해야 합니다.',
          '- Home 로고는 저장소 `assets/logo/bi/signature/` 의 가로형을 썼습니다. Figma가 쓰는 정확한 파일 확인이 필요합니다.',
          '',
          '스펙 원본: [`components/navigation-bar/top/leading/leading.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/navigation-bar/top/leading/leading.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['back', 'close', 'big-title', 'home'] },
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
} satisfies Meta<typeof NavLeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { type: 'back', mode: 'light', showLabel: true, label: '뒤로', title: '착한구독' },
};

/** 8개 변형 전체입니다. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['light', 'dark'] as const).map((mode) => (
        <Section key={mode} title={`Mode = ${mode}`}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 12, background: mode === 'dark' ? '#202837' : 'transparent', borderRadius: 8, width: 'fit-content' }}>
            {([
              ['back', 'Back · 라벨 있음'],
              ['close', 'Close · 우측 패딩 40px'],
              ['big-title', 'Big Title · 세로 10px'],
              ['home', 'Home · 홈 전용'],
            ] as const).map(([type, label]) => (
              <Cell key={type} label={label}>
                <NavLeading type={type} mode={mode} label="뒤로" title="착한구독" />
              </Cell>
            ))}
          </div>
        </Section>
      ))}
      <Section title="Back · Show Label 토글 (어느 Top Type 에서든 자유롭게 켜고 끌 수 있습니다)">
        <Row>
          <Cell label="Show Label = True"><NavLeading type="back" label="뒤로" /></Cell>
          <Cell label="Show Label = False"><NavLeading type="back" showLabel={false} /></Cell>
        </Row>
      </Section>
    </div>
  ),
};
