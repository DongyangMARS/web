import React from 'react';
import '../styles/NewsSection.css';
import { newsUpdates } from '../data/news';

function NewsSection() {
  return (
    <section className="news-section" id="news">
      <h2 className="news-title">개발 소식</h2>
      {newsUpdates.map((group, index) => (
        <div key={index} className="news-group">
          <h3 className="news-month">{group.yearMonth}</h3>
          <ul className="news-list">
            {group.items.map((item, idx) => (
              <li className="news-item" key={idx}>
                <span className="news-date"> {item.date}</span>
                {item.version && <span className="news-version">[{item.version}]</span>}
                <p className="news-content">{item.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default NewsSection;