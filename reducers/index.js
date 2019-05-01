import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';

//
// Initial State...
//

const initialState = {
    countdown: 30,
    personType: undefined,
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "setCountdown": 
            return { ...state, countdown: action.value };
            
        case "setPersonType": 
            return { ...state, personType: action.value };

        default: 
            return state;
    }
};

//
// Store...
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

//
// Action Creators...
//

const setCountdown = (countdown) => {
    return {
        type: "setCountdown",
        value: countdown,
    };
}
const setPersonType = (personType) => {
    return {
        type: "setPersonType",
        value: personType,
    };
}

//const watchPersonData = () => {
    //return function(dispatch) {
        //firebase.database().ref("person").on("value", function(snapshot) {
            //var personData = snapshot.val();
            //dispatch(setPersonData(personData));
        //}, function(error) { });
    //};
//}

export { setCountdown, setPersonType };
