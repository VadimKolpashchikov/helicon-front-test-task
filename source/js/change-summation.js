import {priceFormat} from './util.js'

const summationNumber = document.querySelector('#summation-number')
let summation = 0

const changeSummation = (addedValue) => {
  summation = summation + addedValue
  summationNumber.textContent = priceFormat(summation)
}

export {changeSummation}