import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial Data
const INITIAL_EVENTS = [
    // --- ENERO ---
    { id: 101, date: '2026-01-01', title: 'Santa María Madre de Dios (Paz)', category: 'diocese', type: 'Solemnidad' },
    { id: 102, date: '2026-01-02', title: 'San Basilio Magno', category: 'diocese', type: 'Memoria' },
    { id: 103, date: '2026-01-03', title: 'Santísimo Nombre de Jesús', category: 'diocese', type: 'Memoria' },
    { id: 104, date: '2026-01-06', title: 'Epifanía del Señor', category: 'diocese', type: 'Solemnidad' },
    { id: 105, date: '2026-01-08', title: 'Campamento Juvenil (Corpus Christi)', category: 'diocese', type: 'Actividad' },
    { id: 106, date: '2026-01-09', title: 'Campamento Juvenil (Corpus Christi)', category: 'diocese', type: 'Actividad' },
    { id: 107, date: '2026-01-10', title: 'Campamento Juvenil (Corpus Christi)', category: 'diocese', type: 'Actividad' },
    { id: 108, date: '2026-01-11', title: 'Campamento Juvenil (Corpus Christi) / Bautismo del Señor', category: 'diocese', type: 'Fiesta' },
    { id: 109, date: '2026-01-15', title: 'San Arnoldo Janssen', category: 'svd', type: 'Solemnidad', desc: 'Fundador de la Congregación del Verbo Divino' },
    { id: 110, date: '2026-01-20', title: 'Cumpleaños de Mons. Juan R. Martínez', category: 'diocese', type: 'Cumpleaños', desc: 'Obispo de Posadas' },
    { id: 111, date: '2026-01-25', title: 'Domingo de la Palabra', category: 'diocese', type: 'Actividad' },
    { id: 112, date: '2026-01-29', title: 'San José Freinademetz', category: 'svd', type: 'Memoria', desc: 'Primer misionero SVD en China' },

    // --- FEBRERO ---
    { id: 201, date: '2026-02-02', title: 'Presentación del Señor', category: 'diocese', type: 'Fiesta' },
    { id: 202, date: '2026-02-11', title: 'Virgen de Lourdes', category: 'diocese', type: 'Memoria' },
    { id: 203, date: '2026-02-16', title: 'Carnaval (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 204, date: '2026-02-17', title: 'Carnaval (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 205, date: '2026-02-18', title: 'Miércoles de Ceniza', category: 'diocese', type: 'Liturgia', desc: 'Inicio de la Cuaresma' },
    { id: 206, date: '2026-02-28', title: 'Asamblea Diocesana de Juventud', category: 'diocese', type: 'Asamblea' },

    // --- MARZO ---
    { id: 301, date: '2026-03-01', title: 'Asamblea Diocesana de Juventud', category: 'diocese', type: 'Asamblea' },
    { id: 302, date: '2026-03-02', title: 'Inicio de clases', category: 'diocese', type: 'Actividad' },
    { id: 303, date: '2026-03-07', title: 'Distrito Alto Uruguay', category: 'diocese', type: 'Reunión' },
    { id: 304, date: '2026-03-09', title: 'Consejo Diocesano', category: 'diocese', type: 'Reunión' },
    { id: 305, date: '2026-03-10', title: '25º Aniv. Episcopal de Mons. Martínez', category: 'diocese', type: 'Aniversario' },
    { id: 306, date: '2026-03-14', title: 'Chaco / Colecta Cuaresmal (1%)', category: 'diocese', type: 'Colecta' },
    { id: 307, date: '2026-03-15', title: 'Colecta Cuaresmal (1%)', category: 'diocese', type: 'Colecta' },
    { id: 308, date: '2026-03-19', title: 'San José (Patrono de Posadas) / 13º Aniv. Papa Francisco', category: 'diocese', type: 'Solemnidad', desc: '32º Aniv. de Ordenación de Mons. Martínez' },
    { id: 309, date: '2026-03-21', title: 'Puerto Rico', category: 'diocese', type: 'Reunión' },
    { id: 310, date: '2026-03-24', title: 'Posadas / Día de la Memoria (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 311, date: '2026-03-25', title: 'La Anunciación', category: 'diocese', type: 'Solemnidad' },
    { id: 312, date: '2026-03-27', title: 'Retiro de Equipos de Conducción', category: 'diocese', type: 'Retiro' },
    { id: 313, date: '2026-03-29', title: 'Domingo de Ramos', category: 'diocese', type: 'Semana Santa' },

    // --- ABRIL ---
    { id: 401, date: '2026-04-02', title: 'Jueves Santo / Misa Crismal / Malvinas (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 402, date: '2026-04-03', title: 'Viernes Santo / Colecta Tierra Santa (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 403, date: '2026-04-05', title: 'Pascua de Resurrección', category: 'diocese', type: 'Solemnidad' },
    { id: 404, date: '2026-04-13', title: 'Semana de Formación del Clero', category: 'diocese', type: 'Formación' },
    { id: 405, date: '2026-04-14', title: 'Semana de Formación del Clero', category: 'diocese', type: 'Formación' },
    { id: 406, date: '2026-04-15', title: 'Semana de Formación del Clero', category: 'diocese', type: 'Formación' },
    { id: 407, date: '2026-04-16', title: 'Semana de Formación del Clero', category: 'diocese', type: 'Formación' },
    { id: 408, date: '2026-04-19', title: 'San Expedito', category: 'diocese', type: 'Fiesta' },
    { id: 409, date: '2026-04-25', title: 'Bicicleteada Solidaria', category: 'diocese', type: 'Actividad' },
    { id: 410, date: '2026-04-27', title: 'Día del Obispo', category: 'diocese', type: 'Fiesta' },

    // --- MAYO ---
    { id: 501, date: '2026-05-01', title: 'San José Obrero (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 502, date: '2026-05-02', title: 'Colecta Obras Pastorales', category: 'diocese', type: 'Colecta' },
    { id: 503, date: '2026-05-03', title: 'Colecta Obras Pastorales', category: 'diocese', type: 'Colecta' },
    { id: 504, date: '2026-05-08', title: 'Virgen de Luján', category: 'diocese', type: 'Solemnidad' },
    { id: 505, date: '2026-05-10', title: 'Peregrinación a Fátima', category: 'diocese', type: 'Peregrinación' },
    { id: 506, date: '2026-05-11', title: 'Reunión de Consejo', category: 'diocese', type: 'Reunión' },
    { id: 507, date: '2026-05-13', title: 'Virgen de Fátima', category: 'diocese', type: 'Fiesta' },
    { id: 508, date: '2026-05-16', title: '39º Aniv. Diócesis de Iguazú', category: 'diocese', type: 'Aniversario' },
    { id: 509, date: '2026-05-17', title: 'La Ascensión del Señor', category: 'diocese', type: 'Solemnidad' },
    { id: 510, date: '2026-05-24', title: 'Pentecostés', category: 'diocese', type: 'Solemnidad' },
    { id: 511, date: '2026-05-25', title: 'Revolución de Mayo (Feriado) / Asamblea Zonal', category: 'diocese', type: 'Feriado' },
    { id: 512, date: '2026-05-26', title: 'Asamblea Zonal de Formación', category: 'diocese', type: 'Formación' },
    { id: 513, date: '2026-05-27', title: 'Asamblea Zonal de Formación', category: 'diocese', type: 'Formación' },
    { id: 514, date: '2026-05-28', title: 'Asamblea Zonal de Formación', category: 'diocese', type: 'Formación' },
    { id: 515, date: '2026-05-29', title: 'Asamblea Zonal de Formación', category: 'diocese', type: 'Formación' },
    { id: 516, date: '2026-05-30', title: 'Asamblea Zonal de Formación', category: 'diocese', type: 'Formación' },

    // --- JUNIO ---
    { id: 601, date: '2026-06-06', title: 'Colecta Anual de Cáritas', category: 'diocese', type: 'Colecta' },
    { id: 602, date: '2026-06-07', title: 'Corpus Christi / Colecta Cáritas', category: 'diocese', type: 'Solemnidad' },
    { id: 603, date: '2026-06-12', title: 'Sagrado Corazón de Jesús', category: 'diocese', type: 'Fiesta' },
    { id: 604, date: '2026-06-13', title: '17º Aniv. Diócesis de Oberá', category: 'diocese', type: 'Aniversario' },
    { id: 605, date: '2026-06-15', title: 'Reunión de Consejo', category: 'diocese', type: 'Reunión' },
    { id: 606, date: '2026-06-17', title: 'Gral. Güemes (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 607, date: '2026-06-20', title: 'Día de la Bandera (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 608, date: '2026-06-29', title: 'San Pedro y San Pablo', category: 'diocese', type: 'Solemnidad' },

    // --- JULIO ---
    { id: 701, date: '2026-07-04', title: 'Colecta para la Caridad del Papa', category: 'diocese', type: 'Colecta' },
    { id: 702, date: '2026-07-05', title: 'Colecta para la Caridad del Papa', category: 'diocese', type: 'Colecta' },
    { id: 703, date: '2026-07-06', title: 'Aniv. creación Diócesis de Posadas (1957)', category: 'diocese', type: 'Aniversario' },
    { id: 704, date: '2026-07-09', title: 'Virgen de Itatí / Independencia (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 705, date: '2026-07-13', title: 'Reunión de Consejo / Inicio Receso Invernal', category: 'diocese', type: 'Reunión' },
    { id: 706, date: '2026-07-16', title: 'Virgen del Carmen', category: 'diocese', type: 'Memoria' },
    { id: 707, date: '2026-07-24', title: 'Fin Receso Invernal', category: 'diocese', type: 'Actividad' },
    { id: 708, date: '2026-07-26', title: 'San Joaquín y Santa Ana', category: 'diocese', type: 'Memoria' },
    { id: 709, date: '2026-07-31', title: 'San Ignacio de Loyola (Patrono Posadas)', category: 'diocese', type: 'Solemnidad' },

    // --- AGOSTO ---
    { id: 801, date: '2026-08-03', title: 'Reunión de Consejo', category: 'diocese', type: 'Reunión' },
    { id: 802, date: '2026-08-07', title: 'San Cayetano', category: 'diocese', type: 'Fiesta' },
    { id: 803, date: '2026-08-15', title: 'Asunción de la Virgen', category: 'diocese', type: 'Solemnidad' },
    { id: 804, date: '2026-08-17', title: 'Gral. San Martín (Feriado) / Retiro del Clero', category: 'diocese', type: 'Feriado' },
    { id: 805, date: '2026-08-18', title: 'Retiro Anual del Clero', category: 'diocese', type: 'Retiro' },
    { id: 806, date: '2026-08-19', title: 'Retiro Anual del Clero', category: 'diocese', type: 'Retiro' },
    { id: 807, date: '2026-08-20', title: 'Retiro Anual del Clero', category: 'diocese', type: 'Retiro' },
    { id: 808, date: '2026-08-21', title: 'Día del Catequista / Retiro del Clero', category: 'diocese', type: 'Fiesta' },
    { id: 809, date: '2026-08-23', title: 'Santa Rosa de Lima', category: 'diocese', type: 'Fiesta' },

    // --- SEPTIEMBRE ---
    { id: 901, date: '2026-09-05', title: 'Retiro para Educadores', category: 'diocese', type: 'Retiro' },
    { id: 902, date: '2026-09-07', title: 'Virgen del Rosario (Oberá) / Asamblea ARE', category: 'diocese', type: 'Fiesta' },
    { id: 903, date: '2026-09-08', title: 'Natividad de María / 151º Aniv. SVD / Asamblea ARE', category: 'svd', type: 'Fundación' },
    { id: 904, date: '2026-09-09', title: 'Asamblea Provincial ARE', category: 'diocese', type: 'Asamblea' },
    { id: 905, date: '2026-09-10', title: 'Asamblea Provincial ARE', category: 'diocese', type: 'Asamblea' },
    { id: 906, date: '2026-09-12', title: 'Colecta Más por Menos', category: 'diocese', type: 'Colecta' },
    { id: 907, date: '2026-09-13', title: 'Colecta Más por Menos', category: 'diocese', type: 'Colecta' },
    { id: 908, date: '2026-09-14', title: 'Exaltación de la Cruz', category: 'diocese', type: 'Fiesta' },
    { id: 909, date: '2026-09-19', title: 'Peregrinación Juvenil a Itatí', category: 'diocese', type: 'Peregrinación' },
    { id: 910, date: '2026-09-20', title: 'Peregrinación Juvenil a Itatí', category: 'diocese', type: 'Peregrinación' },
    { id: 911, date: '2026-09-21', title: 'Día del Estudiante', category: 'diocese', type: 'Actividad' },
    { id: 912, date: '2026-09-29', title: 'Santos Arcángeles', category: 'diocese', type: 'Fiesta' },

    // --- OCTUBRE ---
    { id: 1001, date: '2026-10-04', title: 'San Francisco de Asís', category: 'diocese', type: 'Memoria' },
    { id: 1002, date: '2026-10-10', title: 'Colecta Mundial por las Misiones', category: 'diocese', type: 'Colecta' },
    { id: 1003, date: '2026-10-11', title: 'Colecta Mundial por las Misiones', category: 'diocese', type: 'Colecta' },
    { id: 1004, date: '2026-10-12', title: 'Diversidad Cultural (Feriado) / Consejo (El Soberbio)', category: 'diocese', type: 'Feriado' },
    { id: 1005, date: '2026-10-18', title: 'Día de la Madre', category: 'diocese', type: 'Actividad' },

    // --- NOVIEMBRE ---
    { id: 1101, date: '2026-11-01', title: 'Todos los Santos', category: 'diocese', type: 'Solemnidad' },
    { id: 1102, date: '2026-11-02', title: 'Fieles Difuntos', category: 'diocese', type: 'Liturgia' },
    { id: 1103, date: '2026-11-06', title: 'Colecta Obras Diocesanas', category: 'diocese', type: 'Colecta' },
    { id: 1104, date: '2026-11-07', title: 'Colecta Obras Diocesanas', category: 'diocese', type: 'Colecta' },
    { id: 1105, date: '2026-11-09', title: 'Reunión de Consejo (San Javier)', category: 'diocese', type: 'Reunión' },
    { id: 1106, date: '2026-11-10', title: 'Plenaria de la CEA (Obispos)', category: 'diocese', type: 'Reunión' },
    { id: 1107, date: '2026-11-14', title: 'Peregrinación a Loreto', category: 'diocese', type: 'Peregrinación' },
    { id: 1108, date: '2026-11-15', title: 'Peregrinación a Loreto', category: 'diocese', type: 'Peregrinación' },
    { id: 1109, date: '2026-11-17', title: 'Santos Mártires de las Misiones', category: 'diocese', type: 'Fiesta' },
    { id: 1110, date: '2026-11-22', title: 'Cristo Rey', category: 'diocese', type: 'Solemnidad' },
    { id: 1111, date: '2026-11-29', title: '1° Domingo de Adviento', category: 'diocese', type: 'Liturgia' },

    // --- DICIEMBRE ---
    { id: 1201, date: '2026-12-05', title: 'Colecta para Migrantes', category: 'diocese', type: 'Colecta' },
    { id: 1202, date: '2026-12-06', title: 'Colecta para Migrantes', category: 'diocese', type: 'Colecta' },
    { id: 1203, date: '2026-12-07', title: 'Reunión de Consejo', category: 'diocese', type: 'Reunión' },
    { id: 1204, date: '2026-12-08', title: 'Inmaculada Concepción (Feriado) / 18º Aniv. Mons. Bitar', category: 'diocese', type: 'Feriado' },
    { id: 1205, date: '2026-12-22', title: '47º Aniv. Sacerdotal Mons. Juan R. Martínez', category: 'diocese', type: 'Aniversario' },
    { id: 1206, date: '2026-12-25', title: 'Navidad (Feriado)', category: 'diocese', type: 'Feriado' },
    { id: 1207, date: '2026-12-27', title: 'Sagrada Familia', category: 'diocese', type: 'Fiesta' },
];

const EventsContext = createContext();

export function EventsProvider({ children }) {
    // Load from localStorage if available, else use initial data
    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('icm_events');
        return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    });

    useEffect(() => {
        localStorage.setItem('icm_events', JSON.stringify(events));
    }, [events]);

    const addEvent = (newEvent) => {
        setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    };

    const updateEvent = (id, updatedEvent) => {
        setEvents(prev => prev.map(ev => ev.id === id ? { ...updatedEvent, id } : ev));
    };

    const deleteEvent = (id) => {
        setEvents(prev => prev.filter(ev => ev.id !== id));
    };

    return (
        <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    return useContext(EventsContext);
}
