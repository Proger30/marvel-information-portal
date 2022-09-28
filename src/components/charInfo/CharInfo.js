import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    // eslint-disable-next-line
    useEffect(() => updateChar(), []);
    // eslint-disable-next-line
    useEffect(() => updateChar(), [props.charId]);

    const onCharLoaded = (char) => {
        setChar(char);
        }

    const updateChar = () => {
        if(!props.charId) return;
        clearError();
        console.log('update')
        getCharacter(props.charId)
            .then(onCharLoaded)
    }

    const skeleton = !(char || loading || error) ? <Skeleton/> : null;
    const errorMessage = error ? <Error/> : null;
    const loadingMessage = loading ? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {loadingMessage}
            {content}
        </div>
    )
}


const View  = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const defThumbnail = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit: thumbnail === defThumbnail ? 'fill' : 'cover'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length === 0 ? 'This character haven\'t any comicses!' : (
                        comics.map((item, i) => {
                            // urlComics.match(/\d\d\d\d\d/)[0]
                            // item.resourceURI.match(/\d\d\d\d\d/)[0]
                            
                            let comicsId = item.resourceURI.match(/\d\d\d\d/)[0]
                            if (item.resourceURI.match(/\d\d\d\d\d/)) {
                                comicsId = item.resourceURI.match(/\d\d\d\d\d/)[0]
                            };
                            if (i <= 9) return <li className="char__comics-item" key={i}>
                                <Link to={`/comics/${comicsId}`} >{item.name}</Link>
                            </li>
                            return null;
                        })
                    )
                }
            </ul>
        </>
    ) 
    
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;