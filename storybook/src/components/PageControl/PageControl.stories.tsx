import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageControl } from './PageControl';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Page Control',
  component: PageControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '캐러셀·온보딩에서 현재 페이지 위치를 표시하는 도트 인디케이터입니다. **70개 인스턴스** (Type 2 × Dots 7 × Selection, 비직교).',
          '',
          '**State 축이 없고, 도트는 클릭할 수 없습니다** — 순수 표시용입니다 (사용자 확인).',
          '',
          '| Type | 미선택 도트 | 선택된 도트 |',
          '|---|---|---|',
          '| On Light | `#03091A` **20%** | `#454C58` (neutral/700) 100% |',
          '| On Dark | `#FDFDFD` **20%** | `#F6F7F7` (neutral/100) 100% |',
          '',
          '도트는 8×8px, 간격 8px, 컨테이너 패딩 8px입니다.',
          '',
          '## Dots=8+ 오버플로우 규칙',
          '9페이지 이상을 8개 슬롯에 압축할 때, **색은 그대로 두고 반지름만 4→3→2로 줄여** 사라지는 느낌을 냅니다.',
          '',
          '| Selection | 반지름 패턴 (1→8번 도트) |',
          '|---|---|',
          '| **1~4** | `4,4,4,4,4,4,3,2` — 오른쪽 끝이 축소 |',
          '| **5~8** | `2,3,4,4,4,4,4,4` — 왼쪽 끝이 축소 |',
          '',
          '축소는 "선택에서 가장 먼 도트"가 아니라 **정해진 한쪽 끝**에서만 일어나고,',
          '**Selection=5부터** 반대쪽으로 넘어갑니다 (사용자 확인 완료).',
          '',
          '스펙 원본: [`components/page-control/page-control.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/page-control/page-control.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['on-light', 'on-dark'] },
    dots: { control: 'select', options: [2, 3, 4, 5, 6, 7, '8+'] },
    selection: { control: { type: 'number', min: 1, max: 8 } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof PageControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { type: 'on-light', dots: 5, selection: 2 },
};

/** Dots 2~7의 일반 모드입니다. 모든 도트가 같은 크기입니다. */
export const Dots: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Section title="On Light — Dots 2~7 (Selection=1)">
      {([2, 3, 4, 5, 6, 7] as const).map((d) => (
        <Row key={d}>
          <Cell label={`Dots=${d}`}>
            <PageControl dots={d} selection={1} />
          </Cell>
        </Row>
      ))}
    </Section>
  ),
};

/**
 * **Dots=8+ 의 축소 규칙**입니다.
 * Selection 4→5 사이에서 축소 방향이 오른쪽에서 왼쪽으로 넘어가는 것을 확인해 보세요.
 */
export const Overflow: Story = {
  name: 'Dots = 8+ (축소 규칙)',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Section title="Selection 1~8 — 4와 5 사이에서 축소 방향이 전환됩니다">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
        <Row key={s}>
          <Cell label={`Selection=${s} · ${s <= 4 ? '우측 축소' : '좌측 축소'}`}>
            <PageControl dots="8+" selection={s} />
          </Cell>
        </Row>
      ))}
    </Section>
  ),
};

/** 어두운 배경 위에서는 색이 반전됩니다. */
export const OnDark: Story = {
  name: 'On Dark',
  args: {},
  parameters: { controls: { disable: true }, backgrounds: { value: 'dark' } },
  render: () => (
    <div style={{ padding: 16, background: 'var(--sys-color-neutral-800)', borderRadius: 12, width: 'fit-content' }}>
      {[
        { dots: 5 as const, selection: 3, label: 'Dots=5 · Selection=3' },
        { dots: '8+' as const, selection: 2, label: 'Dots=8+ · Selection=2' },
        { dots: '8+' as const, selection: 7, label: 'Dots=8+ · Selection=7' },
      ].map((cfg) => (
        <div key={cfg.label} style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
          <span className="bd-cell__label" style={{ color: '#8D9199' }}>{cfg.label}</span>
          <PageControl type="on-dark" dots={cfg.dots} selection={cfg.selection} />
        </div>
      ))}
    </div>
  ),
};
