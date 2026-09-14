import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import {
  ALL_ICONS,
  CATEGORY_LABEL,
  ICON_CATEGORIES,
  RECOLORABLE,
  namesOf,
  sizesOf,
  type IconCategory,
} from './registry';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '저장소 `assets/icons/` 의 원본 SVG **648개**를 그대로 렌더링합니다. 아이콘을 다시 그리지 않습니다.',
          '',
          '| 종류 | 개수 | 사이즈 | 색상 |',
          '|---|---|---|---|',
          '| `outlined` UI 선 아이콘 | 404 | 12·16·20·24 | **변경 가능** |',
          '| `filled` UI 면 아이콘 | 80 | 12·16·20·24 | **변경 가능** |',
          '| `colored` 2색 브랜드 | 40 | 12·16·20·24 | 원본 고정 |',
          '| `maker` 제조사 | 80 | 16·20·24·32 | 원본 고정 |',
          '| `service` 서비스 | 12 | 16·20·24·32 | 원본 고정 |',
          '| `bss` 배터리 스테이션 | 32 | 16·20·24·32 | 원본 고정 |',
          '',
          '저장소 사용 원칙 3에 따라 **로고·캐릭터·제조사/BSS 아이콘은 색을 바꾸지 않습니다.**',
          'UI 아이콘만 `color` 로 색을 지정할 수 있고, **비워두면 상위 요소의 글자색을 그대로 따라갑니다.**',
          '',
          '> **2026-09-14 수정**: 이전에는 아이콘이 `neutral/800` 을 직접 지정하고 있어,',
          '> 파란 Primary 버튼 위에서도 아이콘이 **검게** 나오는 버그가 있었습니다.',
          '> 이제 아이콘은 항상 라벨과 같은 색으로 렌더링됩니다.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    category: { control: 'select', options: ICON_CATEGORIES },
    size: { control: { type: 'range', min: 12, max: 48, step: 2 } },
    color: { control: 'color' },
    'aria-label': {
      control: 'text',
      table: { category: '접근성' },
      description: '화면에 글자가 없을 때 스크린리더가 읽을 이름입니다. **디자인 변형 축이 아닙니다.**',
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { name: 'bell', category: 'outlined', size: 24 },
};

/** 같은 아이콘의 사이즈별 원본 파일입니다. 확대·축소가 아니라 사이즈마다 별도로 그려진 파일입니다. */
export const Sizes: Story = {
  args: { name: 'bell' },
  render: () => (
    <div className="bd-row">
      {sizesOf('outlined').map((s) => (
        <div className="bd-cell" key={s}>
          <span className="bd-cell__label">{s}px</span>
          <Icon name="bell" size={s} />
        </div>
      ))}
    </div>
  ),
};

/** UI 아이콘은 토큰 색상으로 자유롭게 칠할 수 있습니다. */
export const Colors: Story = {
  args: { name: 'bell' },
  render: () => (
    <div className="bd-row">
      {[
        ['기본 — 부모 글자색 상속', undefined],
        ['brand primary', 'var(--sys-color-brand-primary-default)'],
        ['success', 'var(--sys-color-theme-success-default)'],
        ['warning', 'var(--sys-color-theme-warning-default)'],
        ['destructed', 'var(--sys-color-theme-destructed-default)'],
      ].map(([label, color]) => (
        <div className="bd-cell" key={label as string}>
          <span className="bd-cell__label">{label}</span>
          <Icon name="bell" size={24} color={color as string | undefined} />
        </div>
      ))}
    </div>
  ),
};

/* ---------------- 전체 아이콘 갤러리 ---------------- */

function Gallery() {
  const [category, setCategory] = useState<IconCategory>('outlined');
  const [query, setQuery] = useState('');
  const [size, setSize] = useState<number>(24);
  const [copied, setCopied] = useState<string | null>(null);

  const available = useMemo(() => sizesOf(category), [category]);
  const activeSize = available.includes(size) ? size : available[available.length - 1];
  const names = useMemo(
    () => namesOf(category).filter((n) => n.toLowerCase().includes(query.trim().toLowerCase())),
    [category, query],
  );

  const copy = (name: string) => {
    navigator.clipboard?.writeText(name);
    setCopied(name);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div style={{ fontFamily: 'var(--font-family-base)' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
        {ICON_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              border: '1px solid',
              borderColor: c === category ? 'var(--sys-color-brand-primary-default)' : '#DBDCDF',
              background: c === category ? 'var(--sys-color-brand-primary-default)' : '#fff',
              color: c === category ? '#fff' : '#464D59',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="아이콘 이름 검색…"
          style={{
            flex: '1 1 220px',
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #DBDCDF',
            fontSize: 14,
            fontFamily: 'inherit',
          }}
        />
        <div style={{ display: 'flex', gap: 6 }}>
          {available.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid',
                borderColor: s === activeSize ? 'var(--sys-color-brand-primary-default)' : '#DBDCDF',
                background: '#fff',
                color: s === activeSize ? 'var(--sys-color-brand-primary-default)' : '#8D9199',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {s}px
            </button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: '#8D9199' }}>
          {names.length}개
          {!RECOLORABLE.includes(category) && ' · 원본 색 고정'}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
          gap: 8,
        }}
      >
        {names.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => copy(name)}
            title={`클릭하면 "${name}" 복사`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '14px 6px 10px',
              border: '1px solid #EDEEF0',
              borderRadius: 10,
              background: copied === name ? '#EEF4FC' : '#fff',
              cursor: 'pointer',
              fontFamily: 'inherit',
              minHeight: 92,
              justifyContent: 'center',
              color: 'var(--sys-color-neutral-800)',
            }}
          >
            <Icon name={name} category={category} size={activeSize} />
            <span
              style={{
                fontSize: 10,
                lineHeight: 1.35,
                color: copied === name ? 'var(--sys-color-brand-primary-default)' : '#8D9199',
                wordBreak: 'break-all',
                textAlign: 'center',
                fontWeight: copied === name ? 700 : 400,
              }}
            >
              {copied === name ? '복사됨!' : name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 전체 아이콘 **648개**를 검색·사이즈별로 볼 수 있는 갤러리입니다.
 * 아이콘을 클릭하면 이름이 복사됩니다.
 */
export const 갤러리: Story = {
  name: '전체 갤러리 (648개)',
  args: { name: 'bell' },
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => <Gallery />,
};

/** 등록된 아이콘 수를 카테고리별로 집계합니다. 저장소 파일과 개수가 맞는지 확인용입니다. */
export const 집계: Story = {
  name: '카테고리별 집계',
  args: { name: 'bell' },
  parameters: { controls: { disable: true } },
  render: () => (
    <table style={{ borderCollapse: 'collapse', fontFamily: 'var(--font-family-base)', fontSize: 14 }}>
      <thead>
        <tr>
          {['카테고리', '아이콘 수', '사이즈', '파일 수', '색상 변경'].map((h) => (
            <th key={h} style={{ textAlign: 'left', padding: '8px 16px 8px 0', borderBottom: '2px solid #DBDCDF' }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ICON_CATEGORIES.map((c) => (
          <tr key={c}>
            <td style={{ padding: '8px 16px 8px 0', borderBottom: '1px solid #EDEEF0' }}>{CATEGORY_LABEL[c]}</td>
            <td style={{ padding: '8px 16px 8px 0', borderBottom: '1px solid #EDEEF0' }}>{namesOf(c).length}</td>
            <td style={{ padding: '8px 16px 8px 0', borderBottom: '1px solid #EDEEF0' }}>
              {sizesOf(c).join(' · ')}px
            </td>
            <td style={{ padding: '8px 16px 8px 0', borderBottom: '1px solid #EDEEF0' }}>
              {ALL_ICONS.filter((i) => i.category === c).length}
            </td>
            <td style={{ padding: '8px 16px 8px 0', borderBottom: '1px solid #EDEEF0' }}>
              {RECOLORABLE.includes(c) ? '가능' : '고정'}
            </td>
          </tr>
        ))}
        <tr>
          <td style={{ padding: '8px 16px 8px 0', fontWeight: 700 }}>합계</td>
          <td />
          <td />
          <td style={{ padding: '8px 16px 8px 0', fontWeight: 700 }}>{ALL_ICONS.length}</td>
          <td />
        </tr>
      </tbody>
    </table>
  ),
};
