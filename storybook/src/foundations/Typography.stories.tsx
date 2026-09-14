import type { Meta, StoryObj } from '@storybook/react-vite';
import { ALL_TOKENS } from './tokens';

const STYLES = [
  { key: 'display', label: 'Display' },
  { key: 'heading-1', label: 'Heading 1' },
  { key: 'heading-2', label: 'Heading 2' },
  { key: 'title', label: 'Title' },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'body-1', label: 'Body 1' },
  { key: 'body-2', label: 'Body 2' },
  { key: 'caption-1', label: 'Caption 1' },
  { key: 'caption-2', label: 'Caption 2' },
];

const WEIGHTS = [
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'SemiBold' },
  { value: 700, label: 'Bold' },
];

const get = (name: string) => ALL_TOKENS.find((t) => t.name === name)?.value ?? '';

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '`tokens/tokens.css` 의 타이포그래피 변수를 직접 읽어 표시합니다. **9개 스타일 × 4개 Weight.**',
          '',
          '폰트는 저장소 `assets/fonts/` 의 **Pretendard** woff2 원본을 그대로 불러옵니다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** 9개 스타일의 크기·행간·자간입니다. */
export const Styles: Story = {
  name: '스타일 9종',
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)' }}>
      {STYLES.map((s) => {
        const size = get(`--typography-${s.key}-size`);
        const lh = get(`--typography-${s.key}-line-height`);
        const ls = get(`--typography-${s.key}-letter-spacing`);
        return (
          <div key={s.key} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid #EDEEF0' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#202837' }}>{s.label}</span>
              <span style={{ fontSize: 11, color: '#8D9199', fontFamily: 'ui-monospace, monospace' }}>
                {size} / {lh} · letter-spacing {ls}
              </span>
            </div>
            <div style={{ fontSize: size, lineHeight: lh, letterSpacing: ls, color: '#202837', fontWeight: 500 }}>
              배달라이더를 위한 전기이륜차 구독 플랫폼
            </div>
          </div>
        );
      })}
    </div>
  ),
};

/** 각 스타일 × Weight 조합입니다. */
export const Weights: Story = {
  name: 'Weight 4종',
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)' }}>
      {STYLES.slice(3).map((s) => {
        const size = get(`--typography-${s.key}-size`);
        const lh = get(`--typography-${s.key}-line-height`);
        const ls = get(`--typography-${s.key}-letter-spacing`);
        return (
          <div key={s.key} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#202837', marginBottom: 10 }}>
              {s.label} · {size}
            </div>
            {WEIGHTS.map((w) => (
              <div key={w.value} style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: '#8D9199', width: 76, flex: '0 0 auto' }}>
                  {w.label} {w.value}
                </span>
                <span style={{ fontSize: size, lineHeight: lh, letterSpacing: ls, fontWeight: w.value, color: '#202837' }}>
                  바드림 Badream 0123
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  ),
};
