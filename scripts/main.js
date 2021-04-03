//libs
require("infiniteprogram/libs/drawlib");
require("infiniteprogram/libs/effectlib");

//blocks
require("infiniteprogram/blocks/turrets/turrets");
//orbit
try{
require("blocks/turrets/orbit")
require("blocks/turrets/Solar")
require("blocks/reactor")
}catch(eerr){
  print(eerr)
}
//units
require("infiniteprogram/units");