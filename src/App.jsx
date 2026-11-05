import samplePhoto from './assets/sample-profile.png'
import sampleCover from './assets/sample-cover.png'
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
  return (
    <main className="profile-page">
      <article className="profile-card" aria-labelledby="profile-name">
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
