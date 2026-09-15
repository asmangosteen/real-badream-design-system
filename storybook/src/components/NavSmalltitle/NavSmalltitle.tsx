import { Icon } from '../Icon/Icon';
import { SegmentedControl, type SegmentedControlProps } from '../SegmentedControl/SegmentedControl';
import type { NavMode } from '../NavLeading/NavLeading';
import './NavSmalltitle.css';

export type NavSmalltitleType = 'default' | 'selection' | 'segmented-control' | 'caption';

export interface NavSmalltitleProps {
  type?: NavSmalltitleType;
  mode?: NavMode;
  title?: string;
  /** `caption` 타입의 보조 설명. **Mode 와 무관하게 항상 회색**입니다 */
  caption?: string;
  /** `segmented-control` 타입의 항목 (Size=S · Count=2 고정) */
  segments?: [string, string];
  segmentValue?: number;
  onSegmentChange?: (index: number) => void;
  /** 가운데 [Segmented Control](../SegmentedControl/SegmentedControl.tsx) 에 그대로 넘어갑니다 */
  segmentedControlProps?: Partial<SegmentedControlProps>;
  className?: string;
}

/**
 * Navigation Bar Top 의 **중앙 영역**입니다. 폭 **190px 고정**이 전 Type 공통입니다.
 * `components/navigation-bar/top/` 소속 서브 아톰입니다.
 *
 * **Type(4) × Mode(2) = 8개 변형**(완전 직교, 전수 실측).
 * `segmented-control` 타입은 [Segmented Control](/docs/components-segmented-control--docs)(Size=S · Count=2)을 그대로 재사용합니다.
 *
 * 스펙 원본: `components/navigation-bar/top/smalltitle/smalltitle.md`
 */
export function NavSmalltitle({
  type = 'default',
  mode = 'light',
  title = 'Subtitle',
  caption = 'Caption 1',
  segments = ['Tab 1', 'Tab 2'],
  segmentValue = 0,
  onSegmentChange,
  segmentedControlProps,
  className,
}: NavSmalltitleProps) {
  return (
    <div
      className={['bd-nav-smalltitle', className].filter(Boolean).join(' ')}
      data-type={type}
      data-mode={mode}
    >
      {type === 'default' && <span className="bd-nav-smalltitle__title">{title}</span>}

      {type === 'selection' && (
        <>
          <span className="bd-nav-smalltitle__title">{title}</span>
          <Icon name="arrowhead_down" category="outlined" size={20} />
        </>
      )}

      {type === 'segmented-control' && (
        <SegmentedControl
          size="s"
          items={[...segments]}
          value={segmentValue}
          onChange={onSegmentChange}
          {...segmentedControlProps}
        />
      )}

      {type === 'caption' && (
        <>
          <span className="bd-nav-smalltitle__title">{title}</span>
          <span className="bd-nav-smalltitle__caption">{caption}</span>
        </>
      )}
    </div>
  );
}
