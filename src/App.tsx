import { useState } from 'react'
import ProjectHero from './components/ProjectHero'
import Logo from './components/Logo'
import SiteHeader from './components/SiteHeader'
import { projects } from './data/projects'

const categories = ['All', 'Games', 'XR', 'Apps', 'Experiments']

function App() {
  const [filter, setFilter] = useState('All')
  const visibleProjects = projects.filter((project) => filter === 'All' || project.category === filter)

  return (
    <>
      <SiteHeader />

      <main>
        <ProjectHero />

        <section className="about-strip" id="about">
          <div className="section-kicker">A little about us <span>— 00</span></div>
          <div className="about-strip-content">
            <h2>Curiosity is where<br />creation begins.</h2>
            <div>
              <p>UNION STUDIO explores interactive experiences across games, XR, applications, and creative technology.</p>
              <a className="text-link dark-link" href="#about-details">Discover the studio <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="section works-section" id="works">
          <div className="section-heading">
            <div><p className="eyebrow">01 / Selected works</p><h2>Ideas made<br />tangible.</h2></div>
            <p className="section-aside">A collection of things we've built, explored, and experimented with.</p>
          </div>
          <div className="filters" aria-label="Filter projects">
            {categories.map((category) => <button key={category} className={filter === category ? 'filter active' : 'filter'} onClick={() => setFilter(category)}>{category}</button>)}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <a href="#contact" className={`project-art ${project.artwork}`} aria-label={`View ${project.title}`}>
                  <span className="project-index">0{index + 1}</span><span className="project-arrow">↗</span>
                  <span className="art-caption">UNION STUDIO / SELECTED WORK</span>
                </a>
                <div className="project-meta"><div><h3>{project.title}</h3><p>{project.category} · {project.status}</p></div><span>↗</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="playground-section" id="playground">
          <div className="section playground-layout">
            <div><p className="eyebrow">02 / Interactive playground</p><h2>Don't just look.<br /><em>Try it.</em></h2><p className="playground-copy">A space to experience selected interactive works. Demos will be added as projects are prepared for the web.</p></div>
            <div className="playground-card">
              <div className="demo-label">INTERACTIVE PREVIEW / 001</div>
              <div className="demo-stage"><button className="demo-object" aria-label="Move the interactive object" onClick={(event) => event.currentTarget.classList.toggle('moved')}><span /></button><div className="demo-hint">CLICK THE OBJECT TO INTERACT</div></div>
              <div className="demo-footer"><div><h3>A tiny interaction</h3><p>Small browser-based experiment</p></div><span>LIVE PREVIEW</span></div>
            </div>
          </div>
        </section>

        <section className="capabilities-section">
          <div className="section capabilities-layout">
            <div><p className="eyebrow">03 / Capabilities</p><h2>Technology meets<br />imagination.</h2><p className="capabilities-copy">Exploring different ways to turn ideas into interactive digital experiences.</p></div>
            <div className="capability-list">
              {['Game Development', 'XR & Spatial Experiences', 'Interactive Applications', 'Creative Technology'].map((item, index) => <div className="capability-row" key={item}><span>0{index + 1}</span><strong>{item}</strong><span>↗</span></div>)}
            </div>
          </div>
        </section>

        <section className="about-details-band" id="about-details"><div className="about-details section">
          <div><p className="eyebrow">04 / The studio</p><h2>Built around<br />curiosity.</h2></div>
          <div><p className="about-statement">We believe technology becomes more meaningful when people can experience it, interact with it, and make it their own.</p><p className="about-body">UNION STUDIO is a creative technology studio focused on interactive digital experiences. Explore our approach, background, and the wider UNION network.</p><a className="text-link dark-link" href="#contact">More about UNION STUDIO ↗</a></div>
        </div></section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">05 / Start a conversation</p><h2>Have an idea?<br />Let's make it <em>real.</em></h2><p>Have a project, collaboration, or something interesting in mind?</p><a className="button button-light" href="mailto:hello@unionstudio.example">Get in touch ↗</a>
          <small>Replace the placeholder email before publishing.</small>
        </section>
      </main>

      <footer className="site-footer" id="network">
        <div><a className="wordmark" href="#top" aria-label="UNION STUDIO — back to top"><Logo /></a><p>Part of UNION INTERACTIVE</p></div>
        <div className="footer-links"><a href="#works">Works</a><a href="#playground">Playground</a><a href="#about">About</a><a href="#contact">Contact</a></div>
        <p className="copyright">© {new Date().getFullYear()} UNION STUDIO · CONCEPT BUILD</p>
      </footer>
    </>
  )
}

export default App