import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { TextBlinker, type TextBlinkerProps } from '../TextBlinker/TextBlinker';
import { IconButton, type IconButtonProps } from '../IconButton/IconButton';
import { Squircle } from '../../shared/Squircle';
import './TimePicker.css';

/* ==================== 값 다루기 ==================== */

/** 한 자리가 담는 시간 단위. Figma 에는 이 축이 없지만 실제 값을 넣으려면 범위가 필요합니다. */
export type TimeUnit = 'hour' | 'minute' | 'second';

/**
 * **단위별 값 범위.** 시만 0–23 이고 분·초는 0–59 입니다 (사용자 지시, 2026-09-15).
 *
 * Figma 에는 단위 축도 범위 규정도 없습니다 — Time Field 는 "00" 샘플 하나뿐이라
 * 이 표가 유일한 출처입니다. 범위를 바꿔야 하면 여기만 고치면 전부 따라옵니다.
 */
export const TIME_UNIT_RANGE: Record<TimeUnit, { min: number; max: number }> = {
  hour: { min: 0, max: 23 },
  minute: { min: 0, max: 59 },
  second: { min: 0, max: 59 },
};

/** 단위별 읽기 라벨. 라벨 텍스트가 없는 컴포넌트라 보조기기용으로 필요합니다. */
const UNIT_LABEL: Record<TimeUnit, string> = { hour: '시', minute: '분', second: '초' };

const pad2 = (n: number) => String(n).padStart(2, '0');
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

/** `wrap` 이면 끝에서 반대쪽으로 넘어갑니다 — 23시 ↑ → 00시. */
function stepValue(value: number, delta: number, min: number, max: number, wrap: boolean) {
  const next = value + delta;
  if (!wrap) return clamp(next, min, max);
  const span = max - min + 1;
  return (((next - min) % span) + span) % span + min;
}

/* ==================== Time Field ==================== */

export type TimeFieldState = 'default' | 'hover' | 'typing';

export interface TimeFieldProps {
  /** 캐럿([Text Blinker](../TextBlinker/TextBlinker.tsx))에 그대로 넘어갑니다(README 규칙 11) */
  blinkerProps?: Partial<TextBlinkerProps>;
  /** 표시할 2자리 값 */
  value?: string;
  /**
   * 상태를 **고정**합니다 — 문서·진열용입니다.
   * 비워두면 Typing 은 실제 포커스가, Hover 는 CSS `:hover` 가 정합니다.
   */
  state?: TimeFieldState;
  /** 값 범위를 정합니다. `min`/`max` 를 직접 주면 그쪽이 우선합니다 */
  unit?: TimeUnit;
  /** @see {@link TIME_UNIT_RANGE} */
  min?: number;
  max?: number;
  /** 두 자리가 확정되거나 포커스를 잃을 때 호출됩니다 */
  onCommit?: (next: string) => void;
  /** ↑ ↓ 키. 브라우저의 키 반복이 그대로 연속 증감이 됩니다 */
  onStep?: (delta: number) => void;
  'aria-label'?: string;
  className?: string;
}

/**
 * 시/분/초 **2자리 숫자 하나**를 표시·입력하는 필드입니다. **3개 변형**(전수 실측). 56×40px.
 *
 * 스테퍼 전용 디스플레이가 아니라 **직접 타이핑할 수 있는 입력**입니다(사용자 확인).
 * 화면에 보이는 숫자는 `<span>` 이 그리고, 키 입력은 그 위에 겹쳐 둔 투명한 `<input>` 이 받습니다 —
 * Figma 의 캐럿([Text Blinker](../TextBlinker))을 그대로 쓰면서도 실제 키보드·보조기기를 지원하기 위해서입니다.
 *
 * 두 자리를 다 치기 전에 범위를 넘기는 숫자면(분의 `7` → 70 > 59) 곧바로 확정하고 다음 입력을 새로 받습니다.
 * Backspace 는 확정된 값도 한 자리씩 지웁니다 — 다 지우면 빈 칸이 되고, 그대로 빠져나가면 마지막 값으로 되돌아갑니다.
 *
 * 스펙 원본: `components/date-time-picker/time-field/time-field.md`
 */
export function TimeField({
  blinkerProps,
  value = '00',
  state,
  unit = 'minute',
  min = TIME_UNIT_RANGE[unit].min,
  max = TIME_UNIT_RANGE[unit].max,
  onCommit,
  onStep,
  'aria-label': ariaLabel,
  className,
}: TimeFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  /**
   * 편집 중인 글자. `null` 이면 편집 전이라 확정값을 그대로 보여주고,
   * 문자열이면 **친 그대로** 보여줍니다 — 다 지워서 `''` 가 된 상태도 포함입니다.
   * (`''` 를 `null` 과 같게 취급하면 지운 순간 확정값이 도로 나타나 지울 수가 없습니다.)
   */
  const [draft, setDraft] = useState<string | null>(null);
  /* 같은 값을 ref 로도 들고 있습니다. Esc 처리처럼 **같은 틱 안에서 바꾸고 곧바로 읽어야 하는** 자리가 있는데,
     setState 는 다음 렌더에나 반영돼서 뒤이어 도는 blur 핸들러가 이미 버린 글자를 확정해 버립니다. */
  const draftRef = useRef<string | null>(null);
  const putDraft = useCallback((next: string | null) => {
    draftRef.current = next;
    setDraft(next);
  }, []);
  const [focused, setFocused] = useState(false);

  const resolved: TimeFieldState = state ?? (focused ? 'typing' : 'default');
  const display = draft === null ? value : draft;

  /**
   * 숫자를 왼쪽부터 순서대로 먹입니다. 붙여넣기처럼 한 번에 여러 자가 들어와도
   * 같은 규칙을 그대로 반복 적용하려고 상태가 아니라 지역 변수로 굴립니다.
   */
  const feed = useCallback(
    (raw: string) => {
      const digits = raw.replace(/\D/g, '');
      if (digits === '') return;
      let cur = draftRef.current ?? '';
      let committed: string | null = null;
      for (const d of digits) {
        if (cur === '') {
          // 이 숫자로 시작하면 두 자리가 무조건 범위를 넘는 경우 — 기다리지 않고 확정합니다
          if (Number(d) * 10 > max) committed = d;
          else cur = d;
          continue;
        }
        const n = Number(cur + d);
        if (n <= max) {
          committed = cur + d;
          cur = '';
        } else if (Number(d) * 10 > max) {
          committed = d;
          cur = '';
        } else {
          // 두 자리로는 범위를 넘으니 방금 누른 숫자를 새 첫 자리로 봅니다
          cur = d;
        }
      }
      putDraft(cur === '' ? null : cur);
      if (committed !== null) onCommit?.(pad2(clamp(Number(committed), min, max)));
    },
    [min, max, onCommit, putDraft],
  );

  const flush = useCallback(() => {
    /* 다 지운 채로 빠져나가면 마지막 확정값으로 되돌립니다 —
       Figma 에 '값 없음' 변형이 없어서 빈 칸으로 남겨 둘 수가 없습니다. */
    const pending = draftRef.current;
    if (pending) onCommit?.(pad2(clamp(Number(pending), min, max)));
    putDraft(null);
  }, [min, max, onCommit, putDraft]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      // 치던 글자는 버리고 확정값에서 한 칸 움직입니다 — 안 버리면 지운 상태가 화면에 남습니다
      putDraft(null);
      onStep?.(e.key === 'ArrowUp' ? 1 : -1);
      return;
    }
    if (e.key === 'Escape') {
      // ref 를 먼저 비우기 때문에, 이어지는 blur 의 flush 가 버린 글자를 확정하지 않습니다
      putDraft(null);
      inputRef.current?.blur();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      flush();
      return;
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      /* 아직 아무것도 안 쳤으면(`draft === null`) **확정값에서** 한 자리를 떼면서 편집을 시작합니다.
         `10` → `1` → `` 순으로 비워지고, 그 뒤부터는 빈 칸에 새로 칠 수 있습니다. */
      putDraft((draftRef.current ?? value).slice(0, -1));
      return;
    }
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      feed(e.key);
    }
  };

  return (
    <div className={['bd-time-field', className].filter(Boolean).join(' ')} data-state={resolved}>
      <Squircle />
      {/* 값은 항상 빈 문자열입니다 — 글자는 옆의 <span> 이 그리고 이 input 은 키 입력만 받습니다 */}
      <input
        ref={inputRef}
        className="bd-time-field__input"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value=""
        role="spinbutton"
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Number(value)}
        aria-valuetext={display === '' ? undefined : display}
        onChange={(e) => feed(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          flush();
        }}
      />
      <span className="bd-time-field__number" aria-hidden="true">
        {display}
        {/* 진열용으로 상태를 고정했을 때는 캐럿을 멈춰 둡니다 — 스크린샷이 흔들리지 않게 */}
        {resolved === 'typing' && <TextBlinker blink={state === undefined} {...blinkerProps} />}
      </span>
    </div>
  );
}

/* ==================== Time Picker ==================== */

export type TimeDirection = 'down-only' | 'up-only' | 'both';

/** 길게 눌렀을 때 연속 증감이 시작되기까지 / 그 뒤 반복 간격 */
const HOLD_DELAY = 400;
const HOLD_INTERVAL = 80;

export interface TimePickerProps {
  /** 위·아래 화살표([Icon Button](../IconButton/IconButton.tsx))에 그대로 넘어갑니다 */
  arrowProps?: Partial<IconButtonProps>;
  /** 가운데 [Time Field](#time-field) 에 그대로 넘어갑니다 */
  fieldProps?: Partial<TimeFieldProps>;
  /** 제어 모드 값 (`'09'`) */
  value?: string;
  /** 비제어 모드 초기값 */
  defaultValue?: string;
  onChange?: (next: string) => void;
  /** 값의 범위를 정합니다. `min`/`max` 를 직접 주면 그쪽이 우선합니다 */
  unit?: TimeUnit;
  min?: number;
  max?: number;
  /** 화살표 한 번에 움직일 양 */
  step?: number;
  /** 끝에서 반대쪽으로 넘어갈지. 시계 값이라 기본이 `true` 입니다 */
  wrap?: boolean;
  /**
   * **Figma 변형을 그대로 진열할 때만** 씁니다.
   * 평소에는 값과 범위에서 자동으로 정해집니다 — `wrap` 이면 항상 `both`,
   * 아니면 끝에 닿은 쪽 화살표가 꺼집니다.
   */
  direction?: TimeDirection;
  /** Time Field 의 상태를 고정합니다 — 문서·진열용 */
  fieldState?: TimeFieldState;
  'aria-label'?: string;
  className?: string;
}

/**
 * 위/아래 화살표로 시간 값을 증감시키는 **스테퍼**입니다. **3개 변형**(전수 실측). 56×116px.
 *
 * 높이 = 36(위) + 2 + 40(Time Field) + 2 + 36(아래) = **116px**.
 * 화살표는 맨 `<button>` 이 아니라 [Icon Button](../IconButton) `Size=M · Type=Ghost` 입니다(Figma 구조 그대로).
 *
 * 조작 방법이 셋입니다 — 화살표 클릭(길게 누르면 연속), Time Field 안에서 ↑ ↓, 직접 타이핑.
 *
 * 스펙 원본: `components/date-time-picker/time-picker/time-picker.md`
 */
export function TimePicker({
  arrowProps,
  fieldProps,
  value,
  defaultValue = '00',
  onChange,
  unit = 'minute',
  min = TIME_UNIT_RANGE[unit].min,
  max = TIME_UNIT_RANGE[unit].max,
  step = 1,
  wrap = true,
  direction,
  fieldState,
  'aria-label': ariaLabel,
  className,
}: TimePickerProps) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const n = clamp(Number(current) || 0, min, max);
  /* 범위를 벗어났거나 한 자리로 들어온 값도 화면에서는 **항상 범위 안의 두 자리**로 보여줍니다.
     (`'7'` → `'07'`, 시의 `'99'` → `'23'`) */
  const shown = pad2(n);

  const bump = useCallback(
    (delta: number) => {
      const next = pad2(stepValue(n, delta * step, min, max, wrap));
      if (value === undefined) setInner(next);
      onChange?.(next);
    },
    [n, step, min, max, wrap, value, onChange],
  );

  /* 길게 누르는 동안 도는 타이머는 최신 `bump` 를 봐야 합니다 —
     간격마다 새로 만들지 않으려고 ref 로 건네줍니다. */
  const bumpRef = useRef(bump);
  useEffect(() => {
    bumpRef.current = bump;
  }, [bump]);

  const hold = useRef<{ delay?: number; repeat?: number }>({});
  const stopHold = useCallback(() => {
    window.clearTimeout(hold.current.delay);
    window.clearInterval(hold.current.repeat);
    hold.current = {};
  }, []);
  useEffect(() => stopHold, [stopHold]);

  const startHold = (delta: number) => {
    stopHold();
    hold.current.delay = window.setTimeout(() => {
      hold.current.repeat = window.setInterval(() => bumpRef.current(delta), HOLD_INTERVAL);
    }, HOLD_DELAY);
  };

  const resolvedDirection: TimeDirection =
    direction ?? (wrap ? 'both' : n >= max ? 'down-only' : n <= min ? 'up-only' : 'both');
  const upDisabled = resolvedDirection === 'down-only';
  const downDisabled = resolvedDirection === 'up-only';

  const label = ariaLabel ?? UNIT_LABEL[unit];

  /* Icon Button 은 포인터 핸들러를 받지 않아서 감싸는 <span> 에 겁니다.
     `display: contents` 라 레이아웃에는 이 래퍼가 없는 것과 같습니다. */
  const arrow = (up: boolean) => (
    <span
      className="bd-time-picker__arrow"
      onPointerDown={() => startHold(up ? 1 : -1)}
      onPointerUp={stopHold}
      onPointerLeave={stopHold}
      onPointerCancel={stopHold}
    >
      <IconButton
        size="m"
        type="ghost"
        iconName={up ? 'chevron_up' : 'chevron_down'}
        disabled={up ? upDisabled : downDisabled}
        onClick={() => bump(up ? 1 : -1)}
        aria-label={`${label} ${up ? '올리기' : '내리기'}`}
        {...arrowProps}
      />
    </span>
  );

  return (
    <div
      className={['bd-time-picker', className].filter(Boolean).join(' ')}
      data-direction={resolvedDirection}
    >
      {arrow(true)}
      <TimeField
        value={shown}
        state={fieldState}
        min={min}
        max={max}
        aria-label={label}
        {...fieldProps}
        onCommit={(next) => {
          if (value === undefined) setInner(next);
          onChange?.(next);
        }}
        onStep={bump}
      />
      {arrow(false)}
    </div>
  );
}

/* ==================== Time Picker Group ==================== */

/** 자리마다의 기본 단위 — 시:분:초 순서입니다 */
const DEFAULT_UNITS: TimeUnit[] = ['hour', 'minute', 'second'];

export interface TimePickerGroupProps {
  /** 각 [Time Picker](#time-picker) 에 그대로 넘어갑니다 — 화살표·필드 속성까지 이어집니다 */
  pickerProps?: Partial<TimePickerProps>;
  /** 제어 모드 값. `'09:30'` 또는 `'09:30:00'` — **자릿수가 곧 Picker Count** 입니다 */
  value?: string;
  /** 비제어 모드 초기값 */
  defaultValue?: string;
  onChange?: (next: string) => void;
  /** 자리별 단위. 기본은 앞에서부터 시·분·초입니다 */
  units?: TimeUnit[];
  /** 자리별 Direction 고정 — 진열용 */
  directions?: TimeDirection[];
  wrap?: boolean;
  className?: string;
}

/**
 * Time Picker 2~3개를 콜론으로 묶은 조합입니다. **2개 변형**(전수 실측). 132×116 / 208×116px.
 *
 * 자리마다 범위가 다릅니다 — 앞에서부터 시(0–23) · 분(0–59) · 초(0–59)입니다. {@link TIME_UNIT_RANGE} 참고.
 *
 * 각 자리는 **따로 순환**합니다 — 분이 59 에서 한 칸 올라가면 00 이 되고 시는 그대로입니다
 * (Figma 의 Time Picker 도 서로 독립된 인스턴스입니다).
 *
 * 스펙 원본: `components/date-time-picker/time-picker-group/time-picker-group.md`
 */
export function TimePickerGroup({
  pickerProps,
  value,
  defaultValue = '00:00',
  onChange,
  units,
  directions,
  wrap = true,
  className,
}: TimePickerGroupProps) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const parts = current.split(':');
  const unitAt = (index: number): TimeUnit => (units ?? DEFAULT_UNITS)[index] ?? 'minute';

  const setPart = (index: number, next: string) => {
    /* 손대지 않은 자리도 같이 다듬어 내보냅니다 — 각 Time Picker 는 어차피 범위 안으로 맞춰 그리므로,
       다듬지 않으면 **화면에 보이는 값과 밖으로 나가는 값이 어긋납니다**(`'99:30'` 이 23 으로 보이는데 99 로 나감). */
    const joined = parts
      .map((part, i) => {
        if (i === index) return next;
        const { min, max } = TIME_UNIT_RANGE[unitAt(i)];
        return pad2(clamp(Number(part) || 0, min, max));
      })
      .join(':');
    if (value === undefined) setInner(joined);
    onChange?.(joined);
  };

  return (
    /* 스펙 2장 그대로 **평면 배열**입니다 — [Picker] → [Colon] → [Picker].
       래퍼로 묶으면 그룹의 gap 이 콜론 양옆이 아니라 래퍼 사이에만 걸려
       폭 산출(56 + 8 + 4 + 8 + 56 = 132)이 맞지 않습니다. */
    <div
      className={['bd-time-picker-group', className].filter(Boolean).join(' ')}
      data-count={parts.length}
    >
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && (
            /* 콜론은 글자가 아니라 4×4 점 두 개입니다 — Figma 도 세로 auto-layout 프레임입니다 */
            <span className="bd-time-picker-group__colon" aria-hidden="true">
              <i />
              <i />
            </span>
          )}
          <TimePicker
            value={part}
            unit={unitAt(i)}
            direction={directions?.[i]}
            wrap={wrap}
            onChange={(next) => setPart(i, next)}
            {...pickerProps}
          />
        </Fragment>
      ))}
    </div>
  );
}
