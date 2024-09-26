/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами.
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el)); // выведет каждый элемент массива
 */
function forEach(array, func) {

  for (const [ix, el] of array.entries()) {
    func(el, ix, array)
  }

}


/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами.
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   const newArray = map([1, 2, 3], (el) => el ** 2);
   console.log(newArray); // выведет [1, 4, 9]
 */
function map(array, func) {

  const result = [];

  for (const [ix, el] of array.entries()) {

    result.push(func(el,ix,array))

  }

  return result
}
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами.
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   const sum = reduce([1, 2, 3], (all, current) => all + current);
   console.log(sum); // выведет 6
 */
function reduce(array, func, initial) {

  let start = initial == null ? array[0] : initial
  let firstIndex = initial == null ? 1 : 0

  let result = start;

  for (let i = firstIndex; i < array.length; i++) {

    //console.log(`${i} - ${result} - ${array[i]}`)
    //console.log(func(result, array[i], i, array))

    result = func(result, array[i], i, array)

  }

  return result
}

//const sum = reduce([1, 2, 3], (all, current) => all + current, 10);
/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   const keys = upperProps({ name: 'Сергей', lastName: 'Петров' });
   console.log(keys) // выведет ['NAME', 'LASTNAME']
 */
function upperProps(object) {

  let answer = []
  var keyNames = Object.keys(object);
  for (let i = 0; i < keyNames.length; i++) {

    answer.push(keyNames[i].toUpperCase())

  }

  return answer

}

export { forEach, map, reduce, upperProps };
