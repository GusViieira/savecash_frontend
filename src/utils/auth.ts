const ACESS_TOKEN_KEY = 'access_token'

const REFRESH_TOKEN_KEY = 'refresh_token'

function getAccessToken(): string {
  return localStorage.getItem(ACESS_TOKEN_KEY) || ''
}

function setAccessToken(token: string): void {
  localStorage.setItem(ACESS_TOKEN_KEY, token)
}

function getRefreshToken(): string {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || ''
}

function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export { getAccessToken, setAccessToken, getRefreshToken, setRefreshToken }
