import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextCount } from './TextCount';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Global/Text Count',
  component: TextCount,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '입력 필드 근처에 표시되는 글자 수 카운터입니다 (예: `12/50`).',
          '**Size(2) × State(3) = 6개 변형**(전수 실측). `components/global/` 소속입니다.',
          '',
          '## 핵심 규칙 — 분자만 색이 바뀝니다',
          '',
          '| State | 분자(입력된 수) | 슬래시·분모 |',
          '|---|---|---|',
          '| Default | `neutral/500` 회색 | `neutral/500` |',
          '| Typing | **`neutral/700`** 짙은 회색 | `neutral/500` (고정) |',
          '| Destructed | **`theme/destructed-default`** 빨강 | `neutral/500` (고정) |',
          '',
          '슬래시와 분모는 **어떤 상태에서도 `neutral/500` 고정**입니다.',
          '',
          '## Size는 크기뿐 아니라 굵기도 다릅니다',
          '',
          '| Size | 타이포 | Weight |',
          '|---|---|---|',
          '| Small | Caption2 10/16 | **Medium 500** |',
          '| Default | Caption1 12/18 | **Regular 400** |',
          '',
          '## ✅ Figma 변형 이름이 정리되었습니다 (2026-09-14)',
          '',
          '초판 조사 시에는 Default(Size) 그룹의 State가 **`State6`/`State5`/`State4`** 라는',
          '자동 생성 이름으로 남아 있어, 색상을 실측해 의미를 추론해야 했습니다.',
          '',
          '이후 **디자이너가 Figma 원본을 정정**했고, 6개 변형 전부 `State=…, Size=…` 형식으로 정리되었습니다.',
          '',
          '| 이전 이름 | 현재 이름 | 색상 실측 추론 |',
          '|---|---|---|',
          '| `State6` | `State=Default, Size=Default` | Default — **맞음** |',
          '| `State5` | `State=Typing, Size=Default` | Typing — **맞음** |',
          '| `State4` | `State=Destructed, Size=Default` | Destructed — **맞음** |',
          '',
          '추론 3건이 모두 정정된 이름과 일치했습니다. 노드 ID·값·구조는 바뀌지 않고 **이름만** 정리되었습니다.',
          '',
          '스펙 원본: [`components/global/text-count/text-count.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/global/text-count/text-count.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'default'] },
    state: { control: 'inline-radio', options: ['default', 'typing', 'destructed'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof TextCount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { current: 12, max: 50, size: 'default', state: 'default' },
};

/** 6개 변형 전체입니다. 슬래시·분모 색이 절대 안 바뀐다는 점을 확인해 보세요. */
export const AllVariants: Story = {
  args: { current: 12, max: 50 },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {([
        ['small', 'Small · Caption2 10px Medium'],
        ['default', 'Default · Caption1 12px Regular'],
      ] as const).map(([size, title]) => (
        <Section key={size} title={title}>
          <Row>
            <Cell label="Default · 분자 neutral/500">
              <TextCount current={12} max={50} size={size} state="default" />
            </Cell>
            <Cell label="Typing · 분자 neutral/700">
              <TextCount current={12} max={50} size={size} state="typing" />
            </Cell>
            <Cell label="Destructed · 분자 destructed">
              <TextCount current={51} max={50} size={size} state="destructed" />
            </Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};
