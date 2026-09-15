import { TextBlinker, type TextBlinkerProps } from '../TextBlinker/TextBlinker';
import './TypeBox.css';

export type TypeBoxSize = 's' | 'm' | 'l';

/**
 * Size 별 캐럿 높이 — Figma 실측(2026-09-14).
 * 캐럿은 고정 20px 이 아니라 **각 Size 의 lineHeight 에 맞춰 리사이즈**되어 세로 중앙에 놓입니다.
 * S 18→16 · M 22→18 · L 24→20
 */
const CARET_HEIGHT: Record<TypeBoxSize, number> = { s: 16, m: 18, l: 20 };
export type TypeBoxState = 'placeholder' | 'selected' | 'typing' | 'done';

export interface TypeBoxProps {
  /** 입력된 값. `placeholder`·`selected` 에서는 표시되지 않습니다 */
  value?: string;
  /** 값이 없을 때 보여줄 문구 */
  placeholder?: string;
  /** S = Caption1 **Medium** · M = Body2 Regular · L = Body1 Regular */
  size?: TypeBoxSize;
  /**
   * 포커스 여부 × 값 유무의 4가지 조합입니다.
   * - `placeholder` 비포커스 + 값 없음 (회색 문구, 캐럿 없음)
   * - `selected` 포커스 + 값 없음 (**회색 문구 그대로**, 캐럿이 **앞**에)
   * - `typing` 포커스 + 값 있음 (진한 글자, 캐럿이 **뒤**에)
   * - `done` 비포커스 + 값 있음 (진한 글자, 캐럿 없음)
   */
  state?: TypeBoxState;
  /** 캐럿 색. Text Input 이 에러 상태에서 destructed 색으로 바꿔 씁니다 */
  caretColor?: string;
  /**
   * 캐럿([Text Blinker](../TextBlinker/TextBlinker.tsx))에 **그대로 넘어가는 속성**입니다.
   * 색·높이는 Size 와 상태에서 계산하지만 그건 **기본값**일 뿐이라, 깜빡임(`blink`)이나
   * 높이를 직접 정하고 싶으면 여기로 줍니다(README 규칙 11).
   */
  blinkerProps?: Partial<TextBlinkerProps>;
  className?: string;
}

/**
 * 입력 필드 안의 **글자와 커서만** 담당하는 콘텐츠 레이어입니다.
 * 테두리·배경·라운드가 없고, 필드 프레임은 상위 컴포넌트(Text Input)가 그립니다.
 *
 * **Size(3) × State(4) = 12개 변형**(전수 실측). `components/global/` 소속입니다.
 *
 * 스펙 원본: `components/global/type-box/type-box.md`
 */
export function TypeBox({
  value = 'Input Text',
  placeholder = 'Placeholder',
  size = 'm',
  state = 'placeholder',
  caretColor,
  blinkerProps,
  className,
}: TypeBoxProps) {
  const showsValue = state === 'typing' || state === 'done';
  const caretBefore = state === 'selected';
  const caretAfter = state === 'typing';

  return (
    <span className={['bd-type-box', className].filter(Boolean).join(' ')} data-size={size} data-state={state}>
      {caretBefore && <TextBlinker color={caretColor} height={CARET_HEIGHT[size]} {...blinkerProps} />}
      <span>{showsValue ? value : placeholder}</span>
      {caretAfter && <TextBlinker color={caretColor} height={CARET_HEIGHT[size]} {...blinkerProps} />}
    </span>
  );
}
