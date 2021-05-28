var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//create feed and lastFed variable here
var feed,lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog=createButton("Feed The Dog");
  feedDog.position(700,95);
  feedDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();

  })
 
  //write code to display text lastFed time here
fill(255)
textSize(15)
if(lastFed>=12){
  text("LAST FED:"+lastFed%12+"PM",300,75)
}
else if(lastFed===0){
  text("LAST FED:12 AM",300,75)
}
else{
  text("LAST FED:"+lastFed+"AM",300,75)
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

 foodObj.deductFood();
  
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    });


}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
