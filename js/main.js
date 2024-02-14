
var product_name=document.getElementById("productName");
var product_price=document.getElementById("productPrice");
var product_category=document.getElementById("productCategory");
var product_description=document.getElementById("productDesc");
var product_count=document.getElementById("productCount");
var submit=document.getElementById("submit");
var tbody=document.getElementById("t_body");
var text=document.getElementById("text");
var productsdata;
var mood='create'
var temp=0;

if(localStorage.products==null){
    productsdata=[];
}else{
    productsdata=JSON.parse(localStorage.getItem("products"));
}
function addproduct(){
    var product = {
        productname: product_name.value,
        productprice: product_price.value,
        productcategory:product_category.value,
        productdesc:product_description.value,
        productcount:product_count.value
    }
    if(product.productname==''||product.productcategory==''||product.productprice==''||product.productdesc==''||product.productcount==''){
        window.alert("enter all the fields");
    }else if(typeof(Number(product.productprice))!=typeof(1)||Number(product.productprice)<0){
        window.alert("please enter a valid number")
    }else{
        if(mood==='create'){
            for(var i=0;i<product.productcount;i++){
                productsdata.push(product);
            }
        } else{
            productsdata[temp]=product;
            submit.innerHTML='Add product'
            mood='create'
        }
        localStorage.setItem("products",JSON.stringify(productsdata));
    }
    getTotal()
    displaydata();
    cleardata();
    checkEmpty()
}
function displaydata(){
    var cartoona1='';
    for( var i=0;i<productsdata.length;i++){
            cartoona1+=`
            <tr class="table-secondary">
            <td>${i+1}</td>
            <td>${productsdata[i].productname}</td>
            <td>${productsdata[i].productprice}</td>
            <td>${productsdata[i].productcategory}</td>
            <td>${productsdata[i].productdesc}</td>
            <td><button type="button" onclick="update(${i})" class="btn btn-success">Edit</button></td>
            <td><button type="button" onclick="deleteElement(${i})" class="btn btn-danger">Delete</button></td>
            </tr>`
        }
       
    tbody.innerHTML=cartoona1;
    checkEmpty()
}

function cleardata(){
    product_name.value=''
    product_price.value=''
    product_category.value=''
    product_description.value=''
    product_count.value=''
}

function deleteAll(){
localStorage.clear()
productsdata.splice(0)
getTotal()
checkEmpty()
cleardata()
displaydata()
}

function deleteElement(i){
   productsdata.splice(i,1)
   localStorage.products=JSON.stringify(productsdata);
   getTotal()
   displaydata();
}

function update(i){
product_name.value=productsdata[i].productname
product_description.value=productsdata[i].productdesc
product_category.value=productsdata[i].productcategory
product_price.value=productsdata[i].productprice
submit.innerHTML= 'update'
mood='update'
temp=i
getTotal()
}

function search(term)
{
var cartoona2=''
for(var i=0;i<productsdata.length;i++){
    if(productsdata[i].productname.toLowerCase().includes(term.toLowerCase().trim())){
        cartoona2+=`
        <tr class="table-secondary">
        <td>${i+1}</td>
        <td>${productsdata[i].productname}</td>
        <td>${productsdata[i].productprice}</td>
        <td>${productsdata[i].productcategory}</td>
        <td>${productsdata[i].productdesc}</td>
        <td><button type="button" onclick="update(${i})" class="btn btn-success">Edit</button></td>
        <td><button type="button" onclick="deleteElement(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`
    }
}
tbody.innerHTML=cartoona2;
}

function getTotal(){
    var total=0;
    for(var i=0;i<productsdata.length;i++){
       total+= Number(productsdata[i].productprice)
    }
document.getElementById("t_foot").innerHTML=`
<td>Total</td>
<td colspan="6">${total}</td>
`
}
getTotal()
function checkEmpty(){
    if(productsdata.length==0){
    text.innerHTML='THERE IS NO DATA'
    }else{
    text.innerHTML=''
    }
}
