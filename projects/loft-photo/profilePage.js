import model from './model';
import mainPage from './mainPage';
import pages from './pages';

export default {
  async setUser(user) {

     document.querySelector('.component-user-info-photo').style.backgroundImage = `url('${user['photo_50']}')`;
     document.querySelector('.component-user-info-name').innerText = `${user.first_name} ${user.last_name}`;

    //  user.photos.array.forEach(foto => {

    //   const img = document.createElement('div');
    //   img.classList.add('component-user-photo');
    //   document.querySelector('.component-user-photos').appendChild(img);

    //  });

  },
  async handleEvents() {

    document.querySelector('.page-profile-back').addEventListener('click', e => {

      pages.openPage('main');

    })

    


  }
};
