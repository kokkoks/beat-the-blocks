var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.stickman = new Stickman();
        this.stickman.setPosition(new cc.Point( screenWidth/2, screenHeight/2))
        this.addChild(this.stickman);

        // this.stickman.scheduleUpdate();
        // this.woman = new Woman();
        // this.woman.setPosition(new cc.Point( 470, 250))
        // this.addChild(this.woman);

        this.setKeyboardEnabled(true);
        return true;
    }, onKeyDown: function( e ){
        switch( e ) {
            case cc.KEY.left:
                this.stickman.setDirection( Stickman.DIR.LEFT );
                this.stickman.flipPicture( Stickman.DIR.LEFT );
                break;
            case cc.KEY.right:
                this.stickman.setDirection( Stickman.DIR.RIGHT );
                this.stickman.flipPicture( Stickman.DIR.RIGHT );
                break;
            case cc.KEY.x:
                this.stickman.setMovement( Stickman.MOV.HIGH );
                this.stickman.attackMove( Stickman.MOV.HIGH );
                break;
            case cc.KEY.c:
                this.stickman.setMovement( Stickman.MOV.LOW );
                this.stickman.attackMove( Stickman.MOV.LOW );
                break;
        }
    }, onKeyUp: function( e ){
        this.stickman.setMovement( Stickman.DIR.STILL );
        // this.stickman.createAnimationAction();
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

