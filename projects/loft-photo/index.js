import photosDB from './photos.json';
import friendsDB from './friends.json';

export default {

    getRandomElement(array) {

        if (!array.length) {
            return null;
        }
        
        const index = Math.round((Math.random() * (array.length -1)));
  
        return array[index];
    },
    
    getNextPhoto () {

        let randomFrend = this.getRandomElement(friendsDB);        
        let photos = photosDB[randomFrend.id]
        let randomPhoto = this.getRandomElement(photos)
        
    
        return requiredFriend = {
            randomFrend, url : photos.url            
        }
        
    }
}


