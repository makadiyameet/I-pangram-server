import { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPost from './components/screens/SubscribedUserPost';
import Newpassword from './components/screens/Newpassword'
import {reducer, initialSate} from './reducers/userReducer'
import Reset from './components/screens/Reset';



export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    } else {
      if(! history.location.pathname.startsWith('/reset'))
        history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path='/'><Home /></Route>
      <Route path='/signin'><Signin /></Route>
      <Route path='/signup'><Signup /></Route>
      <Route exact path='/profile'><Profile /></Route>
      <Route path='/create'><CreatePost /></Route>
      <Route path='/profile/:userid'><UserProfile /></Route>
      <Route path='/myfollowingspost'><SubscribedUserPost /></Route>
      <Route exact path='/reset'><Reset /></Route>
      <Route  path='/reset/:token'><Newpassword /></Route>
    </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer, initialSate)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
