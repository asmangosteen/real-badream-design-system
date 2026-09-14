import type { Meta, StoryObj } from '@storybook/react-vite';
import { Week, WeekHeader, Month, type WeekCell } from './Calendar';
import { Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Date Time Picker/Week · Month',
  component: Month,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '달력 그리드를 이루는 세 컴포넌트입니다 — **Week**(한 주 행) · **Week Header**(요일 라벨) · **Month**(그리드 본체).',
          '셋 다 **328px 고정 폭**이라 서로 열이 정확히 맞습니다.',
          '',
          '| 컴포넌트 | 크기 | 구성 | 변형 |',
          '|---|---|---|---|',
          '| Week | 328×40 | Date 셀 7개 · gap 8px | 없음 |',
          '| Week Header | 328×22 | 요일 라벨 7개 · gap 8px | 없음 |',
          '| Month | 328×**224 또는 270** | Week 5~6행 · gap 6px | Week Number 5/6 |',
          '',
          '`328 = 40×7 + 8×6` · `224 = 40×5 + 6×4` · `270 = 40×6 + 6×5` — 전부 실측과 일치합니다.',
          '',
          '## ⚠️ 일요일만 강조되고 토요일은 평일과 같습니다',
          '',
          '일요일은 `theme/destructed-default`(빨강), **토요일은 월~금과 같은 `neutral/600` 회색**입니다.',
          '토요일을 파란색으로 강조하는 흔한 캘린더 관례와 다릅니다.',
          '',
          '## Month는 요일 헤더를 포함하지 않습니다',
          'Month는 **순수하게 날짜 행들의 스택**입니다. Week Header는 Date Picker가 따로 얹습니다.',
          '',
          '> Week Number 전환 시 높이는 **애니메이션 없이 즉시** 바뀝니다 (사용자 확인).',
          '',
          '## ⚠️ 확인이 필요한 것',
          '- Week Header의 요일 텍스트가 **하드코딩**이라 Figma에 교체 슬롯이 없습니다.',
          '- Figma의 Week 샘플은 7칸 전부 `Type=Default`·값 `"00"` 인 진열용입니다. 실제 셀 상태 조합 규칙은 Date Picker에서 결정됩니다.',
          '',
          '스펙 원본: [`week.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/week/week.md) · [`week-header.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/week-header/week-header.md) · [`month.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/month/month.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: { className: { table: { disable: true } } },
} satisfies Meta<typeof Month>;

export default meta;
type Story = StoryObj<typeof meta>;

const w = (start: number, len = 7): WeekCell[] =>
  Array.from({ length: len }, (_, i) => ({ label: String(start + i), type: 'default' as const }));

const FIVE: WeekCell[][] = [
  [{ type: 'null' }, { type: 'null' }, ...w(1, 5)],
  w(6),
  [...w(13, 1), { label: '14', type: 'pinned' }, { label: '15', type: 'selected' }, { label: '16', type: 'selected' }, { label: '17', type: 'pinned' }, ...w(18, 2)],
  w(20),
  [...w(27, 4), { type: 'null' }, { type: 'null' }, { type: 'null' }],
];

export const 요일헤더: Story = {
  name: 'Week Header',
  args: { weeks: [] },
  parameters: { controls: { disable: true } },
  render: () => (
    <Section title="일요일만 빨강 · 토요일은 평일과 같은 회색">
      <WeekHeader />
    </Section>
  ),
};

export const 한주: Story = {
  name: 'Week (한 주)',
  args: { weeks: [] },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Figma 진열 샘플 (전부 Default · 값 00)">
        <Week cells={Array.from({ length: 7 }, () => ({ label: '00', type: 'default' as const }))} />
      </Section>
      <Section title="실사용 예시 — 기간 선택 중인 주">
        <Week cells={FIVE[2]} />
      </Section>
    </div>
  ),
};

export const 달력: Story = {
  name: 'Month (5주 · 6주)',
  args: { weeks: FIVE },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Week Number = 5 · 높이 224px">
        <WeekHeader />
        <Month weeks={FIVE} />
      </Section>
      <Section title="Week Number = 6 · 높이 270px">
        <WeekHeader />
        <Month weeks={[...FIVE, w(1, 7)]} />
      </Section>
    </div>
  ),
};
