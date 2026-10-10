import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  profile,
  nav,
  roles,
  skills,
  projects,
  experience,
  education,
  achievements,
} from './data'

gsap.registerPlugin(ScrollTrigger)

const wrap = 'mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-14'

function SectionHead({ label, title }) {
  return (
    <div className="mb-10 sm:mb-14" data-reveal>
      <span className="label">{label}</span>
      <h2 className="mt-3 text-[clamp(32px,5vw,60px)] font-semibold leading-[1.05] tracking-tight">
        {title}
      </h2>
    </div>
  )
}

/* ---------------------------------- Header --------------------------------- */
function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach((n) => {
      const el = document.getElementById(n.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-sm">
      <div className={`${wrap} flex h-[68px] items-center justify-between`}>
        <a href="#home" className="text-base font-semibold tracking-tight">
          {profile.name}
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-line2 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {open ? '✕' : '☰'}
          </span>
        </button>

        <nav
          id="site-nav"
          aria-label="Primary"
          className={`${
            open ? 'visible translate-y-0' : 'invisible -translate-y-[130%]'
          } fixed inset-x-0 top-[68px] flex flex-col items-start gap-5 border-b border-line bg-ink px-5 pb-8 pt-6 transition-transform duration-300 sm:px-8 lg:visible lg:static lg:translate-y-0 lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              aria-current={active === n.id ? 'true' : undefined}
              className={`font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-white ${
                active === n.id ? 'text-white' : 'text-muted'
              }`}
            >
              {n.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="pill pill-sm"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  )
}

/* ----------------------------------- Hero ---------------------------------- */
function Portrait({
  className = '',
  label = 'Portrait of Shakib Sheikh',
  src = profile.portrait,
  fade = false,
  glow = false, // set glow on a <Portrait> to bring back the soft light behind the cut-out
}) {
  const [ok, setOk] = useState(true)
  const mask = fade
    ? {
        WebkitMaskImage: 'linear-gradient(to bottom, #000 76%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, #000 76%, transparent 100%)',
      }
    : undefined
  return (
    <div className={`relative ${className}`}>
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[8%] bg-[radial-gradient(closest-side_at_50%_45%,rgba(255,255,255,0.13),transparent)]"
        />
      )}
      {ok ? (
        <img
          src={src}
          alt={label}
          style={mask}
          className="relative h-full w-full object-contain object-bottom"
          onError={() => setOk(false)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-line2 p-6 text-center text-muted">
          <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-dashed border-line2 font-mono text-xs">
            PHOTO
          </div>
          <p className="font-mono text-xs leading-relaxed">
            PLACEHOLDER
            <br />
            Add your portrait at
            <br />
            public{src}
          </p>
        </div>
      )}
    </div>
  )
}

function Hero({ start = true }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    // Wait for the opening shutter to start lifting before the hero animates in.
    if (!start) return undefined
    const mm = gsap.matchMedia()
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const items = gsap.utils.toArray('[data-role]')

        // Headline rotation: hold, fade the current one up and out, bring the next one in.
        gsap.set(items.slice(1), { autoAlpha: 0, yPercent: 30 })
        const tl = gsap.timeline({ repeat: -1 })
        items.forEach((el, i) => {
          const next = items[(i + 1) % items.length]
          tl.to({}, { duration: 3 })
            .to(el, { autoAlpha: 0, yPercent: -30, duration: 0.9, ease: 'power2.inOut' })
            .fromTo(
              next,
              { autoAlpha: 0, yPercent: 30 },
              { autoAlpha: 1, yPercent: 0, duration: 0.9, ease: 'power2.out', immediateRender: false },
              '<0.15',
            )
        })

        // Intro
        gsap.from('[data-hero-in]', {
          autoAlpha: 0,
          y: 24,
          duration: 1,
          stagger: 0.12,
          delay: 0.25,
          ease: 'power3.out',
        })

        // Gentle portrait parallax: pointer movement + slow scroll drift.
        const px = gsap.quickTo('[data-px-a]', 'x', { duration: 1.2, ease: 'power3.out' })
        const py = gsap.quickTo('[data-px-a]', 'y', { duration: 1.2, ease: 'power3.out' })
        const onMove = (e) => {
          px((e.clientX / window.innerWidth - 0.5) * -16)
          py((e.clientY / window.innerHeight - 0.5) * -12)
        }
        window.addEventListener('pointermove', onMove)
        gsap.to('[data-px-b]', {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })

        return () => window.removeEventListener('pointermove', onMove)
      },
      root,
    )
    return () => mm.revert()
  }, [start])

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden pb-40 pt-28 lg:pb-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(900px,90vw)] w-[min(900px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,.07), transparent 62%)' }}
      />

      <div
        className={`${wrap} relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.95fr_0.8fr] lg:gap-10`}
      >
        <div>
          <p className="label mb-5" data-hero-in>
            Hi, I’m Shakib
          </p>
          <h1 className="grid" data-hero-in>
            <span className="sr-only">{roles[0]}</span>
            {roles.map((r, i) => (
              <span
                key={r}
                data-role
                aria-hidden="true"
                className={`col-start-1 row-start-1 text-[clamp(40px,6.2vw,92px)] font-bold uppercase leading-[1.02] tracking-[-0.035em] ${
                  i > 0 ? 'opacity-0' : ''
                }`}
              >
                {r}
              </span>
            ))}
          </h1>
        </div>

        <div
          className="order-2 w-[min(78vw,340px)] justify-self-center lg:order-none lg:w-full lg:max-w-[440px]"
          data-hero-in
          data-px-b
        >
          <div data-px-a className="w-full">
            <Portrait fade className="aspect-[3/4] w-full" />
          </div>
        </div>

        <div className="order-3 lg:order-none" data-hero-in>
          <span className="label mb-3 block">Introduction</span>
          <p className="max-w-[34ch] text-base leading-relaxed text-muted lg:text-[17px]">
            {profile.intro}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-7">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-4`}>
          <span className="label hidden items-center gap-3 lg:flex">
            Scroll to explore
            <span aria-hidden="true" className="inline-block h-9 w-px bg-gradient-to-b from-white to-transparent" />
          </span>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="pill pill-solid">
              Explore My Projects
            </a>
            <a href="#contact" className="pill">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- About ---------------------------------- */
function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className={`${wrap} grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <div data-reveal className="w-full max-w-[380px]">
          <Portrait
            src={profile.portraitAbout}
            className="aspect-[492/947] w-full"
            label="Shakib Sheikh seated in an office chair, taking notes"
          />
        </div>
        <div data-reveal>
          <span className="label">A little about me</span>
          <h2 className="mb-5 mt-3 text-[clamp(28px,3.6vw,46px)] font-semibold leading-[1.1] tracking-tight">
            {profile.aboutTitle}
          </h2>
          <p className="mb-7 max-w-[60ch] text-[17px] leading-relaxed text-muted">{profile.about}</p>
          <p className="inline-flex items-center gap-3 rounded-full border border-line2 px-4 py-2 font-mono text-xs tracking-[0.04em]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#6ee7a0] shadow-[0_0_12px_#6ee7a0]" />
            {profile.availability}
          </p>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Skills --------------------------------- */
function Skills() {
  return (
    <section id="skills" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <SectionHead label="Skills" title="Tools I work with." />
        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((g, i) => (
            <div
              key={g.group}
              data-reveal
              className={`card p-7 ${i === skills.length - 1 && skills.length % 2 ? 'md:col-span-2' : ''}`}
            >
              <h3 className="label mb-5">{g.group}</h3>
              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Projects -------------------------------- */
function Projects() {
  return (
    <section id="projects" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <SectionHead label="Projects" title="Selected work." />
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((p, i) => (
            <article key={p.name} data-reveal className="card flex flex-col gap-5 p-7 sm:p-9">
              <span className="label">0{i + 1}</span>
              <h3 className="text-[28px] font-semibold tracking-tight">{p.name}</h3>
              <p className="leading-relaxed text-muted">{p.description}</p>
              <ul className="mt-auto flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t} className="chip !px-3 !py-1 !text-xs">
                    {t}
                  </li>
                ))}
              </ul>
              <div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-solid pill-sm"
                  aria-label={`Open ${p.name} live site (opens in a new tab)`}
                >
                  Visit {p.name} ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Experience ------------------------------- */
function Experience() {
  return (
    <section id="experience" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <SectionHead label="Experience" title="The path so far." />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
        <ol className="ml-1.5 border-l border-line2">
          {experience.map((e) => (
            <li key={e.role} data-reveal className="relative pb-12 pl-7 last:pb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-white ${
                  e.current ? 'bg-white shadow-[0_0_14px_rgba(255,255,255,.6)]' : 'bg-ink'
                }`}
              />
              <span className="label">{e.date}</span>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">{e.role}</h3>
              <p className="mb-4 text-muted">{e.org}</p>
              <ul className="max-w-[70ch] space-y-1.5 text-[15px] leading-relaxed text-muted">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span aria-hidden="true" className="text-line2">
                      –
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div data-reveal className="hidden justify-self-end lg:block">
          <Portrait
            src={profile.portraitStanding}
            className="aspect-[364/998] h-[560px]"
            label="Shakib Sheikh standing in a grey sweater and jeans"
          />
        </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- Achievements ------------------------------ */
function Achievements() {
  return (
    <section id="achievements" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <SectionHead label="Education & Achievements" title="Learning and recognition." />
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal className="card p-7 sm:p-9">
            <span className="label">Education</span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{education.school}</h3>
            <p className="mt-2 text-muted">{education.degree}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-muted">{education.date}</p>
          </div>
          <div data-reveal className="card p-7 sm:p-9">
            <span className="label">Achievements & certification</span>
            <ul className="mt-4 divide-y divide-line">
              {achievements.map((a) => (
                <li
                  key={a.title}
                  className="flex flex-col justify-between gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="text-[17px] font-medium">{a.title}</span>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                    {a.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- Contact --------------------------------- */
function Contact() {
  const [status, setStatus] = useState({ state: 'idle', text: '' })
  const [fallback, setFallback] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const name = String(data.name || '').trim()
    const email = String(data.email || '').trim()
    const message = String(data.message || '').trim()
    setFallback('')

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) {
      setStatus({ state: 'error', text: 'Please enter your name, a valid email and a message.' })
      return
    }
    setStatus({ state: 'sending', text: 'Sending…' })
    try {
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error('request failed')
      form.reset()
      setStatus({ state: 'ok', text: 'Thanks! Your message was sent.' })
    } catch {
      setStatus({ state: 'error', text: 'Could not send right now.' })
      setFallback(
        `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio message from ${name}`)}&body=${encodeURIComponent(
          `${message}\n\n${name} (${email})`,
        )}`,
      )
    }
  }

  const links = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', value: 'linkedin.com/in/shakib-sheikh', href: profile.linkedin, ext: true },
    { label: 'GitHub', value: 'github.com/Shakibsheikh3011', href: profile.github, ext: true },
  ]

  const input =
    'w-full rounded-xl border border-line2 bg-panel px-4 py-3.5 text-base text-soft transition-colors focus:border-white focus:outline-none'

  return (
    <section id="contact" className="pb-24 sm:pb-32">
      <div className={wrap}>
        <SectionHead label="Contact" title="Let’s build something." />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <p className="mb-7 max-w-[42ch] text-lg leading-relaxed text-muted">
              I’m looking for software development and full-stack internships. Send a message and I’ll get back to you.
            </p>
            <ul className="grid gap-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex flex-col justify-between gap-1 rounded-2xl border border-line px-5 py-4 transition-colors hover:border-white hover:bg-panel sm:flex-row sm:items-center"
                  >
                    <span className="label">{l.label}</span>
                    <span className="break-all text-[15px]">{l.value}{l.ext ? ' ↗' : ''}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={onSubmit} noValidate data-reveal className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="label">Name</label>
              <input id="name" name="name" autoComplete="name" required className={input} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="label">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" required className={input} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="label">Message</label>
              <textarea id="message" name="message" required rows={5} className={`${input} min-h-36 resize-y`} />
            </div>
            <button type="submit" className="pill pill-solid" disabled={status.state === 'sending'}>
              {status.state === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`min-h-6 text-sm ${
                status.state === 'ok' ? 'text-[#6ee7a0]' : status.state === 'error' ? 'text-[#ff9a9a]' : 'text-muted'
              }`}
            >
              {status.state !== 'sending' && status.text}
              {fallback && (
                <>
                  {' '}
                  <a href={fallback} className="underline">
                    Send by email instead
                  </a>
                  .
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- Footer --------------------------------- */
function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pb-8 pt-14">
      <div className={wrap}>
        <p
          aria-hidden="true"
          className="my-6 select-none whitespace-nowrap text-center text-[clamp(64px,21vw,340px)] font-bold leading-[0.9] tracking-[-0.05em]"
        >
          {profile.short}
        </p>
        <div className="mt-10 flex flex-col justify-between gap-5 text-sm text-muted sm:flex-row sm:items-center">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a className="hover:text-white" href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${profile.email}`}>
                Email
              </a>
            </li>
          </ul>
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------ Opening screen ------------------------------ */
// A plain dark loading screen: name, script title, tagline and a thin progress line. The counter follows
// the real loading of the page's fonts and photos; at 100% the whole screen slides up like a shutter and
// the home page appears underneath. Text lives in data.js (profile.name, shutterTitle, shutterTag).
function Intro({ onOpen, onDone }) {
  const root = useRef(null)
  const bar = useRef(null)
  const pct = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal: masked letters first, then the smaller lines.
      gsap.from('[data-char]', { yPercent: 115, duration: 0.9, stagger: 0.04, ease: 'power3.out', delay: 0.25 })
      gsap.from('[data-shutter-sub]', { autoAlpha: 0, y: 12, duration: 0.9, ease: 'power2.out', delay: 0.75 })
      gsap.from('[data-shutter-fade]', { autoAlpha: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out', delay: 0.9 })

      // Real progress: window load, web fonts and the portraits. Each finished job adds an equal share.
      const jobs = [
        new Promise((r) => {
          if (document.readyState === 'complete') r()
          else window.addEventListener('load', r, { once: true })
        }),
        document.fonts ? document.fonts.ready : Promise.resolve(),
        ...[profile.portrait, profile.portraitAbout, profile.portraitStanding].filter(Boolean).map(
          (src) =>
            new Promise((r) => {
              const im = new Image()
              im.onload = im.onerror = r
              im.src = src
            }),
        ),
      ]
      let real = 0
      let finished = 0
      jobs.forEach((j) =>
        Promise.resolve(j).then(() => {
          finished += 1
          real = finished / jobs.length
        }),
      )
      gsap.delayedCall(10, () => (real = 1)) // never get stuck on a slow font or image

      // The counter never jumps ahead of real progress, and never finishes faster than ~2.4s so it is readable.
      const state = { v: 0 }
      const fill = gsap.to(state, { v: 1, duration: 2.4, ease: 'power1.inOut' })

      let lifting = false
      let fast = false
      let lift

      const open = () => {
        onOpen()
        lift = gsap
          .timeline()
          .to('[data-sheet]', { y: 14, duration: 0.28, ease: 'power1.out' }) // small tug down before it rises
          .to('[data-sheet]', {
            y: () => -(window.innerHeight + 60),
            duration: 1.9,
            ease: 'power2.inOut',
            onComplete: onDone,
          })
      }

      const tick = () => {
        const shown = Math.min(state.v, real)
        if (bar.current) bar.current.style.transform = `scaleX(${shown})`
        if (pct.current) pct.current.textContent = `${Math.round(shown * 100)}%`
        if (shown >= 1 && !lifting) {
          lifting = true
          gsap.ticker.remove(tick)
          gsap.delayedCall(fast ? 0.1 : 0.6, open) // brief pause on 100%
        }
      }
      gsap.ticker.add(tick)

      // Click, tap or Escape: finish the loading animation sooner / speed up the lift.
      const speedUp = () => {
        if (lift) lift.timeScale(3)
        else {
          fast = true
          real = 1
          fill.progress(1)
        }
      }
      const onKey = (e) => e.key === 'Escape' && speedUp()
      const el = root.current
      el.addEventListener('pointerdown', speedUp)
      window.addEventListener('keydown', onKey)
      return () => {
        gsap.ticker.remove(tick)
        el.removeEventListener('pointerdown', speedUp)
        window.removeEventListener('keydown', onKey)
      }
    }, root)
    return () => ctx.revert()
  }, [onOpen, onDone])

  const [first, ...rest] = profile.name.split(' ')
  const letters = (word, className) => (
    <span className={`inline-flex overflow-hidden pb-[0.1em] ${className}`}>
      {word.split('').map((c, i) => (
        <span key={i} data-char className="inline-block">
          {c}
        </span>
      ))}
    </span>
  )

  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-[100] cursor-pointer overflow-hidden">
      {/* plain panel in the site's own colours; no slats or lines */}
      <div
        data-sheet
        className="absolute inset-0 will-change-transform"
        style={{ background: 'radial-gradient(ellipse at 50% 45%, #1b1c20 0%, #0f1012 55%, #0a0a0b 100%)' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <h2 className="flex flex-wrap items-center justify-center gap-x-[0.3em] text-[clamp(38px,7vw,108px)] font-bold uppercase leading-[1] tracking-[-0.02em]">
            {letters(first, 'text-soft')}
            {rest.map((w, i) => (
              <span key={i}>{letters(w, 'text-[#8d8f96]')}</span>
            ))}
          </h2>
          <p
            data-shutter-sub
            className="mt-2 font-script text-[clamp(42px,5.2vw,76px)] leading-tight text-[#d4d5d8]"
          >
            {profile.shutterTitle}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-[13%] flex flex-col items-center px-8">
          <p data-shutter-fade className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted sm:text-xs">
            {profile.shutterTag}
          </p>
          <div data-shutter-fade className="mt-5 w-[min(240px,58vw)]">
            <div className="h-[2px] w-full bg-white/15">
              <div ref={bar} className="h-full origin-left bg-soft" style={{ transform: 'scaleX(0)' }} />
            </div>
            <p
              ref={pct}
              className="mt-2 text-center font-mono text-[10px] tabular-nums tracking-[0.2em] text-muted"
            >
              0%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----------------------------------- App ----------------------------------- */
export default function App() {
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // `open` flips when the shutter starts to lift; `introDone` when it has left the screen.
  const [open, setOpen] = useState(reduceMotion)
  const [introDone, setIntroDone] = useState(reduceMotion)
  // Stable callbacks: the shutter timeline must not restart when these state values change.
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleDone = useCallback(() => setIntroDone(true), [])

  // Always start at the top and keep the page still while the shutter is down.
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (introDone) return undefined
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev
      ScrollTrigger.refresh()
    }
  }, [introDone])

  // Restrained scroll reveals. Skipped entirely when the visitor prefers reduced motion.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <>
      {!introDone && <Intro onOpen={handleOpen} onDone={handleDone} />}
      <div inert={!open}>
        <a
          href="#about"
          className="absolute -left-[999px] top-2 z-[100] rounded-lg bg-white px-4 py-2 text-black focus:left-2"
        >
          Skip to content
        </a>
        <Header />
        <main className="overflow-x-clip">
          <Hero start={open} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
