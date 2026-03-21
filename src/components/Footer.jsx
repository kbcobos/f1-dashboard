import { t } from '../utils/i18n'

export default function Footer({ lang, onTabChange }) {
  return (
    <footer className="max-w-6xl mx-auto px-4 pb-10 pt-2">
      <div style={{ borderTop: '1px solid #2A2A35', paddingTop: 32 }}>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-6">

          <a
            href="https://cafecito.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-body text-sm transition-colors"
            style={{ color: '#aaa' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFDD00'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >
            <span style={{ fontSize: 16 }}>☕</span>
            <span>{t(lang, 'footer_coffee')}</span>
          </a>

          <span style={{ color: '#2A2A35' }}>·</span>

          <a
            href="https://www.paypal.com/paypalme/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-body text-sm transition-colors"
            style={{ color: '#aaa' }}
            onMouseEnter={e => e.currentTarget.style.color = '#009CDE'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >
            <span style={{ fontSize: 15 }}>💙</span>
            <span>PayPal</span>
          </a>

          <span style={{ color: '#2A2A35' }}>·</span>

          <a
            href="https://github.com/kbcobos"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-body text-sm transition-colors"
            style={{ color: '#aaa' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>{t(lang, 'footer_contribute')}</span>
          </a>

          <span style={{ color: '#2A2A35' }}>·</span>

          <button
            onClick={() => onTabChange('help')}
            className="flex items-center gap-1.5 font-body text-sm transition-colors bg-transparent border-none cursor-pointer p-0"
            style={{ color: '#aaa' }}
            onMouseEnter={e => e.currentTarget.style.color = '#E10600'}
            onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          >
            <span style={{ fontSize: 14 }}>❓</span>
            <span>{t(lang, 'footer_help')}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-5">
          <p className="font-body text-xs text-center" style={{ color: '#555' }}>
            {t(lang, 'footer_made')}{' '}
            <a
              href="https://github.com/kbcobos"
              target="_blank"
              rel="noreferrer"
              className="transition-colors"
              style={{ color: '#888' }}
              onMouseEnter={e => e.currentTarget.style.color = '#E10600'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}
            >
              Katherine Cobos
            </a>
            .
          </p>
          <span style={{ color: '#2A2A35' }}>·</span>
          <p className="font-barlow text-xs" style={{ color: '#444' }}>
            {t(lang, 'footer_version')}: 1.0.0
          </p>
        </div>

        <p
          className="font-body text-center mx-auto"
          style={{ color: '#3A3A45', fontSize: '0.68rem', lineHeight: 1.6, maxWidth: 680 }}
        >
          {t(lang, 'footer_disclaimer')}
        </p>
      </div>
    </footer>
  )
}
