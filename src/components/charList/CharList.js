import { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'

import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect (()=> {
        onRequest(offset, true);
        console.log('render...')
        // eslint-disable-next-line
    }, [])

    
    const onCharListLoaded = (newChars) => {
            setChars (chars => [...chars, ...newChars]);
            setNewItemLoading (false)
            setOffset (offset=> offset + 9)
            setCharEnded(newChars.length < 9 ? true : false)
    }

 


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
        .then(onCharListLoaded);
    }

// ref

    const itemRef = useRef([]);
    
    const setRef = elem => {
        itemRef.current.push(elem);
    };

    const focusOnClick = (id) => {
        itemRef.current.forEach(item=> item ? item.classList.remove('char__item_selected') : null);
        if (itemRef.current[id]) itemRef.current[id].classList.add('char__item_selected');
    };

// ===============================================

        
        const errorMessage = error ? <Error/> : null;
        const loadingMessage = loading && !newItemLoading ? <Spinner/> : null;
        // const content = !(error || loading) ? 
            

        return (
            <div className="char__list">
                {errorMessage}
                {loadingMessage}
                <ul className="char__grid">
                    <View 
                        chars={chars} 
                        onCharSelected={props.onCharSelected} 
                        setRef={setRef} 
                        focusOnClick={focusOnClick}
                        items={itemRef}
                        newItemLoading={newItemLoading}/>
                </ul>

                {!charEnded?(
                    <button 
                        className="button button__main button__long" 
                        disabled={newItemLoading}
                        onClick={() => onRequest(offset, false)} >
                        <div className="inner">load more</div>
                    </button>
                ) : null}
                
            </div>
        )
}

const View = ({chars, onCharSelected, setRef, focusOnClick, items, newItemLoading}) => {
    const defThumbnail = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
    const duration=500;
    return chars.map(({thumbnail, name, id}, i) => (
        <CSSTransition
            timeout={duration}
            in={!newItemLoading}
            mountOnEnter
            // unmountOnExit
            classNames="card"
            // key={id}
        >
            <li className="char__item"
                key={id}
                ref={setRef}
                onClick={()=>{onCharSelected(id); focusOnClick(i)}}
                onKeyPress={(e)=>{if (e.key === 'Enter')  {onCharSelected(id); focusOnClick(i)}}}
                tabIndex={0}>
                <img src={thumbnail} alt={name} style={{objectFit: thumbnail === defThumbnail ? 'fill' : 'cover'}}/>
                <div className="char__name">{name}</div>
            </li>
        </CSSTransition>
        
    ))
}


CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;