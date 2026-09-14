import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControlItem } from './SegmentedControlItem';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Global/Segmented Control Item',
  component: SegmentedControlItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Segmented Control 의 세그먼트 하나입니다. **Size(5) × Selected(2) = 10개 변형**(전수 실측).',
          '`components/global/` 소속 — Segmented Control **단 하나**에서만 쓰이지만, 디자이너가 Figma에서',
          '독립 컴포넌트로 분리해둔 아토믹 설계 의도를 존중해 같은 패턴으로 문서화했습니다.',
          '',
          '## Selected는 3가지만 바꿉니다',
          '',
          '| 요소 | Selected=True | Selected=False |',
          '|---|---|---|',
          '| 배경 | `common/white-default` | 없음(투명) |',
          '| 그림자 | `0 2px 2px rgba(3,9,26,0.05)` | 없음 |',
          '| 글자색 | `neutral/800` | `neutral/500` |',
          '| 패딩·radius·타이포 | **변화 없음** | **변화 없음** |',
          '',
          '## Size 스텝이 균등하지 않습니다',
          '',
          '| Size | 세로/가로 패딩 | radius | 타이포 | Weight | 높이 |',
          '|---|---|---|---|---|---|',
          '| XS | 3 / 8 | 6px | Caption2 10/16 | **SemiBold** | 22px |',
          '| S | 4 / **8** (XS와 동일) | 6px (XS와 공유) | Caption1 12/18 | **SemiBold** | 26px |',
          '| M | 6 / 10 | 8px (단독) | Body2 14/22 | **Medium** | 34px |',
          '| L | 8 / 12 | 12px | Body1 16/24 | Medium | 40px |',
          '| XL | 12 / **16** | 12px (L과 공유) | Subtitle 18/24 | Medium | 48px |',
          '',
          '- **weight 전환 지점이 S→M 사이**입니다 (SemiBold → Medium).',
          '- 가로 패딩은 XS·S가 **같고**(8px), XL은 `spacing/09`(14px)를 **건너뛰어** 16px로 갑니다.',
          '- radius는 3단계뿐입니다 — `radius/05`(10px)는 **아예 쓰이지 않습니다.**',
          '- 높이 = `lineHeight + 세로패딩×2` 공식이 5개 Size 전부 성립합니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- **Hover/Pressed/Disabled 축이 Figma에 없습니다.** 클릭 피드백을 어떻게 줄지 규정이 없습니다.',
          '- 그림자가 저장소의 `shadow/01~03` 체계가 아니라 **`gray-900-5` alpha 토큰을 직접 참조**합니다. 다른 컴포넌트와 그림자 표현 방식이 다릅니다.',
          '',
          '스펙 원본: [`components/global/segmented-control-item/segmented-control-item.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/global/segmented-control-item/segmented-control-item.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 's', 'm', 'l', 'xl'] },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
  },
} satisfies Meta<typeof SegmentedControlItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { children: '전체', size: 'm', selected: true },
  render: (args) => (
    <div style={{ display: 'flex', width: 200, background: 'var(--sys-color-neutral-100)', padding: 2, borderRadius: 10 }}>
      <SegmentedControlItem {...args} />
    </div>
  ),
};

/** 10개 변형 전체입니다. 회색 트랙 위에 올려야 Selected의 흰 pill이 보입니다. */
export const AllVariants: Story = {
  args: { children: '전체' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {([
        ['xs', '패딩 3/8 · radius 6 · Caption2 SemiBold · 22px'],
        ['s', '패딩 4/8 · radius 6 · Caption1 SemiBold · 26px'],
        ['m', '패딩 6/10 · radius 8 · Body2 Medium · 34px'],
        ['l', '패딩 8/12 · radius 12 · Body1 Medium · 40px'],
        ['xl', '패딩 12/16 · radius 12 · Subtitle Medium · 48px'],
      ] as const).map(([size, desc]) => (
        <Section key={size} title={`Size = ${size.toUpperCase()} · ${desc}`}>
          <Row>
            <Cell label="Selected = True">
              <div style={{ display: 'flex', width: 140, background: 'var(--sys-color-neutral-100)', padding: 2, borderRadius: 10 }}>
                <SegmentedControlItem size={size} selected>전체</SegmentedControlItem>
              </div>
            </Cell>
            <Cell label="Selected = False">
              <div style={{ display: 'flex', width: 140, background: 'var(--sys-color-neutral-100)', padding: 2, borderRadius: 10 }}>
                <SegmentedControlItem size={size}>전체</SegmentedControlItem>
              </div>
            </Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};
