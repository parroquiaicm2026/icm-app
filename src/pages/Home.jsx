import React from 'react';
import { Bell, BookOpen, Clock, Calendar as CalendarIcon, MapPin, Plus, Settings, Trash2, ArrowRight } from 'lucide-react';
import Calendar from './Calendar'; // Importing the page component
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import { useNews } from '../hooks/useNews';
import { useDailyReadings } from '../hooks/useDailyReadings';
import { useNavigate } from 'react-router-dom';
import { isSameDay, parseISO, isAfter, format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Home() {
    const { events, deleteEvent } = useEvents();
    const { isAuthenticated } = useAuth();
    const news = useNews();
    const navigate = useNavigate();
    const today = new Date();
    const [selectedDate, setSelectedDate] = React.useState(null);

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

    // If a date is selected, show events for that date. Otherwise show today's events.
    const activeDate = selectedDate || today;
    const activeEvents = events.filter(ev => isSameDay(parseISO(ev.date), activeDate));

    // For the header title
    const isShowingSelected = selectedDate && !isSameDay(selectedDate, today);

    // Filter upcoming events (next 2) only if not showing a specific selected date
    const upcomingEvents = events
        .filter(ev => isAfter(parseISO(ev.date), today))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 2);

    const displayEvents = activeEvents.length > 0 ? activeEvents : (isShowingSelected ? [] : upcomingEvents);

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

    const { readings, loading: readingLoading } = useDailyReadings();

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '120px' }}>
            {/* Header with Background Image and Readings */}
            <header style={{
                position: 'relative',
                padding: '1.5rem 1.5rem 2.5rem',
                color: 'white',
                borderBottomLeftRadius: '2.5rem',
                borderBottomRightRadius: '2.5rem',
                marginBottom: '1rem',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden'
            }}>
                {/* Background Image & Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '100%',
                    borderRadius: '0 0 2.5rem 2.5rem',
                    overflow: 'hidden',
                    zIndex: 0
                }}>
                    <div style={{
                        width: '100%', height: '100%',
                        backgroundImage: 'url(/images/home_header.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 30%' // Adjusted to show church better
                    }} />
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(6, 78, 59, 0.4) 0%, rgba(6, 78, 59, 0.8) 100%)',
                        backdropFilter: 'blur(0px)' // Removed blur to seeing the photo clearly
                    }} />
                </div>

                {/* Top Bar content */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, letterSpacing: '-0.025em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>ICM Parroquia</h1>
                        <p style={{ margin: '0.1rem 0 0', opacity: 1, fontSize: '0.85rem', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Inmaculado Corazón de María</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Daily Reading Minimal Card (Integrated here) */}
                        {!readingLoading && readings && (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '1rem',
                                padding: '0.6rem 0.8rem',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                textAlign: 'right',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: '0.1rem'
                            }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.02em' }}>
                                    {readings.date}
                                </span>
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'white', lineHeight: '1.1' }}>
                                    {readings.saint}
                                </span>
                                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-section-gold)' }}>
                                    {readings.gospel?.ref}
                                </span>
                            </div>
                        )}

                        {isAuthenticated && (
                            <button
                                onClick={() => navigate('/admin')}
                                style={{
                                    background: 'rgba(0,0,0,0.3)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '0.6rem',
                                    borderRadius: '1rem',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                title="Panel de Administración"
                            >
                                <Settings size={20} />
                            </button>
                        )}
                        {/* Removed Bell button to clean up header as per new minimal look */}
                    </div>
                </div>
            </header>

            <div className="container" style={{ padding: '0 1.25rem' }}>

                <div className={!selectedDate ? "home-content-grid" : ""}>
                    {/* Actividades Section */}
                    <section style={{
                        marginBottom: '2.5rem',
                        backgroundColor: displayEvents.length === 0 ? 'var(--color-section-blue)' : 'transparent',
                        padding: displayEvents.length === 0 ? '1.5rem' : '0',
                        borderRadius: '1.5rem',
                        transition: 'all 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-primary)' }}>
                                <div style={{
                                    padding: '0.4rem',
                                    background: 'var(--color-svd-green-light)',
                                    borderRadius: '0.75rem',
                                    color: 'var(--color-svd-green)',
                                    display: 'flex'
                                }}>
                                    <Clock size={18} />
                                </div>
                                {isShowingSelected
                                    ? `Actividades ${format(selectedDate, "d 'de' MMM", { locale: es })}`
                                    : (activeEvents.length > 0 ? "Actividades de Hoy" : "Próximas Actividades")}
                            </h2>
                            {isAuthenticated && (
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="btn btn-primary"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        fontSize: '0.85rem',
                                        borderRadius: '1rem',
                                        boxShadow: '0 4px 12px rgba(22, 101, 52, 0.2)'
                                    }}
                                >
                                    <Plus size={16} style={{ marginRight: '4px' }} /> Agregar
                                </button>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {displayEvents.length > 0 ? (
                                displayEvents.map(ev => {
                                    const eventColors = getEventColor(ev.type);
                                    return (
                                        <div key={ev.id} style={{
                                            backgroundColor: 'white',
                                            borderRadius: '1.25rem',
                                            padding: '1.25rem',
                                            boxShadow: 'var(--shadow-md)',
                                            display: 'flex',
                                            gap: '1.25rem',
                                            position: 'relative',
                                            border: '1px solid var(--color-border)',
                                            transition: 'transform 0.2s ease',
                                            cursor: 'pointer'
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                        >
                                            <div style={{
                                                backgroundColor: eventColors.bg,
                                                width: '3.5rem',
                                                height: '3.5rem',
                                                borderRadius: '1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: eventColors.color,
                                                flexShrink: 0
                                            }}>
                                                <CalendarIcon size={24} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>{ev.title}</h3>
                                                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>{ev.desc || ev.type}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                                                    {(!selectedDate || !isSameDay(selectedDate, today)) && (
                                                        <span style={{
                                                            fontSize: '0.75rem',
                                                            fontWeight: '700',
                                                            color: eventColors.color,
                                                            background: eventColors.bg,
                                                            padding: '0.2rem 0.6rem',
                                                            borderRadius: '0.5rem'
                                                        }}>
                                                            {new Date(ev.date + 'T00:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                                        </span>
                                                    )}
                                                    {ev.type && (
                                                        <span style={{
                                                            fontSize: '0.7rem',
                                                            color: 'white',
                                                            background: eventColors.color,
                                                            padding: '0.2rem 0.5rem',
                                                            borderRadius: '0.4rem',
                                                            fontWeight: '600',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.02em'
                                                        }}>
                                                            {ev.type}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {isAuthenticated && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm('¿Eliminar esta actividad?')) deleteEvent(ev.id);
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '0.75rem',
                                                        right: '0.75rem',
                                                        background: 'var(--color-svd-red-light)',
                                                        border: 'none',
                                                        color: 'var(--color-svd-red)',
                                                        cursor: 'pointer',
                                                        padding: '0.4rem',
                                                        borderRadius: '0.5rem',
                                                        opacity: 0.8,
                                                        display: 'flex'
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    )
                                })
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2.5rem 1.5rem',
                                    background: 'white',
                                    borderRadius: '1.5rem',
                                    border: '2px dashed var(--color-border)',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    <p style={{
                                        margin: '0 0 1rem 0',
                                        color: 'var(--color-svd-green)',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        fontStyle: 'italic',
                                        lineHeight: '1.5'
                                    }}>
                                        "{getMotivationalMessage(activeDate)}"
                                    </p>
                                    <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                        No hay actividades programadas para esta fecha.
                                    </p>
                                </div>
                            )}
                            {!isShowingSelected && (
                                <button
                                    onClick={() => navigate('/calendar')}
                                    style={{
                                        alignSelf: 'center',
                                        marginTop: '0.5rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--color-svd-green)',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '1rem',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-svd-green-light)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    Ver agenda completa <ArrowRight size={18} />
                                </button>
                            )}
                            {isShowingSelected && (
                                <button
                                    onClick={() => setSelectedDate(null)}
                                    style={{
                                        alignSelf: 'center',
                                        padding: '0.6rem 1.5rem',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: 'white',
                                        background: 'var(--color-svd-green)',
                                        border: 'none',
                                        borderRadius: '2rem',
                                        marginTop: '1rem',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(22, 101, 52, 0.2)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    Volver a Hoy
                                </button>
                            )}
                        </div>
                    </section>

                    {/* News Section - Only visible when no date is selected */}
                    {!selectedDate && news.length > 0 && (
                        <section style={{ marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-primary)' }}>
                                    <div style={{
                                        padding: '0.4rem',
                                        background: 'var(--color-svd-red-light)',
                                        borderRadius: '0.75rem',
                                        color: 'var(--color-svd-red)',
                                        display: 'flex'
                                    }}>
                                        <Bell size={18} />
                                    </div>
                                    Últimas Novedades
                                </h2>
                                <button
                                    onClick={() => navigate('/news')}
                                    style={{
                                        background: 'none', border: 'none', color: 'var(--color-svd-green)',
                                        fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer'
                                    }}
                                >
                                    Ver todas
                                </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {news.slice(0, 2).map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate('/news')}
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '1.25rem',
                                            padding: '1.25rem',
                                            boxShadow: 'var(--shadow-sm)',
                                            border: '1px solid var(--color-border)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <span style={{
                                                fontSize: '0.7rem', fontWeight: '700', color: 'var(--color-svd-red)',
                                                textTransform: 'uppercase', letterSpacing: '0.05em',
                                                background: 'var(--color-svd-red-light)',
                                                padding: '2px 8px', borderRadius: '0.5rem'
                                            }}>
                                                {item.category || 'NOVEDAD'}
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.date}</span>
                                        </div>
                                        <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p style={{
                                                margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)',
                                                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                            }}>
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Calendar Section with distinct background */}
                <section style={{
                    padding: '1.5rem',
                    backgroundColor: 'var(--color-section-gold)',
                    borderRadius: '2rem',
                    marginBottom: '2rem',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '0.4rem', background: 'var(--color-collection-gold-light)', borderRadius: '0.75rem', color: 'var(--color-collection-gold)', display: 'flex' }}>
                            <CalendarIcon size={18} />
                        </div>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0, color: 'var(--color-text-primary)' }}>Explorar Calendario</h2>
                    </div>
                    <Calendar embedded={true} onDateSelect={setSelectedDate} />
                </section>

            </div>
        </div>
    );
}
