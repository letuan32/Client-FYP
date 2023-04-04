import React from 'react';
import Carousel from 'react-material-ui-carousel'
import MediaCard from './MediaCard'

const MediaCarousel = ({mediaUrls}) =>
{
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


