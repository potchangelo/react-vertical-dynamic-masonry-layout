import React from 'react';

function SampleImage({ imgUrl, style }) {
    return (
        <div className="item__image-cover" style={style}>
            <img src={imgUrl} alt="img" />
        </div>
    );
}

function SampleText({ title, description, extraClass }) {
    let textboxClass = 'item__text-cover';
    if (extraClass !== undefined) textboxClass += ` ${extraClass}`;
    let paragraphElement = null;
    if (description !== '') {
        paragraphElement = <p className="description has-text-grey is-size-7">{description}</p>;
    }
    return (
        <div className={textboxClass}>
            <h6 className="title is-size-6">{title}</h6>
            {paragraphElement}
        </div>
    );
}

function SampleElement({ pageId, data }) {
    const { title, description, imgUrl, imgWidth, imgHeight } = data;
    const paddingBottom = imgHeight / imgWidth * 100;
    const style = { paddingBottom: `${paddingBottom}%` };

    let element = null;
    if (pageId === 'sample-image-text' || pageId === 'sample-image-text-append') {
        element = (
            <>
                <SampleImage imgUrl={imgUrl} style={style} />
                <SampleText title={title} description={description} extraClass='tb-space' />
            </>
        );
    }
    else if (pageId === 'sample-image' || pageId === 'sample-image-no-gap') {
        element = <SampleImage imgUrl={imgUrl} style={style} />;
    }
    else if (pageId === 'sample-text') {
        element = <SampleText title={title} description={description} extraClass='box' />;
    }
    
    return element;
}

export default SampleElement;