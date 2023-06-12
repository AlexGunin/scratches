const stocks = [6, 5, 4, 3, 2];


const profitBuy = (arr) => {
    let indexBuy = -1
    let indexCell = -1

    if(!arr || !arr.length) return [indexBuy, indexCell]

    const obj = {}

    let max = {
        value: 0,
        index: -1
    }

    for (let i = arr.length - 1; i >= 1; i--) {
        if(arr[i] >= max.value) {
            max = {
                value: arr[i],
                index: i
            }
        }

        obj[i-1] = {
            value: max.value,
            index: max.index
        }
    }

    let maxProfit = 0

    for (let i = 0; i < arr.length - 1; i++) {
        const profit = obj[i].value - arr[i]

        if(profit <= maxProfit) continue

        maxProfit = profit
        indexBuy = i
        indexCell = obj[i].index
    }

    return [indexBuy, indexCell]
}

profitBuy(stocks) //?