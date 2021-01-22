import * as actionTypes from '../actions/actionTypes';

const initialState = {
    login: '',
    password: '',
    isAuth: false,
    isAdmin: false,
    idUser: '', 
    usrHorses: [],
    usrLessons: [],
    lessonDetails:[],
    vets: [],
    workers: [],
    instructors: [],
    farriers: []
} 

const updateObject = (oldObject, updatedProperties) => {
    return{
        ...oldObject, 
        ...updatedProperties
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_SUCCESS:
            const admin = action.login === "admin";
            return updateObject(state, {
                isAdmin: admin,
                isAuth: true,
                login: action.login,
                password: action.password,
                idUser: action.id
            });

        case actionTypes.AUTH_FAILED:
            return updateObject(state, {isAuth: false});

        case actionTypes.LOGOUT:
            alert("Właśnie się wylogowałeś, mamy nadzieję że niedługo wrócisz!");
            return updateObject(state, {
                login: '',
                password: '',
                isAdmin: false,
                isAuth: false,
                idUser: ''});

        case actionTypes.GET_USR_HORSES:
            return updateObject(state, {
                usrHorses: [...action.horses]
            });

        case actionTypes.GET_LESSON_DETAILS:
            return updateObject(state, {
                lessonDetails: [...action.details]
            })

        case actionTypes.GET_INSTRUCTORS:
            return updateObject(state, {
                instructors: [...action.instructors]
            })

        case actionTypes.GET_VETS:
            return updateObject(state, {
                vets: [...action.vets]
            })

        case actionTypes.GET_WORKERS:
            return updateObject(state, {
                workers: [...action.workers]
            })

        case actionTypes.GET_FARRIERS:
            return updateObject(state, {
                farriers: [...action.farriers]
            })

        case actionTypes.ADD_WORKERS:
            alert("Dodano stajennego ", action.newWorker.imie, " ", action.newWorker.nazwisko, " do bazy!");
            let workers = [...state.workers, action.newWorker];
            return updateObject(state, {
                workers: [...workers]
            })

        case actionTypes.ADD_VETS:
            alert("Dodano weterynarza ", action.newVet.imie, " ", action.newVet.nazwisko, " do bazy!");
            let vets = [...state.vets, action.newVet];
            return updateObject(state, {
                vets: [...vets]
            })

        case actionTypes.ADD_INSTRUCTORS:
            alert("Dodano instruktora ", action.newInst.imie, " ", action.newInst.nazwisko, " do bazy!");
            let instructors = [...state.instructors, action.newInst];
            return updateObject(state, {
                instructors: [...instructors]
            })
        
        case actionTypes.ADD_FARRIERS:
            alert("Dodano kowala ", action.newFar.imie, " ", action.newFar.nazwisko, " do bazy!");
            let farriers = [...state.farriers, action.newFar];
            return updateObject(state, {
                farriers: [...farriers]
            })

        case actionTypes.ADD_PARTICIPANT:
            alert("Dodano uczestnika do zajęć!");
            let details = [...state.lessonDetails, action.newPair];
            return updateObject(state, {
                lessonDetails: [...details]
            })

        default:
            return state;
    }
};

export default reducer;