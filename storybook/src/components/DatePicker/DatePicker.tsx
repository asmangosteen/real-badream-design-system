import { Fragment, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton, type IconButtonProps } from '../IconButton/IconButton';
import { Divider, type DividerProps } from '../Divider/Divider';
import { WeekHeader, Month, type MonthProps, type WeekCell, type WeekHeaderProps } from '../Calendar/Calendar';
import {
  buildMonthWeeks,
  addMonths,
  formatYearMonth,
  formatMonth,
  nextRange,
  EMPTY_RANGE,
  type DateRange,
} from '../Calendar/calendar-data';
import { TimePickerGroup, type TimePickerGroupProps } from '../TimePicker/TimePicker';
import { Squircle } from '../../shared/Squircle';
import './DatePicker.css';

/* ==================== Calendar Header ==================== */

export type CalendarHeaderTitle = 'left' | 'center';
export type CalendarHeaderWith = 'arrows' | 'close' | 'nothing';

export interface CalendarHeaderProps {
  /** ⚠️ 정렬뿐 아니라 **타이포 크기 자체가 다릅니다** — Left 는 Subtitle 18, Center 는 Body1 16 */
  title?: CalendarHeaderTitle;
  /** 우측(또는 좌우)에 붙는 부가 컨트롤 */
  with?: CalendarHeaderWith;
  /** 제목 옆 펼침/접힘 화살표. **variant 축이 아닌 별도 boolean 프로퍼티**입니다 */
  showDropdown?: boolean;
  /** 펼쳐진 상태면 화살표가 위를 향합니다 */
  expanded?: boolean;
  label?: string;
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  onToggle?: () => void;
  /** 이전/다음·닫기 [Icon Button](../IconButton/IconButton.tsx) 세 개에 그대로 넘어갑니다(README 규칙 11) */
  controlProps?: Partial<IconButtonProps>;
  className?: string;
}

/**
 * 달력 상단 **헤더 바**입니다. **6개 변형** + `Show Dropdown` 별도 프로퍼티. 352×56px.
 *
 * 스펙 원본: `components/date-time-picker/calendar-header/calendar-header.md`
 */
export function CalendarHeader({
  title = 'left',
  with: withControl = 'arrows',
  showDropdown = true,
  expanded = false,
  label = '2000년 1월',
  onPrev,
  onNext,
  onClose,
  onToggle,
  controlProps,
  className,
}: CalendarHeaderProps) {
  /* Figma 에서 이 화살표는 Icon Button 이 아니라 `Year and Month` 프레임 안의 **맨아이콘 20px** 입니다.
     그래서 아이콘만 버튼으로 감싸지 않고, **제목 글자까지 통째로** 누를 수 있게 만듭니다
     (아이콘만 눌리면 실제로 조준하기 어렵습니다). 색은 글자 neutral/800 · 아이콘 neutral/600 이라
     버튼이 글자색을 갖고 아이콘 래퍼가 자기 색을 따로 가집니다. */
  const titleContent = (
    <>
      {label}
      {showDropdown && (
        <span className="bd-calendar-header__toggle-icon">
          <Icon name={expanded || withControl === 'close' ? 'arrowhead_up' : 'arrowhead_down'} category="outlined" size={20} />
        </span>
      )}
    </>
  );
  const titleBlock = showDropdown ? (
    <button
      type="button"
      className="bd-calendar-header__title"
      data-interactive="true"
      onClick={onToggle}
      aria-label={`${label}, 연·월 선택`}
      aria-expanded={expanded}
    >
      {titleContent}
    </button>
  ) : (
    <span className="bd-calendar-header__title">{titleContent}</span>
  );

  /* 이전/다음·닫기는 Figma 에서 **Icon Button 인스턴스**(Size=L · Type=Ghost · Icon Color=Black)
     입니다. 자체 button 을 쓰면 Icon Button 의 hover/pressed 오버레이가 빠지므로
     컴포넌트를 그대로 씁니다. 아이콘 색만 헤더에서 neutral/600 으로 덮어씁니다
     (Figma 도 인스턴스 오버라이드입니다 — Icon Button 원본 Ghost 는 neutral/800). */
  const control = (iconName: string, onClick: (() => void) | undefined, ariaLabel: string) => (
    <IconButton size="l" type="ghost" iconName={iconName} onClick={onClick} aria-label={ariaLabel} {...controlProps} />
  );

  return (
    <div
      className={['bd-calendar-header', className].filter(Boolean).join(' ')}
      data-title={title}
      data-with={withControl}
    >
      {/* Center + Arrows 만 3분할 구조입니다 */}
      {title === 'center' && withControl === 'arrows' && control('chevron_left', onPrev, '이전 달')}

      {titleBlock}

      {/* Figma 의 `Arrow Box`(80×40) — 두 화살표는 gap 0 으로 붙어 있습니다 */}
      {title === 'left' && withControl === 'arrows' && (
        <span className="bd-calendar-header__arrows">
          {control('chevron_left', onPrev, '이전 달')}
          {control('chevron_right', onNext, '다음 달')}
        </span>
      )}
      {title === 'center' && withControl === 'arrows' && control('chevron_right', onNext, '다음 달')}
      {withControl === 'close' && control('close', onClose, '닫기')}
    </div>
  );
}

/* ==================== Year and Month Wheel ==================== */

/* Figma 실측(`2224:3190`) — 328×254, 상하 패딩 32, 스크롤 영역 190px.
   가운데에서 멀어질수록 **간격·글자 크기·투명도가 함께 줄어드는 진짜 휠**입니다.

   | 거리 | 중심 오프셋 | 글자      | 투명도 |
   |-----|-----------|----------|-------|
   | 0   | 0         | 18 Medium | 1.0   |
   | 1   | 32        | 18 Regular| 0.7   |
   | 2   | 60        | 16 Regular| 0.5   |
   | 3   | 84        | 14 Regular| 0.3   |

   오프셋 0/32/60/84 는 반지름 92px · 한 칸 20.4°(0.3554rad) 인 원통에 정확히 들어맞습니다
   (`R·sin(d·α)` = 32.0 / 60.1 / 84.3). 그래서 중간값도 이 식으로 이어 붙여
   스크롤 중에 끊김 없이 휘어지게 만듭니다.

   ⚠️ **연도와 월은 서로 독립된 열입니다.** Figma 진열이 1997~2003년 / 10·11·12·1·2·3·4월 로
   되어 있어, 연도는 1년씩·월은 1달씩 따로 돕니다. (이전 구현은 둘을 한 덩어리로 움직여
   1999년 12월 → 1998년 11월 같은 잘못된 조합이 나왔습니다) */
const WHEEL = {
  viewport: 190,
  /** 가운데 칸에서 한 칸 떨어진 자리까지의 **보이는 간격** — Figma 실측 32px. 이 값은 디자인입니다. */
  slot: 32,
  /**
   * 한 칸을 넘기는 데 필요한 **스크롤 거리**. 보이는 간격과 별개입니다. **민감도 손잡이가 여기입니다.**
   *
   * `slot` 과 같은 값(32)이면 트랙패드를 한 번 튕길 때 1년치가 지나갑니다.
   * 이 값만 키우면 보이는 모양은 그대로 두고 민감도만 낮출 수 있습니다(지금은 2배 둔감).
   * 브라우저 네이티브 스크롤·관성·스냅을 그대로 쓰므로 부드러움에는 손대지 않습니다.
   */
  step: 64,
} as const;
/** 첫·마지막 항목도 가운데에 올 수 있게 위아래를 비워 둡니다 */
const WHEEL_PAD = (WHEEL.viewport - WHEEL.step) / 2;   // 63px
/** 거리별 중심 오프셋 — Figma 실측 0/32/60/84. 간격이 32→28→24 로 4씩 줄어드는 패턴이라
 *  바깥쪽은 20 을 이어 붙여 104 로 둡니다. 원통 공식(R·sin)으로는 84 가 나오지 않아
 *  실측 정지점을 그대로 쓰고 사이만 이어 줍니다. */
const OFFSET_STOPS = [0, 32, 60, 84, 104];
const OPACITY_STOPS = [1, 0.7, 0.5, 0.3, 0];
const FONT_STOPS = [18, 18, 16, 14, 14];
/** 월 열은 무한히 감깁니다 — 같은 목록을 이만큼 반복해 이어 붙이고 가운데 벌에서 시작합니다.
 *  ⚠️ 벌 수가 곧 **한 번에 굴릴 수 있는 거리**입니다. 5벌(=60칸, 가운데에서 위아래 944px)이었을 때
 *  세게 튕기면 목록 끝까지 가서 항목이 바닥났고, 멈춘 뒤에야 가운데로 되돌아와 **튕기는 것처럼** 보였습니다.
 *  9벌로 늘리고(아래 `recenter` 와 함께) 끝에 닿을 일이 실질적으로 없게 만듭니다.
 *  늘어난 DOM 은 `paint` 가 보이는 칸만 그리도록 해서 상쇄합니다. */
const LOOP_COPIES = 9;
const LOOP_MIDDLE = 4;
/** 이 거리(칸)를 넘어가면 어차피 투명도 0 이라 그리지 않습니다 */
const PAINT_RANGE = 6;

/**
 * 정지점 사이의 **기울기**(= 각 정지점에서의 속도). 단조 3차 보간(Fritsch–Carlson)용입니다.
 * 이웃한 두 구간의 증감 방향이 다르면 0 으로 눕혀 곡선이 정지점을 넘어 튀지 않게 합니다.
 */
function tangentsOf(y: readonly number[]): number[] {
  const n = y.length;
  const d = Array.from({ length: n - 1 }, (_, i) => y[i + 1] - y[i]);
  const m = new Array<number>(n);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) {
      m[i] = 0;
      continue;
    }
    const avg = (d[i - 1] + d[i]) / 2;
    const limit = 3 * Math.min(Math.abs(d[i - 1]), Math.abs(d[i]));
    m[i] = Math.sign(avg) * Math.min(Math.abs(avg), limit);
  }
  return m;
}

/**
 * 거리(실수)에 따라 두 정지점 사이를 **기울기가 끊기지 않게** 이어 줍니다.
 *
 * ⚠️ 예전에는 직선으로 이었습니다(`lerpStops`). 정지점마다 간격이 32 → 28 → 24 → 20 으로 줄어드는데,
 * 직선으로 이으면 정지점을 지날 때마다 **속도가 뚝 바뀝니다.** 한 칸을 넘기는 거리가 32px 일 때는
 * 순식간에 지나가 티가 안 났지만, 민감도를 낮춰 같은 구간을 두 배 천천히 지나가게 하자 그 꺾임이 그대로 보였습니다 —
 * 이웃한 글자끼리 속도가 달라 **서로 밀어내는 것처럼** 보이고 스크롤이 뚝뚝 끊겨 보인 원인입니다.
 *
 * 정지점 값(Figma 실측)은 그대로 지나가고 그 사이만 매끄럽게 잇습니다. 단조 보간이라 값이 튀지 않습니다.
 */
function smoothStops(stops: readonly number[], tangents: readonly number[], x: number): number {
  const n = stops.length;
  const c = Math.min(Math.max(x, 0), n - 1);
  const i = Math.min(Math.floor(c), n - 2);
  const t = c - i;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * stops[i] +
    (t3 - 2 * t2 + t) * tangents[i] +
    (-2 * t3 + 3 * t2) * stops[i + 1] +
    (t3 - t2) * tangents[i + 1]
  );
}

const OFFSET_TANGENTS = tangentsOf(OFFSET_STOPS);
const OPACITY_TANGENTS = tangentsOf(OPACITY_STOPS);
const FONT_TANGENTS = tangentsOf(FONT_STOPS);

interface WheelColumnProps {
  values: number[];
  index: number;
  onIndexChange: (index: number) => void;
  format: (value: number) => string;
  align: 'center' | 'left';
  width: number;
  ariaLabel: string;
  /** 켜면 목록이 끝없이 감깁니다 (Figma 의 월 열이 1월 위에 12·11·10월 을 보여 줍니다) */
  loop?: boolean;
}

/** 휠 한 열. 네이티브 스크롤 + `scroll-snap` 을 그대로 쓰기 때문에
 *  트랙패드의 관성·감속이 살아 있고, 손을 떼면 항목에 정확히 달라붙습니다.
 *  휘어 보이게 하는 변형만 스크롤에 맞춰 직접 계산합니다(레이아웃에는 영향 없음). */
function WheelColumn({ values, index, onIndexChange, format, align, width, ariaLabel, loop = false }: WheelColumnProps) {
  const viewRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const settleRef = useRef<number | undefined>(undefined);
  /* 사용자가 돌려서 값이 바뀐 경우에는 아래 layout effect 가 **다시 스크롤을 걸면 안 됩니다.**
     이미 손가락(또는 스냅)이 그 자리에 데려다 놨는데 프로그램 스크롤이 겹치면
     둘이 서로 밀어내며 엉뚱한 칸에 멈춥니다.

     ⚠️ 불리언 플래그로는 부족합니다. 플래그를 켜고 값을 올려보냈는데 **바깥이 그 값을 받아들이지 않으면**
     (범위로 잘리거나 무시되거나) `rawIndex` 가 그대로라 effect 가 아예 실행되지 않습니다.
     그러면 플래그가 켜진 채로 남아, 나중에 들어오는 **정당한 동기화 한 번을 통째로 잡아먹습니다** —
     값은 바뀌었는데 휠은 제자리에 굳습니다. 연도 열이 `lo`/`hi` 로 값을 자르므로 실제로 닿을 수 있는 경로입니다.
     그래서 "어느 자리로 갔는지"까지 적어 두고, **그 자리가 그대로 돌아온 렌더에서만** 건너뜁니다. */
  const selfScrollTo = useRef<number | null>(null);
  /* 반대 방향의 사고도 막아야 합니다 — **프로그램이 건 스크롤이 목표에 닿기 전에**
     정착 타이머가 터지면, 지나가던 칸을 "사용자가 고른 값"으로 착각해 확정해 버립니다.
     Date Picker Group 처럼 한쪽 휠을 고르면 **다른 쪽 휠이 따라 움직이는** 구조에서는
     그 오작동 한 번이 기준 달을 통째로 밀어 버립니다.
     목표 위치를 들고 있다가, 도착했거나 스크롤이 멈춰 버린 게 확실할 때만 가드를 풉니다. */
  const syncingTo = useRef<number | null>(null);
  /** 직전 정착 시점의 스크롤 위치 — 부드러운 스크롤이 중간에 끊겼는지 판별합니다 */
  const settledAt = useRef(-1);
  const len = values.length;
  // 감기는 열은 같은 목록을 여러 벌 이어 붙이고, 멈출 때마다 가운데 벌로 되돌립니다
  const slots = loop ? Array.from({ length: len * LOOP_COPIES }, (_, i) => values[i % len]) : values;
  const rawIndex = loop ? LOOP_MIDDLE * len + index : index;

  const paint = useCallback(() => {
    const view = viewRef.current;
    if (!view) return;
    const center = view.scrollTop + WHEEL.viewport / 2;
    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      const natural = WHEEL_PAD + i * WHEEL.step + WHEEL.step / 2;
      const d = (natural - center) / WHEEL.step;
      const ad = Math.abs(d);
      /* 거리 4 를 넘으면 투명도가 이미 0 입니다. 목록을 9벌이나 이어 붙였으므로
         보이지도 않는 칸까지 매 프레임 건드리면 빠르게 굴릴 때 그만큼 손해입니다. */
      if (ad > PAINT_RANGE) {
        if (item.style.opacity !== '0') {
          item.style.opacity = '0';
          item.dataset.center = 'false';
        }
        return;
      }
      // 실측 오프셋으로 옮긴 위치 − 원래 자리 = 안쪽으로 당겨야 할 만큼
      const curved = smoothStops(OFFSET_STOPS, OFFSET_TANGENTS, ad) * Math.sign(d);
      /* 실제로 놓인 자리(d × step)에서 실측 오프셋(curved) 자리로 끌어당깁니다 —
         그래서 스크롤 거리를 바꿔도 **보이는 간격은 Figma 실측 그대로** 유지됩니다. */
      item.style.transform = `translateY(${(curved - d * WHEEL.step).toFixed(2)}px)`;
      item.style.opacity = smoothStops(OPACITY_STOPS, OPACITY_TANGENTS, ad).toFixed(3);
      item.style.fontSize = `${smoothStops(FONT_STOPS, FONT_TANGENTS, ad).toFixed(2)}px`;
      item.dataset.center = ad < 0.5 ? 'true' : 'false';
    });
  }, []);

  /**
   * 감기는 열을 **굴리는 도중에** 가운데 벌로 되돌립니다.
   *
   * 한 벌(=`len`칸) 단위로만 옮기므로 보이는 내용이 완전히 같아 눈에 띄지 않습니다.
   * 멈춘 뒤에 되돌리던 기존 방식은, 세게 튕겨 목록 끝까지 갔을 때 **항목이 바닥난 뒤에야**
   * 제자리를 찾아서 튕기는 것처럼 보였습니다.
   */
  const recenter = useCallback(() => {
    const view = viewRef.current;
    if (!view || !loop) return;
    const period = len * WHEEL.step;
    const top = view.scrollTop;
    const limit = view.scrollHeight - view.clientHeight;
    /* **실제 끝에 다가왔을 때만** 되돌립니다. 위치를 바꾸면 그 순간 브라우저의 관성이 흔들릴 수 있어서,
       되돌리는 횟수 자체를 최소로 가져갑니다 — 평범한 스크롤에서는 한 번도 일어나지 않습니다.
       한 벌 반(=18칸)을 남겨 두므로 아무리 빨라도 다음 스크롤 이벤트 전에 끝에 닿지 않습니다. */
    const margin = period * 1.5;
    if (top > margin && top < limit - margin) return;
    view.scrollTop = (((top % period) + period) % period) + period * LOOP_MIDDLE;
    // 자리를 옮겼으니 바로 다시 그립니다 — 한 프레임이라도 옛 자리로 남아 있으면 눈에 띕니다
    paint();
  }, [loop, len, paint]);

  const handleScroll = useCallback(() => {
    recenter();
    /* ⚠️ `requestAnimationFrame` 으로 미루지 않고 **그 자리에서** 그립니다.
       미루면 스크롤 위치는 이미 움직였는데 글자는 아직 옛 자리에 그려진 프레임이 생깁니다.
       게다가 스크롤 이벤트마다 이전 rAF 를 취소하는 구조라, 이벤트가 프레임보다 잦으면
       그리기가 계속 뒤로 밀립니다 — 세게 굴렸을 때 **강조된 칸이 파란 알약을 벗어나** 보이던 원인입니다.
       (밀린 거리만큼 어긋나므로 어긋나는 방향이 스크롤 방향을 따라갑니다.)
       그리는 비용은 보이는 13칸 남짓이라 스크롤 이벤트마다 바로 해도 부담이 없습니다. */
    paint();
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      const view = viewRef.current;
      if (!view) return;
      const top = view.scrollTop;

      /* 프로그램 스크롤이 가는 중이면 값을 되돌려 보내지 않습니다.
         · 목표에 닿았으면 어차피 바깥 값과 같은 자리이니 확정할 게 없습니다.
         · 아직 가는 중이면 지금 위치는 **지나가던 칸**일 뿐입니다.
         · 위치가 직전 정착 때와 똑같으면 스크롤이 끊긴 것이므로 가드를 풀고 평소대로 처리합니다. */
      const target = syncingTo.current;
      if (target !== null) {
        const arrived = Math.abs(top - target) <= 1;
        const stalled = top === settledAt.current;
        settledAt.current = top;
        if (arrived || stalled) syncingTo.current = null;
        if (arrived || !stalled) return;
      }
      settledAt.current = top;

      const raw = Math.round(top / WHEEL.step);
      const targetIndex = loop
        ? LOOP_MIDDLE * len + (((raw % len) + len) % len)
        : Math.min(Math.max(raw, 0), len - 1);
      const targetTop = targetIndex * WHEEL.step;

      /* 감기는 열은 **한 벌 단위 차이만** 먼저 하드 점프로 지웁니다 — 같은 목록이라 눈에 보이지 않습니다.
         (`recenter` 가 굴리는 도중에 이미 가운데로 데려다 놓으므로 평소에는 여기서 움직일 일이 없습니다.) */
      if (loop) {
        const period = len * WHEEL.step;
        const shift = Math.round((view.scrollTop - targetTop) / period) * period;
        if (shift !== 0) {
          view.scrollTop = view.scrollTop - shift;
          paint();
        }
      }

      /* 브라우저 스냅은 **격자에 정확히 맞춰 주지 않습니다.** 휠이 반픽셀 자리에 놓이면
         (예: 컨테이너 top 이 147.5px) 스냅도 0.5px 쯤 벗어난 곳에 멈추고, `paint` 는 그 위치를
         그대로 반영하므로 선택된 칸이 알약 정중앙에서 미세하게 어긋난 채로 남습니다.
         멈춘 뒤 한 번 격자에 정확히 올려 둡니다 — 보정량이 1px 도 안 되므로 움직임으로 보이지 않습니다.
         (스크롤이 끝나고 110ms 뒤에만 도는 자리라 사용자의 스크롤과 싸우지 않습니다.) */
      /* **멈춘 자리는 반드시 격자 위여야 합니다.**
         `paint` 는 칸의 화면 위치를 오로지 거리 `d` 로만 계산하므로, 선택된 칸이 알약 정중앙에
         오는 조건은 `scrollTop` 이 정확히 `칸번호 × step` 인 것 하나뿐입니다.
         브라우저 스냅은 거기까지 보장하지 않습니다 — 레이아웃이 반픽셀에 놓이면 그만큼 어긋나고,
         위의 한 벌 단위 정규화처럼 **우리가 직접 쓴 위치는 다시 스냅되지도 않습니다.**
         스크롤이 끝나고 110ms 뒤인 이 자리에서 한 번 정확히 올려놓습니다. */
      if (view.scrollTop !== targetTop) {
        // 스냅을 켠 채로 고치면 브라우저가 자기 기준 지점으로 도로 당깁니다 — 쓰는 순간만 끕니다
        const snap = view.style.scrollSnapType;
        view.style.scrollSnapType = 'none';
        view.scrollTop = targetTop;
        paint();
        window.setTimeout(() => { view.style.scrollSnapType = snap; }, 0);
      }

      const value = loop ? targetIndex - LOOP_MIDDLE * len : targetIndex;
      if (value !== index) { selfScrollTo.current = targetIndex; onIndexChange(value); }
    }, 110);
  }, [paint, recenter, index, onIndexChange, len, loop]);

  // 바깥에서 값이 바뀌면 스크롤 위치를 맞춥니다. 첫 그림은 애니메이션 없이.
  const mounted = useRef(false);
  useLayoutEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (selfScrollTo.current === rawIndex) {
      // 사용자가 직접 돌려서 도달한 바로 그 자리 — 이미 제자리에 있으므로 그리기만 합니다
      selfScrollTo.current = null;
      paint();
      return;
    }
    // 그 밖에는(바깥에서 다른 값이 온 경우 포함) 기록을 버리고 정상적으로 맞춥니다
    selfScrollTo.current = null;
    const top = rawIndex * WHEEL.step;
    if (Math.abs(view.scrollTop - top) > 1) {
      syncingTo.current = top;
      settledAt.current = -1;
      view.scrollTo({ top, behavior: mounted.current ? 'smooth' : 'auto' });
    }
    mounted.current = true;
    paint();
  }, [rawIndex, paint]);


  const takeOver = () => {
    syncingTo.current = null;
    settledAt.current = -1;
  };

  return (
    <div
      ref={viewRef}
      className="bd-ym-wheel__col"
      style={{ width, '--bd-wheel-step': `${WHEEL.step}px`, '--bd-wheel-pad': `${WHEEL_PAD}px` } as React.CSSProperties}
      data-align={align}
      role="listbox"
      aria-label={ariaLabel}
      tabIndex={0}
      onScroll={handleScroll}
      /* 사용자가 직접 잡으면 프로그램 스크롤 가드를 즉시 풉니다 —
         안 그러면 따라가던 스크롤이 끝날 때까지 사용자의 조작이 먹히지 않습니다. */
      onPointerDown={takeOver}
      onWheel={takeOver}
      onTouchStart={takeOver}
      onKeyDown={(e) => {
        takeOver();
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        e.preventDefault();
        const step = e.key === 'ArrowDown' ? 1 : -1;
        onIndexChange(loop ? (((index + step) % len) + len) % len : Math.min(Math.max(index + step, 0), len - 1));
      }}
    >
      <div className="bd-ym-wheel__pad" />
      {slots.map((v, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="bd-ym-wheel__item"
          role="option"
          aria-selected={i === rawIndex}
          onClick={() => onIndexChange(loop ? i % len : i)}
        >
          {format(v)}
        </div>
      ))}
      <div className="bd-ym-wheel__pad" />
    </div>
  );
}

export interface YearMonthWheelProps {
  /** 가운데에 오는 연도 */
  year?: number;
  /** 가운데에 오는 달 (1~12) */
  month?: number;
  onChange?: (year: number, month: number) => void;
  /** 고를 수 있는 연도 범위 */
  minYear?: number;
  maxYear?: number;
  className?: string;
}

/**
 * 연·월을 고르는 **휠**입니다. 328×254px.
 *
 * **마우스 휠·트랙패드로 돌릴 수 있습니다.** 네이티브 스크롤 + `scroll-snap` 을 쓰기 때문에
 * 트랙패드의 관성과 감속이 그대로 살아 있고, 멈추면 항목에 달라붙습니다.
 * 항목을 클릭하거나 ↑↓ 키로도 고를 수 있습니다.
 *
 * ⚠️ **연도와 월은 따로 돕니다** — Figma 진열이 그렇게 되어 있습니다(3장 참고).
 *
 * 스펙 원본: `components/date-time-picker/year-month-wheel/year-month-wheel.md`
 */
export function YearMonthWheel({
  year,
  month,
  onChange,
  minYear,
  maxYear,
  className,
}: YearMonthWheelProps) {
  const now = new Date();
  const [innerYear, setInnerYear] = useState(year ?? now.getFullYear());
  const [innerMonth, setInnerMonth] = useState(month ?? now.getMonth() + 1);
  const shownYear = year ?? innerYear;
  const shownMonth = month ?? innerMonth;

  /* ⚠️ 연도 목록은 **고정돼 있어야 합니다.**
     범위를 현재 선택값에서 파생시키면(예: `year − 60 … year + 20`) 연도를 고를 때마다
     목록 전체가 밀려서 같은 연도의 위치가 달라지고, 스크롤이 엉뚱한 칸으로 튑니다.
     그래서 "오늘"을 기준으로 한 번 정하고 선택값과 무관하게 유지합니다. */
  const anchor = useRef(now.getFullYear()).current;
  const lo = Math.min(minYear ?? anchor - 100, shownYear);
  const hi = Math.max(maxYear ?? anchor + 20, shownYear);
  const years = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const commit = (y: number, m: number) => {
    if (year === undefined) setInnerYear(y);
    if (month === undefined) setInnerMonth(m);
    onChange?.(y, m);
  };

  return (
    <div className={['bd-ym-wheel', className].filter(Boolean).join(' ')}>
      {/* 가운데 선택 알약 — 두 열 뒤에 깔립니다 */}
      <div className="bd-ym-wheel__pill" aria-hidden="true">
        <Squircle />
      </div>
      <div className="bd-ym-wheel__cols">
        <WheelColumn
          values={years}
          index={Math.max(years.indexOf(shownYear), 0)}
          onIndexChange={(i) => commit(years[i], shownMonth)}
          format={(v) => `${v}년`}
          align="center"
          width={80}
          ariaLabel="연도"
        />
        <WheelColumn
          values={months}
          index={shownMonth - 1}
          onIndexChange={(i) => commit(shownYear, months[i])}
          format={(v) => `${v}월`}
          align="left"
          width={40}
          ariaLabel="월"
          loop
        />
      </div>
    </div>
  );
}

export type DatePickerState = 'default' | 'wheel';

export interface DatePickerProps {
  /** `default` = 달력 그리드 · `wheel` = 연/월 휠.
   *  **주지 않으면** 제목 옆 화살표로 직접 여닫습니다 */
  state?: DatePickerState;
  /** 하단 시:분 스테퍼 섹션 */
  showTimePicker?: boolean;

  /* ---- 실제 달력으로 동작시킬 때 쓰는 값들 ---- */
  /** 보여줄 연도. 주면 외부가 제어하고, 안 주면 화살표로 내부에서 넘깁니다 */
  year?: number;
  /** 보여줄 달 (1~12) */
  month?: number;
  /** 처음 보여줄 연도 (비제어) */
  defaultYear?: number;
  /** 처음 보여줄 달 (비제어, 1~12) */
  defaultMonth?: number;
  /** `single` = 날짜 하나 · `range` = 기간(시작·끝 두 날짜) */
  selection?: 'single' | 'range';
  /** 선택된 날짜. 주면 외부가 제어합니다. `selection='range'` 에서는 무시됩니다 */
  value?: Date | null;
  /** 처음 선택된 날짜 (비제어) */
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  /** 선택된 기간. 주면 외부가 제어합니다 (`selection='range'` 전용) */
  range?: DateRange | null;
  /** 처음 선택된 기간 (비제어) */
  defaultRange?: DateRange | null;
  onRangeChange?: (range: DateRange) => void;
  onMonthChange?: (year: number, month: number) => void;
  /** `current`(테두리 셀)로 표시할 오늘. `null` 이면 표시하지 않습니다 */
  today?: Date | null;

  /* ---- 변형 진열용 고정값 ---- */
  /** ⚠️ 주면 연·월 계산 대신 이 격자를 그대로 그립니다 (스토리 진열용) */
  weeks?: WeekCell[][];
  /** ⚠️ 주면 연·월에서 만든 라벨 대신 이 글자를 씁니다 (스토리 진열용) */
  label?: string;

  /** Group 안에서는 헤더 구성이 좌우 비대칭이 됩니다 */
  headerWith?: CalendarHeaderWith;
  headerShowDropdown?: boolean;

  /* 아토믹 디자인 — 안에 쓰는 컴포넌트의 속성을 전부 열어 둡니다(README 규칙 11).
     아래 값들은 Date Picker 가 계산해 넣는 **기본값**일 뿐이고, 주면 바깥 값이 이깁니다. */
  /** 상단 [Calendar Header](#calendar-header) 에 그대로 넘어갑니다 */
  headerProps?: Partial<CalendarHeaderProps>;
  /** 요일 라벨 행([Week Header](../Calendar/Calendar.tsx))에 그대로 넘어갑니다 */
  weekHeaderProps?: Partial<WeekHeaderProps>;
  /** 달력 격자([Month](../Calendar/Calendar.tsx))에 그대로 넘어갑니다 */
  monthProps?: Partial<MonthProps>;
  /** 연·월 휠([Year and Month Wheel](#year-and-month-wheel))에 그대로 넘어갑니다 */
  wheelProps?: Partial<YearMonthWheelProps>;
  /** Time Picker 위 [Divider](../Divider/Divider.tsx) 에 그대로 넘어갑니다 */
  dividerProps?: Partial<DividerProps>;
  /**
   * 하단 [Time Picker Group](../TimePicker/TimePicker.tsx) 에 그대로 넘어갑니다.
   * 예전에는 `defaultValue="00:00"` 하나로 박아 두어 **시:분 말고는 아무것도 바꿀 수 없었습니다**
   * — 초 단위(`units`)·방향(`directions`)·값 제어(`value`/`onChange`)가 전부 막혀 있었습니다.
   */
  timePickerGroupProps?: Partial<TimePickerGroupProps>;
  className?: string;
}

/**
 * 달력 + 시간 선택을 한 패널에 담은 **패밀리 플래그십**입니다. **4개 변형**(전수 실측). 352px 고정 폭.
 *
 * **실제 달력으로 동작합니다.** `weeks` 를 주지 않으면 연·월로 진짜 날짜 격자를 계산하고,
 * 헤더 화살표로 달을 넘기고 날짜를 눌러 고를 수 있습니다. 오늘은 `current`, 고른 날짜는
 * `pinned` 로 그려집니다. 날짜 규칙은 `Calendar/calendar-data.ts` 의 순수 함수에 있습니다.
 *
 * 레이아웃: Calendar Header(56px 고정) → 달력 그리드 또는 휠 → (선택) 구분선 + Time Picker Group.
 *
 * 스펙 원본: `components/date-time-picker/date-picker/date-picker.md`
 */
export function DatePicker({
  state,
  showTimePicker = false,
  label,
  weeks,
  year,
  month,
  defaultYear,
  defaultMonth,
  selection = 'single',
  value,
  defaultValue = null,
  onChange,
  range,
  defaultRange = null,
  onRangeChange,
  onMonthChange,
  today = new Date(),
  headerWith,
  headerShowDropdown = true,
  headerProps,
  weekHeaderProps,
  monthProps,
  wheelProps,
  dividerProps,
  timePickerGroupProps,
  className,
}: DatePickerProps) {
  const base = today ?? new Date();
  // 연·월을 주지 않으면 내부에서 들고 있습니다(화살표로 넘길 수 있게)
  const [cursor, setCursor] = useState(() => ({
    year: defaultYear ?? base.getFullYear(),
    month: defaultMonth ?? base.getMonth() + 1,
  }));
  const shownYear = year ?? cursor.year;
  const shownMonth = month ?? cursor.month;

  // 선택 날짜도 주지 않으면 내부 상태를 씁니다
  const [picked, setPicked] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : picked;

  const [pickedRange, setPickedRange] = useState<DateRange>(defaultRange ?? EMPTY_RANGE);
  const effRange = range !== undefined ? (range ?? EMPTY_RANGE) : pickedRange;

  // state 를 주지 않으면 제목 옆 화살표로 휠을 여닫습니다
  const [wheelOpen, setWheelOpen] = useState(false);
  const effState: DatePickerState = state ?? (wheelOpen ? 'wheel' : 'default');

  const goMonth = (delta: number) => {
    const next = addMonths(shownYear, shownMonth, delta);
    if (year === undefined && month === undefined) setCursor(next);
    onMonthChange?.(next.year, next.month);
  };
  const selectDate = (date: Date) => {
    if (selection === 'range') {
      const next = nextRange(effRange, date);
      if (range === undefined) setPickedRange(next);
      onRangeChange?.(next);
    } else if (value === undefined) {
      setPicked(date);
    }
    onChange?.(date);
  };

  /* weeks 를 직접 주면 그 값을 그대로 그립니다(변형 진열용).
     주지 않으면 연·월로 실제 날짜를 계산합니다.

     ⚠️ `single` 과 `range` 는 **섞이지 않습니다** — Figma 주석이
     *"selected는 무조건 기간 사이 선택 시 적용됨"* 이라, 기간이 아닌 단일 선택에서
     `selected`(연한 파랑) 가 나오면 안 되기 때문입니다. */
  const ranged = selection === 'range';
  const grid =
    weeks ??
    buildMonthWeeks(shownYear, shownMonth, {
      today,
      selected: ranged ? null : selected,
      rangeStart: ranged ? effRange.start : null,
      rangeEnd: ranged ? effRange.end : null,
      onSelect: selectDate,
    });

  return (
    <div className={['bd-date-picker', className].filter(Boolean).join(' ')} data-state={effState}>
      <CalendarHeader
        title="left"
        /* 휠이 열려 있으면 `headerWith` 와 무관하게 닫기 버튼입니다 (Figma: State=Wheel → With=Close).
           Group 은 패널마다 `headerWith` 를 고정해 넘기는데, 그 값이 휠 상태까지 덮으면
           휠을 열어 놓고 닫을 방법이 없어집니다. */
        with={effState === 'wheel' ? 'close' : (headerWith ?? 'arrows')}
        showDropdown={headerShowDropdown}
        expanded={effState === 'wheel'}
        label={label ?? formatYearMonth(shownYear, shownMonth)}
        onPrev={() => goMonth(-1)}
        onNext={() => goMonth(1)}
        onToggle={() => setWheelOpen((v) => !v)}
        onClose={() => setWheelOpen(false)}
        {...headerProps}
      />
      <div className="bd-date-picker__body">
        {effState === 'default' ? (
          <>
            <WeekHeader {...weekHeaderProps} />
            <Month weeks={grid} {...monthProps} />
          </>
        ) : (
          <YearMonthWheel
            year={shownYear}
            month={shownMonth}
            onChange={(y, m) => {
              if (year === undefined && month === undefined) setCursor({ year: y, month: m });
              onMonthChange?.(y, m);
            }}
            {...wheelProps}
          />
        )}
      </div>
      {showTimePicker && (
        <>
          <Divider {...dividerProps} />
          <div className="bd-date-picker__time">
            <TimePickerGroup defaultValue="00:00" {...timePickerGroupProps} />
          </div>
        </>
      )}
    </div>
  );
}

export interface DatePickerGroupProps {
  /** `horizontal` = 좌우 두 달 · `vertical` = 위아래 두 달 */
  type?: 'horizontal' | 'vertical';

  /* ---- 실제 달력으로 동작시킬 때 쓰는 값들 ---- */
  /** **첫 패널**이 보여줄 연도. 다음 패널은 자동으로 그 다음 달입니다 */
  year?: number;
  /** 첫 패널이 보여줄 달 (1~12) */
  month?: number;
  defaultYear?: number;
  defaultMonth?: number;
  /** 기준 달이 움직일 때마다 **첫 패널 기준**으로 알려 줍니다 */
  onMonthChange?: (year: number, month: number) => void;
  /** `single` = 날짜 하나 · `range` = 기간. 기간은 **두 패널에 걸쳐 이어집니다** */
  selection?: 'single' | 'range';
  /** 선택된 날짜. 두 패널이 **하나를 나눠 씁니다** */
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  /** 선택된 기간. 이것도 두 패널이 **하나를 나눠 씁니다** */
  range?: DateRange | null;
  defaultRange?: DateRange | null;
  onRangeChange?: (range: DateRange) => void;
  today?: Date | null;

  /**
   * 패널마다 시:분 스테퍼를 답니다 — 두 패널이 **각자의 시간 값**을 가집니다.
   * `vertical` 에서는 무시됩니다 (부수 화면 없이 달력만 씁니다).
   */
  showTimePicker?: boolean;
  /** 두 패널([Date Picker](#date-picker))에 그대로 넘어갑니다 — 헤더·휠·Time Picker 속성까지 이어집니다 */
  panelProps?: Partial<DatePickerProps>;
  /** 두 패널 사이 [Divider](../Divider/Divider.tsx) 에 그대로 넘어갑니다 */
  dividerProps?: Partial<DividerProps>;
  className?: string;
}

/** Figma 가로 그룹은 두 달, 세로 그룹도 두 달입니다 */
const GROUP_PANELS = 2;

/**
 * Date Picker 두 개를 이어 붙여 **연속된 두 달**을 한 번에 보여 줍니다. **2개 변형**(전수 실측).
 * 가로 721×342 · 세로 352×661.
 *
 * ## 두 패널은 독립적이지 않습니다
 *
 * 그룹이 **기준 달 하나**를 들고, 첫 패널이 기준 달을 · 다음 패널이 그 다음 달을 그립니다.
 * 그래서 어느 쪽에서 달을 옮기든(화살표든 휠이든) 둘이 **같이** 움직이고 제목도 함께 바뀝니다.
 * 날짜 선택도 하나를 나눠 쓰므로, 9월 패널에서 고르든 10월 패널에서 고르든 같은 값이 됩니다.
 *
 * **기간도 두 패널에 걸쳐 이어집니다** — Figma 주석 *"기간은 패널 두개가 붙어도 계속 이어짐"*.
 * 왼쪽 패널에서 시작해 오른쪽 패널에서 끝나면, 왼쪽은 시작 앵커부터 달 끝까지 · 오른쪽은
 * 달 첫날부터 끝 앵커까지 칠해집니다. 다만 **띠가 두 패널 사이를 건너뛰지는 않습니다** —
 * 각 패널의 띠는 자기 격자(328px) 안에서 끝납니다. Figma 실측도 왼쪽 띠가 2924~3252,
 * 오른쪽 띠가 3285~3613 으로 가운데 33px(여백 16 + 구분선 1 + 여백 16)이 비어 있습니다.
 *
 * ## 두 변형이 서로 꽤 다릅니다
 *
 * | | Horizontal | Vertical |
 * |---|---|---|
 * | 제목 | `2000년 1월` | **`1월`** — 연도 없음 |
 * | 제목 옆 펼침 화살표 | 양쪽 다 있음 | 없음 |
 * | 연·월 휠 | 패널마다 따로 열림 | 없음 |
 * | 이전/다음 화살표 | **마지막 패널에만** | 없음 |
 * | Time Picker | 패널마다 따로 | 없음 |
 * | 패널 크기 | 360px · 달력 여백 16 | 352px · 달력 여백 세로 8 / 가로 12 |
 *
 * 세로형은 **특정 상황에서만 쓰는 고정 표시**라 부수 화면이 전부 빠져 있습니다(사용자 확인).
 *
 * 스펙 원본: `components/date-time-picker/date-picker-group/date-picker-group.md`
 */
export function DatePickerGroup({
  type = 'horizontal',
  year,
  month,
  defaultYear,
  defaultMonth,
  onMonthChange,
  selection = 'single',
  value,
  defaultValue = null,
  onChange,
  range,
  defaultRange = null,
  onRangeChange,
  today = new Date(),
  showTimePicker = false,
  panelProps,
  dividerProps,
  className,
}: DatePickerGroupProps) {
  const base = today ?? new Date();
  /* 두 패널이 **기준 달 하나**를 나눠 씁니다 — 패널 i 는 기준 달 + i 개월. */
  const [cursor, setCursor] = useState(() => ({
    year: defaultYear ?? base.getFullYear(),
    month: defaultMonth ?? base.getMonth() + 1,
  }));
  const shownYear = year ?? cursor.year;
  const shownMonth = month ?? cursor.month;

  const [picked, setPicked] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : picked;

  /* 기간은 **그룹이 하나만** 들고 두 패널에 똑같이 내려 줍니다 — 이게 "패널이 붙어도
     기간이 이어진다" 는 규칙의 전부입니다. 각 패널은 받은 기간을 자기 달에 맞게 잘라 그립니다. */
  const [pickedRange, setPickedRange] = useState<DateRange>(defaultRange ?? EMPTY_RANGE);
  const effRange = range !== undefined ? (range ?? EMPTY_RANGE) : pickedRange;

  const vertical = type === 'vertical';
  const panels = Array.from({ length: GROUP_PANELS }, (_, i) => addMonths(shownYear, shownMonth, i));

  /**
   * 패널이 "이제 이 달을 보여주고 싶다" 고 알려오면 **그 패널의 자리만큼 빼서** 기준 달을 옮깁니다.
   * 화살표든 휠이든 똑같이 이 길로 들어오므로, 어느 쪽을 건드려도 둘이 같은 간격을 유지한 채 따라옵니다.
   */
  const moveTo = (index: number, y: number, m: number) => {
    const next = addMonths(y, m, -index);
    if (year === undefined && month === undefined) setCursor(next);
    onMonthChange?.(next.year, next.month);
  };

  const selectDate = (date: Date) => {
    if (value === undefined) setPicked(date);
    onChange?.(date);
  };

  const changeRange = (next: DateRange) => {
    if (range === undefined) setPickedRange(next);
    onRangeChange?.(next);
  };

  return (
    <div className={['bd-date-picker-group', className].filter(Boolean).join(' ')} data-type={type}>
      {panels.map((panel, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <Divider
              type={vertical ? 'horizontal' : 'vertical'}
              color="var(--sys-color-neutral-200)"
              {...dividerProps}
            />
          )}
          <DatePicker
            year={panel.year}
            month={panel.month}
            selection={selection}
            value={selected}
            range={effRange}
            onRangeChange={changeRange}
            today={today}
            onChange={selectDate}
            onMonthChange={(y, m) => moveTo(i, y, m)}
            /* 이전/다음 화살표는 **마지막 패널에만** 답니다(Figma). 하나만 있어도 둘이 같이 움직이므로
               패널마다 달면 같은 일을 하는 화살표가 두 벌 생깁니다. 세로형은 아예 없습니다. */
            headerWith={!vertical && i === GROUP_PANELS - 1 ? 'arrows' : 'nothing'}
            /* 가로형은 양쪽 다 제목을 눌러 각자의 휠을 엽니다. 세로형은 휠이 없습니다. */
            headerShowDropdown={!vertical}
            /* 세로형만 연도를 빼고 달만 씁니다 (Figma "1월"/"2월") */
            label={vertical ? formatMonth(panel.month) : undefined}
            showTimePicker={!vertical && showTimePicker}
            {...panelProps}
          />
        </Fragment>
      ))}
    </div>
  );
}
