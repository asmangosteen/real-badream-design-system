import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AVATAR_SIZES } from './Avatar';

const SAMPLE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#2C7BE2"/><circle cx="48" cy="38" r="16" fill="#fff"/><path d="M16 96c0-17.7 14.3-32 32-32s32 14.3 32 32z" fill="#fff"/></svg>`,
  );

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '사용자 프로필 이미지를 원형으로 표시합니다. **Size 축 하나만 있는** 7개 변형(전수 실측)입니다.',
          '',
          '**핵심 규칙** — 12px에서만 테두리가 `0.5px`로 얇고, 16px 이상은 전부 `1px`입니다.',
          '테두리 색(`rgba(3,9,26,0.05)`)과 radius(999px)는 전 사이즈 공통입니다.',
          '',
          'Hover/Pressed/Disabled 상태가 **없는 순수 표시용** 컴포넌트입니다. Chip 안에서는 항상 16px만 쓰입니다.',
          '',
          '**⚠️ Figma에 없어 구현에서 추가한 것 (디자이너 확인 필요)**',
          '- 이미지가 없거나 로드 실패했을 때의 **이니셜 폴백** — Figma에 폴백 정의가 없습니다.',
          '',
          '스펙 원본: [`components/avatar/avatar.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/avatar/avatar.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: AVATAR_SIZES },
    src: { control: 'text' },
    alt: {
      control: 'text',
      table: { category: '접근성' },
      description: '사용자를 식별할 수 있는 대체 텍스트입니다. **필수**입니다.',
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { src: SAMPLE, alt: '김바드', size: 40 },
};

/** Figma 컴포넌트 셋의 7개 변형 전체입니다. */
export const AllVariants: Story = {
  args: { alt: '김바드' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="bd-row">
      {AVATAR_SIZES.map((s) => (
        <div className="bd-cell" key={s}>
          <span className="bd-cell__label">
            {s}px · 테두리 {s === 12 ? '0.5px' : '1px'}
          </span>
          <Avatar src={SAMPLE} alt="김바드" size={s} />
        </div>
      ))}
    </div>
  ),
};

/** 이미지가 없을 때의 폴백입니다. ⚠️ Figma에 정의가 없는 구현 추가분입니다. */
export const 이미지없음: Story = {
  name: '이미지 없음 (구현 추가)',
  args: { alt: '김바드' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="bd-row">
      {[24, 32, 40, 48].map((s) => (
        <div className="bd-cell" key={s}>
          <span className="bd-cell__label">{s}px</span>
          <Avatar alt="김바드" size={s as 24} />
        </div>
      ))}
    </div>
  ),
};
