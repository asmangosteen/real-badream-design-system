import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { PageNumbering, PageDirection } from './PageNumbering';
import { PageNumberingGroup, Pagination, PerPage, MoveToPage, PaginationGroup, PER_PAGE_OPTIONS } from './Pagination';
import { buildPageSlots, toGroupVariant, MAX_PAGE_SLOTS } from './pagination-logic';
import { Cell, Row, Section, INTERACTION_STATES } from '../../shared/story-helpers';

const REPO = 'https://github.com/asmangosteen/real-badream-design-system/blob/main';

/** 웹 레이아웃을 흉내 내는 상자. Pagination Group 이 폭 100% 라 기준 폭을 씌워야 합니다 */
function Web({ width = 1080, children }: { width?: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        width,
        maxWidth: '100%',
        padding: 16,
        boxSizing: 'border-box',
        background: 'var(--sys-color-common-white-default)',
        outline: '1px dashed var(--ref-color-gray-900-10)',
        borderRadius: 'var(--ref-radius-04)',
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: 'Components/Pagination',
  component: PaginationGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '목록을 페이지로 나눠 보여주는 **웹 전용** 컴포넌트 묶음입니다.',
          '',
          '> ## ⚠️ 이 저장소에서 유일한 웹 전용 컴포넌트입니다',
          '> 나머지는 전부 모바일 기준인데 Pagination 만 **웹에서만** 씁니다.',
          '> Hover 가 1급 상태이고(모바일엔 hover 가 없습니다) 기준 폭이 1080 이며',
          '> 38px 칸은 모바일 권장 터치 영역 44px 에 못 미칩니다. **모바일 화면에 쓰지 마세요.**',
          '',
          '## 7개 컴포넌트',
          '',
          '| 층 | 컴포넌트 | 크기 | 설명 |',
          '|---|---|---|---|',
          '| 아톰 | `PageNumbering` | 38×38 (4자리 44) | 번호 한 칸 · Figma 15변형 |',
          '| 아톰 | `PageDirection` | 38×38 | `‹` `›` 한 칸 · Figma 8변형 |',
          '| 조합 | `PageNumberingGroup` | 342×38 | 번호 **9칸** · Figma 4변형 |',
          '| 조합 | `Pagination` | 418×38 | `‹` + 9칸 + `›` |',
          '| 조합 | `PerPage` | 136×38 | `[10개 ∨] 씩 보기` |',
          '| 조합 | `MoveToPage` | 179×38 | `[9999] / 9999 [이동]` |',
          '| 조합 | `PaginationGroup` | **폭 100%** ×38 | 셋을 한 줄에 |',
          '',
          '공통 규격 — 높이 **38** · radius **10**(`radius/05`) · 배경 흰색 · 글자 `Body 2/14` `neutral/600`.',
          '',
          '## 상태',
          '',
          '| State | 배경 | 비고 |',
          '|---|---|---|',
          '| Default | `common/white-default` | |',
          '| Hover | + `gray/900-2` (2%) | 흰 배경 오버레이 규칙(Checkbox·Chip Outlined 과 동일) |',
          '| Pressed | + `gray/900-5` (5%) | |',
          '| Selected | `neutral/700` + 흰 글자 | **번호 칸만.** 화살표엔 Selected 가 없습니다 |',
          '| Disabled | **opacity 40%** | Button 과 같은 방식 |',
          '',
          '전환은 저장소 표준 **Hover 150ms · Pressed 50ms · Slow** 입니다(Figma 반응 10건).',
          '**Selected 축은 색을 전환하지 않습니다** — 배경·글자 밝기가 뒤집혀 전환 중 숫자가 증발하기 때문입니다',
          `([docs/INTERACTION.md](${REPO}/docs/INTERACTION.md) 7.3절).`,
          '',
          '## 9칸 생략 규칙',
          '',
          '번호 칸은 **항상 최대 9개**입니다. 넘으면 `···` 로 접습니다.',
          '',
          '| 조건 | Figma 변형 | 모양 (총 20페이지) |',
          '|---|---|---|',
          '| 총 ≤ 9 | `Stable / None` | `1 2 3 4 5 6 7 8 9` |',
          '| 현재 ≤ 5 | `Abbreviated / Rear` | `1 2 3 4 5 6 7 ··· 20` |',
          '| 현재 ≥ 총−4 | `Abbreviated / Front` | `1 ··· 14 15 16 17 18 19 20` |',
          '| 그 외 | `Abbreviated / Both` | `1 ··· 12 13 [14] 15 16 ··· 20` |',
          '',
          '**경계는 "현재 페이지 좌우에 번호가 2개씩 보이도록"** 잡았습니다. Rear 는 `1~7` 을 보여주므로',
          '현재가 7이면 오른쪽에 번호가 없어(`… 6 [7] ··· 20`) 어색합니다 — 그래서 5까지만 Rear 를 씁니다.',
          '',
          '계산은 `pagination-logic.ts` 의 순수 함수 `buildPageSlots` 가 합니다 — 컴포넌트 없이 따로 검증할 수 있습니다.',
          '',
          '## ⚠️ 구현에서 정한 것 (Figma 근거 없음 · 2026-09-19 디자이너 지시)',
          '',
          '- **생략 전환 경계 `현재 ≤ 5` / `현재 ≥ 총−4`** — 현재 좌우에 번호 2개씩 보장. 레이아웃 3종 자체는 Figma 실측입니다',
          `- **Per Page 선택지 ${PER_PAGE_OPTIONS.join(' / ')}** — Figma 엔 \`10개\` 하나만 그려져 있습니다`,
          '- **Move to Page 자동 보정** — 총 100페이지인데 101·130 을 넣으면 100 이 됩니다',
          '- **화살표 자동 비활성** — 첫 페이지면 `‹`, 끝 페이지면 `›`',
          '- **폭 100%** — Figma 1080 은 기준 폭일 뿐입니다',
          '- 포커스 링 — Figma 에 Focused 상태 정의가 없습니다',
          '',
          '## ⚠️ Per Page 목록은 임시 대체입니다',
          '',
          '드롭다운을 누르면 원래 **`Select Group`**(Figma `2686:7432` · 36변형)이 **아래 4px** 에 떠야 합니다.',
          '그 컴포넌트가 저장소에 아직 없어서 여기서는 **동작만 보여주는 간단한 목록**을 씁니다',
          '(2026-09-19 디자이너 결정). 위치 규칙 4px 만 지켰습니다. Select 가 들어오면 교체할 자리입니다.',
          '',
          `스펙 원본: [\`components/pagination/pagination.md\`](${REPO}/components/pagination/pagination.md)`,
        ].join('\n'),
      },
    },
  },
  argTypes: {
    total: { control: { type: 'number', min: 1 } },
    current: { control: { type: 'number', min: 1 } },
    perPage: { control: 'select', options: PER_PAGE_OPTIONS },
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onPerPageChange: { table: { disable: true } },
    perPageProps: { table: { disable: true } },
    moveToPageProps: { table: { disable: true } },
  },
} satisfies Meta<typeof PaginationGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 세 슬롯을 다 켠 기본 조합입니다. 숫자를 눌러 보세요. */
export const Playground: Story = {
  args: { total: 20, current: 1, perPage: 10, showPerPage: true, showPagination: true, showMoveToPage: true },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Web>
        <PaginationGroup
          {...args}
          onChange={(current) => updateArgs({ current })}
          onPerPageChange={(perPage) => updateArgs({ perPage })}
        />
      </Web>
    );
  },
};

/** Figma 두 아톰의 **23개 변형 전체**입니다 (번호 15 + 화살표 8). */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Page Numbering — Contents 3종 × State 5종 = 15개">
        {([
          { label: 'Contents=0 ~ 000', page: 7, abbr: false },
          { label: 'Contents=0000', page: 9999, abbr: false },
          { label: 'Contents=Abbreviated', page: undefined, abbr: true },
        ] as const).map((cfg) => (
          <Row key={cfg.label}>
            {INTERACTION_STATES.map((st) => (
              <Cell key={st.key} label={`${cfg.label} · ${st.label}`}>
                <PageNumbering
                  page={cfg.page}
                  abbreviated={cfg.abbr}
                  disabled={st.disabled}
                  forceState={st.forceState}
                />
              </Cell>
            ))}
            <Cell label={`${cfg.label} · Selected`}>
              <PageNumbering page={cfg.page} abbreviated={cfg.abbr} selected />
            </Cell>
          </Row>
        ))}
      </Section>

      <Section title="Page Direction — State 4종 × Type 2종 = 8개 (Selected 없음)">
        {(['previous', 'next'] as const).map((direction) => (
          <Row key={direction}>
            {INTERACTION_STATES.map((st) => (
              <Cell key={st.key} label={`Type=${direction} · ${st.label}`}>
                <PageDirection direction={direction} disabled={st.disabled} forceState={st.forceState} />
              </Cell>
            ))}
          </Row>
        ))}
      </Section>
    </div>
  ),
};

/**
 * `Page Numbering Group` 의 Figma 4변형입니다. 총 20페이지에서 현재 페이지만 바꾼 것으로,
 * **변형을 직접 고르는 게 아니라 `total`·`current` 로 자동 계산**됩니다.
 */
export const Abbreviation: Story = {
  name: '9칸 생략 규칙',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {([
        { total: 9, current: 1, why: '총 ≤ 9 라 전부 표시' },
        { total: 20, current: 1, why: '현재 ≤ 5' },
        { total: 20, current: 5, why: '현재 ≤ 5 (경계) — 오른쪽에 6·7 이 남음' },
        { total: 20, current: 6, why: '경계 바로 다음 — Both 로 넘어감' },
        { total: 20, current: 9, why: 'Figma 예시와 같은 줄' },
        { total: 20, current: 14, why: '⚠️ 예전 규칙에서 Front 로 빠져 왼쪽 번호가 없던 자리' },
        { total: 20, current: 16, why: '현재 ≥ 총−4 (경계)' },
        { total: 20, current: 20, why: '마지막 페이지' },
      ] as const).map((c) => {
        const v = toGroupVariant(c.total, c.current);
        const text = buildPageSlots(c.total, c.current)
          .map((s) => (s.kind === 'ellipsis' ? '···' : s.page === c.current ? `[${s.page}]` : `${s.page}`))
          .join(' ');
        return (
          <Section key={`${c.total}-${c.current}`} title={`총 ${c.total} · 현재 ${c.current} → ${v.state} / ${v.abbreviated} — ${c.why}`}>
            <PageNumberingGroup total={c.total} current={c.current} />
            <div style={{ marginTop: 8, fontFamily: 'var(--font-family-base)', fontSize: 12, color: 'var(--sys-color-neutral-600)' }}>
              {text}
            </div>
          </Section>
        );
      })}
      <Section title="현재 페이지 좌우에 번호가 2개씩 보입니다 (양 끝 제외)">
        <div style={{ fontFamily: 'var(--font-family-base)', fontSize: 13, color: 'var(--sys-color-neutral-600)' }}>
          총 10 ~ 200 페이지 × 모든 현재 페이지에서, 현재 양옆에 번호(생략 아님)가 몇 개 있는지 잰 최솟값:{' '}
          <strong>
            {Math.min(
              ...Array.from({ length: 191 }, (_, i) => i + 10).flatMap((t) =>
                Array.from({ length: t }, (_, j) => j + 1)
                  .filter((c) => c > 1 && c < t)          // 첫·끝 페이지는 한쪽이 없으므로 제외
                  .map((c) => {
                    const slots = buildPageSlots(t, c);
                    const at = slots.findIndex((s) => s.kind === 'page' && s.page === c);
                    const left = slots[at - 1], right = slots[at + 1];
                    return Math.min(
                      left && left.kind === 'page' ? 1 : 0,
                      right && right.kind === 'page' ? 1 : 0,
                    );
                  }),
              ),
            )}
          </strong>{' '}
          (1 이면 양옆이 항상 번호입니다)
        </div>
      </Section>

      <Section title={`칸 수는 항상 ${MAX_PAGE_SLOTS}개 이하입니다`}>
        <div style={{ fontFamily: 'var(--font-family-base)', fontSize: 13, color: 'var(--sys-color-neutral-600)' }}>
          총 1 ~ 500 페이지 × 모든 현재 페이지를 돌려 확인한 최대 칸 수:{' '}
          <strong>
            {Math.max(
              ...Array.from({ length: 60 }, (_, i) => i + 1).flatMap((t) =>
                Array.from({ length: t }, (_, j) => buildPageSlots(t, j + 1).length),
              ),
            )}
          </strong>
        </div>
      </Section>
    </div>
  ),
};

/** 왼쪽 `Per Page`, 오른쪽 `Move to Page` 를 따로 본 것입니다. */
export const Pieces: Story = {
  name: '조각별 보기',
  args: {},
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [per, setPer] = useState(10);
    const [moved, setMoved] = useState<number | null>(null);
    return (
      <div>
        <Section title="Per Page — 누르면 아래 4px 에 목록이 뜹니다">
          <Row>
            <Cell label={`현재 ${per}개`}>
              <PerPage value={per} onChange={setPer} />
            </Cell>
            <Cell label="⚠️ Disabled 상태가 없습니다 — 필요 없으면 숨깁니다">
              <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 13, color: 'var(--sys-color-neutral-600)' }}>
                {'showPerPage={false}'}
              </span>
            </Cell>
          </Row>
        </Section>

        <Section title="Move to Page — 범위를 벗어나면 자동 보정 (총 100페이지)">
          <Row>
            <Cell label={moved === null ? '101 이나 130 을 넣고 이동을 눌러 보세요' : `→ ${moved} 페이지로 이동`}>
              <MoveToPage total={100} onSubmit={setMoved} />
            </Cell>
            <Cell label="⚠️ Disabled 상태가 없습니다 — 필요 없으면 숨깁니다">
              <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 13, color: 'var(--sys-color-neutral-600)' }}>
                {'showMoveToPage={false}'}
              </span>
            </Cell>
          </Row>
        </Section>

        <Section title="입력칸 폭은 총 페이지 자릿수를 따릅니다 — 24px + 자릿수 × 10px">
          <Row>
            {[9, 99, 999, 9999].map((t) => (
              <Cell key={t} label={`총 ${t} · ${String(t).length}자리 · ${24 + String(t).length * 10}px`}>
                <MoveToPage total={t} />
              </Cell>
            ))}
          </Row>
        </Section>

        <Section title="Pagination — 화살표는 첫/끝에서 자동 비활성">
          <Row>
            <Cell label="현재 1 — ‹ 비활성">
              <Pagination total={20} current={1} />
            </Cell>
          </Row>
          <Row>
            <Cell label="현재 20 — › 비활성">
              <Pagination total={20} current={20} />
            </Cell>
          </Row>
        </Section>
      </div>
    );
  },
};

/**
 * Figma `Frame 1` 의 예시를 그대로 옮긴 것입니다.
 * 세 슬롯을 켜고 끄는 조합 4가지 + 생략 상태 3가지입니다.
 *
 * 일부를 꺼도 **Pagination 은 가운데 자리를 지킵니다.**
 */
export const Frame1: Story = {
  name: 'Frame 1 예시 그대로',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Web>
      <div style={{ display: 'grid', gap: 40 }}>
        <div style={{ display: 'grid', gap: 24 }}>
          {([
            { perPage: true, pagination: true, move: true, label: '셋 다' },
            { perPage: true, pagination: true, move: false, label: 'Move to Page 끔' },
            { perPage: false, pagination: true, move: true, label: 'Per Page 끔' },
            { perPage: false, pagination: true, move: false, label: 'Pagination 만' },
          ] as const).map((c) => (
            <div key={c.label}>
              <div style={{ marginBottom: 8, fontFamily: 'var(--font-family-base)', fontSize: 12, color: 'var(--sys-color-neutral-600)' }}>
                {c.label}
              </div>
              <PaginationGroup
                total={9}
                current={1}
                showPerPage={c.perPage}
                showPagination={c.pagination}
                showMoveToPage={c.move}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 24 }}>
          {([
            { current: 1, label: 'Rear — 현재 1' },
            { current: 9, label: 'Both — 현재 9' },
            { current: 20, label: 'Front — 현재 20' },
          ] as const).map((c) => (
            <div key={c.label}>
              <div style={{ marginBottom: 8, fontFamily: 'var(--font-family-base)', fontSize: 12, color: 'var(--sys-color-neutral-600)' }}>
                {c.label} (총 20)
              </div>
              <PaginationGroup total={20} current={c.current} />
            </div>
          ))}
        </div>
      </div>
    </Web>
  ),
};

/** 실제로 눌러 가며 페이지를 넘겨 보세요. 위 목록이 현재 페이지에 맞춰 바뀝니다. */
export const 실제동작: Story = {
  name: '실제 동작',
  args: {},
  parameters: { controls: { disable: true } },
  render: function Render() {
    const TOTAL_ROWS = 237;
    const [perPage, setPerPage] = useState(10);
    const [current, setCurrent] = useState(1);
    const total = Math.max(1, Math.ceil(TOTAL_ROWS / perPage));
    const safe = Math.min(current, total);
    const from = (safe - 1) * perPage + 1;
    const to = Math.min(TOTAL_ROWS, safe * perPage);

    return (
      <Web>
        <div
          style={{
            marginBottom: 16,
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--typography-body-2-size)',
            color: 'var(--sys-color-neutral-800)',
          }}
        >
          전체 {TOTAL_ROWS}건 중 <strong>{from}–{to}</strong>건 · {safe} / {total} 페이지
        </div>
        <PaginationGroup
          total={total}
          current={safe}
          perPage={perPage}
          onChange={setCurrent}
          onPerPageChange={(n) => { setPerPage(n); setCurrent(1); }}
        />
      </Web>
    );
  },
};
