import pages from './pages';
import model from './model';

const place = document.querySelector('.component-photo');
const link = document.querySelector('.component-header-profile-link');

export default {
    async getNextPhoto() {
        const { friend, id, url } = await model.getNextPhoto();
        this.setFriendAndPhoto(friend, id, url);
    },

    setFriendAndPhoto(friend, id, url) {
        const img = new Image(360);
        img.src = url
        this.img = img
        place.appendChild(img)

        console.log(friend);
        link.textContent = `${friend.first_name} ${friend.last_name}`;
        link.href = `https://vk.com/id${friend.id}`;
        
    },

    removePhoto () {
        place.removeChild(this.img);
    },

    handleEvents() {
        document.addEventListener('touchstart', (e) => {
            if (e.target.parentElement.classList.contains('component-photo')) {                    
                this.removePhoto();
                this.getNextPhoto();
             }
        })

        document.addEventListener('mouseup', (e) => {
            
             if (e.target.parentElement.classList.contains('component-photo')) {                    
                this.removePhoto();
                this.getNextPhoto();
             }
        })
    },
};