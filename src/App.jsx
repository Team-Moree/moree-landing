import { useEffect, useMemo, useState } from 'react'
import { buildPlayStoreUrl, APP_STORE_URL } from './utm'
import { logLandingView, logDownloadClick } from './analytics'

/* =========================================================================
 * 이미지 슬롯 컴포넌트
 * public/assets/<파일명> 에 실제 이미지를 넣으면 자동으로 교체됩니다.
 * 이미지가 없으면 파일명이 적힌 플레이스홀더가 표시됩니다.
 * ======================================================================= */
function Img({ src, alt, className = '', style }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div className={`img-ph ${className}`} style={style}>
        <span>{src ? src.replace('/assets/', '') : alt}</span>
      </div>
    )
  }
  return (
    <img src={src} alt={alt} className={className} style={style} onError={() => setFailed(true)} />
  )
}

const PAINS = [
  { text: '어디서 정보를 찾는지 모르겠어요.', pos: 'left' },
  { text: '소규모 행사는 X 포스팅을 수시로 확인해야 해서 번거로워요.', pos: 'right' },
  { text: '개인 생카를 열었는데 홍보할 곳이 없어요.', pos: 'left' },
]

const FEATURES = [
  {
    reverse: false,
    badge: null,
    title: '내 취향에 맞는 행사 추천',
    desc: '관심 카테고리와 덕질 대상을 등록하면\n취향에 부합하는 행사만 모아서 큐레이팅 해드려요.',
    img: '/assets/phone-recommend.png',
  },
  {
    reverse: true,
    badge: null,
    title: '지도에서 한눈에 행사 찾기',
    desc: '팝업스토어, 생일카페, 전시, 이벤트까지\n내 주변 행사를 지도에서 확인하세요.',
    img: '/assets/phone-map.png',
  },
  {
    reverse: false,
    badge: '준비 중!',
    title: '행사 등록도 간편하게',
    desc: '누구나 쉽게 행사를 등록하고\n더 많은 팬들에게 홍보할 수 있어요.',
    img: '/assets/phone-register.png',
  },
  {
    reverse: true,
    badge: '준비 중!',
    title: '나만의 덕질 활동 기록',
    desc: '가고 싶은 행사를 저장하고,\n방문한 행사에 발도장을 남겨보세요.',
    img: '/assets/phone-bookmark.png',
  },
  {
    reverse: false,
    badge: null,
    title: '몰리로 채우는 덕질 도감',
    desc: '덕질 스팟에서 아이템을 획득해\n도감을 채워보세요.',
    img: '/assets/dogam.png',
  },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 3h3l-6.6 7.6L21.8 21h-6l-4.3-5.6L6.4 21H3.4l7.1-8.1L2.6 3h6.1l3.9 5.2L17.5 3zm-1.1 16h1.7L7.7 4.7H5.9L16.4 19z" />
    </svg>
  )
}

function GooglePlayBadge({ href, onClick }) {
  return (
    <a className="store-badge" href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} aria-label="Google Play에서 다운로드">
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path d="M3.6 2.3c-.2.2-.3.5-.3.9v17.6c0 .4.1.7.3.9l.1.1L13 12.1v-.2L3.7 2.2l-.1.1z" fill="#00d0ff" />
        <path d="M16.3 15.3 13 12.1v-.2l3.3-3.2.1.1 3.9 2.2c1.1.6 1.1 1.6 0 2.3l-3.9 2.2-.1-.2z" fill="#ffce00" />
        <path d="M16.4 15.2 13 12 3.6 21.7c.4.4 1 .4 1.7.1l11.1-6.6" fill="#ff3a44" />
        <path d="M16.4 8.8 5.3 2.2c-.7-.4-1.3-.3-1.7.1L13 12l3.4-3.2z" fill="#00e676" />
      </svg>
      <span className="txt">
        <small>GET IT ON</small>
        <strong>Google Play</strong>
      </span>
    </a>
  )
}

function AppStoreBadge({ onClick }) {
  return (
    <a className="store-badge" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={onClick} aria-label="App Store에서 다운로드">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff" aria-hidden="true">
        <path d="M16.4 12.6c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2 2.5 2 1 0 1.4-.6 2.6-.6s1.5.6 2.6.6c1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3 0-.1-2.1-.8-2.1-3.2z" />
        <path d="M14.6 6.6c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.4-1.1z" />
      </svg>
      <span className="txt">
        <small>Download on the</small>
        <strong>App Store</strong>
      </span>
    </a>
  )
}

export default function App() {
  // 유입 UTM을 referrer로 실은 Play Store URL (마운트 시 1회 계산)
  const playStoreUrl = useMemo(() => buildPlayStoreUrl(), [])

  // 랜딩페이지 진입 로그 (config 없으면 no-op)
  useEffect(() => {
    logLandingView()
  }, [])

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className="site-header">
        <div className="container nav">
          <a href="#" className="brand" aria-label="Moree 홈">
            <Img src="/assets/logo.png" alt="MOREE" className="brand-logo" />
          </a>
          <nav className="nav-links">
            <a href="#about">서비스 소개</a>
            <a href="#download">다운로드</a>
          </nav>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero container" id="about">
        <Img src="/assets/hero-phones.png" alt="Moree 앱 화면" className="hero-phones-img" />
        <h1>
          팝업부터 콜라보 카페까지<br />
          팬덤 행사를 한 곳에서
        </h1>
        <p className="hero-sub">흩어진 팬덤 경험을 하나의 지도 위에, Moree</p>
        <a href="#download" className="btn btn-primary">앱 다운로드</a>
      </section>

      {/* ---------- Pain points ---------- */}
      <section className="pain container">
        <div className="section-head">
          <h2>혹시.. 아직도 <span className="hl-dark">SNS</span>만 뒤지고 계신가요?</h2>
          <p>팬덤 행사는 여기저기 흩어져 있어서 찾는 것도, 관리하는 것도 번거로워요.</p>
        </div>
        <div className="bubbles">
          <Img src="/assets/mascot-surprised.png" alt="놀란 몰리" className="pain-mole" />
          {PAINS.map((p, i) => (
            <div className={`bubble bubble-${p.pos}`} key={i}>{p.text}</div>
          ))}
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="stats-band">
        <div className="container">
          <div className="section-head">
            <h2>팬들이 먼저 알아본 서비스</h2>
            <p>이미 많은 팬들과 주최자가 Moree의 출시를 기다리고 있어요.</p>
          </div>
          <div className="stats-card">
            <div className="stat">
              <div className="stat-num">5,800+</div>
              <div className="stat-label">SNS 누적 팔로워</div>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <div className="stat-num">92%</div>
              <div className="stat-label">서비스에 대한 타겟의 필요성</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Solution ---------- */}
      <section className="solution container">
        <div className="section-head">
          <h2>이제 <span className="hl-green">Moree</span> 하나면 충분해요!</h2>
          <p>
            모리는 흩어진 팬덤 행사 정보를 한곳에 모아,<br />
            팬은 더 쉽게 찾고 주최자는 더 널리 알릴 수 있도록 돕는 플랫폼이에요.
          </p>
        </div>
        <div className="solution-grid">
          <Img src="/assets/solution-tags.png" alt="Moree가 모으는 팬덤 카테고리" className="sol-img" />
          <Img src="/assets/phone-map-green.png" alt="Moree 지도 화면" className="sol-img" />
        </div>
      </section>

      {/* ---------- Green band ---------- */}
      <section className="green-band">
        <div className="container">
          <Img src="/assets/mascot-mound.png" alt="흙에서 나오는 몰리" className="band-mole" />
          <h2>
            서브컬처를 <span className="hl-green">더 쉽고 재밌게!</span><br />
            Moree와 함께 덕질하러 떠나볼까요?
          </h2>
          <p>생일카페, 팝업부터 전시, 가챠 소식까지 앱에서 확인해보세요!</p>
        </div>
      </section>

      {/* ---------- Feature rows ---------- */}
      <section className="features container">
        {FEATURES.map((f, i) => (
          <div className={`feature-row${f.reverse ? ' reverse' : ''}`} key={i}>
            <div className="feature-text">
              {f.badge && <span className="badge">{f.badge}</span>}
              <h3>{f.title}</h3>
              <p>{f.desc.split('\n').map((line, j) => (
                <span key={j}>{line}<br /></span>
              ))}</p>
            </div>
            <div className="feature-media">
              <Img src={f.img} alt={f.title} className="feature-img" />
            </div>
          </div>
        ))}
      </section>

      {/* ---------- CTA ---------- */}
      <section className="cta" id="download">
        <div className="container">
          <div className="app-icon">
            <Img src="/assets/app-icon.png" alt="Moree 앱 아이콘" className="app-icon-img" />
          </div>
          <h2>Moree와 함께 덕질하러 떠나볼까요?</h2>
          <p>생일카페, 팝업부터 전시, 가챠 소식까지 앱에서 확인해요!</p>
          <div className="store-row">
            <GooglePlayBadge href={playStoreUrl} onClick={() => logDownloadClick('android')} />
            <AppStoreBadge onClick={() => logDownloadClick('ios')} />
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <div className="row">✉️ 문의 : <a href="mailto:moree.otaku@gmail.com">moree.otaku@gmail.com</a></div>
            <div className="links">
              <a href="#">이용약관</a>
              <a href="#">업데이트 소식</a>
            </div>
            <div className="copyright">Copyright © 2026 Team Moree. All rights reserved.</div>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="X"><XIcon /></a>
          </div>
        </div>
      </footer>
    </>
  )
}
