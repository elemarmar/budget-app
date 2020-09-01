# 04 - Event delegation

## ⏳ Summary of previous steps
- add new item to data structure
- add new item to UI
- calculate budget
- display budget on UI
- clearing out inputs

---

<br />

## Next steps:

1. Setting up the Delete Event listener using **event delegation**
2. Deleting an Item from the budget controller
3. Deleting an item from the UI



>  ℹ️ We are going to use **event delegation** because:
>
> - we are going to have lots of child elements that we are interested in
> - these elements are not yet in our DOM when page is loaded



<br />

---

### Setting up the Delete Event listener using event delegation
We add a new event handler in the **app controller** in the `setupEventListeners` function. We are going to setup the event on a parent element (event delegation) of the elements that we are interested in (the delete buttons on each new item created)
```js
const setupEventListeners = function() {
//...
document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

}

````
> 👉🏻we use the `<div>` with the class of `container` because it's parent of both the income items and the expenses items. 
>
> 

We create the `ctrlDeleteIem` function that will be called when the user clicks on the delete button of any item:
```js
const ctrlDeleteItem = function(ev) {
// moving up 4 times in the DOM and get id
const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

if (itemID) {
	const splitID = itemID.split('-')
	const type = splitID[0];
	const ID = parseInt(splitID[1]);
	
	// 1-> delete item from data structure
	budgetCtrl.deleteItem(type, ID);
	
	// 2-> delete item from UI
	
	//3-> update and show new budget
	
	
}
}

````
>  👉🏻We aren't interested in the button element but the parent `<div>` element since we want to delete the whole item from the UI --> DOM traversing.

<br />

### Deleting an item from the budget controller
We create a public method in our budget controller to delete an item from the data structure.
```js
deleteItem: function(type, id) {
	const ids = data.allItems[type].map(function(current) {
	return current.id
	})
	
	const index = ids.indexOf(id);
	
	if (index !== -1) {
		data.allItems[type].splice(index, 1);
	}
	
}
```

<br />

### Deleting an item from the UI

We create a public method in our UI controller to delete an item from the UI
```js
	deleteListItem: function(selectorID) {
		const element = document.getElementById(selectorID)
		element.parentNode.removeChild(element)
	}
```
> 👉🏻 we can only remove a child element -> we use parentNode, to move to the parent to be able to delete the item. 