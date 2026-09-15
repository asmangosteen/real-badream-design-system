import { Fragment } from 'react';
import { TextBlinker } from '../TextBlinker/TextBlinker';
import { Icon } from '../Icon/Icon';
import './TimePicker.css';

export type TimeFieldState = 'default' | 'hover' | 'typing';

export interface TimeFieldProps {
  /** 2자리 숫자 값 */
  value?: string;
  /** ⚠️ 3개 State 전부 **글자색이 같습니다** — placeholder 처리가 없습니다 */
  state?: TimeFieldState;
  onClick?: () => void;
  className?: string;
}

/**
 * 시/분/초 **2자리 숫자 하나**를 표시·입력하는 필드입니다. **3개 변형**(전수 실측). 56×40px.
 *
 * **클릭해서 직접 타이핑할 수 있습니다** (사용자 확인) — 스테퍼 전용 디스플레이가 아닙니다.
 * Text Input 과 달리 Size 축·Label·Supporting Text·좌우 아이콘이 전혀 없습니다.
 *
 * 스펙 원본: `components/date-time-picker/time-field/time-field.md`
 */
export function TimeField({ value = '00', state = 'default', onClick, className }: TimeFieldProps) {
  return (
    <div
      className={['bd-time-field', className].filter(Boolean).join(' ')}
      data-state={state}
      onClick={onClick}
    >
      <span className="bd-time-field__number">
        {value}
        {state === 'typing' && <TextBlinker />}
      </span>
    </div>
  );
}

export type TimeDirection = 'down-only' | 'up-only' | 'both';

export interface TimePickerProps {
  value?: string;
  /** 어느 방향의 증감이 활성인지. **비활성 방향은 실제로 disabled 처리**됩니다 (사용자 확인) */
  direction?: TimeDirection;
  fieldState?: TimeFieldState;
  onUp?: () => void;
  onDown?: () => void;
  className?: string;
}

/**
 * 위/아래 화살표로 시간 값을 증감시키는 **스테퍼**입니다. **3개 변형**(전수 실측). 56×116px.
 *
 * 높이 = 36(위) + 2 + 40(Time Field) + 2 + 36(아래) = **116px**.
 * 타이핑과 스테퍼를 함께 쓰는 하이브리드 입력입니다.
 *
 * 스펙 원본: `components/date-time-picker/time-picker/time-picker.md`
 */
export function TimePicker({
  value = '00',
  direction = 'both',
  fieldState = 'default',
  onUp,
  onDown,
  className,
}: TimePickerProps) {
  const upDisabled = direction === 'down-only';
  const downDisabled = direction === 'up-only';

  return (
    <div className={['bd-time-picker', className].filter(Boolean).join(' ')} data-direction={direction}>
      <button type="button" className="bd-time-picker__arrow" disabled={upDisabled} onClick={onUp} aria-label="값 올리기">
        <Icon name="chevron_up" category="outlined" size={20} />
      </button>
      <TimeField value={value} state={fieldState} />
      <button type="button" className="bd-time-picker__arrow" disabled={downDisabled} onClick={onDown} aria-label="값 내리기">
        <Icon name="chevron_down" category="outlined" size={20} />
      </button>
    </div>
  );
}

export interface TimePickerGroupProps {
  /** Figma 정의 범위는 **2개 또는 3개**입니다 */
  values?: string[];
  directions?: TimeDirection[];
  className?: string;
}

/**
 * Time Picker 2~3개를 콜론(`:`)으로 묶은 조합입니다. **2개 변형**(전수 실측).
 *
 * > Figma 는 콜론을 이미지 에셋으로 쓰지만, 여기서는 텍스트로 구현했습니다.
 *
 * 스펙 원본: `components/date-time-picker/time-picker-group/time-picker-group.md`
 */
export function TimePickerGroup({ values = ['00', '00'], directions, className }: TimePickerGroupProps) {
  return (
    /* 스펙 2장 그대로 **평면 배열**입니다 — [Picker] → [Colon] → [Picker].
       래퍼 <span> 으로 묶으면 그룹의 gap 이 콜론이 아니라 래퍼 사이에만 걸려
       폭 산출(56 + 8 + 4 + 8 + 56 = 132)이 맞지 않습니다. */
    <div className={['bd-time-picker-group', className].filter(Boolean).join(' ')} data-count={values.length}>
      {values.map((v, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="bd-time-picker-group__sep">:</span>}
          <TimePicker value={v} direction={directions?.[i] ?? 'both'} />
        </Fragment>
      ))}
    </div>
  );
}
