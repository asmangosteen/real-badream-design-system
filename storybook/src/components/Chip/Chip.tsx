import { Avatar } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import './Chip.css';

export type ChipSize = 's' | 'm' | 'l';
export type ChipType = 'outlined' | 'filled';
export type ChipContents = 'text' | 'avatar-text' | 'avatar-text-icon' | 'icon-text' | 'text-icon';
export type FilterContents = 'text-icon' | 'icon' | 'avatar-icon' | 'avatar-text-icon';

interface ChipBase {
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  /** 변형 목록 표시용 강제 상태 */
  forceState?: 'hover' | 'pressed';
  className?: string;
  'aria-label'?: string;
}

export interface ChipProps extends ChipBase {
  children?: React.ReactNode;
  /** **M 과 L 의 좌우 패딩이 12px 로 같습니다.** S 만 8px 로 작습니다 */
  size?: ChipSize;
  /** `outlined` = 흰 배경 + 테두리 · `filled` = 연한 회색 배경 */
  type?: ChipType;
  /** 라벨·아바타·아이콘 조합. 조합에 따라 좌우 패딩이 비대칭이 됩니다 */
  contents?: ChipContents;
  /** Selection 의 아이콘은 **교체 가능한 슬롯**입니다 */
  iconName?: string;
  avatarSrc?: string;
}

/**
 * 다중 선택·태그·카테고리 선택에 쓰는 범용 칩입니다 (**Chip / Selection**).
 *
 * Button·Badge 의 Loading 대신 **Selected** 상태가 있습니다.
 * Selected 에서 Outlined 와 Filled 가 **서로 완전히 다른 전략**을 씁니다 —
 * Outlined 는 옅은 파란 배경 + 파란 테두리, Filled 는 진한 남색 단색입니다.
 *
 * 스펙 원본: `components/chip/chip.md`
 */
export function Chip({
  children,
  size = 'm',
  type = 'outlined',
  contents = 'text',
  iconName = 'plus',
  avatarSrc,
  disabled = false,
  selected = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: ChipProps) {
  const iconSize = 16;
  const avatar = (
    <span className="bd-chip__avatar">
      <Avatar src={avatarSrc} alt="" size={16} />
    </span>
  );
  const icon = (
    <span className="bd-chip__icon">
      <Icon name={iconName} category="outlined" size={iconSize} />
    </span>
  );

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      disabled={disabled}
      className={['bd-chip', className].filter(Boolean).join(' ')}
      data-kind="selection"
      data-size={size}
      data-type={type}
      data-contents={contents}
      data-selected={selected}
      data-force-state={forceState}
      onClick={onClick}
    >
      {(contents === 'avatar-text' || contents === 'avatar-text-icon') && avatar}
      {contents === 'icon-text' && icon}
      <span>{children}</span>
      {(contents === 'text-icon' || contents === 'avatar-text-icon') && icon}
    </button>
  );
}

export interface FilterChipProps extends ChipBase {
  children?: React.ReactNode;
  type?: ChipType;
  /** Filter 는 **Size 축이 없습니다**. 아이콘도 `chevron_down` 으로 고정입니다 */
  contents?: FilterContents;
  avatarSrc?: string;
}

/**
 * 드롭다운 필터 트리거 전용 칩입니다 (**Chip / Filter**).
 *
 * **Size 축이 없고**(단일 크기, radius 999px 고정),
 * 아이콘이 항상 `chevron_down` 으로 **교체할 수 없습니다.**
 * 색상·State 메커니즘은 Selection 과 완전히 동일합니다.
 *
 * 스펙 원본: `components/chip/chip.md` 5장
 */
export function FilterChip({
  children,
  type = 'outlined',
  contents = 'text-icon',
  avatarSrc,
  disabled = false,
  selected = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: FilterChipProps) {
  const showsText = contents === 'text-icon' || contents === 'avatar-text-icon';
  const showsAvatar = contents === 'avatar-icon' || contents === 'avatar-text-icon';

  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={selected}
      aria-label={ariaLabel}
      disabled={disabled}
      className={['bd-chip', className].filter(Boolean).join(' ')}
      data-kind="filter"
      data-type={type}
      data-contents={contents}
      data-selected={selected}
      data-force-state={forceState}
      onClick={onClick}
    >
      {showsAvatar && (
        <span className="bd-chip__avatar">
          <Avatar src={avatarSrc} alt="" size={16} />
        </span>
      )}
      {showsText && <span>{children}</span>}
      {/* Filter 의 아이콘은 항상 chevron_down 고정입니다 */}
      <span className="bd-chip__icon">
        <Icon name="chevron_down" category="outlined" size={16} />
      </span>
    </button>
  );
}
