import './SegmentedControlItem.css';

export type SegItemSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface SegmentedControlItemProps {
  children: React.ReactNode;
  /** 패딩·타이포·radius 스케일. **M 부터 weight 가 SemiBold → Medium 으로 바뀝니다** */
  size?: SegItemSize;
  /** 활성 여부. 배경·그림자·글자색 **3가지만** 바뀝니다 */
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Segmented Control 의 세그먼트 하나입니다. `components/global/` 소속 서브 아톰입니다.
 *
 * **Size(5) × Selected(2) = 10개 변형**(전수 실측).
 * Hover/Pressed/Disabled 축이 **Figma 에 없습니다.**
 *
 * 스펙 원본: `components/global/segmented-control-item/segmented-control-item.md`
 */
export function SegmentedControlItem({
  children,
  size = 'm',
  selected = false,
  onClick,
  className,
}: SegmentedControlItemProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={['bd-seg-item', className].filter(Boolean).join(' ')}
      data-size={size}
      data-selected={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
