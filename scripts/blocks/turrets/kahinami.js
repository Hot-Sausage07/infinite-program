const shot = extend(BasicBulletType, {
  damage: 10000,
  lifetime: 100,
  hitEffect: Fx.none,
  despawnEffect: Fx.none,
  shootEffect: Fx.none,
  smokeEffect: Fx.none,
  collides: false,
  collidesAir: false,
  collidesGround: false,
  collidesTiles: false,
  scaleVelocity: true,
  keepVelocity: false
});




const kahinami = extendContent(PowerTurret, "kahinami", {
  load() {
    this.super$load();
    this.FramesTurrets = []
    for (var i = 0; 0 < 9; i++) {
      this.FramesTurrets[i] = Core.atlas.find(this.name + "-frame-" + i)
    }
  },
  icons() {
    return [
      this.FramesTurrets[0]
      ]
  }
})

kahinami.buildType = ent => {
  ent = extendContent(PowerTurret.PowerTurretBuild, kahinami, {
    m: 0,
    Shouter: false,
    hasAmmo() {
      return this.power.status > 0 && this.power.status >= 0
    },
    draw() {
      var r = Math.floor(this.m)
      let z = Draw.z();
      Draw.z(Layer.turret);
      Draw.rect(kahinami.FramesTurrets[r],this.x,this.y,this.rotation - 90)
      Draw.z(z)
    },
    updateTile() {
      this.super$updateTile()
      if (this.Shouter) {
        this.m = Mathf.lerpDelta(this.m, kahinami.FramesTurrets.length, 0.086)
      } else {
        this.m = Mathf.lerpDelta(this.m, 0, 0.086)
      }
    },
    shoot(ammo) {
      var x = this.x + Angles.trnsx(this.rotation, 50)
      var y = this.y + Angles.trnsy(this.rotation, 50)
      const vec = new Vec2()

      this.useAmmo();
      for (var i = 0; i < 20; i++) {
        let r = Math.floor(Math.random() * 100)
        Time.run(r, () => {
          if (!this.isValid()) return;
        });

      }
      this.Shouter = true;
      //ReloadTime / 2 = chager
      Time.run(200, () => {
        if (!this.isValid()) return;
        this.recoil = kahinami.recoilAmount;
        this.bullet(ammo, this.rotation);
        this.Shouter = false;
        Sounds.plasmaboom.at(x, y, 1)

      });

    }
  });
  ent.war = 0
  return ent
}
kahinami.shootType = shot;