(function ()
{
	GestionCanvas = function ()
	{
		var _ctx; //le contexte
		var _height; //la hauteur du canvas
		var _width; //la largeur du canvas
		//var _compteur;
		//var idFadeOut;

		//const _stepsFadeOut = 1;//10;
		//var _tempsRafraichissement; //en ms

		var _couleurs;

		this.initialize = function ()
		{
			var canvas = document.getElementById("canvas");
			_width = parseInt(canvas.getAttribute("width"));
			_height = parseInt(canvas.getAttribute("height"));
			_ctx = canvas.getContext('2d');

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

		this.definitionCouleur = function (r, g, b)
		{
			_ctx.fillStyle = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
			_ctx.strokeStyle = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
		}

		this.dessinerCercle = function (centreX, centreY, rayon, plein)
		{
			_ctx.beginPath();
			_ctx.arc(centreX, centreY, rayon, 0, 2 * Math.PI, false);

			if (plein)
			{
				_ctx.fill();
			}
			else
			{
				_ctx.stroke();
			}
		}

		//(xTopLeft,yTopLeft) : position sommet gauche Rectangle
		//(w,h) : largeur, hauteur Rectangle
		var dessinerRectangle = function (xTopLeft, yTopLeft, w, h, plein)
		{
			var valW = (w == -1) ? _width : w;
			var valH = (h == -1) ? _height : h;
			var valX = (xTopLeft == -1) ? 0 : xTopLeft;
			var valY = (yTopLeft == -1) ? 0 : yTopLeft;

			if (plein)
			{
				_ctx.fillRect(valX, valY, valW, valH);
			}
			else
			{
				_ctx.strokeRect(valX, valY, valW, valH);
			}
		}

		var dessinerRectangleDepuisCentre = function(xCentre, yCentre, w, h, plein)
		{
			dessinerRectangle(xCentre - w / 2, yCentre - h / 2, w, h, plein);
		}

		function rectangleTournant(xCentre, yCentre, w, h, plein, )
		{
			var w = wMin + (wMax - wMin) * (compteur % (nbPeriodesW * rafraichissement) / (nbPeriodesW * rafraichissement));
			var h = hMin + (hMax - hMin) * (compteur % (nbPeriodesH * rafraichissement) / (nbPeriodesH * rafraichissement));

			dessinerRectangleDepuisCentre(xCentre, yCentre, w, h, plein);
		}

		function rectangleOscillant(xCentre, yCentre, plein, nbPeriodesW, nbPeriodesH, wMin, wMax, hMin, hMax)
		{
			var w = wMin + (wMax - wMin) * (compteur % (nbPeriodesW * rafraichissement) / (nbPeriodesW * rafraichissement));
			var h = hMin + (hMax - hMin) * (compteur % (nbPeriodesH * rafraichissement) / (nbPeriodesH * rafraichissement));

			dessinerRectangleDepuisCentre(xCentre, yCentre, w, h, plein);
		}

		function sinusoideOscillanteT(x0, y0, x1, y1, amplitude, nbPeriodes, Tmin, Tmax)
		{
			var T = Tmin + (Tmax - Tmin) * (compteur % (nbPeriodes * rafraichissement) / (nbPeriodes * rafraichissement));

			dessinerSinusoide(x0, y0, x1, y1, T, amplitude);
		}

		function sinusoideOscillanteAmplitude(x0, y0, x1, y1, T, nbPeriodes, amplitudeMin, amplitudeMax)
		{
			var amplitude = amplitudeMin + (amplitudeMax - amplitudeMin) * (compteur % (nbPeriodes * rafraichissement) / (nbPeriodes * rafraichissement));

			dessinerSinusoide(x0, y0, x1, y1, T, amplitude);
		}

		function dessinerSinusoide(x0, y0, x1, y1, T, amplitude)
		{
			var valX0 = (x0 == -1) ? 0 : x0;
			var valY0 = (y0 == -1) ? 0 : y0;
			var valX1 = (x1 == -1) ? _width : x1;
			var valY1 = (y1 == -1) ? _height : y1;

			var distance = Math.sqrt((valX0 - valX1) * (valX0 - valX1) + (valY0 - valY1) * (valY0 - valY1));

			//on récupère le nombre d'oscillations
			n = distance / T;

			//on calcule le vecteur perpendiculaire a la droite (x0, y0) -> (x1, y1)
			var Xnorm = valX0 - (valY1 - valY0);
			var Ynorm = valY0 + (valX1 - valX0);

			//on normalise
			Xnorm *= amplitude / distance;
			Ynorm *= amplitude / distance;

			var x = valX0;
			var y = valY0;
			var periodeX = (valX1 - valX0) / n;
			var periodeY = (valY1 - valY0) / n;

			_ctx.beginPath();
			_ctx.moveTo(x, y);

			for (var i = 1; i <= Math.ceil(n); i++)
			{
				_ctx.bezierCurveTo(x + Xnorm, y + Ynorm, x + periodeX / 2 + Xnorm, y + periodeY / 2 + Ynorm, x + periodeX / 2, y + periodeY / 2);
				_ctx.bezierCurveTo(x + periodeX / 2 - Xnorm, y + periodeY / 2 - Ynorm, x + periodeX - Xnorm, y + periodeY - Ynorm, x + periodeX, y + periodeY);
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
			_ctx.globalAlpha = (_compteur % _tempsRafraichissement) / _tempsRafraichissement;
			definitionCouleur(0, 0, 0);
			dessinerRectangle(-1, -1, -1, -1, true);
		}

		this.initAffichage1 = function (tracks)
		{
			//effacage de l'ecran en noir
			this.definitionCouleur(0, 0, 0);
			dessinerRectangle(-1, -1, -1, -1, true);

			//dessin en blanc a partir de maintenant
			this.definitionCouleur(255, 255, 255);

			var centreY = _height / 2;
			var nbInstrus = tracks.length;

			_couleurs = new Array();

			for (var i = 0; i < nbInstrus; i++)
			{
				var nbPistes = tracks[i].length;

				var centreX = _width / nbInstrus * (1 / 2 + i);

				_couleurs[i] = new Array();

				for (var j = 0; j < nbPistes; j++)
				{
					_couleurs[i][j] = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)]; //r, g, b
					this.dessinerCercle(centreX, centreY, _width / nbInstrus * ((j + 1) / nbPistes), false);
				}
			}

			_ctx.globalAlpha = 0.5;
		}

		this.initAffichage2 = function (tracks)
		{
			//effacage de l'ecran en noir
			this.definitionCouleur(0, 0, 0);
			dessinerRectangle(-1, -1, -1, -1, true);

			var nbInstrus = tracks.length;

			_couleurs = new Array();

			for (var i = 0; i < nbInstrus; i++)
			{
				var nbPistes = tracks[i].length;

				_couleurs[i] = new Array();

				for (var j = 0; j < nbPistes; j++)
				{
					_couleurs[i][j] = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)]; //r, g, b
				}
			}

			_ctx.globalAlpha = 0.8;
		}

		var _positionEtDimensions;

		this.initAffichage3 = function (tracks)
		{
			//effacage de l'ecran en noir
			this.definitionCouleur(0, 0, 0);
			dessinerRectangle(-1, -1, -1, -1, true);

			var nbInstrus = tracks.length;

			_couleurs = new Array();
			_positionEtDimensions = new Array();

			for (var i = 0; i < nbInstrus; i++)
			{
				var nbPistes = tracks[i].length;

				_couleurs[i] = new Array();
				_positionEtDimensions[i] = new Array();

				for (var j = 0; j < nbPistes; j++)
				{
					_couleurs[i][j] = [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)]; //r, g, b
					_positionEtDimensions[i][j] = [Math.random() * _width, Math.random() * _height, Math.random() * 100, 0];
				}
			}

			_ctx.globalAlpha = 0.5;
		}

		this.affichage1 = function (numInstru, nbInstrus, numPiste, nbPistes, numNote)
		{
			var centreY = _height / 2;
			var centreX = _width / nbInstrus * (1 / 2 + (numInstru));

			this.definitionCouleur(_couleurs[numInstru][numPiste][0], _couleurs[numInstru][numPiste][1], _couleurs[numInstru][numPiste][2]);

			//else
			//{
			//	this.definitionCouleur(0, 0, 0);
			//}	

			this.dessinerCercle(centreX, centreY, _width / nbInstrus * ((numPiste + 1) / nbPistes), true);
		}

		this.affichage2 = function (numInstru, numPiste, numNote)
		{
			var centreY = _height * Math.random();
			var centreX = _width * Math.random();

			if (numNote % 8 == 0)
			{
				_ctx.globalAlpha = 0.1;
				this.definitionCouleur(0, 0, 0);
				dessinerRectangle(-1, -1, -1, -1, true);
			}

			_ctx.globalAlpha = 0.8;

			this.definitionCouleur(_couleurs[numInstru][numPiste][0], _couleurs[numInstru][numPiste][1], _couleurs[numInstru][numPiste][2]);

			this.dessinerCercle(centreX, centreY, 100 * Math.random(), true);
		}

		this.affichage3 = function (numInstru, numPiste, numNote)
		{
			//for (var i = 0; i < nbInstrus; i++)
			//	for(var j=0; j<nbPistes; j++)
			//{
			
			if (numNote % 8 == 0)
			{
				_ctx.globalAlpha = 0.1;
				this.definitionCouleur(0, 0, 0);
				dessinerRectangle(-1, -1, -1, -1, true);
			}

			_ctx.globalAlpha = 0.5;

			_ctx.save(); //on sauvegarde l'état du canevas avant opérations de translation et rotation

			this.definitionCouleur(_couleurs[numInstru][numPiste][0], _couleurs[numInstru][numPiste][1], _couleurs[numInstru][numPiste][2]);

			_ctx.translate(_positionEtDimensions[numInstru][numPiste][0], _positionEtDimensions[numInstru][numPiste][1]);
			_ctx.rotate(_positionEtDimensions[numInstru][numPiste][3]);
			_positionEtDimensions[numInstru][numPiste][3] += 2 * Math.PI / 16;
			_ctx.translate(-_positionEtDimensions[numInstru][numPiste][0], -_positionEtDimensions[numInstru][numPiste][1]);

			dessinerRectangleDepuisCentre(_positionEtDimensions[numInstru][numPiste][0], _positionEtDimensions[numInstru][numPiste][1], _positionEtDimensions[numInstru][numPiste][2], _positionEtDimensions[numInstru][numPiste][2], true);

			_ctx.restore(); //on restaure l'état
		}
	};
}());
