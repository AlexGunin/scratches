// BEGIN (write your solution here)

const ascSortCompare = (pivot) => ({
    left: (value) => value < pivot,
    right: (value) => value > pivot
})

const descSortCompare = (pivot) => ({
    left: (value) => value > pivot,
    right: (value) => value < pivot
})

const comparesFn = {
    asc: ascSortCompare,
    desc: descSortCompare
}

const partition = (array, compares, left, right) => {
    while (true) {
        while (compares.left(array[left])) {
            left += 1;
        }

        while (compares.right(array[right])) {
            right -= 1;
        }

        if (left >= right) {
            return right + 1;
        }

        const temporary = array[left];
        array[left] = array[right];
        array[right] = temporary;

        left += 1;
        right -= 1;
    }
}

const quicksort = (array, dir = 'asc', start = 0, finish = array.length - 1) => {
    if(!array.length) return []

    const length = finish - start + 1

    if (length < 2) {
        return
    }

    const pivot = array[start]
    const compares = comparesFn[dir](pivot)
    const splitIndex = partition(array, compares, start, finish)

    quicksort(array, dir, start, splitIndex - 1)
    quicksort(array, dir, splitIndex, finish)

    return [...array]
}

export default quicksort