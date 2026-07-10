function Mascot({ className }) {
  // Moree 두더지 마스코트 (플레이스홀더 일러스트 — 실제 에셋으로 교체 예정)
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="72" rx="34" ry="30" fill="#8a7d74" />
      <ellipse cx="60" cy="78" rx="22" ry="18" fill="#c9bcb2" />
      <circle cx="60" cy="60" r="26" fill="#948880" />
      <ellipse cx="60" cy="70" rx="9" ry="6" fill="#e79aa0" />
      <circle cx="51" cy="56" r="3.4" fill="#2a2320" />
      <circle cx="69" cy="56" r="3.4" fill="#2a2320" />
      <ellipse cx="34" cy="70" rx="7" ry="9" fill="#8a7d74" transform="rotate(-20 34 70)" />
      <ellipse cx="86" cy="70" rx="7" ry="9" fill="#8a7d74" transform="rotate(20 86 70)" />
    </svg>
  )
}

const FEATURES = [
  {
    reverse: false,
    title: '덕질하러 떠나볼까요? 덕질하러 떠나볼까요? 덕질하러 떠나볼까요?',
    desc: '생일카페, 팝업부터 전시, 가짜 소식까지 앱에서 확인해보세요!',
  },
  {
    reverse: true,
    title: '덕질하러 떠나볼까요? 덕질하러 떠나볼까요? 덕질하러 떠나볼까요?',
    desc: '생일카페, 팝업부터 전시, 가짜 소식까지 앱에서 확인해보세요!',
  },
  {
    reverse: false,
    title: '덕질하러 떠나볼까요? 덕질하러 떠나볼까요? 덕질하러 떠나볼까요?',
    desc: '생일카페, 팝업부터 전시, 가짜 소식까지 앱에서 확인해보세요!',
  },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function App() {
  return (
    <>
      <header className="container">
        <nav className="nav">
          <div className="brand">MOREE</div>
          <div className="nav-links">
            <a href="#about">서비스 소개</a>
            <a href="#download">다운로드</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="container hero" id="about">
        <Mascot className="mascot" />
        <h1>
          덕질러를 위한<br />
          맞춤형 지도 탐색, Moree
        </h1>
        <p>Moree에서 손쉬운 행사 덕질을 경험해보세요!</p>
        <button className="btn btn-download">앱 다운로드</button>
      </section>

      {/* Green band */}
      <section className="band">
        <div className="container">
          <div className="section-head">
            <h2>덕질하러 떠나볼까요?</h2>
            <p>생일카페, 팝업부터 전시, 가짜 소식까지 앱에서 확인해보세요!</p>
          </div>
          <div className="hero-box" />
        </div>
      </section>

      {/* Features */}
      <section className="container features">
        <div className="section-head">
          <h2>덕질하러 떠나볼까요?</h2>
          <p>생일카페, 팝업부터 전시, 가짜 소식까지 앱에서 확인해보세요!</p>
        </div>

        {FEATURES.map((f, i) => (
          <div className={`feature-row${f.reverse ? ' reverse' : ''}`} key={i}>
            {f.reverse ? (
              <>
                <div className="feature-box" />
                <div className="feature-text">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </>
            ) : (
              <>
                <div className="feature-text">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
                <div className="feature-box" />
              </>
            )}
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="cta" id="download">
        <div className="container">
          <div className="app-icon">
            <Mascot className="" />
          </div>
          <h2>덕질하러 떠나볼까요?</h2>
          <p>생일카페, 팝업부터 전시, 가짜 소식까지 앱에서 확인해보세요!</p>
          <div className="store-row">
            <button className="store-badge">
              <svg viewBox="0 0 24 24" fill="#fff">
                <path d="M3 2.5v19c0 .4.5.7.8.4L15 12 3.8 2.1c-.3-.3-.8 0-.8.4z" opacity=".9" />
                <path d="M15 12l3.9-3.4-3.1-1.8L15 12zM15 12l.8 5.2 3.1-1.8L15 12z" />
                <path d="M18.9 8.6l2.6 1.5c.7.4.7 1.4 0 1.8l-2.6 1.5L15 12l3.9-3.4z" />
              </svg>
              <span className="txt">
                <small>GET IT ON</small>
                <strong>Google Play</strong>
              </span>
            </button>
            <button className="store-badge">
              <svg viewBox="0 0 24 24" fill="#fff">
                <path d="M16.4 12.6c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6s1.5.6 2.6.6c1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0-.1-2.1-.8-2.1-3.2z" />
                <path d="M14.6 6.6c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.4-1.1z" />
              </svg>
              <span className="txt">
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <div className="row">문의 : moree.otaku@gmail.com</div>
            <div className="links">
              <a href="#">이용약관</a>
              <a href="#">업데이트 소식</a>
            </div>
            <div className="copyright">Copyright © 2026 Team Moree. All rights reserved.</div>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
          </div>
        </div>
      </footer>
    </>
  )
}
