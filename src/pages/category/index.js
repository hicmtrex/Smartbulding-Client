import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'
import CategoryCard from '../../components/CategoryCard'
import { getCategory } from '../../redux/actions/categoryAction'

const Category = () => {
    const { id } = useParams()
    const [category, setCategory] = useState([])

    const { auth, detailCategory } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategory({detailCategory, id, auth}))

        if(detailCategory.length > 0){
            const newArr = detailCategory.filter(category => category._id === id)
            setCategory(newArr)
        }
    },[detailCategory, dispatch, id, auth])

   
    return (
        <div className="categories ">
             {
                category.length === 0 &&
                <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
            }

            {
                category.map(item => (
                    <CategoryCard key={item._id} category={item} />
                ))
            }
        </div>
    )
}

export default Category
