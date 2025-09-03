import { useEffect, useState } from "react";

// Util: simple hash router
function useHashRoute() {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' && window.location.hash.replace('#','')) || 'inicio');
  useEffect(() => {
    const onHash = () => setHash(window.location.hash.replace('#','') || 'inicio');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return [hash, (h) => { if (typeof window !== 'undefined') window.location.hash = h; }];
}

// Reusable UI bits
const Section = ({ title, subtitle, children, right }) => (
  <section className="py-14 lg:py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_320px] gap-10 items-start">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
        {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
      <aside className="lg:sticky lg:top-20 space-y-4">
        {right}
      </aside>
    </div>
  </section>
);

const Card = ({ children, className="" }) => (
  <div className={`rounded-2xl border bg-white shadow-sm p-6 ${className}`}>{children}</div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">{children}</span>
);

// Dropdown
const Menu = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button onMouseEnter={() => setOpen(true)} onClick={() => setOpen(!open)} className="hover:text-emerald-700 font-medium">{label}</button>
      {open && (
        <div className="absolute mt-2 w-64 rounded-2xl border bg-white shadow-lg p-2 z-50">
          {items.map((it) => (
            <a key={it.hash} href={`#${it.hash}`} className="block px-3 py-2 rounded-xl hover:bg-slate-50 text-sm">{it.title}</a>
          ))}
        </div>
      )}
    </div>
  );
};

export default function KallariSite() {
  const [route, go] = useHashRoute();

  // ACTUALIDAD sidebar
  const Actualidad = (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold">ACTUALIDAD</h3>
        <p className="mt-1 text-sm text-slate-600">Novedades, convocatorias y publicaciones.</p>
      </Card>
      <Card>
        <h4 className="font-semibold">Blog</h4>
        <ul className="mt-2 text-sm space-y-2">
          <li><a className="hover:underline" href="#blog">5 acciones de resiliencia climática en Caylloma →</a></li>
          <li><a className="hover:underline" href="#blog">Salud Oral 60+: prótesis y prevención →</a></li>
        </ul>
      </Card>
      <Card>
        <h4 className="font-semibold">Sala de prensa</h4>
        <ul className="mt-2 text-sm space-y-2">
          <li>Nota: Alianza con UGEL Caylloma</li>
          <li>Reporte trimestral de impacto</li>
        </ul>
      </Card>
      <Card>
        <h4 className="font-semibold">Podcast y videos</h4>
        <p className="mt-2 text-sm text-slate-600">Historias de comunidad y episodios de seguridad escolar.</p>
      </Card>
      <Card>
        <h4 className="font-semibold">Revista</h4>
        <p className="mt-2 text-sm">Próxima edición: "Escuela Segura 360°"</p>
      </Card>
    </div>
  );

  // HOME
  const Home = (
    <div>
      {/* Hero */}
      <section id="inicio-hero" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-sky-50"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[1fr_320px] gap-10 items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white text-xl font-bold">K</span>
              <div>
                <p className="font-semibold">KALLARI • Asociación Civil</p>
                <p className="text-xs text-slate-500">Fundación Valore • Perú</p>
              </div>
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">Comunidades que prosperan con educación, salud y resiliencia</h1>
            <p className="mt-4 text-lg text-slate-600">Intervenimos en Arequipa y La Libertad con programas 360°: escuelas seguras, salud bucal para adultos mayores, discapacidad e inclusión, resiliencia climática y desarrollo económico local.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#proyectos" className="rounded-xl px-5 py-3 bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700">Ver proyectos</a>
              <a href="#involucrate" className="rounded-xl px-5 py-3 border font-semibold hover:bg-slate-50">Involúcrate</a>
              <a href="#dona" className="rounded-xl px-5 py-3 border font-semibold hover:bg-slate-50">Dona</a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-6">
              {[
                { k: "+10", v: "años de trabajo" },
                { k: "5k+", v: "beneficiarios/año" },
                { k: "15", v: "instituciones aliadas" },
              ].map((item) => (
                <div key={item.k} className="rounded-2xl border p-4 bg-white shadow-sm">
                  <dt className="text-2xl font-bold text-emerald-700">{item.k}</dt>
                  <dd className="text-sm text-slate-500">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {Actualidad}
        </div>
      </section>

      {/* Aliados */}
      <Section title="Alianzas" subtitle="Trabajamos en red con instituciones públicas, privadas y comunitarias." right={<div/>}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {[
            { alt: 'APRAD', src: '', note: 'APRAD' },
            { alt: 'Fundación Valore', src: '', note: 'Fundación Valore' },
            { alt: 'Priority Safety Perú', src: '', note: 'Priority Safety Perú' },
            { alt: 'CETPAR', src: '', note: 'CETPAR' },
            { alt: 'Kallari', src: '', note: 'Kallari' },
          ].map((l, i) => (
            <div key={i} className="aspect-[3/1] rounded-xl border grid place-content-center bg-white">
              {/* Reemplazar src con dataURI o URL en despliegue */}
              <span className="text-slate-400 text-xs">{l.note} (logo)</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  // SOBRE NOSOTROS
  const SobreNosotros = (
    <Section title="Sobre nosotros" subtitle="Quiénes somos, misión, valores y equipo" right={Actualidad}>
      <div className="space-y-8">
        <Card>
          <h3 className="font-semibold">Quiénes somos</h3>
          <p className="mt-2 text-sm text-slate-600">Somos una asociación civil sin fines de lucro que impulsa proyectos de impacto social en educación, salud, discapacidad, equidad de género y resiliencia climática con enfoque territorial (Arequipa y La Libertad).
          </p>
        </Card>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h4 className="font-semibold">Misión y valores</h4>
            <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-slate-600">
              <li>Promover bienestar y oportunidades para todas las personas.</li>
              <li>Trabajo colaborativo con instituciones locales.</li>
              <li>Transparencia, respeto e igualdad.</li>
            </ul>
          </Card>
          <Card>
            <h4 className="font-semibold">Nuestros objetivos</h4>
            <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-slate-600">
              <li>Escuelas con SG-SST y cultura de prevención 360°.</li>
              <li>Atención de salud bucal a adultos mayores vulnerables.</li>
              <li>Inclusión y empleabilidad de personas con discapacidad.</li>
            </ul>
          </Card>
          <Card>
            <h4 className="font-semibold">Nuestro equipo</h4>
            <p className="mt-2 text-sm text-slate-600">Red interdisciplinaria de educadores, profesionales de salud, ingenieros, gestores sociales y voluntariado.</p>
          </Card>
        </div>
        <Card>
          <h4 className="font-semibold">Nuestras alianzas</h4>
          <p className="mt-2 text-sm text-slate-600">APRAD, Fundación Valore, Priority Safety Perú, CETPAR, UGEL Caylloma, SENAMHI, INGEMMET, entre otras.</p>
        </Card>
      </div>
    </Section>
  );

  // PROYECTOS
  const Proyectos = (
    <Section title="Proyectos" subtitle="Líneas programáticas y carteras activas" right={Actualidad}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { t: 'Proyectos Educativos', d: 'SG-SST escolar (Ley 29783), patrullas, materiales pedagógicos, simulacros y formación docente.'},
          { t: 'Proyectos de Salud', d: 'Salud Oral 60+: prevención, prótesis, campañas y atención domiciliaria en zonas rurales y urbanas.'},
          { t: 'Discapacidad', d: 'Centro de Desarrollo Inclusivo y talleres productivos: joyería, panadería, carpintería, metalmecánica.'},
          { t: 'Equidad e Igualdad de Género', d: 'Prevención de violencia y acoso laboral/sexual, enfoque de género en escuelas y comunidades.'},
          { t: 'Desastres y Resiliencia', d: 'Sistemas comunitarios de alerta temprana, gestión de riesgo y anticipación.'},
          { t: 'Empoderamiento y Emprendimiento', d: 'Cadenas de valor local y “Gema Solidaria” para turismo responsable.'},
          { t: 'Cambio Climático', d: 'Gestión inteligente del agua/sequías, capacitación en datos y sensores.'},
          { t: 'Amazonía para el Futuro', d: 'Educación ambiental, vigilancia comunitaria y economía sostenible con identidad local.'},
        ].map((p) => (
          <Card key={p.t}>
            <Pill>Programa</Pill>
            <h3 className="mt-3 text-lg font-semibold">{p.t}</h3>
            <p className="mt-2 text-sm text-slate-600">{p.d}</p>
            <a href="#contactos" className="mt-4 inline-block text-sm font-semibold text-emerald-700 hover:underline">Quiero saber más →</a>
          </Card>
        ))}
      </div>
    </Section>
  );

  // TRANSPARENCIA
  const Transparencia = (
    <Section title="Transparencia" subtitle="Rendición de cuentas y cumplimiento" right={Actualidad}>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-semibold">Rendición de cuentas</h4>
          <p className="mt-2 text-sm text-slate-600">Reportes trimestrales de ejecución y resultados, indicadores clave e hitos por programa.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-4">Fecha</th>
                  <th className="py-2 pr-4">Programa</th>
                  <th className="py-2 pr-4">Gasto (PEN)</th>
                  <th className="py-2">Informe</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {f:'2025-Q1', p:'Escuela Segura 360°', g:'48,500', l:'#'},
                  {f:'2025-Q1', p:'Salud Oral 60+', g:'27,900', l:'#'},
                  {f:'2025-Q1', p:'Resiliencia Climática', g:'35,200', l:'#'},
                ].map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 pr-4">{r.f}</td>
                    <td className="py-2 pr-4">{r.p}</td>
                    <td className="py-2 pr-4">{r.g}</td>
                    <td className="py-2"><a className="text-emerald-700 hover:underline" href={r.l}>PDF</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card>
          <h4 className="font-semibold">Memoria anual</h4>
          <p className="mt-2 text-sm text-slate-600">Síntesis de impacto, aprendizajes y proyección. Publicamos indicadores, auditorías y testimonios.</p>
          <a className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline" href="#">Descargar Memoria 2024 →</a>
        </Card>
        <Card>
          <h4 className="font-semibold">Compliance</h4>
          <ul className="mt-2 text-sm list-disc pl-5 space-y-1 text-slate-600">
            <li>Política anticorrupción y conflictos de interés</li>
            <li>Protección de datos personales</li>
            <li>Salvaguardas para niñez y grupos vulnerables</li>
          </ul>
          <a className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline" href="#">Ver políticas →</a>
        </Card>
        <Card>
          <h4 className="font-semibold">Canal de denuncias</h4>
          <p className="mt-2 text-sm text-slate-600">Mecanismo confidencial para reportar incumplimientos éticos o de seguridad.</p>
          <form className="mt-3 grid grid-cols-1 gap-3">
            <input className="rounded-xl border px-3 py-2" placeholder="Correo (opcional)" />
            <textarea className="rounded-xl border px-3 py-2 min-h-[120px]" placeholder="Describe el hecho" />
            <label className="text-xs text-slate-500 inline-flex items-center gap-2"><input type="checkbox"/> Mantener anonimato</label>
            <button type="button" className="rounded-xl px-4 py-2 bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">Enviar</button>
            <p className="text-xs text-slate-500">*Este formulario puede integrarse con Formspree/Resend/Sendgrid o bandeja dedicada.</p>
          </form>
        </Card>
      </div>
    </Section>
  );

  // INVOLÚCRATE
  const Involucrate = (
    <Section title="Involúcrate" subtitle="Tu apoyo multiplica el impacto" right={Actualidad}>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { t:'Voluntariado', d:'Participa en campañas, formación y operaciones de campo.'},
          { t:'Padrinazgo', d:'Apoya equipamiento, prótesis y materiales educativos.'},
          { t:'¿Tienes un proyecto?', d:'Propón alianzas y pilotos en tu comunidad.'},
        ].map((x) => (
          <Card key={x.t}>
            <h4 className="font-semibold">{x.t}</h4>
            <p className="mt-2 text-sm text-slate-600">{x.d}</p>
            <a className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:underline" href="#contactos">Contactar →</a>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <h4 className="font-semibold">Calendario de campañas</h4>
        <p className="mt-2 text-sm text-slate-600">Publicaremos aquí fechas de brigadas, capacitaciones y colectas.</p>
        <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border p-3">Caylloma • Jornada Salud Oral — 12/10</div>
          <div className="rounded-xl border p-3">La Esperanza • Escuela Segura — 20/10</div>
        </div>
      </Card>
    </Section>
  );

  // DONA
  const Dona = (
    <Section title="Dona" subtitle="Transparencia y trazabilidad de aportes" right={Actualidad}>
      <Card>
        <ul className="text-sm space-y-2">
          <li>• Cuenta para donaciones nacionales (placeholder)</li>
          <li>• Donaciones internacionales (SWIFT/IBAN) (placeholder)</li>
          <li>• Recibos y beneficios tributarios (si aplica)</li>
        </ul>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border p-4">
            <h5 className="font-semibold">Aportes únicos</h5>
            <p className="text-sm text-slate-600 mt-1">Campañas específicas o aporte general.</p>
            <a className="mt-3 inline-block rounded-xl bg-emerald-600 text-white font-semibold px-5 py-3 shadow hover:bg-emerald-700" href="#contactos">Quiero donar</a>
          </div>
          <div className="rounded-2xl border p-4">
            <h5 className="font-semibold">Donante recurrente</h5>
            <p className="text-sm text-slate-600 mt-1">Aportes mensuales con reporte trimestral.</p>
            <a className="mt-3 inline-block rounded-xl border font-semibold px-5 py-3 hover:bg-slate-50" href="#transparencia">Ver transparencia</a>
          </div>
        </div>
      </Card>
    </Section>
  );

  // CONTACTOS
  const Contactos = (
    <Section title="Contactos" subtitle="Estamos atentos a nuevas alianzas" right={Actualidad}>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <form className="grid grid-cols-1 gap-4">
            <input className="rounded-xl border px-4 py-3" placeholder="Nombre completo" />
            <input className="rounded-xl border px-4 py-3" placeholder="Correo electrónico" />
            <textarea className="rounded-xl border px-4 py-3 min-h-[120px]" placeholder="Cuéntanos sobre tu propuesta" />
            <button type="button" className="rounded-xl px-5 py-3 bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Enviar</button>
            <p className="text-xs text-slate-500">También disponible por WhatsApp y correo institucional (placeholders).</p>
          </form>
        </Card>
        <Card>
          <h4 className="font-semibold">Sedes y ámbito</h4>
          <p className="mt-2 text-sm text-slate-600">Arequipa (Caylloma / Colca) • La Libertad (La Esperanza)</p>
          <div className="mt-4 aspect-video rounded-2xl overflow-hidden ring-1 ring-slate-200">
            <img alt="Mapa" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1535448588105-9e5a9c4b9078?q=80&w=1200&auto=format&fit=crop" />
          </div>
        </Card>
      </div>
    </Section>
  );

  // route map
  const routes = {
    inicio: Home,
    'sobre-nosotros': SobreNosotros,
    proyectos: Proyectos,
    transparencia: Transparencia,
    involucrate: Involucrate,
    dona: Dona,
    contactos: Contactos,
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-emerald-600 text-white font-bold">K</span>
            <div className="leading-tight">
              <p className="font-semibold">KALLARI</p>
              <p className="text-xs text-slate-500">Asociación Civil • Perú</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#inicio" className="hover:text-emerald-700">Inicio</a>
            <Menu label="Sobre nosotros" items={[
              { title: 'Quiénes somos', hash: 'sobre-nosotros' },
              { title: 'Misión y valores', hash: 'sobre-nosotros' },
              { title: 'Nuestros objetivos', hash: 'sobre-nosotros' },
              { title: 'Nuestro equipo', hash: 'sobre-nosotros' },
              { title: 'Nuestras alianzas', hash: 'sobre-nosotros' },
            ]} />
            <Menu label="Proyectos" items={[
              { title: 'Educativos', hash: 'proyectos' },
              { title: 'Salud', hash: 'proyectos' },
              { title: 'Discapacidad', hash: 'proyectos' },
              { title: 'Equidad de género', hash: 'proyectos' },
              { title: 'Desastres y resiliencia', hash: 'proyectos' },
              { title: 'Emprendimiento', hash: 'proyectos' },
              { title: 'Cambio climático', hash: 'proyectos' },
              { title: 'Amazonía para el Futuro', hash: 'proyectos' },
            ]} />
            <Menu label="Transparencia" items={[
              { title: 'Rendición de cuentas', hash: 'transparencia' },
              { title: 'Memoria anual', hash: 'transparencia' },
              { title: 'Compliance', hash: 'transparencia' },
              { title: 'Canal de denuncias', hash: 'transparencia' },
            ]} />
            <Menu label="Involúcrate" items={[
              { title: 'Voluntariado', hash: 'involucrate' },
              { title: 'Padrinazgo', hash: 'involucrate' },
              { title: '¿Tienes un proyecto?', hash: 'involucrate' },
            ]} />
            <a href="#dona" className="hover:text-emerald-700">Dona</a>
            <a href="#contactos" className="hover:text-emerald-700">Contactos</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#dona" className="rounded-2xl px-4 py-2 bg-emerald-600 text-white text-sm font-semibold shadow-sm hover:bg-emerald-700">Donar</a>
          </div>
        </div>
      </header>

      {/* Content */}
      {routes[route] || Home}

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} KALLARI — Asociación Civil</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#transparencia" className="hover:text-emerald-700">Transparencia</a>
            <a href="#" className="hover:text-emerald-700">Privacidad</a>
            <a href="#" className="hover:text-emerald-700">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
