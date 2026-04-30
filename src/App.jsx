import { useEffect, useState } from 'react';
import { COPY, SOCIAL } from './content.js';

const LANG_KEY = 'sharapov.biz:lang';

function renderBody(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    return <span key={i}>{p}</span>;
  });
}

export default function App() {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'ru') return q;
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'en' || stored === 'ru') return stored;
    return navigator.language?.startsWith('ru') ? 'ru' : 'en';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const t = COPY[lang];
  const navIds = ['#about', '#services', '#work', '#process', '#contact'];

  return (
    <>
      <div className="container topbar">
        <a className="brand-mark" href="#top"><span className="brand-dot" />sharapov.biz</a>
        <nav className="nav">
          {t.nav.map((n, i) => <a href={navIds[i]} key={i}>{n}</a>)}
        </nav>
        <div className="right">
          <button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}>
            {lang === 'en' ? 'EN / RU' : 'RU / EN'}
          </button>
          <a className="topbar-cta" href="#contact">{lang === 'en' ? 'Write me' : 'Написать'}</a>
        </div>
      </div>

      <section className="container hero" id="top">
        <p className="eyebrow"><span className="pulse" />{t.available}</p>
        <h1 className="display">
          {t.headline_1}<br />
          <span className="accent">{t.headline_accent}</span>
        </h1>
        <p className="lead">{t.lead}</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#contact">{t.cta_primary}</a>
          <a className="btn btn-ghost" href="#work">{t.cta_ghost}</a>
        </div>
        <div className="stats">
          {t.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="num">{s.num}<span className="small">{s.small}</span></div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="clients">
        <div className="container">
          <p className="clients-eyebrow">{t.clientsEyebrow}</p>
          <div className="client-grid">
            {t.clients.map((c, i) => (
              <div className="client" key={i}>
                <div className="client-name">{c.name}</div>
                <div className="client-meta">{c.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <p className="section-eyebrow">{t.aboutEyebrow}</p>
          <h2 className="section-title">{t.aboutTitle}</h2>
          <div className="about-grid">
            <div className="about-photo">
              <div>
                <div className="name">{t.photoName}</div>
                <div className="role">{t.photoRole}</div>
                <div className="badges">
                  {t.photoBadges.map((b, i) => <span className="b" key={i}>{b}</span>)}
                </div>
              </div>
              <div className="since">{t.photoSince}</div>
            </div>
            <div>
              <div className="about-body">
                {t.aboutBody.map((p, i) => <p key={i}>{renderBody(p)}</p>)}
              </div>
              <div className="about-list">
                {t.aboutSpecs.map((s, i) => (
                  <div className="row" key={i}><span className="k">{s.k}</span><span className="v">{s.v}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <p className="section-eyebrow">{t.servicesEyebrow}</p>
          <h2 className="section-title">{t.servicesTitle}</h2>
          <p className="section-lead">{t.servicesLead}</p>
          <div className="services">
            {t.services.map((s, i) => (
              <article className="svc" key={i}>
                <div className="num">{s.num}</div>
                <h3>{s.t}</h3>
                <p className="desc">{s.d}</p>
                <ul>{s.items.map((x, j) => <li key={j}>{x}</li>)}</ul>
                <div className="stack">{s.stack}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="compare">
        <div className="container">
          <p className="section-eyebrow">{t.compareEyebrow}</p>
          <h2 className="section-title">{t.compareTitle}</h2>
          <p className="section-lead">{t.compareLead}</p>
          <div className="compare-card">
            <div className="compare-head">
              <div className="col"><div className="label">—</div><h4>{t.compareCols[0]}</h4></div>
              <div className="col"><div className="label">B</div><h4>{t.compareCols[1]}</h4></div>
              <div className="col brand"><div className="label">A</div><h4>{t.compareCols[2]}</h4></div>
            </div>
            {t.compareRows.map((row, i) => (
              <div className="compare-row" key={i}>
                <div className="col q">{row[0]}</div>
                <div className="col"><span className="mark no">×</span><span>{row[1]}</span></div>
                <div className="col"><span className="mark yes">✓</span><span>{row[2]}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <p className="section-eyebrow">{t.workEyebrow}</p>
          <h2 className="section-title">{t.workTitle}</h2>
          <p className="section-lead">{t.workLead}</p>
          <div className="work-grid">
            {t.work.map((w, i) => (
              <a className="work" href={w.href} target="_blank" rel="noreferrer noopener" key={i}>
                <div className="work-img" style={{ backgroundImage: `url(${w.img})` }} />
                <div className="work-body">
                  <div className="meta"><span>{w.meta_l}</span><span>{w.meta_r}</span></div>
                  <h3>{w.t}</h3>
                  <p className="desc">{w.d}</p>
                  <div className="metrics">
                    {w.m.map((mx, j) => (
                      <div className="m" key={j}>
                        <div className="n">{mx.n}</div>
                        <div className="l">{mx.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="container">
          <p className="section-eyebrow">{t.processEyebrow}</p>
          <h2 className="section-title">{t.processTitle}</h2>
          <p className="section-lead">{t.processLead}</p>
          <div className="process">
            {t.process.map((s, i) => (
              <div className="step" key={i}>
                <div className="n">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
                <div className="dur">{s.dur}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact" style={{ borderTop: 0, paddingTop: 0 }}>
        <div className="container">
          <div className="contact-card">
            <div>
              <h2>{t.contactTitle_1} <span className="accent">{t.contactTitle_2}</span></h2>
              <p className="sub">{t.contactSub}</p>
            </div>
            <div className="actions">
              <a className="btn-on-dark" href={`mailto:${t.contactPrimary}?subject=Project%20inquiry`}>
                <span>{t.contactPrimary}</span><span className="arr">→</span>
              </a>
              {SOCIAL.slice(1).map((s, i) => (
                <a key={i} className="btn-on-dark ghost" href={s.href} target="_blank" rel="noreferrer noopener">
                  <span>{s.k} · {s.v}</span><span className="arr">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="container footer">
        <div>{t.footerLeft}</div>
        <div className="links">
          {SOCIAL.map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer noopener">{s.k}</a>
          ))}
        </div>
      </footer>
    </>
  );
}
