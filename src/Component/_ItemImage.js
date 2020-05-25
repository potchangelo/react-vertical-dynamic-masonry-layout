import React from 'react';

function SampleImage(props) {
    const {
        post: { title, imgUrl, imgWidth, imgHeight },
        extraClass
    } = props;

    let imageClass = 'item__image-cover';
    if (!!extraClass) imageClass += ` ${extraClass}`;

    const paddingBottom = imgHeight / imgWidth * 100;
    const style = { paddingBottom: `${paddingBottom}%` };

    return (
        <div className={imageClass} style={style}>
            <img src={imgUrl} alt={title} />
        </div>
    );
}

export default SampleImage;