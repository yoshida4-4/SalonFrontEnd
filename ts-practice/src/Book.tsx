import type { BookType } from './types/book'

export const Book = (props:BookType) => {

    const { id, title, price } = props;


    return (
        <div>
            <h2>{id}:{title}</h2>
            <div>{price}円</div>
        </div>
    )
}