
import ajax from './ajax'
export const reqLogin = ({username, password}) => ajax({
  url: '/login',
  method: 'POST',
  data: {username, password}
})
export const reqUsers = () => ajax({
  url: '/manage/user/list',
  method: 'GET',
})