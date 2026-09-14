import { Icon } from '../Icon/Icon';
import { Divider } from '../Divider/Divider';
import './Footer.css';

export interface FooterInfoRow {
  label: string;
  value: string;
}

export interface FooterProps {
  /** `close` 가 기본값입니다. Header 를 누르면 토글됩니다 */
  state?: 'close' | 'open';
  headerLabel?: string;
  /** ⚠️ Figma 의 값은 **예시 데이터**입니다. 실제 사업자 정보로 교체해야 합니다 */
  info?: FooterInfoRow[];
  links?: { label: string; href?: string }[];
  copyright?: string;
  onToggle?: () => void;
  className?: string;
}

const DEFAULT_INFO: FooterInfoRow[] = [
  { label: '대표자', value: '권준일' },
  { label: '사업자등록번호', value: '815-81-03223' },
  { label: '통신판매업신고번호', value: '제 2023-서울마포-3590 호' },
  { label: '주소', value: '서울 광진구 광나루로 478 105호' },
  { label: '운영시간', value: '09:00 - 18:00' },
  { label: '대표번호', value: '010-6243-3223' },
  { label: '고객문의', value: 'contact@ba-dream.com' },
];

const DEFAULT_LINKS = [{ label: '이용약관' }, { label: '개인정보처리방침' }, { label: '사업자정보확인' }];

/**
 * 앱 **홈 화면 최하단 전용** 푸터입니다. **Close / Open 2개 변형**(전수 실측).
 *
 * ⚠️ **다른 화면에 범용으로 재사용하지 않습니다** (사용자 확인, 강한 제약).
 *
 * Header 를 누르면 사업자 정보가 아코디언으로 펼쳐집니다 (212px ↔ 334px).
 * [Divider](/docs/components-divider--docs) 를 **Horizontal·Vertical 양쪽으로 재사용**하는 실사용 예시입니다.
 *
 * 스펙 원본: `components/footer/footer.md`
 */
export function Footer({
  state = 'close',
  headerLabel = 'CYCLOID Corp. 사업자 정보',
  info = DEFAULT_INFO,
  links = DEFAULT_LINKS,
  copyright = 'ⓒ 2026. CYCLOID Corp. All rights reserved.',
  onToggle,
  className,
}: FooterProps) {
  const open = state === 'open';

  return (
    <footer className={['bd-footer', className].filter(Boolean).join(' ')} data-state={state}>
      <div className="bd-footer__main">
        <button type="button" className="bd-footer__header" onClick={onToggle} aria-expanded={open}>
          {headerLabel}
          <Icon name={open ? 'chevron_up' : 'chevron_down'} category="outlined" size={16} />
        </button>

        {open && (
          <dl className="bd-footer__info">
            {info.map((r) => (
              <div key={r.label} className="bd-footer__row">
                <dt>{r.label}</dt>
                <dd>{r.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Main ↔ Sub 구분선 — Divider Horizontal */}
      <Divider color="var(--ref-color-gray-900-10)" />

      <div className="bd-footer__sub">
        <div className="bd-footer__links">
          {links.map((l, i) => (
            <span key={l.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {/* 링크 구분자 — 같은 Divider 를 Vertical 로 재사용 */}
              {i > 0 && (
                <span style={{ display: 'inline-flex', height: 11 }}>
                  <Divider type="vertical" color="var(--sys-color-neutral-400)" />
                </span>
              )}
              <a href={l.href ?? '#'}>{l.label}</a>
            </span>
          ))}
        </div>
        <span className="bd-footer__copyright">{copyright}</span>
      </div>
    </footer>
  );
}
