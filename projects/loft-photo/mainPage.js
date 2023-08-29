//import pages from './pages';
import model from './model';
import profilePage from './profilePage';
import pages from './pages';

const link = document.querySelector('.component-header-profile-link');



export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    this.setFriendAndPhoto(friend, id, url);

  },

  async setFriendAndPhoto(friend, id, url) {

    const stats = "";

    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');

    this.friend = friend;

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url('${url}')`;
  },

  async loadComments(photo) { },

  setLikes(total, liked) { },

  setComments(total) { },


  async setAvatar() {

    const [user] = await model.getUsers(model.userID);

    document.querySelector('.component-footer-photo').style.backgroundImage = `url('${model.me.photo_50}')`;
    document.querySelector('.component-footer-photo').addEventListener('click', async e => {

      profilePage.setUser(model.me);
      pages.openPage('profile');

    });

  },

  handleEvents() {

    let startFrom;


    document.querySelector('.component-photo').addEventListener('touchstart', (e) => {
      e.preventDefault();
      startFrom = { y: e.changedTouches[0].pageY };
    });

    document.querySelector('.component-photo').addEventListener('touchend', async (e) => {

      const direction = e.changedTouches[0].pageY - startFrom.y;

      if (direction < 0) {

        await this.getNextPhoto();
      }

    });

    document.querySelector('.component-header-profile-link').addEventListener('click', async e => {

      profilePage.setUser(this.friend);
      pages.openPage('profile');
    });

  },
};