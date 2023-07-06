import { Howl } from 'howler';
export class Sounds {

    setUp(e) {

        this.e=e;
        this.soundArray = ["scroll", "tallyRight", "bomb", "coin", "deathSong", "enemyDeath", "fireball", "frost", "hurt", "lightning", "lightningSofter", "powerUp", "shot", "select", "slice", "loop", "howl" ];
        this.loadedSounds = [];

        for(var i=0; i<this.soundArray.length; i++){
            this.loadSounds(this.soundArray[i]);
        }
        
    }

    loadSounds(url){

        if(url==="loop"){

            var theSound = new Howl({
                src: ['./src/sounds/'+url+".mp3"], volume:1, loop:true
            });
    
        }else{

            var theSound = new Howl({
                src: ['./src/sounds/'+url+".mp3"]
            });
    
        }

        theSound.on('load', (event) => {
            theSound.name=url;
            this.loadedSounds.push(theSound);
            console.log("SOUND: "+url+" - "+this.loadedSounds.length+" / "+this.soundArray.length);

            if(theSound.name==="loop"){
                this.musicLoop = theSound;
            }
        });

    }

    p(type){

        if(this.e.soundOn===true){
            
            for(var i=0; i<this.loadedSounds.length; i++){

                if(this.loadedSounds[i].name===type){

                    // console.log("-->"+type)
                    this.loadedSounds[i].play();
                    
                }
                
            }
    
        }

    }
}