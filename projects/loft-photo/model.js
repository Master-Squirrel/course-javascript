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

    const photos = await this.getFriendPhotos(friend.id).catch(e => {
      console.log('Error with photo');
    });
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo);
    
 

    return { friend, id: photo.id, url: size.url };

  },
  async init() {

    this.photoCache = {};
    this.friends = await this.getFriends();

    [this.me] = await this.getUsers();

    //return this.friends;
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

          this.userID = data.session.user.id;
          this.token = data.session.sid;
          resolve(data);
        }
        else {
          
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

    return new Promise( (resolve) => VK.Auth.revokeGrants(resolve));

  },
  async getUsers(ids) {
    
    const params = {
      fields: ['photo_50', 'photo_100'],      
    };

    if (ids) {
      params.user_ids = ids;
    }

    return this.callAPI('users.get', params);
  },

  async callServer (method, queryParams, body) {
    queryParams = {
      ...queryParams,
      method,
    };
    const query = Object.entries(queryParams)
      .reduce((all, [name, value]) => {
        all.push(`${name}=${encodeURIComponent(value)}`);
        return all; 
      }, [])
      .join('&');
      
    const params = {
      headers: {
        vk_token: this.token,
      },
    };

    if (body) {
      params.method = 'POST';
      params.body = JSON.stringify(body);
    }
    
    const response = await fetch(`/loft-photo/api/?${query}`, params);
    //console.log('Call Server', method, queryParams, response);
    return response.json();
  },
  
  async like(photoID) {    
    return await this.callServer('like', {photo: photoID});
    
   },

  async photoStats(photoID) { 
    //console.log('photoStats requested', photoID)
    return await this.callServer('photoStats', {photo: photoID});
    
    
  },

  async getComments(photoID) { 

    return await this.callServer('getComments', {photo: photoID});
    
  },

  async postComment(photoID, textComment) { 
    return await this.callServer('postComment', {photo: photoID}, {text: textComment});
  },
};
