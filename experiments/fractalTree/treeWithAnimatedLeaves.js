/* Tree with Animated Leaves - juulio.github.io
* Julio Del Valle - Costa Rica */
var treeWithAnimatedLeaves = treeWithAnimatedLeaves || {};

(function (context) {

    // Create the Canvas Element
    var canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;

    document.body.appendChild(canvas);
    document.body.style.margin = 0;

    // Apply basic styles to the Canvas Element
    canvas.style.border = 'solid 1px red';
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';

    var context = canvas.getContext("2d"),
        button = document.getElementsByClassName("fractalTreeButton");

    /***************************************
     * Utiliy Functions */
    function cos (angle) {
    	return Math.cos(deg_to_rad(angle));
    }

    function sin (angle) {
        return Math.sin(deg_to_rad(angle));
    }

    function deg_to_rad(angle){
        return angle*(Math.PI/180.0);
    }

    function random(min, max){
        return min + Math.floor(Math.random()*(max+1-min));
    }

    /**************************************
    * Draw a Line from (x1,y1) to (x2,y1) */
    function drawLine(x1, y1, x2, y2, thickness){
    	// if(thickness > 6)
    	// 	context.strokeStyle = 'rgb(139,126,102)'; //Brown
    	// else
    	// 	context.strokeStyle = 'rgb(34,139,34)'; //Green

    	context.lineWidth = thickness * 1.5;
    	context.beginPath();

    	context.moveTo(x1,y1);
    	context.lineTo(x2, y2);

    	context.closePath();
    	context.stroke();
    }

    /**************************************
    * Draw a Dot on (x,y) with Radius r */
    function drawDot(x,y,r,lineWidth) {
       context.beginPath();
       context.arc(x, y, r, 0, 2*Math.PI, false);
       context.lineWidth = lineWidth;
       context.stroke();
    }

    var movingLeaf = function(x, y){
        var posX = x + random(0,7),
            posY = y + random(0,4);

        drawDot(posX, posY, 5, 2);
    };

    /**************************************
    * Function that limits the frame rate */
    var limitLoop = function (fn, fps) {

        // Use var then = Date.now(); if you
        // don't care about targetting < IE9
        var then = new Date().getTime();

        // custom fps, otherwise fallback to 60
        fps = fps || 60;
        var interval = 1000 / fps;

        return (function loop(time){
            requestAnimationFrame(loop);

            // again, Date.now() if it's available
            var now = new Date().getTime();
            var delta = now - then;

            if (delta > interval) {
                // Update time
                // now - (delta % interval) is an improvement over just
                // using then = now, which can end up lowering overall fps
                then = now - (delta % interval);

                // call the fn
                fn();
            }
        }(0));
    };

    /**************************************
    * Function that grows a Fractal Tree */
    var growTree = function(x1, y1, angle, treeDepth, lineLength){
        var x2 = x1 + (cos(angle) * treeDepth * lineLength),
            y2 = y1 + (sin(angle) * treeDepth * lineLength),
            leaf;

        if(treeDepth !=0) {
            treeDepth--;
            context.strokeStyle = 'rgb(0,0,0)';

            drawLine(x1, y1, x2, y2, 1);

            growTree(x2, y2, angle - random(20,26), treeDepth, lineLength);
            growTree(x2, y2, angle + random(30,58), treeDepth, lineLength);
        }
        else {
            context.strokeStyle = 'rgb(' + random(0,255) +',' + random(0,255) +'    ,34)';
            // drawDot(x2+1, y2, 8, 2);
            leaf = new movingLeaf(x2, y2);
            // drawDot(x2+4, y2+2, 5, 1);
            // drawDot(x2-7, y2+9, 6, 2);
            // drawDot(x2+2, y2-3, 3, 3);
        }
    };

    /***********************************************
    * Draws all the elements on the screen */
    var drawScreen = function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        growTree(canvas.width*0.5, canvas.height, -90, 3, 20);
    }
	/*****************************************
	 * Init all Functions */
    //  limitLoop( drawScreen, 60);
     drawScreen();
}(treeWithAnimatedLeaves));
