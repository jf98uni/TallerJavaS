(function(){
    // Esta funcion crea el tablero y sus elementos sin contamianr el scope general
    // 
    self.Board = function (width,height){

        this.width = width;
        this.height=height; 
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;    
    }


    // coloca los metodos de la clase 
    // JSON obtiene las barras y la pelota
    // retorna todos los elementos 
    self.Board.prototype = {
        get elements (){

            var elements = this.bars;
            elements.push(this.ball);
            return elements;


        }
    }
})();

(function(){

    // esta es la encargada de crear las barras que suben y bajan

    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed =10;

    }
    
    // esta es la que da movimiento a las barras
    self.Bar.prototype = {

        down: function(){

            this.y += this.speed;

        },
        up: function(){
            this.x -= this.speed;
        },
        toString: function () {
            return "x: " + this.x + " y: " + this.y;
        }

    }

})();

// es la vista, es lo qeu dibuja los elementos gracias al canvas.
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        // es el objeto con el que podemos dibujar en JS 
        this.ctx = canvas.getContext("2d");

    }


    // recorre los elementos en elements y los manda a dibujar 
    self.BoardView.prototype = {
        draw: function(){
            for (var i = this.board.elements.length - 1; i>= 0 ; i--){
                var el = this.board.elements[i];

                draw(this.ctx,el)

            };
        }
    }

    // va a dibujar los elementos 
    function draw(ctx,element){

        if (element !== null && element.hasOwnProperty("kind")){

            switch(element.kind){
                case "rectangle":

                    // este rellena el rectangulo de la barra.
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
            }
        }


        
    }
})();

var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board)
var bar = new Bar(735,100,40,100,board)
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);

document.addEventListener("keydown",function(ev){
    
    if(ev.keyCode == 38){
        bar.up();
    }
    else if (ev.keyCode == 40){
        bar.down();
    }

    console.log(bar.toString());
    
});

window.addEventListener("load",main);

// ejecuta las clases o las llama a iniciarse

function main(){
    console.log(board);
    board_view.draw();
}