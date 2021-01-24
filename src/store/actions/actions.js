import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';

export const authSuccess = (login, password, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        login: login,
        password: password,
        id: id
    }
}

export const authFailed = () => {
    return {
        type: actionTypes.AUTH_FAILED
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkPassword = (login, password) => {
    return dispatch => {
        const route = '/usr/' + login;
        axios.get(route)
        .then(res => {
            if(res.data.length === 0){
                alert("Logowanie nie powiodło się! Nie ma takiego użytownika");
                dispatch(authFailed());
            }else if(res.data.length === 1){
                const pass = res.data[0].pass;
                const id = res.data[0].id_wlasciciel;
                if(pass === password){
                    dispatch(authSuccess(login, password, id));
                }else{
                    alert("Logowanie nie powiodło się! Błędne hasło, spróbuj ponownie");
                    dispatch(authFailed());
                }
            }
        })
        .catch(err => {
            alert("Logowanie nie powiodło się! Nie udało się połączyć z bazą danych, spróbuj ponownie późnej");
            dispatch(authFailed);
        })
    }
}

export const getUsrHorses = (usrHorses) => {
    return{
        type: actionTypes.GET_USR_HORSES,
        horses: usrHorses
    }
}

export const fetchUsrHorses = (idUsr) => {
    return dispatch => {
        const route = '/wlasciciele/' + idUsr;
        axios.get(route)
            .then(res => {
                const fetchedHorses = [];
                for(let iter=0; iter< res.data.length; iter++){
                    fetchedHorses.push({
                        ...res.data[iter]
                    });
                }
                dispatch(getUsrHorses(fetchedHorses));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getUsrLessons = (usrLessons) => {
    return{
        type: actionTypes.GET_USR_HORSES,
        lessons: usrLessons
    }
}

export const fetchLessonDetails = (idLesson) => {
    return dispatch => {
        const route = '/lekcje/' + idLesson;
        axios.get(route)
        .then(res => {
            const fetchedDetails = res.data;
            dispatch(getLessonDetails(fetchedDetails));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getLessonDetails = (lessonDetails) => {
    return{
        type: actionTypes.GET_LESSON_DETAILS,
        details: lessonDetails
    }
}

export const fetchWorkers = () => {
    return dispatch => {
        const route = '/stajenni';
        axios.get(route)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getWorkers(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getWorkers = (workers) => {
    return{
        type: actionTypes.GET_WORKERS,
        workers: workers
    }
}

export const fetchInstructors = () => {
    return dispatch => {
        const route = '/instruktorzy';
        axios.get(route)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getInstructors(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getInstructors = (instructors) => {
    return{
        type: actionTypes.GET_INSTRUCTORS,
        instructors: instructors
    }
}

export const fetchVets = () => {
    return dispatch => {
        const route = '/weterynarze';
        axios.get(route)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getVets(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getVets = (vets) => {
    return{
        type: actionTypes.GET_VETS,
        vets: vets
    }
}

export const fetchFarriers = () => {
    return dispatch => {
        const route = '/kowale';
        axios.get(route)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getFarriers(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getFarriers = (farriers) => {
    return{
        type: actionTypes.GET_FARRIERS,
        farriers: farriers
    }
}

export const fetchLessons = () => {
    return dispatch => {
        const route = '/lekcje';
        axios.get(route)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getLessons(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getLessons = (lessons) => {
    return{
        type: actionTypes.GET_LESSONS,
        lessons: lessons
    }
}

export const fetchStabbles = () => {
    return dispatch => {
        const route = '/stajnie';
        axios.get(route)
        .then(res => {
            const fetchedData = res.data;
            dispatch(getStabbles(fetchedData));
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getStabbles = (stabbles) => {
    return{
        type: actionTypes.GET_STABBLES,
        stabbles: stabbles
    }
}


// //PUT
// export const changeStabbleWorker = (update) => {
//     return dispatch => {
//         axios.put('/lekcje/' + update.id_lekcja, update)
//         .then(response => {
//             if(response.data.results){
//                 alert("Lekcja została zaktualizowana!");
//             }else{
//                 alert("Niestety, coś poszło nie tak - prawdopodobnie w wybranym terminie już odbywają się jakieś zajęcia")
//             }
            
//         })
//         .catch(error => {
//             alert("Niestety, nie udało się zaktualizować lekcji! Sprawdź poprawność danych lub spróbuj ponownie później")
//             console.log(error);
//         })
//     }
// }

// export const updateStabble = (resp) => {
//     return{
//         type: actionTypes.EDIT_STABBLE,
//         update: resp
//     }
// }


///POST
export const postWorker = (workerData) => {
    return dispatch => {
        const route = '/stajenni';
        axios.post(route, workerData)
        .then(res => {
            dispatch(addWorker(res.data.result));
        })
        .catch(err => {
            console.log(err);
            alert("Niestety nie udało się dodać stajennego do bazy, sprawdź poprawność danych i spróbuj ponownie później!");
        })
    }
}

export const addWorker = (resp) => {
    return{
        type: actionTypes.ADD_WORKERS,
        newWorker: resp
    }
}

export const postInstructor = (instData) => {
    return dispatch => {
        const route = '/instruktorzy';
        axios.post(route, instData)
        .then(res => {
            dispatch(addInstructor(res.data.result));
        })
        .catch(err => {
            console.log(err);
            alert("Niestety nie udało się dodać instruktora do bazy, sprawdź poprawność danych i spróbuj ponownie później!");
        })
    }
}

export const addInstructor = (instructor) => {
    return{
        type: actionTypes.ADD_INSTRUCTORS,
        newInst: instructor
    }
}

export const postVet = (vetData) => {
    return dispatch => {
        const route = '/weterynarze';
        axios.post(route, vetData)
        .then(res => {
            dispatch(addVet(res.data.result));
        })
        .catch(err => {
            console.log(err);
            alert("Niestety nie udało się dodać weterynarza do bazy, sprawdź poprawność danych i spróbuj ponownie później!");
        })
    }
}

export const addVet = (vet) => {
    return{
        type: actionTypes.ADD_VETS,
        newVet: vet
    }
}

export const postFarrier = (farrData) => {
    return dispatch => {
        const route = '/kowale';
        axios.post(route, farrData)
        .then(res => {
            dispatch(addFarrier(res.data.result));
        })
        .catch(err => {
            console.log(err);
            alert("Niestety nie udało się dodać kowala do bazy, sprawdź poprawność danych i spróbuj ponownie później!");
        })
    }
}

export const addFarrier = (farrier) => {
    return{
        type: actionTypes.ADD_FARRIERS,
        newFar: farrier
    }
}

export const postPair = (pairData) => {
    return dispatch => {
        axios.post('/pary', pairData)
        .then(response => {
            dispatch(fetchLessonDetails(response.data.result.id_lekcja))

        })
        .catch(error => {
            alert("Niestety, nie możesz zapisać się na te zajęcia. Ty, twój koń lub oboje już w niej uczestniczycie albo limit osób został wyczerpany");
            console.log(error.message);
        }) 
    }
}
