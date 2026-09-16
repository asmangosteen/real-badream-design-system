import './RadioButton.css';

export type RadioSize = 's' | 'm' | 'l';
export type RadioForceState = 'hover' | 'pressed';

export interface RadioButtonProps {
  /** S=16px · M=20px · L=24px. 내부 dot 은 항상 지름의 50% 입니다 */
  size?: RadioSize;
  checked?: boolean;
  disabled?: boolean;
  /** 같은 그룹의 라디오끼리 묶는 이름 */
  name?: string;
  value?: string;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
  /** 변형 목록 표시용 강제 상태. 실제 서비스에서는 쓰지 않습니다 */
  forceState?: RadioForceState;
  className?: string;
}

/**
 * 여러 선택지 중 하나만 고르는 단일 선택 입력입니다.
 *
 * Checkbox(Rounded)와 형태가 비슷하지만 **Size 축의 값이 다르고**(Radio `S/M/L` = 16/20/24px ·
 * Checkbox `16px/20px`), **미선택 Disabled를 opacity 40%로 처리**한다는 점이 다릅니다.
 *
 * 스펙 원본: `components/radio-button/radio-button.md`
 */
export function RadioButton({
  size = 'm',
  checked = false,
  disabled = false,
  name,
  value,
  onChange,
  forceState,
  className,
  'aria-label': ariaLabel,
}: RadioButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={ariaLabel}
      name={name}
      value={value}
      disabled={disabled}
      className={['bd-radio', className].filter(Boolean).join(' ')}
      data-size={size}
      data-checked={checked}
      data-force-state={forceState}
      onClick={() => onChange?.(true)}
    >
      <span className="bd-radio__circle">{checked && <span className="bd-radio__dot" />}</span>
    </button>
  );
}
