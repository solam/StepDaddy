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

        //gestionCanaux(divInsConf, insConf);
        boucleParsing(insConf, divInsConf);

        gestionCouleur(divInsConf, 0);
        gestionPosition(divInsConf);
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

    //fonction récursive parcourant successivement tout le contenu de la config, et prenant en compte 3 cas : c'est un tableau, c'est un objet, c'est un element tout seul
    var boucleParsing = function (element, div)
    {
        if (Array.isArray(element)) //cas 1 : tableau
        {
            parcourirTableau(element, function (objet)
            {
                var divObjet = creationNoeudEtAjout("div", null, div, "elementTableau", null, null);

                boucleParsing(objet, divObjet);
            });
        }
        else
        {
            if (typeof element === "object" && !(element instanceof Array)) //cas 2 : objet
            {
                parcourirObjet(element, function (nomProp, contenuProp)
                {
                    var divProperty = creationNoeudEtAjout("div", null, div, "proprieteObjet", nomProp, null);

                    boucleParsing(contenuProp, divProperty);
                });
            }
            else
            {
                creationNoeudEtAjout("input", {type: "text"}, div, "decalageAbsolu", null, element);
            }
        }
    }

    var gestionCouleur = function (div, niveau)
    {
        for (var i = 0; i < div.childNodes.length; i++)
        {
            if (div.childNodes[i].nodeName == "DIV") //en gros, tant qu'on manipule un div
            {
                div.childNodes[i].style.backgroundColor = 'rgb(' + (100 + niveau * 20).toString() + "," + (200 + niveau * 20).toString() + "," + (niveau * 20).toString() + ")";
                gestionCouleur(div.childNodes[i], niveau + 1);
            }
        }
    }

    //fonction gérant la position des blocs en fonction de leurs fonctions
    var gestionPosition = function (div)
    {
        for (var i = 0; i < div.childNodes.length; i++)
        {
            if (div.childNodes[i].nodeName == "DIV") //en gros, tant qu'on manipule un div
            {
                if (div.className.includes("proprieteObjet") && (div.childNodes[i].className.includes("elementTableau") || div.childNodes[i].className.includes("proprieteObjet")))
                {
                    div.childNodes[i].className += " decalageRelatif";
                }

                gestionPosition(div.childNodes[i]);
            }
        }
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
