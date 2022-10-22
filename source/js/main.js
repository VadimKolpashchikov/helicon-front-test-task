import '../less/style.less'
import {data} from './data.js'
import {addGoods} from './add-goods.js'

const goodsList = document.querySelector('.goods')
const templateGoodsItem = document.querySelector('#good').content.querySelector('.goods--item')

addGoods(goodsList, templateGoodsItem, data)