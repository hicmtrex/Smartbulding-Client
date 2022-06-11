import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePosts from './postReducer'
import homeCategories from './categoryReducer'
import modal from './modalReducer'
import detailPost from './detailPostReducer'
import detailCategory from './detailCategoryReducer'
import discover from './discoverReducer'
import suggestions from './suggestionsReducer'
import socket from './socketReducer'
import notify from './notifyReducer'
import message from './messageReducer'
import online from './onlineReducer'
import call from './callReducer'
import peer from './peerReducer'


export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    status,
    homePosts,
    homeCategories,
    modal,
    detailPost,
    detailCategory,
    discover,
    suggestions,
    socket,
    notify,
    message,
    online,
    call,
    peer
})