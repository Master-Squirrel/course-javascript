// eslint-disable-next-line no-unused-vars
//import photosDB from './photos.json';
// eslint-disable-next-line no-unused-vars
//import friendsDB from './friends.json';

//import { rejects } from "assert";
//import { resolve } from "path";

//VKid 51730228


const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;




export default {

  photoCache: {},

  getRandomElement(array) {

    if (!array.length) {
      return null;
    }

    const index = Math.round((Math.random() * (array.length - 1)));

    return array[index];
  },

 async getNextPhoto() {

    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo);


    return { friend, id: photo.id, url: size.url };

},

  async init() {

    this.photoCache = {};
    this.friends = await this.getFriends();

    return this.friends;
    //return this.callAPI('users.get', { name_case: 'gen' });
  },

  login() {

    return new Promise((resolve, reject) => {


      VK.init({
        apiId: 51730228
      });

      VK.Auth.login(data => {
        if (data.session) {

          resolve(data);
        }
        else {
          console.log(data);
          reject(data);
          
        }
      }, PERM_FRIENDS | PERM_PHOTOS);
    });
  },

  callAPI(method, params) {
    console.log('Call API', params);
    params.v = '5.131';
    return new Promise((resolve, reject) => {
      VK.api(method, params, (data) => {
        if (data.error) {
          
          reject(data.error);
        } else {

          resolve(data.response);
        }
      })
    })
  },

  getFriends() {
    const params = {
      fields: ['photo_50', 'photo_100'],
      //count: 2
    };
    
    return this.callAPI('friends.get', params);
  },
 

  async getFriendPhotos(id) {
    let photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    photos = this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },
  getPhotos(owner) {
    const params = {
      owner_id: owner,
    };

    return this.callAPI('photos.getAll', params);
  },

  findSize(photo) {
    const size = photo.sizes.find((size) => size.width >= 360);

    if (!size) {
      return photo.sizes.reduce((biggest, current) => {
        if (current.width > biggest.width) {
          return current;
        }
        return biggest;
      }, photo.sizes[0]);
    }

    return size;
  }
};
