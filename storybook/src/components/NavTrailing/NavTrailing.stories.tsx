import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavTrailing, NavTrailingItem } from './NavTrailing';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Navigation Bar/Trailing',
  component: NavTrailing,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Navigation Bar 우측의 **액션 아이템 묶음**입니다. `components/navigation-bar/top/` 소속입니다.',
          '',
          '두 컴포넌트를 함께 다룹니다 — **Trailing Components**(아이템 1개, 4개 변형)와 **Trailing**(묶음, 3개 변형).',
          '',
          '## ⚠️ Number는 "정확한 개수"가 아니라 "최댓값"입니다',
          '',
          'Figma의 `Number`(1/2/3)는 그 자리에 넣을 수 있는 **최대 허용치**입니다 (사용자 확인).',
          '실제로는 **0개부터 최댓값까지 자유롭게** 조절할 수 있고, **Icon과 Button을 섞어 쓸 수 있습니다.**',
          '',
          '## ⚠️ Trailing 자체에는 Mode 축이 없습니다',
          '단독으로는 항상 Light입니다. Dark 대응은 **상위 Top 컴포넌트가 각 항목을 개별 재정의**하는 방식입니다.',
          '',
          '## Type 2종',
          '',
          '| Type | 패딩 | 내용 |',
          '|---|---|---|',
          '| Icon | 세로 4px · 내부 래퍼 8px · radius 12px | `plus` 24px (자유 교체 슬롯으로 추정) |',
          '| Button | 세로 12px · 폭 64px · 우측 정렬 | [Text Button](/docs/components-text-button--docs) (Size=XL · Blue · Default) 재사용 |',
          '',
          '**Button 타입은 Dark에서도 파란색 그대로입니다** — 어두운 배경에서 브랜드 블루의 명암비가 충분한지는 미검증입니다.',
          '',
          '항목 사이에 gap 클래스가 없어, 각 항목의 세로 패딩이 서로 맞닿는 방식으로 배치됩니다.',
          '',
          '스펙 원본: [`trailing.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/navigation-bar/top/trailing/trailing.md) · [`trailing-components.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/navigation-bar/top/trailing-components/trailing-components.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof NavTrailing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { items: [{ type: 'icon', iconName: 'bell' }, { type: 'icon', iconName: 'menu_hamburger' }], mode: 'light' },
};

/** Trailing Components 4개 변형입니다. */
export const Items: Story = {
  name: 'Trailing Components (아이템 1개)',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['light', 'dark'] as const).map((mode) => (
        <Section key={mode} title={`Mode = ${mode}`}>
          <div style={{ display: 'flex', gap: 24, padding: 12, background: mode === 'dark' ? '#202837' : 'transparent', borderRadius: 8, width: 'fit-content' }}>
            <Cell label="Type = Icon"><NavTrailingItem type="icon" mode={mode} iconName="bell" aria-label="알림" /></Cell>
            <Cell label="Type = Button · Dark 에서도 파란색"><NavTrailingItem type="button" mode={mode} label="완료" /></Cell>
          </div>
        </Section>
      ))}
    </div>
  ),
};

/** Number 1~3입니다. 실제로는 0개부터 최댓값까지 자유롭게 쓸 수 있습니다. */
export const Numbers: Story = {
  name: 'Trailing (묶음)',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Number 1~3 (최댓값 기준)">
        {[1, 2, 3].map((n) => (
          <Row key={n}>
            <Cell label={`Number = ${n}`}>
              <NavTrailing items={Array.from({ length: n }, () => ({ type: 'icon' as const, iconName: 'bell' }))} />
            </Cell>
          </Row>
        ))}
      </Section>
      <Section title="Icon 과 Button 을 섞어 쓸 수 있습니다 (사용자 확인)">
        <Row>
          <Cell label="Icon + Button">
            <NavTrailing items={[{ type: 'icon', iconName: 'bell' }, { type: 'button', label: '완료' }]} />
          </Cell>
          <Cell label="Icon 2개 + Button">
            <NavTrailing items={[{ type: 'icon', iconName: 'search' }, { type: 'icon', iconName: 'bell' }, { type: 'button', label: '완료' }]} />
          </Cell>
        </Row>
      </Section>
    </div>
  ),
};
