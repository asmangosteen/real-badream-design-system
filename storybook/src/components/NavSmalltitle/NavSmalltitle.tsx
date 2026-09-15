import { useState } from 'react';
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
  /**
   * 선택된 세그먼트. **주면 제어 모드**가 되어 이 값이 그대로 표시되므로,
   * 바꾸려면 `onSegmentChange` 를 함께 넘겨야 합니다.
   * 비워 두면 내부 state 로 동작해 그냥 눌러서 전환됩니다.
   */
  segmentValue?: number;
  /** 비제어 모드의 초기 선택값 */
  defaultSegmentValue?: number;
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
  segmentValue,
  defaultSegmentValue = 0,
  onSegmentChange,
  segmentedControlProps,
  className,
}: NavSmalltitleProps) {
  /* Segmented Control 은 완전 제어형이라 value 만 꽂아 두면 눌러도 움직이지 않습니다.
     비제어로 쓸 때는 여기서 상태를 들고 있어야 **단독으로 쓸 때와 똑같이** 동작합니다. */
  const [innerSegment, setInnerSegment] = useState(defaultSegmentValue);
  const isSegmentControlled = segmentValue !== undefined;
  const currentSegment = isSegmentControlled ? segmentValue : innerSegment;
  const handleSegmentChange = (index: number) => {
    if (!isSegmentControlled) setInnerSegment(index);
    onSegmentChange?.(index);
  };

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
          value={currentSegment}
          onChange={handleSegmentChange}
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
