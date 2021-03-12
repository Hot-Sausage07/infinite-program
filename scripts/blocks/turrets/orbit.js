//libs
const elib = require("infiniteprogram/libs/effectlib");
const dlib = require("infiniteprogram/libs/drawlib");

//Effect



const chargeEffect = elib.swillEffect(30, Color.valueOf("abdbff"), Color.valueOf("f0f8ff"), 1, 6, 5, 3, 1, 20, 120);

const chargeEffectBegin = new Effect(60, e => {
	let alpha = 1;
	dlib.fillCircleii(e.x, e.y, Color.valueOf("abdbff"), Color.valueOf("f0f8ff"), e.fin(), alpha, 4 * e.fout());
	dlib.fillCircleii(e.x, e.y, Color.valueOf("abdbff"), Color.valueOf("f0f8ff"), e.fin(), alpha, 2 * e.fout());
});

//Bullet
const orbBullet = extend(MissileBulletType, {
  lifetime : 100,
  despawnEffect : Fx.hitLancer,
  hitEffect : Fx.lancerLaserShoot,
  speed : 7.125,
  damage : 60,
  shootEffect : Fx.lightningShoot,
  pierce : false,
  init(b){
    if(!b)return
    b.data = new Trail(15)
  },
  update(b) {
    var target = Units.bestTarget(b.team, b.x, b.y, 200, e => !e.dead && (e.isGrounded() && true) || (e.isFlying() && true), b => true, (u, x, y) => Mathf.dst2(x, y, u.x, u.y));
    if (target != null) {
      b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target),0.09));
    };

     b.data.update(b.x,b.y)
    
  },
  draw(b) {
    b.data.draw(Color.valueOf("abdbff"), 2 + b.fslope() * 3)
  }
});



const orbit = extendContent(PowerTurret, "orbit", {
  chargeTime : 80,
  chargeMaxDelay : 60,
  chargeEffects : 7,
  recoilAmount : 2,
  reloadTime : 80,
  cooldown : 0.03,
  shootType : orbBullet,
  chargeEffect : chargeEffect,
  chargeBeginEffect : chargeEffectBegin
});
if(Mathf.chance(0.02)){
code
}