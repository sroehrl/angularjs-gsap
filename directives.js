app.directive('gsapAnimate',['$timeout','animate',function($timeout,animate){
    return {
        restrict:'A',
        scope:{
            gsapAnimate:'=',
            relation:'='
        },
        link:function(scope,ele,attrs){
            var animation = scope.gsapAnimate;
            if(typeof animation.duration === 'undefined'){
                animation.duration = .5;
            }
            if(typeof animation.animate === 'undefined'){
                animation.animate = {ease: Power2.easeOut};
            }
            var tween = TweenMax[animation.action](ele,animation.duration,animation.animate);
            $timeout(function(){
                if(typeof scope.relation !=='undefined'){
                    animate.register(scope.relation);
                }

                animate.bind(tween,animation.keyFrames);
            },100);
        }
    }
}]);
app.directive('gsapMaster',['animate',function(animate){
    return {
        restrict:'A',
        link:function(scope,ele,attrs){
            animate.register(ele[0]);
        }
    }
}]);
