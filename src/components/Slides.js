import React, {useState, useEffect} from 'react';

function Slides({slides}) {

    const maxLength = slides.length - 1;
    const [currSlide, setCurrSlide] = useState(slides.length ? 0 : null)
    
    const [disableRestart, setDisableRestart] = useState(true)
    const [disablePrev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(false)

    // Handle disable button
    useEffect(()=>{
        if(currSlide === 0){
            setDisableRestart(true)
            setDisablePrev(true)
            setDisableNext(false)
        }

        if(currSlide > 0){
            setDisableRestart(false)
            setDisablePrev(false)
            setDisableNext(false)
        }

        if(currSlide === maxLength){
            setDisableNext(true)
        }
        
    },[currSlide])

    // Handle slide update
    const updateSlide = (command) => {
        if(command === 'restart'){
            setCurrSlide(0);
            return;
        }

        if(command === 'prev' && disablePrev != true){
            setCurrSlide(currSlide-1);
            return;
        }

        if(command === 'next' && disableNext != true){
            setCurrSlide(currSlide+1);
            return;
        }
    }

    const renderSlides = () => {
        if(currSlide > -1){
            return(
                <div id="slide" className="card text-center">
                    <h1 data-testid="title">{slides[currSlide].title}</h1>
                    <p data-testid="text">{slides[currSlide].text}</p>
                </div>
            )
        }
        return null;
    }

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" className="small outlined" onClick={()=>{updateSlide('restart')}} disabled={disableRestart}>Restart</button>
                <button data-testid="button-prev" className="small" onClick={()=>{updateSlide('prev')}} disabled={disablePrev}>Prev</button>
                <button data-testid="button-next" className="small" onClick={()=>{updateSlide('next')}} disabled={disableNext}>Next</button>
            </div>
            {renderSlides()}
        </div>
    );

}

export default Slides;
