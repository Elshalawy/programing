// تعريف العناصر
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;
// حساب الإجمالي
function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

// تحميل البيانات من localStorage أو إنشاء مصفوفة فارغة
let datapro = JSON.parse(localStorage.getItem("product")) || [];

// عند النقر على زر الإرسال
submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create")
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  else {
    datapro [tmp ] = newpro;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }
  datapro.push(newpro);

  localStorage.setItem("product", JSON.stringify(datapro));
  showData(); // تحديث عرض البيانات بعد الإضافة
  clearData();
};

// مسح البيانات من الحقول
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// عرض البيانات
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].count}</td>
      <td>${datapro[i].category}</td>
      <td><button  onclick="updateData(${i})"id="update-btn" >update</button></td>
      <td><button onclick="deleteData(${i})">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deletALL()">delete ALL(${datapro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}
function deletALL() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}
function updateData(i) {
  tmp = i;
  getTotal();
  count.style.display = " none";
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  mood = "update";
  submit.innerHTML = "update";
  getTotal();
  scroll({
    top: 0,
    behavior: "smooth",
  });
  showData();
}
let searchMood = "title";
function getsearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchMood = "title";
    search.placeholder = "search by Title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].count}</td>
      <td>${datapro[i].category}</td>
      <td><button  onclick="updateData(${i})"id="update-btn" >update</button></td>
      <td><button onclick="deleteData(${i})">delete</button></td>
    </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value)) {
        table += `
    <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].count}</td>
      <td>${datapro[i].category}</td>
      <td><button  onclick="updateData(${i})"id="update-btn" >update</button></td>
      <td><button onclick="deleteData(${i})">delete</button></td>
    </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
