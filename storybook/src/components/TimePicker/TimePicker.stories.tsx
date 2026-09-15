import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker } from './TimePicker';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Date Time Picker/Time Picker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '위/아래 화살표로 시간 값을 증감시키는 **스테퍼**입니다. Direction 단일 축 **3개 변형**, 전부 56×116px.',
          '',
          '`116 = 36(위) + 2 + 40(Time Field) + 2 + 36(아래)` — 실측과 일치합니다.',
          '',
          '## 조작 방법이 셋입니다',
          '',
          '| 조작 | 결과 |',
          '|---|---|',
          '| 화살표 클릭 | 한 칸 증감 |',
          '| 화살표 **길게 누르기** | 0.4초 뒤부터 0.08초 간격으로 연속 증감 |',
          '| 숫자칸에서 ↑ ↓ | 한 칸 증감 (키를 누르고 있으면 연속) |',
          '| 숫자칸에 직접 타이핑 | [Time Field](?path=/docs/components-date-time-picker-time-field--docs) 규칙 그대로 |',
          '',
          '## 단위별 범위',
          '',
          '| 단위 | 최소 | 최대 |',
          '|---|---|---|',
          '| `hour` | `00` | `23` |',
          '| `minute` | `00` | `59` |',
          '| `second` | `00` | `59` |',
          '',
          'Figma 에는 단위 축도 범위 규정도 없습니다 — Time Field 가 `00` 샘플 하나뿐이라 **이 표가 유일한 출처**입니다.',
          '코드에서는 `TIME_UNIT_RANGE` 한 곳에 모여 있고, `min`/`max` 를 직접 주면 그쪽이 우선합니다.',
          '',
          '값이 범위를 벗어난 채로 들어와도 화면에서는 범위 안의 두 자리로 보여줍니다 — `\'7\'` → `07`, 시의 `\'99\'` → `23`.',
          '',
          '## 화살표는 Icon Button 입니다',
          '',
          'Figma 구조 그대로 [Icon Button](?path=/docs/components-icon-button--docs) `Size=M · Type=Ghost` 를 씁니다 —',
          '맨 `<button>` 이 아니라서 hover·pressed 오버레이가 디자인시스템 규칙대로 붙습니다.',
          '',
          '아이콘 색은 Icon Button 원본 Ghost 의 `neutral/800` 이 아니라 **`neutral/600`(#5B616C)** 입니다.',
          'Figma 쪽도 인스턴스 오버라이드라 Time Picker 안에서만 덮어씁니다 — Calendar Header 와 같은 처리입니다.',
          '',
          '## 비활성 방향은 실제로 disabled 입니다',
          '',
          '단순히 흐리게 그리는 게 아니라 클릭이 막힙니다(사용자 확인).',
          '다만 겉모습은 Icon Button 의 기본 Disabled(전체 20% 투명)가 아니라 **아이콘 색만 `neutral/400`(#C2C4C8)** 으로 바뀝니다 — Figma 실측이 `opacity: 1` 이었습니다.',
          '',
          '> `direction` 을 직접 주면 그 값으로 고정됩니다. 비워두면 **값과 범위에서 자동으로** 정해집니다 —',
          '> `wrap` 이 켜져 있으면 끝이 없으므로 항상 `both`, 꺼져 있으면 끝에 닿은 쪽 화살표가 꺼집니다.',
          '',
          '스펙 원본: [`time-picker.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/time-picker/time-picker.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    unit: { control: 'inline-radio', options: ['hour', 'minute', 'second'] },
    direction: {
      control: 'inline-radio',
      options: [undefined, 'down-only', 'up-only', 'both'],
      description: '비워두면 값·범위에서 자동으로 정해집니다',
    },
    fieldState: { control: 'inline-radio', options: [undefined, 'default', 'hover', 'typing'] },
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { defaultValue: '09', unit: 'hour', wrap: true, step: 1 },
};

/** Figma 의 Direction 3종을 그대로 고정해 진열한 모습입니다. */
export const Direction: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="Both · 양방향">
        <TimePicker defaultValue="09" direction="both" />
      </Cell>
      <Cell label="Up Only · 아래 비활성">
        <TimePicker defaultValue="09" direction="up-only" />
      </Cell>
      <Cell label="Down Only · 위 비활성">
        <TimePicker defaultValue="09" direction="down-only" />
      </Cell>
    </Row>
  ),
};

function Live({ unit, label, wrap }: { unit: 'hour' | 'minute'; label: string; wrap: boolean }) {
  const [value, setValue] = useState(unit === 'hour' ? '22' : '57');
  return (
    <Cell label={`${label} · 현재 ${value}`}>
      <TimePicker value={value} unit={unit} wrap={wrap} onChange={setValue} />
    </Cell>
  );
}

/**
 * `wrap` 이 켜져 있으면 23시에서 ↑ 하면 00시가 되고 화살표는 둘 다 살아 있습니다.
 * 꺼 두면 끝에 닿는 순간 그쪽 화살표가 **자동으로** 꺼집니다 — `direction` 을 직접 줄 필요가 없습니다.
 */
export const Wrap: Story = {
  name: '순환 / 범위 끝',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="wrap = true — 23 ↑ 00 으로 순환합니다">
        <Row>
          <Live unit="hour" label="시 (0–23)" wrap />
          <Live unit="minute" label="분 (0–59)" wrap />
        </Row>
      </Section>
      <Section title="wrap = false — 끝에 닿으면 그쪽 화살표가 꺼집니다">
        <Row>
          <Live unit="hour" label="시 (0–23)" wrap={false} />
          <Live unit="minute" label="분 (0–59)" wrap={false} />
        </Row>
      </Section>
    </div>
  ),
};
