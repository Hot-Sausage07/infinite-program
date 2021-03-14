const solarCharger = new Effect(20,e => {
  Draw.color(Pal.lancerLaser)
  Lines.lineAngle(e.x, e.y, e.rotation + e.fout() * 20, e.fslope() * 30);
  Lines.lineAngle(e.x, e.y, e.rotation + e.fout() * 40, e.fslope() * 25);
  Lines.lineAngle(e.x, e.y, e.rotation + e.fout() * 60, e.fslope() * 20);
  
  Lines.lineAngle(e.x, e.y, e.rotation - e.fout() * 20, e.fslope() * 30);
  Lines.lineAngle(e.x, e.y, e.rotation - e.fout() * 40, e.fslope() * 25);
  Lines.lineAngle(e.x, e.y, e.rotation - e.fout() * 60, e.fslope() * 20);
})

const solarblend = new Effect(30 , e => {
  Draw.color(Pal.lancerLaser)
  Angles.randLenVectors(e.id, 8, e.fout() * 80, Time.time, 360, (x, y) => {
    Drawf.tri(e.x + x, e.y + y, e.fout() * 5, e.fout() * 5, e.rotation)
  })
})

const solarShot = new Effect(15, e => {
  Draw.color(Pal.lancerLaser)
  for (let i = 0; i < 2; i++) {
    Drawf.tri(e.x, e.y, e.fout() * 5, 60  ,e.rotation + 180 * i)
  }
})

const onder1 = extendContent(BasicBulletType, {
  damage: 100,
  speed: 1,
  lifetime: 300,
  knockback: 0,
  pierce: false,
  pierceBuilding: false,
  hitSize: 5,
  collides: true,
  collidesTiles: true,
  hitEffect: Fx.none,
  despawnEffect: Fx.none,
  shootEffect: Fx.none,
  init(b) {
    if (!b) return
    b.data = new Trail(b.fout() * 40)
  },
  draw(e) {
    e.data.draw(Pal.lancerLaser, e.fout() * 4)
  },
  update(b) {
    
    b.data.update(b.x, b.y)
    let onder1 = Mathf.sin(Time.time,40,10)
    b.vel.setAngle(b.rotation() + onder1);
    var target = Units.bestTarget(b.team, b.x, b.y, 200, e => !e.dead && (e.isGrounded() && true) || (e.isFlying() && true), b => true, (u, x, y) => Mathf.dst2(x, y, u.x, u.y));
    if (target != null) {
      let on = Mathf.sin(Time.time,20,5)
      b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target) , 0.09));
    };
  }
});

const onder2 = extendContent(BasicBulletType, {
  damage: 100,
  speed: 1,
  lifetime: 300,
  knockback: 0,
  pierce: false,
  pierceBuilding: false,
  hitSize: 5,
  collides: true,
  collidesTiles: true,
  hitEffect: Fx.none,
  despawnEffect: Fx.none,
  shootEffect: Fx.none,
  init(b) {
    if (!b) return
    b.data = new Trail(b.fout() * 40)
  },
  draw(e) {
    e.data.draw(Pal.lancerLaser, e.fout() * 4)
  },
  update(b) {
    
    b.data.update(b.x, b.y)
    let onder2 = Mathf.cos(Time.time,40,10)
    b.vel.setAngle(b.rotation() - onder2);
    var target = Units.bestTarget(b.team, b.x, b.y, 200, e => !e.dead && (e.isGrounded() && true) || (e.isFlying() && true), b => true, (u, x, y) => Mathf.dst2(x, y, u.x, u.y));
    if (target != null) {
      let on = Mathf.sin(Time.time,20,5)
    
      b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target) , 0.09));
    };
  }
});

const sap = extend(LightningBulletType,{
  lightningLength:100,
  damage: 150,
  lightningLengthRand: 0
})


const LaserShot = extend(LaserBulletType,{
  length: 500,
  width: 40,
  lifetime: 200,
  damage: 350,
  shootEffect: solarShot,
  update(b){
    if (b.timer.get(0, (8+ b.fin() * 2) * 1)) {
      /*
    let RangerX = Mathf.range(-30,30)
    let RangerY = Mathf.range(-30,30)
    let trnsX = b.x + Angles.trnsx(b.rotation * Time.time,RangerX)
    let trnsY = b.y + Angles.trnsx(Time.time* Time.time,RangerY)
      onder1.create(b.owner, b.team, b.x + RangerX, b.y + RangerY, b.rotation() - 90 + RangerY,2);
      onder2.create(b.owner, b.team,trnsX,trnsY, b.rotation() - 90 + RangerX,2);
      */
      onder1.create(b.owner, b.team, b.x, b.y, b.rotation() - 90, 2);
      onder2.create(b.owner, b.team, b.x, b.y, b.rotation() - 90, 2);
      
      sap.create(b.owner, b.team, b.x, b.y, b.rotation() + Mathf.range(-45, 45), 2)
      sap.create(b.owner, b.team, b.x, b.y, b.rotation() + Mathf.range(-15, 15), 2)
    }
  }
})
const Solar = extendContent(PowerTurret, "Solar", {
  chargeTime: 30,
  chargeMaxDelay: 0,
  chargeEffects: 7,
  recoilAmount: 0,
  reloadTime: 80,
  cooldown: 0.03,
  shootType: LaserShot,
  chargeEffect: solarCharger,
  chargeBeginEffect: solarblend
});