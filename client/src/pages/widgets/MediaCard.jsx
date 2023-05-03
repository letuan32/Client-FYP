import {Card, CardMedia, Typography} from "@mui/material";
import React from "react";

const MediaCard = ({ mediaUrl }) => {

    const mediaType = getMediaType(mediaUrl);
    function getMediaType(url) {
        const extension = url.split('.').pop().toLowerCase();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
            return 'img';
        } else if (extension === 'mp4' || extension === 'avi' || extension === 'mov' || extension === 'wmv') {
            return 'video';
        } else {
            return 'unknown';
        }
    }
    return (
        <Card>
            <CardMedia
                component={mediaType === 'video' ? 'video' : 'img'}
                src={mediaUrl}
                height="400"
                width="100%"
                controls={mediaType === 'video'}
                title="green iguana"
            />
        </Card>
    );
};

export default MediaCard;