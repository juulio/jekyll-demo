/*
 * Julio Del Valle
 * THREE.js
 * 3d Scene - Ancient Ruins
 */

var generative_graphics = window.generative_graphics || {};

/**
 * Global logic
 * @namespace
 */

(function (generative_graphics) {

    'use strict';

    var loader, minaretsGroup, ferrisWheel;

    /**
     * Init all functions
     */
    generative_graphics.initScene01 = function() {
        var scene01 = new THREE.Object3D();
        
        scene01.add(renderSkybox());

        scene01.add(renderTrees());

        scene01.add(renderFloor());

        scene01.add(renderMinarets());

        scene01.add(renderColumns(new THREE.Vector3(0, 0, 0)));

        scene01.add(renderFerrisWheel());

        scene01.add(renderPyramid(70));

        return scene01;
    };

    /**
     * Renders Columns Group Object
     */
    var renderColumns = function(buildingPosition){
        var columnsGroup = new THREE.Object3D();

        let columnsTexture =  new THREE.TextureLoader().load('./assets/textures/stone2.png');
        columnsTexture.wrapS = THREE.RepeatWrapping;
        columnsTexture.wrapT = THREE.RepeatWrapping;
        columnsTexture.repeat.set( 1, 4 );

        let topTexture = new THREE.TextureLoader().load('./assets/textures/marble.jpg');
        topTexture.wrapS = THREE.RepeatWrapping;
        topTexture.wrapT = THREE.RepeatWrapping;
        topTexture.repeat.set( 2, 1 );

        var renderMarbleCube = function(position, size, texture){
            var geometry = new THREE.BoxGeometry( size.x, size.y, size.z);

            var material = new THREE.MeshBasicMaterial( { map: texture } );
            var cube = new THREE.Mesh( geometry, material );
            cube.position.set(position.x, position.y, position.z);
            columnsGroup.add(cube);
        };

        let renderColumns = function(){
            let columnSize = new THREE.Vector3(5, 22, 5);
            let columnPosition = new THREE.Vector3(-40, 10, 90);
            
            let columnTopSize = new THREE.Vector3(5.5, 1, 5.5);
            let columnTopPosition = new THREE.Vector3(-40, 21 , 90);

            let columnTop02Size = new THREE.Vector3(6.5, 1.1, 6.5);
            let columnTop02Position = new THREE.Vector3(-40, 22 , 90);

            for(var i=0;i<5;i++){
                columnPosition.z -= 16;
                columnTopPosition.z -= 16;
                columnTop02Position.z -= 16;

                columnPosition.x = -30;
                columnTopPosition.x = -30;
                columnTop02Position.x = -30;

                renderMarbleCube(columnPosition, columnSize, columnsTexture);
                renderMarbleCube(columnTopPosition, columnTopSize, topTexture);
                renderMarbleCube(columnTop02Position, columnTop02Size, topTexture);

                columnPosition.x = 30;
                columnTopPosition.x = 30;
                columnTop02Position.x = 30;

                renderMarbleCube(columnPosition, columnSize, columnsTexture);
                renderMarbleCube(columnTopPosition, columnTopSize, topTexture);
                renderMarbleCube(columnTop02Position, columnTop02Size, topTexture);
            }
        };

        renderColumns();

        return columnsGroup;
    };
    
    /**
     * Renders all the trees
     * @namespace generative_graphics
     */
    var renderTrees = function(){
        var treePosition,
            x,
            treeHeight = 10,
            treeScale = 1,
            treeGroup = new THREE.Object3D();

        var createTree = function(position, height, scale){
            var treeGroup = new THREE.Group();  

            // Tree Trunk
            var cylinderGeometry = new THREE.CylinderGeometry( 0.35, 0.35, height, 32 );
            var cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0xA0522D} );
            var trunk = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
            trunk.position.set(position.x, position.y+height/2, position.z);
            treeGroup.add(trunk);

            var sphereMaterial1 = new THREE.MeshBasicMaterial( {color: 0x006400} );
            var sphereMaterial2 = new THREE.MeshBasicMaterial( {color: 0x32A956} );
            var sphereMaterial3 = new THREE.MeshBasicMaterial( {color: 0x47AA12} );

            var sphereGeometry1 = new THREE.SphereGeometry( 2*scale, 32, 32 );
            var sphereGeometry2 = new THREE.SphereGeometry( 1.3*scale, 32, 32 );
            var sphereGeometry3 = new THREE.SphereGeometry( 1.5*scale, 32, 32 );

            var sphere1 = new THREE.Mesh( sphereGeometry1, sphereMaterial1 );
            sphere1.position.set(position.x-1.2, height*0.75, position.z);
            treeGroup.add(sphere1);

            var sphere2 = new THREE.Mesh( sphereGeometry2, sphereMaterial2 );
            sphere2.position.set(position.x+1.7, height*0.85, position.z-0.4);
            treeGroup.add(sphere2);

            var sphere3 = new THREE.Mesh( sphereGeometry3, sphereMaterial3 );
            sphere3.position.set(position.x+0.2, height*0.96  , position.z-0.4);
            treeGroup.add(sphere3);
            
            return treeGroup;
        };

        for(x=-78;x<78;x+=8){
            treePosition = new THREE.Vector3( x, 0, 0 );
            treeGroup.add(createTree(treePosition, treeHeight, treeScale));

            treePosition = new THREE.Vector3( x, 0, 80 );
            treeGroup.add(createTree(treePosition, treeHeight, treeScale)); 
        }
        return treeGroup;
    };

    /**
     * Renders the Floor
     * @class Floor
     * @constructor
     * @namespace generative_graphics
     */
    var renderFloor = function(){
        var geometry = new THREE.PlaneGeometry( 560, 560, 100, 100 );
        geometry.rotateX( - Math.PI / 2 );

        for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

            var vertex = geometry.vertices[ i ];
            vertex.x += Math.random() * 2 - 1;
            // vertex.y += Math.random() * 4;
            vertex.y += Math.random() * 1;
            // vertex.z += Math.random() * 15 - 10;
            vertex.z += Math.random() * 5 - 10;
        }

        for ( i = 0, l = geometry.faces.length; i < l; i ++ ) {

            var face = geometry.faces[ i ];
            face.vertexColors[ 0 ] = new THREE.Color().setRGB(1, 0.972, 0.862);
            face.vertexColors[ 1 ] = new THREE.Color().setRGB(0.713, 0.439, 0.227);
            face.vertexColors[ 2 ] = new THREE.Color().setRGB(0.580, 0.419, 0.298);

        }

        var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.setZ(40);
        mesh.position.setX(-7);
        return mesh;
    };

    /**
     * Render skybox
     */
    var renderSkybox = function(){
        var urls = [ "./assets/img/skybox/mars_back.png", "./assets/img/skybox/mars_front.png", "./assets/img/skybox/mars_top.png", "./assets/img/skybox/mars_bottom.png", "./assets/img/skybox/mars_right.png", "./assets/img/skybox/mars_left.png"];
        var cubeMaterials = [
            // Do not modify the images order
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load(urls[0]), side: THREE.DoubleSide } ),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load(urls[1]), side: THREE.DoubleSide } ),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load(urls[2]), side: THREE.DoubleSide } ),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load(urls[3]), side: THREE.DoubleSide } ),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load(urls[4]), side: THREE.DoubleSide } ),
            new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load(urls[5]), side: THREE.DoubleSide } ),
        ];

        // var cubeMaterial = new THREE.MultiMaterial( cubeMaterials );

        var skybox = new THREE.Mesh(
            new THREE.BoxGeometry( 900, 900, 900),
            cubeMaterials
        );

        return skybox;
    };

    /**
     * Renders a Minaret
     * @namespace generative_graphics
     * @param {THREE.Vector3} position
     * @param {Number} height
     * @param {Number} scale
     * THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments)
     */
    var renderMinaret = function(position, height){
        var minaretGroup = new THREE.Group();  
        var cone;
        var arabicTexture =  new THREE.TextureLoader().load('./assets/textures/marble.jpg');
        arabicTexture.wrapS = THREE.RepeatWrapping;
        arabicTexture.wrapT = THREE.RepeatWrapping;
        arabicTexture.repeat.set( 2, 6 );
        var material = new THREE.MeshBasicMaterial( { map: arabicTexture} );
        var minaretGeometry = new THREE.CylinderGeometry( 1, 1, height, 32 );

        /**
         * Render the booths on minarets
         */
        function renderBooth(position, radius){
            var stoneTexture =  new THREE.TextureLoader().load('./assets/textures/stone.png');
            var material = new THREE.MeshBasicMaterial( { map: stoneTexture } );
            var boothGeometry = new THREE.CylinderGeometry( radius, radius, 5, 5 );
            var booth = new THREE.Mesh(boothGeometry, material);
            booth.position.set(position.x, position.y, position.z);
            minaretGroup.add(booth);
        }

        /**
         * Render the cone on top of the minaret
         * ConeGeometry(radius, height, radialSegments, heightSegments)
         */
        function renderCone(position){
            var geometry = new THREE.ConeGeometry( 3, 6, 32 );
            var material = new THREE.MeshBasicMaterial( {color: 0xeecbad, wireframe: true} );
            cone = new THREE.Mesh( geometry, material );
            cone.name = "Cone";
            cone.position.set(position.x, position.y+25, position.z);
            minaretGroup.add( cone );
        }

        var minaret = new THREE.Mesh(minaretGeometry, material);
        minaret.position.set(position.x, position.y, position.z);
        minaretGroup.add(minaret);

        renderBooth(position, 1.5);
        renderBooth(new THREE.Vector3(position.x, position.y+12, position.z), 1.5);
        renderBooth(new THREE.  Vector3(position.x, position.y+20, position.z), 2.7);

        renderCone(position);

        return minaretGroup;
    };

    /**
     * Renders all Minarets
     * @namespace generative_graphics
     * @param {THREE.Vector3} position
     * @param {Number} height
     * @param {Number} scale
     * THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments)
     */
    var renderMinarets = function(){
        minaretsGroup = new THREE.Group();
        var minaretHeight = 36;

        var minaretFrontLeft = renderMinaret(new THREE.Vector3(-80, minaretHeight/2, 80), minaretHeight); // front left
        var minaretFrontRight = renderMinaret(new THREE.Vector3(80, minaretHeight/2, 80), minaretHeight); // front right
        var minaretRearLeft = renderMinaret(new THREE.Vector3(-80, minaretHeight/2, 0), minaretHeight); // rear left
        var minaretRearRight = renderMinaret(new THREE.Vector3(80, minaretHeight/2, 0), minaretHeight); // rear right    

        minaretsGroup.add(minaretFrontLeft);
        minaretsGroup.add(minaretFrontRight);
        minaretsGroup.add(minaretRearLeft);
        minaretsGroup.add(minaretRearRight);

        generative_graphics.minaretsGroup = minaretsGroup;

        return minaretsGroup;
    };

    /**
     * Render Ferris Wheel
     */
    let renderFerrisWheel = function(){
        let ferrisWheelGroup = new THREE.Group();

        let geometry = new THREE.CylinderGeometry( 65, 65, 2, 50 );
        let material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
        let wheel = new THREE.Mesh( geometry, material );
        wheel.rotation.x = Math.PI / 2 ;
        wheel.position.x = -85;
        wheel.position.y = 70;
        wheel.position.z = -70;
        ferrisWheelGroup.add(wheel);

        generative_graphics.ferrisWheel = wheel;

        var rustyTexture =  new THREE.TextureLoader().load('./assets/textures/disturb.jpg');
        rustyTexture.wrapS = THREE.RepeatWrapping;
        rustyTexture.wrapT = THREE.RepeatWrapping;
        rustyTexture.repeat.set( 2, 6 );
        geometry = new THREE.CylinderGeometry(2, 2, 70, 4);
        material = new THREE.MeshBasicMaterial( {color: 0xffffff, map: rustyTexture} );
        
        let supportColumnFrontLeft = new THREE.Mesh( geometry, material);
        supportColumnFrontLeft.position.x = -95;
        supportColumnFrontLeft.position.y = 35;
        supportColumnFrontLeft.position.z = -66;
        supportColumnFrontLeft.rotation.z = Math.PI / 10;
        ferrisWheelGroup.add(supportColumnFrontLeft);

        let supportColumnRearLeft = supportColumnFrontLeft.clone();
        supportColumnRearLeft.position.z = -74;
        supportColumnRearLeft.rotation.z = -Math.PI / 10;
        ferrisWheelGroup.add(supportColumnRearLeft);

        let supportColumnFrontRight = supportColumnFrontLeft.clone();
        supportColumnFrontRight.position.x = -72;
        supportColumnFrontRight.position.z = -66;
        supportColumnFrontLeft.rotation.z = -Math.PI / 10;
        ferrisWheelGroup.add(supportColumnFrontRight);

        let supportColumnRearRight = supportColumnFrontRight.clone();
        supportColumnRearRight.position.x = -72;
        supportColumnRearRight.position.z = -74;
        ferrisWheelGroup.add(supportColumnRearRight);

        return ferrisWheelGroup;
    };

    /**
     * Render Pyramid
     */
    let renderPyramid = function(levels){
        let pyramid = new THREE.Group();

        generative_graphics.pyramid = pyramid;
        generative_graphics.pyramidLevels = levels;

        let pyramidTexture =  new THREE.TextureLoader().load('./assets/textures/stone.png');
        pyramidTexture.wrapS = THREE.RepeatWrapping;
        pyramidTexture.wrapT = THREE.RepeatWrapping;
        pyramidTexture.repeat.set( 12, 1 );

        var renderPyramidLevel = function(position, size, texture){
            var geometry = new THREE.BoxGeometry( size.x, size.y, size.z);

            var material = new THREE.MeshBasicMaterial( { map: texture, transparent : true, opacity: 0.9 } );
            var cube = new THREE.Mesh( geometry, material );
            cube.position.set(position.x, position.y, position.z);
            return cube;
        };


        let pyramidLevelPosition, levelSize, pyramidLevel;

        for(var i=1;i<levels;i++){
            pyramidLevelPosition = new THREE.Vector3(110, i*4, -10);
            levelSize = new THREE.Vector3(5*i, 1, 5*i);

            pyramidLevel = renderPyramidLevel(pyramidLevelPosition, levelSize, pyramidTexture);
            pyramid.add(pyramidLevel);
        }


        return pyramid;
    };

}(generative_graphics));
