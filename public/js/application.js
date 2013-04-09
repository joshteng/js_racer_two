TheGame = {

  player1_position: 1,
  player2_position: 1,
  game_state: false,
  startTime: null,
  endTime: null,

  start_game: function(){

    $("#player1_strip td").removeClass("active");
    $("#player2_strip td").removeClass("active");
    $('#player1_strip td:first').addClass("active");
    $('#player2_strip td:first').addClass("active");
    $("#player1_strip").find("td").removeClass("red");
    $("#player2_strip").find("td").removeClass("red");
    this.player1_position = 1;
    this.player2_position = 1;
    this.game_state = "in play";
    $("#game_state").text("");
  },

  check_winner: function(player1_position, player2_position){
    if(this.player1_position >= $('#player1_strip').children().length){
      this.game_state = "Out of play";
      $("#player1_strip").find("td").addClass("red");
      TheGame.endTime = TheGame.endTime || new Date();
      var time_played = (TheGame.endTime - TheGame.startTime);
      $("#game_state").html("Player 1 WINS in "+time_played+" miliseconds!!!<br><br>Hit enter to play again<br><br>or <a href='/'>pick new opponents</a>");

      // console.log('/game/'+game_id);

      $.ajax({
        url: '/game/'+game_id,
        type: 'PUT',
        data: "winner_id="+player1_id+"&time_played="+time_played,
        success: function(data) {
          
        }
      });


      // game_id player1_id winner_id
      // game_id time_played time_played

    }else if(this.player2_position >= $('#player2_strip').children().length){
      this.game_state = "Out of play";
      $("#player2_strip").find("td").addClass("red");
      TheGame.endTime = TheGame.endTime || new Date();

      var time_played = (TheGame.endTime - TheGame.startTime);
      $("#game_state").html("Player 2 WINS in "+time_played+" miliseconds!!!<br><br>Hit enter to play again<br><br>or <a href='/'>pick new opponents</a>");

      // console.log('/game/'+game_id);

      $.ajax({
        url: '/game/'+game_id,
        type: 'PUT',
        data: "winner_id="+player2_id+"&time_played="+time_played,
        success: function(data) {
          
        }
      });



    }
  },

  game_logic: function(event){
    if(event.which == 90){
      this.player1_position++;
      $("#player1_strip td").removeClass("active");
      $('#player1_strip td:nth-child('+this.player1_position+')').addClass("active");
    }else if(event.which == 77){
      this.player2_position++;
      $("#player2_strip td").removeClass("active");
      $('#player2_strip td:nth-child('+this.player2_position+')').addClass("active");
    }
  }
};

$(document).ready(function() {
  TheGame.start_game();

  $(document).on('keydown', function(event) {
    TheGame.startTime = TheGame.startTime || new Date();
    if (TheGame.game_state === "in play"){
      TheGame.game_logic(event);
      TheGame.check_winner(TheGame.player1_position, TheGame.player2_position);
    }else{
      if(event.which === 13){
        TheGame.start_game();
      }
    }
  });

});
