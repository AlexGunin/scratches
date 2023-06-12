const saveOnlyChangedData = (oldArr, newArr, stableFields = ["id"]) =>
  newArr.reduce((acc, cur, index) => {
    const oldObj = oldArr[index];
    if (!oldObj) return [...acc, cur]; // 1) если по индексу вообще нет элемента в старом массиве - значит это новый элемент и его сразу добавляем

    const newValue = Object.entries(cur).reduce((newValue, [key, value]) => {
      const isEqual = oldObj[key] === value; // 2.1) Одинаковые ли значения у поля в старом объекте и в новом ?
      const isStableFields = stableFields.includes(key) // 2.2) Название поля находится в списке "обязательных" ?
      return isEqual && !isStableFields // 2.3) Если значения в полях одинаковые и поле не в обязательных,то ничего менять не надо, оставляем старый аккумулятор
        ? newValue
        : { ...newValue, [key]: value }; // 2.4) иначе сохраняем новое поле
    }, {}); // 2) Формируем объект с только изменившимися полями
    return Object.keys(newValue).length > stableFields.length // 3) Проверка на длину нужна на случай, если в объекте не изменился только айдишник (то же самое, что объект не изменился)
      ? [...acc, newValue]
      : acc;
  }, []);

const oldArr = [
  { id: 1, name: "Alex", age: 20 },
  { id: 2, name: "Misha", age: 20 },
  { id: 3, name: "Gleb", age: 20 },
];

const newArr = [
  { id: 1, name: "Alex", age: 20 },
  { id: 2, name: "Misha", age: 21 },
  { id: 3, name: "Sergey", age: 20 },
];

const result = saveOnlyChangedData(oldArr, newArr); //?
