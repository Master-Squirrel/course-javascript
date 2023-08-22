import pages from './pages';
import profilePage from './profilePage';
import mainPage from './mainPage';
import loginPage from './loginPage';

import('./styles.css');

const pageNames = ['login', 'main', 'profile'];



pages.openPage('login');
loginPage.handleEvents();
mainPage.handleEvents();
profilePage.handleEvents(); 

export default {

}



