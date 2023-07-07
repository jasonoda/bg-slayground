import { gsap } from "gsap";
import * as PIXI from 'pixi.js';
import * as Matter from 'matter-js';

export class Scene {
    
  setUp(e) {

    this.e=e;

    this.action="set";
    this.count=0;

    if(this.e.mobile===true){
      this.zoomScale = 2.5;
    }else{
      this.zoomScale = 3;
    }
    

    //--------------------------------------------------------------------------------------------------

    // physics

    this.physEngine = Matter.Engine.create();
    this.physRender = Matter.Render.create({
      options:{
          hasBounds: true,
          wireframes: false
      },
      element: document.body,
      engine: this.physEngine
    });

    Matter.Engine.run(this.physEngine);
    Matter.Render.run(this.physRender);

    this.physEngine.world.gravity.y = 0;

    this.physRender.canvas.id = "matterCanvas"
    this.physRender.canvas.style.zIndex = 20;
    this.physRender.canvas.style.opacity = "0";
    this.physRender.canvas.style.position = "fixed"
    this.physRender.canvas.style.pointerEvents = "none"

    this.zLevs = [];
    this.zLevSkip = 0;
    this.iconCount = 0;

    this.enemiesAttacking=0
    this.totalShotPowerUps = 0;

    this.t = new Object();
    this.t.deathOffset = 0;
    this.t.tally1 = 0;
    this.t.tally2 = 0;
    this.t.shadowStrength = .4;
    this.t.lightningShadStrength = 0;

    this.killTotal=0;
    this.coinTotal=0
    this.tCount=0;
    this.enDeathCount=0;
    this.sliceTime=0;
    
    this.lastDir = "";

    this.snowFlakes = [];
    this.freezeEnemies = 0;
    this.saveLevel = 1;
    this.showLevCount = 0;

    this.hasWon = false;
    this.wonCount = 0;

    this.disableAttacks=false;

  }

  buildScene(){

    Matter.Events.on(this.physEngine, 'collisionStart', function(event) {
    });

    console.log("build scene");

    this.mainCont = new PIXI.Container();
    this.mainCont.sortableChildren = true;
    this.e.ui.app.stage.addChild(this.mainCont);

    this.mainCont.scale.x = this.mainCont.scale.y = this.zoomScale;

    this.tester = new PIXI.Sprite(this.e.ui.white);
    this.tester.anchor.x = this.tester.anchor.y = .5;
    this.tester.position.x=10;
    this.tester.width=5;
    this.tester.height=5;
    // this.tester.alpha=0;
    this.tester._zIndex=1;
    // this.mainCont.addChild(this.tester);

    this.background = new PIXI.Sprite(this.e.ui.t_grass);
    this.background.anchor.x = this.background.anchor.y = .5;
    this.background._zIndex=0;
    this.mainCont.addChild(this.background);

    this.cloudLayer = new PIXI.Sprite(this.e.ui.t_cloudLayer);
    this.cloudLayer.anchor.x = this.cloudLayer.anchor.y = .5;
    this.cloudLayer.scale.x = this.cloudLayer.scale.y = 2;
    this.cloudLayer.zIndex=18000;
    this.cloudLayer.alpha=.03;
    this.mainCont.addChild(this.cloudLayer);

    this.colorLayer = new PIXI.Sprite(this.e.ui.t_colorLayer);
    this.colorLayer.anchor.x = this.colorLayer.anchor.y = .5;
    this.colorLayer.zIndex=18000;
    this.colorLayer.alpha=.7;
    this.mainCont.addChild(this.colorLayer);

    this.shadowLayer = new PIXI.Sprite(this.e.ui.t_shadowLayer);
    this.shadowLayer.anchor.x = this.shadowLayer.anchor.y = .5;
    this.shadowLayer.zIndex=19000;
    this.shadowLayer.alpha=.4;
    this.mainCont.addChild(this.shadowLayer);

    gsap.to(  this.t, {shadowStrength: .7, duration: 3, repeat: -1, yoyo: true, ease: "linear"});

    this.trees = new PIXI.Sprite(this.e.ui.t_trees);
    this.trees.anchor.x = this.trees.anchor.y = .5;
    this.trees.zIndex=20000;
    this.trees.alpha=.8;
    this.mainCont.addChild(this.trees);

    this.playerCont = new PIXI.Container();
    this.playerCont.sortableChildren = true;
    this.mainCont.addChild(this.playerCont);

    this.playerCont.position.y=15;

    this.test = new PIXI.Sprite(this.e.ui.white);
    this.test.anchor.x = this.test.anchor.y = .5;
    this.test.width=3;
    this.test.height=3;
    this.test.position.y=10;
    this.test._zIndex=11220;
    // this.playerCont.addChild(this.test);

    this.test = new PIXI.Sprite(this.e.ui.white);
    this.test.anchor.x = this.test.anchor.y = .5;
    this.test.width=3;
    this.test.height=3;
    this.test.position.y=-10;
    this.test._zIndex=11220;
    // this.playerCont.addChild(this.test);

    this.playerInnerCont = new PIXI.Container();
    this.playerInnerCont.sortableChildren = true;
    this.playerCont.addChild(this.playerInnerCont);

    this.zLevs.push(this.playerCont);

    // this.playerCont.position.x=100;
    // this.playerCont.position.y=100;

    this.player = new PIXI.Sprite(this.e.ui.t_stance_d1);
    this.player.anchor.x = this.player.anchor.y = .5;
    this.player.width=39;
    this.player.height=39;
    this.player._zIndex=20;
    this.playerInnerCont.addChild(this.player);
    this.e.ui.animatedSprites.push(this.player)

    this.player.ani = this.e.ui.stanceAni_d

    this.shad = new PIXI.Sprite(this.e.ui.t_shad);
    this.shad.anchor.x = this.shad.anchor.y = .5;
    this.shad.position.y = 16;
    this.shad.alpha = .5;
    this.shad._zIndex=1;
    this.playerInnerCont.addChild(this.shad);

    this.hand = new PIXI.Sprite(this.e.ui.t_arm);
    this.hand.anchor.x = 0;
    this.hand.anchor.y = .5;
    this.hand.alpha = 0;
    this.hand._zIndex=3;
    this.playerInnerCont.addChild(this.hand);

    this.hand2 = new PIXI.Sprite(this.e.ui.t_arm_1);
    this.hand2.anchor.x = 0;
    this.hand2.anchor.y = .5;
    this.hand2._zIndex=10;
    this.playerInnerCont.addChild(this.hand2);

    this.hand2.ani = this.e.ui.armAni;
    this.hand2.aniSpeed = .04;
    this.hand2.aniLoop = false;
    this.e.ui.animatedSprites.push(this.hand2)

    this.freezer2 = new PIXI.Sprite(this.e.ui.t_freezer);
    this.freezer2.anchor.x = .5;
    this.freezer2.anchor.y = .5;
    this.freezer2._zIndex = 2;
    this.freezer2.width = this.freezer2.height = 0
    this.freezer2.alpha = 0;
    this.playerInnerCont.addChild(this.freezer2);

    this.snowCont = new PIXI.Container();
    this.snowCont.sortableChildren = true;
    this.playerInnerCont.addChild(this.snowCont);

    this.snowCont.zIndex = 2111;

    for(var i=0; i<35; i++){

      this.snowInnerCont = new PIXI.Container();
      this.snowInnerCont.sortableChildren = true;
      this.snowCont.addChild(this.snowInnerCont);

      this.snowInnerCont.rotation = this.e.u.ca(this.e.u.ran(360));

      this.snow = new PIXI.Sprite(this.e.ui.t_freezer);
      this.snow.anchor.x = .5;
      this.snow.anchor.y = .5;
      this.snow._zIndex = 2111;
      this.snow.width = this.snow.height = this.e.u.ran(3)+2
      this.snow.alpha = 1;
      this.snow.position.y = this.e.u.ran(30)+10
      this.snowInnerCont.addChild(this.snow);

      this.snowInnerCont.rotSpeed = this.e.u.nran(9)
      if(this.snowInnerCont.rotSpeed===0){
        this.snowInnerCont.rotSpeed=5;
      }

      this.snowInnerCont.scale.x = this.snowInnerCont.scale.y = 0;

      this.snowFlakes.push(this.snowInnerCont);

    }

    
    this.freezerCont = new PIXI.Container();
    this.freezerCont.sortableChildren = true;
    this.mainCont.addChild(this.freezerCont);

    this.freezer = new PIXI.Sprite(this.e.ui.t_freezer);
    this.freezer.anchor.x = .5;
    this.freezer.anchor.y = .5;
    this.freezer._zIndex = 2;
    this.freezer.width = this.freezer.height = 140
    this.freezer.alpha = 0;
    this.freezer.position.y=15;
    this.playerInnerCont.addChild(this.freezer);

    this.freezerMask = new PIXI.Sprite(this.e.ui.t_freezer);
    this.freezerMask.anchor.x = .5;
    this.freezerMask.anchor.y = .5;
    this.freezerMask._zIndex = 3;
    this.freezerMask.width = this.freezerMask.height = 70
    this.freezerMask.position.y=15;
    // this.freezer.alpha = 0;
    this.playerInnerCont.addChild(this.freezerMask);

    this.freezer.mask = this.freezerMask;

    this.levShowText = new PIXI.Text('LEV: 21');
    this.levShowText.anchor.x = 0.5
    this.levShowText.position.y = -24;
    this.levShowText._zIndex = 215;
    this.levShowText.alpha = 0;
    this.levShowText.style = new PIXI.TextStyle({
        align: "center",
        lineHeight: 0,
        fill: 0xffffff,
        fontSize: 4,
        fontFamily: "Ambitsek"
    })
    this.levShowText.resolution = 3;
    this.playerInnerCont.addChild(this.levShowText);

    this.playerInnerCont.position.y = -20;
    

    //------------------------------------------------------------------------------------------------------------------------

    // for(var i=0; i<10; i++){
    //   for(var j=0; j<3; j++){
          
    //     this.testGlow = new PIXI.Sprite(this.e.ui.t_whiteGlow);
    //     this.testGlow.anchor.x = .5;
    //     this.testGlow.anchor.y = .5;
    //     this.testGlow._zIndex = 3222;
    //     this.testGlow.position.x=(300*i)-1200;
    //     this.testGlow.position.y=(300*j);
    //     this.testGlow.alpha = .5
    //     this.mainCont.addChild(this.testGlow);

    //     if(j===0){
          
    //       if(i===0){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.ADD_NPM;
    //       }else if(i===1){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.COLOR;
    //       }else if(i===2){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.COLOR_BURN;
    //       }else if(i===3){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.COLOR_DODGE;
    //       }else if(i===4){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.DARKEN;
    //       }else if(i===5){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.DIFFERENCE;
    //       }else if(i===6){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.DST_ATOP;
    //       }else if(i===7){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.DST_IN;
    //       }else if(i===8){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.DST_OUT;
    //       }else if(i===9){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.DST_OVER;
    //       } 
  
    //     }else if(j===1){
          
    //       if(i===0){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.ERASE;
    //       }else if(i===1){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.EXCLUSION;
    //       }else if(i===2){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.HARD_LIGHT;
    //       }else if(i===3){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.HUE;
    //       }else if(i===4){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.LIGHTEN;
    //       }else if(i===5){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.LUMINOSITY;
    //       }else if(i===6){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    //       }else if(i===7){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.OVERLAY;
    //       }else if(i===8){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SATURATION;
    //       }else if(i===9){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SCREEN;
    //       } 
  
    //     }else if(j===2){
          
    //       if(i===0){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SCREEN_NPM;
    //       }else if(i===1){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;
    //       }else if(i===2){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SRC_ATOP;
    //       }else if(i===3){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SRC_IN;
    //       }else if(i===4){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SRC_OUT;
    //       }else if(i===5){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SRC_OVER;
    //       }else if(i===6){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.SUBTRACT;
    //       }else if(i===7){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.XOR;
    //       }else if(i===8){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.XOR;
    //       }else if(i===9){
    //         this.testGlow.blendMode = PIXI.BLEND_MODES.XOR;
    //       } 
  
    //     }

    //   }
    // }

    //------------------------------------------------------------------------------------------------------------------------

    this.starConts = [];

    for(var i=0; i<3; i++){

      this.starCont = new PIXI.Container();
      this.starCont.sortableChildren = true;
      this.mainCont.addChild(this.starCont);

      this.starCont.rotation = this.e.u.ca(120*i);

      this.star = new PIXI.Sprite(this.e.ui.t_star);
      this.star.anchor.x = this.star.anchor.y = .5;
      this.star.position.y = 75;
      this.star.zIndex = 3010;
      this.starCont.addChild(this.star);

      gsap.to( this.star.position, {y: 125, duration: 2, repeat: -1, yoyo: true, ease: "expo.inOut"});

      this.starCont.active = false;
      this.starCont.sprite = this.star;
      this.starConts.push(this.starCont);

      this.starCont.position.x = 10000;

    }

    // this.starConts[0].active = true;  
    // this.starConts[1].active = true;  
    // this.starConts[2].active = true;  

    //------------------------------------------------------------------------------------------------------------------------

    this.pointMarks = [];
    
    for(var i=0; i<50; i++){

      this.pm = new PIXI.Sprite(this.e.ui.t_fuse1);
      this.pm.anchor.x = this.shad.anchor.y = .5;
      this.pm.width = this.pm.height = 5;
      this.pm.zIndex=200000;
      this.pm.alpha = 0;
      this.mainCont.addChild(this.pm);

      this.pointMarks.push(this.pm);

    }

    //------------------------------------------------------------------------------------------------------------------------

    // placer

    this.placer = new PIXI.Sprite(this.e.ui.white);
    this.placer.anchor.x = this.placer.anchor.y = .5;
    this.placer.width=30;
    this.placer.height=10;
    this.placer._zIndex=3;
    this.placer.alpha = 0;
    this.mainCont.addChild(this.placer);

    //bushes

    this.totalBushes=200;
    this.bushes=[];

    for(var i=0; i<this.totalBushes/3; i++){

      var br = this.e.u.ran(3)

      if(br===0){
        this.bush = new PIXI.Sprite(this.e.ui.t_bush1);
      }else if(br===1){
        this.bush = new PIXI.Sprite(this.e.ui.t_bush2);
      }else if(br===2){
        this.bush = new PIXI.Sprite(this.e.ui.t_bush3);
      }

      this.bush.type = "big";
      this.bush.anchor.x =  .5;
      this.bush.anchor.y = 1;
      
      this.mainCont.addChild(this.bush);

      this.zLevs.push(this.bush)

      var isOk = false;
      while(isOk == false){

        this.bush.position.x = this.e.u.nran(1175);
        this.bush.position.y = this.e.u.nran(1175);

        isOk=true;

        for(var j=0; j<this.bushes.length; j++){

          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushes[j].position.x, this.bushes[j].position.y )<50){
            console.log("not ok 1")
            isOk = false;
            j=10000;
          }
  
          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, 0, 0 )<220){
            console.log("not ok 2")
            isOk = false;
            j=10000;
          }
  
        }

      }

      this.bushes.push(this.bush)

      this.bush.position.y+=this.bush.height;

      this.bushPhys = Matter.Bodies.circle( this.bush.position.x, this.bush.position.y-(this.bush.height/2), 40);
      this.bushPhys.isStatic = true;
      Matter.World.add(this.physEngine.world,[this.bushPhys]);

    }

    //------------------------------------------------------------------------------------------------------------------------

    this.bushesMed=[];

    for(var i=0; i<this.totalBushes/3; i++){

      var br = this.e.u.ran(3)

      if(br===0){
        this.bush = new PIXI.Sprite(this.e.ui.t_bushMed);
      }else if(br===1){
        this.bush = new PIXI.Sprite(this.e.ui.t_bushMed2);
      }else if(br===2){
        this.bush = new PIXI.Sprite(this.e.ui.t_bushMed3);
      }
      
      this.bush.type = "med";
      this.bush.anchor.x = .5;
      this.bush.anchor.y = 1;
      
      this.bush._zIndex=2;
      this.mainCont.addChild(this.bush);

      this.zLevs.push(this.bush)

      var isOk = false;
      while(isOk == false){

        this.bush.position.x = this.e.u.nran(1175);
        this.bush.position.y = this.e.u.nran(1175);

        isOk=true;
  
        for(var j=0; j<this.bushes.length; j++){

          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushes[j].position.x, this.bushes[j].position.y )<50){
            isOk = false;
          }

        }
  
        for(var j=0; j<this.bushesMed.length; j++){

          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushesMed[j].position.x, this.bushesMed[j].position.y )<33){
            isOk = false;
          }

        }

        if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, 0, 0 )<150){
          isOk = false;
        }

      }

      this.bushesMed.push(this.bush)

      this.bush.position.y+=this.bush.height;

      this.bushPhys = Matter.Bodies.circle( this.bush.position.x, this.bush.position.y-(this.bush.height/2), 25);
      this.bushPhys.isStatic = true;
      Matter.World.add(this.physEngine.world,[this.bushPhys]);

    }

    //------------------------------------------------------------------------------------------------------------------------

    this.bushesSmall=[];

    for(var i=0; i<this.totalBushes/3; i++){

      var br = this.e.u.ran(3)

      if(br===0){
        this.bush = new PIXI.Sprite(this.e.ui.t_bushSmall);
      }else if(br===1){
        this.bush = new PIXI.Sprite(this.e.ui.t_bushSmall2);
      }else{
        this.bush = new PIXI.Sprite(this.e.ui.t_bushSmall3);
      }
      
      this.bush.type = "small";
      this.bush.anchor.x = .5;
      this.bush.anchor.y = 1;

      this.bush._zIndex=2;
      this.mainCont.addChild(this.bush);

      this.zLevs.push(this.bush)

      var isOk = false;
      while(isOk == false){

        this.bush.position.x = this.e.u.nran(1175);
        this.bush.position.y = this.e.u.nran(1175);

        isOk=true;

        for(var j=0; j<this.bushes.length; j++){

          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushes[j].position.x, this.bushes[j].position.y )<50){
            isOk = false;
          }

        }
  
        for(var j=0; j<this.bushesMed.length; j++){

          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushesMed[j].position.x, this.bushesMed[j].position.y )<33){
            isOk = false;
          }

        }
  
        for(var j=0; j<this.bushesSmall.length; j++){

          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushesSmall[j].position.x, this.bushesSmall[j].position.y )<25){
            isOk = false;
          }

        }

        if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, 0, 0 )<150){
          isOk = false;
        }

      }

      this.bushesSmall.push(this.bush)

      this.bush.position.y+=this.bush.height;

      this.bushPhys = Matter.Bodies.circle( this.bush.position.x, this.bush.position.y, 15);
      this.bushPhys.isStatic = true;
      Matter.World.add(this.physEngine.world,[this.bushPhys]);

    }

    for(var i=0; i<this.bushes.length; i++){
      this.makeTinyBushes("big", this.bushes[i]);
    }
    for(var i=0; i<this.bushesMed.length; i++){
      this.makeTinyBushes("medium", this.bushesMed[i]);
    }
    for(var i=0; i<this.bushesSmall.length; i++){
      this.makeTinyBushes("small", this.bushesSmall[i]);
    }

    //------------------------------------------------------------------------------------------------------------------------

    this.score = 0;
    this.coinAmount = 0;
    this.masterSpeed = 1.4;
    this.powerUps = [];
    this.extraPowers = [];
    this.powerPick = 0;

    // power vars

    this.shotNumber = 1;
    this.magnetDistance = 60
    this.backwardsShotCue = 0;
    this.backwardsShot = false;
    this.splinter = false;
    this.fireBallCount = 0;
    this.fireBallShots = 0;
    this.freeze = 0;
    this.freezeCount = 0;
    this.lightning = 0;
    this.lightningCount = 0;
    this.bombs = 0;
    this.bombCount = 0;

  }

  makeTinyBushes(size, refBush){

    if(size==="big"){
      var numBushes = this.e.u.ran(6)+5
      var bushMinDist = 40;
    }else if(size==="medium"){
      var numBushes = this.e.u.ran(4)+4
      var bushMinDist = 33;
    }else if(size==="small"){
      var numBushes = this.e.u.ran(2)+3
      var bushMinDist = 24;
    } 

    for(var i=0; i<numBushes; i++){

      var bran = this.e.u.ran(3);
      if(bran===0){
        this.bush = new PIXI.Sprite(this.e.ui.t_tinyBush1);
      }else if(bran===1){
        this.bush = new PIXI.Sprite(this.e.ui.t_tinyBush2);
      }else if(bran===2){
        this.bush = new PIXI.Sprite(this.e.ui.t_tinyBush3);
      } 

      this.bush.anchor.x = .5
      this.bush.anchor.y = 1;
      // this.bush.anchor.y = 1;
      
      this.placer.rotation = this.e.u.ca(this.e.u.ran(360));
      this.bushDist = bushMinDist+this.e.u.ran(20);
      // this.bushDist = bushMinDist;

      this.bush.position.x = refBush.position.x + (this.bushDist * Math.cos(this.placer.rotation));
      this.bush.position.y = refBush.position.y - refBush.height/2 + (this.bushDist * Math.sin(this.placer.rotation) +10);
      // this.bush.position.y = refBush.position.y + (this.bushDist * Math.sin(this.placer.rotation)) - (refBush.height/2) +10;

      var isOk=true;

      for(var j=0; j<this.bushes.length; j++){

        if(this.bushes[i]!==this.refBush){
          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushes[j].position.x, this.bushes[j].position.y )<45){
            isOk = false;
          }
        }
        
      }
      
      for(var j=0; j<this.bushesMed.length; j++){

        if(this.bushesMed[j]!==this.refBush){
          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushesMed[j].position.x, this.bushesMed[j].position.y )<30){
            isOk = false;
          }
        }

      }
      
      for(var j=0; j<this.bushesSmall.length; j++){

        if(this.bushesSmall[j]!==this.refBush){
          if(this.e.u.getDistance(this.bush.position.x, this.bush.position.y, this.bushesSmall[j].position.x, this.bushesSmall[j].position.y )<20){
            isOk = false;
          }
        }

      }
      
      if(isOk===true){
        this.mainCont.addChild(this.bush);
        this.zLevs.push(this.bush);
      }
      
    }

  }

  update(){

    this.shadowLayer.alpha = this.t.shadowStrength - this.t.lightningShadStrength;

    this.cloudLayer.position.x = this.playerCont.position.x*-.15
    this.cloudLayer.position.y = this.playerCont.position.y*-.15

    this.zLevSkip+=this.e.dt;
    if(this.zLevSkip>=.02){

      this.zLevSkip=0;

      this.zLevs2 = [];
      
      for(var i=0; i<this.zLevs.length; i++){

        if(this.zLevs[i].position.x<2000){

          this.zLevs[i].zIndex = Math.round(this.zLevs[i].position.y+1250);
          
          // this.zLevs[i].zDist = this.e.u.getDistance(this.playerCont.position.x, this.playerCont.position.y, this.zLevs[i].position.x, this.zLevs[i].position.y );
          // this.zLevs2.push(this.zLevs[i])
  
        }

      }

      // this.zLevs2.sort(function(a, b) {
      //   return a.zDist - b.zDist;
      // });
      
      // console.log("----------------------")

      // console.log(this.zLevs.length);

      // for(var i=0; i<30; i++){

      //   this.zLevs2[i].zIndex = Math.round(this.zLevs[i].position.y+1250);

      //   // console.log(this.zLevs2[i].zDist)

      // }


    }
    

    // console.log(this.playerCont.position.y)

    document.getElementById("feedback").innerHTML = this.action+"";

    if(this.action==="set"){

      this.action="instructions";
      this.gameTime=0;

      this.e.ui.build();

      this.pause=false;

    }else if(this.action==="instructions"){

      this.hand2.alpha=0;

      this.mainCont.position.x = Math.round(window.innerWidth/2)
      this.mainCont.position.y = Math.round(window.innerHeight/2)

    }else if(this.action==="game start"){

      
      this.e.s.p("select")

      this.e.s.musicLoop.loop = true;
      this.e.s.musicLoop.play();
      this.musicLoopVolume = 0;

      this.action="game"

    }else if(this.action==="game"){

      if(this.musicLoopVolume < 1 && this.e.musicOn===true){
        this.musicLoopVolume += this.e.dt*.4;
      }

      this.e.s.musicLoop.volume(this.musicLoopVolume);
      console.log(this.musicLoopVolume)

      this.hand2.alpha=1;

      // console.log(this.mainCont.position.x+" / "+this.mainCont.position.y)

      if(this.gameTime>300){
        this.hasWon=true;
        this.e.ui.winText.alpha=1;
        if(this.wonCount===0){
          for(var i=0; i<this.enemies.length; i++){
            this.enemies[i].life=0;
          }
        }
        this.wonCount+=this.e.dt;
        if(this.wonCount>3){
          this.action="win start"
        }
      }

      if(this.gameTime>300){
        this.gameTime=300;
      }

      if(this.pause===false){
          
        var lerpx = Math.round(window.innerWidth/2) + (this.playerCont.position.x*-this.zoomScale);
        var lerpy = Math.round(window.innerHeight/2) + (this.playerCont.position.y*-this.zoomScale);

        this.mainCont.position.x = this.e.u.lerp(this.mainCont.position.x, lerpx, .1)
        this.mainCont.position.y = this.e.u.lerp(this.mainCont.position.y, lerpy, .1)

        var np = this.powerUps.length;

        if(np===0){
          this.levCoinAmount=5;
        }else if(np===1){
          this.levCoinAmount=10;
        }else if(np===2){
          this.levCoinAmount=20;
        }else if(np===3){
          this.levCoinAmount=25;
        }else if(np===4){
          this.levCoinAmount=30;
        }else if(np===5){
          this.levCoinAmount=40;
        }else if(np===6){
          this.levCoinAmount=50;
        }else if(np===7){
          this.levCoinAmount=60;
        }else if(np===8){
          this.levCoinAmount=70;
        }else if(np===9){
          this.levCoinAmount=80;
        }else if(np===10){
          this.levCoinAmount=90;
        }else if(np===11){
          this.levCoinAmount=100;
        }else if(np===12){
          this.levCoinAmount=120;
        }else if(np===13){
          this.levCoinAmount=140;
        }else if(np===14){
          this.levCoinAmount=160;
        }else if(np===15){
          this.levCoinAmount=180;
        }else if(np===16){
          this.levCoinAmount=200;
        }else if(np===17){
          this.levCoinAmount=220;
        }else if(np===18){
          this.levCoinAmount=240;
        }else if(np===19){
          this.levCoinAmount=260;
        }else{
          this.levCoinAmount=280;
        }

        this.mf = .35 * this.masterSpeed; // creation rate - lower for more difficulty
        this.sf = .5 * this.masterSpeed; // speed - higher for more difficulty

        var lt = 20;

    
        if(this.gameTime<lt*1){

          this.enemyLim=.7*this.mf;
          this.enemySpeed=.000025*this.sf;
          this.enemyLife=10;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=1;
          this.gameLev=1;
          this.enBulSpeed=50;
          this.enBulLim=3;
          this.maxEnemies=20;
          

        }else if(this.gameTime<lt*2){

          this.enemyLim=.65*this.mf;
          this.enemySpeed=.000035*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=2;
          this.gameLev=2;
          this.enBulSpeed=70;
          this.enBulLim=3;
          this.maxEnemies=25;

        }else if(this.gameTime<lt*3){

          this.enemyLim=.575*this.mf;
          this.enemySpeed=.00004*this.sf;
          this.enemyMinLevel=2;
          this.enemyMaxLevel=2;
          this.gameLev=3;
          this.enBulSpeed=80;
          this.enBulLim=3;
          this.maxEnemies=30;

          // ----- 1 MINUTE ------------------------------------------------------------

        }else if(this.gameTime<lt*4){

          this.enemyLim=.4*this.mf;
          this.enemySpeed=.000045*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=3;
          this.gameLev=4;
          this.enBulSpeed=90;
          this.enBulLim=2.75;
          this.maxEnemies=35;

        }else if(this.gameTime<lt*5){

          this.enemyLim=.35*this.mf;
          this.enemySpeed=.00005*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=3;
          this.gameLev=5;
          this.enBulSpeed=100;
          this.enBulLim=2.5;
          this.maxEnemies=40;

        }else if(this.gameTime<lt*6){

          this.enemyLim=.3*this.mf;
          this.enemySpeed=.00006*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=4;
          this.gameLev=6;
          this.enBulSpeed=110;
          this.enBulLim=2.25;
          this.maxEnemies=50;

          // ----- 2 MINUTE ------------------------------------------------------------

        }else if(this.gameTime<lt*7){

          this.enemyLim=.275*this.mf;
          this.enemySpeed=.00007*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=4;
          this.gameLev=7;
          this.enBulSpeed=120;
          this.enBulLim=2;
          this.maxEnemies=60;

        }else if(this.gameTime<lt*8){

          this.enemyLim=.25*this.mf;
          this.enemySpeed=.0000725*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=5;
          this.gameLev=8;
          this.enBulSpeed=130;
          this.enBulLim=1.75;
          this.maxEnemies=70;

        }else if(this.gameTime<lt*9){

          this.enemyLim=.225*this.mf;
          this.enemySpeed=.000075*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=9;
          this.enBulSpeed=140;
          this.enBulLim=1.5;
          this.maxEnemies=80;

          // ----- 3 MINUTE ------------------------------------------------------------

        }else if(this.gameTime<lt*10){

          this.enemyLim=.2*this.mf;
          this.enemySpeed=.0000775*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=10;
          this.enBulSpeed=150;
          this.enBulLim=1.25;
          this.maxEnemies=90;

        }else if(this.gameTime<lt*11){

          this.enemyLim=.175*this.mf;
          this.enemySpeed=.00008*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=11;
          this.enBulSpeed=160;
          this.enBulLim=1;
          this.maxEnemies=200;

        }else if(this.gameTime<lt*12){

          this.enemyLim=.165*this.mf;
          this.enemySpeed=.000085*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=12;
          this.enBulSpeed=170;
          this.enBulLim=1;

          // ----- 4 MINUTE ------------------------------------------------------------

        }else if(this.gameTime<lt*13){

          this.enemyLim=.15*this.mf;
          this.enemySpeed=.00009*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=13;
          this.enBulSpeed=180;
          this.enBulLim=1;

        }else if(this.gameTime<lt*14){

          this.enemyLim=.125*this.mf;
          this.enemySpeed=.000095*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=14;
          this.enBulSpeed=190;
          this.enBulLim=1;

        }else if(this.gameTime<lt*15){

          this.enemyLim=.125*this.mf;
          this.enemySpeed=.0001*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=15;
          this.enBulSpeed=200;
          this.enBulLim=1;

          // ----- 5 MINUTE ------------------------------------------------------------

        }else if(this.gameTime<lt*16){

          this.enemyLim=.1*this.mf;
          this.enemySpeed=.0001*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=16;
          this.enBulSpeed=210;
          this.enBulLim=1;

        }else if(this.gameTime<lt*17){

          this.enemyLim=.075*this.mf;
          this.enemySpeed=.0001*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=17;
          this.enBulSpeed=220;
          this.enBulLim=1;

        }else if(this.gameTime<lt*18){

          this.enemyLim=.075*this.mf;
          this.enemySpeed=.0001*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=18;
          this.enBulSpeed=230;
          this.enBulLim=1;

          // ----- 6 MINUTE ------------------------------------------------------------

        }else if(this.gameTime<lt*19){

          this.enemyLim=.075*this.mf;
          this.enemySpeed=.0001*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=19;
          this.enBulSpeed=240;
          this.enBulLim=1;

        }else{

          this.enemyLim=.125*this.mf;
          this.enemySpeed=.00011*this.sf;
          this.enemyMinLevel=1;
          this.enemyMaxLevel=6;
          this.gameLev=20;
          this.enBulSpeed=250;
          this.enBulLim=1;

        }

        this.level=this.gameTime/lt
        if(this.saveLevel!==this.gameLev){

          console.log("level up")

          this.levShowText.text = "Lev: "+this.gameLev;

          this.levShowText.alpha = 0;
          this.levShowText.position.y=-18;
          gsap.to(  this.levShowText, {alpha: 1,  duration: .5, ease: "sine.out"});
          gsap.to(  this.levShowText.position, {y: -25,  duration: .5, ease: "sine.out"});

          this.showLevCount = 3.5;
          this.e.s.p("howl")

        }
        this.saveLevel=this.gameLev;

        this.showLevCount-=this.e.dt;
        if(this.showLevCount<=0 && this.levShowText.alpha===1){
          this.showLevCount=0;
          gsap.to(  this.levShowText, {alpha: 0,  duration: 2, ease: "linear"});
        }

        this.enBulSpeed=100;

        this.controls();
        this.enemyControls();
        this.coinControls();
        this.bushControls();
        this.boneControl();

        this.enemyBulletControls()

        this.starControls();

        this.e.ui.scoreText.text = this.score+"";

        //-----------------------------------------------------------------------------------------------------------------------

        this.gameTime+=this.e.dt;

        //left UI

        var mins = Math.floor(this.gameTime/60);
        var secs = Math.round(this.gameTime - (mins*60));
        var secs2 = secs+"";
        if(secs2.length===1){
          secs2 = "0"+secs2;
        }

        this.myTime = mins+":"+secs2;

        this.e.ui.timeText.text = mins+":"+secs2;
        this.e.ui.levText.text = this.gameLev;
        this.e.ui.leftRedBar.width = 50 + ((110/20)*this.gameLev);

        //right UI

        this.e.ui.coinText.text = this.coinAmount;
        this.lp = this.coinAmount/this.levCoinAmount;
        this.e.ui.rightRedBar.width = 55 + (110*this.lp);

        if(this.e.ui.rightRedBar.width>165){
          this.e.ui.rightRedBar.width=165;
        }

        //-----------------------------------------------------------------------------------------------------------------------

      }

    }else if(this.action==="power up start"){

      this.e.s.p("select")

      // pause enemy physics

      for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].phys.isStatic = true;

        var enDist = this.e.u.getDistance(this.playerCont.position.x, this.playerCont.position.y, this.enemies[i].enCont.position.x, this.enemies[i].enCont.position.y);
        
        if(enDist<100){
          this.enemies[i].life=0;
        }
      }

      //-------------------------------------------

      this.e.ui.powerCont.alpha = 1;

      if(this.allPowerUps===undefined){

        this.allPowerUps = [
          "fasterShot", "biggerShot", "extraShot",  "splinter", "backwardsShot",
          "ninjaStar", "fireballs", "bombs",  "lightningStrike", "freeze",
          "footSpeed", "heal", "magnet" ];
      }

      this.allPowerUps2 = [];

      for(var i=0; i<this.allPowerUps.length; i++){

        var tRan = this.e.u.ran(2)
        var tRan2 = this.e.u.ran(3)
  
        if(this.allPowerUps[i]==="extraShot2" && this.playerLevel<6){

          // dont add extraShot2

        }else if(this.allPowerUps[i]==="extraShot3" && this.playerLevel<9){

          // dont add extraShot3

        }else if(this.allPowerUps[i]==="extraShot4" && this.playerLevel<12){

          // dont add extraShot4

        }else if(this.allPowerUps[i]==="extraShot5" && this.playerLevel<15){

          // dont add extraShot5

        }else if(
          
          this.allPowerUps[i]==="extraShot" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="extraShot2" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="extraShot3" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="extraShot4" && this.totalShotPowerUps >= 5 && tRan===0 ||

          this.allPowerUps[i]==="biggerShot" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="biggerShot2" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="biggerShot3" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="biggerShot4" && this.totalShotPowerUps >= 5 && tRan===0 ||
          
          this.allPowerUps[i]==="fasterShot" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="fasterShot2" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="fasterShot3" && this.totalShotPowerUps >= 5 && tRan===0 ||
          this.allPowerUps[i]==="fasterShot4" && this.totalShotPowerUps >= 5 && tRan===0 

          ){

          // prevent too many shot power ups 1
          console.log("PREVENT POWER UP 1")

        }else if(

          this.allPowerUps[i]==="extraShot" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="extraShot2" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="extraShot3" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="extraShot4" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||

          this.allPowerUps[i]==="biggerShot" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="biggerShot2" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="biggerShot3" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="biggerShot4" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          
          this.allPowerUps[i]==="fasterShot" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="fasterShot2" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="fasterShot3" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 ||
          this.allPowerUps[i]==="fasterShot4" && this.totalShotPowerUps >= 8 && tRan===0 && tRan===1 

        ){

          // prevent too many shot power ups 2
          console.log("PREVENT POWER UP 2")

        }else{

          this.allPowerUps2.push( this.allPowerUps[i] );

        }

      }

      this.currentPowers=[];

      console.log("choose:");

      for(var i=0; i<this.e.ui.powerPics.length; i++){

        var myPower = this.e.u.apr(this.allPowerUps2);
        this.currentPowers.push(myPower);

        this.e.ui.puBack._zIndex = 100000

        this.e.ui.powerPics[i].texture = this.e.ui.getPowerIcon(myPower, i);
        this.e.ui.powerPics[i].zIndex = 99000;

        var b = this.e.ui.powerButs[i];
        b.interactive = true;
        b.buttonMode = true;

        console.log("ADD THIS POWER:");
        console.log(myPower);

      }

      gsap.globalTimeline.pause();

      this.e.s.p("powerUp")

      this.action="power up wait"

    }else if(this.action==="power up wait"){

      // wait for click

    }else if(this.action==="power up out"){

      gsap.globalTimeline.resume();

      // make a list of power ups

      this.powerUps.push( this.currentPowers[this.powerPick] );

      // remove the picked power up from original list

      for(var i=0; i<this.allPowerUps.length; i++){

        if( this.currentPowers[this.powerPick] === this.allPowerUps[i] ){

          this.allPowerUps.splice(i, 1);

        }

      }

      //-----------------------------------------------------------

      // apply all power ups

      if(this.currentPowers[this.powerPick]==="extraShot"){

        this.shotNumber=2;
        this.allPowerUps.push("extraShot2");
        this.addIcon("extraShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="extraShot2"){

        this.shotNumber=3;
        this.allPowerUps.push("extraShot3");
        this.addIcon("extraShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="extraShot3"){

        this.shotNumber=4;
        this.allPowerUps.push("extraShot4");
        this.addIcon("extraShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="extraShot4"){

        this.shotNumber=5;
        this.addIcon("extraShot");
        this.totalShotPowerUps+=1;

        //-----------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="fasterShot"){

        this.shootLim=.3;
        this.allPowerUps.push("fasterShot2");
        this.addIcon("fasterShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="fasterShot2"){

        this.shootLim=.266;
        this.allPowerUps.push("fasterShot3");
        this.addIcon("fasterShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="fasterShot3"){

        this.shootLim=.233;
        this.allPowerUps.push("fasterShot4");
        this.addIcon("fasterShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="fasterShot4"){

        this.shootLim=.2;
        this.addIcon("fasterShot");
        this.totalShotPowerUps+=1;

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="biggerShot"){

        this.bulletWidth=2;
        this.bulletDamage=13;
        this.allPowerUps.push("biggerShot2");
        this.addIcon("biggerShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="biggerShot2"){

        this.bulletWidth=3;
        this.bulletDamage=17;
        this.allPowerUps.push("biggerShot3");
        this.addIcon("biggerShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="biggerShot3"){

        this.bulletWidth=4;
        this.bulletDamage=20;
        this.allPowerUps.push("biggerShot4");
        this.addIcon("biggerShot");
        this.totalShotPowerUps+=1;

      }else if(this.currentPowers[this.powerPick]==="biggerShot4"){

        this.bulletWidth=5;
        this.bulletDamage=23;
        this.addIcon("biggerShot");
        this.totalShotPowerUps+=1;

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="footSpeed"){

        this.playerSpeed=90;
        this.allPowerUps.push("footSpeed2");
        this.addIcon("footSpeed");

      }else if(this.currentPowers[this.powerPick]==="footSpeed2"){

        this.playerSpeed=120;
        this.addIcon("footSpeed");

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="splinter"){

        this.splinter=true;
        this.addIcon("splinter");

      }else if(this.currentPowers[this.powerPick]==="backwardsShot"){

        this.backwardsShot=true;
        this.addIcon("backwardsShot");

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="heal"){

        this.life+=1;
        this.allPowerUps.push("heal2");
        this.addIcon("heal");

        if(this.life>4){
          this.life=4;
        }

      }else if(this.currentPowers[this.powerPick]==="heal2"){

        this.life+=1;
        this.addIcon("heal");

        if(this.life>4){
          this.life=4;
        }

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="magnet"){

        this.magnetDistance = 90;
        this.allPowerUps.push("magnet2");
        this.addIcon("magnet");

      }else if(this.currentPowers[this.powerPick]==="magnet2"){

        this.magnetDistance = 120;
        this.addIcon("magnet");

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="ninjaStar"){

        this.starConts[0].active = true;
        this.allPowerUps.push("ninjaStar2");
        this.addIcon("ninjaStar");

      }else if(this.currentPowers[this.powerPick]==="ninjaStar2"){

        this.starConts[1].active = true;
        this.allPowerUps.push("ninjaStar3");
        this.addIcon("ninjaStar");

      }else if(this.currentPowers[this.powerPick]==="ninjaStar3"){

        this.starConts[2].active = true;
        this.addIcon("ninjaStar");

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="fireballs"){

        this.fireBallShots=1;
        this.allPowerUps.push("fireballs2");
        this.addIcon("fireballs");

      }else if(this.currentPowers[this.powerPick]==="fireballs2"){

        this.fireBallShots=2;
        this.allPowerUps.push("fireballs3");
        this.addIcon("fireballs");

      }else if(this.currentPowers[this.powerPick]==="fireballs3"){

        this.fireBallShots=3;
        this.addIcon("fireballs");

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="lightningStrike"){

        this.lightning=1;
        this.allPowerUps.push("lightningStrike2");
        this.addIcon("lightningStrike");

      }else if(this.currentPowers[this.powerPick]==="lightningStrike2"){

        this.lightning=2;
        this.allPowerUps.push("lightningStrike3");
        this.addIcon("lightningStrike");

      }else if(this.currentPowers[this.powerPick]==="lightningStrike3"){

        this.lightning=3;
        this.addIcon("lightningStrike");

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="bombs"){

        this.bombs=1;
        this.allPowerUps.push("bombs2");
        this.addIcon("bombs");

      }else if(this.currentPowers[this.powerPick]==="bombs2"){

        this.bombs=2;
        this.allPowerUps.push("bombs3");
        this.addIcon("bombs");

      }else if(this.currentPowers[this.powerPick]==="bombs3"){

        this.bombs=3;
        this.addIcon("bombs");

        //-------------------------------------------------------

      }else if(this.currentPowers[this.powerPick]==="freeze"){

        this.freeze=1;
        this.allPowerUps.push("freeze2");
        this.addIcon("freeze");

      }else if(this.currentPowers[this.powerPick]==="freeze2"){

        this.freeze=2;
        this.addIcon("freeze");

      }

      //------------------------------------------

      // make enemies work atain

      for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].phys.isStatic = false;
      }

      //------------------------------------------

      // hide the power buttons

      for(var i=0; i<this.e.ui.powerButs.length; i++){

        var b = this.e.ui.powerButs[i];
        b.interactive = false;
        b.buttonMode = false;

      }

      this.e.ui.powerCont.alpha=0;

      //------------------------------------------

      this.playerLevel+=1;

      console.log(this.playerLevel)

      this.coinAmount = 0;
      this.action="game"

    }else if(this.action==="win start"){

      // this.e.s.p("deathSong")
      this.musicLoopVolume = 0;
      this.e.s.musicLoop.volume(this.musicLoopVolume);

      this.playerCont.alpha=0;
      this.e.ui.playerDeath.ani = this.e.ui.wonAni;
      this.e.ui.playerDeath.alpha=1;
      
      gsap.to(  this.e.ui.death, {alpha: 1,  duration: 2, ease: "linear"});

      this.count=0;
      this.action="death"

    }else if(this.action==="death start"){

      this.e.s.p("deathSong")
      this.musicLoopVolume = 0;
      this.e.s.musicLoop.volume(this.musicLoopVolume);

      this.playerCont.alpha=0;
      this.e.ui.playerDeath.alpha=1;
      gsap.to(  this.e.ui.death, {alpha: 1,  duration: 2, ease: "linear"});

      this.count=0;
      this.action="death"

    }else if(this.action==="death"){

      this.count+=this.e.dt;
      if(this.count>3){
        this.count=0;
        if(this.hasWon===true){
          this.e.ui.playerDeath.ani = this.e.ui.wonAni;
        }else{
          this.e.ui.playerDeath.ani = this.e.ui.deathAni2;
          this.e.s.p("hurt")
        }
        this.action="death move"
      }

    }else if(this.action==="death move"){

      gsap.to(  this.t, {deathOffset: 200, duration: 2, delay: 1.5, ease: "sine.out"});
      this.action="death moving"

    }else if(this.action==="death moving"){

      this.count+=this.e.dt;
      if(this.count>4){
        this.count=0;
        this.action="death fade in"
      }

    }else if(this.action==="death fade in"){

      gsap.to(  this.e.ui.scoreCont, {alpha: 1, duration: 1, ease: "sine.out"});

      this.e.ui.bottomText.text = "TIME: "+this.myTime+"- LEVEL: "+this.gameLev+" - POWER UPS: "+this.iconCount

      this.action="death fading in"

    }else if(this.action==="death fading in"){

      // this.killTotal=3243
      // this.coinTotal=4533

      this.count+=this.e.dt;
      if(this.count>2){
        this.count=0;
        this.action="tally0"
      }

    }else if(this.action==="tally0"){

      var meterLength = (372*this.gameTime)/300;

      gsap.to(  this.e.ui.meterBack, {width: meterLength, duration: 2, ease: "sine.out"});
      this.action="tally0 wait"

    }else if(this.action==="tally0 wait"){

      this.count+=this.e.dt;
      if(this.count>2){
        this.count=0;
        this.action="tally s wait0"
      }

      this.tCount+=this.e.dt;
      if(this.tCount>.1){
        this.tCount=0;
        this.e.s.p("tallyRight")
      }

    }else if(this.action==="tally s wait0"){

      this.count+=this.e.dt;
      if(this.count>1){
        this.count=0;
        this.action="tally1"
      }

    }else if(this.action==="tally1"){

      gsap.to(  this.t, {tally1: this.killTotal, duration: 2, ease: "sine.out"});
      this.action="tally1 wait"

    }else if(this.action==="tally1 wait"){

      this.count+=this.e.dt;
      if(this.count>2){
        this.count=0;
        this.action="tally s wait"
      }

      this.tCount+=this.e.dt;
      if(this.tCount>.1){
        this.tCount=0;
        this.e.s.p("tallyRight")
      }

      this.e.ui.totalText.text = Math.round(this.t.tally1+this.t.tally2);
      this.e.ui.rightText.text = Math.round(this.t.tally1)+"\n\n"+Math.round(this.t.tally2);

    }else if(this.action==="tally s wait"){

      this.count+=this.e.dt;
      if(this.count>1){
        this.count=0;
        this.action="tally2"
      }

    }else if(this.action==="tally2"){

      gsap.to(  this.t, {tally2: this.coinTotal, duration: 2, ease: "sine.out"});
      this.action="tally2 wait"

    }else if(this.action==="tally2 wait"){

      this.count+=this.e.dt;
      if(this.count>2){
        this.count=0;
        this.action="game over"
      }

      this.tCount+=this.e.dt;
      if(this.tCount>.1){
        this.tCount=0;
        this.e.s.p("tallyRight")
      }

      this.e.ui.totalText.text = Math.round(this.t.tally1+this.t.tally2);
      this.e.ui.rightText.text = Math.round(this.t.tally1)+"\n\n"+Math.round(this.t.tally2);

    }else if(this.action==="game over"){

    }

    if(this.e.ui.faderRed.alpha>0){
      this.e.ui.faderRed.alpha-=this.e.dt*.25;
    }

  }

  addIcon(type){

      if(type==="backwardsShot"){
        var myType = this.e.ui.t_i_backwardsShot;
      }else if(type==="biggerShot"){
        var myType = this.e.ui.t_i_biggerShot;
      }else if(type==="bombs"){
        var myType = this.e.ui.t_i_bombs;
      }else if(type==="extraShot"){
        var myType = this.e.ui.t_i_extraShot;
      }else if(type==="fireballs"){
        var myType = this.e.ui.t_i_fireballs;
      }else if(type==="fasterShot"){
        var myType = this.e.ui.t_i_fasterShot;
      }else if(type==="footSpeed"){
        var myType = this.e.ui.t_i_footSpeed;
      }else if(type==="freeze"){
        var myType = this.e.ui.t_i_freeze;
      }else if(type==="heal"){
        var myType = this.e.ui.t_i_heal;
      }else if(type==="lightningStrike"){
        var myType = this.e.ui.t_i_lightningStrike;
      }else if(type==="magnet"){
        var myType = this.e.ui.t_i_magnet;
      }else if(type==="ninjaStar"){
        var myType = this.e.ui.t_i_ninjaStar;
      }else if(type==="splinter"){
        var myType = this.e.ui.t_i_splinter;
      } 

      var num = this.iconCount;
      this.e.ui.icons[num].texture = myType;
      this.e.ui.icons[num].alpha = 1;

      this.iconCount+=1

  }

  bushControls(){
    
    // for(var i=0; i<this.bushes.length; i++){

    //   this.bushes[i].rotation +=this.e.dt * 6;
    //   this.bushes[i].shad.rotation +=this.e.dt * 6;

    // }


    // for(var i=0; i<this.bushes.length; i++){

    //   if(this.e.u.getDistance( this.bushes[i].position.x, this.bushes[i].position.y, this.playerCont.position.x, this.playerCont.position.y ) < 50 && this.playerAction==="go"){

    //     this.playerAction = "hurt start"

    //   }

    // }

  }

  starControls(){

    for(var i=0; i<this.starConts.length; i++){

      var s = this.starConts[i];

      if(s.active===true){

        s.position.x = this.e.u.lerp(s.position.x, this.playerCont.position.x, .05);
        s.position.y = this.e.u.lerp(s.position.y, this.playerCont.position.y, .05);

        s.zIndex = 5000;

        // s.position.x = this.playerCont.position.x
        // s.position.y = this.playerCont.position.y

        s.rotation+=this.e.dt*3;
        s.sprite.rotation+=this.e.dt*10;

      }else{

        s.position.x = -10000;
        s.position.y = -10000;

      }

    }

  }

  enemyBulletControls(){

    if(this.setEnemyBullets===undefined){

      this.enemyBullets = [];

      this.enBulCount=0;
      this.enBulSpeed = 50;
      this.enBulLim=3;

      this.setEnemyBullets=true;

      for(var i=0; i<20; i++){

        // sprite

        this.enSprite = new PIXI.Sprite(this.e.ui.t_enBullet);
        this.enSprite.anchor.x = this.enSprite.anchor.y = .5;
        this.enSprite._zIndex=3001;
        this.mainCont.addChild(this.enSprite);

        this.enSprite.action="ready";

        this.enemyBullets.push(this.enSprite);

        this.enSprite.ani = this.e.ui.enfbAni;
        this.enSprite.aniSpeed = .01;
        this.e.ui.animatedSprites.push(this.enSprite);

        this.zLevs.push(this.enSprite)

      }

    }

    if(this.disableAttacks===false){
      this.enBulCount+=this.e.dt;
    }
    if(this.enBulCount>this.enBulLim){
      this.enBulCount=0;
      // console.log("enbull2")

      for(var i=0; i<this.enemyBullets.length; i++){

        if(this.enemyBullets[i].action==="ready"){
          this.enemyBullets[i].action="place";
          i=10000;
        }

      }
    }

    for(var i=0; i<this.enemyBullets.length; i++){

      var eb = this.enemyBullets[i];

      if(eb.action==="ready"){

        eb.position.x = 10000;
        eb.position.y = 10000;

        eb.scale.x = eb.scale.y = 1

        this.bulletStartDist = 500;

        eb.totalTime = 0;

        eb.points = [];
        eb.pointCount=0;

      }else if(eb.action==="place"){

        // console.log("en bul")

        this.placer.rotation = this.e.u.ca(this.e.u.ran(360));

        eb.position.x = this.playerCont.position.x + (this.bulletStartDist * Math.cos(this.placer.rotation));
        eb.position.y = this.playerCont.position.y + (this.bulletStartDist * Math.sin(this.placer.rotation));

        // eb.position.x = Math.abs(this.playerCont.position.x + this.e.u.nran(300));

        // var xpos = 300 - (this.playerCont.position.x-eb.position.x);
        // var rr = this.e.u.ran(2);
        // if(rr===0){
        //   eb.position.y = this.playerCont.position.y + xpos;
        // }else{
        //   eb.position.y = this.playerCont.position.y - xpos;
        // }

        var direction = new PIXI.Point(this.playerCont.position.x - eb.position.x, this.playerCont.position.y - eb.position.y);
        var distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        direction.x /= distance;
        direction.y /= distance;

        eb.xspeed = direction.x * this.enBulSpeed
        eb.yspeed = direction.y * this.enBulSpeed;

        console.log("fbd "+this.e.u.getDistance(this.playerCont.position.x, this.playerCont.position.y, eb.position.x, eb.position.y));

        eb.action="move"

      }else if(eb.action==="move"){

        eb.pointCount+=this.e.dt;
        if(eb.pointCount>.25){
          eb.pointCount=0;

          var ebp = new Array();
          ebp.push(eb.position.x)
          ebp.push(eb.position.y)
          eb.points.push( ebp );
        }

        eb.alpha = 1;
        eb.zIndex=90000;

        eb.position.x += eb.xspeed*this.e.dt;
        eb.position.y += eb.yspeed*this.e.dt;

        if(this.e.u.getDistance(this.playerCont.position.x, this.playerCont.position.y, eb.position.x, eb.position.y - this.playerInnerCont.position.y )<=20){

          if(this.playerAction==="go"){

            console.log("enemy bullet hit "+ eb.totalTime+" / "+i+" / "+eb.alpha+" / "+eb.action)
            // console.log(this.playerCont.position.x+" / "+this.playerCont.position.y+" / "+eb.position.x+" / "+eb.position.y)

            // this.pause = true;

            console.log("point length: "+eb.points.length)

            for(var j=0; j<eb.points.length && j<50; j++){

              this.pointMarks[j].position.x = eb.points[j][0];
              this.pointMarks[j].position.y = eb.points[j][1];
              this.pointMarks[j].alpha = 0;

            }

            this.playerAction="hurt start"
            eb.action="ready"
            // eb.action="show"
          }
          

        }

        eb.totalTime+=this.e.dt;
        if(eb.totalTime>8 || this.hasWon===true){
          eb.totalTime=0;
            
          eb.position.x = 10000;
          eb.position.y = 10000;

          eb.action="ready";
        }

      }else if(eb.action==="show"){

        eb.alpha = .5
        eb.scale.x = eb.scale.y = 2

        eb.totalTime+=this.e.dt;
        if(eb.totalTime>5){
          eb.totalTime=0;
          eb.action="ready";
        }

      }

    }

  }

  enemyControls(){

    if(this.setEnemies===undefined){

      this.enemyCount=0;
      
      this.enemyStartDist=500;
      
      this.enemies=[];

      this.setEnemies=true;

      // make 
      
      for(var i=0; i<250; i++){

        // object

        this.enemy = new Object();

        // container

        this.enCont = new PIXI.Container();
        this.enCont.sortableChildren = true;
        this.mainCont.addChild(this.enCont);

        this.enInnerCont = new PIXI.Container();
        this.enInnerCont.sortableChildren = true;
        this.enCont.addChild(this.enInnerCont);

        this.enCont.zIndex=10;

        this.zLevs.push(this.enCont);

        // sprite

        this.enSprite = new PIXI.Sprite(this.e.ui.t_enemy1);
        this.enSprite.anchor.x = this.enSprite.anchor.y = .5;
        this.enSprite.zIndex=1;
        this.enInnerCont.addChild(this.enSprite);

        // dot

        // this.enGlow = new PIXI.Sprite(this.e.ui.white);
        // this.enGlow.anchor.x = this.enGlow.anchor.y = .5;
        // this.enGlow.width = this.enGlow.height = 5;
        // this.enGlow.alpha = .8;
        // this.enGlow.zIndex=511;
        // this.enCont.addChild(this.enGlow);

        // glow

        this.enGlow = new PIXI.Sprite(this.e.ui.t_enemyGlow);
        this.enGlow.anchor.x = this.enGlow.anchor.y = .5;
        this.enGlow.scale.x = this.enGlow.scale.y = .7;
        this.enGlow.alpha = .8;
        this.enGlow.zIndex=5;
        this.enInnerCont.addChild(this.enGlow);

        // shad

        this.enShad = new PIXI.Sprite(this.e.ui.t_enShad);
        this.enShad.anchor.x = this.enShad.anchor.y = .5;
        this.enShad.scale.x = this.enShad.scale.y = .7;
        this.enShad.alpha = .9;
        this.enShad.zIndex=0;
        this.enInnerCont.addChild(this.enShad);

        // flash

        this.enFlash = new PIXI.Sprite(this.e.ui.t_enemyFlash);
        this.enFlash.anchor.x = this.enFlash.anchor.y = .5;
        this.enFlash.alpha = 0;
        this.enFlash.zIndex=2;
        // this.enCont.addChild(this.enFlash);

        // ice

        this.enIce = new PIXI.Sprite(this.e.ui.t_enemyIce);
        this.enIce.anchor.x = this.enIce.anchor.y = .5;
        this.enIce.alpha = 0;
        this.enIce.zIndex=2;
        this.enInnerCont.addChild(this.enIce);

        // hand

        this.enHand = new PIXI.Sprite(this.e.ui.t_hand);
        this.enHand.anchor.x = this.enHand.anchor.y = .5;
        this.enHand.alpha=0;
        this.enHand.zIndex=2;
        this.enInnerCont.addChild(this.enHand);

        // physics ob

        this.enPhys = Matter.Bodies.circle( i*30, 0, 15);
        Matter.World.add(this.physEngine.world,[this.enPhys]);

        // set object refs
    
        this.enemy.action = "ready";
        this.enemy.life = 50;
        this.enemy.speedFade = 1;
        this.enemy.freezeCount = 0;

        this.enemy.enCont = this.enCont;
        this.enemy.enSprite = this.enSprite;
        this.enemy.hand = this.enHand;
        this.enemy.hit = this.enSprite;
        this.enemy.enGlow = this.enGlow;
        this.enemy.enShad = this.enShad;
        this.enemy.flash = this.enFlash;
        this.enemy.phys = this.enPhys;
        this.enemy.ice = this.enIce;

        this.enSprite.aniSpeed=.05;
        this.e.ui.animatedSprites.push(this.enSprite);

        this.enInnerCont.position.y=-20

        this.enemies.push(this.enemy);

      }

    }

    //----------------------------------

    if(this.onlyOneEnemy===undefined){
      // this.onlyOneEnemy=0;
    }

    if(this.enemiesAttacking<this.maxEnemies){
      
      if(this.disableAttacks===false && this.hasWon===false){
        this.enemyCount+=this.e.dt * this.masterSpeed;
      }
      if(this.enemyCount>this.enemyLim && this.onlyOneEnemy===undefined || this.onlyOneEnemy===0){

        // this.onlyOneEnemy+=1;

        this.enemyCount=0;

        for(var i=0; i<this.enemies.length; i++){
          if(this.enemies[i].action==="ready"){
            this.enemies[i].action="attack"
            i=1000;
          }
        }

      }

    }
      
    //----------------------------------

    this.enemiesAttacking = 0;

    for(var i=0; i<this.enemies.length; i++){

      var en = this.enemies[i];

      if(en.action==="ready"){

        en.enCont.position.x = 10000;
        en.enCont.position.y = 10000;
  
        en.phys.isSensor = true;
        en.phys.render.visible = false;

        en.fbDelay = 0;
        en.starDelay = 0;
        en.hurtCount = 0;

        en.blinkCount = 0;

      }else if(en.action==="attack"){

        var ranPlace = this.e.u.ran(2);
        ranPlace=1;

        if(ranPlace===0){

          // place at random angle

          this.placer.rotation = this.e.u.ca(this.e.u.ran(360));

          var startPos = {
            x : this.playerCont.position.x + this.enemyStartDist * Math.cos(this.placer.rotation),
            y : this.playerCont.position.y + this.enemyStartDist * Math.sin(this.placer.rotation)
          }

        }else{

          // place behind

          var startPos = {  x : 0, y : 0 };

          var enRight = 0;
          var enLeft = 0;
          var enUp = 0;
          var enDown = 0;

          for(var j=0; j<this.enemies.length; j++){

            if(this.enemies[j].action==="attacking"){
                
              if(this.enemies[j].enCont.position.x<this.playerCont.position.x){
                enLeft+=1;
              }else{
                enRight+=1;
              }

              if(this.enemies[j].enCont.position.y<this.playerCont.position.y){
                enUp+=1;
              }else{
                enDown+=1;
              }

            }

          }

          //

          // console.log(enLeft+" / "+enRight+" / "+enUp+" / "+enDown)

          var sides = new Array(enLeft, enRight, enUp, enDown);

          sides.sort(function(a, b){return b-a});

          if(sides[0]===enLeft){

            // console.log("left");
            startPos.x = this.playerCont.position.x+this.enemyStartDist;
            startPos.y = this.playerCont.position.y+this.e.u.nran(100);

          }else if(sides[0]===enRight){

            // console.log("right");
            startPos.x = this.playerCont.position.x-this.enemyStartDist;
            startPos.y = this.playerCont.position.y+this.e.u.nran(100);

          }else if(sides[0]===enUp){

            // console.log("up");
            startPos.x = this.playerCont.position.x+this.e.u.nran(100);
            startPos.y = this.playerCont.position.y+this.enemyStartDist;

          }else if(sides[0]===enDown){

            // console.log("down");
            startPos.x = this.playerCont.position.x+this.e.u.nran(100);
            startPos.y = this.playerCont.position.y-this.enemyStartDist;

          }

        }

        Matter.Body.setPosition(en.phys, startPos);
        Matter.Body.setVelocity(en.phys, { x: 0, y: 0 });

        en.phys.isSensor = false;
        en.phys.render.visible = true;

        gsap.killTweensOf( en );
        gsap.to( en, {speedFade: .3, duration: (this.e.u.ran(6)+6)/2, repeat: -1, yoyo: true, ease: "sine.out"});
        
        // enSprite
        en.level = this.e.u.ran(this.enemyMaxLevel)+1
        if(en.level<this.enemyMinLevel){
          en.level = this.enemyMinLevel
        }

        if(en.level===1){
          en.life=20;

          en.enSprite.aniSpeed = .1;
          en.enSprite.ani = this.e.ui.enemyA_Ani
          en.ice.texture = this.e.ui.t_enemy1_f;

          en.enGlow.position.y = -7;
          en.enGlow.position.x = -3;
          en.enShad.position.y = 17;
          en.enShad.width = 45*2
          en.enShad.height = 15*2
          en.enShad.alpha = 1

          en.type="A";

        }else if(en.level===2){

          en.life=30;

          en.enSprite.aniSpeed = .05;
          en.enSprite.ani = this.e.ui.enemyB_Ani;
          en.ice.texture = this.e.ui.t_enemy2_f;

          en.enGlow.position.y = -7;
          en.enGlow.position.x = -3;
          en.enShad.position.y = 17;
          en.enShad.width = 45*2
          en.enShad.height = 15*2
          en.enShad.alpha = 1

          en.type="B";

        }else if(en.level===3){

          en.life=40;

          en.enSprite.aniSpeed = .1;
          en.enSprite.ani = this.e.ui.enemyC_Ani;
          en.ice.texture = this.e.ui.t_enemy3_f;

          en.enGlow.position.y = -9;
          en.enGlow.position.x = -2;
          en.enShad.position.y = 18;
          en.enShad.width = 45*2
          en.enShad.height = 15*2
          en.enShad.alpha = 1

          en.type="C";

        }else if(en.level===4){

          en.life=60;

          en.enSprite.aniSpeed = .1;
          en.enSprite.ani = this.e.ui.enemyD_Ani;
          en.ice.texture = this.e.ui.t_enemy4_f;

          en.enGlow.position.y = -10;
          en.enGlow.position.x = 0;
          en.enShad.position.y = 18;
          en.enShad.width = 45*3
          en.enShad.height = 15*2
          en.enShad.alpha = 1

          en.type="D";

        }else if(en.level===5){

          en.life=90;

          en.enSprite.aniSpeed = .1;
          en.enSprite.ani = this.e.ui.enemyE_Ani;
          en.ice.texture = this.e.ui.t_enemy5_f;

          en.enGlow.position.y = -10;
          en.enGlow.position.x = 0;
          en.enShad.position.y = 18;
          en.enShad.width = 45*3
          en.enShad.height = 15*2
          en.enShad.alpha = 1

          en.type="E";

        }else if(en.level===6){

          en.life=120;

          en.enSprite.aniSpeed = .1;
          en.enSprite.ani = this.e.ui.enemyF_Ani;
          en.ice.texture = this.e.ui.t_enemy6_f;

          en.enGlow.position.y = -10;
          en.enGlow.position.x = -3;
          en.enShad.position.y = 17;
          en.enShad.width = 45*2
          en.enShad.height = 15*2
          en.enShad.alpha = 1

          en.type="F";

        }

        en.life+=this.level*4;

        en.action="attacking";

      }else if(en.action==="attacking"){

        this.enemiesAttacking+=1;

        //

        en.blinkCount+=this.e.dt;
        if( en.blinkCount>.1){
          en.blinkCount=0;
          if(en.enGlow.alpha===.7){
            en.enGlow.alpha=.5
          }else{
            en.enGlow.alpha=.7
          }
        }

        en.enCont.position.x = en.phys.position.x;
        en.enCont.position.y = en.phys.position.y;

        if(en.freezeCount<=0){

          if(en.enCont.position.x<this.playerCont.position.x){
            en.enCont.scale.x=-1;
          }else{
            en.enCont.scale.x=1;
          }
  
          en.hand.rotation = Math.atan2( this.playerCont.position.y - en.enCont.position.y, this.playerCont.position.x - en.enCont.position.x);

          var dx = this.playerCont.position.x - en.phys.position.x;
          var dy = this.playerCont.position.y - en.phys.position.y;
  
          Matter.Body.setVelocity(en.phys, { x: 0, y: 0 });
          Matter.Body.applyForce(en.phys, en.phys.position, {x: dx * this.enemySpeed * en.speedFade * this.masterSpeed, y: dy * this.enemySpeed * en.speedFade * this.masterSpeed} );
  
        }
  
        // bullet collision

        // this.splinter=true

        for(var j=0; j<this.bullets.length; j++){

          var b = this.bullets[j];
          if(b.action==="shooting"){

            if(this.e.u.getDistance( b.position.x, b.position.y, en.enCont.position.x, en.enCont.position.y - this.playerInnerCont.position.y  ) < 150){
              if(this.e.u.hitTest( b.hit, en.hit )===true && en.freezeCount<=0 && en.life>0){

                en.flash.alpha = 0;
                gsap.to( en.flash, {alpha: 0, duration: .5, ease: "linear"});

                en.life-=this.bulletDamage;
                b.action="shrink";
                if(en.life<=0){
                  this.setBones(en.enCont.position.x, en.enCont.position.y,en.type, 1)
                }
                // b.position.x=10000;

                // if(this.splinter===true && en.life<=0 && b.type!=="splinter"){
                if(this.splinter===true && en.life<=0 ){

                  var ranRot = this.e.u.ran(120);

                  for(var i=0; i<3; i++){
      
                    var b = this.makeBullet(this.e.u.ca( (i*120)+ranRot), this.bulletDamage, "splinter" );
                    if(b!==null){
                      b.position.x = en.enCont.position.x;
                      b.position.y = en.enCont.position.y;
                    }
                    
      
                  }
      
                }

              }

            }

          }

        }

        // star collision

        if(en.starDelay>0){
          en.starDelay-=this.e.dt;
        }

        for(var j=0; j<this.starConts.length; j++){

          var s = this.starConts[j];
          if(s.active===true && en.starDelay<=0){

            if(this.e.u.getDistance( s.position.x, s.position.y, en.enCont.position.x, en.enCont.position.y ) < 150){
              if(this.e.u.hitTest( s.sprite, en.hit )===true && en.freezeCount<=0){

                en.flash.alpha = 1;
                gsap.to( en.flash, {alpha: 0, duration: .5, ease: "linear"});

                if(this.sliceTime<=0){
                  this.sliceTime=.2
                  this.e.s.p("slice")
                }
                

                en.life-=20;
                en.starDelay = .75;
                if(en.life<=0){
                  this.setBones(en.enCont.position.x, en.enCont.position.y,en.type, 1)
                }
              }

            }

          }

        }

        // fireball collision

        if(en.fbDelay>0){
          en.fbDelay-=this.e.dt;
        }

        for(var j=0; j<this.fireBalls.length; j++){

          var s = this.fireBalls[j];
          if(en.fbDelay<=0){

            if(this.e.u.getDistance( s.position.x, s.position.y, en.enCont.position.x, en.enCont.position.y ) < 150){
              if(this.e.u.hitTest( s.sprite, en.hit )===true){
              // if(this.e.u.hitTest( s.sprite, en.hit )===true && en.freezeCount<=0){

                en.flash.alpha = 1;
                gsap.to( en.flash, {alpha: 0, duration: .5, ease: "linear"});

                en.life-=200;
                en.fbDelay = .75;
                if(en.life<=0){
                  this.setBones(en.enCont.position.x, en.enCont.position.y,en.type, 2)
                }
              }

            }

          }

        }

        // freeze

        if(this.e.u.hitTest( this.freezer, en.hit )===true && this.freezeEnemies>0 || this.e.u.hitTest( this.freezer2, en.hit )===true && this.freezeEnemies>0){

          en.freezeCount = 5;

        }
        
        en.freezeCount-=this.e.dt;

        if(en.freezeCount>0){
          en.ice.alpha = 1;
          en.enSprite.alpha = 0;
          en.phys.isStatic = true;
        }else{
          if(en.ice.alpha===1){
            en.phys.isStatic = false;
            en.enSprite.alpha = 1;
            en.ice.alpha = 0;
          }
        }

        // player collision

        if( this.e.u.getDistance( en.enCont.position.x, en.enCont.position.y, this.playerCont.position.x, this.playerCont.position.y ) < 30 && this.playerAction==="go" ){

          if(en.freezeCount<=0){
            this.playerAction="hurt start";
          }
          
        }

        // if killed

        if(en.life<=0){

          this.score+=1;
          this.killTotal+=1;

          if(this.enDeathCount<=0){
            
            this.enDeathCount=.2;
            this.e.s.p("enemyDeath")

          }

          // this.setBones(en.enCont.position.x, en.enCont.position.y,en.type, 1)
          this.enemyExplode(en.enCont.position.x, en.enCont.position.y)

          if(en.enCont.position.x<1250 && en.enCont.position.x>-1250 && en.enCont.position.y<1250 && en.enCont.position.y>-1250){
              
            for(var j=0; j<this.coins.length; j++){

              if(this.coins[j].action==="ready"){

                this.coins[j].position.x = en.enCont.position.x;
                this.coins[j].position.y = en.enCont.position.y;
                this.coins[j].action="out";
                j=10000;

              }

            }
    
          }
          
          en.action = "ready"

        }

      } 

    }

    this.enDeathCount-=this.e.dt;
    this.sliceTime-=this.e.dt;

  }

  boneControl(){

    if(this.bonesMade===undefined){

      this.boneCols = [];

      // bones type A

      for(var i=0; i<20; i++){

        this.boneCol = new Object();
        this.boneCol.action = "ready";
        this.boneCol.colCount = 0;
        this.boneCol.type = "A";
        this.boneCol.bones = [];

        this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_bone1));
        this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_bone2));
        this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_bone3));
        this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_bone4));
        this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_bone5));

        // this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_boneA1));
        // this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_boneA2));
        // this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_boneA3));
        // this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_boneA4));
        this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_boneA5));
        this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_boneA6));
        this.boneCol.bones.push( this.makeNewBone(this.e.ui.t_boneA7));

        this.boneCols.push(this.boneCol);

      }

      this.bonesMade=true;

    }

    for(var i=0; i<this.boneCols.length; i++){

      var b = this.boneCols[i];

      if(b.action==="ready"){

        for(var j=0; j<b.bones.length; j++){

          b.bones[j].position.x = 10000;
          b.bones[j].position.y = 10000;
          b.bones[j].alpha = 1;
          
        }

        b.colCount = 0;

      }else if(b.action==="set"){

        for(var j=0; j<b.bones.length; j++){

          b.bones[j].scale.x = b.bones[j].scale.y = 1;
          b.bones[j].count = 0;
          b.bones[j].alpha = 1;
          b.bones[j].shrink = false;

        }

        b.action="go"

      }else if(b.action==="go"){

        for(var j=0; j<b.bones.length; j++){

          b.bones[j].count+=this.e.dt;

          if(b.bones[j].count<1){

            b.bones[j].rotation += b.bones[j].xspeed*this.e.dt*2;
            b.bones[j].position.x += b.bones[j].xspeed*this.e.dt*25;
            b.bones[j].position.y += b.bones[j].yspeed*this.e.dt*25;
            b.bones[j].yspeed += 5*this.e.dt;
            
          }

        }

        b.colCount+=this.e.dt;
        if(b.colCount>3){
          
          b.colCount=0;
          b.action="ready";

        }

      }

    }

  }

  setBones(x,y,type,mult){

    for(var i=0; i<this.boneCols.length; i++){

      // if(this.boneCols[i].action==="ready" && this.boneCols[i].type===type){
      if(this.boneCols[i].action==="ready"){

        for(var j=0; j<this.boneCols[i].bones.length; j++){

          console.log(type)

          this.boneCols[i].bones[j].xspeed = this.e.u.nran(10)*mult;
          this.boneCols[i].bones[j].yspeed = -this.e.u.ran(10)*mult;
          this.boneCols[i].bones[j].position.x = x+this.e.u.nran(10);
          this.boneCols[i].bones[j].position.y = y+this.e.u.nran(10) - 20;

          gsap.to( this.boneCols[i].bones[j], {alpha: 0, duration: .25, delay: .75, ease: "linear"});

          this.boneCols[i].action = "set";

        }

        i=10000;

      }

    }


  }

  makeNewBone(type){
    this.bone = new PIXI.Sprite(type);
    this.bone.anchor.x = this.enGlow.anchor.y = .5;
    this.bone.scale.x = this.enGlow.scale.y = 3;
    this.bone.zIndex=25000;
    this.mainCont.addChild(this.bone);
    // this.zLevs.push(this.bone);
    return this.bone;
  }

  enemyExplode(x,y){
    
    for(var i=0; i<this.explosions.length; i++){

      if(this.explosions[i].action==="ready"){

        this.explosions[i].position.x = x;
        this.explosions[i].position.y = y - 20;
        this.explosions[i].action="set"

        i=10000;

      }

    }

  }

  enemyExplodeWhite(x,y){
    
    for(var i=0; i<this.explosionsWhite.length; i++){

      if(this.explosionsWhite[i].action==="ready"){

        this.explosionsWhite[i].position.x = x;
        this.explosionsWhite[i].position.y = y;
        this.explosionsWhite[i].action="set"

        i=10000;

      }

    }

  }

  

  coinControls(){

    if(this.setCoinControls===undefined){

      this.coins = [];
      this.setCoinControls=true;

      // make coins

      for(var i=0; i<800; i++){

        this.coin = new PIXI.Sprite(this.e.ui.t_coin);
        this.coin.anchor.x = this.coin.anchor.y = .5;
        this.coin.zIndex=1;
        this.coin.rotation = this.e.u.ca(45)
        this.mainCont.addChild(this.coin);

        this.coin.action="ready";
        this.coins.push(this.coin);
        
      }

    }

    for(var i=0; i<this.coins.length; i++){

      var c = this.coins[i];

      if(c.action==="ready"){

        c.alpha=0;

      }else if(c.action==="out"){

        c.alpha=1;

        if(this.e.u.getDistance(c.position.x, c.position.y, this.playerCont.position.x, this.playerCont.position.y) < this.magnetDistance ){

          c.action="move to player"

        }

      }else if(c.action==="move to player"){

        c.position.x = this.e.u.lerp(c.position.x, this.playerCont.position.x, .1 * this.masterSpeed);
        c.position.y = this.e.u.lerp(c.position.y, this.playerCont.position.y, .1 * this.masterSpeed);

        if(this.e.u.getDistance(c.position.x, c.position.y, this.playerCont.position.x, this.playerCont.position.y) < 10 ){

          this.score+=1;
          this.coinAmount += 1;
          this.coinTotal+=1;
          this.e.s.p("coin")
          c.action="ready"

        }

      } 

    }

  }

  controls(){

    if(this.setControls===undefined){

      this.playerAction="go"
      this.life=4;
      this.blinkCount=0;
      this.hurtCount=0;
      this.playerLevel=1;

      this.playerSpeed=60;
      // this.playerSpeed=120;
      this.xspeed=0;
      this.yspeed=0;
      this.speedIncrease=1000;
      this.speedDecrease=.8;

      this.shootCount=0;
      this.shootLim=.4;
      this.shootSpeed=500;
      this.bulletDamage=10;
      this.bulletWidth=1;

      this.setControls=true;
      this.bullets=[];

    }

    //-----------------------------------------------------------------------------------------

    // hearts

    for(var i=0; i<4; i++){
      if(i>=this.life){
        this.e.ui.hearts[i].texture=this.e.ui.t_heartEmpty;
      }else{
        this.e.ui.hearts[i].texture=this.e.ui.t_heart;
      }
    }

    // player actions

    if(this.playerAction==="go"){

      this.player.alpha = 1;

    }else if(this.playerAction==="hurt start"){

      this.e.s.p("hurt")

      this.life-=1;

      this.e.ui.faderRed.alpha=.5;
      this.playerAction="hurt";

      if(this.life<=0){
        this.action="death start"
      }

    }else if(this.playerAction==="hurt"){

      if(this.e.ui.faderRed.alpha>0){
        this.e.ui.faderRed.alpha-=this.e.dt*.25;
      }

      this.blinkCount+=this.e.dt;
      if(this.blinkCount>.025){

        this.blinkCount=0;

        if(this.player.alpha===1){
          this.player.alpha=.3;
        }else{
          this.player.alpha=1;
        }

      }

      this.hurtCount+=this.e.dt;
      if(this.hurtCount>3){

        this.playerAction="go";
        this.hurtCount=0;

      }

    }

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // make bullets

    if(this.setBullets===undefined){
      
      for(var i=0; i<50; i++){

        this.bCont = new PIXI.Container();
        this.bCont.sortableChildren = true;
        this.mainCont.addChild(this.bCont);

        this.bCont.scale.x = this.bCont.scale.y = .5;

        this.bul = new PIXI.Sprite(this.e.ui.t_whiteBall);
        this.bul.anchor.x = 1;
        this.bul.anchor.y = .5;
        this.bul.width=85;
        this.bul.height=61;
        this.bul.zIndex=1;
        this.bCont.addChild(this.bul);

        this.hit = new PIXI.Sprite(this.e.ui.red);
        this.hit.anchor.x = 1;
        this.hit.anchor.y = .5;
        this.hit.width=14;
        this.hit.height=14;
        this.hit.zIndex=2;
        this.hit.alpha=0;
        this.bCont.addChild(this.hit);

        this.bCont.action = "ready";
        this.bCont.lifeCount = 0;
        this.bCont.sprite = this.bul;
        this.bCont.hit = this.hit;

        this.bullets.push(this.bCont);

      }

      this.setBullets=true;

    }

    // shoot bullets

    this.shootCount+=this.e.dt * this.masterSpeed;

    if(this.shootCount>this.shootLim){

      this.shootCount=0;
      this.backwardsShotCue+=1;

      this.hand2.curFrame=0;

      for(var j=0; j<this.shotNumber; j++){

        // make forward shots

        var extraRot = 0;

        if(this.shotNumber===2){

          if(j===0){
            extraRot = -8
          }else if(j===1){
            extraRot = 8
          } 

        }else if(this.shotNumber===3){

          if(j===0){
            extraRot = -20
          }else if(j===1){
            extraRot = 0
          }else if(j===2){
            extraRot = 20
          } 

        }else if(this.shotNumber===4){

          if(j===0){
            extraRot = -20
          }else if(j===1){
            extraRot = -10
          }else if(j===2){
            extraRot = 10
          } else if(j===2){
            extraRot = 20
          }

        }else if(this.shotNumber===5){

          console.log("five shot")

          if(j===0){
            extraRot = -20
          }else if(j===1){
            extraRot = -10
          }else if(j===2){
            extraRot = 0
          } else if(j===3){
            extraRot = 10
          } else if(j===4){
            extraRot = 20
          }

        }

        var rot = this.hand.rotation+this.e.u.ca(extraRot);
        this.makeBullet(rot, this.bulletDamage);

      }

      // make backwards shot

      // if(this.backwardsShotCue>=5 && this.backwardsShot===true){
      if(this.backwardsShot===true){

        this.backwardsShotCue=0;

        this.makeBullet(this.hand.rotation+this.e.u.ca(180), this.bulletDamage);

      }
  
    }

    // bullet loop

    for(var i=0; i<this.bullets.length; i++){

      var b = this.bullets[i];

      if(b.action==="ready"){

        b.position.x=10000;
        b.position.y=10000;
        b.count = 0;
        b.scale.x = b.scale.y = .5;

      }else if(b.action==="shoot"){

        this.e.s.p("shot")

        if(this.bulletWidth===1){
          var bulSize=14
          b.sprite.texture = this.e.ui.t_bul1;
        }else if(this.bulletWidth===2){
          var bulSize=21
          b.sprite.texture = this.e.ui.t_bul2;
        }else if(this.bulletWidth===3){
          var bulSize=27
          b.sprite.texture = this.e.ui.t_bul3;
        }else if(this.bulletWidth===4){
          var bulSize=39
          b.sprite.texture = this.e.ui.t_bul4;
        }else if(this.bulletWidth===5){
          var bulSize=61
          b.sprite.texture = this.e.ui.t_bul5;
        }

        b.hit.width = b.hit.height = bulSize;

        b.action="shooting";

      }else if(b.action==="shooting"){

        b.position.x = b.position.x + this.shootSpeed * Math.cos(b.rotation) * this.e.dt * this.masterSpeed;
	      b.position.y = b.position.y + this.shootSpeed * Math.sin(b.rotation) * this.e.dt * this.masterSpeed;

        b.lifeCount+=this.e.dt;
        if(b.lifeCount>5){
          b.lifeCount=0;
          b.action="ready";
        }

      }else if(b.action==="shrink"){

        this.enemyExplodeWhite(b.position.x, b.position.y)

        gsap.to( b.scale, {x: 0.1, y: 0.1, duration: .1, ease: "linear"});
        b.action = "shrinking"

      }else if(b.action==="shrinking"){

        b.count+=this.e.dt;
        if(b.count>.1){

          b.count=0;
          b.action="ready"
        }

      } 

    }

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // make freeze

    this.freezeCount+=this.e.dt;
    if(this.freezeCount>3 && this.freeze>0){

      this.freezeCount=0;
      this.freezeAction="shoot"
      this.e.s.p("frost")

      this.freezerMask.width = this.freezerMask.height = 1;

      this.freezerCont.position.x = this.playerCont.position.x;
      this.freezerCont.position.y = this.playerCont.position.y+20;

      this.freezer.rotation = 0;
      this.freezerMask.rotation = 0;

      var frot = 3;

      gsap.to( this.freezerMask, {rotation: -frot, duration: 1, ease: "sine.inOut"});
      gsap.to( this.freezer, {rotation: frot, duration: 1, ease: "sine.inOut"});

      if(this.freeze===1){
        gsap.to( this.freezerMask, {width: 140, height: 140, duration: .5, ease: "sine.out"});
        gsap.to( this.freezer, {width: 70, height: 70, duration: .5, ease: "sine.out"});
        this.snowFlakeScale = 1;
      }else{
        gsap.to( this.freezerMask, {width: 140*1.4, height: 140*1.4, duration: .5, ease: "sine.out"});
        gsap.to( this.freezer, {width: 70*1.4, height: 70*1.4, duration: .5, ease: "sine.out"});
        this.snowFlakeScale = 1.6;
      }
      
      gsap.to( this.freezer, {alpha: 1, duration: .5, ease: "linear"});
      gsap.to( this.freezer, {alpha: 0, duration: .25, delay: .5, ease: "linear"});

      this.freezeEnemies = 1;

      for(var i=0; i<this.snowFlakes.length; i++){

        this.snowFlakes[i].scale.x = this.snowFlakes[i].scale.y = 0;
        this.snowFlakes[i].alpha = 1;

        gsap.to( this.snowFlakes[i].scale, {x: this.snowFlakeScale, y: this.snowFlakeScale, duration: .5, ease: "sine.in"});
        gsap.to( this.snowFlakes[i].scale, {x: this.snowFlakeScale+1, y: this.snowFlakeScale+1, duration: .25, delay: .75, ease: "sine.out"});
        gsap.to( this.snowFlakes[i], {alpha: 0, duration: .25, delay: .75, ease: "sine.out"});

      }

    }

    this.freezer2.scale.x = this.freezer.scale.x;
    this.freezer2.scale.y = this.freezer.scale.y;

    this.sfSpeed = 5;
    
    for(var i=0; i<this.snowFlakes.length; i++){

      if(this.snowFlakes[i].dir==="r"){
        this.snowFlakes[i].rotation+=this.snowFlakes[i].rotSpeed*this.e.dt;
      }else{
        this.snowFlakes[i].rotation+=this.snowFlakes[i].rotSpeed*this.e.dt;
      }

    }

    if(this.freezeEnemies>0){
      this.freezeEnemies-=this.e.dt;
    }

    if(this.freezeAction==="shoot"){

      if(this.freezer.alpha===0){
        this.freezeCount=0
        this.freezeAction="off"
      }
     
    }else  if(this.freezeAction==="off"){

    }

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // make explosions

    if(this.setExplosions===undefined){

      this.explosions = [];

      for(var i=0; i<30; i++){

        this.explosion = new PIXI.Sprite(this.e.ui.t_ex1);
        this.explosion.anchor.x = this.explosion.anchor.y = .5;
        this.explosion.scale.x = this.explosion.scale.y = .25;
        this.explosion._zIndex=111;
        this.explosion.alpha = 1;
        this.mainCont.addChild(this.explosion);

        this.explosion.ani = this.e.ui.exAni;
        this.explosion.aniSpeed = .025;
        this.explosion.aniLoop = false;
        this.e.ui.animatedSprites.push(this.explosion);
  
        this.explosion.action = "ready";
  
        this.explosions.push(this.explosion);
        // this.zLevs.push(this.explosion)
  
      }

      this.setExplosions=true;

    }

    // explosions loop

    for(var i=0; i<this.explosions.length; i++){

      var b = this.explosions[i];

      if(b.action==="ready"){

        b.position.x=10000;
        b.position.y=10000;

      }else if(b.action==="set"){

        b.curFrame = 0;
        b.alpha=1;
        b.action="exploding"

      }else if(b.action==="exploding"){

        if(b.curFrame>=14){
          b.alpha=0;
          b.action="ready"
        }

      } 

    }

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // make explosions

    if(this.setExplosionsWhite===undefined){

      this.explosionsWhite = [];

      for(var i=0; i<30; i++){

        this.explosion = new PIXI.Sprite(this.e.ui.t_exw1);
        this.explosion.anchor.x = this.explosion.anchor.y = .5;
        // this.explosion.scale.x = this.explosion.scale.y = .5;
        this.explosion._zIndex=3111;
        this.explosion.alpha = 1;
        this.mainCont.addChild(this.explosion);

        this.explosion.ani = this.e.ui.exwAni;
        this.explosion.aniSpeed = .025;
        this.explosion.aniLoop = false;
        this.e.ui.animatedSprites.push(this.explosion);
  
        this.explosion.action = "ready";
  
        this.explosionsWhite.push(this.explosion);
  
      }

      this.setExplosionsWhite=true;

    }

    // explosions loop

    for(var i=0; i<this.explosionsWhite.length; i++){

      var b = this.explosionsWhite[i];

      if(b.action==="ready"){

        b.position.x=10000;
        b.position.y=10000;

      }else if(b.action==="set"){

        b.curFrame = 0;
        b.alpha=1;
        b.action="exploding"

      }else if(b.action==="exploding"){

        if(b.curFrame>=7){
          b.alpha=0;
          b.action="ready"
        }

      } 

    }

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // make fireballs

    if(this.setFireball===undefined){

      this.fireBalls = [];

      for(var i=0; i<3; i++){

        this.bCont = new PIXI.Container();
        this.bCont.sortableChildren = true;
        this.mainCont.addChild(this.bCont);
  
        this.bul = new PIXI.Sprite(this.e.ui.t_fireball);
        this.bul.anchor.x = this.bul.anchor.y = .5;
        this.bul.scale.x = this.bul.scale.y = -1;
        this.bul._zIndex=111;
        this.bCont.addChild(this.bul);
        this.bul.ani = this.e.ui.fbAni;
        this.bul.aniSpeed = .05;
        this.e.ui.animatedSprites.push(this.bul);
  
        this.bCont.action = "ready";
        this.bCont.lifeCount = 0;
        this.bCont.sprite = this.bul;
        this.bCont.hit = this.bul;
  
        this.fireBalls.push(this.bCont);
  
      }

      this.setFireball=true;

    }

    // shoot fireball

    this.fireBallCount+=this.e.dt;
    if(this.fireBallCount>3){

      this.fireBallCount=0;
      this.shootFireBall();

    }

    for(var i=0; i<this.fireBalls[i].length; i++){

      this.fireBalls[i].position.x = this.playerCont.position.x;
      this.fireBalls[i].position.y = this.playerCont.position.y;
      
    }

    // fireball loop

    for(var i=0; i<this.fireBalls.length; i++){

      var b = this.fireBalls[i];

      if(b.action==="ready"){

        b.position.x=10000;
        b.position.y=10000;

      }else if(b.action==="shoot"){

        b.action="shooting";

        this.e.s.p("fireball")

      }else if(b.action==="shooting"){

        // console.log("shooting fb")

        this.fireBallSpeed = 120;

        b.position.x = b.position.x + this.fireBallSpeed * Math.cos(b.rotation) * this.e.dt * this.masterSpeed;
	      b.position.y = b.position.y + this.fireBallSpeed * Math.sin(b.rotation) * this.e.dt * this.masterSpeed;

        b.lifeCount+=this.e.dt;
        if(b.lifeCount>1){
          b.lifeCount=0;
          b.action="ready";
        }

      } 

    }

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    // make lightning bolts

    if(this.setLightning===undefined){

      this.bolts = [];

      for(var i=0; i<6; i++){

        this.bCont = new PIXI.Container();
        this.bCont.sortableChildren = true;
        this.mainCont.addChild(this.bCont);

        this.bolt = new PIXI.Sprite(this.e.ui.t_lightning);
        this.bolt.anchor.x = .5;
        // this.bolt.scale.x = this.bolt.scale.y = .5;
        this.bolt.anchor.y = .95;
        this.bolt._zIndex=111;
        this.bCont.addChild(this.bolt);

        this.bolt.ani = this.e.ui.lightningAni;
        this.bolt.aniSpeed = .1;
        this.e.ui.animatedSprites.push(this.bolt);

        this.bCont.action = "ready";
        this.bCont.count = 0;
        this.bCont.sprite = this.bul;
        this.bCont.hit = this.bul;

        this.bolts.push(this.bCont);
        this.zLevs.push(this.bCont);

      }

      this.setLightning=true;

    }

    // shoot lightning

    if(this.lightning===1){
      this.lightningLim=1.5;
    }else if(this.lightning===2){
      this.lightningLim=1;
    }else if(this.lightning===3){
      this.lightningLim=.5;
    }

    this.lightningCount+=this.e.dt;
    if(this.lightningCount>this.lightningLim && this.lightning>=1){

      this.lightningCount=0;

      this.closeEnemies = [];

      //get en distance

      for(var i=0; i<this.enemies.length; i++){

        if(this.e.u.getDistance(this.enemies[i].enCont.position.x, this.enemies[i].enCont.position.y, this.playerCont.position.x, this.playerCont.position.y )<200){

          this.closeEnemies.push(this.enemies[i])

        }
        
      }

      this.foundBolt=false;

      for(var i=0; i<this.bolts.length; i++){

        if(this.bolts[i].action==="ready"){
          this.myBolt = this.bolts[i];
          this.foundBolt=true;
        }

      }

      if(this.foundBolt===true && this.closeEnemies.length>0){

        this.boltEnemy = this.e.u.apr(this.closeEnemies);

        this.myBolt.position.x = this.boltEnemy.enCont.position.x;
        this.myBolt.position.y = this.boltEnemy.enCont.position.y;
        this.myBolt.action = "strike"
  
        this.boltEnemy.life-=300;
        this.setBones(this.boltEnemy.enCont.position.x, this.boltEnemy.enCont.position.y,this.boltEnemy.type, 4)

        this.t.lightningShadStrength = .3;
        gsap.to( this.t, {lightningShadStrength: 0, duration: .7,  ease: "linear"});

        // this.t.lightningShadStrength

        if(this.lightning===3){
          this.e.s.p("lightningSofter")
        }else{
          this.e.s.p("lightning")
        }
        
  
        for(var j=0; j<this.enemies.length; j++){
  
          var eDist = this.e.u.getDistance(this.enemies[j].enCont.position.x, this.enemies[j].enCont.position.y, this.myBolt.position.x, this.myBolt.position.y );
          
          if(eDist<40){

            // console.log(eDist);
  
            this.enemies[j].life-=300;
            this.setBones(this.enemies[j].enCont.position.x, this.enemies[j].enCont.position.y,this.enemies[j].type, 4)
          }
  
        }
  
      }


    }

    // bolt loop

    for(var i=0; i<this.bolts.length; i++){

      var b = this.bolts[i];

      if(b.action==="ready"){

        b.position.x=10000;
        b.position.y=10000;
        b.flashCount = 0;
        b.count=0;

        b.alphaLev = 2;

      }else if(b.action==="strike"){

        b.action="striking";

      }else if(b.action==="striking"){

        b.alphaLev-=this.e.dt*4;

        b.flashCount+=this.e.dt;
        if(b.flashCount>.025){

          if(b.alpha===.1){
            b.alpha=b.alphaLev
          }else{
            b.alpha=.1;
          }

          b.flashCount=0;

        }

        b.count+=this.e.dt*2;
        if(b.count>1){
          b.count=0;
          b.action="ready";
        }

      } 

    }

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    if(this.setBombs===undefined){

      // make bombs

      this.allBombs = [];

      for(var i=0; i<3; i++){
          
        this.bCont = new PIXI.Container();
        this.bCont.sortableChildren = true;
        this.mainCont.addChild(this.bCont);

        this.fCont = new PIXI.Container();
        this.fCont.sortableChildren = true;
        this.bCont.addChild(this.fCont);

        this.bomb = new PIXI.Sprite(this.e.ui.t_bomb);
        this.bomb.anchor.x = this.bomb.anchor.y = .5;
        this.bomb._zIndex=111;
        this.bomb.ani = this.e.ui.bombWait;
        this.bomb.aniSpeed = .025;
        this.e.ui.animatedSprites.push(this.bomb);
        this.bCont.addChild(this.bomb);

        this.fuse = new PIXI.Sprite(this.e.ui.t_fuse);
        this.fuse.anchor.x = this.fuse.anchor.y = .5;
        this.fuse._zIndex=110;
        this.fCont.addChild(this.fuse);

        this.bombExplode = new PIXI.Sprite(this.e.ui.t_bombExplode);
        this.bombExplode.anchor.x = this.bombExplode.anchor.y = .5;
        this.bombExplode.scale.x = this.bombExplode.scale.y = 4;
        this.bombExplode._zIndex=111;
        this.bCont.addChild(this.bombExplode);

        this.bombExplode2 = new PIXI.Sprite(this.e.ui.t_bombExplode);
        this.bombExplode2.anchor.x = .5
        this.bombExplode2.anchor.y = .75;
        this.bombExplode2.scale.x = this.bombExplode2.scale.y = .5;
        this.bombExplode2._zIndex=131;
        this.bombExplode2.ani = this.e.ui.bexAni;
        this.bombExplode2.aniSpeed=.04;
        this.bombExplode2.aniLoop=false;
        this.e.ui.animatedSprites.push(this.bombExplode2);
        this.bCont.addChild(this.bombExplode2);

        this.bCont.action = "ready";
        this.bCont.count = 0;
        this.bCont.sprite = this.bomb;
        this.bCont.fuse = this.fuse;
        this.bCont.explosion = this.bombExplode;
        this.bCont.explosion2 = this.bombExplode2;
        this.bCont.hit = this.bul;
        this.bCont.fCont = this.fCont;

        this.fuArray = [];

        for(var j=0; j<9; j++){

          if(j===0||j===3||j===6){
            this.fu = new PIXI.Sprite(this.e.ui.t_fuse1);
          }else if(j===1||j===4||j===7){
            this.fu = new PIXI.Sprite(this.e.ui.t_fuse2);
          }else if(j===2||j===5||j===8){
            this.fu = new PIXI.Sprite(this.e.ui.t_fuse3);
          }
          
          this.fu.width = this.fu.height = 3;
          this.fu.position.y = -12;
          this.fu.anchor.x = this.fu.anchor.y = .5;
          this.fu.alpha = 0;
          this.fu.zIndex = 200;
          this.fCont.addChild(this.fu);

          this.fuArray.push(this.fu);

        }

        this.bCont.fuArray = this.fuArray;

        this.allBombs.push(this.bCont);
        this.zLevs.push(this.bCont);

        this.setBombs=true;
        
      }

    }

    // set bomb limit

    if(this.bombs>0){

      if(this.bombs===1){

        this.bombLimit = 5

      }else if(this.bombs===2){

        this.bombLimit = 3.5

      }else if(this.bombs===3){

        this.bombLimit = 2

      }
      
    }

    // set bombs

    this.bombCount+=this.e.dt;

    if(this.bombCount>this.bombLimit){

      this.bombCount=0;

      for(var i=0; i<this.allBombs.length; i++){

        if(this.allBombs[i].action==="ready"){

          this.allBombs[i].action="set"
          i=100;

        }

      }

    }

    // bomb loop

    for(var i=0; i<this.allBombs.length; i++){

      var b = this.allBombs[i];

      if(b.action==="ready"){

        b.position.x=10000;
        b.position.y=10000;
        b.flashCount = 0;
        b.count=0;
        b.fCount=0;

        // b.fuse.alpha=1;
        b.fCont.alpha=1;
        b.sprite.alpha=1;
        b.explosion.alpha=0;
        b.explosion2.alpha=0;
        b.fCont.position.y=0

      }else if(b.action==="set"){

        b.position.x = this.playerCont.position.x;
        b.position.y = this.playerCont.position.y+8;

        gsap.to( b.fCont.position, {y: 8, duration: 2,  ease: "sine.in"});

        b.action="waiting";

      }else if(b.action==="waiting"){

        b.explosion.alpha=0;
        b.explosion2.alpha=0;

        b.fCount+=this.e.dt;

        if(b.fCount>.03){

          b.fCount=0;

          for(var j=0; j<b.fuArray.length; j++){

            var f = b.fuArray[j];

            if(f.alpha===0){
                
              f.alpha = 1;
              f.width = f.height = 1.5;
              f.position.x = 0;
              f.position.y = -12;

              gsap.killTweensOf(f.position);
              gsap.killTweensOf(f.scale);
              gsap.killTweensOf(f);

              gsap.to( f.position, {x: f.position.x+this.e.u.nran(30), y: f.position.y+this.e.u.nran(30), duration: .3,  ease: "sine.in"});
              // gsap.to( f.scale, {x: 0, y: 0, duration: .3,  ease: "sine.in"});
              gsap.to( f, {alpha: 0, width: 0, height: 0, duration: .3,  ease: "sine.in"});

              j=20;
    
            }

          }
  
        }

        if(b.count<1){
          b.sprite.ani=this.e.ui.bombWait;
        }else{
          b.sprite.ani=this.e.ui.bombFlash;
        }

        b.count+=this.e.dt;
        if(b.count>2){

          b.count=0;

          for(var i=0; i<this.enemies.length; i++){

            if(this.bombs===1){
              var bombDist = 80;
              b.explosion.scale.x = b.explosion.scale.y = 2;
            }else if(this.bombs===2){
              var bombDist = 100;
              b.explosion.scale.x = b.explosion.scale.y = 2.5;
            }else if(this.bombs===3){
              var bombDist = 120;
              b.explosion.scale.x = b.explosion.scale.y = 3;
            }

            if( this.e.u.getDistance(b.position.x, b.position.y, this.enemies[i].enCont.position.x, this.enemies[i].enCont.position.y )<bombDist ){

              this.enemies[i].life-=200;
              this.setBones(this.enemies[i].enCont.position.x, this.enemies[i].enCont.position.y,this.enemies[i].type, 4)
              
            }

          }

          this.e.s.p("bomb")

          b.explosion.alpha=.75;
          // b.explosion.scale.x = b.explosion.scale.y = 1
          gsap.to( b.explosion.scale, {x: 0, y: 0, duration: .75,  ease: "expo.out"});
          // gsap.to( b.explosion, {width: 1, height: 1, duration: .75,  ease: "expo.out"});
          gsap.to( b.explosion, {alpha: 0, duration: .75,  ease: "expo.out"});

          b.explosion2.alpha=1;
          b.explosion2.curFrame=0;

          this.t.lightningShadStrength = .3;
          gsap.to( this.t, {lightningShadStrength: 0, duration: .7,  ease: "linear"});

          b.action="explode";

        }

      }else if(b.action==="explode"){

        
        b.fCont.alpha = 0;
        // b.fuse.alpha=0;
        b.sprite.alpha=0;

        b.count+=this.e.dt;
        if(b.count>1){

          b.count=0;
          b.action="ready"

        }

      } 

    }

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    if(this.enemies!==undefined){
        
      var closest = null;
      var closestNum = 10000;

      for(var i=0; i<this.enemies.length; i++){

        var en = this.enemies[i];
        // this.enemies[i].hand.alpha=.1;
        var dist = this.e.u.getDistance(en.enCont.position.x, en.enCont.position.y, this.playerCont.position.x, this.playerCont.position.y);

        if(dist<closestNum && en.freezeCount<=0){
          closestNum = dist;
          closest = this.enemies[i];
        }
        
      }

      if(closest!==null){

        // closest.hand.alpha=1;

        this.hand.rotation = Math.atan2( this.playerCont.position.y - closest.enCont.position.y, this.playerCont.position.x - closest.enCont.position.x) + this.e.u.ca(180);

        var hDif = this.hand.rotation - this.hand2.rotation;

        if(this.e.u.ca2(hDif)>180){
          this.hand2.rotation+=this.e.u.ca(360)
        }else if(this.e.u.ca2(hDif)<-180){
          this.hand2.rotation-=this.e.u.ca(360)
        }

        this.hand2.rotation = this.e.u.lerp(this.hand2.rotation, this.hand.rotation, 10*this.e.dt);

        if(this.e.u.ca2(this.hand2.rotation)>180){
          this.hand2.zIndex = 10;
        }else{
          this.hand2.zIndex = 30;
        }
        
      }

    }

    // this.hand.rotation = Math.atan2( -(window.innerHeight/2) + this.e.mouse.y, -(window.innerWidth/2) + this.e.mouse.x);

    //-------------------------------------------------------------------------------------

    this.playerAniSpeed = .075;

    if(this.e.mobile===false){

      // XSPEED

      if(this.e.input.keyRight===true){

        this.xspeed+=this.speedIncrease*this.e.dt * this.masterSpeed;
        if(this.xspeed>this.playerSpeed){
          this.xspeed=this.playerSpeed;
        } 
    
        this.player.ani = this.e.ui.runAni_s
        this.player.scale.x = 1
        this.lastDir = "r";
        this.player.aniSpeed = this.playerAniSpeed*.8;
        
      }else if(this.e.input.keyLeft===true){

        this.xspeed-=this.speedIncrease*this.e.dt * this.masterSpeed;
        if(this.xspeed<-this.playerSpeed){
          this.xspeed=-this.playerSpeed;
        }
        
        this.player.ani = this.e.ui.runAni_s
        this.player.scale.x = -1
        this.lastDir = "l";
        this.player.aniSpeed = this.playerAniSpeed*.8;
        
      }else{

        this.xspeed*=this.speedDecrease;

      }

      // YSPEED

      if(this.e.input.keyDown===true){

        this.yspeed+=this.speedIncrease*this.e.dt * this.masterSpeed;
        if(this.yspeed>this.playerSpeed){
          this.yspeed=this.playerSpeed;
        } 

        this.player.ani = this.e.ui.runAni_d
        this.lastDir = "d";
        this.player.aniSpeed = this.playerAniSpeed;
        
      }else if(this.e.input.keyUp===true){

        this.yspeed-=this.speedIncrease*this.e.dt * this.masterSpeed;
        if(this.yspeed<-this.playerSpeed){
          this.yspeed=-this.playerSpeed;
        } 

        this.player.ani = this.e.ui.runAni_u
        this.lastDir = "u";
        this.player.aniSpeed = this.playerAniSpeed;
        
      }else{

        this.yspeed*=this.speedDecrease;

      }

    }else{

      if(this.e.input.ongoingTouches.length>0){

        this.xspeed = (this.playerSpeed*this.e.input.speedMultX);
        this.yspeed = (this.playerSpeed*this.e.input.speedMultY);

      }else{

        this.xspeed*=this.speedDecrease
        this.yspeed*=this.speedDecrease

      }

      // console.log(Math.abs(this.xspeed)+" / "+Math.abs(this.yspeed))

      if(Math.abs(this.xspeed)>Math.abs(this.yspeed)){

        if(this.xspeed>0){
          this.player.ani = this.e.ui.runAni_s
          this.lastDir = "r";
          this.player.aniSpeed = this.playerAniSpeed*.8;
          this.player.scale.x = 1
        }else{
          this.player.ani = this.e.ui.runAni_s
          this.lastDir = "l";
          this.player.aniSpeed = this.playerAniSpeed*.8;
          this.player.scale.x = -1
        }

      }else{

        if(this.yspeed<0){
          this.player.ani = this.e.ui.runAni_u
          this.lastDir = "u";
          this.player.aniSpeed = this.playerAniSpeed;
        }else{
          this.player.ani = this.e.ui.runAni_d
          this.lastDir = "d";
          this.player.aniSpeed = this.playerAniSpeed;
        }

      }

    }

    //-------------------------------------------------------------------------------------

    if(
      this.e.input.keyDown===false && this.e.input.keyUp===false && this.e.input.keyRight===false && this.e.input.keyLeft===false && this.e.mobile===false ||
      this.e.input.ongoingTouches.length===0 && this.e.mobile===true
      ){

      this.player.aniSpeed = .25;

      if(this.lastDir === "r"){
        this.player.ani = this.e.ui.stanceAni_s
      }else if(this.lastDir === "l"){
        this.player.ani = this.e.ui.stanceAni_s
      }else if(this.lastDir === "u"){
        this.player.ani = this.e.ui.stanceAni_u
      }else if(this.lastDir === "d"){
        this.player.ani = this.e.ui.stanceAni_d
      }

    }

    //-------------------------------------------------------------------------------------
    
    // APPLY SPEEDS

    this.xDest = this.playerCont.position.x + (this.xspeed * this.e.dt * this.masterSpeed);
    this.yDest = this.playerCont.position.y + (this.yspeed * this.e.dt * this.masterSpeed);

    var bushPass = true;
    this.hitBushes = [];

    // check against big bushes

    for(var i=0; i<this.bushes.length; i++){

      var bDist = this.e.u.getDistance(this.xDest, this.yDest, this.bushes[i].position.x, this.bushes[i].position.y-25);

      if(bDist<35){
        this.hitBushes.push(this.bushes[i]);
      }

    }

    for(var i=0; i<this.bushesMed.length; i++){

      var bDist = this.e.u.getDistance(this.xDest, this.yDest, this.bushesMed[i].position.x, this.bushesMed[i].position.y-19);

      if(bDist<27){
        this.hitBushes.push(this.bushesMed[i]);
      }

    }

    for(var i=0; i<this.bushesSmall.length; i++){

      var bDist = this.e.u.getDistance(this.xDest, this.yDest, this.bushesSmall[i].position.x, this.bushesSmall[i].position.y-12);

      if(bDist<16){
        this.hitBushes.push(this.bushesSmall[i]);
      }

    }

    var bushPassX = true;
    var bushPassY = true;
    var checkDist = 10;

    // cycle through the hit bushes and see if sliding can happen

    if(
      this.e.input.keyDown===false && this.e.input.keyUp===false && this.e.input.keyRight===true  ||
      this.e.input.keyDown===false && this.e.input.keyUp===false && this.e.input.keyLeft===true
      ){

      for(var i=0; i<this.hitBushes.length; i++){

        if(this.hitBushes[i].type==="big"){
          this.distCheck=35;
          this.bushOffset=25;
        }else if(this.hitBushes[i].type==="med"){
          this.distCheck=27;
          this.bushOffset=19;
        }else if(this.hitBushes[i].type==="small"){
          this.distCheck=16;
          this.bushOffset=12;
        }

        var topCheck = this.e.u.getDistance(this.xDest, this.playerCont.position.y-checkDist, this.hitBushes[i].position.x, this.hitBushes[i].position.y-this.bushOffset);
        var botCheck = this.e.u.getDistance(this.xDest, this.playerCont.position.y+checkDist, this.hitBushes[i].position.x, this.hitBushes[i].position.y-this.bushOffset);

        if(topCheck<this.distCheck && botCheck>this.distCheck){

          bushPassX=false;
          bushPassY=true;
          this.yDest = this.playerCont.position.y + (this.playerSpeed/2 * this.e.dt * this.masterSpeed);

        }else if(botCheck<this.distCheck && topCheck>this.distCheck){

          bushPassX=false;
          bushPassY=true;
          this.yDest = this.playerCont.position.y - (this.playerSpeed/2 * this.e.dt * this.masterSpeed);

        }else{

          bushPassX=false;
          bushPassY=false;

        }

      }

    }else if(
      this.e.input.keyRight===false && this.e.input.keyLeft===false && this.e.input.keyUp===true  ||
      this.e.input.keyRight===false && this.e.input.keyLeft===false && this.e.input.keyDown===true
    ){

      for(var i=0; i<this.hitBushes.length; i++){

        if(this.hitBushes[i].type==="big"){
          this.distCheck=35;
          this.bushOffset=25;
        }else if(this.hitBushes[i].type==="med"){
          this.distCheck=27
          this.bushOffset=19;
        }else if(this.hitBushes[i].type==="small"){
          this.distCheck=16;
          this.bushOffset=12;
        }

        var rightCheck = this.e.u.getDistance(this.playerCont.position.x+checkDist, this.yDest, this.hitBushes[i].position.x, this.hitBushes[i].position.y-this.bushOffset);
        var leftCheck  = this.e.u.getDistance(this.playerCont.position.x-checkDist, this.yDest, this.hitBushes[i].position.x, this.hitBushes[i].position.y-this.bushOffset);

        console.log(Math.round(rightCheck)+" / "+Math.round(leftCheck))

        if(rightCheck<this.distCheck && leftCheck>this.distCheck){

          bushPassY=false;
          bushPassX=true;
          this.xDest = this.playerCont.position.x - (this.playerSpeed/2 * this.e.dt * this.masterSpeed);

        }else if(leftCheck<this.distCheck && rightCheck>this.distCheck){

          bushPassY=false;
          bushPassX=true;
          this.xDest = this.playerCont.position.x + (this.playerSpeed/2 * this.e.dt * this.masterSpeed);

        }else{

          bushPassX=false;
          bushPassY=false;

        }

      }

    }else if (this.hitBushes.length>0){

      bushPassX=false;
      bushPassY=false;

    }

    // console.log(bushPassX+" / "+bushPassY);

    //-----------------------------------------------------

    if(this.playerCont.position.x>1250 || this.playerCont.position.x<-1250){
      // out of bounds
    }else if(bushPassX===false){
      // bush pass x
    }else{
      this.playerCont.position.x = this.xDest;
    } 

    if(this.playerCont.position.y>1250 || this.playerCont.position.y<-1250){
      // out of bounds
    }else if(bushPassY===false){
      // bush pass y
    }else{
      this.playerCont.position.y = this.yDest;
    } 
  
    //-------------------------------------------------------------------------------------
    
    // var lm = 1

    if(this.coinAmount>=this.levCoinAmount && this.playerLevel<20 && this.hasWon===false){

      this.action="power up start"

    }

  }

  makeBullet(rot, damage, type){

    var myBul = null;

    for(var i=0; i<this.bullets.length; i++){
      if(this.bullets[i].action==="ready"){

        this.bullets[i].rotation = rot;
        this.bullets[i].damage = damage;

        this.bullets[i].position.x = this.playerCont.position.x + Math.cos(this.bullets[i].rotation) * 20;
        this.bullets[i].position.y = this.playerInnerCont.position.y + this.playerCont.position.y + Math.sin(this.bullets[i].rotation) * 20;
        
        this.bullets[i].type=type
        this.bullets[i].action="shoot"
        myBul = this.bullets[i];

        i=1000;

      }
    }

    return myBul;

  }

  shootFireBall(){

    // console.log("shoot fireball "+this.fireBallShots)

    if(this.fireBallShots===1){

      this.fireBalls[0].rotation = this.hand.rotation;

    }else if(this.fireBallShots===2){

      this.fireBalls[0].rotation = this.hand.rotation - this.e.u.ca(-10);
      this.fireBalls[1].rotation = this.hand.rotation - this.e.u.ca(10);
      
    }else if(this.fireBallShots===3){

      this.fireBalls[0].rotation = this.hand.rotation - this.e.u.ca(-20);
      this.fireBalls[1].rotation = this.hand.rotation;
      this.fireBalls[2].rotation = this.hand.rotation - this.e.u.ca(20);
      
    }
    for(var i=0; i<this.fireBallShots; i++){

        this.fireBalls[i].position.x = this.playerCont.position.x + Math.cos(this.fireBalls[i].rotation) * 20;
        this.fireBalls[i].position.y = this.playerCont.position.y + Math.sin(this.fireBalls[i].rotation) * 20;
        
        this.fireBalls[i].action = "shoot";

    }


  }

}