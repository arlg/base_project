'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Website = function () {
    function Website() {
        _classCallCheck(this, Website);

        this.init();
    }

    _createClass(Website, [{
        key: 'init',
        value: function init() {
            console.log('Website::init');
        }
    }, {
        key: '_initEvents',
        value: function _initEvents() {}
    }]);

    return Website;
}();

// Entry point


document.addEventListener('DOMContentLoaded', function () {

    var website = new Website();
});
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC5qcyIsIkNvbmZpZy5qcyJdLCJuYW1lcyI6WyJXZWJzaXRlIiwiaW5pdCIsImNvbnNvbGUiLCJsb2ciLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ3ZWJzaXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTUE7QUFFRix1QkFBYTtBQUFBOztBQUdaLGFBQUtDLElBQUw7QUFDQTs7OzsrQkFFSztBQUNGQyxvQkFBUUMsR0FBUixDQUFZLGVBQVo7QUFDSDs7O3NDQUVZLENBRVo7Ozs7OztBQUtMOzs7QUFDQUMsU0FBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVU7O0FBRXBELFFBQU1DLFVBQVUsSUFBSU4sT0FBSixFQUFoQjtBQUVILENBSkQ7QUNwQkEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFdlYnNpdGV7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuXG5cbiAgICBcdHRoaXMuaW5pdCgpO1xuICAgIH1cblxuICAgIGluaXQoKXtcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYnNpdGU6OmluaXQnKTtcbiAgICB9XG5cbiAgICBfaW5pdEV2ZW50cygpe1xuXG4gICAgfVxuXG59XG5cblxuLy8gRW50cnkgcG9pbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpe1xuXG4gICAgY29uc3Qgd2Vic2l0ZSA9IG5ldyBXZWJzaXRlKCk7XG5cbn0pO1xuIiwiIl19
