//import pages from './pages';
import model from './model';
import profilePage from './profilePage';
import pages from './pages';
//import commentsTemplate from './commentsTemplate.html.hbs';

const link = document.querySelector('.component-header-profile-link');



export default {
  async getNextPhoto() {
    const { friend, id, url } = await model.getNextPhoto();
    const photoStats = await model.photoStats(id);
    //this.photoID = id;

    this.setFriendAndPhoto(friend, id, url, photoStats);

  },

  async setFriendAndPhoto(friend, id, url, photoStats) {

    const stats = "";

    const photoComp = document.querySelector('.component-photo');
    const headerPhotoComp = document.querySelector('.component-header-photo');
    const headerNameComp = document.querySelector('.component-header-name');

    this.friend = friend;
    this.photoid = id;

    headerPhotoComp.style.backgroundImage = `url('${friend.photo_50}')`;
    headerNameComp.innerText = `${friend.first_name ?? ''} ${friend.last_name ?? ''}`;
    photoComp.style.backgroundImage = `url('${url}')`;

    this.setLikes(photoStats);
    this.loadComments(this.photoid);
    this.setComments(photoStats.comments);
  },

  async loadComments(photo) {

    const allComments = await model.getComments(photo);

    const commentsContainer = document.querySelector('.component-comments-container-list');

    commentsContainer.innerHTML = '';

    for (const comment of allComments) {

      commentsContainer.innerHTML +=

        `<div class="component-comment">
      <div class="component-comment-photo" style="background-image: url('${comment.user.photo_50}')"></div>
      <div class="component-comment-content">
        <div class="component-comment-name">${comment.user.first_name}</div>
        <div class="component-comment-text">${comment.text}</div>
      </div>
    </div>`;

    }

    this.setComments(allComments.length);

  },

  setLikes(photoStats) {
    console.log('Setlikes:', photoStats);
    const likeContainer = document.querySelector('.component-footer-container-social-likes');
    likeContainer.innerText = photoStats.likes;

    if (photoStats.liked) {
      likeContainer.classList.add('liked');
    } else {
      likeContainer.classList.remove('liked');
    }

  },

  setComments(total) {

    const commentsContainer = document.querySelector('.component-footer-container-social-comments');
    commentsContainer.innerText = total;

  },



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

    document.querySelector('.component-footer-container-social-likes').addEventListener('click', async e => {
      const likes = await model.like(this.photoid);

      this.setLikes(likes);
    })

    document.querySelector('.component-footer-container-social-comments').addEventListener('click', async e => {

      document.querySelector('.component-comments').classList.remove('hidden');
      this.openCommentBlock = true;


    })

    document.querySelector('.component-comments-container-form-send').addEventListener('click', async e => {

      const comment = document.querySelector('.component-comments-container-form-input');

      if (comment.value.trim()) {
        await model.postComment(this.photoid, comment.value.trim());
        await this.loadComments(this.photoid);
        comment.value = '';
      }

    })

    document.querySelector('.page-main').addEventListener('click', e => {

      console.log(e.target, e.target.classList)

      const container = e.target.closest('.component-comments-container');

      console.log(container, this.openCommentBlock);

      if (container === null && this.openCommentBlock === true && !e.target.classList.contains('component-footer-container-social-comments')) {
        document.querySelector('.component-comments').classList.add('hidden');
        this.openCommentBlock = false;
      }
    })
  },
};