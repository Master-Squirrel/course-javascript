import model from './model';
import mainPage from './mainPage';
import pages from './pages';

export default {
  async setUser(user) {

    this.user = user;

    document.querySelector('.component-user-info-photo').style.backgroundImage = `url('${user['photo_50']}')`;
    document.querySelector('.component-user-info-name').innerText = `${user.first_name} ${user.last_name}`;

    const photos = await model.getFriendPhotos(user.id);

    document.querySelector('.component-user-photos').innerHTML = '';

    photos.items.forEach(async foto => {
            
      const img = document.createElement('div');
      img.classList.add('component-user-photo');
      img.style.backgroundImage = `url('${foto.sizes[2].url}')`;
      img.dataset.id = foto.id;

      // img.addEventListener('click', async e => {     
        
      //   mainPage.setFriendAndPhoto(user, user.id, foto.sizes[2].url);
      //   pages.openPage('main');

      // })

      document.querySelector('.component-user-photos').appendChild(img);

    });

  },
  async handleEvents() {

    document.querySelector('.page-profile-back').addEventListener('click', e => {

      pages.openPage('main');

    })

    document.querySelector('.page-profile-exit').addEventListener('click', async e => {
      await model.logout();
      pages.openPage('login');
    })

    document.querySelector('.component-user-photos').addEventListener('click', async e => {
      if (e.target.classList.contains('component-user-photo')) {

        const photoID = e.target.dataset.id;
        const friendPhotos = await model.getPhotos(this.user.id);
        const photoStats = await model.photoStats(photoID);

        const photo = friendPhotos.items.find(foto => foto.id == photoID);
        const size = model.findSize(photo);

        mainPage.setFriendAndPhoto(this.user, parseInt(photoID), size.url, photoStats);
        pages.openPage('main');

      }
    })

  }
};
