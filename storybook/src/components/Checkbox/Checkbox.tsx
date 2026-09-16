import { Icon } from '../Icon/Icon';
import './Checkbox.css';

export type CheckboxType = 'angular' | 'rounded';
export const CHECKBOX_SIZES = [16, 20] as const;
export type CheckboxSize = (typeof CHECKBOX_SIZES)[number];
/** 스토리북에서 Hover/Pressed 를 강제로 보여주기 위한 값입니다. 실제 서비스에서는 쓰지 않습니다. */
export type CheckboxForceState = 'hover' | 'pressed';

/**
 * 박스 안에 들어가는 아이콘 크기(px). **Figma 48개 변형 전수 실측값**이며 비율로 계산한 값이 아닙니다.
 *
 * Angular 는 두 Size 모두 16px 로 **같습니다** — 16px 박스에서는 박스를 꽉 채우고,
 * 20px 박스에서는 사방 2px 여백이 생깁니다. Rounded 만 박스를 따라 커집니다.
 */
const ICON_SIZE: Record<CheckboxType, Record<CheckboxSize, number>> = {
  angular: { 16: 16, 20: 16 },
  rounded: { 16: 12, 20: 16 },
};

export interface CheckboxProps {
  /** `angular` = 사각형(radius 4/6px) · `rounded` = 원형(radius 999px) */
  type?: CheckboxType;
  /** 박스 한 변의 길이(px). Figma Size 축 `16px` / `20px` 과 1:1 대응합니다 */
  size?: CheckboxSize;
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
 * **Size 축은 `16px` / `20px` 두 가지입니다** (2026-09-16 Figma 에 추가됨).
 * 크기에 따라 달라지는 것은 박스 한 변·Angular radius·Rounded 아이콘뿐이고 색은 전부 같습니다.
 *
 * | | 박스 | Angular radius | Angular 아이콘 | Rounded 아이콘 |
 * |---|---|---|---|---|
 * | `16` | 16×16 | 4px (`radius/02`) | 16px (박스를 채움) | 12px |
 * | `20` | 20×20 | **6px** (`radius/03`) | **16px** (그대로) | **16px** |
 *
 * **Rounded 는 미선택에도 회색 체크가 보입니다** — `neutral/400`, Disabled 는 `neutral/300`.
 * Angular 미선택에는 아이콘이 없습니다.
 *
 * 스펙 원본: `components/checkbox/checkbox.md`
 */
export function Checkbox({
  type = 'angular',
  size = 16,
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
  const iconSize = ICON_SIZE[type][size];
  // Rounded 는 **미선택에도 회색 체크가 보입니다**(Figma 실측, 스펙 6장).
  // Angular 는 미선택에 아이콘 레이어 자체가 없습니다. 색은 CSS 가 결정합니다.
  const showIcon = checked || type === 'rounded';

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isIndeterminate ? 'mixed' : checked}
      aria-label={ariaLabel}
      disabled={disabled}
      className={['bd-checkbox', className].filter(Boolean).join(' ')}
      data-type={type}
      data-size={size}
      data-checked={checked}
      data-outlined={type === 'rounded' ? outlined : undefined}
      data-force-state={forceState}
      onClick={() => onChange?.(!checked)}
    >
      <span className="bd-checkbox__box">
        {showIcon && (
          <Icon name={isIndeterminate ? 'minus' : 'check'} category="outlined" size={iconSize} />
        )}
      </span>
    </button>
  );
}
