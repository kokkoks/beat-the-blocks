var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.backgroundPicture = new Background();
        this.backgroundPicture.setPosition( new cc.Point( screenWidth/2, screenHeight/2 ) );
        this.addChild( this.backgroundPicture );

        this.stickman = new Stickman();
        this.stickman.setPosition(new cc.Point( screenWidth/2, screenHeight*1/3 ) );
        this.addChild( this.stickman );

        this.hurt = new Hurt();
        this.hurt.setPosition( new cc.Point( screenWidth/2, screenHeight/2 ) );
        this.initLife();
        this.initGauge();
        this.schedule( this.levelUp, 15 )
        this.schedule( this.generateItems, sec);

        this.adapter = new AdapterNumber();

        this.levelLabel = cc.LabelTTF.create( "Level " + level, "Arial", 50 );
        this.levelLabel.setColor(new cc.Color3B( 0, 0, 0) );
        this.levelLabel.setPosition( new cc.Point( screenWidth/2, screenHeight*3/4 ) );
        this.addChild( this.levelLabel );
        // cc.AudioEngine.getInstance().playEffect( 'res/sound/sound_background.mp3' , true);

        this.scheduleUpdate();

        this.setKeyboardEnabled(true);
        return true;
    }, 

    levelUp: function() {

        if ( level >= 10) return;
        this.getScheduler().unscheduleCallbackForTarget( this, this.generateItems );
        level++;
        sec -= 0.1;
        this.updateLevelLabel();
        this.schedule( this.generateItems, sec );
    },

    generateItems: function() {

        var randomPos = Math.floor( Math.random() * 4 );
        var randomItem = Math.floor( Math.random() * 6 );

        var item;
        var array;
        if (randomItem == 0)
        {
            item = new Item("res/images/meat.png");
            array = meats;
        }
        else if (randomItem == 1)
        {
            item = new Item("res/images/energy.png");
            array = energys;
        }
        else
        {
            item = new Item("res/images/stone.png");
            array = blocks;
        }
            this.manageItem( randomPos, item, array);
    }, 


    manageItem: function( randomPos, item, array ) {
        var positionX = this.adapter.adaptNumberToWidth(randomPos);
        var positionY = this.adapter.adaptNumberToHeight(randomPos);
        var direction = this.adapter.adaptNumberToDirection(randomPos);
        var level = this.adapter.adaptNumberToLevel(randomPos);

        this.createItem( item, array, positionX, positionY, direction, level );
    },

    createItem: function( item, array, positionX, positionY, direction, level) {
        item.setPosition( new cc.Point( positionX, positionY ) );
        this.addChild( item );
        array.push( item );
        item.setDirection( direction );
        item.setLevel ( level );
        item.scheduleUpdate();
    },

     

    initLife: function() {
        for (var i = 0; i < 5; i++ ) {
            lifes[i] = new Heart();
        }
        this.showLife();
    }, 

    initGauge: function() {
        this.ultimateBar = new UltimateBar();
        this.ultimateBar.setPosition( new cc.Point( screenWidth - 165, screenHeight - 30 ) );
        this.addChild( this.ultimateBar );
        // this.showGauge();
    }, 

    showGauge: function() {
        for ( var i = 0; i < 5; i++ ) {
            this.gauge = new Gauge();
            this.gauge.setPosition( new cc.Point( screenWidth - (i * 60 + 45 ), screenHeight - 30 ) );
            this.addChild( this.gauge );
        }
    }, 

    showLife: function() {
        for ( var i = 0; i < lifes.length; i++ ) {
            lifes[i].setPosition( new cc.Point( i * 55 + 30, screenHeight - 30 ) );
            this.addChild( lifes[i] );
        }
    }, 

    increaseLife: function( quantity ) {
        if ( life < 7 ){
            for ( var i = life; i < life + quantity; i++ ) {
                this.heart = new Heart();
                this.heart.setPosition( new cc.Point( i * 55 + 30, screenHeight - 30 ) );
                this.addChild( this.heart );
                lifes.push( this.heart );
            }
        life += quantity;
        }
    }, 

    decreaseLife: function( quantity ) {
        this.removeChild( lifes[life-1] );
        lifes.splice( life - 1, 1);
        life -= quantity;
    }, 

    increaseGauge: function( quantity ) {
        if ( ulti < 5 ){
            for ( var i = ulti; i < ulti + quantity; i++ ) {
                this.gauge = new Gauge();
                this.gauge.setPosition( new cc.Point( screenWidth - (i * 60 + 45 ), screenHeight - 30 ) );
                this.addChild( this.gauge );
                gauges.push( this.gauge );
            }
        ulti += quantity;
        }
    }, 

    decreaseGauge: function() {
        for ( var i = 4; i >= 0; i-- ){
            this.removeChild( gauges[i] );
            gauges.splice( i ,1 );
        }
        ulti = 0;
    },
    
    removeBlock: function( i ) {
        this.removeChild( blocks[i] );
        blocks.splice( i, 1 );
    },

    removeMeat: function( i ) {
        this.removeChild( meats[i] );
        meats.splice( i, 1 );
    },

    removeEnergy: function( i ) {
        this.removeChild( energys[i] );
        energys.splice( i, 1 );
    },

    update:function() {
        if ( this.stickman.movement ==  Stickman.MOV.ULTIMATE ){
            this.checkBlock( 200 );
            this.checkMeat( 200 );
            this.checkEnergy( 200 );
        }
        else {
            this.checkBlock( 80 );
            this.checkMeat( 80 );
            this.checkEnergy( 80 );
        }
    },

    updateLevelLabel:function() {
        this.levelLabel.setString( "Level " + level );
    },

    checkEnergy: function( distance ) {
        for ( var i = 0; i < energys.length; i++ ){
            if ( energys[i].getPositionX() < 0 || energys[i].getPositionX() > screenWidth ) {
                this.removeEnergy( i );
            }
            if ( energys[i].hit( this.stickman, distance ) ){
                if ( energys[i].checkAction( this.stickman ) ) {
                    cc.AudioEngine.getInstance().playEffect( 'res/sound/pick_energy.mp3' );
                    this.removeEnergy( i );
                    this.increaseGauge( 1 );
                }
                else {
                    this.removeEnergy( i );
                }
            }
        }
    },

    checkMeat: function( distance ){
        for ( var i = 0; i < meats.length; i++ ){
            // if ( meats[i].getPositionX() < 0 || meats[i].getPositionX() > screenWidth ) {
            //     this.removeMeat( i );
            // }
            if ( meats[i].hit( this.stickman, distance ) ){
                if ( meats[i].checkAction( this.stickman ) ) {
                    cc.AudioEngine.getInstance().playEffect( 'res/sound/eat.mp3' );
                    this.removeMeat( i );
                    this.increaseLife( 1 );
                }
                else {
                    this.removeMeat( i );
                }
            }
        }
    }, 

    checkBlock: function( distance ){
        for ( var i = 0; i < blocks.length; i++ ) {
            if ( blocks[i].getPositionX() < 0 || blocks[i].getPositionX() > screenWidth ){
                this.removeBlock( i );
            }
            else if ( blocks[i].hit( this.stickman, distance ) ) {
                if ( blocks[i].checkAction( this.stickman ) ) {
                    cc.AudioEngine.getInstance().playEffect( 'res/sound/soundpunch.mp3' );
                    this.removeBlock( i );
                }
                else {
                    if ( life > 1) {
                        this.addChild( this.hurt );
                        this.scheduleOnce( function(){
                        this.removeChild( this.hurt ) }, 0.05 );
                        this.decreaseLife( 1 );
                        this.removeBlock( i );
                        cc.AudioEngine.getInstance().playEffect( 'res/sound/hurt.wav' );
                    }
                    else
                    {    
                        cc.AudioEngine.getInstance().playEffect( 'res/sound/hurt.wav' );
                        this.endGame();
                    }
                }
            }
        }
    },

    endGame: function() {
        cc.AudioEngine.getInstance().stopMusic();
        setTimeout(function() 
            {
                confirm( ' YOU LOSE !' );
                location.reload(); 
            } ,10 );
    },

    checkStage: function() {
        if( this.stickman.movement != Stickman.MOV.ULTIMATE ) {
             this.stickman.createMovement( Stickman.MOV.STILL );
        }   
    },

    onKeyDown: function( e ) {
        if ( keyPressed == false ) {
            switch( e ) {
                case cc.KEY.left:
                    this.stickman.setDirection( Stickman.DIR.LEFT );
                    this.stickman.flipPicture( Stickman.DIR.LEFT );
                    this.keyPressed = true;
                    break;
                case cc.KEY.right:
                    this.stickman.setDirection( Stickman.DIR.RIGHT );
                    this.stickman.flipPicture( Stickman.DIR.RIGHT );
                    this.keyPressed = true;
                    break;
                case cc.KEY.x:
                    if ( this.stickman.movement != Stickman.MOV.HIGH ) {
                        this.scheduleOnce( function(){ this.checkStage() }, 0.25 );
                        this.stickman.createMovement( Stickman.MOV.HIGH );
                        this.keyPressed = true;
                    }
                    break;
                case cc.KEY.c:
                    if ( this.stickman.movement != Stickman.MOV.LOW ) {
                        this.scheduleOnce( function(){ this.checkStage() }, 0.25 );
                        this.stickman.createMovement( Stickman.MOV.LOW );
                        this.keyPressed = true;
                    }
                    break;
                case cc.KEY.z:
                    if ( ulti == 5 ) {
                        this.setKeyboardEnabled( false );
                        this.scheduleOnce( function(){
                            this.setKeyboardEnabled( true ) }, 3 );
                        this.scheduleOnce( function(){ 
                            this.stickman.createMovement( Stickman.MOV.STILL ) }, 3 );
                        this.stickman.createMovement( Stickman.MOV.ULTIMATE );
                        this.keyPressed = true;
                    this.decreaseGauge();
                    }
                    break;
                case cc.KEY.o:
                        this.setKeyboardEnabled( false );
                        this.scheduleOnce( function(){
                            this.setKeyboardEnabled( true ) }, 3 );
                        this.scheduleOnce( function(){ 
                            this.stickman.createMovement( Stickman.MOV.STILL ) }, 3 );
                        this.stickman.createMovement( Stickman.MOV.ULTIMATE );
                        this.keyPressed = true;
                    this.decreaseGauge();
                    
                    break;
            }
        }
    },
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


var lifes = [];
var meats = [];
var gauges = [];
var energys = [];
var blocks = [];
var ulti = 0;
var life  = 5;
var sec = 1.1;
var level = 1;
var keyPressed = false;