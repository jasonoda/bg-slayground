
export class Input {
    
    setUp(e) {

        this.e=e;

        this.stickIn = document.getElementById("stickIn");
        this.stickOut = document.getElementById("stickOut");

        this.keyRight = false;
        this.keyLeft = false;
        this.keyUp = false;
        this.keyDown = false;

        this.speedMultX = 0;
        this.speedMultY = 0;

        document.addEventListener("keydown", event => {

            //---arrow keyes---------------------------------------

            if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {

                this.keyRight = true;

            } else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {

                this.keyLeft = true;

            } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {

                this.keyUp = true;

            } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {

                this.keyDown = true;

            } else if (event.key === "b") {

                this.e.scene.lightning = 1;

            } else if (event.key === "n") {

                this.e.scene.lightning = 2;

            } else if (event.key === "m") {

                this.e.scene.lightning = 3;

            } else if (event.key === "8") {

                this.e.scene.gameTime = 297;

            } else if (event.key === "9") {

                this.e.scene.action="death start";

            } else if (event.key === "z" || event.key === "Z") {

                if(this.e.scene.pause!==true){
                    this.e.scene.pause=true;
                }else{
                    this.e.scene.pause=false;
                }
                

            }

        });

        document.addEventListener("keyup", event => {

            //---arrow keyes---------------------------------------

            if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {

                this.keyRight = false;

            } else if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {

                this.keyLeft = false;

            } else if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {

                this.keyUp = false;

            } else if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {

                this.keyDown = false;

            }

        });

        //---touchstart--------------------------------------------------------------------------------------------------------------

        this.ongoingTouches = [];

        document.addEventListener("touchstart", evt => {

            for (var i = 0; i < evt.touches.length; i++) {
                var found = false;

                //only add the touch if it is not listed yet, prevent doubles

                for (var j = 0; j < this.ongoingTouches.length; j++) {

                    if (evt.touches[i].identifier === this.ongoingTouches[j].identifier) {
                        found = true;
                    }

                }

                if (found === false) {
                    this.ongoingTouches.push(evt.touches[i]);

                    
                }
            }

        });

        //---touchmove--------------------------------------------------------------------------------------------------------------

        this.ongoingTouches = [];
        this.stickMoveX = 0;
        this.stickMoveY = 0;

        document.addEventListener("touchmove", evt => {

            for (var i = 0; i < evt.touches.length; i++) {
            
                this.e.touch.x=evt.touches[i].clientX
                this.e.touch.y=evt.touches[i].clientY

                this.e.mouse.x = evt.touches[i].clientX
                this.e.mouse.y = evt.touches[i].clientY

                if(i===0){

                    this.maxStick = 12*2.5

                    this.stickMoveX = -(this.ongoingTouches[0].clientX - evt.touches[i].clientX);
                    if(this.stickMoveX > this.maxStick){
                        this.stickMoveX=this.maxStick;
                    }else if(this.stickMoveX < -this.maxStick){
                        this.stickMoveX=-this.maxStick;
                    }

                    this.stickMoveY = -(this.ongoingTouches[0].clientY - evt.touches[i].clientY);
                    if(this.stickMoveY > this.maxStick){
                        this.stickMoveY=this.maxStick;
                    }else if(this.stickMoveY < -this.maxStick){
                        this.stickMoveY=-this.maxStick;
                    }

                    // this.speedMultX = this.stickMoveX/12;
                    // this.speedMultY = this.stickMoveY/12;

                }

            }

            var deltaX = evt.touches[0].clientX - this.ongoingTouches[0].clientX;
            var deltaY = evt.touches[0].clientY - this.ongoingTouches[0].clientY;
            var angleRadians = Math.atan2(deltaY, deltaX);

            var distPerc = this.e.u.getDistance(evt.touches[0].clientX, evt.touches[0].clientY, this.ongoingTouches[0].clientX, this.ongoingTouches[0].clientY);
            
            if(distPerc>12*2.5){
                distPerc=12*2.5;
            }

            this.stickMoveX2 = (distPerc * Math.cos(angleRadians));
            this.stickMoveY2 = (distPerc * Math.sin(angleRadians));
            
            this.speedMultX = this.stickMoveX2/(12*2.5);
            this.speedMultY = this.stickMoveY2/(12*2.5);


        });

        //---touchend--------------------------------------------------------------------------------------------------------------

        document.addEventListener("touchend", evt => {

            //evt.preventDefault();
            var touches = evt.changedTouches;

            for (var i = 0; i < touches.length; i++) {

                for (var j = 0; j < this.ongoingTouches.length; j++) {

                    if (touches[i].identifier === this.ongoingTouches[j].identifier) {
                        this.ongoingTouches.splice(j, 1);
                    }
                }
            }

        });

        //---touchcancel--------------------------------------------------------------------------------------------------------------

        document.addEventListener("touchcancel", evt => {

            //evt.preventDefault();
            var touches = evt.changedTouches;

            for (var i = 0; i < touches.length; i++) {

                for (var j = 0; j < this.ongoingTouches.length; j++) {

                    if (touches[i].identifier === this.ongoingTouches[j].identifier) {
                        this.ongoingTouches.splice(j, 1);
                    }

                }

            }

        });

    }

    update(){  

        if(this.e.mobile===true){

            this.stickIn.style.width =  this.stickIn.style.height = 100*2.5+"px";
            this.stickOut.style.width =  this.stickOut.style.height = 100*2.5+"px";

            this.stickWidth = 50*2.5;

        }else{

            this.stickWidth = 50;

        }

        if(this.stickMoveX2===undefined && this.stickMoveY2===undefined){

            this.stickIn.style.opacity = 0;
            this.stickOut.style.opacity = 0;

        }else if(this.ongoingTouches.length>0){

            this.stickIn.style.left = (this.ongoingTouches[0].clientX-this.stickWidth+this.stickMoveX2)+"px";
            this.stickIn.style.top = (this.ongoingTouches[0].clientY-this.stickWidth+this.stickMoveY2)+"px";

            this.stickOut.style.left = (this.ongoingTouches[0].clientX-this.stickWidth)+"px";
            this.stickOut.style.top = (this.ongoingTouches[0].clientY-this.stickWidth)+"px";

            this.stickIn.style.opacity = .35;
            this.stickOut.style.opacity = .35;

        }else{

            this.stickIn.style.opacity = 0;
            this.stickOut.style.opacity = 0;

        }

    }

}