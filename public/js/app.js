function initialize() {
    var urn =  'urn:' + Autodesk.Viewing.Private.getParameterByName('urn');
    console.log(urn);
    var options = {
        'document' : urn,
        'env':'AutodeskProduction',
        'getAccessToken': getToken,
        'refreshToken': getToken
    };
    var viewerElement = document.getElementById('viewer');
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerElement,
        {
            extensions: ['Autodesk.ADN.Viewing.Extension.ExtensionManager'],
            apiUrl: 'tt/extensions',
            extensionsUrl: 'extensions',
            extensionsSourceUrl: 'extensions',
            pagesUrl : 'pages',
            urn : Autodesk.Viewing.Private.getParameterByName('urn')
        });
    Autodesk.Viewing.Initializer(
        options,
        function() {
            viewer.start();
            loadDocument(viewer, options.document, options);
        }
    );
}

function getToken() {
	var accessToken;

	$.ajax({
		type: "GET",
		url: "tt/auth",
		async: false,
		success : function(data) {
			accessToken = data.access_token;
		}
	});

	return accessToken;
}

function loadDocument(viewer, documentId, options) {
    Autodesk.Viewing.Document.load(
        documentId,
        function(doc) {
            var geometryItems3d = [];
            geometryItems3d = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
                'type' : 'geometry',
                'role' : '3d'
            }, true);

            var geometryItems2d = [];
            geometryItems2d = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(),{
                'type' : 'geometry',
                'role' : '2d'
            },true);
            /*if (geometryItems.length > 0) {
                //viewer.load(doc.getViewablePath(geometryItems[0]));

            }*/
            var viewablePath = geometryItems3d.length ? geometryItems3d[0] : geometryItems2d[0];
            viewer.loadModel(doc.getViewablePath(viewablePath),options);
        },
        function(errorMsg) {
            alert("Load Error: " + errorMsg);
        }
    );
}

$(document).ready(function() {
    initialize();
})