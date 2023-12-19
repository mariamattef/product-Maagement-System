
// get Total
// Create Product
// Save Local storage
// clear inputs
// read or  عرض المنتجات ف الجدول 
// create cout
// delete
// update
// search
// clean data



let mainDiv = document.querySelectorAll('.price input');
let price = document.getElementById('Price');
let title = document.getElementById('title');
 let Taxses = document.getElementById('Taxses');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create';
let tmp;
// get Total
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +Taxses.value + +ads.value )- +discount.value;
        total.innerHTML= result;
        total.style.backgroundColor='#040'
    } 
    else{
        total.innerHTML = '';
        total.style.backgroundColor='rgb(156, 8, 8)'
    }

}     
// localStorage.clear()
// Create Product 
let newData;
if(localStorage.product != null){
   newData = JSON.parse(localStorage.product)
}
else{
    newData = [];
}
submit.addEventListener('click',function(){
let newPro = {
    title : title.value.toLowerCase(),
    price : price.value,
    Taxses : Taxses.value,
     ads : ads.value,
     discount : discount.value,
     total : total.innerHTML,
     count : count.value,
     category : category.value.toLowerCase(),
}
 // Count
if(title.value != '' && price.value != '' && category.value != '' && newPro.count <=1000){
    if(mode === 'create'){
        if(newPro.count > 1){
            for(let i=0; i<newPro.count;i++){
                newData.push(newPro);
            }
        } 
        else{
            newData.push(newPro);   
        }
     }else{
        newData[tmp] = newPro;
        mode = 'create';
        submit.innerHTML = 'Create';
        count.style.display ='block'
     }
     cleareData();
}
  
// Save Local Storage
localStorage.setItem('product',JSON.stringify(newData));
showData();
})

// Clear inputs 
function cleareData(){
title.value ='';
price.value ='';
Taxses.value = '';
ads.value = '';
discount.value = '';
total.innerHTML = '';
count.value ='';
category.value = '';
}
// read Data from table

function showData(){
    getTotal();
    let table ='';
for(let i=0; i < newData.length;i++){
  
table += `
<tr>
<td>${i+1}</td>
<td>${newData[i].title}</td>
 <td>${newData[i].Taxses}</td>
 <td>${newData[i].price}</td>
 <td>${newData[i].ads}</td>
 <td>${newData[i].discount}</td>
 <td>${newData[i].total}</td>
 <td>${newData[i].category}</td>
 <td><button onclick="updateData(${i})" class="btn btn-success" id="update">Update</button></td>
 <td><button onclick="deleteData(${i})" class="btn btn-success" id="delete">Delete</button></td>
 </tr>
`
}


document.getElementById('tbody').innerHTML = table;

// Delete All 
let dele = document.getElementById('deleteAll')
if(newData.length > 0) {
    dele.innerHTML = `
    <button onclick ="deleteAll()">Delete All</button> `  
   }
   else{
    dele.innerHTML = '';
   }
}
showData();

// Delete Data

function deleteData(i){
newData.splice(i,1);
localStorage.product = JSON.stringify(newData);
showData();
}
 
// Delete All
function deleteAll(){
    localStorage.clear();
    newData.splice(0);
    showData();
}    

// update
function updateData(i){
         title.value=newData[i].title ;
        price.value= newData[i].price;
        Taxses.value=newData[i].Taxses;
        ads.value= newData[i].ads;
        discount.value =newData[i].discount;
        getTotal()
        count.style.display='none';
        total.innerHTML = newData[i].total;
        category.value =newData[i].category;
        submit.innerHTML = 'Update'
        mode = 'updete';
          tmp=i;
    scroll({
top:0,
behavior:"smooth",

    })
    }

    // search
    let search = document.getElementById('search');
    let searchMode = 'title';
    function getSerchMode(id){
        if(id == 'SearchByTitle'){
           searchMode = 'Title'
        }
        else{
            searchMode = 'Category'
          
        }

           search.focus();
           search.value ='';
           showData();
           search.placeholder = 'Search By '+searchMode;
    }


function searchData(value){
    let table = '';
    for(let i=0; i<newData.length;i++){
   if(searchMode == 'title'){
 
   if(newData[i].title.includes(value.toLowerCase())){
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${newData[i].title}</td>
     <td>${newData[i].Taxses}</td>
     <td>${newData[i].price}</td>
     <td>${newData[i].ads}</td>
     <td>${newData[i].discount}</td>
     <td>${newData[i].total}</td>
     <td>${newData[i].category}</td>
     <td><button onclick="updateData(${i})" class="btn btn-success" id="update">Update</button></td>
     <td><button onclick="deleteData(${i})" class="btn btn-success" id="delete">Delete</button></td>
     </tr>
    `;
}
   }
   else{
    
        if(newData[i].category.includes(value.toLowerCase())){
         table += `
         <tr>
         <td>${i+1}</td>
         <td>${newData[i].title}</td>
          <td>${newData[i].Taxses}</td>
          <td>${newData[i].price}</td>
          <td>${newData[i].ads}</td>
          <td>${newData[i].discount}</td>
          <td>${newData[i].total}</td>
          <td>${newData[i].category}</td>
          <td><button onclick="updateData(${i})" class="btn btn-success" id="update">Update</button></td>
          <td><button onclick="deleteData(${i})" class="btn btn-success" id="delete">Delete</button></td>
          </tr>
         `;
     }
   }

}
   document.getElementById('tbody').innerHTML = table;
}












































































