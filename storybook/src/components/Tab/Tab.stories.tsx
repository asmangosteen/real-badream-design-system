import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Tab } from './Tab';
import { Section } from '../../shared/story-helpers';

const ITEMS = [{ label: '전체' }, { label: '진행중' }, { label: '완료' }, { label: '취소' }];
// 오버플로우 데모용 — 390px 를 넘기려면 라벨이 실제 서비스처럼 길어야 합니다
const MANY = ['전체', '신청 대기', '심사 진행중', '계약 완료', '취소·반려', '보류', '재신청', '종료'].map((label) => ({ label }));

const meta = {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '여러 개의 [`_Item`(Tab Item)](/docs/components-global-tab-item--docs) 을 가로로 배열한 탭 바입니다. **10개 변형**(전수 실측).',
          '',
          '## Segmented Control과 다른 점',
          '',
          '| | Tab | Segmented Control |',
          '|---|---|---|',
          '| 배경 | **없음** (하단 구분선만) | 회색 트랙 |',
          '| 선택 표현 | 밑줄 | 흰 pill + 그림자 |',
          '| 바 높이 | **`_Item` 높이 그대로** (42/48px) | `_Item` + 컨테이너 패딩 |',
          '| 컨테이너 패딩 | 0 (Side Padding=False) | 항상 있음 |',
          '',
          '## 4개 축 중 2개는 Hug 전용입니다',
          '',
          '`Type=Fill` 은 **Tailing Icon·Side Padding 축이 아예 없습니다** (항상 False).',
          '10개 = Size(2) × [Hug의 2×2=4 + Fill의 1] = 2×5.',
          '',
          '| | Type=Hug | Type=Fill |',
          '|---|---|---|',
          '| 탭 너비 | 콘텐츠 크기 (`min-width: 32px`) | **균등 분할** |',
          '| 탭 간 gap | 24px 또는 20px | **0** (서로 맞닿음) |',
          '| "+" 버튼 | Tailing Icon=True 일 때 | **없음** |',
          '| 오버플로우 페이드 | **있음** | 없음 |',
          '| 탭 개수 | 최대 8개 | **5개 고정** |',
          '',
          '## ⚠️ Figma에서 발견한 이상한 지점 2가지',
          '',
          '**1. Side Padding=True 일 때 좌우가 비대칭입니다.**',
          'Tailing Icon=False면 좌우 대칭 20px이지만, Tailing Icon=True면',
          '왼쪽만 `spacing/11`(20px) 변수를 쓰고 **오른쪽은 `12px` 이 변수 바인딩 없이 하드코딩**되어 있습니다.',
          '',
          '**2. Side Padding이 gap에 주는 영향이 Size마다 다릅니다.**',
          'S는 Side Padding=True일 때 gap이 24px → **20px로 줄지만**, L은 **24px 그대로**입니다.',
          '의도인지 인스턴스 편차인지 확정되지 않았습니다.',
          '',
          '## 너비는 가변입니다',
          '탭 바 너비는 **고정이 아니라 부모(화면) 폭에 맞춰 늘어납니다.** Figma 노드의 390px 는 진열 프레임 폭입니다.',
          'Hug 의 스크롤 영역도 `컨테이너 폭 − 12px(gap) − "+" 슬롯` 으로 따라 늘어납니다.',
          '',
          '## 오버플로우 페이드',
          '`Type=Hug` 는 **탭 로우 자체가 가로 스크롤 컨테이너**입니다(스크롤바는 숨김).',
          '**그 방향에 숨겨진 탭이 남아 있을 때만** 가장자리 페이드가 보이고, 스크롤 끝에 닿으면 사라집니다.',
          '',
          '| 항목 | 값 |',
          '|---|---|',
          '| 페이드 폭 | **탭 바 높이와 동일** (S 42 · L 48px) |',
          '| 정지점 | 0/15/30/50/70/85/100% → alpha 0 / .08 / .22 / .42 / .64 / .82 / 1 (Figma `Alpha Gradient Mask` `2262:1908` 실측) |',
          '| 표시 조건 | 좌 `scrollLeft > 0` · 우 `scrollLeft + clientWidth < scrollWidth − 1` |',
          '| 전환 | `opacity` 200ms ease (레이아웃 변화 없는 크로스페이드) |',
          '| 갱신 트리거 | `scroll`(passive) · `ResizeObserver` · `window resize` · 탭 개수 변경 |',
          '',
          '클릭을 가로막지 않도록 `pointer-events: none` 입니다.',
          '',
          '## 선택 밑줄이 미끄러집니다',
          '탭마다 밑줄을 켜고 끄는 게 아니라 **막대 하나가 선택한 탭으로 이동**합니다',
          '(Segmented Control 의 흰 pill 과 같은 방식 · 200ms `cubic-bezier(0.32, 0.72, 0, 1)`).',
          '탭마다 폭이 달라 CSS 계산이 안 되므로 활성 탭을 실측해 옮기고, 글자색도 같은 곡선으로 전환됩니다.',
          '',
          '## "+" 는 Icon Button 컴포넌트입니다',
          'Figma(`2262:1842`)에서 Trailing 슬롯은 **탭 바 높이와 같은 정사각형**이고,',
          '그 안에 [Icon Button](/docs/components-icon-button--docs) **Ghost**(패딩 8px · radius 12px · `neutral/800`)이 들어갑니다.',
          '아이콘은 S 20px / L 24px 이라 각각 Icon Button **M(36px) / L(40px)** 과 정확히 일치합니다.',
          '스크롤 영역과 Trailing 슬롯 사이에는 `spacing/08`(12px) gap 이 있습니다.',
          '',
          '> ⚠️ **"+" 는 탭을 추가하는 버튼이 아닙니다.** 탭 목록과 무관한 메뉴가 펼쳐지는 버튼이라는 것까지는 확정됐지만,',
          '> 메뉴의 내용·모양은 아직 정해지지 않아 **눌러도 아무 동작을 하지 않습니다.** 저장소 `tab.md` 4장에도 같은 내용으로 정정해 두었습니다.',
          '`Tailing Icon=True` 면 "+" 버튼이 스크롤 영역 뒤에 고정되므로, 오른쪽 페이드는 그 앞(스크롤 영역 끝)에 붙습니다.',
          '',
          '스펙 원본: [`components/tab/tab.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/tab/tab.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'l'] },
    type: { control: 'inline-radio', options: ['hug', 'fill'] },
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },

    'aria-label': { control: 'text', table: { category: '접근성' } },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 눌러서 전환되는 살아있는 예시입니다. */
function Live({ items, value: initialValue = 0, ...rest }: React.ComponentProps<typeof Tab>) {
  const [value, setValue] = useState(initialValue);
  return <Tab {...rest} items={items} value={value} onChange={setValue} />;
}

export const Playground: Story = {
  args: { items: ITEMS, value: 0, size: 's', type: 'hug', tailingIcon: false, sidePadding: false },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div style={{ width: 390 }}>
        <Tab {...args} onChange={(value) => updateArgs({ value })} />
      </div>
    );
  },
};

/** 10개 변형 전체입니다. Fill에는 Tailing/Side Padding 조합이 없습니다. */
export const AllVariants: Story = {
  args: { items: ITEMS },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 390 }}>
      {(['s', 'l'] as const).map((size) => (
        <Section key={size} title={`Size = ${size.toUpperCase()} · 높이 ${size === 's' ? 42 : 48}px`}>
          {([
            ['Hug · Tailing=F · SidePadding=F', { type: 'hug' as const }],
            ['Hug · Tailing=T · SidePadding=F', { type: 'hug' as const, tailingIcon: true }],
            ['Hug · Tailing=F · SidePadding=T', { type: 'hug' as const, sidePadding: true }],
            ['Hug · Tailing=T · SidePadding=T (우측 12px 하드코딩)', { type: 'hug' as const, tailingIcon: true, sidePadding: true }],
            ['Fill · 탭 5개 균등 분할', { type: 'fill' as const }],
          ] as const).map(([label, extra]) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <span className="bd-cell__label">{label}</span>
              <Live
                size={size}
                items={extra.type === 'fill' ? [...ITEMS, { label: '보류' }] : ITEMS}
                value={0}
                {...extra}
              />
            </div>
          ))}
        </Section>
      ))}
    </div>
  ),
};

/**
 * **가로로 스크롤해 보세요.** 숨겨진 탭이 남아 있는 쪽에만 페이드가 보이고,
 * 끝에 닿으면 그쪽 페이드가 사라집니다.
 */
export const 오버플로우: Story = {
  name: '오버플로우 페이드',
  args: { items: MANY },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 390 }}>
      <Section title="스크롤 위치에 따라 좌·우 페이드가 켜지고 꺼집니다">
        <div style={{ marginBottom: 18 }}>
          <span className="bd-cell__label">탭 8개 · Hug · S (페이드 42px) — 처음엔 오른쪽만</span>
          <Live items={MANY} value={2} size="s" />
        </div>
        <div style={{ marginBottom: 18 }}>
          <span className="bd-cell__label">탭 8개 · Hug · L (페이드 48px)</span>
          <Live items={MANY} value={2} size="l" />
        </div>
        <div style={{ marginBottom: 18 }}>
          <span className="bd-cell__label">Tailing Icon=True — 오른쪽 페이드가 "+" 앞에 붙습니다</span>
          <Live items={MANY} value={2} size="s" tailingIcon />
        </div>
        <div>
          <span className="bd-cell__label">넘치지 않는 탭 4개 — 페이드가 아예 나타나지 않습니다</span>
          <Live items={ITEMS} value={0} size="s" />
        </div>
      </Section>
    </div>
  ),
};

/** `_Item` 의 Emphasize·Disabled 가 탭에서 어떻게 보이는지입니다. */
export const 항목상태: Story = {
  name: '항목 상태',
  args: { items: ITEMS },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 390 }}>
      <Live
        size="s"
        value={0}
        items={[{ label: '전체' }, { label: '오류', emphasize: true }, { label: '비활성', disabled: true }, { label: '완료' }]}
      />
    </div>
  ),
};

/** 실제로 클릭해서 전환해 보세요. */
export const 실제동작: Story = {
  name: '실제 동작',
  args: { items: ITEMS },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 390 }}>
      <Live items={ITEMS} value={0} aria-label="신청 상태" />
    </div>
  ),
};
