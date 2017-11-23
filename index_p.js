(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.canvasPerf = factory());
}(this, (function () { 'use strict';

function Circle(r, pen) {
    this.r = r;
    this.pen = pen;
    var grd = pen.createLinearGradient(0, 0, 400, 400);
    grd.addColorStop(0, 'red');
    grd.addColorStop(1, 'blue');
    this.pen.fillStyle = grd;
    this.twopi = 2 * Math.PI;
    this.draw = function (x, y) {
        var pen = this.pen;
        pen.beginPath();
        pen.arc(x, y, this.r, 0, this.twopi);
        pen.closePath();
        pen.fill();
    };
}
var _math = Math;
function test() {
    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    var pen = canvas.getContext('2d');
    var shareCircle = new Circle(10, pen);
    var task = function task(num) {
        var start = +new Date();
        pen.clearRect(0, 0, 400, 400);
        for (var i = 0; i < num; i++) {
            shareCircle.draw(_math.random() * 400, _math.random() * 400);
        }
        return new Date() - start;
    };
    var base = 300;
    var tryTimes = 0;
    var tryArr = [];
    return new Promise(function (done, notDone) {
        function loop() {
            tryTimes++;
            tryArr.push(base);
            if (tryTimes > 9) {
                return done(tryArr);
            }
            var time = task(base);
            time = time || 1;
            if (time != 6) {
                base = base * 6 / time >>> 0;
            }
            setTimeout(loop, 10);
        }
        loop();
    });
}

var index = {
    test: test
};

return index;

})));
