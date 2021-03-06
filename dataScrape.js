var ausTags, brazilTags, canTags,chinaTags, franceTags, gerTags, polTags, russiaTags, ukTags, usTags;
var atmosNames, craftNames, experimentNames, femaleNames, kickNames, openNames, remakeNames, stealthNames, warhammerNames, zombiesNames, shooterNames, fantasyNames, goreNames, scifiNames, animeNames, medievalNames,cityNames,fightNames,vrNames,mobaNames,softwareNames,sportsNames,diplNames,strategyNames;
atmosNames = craftNames = experimentNames = femaleNames = kickNames = openNames = remakeNames = stealthNames = warhammerNames = zombiesNames = shooterNames = fantasyNames= goreNames = scifiNames = animeNames = medievalNames = cityNames= fightNames = vrNames = mobaNames = softwareNames = sportsNames = diplNames = strategyNames = [];
var allNames;
var tagNames = ["Atmospheric", "Crafting","Experimental","Female Protagonist","Kickstarter","Open World","Remake","Stealth","Warhammer 40K","Zombies","Shooter","Fantasy","Gore","Sci-fi", "Anime","Medieval","City Builder","Fighting","VR","MOBA","Software","Sports","Diplomacy","Strategy"];
//load all tag csv's
d3.queue()
.defer(d3.csv, "tag/Atmospheric.csv")
.defer(d3.csv, "tag/Crafting.csv")
.defer(d3.csv, "tag/Experimental.csv")
.defer(d3.csv, "tag/FemaleProtagonist.csv")
.defer(d3.csv, "tag/Kickstarter.csv")
.defer(d3.csv, "tag/OpenWorld.csv")
.defer(d3.csv, "tag/Remake.csv")
.defer(d3.csv, "tag/Stealth.csv")
.defer(d3.csv, "tag/Warhammer40K.csv")
.defer(d3.csv, "tag/Zombies.csv")
.defer(d3.csv, "tag/Shooter.csv")
.defer(d3.csv, "tag/Fantasy.csv")
.defer(d3.csv, "tag/Gore.csv")
.defer(d3.csv, "tag/Sci-fi.csv")
.defer(d3.csv, "tag/Anime.csv")
.defer(d3.csv, "tag/Medieval.csv")
.defer(d3.csv, "tag/CityBuilder.csv")
.defer(d3.csv, "tag/Fighting.csv")
.defer(d3.csv, "tag/VR.csv")
.defer(d3.csv, "tag/MOBA.csv")
.defer(d3.csv, "tag/Software.csv")
.defer(d3.csv, "tag/Sports.csv")
.defer(d3.csv, "tag/Diplomacy.csv")
.defer(d3.csv, "tag/Strategy.csv")
.await(callback);
//add all relevant tags to games for each country
function callback(error, atmos, craft ,experiment, female, kick, open, remake, stealth, warhammer, zombies, shooter, fantasy, gore, scifi, anime, med, city, fight, vr, moba, soft, sports, dip, strat) {
    if (error) {
        console.log(error);
    }
    else{
    	//only retrieve/save col with game names from tag csv's
    	atmosNames = atmos.map(function(d) { return d.Game });
    	craftNames = craft.map(function(d) { return d.Game });
    	experimentNames = experiment.map(function(d) { return d.Game });
    	femaleNames = female.map(function(d) { return d.Game });
    	kickNames = kick.map(function(d) { return d.Game });
    	openNames = open.map(function(d) { return d.Game });
    	remakeNames = remake.map(function(d) { return d.Game });
    	stealthNames = stealth.map(function(d) { return d.Game });
    	warhammerNames = warhammer.map(function(d) { return d.Game });
    	zombiesNames = zombies.map(function(d) { return d.Game });
    	shooterNames = shooter.map(function(d) { return d.Game });
    	fantasyNames = fantasy.map(function(d) { return d.Game });
    	goreNames = gore.map(function(d) { return d.Game });
    	scifiNames = scifi.map(function(d) { return d.Game });
    	animeNames = anime.map(function(d) { return d.Game });
    	medievalNames = med.map(function(d) { return d.Game });
    	cityNames = city.map(function(d) { return d.Game });
    	fightNames = fight.map(function(d) { return d.Game });
    	vrNames = vr.map(function(d) { return d.Game });
    	mobaNames = moba.map(function(d) { return d.Game });
    	softwareNames = soft.map(function(d) { return d.Game });
    	sportsNames = sports.map(function(d) { return d.Game });
    	diplNames = dip.map(function(d) { return d.Game });
    	strategyNames = strat.map(function(d) { return d.Game });
    	
    	allNames = [atmosNames, craftNames, experimentNames, femaleNames, kickNames, openNames, remakeNames, stealthNames, warhammerNames, zombiesNames,shooterNames, fantasyNames, goreNames, scifiNames,animeNames, medievalNames,cityNames,fightNames,vrNames,mobaNames,softwareNames,sportsNames,diplNames,strategyNames];
    	//call mutateRow for all country csv's, then save strucut's w/ added Tag column
    	d3.queue()
   		.defer(d3.csv, "country/Australia.csv", mutateRow)
    	.defer(d3.csv,"country/Brazil.csv", mutateRow)
    	.defer(d3.csv,"country/Canada.csv", mutateRow)
    	.defer(d3.csv,"country/China.csv", mutateRow)
    	.defer(d3.csv,"country/France.csv", mutateRow)
    	.defer(d3.csv,"country/Germany.csv", mutateRow)
    	.defer(d3.csv,"country/Poland.csv", mutateRow)
    	.defer(d3.csv,"country/Russia.csv", mutateRow)
    	.defer(d3.csv,"country/UnitedKingdom.csv", mutateRow)
    	.defer(d3.csv,"country/UnitedStates.csv", mutateRow)
    	.await(callbackTags);
    	
    }
}
//add tag column to each game per country, tag = string of tags/genres
function mutateRow(row) {
	var string = "";
	var count = 0;
	//only add tag to string if that tag's names includes the game
	for(i =0; i< allNames.length; i++){
		if(allNames[i].includes(row["Game"])){
			
			if(count > 0){
				string = string+","+tagNames[i];
			}
			else{
				string = string+tagNames[i];
			}
			count++;
		}
	}
	row["Tag"] = string;
	/*if(string == ""){
		console.log(row["Game"])
	}*/
	return row;
 
}
//convert all data to csv format, with added tag column and download (so this script only has to be run once)
function callbackTags(error,aus,brazil, can, china, france, ger, pol, russia, uk ,us){
	ausTags = aus;
	brazilTags = brazil;
	canTags = can;
	chinaTags = china;
	franceTags = france;
	gerTags = ger;
	polTags = pol;
	russiaTags = russia;
	ukTags = uk;
	usTags = us;
	var allTags = [ausTags, brazilTags, canTags,chinaTags, franceTags, gerTags, polTags, russiaTags, ukTags, usTags];
	//console.log(allTags[0])
	var fileNames = ["ausTags.csv", "brazilTags.csv", "canTags.csv","chinaTags.csv", "franceTags.csv", "gerTags.csv", "polTags.csv", "russiaTags.csv", "ukTags.csv", "usTags.csv"]
	//download all the upadted csv's for each country
	for(i = 0; i < fileNames.length; i++){
		var hiddenElement = document.createElement('a');
	        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(d3.csvFormat(allTags[i]));
	        hiddenElement.target = '_blank';
	        hiddenElement.download = fileNames[i];
	        hiddenElement.click();
    }
	
}