import Mock from 'mockjs'

//webpack默认对外暴露的资源：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
import address from './address.json'

//第一个参数请求地址，  第二个参数请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
Mock.mock('/mock/address', { code: 200, data: address })


