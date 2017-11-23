var app = angular.module('app',[]);

app.controller('test',['$scope','animate',function ($scope,animate) {
    $scope.animation = {
        main:{
            animate:{
                x:'50%',
                y:100,
                rotation:360,
                scale:1.5,
                paused:true,
                opacity:1,
                ease:Elastic.easeOut.config(1, 0.3)
            },
            duration:16,
            action:'to',
            keyFrames:[{start:2,end:5}]

        },
        answer:{
            animate:{
                ease:SlowMo.ease.config(0.7, 0.2, false),
                opacity:0,
                y:40
            },
            action:'from'

        }
    };
    $scope.audio = document.getElementById('audio');
    $scope.video = document.getElementById('video');

    $scope.control = {
        play:function(){
            animate.play();
            if(animate.playing){
                $scope.audio.play();
            } else {
                $scope.audio.pause();
            }
        },
        restart:function(){
            animate.restart();
        },
        timer:0
    };

}]);

