const addExpenseButton = document.getElementById("add-expense-button");

const descriptionInput = document.getElementById("description");
const valueInput = document.getElementById("value");
const selectInput = document.getElementById("type");

const incomeList = document.getElementById("income-list");
const expenseList = document.getElementById("expense-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const totalBudget = document.getElementById("total-budget");
// const element =document.getElementById("myBtn").addEventListener("click", deleteEntry);


// Load saved entries from localStorage
function loadEntries() {
    const savedIncome = localStorage.getItem("incomeEntries");
    console.log('savedincome',savedIncome);
    const savedExpense = localStorage.getItem("expenseEntries");
    console.log('savedExpense',savedExpense);
  
    incomeList.innerHTML = savedIncome || "";
    expenseList.innerHTML = savedExpense || "";
  
    calculateIncome();
    calculateExpense();
    calculateBudget();
  }
  
  loadEntries();
  
  function saveEntries() {
    localStorage.setItem("incomeEntries", incomeList.innerHTML);
    localStorage.setItem("expenseEntries", expenseList.innerHTML);
    // localStorage.setItem("budgetEntries", expenseList.innerHTML);

  }

function formatMoney(value) {
  return Math.abs(Number(value)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

function calculateIncome() {
  let sum = 0;
  for (let item of incomeList.children) {
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");

    console.log(parseFloat(valueString));
    sum += parseFloat(valueString);
    
  }
  totalIncome.innerHTML = formatMoney(sum);
}
calculateIncome();

/**
 * Task 1: Calculate total expense
 */
function calculateExpense() {
    // if(incomeList.innerHTML==""){
    //     alert('No Income No Expense')
    //     return;
    // }
    
    let sum = 0;
  for (let item of expenseList.children) {
    console.log('expenseitem',item);
    const valueString =
      item.children[0].children[1].children[0].innerHTML.replace(/,/g, "");
console.log('calculateexpense',valueString);
    console.log(parseFloat(valueString));
    sum -= parseFloat(valueString);
    console.log('expense sum',sum);
  }
  
  totalExpense.innerHTML = formatMoney(sum);
}

calculateExpense();

/**
 * Task 2: Calculate the budget
 */

function calculateBudget() {
    
    let totalSum=0;
    let income,expense=0;
   
    income =totalIncome.innerHTML.replace(/,/g, "");
   
    expense=totalExpense.innerHTML.replace(/,/g, "");
    console.log('income hoise',income);
    console.log('expense hoise',expense);
    totalSum=parseFloat(income)-parseFloat(expense);
   
        console.log('total budget hoise',totalSum);
        totalBudget.innerHTML = formatMoney(totalSum);
   
    // else{
    //     alert('No Income No Expense')
    //     return;
    // }
  
}
calculateBudget()

/**
 * Task 3: Delete Entry
 */
// function deleteEntry() {
//    
// }

function addEntry() {
    
  const type = selectInput.value;
  const description = descriptionInput.value;
  const value = valueInput.value;

  // data validation
  const errors = [];
  if (description.length === 0) {
    errors.push("Please enter the description");
  }
  if (value.length === 0) {
    errors.push("Please enter the value");
  }
  if (errors.length > 0) {
    alert(errors);
    return;
  }

  // insert entry
  const list = type === "income" ? incomeList : expenseList;
  const sign = type === "income" ? "+" : "-";
  const colorClass = type === "income" ? "text-green-600" : "text-red-600";

  if (type === "expense" && parseFloat(totalIncome.innerHTML.replace(/,/g, "")) <= 0) {
    alert("Cannot add expense without income");
    return;
  }

  const newEntry = document.createElement("li");
  newEntry.classList.add("py-2.5");
  newEntry.innerHTML = `
    <div class="group flex justify-between gap-2 text-sm">
      <span>${description}</span>
      <div>
        <span class="${colorClass}">${sign}${formatMoney(value)}</span>
        <button
          class="delete-button ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block"
        >
          Delete
        </button>
      </div>
    </div>
  `;

  list.appendChild(newEntry);
  saveEntries();

  // update total income value
  calculateIncome();
  calculateExpense();
  calculateBudget();


descriptionInput.value = "";
valueInput.value = "";

 
  const deleteButton = newEntry.querySelector(".delete-button");
  deleteButton.addEventListener("click", function () {
    // Remove the parent li element when the delete button is clicked
    list.removeChild(newEntry);
    saveEntries();
    calculateIncome();
    calculateExpense();
    calculateBudget();
  });


}

addExpenseButton.addEventListener("click", addEntry);
