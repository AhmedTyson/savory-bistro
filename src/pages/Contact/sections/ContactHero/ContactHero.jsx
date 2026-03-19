import { MapPin, Clock, MessageCircleQuestion, Globe, Instagram, Share2 } from 'lucide-react';
import './ContactHero.css';

const ICON_MAP = {
  address: MapPin,
  hours: Clock,
  contact: MessageCircleQuestion,
  web: Globe,
  insta: Instagram,
  share: Share2
};

export default function ContactHero({ info }) {
  if (!info) return null;

  return (
    <section className="ContactHero-container">
      <div className="ContactHero">
        <div className="ContactHero__overlay" />
        <div className="container ContactHero__content">
          <h1 className="ContactHero__title">Get in Touch</h1>
          <p className="ContactHero__sub">We'd love to hear from you</p>
        </div>
      </div>

      <div className="ContactHero__info">
        <div className="container">
          <div className="ContactHero__info-grid">
            {Object.entries(info).map(([key, data]) => {
              const Icon = ICON_MAP[key];
              return (
                <div className="ContactHero__card" key={key}>
                  <div className="ContactHero__card-icon-wrapper">
                    <Icon 
                      size={25} 
                      className="ContactHero__card-icon" 
                    />
                  </div>
                  <h3 className="ContactHero__card-title">{data.title}</h3>
                  <div className="ContactHero__card-content">
                    {data.lines.map((line) => (
                      <p className="ContactHero__card-line" key={line}>{line}</p>
                    ))}
                  </div>
                  {data.action && (
                    <div className="ContactHero__card-action">
                      <a className="ContactHero__card-link" href={data.action.href}>
                        {data.action.label}
                      </a>
                    </div>
                  )}
                  {data.socials && (
                    <div className="ContactHero__card-socials">
                      {data.socials.map((socialId) => {
                        const SocialIcon = ICON_MAP[socialId];
                        return (
                          <button key={socialId} className="ContactHero__social-btn">
                            <SocialIcon size={20} />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
