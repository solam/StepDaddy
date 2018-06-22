(function ()
{
    //cette fonction va lire les configs chargés dans l'objet window, et afficher les numéros des configs dans le <select>
    var detectionInsConf = function ()
    {
        var indices = new Array;

        //parcours des conf existantes
        for (var i = 0; i < 100; i++)
        {
            if (typeof window["insConf" + i] !== "undefined")
            {
                indices.push(i);
            }
        }

        var select = document.querySelector("select");

        //ajout des num de conf dans le select
        for (var i = 0; i < indices.length; i++)
        {
            var nouvelleOption = document.createElement("option", {value: indices[i]});
            nouvelleOption.textContent = indices[i];

            select.appendChild(nouvelleOption);
        }
    }

    //cette fonction va charger dans la page web le contenu de la config
    var chargementInsConf = function ()
    {
        //on rend visible le div pour afficher la conf
        var divInsConf = document.getElementById("insConf");

        divInsConf.className = "visible";

        //on nettoie le contenu que ce tag peut contenir (exécution préalable de ce code, par exemple)
        divInsConf.innerHTML = "";

        //on récupère le numéro de la conf sélectionnée
        var select = document.querySelector("select");
        var numConf = select.options[select.selectedIndex].value;

        //on récupère la conf
        var insConf = window["insConf" + numConf];

        gestionCanaux(divInsConf, insConf);
    }

    //cette fonction parcourt les canaux, creant un nouveau div pour chaque nouveau canal, puis va plonger dans chaque canal
    var gestionCanaux = function (divInsConf, insConf)
    {
        parcourirTableau(insConf, function (canal)
        {
            var divCanal = creationNoeudEtAjout("div", null, divInsConf, "canal couleurFond" + insConf.indexOf(canal) % 2, null, null);
            gestionPropertiesCanal(divCanal, canal);
        });
    }
    
    //cette fonction va parcourir les parametres du canal, creant un div pour chaque parametre, 
    //puis plonge quand il rencontre "conf" ou "patterns", qui sont également des tableaux d'objets
    var gestionPropertiesCanal = function(divCanal, canal)
    {
        parcourirObjet(canal, function (nomProp, contenuProp)
        {
            var divPropertyCanal = creationNoeudEtAjout("div", null, divCanal, null, nomProp, null);

            switch (nomProp)
            {
                case 'conf':
                    gestionConfs(divPropertyCanal, contenuProp);
                    break;
                case 'patterns':
                    parcoursTableauDObjets(divPropertyCanal, contenuProp);
                    break;
                default:
                    creationNoeudEtAjout("input", {type: "text"}, divPropertyCanal, "decalageAbsolu", null, contenuProp);
                    break;
            }
        });
    }

    var gestionConfs = function(divProperty, confs)
    {
        parcourirTableau(confs, function (conf)
        {
            var divConf = creationNoeudEtAjout("div", null, divProperty, "decalageRelatif", null, null);
            gestionPropertiesConf(divConf, conf);
        });
        
        //divProperty.appendChild(document.createElement("br"));
    }

    var gestionPropertiesConf = function(divConf, conf)
    {
        parcourirObjet(conf, function (nomProp, contenuProp)
        {
            var divPropertyConf = creationNoeudEtAjout("div", null, divConf, null, nomProp, null);

            switch (nomProp)
            {
                case 'tracks':
                    parcoursTableauDObjets(divPropertyConf, contenuProp);
                    break;
                case 'controls':
                    parcoursTableauDObjets(divPropertyConf, contenuProp);
                    break;
                default:
                    creationNoeudEtAjout("input", {type: "text"}, divPropertyConf, "decalageAbsolu", null, contenuProp);
                    break;
            }
        });
    }

    /*
    var gestionPatterns = function (divProperty, patterns)
    {
        parcourirTableau(patterns, function (pattern)
        {
            var divPattern = creationNoeudEtAjout("div", null, divProperty, "decalageRelatif", null, null);
            gestionPropertiesPattern(divPattern, pattern);
        });
    }

    var gestionPropertiesPattern= function(divPattern, pattern)
    {
        parcourirObjet(pattern, function (nomProp, contenuProp)
        {
            var divPropertyPattern = creationNoeudEtAjout("text", null, divPattern, null, nomProp, null);
            creationNoeudEtAjout("input", {type: "text"}, divPropertyPattern, "decalageAbsolu", null, contenuProp);
        });
    }
    */

    //fonction parcourant un tableau qui contient des objets sans profondeur (pas de tableaux à l'intérieur de l'objet)
    var parcoursTableauDObjets = function (div, tabObjets)
    {
        parcourirTableau(tabObjets, function (objet)
        {
            var divObjet = creationNoeudEtAjout("div", null, div, "decalageRelatif", null, null);

            parcourirObjet(objet, function (nomProp, contenuProp)
            {
                var divProperty = creationNoeudEtAjout("div", null, divObjet, null, nomProp, null);
                creationNoeudEtAjout("input", {type: "text"}, divProperty, "decalageAbsolu", null, contenuProp);
            });
        });
    }

    //fonction parcourant un tableau et appliquant une fonction à chaque élement
    var parcourirTableau = function(tableauAParcourir, fonctionAAppliquerAuxElementsDuTableau)
    {
        for (var i = 0; i < tableauAParcourir.length; i++)
            fonctionAAppliquerAuxElementsDuTableau(tableauAParcourir[i]);
    }

    //fonction parcourant un objet et appliquant une fonction à chaque element de l'objet
    var parcourirObjet = function (objet, fonctionAAppliquerALaPropriete)
    {
        for (var prop in objet)
            fonctionAAppliquerALaPropriete(prop, objet[prop]);
    }

    //fonction creant un nouveau noeud, ses paramètres, lui appliquant une classe, une valeur, donnant son contenu texte et l'inserant sous le bon tag
    var creationNoeudEtAjout = function (nomTag, parametres, tagParent, classe, texte, valeur)
    {
        if (parametres !== null)
            var tag = document.createElement(nomTag, parametres);
        else
            var tag = document.createElement(nomTag);
        
        if(classe !== null)
            tag.className = classe;

        if (texte !== null)
            tag.textContent = texte;
        
        if (valeur !== null)
            tag.value = valeur;
        
        tagParent.appendChild(tag);

        return tag;
    }

    //on lance la fonction au chargement du fichier JS
    detectionInsConf();

    //on ajoute l'action au form pour le chargement de la conf
    document.getElementById("buttonChargementInsConf").addEventListener("click", chargementInsConf);
}())
