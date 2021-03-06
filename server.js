var express = require('express');
var https = require('https');
var formurlencoded = require('form-urlencoded');
var upload = require('./routes/upload');

var config = {};
if (process.env.CLIENT_ID && process.env.CLIENT_SECRET) {
    config.client_id = process.env.CLIENT_ID;
    config.client_secret = process.env.CLIENT_SECRET;
    console.log(process.env.CLIENT_ID);
    console.log(process.env.CLIENT_SECRET);
} else {
    try {
        /*config = require('./config.json');
        console.log(config);*/
        config = require('./credentials').credentials;
    } catch(e) {
        console.log("No config defined");
    }
}
//config.grant_type = 'client_credentials';

var app = express();
app.use('/', express.static(__dirname + '/public'));

app.use('/api', upload);

app.use('/pages/Explorer/', express.static(__dirname + '/public/pages/Explorer'));
app.use('/pages/DockingPanel/', express.static(__dirname + '/public/pages/DockingPanel'));
app.use('/pages/Toolbar/', express.static(__dirname + '/public/pages/Toolbar'));
app.use('/pages/ScreenShotManager/', express.static(__dirname + '/public/pages/ScreenShotManager'));
app.use('/pages/Chart/',express.static(__dirname + '/public/pages/Chart'));
app.use('/pages/CSSRenderer/',express.static(__dirname + '/public/pages/CSSRenderer'));
app.use('/pages/ModelStructure/',express.static(__dirname + '/public/pages/ModelStructure'));
app.use('/pages/Move/',express.static(__dirname + '/public/pages/Move'));
app.use('/pages/TransformTool/',express.static(__dirname + '/public/pages/TransformTool'));
app.use('/pages/BoundingBox/',express.static(__dirname + '/public/pages/BoundingBox'));

var router = express.Router();

router.get('/extensions', function (req, res) {
    res.json([
		{"_id":"0","id":"Autodesk.ADN.Viewing.Extension.ScreenShotManager","name":"ScreenShotManager","file":"Autodesk.ADN.Viewing.Extension.ScreenShotManager.js"},
		{"_id":"1","id":"Autodesk.ADN.Viewing.Extension.Toolbar","name":"Toolbar","file":"Autodesk.ADN.Viewing.Extension.Toolbar.js"},
		{"_id":"2","id":"Autodesk.ADN.Viewing.Extension.DockingPanel","name":"DockingPanel","file":"Autodesk.ADN.Viewing.Extension.DockingPanel.js"},
		{"_id":"3","id":"Autodesk.ADN.Viewing.Extension.Explorer","name":"Explorer","file":"Autodesk.ADN.Viewing.Extension.Explorer.js"},
        {"_id":"4","id":"Autodesk.ADN.Viewing.Extension.Chart","name":"Chart","file":"Autodesk.ADN.Viewing.Extension.Chart.js"},
        {"_id":"5","id":"Autodesk.ADN.Viewing.Extension.CSSRenderer","name":"CSSRenderer","file":"Autodesk.ADN.Viewing.Extension.CSSRenderer.js"},
        {"_id":"6","id":"Autodesk.ADN.Viewing.Extension.ModelStructure","name":"ModelStructure","file":"Autodesk.ADN.Viewing.Extension.ModelStructure.js"},
        {"_id":"7","id":"Autodesk.ADN.Viewing.Extension.Move","name":"Move","file":"Autodesk.ADN.Viewing.Extension.Move.js"},
        {"_id":"8","id":"Autodesk.ADN.Viewing.Extension.TransformTool","name":"TransformTool","file":"Autodesk.ADN.Viewing.Extension.TransformTool.js"},
        {"_id":"9","id":"Autodesk.ADN.Viewing.Extension.BoundingBox","name":"BoundingBox","file":"Autodesk.ADN.Viewing.Extension.BoundingBox.js"}
	]);
    /*res.json([
        {"_id":"555cb32a904e18c811dcf24a","id":"Autodesk.ADN.Viewing.Extension.ScreenShotManager","name":"ScreenShotManager","file":"Autodesk.ADN.Viewing.Extension.ScreenShotManager.js"},
        {"_id":"545f1c0abe50d16010d233ae","id":"Autodesk.ADN.Viewing.Extension.Toolbar","name":"Toolbar","file":"Autodesk.ADN.Viewing.Extension.Toolbar.js"},
        {"_id":"546530bd342d865016c6839d","id":"Autodesk.ADN.Viewing.Extension.DockingPanel","name":"DockingPanel","file":"Autodesk.ADN.Viewing.Extension.DockingPanel.js"},
        {"_id":"551844023dfebce004ce4010","id":"Autodesk.ADN.Viewing.Extension.Explorer","name":"Explorer","file":"Autodesk.ADN.Viewing.Extension.Explorer.js"}
    ]);*/
});

var authWithCredentials = function(req, authRes) {
    var options = {
        host: 'developer.api.autodesk.com',
        path: '/authentication/v1/authenticate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var post_req = https.request(options, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            authRes.setHeader("Content-Type", "application/json");
            authRes.end(body);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

    post_req.write(formurlencoded.encode(config));
    post_req.end();
}

var authWithoutCredentials = function(req, authRes) {
    var options = {
        host: 'examples.developer.autodesk.com',
        path: '/lmv-extensions/api/auth',
        method: 'GET'
    };

    https.get(options, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            authRes.setHeader("Content-Type", "application/json");
            authRes.end(body);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}

router.get('/auth', function (req, authRes) {
    if(config.client_id && config.client_secret) {
        authWithCredentials(req, authRes);
    }
    else {
        authWithoutCredentials(req, authRes)
    }
});

app.use('/tt', router);

app.set('port', process.env.PORT || process.argv[2] || 3000);
var server = app.listen(app.get('port'), function() {

    console.log('Server listening on: ');
    console.log(server.address());
    console.log('Open this link to see the app: http://localhost:' + app.get('port') + '/');
});