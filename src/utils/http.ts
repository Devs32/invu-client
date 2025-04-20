type RequestType = {
  method?: RequestInit['method'];
  body?: Record<string, unknown> | RequestInit['body'];
  headers?: HeadersInit;
  cache?: RequestCache;
  signal?: AbortSignal;
  next?: { revalidate?: number };
}

/**
 * HTTP 요청 실패 시 발생하는 커스텀 에러 클래스
 *
 * @extends Error
 *
 * @property {string} method - HTTP 요청 메서드 (GET, POST 등)
 * @property {string} url - 요청한 URL
 * @property {number} status - HTTP 상태 코드
 * @property {string} statusText - HTTP 상태 텍스트
 *
 * @description
 * 이 클래스는 HTTP 요청이 실패했을 때 상세한 정보를 포함한 에러를 생성합니다.
 * 기본 Error 클래스를 확장하여 추가적인 컨텍스트 정보를 제공합니다.
 *
 * @example
 * try {
 *   // HTTP 요청 수행
 * } catch (error) {
 *   if (error instanceof RequestError) {
 *     console.error(`요청 실패: ${error.method} ${error.url}`);
 *     console.error(`상태: ${error.status} (${error.statusText})`);
 *   }
 * }
 */
class RequestError extends Error {
  constructor(
    public method: string,
    public url: string,
    public status: number,
    public statusText: string
  ) {
    super(`${ method.toUpperCase() } ${ url } ${ status } (${ statusText })`);
    this.name = 'RequestError';
  }
}

const REQUEST_TIMEOUT_MILLIS = 15 * 60 * 1000; // 비동기함수 타임아웃 15분

/**
 * 현재 환경이 서버인지 확인하는 함수
 *
 * @returns {boolean} 서버 환경이면 true, 클라이언트(브라우저) 환경이면 false를 반환
 *
 * @description
 * 이 함수는 'window' 객체의 존재 여부를 확인하여 현재 실행 환경을 판단합니다.
 * 'window' 객체가 정의되지 않았다면 (undefined) 서버 환경으로 간주합니다.
 * 주로 서버 사이드 렌더링(SSR)과 클라이언트 사이드 렌더링(CSR)을 구분할 때 사용됩니다.
 *
 * @example
 * if (checkServer()) {
 *   console.log('This code is running on the server');
 * } else {
 *   console.log('This code is running in the browser');
 * }
 */
const checkServer = () => {
  return typeof window === 'undefined';
};

/**
 * 두 개의 헤더 객체를 병합하는 함수
 *
 * @param {HeadersInit} existingHeaders - 기존 헤더 객체. 기본값은 빈 객체 {}.
 * @param {HeadersInit} newHeaders - 새로운 헤더 객체. 기본값은 빈 객체 {}.
 * @returns {HeadersInit} 병합된 새로운 헤더 객체
 *
 * @description
 * 이 함수는 두 개의 헤더 객체를 받아 하나로 병합합니다.
 * 스프레드 연산자(...)를 사용하여 얕은 복사를 수행합니다.
 * 동일한 키가 있는 경우, newHeaders의 값이 existingHeaders의 값을 덮어씁니다.
 *
 * @example
 * const existing = { 'Content-Type': 'application/json' };
 * const newHeaders = { 'Authorization': 'Bearer token' };
 * const merged = mergeHeaders(existing, newHeaders);
 * // 결과: { 'Content-Type': 'application/json', 'Authorization': 'Bearer token' }
 */
const mergeHeaders = (existingHeaders: HeadersInit = {}, newHeaders: HeadersInit = {}): HeadersInit => ({
  ...existingHeaders,
  ...newHeaders
});

/**
 * 서버 사이드에서 사용할 요청 옵션을 생성하는 비동기 함수
 *
 * @param {RequestInit} options - 기존 요청 옵션
 * @returns {Promise<RequestInit>} 쿠키 정보가 추가된 새로운 요청 옵션
 *
 * @description
 * 이 함수는 Next.js의 서버 컴포넌트에서 사용하기 위한 것입니다.
 * 기존 요청 옵션에 현재 요청의 쿠키 정보를 추가합니다.
 * next/headers에서 cookies를 동적으로 임포트하여 사용합니다.
 *
 * @example
 * const options = { method: 'GET' };
 * const serverOptions = await getServerOptions(options);
 * // 결과: { method: 'GET', headers: { Cookie: '쿠키_문자열' } }
 *
 * @throws {Error} next/headers 모듈 임포트 실패 시 에러가 발생할 수 있습니다.
 */
const getServerOptions = async (options: RequestInit): Promise<RequestInit> => {
  const { cookies } = await import('next/headers');
  const cookieValue = await cookies();

  return {
    ...options,
    headers: mergeHeaders(options.headers, { Cookie: cookieValue.toString() })
  };
};

/**
 * 클라이언트 사이드에서 사용할 요청 옵션을 생성하는 함수
 *
 * @param {RequestInit} options - 기존 요청 옵션
 * @returns {RequestInit} credentials 옵션이 추가된 새로운 요청 옵션
 *
 * @description
 * 이 함수는 클라이언트 사이드에서 API 요청을 보낼 때 사용할 옵션을 생성합니다.
 * 기존 옵션에 'credentials: "include"'를 추가하여 쿠키와 같은 인증 정보를
 * 크로스 오리진 요청에도 포함시킬 수 있게 합니다.
 *
 * @example
 * const options = { method: 'POST', body: JSON.stringify(data) };
 * const clientOptions = getClientOptions(options);
 * // 결과: { method: 'POST', body: JSON.stringify(data), credentials: 'include' }
 *
 * @note
 * 'credentials: "include"' 옵션은 CORS(Cross-Origin Resource Sharing) 설정이
 * 적절히 되어 있는 서버에 대해서만 작동합니다.
 */
const getClientOptions = (options: RequestInit): RequestInit => ({
  ...options,
  credentials: 'include'
});

/**
 * 범용적인 HTTP 요청 함수
 *
 * @param {string} url - 요청을 보낼 URL
 * @param {RequestType} options - 요청 옵션 (선택적, 기본값은 빈 객체)
 * @returns {Promise<Response>} 서버 응답을 담은 Promise 객체
 *
 * @description
 * 이 함수는 서버와 클라이언트 환경 모두에서 사용할 수 있는 범용적인 HTTP 요청 함수입니다.
 * GET, POST 등 다양한 HTTP 메서드를 지원하며, 요청 옵션을 유연하게 설정할 수 있습니다.
 *
 * 주요 기능:
 * - 자동으로 Content-Type 헤더를 설정 (기본값: 'application/json')
 * - GET 요청 시 body 객체를 URL 파라미터로 변환
 * - 서버/클라이언트 환경에 따라 적절한 옵션 적용 (쿠키 처리 등)
 * - 요청 타임아웃 설정 (기본값: REQUEST_TIMEOUT_MILLIS)
 * - 상대 URL을 절대 URL로 변환 (process.env.BASE_URL 사용)
 *
 * @example
 * // GET 요청
 * const response = await request('/api/users');
 * 
 * // POST 요청
 * const response = await request('/api/users', {
 *   method: 'POST',
 *   body: { name: 'John Doe', age: 30 }
 * });
 *
 * @throws {RequestError} 요청이 실패하면 RequestError를 throw합니다.
 */
export const request = async (url: string, options: RequestType = {}): Promise<Response> => {
  const {
    method = 'GET',
    body,
    headers = {},
    signal = AbortSignal.timeout(REQUEST_TIMEOUT_MILLIS),
    next
  } = options;

  let finalOptions: RequestInit = {
    ...options,
    method: method.toUpperCase(),
    headers: {
      ...headers,
      'Content-Type': headers && 'Content-Type' in headers ? headers['Content-Type'] : 'application/json'
    },
    signal
  } as RequestInit;

  if (next) {
    finalOptions.next = next;
  }

  const baseUrl = checkServer()
    ? process.env.SERVER_API_BASE_URL
    : process.env.CLIENT_API_BASE_URL;

  let fullUrl = /^https?:/.test(url) ? url : `${ baseUrl }${ url }`;

  if (method === 'GET' && body && typeof body === 'object') {
    const params = new URLSearchParams();
    Object.entries(body).forEach(([ key, value ]) => {
      params.append(key, String(value));
    });
    fullUrl += `?${ params.toString() }`;
    delete finalOptions.body;
  } else if (body && typeof body === 'object' && !('append' in body) && !('arrayBuffer' in body)) {
    finalOptions.body = JSON.stringify(body);
  } else if (body) {
    finalOptions.body = body as BodyInit;
  }

  finalOptions = checkServer() ? await getServerOptions(finalOptions) : getClientOptions(finalOptions);

  console.log('fullUrl', fullUrl);
  const res = await fetch(fullUrl, { ...finalOptions });

  if (!res.ok) {
    console.info('fetch error', res);
    throw new RequestError(method, fullUrl, res.status, res.statusText);
  }

  return res;
};

