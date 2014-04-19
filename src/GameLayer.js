var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.stickman = new Stickman();
        this.stickman.setPosition(new cc.Point( screenWidth/2, screenHeight/2))
        this.addChild(this.stickman);

        this.initLife();
        this.initGauge();
        this.schedule( this.generateBlock, sec);

        this.scheduleUpdate();
        // this.stickman.scheduleUpdate();
        // this.woman = new Woman();
        // this.woman.setPosition(new cc.Point( 470, 250))
        // this.addChild(this.woman);

        this.setKeyboardEnabled(true);
        return true;
    }, generateBlock: function() {
        var randomPos = Math.floor( Math.random() * 4 );
        var randomMeat = Math.floor( Math.random() * 4 );
        var randomEnergy = Math.floor( Math.random() *1 );

        this.manageEnergy( randomPos );
        if( randomMeat == 1){
            this.manageMeat( randomPos );
        }
        else this.manageBlock( randomPos );
    }, manageEnergy: function( randomPos) {
        if( randomPos == 0 ){
            this.createEnergy( 0, screenHeight/2 + 20, Energy.NAME.ENERGY1 );
        } else if( randomPos == 1 ) {
            this.createEnergy( 0, screenHeight/2 -50, Energy.NAME.ENERGY2 );
        } else if( randomPos == 2 ) {
            this.createEnergy( screenWidth, screenHeight/2 + 20, Energy.NAME.ENERGY3 );
        } else {
            this.createEnergy( screenWidth, screenHeight/2 - 50, Energy.NAME.ENERGY4 );
        }
    }, manageBlock: function( randomPos ) {
        if( randomPos == 0 ) {
            this.createBlock( 0, screenHeight/2 + 20, Block.NAME.BLOCK1 );
        } else if( randomPos == 1 ) {
            this.createBlock( 0, screenHeight/2 -50, Block.NAME.BLOCK2 );
        } else if( randomPos == 2 ) {
            this.createBlock( screenWidth, screenHeight/2 + 20, Block.NAME.BLOCK3 );
        } else {
            this.createBlock( screenWidth, screenHeight/2 - 50, Block.NAME.BLOCK4 );
        }
    }, manageMeat: function( randomPos ) {
        if( randomPos == 0 ){
            this.createMeat( 0, screenHeight/2 + 20, Meat.NAME.MEAT1 );
        } else if( randomPos == 1 ) {
            this.createMeat( 0, screenHeight/2 -50, Meat.NAME.MEAT2 );
        } else if( randomPos == 2 ) {
            this.createMeat( screenWidth, screenHeight/2 + 20, Meat.NAME.MEAT3 );
        } else {
            this.createMeat( screenWidth, screenHeight/2 - 50, Meat.NAME.MEAT4 );
        }
    }, createEnergy: function( positionX, positionY, name) {
        this.energy = new Energy();
        this.energy.setPosition( new cc.Point( positionX, positionY ) );
        this.addChild( this.energy );
        gauges.push( this.energy );
        this.energy.setName( name );
        this.energy.scheduleUpdate();
    }, createBlock: function( positionX, positionY, name) {
        this.block = new Block();
        this.block.setPosition( new cc.Point( positionX, positionY ) );
        this.addChild( this.block );
        blocks.push( this.block );
        this.block.setName( name );
        this.block.scheduleUpdate();
    }, createMeat: function( positionX, positionY, name) {
        this.meat = new Meat();
        this.meat.setPosition( new cc.Point( positionX, positionY ) );
        this.addChild( this.meat );
        meats.push( this.meat );
        this.meat.setName( name );
        this.meat.scheduleUpdate();
    }, initLife: function() {
        for(var i = 0; i < 5; i++ ) {
            lifes[i] = new Heart();
        }
        this.showLife();
    }, initGauge: function() {
        this.ultimateBar = new UltimateBar();
        this.ultimateBar.setPosition( new cc.Point( screenWidth - 165, screenHeight - 30 ) );
        this.addChild( this.ultimateBar );
        // this.showGauge();
    }, showGauge: function() {
        for( var i = 0; i < 5; i++ ) {
            this.gauge = new Gauge();
            this.gauge.setPosition( new cc.Point( screenWidth - (i * 60 + 45 ), screenHeight - 30 ) );
            this.addChild( this.gauge );
        }
    }, showLife: function() {
        for( var i = 0; i < lifes.length; i++ ) {
            lifes[i].setPosition( new cc.Point( i * 55 + 30, screenHeight - 30 ) );
            this.addChild( lifes[i] );
        }
    }, increaseLife: function( quantity ) {
        if( life < 7 ){
            for( var i = life; i < life + quantity; i++ ) {
                this.heart = new Heart();
                this.heart.setPosition( new cc.Point( i * 55 + 30, screenHeight - 30 ) );
                this.addChild( this.heart );
                lifes.push( this.heart );
                console.log( i )
            }
        life += quantity;
        }
    }, decreaseLife: function( quantity ) {
        this.removeChild( lifes[life-1] );
        lifes.splice( life - 1, 1);
        life -= quantity;
    }, removeBlock: function( i ) {
        this.removeChild( blocks[i] );
        blocks.splice( i, 1 );
    }, removeMeat: function( i ) {
        this.removeChild( meats[i] );
        meats.splice( i, 1 );
    }, removeEnergy: function( i ) {
        this.removeChild( gauges[i] );
        gauges.splice( i, 1 );
    }, update:function() {
        this.checkBlock();
        this.checkMeat();
        this.checkEnergy();
    }, checkEnergy: function() {
        console.log( gauges.length );
        for( var i = 0; i < gauges.length; i++ ){
            if( gauges[i].getPositionX() < 0 || gauges[i].getPositionX() > screenWidth ) {
                this.removeEnergy( i );
            }
        }
    }, checkMeat: function(){
        for( var i = 0; i < meats.length; i++ ){
            if( meats[i].getPositionX() < 0 || meats[i].getPositionX() > screenWidth ) {
                this.removeMeat( i );
            }
            if( meats[i].hit( this.stickman ) ){
                if( meats[i].checkAction( this.stickman ) ) {
                    this.removeMeat( i );
                    this.increaseLife( 1 );
                }
                else {
                    this.removeMeat( i );
                }
            }
        }
    }, checkBlock: function(){
        for( var i = 0; i < blocks.length; i++ ) {
            if( blocks[i].getPositionX() < 0 || blocks[i].getPositionX() > screenWidth ){
                this.removeBlock( i );
            }
            else if( blocks[i].hit( this.stickman ) ) {
                if( blocks[i].checkAction( this.stickman ) ) {
                    this.removeBlock( i );
                    console.log( 'true');
                }
                else {
                    if( life == 0 );
                    else {
                        this.decreaseLife( 1 );
                        this.removeBlock( i );
                    }
                    // this.endGame();
                }
            }
        }
    }, endGame: function() {
        console.log('fuck this')
        exit( 0 );
    }, onKeyDown: function( e ) {
        if( keyPressed == false ) {
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
                    if( this.stickman.movement == Stickman.MOV.STILL ) {
                        this.stickman.setMovement( Stickman.MOV.HIGH );
                        this.stickman.attackMove( Stickman.MOV.HIGH );
                        this.keyPressed = true;
                    }
                    break;
                case cc.KEY.c:
                    if( this.stickman.movement == Stickman.MOV.STILL ) {
                        this.stickman.setMovement( Stickman.MOV.LOW );
                        this.stickman.attackMove( Stickman.MOV.LOW );
                        this.keyPressed = true;
                    } 
                    break;
            }
        }
    }, onKeyUp: function( e ){
        this.stickman.stopAllActions();
        this.stickman.setMovement( Stickman.DIR.STILL );
        this.stickman.standMove();
        this.keyPressed = false;
    }
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
var sec = 3;
var level = 1;
var life  = 5;
var ulti = 0;
var keyPressed = false;