const loader = document.querySelector('.loader');
const main = document.querySelector('.main');
const output = document.querySelector('.output');
const url = ('./items.json');
const ul = document.createElement('ul');
const output1 = document.createElement('div');
output.append(output1);
output.append(ul);


// window.addEventListener('DOMContentLoaded', ()=>{
//     // output1.textContent = 'ready';
//     loadData();
// })

// function loadData(){
//     fetch(url)
//     .then(rep=>rep.json())
//     .then((data) =>
//     {
//         addtoPage(data);
//     })
// }

// function addtoPage(arr){
//     arr.forEach((el)=>{
//         const li = document.createElement('li');
//         li.textContent = el.name;
//         ul.append(li);
//     });
// }

function init() {
        setTimeout(() => {
            loader.getElementsByClassName.opacity = 0;
            loader.getElementsByClassName.display = 'none';

            main.style.display = 'block';
            setTimeout(() => (main.style.opacity = 1), 50);
        }, 4000);
}
init();