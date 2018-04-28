import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FirstPage from './FirstPage';
import SettingUser from "./SettingUser";

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={FirstPage}/>
            <Route exact path='/lk' component={SettingUser}/>
        </Switch>
    </main>
)
export default Main;