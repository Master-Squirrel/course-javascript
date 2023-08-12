const pagesMap = {
    login: '.page-login',
    main: '.page-main',
    profile: '.page-profile',

    openPage(name) {

        this.hideAllPages();

        console.log(name);

        const div = document.querySelector(`.page-${name}`);        
        div.classList.remove('hidden');
        
    },

    hideAllPages() {
        document.querySelector('.page-login').classList.add('hidden');
        document.querySelector('.page-main').classList.add('hidden');
        document.querySelector('.page-profile').classList.add('hidden');
    }
  };
  
  

  export default {
    openPage(name) {
    },
  };

  