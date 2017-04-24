class Website{

    constructor(){

    }

    init(){
        console.log('Website::init')
    }

    _initEvents(){

    }

}


// Entry point
document.addEventListener('DOMContentLoaded', function(){

    const website = new Website();
    website.init();

});
