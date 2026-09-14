import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Global/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '입력 필드 위에 붙는 필드명 텍스트입니다. **Size(3) × Essential(2) = 6개 변형**(전수 실측).',
          '`components/global/` 소속 — Input·TextField 의 부품입니다.',
          '',
          '## S와 M은 글자 크기가 같습니다',
          '',
          '| Size | 타이포 | 하단 여백 | 높이 |',
          '|---|---|---|---|',
          '| **S** | Caption1 12/18 **SemiBold** | 2px | 20px |',
          '| **M** | Caption1 12/18 **SemiBold** (S와 동일) | 4px | 22px |',
          '| **L** | **Body2 14/22 Medium** | 6px | 28px |',
          '',
          'S와 M의 **유일한 차이는 하단 여백 2px**입니다. 타이포그래피는 완전히 같습니다.',
          '(작업 지시 단계의 추정과 달랐던 부분으로, 실측으로 정정된 내용입니다.)',
          '',
          '## 별표(*) 굵기가 Size마다 다릅니다',
          '',
          '- **S·M** — 라벨은 SemiBold(600), 별표만 **Medium(500)** 으로 한 단계 가볍습니다.',
          '- **L** — 라벨과 별표가 **둘 다 Medium(500)** 으로 같습니다.',
          '',
          '별표 색(`theme/destructed-default`)과 라벨↔별표 간격(2px)은 전 Size 공통입니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- **Figma는 너비가 60px 고정**으로 되어 있습니다. 다만 placeholder 텍스트가 "Label"(5글자)로 고정이라, 의도된 고정폭인지 단순 표시폭인지 판단할 수 없습니다. 실제 라벨은 길이가 다양하므로 여기서는 `fit-content` 로 구현했습니다.',
          '- 별표는 **시각 표시일 뿐**입니다. 스크린리더가 "필수"로 인식하려면 연결된 `<input>` 에 `required`/`aria-required` 를 따로 줘야 합니다 — Figma에 이 연결 규정이 없습니다.',
          '',
          '스펙 원본: [`components/global/label/label.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/global/label/label.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    className: { table: { disable: true } },
    htmlFor: { table: { disable: true } },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { children: '이름', size: 'm', essential: false },
};

/** 6개 변형 전체입니다. S와 M의 글자가 같은 크기라는 점에 유의하세요. */
export const AllVariants: Story = {
  args: { children: '이름' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['s', 'm', 'l'] as const).map((size) => (
        <Section
          key={size}
          title={`Size = ${size.toUpperCase()} · ${{ s: 'Caption1 SB · 여백 2px · 높이 20', m: 'Caption1 SB · 여백 4px · 높이 22', l: 'Body2 M · 여백 6px · 높이 28' }[size]}`}
        >
          <Row>
            <Cell label="Essential = Off">
              <Label size={size}>이름</Label>
            </Cell>
            <Cell label={`Essential = On · 별표 ${size === 'l' ? 'Medium(라벨과 동일)' : 'Medium(라벨보다 가벼움)'}`}>
              <Label size={size} essential>
                이름
              </Label>
            </Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** 높이 차이를 보기 위해 배경을 깔았습니다. S와 M은 글자가 같고 아래 여백만 다릅니다. */
export const 높이비교: Story = {
  name: '높이 비교',
  args: { children: '이름' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {(['s', 'm', 'l'] as const).map((size) => (
        <Cell key={size} label={`${size.toUpperCase()} · ${{ s: 20, m: 22, l: 28 }[size]}px`}>
          <span style={{ display: 'inline-flex', background: 'var(--sys-color-brand-primary-lightest)' }}>
            <Label size={size} essential>
              이름
            </Label>
          </span>
        </Cell>
      ))}
    </Row>
  ),
};
