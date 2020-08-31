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

  return {
    addItem: function (type, des, val) {
      let newItem, ID;

      // create new ID
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

      // create new item
      if (type === 'inc') {
        newItem = new Income(ID, des, val);
      } else if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      }

      // push it into data 	structure data.allItems[type].push(newItem);
      //return the new element
      return newItem;
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
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value,
      };
    },
    getDOMStrings: function () {
      return DOMStrings;
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

  const ctrlAddItem = function () {
    // 1-> get input data
    const input = UICtrl.getInput();

    // 2-> add item to budget controller
    // 3-> add new item to UI
    // 4-> calculate the budget
    // 5-> display budget on the UI
  };

  return {
    init: function () {
      console.log('Application has started!');
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();
