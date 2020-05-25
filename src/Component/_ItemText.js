import React from 'react';

function SampleText(props) {
    const {
        post: { title, description },
        extraClass
    } = props;

    let textboxClass = 'item__text-cover';
    if (!!extraClass) textboxClass += ` ${extraClass}`;

    let paragraphElement = null;
    if (!!description) {
        paragraphElement = <p className="description has-text-grey is-size-7">{description}</p>;
    }

    return (
        <div className={textboxClass}>
            <h6 className="title is-size-6">{title}</h6>
            {paragraphElement}
        </div>
    );
}

export default SampleText;