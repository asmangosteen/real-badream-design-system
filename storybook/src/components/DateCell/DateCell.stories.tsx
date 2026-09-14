import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateCell } from './DateCell';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Date Time Picker/Date',
  component: DateCell,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '달력의 **날짜 셀 하나**입니다. **11개 변형**(전수 실측). Date/Time Picker 패밀리의 최하위 아톰입니다.',
          '**Size 축이 없고** 전 변형 40×40px 원형(`radius/12`)입니다.',
          '',
          '## Type 5종의 의미 (사용자 확인 완료)',
          '',
          '| Type | 배경 | 의미 |',
          '|---|---|---|',
          '| Default | 흰색 | 일반 날짜 |',
          '| Current | 흰색 + **테두리** `neutral/600` | 오늘 — 테두리로만 구분 |',
          '| **Pinned** | `brand/primary-default` | **사용자가 직접 찍은 날짜** (범위의 시작/끝 앵커) |',
          '| **Selected** | `brand/primary-lightest` | **두 Pinned 사이의 구간** 하이라이트 |',
          '| Null | 흰색 | 문자 그대로 **빈 칸** |',
          '',
          '이 의미들이 **이 컴포넌트가 기간(range) 선택을 지원**하도록 설계되었음을 보여줍니다.',
          '',
          '**Pinned만 타이포가 다릅니다** — Subtitle 18 Medium (나머지는 Body1 16 Regular).',
          '',
          '## Status는 Default·Current에만 있습니다',
          'Selected/Pinned/Null은 **Status=Default 고정**이고 Hover/Pressed/Disabled 조합이 Figma에 없습니다.',
          '',
          '> Pinned를 다시 클릭하면 Pressed 효과 없이 **바로 선택 해제**됩니다 — 의도된 설계입니다 (사용자 확인).',
          '',
          '**오버레이가 Button 계열보다 옅습니다** — Hover 2% / Pressed 5% (Button은 5%/10%).',
          '',
          '스펙 원본: [`components/date-time-picker/date/date.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/date/date.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['default', 'current', 'selected', 'pinned', 'null'] },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
    forceState: { control: 'inline-radio', options: [undefined, 'hover', 'pressed'], table: { category: '문서 표시용' } },
  },
} satisfies Meta<typeof DateCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { children: '14', type: 'default' } };

/** 11개 변형 전체입니다. */
export const AllVariants: Story = {
  args: { children: '14' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Type = Default · Current — Status 4종 전부 존재">
        {(['default', 'current'] as const).map((type) => (
          <Row key={type}>
            <Cell label={`${type} · Default`}><DateCell type={type}>14</DateCell></Cell>
            <Cell label={`${type} · Hover (2%)`}><DateCell type={type} forceState="hover">14</DateCell></Cell>
            <Cell label={`${type} · Pressed (5%)`}><DateCell type={type} forceState="pressed">14</DateCell></Cell>
            <Cell label={`${type} · Disabled`}><DateCell type={type} disabled>14</DateCell></Cell>
          </Row>
        ))}
      </Section>
      <Section title="Type = Selected · Pinned · Null — Status=Default 고정">
        <Row>
          <Cell label="Selected · 구간 하이라이트"><DateCell type="selected">14</DateCell></Cell>
          <Cell label="Pinned · 직접 찍은 날짜 (Subtitle 18 M)"><DateCell type="pinned">14</DateCell></Cell>
          <Cell label="Null · 빈 칸"><DateCell type="null" /></Cell>
        </Row>
      </Section>
      <Section title="기간(range) 선택 예시">
        <Row>
          {[
            ['13', 'default'], ['14', 'pinned'], ['15', 'selected'], ['16', 'selected'], ['17', 'pinned'], ['18', 'default'],
          ].map(([d, t]) => (
            <DateCell key={d} type={t as 'default'}>{d}</DateCell>
          ))}
        </Row>
      </Section>
    </div>
  ),
};
