//libs
require("infiniteprogram/libs/drawlib");
require("infiniteprogram/libs/effectlib");

//blocks
require("infiniteprogram/blocks/turrets/turrets");
//orbit
try{
require("blocks/turrets/orbit")
require("blocks/turrets/Solar")
}catch(eerr){
  print(eerr)
}