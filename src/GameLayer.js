var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.stickman = new Stickman();
        this.stickman.setPosition(new cc.Point( screenWidth/2, screenHeight/2))
        this.addChild(this.stickman);

        this.initLife();
        this.initGauge();
        this.schedule( this.levelUp, 5 )
        this.schedule( this.generateItems, sec);

        this.levelLabel = cc.LabelTTF.create( "Level " + level, "Arial", 50 );
        this.levelLabel.setPosition( new cc.Point( screenWidth/2, screenHeight*3/4 ) );
        this.addChild( this.levelLabel );
        // cc.AudioEngine.getInstance().playEffect( 'res/sound/sound_background.mp3' , true);

        this.scheduleUpdate();

        this.setKeyboardEnabled(true);
        return true;
    }, 

    levelUp: function() {

        if ( level >= 5) return;
        this.getScheduler().unscheduleCallbackForTarget( this, this.generateItems );
        level++;
        sec -= 0.2;
        this.updateLevelLabel();
        this.schedule( this.generateItems, sec );
    },

    generateItems: function() {

        var randomPos = Math.floor( Math.random() * 4 );
        var randomItem = Math.floor( Math.random() * 6 );

        if ( randomItem == 1){
            this.manageMeat( randomPos );
        }
        else if ( randomItem == 2 ) {
            this.manageEnergy( randomPos );
        }
        else this.manageBlock( randomPos );
    }, 

    manageEnergy: function( randomPos) {
        if ( randomPos == 0 ){
            this.createEnergy( 0, screenHeight/2 + 20, Energy.NAME.ENERGY1 );
        }
        else if ( randomPos == 1 ) {
            this.createEnergy( 0, screenHeight/2 -50, Energy.NAME.ENERGY2 );
        }
        else if ( randomPos == 2 ) {
            this.createEnergy( screenWidth, screenHeight/2 + 20, Energy.NAME.ENERGY3 );
        }
        else {
            this.createEnergy( screenWidth, screenHeight/2 - 50, Energy.NAME.ENERGY4 );
        }
    }, 

    manageBlock: function( randomPos ) {
        if ( randomPos == 0 ) {
            this.createBlock( 0, screenHeight/2 + 20, Block.NAME.BLOCK1 );
        }
        else if ( randomPos == 1 ) {
            this.createBlock( 0, screenHeight/2 -50, Block.NAME.BLOCK2 );
        }
        else if ( randomPos == 2 ) {
            this.createBlock( screenWidth, screenHeight/2 + 20, Block.NAME.BLOCK3 );
        }
        else {
            this.createBlock( screenWidth, screenHeight/2 - 50, Block.NAME.BLOCK4 );
        }
    }, 

    manageMeat: function( randomPos ) {
        if ( randomPos == 0 ){
            this.createMeat( 0, screenHeight/2 + 20, Meat.NAME.MEAT1 );
        }
        else if ( randomPos == 1 ) {
            this.createMeat( 0, screenHeight/2 -50, Meat.NAME.MEAT2 );
        }
        else if ( randomPos == 2 ) {
            this.createMeat( screenWidth, screenHeight/2 + 20, Meat.NAME.MEAT3 );
        }
        else {
            this.createMeat( screenWidth, screenHeight/2 - 50, Meat.NAME.MEAT4 );
        }
    }, 

    createEnergy: function( positionX, positionY, name) {
        this.energy = new Energy();
        this.energy.setPosition( new cc.Point( positionX, positionY ) );
        this.addChild( this.energy );
        energys.push( this.energy );
        this.energy.setName( name );
        this.energy.scheduleUpdate();
    }, 

    createBlock: function( positionX, positionY, name) {
        this.block = new Block();
        this.block.setPosition( new cc.Point( positionX, positionY ) );
        this.addChild( this.block );
        blocks.push( this.block );
        this.block.setName( name );
        this.block.scheduleUpdate();
    }, 

    createMeat: function( positionX, positionY, name) {
        this.meat = new Meat();
        this.meat.setPosition( new cc.Point( positionX, positionY ) );
        this.addChild( this.meat );
        meats.push( this.meat );
        this.meat.setName( name );
        this.meat.scheduleUpdate();
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
                console.log( i )
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
            if ( meats[i].getPositionX() < 0 || meats[i].getPositionX() > screenWidth ) {
                this.removeMeat( i );
            }
            if ( meats[i].hit( this.stickman, distance ) ){
                if ( meats[i].checkAction( this.stickman ) ) {
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
                    if ( life == 0 ) {
                        this.endGame();
                    }
                    else {
                        this.decreaseLife( 1 );
                        this.removeBlock( i );
                    }
                    // this.endGame();
                }
            }
        }
    },

    endGame: function() {
        if( confirm( ' YOU LOSE !' ) ) {
            location.reload();
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
                        this.scheduleOnce( function(){ 
                        this.stickman.createMovement( Stickman.MOV.STILL ) }, 0.25 );
                        this.stickman.createMovement( Stickman.MOV.HIGH );
                        this.keyPressed = true;
                    }
                    break;
                case cc.KEY.c:
                    if ( this.stickman.movement != Stickman.MOV.LOW ) {
                        this.scheduleOnce( function(){ 
                        this.stickman.createMovement( Stickman.MOV.STILL ) }, 0.25 );
                        this.stickman.createMovement( Stickman.MOV.LOW );
                        this.keyPressed = true;
                    }
                    break;
                case cc.KEY.z:
                    if ( ulti == 5 ) {
                        if ( this.stickman.movement != Stickman.MOV.ULTIMATE ) {
                        this.scheduleOnce( function(){ 
                        this.stickman.createMovement( Stickman.MOV.STILL ) }, 3 );
                        this.stickman.createMovement( Stickman.MOV.ULTIMATE );
                        this.keyPressed = true;
                        }
                    this.decreaseGauge();
                    }
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

var meats = [];
var blocks = [];
var lifes = [];
var gauges = [];
var energys = [];
var sec = 1.2;
var level = 1;
var life  = 5;
var ulti = 0;
var keyPressed = false;