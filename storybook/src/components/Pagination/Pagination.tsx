import { useState, type CSSProperties } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { TextInput } from '../TextInput/TextInput';
import { Button } from '../Button/Button';
import { PageNumbering, PageDirection } from './PageNumbering';
import { buildPageSlots, toGroupVariant, clampPage, MAX_PAGE_SLOTS } from './pagination-logic';
import './Pagination.css';

/* ============================================================
   Page Numbering Group — 번호 9칸
   ============================================================ */
export interface PageNumberingGroupProps {
  /** 전체 페이지 수 */
  total?: number;
  /** 현재 페이지 (1부터) */
  current?: number;
  onChange?: (page: number) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * 번호 칸을 **최대 9개**까지 늘어놓습니다. 9개를 넘으면 `···` 로 생략합니다.
 *
 * | 조건 | Figma 변형 | 모양 |
 * |---|---|---|
 * | 총 ≤ 9 | `Stable / None` | 전부 표시 |
 * | 현재 ≤ 5 | `Abbreviated / Rear` | `1 2 3 4 5 6 7 ··· 끝` |
 * | 현재 ≥ 총−4 | `Abbreviated / Front` | `1 ··· 끝−6 … 끝` |
 * | 그 외 | `Abbreviated / Both` | `1 ··· 현재±2 ··· 끝` |
 *
 * **어느 경우에도 현재 페이지 좌우에 번호가 2개씩 보입니다** — 경계를 이 기준으로 잡았습니다.
 * 계산은 `pagination-logic.ts` 의 `buildPageSlots` 가 합니다.
 */
export function PageNumberingGroup({
  total = 9,
  current = 1,
  onChange,
  disabled = false,
  className,
}: PageNumberingGroupProps) {
  const slots = buildPageSlots(total, current);
  const variant = toGroupVariant(total, current);
  const safeCurrent = clampPage(current, total);

  return (
    <div
      className={['bd-page-numbering-group', className].filter(Boolean).join(' ')}
      data-state={variant.state}
      data-abbreviated={variant.abbreviated}
    >
      {slots.map((slot, i) =>
        slot.kind === 'ellipsis' ? (
          <PageNumbering key={`gap-${i}`} abbreviated />
        ) : (
          <PageNumbering
            key={slot.page}
            page={slot.page}
            selected={slot.page === safeCurrent}
            disabled={disabled}
            onClick={onChange}
          />
        ),
      )}
    </div>
  );
}

/* ============================================================
   Pagination — ‹ + 번호 9칸 + ›
   ============================================================ */
export interface PaginationProps extends PageNumberingGroupProps {
  /**
   * 첫/끝 페이지에서 화살표를 자동으로 비활성화합니다 (2026-09-19 디자이너 확인).
   * 끄면 화살표가 항상 활성이고 비활성 여부는 쓰는 쪽이 정합니다.
   */
  autoDisableArrows?: boolean;
  className?: string;
}

/**
 * 화살표 + 번호 묶음입니다. Figma 실측 **418×38** (38 + 342 + 38, gap 0).
 *
 * 현재가 1페이지면 `‹`, 마지막 페이지면 `›` 가 비활성(opacity 40%)됩니다.
 */
export function Pagination({
  total = 9,
  current = 1,
  onChange,
  disabled = false,
  autoDisableArrows = true,
  className,
}: PaginationProps) {
  const safeCurrent = clampPage(current, total);
  const atStart = autoDisableArrows && safeCurrent <= 1;
  const atEnd = autoDisableArrows && safeCurrent >= Math.max(1, Math.floor(total));

  return (
    <nav
      className={['bd-pagination', className].filter(Boolean).join(' ')}
      aria-label="페이지 이동"
    >
      <PageDirection
        direction="previous"
        disabled={disabled || atStart}
        onClick={() => onChange?.(clampPage(safeCurrent - 1, total))}
      />
      <PageNumberingGroup total={total} current={safeCurrent} onChange={onChange} disabled={disabled} />
      <PageDirection
        direction="next"
        disabled={disabled || atEnd}
        onClick={() => onChange?.(clampPage(safeCurrent + 1, total))}
      />
    </nav>
  );
}

/* ============================================================
   Per Page — 한 화면에 몇 개씩 볼지
   ============================================================ */
/** ⚠️ Figma 에는 `10개` 하나만 그려져 있습니다 — 목록은 2026-09-19 디자이너 지시값입니다 */
export const PER_PAGE_OPTIONS = [10, 20, 30, 50] as const;

export interface PerPageProps {
  value?: number;
  /** 선택지 목록. 화면마다 자유롭게 바꿀 수 있습니다 */
  options?: readonly number[];
  onChange?: (value: number) => void;
  /** 뒤에 붙는 문구 */
  suffix?: string;
  /** 아래 [Dropdown](../Dropdown/Dropdown.tsx) 에 그대로 넘어가는 속성 전부입니다 */
  dropdownProps?: Partial<Parameters<typeof Dropdown>[0]>;
  className?: string;
}

/**
 * `[10개 ∨] 씩 보기` — Figma 실측 **136×38** (Dropdown 80 + 문구칸 56).
 *
 * ⚠️ **Disabled 상태가 없습니다.** 필요 없으면 비활성이 아니라 `showPerPage={false}` 로 숨깁니다
 * (2026-09-19 디자이너 지시 — Move to Page 와 같은 규칙).
 *
 * ⚠️ **열리는 목록은 원래 `Select Group` 컴포넌트입니다**(Figma `2686:7432`, 36변형).
 * 저장소에 아직 없어서 여기서는 **동작만 보여주는 임시 목록**을 씁니다
 * (2026-09-19 디자이너 결정). 위치 규칙인 **드롭다운 아래 4px** 만 Figma 지시대로 지켰습니다.
 */
export function PerPage({
  value = 10,
  options = PER_PAGE_OPTIONS,
  onChange,
  suffix = '씩 보기',
  dropdownProps,
  className,
}: PerPageProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={['bd-per-page', className].filter(Boolean).join(' ')}>
      <div
        className="bd-per-page__dropdown"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((o) => !o); }
          if (e.key === 'Escape') setOpen(false);
        }}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`한 번에 보는 개수, 현재 ${value}개`}
      >
        <Dropdown
          size="m"
          value={`${value}개`}
          state={open ? 'selected' : 'done'}
          showLabel={false}
          showButton={false}
          showSupportingText={false}
          showLeftIcon={false}
          {...dropdownProps}
        />
      </div>
      <span className="bd-per-page__suffix">{suffix}</span>

      {open && (
        <ul className="bd-per-page__list" role="listbox">
          {options.map((n) => (
            <li key={n}>
              <button
                type="button"
                role="option"
                aria-selected={n === value}
                onClick={() => { onChange?.(n); setOpen(false); }}
              >
                {n}개
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ============================================================
   Move to Page — 번호를 직접 입력해 이동
   ============================================================ */
/** `Move to Page` 입력칸이 받을 수 있는 최대 페이지. 자릿수 4가 상한입니다 */
export const MOVE_TO_PAGE_MAX = 9999;

/**
 * 입력칸 폭을 **총 페이지 자릿수에 비례**시킵니다.
 *
 * Figma 실측이 4자리(`9999`)에서 64px 이고 Text Input 의 좌우 패딩이 12+12=24px 이므로
 * 내용칸 40px ÷ 4자리 = **자리당 10px** 입니다. 이 값을 기준으로 자릿수만큼 줄입니다.
 *
 * | 총 페이지 | 자릿수 | 폭 |
 * |---|---|---|
 * | 1~9 | 1 | 34px |
 * | 10~99 | 2 | 44px |
 * | 100~999 | 3 | 54px |
 * | 1000~9999 | 4 | **64px** (Figma 실측) |
 *
 * ⚠️ Figma 에는 4자리 예시 하나뿐입니다 — 자릿수 비례 규칙은 2026-09-19 디자이너 지시가 출처입니다.
 */
export function moveToPageDigits(total: number): number {
  const t = Math.min(MOVE_TO_PAGE_MAX, Math.max(1, Math.floor(total || 1)));
  return String(t).length;
}

export interface MoveToPageProps {
  /** 총 페이지 수. 입력칸 폭이 이 값의 자릿수를 따라갑니다 (최대 9999) */
  total?: number;
  /** 입력칸 초기값. 비워 두면 빈 칸에서 시작합니다 */
  defaultValue?: string;
  onSubmit?: (page: number) => void;
  buttonLabel?: string;
  /** 입력칸([Text Input](../TextInput/TextInput.tsx))에 그대로 넘어가는 속성 전부입니다 */
  textInputProps?: Partial<Parameters<typeof TextInput>[0]>;
  /** 오른쪽 [Button](../Button/Button.tsx) 에 그대로 넘어가는 속성 전부입니다 */
  buttonProps?: Partial<Parameters<typeof Button>[0]>;
  className?: string;
}

/**
 * `[9999] / 9999 [이동]` — Figma 실측 **179×38** (입력 묶음 122 + gap 8 + 버튼 49).
 *
 * **범위를 벗어난 값은 자동으로 보정합니다** — 총 100페이지인데 101·130 을 넣으면 100 이 됩니다
 * (2026-09-19 디자이너 지시). 0 이하는 1 이 됩니다.
 *
 * ⚠️ **Disabled 상태가 없습니다.** 필요 없는 상황(예: 폭이 좁아 다 못 보여줄 때)에는
 * 비활성이 아니라 **아예 노출하지 않습니다** — `PaginationGroup` 의 `showMoveToPage={false}` 를 쓰세요
 * (2026-09-19 디자이너 지시).
 */
export function MoveToPage({
  total = MOVE_TO_PAGE_MAX,
  defaultValue = '',
  onSubmit,
  buttonLabel = '이동',
  textInputProps,
  buttonProps,
  className,
}: MoveToPageProps) {
  const [raw, setRaw] = useState(defaultValue);
  const max = Math.min(MOVE_TO_PAGE_MAX, Math.max(1, Math.floor(total || 1)));
  const digits = moveToPageDigits(max);

  const submit = () => {
    const n = clampPage(Number(raw), max);
    setRaw(String(n));       // 보정된 값을 입력칸에도 되돌려 보여 줍니다
    onSubmit?.(n);
  };

  return (
    <div className={['bd-move-to-page', className].filter(Boolean).join(' ')}>
      <div className="bd-move-to-page__input-group">
        {/* 폭은 총 페이지 자릿수를 따릅니다 — CSS 가 `24px + 자릿수 × 10px` 로 계산합니다 */}
        <div
          className="bd-move-to-page__field"
          style={{ '--bd-mtp-digits': digits } as CSSProperties}
        >
          <TextInput
            size="m"
            value={raw}
            placeholder={String(max)}
            showLabel={false}
            showButton={false}
            showSupportingText={false}
            /* ⚠️ TextInput 은 좌·우 아이콘이 기본 켜짐입니다. Figma 인스턴스는 둘 다 False 라 꺼야 합니다 */
            showLeftIcon={false}
            showRightIcon={false}
            /* TextInput 은 값만 넘겨 주고, 비활성은 state 로 표현합니다 */
            onChange={(v) => setRaw(v.replace(/[^0-9]/g, ''))}
            inputProps={{
              inputMode: 'numeric',
              'aria-label': '이동할 페이지 번호',
              onKeyDown: (e) => { if (e.key === 'Enter') submit(); },
            }}
            {...textInputProps}
          />
        </div>
        <span className="bd-move-to-page__total">
          <span>/</span>
          <span>{max}</span>
        </span>
      </div>
      <Button
        size="l"
        type="secondary"
        textColor="blue"
        contents="text"
        onClick={submit}
        {...buttonProps}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

/* ============================================================
   Pagination Group — 셋을 한 줄에
   ============================================================ */
export interface PaginationGroupProps extends PaginationProps {
  /**
   * 세 칸을 켜고 끕니다. Figma 의 `Show Per Page` · `Show Pagination` · `Show Move to Page` 와 1:1 입니다.
   *
   * **폭이 좁아 셋을 다 못 보여줄 때는 비활성이 아니라 이 값으로 숨깁니다** —
   * `Per Page` 와 `Move to Page` 에는 Disabled 상태가 아예 없습니다(2026-09-19 디자이너 지시).
   * 언제 끄는지는 **쓰는 화면이 정합니다** — 컴포넌트가 폭을 재서 자동으로 숨기지 않습니다.
   */
  showPerPage?: boolean;
  showPagination?: boolean;
  showMoveToPage?: boolean;
  perPage?: number;
  onPerPageChange?: (value: number) => void;
  /** 왼쪽 [Per Page](#perpage) 에 그대로 넘어가는 속성 전부입니다 */
  perPageProps?: Partial<PerPageProps>;
  /** 오른쪽 [Move to Page](#movetopage) 에 그대로 넘어가는 속성 전부입니다 */
  moveToPageProps?: Partial<MoveToPageProps>;
  className?: string;
}

/**
 * `Per Page` — `Pagination` — `Move to Page` 를 한 줄에 배치한 최종 조합입니다.
 *
 * ⚠️ **폭은 컨테이너 100%** 입니다. Figma 는 1080 고정이지만 그건 기준 폭일 뿐이고
 * 웹에서는 창 폭을 따라갑니다(2026-09-19 디자이너 확인). Navigation Bar Top 과 같은 결론입니다.
 *
 * 셋 중 일부를 꺼도 **Pagination 은 가운데 자리를 지킵니다** — Figma `Frame 1` 예시와 같습니다.
 *
 * ⚠️ `disabled` 는 **가운데 Pagination(번호 칸·화살표)에만** 걸립니다.
 * `Per Page` 와 `Move to Page` 에는 Disabled 상태가 없기 때문입니다.
 */
export function PaginationGroup({
  showPerPage = true,
  showPagination = true,
  showMoveToPage = true,
  perPage = 10,
  onPerPageChange,
  perPageProps,
  moveToPageProps,
  total = 9,
  current = 1,
  onChange,
  disabled = false,
  autoDisableArrows = true,
  className,
}: PaginationGroupProps) {
  return (
    <div className={['bd-pagination-group', className].filter(Boolean).join(' ')}>
      <div className="bd-pagination-group__slot" data-side="start">
        {showPerPage && (
          <PerPage value={perPage} onChange={onPerPageChange} {...perPageProps} />
        )}
      </div>
      <div className="bd-pagination-group__slot" data-side="center">
        {showPagination && (
          <Pagination
            total={total}
            current={current}
            onChange={onChange}
            disabled={disabled}
            autoDisableArrows={autoDisableArrows}
          />
        )}
      </div>
      {/* ⚠️ MoveToPage 에는 Disabled 가 없습니다 — 필요 없으면 showMoveToPage 로 아예 숨깁니다 */}
      <div className="bd-pagination-group__slot" data-side="end">
        {showMoveToPage && (
          <MoveToPage total={total} onSubmit={onChange} {...moveToPageProps} />
        )}
      </div>
    </div>
  );
}
