// BUDGET CONTROLLER
const budgetController = (function () {
  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function (current) {
      sum += current;
    });
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function (type, des, val) {
      let newItem, ID;

      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item
      if (type === 'inc') {
        newItem = new Income(ID, des, val);
      } else if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      }

      // push it into data 	structure
      data.allItems[type].push(newItem);
      //return the new element
      return newItem;
    },
    testing: function () {
      console.log(data);
    },
    calculateBudget: function () {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calculate percentage of spent income
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1; // non-existence
      }
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExpenses: data.totals.exp,
        percentage: data.percentage,
      };
    },
  };
})();

//UI CONTROLLER
const UIController = (function () {
  const DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
      };
    },
    getDOMStrings: function () {
      return DOMStrings;
    },
    addListItem: function (obj, type) {
      let html, newHtml, element;
      // create html string with placeholder text
      if (type === 'inc') {
        element = DOMStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMStrings.expensesContainer;

        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';
      }

      // replace placeholder with data
      newHtml = html
        .replace('%id%', obj.id)
        .replace('%description%', obj.description)
        .replace('%value%', obj.value);
      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: function () {
      const fields = document.querySelectorAll(
        DOMStrings.inputDescription + ', ' + DOMStrings.inputValue
      );

      const fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((current, index, array) => {
        current.value = '';
      });
      fieldsArr[0].focus();
    },
  };
})();

// APP CONTROLLER
const controller = (function (budgetCtrl, UICtrl) {
  const setupEventListener = function () {
    const DOM = UICtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (ev) {
      if (ev.keyCode === 13 || ev.which === 13) {
        ctrlAddItem();
      }
    });
  };

  const updateBudget = function () {
    // 1-> calculate the budget
    budgetCtrl.calculateBudget();

    // 2 -> return the budget
    const budget = budgetCtrl.getBudget();

    // 3-> display budget on the UI
  };

  const ctrlAddItem = function () {
    // 1-> get input data
    const input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2-> add item to budget controller
      const newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3-> add new item to UI
      UICtrl.addListItem(newItem, input.type);

      // 4-> clear the fields
      UICtrl.clearFields();

      // 5-> calculate and update budget
      updateBudget();
    }
  };

  return {
    init: function () {
      console.log('Application has started!');
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();
