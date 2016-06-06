LMV test

#Description  
This example follows the tutorials on Autodesk Forge website and demonstrates uploading new models and adding new functionality to Autodesk Large Model Viewer (LMV) using extensions. Also, this example shows a new way of displaying different extensions of LMV within one page. Extensions can be enabled during the Viewer loading process or later. Both scenarios are covered in this example. When the application starts, the Extension Manager (Viewer extension) is loaded automatically and is added to the Viewer toolbar as a '+' button. Click this button to open a list of other available extensions that you can enable some of them to have a preview before you start making your own extensions. 

Each dynamic extension provided by the Extension Manager provides a great example of adding a new functionality to the Viewer. To see the extension source code, you may click the “Source” button or just view the source code of this example.

#Development based on Autodesk View & Data API  
Basically, you need to first go to [this website](http://forge.autodesk.com/) and register an account. No matter which service you would like to use, take one hour on that website first and have a overview of what is Forge and what services it provides. If you choose to go for View & Data API, go to the View and Data service after you click 'go' on [page](http://forge.autodesk.com/).

There are plenty of tutorials on pages of View and Data service. However, it is hard to start after your quick look at those tutorials. My experience is that you'd better go directly to some sample code instead of reading texts.

Here's some good github repository you should refer to at the beginning.

Thorough tutorial on both client and server code
[Github Repo](https://github.com/Developer-Autodesk/view.and.data-javascript-getting.started.tutorial)  
Tutorial on how to add extensions to Large Model Viewer(client-end)
[Github Repo](https://github.com/Developer-Autodesk/lmv-extensions)  
If you find it even hard to get a simple client-end working ,look at this
[Github Repo](https://github.com/Developer-Autodesk/view.and.data-boilerplate)

I think you could have a basic understanding of the process of both client-end and server-end of View & Data service after you understand the code wihtin the repositories above.

There are several technologies you should know before your development.  
Front-end & Back-end: HTML, Javascript, CSS, JQuery, AJAX  
Server: [Node.js](https://nodejs.org/en/), [ExpressJS](http://expressjs.com/)  

Those are enough for you to make basic applications for this service. If you want to know more like manipulating objects within the viewer scene, you can look at this:  
[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), [THREE.js](http://threejs.org/)    

Also, this forum is super helpful when you have problems: [link](http://adndevblog.typepad.com/cloud_and_mobile/)   
Blogs written by [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma/) are pretty good for both starters and developers looking for answers to some specific questions. 

#My work  
First, I forked this Github repo to have a basis for my client-end: [LMV extensions](https://github.com/Developer-Autodesk/lmv-extensions)  
Then I followed the tutorial within this blog and fully understood how to add an extension to LMV: [link](http://adndevblog.typepad.com/cloud_and_mobile/2014/10/how-to-write-custom-extensions-for-the-large-model-viewer.html)  
Then, I found this on Github, like [heaven](https://github.com/Developer-Autodesk/library-javascript-viewer-extensions)... This respository has all extensions Autodesk internal developer had developed for the LMV. Detailed tutorials are there for people who need help in understanding the process of adding extensions to LMV.  
Before, you move further from here, I recommend you to go back to this [page](https://github.com/Developer-Autodesk/view.and.data-javascript-getting.started.tutorial/blob/master/prerequisites.md#InstallNodeJs) to make sure that you have installed your Node.js server properly.  
Then you will have a folder hierachy like this:  
![](img/hierachy.PNG)  
"node_modules" is the folder automatically created when you do npm install in cmd which contains the modules needed for this project.  
"public" is the folder that contains your own webpage files like .js, .html and .css. Also, the name for this file can be anything but you have to change the references of files in your code if you want to change the name of a folder.  
All other folders are created by myself for orgnization of my code.

If you just want to make some simple extensions to LMV, then those above are pretty enough for you. Make sure you follow the tutorials I mentioned carefully and correctly.

Once you have some ideas about changing objects within the WebGL scene inside LMV, then you need to know something about [THREE.js](http://threejs.org/). Some blogs within the forum I mentioned above are helpful for your exploration in doing something advanced with LMV:  
[add meshes to LMV](http://adndevblog.typepad.com/cloud_and_mobile/2015/01/add-geometry-with-autodesk-view-data-api-by-threejs.html)  
[particles](http://adndevblog.typepad.com/cloud_and_mobile/2016/03/a-particle-adventure.html)  
[possible usage of WebGL and Three.js](http://adndevblog.typepad.com/cloud_and_mobile/2013/06/3d-webgl-viewer-with-javascript-and-threejs.html)  
[merging THREE.js and webpage elements](http://adndevblog.typepad.com/cloud_and_mobile/2015/07/embedding-webpages-in-a-3d-threejs-scene.html)

What I did in this prototype is much inspired by the last blog "embedding webpages in a 3d three.js scene". After I understood how the extension manager within the project I forked works, I started adding my code in Autodesk.ADN.Viewing.Extension.ExtensionManager.js. I followed the method in the [blog](http://adndevblog.typepad.com/cloud_and_mobile/2015/07/embedding-webpages-in-a-3d-threejs-scene.html)
to embed webpages in the LMV scene. Then I came out a method of how to associate the selected extensions and the pages displayed. I know there should be a better way of achieveing this, but this is the only way I came out within short time. I first took several hours to figure out how Node.js server.js works. So first you need to find the version of your node.js, do "node -v" after you endter your repo in cmd. Here are some references for you to work with Node.js (version 4.4.4 for example):  
[Node.js/API](https://nodejs.org/docs/v4.4.4/api/)      
[ExpressJS](http://expressjs.com/)  
[Express routing](http://expressjs.com/en/guide/routing.html)  
Ok, assuming that you understand how Node server.js works, it is easy for you to understand how I put url inside the webpages displayed in the LMV scene. I made one static webpage for a specific extension and created unique url for each webpage in server.js. Then I made a simple algorithm for how to set the rotation and position of different webpages in the scene. Each displayed webpage has a unique url associated with a selected extension. This is how it looks:  
![](img/scene.PNG)

The above description is a poor explanation about how I made my client-end of View & data. I hope you could achieve more by reading the code within the respositories I mentioned above. OK, next is the REST server-side API. The core functionality of this API is providing developers methods of uploading their own models to show in LMV. This [tutorial](https://github.com/Developer-Autodesk/view.and.data-javascript-getting.started.tutorial/blob/master/chapter-2.md#Chapter2) has thorough tutorial of the two methods to achieve this. For this two method, I recommend the server-side method. The client-side method is simple and easy to achieve but it does not make full of the REST API view & data provides. I did not change much on the code in the tutorial. But be sure that you have a clear view of how server.js, credential.js, upload.js work and how to [set reference of different modules with Node.js and Express.js](http://openmymind.net/2012/2/3/Node-Require-and-Exports/).  

Here is a [link](http://pacific-everglades-32526.herokuapp.com/upload.html) of this prototype.

"Talk is cheap, practice by yourself". It is hard for me to fully explain how I finish this prototye for View & data service. As my methods in developing this prototype are pretty poor according to my limited experience in web development (about 3 weeks in total...), you'd better follow the tutorials I provide and do practice by yourself. 

#Deployment

To run the application, you need to have [Node.js](https://nodejs.org) installed on your machine. Navigate to the application folder and call 'npm install' to get the application dependencies. You can then execute 'node server.js' to run your application. The first page can be accessed from localhost:3000/upload.html.

I followed this tutorial [page](https://github.com/Developer-Autodesk/view.and.data-javascript-getting.started.tutorial/blob/master/appendix-c.md) to deploy this prototype on Heroku.

#Credits

This example is based on an application created by [Maxim Gurkin](https://github.com/redcraft).  The original application can be found [here](https://github.com/Developer-Autodesk/lmv-extensions)   
Also, [Philippe Leefsma](https://github.com/leefsmp). The original application can be found [here](https://github.com/Developer-Autodesk/ng-gallery).
