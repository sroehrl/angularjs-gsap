var app = angular.module('app',[]);

app.controller('test',function ($scope) {
    $scope.animation = {
        main:{
            x:'50%',
            y:100,
            rotation:360,
            scale:1.5,
            paused:true,
            opacity:1,
            ease:Elastic.easeOut.config(1, 0.3)
        },
        answer:{
            ease:SlowMo.ease.config(0.7, 0.2, false),
            y:40
        },
        keyframes:[{start:2,name:'main'}]
    };
    $scope.video = document.getElementById('video');
    $scope.video.ontimeupdate = function(){
        $scope.control.apply();
    };

    $scope.control = {
        tweens:[],
        bind:function(tween,name){
            var obj = {tween:tween,name:name,start:0};
            angular.forEach($scope.animation.keyframes,function(keyFrame) {
                if (keyFrame.name === name) {
                    obj.start = keyFrame.start;
                }
            });
            this.tweens.push(obj);
            console.log(this.tweens);
        },
        allTweens:function(fn){
            angular.forEach($scope.control.tweens,function(tween,i){
                switch (fn){
                    case 'pause':$scope.control.tweens[i].tween.pause(); break;
                    case 'resume':
                        if($scope.control.tweens[i].tween.progress()>0){
                            $scope.control.tweens[i].tween.resume();
                        }
                         break;
                    case 'reset':$scope.control.tweens[i].tween.progress(0); break;
                }

            })
        },
        apply:function(){
            var val = $scope.video.currentTime;
            this.timer = val;
            angular.forEach($scope.control.tweens,function(keyFrame,i){

                if(keyFrame.start<=val&&!$scope.video.paused&&keyFrame.tween.progress()===0){
                    $scope.control.tweens[i].tween.resume();
                }
            });

        },
        play :function(){
            if($scope.video.paused){
                $scope.video.play();
                this.allTweens('resume');
            } else {
                $scope.video.pause();
                this.allTweens('pause');
            }
        },
        restart:function(){
            $scope.video.currentTime = 0;
            this.allTweens('pause');
            this.allTweens('reset');

        }
    }
});

