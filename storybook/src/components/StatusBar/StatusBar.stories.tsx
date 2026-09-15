import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBar } from './StatusBar';
import { Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Status Bar',
  component: StatusBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '화면 목업 상단에 얹는 **기기 상태바 목업**입니다. **OS(2) × Mode(2) × Background(2) = 8개 변형**(완전 직교, 전수 실측).',
          '',
          '실제 인터랙션 요소가 아니라, 화면 디자인 시 상단에 얹어 실제 기기처럼 보이게 하는 **장식용 프레임**입니다.',
          '8개 변형 모두 **390×50px 고정**입니다.',
          '',
          '## iOS와 Android는 레이아웃 구조 자체가 다릅니다',
          '',
          '| | iOS | Android |',
          '|---|---|---|',
          '| 정렬 | Time · 노치 스페이서 · 아이콘의 **3분할** | 좌우 **양끝 정렬** |',
          '| 아이콘 배치 | flex `gap: 7px` (+ 위 패딩 1px) | auto-layout이 아닌 **고정 좌표** (0 / 17.42 / 38px) |',
          '| 패딩 | 16 / 11px | 24 / 10px |',
          '| 노치 공간 | Dynamic Island 스페이서 125×37px | **없음** |',
          '| 시각 | `9:41` (Apple 목업 표준) | `9:30` (Google 목업 표준) |',
          '| 폰트 | SF Pro Semibold **weight 590** · 17/22 | Roboto Medium · 14/20 |',
          '',
          '## Background 축의 규칙',
          '`On`은 **Mode와 같은 색**의 단색 배경을 채웁니다 (Light→흰색, Dark→검정).',
          '`Off`는 배경이 아예 없어 화면 콘텐츠 위에 겹쳐 쓰는 용도입니다.',
          '**Background는 시간·아이콘 색이나 구조에 전혀 영향을 주지 않습니다** — Mode만 콘텐츠를 결정합니다.',
          '',
          '## ✅ 2026-09-15 — 원본 에셋으로 교체했습니다',
          '',
          '디자이너가 Figma에서 상태바 요소를 전부 **오브젝트(벡터)로 만들어 주어**,',
          '예전의 "실측 치수에 맞춰 근사 재현한 SVG"를 **원본 벡터**로 교체했습니다 →',
          '`assets/status-bar/` 8개 파일(`fill="currentColor"`).',
          '',
          '**시각(9:41 / 9:30)도 라이브 텍스트가 아니라 윤곽선 벡터입니다.**',
          '저장소에 SF Pro·Roboto가 없어 폰트로는 절대 똑같이 나오지 않던 부분이 이걸로 해소됐습니다.',
          '모든 요소가 Figma와 **0.01px 이내로 일치**합니다.',
          '',
          '> `time` prop으로 시각을 바꾸면 텍스트로 그립니다 — 그때는 시스템 폰트로 대체되어 글자 모양이 달라집니다.',
          '> 정확한 모습이 필요하면 비워 두세요.',
          '',
          '## ⚠️ 눈여겨볼 두 가지',
          '',
          '**1. 아이콘은 Mode별 별도 파일이 아닙니다.** 파일 하나이고 벡터의 채우기가 색상 변수에 바인딩되어',
          '`common/black-emphasis` ↔ `common/white-emphasis`로 값만 바뀝니다. (예전 문서의 "다크 전용 별도 SVG"는 오기였습니다)',
          '',
          '**2. Android의 Wifi만 Mode마다 투명도가 다릅니다** — Light **10%** · Dark **20%**.',
          '나머지 투명도(iOS 배터리 테두리 35%·캡 40%, Android 배터리 몸통 30%)는 두 Mode가 같습니다.',
          '',
          '- Android의 펀치홀 카메라 표현 여부는 Figma에 정의가 없습니다 — 확인 필요.',
          '',
          '스펙 원본: [`components/status-bar/status-bar.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/status-bar/status-bar.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    os: { control: 'inline-radio', options: ['ios', 'android'] },
    mode: { control: 'inline-radio', options: ['light', 'dark'] },
    background: { control: 'inline-radio', options: ['on', 'off'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof StatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { os: 'ios', mode: 'light', background: 'on' },
};

/** 8개 변형 전체입니다. Background=Off는 아래 체크 배경 위에 겹쳐 보여줍니다. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['ios', 'android'] as const).map((os) => (
        <Section key={os} title={`OS = ${os.toUpperCase()}`}>
          {(['light', 'dark'] as const).map((mode) => (
            <div key={mode} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              <span className="bd-cell__label">{`Mode=${mode} · Background=On`}</span>
              <div style={{ outline: '1px solid #EDEEF0', width: 390 }}>
                <StatusBar os={os} mode={mode} background="on" />
              </div>
              <span className="bd-cell__label">{`Mode=${mode} · Background=Off (투명 — 아래 배경이 비칩니다)`}</span>
              <div
                style={{
                  width: 390,
                  outline: '1px solid #EDEEF0',
                  background:
                    mode === 'dark'
                      ? 'linear-gradient(135deg, #202837 0%, #36517E 100%)'
                      : 'linear-gradient(135deg, #EEF4FC 0%, #FFFFFF 100%)',
                }}
              >
                <StatusBar os={os} mode={mode} background="off" />
              </div>
            </div>
          ))}
        </Section>
      ))}
    </div>
  ),
};

/** 실제 화면 목업 위에 얹었을 때의 모습입니다. */
export const 화면목업예시: Story = {
  name: '화면 목업에 얹은 예시',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div
      style={{
        width: 390,
        height: 320,
        borderRadius: 24,
        overflow: 'hidden',
        background: 'var(--sys-color-common-white-default)',
        boxShadow: '0 12px 24px -4px rgba(70,77,89,0.32)',
      }}
    >
      <StatusBar os="ios" mode="light" background="on" />
      <div style={{ padding: 20, fontFamily: 'var(--font-family-base)' }}>
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: 'var(--sys-color-brand-secondary-default)' }}>바드림</h2>
        <p style={{ marginTop: 8, fontSize: 14, color: 'var(--sys-color-neutral-600)' }}>
          상태바 위에 화면 콘텐츠가 이어집니다.
        </p>
      </div>
    </div>
  ),
};
