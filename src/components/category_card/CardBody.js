import React, { useState } from 'react'


const CardBody = ({category, theme}) => {
    const [readMore, setReadMore] = useState(false)

    
    return (
        <div className="card_body  d-flex">
            
            <div className="card_body-content" 
            style={{
                filter: theme ? 'invert(1)' : 'invert(0)',
                color: theme ? 'white' : '#111',
            }}>
                <span >
                    {
                        category.name.length < 60
                        ? category.name 
                        : readMore ? category.name + ' ' : category.name.slice(0, 60) + '.....'
                       
                    }
                </span>
                {
                    category.name.length > 60 &&
                    <span className="readMore"  onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'Hide content' : 'Read more'}
                    </span>
                }

            </div>
            
        </div>
    )
}

export default CardBody
