

const FusionReactor = extendContent(ImpactReactor, "Fusion-reactor", {

  load() {
    this.super$load();
    this.region = Core.atlas.find(this.name + "-base");
    this.regionbutton = Core.atlas.find(this.name + "-button");
    this.topRegion = Core.atlas.find(this.name + "-top");
    this.rotator = Core.atlas.find(this.name + "-rotator")
  },
  icons() {
    return [
      this.regionbutton,
      this.rotator,
      this.region,
      this.topRegion,
      ]
  },
});





FusionReactor.buildType = ent => {

  ent = extend(ImpactReactor.ImpactReactorBuild, FusionReactor, {
    draw() {
    Draw.rect(FusionReactor.regionbutton,this.x,this.y)
    //pankiwi :p
    Draw.rect(FusionReactor.rotator,this.x,this.y,this.warmup * (this.warmup * Time.time * 2 * this.warmup) * 20)
//    Draw.rect(FusionReactor.rotator,this.x,this.y,-this.warmup * (this.warmup * Time.time * 2 * this.warmup) * 20)
    /*
    for (var i = 0; i < 10; i++) {
      Draw.color(Pal.accent, Color.orange, i / 5);
      Draw.alpha(this.warmup  * 1 * Mathf.absin(Time.time + 10 * i * 1.5, 10 + i * 2, 0.8))
      Lines.poly(this.x, this.y, 3, 20  - i , 45 * i + Time.time * this.warmup * this.warmup * i * 2)
      Draw.color()
      Draw.alpha(1)
    }
    */
    Draw.rect(FusionReactor.region,this.x,this.y)
    Draw.rect(FusionReactor.topRegion,this.x,this.y)
    },
    updateTile(){
      this.super$updateTile();
      if(this.warmup > 0.09){
        var n = this.productionEfficiency  != 0 ? this.productionEfficiency * this.productionEfficiency * 2 : 1;
        var Timer = 50 -( n * this.warmup + this.warmup * this.productionEfficiency * 10) * n
        if(Mathf.cos(Time.time,Timer,0.001) > 0){
          Lightning.create(Team.get(99), Color.cyan,this.warmup + this.warmup  * 10  * n * n, this.x + Mathf.range(1), this.y + Mathf.range(1), Mathf.random(0.0, 360.0), 3+this.warmup + this.warmup  * 4);
        }
      }
    }


  })

  return ent
}

