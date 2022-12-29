let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = "create"
let tmp;




//git total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040"
    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    }

}
//create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function () {

    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    //count
    if (title.value != ""  && price.value != "" && category.value != "" && count.value <= 100 ) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {

            dataPro[tmp] = newPro;
            submit.innerText = "Create";
            mood = "create";
            count.style.display = "block";
        }
        clearInputs()

    }else{
        alert("Required (title-count-price-category)")
    }


    //save localStorage
    localStorage.setItem('product', JSON.stringify(dataPro))
    showData()
}

//clear inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
      <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onClick="update(${i})" id="update">update</button></td>
      <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
  </tr>
      `

    }
    document.getElementById('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDeleteAll.innerHTML = `
    <button onClick="deleteAll()" id="deleteAll" >Delete All (${dataPro.length}) </button>
    `
    } else {
        btnDeleteAll.innerHTML = '';
    }
    getTotal();
}
showData()

//delete 
function deleteData(index) {
    dataPro.splice(index, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

// deleteAll
function deleteAll() {
    dataPro.splice(0);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}



//update
function update(index) {
    dataPro = JSON.parse(localStorage.product);
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataPro[index].category;
    submit.innerText = "update";
    mood = "update"
    tmp = index;
    scroll({ top: 0, behavior: "smooth" })
}

//search

let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == "searchTitle") {
        searchMood = "title"

    } else {
        searchMood = "category"

    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    showData()
}

//clean data
function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onClick="update(${i})" id="update">update</button></td>
                    <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                    `
            }


        } else {

            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onClick="update(${i})" id="update">update</button></td>
                <td><button onClick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
                `
            }


        }
    }
    document.getElementById('tbody').innerHTML = table;

}