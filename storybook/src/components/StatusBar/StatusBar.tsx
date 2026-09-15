import './StatusBar.css';

/* 2026-09-15 — 디자이너가 Figma 에서 상태바 요소를 전부 **오브젝트(벡터)** 로 만들어 줘서,
   예전의 "실측 치수에 맞춰 근사 재현한 SVG" 를 **Figma 원본 벡터**로 교체했습니다.
   시각(Time)도 라이브 텍스트가 아니라 윤곽선 벡터입니다 — 저장소에 SF Pro·Roboto 가 없어
   폰트로는 절대 똑같이 나오지 않던 부분이 이걸로 해소됩니다.
   에셋: `assets/status-bar/` (Figma `2551:9511` 에서 그대로 내보냄, `fill="currentColor"`) */
import iosTime from '../../../../assets/status-bar/ios-time-941.svg?raw';
import iosCellular from '../../../../assets/status-bar/ios-cellular.svg?raw';
import iosWifi from '../../../../assets/status-bar/ios-wifi.svg?raw';
import iosBattery from '../../../../assets/status-bar/ios-battery.svg?raw';
import androidTime from '../../../../assets/status-bar/android-time-930.svg?raw';
import androidWifi from '../../../../assets/status-bar/android-wifi.svg?raw';
import androidSignal from '../../../../assets/status-bar/android-signal.svg?raw';
import androidBattery from '../../../../assets/status-bar/android-battery.svg?raw';

export type StatusBarOS = 'ios' | 'android';
export type StatusBarMode = 'light' | 'dark';

/** Figma 실측 치수 그대로 놓습니다(소수점 포함) */
function Glyph({ svg, w, h, className }: { svg: string; w: number; h: number; className?: string }) {
  return (
    <span
      className={['bd-status-bar__glyph', className].filter(Boolean).join(' ')}
      style={{ width: w, height: h }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export interface StatusBarProps {
  /** **레이아웃 구조 자체가 다릅니다** — iOS는 3분할 + gap, Android는 양끝 정렬 */
  os?: StatusBarOS;
  /** 시각·아이콘 색을 결정합니다 */
  mode?: StatusBarMode;
  /** `on` 이면 Mode 와 같은 색의 단색 배경이 채워집니다. `off` 는 투명 */
  background?: 'on' | 'off';
  /**
   * 시각을 다른 값으로 바꿉니다.
   *
   * ⚠️ **비워 두면 Figma 원본 벡터**(iOS `9:41` / Android `9:30`)를 그대로 그립니다 — 이게 정확한 모습입니다.
   * 값을 주면 텍스트로 그리는데, 저장소에 **SF Pro·Roboto 가 없어** 시스템 폰트로 대체되므로
   * 글자 모양이 Figma 와 달라집니다.
   */
  time?: string;
  className?: string;
}

/**
 * 화면 목업 상단에 얹는 **기기 상태바 목업**입니다. 실제 인터랙션 요소가 아닌 장식용 프레임입니다.
 *
 * 높이 **50px 고정**, 폭은 화면(부모) 폭을 따릅니다(390px 은 Figma 기준 폭).
 *
 * 아이콘과 시각은 전부 **Figma 원본 벡터**입니다(`assets/status-bar/`).
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
  const timeNode = time ? (
    <span className="bd-status-bar__time-text">{time}</span>
  ) : os === 'ios' ? (
    <Glyph svg={iosTime} w={33.33} h={12.58} />
  ) : (
    <Glyph svg={androidTime} w={26.9} h={10.23} />
  );

  return (
    <div
      className={['bd-status-bar', className].filter(Boolean).join(' ')}
      data-os={os}
      data-mode={mode}
      data-background={background}
      aria-hidden="true"
    >
      <span className="bd-status-bar__time">{timeNode}</span>

      {os === 'ios' ? (
        <>
          {/* Dynamic Island 가 차지하는 자리 — Figma 에서도 채우기가 꺼진 빈 프레임입니다 */}
          <span className="bd-status-bar__island" />
          <span className="bd-status-bar__levels">
            <Glyph svg={iosCellular} w={19.2} h={12.23} />
            <Glyph svg={iosWifi} w={17.14} h={12.33} />
            <Glyph svg={iosBattery} w={27.33} h={13} />
          </span>
        </>
      ) : (
        /* Android 는 auto-layout 이 아니라 46×15 그룹 안에 세 아이콘이 고정 좌표로 놓입니다 */
        <span className="bd-status-bar__levels">
          <Glyph className="bd-status-bar__wifi" svg={androidWifi} w={17} h={14.17} />
          <Glyph className="bd-status-bar__signal" svg={androidSignal} w={14.17} h={14.17} />
          <Glyph className="bd-status-bar__battery" svg={androidBattery} w={8} h={15} />
        </span>
      )}
    </div>
  );
}
