import React from 'react';
import { useLocation } from 'react-router-dom';
import { IBook } from '../types/Book';
import { Card } from 'react-bootstrap';
import library from './../assets/library.jpg';
import BookCardButtons from './BookCardButtons';

type Props = {
    book: IBook;
    styles: { readonly [key: string]: string };
};

const BookCard = ({ book, styles }: Props) => {
    const { pathname } = useLocation();

    const setButtons = pathname === '/books' ? true : false;

    const image = book.imagePath ? `${process.env.REACT_APP_API_URL}/${book.imagePath}` : library;

    return (
        <Card className={styles.bookCard}>
            <Card.Img src={image} className={styles.bookImage} />
            <Card.Header>{book.author}</Card.Header>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card content.
                </Card.Text>
                {setButtons && <BookCardButtons book={book} />}
            </Card.Body>
        </Card>
    );
};

export default BookCard;
