(function () {
  'use strict';

  // ========================================================================
  // MOCK DATA
  // ========================================================================

  const TIPO_DESC = { A: 'Dependiente', B: 'Semidependiente', C: 'Autoválido', D: 'Independiente' };
  const TIPO_COLOR = { A: '#EF4444', B: '#F59E0B', C: '#10B981', D: '#2563EB' };

  const RESIDENTES = [
    { id: 1, nombre: 'María López', edad: 78, hab: '101', ingreso: '12/03/2024', diagnostico: 'Alzheimer temprano', familiar: 'Sofía López', avatar: 'ML', color: '#7C3AED', tipo: 'B', foto: 'https://i.pravatar.cc/120?img=32' },
    { id: 2, nombre: 'Juan Pérez', edad: 82, hab: '102', ingreso: '05/01/2023', diagnostico: 'Parkinson', familiar: 'Ana Pérez', avatar: 'JP', color: '#2563EB', tipo: 'B', foto: 'https://i.pravatar.cc/120?img=59' },
    { id: 3, nombre: 'Rosa Giménez', edad: 75, hab: '103', ingreso: '20/08/2024', diagnostico: 'Diabetes tipo 2', familiar: 'Carlos Giménez', avatar: 'RG', color: '#10B981', tipo: 'C', foto: 'https://i.pravatar.cc/120?img=44' },
    { id: 4, nombre: 'Pedro Sánchez', edad: 80, hab: '104', ingreso: '15/06/2023', diagnostico: 'Recuperación ACV', familiar: 'Lucía Sánchez', avatar: 'PS', color: '#F97316', tipo: 'A', foto: 'https://i.pravatar.cc/120?img=53' },
    { id: 5, nombre: 'Ana Martínez', edad: 85, hab: '105', ingreso: '02/11/2022', diagnostico: 'Artrosis severa', familiar: 'Martín Martínez', avatar: 'AM', color: '#EC4899', tipo: 'A', foto: 'https://i.pravatar.cc/120?img=47' },
    { id: 6, nombre: 'Carlos López', edad: 55, hab: '201', ingreso: '01/02/2025', diagnostico: 'Lesión medular', familiar: 'Sofía López', avatar: 'CL', color: '#8B5CF6', tipo: 'B', foto: 'https://i.pravatar.cc/120?img=11' },
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
      periodo: i < 14 ? 'Semanal' : 'Mensual',
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

  const REPORT_CHATS = {};
  const chatTemplates = [
    { from: 'Sofía López', text: 'Buenas tardes, quería consultar sobre el estado de mamá según este reporte.', time: new Date(YEAR, MONTH, 14, 9, 15), side: 'received' },
    { from: 'Laura Mendoza', text: 'Hola Sofía, todo conforme al reporte. Se mantiene estable y participando de actividades.', time: new Date(YEAR, MONTH, 14, 10, 30), side: 'sent' },
    { from: 'Sofía López', text: 'Perfecto, ¿hay algo que deba tener en cuenta para la próxima visita?', time: new Date(YEAR, MONTH, 14, 11, 0), side: 'received' },
    { from: 'Laura Mendoza', text: 'Podés traer ropa más liviana para la semana que viene. Estamos preparando actividades al aire libre.', time: new Date(YEAR, MONTH, 14, 11, 45), side: 'sent' },
  ];
  REPORTES.forEach((r, i) => {
    const offset = i * 3;
    REPORT_CHATS[r.id] = {
      id: 'rch-' + i,
      reporteId: r.id,
      residente: r.residente,
      participants: ['Familiar (Sofía)', 'Equipo Interdisciplinario'],
      messages: chatTemplates.map((m, mi) => ({
        ...m,
        from: m.from,
        text: mi === 0 ? `Consulto por el reporte de ${r.residente} (${fmtDate(r.fecha)}): ${r.evolucion.substring(0, 60)}...` : m.text,
        time: new Date(YEAR, MONTH, 14 + Math.floor(offset / 6), 9 + offset, (mi * 15) % 60),
      })),
    };
  });

  const REUNIONES = [
    {
      id: 'reu-1f2',
      titulo: 'Reunión mensual: Juan Pérez',
      fecha: new Date(YEAR, MONTH, 10, 10, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/juan-apr-10',
      proxima: true,
      estado: 'agendada',
      participantes: ['Dr. García', 'Lic. Fernández', 'Ana Pérez (Familiar)'],
      minuta: 'Pendiente de realización.',
      conformidad: 'Pendiente',
    },
    {
      id: 'reu-1f3',
      titulo: 'Reunión mensual: María López',
      fecha: new Date(YEAR, MONTH, 12, 9, 0),
      modalidad: 'Presencial',
      lugar: 'Sala de Reuniones 1er Piso',
      proxima: true,
      estado: 'cancelada',
      participantes: ['Laura M.', 'Dr. García', 'Sofía López (Familiar)'],
      minuta: 'Pendiente de realización.',
      conformidad: 'Pendiente',
    },
    {
      id: 'reu-1f4',
      titulo: 'Reunión mensual: Carlos Sánchez',
      fecha: new Date(YEAR, MONTH, 15, 11, 0),
      modalidad: 'Presencial',
      lugar: 'Consultorio 2',
      proxima: true,
      estado: 'pendiente',
      participantes: ['Laura M.', 'Dr. García', 'Martín Sánchez (Familiar)'],
      minuta: 'Pendiente de realización.',
      conformidad: 'Pendiente',
    },
    {
      id: 'reu-1f5',
      titulo: 'Reunión mensual: Rosa Giménez',
      fecha: new Date(YEAR, MONTH, 18, 14, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/ros-jun-18',
      proxima: true,
      estado: 'agendada',
      participantes: ['Dr. García', 'Lic. Fernández', 'Carlos Giménez (Familiar)'],
      minuta: 'Pendiente de realización.',
      conformidad: 'Pendiente',
    },
    {
      id: 'reu-1f6',
      titulo: 'Reunión mensual: María López',
      fecha: new Date(YEAR, MONTH, 20, 10, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/may-jun-20',
      proxima: true,
      estado: 'pendiente',
      participantes: ['Laura M. (Coordinación)', 'Dr. García', 'Sofía López (Familiar)'],
      minuta: 'Pendiente de realización.',
      conformidad: 'Pendiente',
    },
    {
      id: 'reu-1f7',
      titulo: 'Reunión mensual: Carlos Sánchez',
      fecha: new Date(YEAR, MONTH, 25, 10, 0),
      modalidad: 'Presencial',
      lugar: 'Salón Comedor Principal',
      proxima: true,
      estado: 'agendada',
      participantes: ['Laura M.', 'Dr. García', 'Martín Sánchez (Familiar)'],
      minuta: 'Pendiente de realización.',
      conformidad: 'Pendiente',
    },
    {
      id: 'reu-1f8',
      titulo: 'Reunión mensual: Rosa Giménez',
      fecha: new Date(YEAR, MONTH, 28, 11, 0),
      modalidad: 'Presencial',
      lugar: 'Sala de Reuniones 1er Piso',
      proxima: true,
      estado: 'pendiente',
      participantes: ['Dr. García', 'Lic. Fernández', 'Carlos Giménez (Familiar)'],
      minuta: 'Pendiente de realización.',
      conformidad: 'Pendiente',
    },
    // --- PASADAS ---
    {
      id: 'reu-p1',
      titulo: 'Reunión mensual: María López',
      fecha: new Date(YEAR, MONTH - 1, 18, 10, 0),
      modalidad: 'Presencial',
      lugar: 'Salón Comedor Principal',
      proxima: false,
      estado: 'agendada',
      participantes: ['Laura M.', 'Dr. García', 'Sofía López (Familiar)'],
      minuta: 'Se compartió la evolución general de María con la familia. Se resolvieron dudas sobre rutinas de medicación y horarios de visita. Se acordó seguimiento mensual.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-p2',
      titulo: 'Reunión mensual: Rosa Giménez',
      fecha: new Date(YEAR, MONTH - 1, 20, 11, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/abc-defg-hij',
      proxima: false,
      estado: 'agendada',
      participantes: ['Dr. García', 'Lic. Fernández', 'Carlos Giménez (Familiar)'],
      minuta: 'Evaluación mensual de Rosa. Se revisaron avances en estimulación cognitiva y se ajustó el plan de alimentación. La familia manifestó conformidad.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-p3',
      titulo: 'Reunión mensual: Juan Pérez',
      fecha: new Date(YEAR, MONTH - 1, 22, 14, 0),
      modalidad: 'Presencial',
      lugar: 'Consultorio 1',
      proxima: false,
      estado: 'agendada',
      participantes: ['Laura M.', 'Dr. García', 'Kinesióloga', 'Ana Pérez (Familiar)'],
      minuta: 'Revisión del plan de atención de Juan. Se evaluaron avances en fisioterapia y se ajustó plan nutricional para diabetes tipo 2.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-p4',
      titulo: 'Reunión mensual: María López',
      fecha: new Date(YEAR, MONTH - 2, 15, 10, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/mno-pqr-stu',
      proxima: false,
      estado: 'agendada',
      participantes: ['Laura M.', 'Dr. García', 'Sofía López (Familiar)'],
      minuta: 'Revisión bimestral de María. Se compartieron avances en talleres de memoria y se reforzó el plan de medicación. La familia se mostró conforme.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-p5',
      titulo: 'Reunión mensual: Carlos Sánchez',
      fecha: new Date(YEAR, MONTH - 2, 17, 11, 0),
      modalidad: 'Presencial',
      lugar: 'Sala de Reuniones 1er Piso',
      proxima: false,
      estado: 'agendada',
      participantes: ['Laura M.', 'Dr. García', 'Enfermería', 'Martín Sánchez (Familiar)'],
      minuta: 'Primer seguimiento tras el ingreso de Carlos. Se presentó el plan de atención y se definieron objetivos a corto plazo. Familia conforme.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-p6',
      titulo: 'Reunión mensual: Rosa Giménez',
      fecha: new Date(YEAR, MONTH - 2, 19, 11, 0),
      modalidad: 'Presencial',
      lugar: 'Salón Comedor Principal',
      proxima: false,
      estado: 'agendada',
      participantes: ['Dr. García', 'Lic. Fernández', 'Carlos Giménez (Familiar)'],
      minuta: 'Encuentro mensual con la familia Giménez. Se evaluó el estado general de Rosa, se planificaron actividades para el próximo mes. Se detectó leve deterioro en memoria a corto plazo.',
      conformidad: 'Media',
    },
    {
      id: 'reu-p7',
      titulo: 'Reunión mensual: Juan Pérez',
      fecha: new Date(YEAR, MONTH - 3, 10, 14, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/vwx-yza-bcd',
      proxima: false,
      estado: 'agendada',
      participantes: ['Dr. García', 'Lic. Fernández', 'Ana Pérez (Familiar)'],
      minuta: 'Evaluación trimestral de Juan. Se revisaron resultados de kinesiología y se ajustaron tiempos de actividad física. La familia pidió mayor comunicación sobre incidentes.',
      conformidad: 'Media',
    },
    {
      id: 'reu-p8',
      titulo: 'Reunión mensual: María López',
      fecha: new Date(YEAR, MONTH - 3, 12, 10, 0),
      modalidad: 'Presencial',
      lugar: 'Sala de Reuniones 1er Piso',
      proxima: false,
      estado: 'agendada',
      participantes: ['Laura M.', 'Dr. García', 'Sofía López (Familiar)'],
      minuta: 'Seguimiento trimestral de María. Se evaluaron resultados de estimulación cognitiva y se confirmó estabilidad del tratamiento. Se acordó aumentar participación en talleres.',
      conformidad: 'Alta',
    },
    {
      id: 'reu-p9',
      titulo: 'Reunión mensual: Carlos Sánchez',
      fecha: new Date(YEAR, MONTH - 3, 14, 11, 0),
      modalidad: 'Virtual',
      link: 'https://meet.google.com/efg-hij-klm',
      proxima: false,
      estado: 'agendada',
      participantes: ['Laura M.', 'Dr. García', 'Martín Sánchez (Familiar)'],
      minuta: 'Revisión del estado de Carlos tras un mes de ingreso. Se evaluó adaptación, participación en actividades y estado general. Se sugirió incrementar actividades recreativas.',
      conformidad: 'Baja',
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

  let currentEnv = 'familiar';

  const envBtns = $$('.env-btn');
  envBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      envBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const env = this.dataset.env;
      currentEnv = env;
      $id('env-interno').style.display = env === 'interno' ? 'flex' : 'none';
      $id('env-familiar').style.display = (env === 'familiar' || env === 'comunicacion') ? 'flex' : 'none';
      $$('.show-com').forEach(el => el.style.display = env === 'comunicacion' ? '' : 'none');
      $$('.show-fam').forEach(el => el.style.display = env === 'familiar' ? '' : 'none');
      if (env === 'familiar' || env === 'comunicacion') renderFamView(currentFamView);
      else renderInternalView(currentView);
    });
  });

  // ========================================================================
  // INTERNAL DASHBOARD
  // ========================================================================

  let currentView = 'calendario';
  const content = $id('content-interno');
  const pageTitle = $id('page-title');

  function renderInternalView(view) {
    currentView = view;
    pageTitle.textContent = {
      panel: 'Panel General', calendario: 'Calendario de Actividades',
      asistencia: 'Asistencia y Coordinación',
      evaluaciones: 'Evaluaciones Post-Actividad',
    }[view] || 'Panel General';

    $$('#internal-nav .nav-item').forEach(b => {
      b.classList.toggle('active', b.dataset.view === view);
    });

    // Update topbar actions FIRST (before render, so buttons exist)
    const actions = $id('topbar-actions');
    if (view === 'panel') {
      actions.innerHTML = '<button class="btn btn-primary" id="btn-nueva-actividad">+ Nueva Actividad</button>';
    } else if (view === 'calendario') {
      actions.innerHTML = '';
    } else {
      actions.innerHTML = '';
    }

    if (RENDERS[view]) RENDERS[view]();
    else content.innerHTML = '<p>Sección en construcción</p>';
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
                <img class="resident-foto" src="${r.foto}" alt="${r.nombre}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="avatar" style="background:${r.color};width:64px;height:64px;display:none;font-size:1.1rem">${r.avatar}</div>
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
    const proximas = ACTIVIDADES.filter(a => a.fecha >= NOW).sort((a, b) => a.fecha - b.fecha).slice(0, 8);

    let html = `
      <div class="cal-layout">
        <div id="cal-grid-container"></div>
        <div>
          <div class="card" style="padding:16px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
              <span style="font-size:1.1rem">📌</span>
              <h3 style="font-family:var(--font-body);font-size:0.95rem;font-weight:600;margin:0">Próximas Actividades</h3>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              ${proximas.length ? proximas.map(a => {
                const catColors = { 'Estimulación cognitiva': 'var(--lavanda)', 'Actividad física': 'var(--emerald-500)', 'Laborterapia': 'var(--peach)', 'Recreativa': 'var(--sky)', 'Evento': 'var(--primary)' };
                const color = catColors[a.categoria] || 'var(--primary)';
                const dia = a.fecha.getDate();
                const mes = a.fecha.toLocaleDateString('es-AR', { month: 'short' });
                const hora = fmtTime(a.fecha);
                return `
                  <div style="display:flex;gap:10px;align-items:flex-start;padding:10px;border-radius:8px;background:var(--bg-body);border:1px solid var(--border-light)">
                    <div style="min-width:44px;text-align:center;background:${color};color:#fff;border-radius:8px;padding:6px 4px;line-height:1.2">
                      <div style="font-size:0.65rem;text-transform:uppercase;font-weight:600">${mes}</div>
                      <div style="font-size:1.1rem;font-weight:700">${dia}</div>
                    </div>
                    <div style="flex:1;min-width:0">
                      <div style="font-size:0.82rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.titulo}</div>
                      <div style="font-size:0.72rem;color:var(--text-muted)">${hora} · ${a.lugar}</div>
                      <div style="font-size:0.7rem;color:var(--text-muted);margin-top:2px">${a.tallerista}</div>
                    </div>
                  </div>
                `;
              }).join('') : '<p style="font-size:0.82rem;color:var(--text-muted);text-align:center;padding:20px 0">No hay actividades próximas</p>'}
            </div>
          </div>
        </div>
      </div>
    `;
    content.innerHTML = html;
    const calContainer = $id('cal-grid-container');
    if (calContainer) {
      renderCalendar(calContainer, ACTIVIDADES, 'actividades');
      const calCard = calContainer.querySelector('.card');
      if (calCard) {
        const h3 = calCard.querySelector('h3');
        if (h3) {
          const rightSide = h3.parentElement.querySelector(':scope > div:last-child');
          if (rightSide) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-primary btn-sm';
            btn.id = 'btn-crear-actividad';
            btn.style.marginRight = '8px';
            btn.textContent = '+ Crear Actividad';
            rightSide.prepend(btn);
          }
        }
      }
    }

    const btnCrear = $id('btn-crear-actividad');
    if (btnCrear) {
      btnCrear.addEventListener('click', function () {
        openModal('Crear Nueva Actividad', `
          <div style="min-width:400px">
            <div style="display:flex;flex-direction:column;gap:14px">
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Nombre de la actividad</label>
                <input type="text" class="form-control" id="new-act-nombre" placeholder="Ej: Taller de Memoria" />
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Fecha</label>
                  <input type="date" class="form-control" id="new-act-fecha" />
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Hora</label>
                  <input type="time" class="form-control" id="new-act-hora" value="10:00" />
                </div>
              </div>
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Categoría</label>
                <select class="form-control" id="new-act-cat">
                  ${CATEGORIAS.map(c => `<option value="${c}">${c}</option>`).join('')}
                </select>
              </div>
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Lugar</label>
                <select class="form-control" id="new-act-lugar">
                  ${lugares.map(l => `<option value="${l}">${l}</option>`).join('')}
                </select>
              </div>
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Tallerista</label>
                <select class="form-control" id="new-act-tallerista">
                  <option>Laura Mendoza</option><option>Dr. García</option><option>Lic. Fernández</option><option>Prof. Ruiz</option>
                </select>
              </div>
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:6px">Residentes participantes</label>
                <div style="border:1px solid var(--border-color);border-radius:8px;padding:8px;background:var(--bg-body)">
                  <label style="display:flex;align-items:center;gap:8px;padding:4px 6px;cursor:pointer;border-bottom:1px solid var(--border-light);margin-bottom:4px;font-size:0.85rem;font-weight:600">
                    <input type="checkbox" id="select-all-residentes" checked> Seleccionar todos
                  </label>
                  ${RESIDENTES.map(r => `
                    <label style="display:flex;align-items:center;gap:8px;padding:5px 6px;cursor:pointer;border-radius:6px;transition:var(--tr)" onmouseover="this.style.background='var(--border-light)'" onmouseout="this.style.background='transparent'">
                      <input type="checkbox" class="residente-check" data-id="${r.id}" checked>
                      <span style="width:8px;height:8px;border-radius:50%;background:${r.color};display:inline-block"></span>
                      <strong style="font-size:0.85rem">${r.nombre}</strong>
                      <span style="font-size:0.72rem;color:var(--text-muted)">Hab. ${r.hab}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `, `<button class="btn btn-secondary" onclick="document.getElementById('modal-overlay').style.display='none'">Cancelar</button>
            <button class="btn btn-primary" id="btn-guardar-actividad">Guardar Actividad</button>`);

        const selectAllCb = $id('select-all-residentes');
        if (selectAllCb) {
          selectAllCb.addEventListener('change', function () {
            document.querySelectorAll('.residente-check').forEach(cb => cb.checked = this.checked);
          });
        }

        const btnSave = $id('btn-guardar-actividad');
        if (btnSave) {
          btnSave.addEventListener('click', function () {
            const nombre = $id('new-act-nombre')?.value.trim();
            const fechaVal = $id('new-act-fecha')?.value;
            const hora = $id('new-act-hora')?.value;
            const cat = $id('new-act-cat')?.value;
            const lugar = $id('new-act-lugar')?.value;
            const tallerista = $id('new-act-tallerista')?.value;
            if (!nombre || !fechaVal) { showToast('Completá nombre y fecha', 'warning'); return; }
            const [h, m] = (hora || '10:00').split(':').map(Number);
            const fecha = new Date(fechaVal + 'T12:00:00');
            fecha.setHours(h, m);
            const selectedCheckboxes = document.querySelectorAll('.residente-check:checked');
            const selectedIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.dataset.id));
            const invitaciones = selectedIds.map(id => {
              const res = residentePorId(id);
              return { residenteId: id, familiar: res.familiar, estado: 'pendiente', cantidad: 1 };
            });
            ACTIVIDADES.push({
              id: 'act-new-' + Date.now(),
              titulo: nombre,
              categoria: cat,
              fecha: fecha,
              lugar: lugar,
              tallerista: tallerista,
              residentesIds: selectedIds,
              invitaciones: invitaciones,
            });
            ACTIVIDADES.sort((a, b) => a.fecha - b.fecha);
            closeModal();
            showToast('Actividad "' + nombre + '" creada exitosamente', 'success');
            RENDERS.calendario();
          });
        }
      });
    }
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
      const past = date < NOW && !today;
      const dayItems = items.filter(it => it.fecha && it.fecha.toDateString() === date.toDateString());
      const ds = date.toISOString().slice(0, 10);
      grid += `<div class="cal-day ${today ? 'today' : ''} ${past ? 'past' : ''}" data-date="${ds}">
        <span class="cal-day-num">${d}</span>
        ${dayItems.map(it => {
          if (type === 'reuniones') {
            const est = it.estado || 'pendiente';
            const estadoCls = 'reunion-' + est;
            const tip = est === 'pendiente' ? '⏳ Pendiente de confirmación' : est === 'agendada' ? '✅ Confirmada' : '❌ Cancelada';
            return `<span class="cal-day-event ${estadoCls}" title="${tip}">${it.titulo}</span>`;
          }
          const cls = CAT_CLASSES[it.categoria] || 'evento';
          return `<span class="cal-day-event ${cls}">${it.titulo}</span>`;
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
        <span class="cal-legend-item"><span class="cal-legend-dot" style="background:var(--warning)"></span>⏳ Pendiente</span>
        <span class="cal-legend-item"><span class="cal-legend-dot" style="background:var(--success)"></span>✅ Agendada</span>
        <span class="cal-legend-item"><span class="cal-legend-dot" style="background:var(--danger)"></span>❌ Cancelada</span>
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
                      ${participantes.map(p => {
                        const inv = (it.invitaciones || []).find(i => i.residenteId === p.id);
                        const famText = inv && inv.estado === 'confirmado' ? ` 👨‍👩‍👧${inv.cantidad}` : '';
                        return `<span class="badge" style="background:${p.color};color:#fff">${p.nombre}${famText}</span>`;
                      }).join('')}
                    </div>
                    ${it.residentesIds && it.residentesIds.length > 0 ? `
                      <p style="margin-top:6px;font-size:0.8rem;color:var(--text-muted)">
                        🏥 Total: ${it.residentesIds.length} residentes
                        ${(() => { const tf = (it.invitaciones || []).filter(i => i.estado === 'confirmado').reduce((s, i) => s + i.cantidad, 0); return tf > 0 ? `· 👨‍👩‍👧 ${tf} familiares confirmados` : ''; })()}
                      </p>
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
    const monthActs = ACTIVIDADES.filter(a => a.fecha.getMonth() === MONTH);
    const weekActs = monthActs.filter(a => a.fecha > new Date(YEAR, MONTH, NOW.getDate() - 7));
    const totalRes = RESIDENTES.length;

    const famData = {
      1: { nombre: 'Sofía López', freq: 'Frecuente' },
      2: { nombre: 'Ana Pérez', freq: 'Ocasional' },
      3: { nombre: 'Carlos Giménez', freq: 'Frecuente' },
      4: { nombre: 'Lucía Sánchez', freq: 'Poco frecuente' },
      5: { nombre: 'Martín Martínez', freq: 'Frecuente' },
      6: { nombre: 'Sofía López', freq: 'Ocasional' },
    };
    const famCount = new Set(Object.values(famData).map(f => f.nombre)).size;
    const famFreqColor = { 'Frecuente': 'var(--emerald-500)', 'Ocasional': 'var(--peach)', 'Poco frecuente': 'var(--text-muted)' };

    let totalPct = 0;

    let html = `
      <div class="stats-grid" style="margin-bottom:20px">
        <div class="stat-card"><div class="stat-num">${totalRes}</div><div class="stat-label">Residentes</div></div>
        <div class="stat-card"><div class="stat-num">${weekActs.length}</div><div class="stat-label">Actividades esta semana</div></div>
        <div class="stat-card"><div class="stat-num">${monthActs.length}</div><div class="stat-label">Actividades del mes</div></div>
        <div class="stat-card"><div class="stat-num">${famCount}</div><div class="stat-label">Familiares participantes</div></div>
      </div>

      <div class="section-block">
        <div class="section-title"><span class="ico">✅</span> Control de Asistencia · ${capitalize(new Date(YEAR, MONTH).toLocaleDateString('es-AR',{month:'long',year:'numeric'}))}</div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Residente</th><th>Hab.</th><th>Participación</th><th>Asistencia semanal</th><th>Familiar</th><th>Próxima actividad</th></tr></thead>
            <tbody>
              ${RESIDENTES.map(r => {
                const acts = monthActs.filter(a => a.residentesIds.includes(r.id));
                const total = monthActs.length || 1;
                const pct = Math.round((acts.length / total) * 100);
                totalPct += pct;
                const semActs = weekActs.filter(a => a.residentesIds.includes(r.id));
                const next = monthActs.find(a => a.residentesIds.includes(r.id) && a.fecha >= NOW);
                const fam = famData[r.id];
                return `<tr>
                  <td><strong>${r.nombre}</strong></td>
                  <td>${r.hab}</td>
                  <td>
                    <div style="display:flex;align-items:center;gap:6px">
                      <div style="flex:1;height:6px;background:var(--bg-body);border-radius:3px;overflow:hidden;min-width:60px">
                        <div style="height:100%;width:${pct}%;background:${pct >= 70 ? 'var(--emerald-500)' : pct >= 40 ? 'var(--peach)' : 'var(--danger)'};border-radius:3px"></div>
                      </div>
                      <span style="font-size:0.75rem;font-weight:600;min-width:32px">${pct}%</span>
                    </div>
                  </td>
                  <td>${semActs.length}/${weekActs.length} actividades</td>
                  <td>${fam ? `<span style="font-size:0.82rem">${fam.nombre}</span><br><small style="color:${famFreqColor[fam.freq]}">${fam.freq}</small>` : '<small>—</small>'}</td>
                  <td>${next ? fmtShort(next.fecha) + ' · ' + next.titulo : '—'}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="section-block">
        <div class="section-title"><span class="ico">📋</span> Últimas Actividades</div>
        <div class="card" style="padding:8px 16px">
          ${monthActs.sort((a, b) => b.fecha - a.fecha).slice(0, 4).map(a => {
            const participantes = (a.residentesIds || []).map(id => RESIDENTES.find(r => r.id === id)).filter(Boolean);
            return `
              <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border-light)">
                <div style="min-width:44px;text-align:center;background:${CAT_COLORS[a.categoria] || 'var(--primary)'};color:#fff;border-radius:8px;padding:4px 8px;line-height:1.2">
                  <div style="font-size:0.6rem;text-transform:uppercase;font-weight:600">${a.fecha.toLocaleDateString('es-AR',{month:'short'})}</div>
                  <div style="font-size:1rem;font-weight:700">${a.fecha.getDate()}</div>
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:0.85rem;font-weight:600">${a.titulo}</div>
                  <div style="font-size:0.75rem;color:var(--text-muted)">🕐 ${fmtTime(a.fecha)} · 📍 ${a.lugar}</div>
                  <div style="display:flex;gap:4px;margin-top:4px;flex-wrap:wrap">
                    ${participantes.map(p => `<span class="badge" style="background:${p.color};color:#fff;font-size:0.65rem">${p.nombre.split(' ')[0]}</span>`).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    content.innerHTML = html;
  };

  // --- Reportes de Salud ---
  RENDERS.reportes = function () {
    const allWeekly = REPORTES.filter(r => r.periodo === 'Semanal').slice(0, 6);
    const allMonthly = REPORTES.filter(r => r.periodo === 'Mensual').slice(0, 6);

    function renderReportesGrid(period) {
      const data = period === 'semanal' ? allWeekly : allMonthly;
      const cls = period === 'semanal' ? 'semanal' : 'mensual';
      const grid = document.getElementById('reportes-grid');
      if (!grid) return;

      grid.innerHTML = data.map(r => {
        const estClass = { 'Estable': 'badge-success', 'En observación': 'badge-warning', 'Mejorando': 'badge-info' }[r.estadoGeneral] || 'badge-neutral';
        return `
          <div class="reporte-card ${cls}">
            <div class="card-header">
              <strong>${r.residente}</strong> · <span class="badge ${estClass}">${r.estadoGeneral}</span>
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
            <div class="card-foot">
              <div style="display:flex;justify-content:space-between;align-items:center;width:100%">
                <span class="badge badge-${period === 'semanal' ? 'info' : 'lavanda'}">${r.periodo}</span>
                <small>${fmtDate(r.fecha)}</small>
              </div>
              <div style="display:flex;gap:6px;margin-top:8px">
                <button class="btn btn-xs btn-outline ver-reporte-btn" data-rep-id="${r.id}">📄 Ver informe completo</button>
                <button class="btn btn-xs btn-secondary report-chat-btn" data-rep-id="${r.id}" style="position:relative">💬 Chat <span class="chat-notif-badge">1</span></button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Wire "Ver informe completo"
      grid.querySelectorAll('.ver-reporte-btn').forEach(btn => {
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

      // Wire "Chat"
      grid.querySelectorAll('.report-chat-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const rid = this.dataset.repId;
          const r = REPORTES.find(x => x.id === rid);
          const chat = REPORT_CHATS[rid];
          if (!r || !chat) return;
          const chatHtml = `
            <div style="display:flex;flex-direction:column;height:420px;min-width:360px">
              <div style="display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid var(--border-color);margin-bottom:12px">
                <div class="chat-list-avatar" style="background:#7C3AED;width:36px;height:36px;font-size:0.7rem">SL</div>
                <div>
                  <div style="font-weight:600;font-size:0.9rem">Sofía López</div>
                  <div style="font-size:0.75rem;color:var(--emerald-500)">● En línea</div>
                </div>
                <span class="badge badge-info" style="margin-left:auto">${r.residente}</span>
              </div>
              <div id="report-chat-msgs" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:4px 0">
                ${chat.messages.map(m => `
                  <div class="msg-bubble ${m.side}" style="max-width:75%;align-self:${m.side === 'sent' ? 'flex-end' : 'flex-start'}">
                    <strong style="font-size:0.78rem">${m.from}</strong><br>
                    ${m.text}
                    <span class="msg-time">${fmtTime(m.time)} · ${m.side === 'sent' ? 'Visto' : 'Recibido'}</span>
                  </div>
                `).join('')}
              </div>
              <div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--border-color)">
                <input type="text" class="form-control" id="report-chat-input" placeholder="Escribí tu respuesta..." />
                <button class="btn btn-primary btn-sm" id="report-chat-send">Enviar</button>
              </div>
            </div>
          `;
          openModal('💬 Consulta por Reporte — ' + r.residente, chatHtml, '<button class="btn btn-secondary" onclick="document.getElementById(\'modal-overlay\').style.display=\'none\'">Cerrar</button>');
          setTimeout(() => {
            const sendBtn = document.getElementById('report-chat-send');
            const input = document.getElementById('report-chat-input');
            const msgs = document.getElementById('report-chat-msgs');
            if (!sendBtn || !input || !msgs) return;
            const doSend = () => {
              const txt = input.value.trim();
              if (!txt) return;
              const bubble = document.createElement('div');
              bubble.className = 'msg-bubble sent';
              bubble.style.maxWidth = '75%';
              bubble.style.alignSelf = 'flex-end';
              bubble.innerHTML = '<strong style="font-size:0.78rem">Laura Mendoza</strong><br>' + txt.replace(/</g,'&lt;') + '<span class="msg-time">' + fmtTime(new Date()) + ' · Enviado</span>';
              msgs.appendChild(bubble);
              msgs.scrollTop = msgs.scrollHeight;
              input.value = '';
              setTimeout(() => {
                const res = document.createElement('div');
                res.className = 'msg-bubble received';
                res.style.maxWidth = '75%';
                res.style.alignSelf = 'flex-start';
                const respuestas = ['Gracias por tu mensaje. Lo estamos revisando.', 'Recibido. Te confirmamos cualquier novedad.', 'Entendido. Quedamos atentos a tu consulta.'];
                res.innerHTML = '<strong style="font-size:0.78rem">Sofía López</strong><br>' + respuestas[Math.floor(Math.random() * respuestas.length)] + '<span class="msg-time">' + fmtTime(new Date()) + ' · Leído</span>';
                msgs.appendChild(res);
                msgs.scrollTop = msgs.scrollHeight;
              }, 1200);
            };
            sendBtn.addEventListener('click', doSend);
            input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSend(); });
          }, 100);
        });
      });
    }

    let html = `
      <div class="info-banner">🔒 Información confidencial y trazable. Solo accesible para personal autorizado. Fuente: Historial clínico Nexup.</div>
      <div class="section-block">
        <div style="display:flex;gap:8px;margin-bottom:16px">
          <button class="report-tab active" data-period="semanal">📅 Semanales</button>
          <button class="report-tab" data-period="mensual">📆 Mensuales</button>
        </div>
        <div id="reportes-grid" class="grid-reportes"></div>
      </div>
    `;
    content.innerHTML = html;

    renderReportesGrid('semanal');

    content.querySelectorAll('.report-tab').forEach(tab => {
      tab.addEventListener('click', function () {
        content.querySelectorAll('.report-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        renderReportesGrid(this.dataset.period);
      });
    });
  };

  // --- Reuniones (INTERNO) — now with private calendar ---
  RENDERS.reuniones = function () {
    const prox = REUNIONES.find(r => r.proxima && r.estado !== 'cancelada');
    const todas = REUNIONES.length;
    const presenciales = REUNIONES.filter(r => r.modalidad === 'Presencial').length;
    const virtuales = REUNIONES.filter(r => r.modalidad === 'Virtual').length;
    const conformidadAlta = REUNIONES.filter(r => r.conformidad === 'Alta').length;
    const evaluadas = REUNIONES.filter(r => r.conformidad !== 'Pendiente').length;
    const próxCount = REUNIONES.filter(r => r.proxima && r.estado !== 'cancelada').length;

    let html = `
      <div class="cols-2" style="gap:20px">
        <div>
          <h3 style="font-family:var(--font-body);font-size:1rem;margin-bottom:12px;font-weight:600;">📅 Calendario de Reuniones</h3>
          <div id="reuniones-cal"></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
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
            ` : '<p style="font-size:0.85rem;color:var(--text-muted)">No hay reuniones próximas.</p>'}
          </div>

          <div class="card" style="padding:16px">
            <h4 style="font-size:0.9rem;margin-bottom:10px;font-family:var(--font-body)">📊 Resumen</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <div style="text-align:center;padding:10px;background:var(--bg-body);border-radius:8px">
                <div style="font-size:1.3rem;font-weight:700;color:var(--primary)">${todas}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">Total</div>
              </div>
              <div style="text-align:center;padding:10px;background:var(--bg-body);border-radius:8px">
                <div style="font-size:1.3rem;font-weight:700;color:var(--emerald-500)">${próxCount}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">Próximas</div>
              </div>
              <div style="text-align:center;padding:10px;background:var(--bg-body);border-radius:8px">
                <div style="font-size:1.3rem;font-weight:700;color:var(--peach)">${presenciales}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">Presenciales</div>
              </div>
              <div style="text-align:center;padding:10px;background:var(--bg-body);border-radius:8px">
                <div style="font-size:1.3rem;font-weight:700;color:var(--sky)">${virtuales}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">Virtuales</div>
              </div>
            </div>
          </div>

          <div class="card" style="padding:16px">
            <h4 style="font-size:0.9rem;margin-bottom:8px;font-family:var(--font-body)">👥 Participantes Frecuentes</h4>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${(() => {
                const freq = {};
                REUNIONES.forEach(r => r.participantes.forEach(p => { freq[p] = (freq[p] || 0) + 1; }));
                return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => `
                  <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.82rem">
                    <span style="color:var(--text-secondary)">${name}</span>
                    <span class="badge badge-neutral">${count} reuniones</span>
                  </div>
                `).join('');
              })()}
            </div>
          </div>

          <div class="card" style="padding:16px">
            <h4 style="font-size:0.9rem;margin-bottom:8px;font-family:var(--font-body)">✅ Conformidad</h4>
            <div style="display:flex;align-items:center;gap:10px">
              <div style="flex:1;height:8px;background:var(--bg-body);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${evaluadas ? (conformidadAlta / evaluadas * 100).toFixed(0) : 0}%;background:var(--emerald-500);border-radius:4px"></div>
              </div>
              <span style="font-size:0.82rem;font-weight:600;color:var(--emerald-500)">${evaluadas ? (conformidadAlta / evaluadas * 100).toFixed(0) : 0}%</span>
            </div>
            <p style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">${conformidadAlta} de ${evaluadas} reuniones evaluadas con conformidad alta</p>
          </div>
        </div>
      </div>

      <div class="section-block" style="margin-top:20px;">
        <div class="section-title"><span class="ico">📜</span> Historial de Minutas</div>
        <div class="card">
          ${REUNIONES.filter(r => new Date(r.fecha) < NOW).map(r => `
            <div class="minuta-item" onclick="this.classList.toggle('expanded')">
              <div class="minuta-summary">
                <div>
                  <strong>${r.titulo}</strong>
                  <span style="font-size:0.75rem;color:var(--text-muted);display:block">${fmtDate(r.fecha)} · ${r.modalidad} ${r.lugar ? '· ' + r.lugar : ''}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <span class="btn btn-xs btn-outline" style="font-size:0.7rem;padding:2px 8px;cursor:pointer">Ver detalles</span>
                  <span style="font-size:0.7rem;color:var(--text-muted)">▼</span>
                </div>
              </div>
              <div class="minuta-details">
                <div class="info-banner" style="margin:8px 0">📋 Registro de observaciones de la reunión</div>
                <p>${r.minuta}</p>
                <div style="margin-top:8px;font-size:0.82rem">
                  <strong>Participantes:</strong> ${r.participantes.join(', ')}<br>
                  <strong>Conformidad:</strong> ${r.conformidad}
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

    // Wire "Programar Reunión" button
    const btnNueva = $id('btn-nueva-reunion');
    if (btnNueva) {
      btnNueva.addEventListener('click', function () {
        openModal('Programar Nueva Reunión', `
          <div style="min-width:420px">
            <div style="display:flex;flex-direction:column;gap:14px">
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Nombre del residente</label>
                <select class="form-control" id="new-reu-residente">
                  ${RESIDENTES.map(r => `<option value="${r.id}">${r.nombre}</option>`).join('')}
                </select>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Fecha</label>
                  <input type="date" class="form-control" id="new-reu-fecha" />
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Hora</label>
                  <input type="time" class="form-control" id="new-reu-hora" value="10:00" />
                </div>
              </div>
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Modalidad</label>
                <select class="form-control" id="new-reu-modalidad">
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>
              <div id="new-reu-lugar-wrap">
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Lugar</label>
                <select class="form-control" id="new-reu-lugar">
                  <option>Salón Comedor Principal</option>
                  <option>Sala de Reuniones 1er Piso</option>
                  <option>Consultorio 1</option>
                  <option>Consultorio 2</option>
                  <option>Salón Multiusos</option>
                </select>
              </div>
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Participantes (separar con coma)</label>
                <input type="text" class="form-control" id="new-reu-participantes" placeholder="Dr. García, Lic. Fernández, Fam. López" />
              </div>
            </div>
          </div>
        `, `<button class="btn btn-secondary" onclick="document.getElementById('modal-overlay').style.display='none'">Cancelar</button>
            <button class="btn btn-primary" id="btn-guardar-reunion">Guardar Reunión</button>`);

        // Toggle lugar/link fields based on modalidad
        const modalidadSel = $id('new-reu-modalidad');
        const lugarWrap = $id('new-reu-lugar-wrap');
        if (modalidadSel && lugarWrap) {
          modalidadSel.addEventListener('change', function () {
            if (this.value === 'Virtual') {
              lugarWrap.innerHTML = '<label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Link de reunión</label><input type="url" class="form-control" id="new-reu-link" placeholder="https://meet.google.com/..." />';
            } else {
              lugarWrap.innerHTML = '<label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Lugar</label><select class="form-control" id="new-reu-lugar"><option>Salón Comedor Principal</option><option>Sala de Reuniones 1er Piso</option><option>Consultorio 1</option><option>Consultorio 2</option><option>Salón Multiusos</option></select>';
            }
          });
        }

        const btnSave = $id('btn-guardar-reunion');
        if (btnSave) {
          btnSave.addEventListener('click', function () {
            const resId = $id('new-reu-residente')?.value;
            const res = residentePorId(Number(resId));
            const fechaVal = $id('new-reu-fecha')?.value;
            const hora = $id('new-reu-hora')?.value;
            const modalidad = $id('new-reu-modalidad')?.value;
            const participantesRaw = $id('new-reu-participantes')?.value || '';
            if (!fechaVal) { showToast('Seleccioná una fecha', 'warning'); return; }
            const [h, m] = (hora || '10:00').split(':').map(Number);
            const fecha = new Date(fechaVal + 'T12:00:00');
            fecha.setHours(h, m);
            const participantes = participantesRaw.split(',').map(s => s.trim()).filter(Boolean);
            if (res) participantes.unshift('Fam. ' + res.nombre.split(' ').pop());
            const lugar = modalidad === 'Presencial' ? ($id('new-reu-lugar')?.value || '') : '';
            const link = modalidad === 'Virtual' ? ($id('new-reu-link')?.value || '') : '';
            REUNIONES.push({
              id: 'reu-new-' + Date.now(),
              titulo: 'Reunión mensual: ' + (res ? res.nombre : 'Residente'),
              fecha: fecha,
              modalidad: modalidad,
              lugar: lugar,
              link: link,
              proxima: true,
              estado: 'pendiente',
              participantes: participantes,
              minuta: 'Reunión programada. La minuta será completada tras la reunión.',
              conformidad: 'Pendiente',
            });
            REUNIONES.sort((a, b) => a.fecha - b.fecha);
            closeModal();
            showToast('Reunión programada exitosamente', 'success');
            RENDERS.reuniones();
          });
        }
      });
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

  let currentFamView = 'reportes';
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
      famTopRes.innerHTML = `<img class="resident-foto" src="${res.foto}" alt="${res.nombre}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;margin-right:8px;vertical-align:middle"> ${res.nombre} · Hab. ${res.hab}`;
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
      reuniones: 'Reuniones y Seguimiento',
      'reuniones-staff': 'Gestión de Reuniones',
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
          <div class="card-body" style="display:flex;gap:16px;align-items:flex-start">
            <img class="resident-foto" src="${res?.foto || ''}" alt="${res?.nombre || ''}" loading="lazy" onerror="this.style.display='none'" style="width:80px;height:80px;">
            <div style="flex:1">
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
    if (currentEnv === 'comunicacion') {
      const allWeekly = REPORTES.filter(r => r.periodo === 'Semanal').slice(0, 6);
      const allMonthly = REPORTES.filter(r => r.periodo === 'Mensual').slice(0, 6);

      function renderReportesGrid(period) {
        const data = period === 'semanal' ? allWeekly : allMonthly;
        const cls = period === 'semanal' ? 'semanal' : 'mensual';
        const grid = document.getElementById('reportes-grid');
        if (!grid) return;

        grid.innerHTML = data.map(r => {
          const estClass = { 'Estable': 'badge-success', 'En observación': 'badge-warning', 'Mejorando': 'badge-info' }[r.estadoGeneral] || 'badge-neutral';
          return `
            <div class="reporte-card ${cls}">
              <div class="card-header">
                <strong>${r.residente}</strong> · <span class="badge ${estClass}">${r.estadoGeneral}</span>
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
              <div class="card-foot">
                <div style="display:flex;justify-content:space-between;align-items:center;width:100%">
                  <span class="badge badge-${period === 'semanal' ? 'info' : 'lavanda'}">${r.periodo}</span>
                  <small>${fmtDate(r.fecha)}</small>
                </div>
                <div style="display:flex;gap:6px;margin-top:8px">
                  <button class="btn btn-xs btn-outline ver-reporte-btn" data-rep-id="${r.id}">📄 Ver informe completo</button>
                  <button class="btn btn-xs btn-secondary report-chat-btn" data-rep-id="${r.id}" style="position:relative">💬 Chat <span class="chat-notif-badge">1</span></button>
                </div>
              </div>
            </div>
          `;
        }).join('');

        grid.querySelectorAll('.ver-reporte-btn').forEach(btn => {
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
                <div style="margin:14px 0"><h4>Evolución</h4><p>${r.evolucion}</p></div>
                <div style="margin:14px 0"><h4>Signos Vitales</h4>
                  <div class="vitals-grid">
                    <div class="vital-item"><div class="vital-label">Presión Arterial</div><div class="vital-value">${r.signos.presion}</div></div>
                    <div class="vital-item"><div class="vital-label">Frecuencia Cardíaca</div><div class="vital-value">${r.signos.fc}</div></div>
                    <div class="vital-item"><div class="vital-label">Temperatura</div><div class="vital-value">${r.signos.temp}</div></div>
                    <div class="vital-item"><div class="vital-label">Saturación O₂</div><div class="vital-value">${r.signos.sat}</div></div>
                  </div>
                </div>
                <div style="margin:14px 0;font-size:0.85rem">
                  <p><strong>Residente:</strong> ${r.residente} · <strong>Fecha:</strong> ${fmtDate(r.fecha)} · <strong>Período:</strong> ${r.periodo}</p>
                </div>
              </div>
            `, '<button class="btn btn-secondary" onclick="document.getElementById(\'modal-overlay\').style.display=\'none\'">Cerrar</button>');
          });
        });

        grid.querySelectorAll('.report-chat-btn').forEach(btn => {
          btn.addEventListener('click', function () {
            const rid = this.dataset.repId;
            const r = REPORTES.find(x => x.id === rid);
            const chat = REPORT_CHATS[rid];
            if (!r || !chat) return;
            const chatHtml = `
              <div style="display:flex;flex-direction:column;height:420px;min-width:360px">
                <div style="display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid var(--border-color);margin-bottom:12px">
                  <div class="chat-list-avatar" style="background:#7C3AED;width:36px;height:36px;font-size:0.7rem">SL</div>
                  <div><div style="font-weight:600;font-size:0.9rem">Sofía López</div><div style="font-size:0.75rem;color:var(--emerald-500)">● En línea</div></div>
                  <span class="badge badge-info" style="margin-left:auto">${r.residente}</span>
                </div>
                <div id="report-chat-msgs" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding:4px 0">
                  ${chat.messages.map(m => `
                    <div class="msg-bubble ${m.side}" style="max-width:75%;align-self:${m.side === 'sent' ? 'flex-end' : 'flex-start'}">
                      <strong style="font-size:0.78rem">${m.from}</strong><br>${m.text}
                      <span class="msg-time">${fmtTime(m.time)} · ${m.side === 'sent' ? 'Visto' : 'Recibido'}</span>
                    </div>
                  `).join('')}
                </div>
                <div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--border-color)">
                  <input type="text" class="form-control" id="report-chat-input" placeholder="Escribí tu respuesta..." />
                  <button class="btn btn-primary btn-sm" id="report-chat-send">Enviar</button>
                </div>
              </div>
            `;
            openModal('💬 Consulta por Reporte — ' + r.residente, chatHtml, '<button class="btn btn-secondary" onclick="document.getElementById(\'modal-overlay\').style.display=\'none\'">Cerrar</button>');
            setTimeout(() => {
              const sendBtn = document.getElementById('report-chat-send');
              const input = document.getElementById('report-chat-input');
              const msgs = document.getElementById('report-chat-msgs');
              if (!sendBtn || !input || !msgs) return;
              const doSend = () => {
                const txt = input.value.trim(); if (!txt) return;
                const bubble = document.createElement('div');
                bubble.className = 'msg-bubble sent'; bubble.style.maxWidth = '75%'; bubble.style.alignSelf = 'flex-end';
                bubble.innerHTML = '<strong style="font-size:0.78rem">Laura Mendoza</strong><br>' + txt.replace(/</g,'&lt;') + '<span class="msg-time">' + fmtTime(new Date()) + ' · Enviado</span>';
                msgs.appendChild(bubble); msgs.scrollTop = msgs.scrollHeight; input.value = '';
                setTimeout(() => {
                  const res = document.createElement('div');
                  res.className = 'msg-bubble received'; res.style.maxWidth = '75%'; res.style.alignSelf = 'flex-start';
                  const respuestas = ['Gracias por tu mensaje. Lo estamos revisando.', 'Recibido. Te confirmamos cualquier novedad.', 'Entendido. Quedamos atentos a tu consulta.'];
                  res.innerHTML = '<strong style="font-size:0.78rem">Sofía López</strong><br>' + respuestas[Math.floor(Math.random() * respuestas.length)] + '<span class="msg-time">' + fmtTime(new Date()) + ' · Leído</span>';
                  msgs.appendChild(res); msgs.scrollTop = msgs.scrollHeight;
                }, 1200);
              };
              sendBtn.addEventListener('click', doSend);
              input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSend(); });
            }, 100);
          });
        });
      }

      famContent.innerHTML = `
        <div class="info-banner">🔒 Información confidencial y trazable. Solo accesible para personal autorizado. Fuente: Historial clínico Nexup.</div>
        <div class="section-block">
          <div style="display:flex;gap:8px;margin-bottom:16px">
            <button class="report-tab active" data-period="semanal">📅 Semanales</button>
            <button class="report-tab" data-period="mensual">📆 Mensuales</button>
          </div>
          <div id="reportes-grid" class="grid-reportes"></div>
        </div>
      `;

      renderReportesGrid('semanal');

      famContent.querySelectorAll('.report-tab').forEach(tab => {
        tab.addEventListener('click', function () {
          famContent.querySelectorAll('.report-tab').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          renderReportesGrid(this.dataset.period);
        });
      });
      return;
    }

    // --- Vista Familiar: filtered by resident ---
    const reps = reportsForResident();

    let html = `
      <div class="info-banner">🔒 Información confidencial y trazable. Solo accesible para familiares autorizados. Fuente: Historial clínico Nexup.</div>
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
                  <div style="display:flex;gap:6px">
                    <button class="btn btn-xs btn-outline ver-reporte-fam-btn" data-rep-id="${r.id}">📄 Ver informe completo</button>
                    <button class="btn btn-xs btn-primary fam-consulta-btn" data-rep-id="${r.id}">💬 Consultar</button>
                  </div>
                </div>
              </div>
            `;
          }).join('') : '<p>No hay reportes disponibles para este residente.</p>'}
    `;
    famContent.innerHTML = html;

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
            <div style="margin:14px 0"><h4>Evolución</h4><p>${r.evolucion}</p></div>
            <div style="margin:14px 0"><h4>Signos Vitales</h4>
              <div class="vitals-grid">
                <div class="vital-item"><div class="vital-label">Presión Arterial</div><div class="vital-value">${r.signos.presion}</div></div>
                <div class="vital-item"><div class="vital-label">Frecuencia Cardíaca</div><div class="vital-value">${r.signos.fc}</div></div>
                <div class="vital-item"><div class="vital-label">Temperatura</div><div class="vital-value">${r.signos.temp}</div></div>
                <div class="vital-item"><div class="vital-label">Saturación O₂</div><div class="vital-value">${r.signos.sat}</div></div>
              </div>
            </div>
            <div style="margin:14px 0;font-size:0.85rem">
              <p><strong>Residente:</strong> ${r.residente} · <strong>Fecha:</strong> ${fmtDate(r.fecha)} · <strong>Período:</strong> ${r.periodo}</p>
            </div>
          </div>
        `, '<button class="btn btn-secondary" onclick="document.getElementById(\'modal-overlay\').style.display=\'none\'">Cerrar</button>');
      });
    });
    famContent.querySelectorAll('.fam-consulta-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const rid = this.dataset.repId;
        const chat = REPORT_CHATS[rid];
        const r = REPORTES.find(x => x.id === rid);
        if (!chat || !r) return;
        const chatBody = `
          <div style="display:flex;flex-direction:column;height:400px">
            <div style="display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid var(--border);margin-bottom:12px">
              <div style="width:36px;height:36px;border-radius:50%;background:#10B981;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.7rem">EI</div>
              <div><div style="font-weight:600;font-size:0.85rem">Consulta: ${r.residente}</div><div style="font-size:0.75rem;color:var(--muted)">● En línea</div></div>
            </div>
            <div class="chat-conv-messages" id="fam-rchat-msgs" style="flex:1;overflow-y:auto;padding:8px 0">
              ${chat.messages.map(m => `
                <div class="msg-bubble ${m.side}" style="max-width:75%;margin-bottom:10px">
                  <strong style="font-size:0.78rem">${m.from}</strong><br>${m.text}
                  <span class="msg-time">${fmtTime(m.time)} · ${m.side === 'received' ? 'Leído' : 'Entregado'}</span>
                </div>
              `).join('')}
            </div>
            <div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--border)">
              <input type="text" class="form-control" id="fam-rchat-input" placeholder="Escribí tu consulta..." />
              <button class="btn btn-primary btn-sm" id="fam-rchat-send">Enviar</button>
            </div>
          </div>
        `;
        openModal('💬 Consulta — ' + r.residente, chatBody, '<button class="btn btn-secondary" onclick="document.getElementById(\'modal-overlay\').style.display=\'none\'">Cerrar</button>');
        setTimeout(() => {
          const sendBtn = document.getElementById('fam-rchat-send');
          const input = document.getElementById('fam-rchat-input');
          const msgs = document.getElementById('fam-rchat-msgs');
          if (!sendBtn || !input || !msgs) return;
          const doSend = () => {
            const txt = input.value.trim(); if (!txt) return;
            const bubble = document.createElement('div');
            bubble.className = 'msg-bubble sent'; bubble.style.maxWidth = '75%';
            bubble.innerHTML = '<strong style="font-size:0.78rem">Sofía López</strong><br>' + txt.replace(/</g,'&lt;') + '<span class="msg-time">' + fmtTime(new Date()) + ' · Entregado</span>';
            msgs.appendChild(bubble); msgs.scrollTop = msgs.scrollHeight; input.value = '';
            setTimeout(() => {
              const res = document.createElement('div');
              res.className = 'msg-bubble received'; res.style.maxWidth = '75%';
              const respuestas = ['Gracias por tu consulta. El equipo la está revisando.', 'Hemos recibido tu mensaje. Te responderemos pronto.', 'Consulta registrada. Te confirmamos novedades.'];
              res.innerHTML = '<strong style="font-size:0.78rem">Equipo Interdisciplinario</strong><br>' + respuestas[Math.floor(Math.random() * respuestas.length)] + '<span class="msg-time">' + fmtTime(new Date()) + ' · Leído</span>';
              msgs.appendChild(res); msgs.scrollTop = msgs.scrollHeight;
            }, 1200);
          };
          sendBtn.addEventListener('click', doSend);
          input.addEventListener('keydown', e => { if (e.key === 'Enter') doSend(); });
        }, 100);
      });
    });
  };

  // --- Calendario (two-column) ---
  FAM_RENDERS.calendario = function () {
    const acts = activitiesForResident();

    let html = `
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

  // --- Reuniones (Staff: versión administrativa completa) ---
  FAM_RENDERS['reuniones-staff'] = function () {
    const prox = REUNIONES.find(r => r.proxima && r.estado !== 'cancelada');
    const todas = REUNIONES.length;
    const presenciales = REUNIONES.filter(r => r.modalidad === 'Presencial').length;
    const virtuales = REUNIONES.filter(r => r.modalidad === 'Virtual').length;
    const conformidadAlta = REUNIONES.filter(r => r.conformidad === 'Alta').length;
    const evaluadas = REUNIONES.filter(r => r.conformidad !== 'Pendiente').length;
    const próxCount = REUNIONES.filter(r => r.proxima && r.estado !== 'cancelada').length;

    let html = `
      <div class="cols-2" style="gap:20px">
        <div>
          <h3 style="font-family:var(--font-body);font-size:1rem;margin-bottom:12px;font-weight:600;">📅 Calendario de Reuniones</h3>
          <div id="reuniones-cal-staff"></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
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
            ` : '<p style="font-size:0.85rem;color:var(--text-muted)">No hay reuniones próximas.</p>'}
          </div>

          <div class="card" style="padding:16px">
            <h4 style="font-size:0.9rem;margin-bottom:10px;font-family:var(--font-body)">📊 Resumen</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <div style="text-align:center;padding:10px;background:var(--bg-body);border-radius:8px">
                <div style="font-size:1.3rem;font-weight:700;color:var(--primary)">${todas}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">Total</div>
              </div>
              <div style="text-align:center;padding:10px;background:var(--bg-body);border-radius:8px">
                <div style="font-size:1.3rem;font-weight:700;color:var(--emerald-500)">${próxCount}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">Próximas</div>
              </div>
              <div style="text-align:center;padding:10px;background:var(--bg-body);border-radius:8px">
                <div style="font-size:1.3rem;font-weight:700;color:var(--peach)">${presenciales}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">Presenciales</div>
              </div>
              <div style="text-align:center;padding:10px;background:var(--bg-body);border-radius:8px">
                <div style="font-size:1.3rem;font-weight:700;color:var(--sky)">${virtuales}</div>
                <div style="font-size:0.7rem;color:var(--text-muted)">Virtuales</div>
              </div>
            </div>
          </div>

          <div class="card" style="padding:16px">
            <h4 style="font-size:0.9rem;margin-bottom:8px;font-family:var(--font-body)">👥 Participantes Frecuentes</h4>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${(() => {
                const freq = {};
                REUNIONES.forEach(r => r.participantes.forEach(p => { freq[p] = (freq[p] || 0) + 1; }));
                return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => `
                  <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.82rem">
                    <span style="color:var(--text-secondary)">${name}</span>
                    <span class="badge badge-neutral">${count} reuniones</span>
                  </div>
                `).join('');
              })()}
            </div>
          </div>

          <div class="card" style="padding:16px">
            <h4 style="font-size:0.9rem;margin-bottom:8px;font-family:var(--font-body)">✅ Conformidad</h4>
            <div style="display:flex;align-items:center;gap:10px">
              <div style="flex:1;height:8px;background:var(--bg-body);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${evaluadas ? (conformidadAlta / evaluadas * 100).toFixed(0) : 0}%;background:var(--emerald-500);border-radius:4px"></div>
              </div>
              <span style="font-size:0.82rem;font-weight:600;color:var(--emerald-500)">${evaluadas ? (conformidadAlta / evaluadas * 100).toFixed(0) : 0}%</span>
            </div>
            <p style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">${conformidadAlta} de ${evaluadas} reuniones evaluadas con conformidad alta</p>
          </div>
        </div>
      </div>

      <div class="section-block" style="margin-top:20px;">
        <div class="section-title"><span class="ico">📜</span> Historial de Minutas</div>
        <div class="card">
          ${REUNIONES.filter(r => new Date(r.fecha) < NOW).map(r => `
            <div class="minuta-item" onclick="this.classList.toggle('expanded')">
              <div class="minuta-summary">
                <div>
                  <strong>${r.titulo}</strong>
                  <span style="font-size:0.75rem;color:var(--text-muted);display:block">${fmtDate(r.fecha)} · ${r.modalidad} ${r.lugar ? '· ' + r.lugar : ''}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px">
                  <span class="btn btn-xs btn-outline" style="font-size:0.7rem;padding:2px 8px;cursor:pointer">Ver detalles</span>
                  <span style="font-size:0.7rem;color:var(--text-muted)">▼</span>
                </div>
              </div>
              <div class="minuta-details">
                <div class="info-banner" style="margin:8px 0">📋 Registro de observaciones de la reunión</div>
                <p>${r.minuta}</p>
                <div style="margin-top:8px;font-size:0.82rem">
                  <strong>Participantes:</strong> ${r.participantes.join(', ')}<br>
                  <strong>Conformidad:</strong> ${r.conformidad}
                </div>
                <button class="btn btn-sm btn-secondary" style="margin-top:8px">📄 Descargar minuta</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    famContent.innerHTML = html;

    const calContainer = $id('reuniones-cal-staff');
    if (calContainer) {
      renderCalendar(calContainer, REUNIONES, 'reuniones');
      const calCard = calContainer.querySelector('.card');
      if (calCard) {
        const h3 = calCard.querySelector('h3');
        if (h3) {
          const rightSide = h3.parentElement.querySelector(':scope > div:last-child');
          if (rightSide) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-primary btn-sm';
            btn.id = 'btn-nueva-reunion-staff';
            btn.style.marginRight = '8px';
            btn.textContent = '📊 Programar Reunión';
            rightSide.prepend(btn);
          }
        }
      }
    }

    const btnNueva = $id('btn-nueva-reunion-staff');
    if (btnNueva) {
      btnNueva.addEventListener('click', function () {
        openModal('Programar Nueva Reunión', `
          <div style="min-width:420px">
            <div style="display:flex;flex-direction:column;gap:14px">
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Nombre del residente</label>
                <select class="form-control" id="new-reu-residente-s">
                  ${RESIDENTES.map(r => `<option value="${r.id}">${r.nombre}</option>`).join('')}
                </select>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div>
                  <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Fecha</label>
                  <input type="date" class="form-control" id="new-reu-fecha-s" />
                </div>
                <div>
                  <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Hora</label>
                  <input type="time" class="form-control" id="new-reu-hora-s" value="10:00" />
                </div>
              </div>
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Modalidad</label>
                <select class="form-control" id="new-reu-modalidad-s">
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>
              <div id="new-reu-lugar-wrap-s">
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Lugar</label>
                <select class="form-control" id="new-reu-lugar-s">
                  <option>Salón Comedor Principal</option>
                  <option>Sala de Reuniones 1er Piso</option>
                  <option>Consultorio 1</option>
                  <option>Consultorio 2</option>
                  <option>Salón Multiusos</option>
                </select>
              </div>
              <div>
                <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Participantes (separar con coma)</label>
                <input type="text" class="form-control" id="new-reu-participantes-s" placeholder="Dr. García, Lic. Fernández, Fam. López" />
              </div>
            </div>
          </div>
        `, `<button class="btn btn-secondary" onclick="document.getElementById('modal-overlay').style.display='none'">Cancelar</button>
            <button class="btn btn-primary" id="btn-guardar-reunion-s">Guardar Reunión</button>`);

        const modalidadSel = $id('new-reu-modalidad-s');
        const lugarWrap = $id('new-reu-lugar-wrap-s');
        if (modalidadSel && lugarWrap) {
          modalidadSel.addEventListener('change', function () {
            if (this.value === 'Virtual') {
              lugarWrap.innerHTML = '<label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Link de reunión</label><input type="url" class="form-control" id="new-reu-link-s" placeholder="https://meet.google.com/..." />';
            } else {
              lugarWrap.innerHTML = '<label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:4px">Lugar</label><select class="form-control" id="new-reu-lugar-s"><option>Salón Comedor Principal</option><option>Sala de Reuniones 1er Piso</option><option>Consultorio 1</option><option>Consultorio 2</option><option>Salón Multiusos</option></select>';
            }
          });
        }

        const btnSave = $id('btn-guardar-reunion-s');
        if (btnSave) {
          btnSave.addEventListener('click', function () {
            const resId = $id('new-reu-residente-s')?.value;
            const res = residentePorId(Number(resId));
            const fechaVal = $id('new-reu-fecha-s')?.value;
            const hora = $id('new-reu-hora-s')?.value;
            const modalidad = $id('new-reu-modalidad-s')?.value;
            const participantesRaw = $id('new-reu-participantes-s')?.value || '';
            if (!fechaVal) { showToast('Seleccioná una fecha', 'warning'); return; }
            const [h, m] = (hora || '10:00').split(':').map(Number);
            const fecha = new Date(fechaVal + 'T12:00:00');
            fecha.setHours(h, m);
            const participantes = participantesRaw.split(',').map(s => s.trim()).filter(Boolean);
            if (res) participantes.unshift('Fam. ' + res.nombre.split(' ').pop());
            const lugar = modalidad === 'Presencial' ? ($id('new-reu-lugar-s')?.value || '') : '';
            const link = modalidad === 'Virtual' ? ($id('new-reu-link-s')?.value || '') : '';
            REUNIONES.push({
              id: 'reu-new-' + Date.now(),
              titulo: 'Reunión mensual: ' + (res ? res.nombre : 'Residente'),
              fecha: fecha,
              modalidad: modalidad,
              lugar: lugar,
              link: link,
              proxima: true,
              estado: 'pendiente',
              participantes: participantes,
              minuta: 'Reunión programada. La minuta será completada tras la reunión.',
              conformidad: 'Pendiente',
            });
            REUNIONES.sort((a, b) => a.fecha - b.fecha);
            closeModal();
            showToast('Reunión programada exitosamente', 'success');
            FAM_RENDERS['reuniones-staff']();
          });
        }
      });
    }
  };

  // --- Reuniones (Familiares) ---
  FAM_RENDERS.reuniones = function () {
    const prox = REUNIONES.find(r => r.proxima && r.estado !== 'cancelada');
    const isComunicacion = currentEnv === 'comunicacion';
    const res = residentePorId(currentFamResident);

    let html = '';

    if (isComunicacion) {
      const todasReu = REUNIONES.length;
      const evaluadasReu = REUNIONES.filter(r => r.conformidad !== 'Pendiente').length;
      const conformidadAlta = REUNIONES.filter(r => r.conformidad === 'Alta').length;
      html = `
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
            ${REUNIONES.filter(r => new Date(r.fecha) < NOW).map(r => `
              <div class="minuta-item" onclick="this.classList.toggle('expanded')">
                <div class="minuta-summary">
                  <div>
                    <strong>${r.titulo}</strong><br>
                    <small>${fmtDate(r.fecha)} · ${r.modalidad} ${r.lugar ? '· ' + r.lugar : ''}</small>
                  </div>
                  <div>
                    <span class="btn btn-xs btn-outline" style="font-size:0.7rem;padding:2px 8px;cursor:pointer">Ver detalles</span>
                    <span style="margin-left:8px;font-size:0.8rem">▼</span>
                  </div>
                </div>
                <div class="minuta-details">
                  <div class="info-banner" style="margin:8px 0">📋 Registro de observaciones de la reunión</div>
                  <p>${r.minuta}</p>
                  <div style="margin-top:8px;font-size:0.85rem">
                    <strong>Participantes:</strong> ${r.participantes.join(', ')}<br>
                    <strong>Conformidad:</strong> ${r.conformidad}
                  </div>
                  <button class="btn btn-sm btn-secondary" style="margin-top:8px">📄 Descargar minuta</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px">
          <div class="card" style="padding:16px">
            <h4 style="font-size:0.9rem;margin-bottom:8px;font-family:var(--font-body)">👥 Participantes Frecuentes</h4>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${(() => {
                const freq = {};
                REUNIONES.forEach(r => r.participantes.forEach(p => { freq[p] = (freq[p] || 0) + 1; }));
                return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, count]) => `
                  <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.82rem">
                    <span style="color:var(--text-secondary)">${name}</span>
                    <span class="badge badge-neutral">${count} reuniones</span>
                  </div>
                `).join('');
              })()}
            </div>
          </div>

          <div class="card" style="padding:16px">
            <h4 style="font-size:0.9rem;margin-bottom:8px;font-family:var(--font-body)">✅ Conformidad</h4>
            <div style="display:flex;align-items:center;gap:10px">
              <div style="flex:1;height:8px;background:var(--bg-body);border-radius:4px;overflow:hidden">
                <div style="height:100%;width:${evaluadasReu ? (conformidadAlta / evaluadasReu * 100).toFixed(0) : 0}%;background:var(--emerald-500);border-radius:4px"></div>
              </div>
              <span style="font-size:0.82rem;font-weight:600;color:var(--emerald-500)">${evaluadasReu ? (conformidadAlta / evaluadasReu * 100).toFixed(0) : 0}%</span>
            </div>
            <p style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">${conformidadAlta} de ${evaluadasReu} reuniones evaluadas con conformidad alta</p>
          </div>
        </div>
      `;
    } else {
      const estadoResp = prox?.respuestaFamiliar?.[currentFamResident];
      html = `
        <div class="section-block">
          <div class="section-title" style="font-size:1rem;color:var(--primary)"><span class="ico">📅</span> Solicitud de Reunión</div>
          ${prox ? `
            <div class="meeting-card" style="margin-bottom:0">
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
                <div style="margin-top:14px;padding:14px;background:var(--bg-body);border-radius:10px;font-size:0.85rem">
                  ${!estadoResp ? `
                    <p style="margin-bottom:12px">El equipo ha propuesto esta fecha para tu reunión de seguimiento. ¿Te gustaría confirmar tu asistencia?</p>
                    <div style="display:flex;gap:8px">
                      <button class="btn btn-primary btn-sm" id="btn-aceptar-reunion">✅ Aceptar</button>
                      <button class="btn btn-secondary btn-sm" id="btn-rechazar-reunion">❌ Rechazar</button>
                    </div>
                  ` : estadoResp === 'aceptada' ? `
                    <p>✅ <strong>Has aceptado esta reunión.</strong> Te esperamos el día indicado.</p>
                    ${prox.modalidad === 'Virtual' && prox.link ? `
                      <button class="btn btn-primary btn-sm" style="margin-top:10px" onclick="window.open('${prox.link}','_blank')">🔗 Unirse a videollamada</button>
                    ` : ''}
                  ` : `
                    <p>❌ <strong>Has rechazado esta reunión.</strong> El equipo se comunicará para reprogramar una nueva fecha.</p>
                  `}
                </div>
              </div>
            </div>
          ` : '<p style="font-size:0.85rem;color:var(--text-muted)">No hay solicitudes de reunión pendientes.</p>'}
        </div>
      `;

      const pasadas = REUNIONES.filter(r => !r.proxima && new Date(r.fecha) < NOW && (res ? r.titulo.includes(res.nombre) : false)).map(r => {
        const variedad = ['Alta', 'Media', 'Baja'];
        const confActual = r.conformidad !== 'Pendiente' ? r.conformidad : variedad[Math.floor(Math.random() * 3)];
        return { ...r, conformidad: confActual };
      });
      if (pasadas.length) {
        html += `
          <div class="section-block">
            <div class="section-title" style="font-size:1rem"><span class="ico">📜</span> Reuniones Pasadas</div>
            <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:10px">Cada reunión tiene una valoración de conformidad según la experiencia del familiar.</p>
            <div class="card">
              ${pasadas.map(r => `
                <div class="minuta-item" onclick="this.classList.toggle('expanded')">
                  <div class="minuta-summary">
                    <div>
                      <strong>${r.titulo}</strong><br>
                      <small>${fmtDate(r.fecha)} · ${r.modalidad} ${r.lugar ? '· ' + r.lugar : ''}</small>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                      <span class="badge badge-${r.conformidad === 'Alta' ? 'success' : r.conformidad === 'Media' ? 'warning' : 'neutral'}" title="Nivel de conformidad">${r.conformidad}</span>
                      <span class="btn btn-xs btn-outline" style="font-size:0.7rem;padding:2px 8px;cursor:pointer">Ver detalles</span>
                      <span style="margin-left:4px;font-size:0.8rem">▼</span>
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
              `).join('')}
            </div>
          </div>
        `;
      }
    }

    famContent.innerHTML = html;

    if (!isComunicacion && prox) {
      const btnAceptar = $id('btn-aceptar-reunion');
      const btnRechazar = $id('btn-rechazar-reunion');
      if (btnAceptar) {
        btnAceptar.addEventListener('click', function () {
          if (!prox.respuestaFamiliar) prox.respuestaFamiliar = {};
          prox.respuestaFamiliar[currentFamResident] = 'aceptada';
          showToast('Has aceptado la reunión', 'success');
          FAM_RENDERS.reuniones();
        });
      }
      if (btnRechazar) {
        btnRechazar.addEventListener('click', function () {
          if (!prox.respuestaFamiliar) prox.respuestaFamiliar = {};
          prox.respuestaFamiliar[currentFamResident] = 'rechazada';
          showToast('Has rechazado la reunión', 'info');
          FAM_RENDERS.reuniones();
        });
      }
    }
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
  renderInternalView('calendario');
  renderFamView('reportes');

})();
