import React, {useEffect, useState, useRef, useLayoutEffect, useCallback} from 'react';
import './App.css';
import Pages from './Components/Pages';


const App = () => {
    
    
    const dataGridRef = useRef();
    const itemRef = useRef();
    
    
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(12);
    const [page, setPage] = useState(1);
 
    const updateList = async(page) => {
            
        await fetch('https://api.pexels.com/v1/curated?per_page=12&page=' + page, {
            method:'GET',
            headers:{
                Accept:'application/json',
                Authorization: 'X1UN7R0bJrYvYQOgB19F8PoFwGsRhGXJFDzafm6H5zgvfI0GmgI3THHU'
            }
        })
        .then(res => {
            
            return res.json()})
        .then(data => {
            
            if(!items){
                
                setItems(data['photos']);
            } else {
                
                setItems([...items, ...data['photos']]);
                
            }
            
            
        }).catch((e)=>console.log(e));
        
        
        
        
    }

    useEffect(() => {   
        
        updateList(page);

    },[page]);

   

    const callbackItemRef = useCallback((item) => {
        
        if(itemRef.current) itemRef.current.disconnect();

        itemRef.current = new IntersectionObserver((item2) => {
            if(item2[0].isIntersecting){
                setPage(page => page + 1);
                setCount(count => count + 12);
            }
        });
       
        if(item) itemRef.current.observe(item);
       
    },[items]);
    
    if(!items){
        return(
            <div class='app'>
                <h2>Loading...</h2>
            </div>
        );
    }
    
    return (
        
        <div className='app'>
            
            <div className='data-grid' ref={dataGridRef}>
                    
                {
                    items && items.map((item, i) => {
                        
                        if(i == count-5){
                            
                            return (<Pages id={item.id} src={item.src.landscape} alt={item.alt} photographer={item.photographer} ref={callbackItemRef}  />)
                        } else {
                            
                            return (<Pages id={item.id} src={item.src.landscape} alt={item.alt} photographer={item.photographer} />)
                        }
                        
                    })
                }

            </div>


        </div>
        
    );
    
}



export default App;

