get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/game' do
  player1 = Player.find_or_create_by_name(params[:player_1])
  player2 = Player.find_or_create_by_name(params[:player_2])
  game = Game.create
  game.players << player1
  game.players << player2
  redirect "/game/#{game.id}"
end

get '/game/:id' do
  @game = Game.find(params[:id])
  @player1 = @game.players.first
  @player2 = @game.players.last
  
  erb :game
  # debugger
end

put '/game/:id' do
  game = Game.find(params[:id])
  game.update_attributes(:time_played_in_seconds => params[:time_played])
  game.winner= Player.find(params[:winner_id])
  game.save
  200
end
