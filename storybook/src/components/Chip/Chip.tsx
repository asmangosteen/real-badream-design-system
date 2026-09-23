import { Avatar, type AvatarProps } from '../Avatar/Avatar';
import { Icon } from '../Icon/Icon';
import { Squircle } from '../../shared/Squircle';
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

export type ChipIconPosition = 'left' | 'right';

/** Figma Contents 축 ↔ 세 개의 독립 속성(아바타/아이콘/아이콘 위치) 사이를 오갑니다.
 *
 *  Figma 는 이 조합을 **하나의 Contents 축**으로 묶어 두었지만, 실제로 만들 때는
 *  "아바타 켤까 / 아이콘 켤까 / 아이콘을 어느 쪽에 둘까" 세 가지를 따로 정하는 편이 자연스럽습니다.
 *  그래서 세 속성을 노출하고, 내부에서 Figma 축 값으로 되돌려 `data-contents` 에 씁니다
 *  (CSS 와 Figma 변형이 1:1 로 대응되는 구조는 그대로 유지됩니다).
 *
 *  ⚠️ **아바타와 왼쪽 아이콘은 같이 쓸 수 없습니다.** Figma 에 그 조합의 변형이 없습니다
 *  (아바타가 있으면 아이콘은 항상 오른쪽). 그렇게 지정하면 아이콘을 오른쪽으로 보냅니다. */
export function toChipContents(avatar: boolean, icon: boolean, position: ChipIconPosition): ChipContents {
  if (avatar) return icon ? 'avatar-text-icon' : 'avatar-text';
  if (!icon) return 'text';
  return position === 'left' ? 'icon-text' : 'text-icon';
}

export function fromChipContents(contents: ChipContents): { avatar: boolean; icon: boolean; position: ChipIconPosition } {
  return {
    avatar: contents === 'avatar-text' || contents === 'avatar-text-icon',
    icon: contents !== 'text' && contents !== 'avatar-text',
    position: contents === 'icon-text' ? 'left' : 'right',
  };
}

/** Selection 의 아바타·아이콘은 **Size 마다 크기가 다릅니다** (Figma 전수 실측, 2026-09-15).
 *  아바타는 12 / 16 / 20 으로 3단계인데 아이콘은 12 / 16 / **16** 으로 L 에서 커지지 않습니다. */
const SELECTION_AVATAR_SIZE = { s: 12, m: 16, l: 20 } as const;
const SELECTION_ICON_SIZE = { s: 12, m: 16, l: 16 } as const;

export interface ChipProps extends ChipBase {
  children?: React.ReactNode;
  /** **M 과 L 의 좌우 패딩이 12px 로 같습니다.** S 만 8px 로 작습니다.
   *  아바타·아이콘이 붙는 쪽은 Size 마다 다른 값으로 줄어듭니다 (Chip.css 참고) */
  size?: ChipSize;
  /** `outlined` = 흰 배경 + 테두리 · `filled` = 연한 회색 배경 */
  type?: ChipType;
  /** 라벨·아바타·아이콘 조합 (Figma Contents 축). 조합에 따라 좌우 패딩이 비대칭이 됩니다.
   *  아래 `showAvatar` · `showIcon` · `iconPosition` 중 **지정한 것만** 이 값을 덮어씁니다. */
  contents?: ChipContents;
  /** 왼쪽 아바타 표시 여부. 생략하면 `contents` 를 따릅니다 */
  showAvatar?: boolean;
  /** 아이콘 표시 여부. 생략하면 `contents` 를 따릅니다 */
  showIcon?: boolean;
  /** 아이콘 위치. 생략하면 `contents` 를 따릅니다.
   *  ⚠️ 아바타가 켜져 있으면 Figma 에 왼쪽 아이콘 변형이 없어 **항상 오른쪽**이 됩니다 */
  iconPosition?: ChipIconPosition;
  /** Selection 의 아이콘은 **교체 가능한 슬롯**입니다 */
  iconName?: string;
  avatarSrc?: string;
  /** 왼쪽 [Avatar](../Avatar/Avatar.tsx) 에 그대로 넘어갑니다 — `alt` 등(README 규칙 11) */
  avatarProps?: Partial<AvatarProps>;
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
  showAvatar,
  showIcon,
  iconPosition,
  iconName = 'plus',
  avatarSrc,
  avatarProps,
  disabled = false,
  selected = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: ChipProps) {
  // contents 를 기본값으로 두고, 따로 지정한 속성만 덮어씁니다
  const base = fromChipContents(contents);
  const resolved = toChipContents(
    showAvatar ?? base.avatar,
    showIcon ?? base.icon,
    iconPosition ?? base.position,
  );
  const shows = fromChipContents(resolved);

  const avatar = (
    <span className="bd-chip__avatar">
      <Avatar src={avatarSrc} alt="" size={SELECTION_AVATAR_SIZE[size]} {...avatarProps} />
    </span>
  );
  const icon = (
    <span className="bd-chip__icon">
      <Icon name={iconName} category="outlined" size={SELECTION_ICON_SIZE[size]} />
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
      data-contents={resolved}
      data-selected={selected}
      data-force-state={forceState}
      onClick={onClick}
    >
      <Squircle />
      {shows.avatar && avatar}
      {shows.icon && shows.position === 'left' && icon}
      <span>{children}</span>
      {shows.icon && shows.position === 'right' && icon}
    </button>
  );
}

/** Filter 의 Contents 축 ↔ 독립 속성. Selection 과 달리 **아이콘(chevron_down)은 항상 켜져 있고
 *  위치도 항상 오른쪽**이라, 고를 수 있는 것은 아바타와 텍스트 두 가지뿐입니다. */
export function toFilterContents(avatar: boolean, text: boolean): FilterContents {
  if (avatar) return text ? 'avatar-text-icon' : 'avatar-icon';
  return text ? 'text-icon' : 'icon';
}

export function fromFilterContents(contents: FilterContents): { avatar: boolean; text: boolean } {
  return {
    avatar: contents === 'avatar-icon' || contents === 'avatar-text-icon',
    text: contents === 'text-icon' || contents === 'avatar-text-icon',
  };
}

export interface FilterChipProps extends ChipBase {
  children?: React.ReactNode;
  type?: ChipType;
  /** Filter 는 **Size 축이 없습니다**. 아이콘도 `chevron_down` 으로 고정입니다.
   *  아래 `showAvatar` · `showText` 중 **지정한 것만** 이 값을 덮어씁니다. */
  contents?: FilterContents;
  /** 왼쪽 아바타 표시 여부. 생략하면 `contents` 를 따릅니다 */
  showAvatar?: boolean;
  /** 라벨 표시 여부. 생략하면 `contents` 를 따릅니다 */
  showText?: boolean;
  avatarSrc?: string;
  /** 왼쪽 [Avatar](../Avatar/Avatar.tsx) 에 그대로 넘어갑니다 */
  avatarProps?: Partial<AvatarProps>;
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
  showAvatar,
  showText,
  avatarSrc,
  avatarProps,
  disabled = false,
  selected = false,
  onClick,
  forceState,
  className,
  'aria-label': ariaLabel,
}: FilterChipProps) {
  // contents 를 기본값으로 두고, 따로 지정한 속성만 덮어씁니다
  const base = fromFilterContents(contents);
  const resolved = toFilterContents(showAvatar ?? base.avatar, showText ?? base.text);
  const { avatar: showsAvatar, text: showsText } = fromFilterContents(resolved);

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
      data-contents={resolved}
      data-selected={selected}
      data-force-state={forceState}
      onClick={onClick}
    >
      <Squircle />
      {showsAvatar && (
        <span className="bd-chip__avatar">
          <Avatar src={avatarSrc} alt="" size={16} {...avatarProps} />
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
