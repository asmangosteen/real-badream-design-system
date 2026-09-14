import './StatusBar.css';

export type StatusBarOS = 'ios' | 'android';
export type StatusBarMode = 'light' | 'dark';

/* ⚠️ 아래 아이콘들은 Figma 원본 SVG 에셋이 아니라, 문서에 실측된 치수에 맞춰
   근사 재현한 것입니다. 원본 애셋을 저장소 assets/ 로 추출하면 교체해야 합니다. */

function CellularIOS() {
  return (
    <svg width="19.2" height="12.2" viewBox="0 0 19 12" fill="currentColor" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 5} y={9 - i * 3} width="3" height={3 + i * 3} rx="1" opacity={i === 3 ? 0.4 : 1} />
      ))}
    </svg>
  );
}

function WifiIOS() {
  return (
    <svg width="17.1" height="12.3" viewBox="0 0 17 12" fill="none" aria-hidden="true">
      <path d="M1 4.2a11.6 11.6 0 0 1 15 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 7.3a7.2 7.2 0 0 1 9 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.5" cy="10.4" r="1.5" fill="currentColor" />
    </svg>
  );
}

function BatteryIOS() {
  return (
    <svg width="27.3" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" stroke="currentColor" opacity="0.35" />
      <rect x="2" y="2" width="18" height="9" rx="2.5" fill="currentColor" />
      <path d="M25 4.5v4a2.3 2.3 0 0 0 0-4z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function WifiAndroid() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor" aria-hidden="true">
      <path d="M8.5 14.5 0.8 5.4a12 12 0 0 1 15.4 0z" />
    </svg>
  );
}

function SignalAndroid() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor" aria-hidden="true">
      <path d="M15.5 1.5v14h-14z" />
    </svg>
  );
}

function BatteryAndroid() {
  return (
    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" aria-hidden="true">
      <rect x="2.6" y="0" width="2.8" height="1.6" rx="0.6" fill="currentColor" />
      <rect x="0.5" y="1.6" width="7" height="12.9" rx="1.6" stroke="currentColor" />
      <rect x="1.6" y="4" width="4.8" height="9.4" rx="1" fill="currentColor" />
    </svg>
  );
}

export interface StatusBarProps {
  /** **레이아웃 구조 자체가 다릅니다** — iOS는 3분할 + gap, Android는 양끝 정렬 + margin 오프셋 */
  os?: StatusBarOS;
  /** 시간·아이콘 색을 결정합니다 */
  mode?: StatusBarMode;
  /** `on` 이면 Mode 와 같은 색의 단색 배경이 채워집니다. `off` 는 투명 */
  background?: 'on' | 'off';
  /** 기본값은 각 OS의 공식 목업 표준 시각입니다 (iOS "9:41" / Android "9:30") */
  time?: string;
  className?: string;
}

/**
 * 화면 목업 상단에 얹는 **기기 상태바 목업**입니다. 실제 인터랙션 요소가 아닌 장식용 프레임입니다.
 *
 * 8개 변형 모두 **390×50px 고정**입니다.
 *
 * 스펙 원본: `components/status-bar/status-bar.md`
 */
export function StatusBar({
  os = 'ios',
  mode = 'light',
  background = 'off',
  time,
  className,
}: StatusBarProps) {
  const label = time ?? (os === 'ios' ? '9:41' : '9:30');

  return (
    <div
      className={['bd-status-bar', className].filter(Boolean).join(' ')}
      data-os={os}
      data-mode={mode}
      data-background={background}
      aria-hidden="true"
    >
      <span className="bd-status-bar__time">{label}</span>
      {os === 'ios' && <span className="bd-status-bar__island" />}
      <span className="bd-status-bar__levels">
        {os === 'ios' ? (
          <>
            <CellularIOS />
            <WifiIOS />
            <BatteryIOS />
          </>
        ) : (
          <>
            <WifiAndroid />
            <SignalAndroid />
            <BatteryAndroid />
          </>
        )}
      </span>
    </div>
  );
}
