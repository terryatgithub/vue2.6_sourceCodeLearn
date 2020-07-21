import Cookies from 'js-cookie'

export function setCookie(key, value) {
    Cookies.set(key, value)
}
export function getCookie(key) {
    Cookies.get(key)
}
export function removeCookie(key) {
    Cookies.remove(key)
}