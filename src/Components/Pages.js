import React, {useState, useCallback} from 'react';
import './Pages.css';

const Pages = React.forwardRef((props, ref) => {

    
    const [favorite, setFavorite] = useState(localStorage.getItem('favorited').split(',').map(x=>parseInt(x)).includes(props.id));

    
    
    const selectFavorite = () => {
        
        
        setFavorite(!favorite);
        var checker = localStorage.getItem('favorited').split(',');
        
        if(!checker.map(x=>parseInt(x)).includes(props.id)){
            
            var newArray = checker[0] === '' ? [props.id] : [...checker, props.id];
            localStorage.setItem('favorited', newArray);
        } else {
            localStorage.setItem('favorited', checker.map(x=>parseInt(x)).filter(x => {return x !== props.id}));
        }
  
    }
    
    

    return (
        <div className="photoContainer" id={props.id} ref={ref}>
            <img className='photo' src={props.src} alt={props.alt} />
            
            <div className='attributes'>
                <h3>{props.photographer}</h3>
                <div className='favorite'>
                {
                    <button id={'button_' + props.id} onClick={selectFavorite}>{!favorite ? 'Favourite' : 'Unfavourite'}</button>
                }
                
            </div>
            </div>
            
        </div>
        
        
    );
});



export default Pages;

