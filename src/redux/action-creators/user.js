import { reqLogin } from '../../api'
import { message } from 'antd'
import { SAVE_USER_TOKEN, REMOVE_USER_TOKEN } from '../action-types'
import storage from "../../utils/storage";


const saveUserToken = (user, token) => ({type: SAVE_USER_TOKEN, data: {user, token}})

export const removeUserToken =() => {
  storage.remove(storage.KEYS.USER_KEY)
  storage.remove(storage.KEYS.TOKEN_KEY)
  return {type: REMOVE_USER_TOKEN}
}

export function loginAsync(username, password) {
  return async dispatch => {
    const result = await reqLogin({username, password})
    if (result.status===0) {
      const { user, token } = result.data
      storage.set(storage.KEYS.USER_KEY, user)
      storage.set(storage.KEYS.TOKEN_KEY, token)
      dispatch(saveUserToken(user, token))
    } else {
        message.error(result.msg)
    }}}