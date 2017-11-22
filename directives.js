app.directive('gsapAnimate',function($timeout){
    return {
        restrict:'A',
        scope:{
            motion:'=?',
            duration:'=?',
            control:'&?'
        },
        link:function(scope,ele,attrs){
            if(typeof scope.motion === 'undefined'){
                scope.motion = {ease:easeIn};
            }
            if(typeof scope.duration === 'undefined'){
                scope.duration = .5;
            }
            var tween = TweenMax[attrs.gsapAnimate](ele,scope.duration,scope.motion);
            console.log(tween);
            $timeout(function(){
                scope.control({tween:tween,name:attrs.id});
            },100);


        }
    }
});
app.directive('gsapTimeline',function(){

});