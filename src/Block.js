var Block = cc.Sprite.extend( {
	ctor: function() {
		this._super();
		this.initWithFile( "res/images/stone.png" );
		this.name = Block.NAME.BLOCK0;
	},

	update: function( dt ) {
		if( this.name == Block.NAME.BLOCK1 ){
			this.setPositionX( this.getPositionX() + 3 );
		}
		else if ( this.name == Block.NAME.BLOCK2 ){
			this.setPositionX( this.getPositionX() + 3 );
		}
		else if ( this.name == Block.NAME.BLOCK3 ){
			this.setPositionX( this.getPositionX() - 3 );
		}
		else {
			this.setPositionX( this.getPositionX() - 3 );
		}
	}, 

	setName: function( name ) {
		this.name = name;
	},

	hit: function( player, distance ) {
		var block = this.getPosition();
		var stickman = player.getPosition();
		
		return this.checkCollision( block, stickman, distance );
	},

	checkCollision: function( block, stickman, distance ) {
		return ( ( Math.abs( block.x - stickman.x ) <= distance ) );
	},

	checkAction: function( player ) {
		if ( player.movement == Stickman.MOV.ULTIMATE ){
			return true;
		}
		else {
			if ( this.name == Block.NAME.BLOCK1 ){
				return player.direction == Stickman.DIR.LEFT && 
						player.movement == Stickman.MOV.HIGH
			}
			else if ( this.name == Block.NAME.BLOCK2 ){
				return player.direction == Stickman.DIR.LEFT && 
						player.movement == Stickman.MOV.LOW
			}
			else if ( this.name == Block.NAME.BLOCK3 ){
				return player.direction == Stickman.DIR.RIGHT && 
						player.movement == Stickman.MOV.HIGH
			}
			else {
				return player.direction == Stickman.DIR.RIGHT && 
						player.movement == Stickman.MOV.LOW
			}
		}
	}
} );

Block.NAME = {
	BLOCK0: 0,
	BLOCK1: 1,
	BLOCK2: 2,
	BLOCK3: 3,
	BLOCK4: 4,
};