import React, { useState } from 'react';
import { Users, Building, FileText, Heart, Cross, User, MapPin, ChevronDown, ChevronUp, Briefcase, MessageCircle, Phone, Mail } from 'lucide-react';

export default function Diocese() {
    const chapelsData = [
        {
            id: 'medalla',
            name: "Medalla Milagrosa",
            coordinator: "A designar",
            subCoordinator: "A designar",
            contact: "+54 9 376 ..."
        },
        {
            id: 'pantaleon',
            name: "San Pantaleón",
            coordinator: "A designar",
            subCoordinator: "A designar",
            contact: "+54 9 376 ..."
        },
        {
            id: 'corazon',
            name: "Sdo. Corazón de María",
            coordinator: "A designar",
            subCoordinator: "A designar",
            contact: "+54 9 376 ..."
        },
        {
            id: 'cristo',
            name: "Cristo Obrero",
            coordinator: "A designar",
            subCoordinator: "A designar",
            contact: "+54 9 376 ..."
        }
    ];

    // Structure Data
    const organizationData = [
        {
            title: "1. Nivel de Conducción Pastoral (Sede)",
            description: "Es el núcleo que anima y toma las decisiones estratégicas de toda la comunidad de Villa Cabello.",
            icon: Cross,
            color: "var(--color-svd-red)",
            bgColor: "var(--color-svd-red-light)",
            image: "/images/leadership_symbol.png",
            items: [
                { label: "Párroco", value: "P. Mario Selvan SVD", icon: User },
                { label: "Vicarios Parroquiales", value: "P. Héctor Maldonado SVD, P. Ceslao Font SVD", icon: User },
                { label: "Comunidad Religiosa", value: "SVD y Hermanas Canocianas", icon: Users },
                { label: "Diáconos Permanentes", value: "A definir", icon: User }
            ]
        },
        {
            title: "2. Nivel Ejecutivo y Administrativo",
            description: "Quienes ejecutan el día a día y mantienen el orden institucional.",
            icon: Briefcase,
            color: "var(--color-virgin-blue)",
            bgColor: "var(--color-virgin-blue-light)",
            items: [
                { label: "Secretaría Parroquial", value: "Hna... Contacto...", icon: FileText },
                { label: "Coordinador Parroquial", value: "", icon: User },
                { label: "Subcoordinador Parroquial", value: "", icon: User },
                { label: "Consejo de Asuntos Económicos (CAE)", value: "", icon: Briefcase }
            ]
        },
        {
            id: 'chapels', // Special ID to trigger custom rendering
            title: "3. Estructura de Capillas",
            subtitle: "(Las comunidades de base)",
            description: "Cada capilla (Medalla Milagrosa, San Pantaleón, etc.) funciona como una 'pequeña parroquia' dentro de la red.",
            icon: Building,
            color: "var(--color-svd-green)",
            bgColor: "var(--color-svd-green-light)",
            image: "/images/community_gathering.png"
        },
        {
            title: "4. Estructura de Pastorales",
            subtitle: "(Organización por Áreas)",
            description: "Siguiendo el modelo de Weich, cada pastoral tiene una línea de mando clara para que la comunicación no se pierda.",
            icon: Heart,
            color: "var(--color-asamblea)",
            bgColor: "var(--color-asamblea-light)",
            subSections: [
                {
                    name: "A. Pastoral de Evangelización (Catequesis)",
                    content: [
                        { label: "Coordinador General", value: "Unifica contenidos para todas las capillas." },
                        { label: "Coordinadores por Capilla", value: "Supervisan a los catequistas de su barrio." },
                        { label: "Cuerpo de Catequistas", value: "Familiar, Niños, Adultos." }
                    ]
                },
                {
                    name: "B. Pastoral Litúrgica (Celebración)",
                    content: [
                        { label: "Coordinador Parroquial", value: "Planifica las misas centrales y tiempos fuertes." },
                        { label: "Coordinadores por Capilla", value: "Organizan el servicio en sus templos." },
                        { label: "Equipos", value: "Ministros de la Eucaristía, Lectores, Monaguillos y Coros." }
                    ]
                },
                {
                    name: "C. Pastoral Social (Cáritas y Promoción Humana)",
                    content: [
                        { label: "Coordinador Parroquial", value: "Vinculación con Cáritas Diocesana y Fundación Villa Cabello." },
                        { label: "Referentes por Capilla", value: "Detectan las necesidades reales de cada Chacra." }
                    ]
                },
                {
                    name: "D. Pastoral de Juventud y Misiones",
                    content: [
                        { label: "Asesor Religioso / Coordinador Laico", value: "Liderazgo de los grupos de jóvenes." },
                        { label: "Coordinadores por Capilla", value: "Mantienen la identidad del barrio." }
                    ]
                }
            ]
        },
        {
            title: "5. Consejos de Comunión",
            description: "Para que esta estructura no sea estanca, se proponen estos espacios de reunión:",
            icon: MessageCircle,
            color: "var(--color-colecta)",
            bgColor: "var(--color-colecta-light)",
            items: [
                { label: "Asamblea Parroquial", value: "Reunión anual de todos los niveles para evaluar y proyectar.", icon: Users },
                { label: "Reunión de Coordinadores", value: "Encuentro mensual con el Párroco para unificar criterios.", icon: Users }
            ]
        }
    ];

    const SectionCard = ({ section }) => {
        const [isOpen, setIsOpen] = useState(true);
        const [selectedChapel, setSelectedChapel] = useState(chapelsData[0]);

        return (
            <div style={{
                backgroundColor: 'white',
                borderRadius: '1.5rem',
                marginBottom: '1.5rem',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
            }}>
                {section.image && isOpen && (
                    <div style={{
                        height: '140px',
                        width: '100%',
                        backgroundImage: `url(${section.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%)'
                        }} />
                    </div>
                )}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        padding: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        cursor: 'pointer',
                        background: isOpen && !section.image ? section.bgColor : 'white',
                        borderBottom: isOpen ? '1px solid var(--color-border)' : 'none',
                    }}
                >
                    <div style={{
                        padding: '0.75rem',
                        borderRadius: '50%',
                        backgroundColor: isOpen && !section.image ? 'white' : section.bgColor,
                        color: section.color,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <section.icon size={24} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-primary)', fontWeight: '700' }}>{section.title}</h2>
                        {section.subtitle && <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{section.subtitle}</span>}
                    </div>
                    {isOpen ? <ChevronUp size={20} color="var(--color-text-secondary)" /> : <ChevronDown size={20} color="var(--color-text-secondary)" />}
                </div>

                {isOpen && (
                    <div style={{ padding: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
                        <p style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', fontStyle: 'italic' }}>
                            {section.description}
                        </p>

                        {/* Special Rendering for Chapels Section */}
                        {section.id === 'chapels' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Chapel Tabs */}
                                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                    {chapelsData.map(chapel => (
                                        <button
                                            key={chapel.id}
                                            onClick={() => setSelectedChapel(chapel)}
                                            style={{
                                                padding: '0.6rem 1rem',
                                                borderRadius: '1rem',
                                                border: 'none',
                                                background: selectedChapel.id === chapel.id ? section.color : 'var(--color-bg)',
                                                color: selectedChapel.id === chapel.id ? 'white' : 'var(--color-text-secondary)',
                                                fontSize: '0.85rem',
                                                fontWeight: '600',
                                                whiteSpace: 'nowrap',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                flexShrink: 0
                                            }}
                                        >
                                            {chapel.name}
                                        </button>
                                    ))}
                                </div>

                                {/* Selected Chapel Details */}
                                <div className="animate-fade-in" style={{
                                    background: 'var(--color-bg)',
                                    borderRadius: '1.25rem',
                                    padding: '1.25rem',
                                    border: `1px solid ${section.color}20`
                                }}>
                                    <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: '700', color: section.color }}>
                                        {selectedChapel.name}
                                    </h3>

                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                            <div style={{ padding: '0.4rem', background: 'white', borderRadius: '50%', color: section.color }}>
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', color: 'var(--color-text-muted)' }}>COORDINADOR</span>
                                                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{selectedChapel.coordinator}</span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                            <div style={{ padding: '0.4rem', background: 'white', borderRadius: '50%', color: section.color }}>
                                                <Users size={18} />
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', color: 'var(--color-text-muted)' }}>SUB-COORDINADOR</span>
                                                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{selectedChapel.subCoordinator}</span>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                            <div style={{ padding: '0.4rem', background: 'white', borderRadius: '50%', color: section.color }}>
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '700', display: 'block', color: 'var(--color-text-muted)' }}>CONTACTO</span>
                                                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{selectedChapel.contact}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Default Rendering for other sections
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {section.items && section.items.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.75rem', background: 'var(--color-bg)', borderRadius: '1rem' }}>
                                        <item.icon size={18} style={{ marginTop: '0.2rem', color: section.color }} />
                                        <div>
                                            <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9rem', fontWeight: '700' }}>{item.label}</h4>
                                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                                {item.value || <span style={{ color: '#cbd5e1', fontStyle: 'italic' }}>A designar</span>}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {section.subSections && section.subSections.map((sub, idx) => (
                                    <div key={idx} style={{ marginBottom: '1rem', background: 'var(--color-bg)', padding: '1rem', borderRadius: '1rem' }}>
                                        <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: section.color, fontWeight: '700' }}>{sub.name}</h3>
                                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                                            {sub.content.map((c, i) => (
                                                <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{c.label}:</span>
                                                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{c.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '100px' }}>
            <header style={{
                height: '250px',
                position: 'relative',
                marginBottom: '2rem',
                overflow: 'hidden',
                borderBottomLeftRadius: '2.5rem',
                borderBottomRightRadius: '2.5rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: 'url(/images/church_header.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(30, 58, 138, 0.7) 0%, rgba(30, 58, 138, 0.9) 100%)',
                    backdropFilter: 'blur(2px)'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    color: 'white',
                    zIndex: 1
                }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        <MapPin size={32} />
                        Equipo Pastoral
                    </h1>
                    <p style={{ margin: 0, opacity: 0.95, fontSize: '1.05rem', maxWidth: '600px', fontWeight: '500', lineHeight: '1.4' }}>
                        Organigrama, estructura y corazón de la comunidad de Villa Cabello.
                    </p>
                </div>
            </header>

            <div className="container" style={{ padding: '0 1.25rem' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {organizationData.map((section, idx) => (
                        <SectionCard key={idx} section={section} />
                    ))}

                    <div style={{
                        marginTop: '3rem',
                        padding: '2rem',
                        background: 'linear-gradient(135deg, var(--color-svd-green) 0%, #064e3b 100%)',
                        borderRadius: '1.5rem',
                        color: 'white',
                        textAlign: 'center',
                        boxShadow: 'var(--shadow-md)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
                        }} />
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '800', position: 'relative', zIndex: 1 }}>Elementos Clave</h3>
                        <div style={{ display: 'grid', gap: '1.5rem', textAlign: 'left', position: 'relative', zIndex: 1 }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '1rem' }}>
                                <h4 style={{ margin: '0 0 0.25rem', color: 'var(--color-svd-green-light)', fontWeight: '700' }}>Corresponsabilidad</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>Si el Párroco no está, la estructura sigue funcionando porque cada coordinador conoce su rol.</p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '1rem' }}>
                                <h4 style={{ margin: '0 0 0.25rem', color: 'var(--color-svd-green-light)', fontWeight: '700' }}>Subsidiaridad</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>Lo que la Capilla puede resolver por sí misma, no interviene la Sede Parroquial.</p>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '1rem' }}>
                                <h4 style={{ margin: '0 0 0.25rem', color: 'var(--color-svd-green-light)', fontWeight: '700' }}>Misión "Ad Gentes"</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>Salida constante hacia las zonas más alejadas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
