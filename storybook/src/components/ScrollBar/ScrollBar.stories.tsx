import { useEffect, type CSSProperties, type ReactNode, type RefObject } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollBar, SCROLLBAR_MIN_THUMB } from './ScrollBar';
import { useScrollIndicator, SCROLLBAR_HOLD_MS } from './useScrollIndicator';
import { Cell, Row, Section } from '../../shared/story-helpers';

const REPO = 'https://github.com/asmangosteen/real-badream-design-system/blob/main';

/**
 * ScrollBar 는 `position: absolute` 라 **반드시 `position: relative` 인 부모**가 필요합니다.
 * 스토리에서는 이 상자가 "감싸는 컴포넌트" 역할을 합니다.
 */
function Frame({
  width = 180,
  height = 180,
  offset,
  inset,
  children,
}: {
  width?: number;
  height?: number;
  /** 고정되는 변의 여백(px). 안 주면 컴포넌트 기본값 2px */
  offset?: number;
  /** 나머지 두 변의 여백(px). 안 주면 0 */
  inset?: number;
  children: ReactNode;
}) {
  return (
    <div
      style={
        {
          position: 'relative',
          width,
          height,
          boxSizing: 'border-box',
          background: 'var(--sys-color-neutral-50, #fbfbfb)',
          // ⚠️ border 를 쓰면 box-sizing:border-box 때문에 트랙이 2px 짧아집니다
          //    (절대 위치는 패딩 박스를 기준으로 잡히기 때문). outline 은 레이아웃에 영향이 없습니다.
          outline: '1px dashed var(--ref-color-gray-900-10)',
          borderRadius: 'var(--ref-radius-04)',
          ...(offset !== undefined ? { '--bd-scrollbar-offset': `${offset}px` } : null),
          ...(inset !== undefined ? { '--bd-scrollbar-inset': `${inset}px` } : null),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

const meta = {
  title: 'Components/Scroll Bar',
  component: ScrollBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '스크롤 가능한 영역의 현재 위치를 보여주는 **순수 표시용 인디케이터**입니다.',
          '',
          '**Figma 컴포넌트 설명 원문**(디자이너 작성):',
          '',
          '> Absolute Position 상태로 다른 컴포넌트에 Overlay 해서 사용됩니다.',
          '> 스크롤을 하면 노출되며, 멈춰있는 상태일 경우 노출하지 않습니다.',
          '> Vertical, Horizontal 각 Type의 높이와 너비는 컴포넌트의 규격에 비례합니다.',
          '> 노출 위치는 Vertical은 컴포넌트의 우측 끝에서 8px 떨어진 곳, Horizontal은 하단 끝에서 8px 떨어진 곳입니다.',
          '',
          '> **⚠️ 마지막 문장은 2026-09-18 디자이너 지시로 8px → `2px` 로 바뀌었습니다** ("다시 보니 8px 은 너무 크다").',
          '> 위 인용은 Figma 원문 그대로이며 **구현·문서의 기준은 2px** 입니다. Figma 설명 원문도 갱신이 필요합니다.',
          '',
          '## 구조는 2겹뿐입니다',
          '',
          '| 층 | 내용 |',
          '|---|---|',
          '| 트랙 | **배경이 없습니다.** 스크롤 가능한 전체 길이만 나타냅니다 |',
          '| thumb | 유일하게 보이는 요소. `gray/900-40` · radius 999px · 두께 6px |',
          '',
          '레일이 보이지 않고 thumb 만 떠 있는 iOS 스타일 오버레이 스크롤바입니다.',
          '',
          '## ⚠️ Position 은 상태 3단계가 아닙니다',
          '',
          'Figma 의 `Top / Middle / Bottom` 은 **스크롤 진행률 0% / 50% / 100% 예시 스냅샷**입니다.',
          '실제 스크롤바는 연속적으로 움직이므로, 서비스 코드에서는 `position` 대신 **`progress`(0~1)** 를 씁니다.',
          '',
          '```',
          'thumb 길이 = max(24px, 트랙 길이 × (보이는 영역 ÷ 전체 콘텐츠))',
          'thumb 위치 = (트랙 길이 − thumb 길이) × 진행률',
          '```',
          '',
          '**Figma 의 thumb 길이 60px 과 y 좌표(0·60·120)는 트랙 180px 에서만 맞아떨어지는 예시값**이라',
          '구현에 옮기지 않았습니다 — 디자이너 확인 완료(2026-09-18).',
          '',
          '## Horizontal 에서 Top / Bottom 은 좌 / 우 입니다',
          '',
          '| Position | Vertical | Horizontal |',
          '|---|---|---|',
          '| `top` | 위쪽 끝 | **왼쪽 끝** |',
          '| `middle` | 가운데 | 가운데 |',
          '| `bottom` | 아래쪽 끝 | **오른쪽 끝** |',
          '',
          '축 이름이 세로 기준이라 헷갈릴 수 있지만 **Figma 변형 이름을 그대로 유지**하기로 했습니다.',
          '',
          '## 배치',
          '',
          '`position: absolute` 라 **부모에 `position: relative` 가 필요합니다.** 여백은 CSS 변수로 열려 있습니다.',
          '',
          '| 변수 | 기본값 | 뜻 |',
          '|---|---|---|',
          '| `--bd-scrollbar-offset` | **`2px`** | 고정되는 변 (Vertical=우측 · Horizontal=하단) |',
          '| `--bd-scrollbar-inset` | `0px` | **나머지 두 변** — 감싸는 컴포넌트가 정합니다 |',
          '',
          '실사용 인스턴스가 0 · 11 · 13px 로 제각각인 것은 불일치가 아니라 **의도된 자유도**입니다.',
          '',
          '## OS 기본 스크롤바는 꺼야 합니다',
          '',
          '커스텀 오버레이 스크롤바를 쓰면서 네이티브 스크롤바를 그대로 두면 **두 개가 동시에 보입니다.**',
          '스크롤 컨테이너에 `.bd-scroll-area` 클래스를 주면 막대만 감춰집니다(스크롤 기능은 그대로).',
          '',
          '```html',
          '<div class="bd-scroll-area" style="position: relative; overflow: auto">',
          '  …콘텐츠…',
          '  <ScrollBar visible={…} progress={…} ratio={…} />',
          '</div>',
          '```',
          '',
          '⚠️ 데스크톱에서는 마우스로 끌 수 있는 막대가 사라집니다. 이 컴포넌트가 드래그를 받지 않으므로',
          '**모바일 전용 영역에만 쓰세요.** 휠·키보드 스크롤은 영향받지 않습니다.',
          '',
          '## ⚠️ 구현에서 정한 것 (Figma 근거 없음 · 2026-09-18 디자이너 지시)',
          '',
          `- thumb **최소 길이 ${SCROLLBAR_MIN_THUMB}px**`,
          `- 자동 숨김 — 등장 즉시 · 멈춘 뒤 **${SCROLLBAR_HOLD_MS}ms** 대기 · **300ms** 페이드아웃`,
          '- **드래그 불가** — `pointer-events: none` · `aria-hidden="true"`',
          '',
          `스펙 원본: [\`components/scroll-bar/scroll-bar.md\`](${REPO}/components/scroll-bar/scroll-bar.md)`,
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    position: {
      control: 'inline-radio',
      options: ['top', 'middle', 'bottom'],
      description: 'Figma `Position` 축. 진행률 0% / 50% / 100% 예시입니다. `progress` 를 주면 무시됩니다.',
    },
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: '스크롤 진행률 0~1. **실제 서비스는 이쪽을 씁니다.**',
    },
    ratio: {
      control: { type: 'range', min: 0.02, max: 1, step: 0.01 },
      description: '보이는 영역 ÷ 전체 콘텐츠. thumb 길이를 정합니다.',
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof ScrollBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { type: 'vertical', position: 'top', ratio: 1 / 3, visible: true },
  render: (args) => (
    <Frame width={args.type === 'horizontal' ? 220 : 180} height={180}>
      <ScrollBar {...args} />
    </Frame>
  ),
};

/**
 * Figma 컴포넌트 셋의 **6개 변형 전체**입니다.
 * Figma 진열 그대로 트랙 180px · thumb 60px(`ratio` 1/3) 이고, 여백 없이 트랙만 보여줍니다.
 *
 * 여기는 Figma 변형을 그대로 대조하는 자리라 **일부러 정지 상태**입니다.
 * 실제로 움직이는 모습은 **`실제 동작 (자동 재생)`** 스토리에서 보세요.
 */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="Type=Vertical — 트랙 6×180 · thumb 6×60">
        <Row>
          {(['top', 'middle', 'bottom'] as const).map((position) => (
            <Cell key={position} label={`Position=${position}`}>
              <Frame width={6} height={180} offset={0}>
                <ScrollBar type="vertical" position={position} />
              </Frame>
            </Cell>
          ))}
        </Row>
      </Section>

      <Section title="Type=Horizontal — 트랙 180×6 · thumb 60×6 (top=왼쪽 · bottom=오른쪽)">
        <div style={{ display: 'grid', gap: 16 }}>
          {(['top', 'middle', 'bottom'] as const).map((position) => (
            <Cell key={position} label={`Position=${position}`}>
              <Frame width={180} height={6} offset={0}>
                <ScrollBar type="horizontal" position={position} />
              </Frame>
            </Cell>
          ))}
        </div>
      </Section>
    </div>
  ),
};

/**
 * **가만히 두면 알아서 움직입니다.** 상자들이 자동으로 왕복 스크롤하면서
 * 스크롤바가 나타나고 → 따라 움직이고 → 멈추면 1초 뒤 300ms 에 걸쳐 사라지는
 * **한 사이클 전체**를 반복해서 보여줍니다.
 *
 * **마우스를 올리면 자동 재생이 멈춰** 직접 스크롤해 볼 수 있고, 치우면 다시 움직입니다.
 *
 * 함께 보이는 것들:
 * - **thumb 길이와 이동 거리는 반비례합니다.** 왼쪽(20개)은 thumb 이 짧은 대신 트랙을 거의 다 훑고,
 *   오른쪽(8개)은 thumb 이 긴 대신 조금만 움직입니다 — 둘 다 맞는 동작입니다.
 * - **OS 기본 스크롤바는 꺼 두었습니다**(`.bd-scroll-area`). 안 그러면 두 개가 같이 보입니다.
 */
export const 실제동작: Story = {
  name: '실제 동작 (자동 재생)',
  args: {},
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <div style={{ display: 'grid', gap: 32 }}>
        <Section title="Vertical — 우측 끝에서 2px">
          <Row>
            <Cell label="항목 20개 · thumb 짧고 많이 움직임">
              <VerticalDemo count={20} auto />
            </Cell>
            <Cell label="항목 8개 · thumb 길고 조금 움직임">
              <VerticalDemo count={8} auto />
            </Cell>
          </Row>
        </Section>

        <Section title="Horizontal — 하단 끝에서 2px">
          <HorizontalDemo count={14} auto />
        </Section>
      </div>
    );
  },
};

/**
 * 스토리에서 **스크롤바가 실제로 움직이는 것을 보여주기 위한** 자동 왕복 스크롤입니다.
 * 컴포넌트 기능이 아니라 데모 장치입니다.
 *
 * **현재 위치에서 한 틱씩 밀어내는 방식**이라, 사용자가 중간에 손으로 스크롤해도
 * 튀지 않고 그 자리에서 이어집니다(휠·터치를 감지하면 2초간 비켜 줍니다).
 *
 * 양 끝에 도달하면 1.6초 멈춥니다 — 그동안 `1000ms` 뒤 `300ms` 페이드아웃이
 * 실제로 일어나므로 **노출/숨김 사이클까지 그대로 보입니다.**
 */
function useAutoScroll(ref: RefObject<HTMLElement | null>, axis: 'vertical' | 'horizontal') {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const TICK = 50;        // ms
    const STEPS = 60;       // 한쪽 끝에서 반대쪽까지 걸리는 틱 수 → 3초
    const HOLD_TICKS = 32;  // 끝에서 멈추는 틱 수 → 1.6초 (숨김 1000 + 페이드 300 을 담고도 남음)
    const USER_TICKS = 40;  // 손으로 스크롤한 뒤 쉬는 틱 수 → 2초

    let dir = 1;
    let hold = 0;
    let userHold = 0;
    const takeOver = () => { userHold = USER_TICKS; };
    node.addEventListener('wheel', takeOver, { passive: true });
    node.addEventListener('touchstart', takeOver, { passive: true });
    node.addEventListener('pointerdown', takeOver);

    const id = setInterval(() => {
      const vertical = axis === 'vertical';
      const max = vertical
        ? node.scrollHeight - node.clientHeight
        : node.scrollWidth - node.clientWidth;
      if (max <= 0) return;
      if (userHold > 0) { userHold -= 1; return; }
      if (hold > 0) { hold -= 1; return; }

      const cur = vertical ? node.scrollTop : node.scrollLeft;
      let next = cur + dir * Math.max(2, max / STEPS);
      if (next >= max) { next = max; dir = -1; hold = HOLD_TICKS; }
      else if (next <= 0) { next = 0; dir = 1; hold = HOLD_TICKS; }

      // ⚠️ `node.scrollTop = …` 로 직접 대입하면 안 됩니다 —
      //    상위에 `scroll-behavior: smooth` 가 걸려 있으면 대입할 때마다 부드러운 스크롤이
      //    새로 시작되면서 서로를 덮어써 제자리에 머뭅니다. `behavior: 'instant'` 로 못박습니다.
      node.scrollTo({ [vertical ? 'top' : 'left']: next, behavior: 'instant' });
    }, TICK);

    return () => {
      clearInterval(id);
      node.removeEventListener('wheel', takeOver);
      node.removeEventListener('touchstart', takeOver);
      node.removeEventListener('pointerdown', takeOver);
    };
  }, [ref, axis]);
}

function VerticalDemo({ count, auto = false }: { count: number; auto?: boolean }) {
  const [ref, scroll] = useScrollIndicator<HTMLDivElement>();
  useAutoScroll(auto ? ref : { current: null }, 'vertical');
  return (
    <div
      ref={ref}
      // OS 기본 스크롤바를 숨겨 ScrollBar 만 보이게 합니다 (ScrollBar.css 의 보조 클래스)
      className="bd-scroll-area"
      style={{
        position: 'relative',
        width: 220,
        height: 180,
        overflowY: 'auto',
        boxSizing: 'border-box',
        border: '1px solid var(--ref-color-gray-900-10)',
        borderRadius: 'var(--ref-radius-06)',
        background: 'var(--sys-color-common-white-default)',
      }}
    >
      <div>
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            style={{
              padding: '12px 16px',
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--typography-body-2-size)',
              color: 'var(--sys-color-neutral-800)',
            }}
          >
            항목 {i + 1}
          </div>
        ))}
      </div>
      {scroll.vertical.scrollable && (
        <ScrollBar
          type="vertical"
          visible={scroll.visible}
          progress={scroll.vertical.progress}
          ratio={scroll.vertical.ratio}
        />
      )}
    </div>
  );
}

function HorizontalDemo({ count, auto = false }: { count: number; auto?: boolean }) {
  const [ref, scroll] = useScrollIndicator<HTMLDivElement>();
  useAutoScroll(auto ? ref : { current: null }, 'horizontal');
  return (
    <div
      ref={ref}
      // OS 기본 스크롤바를 숨겨 ScrollBar 만 보이게 합니다 (ScrollBar.css 의 보조 클래스)
      className="bd-scroll-area"
      style={{
        position: 'relative',
        width: 460,
        overflowX: 'auto',
        boxSizing: 'border-box',
        border: '1px solid var(--ref-color-gray-900-10)',
        borderRadius: 'var(--ref-radius-06)',
        background: 'var(--sys-color-common-white-default)',
      }}
    >
      <div style={{ display: 'flex', gap: 12, padding: '16px 16px 24px' }}>
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 auto',
              width: 96,
              height: 96,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 'var(--ref-radius-04)',
              background: 'var(--sys-color-neutral-100)',
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--typography-body-2-size)',
              color: 'var(--sys-color-neutral-600)',
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      {scroll.horizontal.scrollable && (
        <ScrollBar
          type="horizontal"
          visible={scroll.visible}
          progress={scroll.horizontal.progress}
          ratio={scroll.horizontal.ratio}
        />
      )}
    </div>
  );
}

/**
 * thumb 길이는 `max(24px, 트랙 × ratio)` 입니다.
 *
 * 트랙 180px 기준으로 `ratio` 가 **약 0.133** 아래로 내려가면 계산값이 24px 보다 작아져
 * **하한이 걸립니다.** 하한이 걸린 뒤에도 진행률 1 에서는 트랙 끝에 정확히 닿습니다
 * (이동 거리를 그만큼 줄이기 때문입니다 — 맨 아래 줄에서 확인하세요).
 */
export const ThumbLength: Story = {
  name: 'thumb 길이 규칙 (최소 24px)',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => {
    const TRACK = 180;
    const rows = [1, 1 / 2, 1 / 3, 1 / 6, 1 / 12, 1 / 20];
    return (
      <div>
        <Section title={`ratio 별 thumb 길이 — 트랙 ${TRACK}px · 진행률 0`}>
          <Row>
            {rows.map((ratio) => {
              const raw = Math.round(TRACK * ratio * 10) / 10;
              const clamped = Math.max(SCROLLBAR_MIN_THUMB, raw);
              return (
                <Cell
                  key={ratio}
                  label={
                    <>
                      ratio {ratio.toFixed(3)}
                      <br />
                      {raw}px{raw < SCROLLBAR_MIN_THUMB ? ` → ${clamped}px 하한` : ''}
                    </>
                  }
                >
                  <Frame width={6} height={TRACK} offset={0}>
                    <ScrollBar type="vertical" progress={0} ratio={ratio} />
                  </Frame>
                </Cell>
              );
            })}
          </Row>
        </Section>

        <Section title="하한이 걸려도 끝까지 도달합니다 — 진행률 1">
          <Row>
            {rows.map((ratio) => (
              <Cell key={ratio} label={`ratio ${ratio.toFixed(3)}`}>
                <Frame width={6} height={TRACK} offset={0}>
                  <ScrollBar type="vertical" progress={1} ratio={ratio} />
                </Frame>
              </Cell>
            ))}
          </Row>
        </Section>
      </div>
    );
  },
};

/**
 * 고정되는 변의 여백(`--bd-scrollbar-offset`)은 **2px 이 규칙**이지만,
 * 나머지 두 변(`--bd-scrollbar-inset`)은 **감싸는 컴포넌트가 정합니다.**
 * 실사용 인스턴스가 0 · 11 · 13px 로 제각각인 것은 의도된 자유도입니다.
 */
export const Placement: Story = {
  name: '배치 · 여백',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Section title="--bd-scrollbar-inset — 위·아래 여백을 사용처가 정합니다">
      <Row>
        {[0, 11, 13].map((inset) => (
          <Cell key={inset} label={`inset ${inset}px · 트랙 ${180 - inset * 2}px`}>
            <Frame width={120} height={180} inset={inset}>
              <ScrollBar type="vertical" progress={0.5} ratio={1 / 3} />
            </Frame>
          </Cell>
        ))}
      </Row>
    </Section>
  ),
};
