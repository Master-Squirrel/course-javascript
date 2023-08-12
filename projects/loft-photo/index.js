import photosDB from './photos.json';
import friendsDB from './friends.json';

import pages from './pages';

import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {

    const pageToOpen = getRandomElement(pageNames);
    console.log(pages)
    pages.openPage(pageToOpen)
   

});

function getRandomElement(array) {
        
    if (!array.length) {
        return null;
    }
    
    const index = Math.round((Math.random() * (array.length -1)));

    return array[index];
}


export default {

    
    getNextPhoto () {

        let randomFrend = this.getRandomElement(friendsDB);        
        let photos = photosDB[randomFrend.id]
        let randomPhoto = this.getRandomElement(photos)
        
    
        return requiredFriend = {
            randomFrend, url : photos.url            
        }
        
    }

    
}



