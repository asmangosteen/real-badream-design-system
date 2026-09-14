import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider, DIVIDER_SIZES } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '콘텐츠 영역을 구분하는 얇은 선입니다. **Type(Horizontal/Vertical) × Size(8단계) = 16개 변형**(전수 실측).',
          '',
          '**핵심 규칙** — Size 값이 `ref-borderwidth` 토큰과 1:1로 대응합니다 (1px→02, 2px→03 … 14px→09).',
          '',
          '**자유 치수** — Horizontal은 너비가, Vertical은 높이가 부모 컨테이너를 꽉 채웁니다.',
          '',
          '**색상은 고정이 아닙니다.** 기본값 `neutral/100`(#F6F7F7)은 맥락에 따라 자유롭게 오버라이드할 수 있습니다',
          '(Footer가 실사용 예시 — `gray/900-10`과 `neutral/400`으로 각각 바꿔 씁니다).',
          '',
          '스펙 원본: [`components/divider/divider.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/divider/divider.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: DIVIDER_SIZES },
    type: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    color: { control: 'color' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { type: 'horizontal', size: 1 },
  render: (args) => (
    <div style={{ width: 320, height: args.type === 'vertical' ? 120 : undefined, display: 'flex' }}>
      <Divider {...args} />
    </div>
  ),
};

/** 16개 변형 전체입니다. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
      <div className="bd-section">
        <h3 className="bd-section__title">Type = Horizontal</h3>
        {DIVIDER_SIZES.map((s) => (
          <div className="bd-cell" key={s} style={{ width: 280 }}>
            <span className="bd-cell__label">{s}px · ref-borderwidth-{String(DIVIDER_SIZES.indexOf(s) + 2).padStart(2, '0')}</span>
            <Divider size={s} />
          </div>
        ))}
      </div>
      <div className="bd-section">
        <h3 className="bd-section__title">Type = Vertical</h3>
        <div style={{ display: 'flex', gap: 24, height: 140, alignItems: 'stretch' }}>
          {DIVIDER_SIZES.map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <span className="bd-cell__label">{s}px</span>
              <Divider type="vertical" size={s} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/** 기본 색상은 언제든 바꿀 수 있습니다. Footer가 실제로 그렇게 쓰고 있습니다. */
export const 색상오버라이드: Story = {
  name: '색상 오버라이드',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 320 }}>
      {[
        ['기본 · neutral/100', undefined],
        ['gray/900-10 (Footer Main-Sub 구분선)', 'var(--ref-color-gray-900-10)'],
        ['neutral/400 (Footer 링크 구분자)', 'var(--sys-color-neutral-400)'],
        ['brand primary', 'var(--sys-color-brand-primary-default)'],
      ].map(([label, color]) => (
        <div className="bd-cell" key={label as string} style={{ width: '100%' }}>
          <span className="bd-cell__label">{label}</span>
          <Divider size={2} color={color as string | undefined} />
        </div>
      ))}
    </div>
  ),
};
