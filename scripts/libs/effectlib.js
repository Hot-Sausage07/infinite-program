/*
* An extension for draw lib
* but doesn't use drawlib!
* Lib by xXZenGamingXx
*/
module.exports = {
//simple effect circle
circle(lifetime, colorFrom, colorTo, radius){
	const c = new Effect(lifetime, e => {
		Draw.color(colorFrom, colorTo, e.fin());
		Fill.circle(e.x, e.y, radius);
		Draw.color();
		});
	return c;
},
//circle that becomes smaller
circleii(lifetime, colorFrom, colorTo, radius, radiusMultiplier){
	const cii = new Effect(lifetime, e => {
		Draw.color(colorFrom, colorTo, e.fin());
		Fill.circle(e.x, e.y, radius + e.fout() * radiusMultiplier);
		Draw.color();
		});
	return cii;
},
//Splash Effect
splashCircle(lifetime, colorFrom, colorTo, radius, amount, distance, cone){
	const sc = new Effect(lifetime, e => {
		Draw.color(colorFrom, colorTo, e.fin());
		const hj = new Floatc2({get: function(x, y){
			Fill.circle(e.x + x, e.y + y, radius);
		}});  
	   Angles.randLenVectors(e.id, amount, e.finpow() * distance, e.rotation, cone, hj);
	});
	return sc;
},
//line
//it's like circle but it's an outline
lineCircle(lifetime, colorFrom, colorTo, radius){
	const lc = new Effect(lifetime, e => {
		Draw.color(colorFrom, colorTo, e.fin());
		Lines.stroke(thickness);
		Lines.circle(e.x, e.y, radius);
		Draw.color();
		Lines.stroke(1);
		});
	return lc;
},
//basically circleii but it's an outline
lineCircleii(lifetime, colorFrom, colorTo, thickness, radius, radiusMultiplier){
	const lcii = new Effect(lifetime, e => {
		Draw.color(colorFrom, colorTo, e.fin());
		Lines.stroke(thickness);
		Lines.circle(e.x, e.y, radius + e.fout() * radiusMultiplier);
		Draw.color();
		Lines.stroke(1);
	});
	return lcii;
},
//splash line mostly used for hit Effect
splashline(lifetime, colorFrom, colorTo, thickness, length, amount, distance, cone){
	const sl = new Effect(lifetime, e => {
		Draw.color(colorFrom, colorTo, e.fin());
			const hj = new Floatc2({get: function(x, y){
				const ang = Mathf.angle(x, y);
				Lines.stroke(thickness);
				Lines.lineAngle(e.x + x, e.y + y, ang, length);
				Lines.stroke(1);
			}});
		    Angles.randLenVectors(e.id, amount, e.finpow() * distance, e.rotation, cone, hj);
	    Draw.color();
	});
	return sl;
},
// swill/swirl effect mainly used for charge or black hole Effect
swillEffect(lifetime, colorFrom, colorTo, thickness, radius, length, rotationMultiplier, amount, distance, cone){
	const se = new Effect(lifetime, e => {
		Draw.color(colorFrom, colorTo, e.fin());
			const hj = new Floatc2({get: function(a, b){
				const ang = Mathf.angle(a, b);
				let l = length * 0.01
				Lines.stroke(thickness);
				Lines.swirl(e.x, e.y, e.fout() * radius, l, ang * e.fout() * rotationMultiplier);
				Lines.stroke(1);
			}});
			Angles.randLenVectors(e.id, amount, distance, e.rotation, cone, hj);
		Draw.color();
	});
	return se;
},
//used for flames
flameEffect(lifetime, colorFrom, colorMid, colorTo, radius, amount, distance, cone){
	const sc = new Effect(lifetime, e => {
		Draw.color(colorFrom, colorMid, colorTo, e.fin());
		const hj = new Floatc2({get: function(x, y){
			Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * radius);
		}});  
		Angles.randLenVectors(e.id, amount, e.finpow() * distance, e.rotation, cone, hj);
	});
	return sc;
},
}