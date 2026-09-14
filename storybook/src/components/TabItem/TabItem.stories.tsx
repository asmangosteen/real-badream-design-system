import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabItem } from './TabItem';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Global/Tab Item',
  component: TabItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Tab 을 구성하는 탭 하나입니다. **12개 변형**(전수 실측). `components/global/` 소속입니다.',
          '',
          '## Segmented Control Item과 이름만 같고 다른 컴포넌트입니다',
          '',
          'Figma 레이어명이 둘 다 `_Item` 이지만 완전히 별개입니다.',
          '',
          '| | Tab Item | Segmented Control Item |',
          '|---|---|---|',
          '| 선택 표현 | **밑줄 2px** | 흰 배경 pill + 그림자 |',
          '| 배경 변화 | **없음** | 있음 |',
          '| Size 단계 | **S / L 2단계** | XS~XL 5단계 |',
          '| 가로 패딩 | **없음** (`min-width: 32px` 만) | 8~16px |',
          '| Weight | **항상 SemiBold** | S→M 에서 Medium 으로 전환 |',
          '',
          '## 4개 축 중 하나는 조합이 빠져 있습니다',
          '',
          '| Disabled | Emphasize | Figma에 존재? |',
          '|---|---|---|',
          '| False | Off | ✅ 기본 |',
          '| False | On | ✅ 강조(빨강) |',
          '| True | Off | ✅ 비활성 |',
          '| **True** | **On** | ❌ **없음** |',
          '',
          '비활성화된 탭에 강조(빨강)를 적용하지 않는다는 의도된 제약으로 보입니다.',
          '',
          '## 색 규칙',
          '',
          '| 상태 | 글자·밑줄 색 |',
          '|---|---|',
          '| Active=On | `neutral/800` |',
          '| Active=Off | `neutral/500` |',
          '| Emphasize=On | `theme/destructed-default` (Active 무관) |',
          '| Disabled=True | `neutral/400` (Active 무관) |',
          '',
          '**밑줄 색은 항상 글자색과 동일**합니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- Hover/Pressed/Focused 축이 Figma에 없습니다.',
          '- 가로 패딩 없이 `min-width: 32px` 만 있어, **긴 레이블에서 어떻게 동작하는지** placeholder 만으로는 확정할 수 없습니다.',
          '',
          '스펙 원본: [`components/global/tab-item/tab-item.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/global/tab-item/tab-item.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'l'] },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
} satisfies Meta<typeof TabItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { children: '전체', size: 's', active: true, emphasize: false, disabled: false },
};

/** 12개 변형 전체입니다. Disabled+Emphasize 조합은 Figma에 없어 비워뒀습니다. */
export const AllVariants: Story = {
  args: { children: '전체' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['s', 'l'] as const).map((size) => (
        <Section key={size} title={`Size = ${size.toUpperCase()} · ${size === 's' ? 'Body2 14 SemiBold · 높이 42' : 'Body1 16 SemiBold · 높이 48'}`}>
          {([
            ['기본', { }],
            ['Emphasize = On', { emphasize: true }],
            ['Disabled = True', { disabled: true }],
          ] as const).map(([label, extra]) => (
            <Row key={label}>
              <Cell label={`${label} · Active=On`}>
                <TabItem size={size} active {...extra}>전체</TabItem>
              </Cell>
              <Cell label={`${label} · Active=Off`}>
                <TabItem size={size} {...extra}>전체</TabItem>
              </Cell>
            </Row>
          ))}
        </Section>
      ))}
      <Section title="❌ Disabled = True + Emphasize = On — Figma에 이 조합이 없습니다">
        <span className="bd-cell__label">비활성 탭에는 강조 스타일을 적용하지 않는다는 의도된 제약으로 보입니다.</span>
      </Section>
    </div>
  ),
};
