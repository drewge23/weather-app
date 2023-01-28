import React from 'react';

function ExtraInformation(props) {
    return (
        <div className='extra-instance'>
            <span className='emoji'>{props.emoji}</span>
            <div className='extra-text'>
                <span className='prefix'> {props.prefix} </span>
                <div>
                    <span className='digits'>{props.children}</span>
                    <span className='postfix'>{' ' + props.postfix}</span>
                </div>
            </div>
        </div>
    );
}

export default ExtraInformation;