import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavTrailing, NavTrailingItem } from './NavTrailing';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Navigation Bar/Top/Trailing',
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
          '## Type 2종 — 둘 다 **다른 컴포넌트의 인스턴스**입니다',
          '',
          '| Type | 바깥 프레임 | 안에 들어가는 컴포넌트 |',
          '|---|---|---|',
          '| Icon | 40×48 · 세로 4px | [Icon Button](/docs/components-icon-button--docs) **Size=L · Ghost · Black · Stroke=False** (40×40 · 패딩 8 · radius 12 · 아이콘 24px) |',
          '| Button | 높이 48 · 세로 12px · **폭 hug** | [Text Button](/docs/components-text-button--docs) **Size=XL · Blue · Default · Contents=Text** |',
          '',
          '**⚠️ Button 자리는 내용에 맞춰 hug 합니다** (2026-09-15 디자이너 확인 — Figma 인스턴스의 64px 고정을 이 항목만 정정).',
          '버튼이 들어가면 그 자리가 글자 폭만큼만 차지합니다 — "완료" 기준 약 31px.',
          '라벨이 두 글자를 넘는 일은 거의 없어(완료·저장·편집…) 줄바꿈 대비는 두지 않았습니다.',
          '',
          '**Button 타입은 Dark에서도 파란색 그대로입니다** — 어두운 배경에서 브랜드 블루의 명암비가 충분한지는 미검증입니다.',
          '',
          '항목 사이에 gap이 없어, 각 항목의 세로 패딩이 서로 맞닿는 방식으로 배치됩니다.',
          '묶음 자체는 우측 패딩 12px을 갖고 오른쪽 끝에 정렬됩니다.',
          '',
          '**단 버튼이 아이콘과 맞닿을 때만 그 쪽에 `spacing/06`(8px)을 더합니다** (2026-09-15 디자이너 확인).',
          '버튼 자리가 hug라 바로 붙이면 사이가 8px(Icon Button 안쪽 여백)밖에 안 남아 아이콘끼리(16px)보다 좁아 보입니다.',
          '8px을 더하면 **아이콘↔버튼도 16px**이 되어 아이콘끼리와 같아집니다. 아이콘끼리는 Figma대로 gap 0 그대로입니다.',
          '',
          '## 2026-09-15 Figma 재실측으로 고친 것',
          '- 예전 구현은 두 버튼을 **흉내만 내서 그리고 있었습니다**(패딩·radius·파란 글자색을 직접 복제).',
          '  그래서 **hover/pressed 피드백이 통째로 빠져 있었습니다.** 이제 실제 인스턴스를 재사용합니다.',
          '- Dark에서 아이콘 색만 흰색으로 바뀌는 것은 Figma의 인스턴스 오버라이드를 그대로 옮긴 것입니다',
          '  (Icon Button 원본 Ghost/Black은 `neutral/800` 변수 바인딩).',
          '',
          '## ⚠️ Dark에서는 hover/pressed가 사실상 보이지 않습니다',
          'Icon Button Ghost의 오버레이가 `interaction/light-gray`(검정 5%/10%)라 어두운 배경에서는 변화가 거의 없습니다.',
          'Figma에 Nav 전용 다크 hover 정의가 없어 **원본 그대로 두기로 했습니다**(디자이너 확인, 2026-09-15).',
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
          <div style={{ display: 'flex', gap: 24, padding: 12, background: mode === 'dark' ? 'var(--sys-color-common-black-default)' : 'transparent', borderRadius: 8, width: 'fit-content' }}>
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
