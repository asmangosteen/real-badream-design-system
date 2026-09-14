import type { Meta, StoryObj } from '@storybook/react-vite';
import { byPrefix, resolve } from './tokens';

const meta = {
  title: 'Foundations/Spacing & Radius',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '`tokens/tokens.css` 의 스페이싱·라운드·보더두께·투명도 변수를 직접 읽어 표시합니다.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Scale({
  prefix,
  title,
  render,
}: {
  prefix: string;
  title: string;
  render: (value: string) => React.ReactNode;
}) {
  const tokens = byPrefix(prefix);
  return (
    <section style={{ marginBottom: 36, fontFamily: 'var(--font-family-base)' }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: '#202837', marginBottom: 14 }}>
        {title} <span style={{ fontSize: 12, fontWeight: 400, color: '#8D9199' }}>({tokens.length}개)</span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tokens.map((t) => {
          const value = resolve(t.value);
          return (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 11, color: '#464D59', width: 180, flex: '0 0 auto', fontFamily: 'ui-monospace, monospace' }}>
                {t.name.replace('--ref-', '')}
              </span>
              <span style={{ fontSize: 11, color: '#8D9199', width: 52, flex: '0 0 auto' }}>{value}</span>
              {render(value)}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const All: Story = {
  name: '전체',
  render: () => (
    <div>
      <Scale
        prefix="--ref-spacing-"
        title="Spacing"
        render={(v) => <span style={{ display: 'block', height: 14, width: v, background: 'var(--sys-color-brand-primary-default)', borderRadius: 2 }} />}
      />
      <Scale
        prefix="--ref-radius-"
        title="Radius"
        render={(v) => <span style={{ display: 'block', width: 56, height: 40, background: 'var(--sys-color-brand-primary-lightest)', border: '1px solid var(--sys-color-brand-primary-light)', borderRadius: v }} />}
      />
      <Scale
        prefix="--ref-borderwidth-"
        title="Border Width"
        render={(v) => <span style={{ display: 'block', width: 120, borderTop: `${v} solid var(--sys-color-neutral-600)` }} />}
      />
      <Scale
        prefix="--ref-opacity-"
        title="Opacity"
        render={(v) => <span style={{ display: 'block', width: 56, height: 24, background: 'var(--sys-color-brand-primary-default)', borderRadius: 6, opacity: parseFloat(v) / 100 }} />}
      />
    </div>
  ),
};
