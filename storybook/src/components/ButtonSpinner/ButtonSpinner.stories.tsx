import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonSpinner, SPINNER_GEOMETRY } from './ButtonSpinner';
import figmaS from './figma-reference/figma-s-ring13.png';
import figmaM from './figma-reference/figma-m-ring15.png';
import figmaL from './figma-reference/figma-l-ring16.png';
import figmaInButton from './figma-reference/figma-in-button-ring18.svg';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Button/Button Spinner',
  component: ButtonSpinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '버튼이 비동기 작업을 처리하는 동안 보여주는 로딩 인디케이터입니다.',
          '',
          '## ✅ 2026-09-14 — Figma 원본 애셋을 직접 받아 전부 확정했습니다',
          '',
          'Figma 애셋 서버에서 **원본 SVG·PNG를 내려받아 픽셀 단위로 실측**하고,',
          '버튼 안에 들어있는 **인스턴스의 실제 크기**까지 직접 확인했습니다.',
          '',
          '### 모양 — 잘린 호가 아니라 "완전한 링 + 원뿔 그라디언트"',
          '',
          'XL 원본 SVG의 채우기 값이 이걸 확정해 줍니다:',
          '',
          '```',
          'conic-gradient(from 90deg, #202837 0deg, #FDFDFD 360deg)   ← -135° 회전 적용 → 실효 315deg',
          '```',
          '',
          '링은 **한 군데도 끊기지 않은 360° 원**이고, 그 링이 원뿔형 그라디언트로 칠해져 있습니다.',
          '',
          '### 색 — 꼬리는 **버튼 배경색**, 머리는 **라벨 색**입니다',
          '',
          'Primary 버튼 안에 실제로 들어있는 스피너 애셋의 채우기를 받아보면 이렇습니다:',
          '',
          '```',
          'conic-gradient(from 90deg, #2C7BE2 0deg, #FDFDFD 360deg)',
          '                          ↑ 버튼 배경    ↑ 라벨 색',
          '```',
          '',
          '시작색이 버튼 배경(`brand/primary-default`)과 **정확히 같습니다.** 즉 꼬리가 배경에 녹아 사라지고',
          '머리만 라벨 색으로 또렷하게 남는 구조입니다.',
          '',
          '컴포넌트 셋 단독 애셋은 `#202837 → #FDFDFD` 인데, 이건 그 진열 캔버스의 배경이 남색이기 때문입니다.',
          '**배경색이 무엇이든 "배경 → 라벨색"이라는 규칙은 동일합니다.**',
          '',
          '그래서 구현은 `transparent → currentColor` 로 했습니다. 프리멀티플라이드 합성이라',
          '어떤 배경 위에서든 Figma와 **픽셀 단위로 같은 결과**가 나오고, 배경색을 알 필요가 없습니다.',
          '',
          '시작각은 Figma의 `from 90deg` 에 -135° 회전 행렬이 곱해진 **실효 315°** 입니다.',
          '',
          '### 크기 — 버튼은 **XL 변형을 쓰지 않습니다**',
          '',
          '컴포넌트 셋에는 4개 변형이 있지만, 실제 버튼 안에 들어가는 조합은 이렇습니다.',
          '',
          '| 쓰는 곳 | 스피너 프레임 | 패딩 | **링** | 어떤 변형인가 |',
          '|---|---|---|---|---|',
          '| Button S | 18 | 2.5 | 13 | S |',
          '| Button M | 22 | 3.5 | 15 | M |',
          '| Button L | 22 | 3 | 16 | L |',
          '| **Button XL** | 24 | 3 | **18** | L을 24로 키움 |',
          '| **Button 2XL** | 24 | 3 | **18** | L을 24로 키움 |',
          '| Text Button S | 18 | 2.5 | 13 | S |',
          '| Text Button M | 22 | 3.5 | 15 | M |',
          '| **Text Button L** | 24 | 3 | **18** | L을 24로 키움 |',
          '| **Text Button XL** | 24 | 3 | **18** | L을 24로 키움 |',
          '',
          '**XL 변형(프레임 24 · 패딩 0 · 링 24px)은 어느 버튼에서도 쓰이지 않습니다.**',
          '큰 버튼들은 L 변형을 프레임만 24px로 키워 쓰며, 패딩 3px이 유지되므로 링은 18px이 됩니다.',
          '',
          '> 이전 구현은 Button XL·2XL에 XL 변형(링 24px)을 써서 스피너가 **33% 크게** 보였습니다. 2026-09-14 수정됨.',
          '',
          '## ⚠️ 아직 확인이 필요한 것',
          '',
          '- **회전 주기·이징** — Figma에 모션 데이터가 전혀 없습니다. 기본 `900ms linear` 는 구현값입니다.',
          '- **애셋 형태 불일치** — S/M/L은 래스터 PNG(2배 해상도), XL만 SVG로 내보내집니다.',
          '',
          '스펙 원본: [`components/button/button-spinner/button-spinner.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/button/button-spinner/button-spinner.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l', 'xl'] },
    frame: { control: { type: 'range', min: 14, max: 40, step: 1 }, description: '프레임만 키움 (패딩 유지 → 링이 커짐)' },
    tone: { control: 'inline-radio', options: [undefined, 'on-fill', 'on-light'], description: '⚠️ Figma 원본이 아닌 단색 버전' },
    stroke: { control: { type: 'range', min: 1, max: 5, step: 0.25 }, description: '비워두면 링 지름에 비례해 자동 계산' },
    duration: { control: { type: 'range', min: 300, max: 2000, step: 50 }, description: '⚠️ Figma에 모션 데이터 없음' },
    'aria-label': {
      control: 'text',
      table: { category: '접근성' },
      description: '화면에 글자가 없을 때 스크린리더가 읽을 이름입니다. **디자인 변형 축이 아닙니다.**',
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof ButtonSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { size: 'l', frame: 24, duration: 900 },
};

/** 컴포넌트 셋의 4개 변형입니다. **XL 변형은 어느 버튼도 쓰지 않습니다.** */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      <Section title="컴포넌트 셋의 4개 변형 — Figma 진열 캔버스와 같은 남색 배경 위">
        <p style={{ fontSize: 12, color: '#8D9199', fontFamily: 'var(--font-family-base)', margin: '0 0 10px', maxWidth: 620, lineHeight: 1.6 }}>
          스피너는 꼬리가 배경색에 녹아드는 구조라, <strong>흰 배경에 올리면 꼬리가 사라져 링이 끊긴 것처럼 보입니다.</strong>
          Figma 컴포넌트 셋도 남색 캔버스 위에 놓여 있어, 여기서도 같은 배경을 씁니다.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 32,
            padding: 20,
            borderRadius: 12,
            background: '#202837',
            color: 'var(--sys-color-common-white-default)',
            width: 'fit-content',
          }}
        >
          {(['s', 'm', 'l', 'xl'] as const).map((size) => {
            const g = SPINNER_GEOMETRY[size];
            return (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                <ButtonSpinner size={size} />
                <span style={{ fontSize: 10, color: 'rgba(253,253,253,0.7)', fontFamily: 'var(--font-family-base)', whiteSpace: 'nowrap' }}>
                  {size.toUpperCase()} · 링 {g.ring} · 두께 {g.stroke}
                </span>
              </div>
            );
          })}
        </div>
      </Section>
      <Section title="버튼이 실제로 쓰는 조합">
        <div
          style={{
            display: 'flex',
            gap: 32,
            padding: 20,
            borderRadius: 12,
            background: 'var(--sys-color-brand-primary-default)',
            color: 'var(--sys-color-common-white-default)',
            width: 'fit-content',
          }}
        >
          {([
            ['Button S', 's' as const, undefined, 13],
            ['Button M', 'm' as const, undefined, 15],
            ['Button L', 'l' as const, undefined, 16],
            ['Button XL·2XL', 'l' as const, 24, 18],
          ] as const).map(([label, size, frame, ring]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <ButtonSpinner size={size} frame={frame} />
              <span style={{ fontSize: 10, color: 'rgba(253,253,253,0.7)', fontFamily: 'var(--font-family-base)', whiteSpace: 'nowrap' }}>
                {label} · 링 {ring}
              </span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="채워진 버튼 위 — 꼬리가 배경에 녹아들고 머리만 라벨 색으로 남습니다">
        <div
          style={{
            display: 'flex',
            gap: 28,
            padding: 20,
            borderRadius: 12,
            background: 'var(--sys-color-brand-primary-default)',
            color: 'var(--sys-color-common-white-default)',
            width: 'fit-content',
          }}
        >
          <ButtonSpinner size="s" />
          <ButtonSpinner size="m" />
          <ButtonSpinner size="l" />
          <ButtonSpinner size="l" frame={24} />
        </div>
      </Section>
    </div>
  ),
};

/** 배경이 달라도 규칙은 같습니다 — 꼬리는 배경에 녹고 머리는 라벨 색입니다. */
export const 배경별: Story = {
  name: '배경별 동작',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {[
        ['Primary · 파란 배경', 'var(--sys-color-brand-primary-default)', 'var(--sys-color-common-white-default)'],
        ['Destructed · 빨간 배경', 'var(--sys-color-theme-destructed-default)', 'var(--sys-color-common-white-default)'],
        ['Secondary · 연한 파랑', 'var(--sys-color-brand-primary-lightest)', 'var(--sys-color-brand-primary-default)'],
        ['Tertiary · 연회색', 'var(--sys-color-neutral-100)', 'var(--sys-color-neutral-600)'],
      ].map(([label, bg, fg]) => (
        <Cell key={label} label={label}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              padding: '12px 16px',
              borderRadius: 12,
              background: bg,
              color: fg,
              fontFamily: 'var(--font-family-base)',
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            신청하기
            <ButtonSpinner size="l" frame={24} />
          </span>
        </Cell>
      ))}
    </Row>
  ),
};

/* ---------------- Figma 원본과 직접 대조 ---------------- */

/**
 * 원본 애셋은 **자기가 놓일 배경색에서 시작하는 그라디언트**입니다.
 * 그래서 흰 배경 위에 올려놓으면 머리(흰색)가 사라지고 꼬리(배경색)만 보여 거꾸로 보입니다.
 * 아래 비교는 각 애셋을 **원래 의도된 배경 위에** 올려서 보여줍니다.
 */
const REF = [
  // assetSize = 원본 파일의 내재 크기(논리 px).
  //   PNG 3종은 링만 잘라 내보낸 파일이라 assetSize === ring 이지만,
  //   SVG 는 패딩까지 포함한 24px 캔버스라 assetSize(24) !== ring(18) 입니다.
  //   이 값으로 표시해야 두 쪽의 링이 같은 배율로 보입니다.
  { label: 'S', ring: 13, assetSize: 13, stroke: 1.5, size: 's' as const, src: figmaS, bg: '#202837', head: '#FDFDFD' },
  { label: 'M', ring: 15, assetSize: 15, stroke: 2, size: 'm' as const, src: figmaM, bg: '#202837', head: '#FDFDFD' },
  { label: 'L', ring: 16, assetSize: 16, stroke: 2, size: 'l' as const, src: figmaL, bg: '#202837', head: '#FDFDFD' },
  {
    label: '버튼 XL·2XL',
    ring: 18,
    assetSize: 24,
    stroke: 2.25,
    size: 'l' as const,
    frame: 24,
    src: figmaInButton,
    bg: '#2C7BE2',
    head: '#FDFDFD',
  },
];

/** 원본과 구현을 같은 배경·같은 배율로 나란히 놓는 한 칸 */
function ComparePair({
  item,
  scale,
}: {
  item: (typeof REF)[number];
  scale: number;
}) {
  const box = Math.max(item.assetSize, item.frame ?? item.ring) * scale + 24;
  const cell = (title: string, content: React.ReactNode) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div
        style={{
          width: box,
          height: box,
          display: 'grid',
          placeItems: 'center',
          background: item.bg,
          borderRadius: 8,
        }}
      >
        {content}
      </div>
      <span style={{ fontSize: 11, color: '#8D9199', fontFamily: 'var(--font-family-base)' }}>{title}</span>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      {cell(
        'Figma 원본',
        <img
          src={item.src}
          alt=""
          width={item.assetSize * scale}
          height={item.assetSize * scale}
          style={{ display: 'block' }}
        />,
      )}
      {cell(
        '구현',
        <div style={{ transform: `scale(${scale})`, color: item.head, display: 'inline-flex' }}>
          <ButtonSpinner size={item.size} frame={item.frame} />
        </div>,
      )}
    </div>
  );
}

/**
 * **Figma 원본 애셋과 이 구현을 나란히 놓고 비교합니다.**
 *
 * 비교를 위해 구현 쪽 **회전은 멈춰두었습니다** (Figma 애셋은 정지 이미지이므로).
 * 실제 동작하는 회전은 다른 스토리에서 보세요.
 */
export const 원본대조: Story = {
  name: '✅ Figma 원본과 대조',
  args: {},
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)' }}>
      {/* 비교 중에는 회전을 멈춥니다 */}
      <style>{`.bd-compare .bd-spinner__ring { animation: none !important; }`}</style>

      <p style={{ fontSize: 13, color: '#5B616C', maxWidth: 680, lineHeight: 1.7, marginTop: 0 }}>
        원본 애셋은 <strong>자기가 놓일 배경색에서 시작하는 그라디언트</strong>입니다
        (S·M·L은 진열 캔버스인 남색 <code>#202837</code>, 버튼용은 버튼 배경인 <code>#2C7BE2</code>).
        그래서 흰 배경에 올리면 머리와 꼬리가 뒤집혀 보입니다 — 아래는 <strong>각자의 원래 배경 위에</strong> 올려 비교합니다.
        <br />
        두 개가 <strong>같은 두께·같은 지름·같은 그라디언트</strong>로 보이면 정상입니다.
      </p>

      <div className="bd-compare">
        <Section title="1) 실제 크기">
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
            {REF.map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#202837' }}>
                  {item.label} · 링 {item.ring}px · 두께 {item.stroke}px
                </span>
                <ComparePair item={item} scale={1} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="2) 6배 확대 — 선 굵기 정밀 비교">
          <div style={{ display: 'flex', gap: 44, flexWrap: 'wrap' }}>
            {REF.map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#202837' }}>
                  {item.label} · 링 {item.ring}px · 두께 {item.stroke}px
                </span>
                <ComparePair item={item} scale={6} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  ),
};
