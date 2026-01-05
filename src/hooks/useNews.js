import { useState, useEffect } from 'react';

export function useNews() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const loadNews = async () => {
            const newsModules = import.meta.glob('../content/news/*.json', { eager: true });
            const cmsNews = Object.keys(newsModules).map((key) => {
                const item = newsModules[key];
                const slug = key.split('/').pop().replace('.json', '');
                return {
                    id: slug,
                    ...(item.default || item)
                };
            });

            // Sort by date (assuming ISO or sortable string, otherwise simple sort)
            // For now, let's assume the file creation order or some date field. 
            // The JSONs seem to have a "date" field.
            const sortedNews = cmsNews.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });

            setNews(sortedNews);
        };

        loadNews();
    }, []);

    return news;
}
