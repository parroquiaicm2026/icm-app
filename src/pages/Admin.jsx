import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventsContext';
import { Plus, Edit2, Trash2, LogOut, X, Save } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

import chatData from '../content/internal/chat.json';

export default function Admin() {
    const { isAuthenticated, logout } = useAuth();
    const { events, addEvent, updateEvent, deleteEvent } = useEvents();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    // Initial state for new event
    const emptyEvent = {
        date: '',
        title: '',
        category: 'diocese',
        type: '',
        desc: ''
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleAddNew = () => {
        setCurrentEvent({ ...emptyEvent });
        setIsEditing(true);
    };

    const handleEdit = (event) => {
        setCurrentEvent({ ...event });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
            deleteEvent(id);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (currentEvent.id) {
            updateEvent(currentEvent.id, currentEvent);
        } else {
            addEvent(currentEvent);
        }
        setIsEditing(false);
        setCurrentEvent(null);
    };

    // Protect route
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return (
        <div className="container p-4" style={{ paddingBottom: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Administración</h1>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem',
                        background: '#fee2e2',
                        color: '#ef4444',
                        border: 'none',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                    }}
                >
                    <LogOut size={16} />
                    Salir
                </button>
            </div>

            {/* Internal Communication Section */}
            {chatData.link && (
                <div style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>💬</span>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Comunicación Interna</h2>
                    </div>

                    {chatData.info && (
                        <div style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.5', background: 'rgba(0,0,0,0.1)', padding: '0.75rem', borderRadius: '0.5rem' }}>
                            {chatData.info.replace(/\*\*/g, '')} {/* Simple stripped markdown */}
                        </div>
                    )}

                    <a
                        href={chatData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: 'white',
                            color: '#128C7E',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            transition: 'transform 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Unirse al Grupo de WhatsApp
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            )}

            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={handleAddNew}
                    className="btn btn-primary"
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        boxShadow: '0 4px 10px rgba(109, 40, 217, 0.2)'
                    }}
                >
                    <Plus size={20} />
                    Agregar Nueva Actividad
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map((ev) => (
                    <div key={ev.id} style={{
                        background: 'white',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        borderLeft: `4px solid ${ev.category === 'svd' ? 'var(--color-svd-green)' : 'var(--color-virgin-blue)'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start'
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                {format(parseISO(ev.date), "d 'de' MMMM, yyyy", { locale: es })} • {ev.type}
                            </div>
                            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{ev.title}</h3>
                            {ev.desc && <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>{ev.desc}</p>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                            <button
                                onClick={() => handleEdit(ev)}
                                style={{
                                    padding: '0.5rem',
                                    background: '#f3f4f6',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    color: '#4b5563',
                                    cursor: 'pointer'
                                }}
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(ev.id)}
                                style={{
                                    padding: '0.5rem',
                                    background: '#fee2e2',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    color: '#ef4444',
                                    cursor: 'pointer'
                                }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add/Edit */}
            {isEditing && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        width: '100%',
                        maxWidth: '500px',
                        position: 'relative',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}>
                        <button
                            onClick={() => setIsEditing(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>
                            {currentEvent.id ? 'Editar Actividad' : 'Nueva Actividad'}
                        </h2>

                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Título</label>
                                <input
                                    type="text"
                                    value={currentEvent.title}
                                    onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Fecha</label>
                                    <input
                                        type="date"
                                        value={currentEvent.date}
                                        onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Categoría</label>
                                    <select
                                        value={currentEvent.category}
                                        onChange={e => setCurrentEvent({ ...currentEvent, category: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', background: 'white' }}
                                    >
                                        <option value="diocese">Diócesis</option>
                                        <option value="svd">Verbo Divino</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Tipo (ej. Fiesta, Solemnidad)</label>
                                <input
                                    type="text"
                                    value={currentEvent.type}
                                    onChange={e => setCurrentEvent({ ...currentEvent, type: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db' }}
                                    required
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Descripción (Opcional)</label>
                                <textarea
                                    value={currentEvent.desc || ''}
                                    onChange={e => setCurrentEvent({ ...currentEvent, desc: e.target.value })}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', minHeight: '80px' }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <Save size={20} />
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
