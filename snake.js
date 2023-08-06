const board=document.querySelector("#container")
const ctx = board.getContext("2d");
let boardWidth=board.width, boardHeight=board.height

const scoreT=document.querySelector("#score")
const reset=document.querySelector("#reset")

console.log(boardHeight,boardWidth)

const board_bg="white"
const snake_color="lightgreen"
const snake_border="black"
const food_Color="red"
const unitSize=25
let game=false

let xVelocity=unitSize
let yVelocity=0
let foodaxis_X, foodaxis_Y;
let score=0;
let snake=[
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];


window.addEventListener("keydown",change_direction)
reset.addEventListener("click",Func_Reset)

setTimeout(disaply_Food,100)

Game_start();


function Game_start(){
    game=true;
  scoreT.textContent=score;
  food_Location();
  disaply_Food();
//  draw_snake()
  next_tick();

}
function next_tick(){
    if(game){
        
        setTimeout(()=>{
            Clear_board();
            disaply_Food();
            move_snake();
            draw_snake();
            check_game_over();
            next_tick();
        },100)
    }
    else{
              display_gameover();
    }

}
function check_game_over(){
    switch(true){

        case(snake[0].x<=0 ):
        game=false
        break
        
        case(snake[0].x>=boardWidth):
        game=false
        break

        case(snake[0].y< 0):
        game=false
        break

        case (snake[0].y>=boardHeight):
            game=false
            break
    }
    for(let i=1; i<snake.length; i++){
        if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
            game=false
        }
    }

}

function display_gameover(){
ctx.font="50px MV Boli"
ctx.fillStyle="black"
ctx.textAlign="center"
ctx.fillText("GAME OVER!",boardWidth/2,boardHeight/2)
game=false


}
function Clear_board(){
    ctx.fillStyle=board_bg
    ctx.fillRect(0,0,boardWidth,boardHeight)

}

function draw_snake(){
    ctx.fillStyle=snake_color
    ctx.strokeStyle=snake_border
    snake.forEach(part=> 
        {
            ctx.fillRect(part.x,part.y,unitSize,unitSize)
            ctx.strokeRect(part.x,part.y,unitSize,unitSize)
    }
    )

}
function move_snake(){
    const head={x:snake[0].x + xVelocity,
         y:snake[0].y +yVelocity
        };
        snake.unshift(head)

        ///foood eaten
        if(snake[0].x==foodaxis_X && snake[0].y==foodaxis_Y){
            console.log("kha gaya")
            score++
            scoreT.textContent=score;
            food_Location()

        }else{
            snake.pop();
        } 
        

}

function change_direction(event){
    const key_pressd=event.keyCode

const left=37,up=38,right=39,down=40;
const goinup=(yVelocity==-unitSize)
const goindown=(yVelocity==unitSize)
const goinright=(xVelocity==unitSize)
const goinleft=(xVelocity==-unitSize)

switch(true){
    case(key_pressd==left && !goinright):
        xVelocity=-unitSize
        yVelocity=0
        break
    
    case(key_pressd==up && !goindown):
    xVelocity=0
    yVelocity=-unitSize;
    break;

    case(key_pressd==down && !goinup):
    xVelocity=0
    yVelocity=unitSize;
    break;

    case(key_pressd==right && !goinleft):
    xVelocity=unitSize
    yVelocity=0;
    break;

}

}


function food_Location(){
    function ran(min,max){
        const rd=Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize
        return rd
    }
 foodaxis_X=ran(0,boardWidth-unitSize)
 foodaxis_Y=ran(0,boardHeight-unitSize)
 console.log(foodaxis_X,foodaxis_Y)
}

function disaply_Food(){
    
    ctx.fillStyle=food_Color
    ctx.fillRect(foodaxis_X,foodaxis_Y,15,25)
    
}

function Func_Reset(){
    Clear_board()
xVelocity=unitSize
yVelocity=0
score=0;
snake=[
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];
game=true
Game_start()

}

// const btn=document.querySelectorAll(".btn")
// window.addEventListener("keydown",move)
// let up=document.getElementById("up")
// let down=document.getElementById('down')
// let right=document.getElementById("right")
// let left=document.getElementById("left")




// function move(event){
//     switch(event.key){
//         case "ArrowUp":
//            const e=document.activeElement
//            console.log(e)
//             up.classList.add("pr")
//             up.classList.remove("pr")
//          console.log("up jao")
//          break
//         case "ArrowDown":
//             console.log("down jao")
//             break

//         case "ArrowRight":
//             console.log("right jao")
//             break

//         case "ArrowLeft":
//             console.log("left jao")
//             break
//     }
// }
