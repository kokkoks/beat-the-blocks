var Stickman = cc.Sprite.extend({
	ctor: function(){
		this._super();

		this.standMove();
		this.initWithFile("res/images/standing.png");

		this.direction = Stickman.DIR.STILL;
		this.movement = Stickman.MOV.STILL;
	}, setDirection: function( dir ){
		this.direction = dir;
	}, setMovement: function( mov ){
		this.movement = mov;
	}, flipPicture: function( dir ){
		if(dir == Stickman.DIR.RIGHT){
			this.setFlippedX(false);
		}
		else{
			this.setFlippedX(true);
		}
	}, standMove: function() {
		this.movingAction = this.createAnimationAction();
		this.runAction( this.movingAction );
	}, createAnimationAction: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'res/images/standing/standing1.png' );
		animation.addSpriteFrameWithFile( 'res/images/standing/standing2.png' );
		animation.addSpriteFrameWithFile( 'res/images/standing/standing3.png' );
		animation.addSpriteFrameWithFile( 'res/images/standing/standing4.png' );
		animation.setDelayPerUnit( 0.1 );
		return cc.RepeatForever.create( cc.Animate.create( animation ));
	}, attackMove: function( movement ) {
		this.stopAllActions();
		if(movement == Stickman.MOV.HIGH){
			this.movingAction = this.highAttackMove();
			this.runAction( this.movingAction );
		}
		else if(movement == Stickman.MOV.LOW){
			this.movingAction = this.lowAttackMove();
			this.runAction( this.movingAction );
		}
	}, highAttackMove: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'res/images/highattack/highkick1.png' );
		animation.addSpriteFrameWithFile( 'res/images/highattack/highkick2.png' );
		animation.addSpriteFrameWithFile( 'res/images/highattack/highkick3.png' );
		animation.addSpriteFrameWithFile( 'res/images/highattack/highkick4.png' );
		animation.addSpriteFrameWithFile( 'res/images/highattack/highkick5.png' );
		animation.setDelayPerUnit( 0.1 );
		return cc.RepeatForever.create( cc.Animate.create( animation ));
	}, lowAttackMove: function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'res/images/lowattack/lowkick1.png' );
		animation.addSpriteFrameWithFile( 'res/images/lowattack/lowkick2.png' );
		animation.addSpriteFrameWithFile( 'res/images/lowattack/lowkick3.png' );
		animation.addSpriteFrameWithFile( 'res/images/lowattack/lowkick4.png' );
		animation.addSpriteFrameWithFile( 'res/images/lowattack/lowkick5.png' );
		animation.setDelayPerUnit( 0.1 );
		return cc.RepeatForever.create( cc.Animate.create( animation ));
	}
});
Stickman.DIR = {
	STILL: 0,
	LEFT: 1,
	RIGHT: 2,
};

Stickman.MOV = {
	STILL: 0,
	HIGH: 1,
	LOW: 2,
};