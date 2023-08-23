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
    //console.log('current fiend',friend, friend.id);
    this.friend = friend;

    const photos = await this.getFriendPhotos(friend.id).catch (e => {
      console.log('Error with photo');
    });
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
        //apiId: 51730228
        apiId: 51734085
      });

      VK.Auth.login(data => {
        if (data.session) {

          this.userID = data.session.user.id
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
    //console.log('Call API', params);
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
    }

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
  },
  async logout() {

    return new Promise((resolve, reject) => {
      
      VK.Auth.revokeGrants(data => {
          resolve(data)
      })

    })
    //VK.Auth.logout();


  },
  async getUsers(ids = this.friend.id) {
    console.log('Get Users with IDS:', ids);
    const params = {
      fields: ['photo_50', 'photo_100'],
      user_ids: ids,
      name_case: 'nom'
    };
    return this.callAPI('users.get', params);
  },
};
