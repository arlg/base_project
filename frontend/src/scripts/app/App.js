class Website{

    constructor(){


    	this.init();
    }

    init(){
        console.log('Website::init');
    }

    _initEvents(){

    }

}


// Entry point
document.addEventListener('DOMContentLoaded', function(){

    const website = new Website();

});
