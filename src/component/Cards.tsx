import React, { useEffect, useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';

interface ArticleObject {
    id: number;
    title: string;
    authors: string;
    url: string;
    imageUrl: string;
    publishedAt: string;
}

const Cards: React.FC = () => {
    const [articles, setArticles] = useState<ArticleObject[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getArticles = () => {
        const articleURL = "https://api.spaceflightnewsapi.net/v4/articles";
        fetch(articleURL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Errore nel recupero degli Articoli');
                }
            })
            .then((arrayOfArticles) => {
                console.log('ARTICLES', arrayOfArticles);
                setArticles(arrayOfArticles);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getArticles();
    }, []);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" variant="success" />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>Si è verificato un errore: {error}</p>
            </div>
        );
    }

    if (!articles || !Array.isArray(articles)) {
        return (
            <div>
                <p>Nessun articolo trovato.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Spaceflight</h2>
            <div className="d-flex flex-wrap">
                {articles!.map((a) => (
                    <Card key={a.id} >
                        <Card.Img variant="top" src={a.imageUrl} />
                        <Card.Body>
                            <Card.Title>{a.title}</Card.Title>
                            <Card.Text>
                                <strong>Authors:</strong> {a.authors}
                                <br />
                                <strong>Published At:</strong> {a.publishedAt}
                            </Card.Text>
                            <Button variant="primary" href={a.url} target="_blank">
                                Vai ai dettagli
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Cards;