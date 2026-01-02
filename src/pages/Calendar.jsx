import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Users, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    parseISO
} from 'date-fns';
import { es } from 'date-fns/locale';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';

const motivationalMessages = [
    "¡Hoy es un gran día para compartir el amor de Dios!",
    "Que la paz del Señor te acompañe en cada paso que des hoy.",
    "A veces, el mejor plan es simplemente confiar en los tiempos de Dios.",
    "Todo lo puedo en Cristo que me fortalece. (Filipenses 4:13)",
    "La alegría del Señor es nuestra fuerza. ¡Ánimo!",
    "Que tu jornada esté llena de esperanza y de luz.",
    "Hoy es un regalo de Dios, ¡disfrútalo plenamente!",
    "Deja que el Espíritu Santo guíe tus pensamientos y acciones hoy.",
    "Un corazón agradecido es un imán para las bendiciones.",
    "Sé valiente y confía, porque el Señor tu Dios está contigo."
];

const getMotivationalMessage = (date) => {
    if (!date) return "";
    const index = (date.getDate() + date.getMonth() * 31) % motivationalMessages.length;
    return motivationalMessages[index];
};

export default function Calendar({ embedded = false, onDateSelect }) {
    const { events, addEvent, updateEvent, deleteEvent } = useEvents();
    const { isAuthenticated } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDate, setSelectedDate] = useState(null);

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const resetDate = () => {
        const today = new Date();
        setCurrentDate(today);
        handleDateClick(today);
    };

    const handleDateClick = (day) => {
        setSelectedDate(day);
        if (onDateSelect) onDateSelect(day);
        if (!isSameMonth(day, currentDate)) setCurrentDate(day);
    };

    // Generate Calendar Grid
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: es });
    const endDate = endOfWeek(monthEnd, { locale: es });

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Filtering logic
    const displayedEvents = events.filter(ev => {
        if (selectedCategory === 'all') return true;
        return ev.category === selectedCategory;
    });

    const getEventsForDay = (day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        return displayedEvents.filter(ev => ev.date === dateStr);
    };

    const getEventsForMonthList = () => {
        return displayedEvents.filter(ev => isSameMonth(parseISO(ev.date), currentDate))
            .sort((a, b) => parseISO(a.date) - parseISO(b.date));
    };

    const selectedDateEvents = selectedDate ? getEventsForDay(selectedDate) : [];

    // Helper function to get color based on event type
    const getEventColor = (type) => {
        const typeMap = {
            'Solemnidad': { bg: 'var(--color-solemnidad-light)', color: 'var(--color-solemnidad)' },
            'Fiesta': { bg: 'var(--color-fiesta-light)', color: 'var(--color-fiesta)' },
            'Memoria': { bg: 'var(--color-memoria-light)', color: 'var(--color-memoria)' },
            'Liturgia': { bg: 'var(--color-liturgia-light)', color: 'var(--color-liturgia)' },
            'Actividad': { bg: 'var(--color-actividad-light)', color: 'var(--color-actividad)' },
            'Reunión': { bg: 'var(--color-reunion-light)', color: 'var(--color-reunion)' },
            'Colecta': { bg: 'var(--color-colecta-light)', color: 'var(--color-colecta)' },
            'Peregrinación': { bg: 'var(--color-peregrinacion-light)', color: 'var(--color-peregrinacion)' },
            'Retiro': { bg: 'var(--color-retiro-light)', color: 'var(--color-retiro)' },
            'Asamblea': { bg: 'var(--color-asamblea-light)', color: 'var(--color-asamblea)' },
            'Formación': { bg: 'var(--color-formacion-light)', color: 'var(--color-formacion)' },
            'Feriado': { bg: 'var(--color-feriado-light)', color: 'var(--color-feriado)' },
            'Cumpleaños': { bg: 'var(--color-cumpleanos-light)', color: 'var(--color-cumpleanos)' },
            'Aniversario': { bg: 'var(--color-aniversario-light)', color: 'var(--color-aniversario)' },
            'Semana Santa': { bg: 'var(--color-solemnidad-light)', color: 'var(--color-solemnidad)' },
            'Fundación': { bg: 'var(--color-svd-green-light)', color: 'var(--color-svd-green)' },
        };
        return typeMap[type] || { bg: 'var(--color-default-light)', color: 'var(--color-default)' };
    };

    return (
        <div className={embedded ? "" : "container p-4"} style={embedded ? {} : { paddingBottom: '100px' }}>

            {/* Header Section */}
            {!embedded && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Agenda {format(currentDate, 'yyyy')}</h1>
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                            Parroquia Inm. Corazón de María
                        </p>
                    </div>
                </div>
            )}

            {/* Calendar Widget */}
            <div style={{ background: 'white', borderRadius: '2rem', boxShadow: 'var(--shadow-lg)', padding: '1.5rem', marginBottom: '2.5rem', border: '1px solid var(--color-border)' }}>
                {/* Month Navigator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                    <h3 style={{ textTransform: 'capitalize', margin: 0, fontSize: '1.3rem', fontWeight: '800', color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                        {format(currentDate, 'MMMM yyyy', { locale: es })}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <button onClick={prevMonth} className="btn" style={{ padding: '0.6rem', background: 'var(--color-surface-soft)', borderRadius: '0.8rem', border: 'none', color: 'var(--color-text-secondary)' }}><ChevronLeft size={20} /></button>
                        <button onClick={resetDate} className="btn" style={{ padding: '0.6rem 1.1rem', background: 'var(--color-svd-green-light)', borderRadius: '0.8rem', border: 'none', fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-svd-green)' }}>Hoy</button>
                        <button onClick={nextMonth} className="btn" style={{ padding: '0.6rem', background: 'var(--color-surface-soft)', borderRadius: '0.8rem', border: 'none', color: 'var(--color-text-secondary)' }}><ChevronRight size={20} /></button>
                    </div>
                </div>

                {/* Days Header */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '1rem', textAlign: 'center' }}>
                    {['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'].map((d, i) => (
                        <div key={i} style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d}</div>
                    ))}
                </div>

                {/* Days Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                    {days.map((day, idx) => {
                        const dayEvents = getEventsForDay(day);
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const isTodayDate = isToday(day);

                        return (
                            <div
                                key={idx}
                                onClick={() => handleDateClick(day)}
                                style={{
                                    aspectRatio: '1',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '1rem',
                                    cursor: 'pointer',
                                    background: isSelected ? 'var(--color-svd-green)' : (isTodayDate ? 'var(--color-svd-red-light)' : 'transparent'),
                                    color: isSelected ? 'white' : (isTodayDate ? 'var(--color-svd-red)' : (isCurrentMonth ? 'var(--color-text-primary)' : 'var(--color-text-muted)')),
                                    position: 'relative',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: isTodayDate && !isSelected ? '1px solid var(--color-svd-red-light)' : '1px solid transparent',
                                    boxShadow: isSelected ? '0 4px 12px rgba(22, 101, 52, 0.3)' : 'none'
                                }}
                            >
                                <span style={{ fontSize: '0.95rem', fontWeight: isTodayDate || isSelected ? 'bold' : '500' }}>
                                    {format(day, 'd')}
                                </span>
                                {dayEvents.length > 0 && (
                                    <div style={{
                                        display: 'flex',
                                        gap: '2px',
                                        position: 'absolute',
                                        bottom: '6px',
                                        background: isSelected ? 'rgba(255,255,255,0.3)' : 'transparent',
                                        padding: '1px 3px',
                                        borderRadius: '4px'
                                    }}>
                                        {dayEvents.slice(0, 3).map((ev, i) => {
                                            const eventColors = getEventColor(ev.type);
                                            return (
                                                <div key={i} style={{
                                                    width: '5px', height: '5px', borderRadius: '50%',
                                                    background: isSelected ? 'white' : eventColors.color,
                                                    border: isSelected ? 'none' : `1px solid ${eventColors.color}`
                                                }} />
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Details Section - NEW IN-LINE DISPLAY */}
            {selectedDate && (
                <div style={{
                    marginBottom: '2.5rem',
                    padding: '1.5rem',
                    background: 'var(--color-section-green)',
                    borderRadius: '2rem',
                    border: '1px solid var(--color-svd-green-light)',
                    animation: 'fadeIn 0.3s ease-out',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>
                            {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                        </h3>
                        <button
                            onClick={() => setSelectedDate(null)}
                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {selectedDateEvents.length > 0 ? (
                            selectedDateEvents.map((ev, idx) => (
                                <div key={idx}
                                    onClick={() => handleDateClick(selectedDate)} // Trigger modal on click if needed
                                    style={{ cursor: 'pointer' }}
                                >
                                    <EventCard event={ev} />
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                                <p style={{ margin: '0 0 0.5rem 0', color: 'var(--color-svd-green)', fontSize: '1rem', fontWeight: '600', fontStyle: 'italic' }}>
                                    "{getMotivationalMessage(selectedDate)}"
                                </p>
                                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>
                                    No hay actividades programadas.
                                </p>
                            </div>
                        )}
                        {isAuthenticated && (
                            <button
                                onClick={() => handleDateClick(selectedDate)} // Still trigger modal for management
                                style={{
                                    marginTop: '0.5rem',
                                    padding: '0.5rem',
                                    borderRadius: '0.75rem',
                                    border: '1px dashed #cbd5e1',
                                    background: 'transparent',
                                    color: 'var(--color-svd-green)',
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer'
                                }}
                            >
                                + Agregar actividad
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Featured Events List */}
            <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-primary)' }}>
                    <CalendarIcon size={22} className="text-primary" />
                    Agenda de {format(currentDate, 'MMMM', { locale: es })}
                </h3>

                {getEventsForMonthList().length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--color-text-secondary)', background: 'white', borderRadius: '2rem', border: '2px dashed var(--color-border)' }}>
                        <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>No hay eventos programados en este mes.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {getEventsForMonthList().map((ev, idx) => (
                            <div key={idx} onClick={() => handleDateClick(parseISO(ev.date))} style={{ cursor: 'pointer' }}>
                                <EventCard event={ev} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Day Detail Modal - Keep for editing/adding and deep details */}
            {selectedDate && (
                <DayDetailModal
                    date={selectedDate}
                    events={selectedDateEvents}
                    onClose={() => setSelectedDate(null)}
                    onAdd={(evt) => addEvent({ ...evt, date: format(selectedDate, 'yyyy-MM-dd') })}
                    onUpdate={updateEvent}
                    onDelete={deleteEvent}
                />
            )}
        </div>
    );
}

// Components
function FilterPill({ label, active, onClick, icon: Icon, color }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                border: active ? `1px solid ${color || 'var(--color-text-primary)'}` : '1px solid var(--color-border)',
                background: active ? (color || 'var(--color-text-primary)') : 'white',
                color: active ? 'white' : 'var(--color-text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                cursor: 'pointer'
            }}
        >
            {Icon && <Icon size={14} />}
            {label}
        </button>
    );
}

function EventCard({ event }) {
    const getEventColor = (type) => {
        const typeMap = {
            'Solemnidad': { bg: 'var(--color-solemnidad-light)', color: 'var(--color-solemnidad)' },
            'Fiesta': { bg: 'var(--color-fiesta-light)', color: 'var(--color-fiesta)' },
            'Memoria': { bg: 'var(--color-memoria-light)', color: 'var(--color-memoria)' },
            'Liturgia': { bg: 'var(--color-liturgia-light)', color: 'var(--color-liturgia)' },
            'Actividad': { bg: 'var(--color-actividad-light)', color: 'var(--color-actividad)' },
            'Reunión': { bg: 'var(--color-reunion-light)', color: 'var(--color-reunion)' },
            'Colecta': { bg: 'var(--color-colecta-light)', color: 'var(--color-colecta)' },
            'Peregrinación': { bg: 'var(--color-peregrinacion-light)', color: 'var(--color-peregrinacion)' },
            'Retiro': { bg: 'var(--color-retiro-light)', color: 'var(--color-retiro)' },
            'Asamblea': { bg: 'var(--color-asamblea-light)', color: 'var(--color-asamblea)' },
            'Formación': { bg: 'var(--color-formacion-light)', color: 'var(--color-formacion)' },
            'Feriado': { bg: 'var(--color-feriado-light)', color: 'var(--color-feriado)' },
            'Cumpleaños': { bg: 'var(--color-cumpleanos-light)', color: 'var(--color-cumpleanos)' },
            'Aniversario': { bg: 'var(--color-aniversario-light)', color: 'var(--color-aniversario)' },
            'Semana Santa': { bg: 'var(--color-solemnidad-light)', color: 'var(--color-solemnidad)' },
            'Fundación': { bg: 'var(--color-svd-green-light)', color: 'var(--color-svd-green)' },
        };
        return typeMap[type] || { bg: 'var(--color-default-light)', color: 'var(--color-default)' };
    };

    const eventColors = getEventColor(event.type);
    const dateObj = parseISO(event.date);

    return (
        <div style={{
            display: 'flex',
            background: 'white',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'transform 0.2s'
        }}>
            <div style={{
                background: eventColors.color,
                width: '6px',
                flexShrink: 0
            }} />
            <div style={{ padding: '1rem', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: eventColors.color,
                        letterSpacing: '0.05em'
                    }}>
                        {format(dateObj, 'd MMM', { locale: es })}
                    </span>
                    <span style={{
                        fontSize: '0.7rem',
                        padding: '3px 8px',
                        borderRadius: '0.5rem',
                        background: eventColors.bg,
                        color: eventColors.color,
                        fontWeight: '600'
                    }}>
                        {event.type}
                    </span>
                </div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{event.title}</h4>
                {event.desc && (
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        {event.desc}
                    </p>
                )}
            </div>
        </div>
    );
}

function DayDetailModal({ date, events, onClose, onAdd, onUpdate, onDelete }) {
    const { isAuthenticated } = useAuth();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', type: '', desc: '', category: 'diocese' });

    const handleStartAdd = () => {
        setFormData({ title: '', type: 'Evento', desc: '', category: 'diocese' });
        setIsAdding(true);
        setEditingId(null);
    };

    const handleStartEdit = (event) => {
        setFormData({
            title: event.title,
            type: event.type || 'Evento',
            desc: event.desc || '',
            category: event.category || 'diocese'
        });
        setEditingId(event.id);
        setIsAdding(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isAdding) {
            onAdd(formData);
            setIsAdding(false);
        } else if (editingId) {
            onUpdate(editingId, { ...formData, date: format(date, 'yyyy-MM-dd') }); // Ensure date persists or update if needed
            setEditingId(null);
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingId(null);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3000,
            display: 'flex', alignItems: 'end', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease-out'
        }} onClick={onClose}>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: 'white', width: '100%', maxWidth: '500px',
                    borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem',
                    padding: '2rem 1.5rem 2.5rem 1.5rem', maxHeight: '92vh', overflowY: 'auto',
                    position: 'relative', animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 -10px 40px rgba(0,0,0,0.15)'
                }}
            >
                {/* Drag Indicator */}
                <div style={{ width: '40px', height: '5px', backgroundColor: '#e5e7eb', borderRadius: '10px', margin: '0 auto 1.5rem auto' }} />

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem 0', color: 'var(--color-text-primary)', fontWeight: '800', textTransform: 'capitalize' }}>
                            {format(date, 'EEEE', { locale: es })}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                            <CalendarIcon size={16} />
                            <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                                {format(date, "d 'de' MMMM, yyyy", { locale: es })}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        {isAuthenticated && !isAdding && !editingId && (
                            <button
                                onClick={handleStartAdd}
                                className="btn btn-primary"
                                style={{
                                    padding: '0.6rem',
                                    borderRadius: '1rem',
                                    width: '44px',
                                    height: '44px',
                                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                                }}
                            >
                                <Plus size={24} />
                            </button>
                        )}
                        <button onClick={onClose} style={{
                            background: '#f3f4f6', border: 'none', borderRadius: '1rem',
                            width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6b7280'
                        }}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Add/Edit Form */}
                {(isAdding || editingId) && (
                    <form onSubmit={handleSubmit} style={{
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        background: '#f8fafc',
                        borderRadius: '1.5rem',
                        border: '1px solid #e2e8f0',
                        animation: 'fadeIn 0.2s ease-out'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', fontWeight: 'bold' }}>
                            {isAdding ? 'Nueva Actividad' : 'Editar Actividad'}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b' }}>TÍTULO</label>
                                <input
                                    type="text"
                                    placeholder="Nombre de la actividad"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', width: '100%', boxSizing: 'border-box', fontSize: '1rem' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b' }}>TIPO</label>
                                    <input
                                        type="text"
                                        placeholder="Misa, Fiesta..."
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b' }}>CATEGORÍA</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', width: '100%', background: 'white' }}
                                    >
                                        <option value="diocese">Diócesis</option>
                                        <option value="svd">Verbo Divino (SVD)</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: '#64748b' }}>DESCRIPCIÓN</label>
                                <textarea
                                    placeholder="Detalles adicionales..."
                                    value={formData.desc}
                                    onChange={e => setFormData({ ...formData, desc: e.target.value })}
                                    style={{ padding: '0.875rem', borderRadius: '0.75rem', border: '1px solid #cbd5e1', width: '100%', boxSizing: 'border-box', minHeight: '100px', resize: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '1rem', borderRadius: '0.75rem' }}>
                                    <Save size={18} style={{ marginRight: '0.5rem' }} /> Guardar
                                </button>
                                <button type="button" onClick={handleCancel} className="btn" style={{ flex: 1, background: '#e2e8f0', color: '#475569', padding: '1rem', borderRadius: '0.75rem' }}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Events list of the day */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {events && events.length > 0 ? (
                        events.map((ev, idx) => {
                            const isSVD = ev.category === 'svd';
                            const accentColor = isSVD ? 'var(--color-svd-green)' : 'var(--color-virgin-blue)';
                            const bgAccent = isSVD ? 'rgba(34, 197, 94, 0.08)' : 'rgba(56, 189, 248, 0.08)';

                            return (
                                <div key={idx} style={{
                                    padding: '1.5rem',
                                    borderRadius: '1.5rem',
                                    backgroundColor: bgAccent,
                                    border: `1px solid ${accentColor}33`,
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '800',
                                            textTransform: 'uppercase',
                                            color: accentColor,
                                            letterSpacing: '0.05em',
                                            background: 'white',
                                            padding: '4px 10px',
                                            borderRadius: '2rem',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                        }}>
                                            {ev.type || 'Actividad'}
                                        </div>

                                        {isAuthenticated && !isAdding && !editingId && (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleStartEdit(ev)} style={{ background: 'white', border: 'none', cursor: 'pointer', color: '#64748b', padding: '6px', borderRadius: '0.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => { if (window.confirm('¿Eliminar esta actividad?')) onDelete(ev.id); }} style={{ background: 'white', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '6px', borderRadius: '0.5rem', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <h3 style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '1.35rem', color: '#1e293b', fontWeight: '700', lineHeight: '1.3' }}>
                                        {ev.title}
                                    </h3>

                                    {ev.desc && (
                                        <p style={{ margin: 0, fontSize: '1rem', color: '#475569', lineHeight: '1.6' }}>
                                            {ev.desc}
                                        </p>
                                    )}

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: accentColor }}></div>
                                        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
                                            {isSVD ? 'Congregación del Verbo Divino' : 'Diócesis de Posadas'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        !isAdding && (
                            <div style={{
                                textAlign: 'center',
                                padding: '4rem 1rem',
                                color: '#94a3b8',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.25rem'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '2rem',
                                    backgroundColor: '#f8fafc',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#cbd5e1',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <CalendarIcon size={40} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 'bold',
                                        color: 'var(--color-svd-green)',
                                        margin: '0 0 0.5rem 0',
                                        fontStyle: 'italic'
                                    }}>
                                        "{getMotivationalMessage(date)}"
                                    </p>
                                    <p style={{ fontSize: '1rem', margin: 0, color: '#64748b' }}>No hay actividades programadas para esta fecha.</p>
                                </div>
                                {isAuthenticated && (
                                    <button
                                        onClick={handleStartAdd}
                                        className="btn"
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            borderRadius: '1rem',
                                            background: '#f1f5f9',
                                            color: 'var(--color-primary)',
                                            fontWeight: 'bold',
                                            marginTop: '0.5rem'
                                        }}
                                    >
                                        + Agregar Actividad
                                    </button>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
