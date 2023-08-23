import model from './model';
import mainPage from './mainPage';
import pages from './pages';

export default {
  async setUser(user) {

   
     document.querySelector('.component-user-info-photo').style.backgroundImage = `url('${user['photo_50']}')`;
     document.querySelector('.component-user-info-name').innerText = `${user.first_name} ${user.last_name}`;

    const photos = await model.getFriendPhotos(user.id);
    

    document.querySelector('.component-user-photos').innerHTML = '';

    photos.items.forEach(foto => {

      const img = document.createElement('div');
      img.classList.add('component-user-photo');
      img.style.backgroundImage = `url('${foto.sizes[2].url}')`;
      
      img.addEventListener('click', e => {

        mainPage.setFriendAndPhoto(user, user.id, foto.sizes[2].url);
        pages.openPage('main');

      })

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


  }
};
