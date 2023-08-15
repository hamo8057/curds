let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let search = document.getElementById('search')
search.style.display = "none";
let mood = "create"
let tmp;



// get total
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = result;
        total.style.background = "green";
    }else{
        total.innerHTML = "";
        total.style.background = "red";

    }

}
//creat product
let dataPro;
if(localStorage.product != null ){
    
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(count.value < 100){
        if(title.value !="" && price.value !="" && category.value !=""){
            if(mood === 'create'){
        
                if(newPro.count > 1){
                    for(let i = 0; i < newPro.count; i++){
                        dataPro.push(newPro);
                        
            
                    }
                    alert("تم اضافه شخروميت عنصر" );
                }else{
                    dataPro.push(newPro);
                    alert("تم اضافه عنصر جديد")
                }
            }else{
                dataPro[tmp] = newPro;
                mood = 'create';
                submit.innerHTML = "Create";
                count.style.display = "block";
                alert("فل يامعلم تم التعديل");
        
            }
            clearData()
        }else{
            alert("اكتب بيانات ياعم")
            
        }

    }else{
        alert("متذودش عن 100 ياحبيبي وبطل لعب")
         
    }
    
    


    // save data in localstorge
    localStorage.setItem('product', JSON.stringify(dataPro));  
    showData() 
   
}

//clear inputs]
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = ""; 
    category.value = ""; 

}

// read date
function showData(){
    getTotal();
    let table = "";
    for(let i =0; i < dataPro.length;i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
        
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById("deleteAll")
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length}) </button>
        
        `
    }else{
        btnDelete.innerHTML = "";
    }
}
showData()


//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()

    alert("a7a btms7 eh rg3o tany");

}
// deleteAll
function deleteAll(){
    dataPro.splice(0);
    localStorage.clear();
    showData()
}
// count

//update
function updateData(i){
    title.value = dataPro[1].title;
    price.value = dataPro[1].price;
    taxes.value = dataPro[1].taxes;
    ads.value = dataPro[1].ads;
    discount.value = dataPro[1].discount;
    category.value = dataPro[1].category;
    getTotal()
    count.style.display ="none";
    submit.innerHTML = "Updata";
    scroll({
        top:0,
        behavior:'smooth'
    })
    mood = "update"
    tmp = i;

    
}


// search
let searchMood = "title";
function getSearchMood(id){
    if(id == "searchTitle"){
        searchMood = "title";
        search.value = "";
    }else{
        searchMood = "category";
        search.value = "";

    }
    search.placeholder = "Search By " +searchMood;

    showData()
search.style.display = "block";
search.focus()

}
function searchData(value){
    let table;
    if(searchMood == "title"){

        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                        <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                        `
                
            }else{
               
            }
        }




    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                        <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                        `
                
            }else{

            }
        }


    }
    document.getElementById('tbody').innerHTML = table;

}



// clean data