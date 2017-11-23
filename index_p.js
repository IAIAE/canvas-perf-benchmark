(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.canvasPerf = factory());
}(this, (function () { 'use strict';

function Circle(r, pen) {
    this.r = r;
    this.pen = pen;
    this.twopi = 2 * Math.PI;
    this.draw = function (x, y) {
        var pen = this.pen;
        pen.save();
        var grd = pen.createLinearGradient(0, 0, 2 * x, 2 * y);
        grd.addColorStop(0, 'red');
        grd.addColorStop(1, 'blue');
        pen.fillStyle = grd;
        pen.arc(x, y, this.r, 0, this.twopi);
        pen.clip();
        pen.fillRect(0, 0, 400, 400);
        pen.restore();
    };
}
var _math = Math;
function test() {
    var canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    var pen = canvas.getContext('2d');
    var grd = pen.createLinearGradient();
    var shareCircle = new Circle(10, pen);
    var task = function task(num) {
        var start = +new Date();
        pen.clearRect(0, 0, 400, 400);
        for (var i = 0; i < num; i++) {
            shareCircle.draw(_math.random() * 400, _math.random() * 400);
        }
        return new Date() - start;
    };
    var base = 100;
    var lastCost = 0;
    var sixTime = [];
    var tryTimes = 0;
    return new Promise(function (done, notDone) {
        function loop() {
            tryTimes++;
            var time = task(base);
            if (time != 6) {
                base = base * 6 / time >>> 0;
                if (tryTimes > 9) {
                    return done(base);
                }
                lastCost = time;
                setTimeout(loop, 10);
            } else {
                if (lastCost == time) {
                    done(base);
                } else if (sixTime.length > 1) {
                    done((sixTime[0] + sixTime[1] + base) / 3 >>> 0);
                } else {
                    sixTime.push(base);
                    lastCost = base;
                    setTimeout(loop, 10);
                }
            }
        }
        loop();
    });
}

var index = {
    test: test
};

return index;

})));
