const pivotIndex = function(nums) {
    const allSum = nums.reduce((acc,cur) => acc + cur, 0)
    let leftSum = 0

    for (let i = 0; i < nums.length ; i++) {
        const rightSum = allSum - leftSum - nums[i]
        if(leftSum === rightSum) return i
        leftSum += nums[i]
    }

    return -1
};

pivotIndex([3,4,0,5,2]) //?


const isomorphic = (str1, str2) => {
    if(str1.length !== str2.length) return false

    const dict1 = {}
    const dict2 = {}

    for (let i = 0; i < str1.length ; i++) {
        const c1 = str1[i]
        const c2 = str2[i]

        dict1[c1] = dict1[c1] ?? c2
        dict2[c2] = dict2[c2] ?? c1

        if(dict1[c1] !== c2 || dict2[c2] !== c1) return false

    }
    return true
}

isomorphic('egg', 'ass') //?

const isSubsequence = (str1, str2) => {
    let pointer1 = 0
    let pointer2 = 0
    for (let i = 0; i < str2.length ; i++) {
        if(str1[pointer1] === str2[pointer2]) pointer1++
        pointer2++
    }
    return pointer1 === str1.length
};


isSubsequence("abc", "ahbgdc") //?

class ListNode {
        val
        next
        constructor(val, next) {
           this.val = (val===undefined ? 0 : val)
         this.next = (next===undefined ? null : next)
  }
 }

const mergeTwoLists = (list1, list2) => {
    const mergedHead = new ListNode(-1, null);
    let prev = mergedHead;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            prev.next = list1;
            list1 = list1.next;
        } else {
            prev.next = list2;
            list2 = list2.next;
        }
        prev = prev.next;
    }
    prev.next = list1 ? list1 : list2;

    return mergedHead.next;
};

mergeTwoLists([1,2,4], [1,3,4,5]) //?

const obj = {qwe : 1, ert: null, rtre: undefined, asdasd: []}

const url = new URLSearchParams(obj) //?