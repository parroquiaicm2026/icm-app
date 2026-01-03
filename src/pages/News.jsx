import React, { useState } from 'react';
import { Bell, ArrowRight, Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function News() {
    const { isAuthenticated } = useAuth();

    // Load news from CMS content
    const newsModules = import.meta.glob('../content/news/*.json', { eager: true });
    const cmsNews = Object.keys(newsModules).map((key) => {
        const item = newsModules[key];
        const slug = key.split('/').pop().replace('.json', '');
        return {
            id: slug,
            ...(item.default || item)
        };
    });

    const [newsItems, setNewsItems] = useState(cmsNews);


    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState(null);

    const handleAddNew = () => {
        const newItem = {
            id: Date.now(),
            title: "Nueva Noticia",
            date: "Hoy",
            category: "GENERAL",
            description: "Descripción de la noticia...",
            isFeatured: false,
            color: 'var(--color-primary)'
        };
        setNewsItems([newItem, ...newsItems]);
        setEditingId(newItem.id);
        setEditForm(newItem);
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditForm({ ...item });
    };

    const handleSave = () => {
        setNewsItems(newsItems.map(item => item.id === editingId ? editForm : item));
        setEditingId(null);
        setEditForm(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Eliminar esta noticia?')) {
            setNewsItems(newsItems.filter(item => item.id !== id));
        }
    };

    const renderEditor = () => (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-4 border border-blue-200">
            <div className="grid gap-3">
                <input
                    value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Título" className="w-full p-2 border rounded font-bold"
                />
                <div className="flex gap-2">
                    <input
                        value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                        placeholder="Fecha/Tiempo" className="flex-1 p-2 border rounded text-sm"
                    />
                    <input
                        value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                        placeholder="Categoría" className="flex-1 p-2 border rounded text-sm uppercase"
                    />
                </div>
                <textarea
                    value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Descripción" className="w-full p-2 border rounded" rows={3}
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                        type="checkbox"
                        checked={editForm.isFeatured}
                        onChange={e => setEditForm({ ...editForm, isFeatured: e.target.checked })}
                    />
                    Destacado (Aparece grande arriba)
                </label>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingId(null)} className="p-2 bg-gray-100 rounded text-gray-600"><X size={20} /></button>
                    <button onClick={handleSave} className="p-2 bg-blue-600 text-white rounded flex items-center gap-1"><Save size={20} /> Guardar</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '120px', background: 'var(--color-bg)', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{
                padding: '2rem 1.5rem 3rem',
                background: 'linear-gradient(135deg, var(--color-svd-red) 0%, #991b1b 100%)',
                color: 'white',
                borderBottomLeftRadius: '2.5rem',
                borderBottomRightRadius: '2.5rem',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative element */}
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)'
                }} />

                <div className="flex justify-between items-start" style={{ position: 'relative', zIndex: 1 }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', letterSpacing: '-0.025em' }}>
                            <Bell size={26} />
                            Novedades
                        </h1>
                        <p style={{ margin: '0.25rem 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
                            Noticias y actualizaciones de la parroquia
                        </p>
                    </div>
                    {isAuthenticated && (
                        <button onClick={handleAddNew} style={{
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(8px)',
                            padding: '0.6rem',
                            borderRadius: '1rem',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex'
                        }}>
                            <Plus size={24} />
                        </button>
                    )}
                </div>
            </header>

            <div className="container" style={{ padding: '0 1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {newsItems.map(item => {
                        if (editingId === item.id) return <div key={item.id}>{renderEditor()}</div>;

                        if (item.isFeatured) {
                            return (
                                <div key={item.id} style={{
                                    backgroundColor: 'white',
                                    borderRadius: '1.5rem',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-lg)',
                                    position: 'relative',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    {isAuthenticated && (
                                        <div className="absolute top-2 right-2 z-10 flex gap-1">
                                            <button onClick={() => handleEdit(item)} className="p-1.5 bg-white rounded-full shadow hover:text-blue-600"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1.5 bg-white rounded-full shadow hover:text-red-600"><Trash2 size={16} /></button>
                                        </div>
                                    )}
                                    <div style={{
                                        height: '200px',
                                        backgroundColor: item.color || 'var(--color-martyr-red)',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'end',
                                        padding: '1.5rem',
                                        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                                    }}>
                                        <span style={{
                                            position: 'absolute', top: '1rem', right: '1rem',
                                            background: 'white', color: item.color || 'var(--color-martyr-red)',
                                            padding: '0.25rem 0.75rem', borderRadius: '2rem',
                                            fontSize: '0.75rem', fontWeight: 'bold'
                                        }}>
                                            Destacado
                                        </span>
                                        <div style={{ position: 'relative', zIndex: 1, color: 'white' }}>
                                            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>{item.title}</h2>
                                            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{item.date}</p>
                                        </div>
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 1rem' }}>
                                            {item.description}
                                        </p>
                                        <button className="btn" style={{
                                            width: '100%',
                                            justifyContent: 'space-between',
                                            background: '#f5f5f5',
                                            color: 'var(--color-text-primary)'
                                        }}>
                                            Leer más <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={item.id} style={{
                                    backgroundColor: 'white',
                                    borderRadius: '1rem',
                                    padding: '1.5rem',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                    borderLeft: `4px solid ${item.color || 'gray'}`,
                                    position: 'relative'
                                }}>
                                    {isAuthenticated && (
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            <button onClick={() => handleEdit(item)} className="p-1 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.8rem', color: item.color || 'gray', fontWeight: '600' }}>{item.category}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#999' }}>{item.date}</span>
                                    </div>
                                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{item.title}</h3>
                                    <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                        {item.description}
                                    </p>
                                </div>
                            );
                        }
                    })}

                </div>
            </div>
        </div>
    );
}
