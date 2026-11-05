import samplePhoto from './assets/sample-profile.png'
import './App.css'

const profile = {
  name: 'Alex Santos',
  photo: samplePhoto,
  // shortcut: These demo URLs open platform homepages; replace them with a student's profile URLs before publishing their card.
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/' },
    { name: 'Facebook', url: 'https://www.facebook.com/' },
    { name: 'TikTok', url: 'https://www.tiktok.com/' },
  ],
}

function App() {
  return (
    <main className="profile-page">
      <article className="profile-card" aria-labelledby="profile-name">
        <p className="profile-label">STUDENT PROFILE</p>

        <img className="profile-photo" src={profile.photo} alt={`Portrait of ${profile.name}`} />
        <h1 id="profile-name">{profile.name}</h1>
        <p className="profile-intro">Find me online</p>

        <nav aria-label={`${profile.name}'s social profiles`}>
          <ul className="social-list">
            {profile.socials.map(({ name, url }, index) => (
              <li key={name}>
                <a className="social-link" href={url} target="_blank" rel="noopener noreferrer">
                  <span className="social-number" aria-hidden="true">0{index + 1}</span>
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
