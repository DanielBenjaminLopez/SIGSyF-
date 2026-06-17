(function () {
  'use strict';

  // ========================================================================
  // MOCK DATA
  // ========================================================================

  const TIPO_DESC = { A: 'Dependiente', B: 'Semidependiente', C: 'Autoválido', D: 'Independiente' };
  const TIPO_COLOR = { A: '#EF4444', B: '#F59E0B', C: '#10B981', D: '#2563EB' };

  const RESIDENTES = [
    { id: 1, nombre: 'María López', edad: 78, hab: '101', ingreso: '12/03/2024', diagnostico: 'Alzheimer temprano', familiar: 'Sofía López', avatar: 'ML', color: '#7C3AED', tipo: 'B' },
    { id: 2, nombre: 'Juan Pérez', edad: 82, hab: '102', ingreso: '05/01/2023', diagnostico: 'Parkinson', familiar: 'Ana Pérez', avatar: 'JP', color: '#2563EB', tipo: 'B' },
    { id: 3, nombre: 'Rosa Giménez', edad: 75, hab: '103', ingreso: '20/08/2024', diagnostico: 'Diabetes tipo 2', familiar: 'Carlos Giménez', avatar: 'RG', color: '#10B981', tipo: 'C' },
    { id: 4, nombre: 'Pedro Sánchez', edad: 80, hab: '104', ingreso: '15/06/2023', diagnostico: 'Recuperación ACV', familiar: 'Lucía Sánchez', avatar: 'PS', color: '#F97316', tipo: 'A' },
    { id: 5, nombre: 'Ana Martínez', edad: 85, hab: '105', ingreso: '02/11/2022', diagnostico: 'Artrosis severa', familiar: 'Martín Martínez', avatar: 'AM', color: '#EC4899', tipo: 'A' },
    { id: 6, nombre: 'Carlos López', edad: 55, hab: '201', ingreso: '01/02/2025', diagnostico: 'Lesión medular', familiar: 'Sofía López', avatar: 'CL', color: '#8B5CF6', tipo: 'B' },
  ];

  const CATEGORIAS = ['Laborterapia', 'Actividad física', 'Estimulación cognitiva', 'Recreativa', 'Evento'];
  const CAT_COLORS = {
    'Laborterapia': '#F97316',
    'Actividad física': '#10B981',
    'Estimulación cognitiva': '#8B5CF6',
    'Recreativa': '#0EA5E9',
    'Evento': '#2563EB',
  };
  const CAT_CLASSES = {
    'Laborterapia': 'laborterapia',
    'Actividad física': 'actividad-fisica',
    'Estimulación cognitiva': 'estimulacion',
    'Recreativa': 'recreativa',
    'Evento': 'evento',
  };

  const NOW = new Date();
  const YEAR = NOW.getFullYear();
  const MONTH = NOW.getMonth();

  function makeDate(day, m, y) {
    return new Date(y || YEAR, m !== undefined ? m : MONTH, day);
  }
  function fmtDate(d) {
    return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function fmtShort(d) {
    return d.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' });
  }
  function fmtTime(d) {
    return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  }

  const ACTIVIDADES = [];
  const actNames = [
    { t: 'Taller de Memoria', cat: 'Estimulación cognitiva' },
    { t: 'Gimnasia Suave', cat: 'Actividad física' },
    { t: 'Tejido y Manualidades', cat: 'Laborterapia' },
    { t: 'Música en Vivo', cat: 'Recreativa' },
    { t: 'Salida al Parque', cat: 'Evento' },
    { t: 'Taller de Cocina', cat: 'Laborterapia' },
    { t: 'Yoga en Silla', cat: 'Actividad física' },
    { t: 'Bingo Recreativo', cat: 'Recreativa' },
    { t: 'Estimulación del Lenguaje', cat: 'Estimulación cognitiva' },
    { t: 'Visita Familiar', cat: 'Evento' },
    { t: 'Pintura y Expresión', cat: 'Laborterapia' },
    { t: 'Tai Chi', cat: 'Actividad física' },
  ];
  const lugares = [
    'Sala común PB', 'Patio externo', 'Salón multiusos', 'Jardín trasero',
    'Sala de estar 1er piso', 'Comedor principal', 'Terraza',
  ];

  for (let i = 0; i < 30; i++) {
    const day = (i % 28) + 1;
    const a = actNames[i % actNames.length];
    const d = makeDate(day, MONTH, YEAR);
    d.setHours(9 + (i % 8), (i * 17) % 60);
    const act = {
      id: 'act-' + i,
      titulo: a.t,
      categoria: a.cat,
      fecha: d,
      lugar: lugares[i % lugares.length],
      tallerista: ['Laura Mendoza', 'Dr. García', 'Lic. Fernández', 'Prof. Ruiz'][i % 4],
      residentesIds: [1, 2, 3, 4, 5, 6].filter(() => Math.random() > 0.35),
      invitaciones: RESIDENTES.map(r => ({
        residenteId: r.id,
        familiar: r.familiar,
        estado: ['pendiente', 'confirmado', 'declinado'][Math.floor(Math.random() * 3)],
        cantidad: Math.ceil(Math.random() * 3),
      })),
    };
    ACTIVIDADES.push(act);
  }
  ACTIVIDADES.sort((a, b) => a.fecha - b.fecha);

  const REPORTES = [];
  const evoluciones = [
    'La residente se mostró participativa durante las actividades grupales. Mantiene buen apetito y descanso nocturno adecuado.',
    'Presentó leve irritabilidad matinal que cedió tras la medicación. Participó parcialmente en talleres.',
    'Estado de ánimo estable. Continúa con fisioterapia y muestra mejora en movilidad de miembro superior derecho.',
    'Se observa desorientación temporo-espacial leve en horas de la tarde. Responde bien a estímulos verbales.',
    'Buena evolución general. Continúa con control de glucemia dentro de parámetros esperados.',
    'Refiere dolor lumbar ocasional controlado con analgesia. Participó activamente en taller de música.',
    'Migajas de pan encontradas en la cama. Se habló con la residente sobre la higiene del sueño.',
    'Excelente participación en actividades de la semana. Vínculos sociales fortalecidos con pares.',
  ];
  for (let i = 0; i < 24; i++) {
    const res = RESIDENTES[i % RESIDENTES.length];
    const d = new Date(YEAR, MONTH, 1 + i * 2);
    REPORTES.push({
      id: 'rep-' + i,
      residenteId: res.id,
      residente: res.nombre,
      fecha: d,
      periodo: i < 8 ? 'Semanal' : 'Mensual',
      estadoGeneral: ['Estable', 'En observación', 'Mejorando', 'Estable', 'Estable', 'Mejorando'][i % 6],
      evolucion: evoluciones[i % evoluciones.length],
      signos: {
        presion: `${120 + (i % 15)}/${70 + (i % 10)}`,
        fc: `${68 + (i % 14)} lpm`,
        temp: `${(36 + (i % 8) * 0.1).toFixed(1)} °C`,
        sat: `${95 + (i % 5)}%`,
      },
    });
  }
  REPORTES.sort((a, b) => b.fecha - a.fecha);

  const REUNIONES = [
    {
      id: 'reu-1',
      titulo: 'Reunión Mensual con Familias — Evaluación General',
      fecha: new Date(YEAR, MONTH, 18, 10, 0),
      modalidad: 'Presencial',
      lugar: 'Salón Comedor Principal',
      proxima: true,
      participantes: ['Laura M. (Coordinación)', 'Dr. García', 'Fam. López', 'Fam. Pérez', 'Fam. Giménez'],
      minuta: 'Se compartió la evolución general de los residentes con las familias presentes. Se resolvieron dudas sobre rutinas de medicación y horarios de visita. Próximo encuentro: 18 del mes que viene.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-2',
      titulo: 'Entrevista Familiar — Ingreso de Familiar de Rosa Giménez',
      fecha: new Date(YEAR, MONTH - 1, 20, 11, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/abc-defg-hij',
      proxima: false,
      participantes: ['Dr. García', 'Lic. Fernández', 'Carlos Giménez (Familiar)'],
      minuta: 'Se realizó la entrevista de ingreso con Carlos, hijo de Rosa. Se explicaron las rutinas diarias, el plan de alimentación para diabeticos y los talleres disponibles. Carlos manifestó conformidad con el servicio.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-3',
      titulo: 'Taller de Orientación para Familias — Cómo acompañar a tu familiar',
      fecha: new Date(YEAR, MONTH - 2, 15, 14, 0),
      modalidad: 'Presencial',
      lugar: 'Salón Multiusos',
      proxima: false,
      participantes: ['Laura M. (Coordinación)', 'Lic. Fernández', '12 familiares'],
      minuta: 'Taller participativo donde se abordaron estrategias de comunicación, manejo de emociones y pautas de visita. Muy buena recepción de las familias. Se entregaron guías impresas.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-4',
      titulo: 'Encuentro Familiar — Evaluación Semestral',
      fecha: new Date(YEAR, MONTH - 3, 10, 9, 30),
      modalidad: 'Presencial',
      lugar: 'Sala de Reuniones 1er Piso',
      proxima: false,
      participantes: ['Laura M.', 'Dr. García', 'Fam. López', 'Fam. Sánchez', 'Fam. Martínez'],
      minuta: 'Evaluación semestral con las familias. Se presentaron los avances de cada residente, estadísticas de participación en talleres y resultados de encuestas de satisfacción. Se recibieron sugerencias para mejorar la comunicación diaria.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-5',
      titulo: 'Reunión de Contención y Apoyo Familiar',
      fecha: new Date(YEAR, MONTH + 1, 5, 16, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/xyz-uvw-rst',
      proxima: false,
      participantes: ['Lic. Fernández', 'Psicóloga', 'Familiares'],
      minuta: 'Espacio de contención emocional para familias de residentes con deterioro cognitivo avanzado. Se compartieron experiencias y herramientas de afrontamiento. Asistieron 8 familiares.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-6',
      titulo: 'Jornada de Puertas Abiertas para Familias',
      fecha: new Date(YEAR, MONTH - 4, 22, 11, 0),
      modalidad: 'Presencial',
      lugar: 'Instalaciones de la Residencia',
      proxima: false,
      participantes: ['Todo el equipo interdisciplinario', '20+ familiares'],
      minuta: 'Jornada donde las familias recorrieron las instalaciones, participaron de talleres junto a los residentes y compartieron un almuerzo comunitario. Actividad muy valorada por todos los asistentes.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-7',
      titulo: 'Consulta Familiar con Equipo Interdisciplinario — Familia Pérez',
      fecha: new Date(YEAR, MONTH - 4, 8, 15, 0),
      modalidad: 'Presencial',
      lugar: 'Consultorio 2',
      proxima: false,
      participantes: ['Dr. García', 'Lic. Fernández', 'Ana Pérez (Familiar)'],
      minuta: 'Consulta solicitada por la familia Pérez para evaluar la evolución motriz de Juan. Se ajustó el plan de kinesiología y se acordó un seguimiento quincenal. La familia se retiró conforme.',
      conformidad: 'Media',
    },
    {
      id: 'reu-8',
      titulo: 'Charla Informativa: Beneficios de la Estimulación Cognitiva',
      fecha: new Date(YEAR, MONTH - 5, 12, 10, 30),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/rst-uvw-xyz',
      proxima: false,
      participantes: ['Lic. Fernández', '15 familiares'],
      minuta: 'Charla virtual donde se explicaron los beneficios de la estimulación cognitiva en adultos mayores. Se mostraron ejemplos de ejercicios que las familias pueden replicar en casa durante las visitas.',
      conformidad: 'Alta',
    },
  ];

  const THREADS = [
    {
      id: 't-1',
      subject: 'Consulta sobre medicación de María',
      participants: ['Familiar (Sofía)', 'Enfermería'],
      messages: [
        { from: 'Sofía López', text: 'Buenos días, quería consultar si hubo algún cambio en la medicación de mamá esta semana.', time: new Date(YEAR, MONTH, 14, 9, 15), side: 'sent' },
        { from: 'Enfermería', text: 'Hola Sofía, sí. El Dr. García ajustó la dosis de donepecilo de 5mg a 10mg. Se lo estamos administrando después del desayuno.', time: new Date(YEAR, MONTH, 14, 10, 30), side: 'received' },
        { from: 'Sofía López', text: 'Entiendo. ¿Notaron algún cambio en su comportamiento?', time: new Date(YEAR, MONTH, 14, 11, 0), side: 'sent' },
        { from: 'Enfermería', text: 'Está más alerta durante la mañana. Por la tarde mantiene su rutina habitual sin cambios. La seguimos observando.', time: new Date(YEAR, MONTH, 14, 11, 45), side: 'received' },
      ],
    },
    {
      id: 't-2',
      subject: 'Invitación a taller de memoria',
      participants: ['Familiar (Sofía)', 'Coordinación'],
      messages: [
        { from: 'Coordinación', text: 'Sofía, la semana que viene comenzamos el Taller de Memoria con los residentes. ¿Querés participar del taller junto a María?', time: new Date(YEAR, MONTH, 12, 14, 0), side: 'received' },
        { from: 'Sofía López', text: '¡Sí, me encantaría! ¿Qué día y horario?', time: new Date(YEAR, MONTH, 12, 15, 20), side: 'sent' },
        { from: 'Coordinación', text: 'Martes y jueves de 10:00 a 11:30 en el Salón Multiusos. Te esperamos.', time: new Date(YEAR, MONTH, 12, 16, 0), side: 'received' },
      ],
    },
    {
      id: 't-3',
      subject: 'Reporte de caída',
      participants: ['Familiar (Sofía)', 'Enfermería', 'Dirección'],
      messages: [
        { from: 'Enfermería', text: 'Sofía, te informamos que María tuvo una leve caída esta mañana en el baño. No presenta lesiones, solo un pequeño hematoma en el brazo derecho. Ya está estable.', time: new Date(YEAR, MONTH, 10, 12, 0), side: 'received' },
        { from: 'Sofía López', text: '¿¡Cómo pasó!? ¿Está bien atendida? ¿Necesito ir?', time: new Date(YEAR, MONTH, 10, 12, 30), side: 'sent' },
        { from: 'Enfermería', text: 'Tranquila, ya la revisó el Dr. García. Está en observación pero no hay gravedad. Reforzamos la supervisión en horarios de movilización.', time: new Date(YEAR, MONTH, 10, 13, 15), side: 'received' },
      ],
    },
  ];

  const NOTIFICACIONES = [
    { id: 'n1', texto: 'Nuevo reporte semanal de María López disponible', tipo: 'info', fecha: new Date(YEAR, MONTH, 15, 8, 0), leida: false },
    { id: 'n2', texto: 'Recordatorio: Reunión mensual obligatoria el 18 de junio', tipo: 'warning', fecha: new Date(YEAR, MONTH, 14, 10, 0), leida: false },
    { id: 'n3', texto: 'Taller de memoria confirmado para el jueves', tipo: 'success', fecha: new Date(YEAR, MONTH, 13, 9, 0), leida: true },
    { id: 'n4', texto: 'Invitación: Salida al parque el viernes 20', tipo: 'info', fecha: new Date(YEAR, MONTH, 12, 14, 0), leida: false },
    { id: 'n5', texto: 'María fue evaluada en fisioterapia — resultado: mejorando', tipo: 'success', fecha: new Date(YEAR, MONTH, 11, 16, 0), leida: true },
  ];

  // ========================================================================
  // HELPERS
  // ========================================================================

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  const $id = (id) => document.getElementById(id);

  function showToast(msg, tipo) {
    const c = $id('toast-container');
    const t = document.createElement('div');
    t.className = 'toast toast-' + (tipo || 'info');
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }

  function openModal(title, bodyHTML, footHTML) {
    $id('modal-title').textContent = title;
    $id('modal-body').innerHTML = bodyHTML;
    $id('modal-foot').innerHTML = footHTML || '';
    $id('modal-overlay').style.display = 'flex';
  }
  function closeModal() { $id('modal-overlay').style.display = 'none'; }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function residentePorId(id) { return RESIDENTES.find(r => r.id === id); }

  // ========================================================================
  // ENVIRONMENT SWITCHER
  // ========================================================================

  const envBtns = $$('.env-btn');
  envBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      envBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const env = this.dataset.env;
      $id('env-interno').style.display = env === 'interno' ? 'flex' : 'none';
      $id('env-familiar').style.display = env === 'familiar' ? 'flex' : 'none';
      if (env === 'familiar') renderFamView(currentFamView);
      else renderInternalView(currentView);
    });
  });

  // ========================================================================
  // INTERNAL DASHBOARD
  // ========================================================================

  let currentView = 'panel';
  const content = $id('content-interno');
  const pageTitle = $id('page-title');

  function renderInternalView(view) {
    currentView = view;
    pageTitle.textContent = {
      panel: 'Panel General', calendario: 'Calendario de Actividades',
      asistencia: 'Asistencia y Coordinación', reportes: 'Reportes de Salud',
      mensajes: 'Centro de Mensajería', reuniones: 'Gestión de Reuniones',
      evaluaciones: 'Evaluaciones Post-Actividad',
    }[view] || 'Panel General';

    $$('#internal-nav .nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.view === view);
    });

    if (RENDERS[view]) RENDERS[view]();
    else content.innerHTML = '<p>Sección en construcción</p>';

    // Update topbar actions
    const actions = $id('topbar-actions');
    if (view === 'panel') {
      actions.innerHTML = '<button class="btn btn-primary" id="btn-nueva-actividad">+ Nueva Actividad</button>';
    } else if (view === 'reuniones') {
      actions.innerHTML = '<button class="btn btn-primary" id="btn-nueva-reunion">+ Programar Reunión</button>';
    } else if (view === 'reportes') {
      actions.innerHTML = '<button class="btn btn-primary" id="btn-nuevo-reporte">+ Nuevo Reporte</button>';
    } else {
      actions.innerHTML = '';
    }
  }

  const RENDERS = {};

  // --- Panel General ---
  RENDERS.panel = function () {
    const hoyAct = ACTIVIDADES.filter(a => a.fecha.toDateString() === NOW.toDateString()).length;
    const pendientes = ACTIVIDADES.filter(a => a.invitaciones.some(i => i.estado === 'pendiente')).length;
    const reportesMes = REPORTES.filter(r => r.fecha.getMonth() === MONTH).length;
    const asisHoy = Math.floor(RESIDENTES.length * (0.7 + Math.random() * 0.25));

    let html = `
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-num">${hoyAct}</div><div class="stat-label">Actividades hoy</div></div>
        <div class="stat-card"><div class="stat-num">${pendientes}</div><div class="stat-label">Invitaciones pendientes</div></div>
        <div class="stat-card"><div class="stat-num">${reportesMes}</div><div class="stat-label">Reportes del mes</div></div>
        <div class="stat-card"><div class="stat-num">${asisHoy}</div><div class="stat-label">Asistencia hoy</div></div>
      </div>
      <div class="section-block">
        <div class="section-title"><span class="ico">👤</span> Residentes</div>
        <div class="resident-grid">
          ${RESIDENTES.map(r => `
            <div class="card resident-card" style="border-left:4px solid ${r.color}">
              <div class="avatar" style="background:${r.color}">${r.avatar}</div>
              <div class="resident-info">
                <div class="resident-name">${r.nombre} <span class="badge" style="background:${TIPO_COLOR[r.tipo]};color:#fff;font-size:0.65rem;padding:2px 8px">Tipo ${r.tipo}</span></div>
                <div class="resident-detail">Hab. ${r.hab} · ${r.diagnostico}</div>
                <div class="resident-meta">
                  <span class="badge badge-info">${r.edad} años</span>
                  <span class="badge badge-neutral">Ingreso: ${r.ingreso}</span>
                  <span class="badge badge-lavanda">Fam: ${r.familiar}</span>
                  <span style="font-size:0.7rem;color:${TIPO_COLOR[r.tipo]};font-weight:600">${TIPO_DESC[r.tipo]}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    content.innerHTML = html;
  };

  // --- Calendario ---
  RENDERS.calendario = function () {
    renderCalendar(content, ACTIVIDADES, 'actividades');
  };

  function renderCalendar(container, items, type) {
    const firstDay = new Date(YEAR, MONTH, 1);
    const lastDay = new Date(YEAR, MONTH + 1, 0);
    const startPad = firstDay.getDay() || 7; // Monday first -> shift
    const daysInMonth = lastDay.getDate();
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const monthName = firstDay.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

    let grid = `<div class="card" style="padding:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <h3 style="font-family:var(--font-heading);">${capitalize(monthName)}</h3>
        <div><button class="btn btn-sm btn-secondary">◀</button><button class="btn btn-sm btn-secondary" style="margin-left:6px">▶</button></div>
      </div>
      <div class="calendar-grid">
        ${dayNames.map(d => `<div class="cal-day-header">${d}</div>`).join('')}
    `;

    for (let i = 1; i < startPad; i++) {
      grid += `<div class="cal-day other-month"></div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(YEAR, MONTH, d);
      const today = date.toDateString() === NOW.toDateString();
      const dayItems = items.filter(it => it.fecha && it.fecha.toDateString() === date.toDateString());
      const ds = date.toISOString().slice(0, 10);
      grid += `<div class="cal-day ${today ? 'today' : ''}" data-date="${ds}">
        <span class="cal-day-num">${d}</span>
        ${dayItems.map(it => {
          const cat = it.categoria || (type === 'reuniones' ? 'reunion' : '');
          const cls = type === 'reuniones' ? 'evento' : (CAT_CLASSES[cat] || 'evento');
          return `<span class="cal-day-event ${cls}">${it.titulo || it.titulo}</span>`;
        }).join('')}
      </div>`;
    }
    const endPad = (7 - ((startPad - 1 + daysInMonth) % 7)) % 7;
    for (let i = 0; i < endPad; i++) {
      grid += `<div class="cal-day other-month"></div>`;
    }
    grid += `</div>`; // close grid

    // Legend + click handler for activities
    if (type === 'actividades') {
      grid += `<div class="cal-legend">
        ${CATEGORIAS.map(c => `<span class="cal-legend-item"><span class="cal-legend-dot" style="background:${CAT_COLORS[c]}"></span>${c}</span>`).join('')}
      </div>`;
    } else if (type === 'reuniones') {
      grid += `<div class="cal-legend">
        <span class="cal-legend-item"><span class="cal-legend-dot" style="background:var(--primary)"></span>Reuniones</span>
      </div>`;
    }
    grid += `</div>`;
    container.innerHTML = grid;

    // Attach day click handler
    container.addEventListener('click', function (e) {
      const dayEl = e.target.closest('.cal-day');
      if (!dayEl || dayEl.classList.contains('other-month')) return;
      const ds = dayEl.dataset.date;
      if (!ds) return;
      const clickedItems = items.filter(it => it.fecha && it.fecha.toISOString().slice(0, 10) === ds);
      if (!clickedItems.length) return;
      const d = new Date(ds + 'T12:00:00');
      const title = type === 'actividades' ? 'Actividades' : 'Reuniones';
      let body = `<div style="min-width:400px">
        <p style="margin-bottom:12px;font-weight:600">📅 ${capitalize(d.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))}</p>
        ${clickedItems.map(it => {
          if (type === 'actividades') {
            const participantes = (it.residentesIds || []).map(id => residentePorId(id)).filter(Boolean);
            return `<div class="card" style="margin-bottom:10px">
              <div class="card-header">
                <strong>${it.titulo}</strong>
                <span class="badge badge-info">${it.categoria || ''}</span>
              </div>
              <div class="card-body">
                <p style="font-size:0.85rem">🕐 ${fmtTime(it.fecha)} · 📍 ${it.lugar}</p>
                <p style="font-size:0.82rem;color:var(--text-secondary)"><strong>Tallerista:</strong> ${it.tallerista}</p>
                <div style="margin-top:8px">
                  <strong style="font-size:0.82rem">Participantes (${participantes.length}):</strong>
                  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
                    ${participantes.map(p => `<span class="badge" style="background:${p.color};color:#fff">${p.nombre}</span>`).join('')}
                  </div>
                  ${it.residentesIds && it.residentesIds.length > 0 ? `
                    <p style="margin-top:6px;font-size:0.8rem;color:var(--text-muted)">🏥 Total: ${it.residentesIds.length} residentes</p>
                  ` : ''}
                </div>
              </div>
            </div>`;
          } else {
            return `<div class="card" style="margin-bottom:10px">
              <div class="card-header">
                <strong>${it.titulo}</strong>
                <span class="badge badge-info">${it.modalidad}</span>
              </div>
              <div class="card-body">
                <p style="font-size:0.85rem">🕐 ${fmtTime(it.fecha)} · 📍 ${it.lugar || 'Virtual'}</p>
                <p style="font-size:0.82rem;color:var(--text-secondary)"><strong>Participantes:</strong> ${(it.participantes || []).join(', ')}</p>
              </div>
            </div>`;
          }
        }).join('')}
      </div>`;
      openModal(title + ' del ' + d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' }), body);
    });
  }

  // --- Asistencia ---
  RENDERS.asistencia = function () {
    let html = `
      <div class="section-block">
        <div class="section-title"><span class="ico">✅</span> Control de Asistencia · ${capitalize(new Date(YEAR, MONTH).toLocaleDateString('es-AR',{month:'long',year:'numeric'}))}</div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Residente</th><th>Hab.</th><th>Estado hoy</th><th>Asistencia semanal</th><th>Próxima actividad</th></tr></thead>
            <tbody>
              ${RESIDENTES.map(r => {
                const act = ACTIVIDADES.filter(a => a.residentesIds.includes(r.id));
                const semAct = act.filter(a => a.fecha > new Date(YEAR, MONTH, NOW.getDate() - 7));
                const next = act.find(a => a.fecha >= NOW);
                return `<tr>
                  <td><strong>${r.nombre}</strong></td>
                  <td>${r.hab}</td>
                  <td><span class="badge badge-success">Presente</span></td>
                  <td>${semAct.length}/${ACTIVIDADES.filter(a => a.fecha > new Date(YEAR, MONTH, NOW.getDate() - 7)).length} actividades</td>
                  <td>${next ? fmtShort(next.fecha) + ' · ' + next.titulo : '—'}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    content.innerHTML = html;
  };

  // --- Reportes de Salud ---
  RENDERS.reportes = function () {
    let html = `
      <div class="info-banner">🔒 Información confidencial y trazable. Solo accesible para personal autorizado. Fuente: Historial clínico Nexup.</div>
      <div class="section-block">
        <div class="section-title"><span class="ico">📋</span> Reportes Clínicos</div>
        <div class="timeline">
          ${REPORTES.slice(0, 10).map(r => {
            const estClass = { 'Estable': 'badge-success', 'En observación': 'badge-warning', 'Mejorando': 'badge-info' }[r.estadoGeneral] || 'badge-neutral';
            return `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="card card-accent-${r.estadoGeneral === 'Estable' ? 'g' : r.estadoGeneral === 'En observación' ? 'w' : 'p'}">
                  <div class="card-header">
                    <div><strong>${r.residente}</strong> · <span class="badge ${estClass}">${r.estadoGeneral}</span></div>
                    <small>${fmtDate(r.fecha)} · ${r.periodo}</small>
                  </div>
                  <div class="card-body">
                    <p>${r.evolucion}</p>
                    <div class="vitals-grid">
                      <div class="vital-item"><div class="vital-label">Presión</div><div class="vital-value">${r.signos.presion}</div></div>
                      <div class="vital-item"><div class="vital-label">FC</div><div class="vital-value">${r.signos.fc}</div></div>
                      <div class="vital-item"><div class="vital-label">Temperatura</div><div class="vital-value">${r.signos.temp}</div></div>
                      <div class="vital-item"><div class="vital-label">SatO₂</div><div class="vital-value">${r.signos.sat}</div></div>
                    </div>
                  </div>
                  <div class="card-foot" style="display:flex;justify-content:flex-end">
                    <button class="btn btn-sm btn-outline ver-reporte-btn" data-rep-id="${r.id}">📄 Ver informe completo</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    content.innerHTML = html;
    // Wire up "Ver informe completo" buttons
    content.querySelectorAll('.ver-reporte-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const rid = this.dataset.repId;
        const r = REPORTES.find(x => x.id === rid);
        if (!r) return;
        const estClass = { 'Estable': 'badge-success', 'En observación': 'badge-warning', 'Mejorando': 'badge-info' }[r.estadoGeneral] || 'badge-neutral';
        openModal('Informe completo — ' + r.residente, `
          <div style="min-width:360px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
              <span class="badge ${estClass}" style="font-size:0.85rem;padding:4px 14px">${r.estadoGeneral}</span>
              <small>${fmtDate(r.fecha)} · ${r.periodo}</small>
            </div>
            <div class="info-banner">🔒 Información confidencial. Fuente: Historial clínico Nexup.</div>
            <div style="margin:14px 0">
              <h4>Evolución</h4>
              <p>${r.evolucion}</p>
            </div>
            <div style="margin:14px 0">
              <h4>Signos Vitales</h4>
              <div class="vitals-grid">
                <div class="vital-item"><div class="vital-label">Presión Arterial</div><div class="vital-value">${r.signos.presion}</div></div>
                <div class="vital-item"><div class="vital-label">Frecuencia Cardíaca</div><div class="vital-value">${r.signos.fc}</div></div>
                <div class="vital-item"><div class="vital-label">Temperatura</div><div class="vital-value">${r.signos.temp}</div></div>
                <div class="vital-item"><div class="vital-label">Saturación O₂</div><div class="vital-value">${r.signos.sat}</div></div>
              </div>
            </div>
            <div style="margin:14px 0;font-size:0.85rem">
              <p><strong>Residente:</strong> ${r.residente}</p>
              <p><strong>Fecha del reporte:</strong> ${fmtDate(r.fecha)}</p>
              <p><strong>Período:</strong> ${r.periodo}</p>
              <p><strong>ID del reporte:</strong> ${r.id}</p>
            </div>
          </div>
        `, '<button class="btn btn-secondary" onclick="document.getElementById(\'modal-overlay\').style.display=\'none\'">Cerrar</button>');
      });
    });
  };

  // --- Mensajes (WhatsApp-style) ---
  RENDERS.mensajes = function () {
    const contactos = THREADS.map(t => ({
      id: t.id,
      name: t.participants.filter(p => !p.includes('Laura'))[0] || t.participants[1],
      subject: t.subject,
      lastMsg: t.messages[t.messages.length - 1],
      messages: t.messages,
      unread: t.messages.filter(m => m.side === 'received' && new Date(m.time) > new Date(YEAR, MONTH, NOW.getDate() - 2)).length,
      avatar: t.id === 't-1' ? 'EN' : t.id === 't-2' ? 'CO' : 'DI',
      color: t.id === 't-1' ? '#10B981' : t.id === 't-2' ? '#7C3AED' : '#EF4444',
    }));

    let html = `
      <div class="section-block">
        <div class="section-title"><span class="ico">💬</span> Centro de Mensajería</div>
        <div class="chat-app" id="chat-app">
          <div class="chat-list" id="chat-list">
            <div class="chat-list-header">💬 Conversaciones</div>
            ${contactos.map((c, i) => `
              <div class="chat-list-item ${i === 0 ? 'active' : ''}" data-chat-id="${c.id}">
                <div class="chat-list-avatar" style="background:${c.color}">${c.avatar}</div>
                <div class="chat-list-info">
                  <div class="chat-list-name">${c.name}</div>
                  <div class="chat-list-preview">${c.lastMsg.text}</div>
                </div>
                <div class="chat-list-meta">
                  <div class="chat-list-time">${fmtTime(c.lastMsg.time)}</div>
                  ${c.unread > 0 ? `<span class="chat-list-unread">${c.unread}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          <div class="chat-conversation" id="chat-conversation">
            ${renderChatConv(contactos[0])}
          </div>
        </div>
      </div>
    `;
    content.innerHTML = html;

    // Chat list click handler
    const chatList = $id('chat-list');
    const convArea = $id('chat-conversation');
    if (chatList) {
      chatList.addEventListener('click', function (e) {
        const item = e.target.closest('.chat-list-item');
        if (!item) return;
        chatList.querySelectorAll('.chat-list-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        const c = contactos.find(x => x.id === item.dataset.chatId);
        if (c) convArea.innerHTML = renderChatConv(c);
      });
    }
    // Wire send button (delegation, once)
    wireChatSend(convArea, contactos);
  };

  function wireChatSend(container, contactos) {
    if (!container) return;
    container.addEventListener('click', function (e) {
      const btn = e.target.closest('.msg-wa-send');
      if (!btn) return;
      const cid = btn.dataset.chatId;
      const chat = contactos.find(x => x.id === cid);
      if (!chat) return;
      const input = document.getElementById('msg-input-' + cid);
      if (!input) return;
      const txt = input.value.trim();
      if (!txt) return;
      const msgs = document.getElementById('conv-msgs-' + cid);
      if (!msgs) return;
      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble sent';
      bubble.style.maxWidth = '75%';
      bubble.innerHTML = `<strong style="font-size:0.78rem">Laura Mendoza</strong><br>${txt}<span class="msg-time">${fmtTime(new Date())} · Visto</span>`;
      msgs.appendChild(bubble);
      msgs.scrollTop = msgs.scrollHeight;
      input.value = '';
      setTimeout(() => {
        const res = document.createElement('div');
        res.className = 'msg-bubble received';
        res.style.maxWidth = '75%';
        const respuestas = ['Gracias por tu mensaje. Te responderemos a la brevedad.', 'Hemos recibido tu consulta. El equipo la está revisando.', 'Queda registrado. Te confirmamos por esta vía.'];
        res.innerHTML = `<strong style="font-size:0.78rem">${chat.name}</strong><br>${respuestas[Math.floor(Math.random() * respuestas.length)]}<span class="msg-time">${fmtTime(new Date())} · Recibido</span>`;
        msgs.appendChild(res);
        msgs.scrollTop = msgs.scrollHeight;
      }, 1200);
    });
    // Enter to send
    container.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const input = e.target.closest('.chat-conv-input')?.querySelector('input');
        if (input) {
          const sendBtn = input.closest('.chat-conv-input')?.querySelector('.msg-wa-send');
          if (sendBtn) sendBtn.click();
        }
      }
    });
  }

  function renderChatConv(chat) {
    if (!chat) return '<div class="chat-empty">💬<span>Seleccioná una conversación</span></div>';
    return `
      <div class="chat-conv-header">
        <div class="chat-list-avatar" style="background:${chat.color};width:38px;height:38px;font-size:0.7rem">${chat.avatar}</div>
        <div>
          <div class="chat-conv-name">${chat.name}</div>
          <div class="chat-conv-status">● En línea</div>
        </div>
      </div>
      <div class="chat-conv-messages" id="conv-msgs-${chat.id}" style="flex:1">
        ${chat.messages.map(m => `
          <div class="msg-bubble ${m.side}" style="max-width:75%">
            <strong style="font-size:0.78rem">${m.from}</strong><br>
            ${m.text}
            <span class="msg-time">${fmtTime(m.time)} · ${m.side === 'sent' ? 'Visto' : 'Recibido'}</span>
          </div>
        `).join('')}
      </div>
      <div class="chat-conv-input">
        <input type="text" class="form-control" placeholder="Escribí un mensaje..." id="msg-input-${chat.id}" />
        <button class="btn btn-primary btn-sm msg-wa-send" data-chat-id="${chat.id}">Enviar</button>
      </div>
    `;
  }

  // --- Reuniones (INTERNO) — now with private calendar ---
  RENDERS.reuniones = function () {
    const prox = REUNIONES.find(r => r.proxima);
    const pasadas = REUNIONES.filter(r => !r.proxima);

    let html = `
      <div class="section-block">
        <div class="section-title"><span class="ico">🤝</span> Gestión de Reuniones</div>
        <div class="cols-2">
          <div>
            <h3 style="font-family:var(--font-body);font-size:1rem;margin-bottom:12px;font-weight:600;">📅 Calendario de Reuniones</h3>
            <div id="reuniones-cal"></div>
          </div>
          <div>
            <div class="card" style="padding:16px">
              <h4 style="font-size:0.9rem;margin-bottom:10px;font-family:var(--font-body)">📌 Próxima reunión</h4>
              ${prox ? `
                <div style="display:flex;gap:12px;align-items:center">
                  <div class="meeting-date-box" style="min-width:48px;padding:6px 10px">
                    <div class="meeting-date-num" style="font-size:1.2rem">${prox.fecha.getDate()}</div>
                    <div class="meeting-date-month" style="font-size:0.6rem">${prox.fecha.toLocaleDateString('es-AR', { month: 'short' })}</div>
                  </div>
                  <div style="flex:1;min-width:0">
                    <strong style="font-size:0.85rem">${prox.titulo}</strong>
                    <div style="display:flex;gap:8px;font-size:0.75rem;color:var(--text-secondary);flex-wrap:wrap;margin-top:2px">
                      <span>🕐 ${fmtTime(prox.fecha)}</span>
                      <span>📍 ${prox.lugar || 'Virtual'}</span>
                      <span class="badge badge-info">${prox.modalidad}</span>
                    </div>
                  </div>
                </div>
              ` : '<p style="font-size:0.85rem;color:var(--text-muted)">No hay reuniones próximas agendadas.</p>'}
            </div>
            <div class="card" style="padding:16px;margin-top:12px">
              <h4 style="font-size:0.9rem;margin-bottom:8px;font-family:var(--font-body)">📊 Totales</h4>
              <p style="font-size:0.82rem;color:var(--text-secondary)">
                ${REUNIONES.length} reuniones registradas · 
                ${REUNIONES.filter(r => r.conformidad === 'Alta').length} con conformidad alta ·
                ${REUNIONES.filter(r => r.modalidad === 'Presencial').length} presenciales ·
                ${REUNIONES.filter(r => r.modalidad === 'Virtual').length} virtuales
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="section-block" style="margin-top:20px;">
        <div class="section-title"><span class="ico">📜</span> Historial de Minutas</div>
        <div class="card">
          ${REUNIONES.map(r => `
            <div class="minuta-item" onclick="this.classList.toggle('expanded')">
              <div class="minuta-summary">
                <div>
                  <strong>${r.titulo}</strong>
                  <span style="font-size:0.75rem;color:var(--text-muted);display:block">${fmtDate(r.fecha)} · ${r.modalidad} ${r.lugar ? '· ' + r.lugar : ''}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  ${r.proxima ? '<span class="badge badge-danger">Próxima</span>' : `<span class="badge ${r.conformidad === 'Alta' ? 'badge-success' : 'badge-warning'}">${r.conformidad}</span>`}
                  <span style="font-size:0.7rem;color:var(--text-muted)">▼</span>
                </div>
              </div>
              <div class="minuta-details">
                <div class="info-banner" style="margin:8px 0">📋 Registro de observaciones de la reunión</div>
                <p>${r.minuta}</p>
                <div style="margin-top:8px;font-size:0.82rem">
                  <strong>Participantes:</strong> ${r.participantes.join(', ')}<br>
                  ${r.proxima ? '' : `<strong>Conformidad:</strong> ${r.conformidad}`}
                </div>
                <button class="btn btn-sm btn-secondary" style="margin-top:8px">📄 Descargar minuta</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    content.innerHTML = html;

    // Render calendar inside
    const calContainer = $id('reuniones-cal');
    if (calContainer) {
      renderCalendar(calContainer, REUNIONES, 'reuniones');
    }
  };

  // --- Evaluaciones ---
  RENDERS.evaluaciones = function () {
    const evalData = ACTIVIDADES.slice(0, 12).map(a => {
      const califs = ['Excelente', 'Buena', 'Regular'];
      const calif = califs[Math.floor(Math.random() * 3)];
      const obs = [
        'Participación activa del grupo. Se cumplieron los objetivos.',
        'Buena respuesta de los residentes. Actividad muy bien recibida.',
        'Se observó gran entusiasmo. Se recomienda repetir la actividad.',
        'Participación moderada. Algunos residentes mostraron desinterés.',
        'Excelente dinamismo grupal. Se fortalecieron vínculos interpersonales.',
      ];
      return {
        ...a,
        calificacion: calif,
        observaciones: obs[Math.floor(Math.random() * obs.length)],
        destacados: ['Trabajo en equipo', 'Creatividad', 'Motricidad fina', 'Socialización', 'Memoria'][Math.floor(Math.random() * 5)],
        recomendacion: ['Continuar con la frecuencia actual', 'Aumentar a 2 veces por semana', 'Incorporar variante musical', 'Mantener grupo reducido'][Math.floor(Math.random() * 4)],
      };
    });

    let html = `
      <div class="section-block">
        <div class="section-title"><span class="ico">📝</span> Evaluaciones Post-Actividad</div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Actividad</th><th>Fecha</th><th>Participación</th><th>Evaluación</th><th>Acción</th></tr></thead>
            <tbody>
              ${evalData.map(a => `
                <tr>
                  <td><strong>${a.titulo}</strong></td>
                  <td>${fmtDate(a.fecha)}</td>
                  <td>${a.residentesIds.length} residentes</td>
                  <td><span class="badge ${a.calificacion === 'Excelente' ? 'badge-success' : a.calificacion === 'Buena' ? 'badge-info' : 'badge-warning'}">${a.calificacion}</span></td>
                  <td><button class="btn btn-xs btn-outline ver-eval-btn" data-eval-titulo="${a.titulo}" data-eval-fecha="${fmtDate(a.fecha)}" data-eval-calif="${a.calificacion}" data-eval-obs="${a.observaciones}" data-eval-dest="${a.destacados}" data-eval-rec="${a.recomendacion}" data-eval-part="${a.residentesIds.length}" data-eval-cat="${a.categoria}" data-eval-tallerista="${a.tallerista}">Ver evaluación</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    content.innerHTML = html;

    // Wire up "Ver evaluación" buttons
    content.querySelectorAll('.ver-eval-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        openModal('Evaluación: ' + this.dataset.evalTitulo, `
          <div style="min-width:360px">
            <div class="info-banner" style="margin-bottom:14px">
              📋 Evaluación post-actividad · ${this.dataset.evalCategoria}
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0">
              <div class="vital-item"><div class="vital-label">Fecha</div><div class="vital-value" style="font-size:0.9rem">${this.dataset.evalFecha}</div></div>
              <div class="vital-item"><div class="vital-label">Calificación</div><div class="vital-value" style="font-size:0.9rem">${this.dataset.evalCalif}</div></div>
              <div class="vital-item"><div class="vital-label">Participantes</div><div class="vital-value" style="font-size:0.9rem">${this.dataset.evalPart} residentes</div></div>
              <div class="vital-item"><div class="vital-label">Tallerista</div><div class="vital-value" style="font-size:0.9rem">${this.dataset.evalTallerista}</div></div>
            </div>
            <div style="margin:14px 0">
              <h4>Observaciones</h4>
              <p>${this.dataset.evalObs}</p>
            </div>
            <div style="margin:14px 0">
              <h4>Aspecto destacado</h4>
              <span class="badge badge-lavanda" style="font-size:0.85rem">✨ ${this.dataset.evalDest}</span>
            </div>
            <div style="margin:14px 0">
              <h4>Recomendación</h4>
              <p style="color:var(--text-secondary)">${this.dataset.evalRec}</p>
            </div>
          </div>
        `, '<button class="btn btn-secondary" onclick="document.getElementById(\'modal-overlay\').style.display=\'none\'">Cerrar</button>');
      });
    });
  };

  // ========================================================================
  // SIDEBAR NAV INTERNAL
  // ========================================================================

  $$('#internal-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', function () {
      renderInternalView(this.dataset.view);
    });
  });

  $id('menu-toggle')?.addEventListener('click', function () {
    $id('sidebar').classList.toggle('open');
    $id('sidebar-overlay').classList.toggle('show');
  });
  $id('sidebar-overlay')?.addEventListener('click', function () {
    $id('sidebar').classList.remove('open');
    this.classList.remove('show');
  });

  // ========================================================================
  // PORTAL FAMILIAR
  // ========================================================================

  let currentFamView = 'inicio';
  let currentFamResident = 1; // María López by default
  const famContent = $id('fam-content');
  const famPageTitle = $id('fam-page-title');

  // Populate resident selector
  const famSelect = $id('fam-resident-select');
  const famResName = $id('fam-res-name');
  const famTopRes = $id('fam-top-residente');

  function updateFamResidentInfo() {
    const res = residentePorId(currentFamResident);
    if (res) {
      famResName.textContent = res.nombre;
      famTopRes.textContent = `${res.nombre} · Hab. ${res.hab}`;
    }
  }

  // Filtered data for current resident
  function reportsForResident() {
    return REPORTES.filter(r => r.residenteId === currentFamResident);
  }
  function activitiesForResident() {
    return ACTIVIDADES.filter(a => a.residentesIds.includes(currentFamResident));
  }
  function invitationsForResident() {
    const res = residentePorId(currentFamResident);
    return ACTIVIDADES.filter(a =>
      a.invitaciones.some(i => i.residenteId === currentFamResident)
    ).map(a => ({
      ...a,
      miInvitacion: a.invitaciones.find(i => i.residenteId === currentFamResident),
    }));
  }

  function renderFamView(view) {
    currentFamView = view;
    const titles = {
      inicio: 'Inicio',
      reportes: 'Reportes de Salud',
      calendario: 'Calendario de Actividades',
      invitaciones: 'Invitaciones',
      mensajes: 'Centro de Mensajería',
      reuniones: 'Reuniones y Seguimiento',
    };
    famPageTitle.textContent = titles[view] || 'Inicio';

    // Update sidebar and bottom nav
    $$('[data-fam-view]').forEach(b => {
      b.classList.toggle('active', b.dataset.famView === view);
    });

    if (FAM_RENDERS[view]) FAM_RENDERS[view]();
    else famContent.innerHTML = '<p>Sección en construcción</p>';
  }

  const FAM_RENDERS = {};

  // --- Inicio (Dashboard) ---
  FAM_RENDERS.inicio = function () {
    const res = residentePorId(currentFamResident);
    const reps = reportsForResident();
    const acts = activitiesForResident();
    const proxAct = acts.find(a => a.fecha >= NOW);
    const ultRep = reps[0];
    const invPend = invitationsForResident().filter(a => a.miInvitacion.estado === 'pendiente');

    let html = `
      <div class="fam-cards-row">
        <div class="stat-card"><div class="stat-num">${reps.length}</div><div class="stat-label">Reportes disponibles</div></div>
        <div class="stat-card"><div class="stat-num">${acts.length}</div><div class="stat-label">Actividades del mes</div></div>
        <div class="stat-card"><div class="stat-num">${invPend.length}</div><div class="stat-label">Invitaciones pendientes</div></div>
        <div class="stat-card"><div class="stat-num">${REUNIONES.filter(r => r.proxima).length}</div><div class="stat-label">Próxima reunión</div></div>
      </div>

      <div class="section-block">
        <div class="section-title"><span class="ico">👤</span> Resumen de ${res ? res.nombre : ''}</div>
        <div class="card">
          <div class="card-body">
            <p style="margin-bottom:8px"><strong>Diagnóstico:</strong> ${res ? res.diagnostico : ''} · <strong>Habitación:</strong> ${res ? res.hab : ''} · <strong>Ingreso:</strong> ${res ? res.ingreso : ''}</p>
            ${ultRep ? `
              <div class="section-divider"></div>
              <div class="section-title" style="font-size:0.95rem;margin-bottom:6px"><span class="ico">📋</span> Último Reporte</div>
              <p style="font-size:0.88rem">${ultRep.evolucion}</p>
              <div class="vitals-grid" style="margin-top:8px">
                <div class="vital-item"><div class="vital-label">Presión</div><div class="vital-value">${ultRep.signos.presion}</div></div>
                <div class="vital-item"><div class="vital-label">FC</div><div class="vital-value">${ultRep.signos.fc}</div></div>
                <div class="vital-item"><div class="vital-label">Temperatura</div><div class="vital-value">${ultRep.signos.temp}</div></div>
                <div class="vital-item"><div class="vital-label">SatO₂</div><div class="vital-value">${ultRep.signos.sat}</div></div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <div class="section-block">
        <div class="section-title"><span class="ico">📅</span> Próxima Actividad</div>
        ${proxAct ? `
          <div class="actividad-item" style="border-left:4px solid ${CAT_COLORS[proxAct.categoria] || '#2563EB'}">
            <div class="act-date-box">
              <div class="act-date-day">${proxAct.fecha.getDate()}</div>
              <div class="act-date-month">${proxAct.fecha.toLocaleDateString('es-AR', { month: 'short' })}</div>
            </div>
            <div class="actividad-info">
              <div class="actividad-title">${proxAct.titulo}</div>
              <div class="actividad-meta">
                <span>🕐 ${fmtTime(proxAct.fecha)}</span>
                <span>📍 ${proxAct.lugar}</span>
                <span class="badge badge-info">${proxAct.categoria}</span>
              </div>
            </div>
          </div>
        ` : '<p>No hay actividades próximas.</p>'}
      </div>

      <div class="section-block">
        <div class="section-title"><span class="ico">🔔</span> Notificaciones Recientes</div>
        ${NOTIFICACIONES.slice(0, 3).map(n => `
          <div class="card" style="margin-bottom:8px;padding:12px 16px;display:flex;align-items:center;gap:10px;border-left:3px solid ${n.tipo === 'warning' ? 'var(--warning)' : n.tipo === 'success' ? 'var(--success)' : 'var(--info)'}">
            <span style="font-size:1.2rem">${n.tipo === 'warning' ? '⚠️' : n.tipo === 'success' ? '✅' : 'ℹ️'}</span>
            <div style="flex:1"><span style="font-size:0.88rem">${n.texto}</span><br><small>${fmtDate(n.fecha)}</small></div>
            ${!n.leida ? '<span class="badge badge-danger">Nueva</span>' : ''}
          </div>
        `).join('')}
      </div>
    `;
    famContent.innerHTML = html;
  };

  // --- Reportes de Salud (with AI Chat) ---
  FAM_RENDERS.reportes = function () {
    const reps = reportsForResident();

    let html = `
      <div class="info-banner">🔒 Información confidencial y trazable. Solo accesible para familiares autorizados. Fuente: Historial clínico Nexup.</div>
      <div class="cols-2-60-40">
        <div>
          <div class="section-title" style="font-size:1rem"><span class="ico">📋</span> Historial de Reportes</div>
          ${reps.length ? reps.slice(0, 6).map(r => {
            const estClass = { 'Estable': 'badge-success', 'En observación': 'badge-warning', 'Mejorando': 'badge-info' }[r.estadoGeneral] || 'badge-neutral';
            return `
              <div class="card card-accent-${r.estadoGeneral === 'Estable' ? 'g' : r.estadoGeneral === 'En observación' ? 'w' : 'p'}" style="margin-bottom:14px">
                <div class="card-header">
                  <div><span class="badge ${estClass}" style="font-size:0.75rem">${r.estadoGeneral}</span></div>
                  <small>${fmtDate(r.fecha)} · ${r.periodo}</small>
                </div>
                <div class="card-body">
                  <p>${r.evolucion}</p>
                  <div class="vitals-grid">
                    <div class="vital-item"><div class="vital-label">Presión</div><div class="vital-value">${r.signos.presion}</div></div>
                    <div class="vital-item"><div class="vital-label">FC</div><div class="vital-value">${r.signos.fc}</div></div>
                    <div class="vital-item"><div class="vital-label">Temperatura</div><div class="vital-value">${r.signos.temp}</div></div>
                    <div class="vital-item"><div class="vital-label">SatO₂</div><div class="vital-value">${r.signos.sat}</div></div>
                  </div>
                </div>
                <div class="card-foot" style="display:flex;justify-content:space-between;align-items:center;font-size:0.75rem">
                  <span style="color:var(--text-muted)">📎 Integración Nexup</span>
                  <button class="btn btn-xs btn-outline ver-reporte-fam-btn" data-rep-id="${r.id}">📄 Ver informe completo</button>
                </div>
              </div>
            `;
          }).join('') : '<p>No hay reportes disponibles para este residente.</p>'}
        </div>

        <div class="chat-ia-col">
          <div class="section-title" style="font-size:1rem"><span class="ico">🤖</span> Asistente IA</div>
          <div class="chat-ia" id="chat-ia">
            <div class="chat-ia-header">
              <h3>Consultas sobre el reporte</h3>
              <small>Preguntame detalles específicos sobre la evolución de ${residentePorId(currentFamResident)?.nombre || 'tu familiar'}</small>
            </div>
            <div class="chat-ia-messages" id="chat-ia-msgs">
              <div class="chat-ia-msg bot">👋 Hola, soy el Asistente Virtual de la Residencia. Puedo ayudarte a interpretar los reportes clínicos de tu familiar. ¿Qué querés saber?</div>
            </div>
            <div class="chat-ia-suggestions">
              <button class="chat-ia-chip" data-prompt="¿Cómo estuvo su presión esta semana?">¿Cómo estuvo su presión?</button>
              <button class="chat-ia-chip" data-prompt="¿Participó en los talleres de memoria?">¿Participó en talleres?</button>
              <button class="chat-ia-chip" data-prompt="Explicame el ajuste de medicación">Explicame ajuste de medicación</button>
              <button class="chat-ia-chip" data-prompt="¿Cómo fue su evolución general?">¿Evolución general?</button>
            </div>
            <div class="chat-ia-input">
              <input type="text" class="form-control" id="chat-ia-input" placeholder="Escribí tu consulta..." />
              <button class="btn btn-primary btn-sm" id="chat-ia-send">Enviar</button>
            </div>
            <div class="chat-ia-footer">La IA procesa datos del informe. Para emergencias médicas, contactá directamente al equipo.</div>
          </div>
        </div>
      </div>
    `;
    famContent.innerHTML = html;

    // Wire up AI Chat
    const chatMsgs = $id('chat-ia-msgs');
    const chatInput = $id('chat-ia-input');
    const chatSend = $id('chat-ia-send');

    function addChatMsg(text, side) {
      const div = document.createElement('div');
      div.className = 'chat-ia-msg ' + side;
      div.textContent = text;
      chatMsgs.appendChild(div);
      chatMsgs.scrollTop = chatMsgs.scrollHeight;
    }

    function iaRespond(prompt) {
      addChatMsg(prompt, 'user');
      setTimeout(() => {
        const reps = reportsForResident();
        const lastRep = reps[0];
        const responses = {
          'presión': lastRep ? `En el último reporte (${fmtDate(lastRep.fecha)}), su presión arterial fue de ${lastRep.signos.presion}, dentro de parámetros normales para su edad y condición.` : 'No tengo datos de presión en los reportes cargados.',
          'taller': lastRep ? `Según el reporte del ${fmtDate(lastRep.fecha)}: "${lastRep.evolucion.toLowerCase().includes('particip') ? lastRep.evolucion : 'No se menciona participación específica en talleres en el último reporte.'}"` : 'No hay reportes cargados para consultar.',
          'medicación': lastRep ? `El último reporte indica que continúa con su plan de medicación habitual. Para cambios específicos, consultá directamente con el equipo médico.` : 'No tengo información sobre medicación en los reportes actuales.',
          'evolución': lastRep ? `Su estado general es **${lastRep.estadoGeneral}**. ${lastRep.evolucion}` : 'No hay reportes disponibles.',
        };
        let respuesta = 'No tengo información específica sobre esa consulta en los reportes cargados. ¿Podés reformular tu pregunta?';
        for (const [key, val] of Object.entries(responses)) {
          if (prompt.toLowerCase().includes(key)) {
            respuesta = val;
            break;
          }
        }
        addChatMsg(respuesta, 'bot');
      }, 600);
    }

    if (chatSend) {
      chatSend.addEventListener('click', function () {
        const txt = chatInput.value.trim();
        if (!txt) return;
        iaRespond(txt);
        chatInput.value = '';
      });
    }
    if (chatInput) {
      chatInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { chatSend?.click(); }
      });
    }
    // Chip buttons
    $$('.chat-ia-chip').forEach(chip => {
      chip.addEventListener('click', function () {
        iaRespond(this.dataset.prompt);
      });
    });
    // Wire up "Ver informe completo" buttons
    famContent.querySelectorAll('.ver-reporte-fam-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const rid = this.dataset.repId;
        const r = REPORTES.find(x => x.id === rid);
        if (!r) return;
        const estClass = { 'Estable': 'badge-success', 'En observación': 'badge-warning', 'Mejorando': 'badge-info' }[r.estadoGeneral] || 'badge-neutral';
        openModal('Informe completo — ' + r.residente, `
          <div style="min-width:360px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
              <span class="badge ${estClass}" style="font-size:0.85rem;padding:4px 14px">${r.estadoGeneral}</span>
              <small>${fmtDate(r.fecha)} · ${r.periodo}</small>
            </div>
            <div class="info-banner">🔒 Información confidencial. Fuente: Historial clínico Nexup.</div>
            <div style="margin:14px 0">
              <h4>Evolución</h4>
              <p>${r.evolucion}</p>
            </div>
            <div style="margin:14px 0">
              <h4>Signos Vitales</h4>
              <div class="vitals-grid">
                <div class="vital-item"><div class="vital-label">Presión Arterial</div><div class="vital-value">${r.signos.presion}</div></div>
                <div class="vital-item"><div class="vital-label">Frecuencia Cardíaca</div><div class="vital-value">${r.signos.fc}</div></div>
                <div class="vital-item"><div class="vital-label">Temperatura</div><div class="vital-value">${r.signos.temp}</div></div>
                <div class="vital-item"><div class="vital-label">Saturación O₂</div><div class="vital-value">${r.signos.sat}</div></div>
              </div>
            </div>
            <div style="margin:14px 0;font-size:0.85rem">
              <p><strong>Residente:</strong> ${r.residente}</p>
              <p><strong>Fecha del reporte:</strong> ${fmtDate(r.fecha)}</p>
              <p><strong>Período:</strong> ${r.periodo}</p>
              <p><strong>ID del reporte:</strong> ${r.id}</p>
            </div>
          </div>
        `, '<button class="btn btn-secondary" onclick="document.getElementById(\'modal-overlay\').style.display=\'none\'">Cerrar</button>');
      });
    });
  };

  // --- Calendario (two-column) ---
  FAM_RENDERS.calendario = function () {
    const acts = activitiesForResident();

    let html = `
      <div class="section-title" style="font-size:1rem"><span class="ico">📅</span> Calendario de Actividades</div>
      <div class="cols-2-60-40">
        <div id="fam-cal-col"></div>
        <div>
          <h3 style="font-family:var(--font-body);font-size:1rem;margin-bottom:12px;font-weight:600;">📋 Actividades del Mes</h3>
          <div style="max-height:500px;overflow-y:auto;padding-right:4px">
            ${acts.length ? acts.map(a => {
              const initAssist = a.invitaciones.filter(i => i.estado === 'confirmado').slice(0, 4);
              return `
                <div class="actividad-item" style="border-left:4px solid ${CAT_COLORS[a.categoria] || '#2563EB'}">
                  <div class="act-date-box">
                    <div class="act-date-day">${a.fecha.getDate()}</div>
                    <div class="act-date-month">${a.fecha.toLocaleDateString('es-AR', { month: 'short' })}</div>
                  </div>
                  <div class="actividad-info">
                    <div class="actividad-title">${a.titulo}</div>
                    <div class="actividad-meta">
                      <span>🕐 ${fmtTime(a.fecha)} hs</span>
                      <span>📍 ${a.lugar}</span>
                      <span>👥 ${a.invitaciones.filter(i => i.estado === 'confirmado').length}</span>
                      <span class="badge badge-info">${a.categoria}</span>
                    </div>
                    ${initAssist.length ? `
                      <div class="avatar-group">
                        ${initAssist.map((_, idx) => {
                          const letras = ['RC', 'CF', 'NQ', 'LP'][idx % 4];
                          const colores = ['#7C3AED', '#2563EB', '#10B981', '#F97316'];
                          return `<span class="avatar-initial" style="background:${colores[idx]}">${letras}</span>`;
                        }).join('')}
                        ${a.invitaciones.filter(i => i.estado === 'confirmado').length > 4 ? `<span class="avatar-initial" style="background:var(--text-muted)">+${a.invitaciones.filter(i => i.estado === 'confirmado').length - 4}</span>` : ''}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('') : '<p>No hay actividades para este residente.</p>'}
          </div>
        </div>
      </div>
    `;
    famContent.innerHTML = html;

    const calCol = $id('fam-cal-col');
    if (calCol) renderCalendar(calCol, acts, 'actividades');
  };

  // --- Invitaciones ---
  FAM_RENDERS.invitaciones = function () {
    const invs = invitationsForResident();
    const pendientes = invs.filter(a => a.miInvitacion.estado === 'pendiente');
    const confirmadas = invs.filter(a => a.miInvitacion.estado === 'confirmado');
    const declinadas = invs.filter(a => a.miInvitacion.estado === 'declinado');

    function renderInvitacion(a, cls) {
      if (!a.miInvitacion) return '';
      return `
        <div class="invitacion-card ${cls}" data-inv-id="${a.id}">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <strong style="font-size:1rem">${a.titulo}</strong><br>
              <span style="font-size:0.82rem;color:var(--text-secondary)">
                📅 ${fmtDate(a.fecha)} · 🕐 ${fmtTime(a.fecha)} · 📍 ${a.lugar}
              </span>
            </div>
            <span class="badge badge-info">${a.categoria}</span>
          </div>
          <p style="font-size:0.82rem;margin:6px 0;color:var(--text-muted)">
            Se te ha invitado a esta actividad porque <strong>${residentePorId(currentFamResident)?.nombre}</strong> participará en ella.
          </p>
          <div style="font-size:0.8rem;color:var(--text-secondary)">
            <strong>Tallerista:</strong> ${a.tallerista}
          </div>
          ${cls !== 'declined' ? `
            <div class="invitacion-actions">
              ${cls === 'pending' ? `
                <div class="invitacion-count-select">
                  <span>👥</span>
                  <select class="inv-count-select">
                    ${[1,2,3,4,5].map(n => `<option value="${n}" ${n === (a.miInvitacion.cantidad || 1) ? 'selected' : ''}>${n} ${n === 1 ? 'familiar' : 'familiares'}</option>`).join('')}
                  </select>
                </div>
                <button class="btn btn-success btn-sm btn-confirmar">✅ Confirmar Asistencia</button>
                <button class="btn btn-secondary btn-sm btn-declinar">❌ No podré asistir</button>
              ` : `
                <span class="badge badge-success">✅ Confirmado · ${a.miInvitacion.cantidad} ${a.miInvitacion.cantidad === 1 ? 'familiar' : 'familiares'}</span>
              `}
            </div>
          ` : '<span class="badge badge-neutral">❌ No asistirá</span>'}
        </div>
      `;
    }

    let html = `
      <div class="section-title"><span class="ico">🎟️</span> Invitaciones</div>

      ${pendientes.length ? `
        <div class="section-title" style="font-size:1rem;color:var(--warning)"><span class="ico">⏳</span> Pendientes (${pendientes.length})</div>
        ${pendientes.map(a => renderInvitacion(a, 'pending')).join('')}
        <div class="section-divider"></div>
      ` : ''}

      ${confirmadas.length ? `
        <div class="section-title" style="font-size:1rem;color:var(--success)"><span class="ico">✅</span> Confirmadas (${confirmadas.length})</div>
        ${confirmadas.map(a => renderInvitacion(a, 'confirmed')).join('')}
        <div class="section-divider"></div>
      ` : ''}

      ${declinadas.length ? `
        <div class="section-title" style="font-size:1rem;color:var(--text-muted)"><span class="ico">❌</span> Declinadas (${declinadas.length})</div>
        ${declinadas.map(a => renderInvitacion(a, 'declined')).join('')}
      ` : ''}

      ${!invs.length ? '<p>No hay invitaciones para este residente.</p>' : ''}
    `;
    famContent.innerHTML = html;

    // Wire up confirm/decline
    famContent.querySelectorAll('.btn-confirmar').forEach(btn => {
      btn.addEventListener('click', function () {
        const card = this.closest('.invitacion-card');
        const select = card.querySelector('.inv-count-select');
        const cant = select ? parseInt(select.value) : 1;
        card.classList.remove('pending');
        card.classList.add('confirmed');
        card.querySelector('.invitacion-actions').innerHTML = `<span class="badge badge-success">✅ Confirmado · ${cant} ${cant === 1 ? 'familiar' : 'familiares'}</span>`;
        showToast('Asistencia confirmada ✓', 'success');
        // Update badge
        const badge = $id('inv-badge');
        if (badge) {
          const remaining = famContent.querySelectorAll('.invitacion-card.pending').length;
          badge.textContent = remaining;
          if (remaining === 0) badge.style.display = 'none';
        }
      });
    });
    famContent.querySelectorAll('.btn-declinar').forEach(btn => {
      btn.addEventListener('click', function () {
        const card = this.closest('.invitacion-card');
        card.classList.remove('pending');
        card.classList.add('declined');
        const actions = card.querySelector('.invitacion-actions');
        actions.innerHTML = '<span class="badge badge-neutral">❌ No asistirá</span>';
        showToast('Invitación declinada', 'info');
        const badge = $id('inv-badge');
        if (badge) {
          const remaining = famContent.querySelectorAll('.invitacion-card.pending').length;
          badge.textContent = remaining;
          if (remaining === 0) badge.style.display = 'none';
        }
      });
    });
  };

  // --- Mensajes (WhatsApp-style) ---
  FAM_RENDERS.mensajes = function () {
    const isFamiliar = true;
    const contactos = THREADS.map(t => ({
      id: t.id,
      name: t.participants.filter(p => !p.includes('Sofía') && !p.includes('Familiar'))[0] || t.participants[1],
      subject: t.subject,
      lastMsg: t.messages[t.messages.length - 1],
      messages: t.messages,
      unread: t.messages.filter(m => m.side === 'received' && new Date(m.time) > new Date(YEAR, MONTH, NOW.getDate() - 3)).length,
      avatar: t.id === 't-1' ? 'EN' : t.id === 't-2' ? 'CO' : 'DI',
      color: t.id === 't-1' ? '#10B981' : t.id === 't-2' ? '#7C3AED' : '#EF4444',
    }));

    let html = `
      <div class="section-block">
        <div class="section-title"><span class="ico">💬</span> Mensajería</div>
        <div class="chat-app" id="fam-chat-app">
          <div class="chat-list" id="fam-chat-list">
            <div class="chat-list-header">💬 Conversaciones</div>
            ${contactos.map((c, i) => `
              <div class="chat-list-item ${i === 0 ? 'active' : ''}" data-chat-id="${c.id}">
                <div class="chat-list-avatar" style="background:${c.color}">${c.avatar}</div>
                <div class="chat-list-info">
                  <div class="chat-list-name">${c.name}</div>
                  <div class="chat-list-preview">${c.lastMsg.text}</div>
                </div>
                <div class="chat-list-meta">
                  <div class="chat-list-time">${fmtTime(c.lastMsg.time)}</div>
                  ${c.unread > 0 ? `<span class="chat-list-unread">${c.unread}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          <div class="chat-conversation" id="fam-chat-conv">
            ${renderFamChatConv(contactos[0])}
          </div>
        </div>
      </div>
    `;
    famContent.innerHTML = html;

    const chatList = $id('fam-chat-list');
    const convArea = $id('fam-chat-conv');
    if (chatList) {
      chatList.addEventListener('click', function (e) {
        const item = e.target.closest('.chat-list-item');
        if (!item) return;
        chatList.querySelectorAll('.chat-list-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        const c = contactos.find(x => x.id === item.dataset.chatId);
        if (c) convArea.innerHTML = renderFamChatConv(c);
      });
    }
    wireFamChatSend(convArea, contactos);
  };

  function renderFamChatConv(chat) {
    if (!chat) return '<div class="chat-empty">💬<span>Seleccioná una conversación</span></div>';
    return `
      <div class="chat-conv-header">
        <div class="chat-list-avatar" style="background:${chat.color};width:38px;height:38px;font-size:0.7rem">${chat.avatar}</div>
        <div>
          <div class="chat-conv-name">${chat.name}</div>
          <div class="chat-conv-status">● En línea</div>
        </div>
      </div>
      <div class="chat-conv-messages" id="fam-cmsg-${chat.id}" style="flex:1">
        ${chat.messages.map(m => `
          <div class="msg-bubble ${m.side}" style="max-width:75%">
            <strong style="font-size:0.78rem">${m.from}</strong><br>
            ${m.text}
            <span class="msg-time">${fmtTime(m.time)} · ${m.side === 'received' ? 'Leído por la institución' : 'Entregado'}</span>
          </div>
        `).join('')}
      </div>
      <div class="chat-conv-input">
        <input type="text" class="form-control" placeholder="Escribí un mensaje..." id="fam-input-${chat.id}" />
        <button class="btn btn-primary btn-sm fam-msg-send" data-chat-id="${chat.id}">Enviar</button>
      </div>
    `;
  }

  function wireFamChatSend(container, contactos) {
    if (!container) return;
    container.addEventListener('click', function (e) {
      const btn = e.target.closest('.fam-msg-send');
      if (!btn) return;
      const cid = btn.dataset.chatId;
      const chat = contactos.find(x => x.id === cid);
      if (!chat) return;
      const input = document.getElementById('fam-input-' + cid);
      if (!input) return;
      const txt = input.value.trim();
      if (!txt) return;
      const msgs = document.getElementById('fam-cmsg-' + cid);
      if (!msgs) return;
      const bubble = document.createElement('div');
      bubble.className = 'msg-bubble sent';
      bubble.style.maxWidth = '75%';
      bubble.innerHTML = `<strong style="font-size:0.78rem">Sofía López</strong><br>${txt}<span class="msg-time">${fmtTime(new Date())} · Entregado</span>`;
      msgs.appendChild(bubble);
      msgs.scrollTop = msgs.scrollHeight;
      input.value = '';
      setTimeout(() => {
        const res = document.createElement('div');
        res.className = 'msg-bubble received';
        res.style.maxWidth = '75%';
        const respuestas = ['Gracias por tu mensaje. Te responderemos a la brevedad.', 'Hemos recibido tu consulta. El equipo la está revisando.', 'Queda registrado. Te confirmamos por esta vía.'];
        const who = cid === 't-1' ? 'Enfermería' : cid === 't-2' ? 'Coordinación' : 'Administración';
        res.innerHTML = `<strong style="font-size:0.78rem">${who}</strong><br>${respuestas[Math.floor(Math.random() * respuestas.length)]}<span class="msg-time">${fmtTime(new Date())} · Leído por la institución</span>`;
        msgs.appendChild(res);
        msgs.scrollTop = msgs.scrollHeight;
      }, 1200);
    });
    container.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const input = e.target.closest('.chat-conv-input')?.querySelector('input');
        if (input) {
          const sendBtn = input.closest('.chat-conv-input')?.querySelector('.fam-msg-send');
          if (sendBtn) sendBtn.click();
        }
      }
    });
  }

  // --- Reuniones ---
  FAM_RENDERS.reuniones = function () {
    const prox = REUNIONES.find(r => r.proxima);
    const pasadas = REUNIONES.filter(r => !r.proxima);

    let html = `
      <div class="section-title"><span class="ico">🤝</span> Reuniones y Seguimiento</div>

      <div class="section-block">
        <div class="section-title" style="font-size:1rem;color:var(--primary)"><span class="ico">📅</span> Próxima Reunión</div>
        ${prox ? `
          <div class="meeting-card">
            <div class="meeting-date-box">
              <div class="meeting-date-num">${prox.fecha.getDate()}</div>
              <div class="meeting-date-month">${prox.fecha.toLocaleDateString('es-AR', { month: 'short' })}</div>
            </div>
            <div class="meeting-info">
              <h4>${prox.titulo}</h4>
              <div class="meeting-meta">
                <span>🕐 ${fmtTime(prox.fecha)}</span>
                <span>📍 ${prox.lugar || 'Virtual'}</span>
                <span class="badge badge-${prox.modalidad === 'Presencial' ? 'info' : 'lavanda'}">${prox.modalidad}</span>
              </div>
              <small style="margin-top:6px;display:block;">Participantes: ${prox.participantes.join(', ')}</small>
              ${prox.modalidad === 'Virtual' && prox.link ? `
                <button class="btn btn-primary btn-sm" style="margin-top:8px" onclick="window.open('${prox.link}','_blank')">🔗 Unirse a videollamada</button>
              ` : ''}
            </div>
          </div>
        ` : '<p>No hay reuniones agendadas próximamente.</p>'}
      </div>

      <div class="section-block">
        <div class="section-title" style="font-size:1rem"><span class="ico">📜</span> Historial de Reuniones</div>
        <div class="card">
          ${pasadas.length ? pasadas.map(r => `
            <div class="minuta-item" onclick="this.classList.toggle('expanded')">
              <div class="minuta-summary">
                <div>
                  <strong>${r.titulo}</strong><br>
                  <small>${fmtDate(r.fecha)} · ${r.modalidad} ${r.lugar ? '· ' + r.lugar : ''}</small>
                </div>
                <div>
                  <span class="badge ${r.conformidad === 'Alta' ? 'badge-success' : 'badge-warning'}">${r.conformidad}</span>
                  <span style="margin-left:8px;font-size:0.8rem">▼</span>
                </div>
              </div>
              <div class="minuta-details">
                <div class="info-banner" style="margin:8px 0">📋 Registro de observaciones de la reunión</div>
                <p>${r.minuta}</p>
                <div style="margin-top:8px;font-size:0.85rem">
                  <strong>Participantes:</strong> ${r.participantes.join(', ')}<br>
                  <strong>Conformidad del familiar:</strong> ${r.conformidad}
                </div>
                <button class="btn btn-sm btn-secondary" style="margin-top:8px">📄 Descargar minuta</button>
              </div>
            </div>
          `).join('') : '<p style="padding:16px">No hay reuniones pasadas registradas.</p>'}
        </div>
      </div>
    `;
    famContent.innerHTML = html;
  };

  // ========================================================================
  // FAMILY NAVIGATION EVENTS
  // ========================================================================

  // Sidebar nav
  $$('.fam-sidebar .sidebar-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.dataset.famView) renderFamView(this.dataset.famView);
    });
  });
  // Bottom nav
  $$('.fam-nav-item').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.dataset.famView) renderFamView(this.dataset.famView);
    });
  });

  // Sidebar toggle (mobile)
  $id('fam-menu-btn')?.addEventListener('click', function () {
    $id('fam-sidebar').classList.toggle('open');
    $id('fam-overlay').classList.toggle('show');
  });
  $id('fam-overlay')?.addEventListener('click', function () {
    $id('fam-sidebar').classList.remove('open');
    this.classList.remove('show');
  });

  // Resident selector
  famSelect?.addEventListener('change', function () {
    currentFamResident = parseInt(this.value);
    updateFamResidentInfo();
    renderFamView(currentFamView);
    // Close sidebar on mobile
    $id('fam-sidebar').classList.remove('open');
    $id('fam-overlay').classList.remove('show');
  });

  // ========================================================================
  // MODAL EVENTS
  // ========================================================================
  $id('modal-close')?.addEventListener('click', closeModal);
  $id('modal-overlay')?.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });

  // ========================================================================
  // INIT
  // ========================================================================

  // Populate resident selector
  const familiares = RESIDENTES.filter(r => r.familiar === 'Sofía López');
  if (famSelect) {
    famSelect.innerHTML = familiares.map(r =>
      `<option value="${r.id}" ${r.id === currentFamResident ? 'selected' : ''}>${r.nombre} · Hab. ${r.hab}</option>`
    ).join('');
  }
  // If there are no direct matches, show all
  if (!famSelect?.options.length) {
    famSelect.innerHTML = RESIDENTES.map(r =>
      `<option value="${r.id}" ${r.id === currentFamResident ? 'selected' : ''}>${r.nombre} · Hab. ${r.hab}</option>`
    ).join('');
  }

  updateFamResidentInfo();

  // Render initial views
  renderInternalView('panel');
  renderFamView('inicio');

})();
