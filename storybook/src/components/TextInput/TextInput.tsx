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
  /**
   * ⚠️ **State=Typing 에서는 이 슬롯이 강제로 `close_in_circle`(지우기) 로 대체됩니다.**
   * ⚠️ **`showUnit` 을 켜면 단위에 자리를 내주고 표시되지 않습니다** — 우측은 한 자리입니다.
   */
  showRightIcon?: boolean;
  rightIconName?: string;
  /**
   * 우측 **단위 텍스트**. **variant 축이 아닌 별도 boolean 프로퍼티**입니다.
   *
   * ⚠️ **우측 아이콘과 같이 쓰지 않습니다** — 우측은 한 자리이고, 켜면 **아이콘을 대신**합니다.
   * (Figma 에 둘 다 그려진 노드가 있는 건 변형을 한눈에 보여주려는 진열용입니다.)
   *
   * ⚠️ **포커스가 들어간 동안(Selected·Typing)에는 표시되지 않습니다** — 입력 중에는 감춥니다.
   */
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
  /** 포커스가 들어가 있는 상태 = 사용자가 지금 이 필드에 입력하고 있는 상태 */
  const isFocused = effState === 'selected' || effState === 'typing';
  // Destructed 는 selected·typing 에서만 유효합니다
  const isError = destructed && isFocused;
  /* 커서 색 — Figma 의 [Text Blinker](../TextBlinker) 와 같은 **브랜드 블루**, 에러일 때만 빨강.
     · 진열용(state 고정)에서는 Type Box 안의 **Text Blinker 컴포넌트가 그대로** 그려집니다.
     · 자동 모드에서는 진짜 `<input>` 이라 브라우저 커서가 뜨므로, `caret-color` 로 같은 색을 입힙니다
       (색은 같고 굵기 1px·모서리 각짐만 다릅니다 — 브라우저가 커서 모양까지는 열어주지 않습니다). */
  const caretColor = isError
    ? 'var(--sys-color-theme-destructed-default)'
    : 'var(--sys-color-brand-primary-default)';
  const disabled = effState === 'disabled';

  /* ---------- 우측 슬롯은 "한 자리" 입니다 ----------
     우측 아이콘과 단위를 **같이 두지 않습니다**(디자이너 확인, 2026-09-15).
     Figma 의 Done 노드(`2119:10054`)에 `arrowhead_down` 과 "km" 이 함께 그려져 있는 것은
     변형을 한눈에 보여주려는 **진열용**이고, 실제 사용에서는 둘 중 하나만 씁니다.

     그 한 자리에 무엇이 놓이는지 — 위에서부터 우선합니다:
     1. **입력 중(Typing)** → `close_in_circle` **지우기 버튼**(Figma 고정, 자유 슬롯 아님)
     2. **`showUnit` 이 켜져 있으면** → 단위 텍스트가 우측 아이콘을 **대신**합니다.
        단, **포커스가 들어간 동안(Selected·Typing)에는 감춥니다** — 입력에 방해되지 않도록.
     3. 그 외 → 우측 아이콘 */
  const rightSlot: 'clear' | 'unit' | 'icon' | 'none' =
    effState === 'typing' && showRightIcon
      ? 'clear'
      : showUnit
        ? isFocused
          ? 'none'
          : 'unit'
        : showRightIcon
          ? 'icon'
          : 'none';

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
          {showLeftIcon && (
            <Icon
              name={leftIconName}
              category="filled"
              size={iconSize}
              className="bd-text-input__icon bd-text-input__icon--left"
            />
          )}
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
                /* 브라우저 맞춤법 검사 밑줄(빨간 점선)을 끕니다 — 디자인 요소가 아닙니다 */
                spellCheck={false}
                style={{ caretColor }}
                onChange={(e) => {
                  setTyped(e.target.value);
                  onChange?.(e.target.value);
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            )}
          </span>
          {rightSlot === 'clear' &&
            (forced ? (
              /* 스펙 진열용 — 누를 수 없는 표시 전용 아이콘 */
              <Icon
                name="close_in_circle"
                category="filled"
                size={iconSize}
                className="bd-text-input__icon bd-text-input__icon--right"
              />
            ) : (
              /* 자동 모드에서는 실제로 지워집니다 */
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
                <Icon
                  name="close_in_circle"
                  category="filled"
                  size={iconSize}
                  className="bd-text-input__icon bd-text-input__icon--right"
                />
              </button>
            ))}
          {rightSlot === 'icon' && (
            <Icon
              name={rightIconName}
              category="outlined"
              size={iconSize}
              className="bd-text-input__icon bd-text-input__icon--right"
            />
          )}
          {rightSlot === 'unit' && <span className="bd-text-input__unit">{unit}</span>}
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
