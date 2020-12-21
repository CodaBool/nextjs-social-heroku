// import { parseCookies, setCookie } from 'nookies'
import atob from 'atob'

export function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jsonPayload)
}

export function dateParsed(obj) {
  for (let [key, value] of Object.entries(obj)) {
    if (value !== null) {
      if (typeof value === 'object' && typeof value.getMonth === 'function') {
				value = JSON.parse(JSON.stringify(value))
      } else if (typeof value === 'object') {
        value = dateParsed(value)
      }
    }
    obj[key] = value
  }
	return obj
}