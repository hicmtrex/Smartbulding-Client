import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../redux/actions/profileAction'


const SupprimerBtn = ({user,history}) => {
    
    const { auth,  socket } = useSelector(state => state)
    const dispatch = useDispatch()
    const handleDeleteUser = () => {
        
            dispatch(deleteUser({user, auth, socket}))   
    }

    return (
     
      <button className="btn btn-outline-info"
            onClick={handleDeleteUser}>
                Supprimer
            </button>
       
   
    )
}

export default SupprimerBtn
