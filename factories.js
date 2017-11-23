app.factory('animate',function(){
    return {
        register:function (relationObject) {
            this.media = relationObject;
            var self = this;
            if(this.media !== 'undefined'){
                this.media.ontimeupdate = function(){
                    self.apply();
                }
            }

        },
        media:{},
        tweens:[],
        timer:0,
        playing:false,
        bind:function(tween,keyFrames){
            var obj = {tween:tween,start:0};
            angular.forEach(keyFrames,function(keyFrame) {
                obj.start = keyFrame.start;
                obj.end = (typeof keyFrame.end !== 'undefined'?keyFrame.end:40000)
            },this);
            this.tweens.push(obj);
        },
        allTweens:function(fn){
            angular.forEach(this.tweens,function(tween,i){
                switch (fn){
                    case 'pause':this.tweens[i].tween.pause(); break;
                    case 'resume':
                        if(this.tweens[i].tween.progress()>0){
                            this.tweens[i].tween.resume();
                        }
                        break;
                    case 'reset':this.tweens[i].tween.progress(0); break;
                }

            },this);
        },
        apply:function(){
            var val = this.media.currentTime;
            this.timer = val;
            angular.forEach(this.tweens,function(keyFrame,i){
                if(keyFrame.start<=val&&!this.media.paused&&keyFrame.tween.progress()===0){
                    this.tweens[i].tween.resume();
                }
                if(keyFrame.end>=val&&!this.media.paused&&keyFrame.tween.progress()===1){

                    this.tweens[i].tween.pause();
                    this.tweens[i].tween.progress(0);
                }
            },this);

        },
        play :function(){
            if(this.media.paused){
                this.media.play();
                this.allTweens('resume');
            } else {
                this.media.pause();
                this.allTweens('pause');
            }
            this.playing = !this.media.paused;
        },
        restart:function(){
            this.media.currentTime = 0;
            this.allTweens('pause');
            this.allTweens('reset');

        }
    }
});