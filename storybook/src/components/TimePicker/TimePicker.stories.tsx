import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimeField, TimePicker, TimePickerGroup } from './TimePicker';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Date Time Picker/Time Picker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '시간 입력 3종입니다 — **Time Field**(숫자 2자리) · **Time Picker**(스테퍼) · **Time Picker Group**(묶음).',
          '',
          '| 컴포넌트 | 크기 | 변형 |',
          '|---|---|---|',
          '| Time Field | 56×40 | State 3종 (Default/Hover/Typing) |',
          '| Time Picker | 56×116 | Direction 3종 (Down Only/Up Only/Both) |',
          '| Time Picker Group | 가변 | Picker Count 2·3 |',
          '',
          '`56 = 10×2 + 36` · `40 = 8×2 + 24` · `116 = 36 + 2 + 40 + 2 + 36` — 전부 실측과 일치합니다.',
          '',
          '## 타이핑과 스테퍼를 함께 쓰는 하이브리드입니다',
          '',
          '**Time Field는 클릭해서 직접 숫자를 칠 수 있습니다** (사용자 확인).',
          '스테퍼 화살표로만 조작하는 디스플레이가 아닙니다.',
          'Figma의 Time Picker 안에서 Time Field가 Default로 고정돼 보이는 건 **진열 샘플의 한계**일 뿐입니다.',
          '',
          '## ⚠️ Time Field에는 placeholder 개념이 없습니다',
          '3개 State 전부 글자색이 `neutral/800`으로 **동일**합니다.',
          'Text Input처럼 "값이 없을 때 회색" 처리가 Figma 컴포넌트에 존재하지 않습니다.',
          '',
          '## 비활성 방향은 실제로 disabled 처리됩니다',
          'Direction이 `down-only`면 위쪽 화살표가 **진짜 비활성**입니다 — 단순히 흐리게 그리는 게 아닙니다 (사용자 확인).',
          '',
          '> Group의 콜론(`:`)은 Figma에서 이미지 에셋으로 쓰이지만, 여기서는 텍스트로 구현했습니다.',
          '',
          '스펙 원본: [`time-field.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/time-field/time-field.md) · [`time-picker.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/time-picker/time-picker.md) · [`time-picker-group.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/date-time-picker/time-picker-group/time-picker-group.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['down-only', 'up-only', 'both'] },
    fieldState: { control: 'inline-radio', options: ['default', 'hover', 'typing'] },
    className: { table: { disable: true } },
    onUp: { table: { disable: true } },
    onDown: { table: { disable: true } },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { args: { value: '09', direction: 'both', fieldState: 'default' } };

/** Time Field 3개 State입니다. 글자색이 전부 같다는 점에 유의하세요. */
export const Field: Story = {
  name: 'Time Field',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="Default · neutral/200 배경"><TimeField value="09" /></Cell>
      <Cell label="Hover · 5% 오버레이"><TimeField value="09" state="hover" /></Cell>
      <Cell label="Typing · 흰 배경 + 파란 테두리 + 캐럿"><TimeField value="09" state="typing" /></Cell>
    </Row>
  ),
};

/** Direction 3종입니다. 비활성 방향은 실제로 disabled입니다. */
export const Direction: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="Both · 양방향"><TimePicker value="09" direction="both" /></Cell>
      <Cell label="Up Only · 아래 비활성"><TimePicker value="09" direction="up-only" /></Cell>
      <Cell label="Down Only · 위 비활성"><TimePicker value="09" direction="down-only" /></Cell>
    </Row>
  ),
};

/** Picker Count 2·3입니다. */
export const Group: Story = {
  name: 'Time Picker Group',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Picker Count = 2 (시:분)">
        <TimePickerGroup values={['09', '30']} />
      </Section>
      <Section title="Picker Count = 3 (시:분:초)">
        <TimePickerGroup values={['09', '30', '00']} />
      </Section>
    </div>
  ),
};
