let preRotate = 0
let preTotal = 0
let price

const areaNum = 8
// 奖励区域划分
const priceMap = {
  1: 'five',
  2: 'two',
  3: 'five',
  4: 'three',
  5: 'five',
  6: 'four',
  7: 'five',
  8: 'one',
}

// 顺时针旋转，left为逆时针旋转
let rotationDirection = 'right'

// 具体区域对应旋转角度
function getMap(num) {
  const map = {}
  const jio = 360 / num
  for (let index = 1; index <= num; index++) {
    let tempIndex
    if (rotationDirection === 'right') {
      tempIndex = num - index
    } else {
      tempIndex = index - 1
    }
    const start = tempIndex * jio
    const end = start + jio
    map[index] = [start, end]
  }
  return map
}

// 得到奖励和区域角度的map结构
function priceArea() {
  const map = {}
  const rotateRrea = getMap(areaNum)
  Object.keys(priceMap).forEach((key) => {
    const value = priceMap[key]
    const rotateRreaValue = rotateRrea[key]
    if (!map[value]) {
      map[value] = [rotateRreaValue]
    } else {
      map[value].push(rotateRreaValue)
    }
  })
  return map
}

// 获取随机数
function getRandomNum(start, end, type) {
  const radomNum = Math.random()
  if (radomNum === 0) {
    return getRandomNum(start, end, type)
  }
  // 产生一个开区间范围的随机数
  const rangeNum = radomNum * (end - start) + start
  if (type === 'int') {
    return Math.ceil(rangeNum - 1)
  } else if (type === 'float') {
    return rangeNum
  }
}

// 得到中奖区域角度
function getRotateZ() {
  // 获取转盘区域数字
  const randomNum = getRandomNum(1, areaNum, 'int')
  price = priceMap[randomNum]
  console.log(price, '中奖啦！！！！')
  const priceAreaMap = priceArea()
  const winnerAreaMap = priceAreaMap[price]
  const length = winnerAreaMap.length
  let tt
  if (length === 1) {
    const [start, end] = winnerAreaMap[0]
    tt = getRandomNum(start, end, 'float')
  } else {
    const lengthRandom = getRandomNum(1, length, 'int')
    const value = winnerAreaMap[lengthRandom - 1]
    const [start, end] = value
    tt = getRandomNum(start, end, 'float')
  }
  console.log(tt, 'tt')
  const sum = 360 * 10 + tt + 360 - preRotate + preTotal
  preRotate = tt
  preTotal = sum
  if (rotationDirection === 'right') return preTotal
  else return -preTotal
}
