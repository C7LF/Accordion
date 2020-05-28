import React, { useState, useRef } from 'react'

import { ReactComponent as Plusicon } from '../../assets/plus-icon.svg';

import './accordion.css'

interface accordionTypes {
    number: number,
    question: string,
    answer: string
}

const Accordion = ({
    number,
    question,
    answer
}: accordionTypes | any) => {
    const className = 'accordion'

    //useState hooks for active value and answerHeight
    const [setActive, setActiveState] = useState<string>('');
    const [answerHeight, setAnswerHeight] = useState<string>('0px')

    const content: any = useRef(null) // Referencing the answer text

    // Toggle accordion onclick event
    const toggleAccordion = (): void => {
        setActiveState(!setActive ? 'active' : '') //if active state is null set 'active'
        setAnswerHeight(setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`) //set height of answer Ref if question is active.
    }
    
    return (
        // Only renders content if number, question and answer props are populated
        (number && question && answer) && (
        <div className={`${className}__item`}>
            <div className={`${className}__question ${setActive && setActive}`} onClick={() => toggleAccordion()}>
                <div className='question-num'>
                    <span>Q{number}</span>
                </div>
                <div className='question-text'>
                    <span>{question}</span>
                </div>
                <div className='question-toggle'>
                    <div className='question-toggle__svg'>
                        <Plusicon />
                    </div>
                </div>
            </div>
            {/* Height of answer is set to answerHeight state */}
            <div className={`${className}__answer`} ref={content} style={{maxHeight: `${answerHeight}`}}>
                <p>{answer}</p>
            </div>
        </div>
        )
    )
}

export default Accordion