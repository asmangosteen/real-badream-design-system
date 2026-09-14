import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { SegmentedControl } from './SegmentedControl';
import { Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '여러 선택지 중 하나를 고르는 가로 배열 컨트롤입니다. **Size(5) × Count(2~5) = 20개 변형.**',
          '[`_Item`(Segmented Control Item)](/docs/components-global-segmented-control-item--docs) 을 조합해 만들어집니다.',
          '',
          '## 컨테이너 높이 공식',
          '',
          '`컨테이너 높이 = _Item 높이 + 컨테이너 padding × 2` — 5개 Size 전부 성립합니다.',
          '',
          '| Size | 컨테이너 padding | 세그먼트 gap | 컨테이너 radius | 높이 |',
          '|---|---|---|---|---|',
          '| XS | 2px | **2px** | 8px | 22+4 = **26px** |',
          '| S | 2px | **2px** | 8px (XS와 공유) | 26+4 = **30px** |',
          '| M | 4px | **4px** | 12px (단독) | 34+8 = **42px** |',
          '| L | 4px | **4px** | 16px | 40+8 = **48px** |',
          '| XL | 4px | **4px** | 16px (L과 공유) | 48+8 = **56px** |',
          '',
          '**gap 은 컨테이너 padding 과 항상 같은 값입니다** — 세그먼트가 트랙 안쪽 여백과 같은 간격으로 떨어집니다.',
          '',
          '> ⚠️ **2026-09-14 정정**: 초판 문서는 gap 을 6px/8px 로 기록했으나, Figma 재실측 결과 2px/4px 입니다.',
          '> 5개 Size × Count 2·5 전부 확인했습니다 (예: M Count=5 → `4 + 73.2×5 + 4×4 + 4 = 390px`).',
          '',
          '배경은 전 Size 공통 `color/gray/200`(`#F1F2F3`)입니다.',
          '',
          '**그룹핑 패턴이 `_Item` 과 같습니다** — XS+S 묶음 / M 단독 / L+XL 묶음.',
          '값은 다르지만(컨테이너 8·12·16px vs `_Item` 6·8·12px) 묶이는 방식은 동일합니다.',
          '',
          '## Count가 늘어도 컨테이너는 그대로입니다',
          '세그먼트가 2개든 5개든 **padding·gap·radius·높이가 전부 동일**하고, 각 `_Item` 이 폭만 나눠 갖습니다.',
          '',
          '## 너비는 가변입니다',
          '컨테이너 너비는 **고정이 아니라 부모(화면) 폭에 맞춰 늘어납니다.**',
          'Figma 노드에 박힌 390px 는 진열 프레임 폭일 뿐입니다.',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- 20개 중 **10개만 실측**됐고 나머지는 Count 축 독립성에 근거한 추정입니다.',
          '- `_Item` 에 Hover/Pressed 축이 없어 클릭 피드백 규정이 없습니다.',
          '',
          '> **참고**: 초기 조사 때 Size=S 라벨이 붙은 노드에 실제로는 XS 크기의 `_Item` 이 들어 있는 불일치가 발견됐고,',
          '> 이후 디자이너가 Figma 에서 라벨을 XS 로 정정해 해소되었습니다.',
          '',
          '스펙 원본: [`components/segmented-control/segmented-control.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/segmented-control/segmented-control.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 's', 'm', 'l', 'xl'] },
    className: { table: { disable: true } },
    onChange: { table: { disable: true } },
    'aria-label': { control: 'text', table: { category: '접근성' } },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { items: ['전체', '진행중', '완료'], value: 0, size: 'm' },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div style={{ width: 340 }}>
        <SegmentedControl {...args} onChange={(value) => updateArgs({ value })} />
      </div>
    );
  },
};

/** 5개 Size입니다. 높이가 26 / 30 / 42 / 48 / 56px로 올라갑니다. */
export const Sizes: Story = {
  args: { items: ['전체', '진행중'] },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 340 }}>
      {([
        ['xs', '26px · padding 2 · gap 2 · radius 8'],
        ['s', '30px · padding 2 · gap 2 · radius 8'],
        ['m', '42px · padding 4 · gap 4 · radius 12'],
        ['l', '48px · padding 4 · gap 4 · radius 16'],
        ['xl', '56px · padding 4 · gap 4 · radius 16'],
      ] as const).map(([size, desc]) => (
        <div key={size} style={{ marginBottom: 16 }}>
          <span className="bd-cell__label">{size.toUpperCase()} · {desc}</span>
          <SegmentedControl size={size} items={['전체', '진행중']} value={0} />
        </div>
      ))}
    </div>
  ),
};

/** Count 2~5입니다. 컨테이너 높이·여백이 전혀 변하지 않는 것을 확인해 보세요. */
export const Counts: Story = {
  args: { items: ['전체', '진행중'] },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 340 }}>
      <Section title="Size = M · Count 2~5 (높이 42px 고정)">
        {[
          ['전체', '진행중'],
          ['전체', '진행중', '완료'],
          ['전체', '대기', '진행중', '완료'],
          ['전체', '대기', '진행', '완료', '취소'],
        ].map((items) => (
          <div key={items.length} style={{ marginBottom: 12 }}>
            <span className="bd-cell__label">Count = {items.length}</span>
            <SegmentedControl items={items} value={0} />
          </div>
        ))}
      </Section>
    </div>
  ),
};

/** 실제로 클릭해서 전환해 보세요. */
export const 실제동작: Story = {
  name: '실제 동작',
  args: { items: ['착한구독', '신차구매', '중고구매'] },
  parameters: { controls: { disable: true } },
  render: function Render() {
    // ⚠️ useArgs 로 args 에 없는 키(picked 등)를 쓰면 Docs 페이지에서 값이 저장되지 않아
    //    클릭해도 반응하지 않습니다. 컴포넌트 prop 이 아닌 선택 상태는 useState 로 둡니다.
    const [picked, setPicked] = useState(0);
    return (
      <div style={{ width: 340 }}>
        <SegmentedControl
          items={['착한구독', '신차구매', '중고구매']}
          value={picked}
          onChange={setPicked}
          aria-label="구매 방식"
        />
      </div>
    );
  },
};

/* ---------------- 애니메이션 ---------------- */

function Demo({ label, size = 'm' }: { label: string; size?: 'xs' | 's' | 'm' | 'l' | 'xl' }) {
  const [i, setI] = useState(0);
  return (
    <div style={{ width: 340, marginBottom: 18 }}>
      <span className="bd-cell__label">{label}</span>
      <SegmentedControl
        size={size}
        items={['전체', '진행중', '완료', '취소']}
        value={i}
        onChange={setI}
        aria-label={label}
      />
    </div>
  );
}

/**
 * **항목을 눌러보세요.** 흰 pill 이 선택 위치로 미끄러집니다(200ms).
 *
 * 누를 때 줄어드는 효과는 넣지 않았습니다.
 */
export const 애니메이션: Story = {
  name: '선택 이동 애니메이션',
  args: { items: ['전체', '진행중', '완료', '취소'] },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="눌러보세요">
        <Demo label="Count = 4" />
      </Section>
      <Section title="Size 별 — 어느 크기에서도 정확히 안착합니다">
        {(['xs', 's', 'm', 'l', 'xl'] as const).map((sz) => (
          <Demo key={sz} label={sz.toUpperCase()} size={sz} />
        ))}
      </Section>
    </div>
  ),
};
