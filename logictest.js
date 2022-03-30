let modal = document.getElementById("addExpenseModal");
let modalInc = document.getElementById("addIncomeModal");

let btnExp = document.getElementById("add-expense");
let btnInc = document.getElementById("add-income");

let xClose = document.getElementsByClassName("closeButton")[0];
let xCloseInc = document.getElementsByClassName("closeButton")[1];

const records = document.getElementById("record-journal");

const expForm = document.getElementById("expForm");
const incForm = document.getElementById("incForm");

let balance = 0;
document.getElementById("balance").innerText = balance;

btnExp.onclick = function() {

  if (balance > 0) {
    modal.style.display = "block";
  } else {
    console.log("Earn first, spend later!");
  }

  
}

btnInc.onclick = function() {
  modalInc.style.display = "block";
}

function hideModal() {
  modal.style.display = "none";
  modalInc.style.display = "none";
  expForm.reset();
  incForm.reset(); 
}

xClose.onclick = hideModal;
xCloseInc.onclick = hideModal;

window.onclick = function(event) {
  if (event.target == modal || event.target == modalInc) {
    hideModal();
  }
}

console.log(balance);



function addExpense() {

  const expAmount = expForm.elements["expAmount"];

  const expCaption = expForm.elements["expCaption"];

  console.log("Life's expensive! So stop spending!");
  let row = document.createElement("div");
  row.className = "recordRow";
  row.innerHTML = '<span class="amount red">'+expAmount.value+'</span><span class="description">'+expCaption.value+'</span><div class="deleteRow" onclick="deleteRow(this)">X</div>';
  records.insertBefore(row, records.firstChild);
  let balanceNum = parseInt(balance, 10);
  let expAmountNum = parseInt(expAmount.value, 10);
  balance = balanceNum-expAmountNum;
  document.getElementById("balance").innerText = balance;
  hideModal();
}

function addIncome() {
  
  const incAmount = incForm.elements["incAmount"];

  const incCaption = incForm.elements["incCaption"];

  console.log("Hello there, this is income!");
  let row = document.createElement("div");
  row.className = "recordRow";
  row.innerHTML = '<span class="amount green">'+incAmount.value+'</span><span class="description">'+incCaption.value+'</span><div class="deleteRow" onclick="deleteRow(this)">X</div>';
  records.insertBefore(row, records.firstChild);
  let balanceNum = parseInt(balance, 10);
  let incAmountNum = parseInt(incAmount.value, 10);
  balance = balanceNum+incAmountNum;
  document.getElementById("balance").innerText = balance;
  hideModal();
}

function deleteRow(invoker) {

  let amount = invoker.parentNode.getElementsByClassName("amount")[0].innerText;
  
  let className = invoker.parentNode.getElementsByClassName("amount")[0].getAttribute("class");
  console.log(className);

  const secondWordPattern = /(?<=\s)[A-Za-z0-9_-]*/;

  let secondWord = className.match(secondWordPattern)[0];

  if (secondWord == "red") {
    balance = balance + parseInt(amount, 10);
  } else if (secondWord == "green") {
    balance = parseInt(balance, 10) - parseInt(amount, 10);
  } else {
    return "No red or green CSS class was found.";
  }  

  document.getElementById("balance").innerText = balance;

  invoker.parentNode.remove();
}