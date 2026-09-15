import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimeField, TIME_UNIT_RANGE, type TimeUnit } from './TimePicker';
import { Cell, Row } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Date Time Picker/Time Field',
  component: TimeField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '시/분/초 **2자리 숫자 하나**를 표시·입력하는 필드입니다. State 단일 축 **3개 변형**, 전부 56×40px.',
          '',
          '`56 = 10×2 + 36` · `40 = 8×2 + 24` — 실측과 일치합니다.',
          '',
          '## 스테퍼 전용 디스플레이가 아니라 진짜 입력칸입니다',
          '',
          '클릭하면 캐럿이 서고 숫자를 직접 칠 수 있습니다(사용자 확인).',
          'Figma 의 Time Picker 안에서 Time Field 가 Default 로 고정돼 보이는 건 **진열 샘플의 한계**일 뿐입니다.',
          '',
          '| 조작 | 결과 |',
          '|---|---|',
          '| 숫자 키 | 왼쪽부터 채웁니다. 두 자리가 차면 확정 |',
          '| 범위를 넘는 첫 자리 | 분에서 `7` → 70 > 59 이므로 **기다리지 않고 07 로 확정** |',
          '| 두 자리가 범위를 넘을 때 | 방금 누른 숫자를 새 첫 자리로 봅니다 (`5` → `9` 는 59, 그다음 `9` 는 09) |',
          '| ↑ ↓ | 한 칸 증감. 키를 누르고 있으면 브라우저 키 반복이 그대로 연속 증감이 됩니다 |',
          '| Backspace · Delete | **확정된 값도** 한 자리씩 지웁니다 — `10` → `1` → 빈 칸 |',
          '| 빈 칸에서 숫자 | 처음부터 새로 칩니다 |',
          '| Enter · 포커스 해제 | 치던 값을 확정합니다. **다 지운 채로 나가면 마지막 값으로 되돌아갑니다** |',
          '| Esc | 치던 값을 버리고 빠져나옵니다 |',
          '',
          '보이는 숫자는 `<span>` 이 그리고, 키 입력은 그 위에 겹쳐 둔 **투명한 `<input role="spinbutton">`** 이 받습니다 —',
          'Figma 의 캐럿(Text Blinker)을 그대로 쓰면서 실제 키보드와 보조기기를 지원하기 위해서입니다.',
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
          '## ⚠️ 빈 칸으로 남길 수는 없습니다',
          'Figma 에 "값 없음" 변형이 없어서, 다 지운 채로 포커스를 잃으면 **마지막 값으로 되돌아갑니다.**',
          '지우는 동안만 빈 칸이 보이고, 그 사이에도 칸 크기는 56×40 그대로입니다.',
          '',
          '## ⚠️ placeholder 개념이 없습니다',
          '3개 State 전부 글자색이 `neutral/800` 으로 **동일**합니다.',
          'Text Input 처럼 "값이 없을 때 회색" 처리가 Figma 컴포넌트에 존재하지 않습니다.',
          '',
          '스펙 원본: [`time-field.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/time-field/time-field.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    unit: { control: 'inline-radio', options: ['hour', 'minute', 'second'] },
    state: {
      control: 'inline-radio',
      options: [undefined, 'default', 'hover', 'typing'],
      description: '비워두면 실제 포커스·호버를 따릅니다',
    },
    className: { table: { disable: true } },
    onCommit: { table: { disable: true } },
    onStep: { table: { disable: true } },
  },
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { value: '09', unit: 'hour' } };

/** State 3종입니다. 글자색이 전부 같다는 점에 유의하세요. */
export const States: Story = {
  name: 'State',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="Default · neutral/200 배경">
        <TimeField value="09" state="default" />
      </Cell>
      <Cell label="Hover · gray/900 5% 오버레이">
        <TimeField value="09" state="hover" />
      </Cell>
      <Cell label="Typing · 흰 배경 + 파란 테두리 + 캐럿">
        <TimeField value="09" state="typing" />
      </Cell>
    </Row>
  ),
};

function LiveField({ unit, label }: { unit: TimeUnit; label: string }) {
  const { min, max } = TIME_UNIT_RANGE[unit];
  const span = max - min + 1;
  const [value, setValue] = useState('00');
  return (
    <Cell label={`${label} · ${min}–${max} · 현재 ${value}`}>
      <TimeField
        value={value}
        unit={unit}
        aria-label={label}
        onCommit={setValue}
        onStep={(d) =>
          setValue(String(((Number(value) - min + d + span) % span) + min).padStart(2, '0'))
        }
      />
    </Cell>
  );
}

/**
 * 클릭해서 직접 쳐 보세요. 범위를 넘는 첫 자리는 기다리지 않고 바로 확정됩니다 —
 * **분에 `7`** 을 치면 곧바로 `07`, **시에 `3`** 을 치면 `03` 이 됩니다.
 * 시에 `2` → `5` 를 치면 25 가 범위 밖이라 `5` 를 새 첫 자리로 봐서 `05` 가 됩니다.
 */
export const Typing: Story = {
  name: '직접 입력',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <LiveField label="시" unit="hour" />
      <LiveField label="분" unit="minute" />
      <LiveField label="초" unit="second" />
    </Row>
  ),
};
