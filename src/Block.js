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

	hit: function( player ) {
		var block = this.getPosition();
		var stickman = player.getPosition();
		
		return this.checkCollision( block, stickman );
	},

	checkCollision: function( block, stickman ) {
		return ( ( Math.abs( block.x - stickman.x ) <= 80 ) );
	},

	checkAction: function( player ) {
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
} );

Block.NAME = {
	BLOCK0: 0,
	BLOCK1: 1,
	BLOCK2: 2,
	BLOCK3: 3,
	BLOCK4: 4,
};