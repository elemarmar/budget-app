# 02: Adding a new item to the controller and updating the UI

## summary of what we have so far
- three modules: UI, budgetcontroller and controller
- controller:
	- public init method
	- reads input data (from UIController)
- UI:
	- event listeners
- budgetController:
	- 2 function constructors: Expense & Income
	- complex data structure to store the expense and income objects

#### Adding a New Item to Our Budget Controller
we add a public method in the `budgetController` to allow other modules to add new items into the data structure defined in the previous step.
 ```js
 // ...
 	return {
		addItem: function(type, des, val) {
		let newItem, ID;
		
		// create new ID
		ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
		
		// create new item
		if ( type === 'inc') {
			newItem = new Income(ID, des, val);
		} else if (type === 'exp') {
			newItem = new Expense(ID, des, val);
		}
		
		// push it into data 	structure data.allItems[type].push(newItem);
		//return the new element
		return newItem;
	
		}
	};
 
 ```

`controller`
```js
const ctrlAddItem = function() {
	//1. Get the field input data
	const input = UICtrl.getInput();
	
	// 2. Add the item to the budgetController
	const newItem =  budgetCtrl.addItem(input.type, input.description, input.value);

}
````
we call the addItem method in controller to add a new item

#### Adding a New Item to the UI
we create a new public method to `UIcontroller` that adss a list item providing the item as an object and the type (income / expense)
```js
addListItem: function(obj, type) {
	let html, newHtml, element;
	// create html string with placeholder text
	if (type === 'inc') {
	    element = DOMStrings.incomeContainer;
		html = '<div........'
	} else if (type === 'exp') {
		element = DOMStrings.expensesContainer;
		html = '<div........'
	}

	
	// replace placeholder with data
	newHtml = html.replace('%id%', obj.id).replace('%description%', obj.description).replace('%value%', obj.value)
	
	// insert the HTML into the DOM 
	      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
}
```
 we wrap the pieces of strings we want to replace with `%`
 
 we then call this method inside the `ctrlAddItem` function inside `controller` Module
 ```js
 const ctrlAddItem = function () {
 	//...
	
    // 3-> add new item to UI
    UICtrl.addListItem(newItem, input.type);
 
 `````

 
#### Clearing Our Input Fields
We want to clear the input fields after we enter an input
it has to do with the UI -> UIController

we add a new public method `clearFields`
```js
clearFields: function() {
	document.querySelectorAll(DOMstrings.inputDescription + ', ' +  DOMstrings.inputValue);
	
	const fieldsArr = Array.prototype.slice.call(fields);
	
	fieldsArr.forEach((current, index, array) => {
	current.value = '';
})
}
```
 
 we add it in the controller module after adding a new item
 ```js
     // 4-> clear the fields
    UICtrl.clearFields();
````

#### Updaing the Budget: Controller
 The last two steps of the `ctrlAddItem`:
 - calculate the budget
 - display the budget on the UI 
 will be executed by another function `updateBudget`
 
 ```js
const updateBudget = function() {
// 1-> calculate the budget
// 2 -> return the budget
// 3-> display budget on the UI
}
 ````

 We create a public method `calculateBudget` in the buget module:
 ```js
 calculateBudget: function() {
 	// calculate total income and expenses
	calculateTotal('exp');
	calculateTotal('inc');
	
	// calculate the budget: income - expenses
	      // calculate the budget: income - expenses
      data.budget = data.total.inc - data.total.exp;
	
	// calculate percentage of spent income
	data.percentage = Math.round ((data.totals.exp / data.totals.inc) * 100);
 
 }
 ```
 
 We create a private function to calculate the total -> we'll use to calculate the total income and total expenses
 ```js
 const calculateTotal = function(type) {
 	let sum = 0;
	data.allItems[type].forEach(function(current) {
	sum += current;
	});
	data.totals[type] = sum;
 }
 ```
 
 **appController**
 ```js
   const updateBudget = function () {
    // 1-> calculate the budget
    budgetCtrl.calculateBudget();
	
    // 2 -> return the budget
	const budget = budgetCtrl.getBudget();
	
    // 3-> display budget on the UI
  };
 ````
In order to return the budget, we create a new public method in the bugetController called `getBudget`
```js
getBudget: function() {
	return {
		budget: data.budget,
		totalIncome: data.totals.inc,
		totalExpenses: data.totals.exp,
		percentage: data.percentage
	}
}
````

 
#### Updating the Budget: UI Controller

We create a new public method in the UI controller module, called `displayBudget`

```js
displayBudget: function(obj) {
	document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
	document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalIncome;
	document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExpenses;
	document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;

}

```