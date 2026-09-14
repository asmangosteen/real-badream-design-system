import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ALL_TOKENS, byPrefix, groupBy, resolve, type TokenEntry } from './tokens';

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '`tokens/tokens.css` 를 **직접 읽어** 표시합니다. 값을 옮겨 적지 않았으므로 토큰 파일이 바뀌면 이 화면도 자동으로 바뀝니다.',
          '',
          '색상 칩을 클릭하면 CSS 변수명이 복사됩니다.',
          '',
          '**색상 역할은 고정입니다** (저장소 사용 원칙) — Blue=CTA/활성/링크, Orange=경고, Red=오류/파괴적 액션 전용.',
          '역할을 임의로 바꾸지 않습니다.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ token }: { token: TokenEntry }) {
  const [copied, setCopied] = useState(false);
  const resolved = resolve(token.value);
  const copy = () => {
    navigator.clipboard?.writeText(`var(${token.name})`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`var(${token.name}) 복사`}
      style={{
        display: 'flex', flexDirection: 'column', gap: 6, padding: 0, border: 0,
        background: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-family-base)',
      }}
    >
      <span
        style={{
          display: 'block', height: 52, borderRadius: 8, background: resolved,
          border: '1px solid rgba(3,9,26,0.08)',
        }}
      />
      <span style={{ fontSize: 10, lineHeight: 1.4, color: copied ? 'var(--sys-color-brand-primary-default)' : '#464D59', fontWeight: copied ? 700 : 600, wordBreak: 'break-all' }}>
        {copied ? '복사됨!' : token.name.replace(/^--(ref|sys)-color-/, '')}
      </span>
      <span style={{ fontSize: 10, lineHeight: 1.3, color: '#8D9199', fontFamily: 'ui-monospace, monospace' }}>
        {resolved}
      </span>
    </button>
  );
}

function Palette({ tokens, title }: { tokens: TokenEntry[]; title: string }) {
  const groups = groupBy(tokens);
  return (
    <section style={{ marginBottom: 40, fontFamily: 'var(--font-family-base)' }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202837', marginBottom: 16 }}>{title}</h2>
      {Object.entries(groups).map(([group, list]) => (
        <div key={group} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 12, fontWeight: 600, color: '#8D9199', marginBottom: 10 }}>{group}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(112px, 1fr))', gap: 12 }}>
            {list.map((t) => <Swatch key={t.name} token={t} />)}
          </div>
        </div>
      ))}
    </section>
  );
}

/** 브랜드·테마 등 **역할이 정해진** 시스템 컬러입니다. 실제 구현에서는 이걸 먼저 씁니다. */
export const System: Story = {
  name: 'System (역할 컬러)',
  render: () => (
    <Palette
      title="System Colors — 역할이 정해진 컬러"
      tokens={byPrefix('--sys-color-').filter((t) => !t.name.includes('-turquiose-'))}
    />
  ),
};

/** 팔레트 원본입니다. 시스템 컬러가 이 값을 참조합니다. */
export const Reference: Story = {
  name: 'Reference (팔레트)',
  render: () => (
    <Palette
      title="Reference Colors — 팔레트 원본"
      tokens={byPrefix('--ref-color-').filter((t) => !t.name.includes('turquiose'))}
    />
  ),
};

/** hover/pressed 피드백 전용 반투명 오버레이입니다. 배경 위에 합성해서 씁니다. */
export const Interaction: Story = {
  name: 'Interaction (hover/pressed)',
  render: () => {
    const tokens = byPrefix('--interaction-');
    return (
      <section style={{ fontFamily: 'var(--font-family-base)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#202837', marginBottom: 8 }}>Interaction Overlays</h2>
        <p style={{ fontSize: 13, color: '#5B616C', marginBottom: 20, maxWidth: 640, lineHeight: 1.6 }}>
          이 토큰들은 <strong>배경색을 교체하는 게 아니라 기존 배경 위에 얹는 반투명 레이어</strong>입니다.
          컴포넌트별 매핑 — Primary=<code>blue</code>, Secondary=<code>light-blue</code>,
          Tertiary(라이트)=<code>light-gray</code>, Tertiary(다크)=<code>gray</code>,
          Destructed=<code>red</code>, Destructed-Subtle=<code>light-red</code>.
        </p>
        <table style={{ borderCollapse: 'collapse', fontSize: 13, width: '100%', maxWidth: 720 }}>
          <thead>
            <tr>
              {['토큰', '값', '흰 배경 위', '파란 배경 위'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px 8px 0', borderBottom: '2px solid #DBDCDF', color: '#464D59' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tokens.map((t) => (
              <tr key={t.name}>
                <td style={{ padding: '8px 12px 8px 0', borderBottom: '1px solid #EDEEF0', fontSize: 11, color: '#464D59' }}>
                  {t.name.replace('--interaction-', '')}
                </td>
                <td style={{ padding: '8px 12px 8px 0', borderBottom: '1px solid #EDEEF0', fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#8D9199' }}>
                  {t.value}
                </td>
                <td style={{ padding: '8px 12px 8px 0', borderBottom: '1px solid #EDEEF0' }}>
                  <span style={{ display: 'block', width: 72, height: 24, borderRadius: 6, border: '1px solid #EDEEF0', backgroundColor: '#FFFFFF', backgroundImage: `linear-gradient(${t.value}, ${t.value})` }} />
                </td>
                <td style={{ padding: '8px 12px 8px 0', borderBottom: '1px solid #EDEEF0' }}>
                  <span style={{ display: 'block', width: 72, height: 24, borderRadius: 6, backgroundColor: '#2C7BE2', backgroundImage: `linear-gradient(${t.value}, ${t.value})` }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  },
};

/** 파싱된 토큰이 몇 개인지 확인합니다. */
export const 집계: Story = {
  name: '토큰 집계',
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', fontSize: 14, color: '#202837', lineHeight: 2 }}>
      <div>tokens.css 에서 읽은 전체 변수: <strong>{ALL_TOKENS.length}개</strong></div>
      <div>Reference 컬러: <strong>{byPrefix('--ref-color-').length}개</strong></div>
      <div>System 컬러: <strong>{byPrefix('--sys-color-').length}개</strong></div>
      <div>Interaction 오버레이: <strong>{byPrefix('--interaction-').length}개</strong></div>
      <div>Spacing: <strong>{byPrefix('--ref-spacing-').length}개</strong></div>
      <div>Radius: <strong>{byPrefix('--ref-radius-').length}개</strong></div>
      <div>Border Width: <strong>{byPrefix('--ref-borderwidth-').length}개</strong></div>
    </div>
  ),
};
