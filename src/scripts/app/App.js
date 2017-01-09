var W = W || {},
    EE;

W.App = (function(){

    function init(){

        build();

    }

    function build(){

    }

    return {
        init : init
    };

})();



// Entry point
document.addEventListener('DOMContentLoaded', function(){

    W.App.init();

});