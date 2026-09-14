import './TextCount.css';

export type TextCountSize = 'small' | 'default';
export type TextCountState = 'default' | 'typing' | 'destructed';

export interface TextCountProps {
  /** 현재 입력된 글자 수 (분자) */
  current: number;
  /** 최대 허용 글자 수 (분모) */
  max: number;
  /** `small` = Caption2 10px **Medium** · `default` = Caption1 12px **Regular** */
  size?: TextCountSize;
  /** **분자 색만** 바뀝니다. 슬래시·분모는 항상 `neutral/500` 고정입니다 */
  state?: TextCountState;
  className?: string;
}

/**
 * 입력 필드 근처에 표시되는 글자 수 카운터입니다 (예: `12/50`).
 * `components/global/` 소속 — Input·TextField·TextArea 의 부품입니다.
 *
 * 스펙 원본: `components/global/text-count/text-count.md`
 */
export function TextCount({ current, max, size = 'default', state = 'default', className }: TextCountProps) {
  return (
    <span
      className={['bd-text-count', className].filter(Boolean).join(' ')}
      data-size={size}
      data-state={state}
    >
      <span className="bd-text-count__current">{current}</span>
      <span>/</span>
      <span>{max}</span>
    </span>
  );
}
