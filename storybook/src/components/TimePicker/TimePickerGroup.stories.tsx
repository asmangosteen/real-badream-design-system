import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimePickerGroup } from './TimePicker';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Date Time Picker/Time Picker Group',
  component: TimePickerGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '[Time Picker](?path=/docs/components-date-time-picker-time-picker--docs) 2~3개를 콜론으로 묶은 **완성형 시간 선택 컴포넌트**입니다. Picker Count 단일 축 **2개 변형**.',
          '',
          '| Picker Count | 크기 | 폭 산출 |',
          '|---|---|---|',
          '| 2 (시:분) | 132×116 | `56 + 8 + 4 + 8 + 56` |',
          '| 3 (시:분:초) | 208×116 | `56 + 8 + 4 + 8 + 56 + 8 + 4 + 8 + 56` |',
          '',
          '콜론 앞뒤 간격이 모두 `spacing/06`=8px 로 같습니다 — 콜론 전용 gap 없이 flex `gap` 하나가 균등하게 걸립니다.',
          '',
          '## 콜론은 글자도 이미지도 아닙니다',
          '',
          '**4×4px 점 두 개**를 `spacing/05`=6px 간격으로 세로로 쌓은 것입니다 (`4 + 6 + 4 = 14px`).',
          'Figma 에서도 세로 auto-layout 프레임 안의 원 두 개이고, 색은 `neutral/700`(#454C58) 입니다.',
          '순수 장식이라 `aria-hidden` 처리했습니다.',
          '',
          '## 자리마다 따로 순환합니다',
          '',
          '분이 59 에서 한 칸 올라가면 00 이 되고 **시는 그대로**입니다 — Figma 의 Time Picker 도 서로 독립된 인스턴스입니다.',
          '자리 넘김(59분 → 다음 시)이 필요하면 `onChange` 를 받아 쓰는 쪽에서 처리합니다.',
          '',
          '`value` 의 자릿수가 곧 Picker Count 입니다 — `\'09:30\'` 이면 2개, `\'09:30:00\'` 이면 3개가 그려집니다.',
          '',
          '## 자리별 범위',
          '',
          '| 자리 | 단위 | 범위 |',
          '|---|---|---|',
          '| 1번째 | `hour` | `00`–`23` |',
          '| 2번째 | `minute` | `00`–`59` |',
          '| 3번째 | `second` | `00`–`59` |',
          '',
          '`units` 로 자리별 단위를 직접 바꿀 수 있습니다. 범위 표 자체는 `TIME_UNIT_RANGE` 한 곳에 모여 있습니다.',
          '',
          '범위 밖 값이 들어오면 화면에서는 범위 안으로 맞춰 그리고, **어느 한 자리를 조작하는 순간 나머지 자리도 같이 다듬어 내보냅니다** —',
          '보이는 값과 `onChange` 로 나가는 값이 어긋나지 않게 하기 위해서입니다.',
          '',
          '스펙 원본: [`time-picker-group.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/time-picker-group/time-picker-group.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },
    directions: { table: { disable: true } },
  },
} satisfies Meta<typeof TimePickerGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { defaultValue: '09:30', wrap: true } };

/** Figma 의 Picker Count 2종입니다. 자릿수만 바꾸면 개수가 따라옵니다. */
export const Count: Story = {
  name: 'Picker Count',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Picker Count = 2 (시:분) · 132×116">
        <TimePickerGroup defaultValue="09:30" />
      </Section>
      <Section title="Picker Count = 3 (시:분:초) · 208×116">
        <TimePickerGroup defaultValue="09:30:00" />
      </Section>
    </div>
  ),
};

function LiveGroup({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  return (
    <Cell label={`현재 값 · ${value}`}>
      <TimePickerGroup value={value} onChange={setValue} />
    </Cell>
  );
}

/**
 * 첫 자리는 0–23, 나머지는 0–59 입니다.
 * 분을 59 에서 한 칸 올려 보세요 — 00 으로 돌아가지만 시는 움직이지 않습니다.
 */
export const Live: Story = {
  name: '실제 값',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <LiveGroup initial="23:59" />
      <LiveGroup initial="09:30:00" />
    </Row>
  ),
};
