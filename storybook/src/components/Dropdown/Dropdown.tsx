import { Label, type LabelProps } from '../Label/Label';
import { TypeBox, type TypeBoxProps, type TypeBoxState } from '../TypeBox/TypeBox';
import { SupportingText, type SupportingTextTheme, type SupportingTextProps } from '../SupportingText/SupportingText';
import { Icon } from '../Icon/Icon';
// Figma 실측상 Input 박스·버튼의 패딩·radius·타이포 값이 Text Input 과 완전히 동일해
// 값을 복제하지 않고 같은 스타일시트를 씁니다 (한 곳만 고치면 둘 다 반영됩니다).
import '../TextInput/TextInput.css';
// Dropdown 에서만 다른 것(트리거 버튼·Chevron 색)만 따로 둡니다
import './Dropdown.css';

export type DropdownSize = 's' | 'm' | 'l';
export type DropdownState = 'default' | 'hover' | 'selected' | 'disabled' | 'done';

const ICON_SIZE: Record<DropdownSize, number> = { s: 16, m: 16, l: 20 };
/**
 * ⚠️ Text Input 과 달리 **캐럿 상태를 쓰지 않습니다** — 직접 타이핑하는 필드가 아닙니다.
 *
 * `selected`(열림)가 `done` 인 것은 오타가 아닙니다. Figma 의 Selected 변형은 Type Box 가
 * `State=Done` 이라 **값이 채워진 채로** 열립니다(`2292:7243` 실측). 열려 있는 동안
 * placeholder 로 되돌아가면 "무엇을 골라 뒀는지" 가 사라집니다.
 */
const TYPE_BOX_STATE: Record<DropdownState, TypeBoxState> = {
  default: 'placeholder',
  hover: 'placeholder',
  selected: 'done',
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
  /**
   * 상단 [Label](../Label/Label.tsx) 에 **그대로 넘어가는 속성**입니다 (`htmlFor` 등).
   * 아래 `label`·`essential` 은 자주 쓰는 것만 꺼내 둔 지름길이고, **이쪽이 우선**입니다.
   */
  labelProps?: Omit<LabelProps, 'children'>;
  /**
   * 하단 [Supporting Text](../SupportingText/SupportingText.tsx) 에 **그대로 넘어가는 속성 전부**입니다.
   *
   * 아토믹 디자인이라 조합 안에서도 자식 속성이 전부 살아 있어야 합니다 — 지름길 세 개
   * (`supportingText`·`supportingTheme`·`showSupportingText`)로는 못 건드리는
   * **아이콘(`showIcon`·`iconName`)·글자 수 카운터(`showCount`·`current`·`max`)** 까지 여기로 줍니다.
   * 기본값 뒤에 펼치므로 **이쪽이 언제나 우선**입니다.
   */
  supportingProps?: SupportingTextProps;
  /** 값 표시칸([Type Box](../TypeBox/TypeBox.tsx))에 그대로 넘어갑니다 — 캐럿 색 등 */
  typeBoxProps?: Partial<TypeBoxProps>;
  showLeftIcon?: boolean;
  leftIconName?: string;
  className?: string;
}

/**
 * 클릭하면 선택지 목록을 펼치는 **선택형 입력**입니다. **288개 변형.**
 *
 * Text Input 과 레이아웃이 거의 같지만 세 가지가 다릅니다 —
 * ① 우측 아이콘이 **교체 축 없는 Chevron 고정**(단, 열리면 `chevron_up` 으로 뒤집힙니다),
 * ② Destructed 가 **Selected 에서만** 존재, ③ **Type Box 의 캐럿 상태를 쓰지 않습니다.**
 *
 * ## 아직 목록(Menu)이 없습니다
 *
 * `state='selected'` 는 "열린 모습" 만 그립니다 — 실제로 아래에 뜨는 선택지 목록은
 * Figma 의 **`❖ Menu` 페이지**에 따로 있고 아직 옮기지 않았습니다.
 * 트리거 쪽 계약(`<button>` · `aria-haspopup="listbox"` · `aria-expanded`)은 미리 맞춰 뒀으니
 * 나중에 목록 컴포넌트와 `onOpenChange` 만 붙이면 됩니다.
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
  labelProps,
  supportingProps,
  typeBoxProps,
  showLeftIcon = true,
  leftIconName = 'profile_filled',
  className,
}: DropdownProps) {
  const iconSize = ICON_SIZE[size];
  // Destructed 는 selected 에서만 유효합니다
  const isError = destructed && state === 'selected';
  // 열려 있는 동안만 화살표가 뒤집힙니다 — Done(닫힘)은 값이 있어도 아래를 봅니다
  const open = state === 'selected';

  return (
    <div
      className={['bd-text-input', className].filter(Boolean).join(' ')}
      data-kind="dropdown"
      data-size={size}
      data-state={state}
      data-destructed={isError}
    >
      {showLabel && (
        <Label size={size} essential={essential} {...labelProps}>
          {label}
        </Label>
      )}

      <div className="bd-text-input__row">
        {/* 누르면 목록이 열리는 트리거입니다. 목록은 아직 없지만(위 주석) 계약은 미리 맞춰 둡니다. */}
        <button
          type="button"
          className="bd-text-input__box bd-dropdown__trigger"
          disabled={state === 'disabled'}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {showLeftIcon && (
            <Icon
              name={leftIconName}
              category="filled"
              size={iconSize}
              /* ⚠️ 이 class 가 없으면 아이콘이 상자 글자색(neutral/800)을 그대로 물려받아
                 모든 State 에서 새까맣게 나옵니다. State 별 색은 공유 CSS 가 갖고 있습니다. */
              className="bd-text-input__icon bd-text-input__icon--left"
            />
          )}
          <span className="bd-text-input__value">
            <TypeBox
              size={size}
              state={TYPE_BOX_STATE[state]}
              value={value}
              placeholder={placeholder}
              {...typeBoxProps}
            />
          </span>
          {/* 교체 축이 없는 고정 슬롯이지만 **방향은 열림/닫힘을 따릅니다**(Figma `2292:7249` 실측).
              색도 열려 있을 때만 테두리와 같은 색이 됩니다 — 규칙은 Dropdown.css 에. */}
          <Icon
            name={open ? 'chevron_up' : 'chevron_down'}
            category="outlined"
            size={iconSize}
            className="bd-text-input__icon bd-text-input__icon--right"
          />
        </button>

        {showButton && (
          <button type="button" className="bd-text-input__button" disabled={state === 'disabled'}>
            {buttonLabel}
          </button>
        )}
      </div>

      {showSupportingText && (
        /* 기본값을 먼저 두고 `supportingProps` 를 **뒤에** 펼칩니다 — 바깥에서 준 값이 언제나 이깁니다. */
        <SupportingText
          size={size}
          theme={supportingTheme ?? (isError ? 'destructed' : 'gray')}
          showIcon={false}
          {...supportingProps}
        >
          {supportingProps?.children ?? supportingText}
        </SupportingText>
      )}
    </div>
  );
}
