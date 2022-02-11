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
        this.playing = false;    
    }


    // coloca los metodos de la clase 
    // JSON obtiene las barras y la pelota
    // retorna todos los elementos 
    self.Board.prototype = {
        get elements (){

            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;


        }
    }
})();

// esta construye la pelota, le proporciona todos los atributos 
(function (){
    self.Ball = function(x,y,radius,board){

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y= -2;
        this.speed_x=-1;
        this.board = board;
        board.ball = this;
        this.kind = "circle"
        this.direction = 1;
    }

        self.Ball.prototype = {

            move: function(){
                this.x += (this.speed_x * this.direction);
                this.y += (this.speed_y * this.direction);

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
        this.speed =50;

    }
    
    // esta es la que da movimiento a las barras
    self.Bar.prototype = {

        down: function(){

            this.y += this.speed;

        },
        up: function(){
            this.y -= this.speed;
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
        // se encarga de borrar donde ya paso la barra
        clean: function(){
            
            this.ctx.clearRect(0,0,this.board.width,this.board.height)

        },

        // se encarga de recorrer los elementos en elements
        draw: function(){
            for (var i = this.board.elements.length - 1; i>= 0 ; i--){
                var el = this.board.elements[i];

                draw(this.ctx,el)

            };
        },
        // esto dibuja y borra la barra 
        play: function(){
            if(this.board.playing){
            this.clean();
            this.draw();
            this.board.ball.move();
            }
            
        }
    }

    // va a dibujar los elementos 
    function draw(ctx,element){

        
            // le dice como dibujar los elementos 
            switch(element.kind){
                case "rectangle":

                    // este rellena el rectangulo de la barra.
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
                
                case "circle":
                    ctx.beginPath();
                    ctx.arc(element.x,element.y,element.radius,0,7);
                    ctx.fill();
                    ctx.closePath();
                    break;
            }  
    }

   
})();

// valores de las variables. 
var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board)
var bar_2 = new Bar(735,100,40,100,board)
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);
var ball = new Ball(350,350,10,board);


// esto sube y baja la barra
document.addEventListener("keydown",function(ev){
    
    // sube con flecha arriba y baja con flecha abajo la barra de la izquierda 
    if(ev.keyCode === 38){
        ev.preventDefault();
        bar.up();
    }
    else if (ev.keyCode === 40){
        ev.preventDefault();
        bar.down();
    }
    // sube con w y baja con s la barra de la derecha 
    else if(ev.keyCode === 87){
        ev.preventDefault();
        bar_2.up();
    }
    else if (ev.keyCode === 83){
        ev.preventDefault();
        bar_2.down();
    }
    else if (ev.keyCode === 32){
        ev.preventDefault();
        board.playing = !board.playing;

    }
    
});
// llama a la animacion 

board_view.draw();
window.requestAnimationFrame(controller);

// ejecuta las clases o las llama a iniciarse

function controller(){
    board_view.play();
    window.requestAnimationFrame(controller);
}