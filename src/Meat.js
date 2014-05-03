var Meat = cc.Sprite.extend( {
	ctor: function() {
		this._super();
		this.initWithFile( "res/images/meat.png" );
		this.name = Meat.NAME.MEAT0;
	},

	setName: function( name ) {
		this.name = name;
	},

	update: function( dt ) {
		if ( this.name == Meat.NAME.MEAT1 ){
			this.setPositionX( this.getPositionX() + 3 );
		}
		else if ( this.name == Meat.NAME.MEAT2 ){
			this.setPositionX( this.getPositionX() + 3 );
		}
		else if ( this.name == Meat.NAME.MEAT3 ){
			this.setPositionX( this.getPositionX() - 3 );
		}
		else {
			this.setPositionX( this.getPositionX() - 3 );
		}
	},

	hit: function( player ) {
		var meat = this.getPosition();
		var stickman = player.getPosition();
		
		return this.checkCollision( meat, stickman );
	},

	checkCollision: function( meat, stickman ) {
		return ( ( Math.abs( meat.x - stickman.x ) <= 80 ) );
	}, 

	checkAction: function( player ) {
		if ( this.name == Meat.NAME.MEAT1 ){
			return player.direction == Stickman.DIR.LEFT && 
					player.movement == Stickman.MOV.HIGH
		}
		else if ( this.name == Meat.NAME.MEAT2 ){
			return player.direction == Stickman.DIR.LEFT && 
					player.movement == Stickman.MOV.LOW
		}
		else if ( this.name == Meat.NAME.MEAT3 ){
			return player.direction == Stickman.DIR.RIGHT && 
					player.movement == Stickman.MOV.HIGH
		}
		else {
			return player.direction == Stickman.DIR.RIGHT && 
					player.movement == Stickman.MOV.LOW
		}
	}
} );

Meat.NAME = {
	MEAT0: 0,
	MEAT1: 1,
	MEAT2: 2,
	MEAT3: 3,
	MEAT4: 4,
};