/* =========================================================================
 * UTM 캡처 & Play Store referrer 전달 유틸
 *
 * 배경 (2026-07-29 마케팅/개발 논의):
 *  - 인스타/X 프로필, 메타(인스타·페북) 광고 링크에 UTM을 실어 랜딩페이지로 유입
 *  - 랜딩페이지가 유입 UTM을 그대로 유지 → Play Store URL의 `referrer`로 전달
 *  - Android는 Firebase(Play Install Referrer)가 referrer를 파싱해 설치 출처 확인
 *    (iOS는 referrer 구조가 없어 App Store Connect 캠페인 링크로 별도 확인)
 *
 * 채널별 UTM 예시:
 *  - 인스타 프로필 : utm_source=instagram&utm_medium=social&utm_campaign=profile
 *  - X 프로필      : utm_source=x&utm_medium=social&utm_campaign=profile
 *  - 인스타 광고    : utm_source=instagram&utm_medium=paid_social&utm_campaign=moree_launch
 *  - 페북 광고      : utm_source=facebook&utm_medium=paid_social&utm_campaign=moree_launch
 * ======================================================================= */

export const ANDROID_PACKAGE = 'com.moree.otaku'
export const PLAY_STORE_BASE = 'https://play.google.com/store/apps/details'
export const APP_STORE_URL = 'https://apps.apple.com/kr/app/moree/id6752220897'

// Play Install Referrer로 전달할 UTM 파라미터 화이트리스트
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

// 직접 유입(UTM 없음) 시 랜딩페이지 자체를 출처로 남기기 위한 기본값
const DEFAULT_UTM = { utm_source: 'moree_landing', utm_medium: 'website' }

/**
 * 현재 URL(query string)에서 UTM 파라미터만 추출한다.
 * UTM이 하나도 없으면 랜딩페이지 기본 출처를 반환한다.
 * @param {string} [search] 테스트용 query string 주입 (기본: window.location.search)
 * @returns {Record<string, string>}
 */
export function getUtmParams(search = window.location.search) {
  const params = new URLSearchParams(search)
  const utm = {}
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  return Object.keys(utm).length > 0 ? utm : { ...DEFAULT_UTM }
}

/**
 * UTM 객체를 "utm_source=..&utm_medium=.." 평문 쿼리스트링으로 변환.
 * (Play Store에 넘길 referrer의 원본 값 — 여기서는 인코딩하지 않는다)
 * @param {Record<string, string>} [utm]
 * @returns {string}
 */
export function buildReferrer(utm = getUtmParams()) {
  return new URLSearchParams(utm).toString()
}

/**
 * UTM referrer가 삽입된 Play Store 설치 URL을 만든다.
 * referrer 값은 URLSearchParams가 정확히 1회 인코딩하므로
 * Play Store가 1회 디코딩하면 원본 UTM 쿼리스트링이 복원된다.
 * @param {Record<string, string>} [utm]
 * @returns {string}
 */
export function buildPlayStoreUrl(utm = getUtmParams()) {
  const url = new URL(PLAY_STORE_BASE)
  url.searchParams.set('id', ANDROID_PACKAGE)
  const referrer = buildReferrer(utm)
  if (referrer) url.searchParams.set('referrer', referrer)
  return url.toString()
}
