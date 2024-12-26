var siteNameInput= document.getElementById('siteName');
var siteURLInput= document.getElementById('siteURL');
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var fixedBox = document.getElementById("fixedBox")
var closeBtn = document.getElementById("close-icon")
var productsContainer =[];

if(localStorage.getItem("bookContainer") !==null){
    productsContainer = JSON.parse(localStorage.getItem("bookContainer"));
    displayData()
}

btnAdd.addEventListener("click", function () {
  if (siteNameInput.value === "" || siteURLInput.value === "") {
      showAlert("Please fill in all fields.");
  } else if (!validURL()) {
      showAlert("Please enter a valid URL.");
  } else {
      addData(); 
  }
});




function addData(){
if(validName() && validURL()){
  var objBook={
    siteName:siteNameInput.value,
    siteURL:siteURLInput.value,
}
productsContainer.push(objBook);
localStorage.setItem("bookContainer",JSON.stringify(productsContainer));
console.log(productsContainer)
displayData()
clearform()

}}



function displayData()
{
    var cartona ="";
    for(var i=0; i<productsContainer.length;i++){
      cartona+=`
      <tr>

<td>${i}</td>

<td class="text-capitalize">${productsContainer[i].siteName}</td>

<td><button onclick="UpdateProduct(${i})" class="btn btn-primary m-1 p-2"><i class="fa fa-edit pe-2"></i>Update</button></td>

<td><a class="btn btn-warning m-1 p-2"href=${productsContainer[i].siteURL} target ="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>

<td><button onclick="deleteItem(${i})" class="btn btn-danger m-1.p-2"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>

</tr>`
          }
          document.getElementById('tableContent').innerHTML=cartona;
}
var currentIndex;
function setUpdateInfo(index){
    currentIndex= index;
    siteNameInput.value= productsContainer[index].siteName;
    siteURLInput.value = productsContainer[index].siteURL;
    btnAdd.classList.add("d-none");
    btnUpdate.classList.remove("d-none")
}

function UpdateProduct(index){
    siteNameInput.value = productsContainer[index].siteName,
    siteURLInput.value=productsContainer[index].siteURL,
   
    productsContainer.splice(currentIndex,1,objBook);
   displayData()
   localStorage.setItem("bookContainer",JSON.stringify(productsContainer));
    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none")
}

function deleteItem(index){
    productsContainer.splice(index , 1);
    console.log(productsContainer)
    displayData()
    localStorage.setItem("bookContainer",JSON.stringify(productsContainer));
    clearform()
  }
  function clearform(){
    siteNameInput.value=null;
    siteURLInput.value=null;
    siteNameInput.classList.remove('is-valid')
    siteURLInput.classList.remove('is-valid')
  }

  /////////////////////validation/////////////////////////////
function validName(){
  var regex =  /^[a-zA-Z][a-zA-z0-9]{3,19}$/;

  var text = siteNameInput.value;
  var msgName= document.getElementById("msgName");

  if(regex.test(text)){
    // console.log("match")
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    msgName.classList.add("d-none");

    return true;
  }else{
    // console.log("no match")
    siteNameInput.classList.add("is-invalid")
    siteNameInput.classList.remove("is-valid")
    msgName.classList.remove("d-none")
     
    return false;

  }
  }

  function validURL(){
    var regex =  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;
  
    var text = siteURLInput.value;
    var msgURL= document.getElementById("msgURL");
  
    if(regex.test(text)){
      // console.log("match")
      siteURLInput.classList.add("is-valid");
      siteURLInput.classList.remove("is-invalid");
      msgURL.classList.add("d-none");
  
      return true;
    }else{
      // console.log("no match")
      siteURLInput.classList.add("is-invalid")
      siteURLInput.classList.remove("is-valid")
      msgURL.classList.remove("d-none")
       
      return false;
  
    }
    }
    function showAlert(message) {
      fixedBox.querySelector("h4").innerText = message; 
      fixedBox.classList.remove("d-none");
      fixedBox.classList.add("d-flex");
  }
  
  function hideAlert() {
      fixedBox.classList.remove("d-flex");
      fixedBox.classList.add("d-none");
  }
  
  closeBtn.addEventListener("click", function () {
      hideAlert();
  });