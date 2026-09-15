import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavLeading } from './NavLeading';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Navigation Bar/Top/Leading',
  component: NavLeading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Navigation Bar Top 의 **좌측 영역**입니다. **Type(4) × Mode(2) = 8개 변형**(완전 직교, 전수 실측).',
          '`components/navigation-bar/top/` 소속 서브 아톰입니다.',
          '',
          '## ⚠️ Home은 홈 화면 전용입니다',
          'Back·Close·Big Title은 여러 화면에서 골라 쓰는 범용 헤더이지만,',
          '**Home은 앱 첫 진입 화면에서만 쓰도록 의도된 Type**입니다 (사용자 확인, 강한 제약).',
          '다른 화면에 Home을 가져다 쓰면 의도된 사용 범위를 벗어납니다.',
          '',
          '## Type별 패딩이 전부 다릅니다',
          '',
          '| Type | 패딩 | 내용 |',
          '|---|---|---|',
          '| Back | 좌 12 · 세로 12 · **gap 0** | `backward` 24px + (선택) 라벨 Subtitle 18 Regular · **폭 48px 고정** |',
          '| Close | 좌 20 · **우 40** · 세로 12 | `close` 24px |',
          '| Big Title | 좌 20 · 세로 **10** | 제목 Title 20 SemiBold · **폭 230px 고정** |',
          '| Home | 좌 20 · 세로 **12** | 로고칸 230px 안에 워드마크 104×24 |',
          '',
          '**Close의 우측 패딩 40px이 유독 넓습니다** — X 아이콘이 화면 좌측 끝에 치우치지 않고',
          '살짝 안쪽으로 들어오게 하려는 의도로 추정됩니다.',
          '',
          '**Big Title과 Home은 레이아웃 패턴이 같지만 세로 패딩이 다릅니다** (10px vs 12px, 실측 확인).',
          '',
          '## Mode는 에셋이 아니라 **색 변수**를 바꿉니다',
          '아이콘·로고 모두 **파일은 하나**이고, 벡터의 채우기가 색상 변수에 바인딩되어 Mode에 따라 바뀝니다',
          '(`neutral/800` ↔ `common/white-default`). 별도 다크 에셋을 쓰는 방식이 아닙니다.',
          '',
          '**로고만 예외적으로 `neutral/600`입니다** — Light에서 제목·아이콘(`neutral/800`)보다 한 단계 옅습니다.',
          'Dark에서는 나머지와 같은 `common/white-default`입니다.',
          '',
          '## 아이콘+라벨 전체가 하나의 클릭 대상입니다',
          'Back·Close는 그 자체가 액션이라 **항상 `<button>`으로 렌더**됩니다 — 아이콘 위든 라벨 위든 커서가 바뀌고,',
          '키보드 Tab으로도 잡힙니다. Figma의 프레임 구조(아이콘+라벨을 묶은 하나의 프레임)를 그대로 옮긴 것입니다.',
          '',
          'Big Title·Home은 제목/로고라 기본적으로 정적이고, `onClick`을 주면 그때만 버튼이 됩니다.',
          '',
          '**⚠️ 색이 변하는 hover/pressed는 일부러 넣지 않았습니다.**',
          'Figma에서 Leading은 Icon Button 인스턴스가 아니라 **아이콘을 얹은 프레임**이라 상태 변형이 없습니다.',
          '우측 Trailing이 Icon Button이라 색까지 바뀌는 것과 대비되지만, **의도된 상태입니다**(디자이너 확인, 2026-09-15).',
          '커서와 포커스 링만 제공합니다 — ⚠️ 포커스 링은 Figma에 정의가 없어 구현에서 추가한 값입니다.',
          '',
          '## 2026-09-15 Figma 재실측으로 고친 것',
          '- 아이콘↔라벨 **gap이 8px로 잘못 들어가 있었습니다** → 실측값 **0** (Back 전체 폭이 92→84px로 교정).',
          '- Home 로고를 흰 배경이 깔린 컬러 로고 이미지로 그리고 있었습니다 → **단색 워드마크 + 토큰 색**으로 교체.',
          '  저장소에 단색 워드마크가 없어 Figma 원본을 그대로 내보내 `assets/logo/bi/signature/bi-signature-horizontal-mono.svg`로 추가했습니다.',
          '- 라벨·제목·로고칸의 **고정 폭**을 반영했습니다(디자이너 확인 — hug로 바꾸지 않습니다).',
          '  제품 화면에서 바꿔야 하면 `--bd-nav-leading-label-width` / `--bd-nav-leading-title-width` /',
          '  `--bd-nav-leading-logo-box-width` 를 덮어쓰면 됩니다.',
          '',
          '스펙 원본: [`components/navigation-bar/top/leading/leading.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/navigation-bar/top/leading/leading.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['back', 'close', 'big-title', 'home'] },
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
    className: { table: { disable: true } },
    onClick: { table: { disable: true } },
    'aria-label': { table: { category: '접근성' } },
  },
} satisfies Meta<typeof NavLeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { type: 'back', mode: 'light', showLabel: true, label: '뒤로', title: '착한구독' },
};

/** 8개 변형 전체입니다. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['light', 'dark'] as const).map((mode) => (
        <Section key={mode} title={`Mode = ${mode}`}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', padding: 12, background: mode === 'dark' ? 'var(--sys-color-common-black-default)' : 'transparent', borderRadius: 8, width: 'fit-content' }}>
            {([
              ['back', 'Back · 라벨 있음'],
              ['close', 'Close · 우측 패딩 40px'],
              ['big-title', 'Big Title · 세로 10px'],
              ['home', 'Home · 홈 전용'],
            ] as const).map(([type, label]) => (
              <Cell key={type} label={label}>
                <NavLeading type={type} mode={mode} label="뒤로" title="착한구독" />
              </Cell>
            ))}
          </div>
        </Section>
      ))}
      <Section title="Back · Show Label 토글 (어느 Top Type 에서든 자유롭게 켜고 끌 수 있습니다)">
        <Row>
          <Cell label="Show Label = True"><NavLeading type="back" label="뒤로" /></Cell>
          <Cell label="Show Label = False"><NavLeading type="back" showLabel={false} /></Cell>
        </Row>
      </Section>
      <Section title="클릭 대상 — 아이콘 위든 라벨 위든 같은 버튼입니다 (마우스를 올려 커서를 확인해 보세요)">
        <Row>
          <Cell label="Back · <button>"><NavLeading type="back" label="뒤로" onClick={() => {}} /></Cell>
          <Cell label="Close · <button>"><NavLeading type="close" onClick={() => {}} /></Cell>
          <Cell label="Big Title · 정적 (onClick 없음)"><NavLeading type="big-title" title="착한구독" /></Cell>
          <Cell label="Home · 정적 (onClick 없음)"><NavLeading type="home" /></Cell>
        </Row>
      </Section>
    </div>
  ),
};
