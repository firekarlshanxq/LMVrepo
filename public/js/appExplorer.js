function initialize() {
    var urn =  'urn:' + Autodesk.Viewing.Private.getParameterByName('urn');
    var options = {
        'document' : urn,
        'env':'AutodeskProduction',
        'getAccessToken': getToken,
        'refreshToken': getToken,
    };
    var viewerElement = document.getElementById('viewer');
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerElement,
        {extensions: ['Autodesk.ADN.Viewing.Extension.Explorer'], apiUrl: 'tt/extensions', extensionsUrl: 'extensions', extensionsSourceUrl: 'extensions'});
    Autodesk.Viewing.Initializer(
        options,
        function() {
            viewer.start();
            loadDocument(viewer, options.document);
            console.log("explorer");
        }
    );
}

function getToken() {
    var accessToken;

    $.ajax({
        type: "GET",
        url: "../../tt/auth",
        async: false,
        success : function(data) {
            accessToken = data.access_token;
        }
    });

    return accessToken;
}

function loadDocument(viewer, documentId) {
    Autodesk.Viewing.Document.load(
        documentId,
        function(doc) {
            var geometryItems = [];
            geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
                'type' : 'geometry',
                'role' : '3d'
            }, true);
            if (geometryItems.length > 0) {
                viewer.load(doc.getViewablePath(geometryItems[0]));
            }
        },
        function(errorMsg) {
            alert("Load Error: " + errorMsg);
        }
    );
}

$(document).ready(function() {
    initialize();
    //console.log("-1");
})