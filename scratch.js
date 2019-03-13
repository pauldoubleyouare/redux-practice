function createStore(reducer) {
  /*
   - Whenever you invoke createStore, you're going to get back an {} that represents store
   - So, you can't interact with state itself, that's what the GET / UPDATE / LISTEN are for
   - Store has 4 parts to it:
   1. State itself
   2. GET State
   3. Listen for changes to state
   4. UPDATE State
  */
  let state; // #1 State itself
  let listeners = []; //listeners is going to be a list of functions that the user invokes via subscribe

  const getState = () => state; // #2 a way to getState

  const subscribe = listener => {
    // #4 Listen for changes
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // goal of dispatch is to update state, in a predictible state
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    // call todos fn
    // loop over all listeneres and invoke them
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

// Goals reducer function
function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}

//===initially, this:=====
// function todos (state = [], action) {
//   if (action.type === ADD_TODO) {
//     return state.concat([action.todo])
//   } else if (action.type === 'REMOVE_TODO') {
//     return state.filter((todo) => todo.id !== action.id)
//   } else if (action.type === 'TOGGLE_TODO') {
//     return state.map((todo) => todo.id !== action.id ? todo :
//       Object.assign({}, todo, { complete: !todo.complete })
//       )
//   } else {
//     return state
//   }
// }

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

const store = createStore(app);

// returning next state of application - reducer function
// In your reducer functions, you're probably going to have a lot of if/else statements
// comm standard is to use switch()

// ===== ACTIONS ====== //
// creating an action for every type of event that can occur in the application, that changes state of store
// if store changes, we know that one of the actions/events occurred
let a1 = {
  type: ADD_TODO,
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false
  }
};
let a2 = {
  type: REMOVE_TODO,
  id: 0
};

let a3 = {
  type: TOGGLE_TODO,
  id: 0
};

let a4 = {
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: "Run marathon"
  }
};

let a5 = {
  type: REMOVE_GOAL,
  id: 0
};

//====== How to use these from the front end: =====

const store = createStore(); // has two methods, getState and subscribe
// whenever the state changes inside of store, we're calling the functions inside of the subscribe() method
// users can call subscribe() as many times as they want, so we need to keep track of them
const unsubscribe = store.subscribe(() => {});

const store = createStore(app);

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false
  }
});
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: "Walk the dog",
    complete: false
  }
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: "Wash the car",
    complete: false
  }
});

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 2,
    name: "Go to the gym",
    complete: true
  }
});

store.dispatch({
  type: REMOVE_TODO,
  id: 1
});

store.dispatch({
  type: TOGGLE_TODO,
  id: 0
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: "Learn Redux"
  }
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: "Lose 20 pounds"
  }
});

store.dispatch({
  type: REMOVE_GOAL,
  id: 0
});
