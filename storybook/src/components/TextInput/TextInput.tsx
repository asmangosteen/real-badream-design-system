import { useEffect, useRef, useState } from 'react';
import { Label } from '../Label/Label';
import { TypeBox, type TypeBoxState } from '../TypeBox/TypeBox';
import { SupportingText, type SupportingTextTheme } from '../SupportingText/SupportingText';
import { Icon } from '../Icon/Icon';
import './TextInput.css';

export type TextInputSize = 's' | 'm' | 'l';
export type TextInputState = 'default' | 'hover' | 'disabled' | 'done' | 'selected' | 'typing';

/** Size 별 좌·우 아이콘 크기 — L 만 20px 입니다 */
const ICON_SIZE: Record<TextInputSize, number> = { s: 16, m: 16, l: 20 };
/** State 를 Type Box 의 State 로 옮기는 표 */
const TYPE_BOX_STATE: Record<TextInputState, TypeBoxState> = {
  default: 'placeholder',
  hover: 'placeholder',
  disabled: 'placeholder',
  done: 'done',
  selected: 'selected',
  typing: 'typing',
};

export interface TextInputProps {
  label?: string;
  /** 필수 표시 별표 */
  essential?: boolean;
  value?: string;
  placeholder?: string;
  /** S / M / L. **L 만 아이콘이 20px** 이고 radius 도 12px 로 커집니다 */
  size?: TextInputSize;
  /**
   * State 를 **이 값으로 고정**합니다 (문서·스펙 표시용).
   * **주지 않으면 실제 마우스·키보드 조작을 따라갑니다** — hover, 포커스, 입력 여부에 따라
   * `default → selected → typing → done` 이 자동으로 바뀝니다.
   *
   * `selected` = 포커스+값 없음 · `typing` = 포커스+입력 중 · `done` = 입력 완료+비포커스
   */
  state?: TextInputState;
  /** 에러 표시. ⚠️ **Figma 에 `selected`·`typing` 두 State 에서만 존재**하는 조합입니다 */
  destructed?: boolean;
  /** 우측 확정 버튼 */
  showButton?: boolean;
  buttonLabel?: string;
  showLabel?: boolean;
  /** 하단 안내 문구 */
  supportingText?: string;
  supportingTheme?: SupportingTextTheme;
  showSupportingText?: boolean;
  showLeftIcon?: boolean;
  leftIconName?: string;
  /** ⚠️ **State=Typing 에서는 이 슬롯이 강제로 `close_in_circle`(지우기) 로 대체됩니다** */
  showRightIcon?: boolean;
  rightIconName?: string;
  /** 우측 아이콘 뒤 단위 텍스트. **variant 축이 아닌 별도 boolean 프로퍼티**입니다 */
  showUnit?: boolean;
  unit?: string;
  /** 값이 바뀔 때 (자동 모드에서 직접 입력하면 호출됩니다) */
  onChange?: (value: string) => void;
  /** 우측 확정 버튼을 눌렀을 때 */
  onButtonClick?: () => void;
  className?: string;
}

/**
 * 사용자가 직접 텍스트를 입력하는 필드입니다.
 *
 * **768개 변형** + `Show Unit` 별도 프로퍼티.
 * [Label](/docs/components-global-label--docs) · [Type Box](/docs/components-global-type-box--docs) ·
 * [Text Blinker](/docs/components-global-text-blinker--docs) · [Supporting Text](/docs/components-global-supporting-text--docs)
 * **4개 서브 아톰의 실사용처**입니다.
 *
 * 스펙 원본: `components/text-input/text-input/text-input.md`
 */
export function TextInput({
  label = 'Label',
  essential = false,
  value = 'Input Text',
  placeholder = 'Placeholder',
  size = 'm',
  state,
  destructed = false,
  showButton = true,
  buttonLabel = '확인',
  showLabel = true,
  supportingText = 'Supporting text',
  supportingTheme,
  showSupportingText = true,
  showLeftIcon = true,
  leftIconName = 'profile_filled',
  showRightIcon = true,
  rightIconName = 'arrowhead_down',
  showUnit = false,
  unit = 'km',
  onChange,
  onButtonClick,
  className,
}: TextInputProps) {
  /* state 를 직접 주면 그 값으로 **고정**되고(스펙 진열용, 표시 전용 Type Box 로 그립니다),
     주지 않으면 **실제 입력 필드**가 놓여 마우스·키보드 조작을 그대로 따라갑니다. */
  const forced = state !== undefined;
  const inputRef = useRef<HTMLInputElement>(null);
  const [typed, setTyped] = useState(value);
  const [focused, setFocused] = useState(false);
  useEffect(() => setTyped(value), [value]);

  const shownValue = forced ? value : typed;
  const autoState: TextInputState = focused
    ? shownValue
      ? 'typing'
      : 'selected'
    : shownValue
      ? 'done'
      : 'default';
  const effState: TextInputState = state ?? autoState;

  const iconSize = ICON_SIZE[size];
  // Destructed 는 selected·typing 에서만 유효합니다
  const isError = destructed && (effState === 'selected' || effState === 'typing');
  const caretColor = isError ? 'var(--sys-color-theme-destructed-default)' : undefined;
  // Typing 에서는 우측 아이콘이 강제로 지우기 버튼이 됩니다
  const rightIcon = effState === 'typing' ? 'close_in_circle' : rightIconName;
  const rightCategory = effState === 'typing' ? 'filled' : 'outlined';
  const disabled = effState === 'disabled';

  return (
    <div
      className={['bd-text-input', className].filter(Boolean).join(' ')}
      data-size={size}
      data-state={effState}
      data-destructed={isError}
      data-auto={!forced}
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
            {forced ? (
              <TypeBox
                size={size}
                state={TYPE_BOX_STATE[effState]}
                value={value}
                placeholder={placeholder}
                caretColor={caretColor}
              />
            ) : (
              <input
                ref={inputRef}
                className="bd-text-input__input"
                value={typed}
                placeholder={placeholder}
                disabled={disabled}
                style={caretColor ? { caretColor } : undefined}
                onChange={(e) => {
                  setTyped(e.target.value);
                  onChange?.(e.target.value);
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            )}
          </span>
          {showRightIcon &&
            (!forced && effState === 'typing' ? (
              /* Figma 스펙대로 Typing 에서는 이 자리가 '지우기' 입니다 — 실제로 지워집니다 */
              <button
                type="button"
                className="bd-text-input__clear"
                aria-label="입력 지우기"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setTyped('');
                  onChange?.('');
                  inputRef.current?.focus();
                }}
              >
                <Icon name={rightIcon} category={rightCategory} size={iconSize} />
              </button>
            ) : (
              <Icon name={rightIcon} category={rightCategory} size={iconSize} />
            ))}
          {showUnit && <span className="bd-text-input__unit">{unit}</span>}
        </div>

        {showButton && (
          <button type="button" className="bd-text-input__button" disabled={disabled} onClick={onButtonClick}>
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
