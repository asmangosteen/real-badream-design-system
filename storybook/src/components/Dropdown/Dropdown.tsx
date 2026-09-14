import { Label } from '../Label/Label';
import { TypeBox, type TypeBoxState } from '../TypeBox/TypeBox';
import { SupportingText, type SupportingTextTheme } from '../SupportingText/SupportingText';
import { Icon } from '../Icon/Icon';
// Figma 실측상 Input 박스·버튼의 패딩·radius·타이포 값이 Text Input 과 완전히 동일해
// 값을 복제하지 않고 같은 스타일시트를 씁니다 (한 곳만 고치면 둘 다 반영됩니다).
import '../TextInput/TextInput.css';

export type DropdownSize = 's' | 'm' | 'l';
export type DropdownState = 'default' | 'hover' | 'selected' | 'disabled' | 'done';

const ICON_SIZE: Record<DropdownSize, number> = { s: 16, m: 16, l: 20 };
/** ⚠️ Text Input 과 달리 **캐럿 상태(selected/typing)를 쓰지 않습니다** */
const TYPE_BOX_STATE: Record<DropdownState, TypeBoxState> = {
  default: 'placeholder',
  hover: 'placeholder',
  selected: 'placeholder',
  disabled: 'placeholder',
  done: 'done',
};

export interface DropdownProps {
  label?: string;
  essential?: boolean;
  value?: string;
  placeholder?: string;
  size?: DropdownSize;
  /** `selected` = 목록이 펼쳐진 상태 · `done` = 값이 선택되어 닫힌 상태 */
  state?: DropdownState;
  /** ⚠️ **Figma 에 `selected` 상태에서만 존재**하는 조합입니다 */
  destructed?: boolean;
  showButton?: boolean;
  buttonLabel?: string;
  showLabel?: boolean;
  supportingText?: string;
  supportingTheme?: SupportingTextTheme;
  showSupportingText?: boolean;
  showLeftIcon?: boolean;
  leftIconName?: string;
  className?: string;
}

/**
 * 클릭하면 선택지 목록을 펼치는 **선택형 입력**입니다. **288개 변형.**
 *
 * Text Input 과 레이아웃이 거의 같지만 세 가지가 다릅니다 —
 * ① 우측 아이콘이 **축 없이 `chevron_down` 고정**, ② Destructed 가 **Selected 에서만** 존재,
 * ③ **Type Box 의 캐럿 상태를 쓰지 않습니다.**
 *
 * 스펙 원본: `components/dropdown/dropdown.md`
 */
export function Dropdown({
  label = 'Label',
  essential = false,
  value = 'Input Text',
  placeholder = 'Placeholder',
  size = 'm',
  state = 'default',
  destructed = false,
  showButton = true,
  buttonLabel = '확인',
  showLabel = true,
  supportingText = 'Supporting text',
  supportingTheme,
  showSupportingText = true,
  showLeftIcon = true,
  leftIconName = 'profile_filled',
  className,
}: DropdownProps) {
  const iconSize = ICON_SIZE[size];
  // Destructed 는 selected 에서만 유효합니다
  const isError = destructed && state === 'selected';

  return (
    <div
      className={['bd-text-input', className].filter(Boolean).join(' ')}
      data-kind="dropdown"
      data-size={size}
      data-state={state}
      data-destructed={isError}
    >
      {showLabel && (
        <Label size={size} essential={essential}>
          {label}
        </Label>
      )}

      <div className="bd-text-input__row">
        <div className="bd-text-input__box">
          {showLeftIcon && <Icon name={leftIconName} category="filled" size={iconSize} />}
          <span className="bd-text-input__value">
            <TypeBox size={size} state={TYPE_BOX_STATE[state]} value={value} placeholder={placeholder} />
          </span>
          {/* 우측 아이콘은 축이 없는 고정 슬롯입니다 */}
          <Icon name="chevron_down" category="outlined" size={iconSize} />
        </div>

        {showButton && (
          <button type="button" className="bd-text-input__button" disabled={state === 'disabled'}>
            {buttonLabel}
          </button>
        )}
      </div>

      {showSupportingText && (
        <SupportingText size={size} theme={supportingTheme ?? (isError ? 'destructed' : 'gray')} showIcon={false}>
          {supportingText}
        </SupportingText>
      )}
    </div>
  );
}
