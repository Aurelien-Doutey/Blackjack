$(document).ready(function(){

/*  New Additons for end

	Added more output for winning/loosing to the 'hand' object
	Added a restart button click to re-deal
*/


	var used_cards = new Array();
	var used_cards_dealer = new Array();
	
	var deck = getPaquet();
	
	var joueur1 = new player(1);
	var croupier = new dealer(2);
	
	function card(name,suit,value) {
		this.name = name;
		this.suit = suit;
		this.value = value;
	} 
	
	function getPaquet(){
		var paquet = [];
		var name = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King'];
		var suit = ['Hearts','Diamonds','Clubs','Spades'];
		var value = [11,2,3,4,5,6,7,8,9,10,10,10,10];
		var count = 0;
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 13; j++){
				paquet[count++] = new card(name[j],suit[i],value[j]);
			}
		}
		return paquet;
	}

	function dealer(nplayer){
		this.nplayer = nplayer;
		dealer.prototype.cards = new Array(),
		dealer.prototype.current_total = 0,
		
		dealer.prototype.sumCardTotal= function(){
			this.current_total = 0;
			for(var i=0;i<this.cards.length;i++){
				var c = this.cards[i];
				this.current_total += c.value;
			}
			$("#hdrTotaldeal").html("Total Croupier: " + this.current_total );

			if(this.current_total > 21 && player.prototype.current_total != 21){
				$("#hdrResult").html('Stick!')
						   .attr('class', 'win');
				$("#hdrTotaldeal").html("Total Croupier: " + dealer.prototype.current_total )
								.fadeIn();
				$("#result").fadeIn();
			}
		}
	}
	
	function player(nplayer){
		player.prototype.cards = new Array(),
		player.prototype.current_total = 0,
		
		player.prototype.sumCardTotal= function(){
			this.current_total = 0;
			for(var i=0;i<this.cards.length;i++){
				var c = this.cards[i];
				this.current_total += c.value;
			}
			$("#hdrTotal").html("Total Joueur: " + this.current_total );
		
		if(this.current_total > 21){
			$("#btnStick").trigger("click");
			$("#imgResult").attr('src','images/x2.png');
			$("#hdrResult").html("BUST!")
						   .attr('class', 'lose');
			$("#result").fadeIn();

		}else if(this.current_total == 21){
			$("#btnStick").trigger("click");
			$("#imgResult").attr('src','images/check.png');
			$("#hdrResult").html("BlackJack!")
						   .attr('class', 'win');
			$("#hdrTotaldeal").html("Total Croupier: " + dealer.prototype.current_total )
						   .fadeIn();
		    $("#result").fadeIn();

		}else if(this.current_total <= 21 && this.cards.length == 5 ){
			$("#btnStick").trigger("click");
			$("#imgResult").attr('src','images/check.png');
			$("#hdrResult").html("BlackJack - 5 card trick!")
						   .attr('class', 'win');
			$("#result").fadeIn();

		}else{ }
		}
	}
	
	function getRandom(num){
		var my_num = Math.floor(Math.random()*num);
		return my_num;
	}
	
	function deal(){
		hit(true);
		hit(false);
	}
	
	function hit(visible){
		do{
			if (visible){
				var good_card = false;
			
				var index = getRandom(52);
				var index2 = getRandom(52);
				if( !$.inArray(index, used_cards ) > -1 ){
					good_card = true;
					var c = deck[ index ];
					var cd = deck[ index2 ];

					used_cards[used_cards.length] = index;	
					used_cards_dealer[used_cards_dealer.length] = index2;
				
						player.prototype.cards[player.prototype.cards.length] = c;	
						var $d = $("<div>");
						$d.addClass("current_hand")
						.appendTo("#my_hand");
						
						$("<img>").attr('alt', c.name + ' of ' + c.suit )
						.attr('title', c.name + ' of ' + c.suit )
						.attr('src', 'images/cards/' + c.suit + '/' + c.name + '.jpg' )
						.appendTo($d)
						.fadeOut('slow')
						.fadeIn('slow');
					
						dealer.prototype.cards[dealer.prototype.cards.length] = cd;
						var $v = $("<div>");
						$v.addClass("current_dealer_hand")
						.appendTo("#dealer_hand");		  	
						
						$("<img>").attr('alt', cd.name + ' of ' + cd.suit )
						.attr('title', cd.name + ' of ' + cd.suit )
						.attr('src', 'images/cards/' + cd.suit + '/' + cd.name + '.jpg' )
						.appendTo($v)
						.fadeOut('slow')
						.fadeIn('slow');
				}
			}
			else{
				var good_card = false;

				var index = getRandom(52);
				var index2 = getRandom(52);
				if( !$.inArray(index2, used_cards_dealer ) > -1 ){
					good_card = true;
					var c = deck[ index ];
					var cd = deck[ index2 ];
	
					used_cards[used_cards.length] = index;	
					used_cards_dealer[used_cards_dealer.length] = index2;

						player.prototype.cards[player.prototype.cards.length] = c;	
						var $d = $("<div>");
						$d.addClass("current_hand")
						.appendTo("#my_hand");
						
						$("<img>").attr('alt', c.name + ' of ' + c.suit )
						.attr('title', c.name + ' of ' + c.suit )
						.attr('src', 'images/cards/' + c.suit + '/' + c.name + '.jpg' )
						.appendTo($d)
						.fadeOut('slow')
						.fadeIn('slow');
					
						var $v = $("<div>");
						$v.addClass("current_dealer_hand")
						.appendTo("#dealer_hand");
									
						$("<img>").attr('alt', 'return card')
						.attr('title', 'return card' )
						.attr('src', 'images/return_card.jpg' )
						.appendTo($v)
						.fadeOut('slow')
						.fadeIn('slow');
							
					}
			}
		}
		while(!good_card);
			good_card = false;	  
			player.prototype.sumCardTotal();
			dealer.prototype.sumCardTotal();
	}

	function returnCard(){
		do{
			var good_card = false;
			var index2 = getRandom(52);
			if( !$.inArray(index2, used_cards_dealer ) > -1 ){
				good_card = true;
				var cd = deck[ index2 ];
				used_cards_dealer[used_cards_dealer.length] = index2;

				dealer.prototype.cards[dealer.prototype.cards.length] = cd;
				var $v = $("<div>");
				$v.addClass("current_dealer_hand")
				.appendTo("#dealer_hand");

				$("<img>").attr('alt', cd.name + ' of ' + cd.suit )
				.attr('title', cd.name + ' of ' + cd.suit )
				.attr('src', 'images/cards/' + cd.suit + '/' + cd.name + '.jpg' )
				.appendTo($v)
				.fadeOut('slow')
				.fadeIn('slow');
			}
		}
		while(!good_card);
			good_card = false;	  
			dealer.prototype.sumCardTotal();
	}

	function playerHit(){
		do{
			var good_card = false;
			var index = getRandom(52);
			if( !$.inArray(index, used_cards ) > -1 ){
				good_card = true;
				var c = deck[ index ];
				used_cards[used_cards.length] = index;

				player.prototype.cards[player.prototype.cards.length] = c;
				var $d = $("<div>");
				$d.addClass("current_hand")
				.appendTo("#my_hand");

				$("<img>").attr('alt', c.name + ' of ' + c.suit )
				.attr('title', c.name + ' of ' + c.suit )
				.attr('src', 'images/cards/' + c.suit + '/' + c.name + '.jpg' )
				.appendTo($d)
				.fadeOut('slow')
				.fadeIn('slow');
			}
		}
		while(!good_card);
			good_card = false;	  
			player.prototype.sumCardTotal();
	}



	$("#btnDeal").click( function(){
		deal();
		$(this).toggle();
		$("#btnHit").toggle();
		$("#btnStick").toggle();
	});
	
	$("#btnHit").click( function(){
		playerHit();
	});
	
	$("#btnStick").click( function(){
		$(".current_dealer_hand:last").toggle();
		returnCard();
		while (dealer.prototype.current_total <= 16 && dealer.prototype.cards.length < 5){
			returnCard();
		}
		
		if(player.prototype.current_total < 21 && player.prototype.current_total > dealer.prototype.current_total || dealer.prototype.current_total > 21){
			$("#imgResult").attr('src','images/check.png');
			$("#hdrResult").html('Stick!')
					   .attr('class', 'win');
			$("#hdrTotaldeal").html("Total Croupier: " + dealer.prototype.current_total )
							.fadeIn();
			$("#result").fadeIn();
			
		}
		else if(player.prototype.current_total > 21 || dealer.prototype.current_total > player.prototype.current_total){
			$("#imgResult").attr('src','images/x2.png');
			$("#hdrResult").html("BUST!")
						   .attr('class', 'lose');
			$("#hdrTotaldeal").html("Total Croupier: " + dealer.prototype.current_total )
							.fadeIn();
			$("#result").fadeIn();
			
		}
		else if(player.prototype.current_total == 21){
			$("#imgResult").attr('src','images/check.png');
			$("#hdrResult").html("BlackJack!")
						   .attr('class', 'win');
			$("#hdrTotaldeal").html("Total Croupier: " + dealer.prototype.current_total )
						   .fadeIn();
		    $("#result").fadeIn();

		}
		else if(player.prototype.current_total <= 21 && player.prototype.current_total == 5 ){
			$("#imgResult").attr('src','images/check.png');
			$("#hdrResult").html("BlackJack - 5 card trick!")
						   .attr('class', 'win');
			$("#result").fadeIn();

		}
		else {
			$("#hdrResult").html("Egalite")
							.attr('class', 'lose');
			$("#hdrTotaldeal").html("Total Croupier: " + dealer.prototype.current_total )
							.fadeIn();		
		}
		end();
		
	});
	
	$("#btnRestart").click( function(){
		$("#result").fadeOut(); 
		$(this).toggle();
		$("#my_hand").empty();
		$("#dealer_hand").empty();
		$("#hdrResult").html('');

		used_cards.length = 0;
		player.prototype.cards.length = 0;
		player.prototype.current_total = 0;
		dealer.prototype.cards.length = 0;
		dealer.prototype.current_total = 0;


		$("#btnDeal").toggle()
					 .trigger('click');
	});

	function end(){
		$("#btnHit").toggle();
		$("#btnStick").toggle();
		$("#btnRestart").toggle();
	}
});
