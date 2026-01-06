import React, { useState } from 'react';
import {
    Heart, Users, Droplets, BookOpen, Flame, HelpingHand,
    Bell, Church, MessageCircle, Phone, FileText, ChevronRight
} from 'lucide-react';

const SACRAMENTS = [
    {
        id: 'bautismo',
        title: "Bautismo",
        icon: Droplets,
        color: "#3b82f6",
        description: "El Bautismo es el fundamento de toda la vida cristiana, el pórtico de la vida en el espíritu y la puerta que abre el acceso a los otros sacramentos.",
        requirements: "DNI del niño/a, DNI de los padres y padrinos. Charla pre-bautismal obligatoria.",
        contact: "Secretaría Parroquial - Lunes a Viernes de 8:00 a 12:00 hs."
    },
    {
        id: 'comunion',
        title: "Comunión",
        icon: BookOpen,
        color: "#f59e0b",
        description: "La Eucaristía es el corazón y la cumbre de la vida de la Iglesia, pues en ella Cristo asocia su Iglesia y todos sus miembros a su sacrificio de alabanza.",
        requirements: "Haber realizado el primer y segundo año de catequesis familiar. Bautismo previo.",
        contact: "Coordinador de Catequesis de cada capilla."
    },
    {
        id: 'confirmacion',
        title: "Confirmación",
        icon: Flame,
        color: "#ef4444",
        description: "Con el sacramento de la Confirmación, el vínculo de los bautizados con la Iglesia es más perfecto y los enriquece con una fuerza especial del Espíritu Santo.",
        requirements: "Haber completado los años de catequesis de confirmación. Tener padrino/madrina confirmado.",
        contact: "Secretaría Parroquial."
    },
    {
        id: 'reconciliacion',
        title: "Reconciliación",
        icon: MessageCircle,
        color: "#8b5cf6",
        description: "Quienes se acercan al sacramento de la Penitencia obtienen de la misericordia de Dios el perdón de los pecados cometidos contra Él.",
        requirements: "Examen de conciencia previo. Arrepentimiento sincero.",
        contact: "Misas diarias o solicitar turno con el Sacerdote."
    },
    {
        id: 'uncion',
        title: "Unción de los Enfermos",
        icon: HelpingHand,
        color: "#10b981",
        description: "Con la sagrada unción de los enfermos y con la oración de los presbíteros, toda la Iglesia entera encomienda a los enfermos al Señor.",
        requirements: "Estar atravesando una enfermedad grave o avanzada edad.",
        contact: "Urgencias al teléfono de la Parroquia."
    },
    {
        id: 'matrimonio',
        title: "Matrimonio",
        icon: Bell,
        color: "#ec4899",
        description: "La alianza matrimonial, por la que el varón y la mujer constituyen entre sí un consorcio de toda la vida, ordenada por su misma índole natural al bien de los cónyuges.",
        requirements: "Partida de Bautismo legalizada para matrimonio, DNI, cursillo prematrimonial.",
        contact: "Consultar con 6 meses de anticipación en Secretaría."
    },
    {
        id: 'orden',
        title: "Orden Sagrado",
        icon: Church,
        color: "#6366f1",
        description: "El Orden es el sacramento gracias al cual la misión confiada por Cristo a sus Apóstoles sigue siendo ejercida en la Iglesia hasta el fin de los tiempos.",
        requirements: "Inquietud vocacional. Acompañamiento espiritual con el Párroco.",
        contact: "P. Mario Selvan SVD o cualquier Sacerdote de la comunidad."
    }
];

export default function Pastorals() {
    const [selectedId, setSelectedId] = useState(SACRAMENTS[0].id);
    const activeSacrament = SACRAMENTS.find(s => s.id === selectedId);

    return (
        <div style={{ paddingBottom: '120px', background: 'var(--color-bg)', minHeight: '100vh' }}>
            <header style={{
                padding: '2rem 1.5rem',
                background: 'linear-gradient(135deg, var(--color-virgin-blue) 0%, #1e3a8a 100%)',
                color: 'white',
                borderBottomLeftRadius: '2rem',
                borderBottomRightRadius: '2rem',
                marginBottom: '2rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Heart size={28} />
                    Vida Sacramental
                </h1>
                <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '1rem' }}>Información, requisitos y contactos de nuestra comunidad.</p>
            </header>

            <div className="container" style={{ padding: '0 1rem' }}>
                <div className="pastorals-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(250px, 1fr) 2fr',
                    gap: '1.5rem',
                    alignItems: 'start'
                }}>
                    {/* Left List (Sidebar) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {SACRAMENTS.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedId(s.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    borderRadius: '1.25rem',
                                    border: '1px solid',
                                    borderColor: selectedId === s.id ? s.color : 'var(--color-border)',
                                    background: selectedId === s.id ? 'white' : 'white',
                                    boxShadow: selectedId === s.id ? `0 4px 12px ${s.color}20` : 'var(--shadow-sm)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    textAlign: 'left',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {selectedId === s.id && (
                                    <div style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: '4px',
                                        background: s.color
                                    }} />
                                )}
                                <div style={{
                                    padding: '0.6rem',
                                    borderRadius: '0.75rem',
                                    background: selectedId === s.id ? `${s.color}15` : 'var(--color-bg)',
                                    color: s.color
                                }}>
                                    <s.icon size={20} />
                                </div>
                                <span style={{
                                    flex: 1,
                                    fontWeight: '700',
                                    fontSize: '1.05rem',
                                    color: selectedId === s.id ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
                                }}>
                                    {s.title}
                                </span>
                                <ChevronRight
                                    size={18}
                                    color={selectedId === s.id ? s.color : '#cbd5e1'}
                                    style={{ transform: selectedId === s.id ? 'translateX(0)' : 'translateX(-5px)', transition: 'transform 0.2s' }}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Right Details (Desktop) / Detail View */}
                    <div className="pastoral-detail-card" style={{
                        background: 'white',
                        borderRadius: '2rem',
                        padding: '2.5rem',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid var(--color-border)',
                        position: 'sticky',
                        top: '1rem',
                        animation: 'fadeIn 0.3s ease-out'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{
                                padding: '1rem',
                                borderRadius: '1.25rem',
                                background: `${activeSacrament.color}15`,
                                color: activeSacrament.color
                            }}>
                                <activeSacrament.icon size={32} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-text-primary)', margin: 0 }}>
                                {activeSacrament.title}
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gap: '2rem' }}>
                            <section>
                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: '1.7',
                                    color: 'var(--color-text-secondary)',
                                    margin: 0,
                                    fontStyle: 'italic'
                                }}>
                                    "{activeSacrament.description}"
                                </p>
                            </section>

                            <section style={{
                                background: 'var(--color-bg)',
                                padding: '1.5rem',
                                borderRadius: '1.5rem',
                                borderLeft: `4px solid ${activeSacrament.color}`
                            }}>
                                <h3 style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '1rem',
                                    fontWeight: '800',
                                    margin: '0 0 1rem',
                                    color: activeSacrament.color,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    <FileText size={18} />
                                    Requisitos
                                </h3>
                                <p style={{ margin: 0, color: 'var(--color-text-primary)', fontWeight: '500', lineHeight: '1.6' }}>
                                    {activeSacrament.requirements}
                                </p>
                            </section>

                            <section style={{
                                background: `${activeSacrament.color}08`,
                                padding: '1.5rem',
                                borderRadius: '1.5rem',
                            }}>
                                <h3 style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '1rem',
                                    fontWeight: '800',
                                    margin: '0 0 1rem',
                                    color: activeSacrament.color,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em'
                                }}>
                                    <Phone size={18} />
                                    Más Información
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        padding: '0.75rem',
                                        borderRadius: '50%',
                                        background: 'white',
                                        color: activeSacrament.color,
                                        boxShadow: 'var(--shadow-sm)'
                                    }}>
                                        <MessageCircle size={20} />
                                    </div>
                                    <p style={{ margin: 0, color: 'var(--color-text-primary)', fontWeight: '600' }}>
                                        {activeSacrament.contact}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media (max-width: 800px) {
                    .pastorals-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .pastoral-detail-card {
                        position: static !important;
                        padding: 1.5rem !important;
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
