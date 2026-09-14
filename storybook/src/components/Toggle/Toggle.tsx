import { useId } from 'react';
import './Toggle.css';

export type ToggleSize = 's' | 'l';
export type ToggleLabelPosition = 'left' | 'right';

export interface ToggleProps {
  /** 트랙·thumb 크기. S = 40×24px, L = 48×28px (라벨 타이포는 Size 무관 동일) */
  size?: ToggleSize;
  /** Figma 의 Status 축. Off = false, On = true */
  checked?: boolean;
  /** Figma 의 Disabled 축. 색을 바꾸지 않고 전체에 opacity 40% 를 적용합니다 */
  disabled?: boolean;
  /**
   * 라벨 텍스트. Figma 의 `Label`(True/False) 축에 대응합니다 —
   * 값을 주면 Label=True, 비우면 Label=False 입니다.
   */
  label?: string;
  /** Figma 의 `Label Location` 축. label 이 있을 때만 의미가 있습니다 */
  labelPosition?: ToggleLabelPosition;
  /** 값이 바뀔 때 호출됩니다 */
  onChange?: (checked: boolean) => void;
  /** label 없이 쓸 때 스크린리더가 읽을 이름 */
  'aria-label'?: string;
  className?: string;
}

/**
 * On/Off 이진 상태를 즉시 전환하는 스위치입니다.
 *
 * Figma 축: **Size(S/L) × Status(Off/On) × Disabled × Label × Label Location** = 24개 변형.
 * Checkbox·Radio Button 과 달리 **Hover/Pressed/Focused 축이 없습니다**(의도된 설계).
 *
 * 스펙 원본: `components/toggle/toggle.md`
 */
export function Toggle({
  size = 'l',
  checked = false,
  disabled = false,
  label,
  labelPosition = 'right',
  onChange,
  className,
  ...rest
}: ToggleProps) {
  const labelId = useId();
  const hasLabel = Boolean(label);

  const track = (
    <span className="bd-toggle__track" key="track">
      <span className="bd-toggle__thumb" />
    </span>
  );

  const labelEl = hasLabel ? (
    <span className="bd-toggle__label" id={labelId} key="label">
      {label}
    </span>
  ) : null;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={hasLabel ? labelId : undefined}
      disabled={disabled}
      className={['bd-toggle', className].filter(Boolean).join(' ')}
      data-size={size}
      data-label-position={hasLabel ? labelPosition : 'no'}
      onClick={() => onChange?.(!checked)}
      {...rest}
    >
      {/* 스펙 5장: Left 는 라벨이 먼저, Right 는 트랙이 먼저 */}
      {labelPosition === 'left' ? [labelEl, track] : [track, labelEl]}
    </button>
  );
}
