import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInputGroup } from './TextInputGroup';

const meta = {
  title: 'Components/Text Input/Text Input Group',
  component: TextInputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          '[Text Input](/docs/components-text-input--docs) 을 세로로 쌓은 조합 컴포넌트입니다.',
          '**Size(3) × Field(2·3) = 6개 변형**(전수 실측).',
          '',
          '**실제로 입력할 수 있습니다** — 아무 칸이나 눌러 글자를 쳐보세요.',
          '',
          '## 행은 그냥 Text Input입니다',
          '',
          '단순하게 보면 **Text Input 2~3개를 합쳐 놓은 것**입니다. 행 타입도',
          '`TextInputGroupField = TextInputProps` — **속성을 하나도 빼지 않았습니다.**',
          '한 줄에만 확정 버튼을 달거나, 한 줄만 단위를 붙이는 식이 그대로 됩니다.',
          '',
          '그룹이 주는 값(`size`·`label`·`supportingText` 등)은 전부 **행의 기본값**일 뿐이라',
          '행에서 주면 행 쪽이 이깁니다.',
          '',
          '### 그룹이 강제하는 것은 자리 두 개뿐입니다',
          '',
          '| | 규칙 | 근거 |',
          '|---|---|---|',
          '| 라벨 | **첫 행에만** 그립니다 | Figma 실측 — 두·세 번째 행은 `Show Label=False` 변형 |',
          '| 안내 문구 | **맨 아래 행 아래에만** 그립니다 | 사용자 지시 |',
          '',
          '속성을 막는 게 아니라 **자리만** 정합니다. 행이 켜도 그 자리가 아니면 그리지 않습니다 —',
          '중간 행에 라벨이 끼면 그룹으로 읽히지 않기 때문입니다.',
          '',
          '**기본값 세 개만** Text Input 단독일 때와 다릅니다 — 버튼·좌우 아이콘이 **꺼진 채로 시작**하고',
          '값은 **빈 문자열**입니다(Figma의 6개 변형이 전부 그 모습). 행에서 켜면 그대로 켜집니다.',
          '',
          '| Size | 필드 간 gap | 내부 Input Size | 전체 높이 (Field=2) |',
          '|---|---|---|---|',
          '| S | 4px | S | 84px |',
          '| M | 6px | M | 104px |',
          '| L | 8px | L | 132px |',
          '',
          '**필드 간 gap이 Text Input의 "Input↔Button gap"과 정확히 같습니다** (4/6/8px).',
          '같은 Size 스케일 토큰을 재사용한 결과로 보입니다.',
          '',
          '## 너비는 가변입니다',
          '컨테이너 너비는 **고정이 아니라 부모(화면) 폭에 맞춰 늘어납니다**(디자이너 확인 완료).',
          'Figma 노드에 박힌 280px 는 진열 프레임 폭일 뿐입니다.',
          '',
          '## Figma에 없는 것 (사용자 지시로 추가)',
          '',
          'Figma의 6개 변형은 **하단 안내 문구가 전부 꺼져 있습니다.** 실제로는 필요하므로',
          '**그룹이 하나 갖고 맨 아래 행 아래에만** 놓도록 했습니다 — 행마다 붙으면 칸 사이가 벌어져',
          '한 덩어리로 안 읽힙니다.',
          '',
          '어느 행이든 `destructed`면 그 문구가 빨강이 됩니다. 안내 문구가 한 자리뿐이라',
          '위쪽 행의 에러를 알릴 길이 그것밖에 없기 때문입니다.',
          '',
          '## ⚠️ 확인이 필요한 것',
          '- **입력 양식(숫자만·최대 길이 등)은 아직 축이 없습니다.** Text Input 자체에 `inputMode`/',
          '  `maxLength` 같은 속성이 없어서, 행마다 다른 양식을 주려면 Text Input을 먼저 늘려야 합니다.',
          '',
          '스펙 원본: [`components/text-input/text-input-group/text-input-group.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/text-input/text-input-group/text-input-group.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof TextInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** **실제로 입력할 수 있습니다.** 아무 칸이나 눌러 글자를 쳐보세요. */
export const Playground: Story = {
  args: {
    label: '주소',
    essential: true,
    size: 'm',
    supportingText: '도로명 주소로 입력해주세요',
    showSupportingText: true,
    fields: [{ placeholder: '기본 주소' }, { placeholder: '상세 주소' }],
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <TextInputGroup {...args} />
    </div>
  ),
};

/**
 * 안내 문구는 **맨 아래 행 아래에만** 나옵니다. 행 수가 2개든 3개든 자리는 하나입니다.
 */
export const 안내문구: Story = {
  name: '안내 문구 · 맨 아래에만',
  args: { fields: [] },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      <div style={{ marginBottom: 28 }}>
        <span className="bd-cell__label">Field = 2</span>
        <TextInputGroup
          label="주소"
          essential
          fields={[{ placeholder: '기본 주소' }, { placeholder: '상세 주소' }]}
          supportingText="도로명 주소로 입력해주세요"
          showSupportingText
        />
      </div>
      <div style={{ marginBottom: 28 }}>
        <span className="bd-cell__label">Field = 3 — 자리는 그대로 하나입니다</span>
        <TextInputGroup
          label="주소"
          essential
          fields={[{ placeholder: '우편번호' }, { placeholder: '기본 주소' }, { placeholder: '상세 주소' }]}
          supportingText="도로명 주소로 입력해주세요"
          showSupportingText
        />
      </div>
      <div>
        <span className="bd-cell__label">어느 행이든 destructed 면 문구가 빨강이 됩니다 (첫 행에 에러)</span>
        <TextInputGroup
          label="주소"
          essential
          fields={[{ placeholder: '우편번호', destructed: true }, { placeholder: '기본 주소' }]}
          supportingText="우편번호를 다시 확인해주세요"
          showSupportingText
        />
      </div>
    </div>
  ),
};

/**
 * 행은 Text Input 의 속성을 그대로 받습니다 — **행마다 다르게** 줄 수 있습니다.
 * 아래는 첫 행에만 확정 버튼, 둘째 행에만 단위를 붙인 예입니다.
 */
export const 행별설정: Story = {
  name: '행별 설정 · 독립적',
  args: { fields: [] },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 360 }}>
      <span className="bd-cell__label">첫 행 = 확정 버튼 · 둘째 행 = 단위(km) · 셋째 행 = 기본</span>
      <TextInputGroup
        label="차량 정보"
        essential
        fields={[
          { placeholder: '차대번호', showButton: true, buttonLabel: '조회' },
          { placeholder: '주행거리', showUnit: true, unit: 'km' },
          { placeholder: '비고' },
        ]}
        supportingText="조회 후 주행거리를 입력해주세요"
        showSupportingText
      />
    </div>
  ),
};

/** 6개 변형 전체입니다. 첫 필드에만 라벨이 붙는 것을 확인해 보세요. */
export const AllVariants: Story = {
  args: { fields: [] },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320 }}>
      {([
        ['s', 'gap 4px · 높이 84px'],
        ['m', 'gap 6px · 높이 104px'],
        ['l', 'gap 8px · 높이 132px'],
      ] as const).map(([size, desc]) => (
        <div key={size} style={{ marginBottom: 28 }}>
          <span className="bd-cell__label">Size = {size.toUpperCase()} · {desc}</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <span className="bd-cell__label">Field = 2</span>
              <TextInputGroup size={size} label="주소" fields={[{ placeholder: '기본 주소' }, { placeholder: '상세 주소' }]} />
            </div>
            <div style={{ flex: 1 }}>
              <span className="bd-cell__label">Field = 3</span>
              <TextInputGroup
                size={size}
                label="주소"
                fields={[{ placeholder: '우편번호' }, { placeholder: '기본 주소' }, { placeholder: '상세 주소' }]}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
