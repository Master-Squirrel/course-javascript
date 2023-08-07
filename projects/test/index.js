import './index.html';

const button = document.querySelector('#my-button');
const result = document.querySelector('#my-result');

button.addEventListener('click', () => {
  result.textContent = '42';
});


collectDOMStat(document.querySelector('.some-class-1'))

function collectDOMStat(root) {

  let obj = {
     tags: { },
     classes: { },
     texts: 0
  }

  let textCounter = 0;
  let pCounter = 0;
  var bCounter = 0;
  let elem = "";



  for (elem of root.childNodes) {

    if (elem.classList) {

      elem.classList.forEach(element => {

        if (Object.keys(obj.classes).some(key => key === element)) {
          

          obj.classes[element]++;
        } else {
          obj.classes[element] = 1;
        }
      });
    }


    if (elem.nodeType === 3) {

      textCounter++;
    }

    if (elem.tagName === 'P') {
      pCounter++;
    }

    if (elem.tagName === 'B') {
      bCounter++;
      
    }
  }
  

  obj.texts = textCounter;
  obj.tags.P = pCounter;
  obj.tags.B = bCounter;
  //console.log(obj);

  return obj;
}
