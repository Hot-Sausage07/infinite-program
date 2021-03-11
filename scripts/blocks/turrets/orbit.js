//libs
const elib = require("infiniteprogram/libs/effectlib");
const dlib = require("infiniteprogram/libs/drawlib");

//Effect

const orbEffect = new Effect(25, e => {
    if(Mathf.chance(0.02)){
	dlib.splashlineii(e.x, e.y, Color.valueOf("abdbff"), Color.valueOf("f0f8ff"), e.fin(), e.fout() * 4.725, e.fslope() * 22 + 20, e.id, 1, 1 + 0 * e.fin(), e.rotation, 0);
	}
});

const chargeEffect = elib.swillEffect(30, Color.valueOf("abdbff"), Color.valueOf("f0f8ff"), 1, 6, 5, 3, 1, 20, 120);

const chargeEffectBegin = new Effect(60, e => {
	let alpha = 1;
	dlib.fillCircleii(e.x, e.y, Color.valueOf("abdbff"), Color.valueOf("f0f8ff"), e.fin(), alpha, 4 * e.fout());
	dlib.fillCircleii(e.x, e.y, Color.valueOf("abdbff"), Color.valueOf("f0f8ff"), e.fin(), alpha, 2 * e.fout());
});

//Bullet
const orbBullet = extend(MissileBulletType, {
  lifetime : 95,
  despawnEffect : Fx.hitLancer,
  hitEffect : Fx.hitLancer,
  speed : 7.125,
  damage : 50,
  shootEffect : Fx.lightningShoot,
  pierce : false,
  update(b) {
    const target = Units.bestTarget(b.team, b.x, b.y,600, e => !b.dead && (b.isGrounded() && true) || (b.isFlying() && true), b => true, (u, x, y) => Mathf.dst2(x, y, u.x, u.y));
    if (target != null) {
      b.vel.setAngle(Mathf.slerpDelta(b.rotation(), b.angleTo(target), 0.6));
    };
    if (b.timer.get(1, 0.00001)) {
      orbEffect.at(b.x, b.y, b.rotation(), Color.valueOf("C2FF8300"));
    };
  },
  draw(b) {}
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