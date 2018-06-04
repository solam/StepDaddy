(function()
{
	GestionCanvas = function()
	{
		var _ctx; //le contexte
		var _height; //la hauteur du canvas
		var _width; //la largeur du canvas
		//var _compteur;
		//var idFadeOut;

		//const _stepsFadeOut = 1;//10;
		//var _tempsRafraichissement; //en ms

		this.initialize = function()
		{
			var canvas=document.getElementById("canvas");
			_width=parseInt(canvas.getAttribute("width"));
			_height=parseInt(canvas.getAttribute("height"));
			_ctx=canvas.getContext('2d');
			
			//_compteur=0;
			//_tempsRafraichissement = 1000 / bpm / 16;
			//window.setInterval(dessin, _tempsRafraichissement);
			return this;
		}

		//window.onclick = function()
		//{
		//	window.setInterval(dessin, rafraichissement);
		//}

		function dessin()
		{
			//if(compteur%rafraichissement==0)
			//{
				definitionCouleur(0, 255, 0);
				dessinerRectangle(-1, -1, -1, -1, true);
				//definitionCouleur(255, 0, 0);
				//sinusoideOscillanteT(-1, 200, -1, 200, 30, 8, 50, 100);
				//sinusoideOscillanteAmplitude(-1, 400, -1, 400, 50, 1, 30, 60);
				//rectangleOscillant(450, 450, true, 2, 6, 20, 100, 50, 200);
			//}
			//else
			//{
				fadeOut();
			//}
			
			_compteur++;
		}

		this.definitionCouleur = function(r, g, b)
		{
			_ctx.fillStyle="rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
			_ctx.strokeStyle="rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
		}

		//(xTopLeft,yTopLeft) : position sommet gauche Rectangle
		//(w,h) : largeur, hauteur Rectangle
		this.dessinerRectangle = function(xTopLeft, yTopLeft, w, h, plein)
		{
			var valW=(w==-1)?_width:w;
			var valH=(h==-1)?_height:h;
			var valX=(xTopLeft==-1)?0:xTopLeft;
			var valY=(yTopLeft==-1)?0:yTopLeft;
			
			if(plein)
			{
				_ctx.fillRect(valX, valY, valW, valH);
			}
			else
			{
				_ctx.strokeRect(valX, valY, valW, valH);
			}
		}

		function dessinerRectangleDepuisCentre(xCentre, yCentre, w, h, plein)
		{
			dessinerRectangle(xCentre - w/2, yCentre - h/2, w, h, plein);
		}

		function rectangleTournant(xCentre, yCentre, w, h, plein, )
		{
			var w=wMin + (wMax - wMin)*(compteur%(nbPeriodesW*rafraichissement)/(nbPeriodesW*rafraichissement));
			var h=hMin + (hMax - hMin)*(compteur%(nbPeriodesH*rafraichissement)/(nbPeriodesH*rafraichissement));
			
			dessinerRectangleDepuisCentre(xCentre, yCentre, w, h, plein);
		}

		function rectangleOscillant(xCentre, yCentre, plein, nbPeriodesW, nbPeriodesH, wMin, wMax, hMin, hMax)
		{
			var w=wMin + (wMax - wMin)*(compteur%(nbPeriodesW*rafraichissement)/(nbPeriodesW*rafraichissement));
			var h=hMin + (hMax - hMin)*(compteur%(nbPeriodesH*rafraichissement)/(nbPeriodesH*rafraichissement));
			
			dessinerRectangleDepuisCentre(xCentre, yCentre, w, h, plein);
		}

		function sinusoideOscillanteT(x0, y0, x1, y1, amplitude, nbPeriodes, Tmin, Tmax)
		{
			var T = Tmin + (Tmax - Tmin)*(compteur%(nbPeriodes*rafraichissement)/(nbPeriodes*rafraichissement));
			
			dessinerSinusoide(x0, y0, x1, y1, T, amplitude);
		}

		function sinusoideOscillanteAmplitude(x0, y0, x1, y1, T, nbPeriodes, amplitudeMin, amplitudeMax)
		{
			var amplitude = amplitudeMin + (amplitudeMax - amplitudeMin)*(compteur%(nbPeriodes*rafraichissement)/(nbPeriodes*rafraichissement));
			
			dessinerSinusoide(x0, y0, x1, y1, T, amplitude);
		}

		function dessinerSinusoide(x0, y0, x1, y1, T, amplitude)
		{
			var valX0=(x0==-1)?0:x0;
			var valY0=(y0==-1)?0:y0;
			var valX1=(x1==-1)?_width:x1;
			var valY1=(y1==-1)?_height:y1;
			
			var distance = Math.sqrt((valX0-valX1)*(valX0-valX1)+(valY0-valY1)*(valY0-valY1));
			
			//on récupère le nombre d'oscillations
			n=distance/T;
			
			//on calcule le vecteur perpendiculaire a la droite (x0, y0) -> (x1, y1)
			var Xnorm = valX0 - (valY1 - valY0);
			var Ynorm = valY0 + (valX1 - valX0);
			
			//on normalise
			Xnorm *= amplitude / distance;
			Ynorm *= amplitude / distance;
			
			var x = valX0;
			var y = valY0;
			var periodeX = (valX1-valX0)/n;
			var periodeY = (valY1-valY0)/n;
			
			_ctx.beginPath();
			_ctx.moveTo(x, y);
			
			for(var i=1; i<=Math.ceil(n); i++)
			{
				_ctx.bezierCurveTo(x + Xnorm, y + Ynorm, x + periodeX/2 + Xnorm, y + periodeY/2 + Ynorm, x + periodeX/2, y + periodeY/2);
				_ctx.bezierCurveTo(x + periodeX/2 - Xnorm, y + periodeY/2 - Ynorm, x + periodeX - Xnorm, y + periodeY - Ynorm, x + periodeX, y + periodeY);
				//ctx.bezierCurveTo(x + Xnorm + 1, y + Ynorm - 1, x + periodeX/2 + Xnorm - 1, y + periodeY/2 + Ynorm - 1, x + periodeX/2, y + periodeY/2);
				//ctx.bezierCurveTo(x + periodeX/2 - Xnorm + 1, y + periodeY/2 - Ynorm + 1, x + periodeX - Xnorm - 1, y + periodeY - Ynorm + 1, x + periodeX, y + periodeY);

				
				x += periodeX;
				y += periodeY;
				
				_ctx.stroke();
			}
			
			_ctx.closePath();
		}

		function fadeOut()
		{
			_ctx.globalAlpha=(_compteur%_tempsRafraichissement)/_tempsRafraichissement;
			definitionCouleur(0, 0, 0);
			dessinerRectangle(-1, -1, -1, -1, true);
		}
	};
}());
