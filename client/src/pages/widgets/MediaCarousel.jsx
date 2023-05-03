import React, {useEffect} from 'react';
import Carousel from 'react-material-ui-carousel'
import MediaCard from './MediaCard'

const MediaCarousel = ({mediaUrls}) =>
{
    useEffect(() => {
        console.log('File: MediaCarousel.jsx, Line 8:  ');
    }, [mediaUrls])
    return (
        <>
            {(mediaUrls.length > 0) && (
                <Carousel autoPlay={false}>
                    {mediaUrls.map((item, i) => (
                        <MediaCard key={i} mediaUrl={item}/>
                    ))}
                </Carousel>
            )}
        </>
    )
}
export default MediaCarousel


