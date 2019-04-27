$(document).ready(function () {


    var player_name='';
    var player_points  = 0;
    var slick_points = 0;
    var used_cards = new Array();
    var player_cards = new Array();
    var slick_cards = new Array();
    var P_hand = {
        cards: new Array()
    }
    var S_hand = {
        cards: new Array()
    }
    var Hand = {
        cards: new Array()
    }
    var deck = [
		new card('Ace', 'Hearts', 11, 142),
		new card('Two', 'Hearts', 2, 22),
		new card('Three', 'Hearts', 3, 32),
		new card('Four', 'Hearts', 4, 42),
		new card('Five', 'Hearts', 5, 52),
		new card('Six', 'Hearts', 6, 62),
		new card('Seven', 'Hearts', 7, 72),
		new card('Eight', 'Hearts', 8, 82),
		new card('Nine', 'Hearts', 9, 92),
		new card('Ten', 'Hearts', 10, 102),
		new card('Jack', 'Hearts', 10, 112),
		new card('Queen', 'Hearts', 10, 122),
		new card('King', 'Hearts', 10, 132),
		new card('Ace', 'Diamonds', 11, 141),
		new card('Two', 'Diamonds', 2, 21),
		new card('Three', 'Diamonds', 3, 31),
		new card('Four', 'Diamonds', 4, 41),
		new card('Five', 'Diamonds', 5, 51),
		new card('Six', 'Diamonds', 6, 61),
		new card('Seven', 'Diamonds', 7, 71),
		new card('Eight', 'Diamonds', 8, 81),
		new card('Nine', 'Diamonds', 9, 91),
		new card('Ten', 'Diamonds', 10, 101),
		new card('Jack', 'Diamonds', 10, 111),
		new card('Queen', 'Diamonds', 10, 121),
		new card('King', 'Diamonds', 10, 131),
		new card('Ace', 'Clubs', 11, 143),
		new card('Two', 'Clubs', 2, 23),
		new card('Three', 'Clubs', 3, 33),
		new card('Four', 'Clubs', 4, 43),
		new card('Five', 'Clubs', 5, 53),
		new card('Six', 'Clubs', 6, 63),
		new card('Seven', 'Clubs', 7, 73),
		new card('Eight', 'Clubs', 8, 83),
		new card('Nine', 'Clubs', 9, 93),
		new card('Ten', 'Clubs', 10, 103),
		new card('Jack', 'Clubs', 10, 113),
		new card('Queen', 'Clubs', 10, 123),
		new card('King', 'Clubs', 10, 133),
		new card('Ace', 'Spades', 11, 144),
		new card('Two', 'Spades', 2, 24),
		new card('Three', 'Spades', 3, 34),
		new card('Four', 'Spades', 4, 44),
		new card('Five', 'Spades', 5, 54),
		new card('Six', 'Spades', 6, 64),
		new card('Seven', 'Spades', 7, 74),
		new card('Eight', 'Spades', 8, 84),
		new card('Nine', 'Spades', 9, 94),
		new card('Ten', 'Spades', 10, 104),
		new card('Jack', 'Spades', 10, 114),
		new card('Queen', 'Spades', 10, 124),
		new card('King', 'Spades', 10, 134)
	];

//On clicking Start
$("#btnlaunch").click(function(e){
	e.preventDefault();
	launch();
});

function launch(){
	player_name=$("#inname").val();
	$("#home").hide();
	    $("#main").show();
        $("#pName").text(player_name);
        $("#pName2").text(player_name);
        $("#pScore").text(player_points);
        $("#cScore").text(slick_points);
        $("#cardCount").text(used_cards.length);
        resetGame();
       // $("#win")

}
    function card(name, suit, value, trump) {
        this.name = name;
        this.suit = suit;
        this.value = value;
        this.trump = trump;
        this.image = './images/'+this.suit+'/'+this.name+'.jpg';
    }

	function shuffle(a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	    return a;
	}

    
	var shuffled_deck =  shuffle(deck);

	function divideCards(){
		var i=0;
		while(i<shuffled_deck.length){
			player_cards.push(shuffled_deck[i]);
			slick_cards.push(shuffled_deck[i+1]);
			i+=2;
		}
		S_hand.cards = slick_cards;
		P_hand.cards = player_cards;
	}

function slickPlay(){
	var card = S_hand.cards[S_hand.cards.length-1];
	S_hand.cards.pop();
	used_cards.push(card);
	$('#slickPlayed').empty();
	$('#slickPlayed').prepend('<img src="'+card.image+'"/>');
	return [card.trump, card.value];
}

//On clicking play button
$("#play").click(function(e){
	e.preventDefault();
	play();
});
function play(){

        if (P_hand.cards.length==0 || S_hand.cards.length==0) {
 			alert("Please reset game");
 			return false;
        }

	var card = P_hand.cards[P_hand.cards.length-1];
	P_hand.cards.pop();
	used_cards.push(card);
	$('#playerPlayed').empty();
	$('#playerPlayed').prepend('<img src="'+card.image+'"/>');
	var slickDetails=[];
	setTimeout(
  function() 
  {
   slickDetails =slickPlay();
   	if(card.trump>slickDetails[0]){
		player_points+=(card.value+slickDetails[1]);
	}else if (card.trump<slickDetails[0]) {
	slick_points+=(card.value+slickDetails[1]);
	}
//Adjust Points
        $("#pScore").text(player_points);
        $("#cScore").text(slick_points);
        $("#cardCount").text(used_cards.length);

        if (P_hand.cards.length==0 || S_hand.cards.length==0) {
        	if (player_points > slick_points) {
        		$("#win").text(player_name);
        		alert("Game over.\nCONGRATULATIONS. YOU WON!");
        	}else if(player_points < slick_points){
        		$("#win").text("Slick");
        		alert("Game over.\nSlick won!");
        	}else if(slick_points==player_points){
        		$("#win").text("Draw");
        		alert("Game over.\nYou drew!");
        	}

        }

  }, 500);



	}




	//

	$("#deal").click(function(e){
		e.preventDefault();
		resetGame();
	});
	function resetGame(){
		$('#playerPlayed').empty();
		$('#slickPlayed').empty();
		$("#win").text("");
		used_cards=[];
		S_hand.cards=[];
		P_hand.cards=[];
		player_points=0;
		slick_points=0;
		$("#pScore").text(player_points);
        $("#cScore").text(slick_points);
        $("#cardCount").text(used_cards.length);
        shuffled_deck=shuffle(deck);
		divideCards();



	}


	//New Player newPlayer

	$("#newPlayer").click(function(e){
		e.preventDefault();
		newPlayer();
	});

	function newPlayer(){
		$("#home").show();
	    $("#main").hide();
	}
});
