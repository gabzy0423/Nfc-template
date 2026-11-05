import { useEffect, useState } from 'react'
import { readTheme, saveTheme } from './theme.js'
import samplePhoto from './assets/sample-profile.webp'
import sampleCover from './assets/sample-cover.webp'
import instagramIcon from './assets/social-icons/instagram.svg'
import facebookIcon from './assets/social-icons/facebook.svg'
import tiktokIcon from './assets/social-icons/tiktok.svg'
import './App.css'

const profile = {
  name: 'Alex Santos',
  photo: samplePhoto,
  cover: sampleCover,
  // shortcut: These demo URLs open platform homepages; replace them with a student's profile URLs before publishing their card.
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/', icon: instagramIcon },
    { name: 'Facebook', url: 'https://www.facebook.com/', icon: facebookIcon },
    { name: 'TikTok', url: 'https://www.tiktok.com/', icon: tiktokIcon },
  ],
}

function App() {
  const [theme, setTheme] = useState(readTheme)
  const isDark = theme === 'dark'

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#171717' : '#ffffff'
    saveTheme(theme)
  }, [theme])

  return (
    <main className="profile-page">
      <article className="profile-card" aria-labelledby="profile-name">
        <button
          className="theme-toggle"
          type="button"
          aria-label="Dark mode"
          aria-pressed={isDark}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {isDark ? (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
              </>
            ) : (
              <path d="M20.5 13a8.5 8.5 0 0 1-9.5-9.5A8.5 8.5 0 1 0 20.5 13Z" />
            )}
          </svg>
        </button>
        <div className="profile-cover">
          <img src={profile.cover} alt="" />
        </div>
        <img className="profile-photo" src={profile.photo} alt={`Portrait of ${profile.name}`} />
        <h1 id="profile-name">{profile.name}</h1>
        <p className="profile-intro">Find me online</p>

        <nav aria-label={`${profile.name}'s social profiles`}>
          <ul className="social-list">
            {profile.socials.map(({ name, url, icon }) => (
              <li key={name}>
                <a className="social-link" href={url} target="_blank" rel="noopener noreferrer">
                  <img className="social-icon" src={icon} alt="" />
                  <span>{name}</span>
                  <svg className="social-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </main>
  )
}

export default App
