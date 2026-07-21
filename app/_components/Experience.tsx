import Link from "next/link";
import { timeline } from "@/lib/data";

export function Experience() {
    return (
        <section id="experience" className="section">
            <div className="container">
                <p className="section-label reveal">// timeline</p>
                <h2 className="section-title reveal delay-1">
                    Journey so <span className="accent">far.</span>
                </h2>

                <div className="timeline">
                    {timeline.map((item, idx) => (
                        <div key={idx} className="timeline-item">
                            {item.side === "left" ? (
                                <>
                                    <div className={`timeline-content reveal delay-1`}>
                                        <div className="timeline-date">{item.date}</div>
                                        <div className="timeline-role">{item.role}</div>
                                        <div className="timeline-company">
                                            {item.url ? (
                                                <Link href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}>
                                                    {item.company}
                                                </Link>
                                            ) : item.company}
                                            <span
                                                className={`badge ${item.badge === "Work" ? "badge-work" : "badge-edu"
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        </div>
                                        <p className="timeline-desc">{item.desc}</p>
                                    </div>
                                    <div className="timeline-dot">
                                        <div className="timeline-dot-inner"></div>
                                    </div>
                                    <div className="timeline-empty"></div>
                                </>
                            ) : (
                                <>
                                    <div className="timeline-empty"></div>
                                    <div className="timeline-dot">
                                        <div className="timeline-dot-inner"></div>
                                    </div>
                                    <div className={`timeline-content reveal delay-2`}>
                                        <div className="timeline-date">{item.date}</div>
                                        <div className="timeline-role">{item.role}</div>
                                        <div className="timeline-company">
                                            {item.url ? (
                                                <Link href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '3px' }}>
                                                    {item.company}
                                                </Link>
                                            ) : item.company}
                                            <span
                                                className={`badge ${item.badge === "Work" ? "badge-work" : "badge-edu"
                                                    }`}
                                            >
                                                {item.badge}
                                            </span>
                                        </div>
                                        <p className="timeline-desc">{item.desc}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
