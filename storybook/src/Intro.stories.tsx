import type { Meta, StoryObj } from '@storybook/react-vite';
import { ALL_TOKENS, byPrefix } from './foundations/tokens';
import { ALL_ICONS } from './components/Icon/registry';

const REPO = 'https://github.com/asmangosteen/real-badream-design-system';

const DONE = [
  ['Button', '935개 = 11조합×5Size×17 ✅검증', 'components-button--docs'],
  ['Text Button', '156개 · 배경 없는 인라인 버튼 ✅검증', 'components-text-button--docs'],
  ['Icon Button', '108개 = 9조합×3Size×4State ✅검증', 'components-icon-button--docs'],
  ['Button Spinner', '4개 · 원본 애셋 대조 ✅', 'components-button-spinner--docs'],
  ['Badge', '210개 · Content + Numeric', 'components-badge--docs'],
  ['Checkbox', '48개 · Angular + Rounded · Size 16/20px', 'components-checkbox--docs'],
  ['Radio Button', '24개 · Size S/M/L', 'components-radio-button--docs'],
  ['Toggle', '24개 · 전수 실측', 'components-toggle--docs'],
  ['Chip', '190개 · Selection + Filter', 'components-chip--docs'],
  ['Segmented Control', '20개 · _Item 조합', 'components-segmented-control--docs'],
  ['Tab', '10개 · 오버플로우 페이드', 'components-tab--docs'],
  ['Text Input', '768개 · 4개 아톰 조합', 'components-text-input--docs'],
  ['Text Input Group', '6개 · 필드 2~3개', 'components-text-input-group--docs'],
  ['Dropdown', '288개 · 선택형 입력', 'components-dropdown--docs'],
  ['Divider', '16개', 'components-divider--docs'],
  ['Avatar', '7개', 'components-avatar--docs'],
  ['Page Control', '70개 · 축소 규칙', 'components-page-control--docs'],
  ['Status Bar', '8개 · ⚠️ 원본 에셋 필요', 'components-status-bar--docs'],
  ['Footer', '2개 · ⚠️ 홈 전용', 'components-footer--docs'],
  ['Icon', '648개 SVG 갤러리', 'components-icon--docs'],
  ['Global · Label', '6개', 'components-global-label--docs'],
  ['Global · Text Blinker', '2개 · 커서', 'components-global-text-blinker--docs'],
  ['Global · Text Count', '6개 · 글자 수', 'components-global-text-count--docs'],
  ['Global · Type Box', '12개 · 입력 콘텐츠', 'components-global-type-box--docs'],
  ['Global · Supporting Text', '36개 · 헬퍼 문구', 'components-global-supporting-text--docs'],
  ['Global · Segmented Control Item', '10개', 'components-global-segmented-control-item--docs'],
  ['Global · Tab Item', '12개', 'components-global-tab-item--docs'],
  ['Nav · Leading', '8개 · 좌측 영역', 'components-navigation-bar-leading--docs'],
  ['Nav · Trailing', '4+3개 · 우측 액션', 'components-navigation-bar-trailing--docs'],
  ['Nav · Smalltitle', '8개 · 중앙 영역', 'components-navigation-bar-smalltitle--docs'],
  ['Nav · Top', '32개 · 플래그십', 'components-navigation-bar-top--docs'],
  ['Top Bar', '10개 · 최종 합성', 'components-top-bar--docs'],
  ['Date', '11개 · 날짜 셀', 'components-date-time-picker-date--docs'],
  ['Week · Month', '달력 그리드', 'components-date-time-picker-week-month--docs'],
  ['Time Picker', '시간 입력 3종', 'components-date-time-picker-time-picker--docs'],
  ['Date Picker', '4개 · 패밀리 플래그십', 'components-date-time-picker-date-picker--docs'],
] as const;

const TODO = [
  'Bottom Navigation Bar — Figma에 아직 없습니다 (components/navigation-bar/bottom/ 예정)',
];

const meta = {
  title: '시작하기/소개',
  parameters: { layout: 'padded', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const card: React.CSSProperties = {
  padding: 16,
  borderRadius: 12,
  border: '1px solid #EDEEF0',
  background: '#fff',
};

export const 소개: Story = {
  name: '이 스토리북은 무엇인가요',
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', color: '#202837', maxWidth: 860, lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>바드림 디자인 시스템</h1>
      <p style={{ fontSize: 16, color: '#5B616C', margin: '0 0 28px' }}>
        배달라이더를 위한 전기이륜차 구독 플랫폼 <strong>바드림</strong>의 컴포넌트 카탈로그입니다.
        Figma 스펙을 실제로 동작하는 코드로 옮겨, 눈으로 보고 직접 눌러볼 수 있게 만들었습니다.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
        {[
          ['43', '컴포넌트'],
          [String(ALL_ICONS.length), '아이콘 SVG'],
          [String(ALL_TOKENS.length), '디자인 토큰'],
          [String(byPrefix('--sys-color-').length), '시스템 컬러'],
        ].map(([n, label]) => (
          <div key={label} style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--sys-color-brand-primary-default)' }}>{n}</div>
            <div style={{ fontSize: 12, color: '#8D9199' }}>{label}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>어떻게 보면 되나요</h2>
      <ol style={{ paddingLeft: 20, margin: '0 0 28px', fontSize: 14, color: '#464D59' }}>
        <li><strong>왼쪽 목록</strong>에서 컴포넌트를 고릅니다.</li>
        <li><strong>Playground</strong> — 아래 Controls 패널에서 옵션을 바꿔가며 봅니다. Figma의 Variant 드롭다운과 같습니다.</li>
        <li><strong>All Variants</strong> — 모든 변형을 한 화면에 펼칩니다. <strong>Figma 파일을 옆에 띄워놓고 1:1로 대조</strong>해 보세요.</li>
        <li><strong>Docs 탭</strong> — 스펙 요약과 주의할 점, 확인이 필요한 항목이 정리되어 있습니다.</li>
      </ol>

      <div style={{ ...card, background: '#EDF8F3', borderColor: '#C6EBDB', marginBottom: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>✅ 2026-09-14 — 버튼 4종을 Figma 원본과 대조 검증했습니다</div>
        <div style={{ fontSize: 14, color: '#5B616C' }}>
          Figma MCP로 <strong>Button · Text Button · Icon Button · Button Spinner</strong>의 변형 1,203개를 전수 읽어
          구현과 대조했습니다. 그 결과 <strong>오류 4건을 고치고</strong>, 저장소 스펙 문서에서 &ldquo;확인 필요&rdquo;로
          남아 있던 항목 <strong>3건을 확정</strong>했습니다. 자세한 내용은 각 컴포넌트 Docs 탭을 봐주세요.
          <br />
          <strong>저장소의 43개 컴포넌트를 모두 구현했습니다.</strong>
        </div>
      </div>

      <div style={{ ...card, background: '#FFF3ED', borderColor: '#FFD9C4', marginBottom: 28 }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>⚠️ 각 컴포넌트 Docs 탭의 &ldquo;확인이 필요한 것들&rdquo;을 꼭 봐주세요</div>
        <div style={{ fontSize: 14, color: '#5B616C' }}>
          Figma에 정의가 없어 구현 단계에서 정한 값들(포커스 링, 애니메이션 속도, 스피너 링 두께 등)과,
          Figma 실측 결과가 이상한 지점(Icon-only의 L/XL 아이콘 크기, Destructed+Stroke의 변형 이름 불일치,
          Text Button S의 간격 0px 등)을 전부 표시해 두었습니다. <strong>디자이너 확인이 필요한 목록입니다.</strong>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>만들어진 컴포넌트</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 10, marginBottom: 28 }}>
        {DONE.map(([name, desc, id]) => (
          <a
            key={name}
            href={`?path=/docs/${id}`}
            style={{ ...card, textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{name}</div>
            <div style={{ fontSize: 12, color: '#8D9199' }}>{desc}</div>
          </a>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>남은 것</h2>
      <ul style={{ paddingLeft: 20, margin: '0 0 28px', fontSize: 14, color: '#5B616C' }}>
        {TODO.map((t) => <li key={t} style={{ marginBottom: 4 }}>{t}</li>)}
      </ul>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px' }}>값의 기준</h2>
      <p style={{ fontSize: 14, color: '#5B616C', margin: '0 0 12px' }}>
        모든 수치는 저장소 <code>tokens/tokens.css</code>를 <strong>복사하지 않고 직접 읽습니다.</strong>
        아이콘도 <code>assets/icons/</code>의 원본 SVG를 그대로 씁니다. 토큰이나 아이콘을 바꾸면 이 화면도 즉시 따라 바뀝니다.
      </p>
      <p style={{ fontSize: 14, color: '#5B616C', margin: '0 0 12px' }}>
        <strong>값이 충돌하면 Figma가 기준입니다.</strong> 저장소는 Figma의 파생본이고, 이 스토리북은 저장소의 파생본입니다.
      </p>
      <p style={{ fontSize: 14 }}>
        <a href={REPO} target="_blank" rel="noreferrer" style={{ color: 'var(--sys-color-brand-primary-default)' }}>
          저장소 열기 ↗
        </a>
      </p>
    </div>
  ),
};
