# 06- Display date



### formatting our budget: numbers: string manipulation

- all numbers should have a decimal part with 2 numbers
- expenses have - sign and income numbers have a + sign
- if a number is in the thousands, there should be a comma

we add a method to the UI controller so that each time we display a number on the UI, we call that method, pass in the input number and output the "formative" number
```js
formatNumber: function (number, type) {

num = Math.abs(num);
num = num.toFixed(2);

const numSplit = num.split('.');

const int = numSplit[0];

if (int.length > 3) {
	int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
}

const dec = numSplit[1];

return (type === 'exp' ? '-' : '+') + ' '  + int + '.' dec;
}
```

<br />

### displaying the current month and year

We create a new method in the UI module called `displayMonth` 

```js
displayMonth: function() {
	
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
		document.querySelector(DOMStrings.dateLabel).textContent = month + ' ' + year;

}

```

