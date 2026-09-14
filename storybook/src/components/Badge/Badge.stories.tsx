import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, NumericBadge, BADGE_THEMES, type BadgeSize } from './Badge';
import { Cell, Row, Section } from '../../shared/story-helpers';
import { namesOf } from '../Icon/registry';

const OUTLINED_ICONS = namesOf('outlined');


const SIZES: BadgeSize[] = ['s', 'm', 'l'];
const LABEL: Record<string, string> = {
  gray: '대기중', brand: '신규', success: '완료', destructed: '오류',
  warning: '주의', purple: '이벤트', turquoise: '구독중',
};

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '상태·카테고리·개수를 짧게 표시하는 라벨입니다. **210개 인스턴스** (Content 126 + Numeric 84), Figma에서는 **4개 Component Set**으로 나뉘어 있습니다.',
          '',
          '## ⚠️ State 축이 아예 없습니다',
          'Hover·Pressed·Disabled 변형이 Figma에 **존재하지 않습니다.** 클릭할 수 없는 정적 표시자로 설계됐습니다.',
          '',
          '## 두 가지 하위 유형',
          '- **Content Badge** — 텍스트(+선택 아이콘) 필(pill). Type: `solid` / `alpha` / `outlined`',
          '- **Numeric Badge** — 숫자 전용. 한 자리는 정원, 두 자리 이상은 캡슐형. Type: `solid` / `empty`',
          '',
          '## 헷갈리기 쉬운 규칙 4가지',
          '',
          '**1. L만 Medium(500)** 입니다 — S/M은 Semibold(600).',
          'Button은 반대로 **S만 Semibold**였습니다. 두 컴포넌트의 규칙이 서로 반대입니다.',
          '',
          '**2. 아이콘 크기가 텍스트만큼 커지지 않습니다.** S와 M이 **둘 다 12px**이고 L에서만 16px이 됩니다.',
          '',
          '**3. Show Icon=True일 때만 M/L의 좌우 패딩이 비대칭**이 됩니다 (왼쪽 크게, 오른쪽 작게).',
          '**S는 예외** — Show Icon과 무관하게 항상 좌우 6px 대칭입니다.',
          '',
          '**4. S만 상하 패딩이 비대칭**(위 1px / 아래 2px)입니다. Numeric S도 하단에 1px이 추가로 붙습니다 — 배지 고유의 광학 보정입니다.',
          '',
          '## Outlined 테두리의 알파 비대칭',
          '**Gray만 알파 20%**이고 나머지 6개 테마는 전부 **40%** 입니다.',
          '컬러 스텝도 통일되어 있지 않습니다 — Brand/Destructed/Warning/Purple은 `-500`, Success/Turquoise는 `-600`.',
          '(단, 이는 `colors.json`의 `paletteDefaultStep`과 일치해 의도된 설계로 보입니다.)',
          '',
          '## ⚠️ 확인 필요',
          'Alpha 타입의 Success/Destructed/Purple/Turquoise 배경은 변수맵으로 **값만** 확인했고,',
          '실제 렌더링까지 직접 실측한 것은 Warning뿐입니다 — 나머지는 패턴 추정입니다.',
          '',
          '스펙 원본: [`components/badge/badge.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/badge/badge.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    iconName: {
      control: 'select',
      options: OUTLINED_ICONS,
      description: '아이콘 이름. 전체 목록은 **Components → Icon → 전체 갤러리** 에서 볼 수 있습니다',
    },
    theme: { control: 'select', options: BADGE_THEMES },
    size: { control: 'inline-radio', options: SIZES },
    type: { control: 'inline-radio', options: ['solid', 'alpha', 'outlined'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { children: '신규', theme: 'brand', size: 'm', type: 'solid', showIcon: false },
};

/** Content Badge — Theme 7종 × Type 3종입니다. */
export const ContentThemes: Story = {
  name: 'Content · Theme × Type',
  args: { children: '신규' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['solid', 'alpha', 'outlined'] as const).map((type) => (
        <Section key={type} title={`Type = ${type}`}>
          <Row>
            {BADGE_THEMES.map((theme) => (
              <Cell key={theme} label={theme}>
                <Badge theme={theme} type={type}>{LABEL[theme]}</Badge>
              </Cell>
            ))}
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** Content Badge — Size 3종 × Show Icon입니다. 패딩 비대칭 규칙을 확인해 보세요. */
export const ContentSizes: Story = {
  name: 'Content · Size × Show Icon',
  args: { children: '신규' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {SIZES.map((size) => (
        <Section
          key={size}
          title={`Size = ${size.toUpperCase()} · ${{ s: 'caption2 600 · 아이콘 12', m: 'caption1 600 · 아이콘 12', l: 'body2 500 · 아이콘 16' }[size]}`}
        >
          <Row>
            <Cell label="Show Icon=False"><Badge size={size} theme="brand">신규</Badge></Cell>
            <Cell label={`Show Icon=True${size === 's' ? ' (S는 패딩 불변)' : ' (좌우 비대칭)'}`}>
              <Badge size={size} theme="brand" showIcon>신규</Badge>
            </Cell>
            <Cell label="alpha"><Badge size={size} theme="brand" type="alpha" showIcon>신규</Badge></Cell>
            <Cell label="outlined"><Badge size={size} theme="brand" type="outlined" showIcon>신규</Badge></Cell>
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** Numeric Badge — 한 자리는 정원, 두 자리 이상은 캡슐형입니다. 높이는 동일하게 유지됩니다. */
export const Numeric: Story = {
  name: 'Numeric · 전체',
  args: { children: '신규' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {SIZES.map((size) => (
        <Section key={size} title={`Size = ${size.toUpperCase()} · ${{ s: '18px', m: '22px', l: '24px' }[size]}`}>
          <Row>
            <Cell label="Solid · 0~9 (정원)"><NumericBadge count={3} size={size} theme="destructed" /></Cell>
            <Cell label="Solid · 10+ (캡슐)"><NumericBadge count={99} size={size} theme="destructed" /></Cell>
            <Cell label="Solid · 최댓값 초과"><NumericBadge count={128} size={size} theme="destructed" /></Cell>
            <Cell label="Empty · 0~9"><NumericBadge count={3} size={size} theme="destructed" type="empty" /></Cell>
            <Cell label="Empty · 10+"><NumericBadge count={99} size={size} theme="destructed" type="empty" /></Cell>
          </Row>
        </Section>
      ))}
      <Section title="Theme 7종 (Solid · M)">
        <Row>
          {BADGE_THEMES.map((theme) => (
            <Cell key={theme} label={theme}>
              <NumericBadge count={5} theme={theme} />
            </Cell>
          ))}
        </Row>
      </Section>
    </div>
  ),
};
