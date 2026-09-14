import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypeBox } from './TypeBox';
import { Cell, Row, Section } from '../../shared/story-helpers';

const meta = {
  title: 'Components/Global/Type Box',
  component: TypeBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '입력 필드 안의 **글자와 커서만** 담당하는 콘텐츠 레이어입니다.',
          '**Size(3) × State(4) = 12개 변형**(전수 실측). `components/global/` 소속입니다.',
          '',
          '테두리·배경·라운드가 **전혀 없습니다.** 필드 프레임은 상위 컴포넌트(Text Input)가 그리고,',
          'Type Box는 그 안에 얹히는 텍스트+캐럿 조합입니다.',
          '',
          '## State는 두 가지 신호의 조합입니다',
          '',
          '| State | 표시 문구 | 글자색 | 캐럿 | 의미 |',
          '|---|---|---|---|---|',
          '| Placeholder | 플레이스홀더 | `neutral/500` | 없음 | 비포커스 + 값 없음 |',
          '| **Selected** | **플레이스홀더 그대로** | `neutral/500` | **앞**에 있음 | 포커스 + 값 없음 |',
          '| Typing | 입력값 | `neutral/800` | **뒤**에 있음 | 포커스 + 입력 중 |',
          '| Done | 입력값 | `neutral/800` | 없음 | 비포커스 + 값 있음 |',
          '',
          '**Selected에서 글자색이 바뀌지 않는다는 점**이 헷갈리기 쉽습니다.',
          'Placeholder와 똑같은 회색 문구를 그대로 두고 **캐럿만 앞에 추가**됩니다.',
          '',
          '즉 State 축은 "글자색이 바뀜(Placeholder↔Typing/Done)"과 "캐럿이 보임(Selected/Typing↔Placeholder/Done)"',
          '두 신호가 독립적으로 조합된 4가지입니다.',
          '',
          '## Size마다 굵기가 다릅니다',
          '',
          '| Size | 타이포 | Weight |',
          '|---|---|---|',
          '| S | Caption1 12/18 | **Medium 500** |',
          '| M | Body2 14/22 | Regular 400 |',
          '| L | Body1 16/24 | Regular 400 |',
          '',
          '너비는 고정값이 없고 **입력된 글자 길이에 따라 늘어납니다.**',
          '',
          '스펙 원본: [`components/global/type-box/type-box.md`](https://github.com/asmangosteen/real-badream-design-system/blob/main/components/global/type-box/type-box.md)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['s', 'm', 'l'] },
    state: { control: 'inline-radio', options: ['placeholder', 'selected', 'typing', 'done'] },
    caretColor: { control: 'color' },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof TypeBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { value: '홍길동', placeholder: '이름을 입력하세요', size: 'm', state: 'typing' },
};

/** 12개 변형 전체입니다. Selected가 회색 문구를 유지한다는 점에 유의하세요. */
export const AllVariants: Story = {
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <div>
      {(['s', 'm', 'l'] as const).map((size) => (
        <Section key={size} title={`Size = ${size.toUpperCase()} · ${{ s: 'Caption1 12 Medium', m: 'Body2 14 Regular', l: 'Body1 16 Regular' }[size]}`}>
          <Row>
            {([
              ['placeholder', '회색 문구 · 캐럿 없음'],
              ['selected', '회색 문구 그대로 · 캐럿 앞'],
              ['typing', '진한 글자 · 캐럿 뒤'],
              ['done', '진한 글자 · 캐럿 없음'],
            ] as const).map(([state, desc]) => (
              <Cell key={state} label={`${state} · ${desc}`}>
                <TypeBox size={size} state={state} value="홍길동" placeholder="이름을 입력하세요" />
              </Cell>
            ))}
          </Row>
        </Section>
      ))}
    </div>
  ),
};

/** 에러 상태에서는 상위 컴포넌트가 캐럿 색을 바꿔 씁니다. */
export const 에러캐럿: Story = {
  name: '에러 상태 캐럿',
  args: {},
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Cell label="기본 캐럿">
        <TypeBox state="typing" value="홍길동" />
      </Cell>
      <Cell label="에러 캐럿 · theme/destructed-default">
        <TypeBox state="typing" value="홍길동" caretColor="var(--sys-color-theme-destructed-default)" />
      </Cell>
    </Row>
  ),
};
