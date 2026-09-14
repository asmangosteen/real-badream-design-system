import type { ReactNode } from 'react';

/** 변형 하나 + 그 변형의 이름표 */
export function Cell({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="bd-cell">
      <span className="bd-cell__label">{label}</span>
      {children}
    </div>
  );
}

/** 제목이 붙은 변형 묶음 */
export function Section({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="bd-section">
      <h3 className="bd-section__title">{title}</h3>
      {children}
    </div>
  );
}

/** 가로로 늘어놓는 줄 */
export function Row({ children }: { children: ReactNode }) {
  return <div className="bd-row">{children}</div>;
}

/** State(Default/Hover/Pressed/Disabled) 4종을 한 줄로 보여줄 때 쓰는 공통 정의 */
export const INTERACTION_STATES = [
  { key: 'default', label: 'Default', forceState: undefined, disabled: false },
  { key: 'hover', label: 'Hover', forceState: 'hover' as const, disabled: false },
  { key: 'pressed', label: 'Pressed', forceState: 'pressed' as const, disabled: false },
  { key: 'disabled', label: 'Disabled', forceState: undefined, disabled: true },
] as const;
