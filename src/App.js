import './App.css';
import { useReducer } from 'react';

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}


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
            setCookie('modal-dismissed', 'true')
            return {...state, showModalDialog: false}
        }
        return state 
    }, {}, () => {
        return { 
            showModalDialog: getCookie('modal-dismissed') === undefined
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
