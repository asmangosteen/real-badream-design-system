import './Label.css';

export type LabelSize = 's' | 'm' | 'l';

export interface LabelProps {
  /** 필드명 텍스트 */
  children: React.ReactNode;
  /**
   * S·M 은 **타이포가 완전히 같고** 하단 여백만 다릅니다(2px / 4px).
   * L 만 타이포가 Caption1 SemiBold → Body2 Medium 으로 바뀝니다.
   */
  size?: LabelSize;
  /** 필수 입력 표시(빨간 별표)를 붙입니다 */
  essential?: boolean;
  /** 연결할 입력 필드의 id — `<label for>` 로 묶습니다 */
  htmlFor?: string;
  className?: string;
}

/**
 * 입력 필드 위에 붙는 필드명 텍스트입니다.
 *
 * **Size × Essential = 6개 변형**(전수 실측). State 축이 없는 순수 표시용 아톰입니다.
 *
 * 스펙 원본: `components/global/label/label.md`
 */
export function Label({ children, size = 'm', essential = false, htmlFor, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={['bd-label', className].filter(Boolean).join(' ')}
      data-size={size}
      data-essential={essential}
    >
      {children}
      {/* ⚠️ 별표는 시각 표시일 뿐이라, 연결된 input 에 required/aria-required 를 따로 줘야 합니다 */}
      {essential && (
        <span className="bd-label__essential" aria-label="필수">
          *
        </span>
      )}
    </label>
  );
}
