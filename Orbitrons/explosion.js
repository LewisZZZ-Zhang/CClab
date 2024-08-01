function setup(){
    createCanvas(600,600)
    explode = []
    g = 0.1
  }

function explosion(x,y){
    for (let i = 0;i<20;i++){
      explode.push([x,y,x,y,random(0,2*PI),3])
    }
  }
  
function update_ex(list){
    for (let i = 0;i<list.length;i++){
      list[i][0] += list[i][5]*cos(list[i][4])
      list[i][1] += list[i][5]*sin(list[i][4])+g
      if (dist(list[i][0],list[i][1],list[i][2],list[i][3])>600){
        list.splice(i, 1)
      }
    }
    return list
  }
  
function draw_ex(list){
    for (let i = 0;i<list.length;i++){
      noStroke()
      fill(255,0,0,400-dist(list[i][0],list[i][1],list[i][2],list[i][3]))
      rect(list[i][0],list[i][1],5,5)
    }
    
  }

function draw(){
    explosion(satelliteX,satelliteY)
    background(255)
    explode = update_ex(explode)
    draw_ex(explode)
}