# angularjs-gsap
AngularJS Greensock experiment


I needed an easy way to utilize TweenMax ([GreenSock](https://greensock.com)) in AngularJS to do the following:

Bind animations as overlays to the progression of a video.
The factory and directive built for this handles start-keys and 
end-keys (like keyframes in a video editing software).

_IMPORTANT_

Set paused=true in the animate-object if bound to a master

**Example**

HTML
```html
<video id="video" ng-click="control.play()" gsap-master>
    <source src="~.mp4" type="video/mp4">
</video>
<div style="opacity:0" gsap-animate="animation" >
    Fly in 2 sec into the video
</div>
```
Controller
```javascript
app.controller('test',function($scope,animate){
    // scope the video element
    $scope.video = document.getElementById('video');
    
    // defined animation
    $scope.animation ={
        animate:{
            scale:1.5,
            paused:true,
            opacity:1,
            ease:Elastic.easeOut.config(1, 0.3)
        },
        duration:3,
        action:'to',
        keyFrames:[{start:2,end:5}]
    };
    
    // use factory for controlling
    $scope.play = function(){
        animate.play();
    }
});
```

**Animation-Object**

| Attribute | Required | Info |
| --- | :---: | --- |
| animate | yes | The GreenSock vars-Object |
| duration | yes | in seconds |
| action | yes | e.g. 'to' or 'from' |
| keyFrames | no | ObjArray. start & end can be set (in seconds) |

