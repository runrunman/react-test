
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

export const reqLogin = ({username, password}) => ajax({
  url: '/login',
  method: 'POST',
  data: {username, password}
})
export const reqUsers = () => ajax({
  url: '/manage/user/list',
  method: 'GET',
})

export const reqWeather = (city) =>{
  return new Promise((resolve,reject)=>{
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      console.log(err,data)
      if (!err && data.status==='success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        message.error('获取天气失败!')
        return new Promise( () => {})
      }
    })
  })
}
export const reqCategorys = () => ajax('/manage/category/list')