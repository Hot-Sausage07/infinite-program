/*
* Shortcuts for common draw methods used in effects.
* Lib by JerichoFletcher extended and modified xXZenGamingXx
*/
/*
* [Notes]
* inOut is where you place e.fin() or e.fout() for the change color
* finion is the completion of the circle
* rot is rotation
* id is e.id
*/
module.exports = {
	lineCircle(x, y, color, thickness, radius){
		Draw.color(color);
		Lines.stroke(thickness);
	    Lines.circle(x, y, radius);
	    Draw.color();
	    Lines.stroke(1);
	},
	lineCircleii(x, y, colorFrom, colorTo, inOut, thickness, radius){
		Draw.color(colorFrom, colorTo, inOut);
		Lines.stroke(thickness);
	    Lines.circle(x, y, radius);
	    Draw.color();
	    Lines.stroke(1);
	},
	lineCircleWCol(x, y, thickness, radius){
	    Lines.stroke(thickness);
	    Lines.circle(x, y, radius);
	    Lines.stroke(1);
	},
	fillCircle(x, y, color, alpha, radius){
	    Draw.color(color);
	    Draw.alpha(alpha);
	    Fill.circle(x, y, radius);
	    Draw.color();
	},
	fillCircleii(x, y, colorFrom, colorTo, inOut, alpha, radius){
	    Draw.color(colorFrom, colorTo, inOut);
	    Draw.alpha(alpha);
	    Fill.circle(x, y, radius);
	    Draw.color();
	},
	fillCircleWCol(x, y, radius){
	    Fill.circle(x, y, radius);
	},
	fillPoly(x, y, color, alpha, sides, size, rot){
		Draw.color(color);
		Draw.alpha(alpha);
		Fill.poly(x, y, sides, size, rot);
		Draw.color();
	},
	fillPolyii(x, y, colorFrom, colorTo, inOut, alpha, sides, size, rot){
		Draw.color(colorFrom, colorTo, inOut);
		Draw.alpha(alpha);
		Fill.poly(x, y, sides, size, rot);
		Draw.color();
	},
	fillPolyWCol(x, y, sides, size, rot){
		Fill.poly(x, y, sides, size, rot);
	},
	linePoly(x, y, color, alpha, thickness, sides, size, rot){
	  	Draw.color(color);
	  	Draw.alpha(alpha);
	  	Lines.stroke(thickness);
	  	Lines.poly(x, y, sides, size, rot);
	  	Lines.stroke(1);
	  	Draw.color();
	},
	linePolyii(x, y, colorFrom, colorTo, inOut, alpha, thickness, sides, size, rot){
	  	Draw.color(colorFrom, colorTo, inOut);
	  	Draw.alpha(alpha);
	  	Lines.stroke(thickness);
	  	Lines.poly(x, y, sides, size, rot);
	  	Lines.stroke(1);
	  	Draw.color();
	},
	linePolyWCol(x, y, thickness, sides, size, rot){
	  	Lines.stroke(thickness);
	  	Lines.poly(x, y, sides, size, rot);
	  	Lines.stroke(1);
	},
	swirl(x, y, color, alpha, thickness, radius, finion, angle){
	    Draw.color(color);
	    Draw.alpha(alpha);
	    Lines.stroke(thickness);
	    Lines.swirl(x, y, radius, finion, angle);
	    Lines.stroke(1);
	    Draw.color();
	},
	swirlii(x, y, colorFrom, colorTo, inOut, alpha, thickness, radius, finion, angle){
	    Draw.color(colorFrom, colorTo, inOut);
	    Draw.alpha(alpha);
	    Lines.stroke(thickness);
	    Lines.swirl(x, y, radius, finion, angle);
	    Lines.stroke(1);
	    Draw.color();
	},
	swirlWCol(x, y, thickness, radius, finion, angle){
	    Lines.stroke(thickness);
	    Lines.swirl(x, y, radius, finion, angle);
	    Lines.stroke(1);
	},
	splashline(x, y, color, thickness, length, id, amount, distance, rotation, cone){
	    Draw.color(color);
	    const hj = new Floatc2({get: function(a, b){
		    const ang = Mathf.angle(a, b);
		    Lines.stroke(thickness);
		    Lines.lineAngle(x + a, y + b, ang, length);
		    Lines.stroke(1);
	    }});
	    Angles.randLenVectors(id, amount, distance, rotation, cone, hj);
	    Draw.color();
	},
	splashlineii(x, y, colorFrom, colorTo, inOut, thickness, length, id, amount, distance, rotation, cone){
	    Draw.color(colorFrom, colorTo, inOut);
	    const hj = new Floatc2({get: function(a, b){
		    const ang = Mathf.angle(a, b);
		    Lines.stroke(thickness);
		    Lines.lineAngle(x + a, y + b, ang, length);
		    Lines.stroke(1);
	    }});
	    Angles.randLenVectors(id, amount, distance, rotation, cone, hj);
	    Draw.color();
	},
	splashCircle(x, y, color, radius, id, amount, distance, rotation, cone){
	    Draw.color(color);
	    const hj = new Floatc2({get: function(a, b){
		    const ang = Mathf.angle(a, b);
		    Fill.circle(x + a, y + b, radius);
	    }});
	    Angles.randLenVectors(id, amount, distance, rotation, cone, hj);
	    Draw.color();
	},
	splashCircleii(x, y, colorFrom, colorTo, inOut, radius, id, amount, distance, rotation, cone){
	    Draw.color(colorFrom, colorTo, inOut);
	    const hj = new Floatc2({get: function(a, b){
		    const ang = Mathf.angle(a, b);
		    Fill.circle(x + a, y + b, radius);
	    }});
	    Angles.randLenVectors(id, amount, distance, rotation, cone, hj);
	    Draw.color();
	},
	spike(x, y, colorFrom, colorTo, inOut, size, inOutii, rotation){
	    Draw.color(colorFrom, colorTo, inOut);
	    Drawf.tri(x, y, size * inOutii, (size * 2) * inOutii, rotation);
	    Drawf.tri(x, y, size * inOutii, (size * 2) * inOutii, rotation + 90);
	    Drawf.tri(x, y, size * inOutii, (size * 2) * inOutii, rotation + 180);
	    Drawf.tri(x, y, size * inOutii, (size * 2) * inOutii, rotation + 270);
	    Draw.color();
	},
	spikeii(x, y, colorRrom, colorTo, inOut, spikes, size, lengthMultiplier, inOutii, rotation){
	    Draw.color(colorFrom, colorTo, inOut);
		const step = 360 / spikes;
		for(var i = 0; i < spikes; i++){
			Drawf.tri(x, y, size * inOutii, (size * lengthMultiplier) * inOutii, i * step + rotation);
		};
	},
}