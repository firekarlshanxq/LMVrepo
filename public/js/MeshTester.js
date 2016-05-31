/**
 * Created by t_shanx on 5/25/2016.
 */
MeshTester = function (viewer,options) {
    Autodesk.Viewing.Extension.call(this,viewer,options);
    _self = this;

    _self.load = function () {
        //initialize();
        console.log("MeshTester loaded");
        return true;
    };

    _self.unload = function () {
        console.log("MeshTester unloaded");
        return true;
    };

    var selectedExtensions = {};

    var cssScene, cssRenderer, camera, controls, glRenderer,glScene;
    ///////////////////////////////////////////////////////////////////
    // Creates WebGL Renderer
    //
    ///////////////////////////////////////////////////////////////////
    function createGlRenderer() {
        var glRenderer = viewer.impl.glrenderer();
        //console.log(viewer.impl.glrenderer());
        /*glRenderer.alpha = true;
        glRenderer.setClearColor(0xECF8FF);
        glRenderer.setPixelRatio(window.devicePixelRatio);
        glRenderer.setSize(window.innerWidth, window.innerHeight);
        glRenderer.domElement.style.position = 'absolute';*/
        glRenderer.domElement.style.zIndex = 1;
        //glRenderer.domElement.style.top = 0;
        return glRenderer;
    }
    ///////////////////////////////////////////////////////////////////
    // Creates CSS Renderer
    //
    ///////////////////////////////////////////////////////////////////
    function createCssRenderer() {
        var cssRenderer = new THREE.CSS3DRenderer();
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.domElement.style.position = 'absolute';
        //glRenderer.domElement.style.zIndex = 0;
        cssRenderer.domElement.style.top = 0;
        cssRenderer.domElement.style.zIndex = 2;
        return cssRenderer;
    };
    ///////////////////////////////////////////////////////////////////
    // Creates plane mesh
    //
    ///////////////////////////////////////////////////////////////////
    function createPlane(w, h, position, rotation) {
        var material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            opacity: 0.0,
            side: THREE.DoubleSide,
            //blending: THREE.NoBlending
        });
        viewer.impl.matman().addMaterial('planeMat',material,true);
        var geometry = new THREE.PlaneGeometry(w, h);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = position.x;
        mesh.position.y = position.y;
        mesh.position.z = position.z;
        mesh.rotation.x = rotation.x;
        mesh.rotation.y = rotation.y;
        mesh.rotation.z = rotation.z;
        return mesh;
    }
    ///////////////////////////////////////////////////////////////////
    // Creates CSS object
    //
    ///////////////////////////////////////////////////////////////////
    function createCssObject(w, h, position, rotation, url) {
        var html = [
            '<div style="width:' + w + 'px; height:' + h + 'px;">',
            '<iframe src="' + url + '" width="' + w + '" height="' + h + '">',
            '</iframe>',
            '</div>'
        ].join('\n');
        var div = document.createElement('div');
        $(div).html(html);
        var cssObject = new THREE.CSS3DObject(div);
        cssObject.position.x = position.x;
        cssObject.position.y = position.y;
        cssObject.position.z = position.z;
        cssObject.rotation.x = rotation.x;
        cssObject.rotation.y = rotation.y;
        cssObject.rotation.z = rotation.z;
        return cssObject;
    };
    ///////////////////////////////////////////////////////////////////
    // Creates 3d webpage object
    //
    ///////////////////////////////////////////////////////////////////
    function create3dPage(w, h, position, rotation, url){
        var plane = createPlane(
            w, h,
            position,
            rotation);
        //glScene.add(plane);

        var cssObject = createCssObject(
            w, h,
            position,
            rotation,
            url);
        cssScene.add(cssObject);
    };
    ///////////////////////////////////////////////////////////////////
    // Creates material with random color
    //
    ///////////////////////////////////////////////////////////////////
    function createColoredMaterial() {
        var material = new THREE.MeshBasicMaterial({
            color: Math.floor(Math.random() * 16777215),
            shading: THREE.FlatShading,
            side: THREE.DoubleSide
        });
        viewer.impl.matman().addMaterial('geoMat' + Math.random(16777215),material,true);
        return material;
    }
    ///////////////////////////////////////////////////////////////////
    // Creates 3D geometry to place in the scene
    //
    ///////////////////////////////////////////////////////////////////
    function create3dGeometry() {
        var mesh1 = new THREE.Mesh(
            new THREE.CylinderGeometry(0, 200, 300, 20, 4),
            createColoredMaterial());
        mesh1.position.x = 0;
        mesh1.position.y = -300;
        mesh1.position.z = 400;
        // glScene.add(mesh1);
        viewer.impl.scene.add(mesh1);
        var mesh2 = new THREE.Mesh(
            new THREE.BoxGeometry(200, 200, 200),
            createColoredMaterial());
        mesh2.position.x = -300;
        mesh2.position.y = -300;
        mesh2.position.z = 400;
        // glScene.add(mesh2);
        viewer.impl.scene.add(mesh2);
        var mesh3 = new THREE.Mesh(
            new THREE.SphereGeometry(100, 128, 128),
            createColoredMaterial());
        mesh3.position.x = 500;
        mesh3.position.y = -300;
        mesh3.position.z = 400;
        // glScene.add(mesh3);
        viewer.impl.scene.add(mesh3);
    }
    ///////////////////////////////////////////////////////////////////
    // Initializes scene
    //
    ///////////////////////////////////////////////////////////////////
    function initialize() {

        camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            10000);
        //camera = viewer.impl.camera;
        camera.position.set(0, 100, 3000);
        camera.getEffectiveFOV = function(){
            return 45;
        }
        console.log(camera);

        //controls = viewer.impl.controls;
        /*var oriControls = viewer.impl.controls;
        controls.deactivateTool = function () {
            oriControls.deactivateTool();
        }
        controls.activateTool = function () {
            oriControls.activateTool();
        }
        viewer.impl.controls = controls;*/

        glRenderer = createGlRenderer();
        console.log("11");
        console.log(viewer.impl);
        console.log(glRenderer);
        cssRenderer = createCssRenderer();

        controls = new THREE.TrackballControls(camera,cssRenderer.domElement);
        console.log(cssRenderer);

        //document.body.appendChild(glRenderer.domElement);
        document.body.appendChild(cssRenderer.domElement);
        //glRenderer.domElement.appendChild(cssRenderer.domElement);
        console.log(glRenderer.domElement);
        console.log(cssRenderer.domElement);
        /*document.body.appendChild(cssRenderer.domElement);
        cssRenderer.domElement.appendChild(glRenderer.domElement);*/
        //glScene = viewer.impl.scene;
        cssScene = new THREE.scene;
        /*var ambientLight = new THREE.AmbientLight(0x555555);
        glScene.add(ambientLight);
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set( -.5, .5, -1.5 ).normalize();
        glScene.add(directionalLight);*/
        create3dPage(
            1000, 1000,
            new THREE.Vector3(-1050, 0, -400),
            new THREE.Vector3(0, 45 * Math.PI / 180, 0),
            'http://viewer.autodesk.io/node/ng-gallery/#/home');
        create3dPage(
            900, 1000,
            new THREE.Vector3(0, 0, -800),
            new THREE.Vector3(0, 0, 0),
            'http://adndevblog.typepad.com/cloud_and_mobile');
        create3dPage(
            1000, 1000,
            new THREE.Vector3(1050, 0, -400),
            new THREE.Vector3(0, -45 * Math.PI / 180, 0),
            'http://mongo.autodesk.io');

        create3dGeometry();
        //viewer.impl.sceneUpdated(true);
        //viewer.impl.scene.autoUpdate = false;
        update();
    };
    ///////////////////////////////////////////////////////////////////
    // Updates scene
    //
    ///////////////////////////////////////////////////////////////////
    function update() {
        controls.update();

        //glRenderer.render(glScene,camera);
        //console.log(camera);
        cssRenderer.render(cssScene, camera);
        requestAnimationFrame(update);
    };
    ///////////////////////////////////////////////////////////////////
    // On document ready
    //
    ///////////////////////////////////////////////////////////////////
    /*$(document ).ready(function() {
        initialize();


    }*/
};
MeshTester.prototype =
    Object.create(Autodesk.Viewing.Extension.prototype);

MeshTester.prototype.constructor =
    MeshTester;

Autodesk.Viewing.theExtensionManager.registerExtension(
    'MeshTester',
    MeshTester);