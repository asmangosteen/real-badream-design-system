import { Icon } from '../Icon/Icon';
import { toNumberingContents, type NumberingContents } from './pagination-logic';
import { Squircle } from '../../shared/Squircle';
import './Pagination.css';

export type { NumberingContents };
/** 변형 목록에서 Hover/Pressed 를 강제로 보여줄 때만 씁니다. 실제 서비스에서는 쓰지 않습니다 */
export type PaginationForceState = 'hover' | 'pressed';

export interface PageNumberingProps {
  /** 표시할 페이지 번호. `abbreviated` 면 무시됩니다 */
  page?: number;
  /** `···` 생략 칸으로 그립니다 (Figma `Contents=Abbreviated`) */
  abbreviated?: boolean;
  /**
   * Figma `Contents` 축을 **직접 지정**합니다.
   * 안 주면 `page` 자릿수로 정해집니다 — 1~3자리 `0~000`(38px) · 4자리 이상 `0000`(44px).
   */
  contents?: NumberingContents;
  /** 현재 페이지. 눌러도 반응하지 않고 `neutral/700` 배경 + 흰 글자가 됩니다 */
  selected?: boolean;
  disabled?: boolean;
  onClick?: (page: number) => void;
  'aria-label'?: string;
  forceState?: PaginationForceState;
  className?: string;
}

/**
 * 페이지 번호 한 칸입니다. Pagination 의 최소 단위입니다.
 *
 * **Figma 15개 변형** = Contents(`0 ~ 000` / `0000` / `Abbreviated`) × State(5종).
 * 높이 38 · radius 10(`radius/05`) · 글자 `Body 2/14 M` `neutral/600`.
 *
 * 스펙 원본: `components/pagination/pagination.md`
 */
export function PageNumbering({
  page,
  abbreviated = false,
  contents,
  selected = false,
  disabled = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: PageNumberingProps) {
  const resolved = contents ?? toNumberingContents(page, abbreviated);
  const isAbbr = resolved === 'abbreviated';

  return (
    <button
      type="button"
      className={['bd-pg-cell', 'bd-page-numbering', className].filter(Boolean).join(' ')}
      data-contents={resolved}
      data-selected={selected}
      data-force-state={forceState}
      disabled={disabled || isAbbr}
      aria-current={selected ? 'page' : undefined}
      aria-label={ariaLabel ?? (isAbbr ? '생략된 페이지' : `${page}페이지`)}
      aria-hidden={isAbbr ? true : undefined}
      onClick={() => !isAbbr && page !== undefined && onClick?.(page)}
    >
      <Squircle />
      {isAbbr ? (
        // `···` 는 글자가 아니라 2.5px 원 3개입니다 (Figma 실측)
        <span className="bd-page-numbering__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
      ) : (
        page
      )}
    </button>
  );
}

export interface PageDirectionProps {
  /** Figma `Type` 축. `previous` = `chevron_left` · `next` = `chevron_right` */
  direction?: 'previous' | 'next';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  forceState?: PaginationForceState;
  className?: string;
}

/**
 * 이전/다음 화살표 한 칸입니다. 38×38 고정이고 아이콘은 20px `neutral/600` 입니다.
 *
 * **Figma 8개 변형** = State(Default/Hover/Pressed/Disabled) × Type(Previous/Next).
 * Selected 축이 없습니다 — 번호 칸과 다른 점입니다.
 */
export function PageDirection({
  direction = 'previous',
  disabled = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: PageDirectionProps) {
  const prev = direction === 'previous';
  return (
    <button
      type="button"
      className={['bd-pg-cell', 'bd-page-direction', className].filter(Boolean).join(' ')}
      data-direction={direction}
      data-force-state={forceState}
      disabled={disabled}
      aria-label={ariaLabel ?? (prev ? '이전 페이지' : '다음 페이지')}
      onClick={onClick}
    >
      <Squircle />
      <Icon name={prev ? 'chevron_left' : 'chevron_right'} category="outlined" size={20} />
    </button>
  );
}
