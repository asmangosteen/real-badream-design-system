import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Toggle } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'On/Off 이진 상태를 즉시 전환하는 스위치입니다.',
          '',
          '**Figma 축** — Size(S/L) × Status(Off/On) × Disabled × Label × Label Location = **24개 변형**(전수 실측).',
          '',
          '**주의할 점**',
          '- Checkbox·Radio Button과 달리 **Hover / Pressed / Focused 축이 없습니다**(의도된 설계).',
          '- Disabled는 색을 회색으로 교체하지 않고 **전체에 opacity 40%** 를 곱합니다.',
          '- thumb 색상은 Off/On 모두 흰색으로 **변하지 않습니다**. 트랙 배경색과 thumb 위치만 바뀝니다.',
          '',
          '**⚠️ Figma에 없어 구현에서 정한 값 (디자이너 확인 필요)**',
          '- 슬라이딩 애니메이션 `150ms ease` — Figma에 모션 데이터가 없습니다.',
          '- 포커스 링(파란 2px) — Figma에 포커스 상태 정의가 없습니다.',
          '- 라벨 클릭 시에도 토글됨 — Figma에 규정이 없습니다.',
          '',
          '스펙 원본: [`components/toggle/toggle.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/toggle/toggle.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['s', 'l'],
      description: 'S = 트랙 40×24 / thumb 20 · L = 트랙 48×28 / thumb 24',
    },
    checked: { control: 'boolean', description: 'Figma의 Status 축 (Off / On)' },
    disabled: { control: 'boolean', description: '전체 opacity 40%' },
    label: { control: 'text', description: '비우면 Figma의 Label=False' },
    labelPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'label이 있을 때만 적용됩니다',
    },
    'aria-label': {
      control: 'text',
      table: { category: '접근성' },
      description: '화면에 글자가 없을 때 스크린리더가 읽을 이름입니다. **디자인 변형 축이 아닙니다.**',
    },
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 모든 축을 직접 바꿔보는 화면입니다. 스위치를 클릭하면 실제로 동작합니다. */
export const Playground: Story = {
  args: {
    size: 'l',
    checked: false,
    disabled: false,
    label: '알림 받기',
    labelPosition: 'right',
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <Toggle {...args} onChange={(checked) => updateArgs({ checked })} />;
  },
};

/* ---------------- 축별 비교 ---------------- */

const Cell = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="bd-cell">
    <span className="bd-cell__label">{label}</span>
    {children}
  </div>
);

/** Size 축만 비교합니다. 라벨 타이포는 S/L이 동일하고 트랙·thumb만 커집니다. */
export const Sizes: Story = {
  args: {},
  render: () => (
    <div className="bd-row">
      <Cell label="S · Off"><Toggle size="s" aria-label="S Off" /></Cell>
      <Cell label="S · On"><Toggle size="s" checked aria-label="S On" /></Cell>
      <Cell label="L · Off"><Toggle size="l" aria-label="L Off" /></Cell>
      <Cell label="L · On"><Toggle size="l" checked aria-label="L On" /></Cell>
    </div>
  ),
};

/** Disabled는 색을 바꾸지 않고 전체 투명도만 40%로 낮춥니다. */
export const States: Story = {
  args: {},
  render: () => (
    <div className="bd-row">
      <Cell label="Off"><Toggle aria-label="Off" /></Cell>
      <Cell label="On"><Toggle checked aria-label="On" /></Cell>
      <Cell label="Off · Disabled"><Toggle disabled aria-label="Off disabled" /></Cell>
      <Cell label="On · Disabled"><Toggle checked disabled aria-label="On disabled" /></Cell>
    </div>
  ),
};

/** 라벨 위치에 따라 DOM 순서와 텍스트 정렬이 달라집니다. */
export const LabelPositions: Story = {
  args: {},
  render: () => (
    <div className="bd-row">
      <Cell label="Label=False"><Toggle checked aria-label="라벨 없음" /></Cell>
      <Cell label="Location=Left"><Toggle checked label="알림 받기" labelPosition="left" /></Cell>
      <Cell label="Location=Right"><Toggle checked label="알림 받기" labelPosition="right" /></Cell>
    </div>
  ),
};

/* ---------------- 전체 변형 24개 ---------------- */

const SIZES = [
  { key: 's', name: 'S' },
  { key: 'l', name: 'L' },
] as const;
const LABELS = [
  { key: 'no', name: 'Label=False', label: undefined, position: 'right' },
  { key: 'left', name: 'Label=True · Left', label: '알림 받기', position: 'left' },
  { key: 'right', name: 'Label=True · Right', label: '알림 받기', position: 'right' },
] as const;
const STATES = [
  { name: 'Off', checked: false, disabled: false },
  { name: 'On', checked: true, disabled: false },
  { name: 'Off · Disabled', checked: false, disabled: true },
  { name: 'On · Disabled', checked: true, disabled: true },
] as const;

/**
 * Figma 컴포넌트 셋의 **24개 변형 전체**입니다.
 * Figma 파일을 옆에 띄워놓고 이 화면과 1:1로 대조해 보세요.
 */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {SIZES.map((size) => (
        <div className="bd-section" key={size.key}>
          <h3 className="bd-section__title">Size = {size.name}</h3>
          {LABELS.map((cfg) => (
            <div className="bd-row" key={cfg.key} style={{ marginBottom: 4 }}>
              {STATES.map((state) => (
                <Cell key={state.name} label={`${cfg.name} · ${state.name}`}>
                  <Toggle
                    size={size.key}
                    checked={state.checked}
                    disabled={state.disabled}
                    label={cfg.label}
                    labelPosition={cfg.position}
                    aria-label={`${size.name} ${state.name}`}
                  />
                </Cell>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
