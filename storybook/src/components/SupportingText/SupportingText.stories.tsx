import type { Meta, StoryObj } from '@storybook/react-vite';
import { SupportingText, SUPPORTING_TEXT_THEMES } from './SupportingText';
import { namesOf } from '../Icon/registry';
import { Cell, Row, Section } from '../../shared/story-helpers';

const FILLED_ICONS = namesOf('filled');

const meta = {
  title: 'Components/Global/Supporting Text',
  component: SupportingText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '입력 필드 아래에 붙는 **헬퍼·에러·성공 문구**입니다.',
          '**Size(3) × Theme(6) × Text Count(2) = 36개 변형.** `components/global/` 소속입니다.',
          '',
          '## 변형 축 3개 + 별도 프로퍼티 3개',
          '',
          '| 종류 | 이름 | 값 |',
          '|---|---|---|',
          '| variant 축 | Size / Theme / Text Count | 3 × 6 × 2 = **36개** |',
          '| 텍스트 | `Text` | 안내 문구 |',
          '| boolean | `Show Icon` | 아이콘 표시 여부 |',
          '| **인스턴스 스왑** | `Icon S` · `Icon M` | 아이콘 글리프 교체 |',
          '',
          '**아이콘 기본 글리프는 `warning_filled`** 입니다 (S는 12px, M·L은 16px).',
          '',
          '⚠️ **스왑 슬롯은 `Icon S`와 `Icon M` 둘뿐이고, L은 `Icon M`을 그대로 공유**합니다.',
          '`Icon L`은 존재하지 않습니다 — M과 L의 아이콘 크기가 16px로 같기 때문입니다.',
          '',
          '⚠️ **아이콘 위 여백 1px은 S에만 붙습니다** (M·L은 없음).',
          '',
          '## 세 축이 서로 완전히 독립적입니다',
          '',
          '| 축 | 바꾸는 것 | 안 바꾸는 것 |',
          '|---|---|---|',
          '| **Theme** | 본문·아이콘 **색만** | 크기, 여백, 카운터 색 |',
          '| **Size** | 타이포·패딩·아이콘 크기만 | 색 |',
          '| **Text Count** | 카운터 **유무만** | 높이, 색 |',
          '',
          '## 헷갈리기 쉬운 규칙 3가지',
          '',
          '**1. 카운터는 Theme을 따라가지 않습니다.** 에러(빨강)든 성공(초록)이든',
          '글자 수 카운터는 **항상 `neutral/500` 회색 고정**입니다.',
          '',
          '**2. "Black" 테마는 검정이 아닙니다.** 이름과 달리 실제 값은 `neutral/700`(`#454C58`) 진회색입니다.',
          '',
          '**3. M과 L은 글자 크기가 같습니다.** 둘 다 Caption1 12px Regular · 아이콘 16px이고,',
          '**좌우 패딩만** 12px → 14px로 다릅니다. 실제 크기 단계를 만드는 건 S→M뿐입니다.',
          '',
          '| Size | 타이포 | 아이콘 | 위 패딩 | 좌우 패딩 | 높이 |',
          '|---|---|---|---|---|---|',
          '| S | Caption2 10/16 **Medium** | 12px | 4px | 10px | 20px |',
          '| M | Caption1 12/18 Regular | 16px | 4px | 12px | 22px |',
          '| L | Caption1 12/18 Regular | 16px | 6px | **14px** | 24px |',
          '',
          '## ⚠️ 확인이 필요한 것들',
          '- **Gray와 Black의 사용 구분 기준**이 없습니다 (Default=Gray, Focus=Black 인지 등).',
          '- Figma는 **너비 280px 고정**입니다. 실제 입력 필드 폭에 맞춰 늘어나야 하는지 판단이 필요합니다.',
          '- 36개 중 **10개만 실측**됐고 나머지 26개는 축 독립성에 근거한 추정입니다.',
          '',
          '스펙 원본: [`components/global/supporting-text/supporting-text.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/global/supporting-text/supporting-text.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    theme: { control: 'select', options: SUPPORTING_TEXT_THEMES },
    iconName: { control: 'select', options: FILLED_ICONS, description: 'Figma 인스턴스 스왑 슬롯(Icon S / Icon M). 기본 글리프 warning_filled' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof SupportingText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { children: '8자 이상 입력해주세요', size: 'm', theme: 'gray', showIcon: true, iconName: 'warning_filled', showCount: false, current: 12, max: 50 },
};

/** Theme 6종입니다. **카운터가 회색으로 고정**되는 것을 확인해 보세요. */
export const Themes: Story = {
  args: { children: '안내 문구' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {SUPPORTING_TEXT_THEMES.map((theme) => (
        <div key={theme} style={{ marginBottom: 12 }}>
          <span className="bd-cell__label">{theme}{theme === 'black' ? ' (실제로는 neutral/700 진회색)' : ''}</span>
          <SupportingText theme={theme} showCount current={12} max={50}>
            안내 문구입니다
          </SupportingText>
        </div>
      ))}
    </div>
  ),
};

/** Size 3종입니다. M과 L은 글자가 같고 좌우 여백만 다릅니다. */
export const Sizes: Story = {
  args: { children: '안내 문구' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['s', 'Caption2 10 Medium · 아이콘 12 · 좌우 10 · 높이 20'],
        ['m', 'Caption1 12 Regular · 아이콘 16 · 좌우 12 · 높이 22'],
        ['l', 'Caption1 12 Regular · 아이콘 16 · 좌우 14 · 높이 24'],
      ] as const).map(([size, desc]) => (
        <div key={size} style={{ marginBottom: 14 }}>
          <span className="bd-cell__label">{size.toUpperCase()} · {desc}</span>
          <span style={{ display: 'block', background: 'var(--sys-color-brand-primary-lightest)' }}>
            <SupportingText size={size} showCount current={12} max={50}>
              안내 문구입니다
            </SupportingText>
          </span>
        </div>
      ))}
    </div>
  ),
};

/** 카운터 유무와 아이콘 유무 조합입니다. */
export const Contents: Story = {
  args: { children: '안내 문구' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['아이콘 + 글자 + 카운터', true, true],
        ['아이콘 + 글자', true, false],
        ['글자 + 카운터 (Show Icon=False)', false, true],
        ['글자만', false, false],
      ] as const).map(([label, icon, count]) => (
        <div key={label} style={{ marginBottom: 12 }}>
          <span className="bd-cell__label">{label}</span>
          <span style={{ display: 'block', background: 'var(--sys-color-neutral-100)' }}>
            <SupportingText showIcon={icon} showCount={count} current={12} max={50}>
              안내 문구입니다
            </SupportingText>
          </span>
        </div>
      ))}
    </div>
  ),
};

/** 실제 쓰임새 — 유효성 검증 결과 표시입니다. */
export const 실사용예시: Story = {
  name: '실사용 예시',
  args: { children: '안내 문구' },
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="기본 안내">
        <div style={{ width: 260 }}>
          <SupportingText theme="gray" iconName="info_filled">영문·숫자 8자 이상</SupportingText>
        </div>
      </Cell>
      <Cell label="오류">
        <div style={{ width: 260 }}>
          <SupportingText theme="destructed">비밀번호가 일치하지 않아요</SupportingText>
        </div>
      </Cell>
      <Cell label="성공">
        <div style={{ width: 260 }}>
          <SupportingText theme="success" iconName="verified_filled">사용할 수 있는 아이디예요</SupportingText>
        </div>
      </Cell>
    </Row>
  ),
};
