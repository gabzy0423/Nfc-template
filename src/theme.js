export function readTheme() {
  try {
    return localStorage.getItem('profile-theme') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem('profile-theme', theme)
  } catch {
    // The toggle still works for this visit when browser storage is blocked.
  }
}
