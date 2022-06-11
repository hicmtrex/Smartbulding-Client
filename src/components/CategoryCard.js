import React from 'react'
import CardBody from './category_card/CardBody'


const CategroyCard = ({category, theme}) => {
    return (
        <div className="card my-2 " > 
            <CardBody category={category}  theme={theme} />          
        </div>
    )
}

export default CategroyCard
