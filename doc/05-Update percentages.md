# 05 -Updating percentages: controller

## Summary previous steps
- set up delete event listener using event delegation
- deleted an item from data structure and UI

## Next steps
### updating the percentages: budget controller
Whenever we add/delete an item we want to update the percentages and display them. 
We create a new function `updatePercentages` in the app controller
```js
const updatePercentages = function() {
	// 1. calculate percentages
	
	// 2. read percentages from budget controller
	
	// 3. update user interface
}
```

We now create the methods that will do the calculations for the percentages to our `budgetController`
```js

calculatePercentages: function() {
	 
}
````

We create a methodthat each instance of Expense and Income constructors inherit that is the percentage.
```js
//BUDGET CONTROLLER
//...
const Expense = function(id, description, value) {
	// ...
	this.percentage = -1;

}
Expense.prototype.calcPercentage = function(totalIncome) {

if (totalIncome > 0) {
	this.percentage = Math.round((this.value / totalIncome) * 100);
} else {
this.percentage = -1;}

}

Expense.prototype.getPercentage = function() {
	return this.percentage;
}

````

Back to `calculatePercentages` method:
```js

calculatePercentages: function() {
	 data.allItems.exp.forEach(function(current) {
	 current.calcPercentage(data.totals.inc);
	 })
},

getPercentages: function() {
	const allPerc = data.allItems.exp.map(function(current) {
	return current.getPercentage();
	})
	return allPerc;
}
````


### updating the percentages: UI Controller
In the UI controller we create the `displayPercentages` public method:
```js
displayPercentages: function(percentages) {
	const fields = document.querySelectorall(DOMStrings.expensesPercentageLabel);
	
	const nodeListForEach = function(list, callback) {

	for ( let i = 0; i < list.length;i++) {
	callback(list[i], index);
	}
}

	nodeListForEach(fields, function(current, index) {
	if (percentages[index] > 0) {
			current.textContent = percentages[index] + '%';
	} else {
			current.textContent = '---';}

	})
	
}
```


