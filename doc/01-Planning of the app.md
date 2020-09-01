# Planning
- Tasks
- Using Modules
- Module Pattern

---

## Tasks
1. Add an event handler
2. Get input values
3. Add the new item to the data structure
4. Add the new item to the UI
5. Calculate budget
6. Update the UI


## Using modules
I'll use modules to structure the code since it allows to keep units of code separated and organized, by breaking the code into logical parts that interact with one another.
- **The UI Module**:
- 	- Get input values
	- Add the new item to the UI
	- Update the UI

- **The Data Module**
	- Add new item to data structure
	- Calculate the budget

- **The controller Module**
	- Add event handler


## Module Pattern
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

1. `budgetController`: module that handles our budget data
It is a variable that is an Inmediateley Invoked Function Expression[^1] that will return an object that contains the public functions  [^2]

2. `UIController`: module that handles the user interface
> **separation of concerns**: The UIController y and the other controller follow the logic of separation of concerns[^3] and they are completely independent from each other. 

To be able to connect them (read data from UI and then add data as new expanse in budget Controller) -> we create third module, the app controler 
3.  `appController`: module that connects both modules by passing them as arguments so that the controller knows about the other two and can connect them.  👉🏻 central place where we control what happens upon each event and delegate tasks to the other controllers.  Here is where the vent listeners are:
  👉🏻we want an event for click but also keypress event so that user can by on the return.
We want to run the same tasks for both events so we create a custom function that will take care of it:
```js
const ctrlAddItem = function() {
	// 1-> get input data

	// 2-> add item to budget controller

	// 3-> add new item to UI

	// 4-> calculate the budget

	// 5-> display budget on the UI
}

````

```js
document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
document.addEventListener('keypress', function(ev) {
	// ev.which for older browsers 
	if (ev.keyCode === 13 || ev.which === 13) {
		ctrlAddItem();
	}
});
````


[^1 ]: IIFE: an anonymous function wrapped in parenthesis that blabla. IT allows us to have data privacy because it creates a new scope that is not visible from the outside scope.
[^2 ]: this object contains all the functions that we want to be public.
[^3]: separation of concerns definition