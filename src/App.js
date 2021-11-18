import './App.css';
import { useReducer } from 'react';
function Modal({onClose}) {
    return <div className="modal-wrapper">
        <div className="modal-title">
            Modal dialog <span className="modal-close" onClick={onClose}>close</span>
        </div>
        <div className="modal-message">
            Modal lorem ipsum
        </div>
    </div>
}

function App() {
    const [state, updateState] = useReducer((state, act) => {
        if (act.type === 'CLOSE_DIALOG') {
            localStorage.setItem('modal-dismissed', 'true')
            return {...state, showModalDialog: false}
        }
        return state 
    }, {}, () => {
        return { 
            showModalDialog: localStorage.getItem('modal-dismissed') !== "true" 
        }
    })

    const onClose = () => {
        updateState({type: 'CLOSE_DIALOG'})
    }

    return <div>
        {state.showModalDialog ? <Modal onClose={onClose}/> : <p>no modal here</p>}
    </div>
}

export default App;
