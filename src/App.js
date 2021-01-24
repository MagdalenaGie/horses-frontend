import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import HorsesList from './containers/Lists/HorsesList/HorsesList';
import LessonsList from './containers/Lists/LessonsList/LessonsList';
import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Login';
import MyAccount from './components/MyAccount/MyAccount';
import LessonDetail from './components/LessonDetail/LessonDetail';
import MainPage from './components/MainPage/MainPage';
import HorsePanel from './containers/Panels/HorsePanel/HorsePanel';
import Logout from './components/Logout/Logout';
import StaffPanel from './components/AdminTabs/StaffPanel/StaffPanel';
import ManageLessons from './components/AdminTabs/ManageLessons/ManageLessons';
import ManageStabbles from './components/AdminTabs/ManageStabbles/ManageStabbles';


class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/horses" exact component={HorsesList}/>
          <Route path="/login" component={Login}/>
          <Route path="/myaccount" component={MyAccount}/>
          <Route path="/lessons" exact component={LessonsList}/>
          <Route path="/lessons/:id" component={LessonDetail}/>
          <Route path="/horses/:id" component={HorsePanel}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/managestaff" component={StaffPanel}/>
          <Route path="/managelessons" component={ManageLessons}/>
          <Route path="/managestabbles" component={ManageStabbles}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
