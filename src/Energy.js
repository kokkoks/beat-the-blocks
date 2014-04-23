var Energy = cc.Sprite.extend( {
	ctor: function() {
		this._super();
		this.initWithFile( "res/images/energy.png" );
		this.name = Energy.NAME.ENERGY0;
	}, setName: function( name ) {
		this.name = name;
	},update: function( dt ) {
		if( this.name == Energy.NAME.ENERGY1 ){
			this.setPositionX( this.getPositionX() + 3 );
		} else if( this.name == Energy.NAME.ENERGY2 ){
			this.setPositionX( this.getPositionX() + 3 );
		} else if( this.name == Energy.NAME.ENERGY3 ){
			this.setPositionX( this.getPositionX() - 3 );
		} else {
			this.setPositionX( this.getPositionX() - 3 );
		}
	}, hit: function( player ) {
		var energy = this.getPosition();
		var stickman = player.getPosition();
		
		return this.checkCollision( energy, stickman );
	}, checkCollision: function( energy, stickman ) {
		return ( ( Math.abs( energy.x - stickman.x ) <= 80 ) );
	}, checkAction: function( player ) {
		if( this.name == Energy.NAME.ENERGY1 ){
			return player.direction == Stickman.DIR.LEFT && 
					player.movement == Stickman.MOV.HIGH
		} else if( this.name == Energy.NAME.ENERGY2 ){
			return player.direction == Stickman.DIR.LEFT && 
					player.movement == Stickman.MOV.LOW
		} else if( this.name == Energy.NAME.ENERGY3 ){
			return player.direction == Stickman.DIR.RIGHT && 
					player.movement == Stickman.MOV.HIGH
		} else {
			return player.direction == Stickman.DIR.RIGHT && 
					player.movement == Stickman.MOV.LOW
		}
	}
} );

Energy.NAME = {
	ENERGY0: 0,
	ENERGY1: 1,
	ENERGY2: 2,
	ENERGY3: 3,
	ENERGY4: 4,
};