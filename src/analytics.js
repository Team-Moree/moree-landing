/* =========================================================================
 * Firebase Analytics 래퍼 (env 기반, config 없으면 안전하게 no-op)
 *
 * - Firebase web config는 클라이언트 노출용이라 비밀값이 아니지만,
 *   환경별 분리를 위해 Vite env(VITE_FIREBASE_*)로 주입한다.
 * - measurementId 등 config가 비어 있으면 초기화하지 않고 조용히 무시한다.
 *   (측정 ID 확보 전에도 UTM→referrer 전달 등 나머지 기능은 정상 동작)
 * - 유입 UTM은 user property로 등록해 모든 이벤트에 채널 정보가 따라붙게 한다.
 * ======================================================================= */
import { initializeApp } from 'firebase/app'
import {
  getAnalytics,
  isSupported,
  logEvent as fbLogEvent,
  setUserProperties,
} from 'firebase/analytics'
import { getUtmParams } from './utm'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

// config가 실제로 채워져 있는지 (핵심 키 기준)
const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.measurementId)

let analyticsPromise = null

/**
 * Analytics 인스턴스를 lazy 초기화한다.
 * config 미설정 또는 미지원 환경이면 null을 반환한다.
 * @returns {Promise<import('firebase/analytics').Analytics | null>}
 */
function getAnalyticsInstance() {
  if (!isConfigured) return Promise.resolve(null)
  if (analyticsPromise) return analyticsPromise

  analyticsPromise = isSupported()
    .then((supported) => {
      if (!supported) return null
      const app = initializeApp(firebaseConfig)
      const analytics = getAnalytics(app)
      // 유입 채널(UTM)을 user property로 등록 → 이후 모든 이벤트에 연결
      setUserProperties(analytics, getUtmParams())
      return analytics
    })
    .catch((err) => {
      console.warn('[analytics] 초기화 실패:', err)
      return null
    })

  return analyticsPromise
}

/**
 * 커스텀 이벤트를 기록한다. config 없으면 no-op.
 * @param {string} name 이벤트 이름 (행동 중심 네이밍)
 * @param {Record<string, unknown>} [params]
 */
export function logEvent(name, params = {}) {
  getAnalyticsInstance().then((analytics) => {
    if (analytics) fbLogEvent(analytics, name, params)
  })
}

/**
 * 랜딩페이지 진입 로그. 유입 UTM을 파라미터로 함께 남긴다.
 */
export function logLandingView() {
  logEvent('landing_view', getUtmParams())
}

/**
 * 다운로드 버튼 클릭 로그.
 * @param {'android' | 'ios'} store
 */
export function logDownloadClick(store) {
  logEvent('click_download', { store, ...getUtmParams() })
}
