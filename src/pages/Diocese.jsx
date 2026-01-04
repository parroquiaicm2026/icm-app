import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit2, Plus, Trash2, Save, X } from 'lucide-react';

export default function Diocese() {
    const { isAuthenticated } = useAuth();

    // Initial State
    // Load team data from CMS content
    const teamFiles = import.meta.glob('../content/team/*.json', { eager: true });

    // Helper to get data safely
    const getTeamData = (fileName) => {
        const file = teamFiles[`../content/team/${fileName}.json`];
        return file ? (file.default || file) : null;
    };

    const loadedTeam = {
        parroco: getTeamData('parroco') || { name: "P. Mario Selvan SVD", role: "Párroco" },
        vicarios: getTeamData('vicarios')?.vicarios || [],
        religiosos: getTeamData('religiosos')?.religiosos || [],
        consejo: getTeamData('consejo')?.consejo || [],
        pastorales: getTeamData('pastorales')?.pastorales || []
    };

    const [team, setTeam] = useState(loadedTeam);

    // Update state if files change (hot reload support basically)
    React.useEffect(() => {
        setTeam({
            parroco: getTeamData('parroco') || { name: "P. Mario Selvan SVD", role: "Párroco" },
            vicarios: getTeamData('vicarios')?.vicarios || [],
            religiosos: getTeamData('religiosos')?.religiosos || [],
            consejo: getTeamData('consejo')?.consejo || [],
            pastorales: getTeamData('pastorales')?.pastorales || []
        });
    }, []);

    React.useEffect(() => {
        localStorage.setItem('icm_team', JSON.stringify(team));
    }, [team]);

    const [editingSection, setEditingSection] = useState(null); // 'parroco', 'vicarios', etc.
    const [tempData, setTempData] = useState(null);

    const startEdit = (section, data) => {
        setEditingSection(section);
        setTempData(data ? JSON.parse(JSON.stringify(data)) : {});
    };

    const saveEdit = (section) => {
        setTeam({ ...team, [section]: tempData });
        setEditingSection(null);
        setTempData(null);
    };

    const cancelEdit = () => {
        setEditingSection(null);
        setTempData(null);
    };

    // Helper to render editable lists
    const EditableList = ({ section, items, renderItem, renderEdit }) => {
        return (
            <div>
                {items.map((item, idx) => (
                    <div key={item.id || idx} className="relative group">
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        );
    };

    // Specific Renderers for Edit Mode (simplified for robustness)
    const renderEditList = (items, fields, onChange) => (
        <div className="space-y-2">
            {items.map((item, idx) => (
                <div key={idx} className="flex gap-2 p-2 border rounded bg-white">
                    <div className="flex-1 space-y-2">
                        {fields.map(f => (
                            <input
                                key={f}
                                value={item[f]}
                                onChange={(e) => {
                                    const newItems = [...items];
                                    newItems[idx][f] = e.target.value;
                                    onChange(newItems);
                                }}
                                className="w-full p-1 border rounded text-sm"
                                placeholder={f}
                            />
                        ))}
                    </div>
                    <button onClick={() => {
                        const newItems = items.filter((_, i) => i !== idx);
                        onChange(newItems);
                    }} className="text-red-500"><Trash2 size={16} /></button>
                </div>
            ))}
            <button onClick={() => {
                const newItem = { id: Date.now(), ...fields.reduce((acc, f) => ({ ...acc, [f]: '' }), {}) };
                onChange([...items, newItem]);
            }} className="flex items-center gap-1 text-sm text-blue-600 font-medium p-1">
                <Plus size={16} /> Agregar Nuevo
            </button>
        </div>
    );


    const SectionTitle = ({ children, onEdit, sectionName }) => (
        <div className="flex items-center justify-between mt-6 mb-3">
            <h3 style={{
                fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-text-primary)',
                borderLeft: '4px solid var(--color-collection-gold)', paddingLeft: '0.75rem', margin: 0
            }}>
                {children}
            </h3>
            {isAuthenticated && !editingSection && (
                <button onClick={() => startEdit(sectionName, team[sectionName])} style={{ padding: '0.4rem', background: 'var(--color-collection-gold-light)', border: 'none', borderRadius: '0.5rem', color: 'var(--color-collection-gold)', cursor: 'pointer', display: 'flex' }}>
                    <Edit2 size={16} />
                </button>
            )}
        </div>
    );

    const Card = ({ children }) => (
        <div style={{
            background: 'white', borderRadius: '1.25rem', padding: '1.25rem',
            boxShadow: 'var(--shadow-md)', marginBottom: '1rem',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.2s ease'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            {children}
        </div>
    );

    return (
        <div style={{ paddingBottom: '120px', background: 'var(--color-bg)', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{
                padding: '2rem 1.5rem 3rem',
                background: 'linear-gradient(135deg, var(--color-collection-gold) 0%, #92400e 100%)',
                color: 'white',
                borderBottomLeftRadius: '2.5rem',
                borderBottomRightRadius: '2.5rem',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0, letterSpacing: '-0.025em' }}>Equipo Organizador</h1>
                <p style={{ margin: '0.25rem 0 0', opacity: 0.8, fontSize: '0.9rem' }}>Nuestra comunidad parroquial</p>
            </header>

            <div className="container" style={{ padding: '0 1.25rem' }}>

                {/* Párroco */}
                <div className="text-center mb-6 relative group">
                    {isAuthenticated && !editingSection && (
                        <button
                            onClick={() => startEdit('parroco', team.parroco)}
                            style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem', background: 'white', borderRadius: '1rem', boxShadow: 'var(--shadow-md)', color: 'var(--color-text-secondary)', border: 'none', cursor: 'pointer', display: 'flex' }}
                        >
                            <Edit2 size={16} />
                        </button>
                    )}

                    {editingSection === 'parroco' ? (
                        <div className="bg-white p-4 rounded shadow space-y-2">
                            {/* ... editing form ... */}
                            <input
                                value={tempData.name}
                                onChange={e => setTempData({ ...tempData, name: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {/* ... */}
                        </div>
                    ) : (
                        <>
                            <div style={{
                                width: '140px', height: '140px', background: 'var(--color-collection-gold-light)', borderRadius: '50%',
                                margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '4px solid white', boxShadow: 'var(--shadow-lg)', overflow: 'hidden'
                            }}>
                                {team.parroco.img ? (
                                    <img
                                        src={team.parroco.img}
                                        alt={team.parroco.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <span style={{ fontSize: '3rem' }}>✝️</span>
                                )}
                            </div>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-text-primary)' }}>{team.parroco.name}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', fontWeight: '500' }}>{team.parroco.role}</p>
                        </>
                    )}
                </div>

                {/* Vicarios */}
                <SectionTitle sectionName="vicarios">Vicarios</SectionTitle>
                {editingSection === 'vicarios' ? (
                    <div className="bg-gray-50 p-2 rounded">
                        {renderEditList(tempData, ['name', 'role'], setTempData)}
                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={cancelEdit} className="p-1 bg-gray-200 rounded"><X size={16} /></button>
                            <button onClick={() => saveEdit('vicarios')} className="p-1 bg-blue-600 text-white rounded"><Save size={16} /></button>
                        </div>
                    </div>
                ) : (
                    team.vicarios.map((v, i) => (
                        <Card key={i}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%' }} />
                                <div>
                                    <div style={{ fontWeight: '500' }}>{v.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{v.role}</div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}

                {/* Religiosos/as */}
                <SectionTitle sectionName="religiosos">Religiosos/as</SectionTitle>
                {editingSection === 'religiosos' ? (
                    <div className="bg-gray-50 p-2 rounded">
                        {renderEditList(tempData, ['name', 'role'], setTempData)}
                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={cancelEdit} className="p-1 bg-gray-200 rounded"><X size={16} /></button>
                            <button onClick={() => saveEdit('religiosos')} className="p-1 bg-blue-600 text-white rounded"><Save size={16} /></button>
                        </div>
                    </div>
                ) : (
                    team.religiosos.map((r, i) => (
                        <Card key={i}>
                            <div style={{ fontWeight: '500' }}>{r.name}</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{r.role}</div>
                        </Card>
                    ))
                )}

                {/* Consejo Pastoral */}
                <SectionTitle sectionName="consejo">Consejo Pastoral Parroquial</SectionTitle>
                {editingSection === 'consejo' ? (
                    <div className="bg-gray-50 p-2 rounded">
                        {renderEditList(tempData, ['text'], setTempData)}
                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={cancelEdit} className="p-1 bg-gray-200 rounded"><X size={16} /></button>
                            <button onClick={() => saveEdit('consejo')} className="p-1 bg-blue-600 text-white rounded"><Save size={16} /></button>
                        </div>
                    </div>
                ) : (
                    <Card>
                        <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                            {team.consejo.map((c, i) => (
                                <li key={i} style={{ marginBottom: '0.25rem' }}>{c.text}</li>
                            ))}
                        </ul>
                    </Card>
                )}

                {/* Otras Pastorales */}
                <SectionTitle sectionName="pastorales">Otras Pastorales y Equipos</SectionTitle>
                {editingSection === 'pastorales' ? (
                    <div className="bg-gray-50 p-2 rounded">
                        {renderEditList(tempData, ['name', 'details'], setTempData)}
                        <div className="flex justify-end gap-2 mt-2">
                            <button onClick={cancelEdit} className="p-1 bg-gray-200 rounded"><X size={16} /></button>
                            <button onClick={() => saveEdit('pastorales')} className="p-1 bg-blue-600 text-white rounded"><Save size={16} /></button>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {team.pastorales.map((p, i) => (
                            <Card key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '500' }}>{p.name}</span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                                    {p.details}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
