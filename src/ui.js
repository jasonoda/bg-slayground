import { gsap } from "gsap";
import * as PIXI from 'pixi.js';

export class UI {

    setUp(e) {

        this.e = e;

        //-----------------

        this.uiCanvas = document.getElementById('mycanvas');

        this.app = new PIXI.Application({
            view: this.uiCanvas,
            width: window.innerWidth, 
            height: window.innerHeight,
            transparent: true,
			resolution: window.devicePixelRatio,
			appDensity: true
        });

        window.addEventListener('resize', (event) => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
        });
        // PIXI.BaseTexture.SCALE_MODE.NEAREST;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        PIXI.settings.RESOLUTION = window.devicePixelRatio;

        this.app.renderer.plugins.interaction.mouseOverRenderer = true;

        this.animatedSprites = [];

        this.counter=0;

    }

    load() {

        console.log("LOAD IMAGES")

        // this.loader = new PIXI.Loader();
        this.loader = PIXI.Assets;
        this.loader.reset();
        
        //----------------------------------------------------

        const assets = [

        ['clear', './src/img/clear.png'],
        ['white', './src/img/white.png'],
        ['black', './src/img/black.png'],
        ['red', './src/img/red.png'],

        ['grass', './src/img/grass.png'],
        ['colorLayer', './src/img/colorLayer.png'],
        ['shadowLayer', './src/img/shadowLayer.png'],
        ['cloudLayer', './src/img/cloudLayer.png'],
        ['trees', './src/img/trees.png'],

        ['hand', './src/img/hand.png'],
        ['enemyFlash', './src/img/enemyFlash.png'],
        ['enemyIce', './src/img/enemyIce.png'],
        ['lightning', './src/img/lightning.png'],
        ['lightning2', './src/img/lightning2.png'],
        ['lightning3', './src/img/lightning3.png'],
        ['coin', './src/img/coin.png'],
        ['wheel', './src/img/wheel.png'],
        ['wheelShadow', './src/img/wheelShadow.png'],
        ['whiteBall', './src/img/whiteBall.png'],
        ['star', './src/img/star.png'],
        ['fireball', './src/img/fireball.png'],
        ['freezer', './src/img/freezer.png'],
        ['bomb', './src/img/bomb.png'],
        ['bomb2', './src/img/bomb2.png'],
        ['fuse', './src/img/fuse.png'],
        ['bombExplode', './src/img/bombExplode.png'],
        ['enBullet', './src/img/enBullet.png'],
        ['vig', './src/img/vig.png'],
        
        ['bone1', './src/img/enemy/bones/bone1.png'],
        ['bone2', './src/img/enemy/bones/bone2.png'],
        ['bone3', './src/img/enemy/bones/bone3.png'],
        ['bone4', './src/img/enemy/bones/bone4.png'],
        ['bone5', './src/img/enemy/bones/bone5.png'],

        ['enemyA_1', './src/img/enemy/enemyA_1.png'],
        ['enemyA_2', './src/img/enemy/enemyA_2.png'],
        ['enemyA_3', './src/img/enemy/enemyA_3.png'],
        ['enemyA_4', './src/img/enemy/enemyA_4.png'],

        ['boneA1', './src/img/enemy/bonesA/boneA1.png'],
        ['boneA2', './src/img/enemy/bonesA/boneA2.png'],
        ['boneA3', './src/img/enemy/bonesA/boneA3.png'],
        ['boneA4', './src/img/enemy/bonesA/boneA4.png'],
        ['boneA5', './src/img/enemy/bonesA/boneA5.png'],
        ['boneA6', './src/img/enemy/bonesA/boneA6.png'],
        ['boneA7', './src/img/enemy/bonesA/boneA7.png'],
        
        ['enemyB_1', './src/img/enemy/enemyB_1.png'],
        ['enemyB_2', './src/img/enemy/enemyB_2.png'],
        ['enemyB_3', './src/img/enemy/enemyB_3.png'],
        ['enemyB_4', './src/img/enemy/enemyB_4.png'],
        ['enemyB_5', './src/img/enemy/enemyB_5.png'],
        
        ['enemyC_1', './src/img/enemy/enemyC_1.png'],
        ['enemyC_2', './src/img/enemy/enemyC_2.png'],
        ['enemyC_3', './src/img/enemy/enemyC_3.png'],
        ['enemyC_4', './src/img/enemy/enemyC_4.png'],
        
        ['enemyD_1', './src/img/enemy/enemyD_1.png'],
        ['enemyD_2', './src/img/enemy/enemyD_2.png'],
        ['enemyD_3', './src/img/enemy/enemyD_3.png'],
        ['enemyD_4', './src/img/enemy/enemyD_4.png'],
        
        ['enemyE_1', './src/img/enemy/enemyE_1.png'],
        ['enemyE_2', './src/img/enemy/enemyE_2.png'],
        ['enemyE_3', './src/img/enemy/enemyE_3.png'],
        ['enemyE_4', './src/img/enemy/enemyE_4.png'],
        
        ['enemyF_1', './src/img/enemy/enemyF_1.png'],
        ['enemyF_2', './src/img/enemy/enemyF_2.png'],
        ['enemyF_3', './src/img/enemy/enemyF_3.png'],
        ['enemyF_4', './src/img/enemy/enemyF_4.png'],

        ['enemy2', './src/img/enemy2.png'],
        ['enemy3', './src/img/enemy3.png'],
        ['enemy4', './src/img/enemy4.png'],
        ['enemy5', './src/img/enemy5.png'],
        ['enemy6', './src/img/enemy6.png'],

        ['enemy1_f', './src/img/enemy1_f.png'],
        ['enemy2_f', './src/img/enemy2_f.png'],
        ['enemy3_f', './src/img/enemy3_f.png'],
        ['enemy4_f', './src/img/enemy4_f.png'],
        ['enemy5_f', './src/img/enemy5_f.png'],
        ['enemy6_f', './src/img/enemy6_f.png'],

        ['pi_backwardsShot', './src/img/pi_backwardsShot.png'],
        ['pi_biggerShot', './src/img/pi_biggerShot.png'],
        ['pi_bombs', './src/img/pi_bombs.png'],
        ['pi_extraShot', './src/img/pi_extraShot.png'],
        ['pi_fasterShot', './src/img/pi_fasterShot.png'],
        ['pi_fireballs', './src/img/pi_fireballs.png'],
        ['pi_footSpeed', './src/img/pi_footSpeed.png'],
        ['pi_frost', './src/img/pi_frost.png'],
        ['pi_heal', './src/img/pi_heal.png'],
        ['pi_lightningStrike', './src/img/pi_lightningStrike.png'],
        ['pi_magnet', './src/img/pi_magnet.png'],
        ['pi_ninjaStar', './src/img/pi_ninjaStar.png'],
        ['pi_piercingShot', './src/img/pi_piercingShot.png'],
        ['pi_splinter', './src/img/pi_splinter.png'],
        ['pi_summon', './src/img/pi_summon.png'],

        ['bul1', './src/img/player/bul1.png'],
        ['bul2', './src/img/player/bul2.png'],
        ['bul3', './src/img/player/bul3.png'],
        ['bul4', './src/img/player/bul4.png'],
        ['bul5', './src/img/player/bul5.png'],

        ['fb1', './src/img/fb/fb1.png'],
        ['fb2', './src/img/fb/fb2.png'],
        ['fb3', './src/img/fb/fb3.png'],
        ['fb4', './src/img/fb/fb4.png'],
        ['fb5', './src/img/fb/fb5.png'],
        ['fb6', './src/img/fb/fb6.png'],
        ['fb7', './src/img/fb/fb7.png'],
        ['fb8', './src/img/fb/fb8.png'],

        ['enemyGlow', './src/img/enemyGlow.png'],
        ['enShad', './src/img/enShad.png'],

        ['ex1', './src/img/ex/ex1.png'],
        ['ex2', './src/img/ex/ex2.png'],
        ['ex3', './src/img/ex/ex3.png'],
        ['ex4', './src/img/ex/ex4.png'],
        ['ex5', './src/img/ex/ex5.png'],
        ['ex6', './src/img/ex/ex6.png'],
        ['ex7', './src/img/ex/ex7.png'],
        ['ex8', './src/img/ex/ex8.png'],
        ['ex9', './src/img/ex/ex9.png'],
        ['ex10', './src/img/ex/ex10.png'],
        ['ex11', './src/img/ex/ex11.png'],
        ['ex12', './src/img/ex/ex12.png'],
        ['ex13', './src/img/ex/ex13.png'],
        ['ex14', './src/img/ex/ex14.png'],
        ['ex15', './src/img/ex/ex15.png'],

        ['bex1', './src/img/bex/bex_1.png'],
        ['bex2', './src/img/bex/bex_2.png'],
        ['bex3', './src/img/bex/bex_3.png'],
        ['bex4', './src/img/bex/bex_4.png'],
        ['bex5', './src/img/bex/bex_5.png'],
        ['bex6', './src/img/bex/bex_6.png'],
        ['bex7', './src/img/bex/bex_7.png'],
        ['bex8', './src/img/bex/bex_8.png'],
        ['bex9', './src/img/bex/bex_9.png'],
        ['bex10', './src/img/bex/bex_10.png'],

        ['exw1', './src/img/exw/exw1.png'],
        ['exw2', './src/img/exw/exw2.png'],
        ['exw3', './src/img/exw/exw3.png'],
        ['exw4', './src/img/exw/exw4.png'],
        ['exw5', './src/img/exw/exw5.png'],
        ['exw6', './src/img/exw/exw6.png'],
        ['exw7', './src/img/exw/exw7.png'],
        ['exw8', './src/img/exw/exw8.png'],
        
        ['enfb1', './src/img/enfb/enfb1.png'],
        ['enfb2', './src/img/enfb/enfb2.png'],
        ['enfb3', './src/img/enfb/enfb3.png'],
        ['enfb4', './src/img/enfb/enfb4.png'],
        ['enfb5', './src/img/enfb/enfb5.png'],
        ['enfb6', './src/img/enfb/enfb6.png'],
        ['enfb7', './src/img/enfb/enfb7.png'],
        ['enfb8', './src/img/enfb/enfb8.png'],
        ['enfb9', './src/img/enfb/enfb9.png'],
        ['enfb10', './src/img/enfb/enfb10.png'],
        ['enfb11', './src/img/enfb/enfb11.png'],
        ['enfb12', './src/img/enfb/enfb12.png'],
        ['enfb13', './src/img/enfb/enfb13.png'],
        ['enfb14', './src/img/enfb/enfb14.png'],
        ['enfb15', './src/img/enfb/enfb15.png'],
        ['enfb16', './src/img/enfb/enfb16.png'],
        ['enfb17', './src/img/enfb/enfb17.png'],
        ['enfb18', './src/img/enfb/enfb18.png'],
        ['enfb19', './src/img/enfb/enfb19.png'],

        ['rightUI', './src/img/UI/rightUI.png'],
        ['leftUI', './src/img/UI/leftUI.png'],
        ['rightUIBack', './src/img/UI/rightUIBack.png'],
        ['leftUIBack', './src/img/UI/leftUIBack.png'],
        ['heart', './src/img/UI/heart.png'],
        ['heartEmpty', './src/img/UI/heartEmpty.png'],
        ['redBarColor', './src/img/UI/redBarColor.png'],

        ['i_backwardsShot', './src/img/UI/i_backwardsShot.png'],
        ['i_biggerShot', './src/img/UI/i_biggerShot.png'],
        ['i_bombs', './src/img/UI/i_bombs.png'],
        ['i_extraShot', './src/img/UI/i_extraShot.png'],
        ['i_fasterShot', './src/img/UI/i_fasterShot.png'],
        ['i_fireballs', './src/img/UI/i_fireballs.png'],
        ['i_footSpeed', './src/img/UI/i_footSpeed.png'],
        ['i_freeze', './src/img/UI/i_freeze.png'],
        ['i_heal', './src/img/UI/i_heal.png'],
        ['i_lightningStrike', './src/img/UI/i_lightningStrike.png'],
        ['i_magnet', './src/img/UI/i_magnet.png'],
        ['i_ninjaStar', './src/img/UI/i_ninjaStar.png'],
        ['i_splinter', './src/img/UI/i_splinter.png'],

        ['puBack', './src/img/puMenu/puBack.png'],
        ['instructions', './src/img/instructions.png'],
        
        ['arm', './src/img/player/arm.png'],
        ['shad', './src/img/player/shad.png'],

        ['stance_d1', './src/img/player/stance_d1.png'],
        ['stance_d2', './src/img/player/stance_d2.png'],
        ['stance_d3', './src/img/player/stance_d3.png'],

        ['stance_u1', './src/img/player/stance_u1.png'],
        ['stance_u2', './src/img/player/stance_u2.png'],
        ['stance_u3', './src/img/player/stance_u3.png'],

        ['stance_s1', './src/img/player/stance_s1.png'],
        ['stance_s2', './src/img/player/stance_s2.png'],
        ['stance_s3', './src/img/player/stance_s3.png'],

        ['stance_sb1', './src/img/player/stance_sb1.png'],

        ['run_d1', './src/img/player/run_d1.png'],
        ['run_d2', './src/img/player/run_d2.png'],
        ['run_d3', './src/img/player/run_d3.png'],
        ['run_d4', './src/img/player/run_d4.png'],
        ['run_d5', './src/img/player/run_d5.png'],
        ['run_d6', './src/img/player/run_d6.png'],

        ['run_u1', './src/img/player/run_u1.png'],
        ['run_u2', './src/img/player/run_u2.png'],
        ['run_u3', './src/img/player/run_u3.png'],
        ['run_u4', './src/img/player/run_u4.png'],
        ['run_u5', './src/img/player/run_u5.png'],
        ['run_u6', './src/img/player/run_u6.png'],

        ['run_s1', './src/img/player/run_s1.png'],
        ['run_s2', './src/img/player/run_s2.png'],
        ['run_s3', './src/img/player/run_s3.png'],
        ['run_s4', './src/img/player/run_s4.png'],
        ['run_s5', './src/img/player/run_s5.png'],
        ['run_s6', './src/img/player/run_s6.png'],
        ['run_s7', './src/img/player/run_s7.png'],
        ['run_s8', './src/img/player/run_s8.png'],

        ['arm_1', './src/img/player/arm_1.png'],
        ['arm_2', './src/img/player/arm_2.png'],
        ['arm_3', './src/img/player/arm_3.png'],
        ['arm_4', './src/img/player/arm_4.png'],
        ['arm_5', './src/img/player/arm_5.png'],

        ['death', './src/img/player/death.png'],

        ['fuse1', './src/img/fuse1.png'],
        ['fuse2', './src/img/fuse2.png'],
        ['fuse3', './src/img/fuse3.png'],

        ['frostMask', './src/img/frostMask.png'],
        ['whiteGlow', './src/img/whiteGlow.png'],

        ['bush1', './src/img/bush1.png'],
        ['bush2', './src/img/bush2.png'],
        ['bush3', './src/img/bush3.png'],
        ['bushMed', './src/img/bushMed.png'],
        ['bushMed2', './src/img/bushMed2.png'],
        ['bushMed3', './src/img/bushMed3.png'],
        ['bushSmall', './src/img/bushSmall.png'],
        ['bushSmall2', './src/img/bushSmall2.png'],
        ['bushSmall3', './src/img/bushSmall3.png'],
        ['tinyBush1', './src/img/tinyBush1.png'],
        ['tinyBush2', './src/img/tinyBush2.png'],
        ['tinyBush3', './src/img/tinyBush3.png']

        ];

        //----------------------------------------------------

        
        assets.forEach((asset) => {
            this.loader.add(asset[0], asset[1]);
        });

        const assetNames = assets.map((asset) => {
            return asset[0];
        });
        const texturesPromise = PIXI.Assets.load(assetNames);
        texturesPromise.then((textures) => {

        // this.loader.load((loader, resources) => {

            console.log("UI LOADED")

            this.isLoaded_UI=true;

            //----------------------------------------------------

            this.clear=textures.clear;
            this.white=textures.white;
            this.black=textures.black;
            this.red=textures.red;
            this.t_grass=textures.grass;
            this.t_shadowLayer=textures.shadowLayer;
            this.t_colorLayer=textures.colorLayer;
            this.t_cloudLayer=textures.cloudLayer;
            this.t_trees=textures.trees;
            this.t_hand=textures.hand;
            this.t_enemyFlash=textures.enemyFlash;
            this.t_enemyIce=textures.enemyIce;
            this.t_lightning=textures.lightning;
            this.t_lightning2=textures.lightning2;
            this.t_lightning3=textures.lightning3;
            this.lightningAni = [this.t_lightning,this.t_lightning2,this.t_lightning3];

            this.t_coin=textures.coin;
            this.t_wheel=textures.wheel;
            this.t_wheelShadow=textures.wheelShadow;
            this.t_whiteBall=textures.whiteBall;
            this.t_star=textures.star;
            this.t_fireball=textures.fireball;
            this.t_freezer=textures.freezer;
            this.t_bomb=textures.bomb;
            this.t_bomb2=textures.bomb2;
            this.t_fuse=textures.fuse;
            this.t_bombExplode=textures.bombExplode;
            this.t_enBullet=textures.enBullet;
            this.t_vig=textures.vig;

            this.t_bone1=textures.bone1;
            this.t_bone2=textures.bone2;
            this.t_bone3=textures.bone3;
            this.t_bone4=textures.bone4;
            this.t_bone5=textures.bone5;
            
            this.t_enemyA_1=textures.enemyA_1;
            this.t_enemyA_2=textures.enemyA_2;
            this.t_enemyA_3=textures.enemyA_3;
            this.t_enemyA_4=textures.enemyA_4;
            this.enemyA_Ani=[this.t_enemyA_1,this.t_enemyA_2,this.t_enemyA_3,this.t_enemyA_4,this.t_enemyA_3,this.t_enemyA_2];

            this.t_boneA1=textures.boneA1;
            this.t_boneA2=textures.boneA2;
            this.t_boneA3=textures.boneA3;
            this.t_boneA4=textures.boneA4;
            this.t_boneA5=textures.boneA5;
            this.t_boneA6=textures.boneA6;
            this.t_boneA7=textures.boneA7;

            this.t_enemyB_1=textures.enemyB_1;
            this.t_enemyB_2=textures.enemyB_2;
            this.t_enemyB_3=textures.enemyB_3;
            this.t_enemyB_4=textures.enemyB_4;
            this.t_enemyB_5=textures.enemyB_5;
            this.enemyB_Ani=[this.t_enemyB_1,this.t_enemyB_2,this.t_enemyB_3,this.t_enemyB_4,this.t_enemyB_5,this.t_enemyB_4,this.t_enemyB_3,this.t_enemyB_2];

            this.t_enemyC_1=textures.enemyC_1;
            this.t_enemyC_2=textures.enemyC_2;
            this.t_enemyC_3=textures.enemyC_3;
            this.t_enemyC_4=textures.enemyC_4;
            this.enemyC_Ani=[this.t_enemyC_1,this.t_enemyC_2,this.t_enemyC_3,this.t_enemyC_4,this.t_enemyC_3,this.t_enemyC_2];

            this.t_enemyD_1=textures.enemyD_1;
            this.t_enemyD_2=textures.enemyD_2;
            this.t_enemyD_3=textures.enemyD_3;
            this.t_enemyD_4=textures.enemyD_4;
            this.enemyD_Ani=[this.t_enemyD_1,this.t_enemyD_2,this.t_enemyD_3,this.t_enemyD_4,this.t_enemyD_3,this.t_enemyD_2];

            this.t_enemyE_1=textures.enemyE_1;
            this.t_enemyE_2=textures.enemyE_2;
            this.t_enemyE_3=textures.enemyE_3;
            this.t_enemyE_4=textures.enemyE_4;
            this.enemyE_Ani=[this.t_enemyE_1,this.t_enemyE_2,this.t_enemyE_3,this.t_enemyE_4,this.t_enemyE_3,this.t_enemyE_2];

            this.t_enemyF_1=textures.enemyF_1;
            this.t_enemyF_2=textures.enemyF_2;
            this.t_enemyF_3=textures.enemyF_3;
            this.t_enemyF_4=textures.enemyF_4;
            this.enemyF_Ani=[this.t_enemyF_1,this.t_enemyF_2,this.t_enemyF_3,this.t_enemyF_4,this.t_enemyF_3,this.t_enemyF_2];

            this.t_enemy1_f=textures.enemy1_f;
            this.t_enemy2_f=textures.enemy2_f;
            this.t_enemy3_f=textures.enemy3_f;
            this.t_enemy4_f=textures.enemy4_f;
            this.t_enemy5_f=textures.enemy5_f;
            this.t_enemy6_f=textures.enemy6_f;

            this.t_pi_backwardsShot=textures.pi_backwardsShot;
            this.t_pi_biggerShot=textures.pi_biggerShot;
            this.t_pi_bombs=textures.pi_bombs;
            this.t_pi_extraShot=textures.pi_extraShot;
            this.t_pi_fasterShot=textures.pi_fasterShot;
            this.t_pi_fireballs=textures.pi_fireballs;
            this.t_pi_footSpeed=textures.pi_footSpeed;
            this.t_pi_frost=textures.pi_frost;
            this.t_pi_heal=textures.pi_heal;
            this.t_pi_lightningStrike=textures.pi_lightningStrike;
            this.t_pi_magnet=textures.pi_magnet;
            this.t_pi_ninjaStar=textures.pi_ninjaStar;
            this.t_pi_piercingShot=textures.pi_piercingShot;
            this.t_pi_splinter=textures.pi_splinter;
            this.t_pi_summon=textures.pi_summon;

            this.t_shad=textures.shad;
            this.t_arm=textures.arm;

            this.t_bul1=textures.bul1;
            this.t_bul2=textures.bul2;
            this.t_bul3=textures.bul3;
            this.t_bul4=textures.bul4;
            this.t_bul5=textures.bul5;

            this.t_fb1=textures.fb1;
            this.t_fb2=textures.fb2;
            this.t_fb3=textures.fb3;
            this.t_fb4=textures.fb4;
            this.t_fb5=textures.fb5;
            this.t_fb6=textures.fb6;
            this.t_fb7=textures.fb7;
            this.t_fb8=textures.fb8;

            this.t_ex1=textures.ex1;
            this.t_ex2=textures.ex2;
            this.t_ex3=textures.ex3;
            this.t_ex4=textures.ex4;
            this.t_ex5=textures.ex5;
            this.t_ex6=textures.ex6;
            this.t_ex7=textures.ex7;
            this.t_ex8=textures.ex8;
            this.t_ex9=textures.ex9;
            this.t_ex10=textures.ex10;
            this.t_ex11=textures.ex11;
            this.t_ex12=textures.ex12;
            this.t_ex13=textures.ex13;
            this.t_ex14=textures.ex14;
            this.t_ex15=textures.ex15;

            this.t_exw1=textures.exw1;
            this.t_exw2=textures.exw2;
            this.t_exw3=textures.exw3;
            this.t_exw4=textures.exw4;
            this.t_exw5=textures.exw5;
            this.t_exw6=textures.exw6;
            this.t_exw7=textures.exw7;
            this.t_exw8=textures.exw8;

            this.t_bex1=textures.bex1;
            this.t_bex2=textures.bex2;
            this.t_bex3=textures.bex3;
            this.t_bex4=textures.bex4;
            this.t_bex5=textures.bex5;
            this.t_bex6=textures.bex6;
            this.t_bex7=textures.bex7;
            this.t_bex8=textures.bex8;
            this.t_bex9=textures.bex9;
            this.t_bex10=textures.bex10;

            this.bexAni = [this.t_bex1,this.t_bex2,this.t_bex3,this.t_bex4,this.t_bex5,this.t_bex6,this.t_bex7,this.t_bex8,this.t_bex9,this.t_bex10,this.clear];

            this.t_enfb1=textures.enfb1;
            this.t_enfb2=textures.enfb2;
            this.t_enfb3=textures.enfb3;
            this.t_enfb4=textures.enfb4;
            this.t_enfb5=textures.enfb5;
            this.t_enfb6=textures.enfb6;
            this.t_enfb7=textures.enfb7;
            this.t_enfb8=textures.enfb8;
            this.t_enfb9=textures.enfb9;
            this.t_enfb10=textures.enfb10;
            this.t_enfb11=textures.enfb11;
            this.t_enfb12=textures.enfb12;
            this.t_enfb13=textures.enfb13;
            this.t_enfb14=textures.enfb14;
            this.t_enfb15=textures.enfb15;
            this.t_enfb16=textures.enfb16;
            this.t_enfb17=textures.enfb17;
            this.t_enfb18=textures.enfb18;
            this.t_enfb19=textures.enfb19;

            this.t_enemyGlow=textures.enemyGlow;
            this.t_enShad=textures.enShad;

            this.t_leftUI=textures.leftUI;
            this.t_leftUIBack=textures.leftUIBack;
            this.t_rightUI=textures.rightUI;
            this.t_rightUIBack=textures.rightUIBack;
            this.t_heart=textures.heart;
            this.t_heartEmpty=textures.heartEmpty;
            this.t_redBarColor=textures.redBarColor;

            this.t_i_backwardsShot=textures.i_backwardsShot;
            this.t_i_biggerShot=textures.i_biggerShot;
            this.t_i_bombs=textures.i_bombs;
            this.t_i_extraShot=textures.i_extraShot;
            this.t_i_fasterShot=textures.i_fasterShot;
            this.t_i_fireballs=textures.i_fireballs;
            this.t_i_footSpeed=textures.i_footSpeed;
            this.t_i_freeze=textures.i_freeze;
            this.t_i_heal=textures.i_heal;
            this.t_i_lightningStrike=textures.i_lightningStrike;
            this.t_i_magnet=textures.i_magnet;
            this.t_i_ninjaStar=textures.i_ninjaStar;
            this.t_i_splinter=textures.i_splinter;

            this.t_puBack=textures.puBack;
            this.t_instructions=textures.instructions;

            this.t_stance_d1=textures.stance_d1;
            this.t_stance_d2=textures.stance_d2;
            this.t_stance_d3=textures.stance_d3;

            this.t_stance_u1=textures.stance_u1;
            this.t_stance_u2=textures.stance_u2;
            this.t_stance_u3=textures.stance_u3;

            this.t_stance_s1=textures.stance_s1;
            this.t_stance_s2=textures.stance_s2;
            this.t_stance_s3=textures.stance_s3;

            this.t_stance_sb1=textures.stance_sb1;

            this.t_run_d1=textures.run_d1;
            this.t_run_d2=textures.run_d2;
            this.t_run_d3=textures.run_d3;
            this.t_run_d4=textures.run_d4;
            this.t_run_d5=textures.run_d5;
            this.t_run_d6=textures.run_d6;

            this.t_run_u1=textures.run_u1;
            this.t_run_u2=textures.run_u2;
            this.t_run_u3=textures.run_u3;
            this.t_run_u4=textures.run_u4;
            this.t_run_u5=textures.run_u5;
            this.t_run_u6=textures.run_u6;

            this.t_run_s1=textures.run_s1;
            this.t_run_s2=textures.run_s2;
            this.t_run_s3=textures.run_s3;
            this.t_run_s4=textures.run_s4;
            this.t_run_s5=textures.run_s5;
            this.t_run_s6=textures.run_s6;
            this.t_run_s7=textures.run_s7;
            this.t_run_s8=textures.run_s8;

            this.t_arm_1=textures.arm_1;
            this.t_arm_2=textures.arm_2;
            this.t_arm_3=textures.arm_3;
            this.t_arm_4=textures.arm_4;
            this.t_arm_5=textures.arm_5;

            this.t_death=textures.death;

            this.t_fuse1=textures.fuse1;
            this.t_fuse2=textures.fuse2;
            this.t_fuse3=textures.fuse3;

            this.t_frostMask=textures.frostMask;
            this.t_whiteGlow=textures.whiteGlow;
            this.t_bush1=textures.bush1;
            this.t_bush2=textures.bush2;
            this.t_bush3=textures.bush3;
            this.t_bushMed=textures.bushMed;
            this.t_bushMed2=textures.bushMed2;
            this.t_bushMed3=textures.bushMed3;
            this.t_bushSmall=textures.bushSmall;
            this.t_bushSmall2=textures.bushSmall2;
            this.t_bushSmall3=textures.bushSmall3;
            this.t_tinyBush1=textures.tinyBush1;
            this.t_tinyBush2=textures.tinyBush2;
            this.t_tinyBush3=textures.tinyBush3;

            this.stanceAni_d = [this.t_stance_d1,this.t_stance_d2,this.t_stance_d3,this.t_stance_d2];
            this.stanceAni_u = [this.t_stance_u1,this.t_stance_u2,this.t_stance_u3,this.t_stance_u2];
            this.stanceAni_s = [this.t_stance_s1,this.t_stance_s2,this.t_stance_s3,this.t_stance_s2];
            
            this.armAni = [this.t_arm_1,this.t_arm_2,this.t_arm_3,this.t_arm_4,this.t_arm_5];

            this.runAni_d = [this.t_run_d1,this.t_run_d2,this.t_run_d3,this.t_run_d4,this.t_run_d5,this.t_run_d6];
            this.runAni_u = [this.t_run_u1,this.t_run_u2,this.t_run_u3,this.t_run_u4,this.t_run_u5,this.t_run_u6];
            this.runAni_s = [this.t_run_s1,this.t_run_s2,this.t_run_s3,this.t_run_s4,this.t_run_s5,this.t_run_s6,this.t_run_s7,this.t_run_s8];

            this.exAni = [this.t_ex1, this.t_ex2, this.t_ex3, this.t_ex4, this.t_ex5, this.t_ex6, this.t_ex7, this.t_ex8, this.t_ex9, this.t_ex10, this.t_ex11, this.t_ex12, this.t_ex13, this.t_ex14, this.t_ex15];
            this.fbAni = [this.t_fb1, this.t_fb2, this.t_fb3, this.t_fb4, this.t_fb5, this.t_fb6, this.t_fb7, this.t_fb8];
            this.exwAni = [this.t_exw1, this.t_exw2, this.t_exw3, this.t_exw4, this.t_exw5, this.t_exw6, this.t_exw7, this.t_exw8];
            this.enfbAni = [this.t_enfb1, this.t_enfb2, this.t_enfb3, this.t_enfb4, this.t_enfb5, this.t_enfb6, this.t_enfb7, this.t_enfb8, this.t_enfb9, this.t_enfb10, this.t_enfb11, this.t_enfb12, this.t_enfb13, this.t_enfb14, this.t_enfb15, this.t_enfb16, this.t_enfb17, this.t_enfb18, this.t_enfb19 ];

            this.deathAni = [this.t_stance_d1,this.t_stance_s1,this.t_stance_u1,this.t_stance_sb1];
            this.deathAni2 = [this.t_death];

            this.bombWait = [this.t_bomb];
            this.bombFlash = [this.t_bomb,this.t_bomb2];
            
        });

        //----------------------------------------------------
        //----------------------------------------------------
        //----------------------------------------------------

    }

    //---------------------------------------------------------------------------------------------------------

    build(){

        this.baseCont = new PIXI.Container();
        this.baseCont.sortableChildren = true;
        this.app.stage.addChild(this.baseCont);

        //--------------------------------------------------------------------

        this.mainCont = new PIXI.Container();
        this.mainCont.sortableChildren = true;
        this.baseCont.addChild(this.mainCont);

        this.instructions = new PIXI.Sprite(this.t_instructions);
        this.instructions.anchor.x = 0.5;
        this.instructions.anchor.y = 0.5;
        this.instructions.scale.x = this.instructions.scale.y = 2
        this.instructions.zIndex = 10000
        this.instructions.alpha = 1;
        this.baseCont.addChild(this.instructions);

        this.instructions.buttonMode = true;
        this.instructions.interactive = true;

        this.instructions.on('mousedown', (event) => {
            this.instructions.buttonMode = false;
            this.instructions.interactive = false;
            this.e.scene.action = "game start"
            gsap.to(  this.instructions, {alpha: 0,  duration: .25, ease: "linear"});
        })

        this.instructions.on('touchstart', (event) => {
            this.instructions.buttonMode = false;
            this.instructions.interactive = false;
            this.e.scene.action = "game start"
            gsap.to(  this.instructions, {alpha: 0,  duration: .25, ease: "linear"});
        })


        this.texture = this.red;
        this.faderRed = new PIXI.Sprite(this.texture);
        this.faderRed.anchor.x = 0;
        this.faderRed.anchor.y = 0;
        this.faderRed._zIndex = 100
        this.faderRed.alpha = 0;
        this.mainCont.addChild(this.faderRed);

        this.vig = new PIXI.Sprite(this.t_vig);
        this.vig.anchor.x=0
        this.vig.anchor.y=0
        this.vig._zIndex=80
        this.vig.alpha=.4;
        // this.mainCont.addChild(this.vig);

        // this.vig2 = new PIXI.Sprite(this.t_vig2);
        // this.vig2.anchor.x=0
        // this.vig2.anchor.y=0
        // this.vig2._zIndex=81
        // this.vig2.alpha=1;
        // this.mainCont.addChild(this.vig2);

        //--------------------------------------------------------------------

        this.deathCont = new PIXI.Container();
        this.deathCont.sortableChildren = true;
        this.baseCont.addChild(this.deathCont);
        this.deathCont.zIndex = 45000;

        this.death = new PIXI.Sprite(this.black);
        this.death.anchor.x=0.5
        this.death.anchor.y=0.5
        this.death.width=10000;
        this.death.height=10000;
        // this.death._zIndex=15000
        this.death.alpha=0;
        this.deathCont.addChild(this.death);

        this.playerDeath = new PIXI.Sprite(this.t_player);
        this.playerDeath.anchor.x=0.5
        this.playerDeath.anchor.y=0.5
        this.playerDeath.scale.x=this.playerDeath.scale.y=3
        this.playerDeath._zIndex=80
        this.playerDeath.alpha=0;
        this.deathCont.addChild(this.playerDeath);

        this.playerDeath.ani=this.deathAni;
        this.playerDeath.aniSpeed=.05;
        this.animatedSprites.push(this.playerDeath);
        
        this.scoreCont = new PIXI.Container();
        this.scoreCont.sortableChildren = true;
        this.deathCont.addChild(this.scoreCont);
        this.scoreCont.zIndex = 45000;
        this.scoreCont.alpha=0;

        this.finalScoreText = new PIXI.Text('FINAL SCORE');
        this.finalScoreText.anchor.x=0.5
        this.finalScoreText.position.y = -320;
        this.finalScoreText._zIndex = 215;
        this.finalScoreText.style = new PIXI.TextStyle({
            align: "center",
            lineHeight: 0,
            fill: 0xe7ce78,
            fontSize: 12,
            fontFamily: "Ambitsek"
        })
        this.finalScoreText.resolution = 3;
        this.scoreCont.addChild(this.finalScoreText);
        
        this.totalText = new PIXI.Text('0');
        this.totalText.anchor.x=0.5
        this.totalText.position.y = -315;
        this.totalText._zIndex = 215;
        this.totalText.style = new PIXI.TextStyle({
            align: "center",
            lineHeight: 0,
            fill: 0xe7ce78,
            fontSize: 48,
            fontFamily: "Ambitsek"
        })
        this.totalText.resolution = 3;
        this.scoreCont.addChild(this.totalText);
        
        this.leftText = new PIXI.Text('ENEMIES KILLED\n\nCOINS COLLECTED');
        this.leftText.anchor.x=1
        this.leftText.position.x = 25;
        this.leftText.position.y = -215;
        this.leftText._zIndex = 215;
        this.leftText.style = new PIXI.TextStyle({
            align: "right",
            lineHeight: 0,
            fill: 0xffffff,
            fontSize: 12,
            fontFamily: "Ambitsek"
        })
        this.leftText.resolution = 3;
        this.scoreCont.addChild(this.leftText);
        
        this.rightText = new PIXI.Text('0\n\n0');
        this.rightText.anchor.x=0
        this.rightText.position.x = 75;
        this.rightText.position.y = -215;
        this.rightText._zIndex = 215;
        this.rightText.style = new PIXI.TextStyle({
            align: "left",
            lineHeight: 0,
            fill: 0xffffff,
            fontSize: 12,
            fontFamily: "Ambitsek"
        })
        this.rightText.resolution = 3;
        this.scoreCont.addChild(this.rightText);

        this.bottomText = new PIXI.Text('TIME: 4:23 - LEVEL: 9 - POWER-UPS: 14');
        this.bottomText.anchor.x=0.5
        this.bottomText.anchor.Y=0.5
        this.bottomText.position.y = -117;
        this.bottomText._zIndex = 215;
        this.bottomText.style = new PIXI.TextStyle({
            align: "center",
            lineHeight: 0,
            fill: 0x93834a,
            fontSize: 12,
            fontFamily: "Ambitsek"
        })
        this.bottomText.resolution = 3;
        this.scoreCont.addChild(this.bottomText);
        
        //--------------------------------------------------------------------

        this.icons = [];

        this.botCont = new PIXI.Container();
        this.botCont.sortableChildren = true;
        this.baseCont.addChild(this.botCont);

        this.botCont.scale.x = this.botCont.scale.y = 2;

        this.baseCont.zIndex = 4000;

        for(var i=0; i<30; i++){

            this.icon = new PIXI.Sprite(this.t_i_lightningStrike);
            this.icon.position.x = i*14;
            this.icon.anchor.y = 1;
            this.icon.alpha = 0;
            this.botCont.addChild(this.icon);

            this.icons.push(this.icon);

        }

        //--------------------------------------------------------------------

        this.leftCont = new PIXI.Container();
        this.leftCont.sortableChildren = true;
        this.baseCont.addChild(this.leftCont);
        this.leftCont._zIndex = 30000;
        this.leftCont.scale.x = this.leftCont.scale.y = 2

        this.leftUI = new PIXI.Sprite(this.t_leftUI);
        this.leftUI.anchor.x = 0;
        this.leftUI.anchor.y = 0;
        this.leftUI._zIndex = 100
        this.leftUI.alpha = 1;
        this.leftCont.addChild(this.leftUI);

        this.leftUIBack = new PIXI.Sprite(this.t_leftUIBack);
        this.leftUIBack.anchor.x = 0;
        this.leftUIBack.anchor.y = 0;
        this.leftUIBack._zIndex = 10
        this.leftUIBack.alpha = 1;
        this.leftCont.addChild(this.leftUIBack);

        this.leftUIMask = new PIXI.Sprite(this.t_leftUIBack);
        this.leftUIMask.anchor.x = 1;
        this.leftUIMask.anchor.y = 0;
        this.leftUIMask._zIndex = 10
        this.leftUIMask.alpha = 1;
        this.leftCont.addChild(this.leftUIMask);

        this.leftRedBar = new PIXI.Sprite(this.t_redBarColor);
        this.leftRedBar.anchor.x = 0;
        this.leftRedBar.anchor.y = 0;
        this.leftRedBar._zIndex = 50
        this.leftRedBar.alpha = 1;
        this.leftCont.addChild(this.leftRedBar);

        // this.leftRedBar.mask = this.leftUIMask;

        //red text

        this.levText = new PIXI.Text('0');
        this.levText.anchor.x = 0;
        this.levText.anchor.y = 0;
        this.levText.position.x = 42;
        this.levText.position.y = 8;
        this.levText._zIndex = 215;
        this.levText.style = new PIXI.TextStyle({
            align: "left",
            lineHeight: 0,
            fill: 0xb03037,
            fontSize: 10,
            fontFamily: "SFPixelate"
        })
        this.levText.resolution = 2;
        this.leftCont.addChild(this.levText);

        //green text

        this.timeText = new PIXI.Text('0');
        this.timeText.anchor.x = 0;
        this.timeText.anchor.y = 0;
        this.timeText.position.x = 43;
        this.timeText.position.y = 30;
        this.timeText._zIndex = 215;
        this.timeText.style = new PIXI.TextStyle({
            align: "left",
            lineHeight: 0,
            fill: 0x485e63,
            fontSize: 9,
            fontFamily: "BMSpace"
        })
        this.timeText.resolution = 2;
        this.leftCont.addChild(this.timeText);
        
        //--------------------------------------------------------------------

        this.rightCont = new PIXI.Container();
        this.rightCont.sortableChildren = true;
        this.baseCont.addChild(this.rightCont);
        this.rightCont._zIndex = 30000;
        this.rightCont.scale.x = this.rightCont.scale.y = 2

        this.rightUI = new PIXI.Sprite(this.t_rightUI);
        this.rightUI.anchor.x = 1;
        this.rightUI.anchor.y = 0;
        this.rightUI._zIndex = 100
        this.rightUI.alpha = 1;
        this.rightCont.addChild(this.rightUI);

        this.rightUIBack = new PIXI.Sprite(this.t_rightUIBack);
        this.rightUIBack.anchor.x = 1;
        this.rightUIBack.anchor.y = 0;
        this.rightUIBack._zIndex = 10
        this.rightUIBack.alpha = 1;
        this.rightCont.addChild(this.rightUIBack);

        // this.rightUIMask = new PIXI.Sprite(this.t_rightUIBack);
        // this.rightUIMask.anchor.x = 0;
        // this.rightUIMask.position.x = -this.rightUIMask.width;
        // this.rightUIMask.anchor.y = 0;
        // this.rightUIMask._zIndex = 330
        // this.rightUIMask.alpha = 0;
        // this.rightCont.addChild(this.rightUIMask);

        this.rightRedBar = new PIXI.Sprite(this.t_redBarColor);
        this.rightRedBar.anchor.x = 1;
        this.rightRedBar.anchor.y = 0;
        this.rightRedBar._zIndex = 50
        // this.rightRedBar.width=400
        // this.rightRedBar.position.x=-400
        this.rightRedBar.alpha = 1;
        this.rightCont.addChild(this.rightRedBar);

        // this.rightRedBar.mask = this.rightUIMask;

        //red text

        this.coinText = new PIXI.Text('0');
        this.coinText.anchor.x = 1;
        this.coinText.anchor.y = 0;
        this.coinText.position.x = -42;
        this.coinText.position.y = 8;
        this.coinText.zIndex = 215;
        this.coinText.style = new PIXI.TextStyle({
            align: "right",
            lineHeight: 0,
            fill: 0xb03037,
            fontSize: 10,
            fontFamily: "SFPixelate"
        })
        this.coinText.resolution = 2;
        this.rightCont.addChild(this.coinText);

        //green text

        this.scoreText = new PIXI.Text('0');
        this.scoreText.anchor.x = 1;
        this.scoreText.anchor.y = 0;
        this.scoreText.position.x = -50;
        this.scoreText.position.y = 30;
        this.scoreText.zIndex = 215;
        this.scoreText.style = new PIXI.TextStyle({
            align: "right",
            lineHeight: 0,
            fill: 0x485e63,
            fontSize: 9,
            fontFamily: "BMSpace"
        })
        this.scoreText.resolution = 2;
        this.rightCont.addChild(this.scoreText);
        
        //--------------------------------------------------------------------

        this.lifeCont = new PIXI.Container();
        this.lifeCont.sortableChildren = true;
        this.mainCont.addChild(this.lifeCont);

        this.lifeCont._zIndex = 100;

        this.hearts=[];

        for(var i=0; i<4; i++){

            this.heart = new PIXI.Sprite(this.t_heart);
            this.heart.position.x = (i*50)-75;
            // this.heart.width = this.heart.height = 15;
            this.heart.scale.x = this.heart.scale.y = 2;
            this.heart.anchor.x = 0.5;
            this.heart.anchor.y = 0.5;
            this.heart._zIndex = 100
            this.lifeCont.addChild(this.heart);

            this.hearts.push(this.heart)

        }

        //--------------------------------------------------------------------

        this.powerCont = new PIXI.Container();
        this.powerCont.sortableChildren = true;
        this.mainCont.addChild(this.powerCont);

        this.puBack = new PIXI.Sprite(this.t_puBack);
        this.puBack.anchor.x = this.puBack.anchor.y = .5;
        this.puBack._zIndex = 100000
        this.puBack.scale.x = this.puBack.scale.y = 2
        this.powerCont.addChild(this.puBack);

        this.powerPics=[];
        this.powerButs=[];
        this.puTitles=[];
        this.puDiscs=[];

        for(var i=0; i<=2; i++){

            this.texture = this.red;
            this.powerPic = new PIXI.Sprite(this.texture);
            this.powerPic.position.x = -162;
            this.powerPic.position.y = ((i)*104)-90;
            this.powerPic.width = this.powerPic.height = 100;
            this.powerPic.anchor.x = 0.5;
            this.powerPic.anchor.y = 0.5;
            this.powerPic._zIndex = 99000
            this.powerPic.num = i;
            this.powerCont.addChild(this.powerPic);

            this.powerPics.push(this.powerPic)

            //-----------------

            this.but = new PIXI.Sprite(this.red);
            this.but.position.x = -212;
            this.but.position.y = ((i)*104)-90;
            this.but.width = 428
            this.but.height = 100;
            this.but.anchor.x = 0;
            this.but.anchor.y = 0.5;
            this.but._zIndex = 399000
            this.but.alpha = 0
            this.but.num = i;
            this.powerCont.addChild(this.but);

            //-----------------

            if(i===0){

                this.but.on('mousedown', (event) => { this.powerButtonPushed(0) })
                this.but.on('touchstart', (event) => { this.powerButtonPushed(0) })

            }else if(i===1){

                this.but.on('mousedown', (event) => { this.powerButtonPushed(1) })
                this.but.on('touchstart', (event) => { this.powerButtonPushed(1) })

            }else if(i===2){

                this.but.on('mousedown', (event) => { this.powerButtonPushed(2) })
                this.but.on('touchstart', (event) => { this.powerButtonPushed(2) })

            }

            this.powerButs.push(this.but)

            //-----------------

            this.puTextTitle = new PIXI.Text('LIGHTNING BOLTS');
            this.puTextTitle.position.x = -88;
            this.puTextTitle.position.y = -126+(i*104);
            this.puTextTitle.zIndex = 215000;
            this.puTextTitle.style = new PIXI.TextStyle({
                align: "left",
                lineHeight: 0,
                fill: 0xa8c3c7,
                fontSize: 16,
                fontFamily: "Ambitsek"
            })
            this.puTextTitle.resolution = 3;
            this.powerCont.addChild(this.puTextTitle);

            this.puTitles.push(this.puTextTitle)

            this.puTextDisc = new PIXI.Text('strikes random enemies\ndead.');
            this.puTextDisc.position.x = -88;
            this.puTextDisc.position.y = -100+(i*104);
            this.puTextDisc.zIndex = 215000;
            this.puTextDisc.style = new PIXI.TextStyle({
                align: "left",
                lineHeight: 0,
                fill: 0x5c7579,
                fontSize: 16,
                fontFamily: "Ambitsek"
            })
            this.puTextDisc.resolution = 3;
            this.powerCont.addChild(this.puTextDisc);

            this.puDiscs.push(this.puTextDisc)

        }

        this.powerCont.alpha = 0;

    }

    powerButtonPushed(num){

        this.e.scene.powerPick = num;
        this.e.scene.action = "power up out";

    }

    getPowerIcon(p, num){

        // console.log("get power icon "+p)

        if(p==="backwardsShot"){

            this.puTitles[num].text = "BACKWARDS SHOT"
            this.puDiscs[num].text = "fire a shot backwards\neach time you shooot"

            return this.t_pi_backwardsShot

        }else if(p==="biggerShot" || p==="biggerShot2" || p==="biggerShot3" || p==="biggerShot4"){

            if(p==="biggerShot"){
                this.puTitles[num].text = "BIGGER SHOT I."
            }else if(p==="biggerShot2"){
                this.puTitles[num].text = "BIGGER SHOT II."
            }else if(p==="biggerShot3"){
                this.puTitles[num].text = "BIGGER SHOT III."
            }else if(p==="biggerShot4"){
                this.puTitles[num].text = "BIGGER SHOT IV."
            }
            this.puDiscs[num].text = "increases the size and\nstrength of your shot"

            return this.t_pi_biggerShot
            
        }else if(p==="bombs" || p==="bombs2" || p==="bombs3" ){

            if(p==="bombs"){
                this.puTitles[num].text = "BOMBS I."
            }else if(p==="bombs2"){
                this.puTitles[num].text = "BOMBS II."
            }else if(p==="bombs3"){
                this.puTitles[num].text = "BOMBS III."
            }
            this.puDiscs[num].text = "fused bombs that\nexplode"

            return this.t_pi_bombs

        }else if(p==="extraShot" || p==="extraShot2" || p==="extraShot3" || p==="extraShot4"){
            
            if(p==="extraShot"){
                this.puTitles[num].text = "EXTRA SHOT I."
            }else if(p==="extraShot2"){
                this.puTitles[num].text = "EXTRA SHOT II."
            }else if(p==="extraShot3"){
                this.puTitles[num].text = "EXTRA SHOT III."
            }else if(p==="extraShot4"){
                this.puTitles[num].text = "EXTRA SHOT IV."
            }
            this.puDiscs[num].text = "shoot an extra shot\neach time you shoot"

            return this.t_pi_extraShot
        }else if(p==="fasterShot" || p==="fasterShot2" || p==="fasterShot3" || p==="fasterShot4"){

            if(p==="fasterShot"){
                this.puTitles[num].text = "FASTER SHOT I."
            }else if(p==="fasterShot2"){
                this.puTitles[num].text = "FASTER SHOT II."
            }else if(p==="fasterShot3"){
                this.puTitles[num].text = "FASTER SHOT III."
            }else if(p==="fasterShot4"){
                this.puTitles[num].text = "FASTER SHOT IV."
            }
            this.puDiscs[num].text = "shoot faster"

            return this.t_pi_fasterShot

        }else if(p==="fireballs" || p==="fireballs2" || p==="fireballs3"){
            
            if(p==="fireballs"){
                this.puTitles[num].text = "FIREBALLS I."
            }else if(p==="fireballs2"){
                this.puTitles[num].text = "FIREBALLS II."
            }else if(p==="fireballs3"){
                this.puTitles[num].text = "FIREBALLS III."
            }
            this.puDiscs[num].text = "instantly burn all\nenemies in their path"

            return this.t_pi_fireballs

        }else if(p==="footSpeed" || p==="footSpeed2" || p==="footSpeed3" ){

            if(p==="footSpeed"){
                this.puTitles[num].text = "FOOT SPEED I."
            }else if(p==="footSpeed2"){
                this.puTitles[num].text = "FOOT SPEED II."
            }else if(p==="footSpeed3"){
                this.puTitles[num].text = "FOOT SPEED III."
            }
            this.puDiscs[num].text = "move faster"

            return this.t_pi_footSpeed

        }else if(p==="freeze" || p==="freeze2"){

            if(p==="freeze"){
                this.puTitles[num].text = "FREEZE I."
            }else if(p==="freeze2"){
                this.puTitles[num].text = "FREEZE II."
            }
            this.puDiscs[num].text = "freezes enemies near\nyou for a short time"

            return this.t_pi_frost

        }else if(p==="heal" || p==="heal2"){
            
            this.puTitles[num].text = "HEAL"
           
            this.puDiscs[num].text = "heals one heart"

            return this.t_pi_heal

        }else if(p==="lightningStrike" || p==="lightningStrike2" || p==="lightningStrike3"){
            
            if(p==="lightningStrike"){
                this.puTitles[num].text = "LIGHTNING BOLTS I."
            }else if(p==="lightningStrike2"){
                this.puTitles[num].text = "LIGHTNING BOLTS II."
            }else if(p==="lightningStrike3"){
                this.puTitles[num].text = "LIGHTNING BOLTS III."
            }
            this.puDiscs[num].text = "strikes down random\nenemies"

            return this.t_pi_lightningStrike

        }else if(p==="magnet" || p==="magnet2"){

            if(p==="magnet"){
                this.puTitles[num].text = "MAGNET I."
            }else if(p==="magnet2"){
                this.puTitles[num].text = "MAGNET II."
            }
            this.puDiscs[num].text = "increase gold pick up\nrange"

            return this.t_pi_magnet

        }else  if(p==="ninjaStar" || p==="ninjaStar2" || p==="ninjaStar3"){
            
            if(p==="ninjaStar"){
                this.puTitles[num].text = "NINJA STAR I."
            }else if(p==="ninjaStar2"){
                this.puTitles[num].text = "NINJA STAR II."
            }else if(p==="ninjaStar3"){
                this.puTitles[num].text = "NINJA STAR III."
            }
            this.puDiscs[num].text = "circles around you"

            return this.t_pi_ninjaStar

        }else  if(p==="splinter"){
            
            this.puTitles[num].text = "SPLINTER"
            this.puDiscs[num].text = "when killed, enemies\nshoot out 3 shots"

            return this.t_pi_splinter

        }else  if(p==="summon"){
            return this.t_pi_summon
        } 

    }

    update(){

        this.animate();

        if(this.scoreText!==null && this.scoreText!==undefined){

            this.instructions.position.x = window.innerWidth/2;
            this.instructions.position.y = window.innerHeight/2;
    
            this.powerCont.position.x = window.innerWidth/2;
            this.powerCont.position.y = (window.innerHeight/2);

            this.lifeCont.position.x = window.innerWidth/2;
            this.lifeCont.position.y = 35;

            this.faderRed.width = window.innerWidth;
            this.faderRed.height = window.innerHeight;

            this.vig.width = window.innerWidth;
            this.vig.height = window.innerHeight;

            this.rightCont.position.x = window.innerWidth;
            this.botCont.position.x = 100;
            this.botCont.position.y = window.innerHeight;

            this.deathCont.position.x = window.innerWidth/2;
            this.deathCont.position.y = Math.round((window.innerHeight/2)+this.e.scene.t.deathOffset);

            if(this.e.mobile===true){
                this.leftCont.scale.x = this.leftCont.scale.y = 1
                this.rightCont.scale.x = this.rightCont.scale.y = 1
                this.lifeCont.scale.x = this.lifeCont.scale.y = .5
                this.powerCont.scale.x = this.powerCont.scale.y = .5
                this.botCont.scale.x = this.botCont.scale.y = 1
                this.botCont.position.x = 10;
                this.instructions.scale.x = this.instructions.scale.y = 1
                this.lifeCont.position.y = 55;
            }
            
        }


        // //base cont
        // this.baseCont = new PIXI.Container();
        // this.baseCont.sortableChildren = true;
        // this.app.stage.addChild(this.baseCont);

        // this.tester = new PIXI.Sprite(this.white);
        // this.tester.width=50;
        // this.tester.height=50;
        // // this.tester.alpha=0;
        // this.tester._zIndex=100000;
        // this.app.stage.addChild(this.tester);

        // //main cont
        // this.mainCont = new PIXI.Container();
        // this.mainCont.sortableChildren = true;
        // this.baseCont.addChild(this.mainCont);

        // //center main cont
        // this.mainCont.position.x = Math.round(window.innerWidth/2);

    }

    animate() {

        for (var i = 0; i < this.animatedSprites.length; i++) {

            if (this.animatedSprites !== null) {

                var a = this.animatedSprites[i];

                if (a.aniCount === undefined) {
                    a.aniCount = 0;
                    a.curFrame = 0;
                }

                if (a.aniSpeed === undefined) {
                    a.aniSpeed = .25;
                }

                if (a.ani === undefined) {
                    a.ani = [];
                }

                a.aniCount += this.e.dt;

                if (a.aniCount > a.aniSpeed) {

                    a.aniCount = 0;
                    a.curFrame += 1;

                    if(a.curFrame>=a.ani.length-1 && a.aniLoop===false){
                        a.curFrame=a.ani.length-1
                    }
                    
                    if (a.curFrame >= a.ani.length && a.aniLoop!==false) {
                        a.curFrame = 0;
                    }

                    a.texture = a.ani[a.curFrame];
                    
                }

            }

        }

    }
}