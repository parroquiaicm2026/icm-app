import React, { useState } from 'react';
import { Calendar, MapPin, MessageCircle, Heart, Users, Star, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Pastorals() {
    const { isAuthenticated } = useAuth();
    const [editingId, setEditingId] = useState(null);

    const ICON_MAP = {
        'Users': Users,
        'Star': Star,
        'Heart': Heart,
        'MessageCircle': MessageCircle,
        'MapPin': MapPin,
        'Calendar': Calendar
    };

    // Initial data
    // Load sacraments from CMS content
    const sacramentFiles = import.meta.glob('../content/sacraments/*.json', { eager: true });

    // Transform files object into array
    const cmsSacraments = Object.keys(sacramentFiles).map((path) => {
        const mod = sacramentFiles[path];
        const data = mod.default || mod;
        const slug = path.split('/').pop().replace('.json', '');
        return {
            id: slug,
            ...data
        };
    });

    const [sacraments, setSacraments] = useState(cmsSacraments);

    React.useEffect(() => {
        localStorage.setItem('icm_sacraments', JSON.stringify(sacraments));
    }, [sacraments]);

    const [editForm, setEditForm] = useState(null);

    const handleEdit = (sacrament) => {
        setEditingId(sacrament.id);
        setEditForm({ ...sacrament });
    };

    const handleSave = () => {
        setSacraments(prev => prev.map(s => s.id === editingId ? editForm : s));
        setEditingId(null);
        setEditForm(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Seguro que desea eliminar este elemento?")) {
            setSacraments(prev => prev.filter(s => s.id !== id));
        }
    };

    const handleAddNew = () => {
        const newId = Date.now().toString();
        const newSacrament = {
            id: newId,
            title: "Nuevo Sacramento",
            icon: 'Star',
            details: [{ type: 'paragraph', content: "Descripción aquí..." }]
        };
        setSacraments([...sacraments, newSacrament]);
        handleEdit(newSacrament);
    };

    const updateDetail = (idx, value) => {
        const newDetails = [...editForm.details];
        newDetails[idx].content = value;
        setEditForm({ ...editForm, details: newDetails });
    };

    const renderIcon = (iconName) => {
        const IconComponent = ICON_MAP[iconName] || Star;
        return <IconComponent size={24} />;
    };

    return (
        <div style={{ paddingBottom: '120px', background: 'var(--color-bg)', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{
                padding: '2rem 1.5rem 3rem',
                background: 'linear-gradient(135deg, var(--color-virgin-blue) 0%, #1e3a8a 100%)',
                color: 'white',
                borderBottomLeftRadius: '2.5rem',
                borderBottomRightRadius: '2.5rem',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, letterSpacing: '-0.025em' }}>Sacramentos</h1>
                        <p style={{ margin: '0.25rem 0 0', opacity: 0.8, fontSize: '0.9rem' }}>Información y contacto</p>
                    </div>
                    {isAuthenticated && (
                        <button
                            onClick={handleAddNew}
                            style={{
                                background: 'rgba(255,255,255,0.15)',
                                backdropFilter: 'blur(8px)',
                                padding: '0.6rem 1rem',
                                borderRadius: '1rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: '600'
                            }}
                        >
                            <Plus size={18} /> Agregar
                        </button>
                    )}
                </div>
            </header>

            <div className="container" style={{ padding: '0 1.25rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {sacraments.map((s) => (
                        <div key={s.id} style={{
                            background: 'white',
                            borderRadius: '1.5rem',
                            padding: '1.5rem',
                            boxShadow: 'var(--shadow-md)',
                            border: '1px solid var(--color-border)',
                            position: 'relative',
                            transition: 'transform 0.2s ease'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {/* Admin Controls */}
                            {isAuthenticated && !editingId && (
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => handleEdit(s)} style={{ padding: '0.4rem', background: 'var(--color-virgin-blue-light)', border: 'none', borderRadius: '0.5rem', color: 'var(--color-virgin-blue)', cursor: 'pointer', display: 'flex' }}><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(s.id)} style={{ padding: '0.4rem', background: 'var(--color-svd-red-light)', border: 'none', borderRadius: '0.5rem', color: 'var(--color-svd-red)', cursor: 'pointer', display: 'flex' }}><Trash2 size={16} /></button>
                                </div>
                            )}

                            {editingId === s.id ? (
                                // Edit Mode
                                <div className="space-y-3">
                                    <input
                                        value={editForm.title}
                                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                        className="w-full font-bold text-lg border p-1 rounded"
                                    />
                                    {editForm.details.map((detail, idx) => (
                                        <textarea
                                            key={idx}
                                            value={detail.content}
                                            onChange={e => updateDetail(idx, e.target.value)}
                                            className="w-full text-sm border p-1 rounded"
                                            rows={2}
                                        />
                                    ))}
                                    <div className="flex gap-2 justify-end mt-2">
                                        <button onClick={() => setEditingId(null)} className="p-2 bg-gray-200 rounded"><X size={18} /></button>
                                        <button onClick={handleSave} className="p-2 bg-blue-600 text-white rounded"><Save size={18} /></button>
                                    </div>
                                </div>
                            ) : (
                                // View Mode
                                <>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div style={{
                                            background: 'var(--color-virgin-blue-light)',
                                            padding: '0.75rem',
                                            borderRadius: '1rem',
                                            color: 'var(--color-virgin-blue)',
                                            display: 'flex'
                                        }}>
                                            {renderIcon(s.icon)}
                                        </div>
                                        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>
                                            {s.title}
                                        </h2>
                                    </div>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        {s.details.map((detail, idx) => (
                                            <div key={idx} className={`text-sm text-gray-600 mb-2 ${detail.icon ? 'flex items-start gap-2' : ''}`}>
                                                {detail.icon === 'calendar' && <Calendar size={16} className="mt-1 shrink-0" />}
                                                {detail.icon === 'map' && <MapPin size={16} className="mt-1 shrink-0" />}
                                                {detail.type === 'paragraph' ? (
                                                    <p className="mt-2">{detail.content}</p>
                                                ) : (
                                                    <span>{detail.content}</span>
                                                )}
                                            </div>
                                        ))}

                                        {s.action && (
                                            <button
                                                style={{
                                                    width: '100%',
                                                    marginTop: '1.25rem',
                                                    padding: '1rem',
                                                    borderRadius: '1rem',
                                                    background: 'var(--color-virgin-blue)',
                                                    color: 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem',
                                                    border: 'none',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 12px rgba(29, 78, 216, 0.2)',
                                                    transition: 'all 0.2s'
                                                }}
                                                onClick={() => alert(s.action.label)}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <MessageCircle size={18} />
                                                {s.action.text}
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
