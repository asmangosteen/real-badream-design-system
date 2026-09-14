import './TabItem.css';

export type TabItemSize = 's' | 'l';

export interface TabItemProps {
  children: React.ReactNode;
  /** S = Body2 14 · L = Body1 16. **둘 다 SemiBold 고정**입니다 */
  size?: TabItemSize;
  /** 활성 여부. 밑줄이 생기고 글자가 진해집니다 */
  active?: boolean;
  /**
   * 강조(경고/오류성) 탭. 글자와 밑줄이 빨강이 됩니다.
   * ⚠️ Figma 에 **`disabled` 와 동시에 쓰는 조합은 없습니다.**
   */
  emphasize?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Tab 을 구성하는 탭 하나입니다. `components/global/` 소속 서브 아톰입니다.
 *
 * **Size(2) × Active(2) × [Disabled/Emphasize 3조합] = 12개 변형**(전수 실측).
 * `Disabled=True` + `Emphasize=On` 조합은 **Figma 에 존재하지 않습니다.**
 *
 * 스펙 원본: `components/global/tab-item/tab-item.md`
 */
export function TabItem({
  children,
  size = 's',
  active = false,
  emphasize = false,
  disabled = false,
  onClick,
  className,
}: TabItemProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      disabled={disabled}
      className={['bd-tab-item', className].filter(Boolean).join(' ')}
      data-size={size}
      data-active={active}
      data-emphasize={emphasize && !disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
