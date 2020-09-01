# Planning
## ☑️ Tasks
1. Add an event handler
2. Get input values
3. Add the new item to the data structure
4. Add the new item to the UI
5. Calculate budget
6. Update the UI



<br />




## 💻 Using modules
I'll use modules to structure the code since it allows to keep logical units of code separated and organized
- **The UI Module**:

  * Get input values

  - Add the new item to the UI
  - Update the UI
- **The Data Module**
	- Add new item to data structure
	- Calculate the budget

- **The controller Module**
	
	- Add event handler



<br />



## 🔍 Module Pattern

There will be 3 modules:

```js
const budgetController = (function() {
	// code
})()

const UIController = (function() {
	// code
})();

const controller = (function(budgetCtrl, UICtrl) {
	//code here
})(budgetController, UIController);

````

1. `budgetController`:  handles our budget data

2. `UIController`: module that handles the user interface
> **separation of concerns**: The UIController y and the  budgetController follow the logic of separation of concerns and they are completely independent from each other. 

👉🏻 To be able to connect them (read data from UI and then add data as new expanse in budget Controller) we create third module, the app controler 
3.  `appController`: module that connects both modules by passing them as arguments so that the controller knows about the other two and can connect them. It also controls what happens upon each event and delegates tasks to the other controllers. 

<br />

**appController**

```js
// function that adds a new item. 
const ctrlAddItem = function() {
	// 1-> get input data

	// 2-> add item to budget controller

	// 3-> add new item to UI

	// 4-> calculate the budget

	// 5-> display budget on the UI
}

````

```js
// we add event listeners to both clicking on the "add new item" button or when hitting the return key --> in both cases, we want to call ctrlAddItem
document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
document.addEventListener('keypress', function(ev) {
	// ev.which for older browsers 
	if (ev.keyCode === 13 || ev.which === 13) {
		ctrlAddItem();
	}
});
````

