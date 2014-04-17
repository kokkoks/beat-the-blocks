var blocks = [];
var keyPressed = false;
var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.stickman = new Stickman();
        this.stickman.setPosition(new cc.Point( screenWidth/2, screenHeight/2))
        this.addChild(this.stickman);

        this.schedule( this.generateBlock, 3);

        this.scheduleUpdate();
        // this.stickman.scheduleUpdate();
        // this.woman = new Woman();
        // this.woman.setPosition(new cc.Point( 470, 250))
        // this.addChild(this.woman);

        this.setKeyboardEnabled(true);
        return true;
    }, generateBlock: function() {
        var randomBlock = Math.floor( Math.random() * 4 );
        if( randomBlock == 0 ) {
            this.createBlock( 0, screenHeight/2 + 20, Block.NAME.BLOCK1 );
        } else if( randomBlock == 1 ) {
            this.createBlock( 0, screenHeight/2 -50, Block.NAME.BLOCK2 );
        } else if( randomBlock == 2 ) {
            this.createBlock( screenWidth, screenHeight/2 + 20, Block.NAME.BLOCK3 );
        } else {
            this.createBlock( screenWidth, screenHeight/2 - 50, Block.NAME.BLOCK4 );
        }
    }, createBlock: function( positionX, positionY, name) {
        this.block = new Block();
        this.block.setPosition( new cc.Point( positionX, positionY ) );
        this.addChild( this.block );
        blocks.push( this.block );
        this.block.setName( name );
        this.block.scheduleUpdate();
    }, update:function() {
        for( var i = 0; i < blocks.length; i++){
            if( blocks[i].getPositionX() < 0 || blocks[i].getPositionX() > screenWidth ){
                this.removeChild(blocks[i]);
                blocks.splice( i, 1 );
            }
        }
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

