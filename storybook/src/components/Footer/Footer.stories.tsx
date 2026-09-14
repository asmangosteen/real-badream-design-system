import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Footer } from './Footer';
import { Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '앱 **홈 화면 최하단 전용** 푸터입니다. **Close / Open 2개 변형**(전수 실측).',
          '',
          '## ⚠️ 홈 화면 전용입니다',
          '다른 화면에 범용으로 재사용하지 않습니다 (사용자 확인, **강한 제약사항**).',
          '',
          '## 아코디언 동작',
          'Header(`CYCLOID Corp. 사업자 정보`)를 누르면 사업자 정보가 펼쳐집니다. 기본은 Close입니다.',
          '높이 **212px ↔ 334px** (차이 122px = Information 블록 118px + Main gap 4px).',
          '',
          '> Figma에 **모션 데이터가 없습니다** — 펼침 애니메이션은 별도 결정이 필요합니다.',
          '',
          '## ⚠️ 아래 여백 120px은 의도된 예외입니다',
          '',
          '저장소의 스크롤 화면 하단 규칙은 **40px**(`spacing/16`)이지만,',
          'Footer만 **120px**(`spacing/22`)을 씁니다 — 추후 추가될 **Bottom Navigation Bar와 겹치지 않도록**',
          '미리 자리를 비워두는 것입니다 (사용자 확인). **다른 컴포넌트에 일반화하지 마세요.**',
          '',
          '## 너비는 가변입니다',
          '푸터는 **화면(부모) 폭에 맞춰 늘어납니다.** Figma 의 390px 는 iPhone 14 진열 프레임 폭이고,',
          '콘텐츠 너비 350px 은 거기서 좌우 20px 마진을 뺀 값입니다. 고정되는 것은 좌우 마진 20px 뿐입니다.',
          '아래 예시는 보기 편하도록 390px 폭 안에 넣어 보여줍니다.',
          '',
          '## Divider를 양방향으로 재사용하는 실사용 예시입니다',
          '',
          '| 위치 | 방향 | 색 (오버라이드) |',
          '|---|---|---|',
          '| Main ↔ Sub 구분 | Horizontal | `gray/900-10` |',
          '| 하단 링크 구분자 | **Vertical** (높이 11px) | `neutral/400` |',
          '',
          'Divider의 기본색 `neutral/100`이 **고정이 아니라 자유 오버라이드 가능**하다는 근거가 되는 사례입니다.',
          '',
          '## ⚠️ 사업자 정보는 예시 데이터입니다',
          'Figma의 값(대표자·등록번호 등)은 표시용 placeholder입니다. **실 서비스 정보로 교체해야 합니다.**',
          '',
          '스펙 원본: [`components/footer/footer.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/footer/footer.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    state: { control: 'inline-radio', options: ['close', 'open'] },
    className: { table: { disable: true } },
    onToggle: { table: { disable: true } },
    info: { table: { disable: true } },
    links: { table: { disable: true } },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { state: 'close' },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <div style={{ width: 390 }}>
        <Footer {...args} onToggle={() => updateArgs({ state: args.state === 'open' ? 'close' : 'open' })} />
      </div>
    );
  },
};

/** 2개 변형입니다. Header를 눌러 직접 토글해 보세요. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: 390 }}>
        <span className="bd-cell__label">Close · 212px</span>
        <Footer state="close" />
      </div>
      <div style={{ width: 390 }}>
        <span className="bd-cell__label">Open · 334px</span>
        <Footer state="open" />
      </div>
    </div>
  ),
};

/** 실제로 눌러서 펼쳐보세요. */
export const 실제동작: Story = {
  name: '실제 동작',
  args: {},
  parameters: { controls: { disable: true } },
  render: function Render() {
    // ⚠️ useArgs 로 args 에 없는 키를 쓰면 Docs 페이지에서 값이 저장되지 않아 클릭해도 반응하지 않습니다.
    //    컴포넌트 prop 이 아닌 선택 상태는 useState 로 둡니다.
    const [open, setOpen] = useState(false);
    return (
      <Section title="Header 를 누르면 토글됩니다">
        <div style={{ width: 390 }}>
          <Footer state={open ? 'open' : 'close'} onToggle={() => setOpen((v) => !v)} />
        </div>
      </Section>
    );
  },
};
