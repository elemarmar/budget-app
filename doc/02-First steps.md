# 01:First steps

## ⏳ Summary of previous steps
- we created three modules:
	- two independent ones: `budgetControlle`r & `UIController`
	- a module that will connect the other two: `controller`
- we created two event listeners:
	- one for the add new item button
	- another one for when the user presses the "return" key



<br />




## 👉🏻 Next steps
- Reading input data
- Creating an initialization function
- Income and Expense function constructors



<br />



 ### Reading input data
 The method for reading the input data belongs to the UI module and later will be called in the controller module -> so that it can pass it to the other controller and add it to the data structure.

>  👉🏻It needs to be a public method in order to be accessed by the `controller` module -> it has to be in the object that the IIFE will return.

<br />

 **UIcontroller**
 ```js
 return {
 	getInput: function() {
		return {
		type: document.querySelector('.add__type').value ,
		description: document.querySelector('.add__description').value,
		value:  document.querySelector('.add__value').value}
	}
 }
 
 ```

We call the method inside the `controller` module:

<br />

**controller**

```js
  const ctrlAddItem = function () {
    // 1-> get input data
    const input = UICtrl.getInput;
	// ...
	}

```

<br />

### Creating an initialization function

We create this function as a public method of the `controller` module and call it ouside of the controller.

```js
  const ctrlAddItem = function () {
    // 1-> get input data
    const input = UICtrl.getInput;
	// ...
	
	return {
		init: function() {
			console.log("App running!");
			setupEventListeners();
		}
	}
}

```

👉🏻`setUpEventListeners` is a function that creates the event listeners inside of UIController. 



<br />

### creating income and expense function constructors

The data model for income and expenses should go in the `budgetController`

```js

const Expense = function(id, description, value) {
	this.id = id;
	this.description = description;
	this.value = value;
}

const Income = function(id, description, value) {
	this.id = id;
	this.description = description;
	this.value = value;
}

````
We want to store the information of each item (value, description, id) in an object. --> since we want to create MANY objects, we'll use a **function constructor.** 

we create an array to store all the objects:
```js
const data = {
	allItems: {
		exp: [],
		inc: []
	},
	total: {
		exp: 0,
		inc: 0
	}
}
````
