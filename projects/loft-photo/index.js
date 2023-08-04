function getRandomElement(array) {
        
    while (1 == 1) {
        let num = parseInt(Math.random() * 10);
        
        if (num >= 0 && num < array.length) {
            index = num;
            break
        }
    }

    return index
}


function getNextPhoto() {
    const photosDB = require('./photos.json');
    const friendsDB = require('./friends.json');
    let randomFrend = getRandomElement(friendsDB);
    
    let photos = photosDB[randomFrend]
    let randomPhoto = getRandomElement(photos)
    

    const requiredFriend = {
        url : photos[randomPhoto].url,
        friend: friendsDB[randomFrend].firstName
    }
    return requiredFriend
}