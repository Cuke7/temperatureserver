#!/bin/bash

# Récupération de la température ; on obtient ici une valeur à 5 chiffres sans virgules (ex: 44123) :
TEMP=$(cat /sys/class/thermal/thermal_zone0/temp)

# On divise alors la valeur obtenue par 1000, pour obtenir un résultat avec deux chiffres seulement (ex: 44) :
TEMP=$(($TEMP/1000))


# Récupération de la date et l'heure du jour sous un autre format ; on obtient ici un résultat sous la forme suivante : XX-YY-ZZZZ (ex: 31-12-2014) :
DATE=`date +"%d/%m/%Y,%H:%M"`

# Le fichier à créer dans ce répertoire est "temperature.html"
FICHIER="/temperature.html"

# Si le fichier temperature.html n'existe pas, on le crée et on y injecte le code html minimum
if [ ! -f "$FICHIER" ];then
  touch "$FICHIER" &&
  echo "" > "$FICHIER"
fi


echo "${DATE},${TEMP}" >> "$FICHIER"


exit