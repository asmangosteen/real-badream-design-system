import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInputGroup } from './TextInputGroup';

const meta = {
  title: 'Components/Text Input Group',
  component: TextInputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '[Text Input](/docs/components-text-input--docs) 을 세로로 쌓은 조합 컴포넌트입니다.',
          '**Size(3) × Field(2·3) = 6개 변형**(전수 실측).',
          '',
          '## 핵심 규칙',
          '',
          '**Label은 첫 번째 필드에만 붙습니다.** 두 번째·세 번째 필드는 라벨 없이 입력 박스만 있습니다.',
          '',
          '내부 필드는 Text Input을 그대로 쓰되 **대부분의 토글이 꺼진 간소화 형태**입니다',
          '(버튼·좌우 아이콘·하단 안내 문구 없음).',
          '',
          '| Size | 필드 간 gap | 내부 Input Size | 전체 높이 (Field=2) |',
          '|---|---|---|---|',
          '| S | 4px | S | 84px |',
          '| M | 6px | M | 104px |',
          '| L | 8px | L | 132px |',
          '',
          '**필드 간 gap이 Text Input의 "Input↔Button gap"과 정확히 같습니다** (4/6/8px).',
          '같은 Size 스케일 토큰을 재사용한 결과로 보입니다.',
          '',
          '## ⚠️ 확인이 필요한 것',
          '- Figma는 **너비 280px 고정**입니다 (진열 프레임 표시값으로 추정).',
          '',
          '스펙 원본: [`components/text-input/text-input-group/text-input-group.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/text-input/text-input-group/text-input-group.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof TextInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: '주소',
    essential: true,
    size: 'm',
    fields: [{ placeholder: '기본 주소' }, { placeholder: '상세 주소' }],
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <TextInputGroup {...args} />
    </div>
  ),
};

/** 6개 변형 전체입니다. 첫 필드에만 라벨이 붙는 것을 확인해 보세요. */
export const AllVariants: Story = {
  args: { fields: [] },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['s', 'gap 4px · 높이 84px'],
        ['m', 'gap 6px · 높이 104px'],
        ['l', 'gap 8px · 높이 132px'],
      ] as const).map(([size, desc]) => (
        <div key={size} style={{ marginBottom: 28 }}>
          <span className="bd-cell__label">Size = {size.toUpperCase()} · {desc}</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <span className="bd-cell__label">Field = 2</span>
              <TextInputGroup size={size} label="주소" fields={[{ placeholder: '기본 주소' }, { placeholder: '상세 주소' }]} />
            </div>
            <div style={{ flex: 1 }}>
              <span className="bd-cell__label">Field = 3</span>
              <TextInputGroup
                size={size}
                label="주소"
                fields={[{ placeholder: '우편번호' }, { placeholder: '기본 주소' }, { placeholder: '상세 주소' }]}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
