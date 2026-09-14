import { Icon } from '../Icon/Icon';
import './Checkbox.css';

export type CheckboxType = 'angular' | 'rounded';
/** 스토리북에서 Hover/Pressed 를 강제로 보여주기 위한 값입니다. 실제 서비스에서는 쓰지 않습니다. */
export type CheckboxForceState = 'hover' | 'pressed';

export interface CheckboxProps {
  /** `angular` = 사각형(radius 4px) · `rounded` = 원형(radius 999px) */
  type?: CheckboxType;
  /** 선택 여부 */
  checked?: boolean;
  /** **Angular 전용.** checked=true 일 때만 의미가 있으며 체크 대신 "－"를 표시합니다 */
  indeterminate?: boolean;
  /** **Rounded 전용.** checked=false 일 때만 의미가 있습니다. true=흰 배경+테두리, false=연회색 배경 */
  outlined?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  /** 스크린리더가 읽을 이름 */
  'aria-label'?: string;
  /** 변형 목록을 보여줄 때만 쓰는 강제 상태입니다 */
  forceState?: CheckboxForceState;
  className?: string;
}

/**
 * 다중 선택·동의·전체선택에 쓰는 체크 입력입니다.
 *
 * **Size 축이 없습니다** — Angular/Rounded 모두 16×16px 고정입니다.
 * Angular는 아이콘이 박스 전체(16px)를 채우고, Rounded는 원 안에 12px 아이콘이 들어갑니다.
 *
 * 스펙 원본: `components/checkbox/checkbox.md`
 */
export function Checkbox({
  type = 'angular',
  checked = false,
  indeterminate = false,
  outlined = true,
  disabled = false,
  onChange,
  forceState,
  className,
  'aria-label': ariaLabel,
}: CheckboxProps) {
  const isIndeterminate = type === 'angular' && checked && indeterminate;
  // Angular 는 16px 아이콘이 박스를 꽉 채우고, Rounded 는 12px 아이콘이 중앙에 놓입니다
  const iconSize = type === 'angular' ? 16 : 12;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : checked}
      aria-label={ariaLabel}
      disabled={disabled}
      className={['bd-checkbox', className].filter(Boolean).join(' ')}
      data-type={type}
      data-checked={checked}
      data-outlined={type === 'rounded' ? outlined : undefined}
      data-force-state={forceState}
      onClick={() => onChange?.(!checked)}
    >
      <span className="bd-checkbox__box">
        {checked && (
          <Icon name={isIndeterminate ? 'minus' : 'check'} category="outlined" size={iconSize} />
        )}
      </span>
    </button>
  );
}
