import React from "react";
// import { withAutoplay, AwesomeSlider } from 'react-awesome-slider';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import code1 from '@/assets/slider/code-1.webp'
import AI from '@/assets/slider/pexels-tara-winstead-8386440.webp'
import security from '@/assets/slider/pexels-pixabay-60504.webp'

const AutoplaySlider = withAutoplay(AwesomeSlider);

function Slider() {
    return (
        <div >

            <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-[#000000ca]">
            </div>
            <div className="absolute top-0 left-0 h-full w-full z-[-2] bg-[#000000b0]">
                <AutoplaySlider
                    play={true}
                    cancelOnInteraction={false} // should stop playing on user interaction
                    interval={2500}
                    bullets={false}
                    className="h-full"
                >
                    <div data-src={code1.src} />
                    <div data-src={AI.src} />
                    <div data-src={security.src} />
                </AutoplaySlider>
            </div>
        </div>
    );
}

export default Slider