const chager = new Effect(60,e => {
  var leg = 6
  
  Draw.color(Tmp.c1.set(Pal.spore).mul(1 + Mathf.absin(Time.time, 1, 0.1)));
  Fill.circle(e.x, e.y,2 + e.fslope() * leg);
  Draw.color(Tmp.c1.set(Pal.spore).mul(1 + Mathf.absin(Time.time, 1, 0.1)));
  
  Fill.circle(e.x, e.y,1 + e.fslope() * leg - 1);
})
const finpow = new Effect(20,e => {
  Angles.randLenVectors(e.id, 5, 2.4 + e.fout() * 100.0, e.rotation, 25, (x, y) => {
    Draw.color(Color.purple, Pal.spore, e.fin());
    Fill.square(e.x + x, e.y + y, 1.5 + e.fout() * 1.5, 45);
  })
})

const pow = new Effect(20, e => {
  Draw.color(Tmp.c1.set(Pal.spore).mul(1 + Mathf.absin(Time.time, 1, 0.1)));
  Lines.stroke(e.fout() * 4)
  Lines.circle(e.x, e.y, e.fin() * 100)
})

const mel = extend(ContinuousLaserBulletType, {
  length: 600,
  width: 10,
  oscScl: 1,
  oscMag: 3,
  damage: 1000,
  colors: [Color.valueOf("DE58ED55"), Color.valueOf("C058EDAA"), Color.valueOf("A659FFFF"), Color.white],
  update(b){
    if (b.shake > 0) {
      Effect.shake(b.shake, b.shake, b);
    }
    //2 tick
    if(b.timer.get(1,2)){
      Damage.collideLine(b, b.team,this.hitEffect, b.x, b.y, b.rotation(), this.length, this.largeHit)
    }
  }
})



const kahinami = extendContent(PowerTurret, "kahinami", {
  load() {
    this.super$load();
    this.Frames = []
    for (var i = 0; i < 9; i++) {
      this.Frames[i] = Core.atlas.find(this.name + "-frame-" + i)
    }
  },
  icons() {
    return [
      this.Frames[0]
      ]
  }
})

kahinami.buildType = ent => {
  ent = extendContent(PowerTurret.PowerTurretBuild, kahinami, {
    Bulletn: null,
    ShootDuration: 300,
    BulletLife: 0,
    m: 0,
    Shouter: false,
    hasAmmo() {
      return this.power.status > 0 && this.power.status >= 0
    },
    draw() {
      var r = Math.floor(this.m)
      let z = Draw.z();
      Draw.z(Layer.turret);
      Draw.rect(kahinami.Frames[r], this.x, this.y, this.rotation - 90)
      Draw.reset()
      Draw.z(z);
    },
    updateTile() {
      this.super$updateTile()
      
      if (this.BulletLife > 0 && this.Bulletn != null) {
        var x = this.x + Angles.trnsx(this.rotation, 17)
        var y = this.y + Angles.trnsy(this.rotation, 17)
        this.Bulletn.rotation(this.rotation);
        this.Bulletn.set(x, y);
        this.Bulletn.time = 0
        this.heat = 1
        this.recoil = kahinami.recoilAmount;
        this.BulletLife -= Time.delta / Math.max(this.efficiency(), 0.00001);
        if(Mathf.chance(1.1)){
          Lightning.create(this.team, Color.purple,100, x, y,this.rotation,100 + Mathf.random(-100,100));
          print(true)
          }
        if (this.BulletLife <= 0) {
          this.Bullet = null
        }
      }
      if (this.Shouter) {
        this.m = Mathf.lerpDelta(this.m, kahinami.Frames.length, 0.086)
      }else{
        this.m = Mathf.lerpDelta(this.m, 0, 0.086)
      }

    },
    updateShooting() {
      if (this.BulletLife > 0 && this.Bullet != null) {
        return;
      }

      if (this.reload <= 0 && (this.consValid() || this.cheating())) {
        var type = this.peekAmmo();

        this.shoot(type);

        this.reload = kahinami.reloadTime;
      }
      if (this.BulletLife > 0 && this.Bulletn != null) {
      }else{
        this.reload -= Time.delta * this.peekAmmo().reloadMultiplier * this.baseReloadSpeed();
        print(this.reload)
        if (this.reload < -10) {
          this.reload = -10
        }
      }
    },
    shoot(type) {
      this.useAmmo();
      var x = this.x + Angles.trnsx(this.rotation, 17)
      var y = this.y + Angles.trnsy(this.rotation, 17)
      chager.at(x,y, this.rotation);
      for(var i = 0;i < 10;i++){
        Time.run(Mathf.range(20),() => {
          finpow.at(x,y, this.rotation);
        })
      }
      this.Shouter = true
      //ReloadTime / 2 = chager
      Time.run(kahinami.reloadTime / 4, () => {
        if (!this.isValid()) return;
        this.recoil = kahinami.recoilAmount;
        this.Bulletn = type.create(this, this.team, x, y, this.rotation, 1);
        pow.at(x,y,this.rotation)
        this.BulletLife = this.ShootDuration
        Time.run(this.BulletLife, () => {
          this.Shouter = false
        });
        Sounds.plasmaboom.at(x, y, 1)

      });

    }
  });
  return ent
}
kahinami.shootType = mel