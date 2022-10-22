import {clearList} from './clear-list.js'
import {priceFormat} from './util.js'
import {changeSummation} from './change-summation.js'

const btnClick = (itemPrice) => {
  return (event) => {
    event.preventDefault()
    event.target.textContent = "ДОБАВЛЕНО"
    event.target.classList.add('goods--btn_active')
    changeSummation(itemPrice)
  }
}

const addGoods= (list, template, data) => {
  clearList(list)
  const goodsListFragment = document.createDocumentFragment()
  data.forEach((item) => {
    const goodsItemClone = template.cloneNode(true)
    const goodsItemTitle = goodsItemClone.querySelector('.goods--title')
    const goodsItemImage = goodsItemClone.querySelector('.goods--img-wrap').querySelector('img')
    const goodsItemDescription = goodsItemClone.querySelector('.goods--description')
    const goodsItemPriceNumber = goodsItemClone.querySelector('.goods--price_number')
    const goodsItemBtn = goodsItemClone.querySelector('.goods--btn')

    goodsItemTitle.textContent = item.name
    goodsItemImage.src = item.img
    goodsItemImage.alt= item.name
    goodsItemDescription.textContent = item.description
    goodsItemPriceNumber.textContent = priceFormat(item.price)
    goodsItemBtn.addEventListener('click', btnClick(item.price), { once: true })

    goodsListFragment.appendChild(goodsItemClone)
  })
  list.appendChild(goodsListFragment)
}

export {addGoods}