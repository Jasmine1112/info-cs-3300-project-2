import json
import csv
import re
from collections import defaultdict

# capital_coord_data = json.load(open('world-topo.json'))

file_list = ["ausTags.csv","brazilTags.csv","canTags.csv","chinaTags.csv","franceTags.csv","gerTags.csv","polTags.csv","russiaTags.csv","ukTags.csv","usTags.csv"]
country_data = {}
for file_name in file_list:
	with open('newCountryData/'+file_name) as f:
		country_data[file_name.replace("Tags.csv","")] = [{key: value for key, value in row.items()} for row in csv.DictReader(f)]


def country_count_tag(country_data_input):
	output_dict = {country:defaultdict(int) for country in country_data_input}
	
	for country,c_data in country_data_input.iteritems():
		for game_row in c_data:
			game_tag = game_row["Tag"]
			for tag in game_tag.split(','):
				output_dict[country][tag]+=1

	return output_dict



def clean_data(country_count_tag_dict_input, country_data_input):
	# output_dict = {country: {"data":data,"top3_tag":[]} for country,data in country_data_input.iteritems()}
	output_dict2 = {country:{} for country,data in country_data_input.iteritems()}
	for country,tag_counts_dict in country_count_tag_dict_input.iteritems():
		tag_counts_lst = tag_counts_dict.items()
		tag_counts_lst.sort(key=lambda x: -x[1])
		country_top_3_tag_tup = tag_counts_lst[:3]

		country_top_3_tag = [tag for tag,count in country_top_3_tag_tup]
	
		# output_dict[country]["top3_tag"] = ",".join(country_top_3_tag)

		output_dict2[country] = country_top_3_tag

	return output_dict2




if __name__ == "__main__":
	country_count_tag_data = country_count_tag(country_data)
	new_country_tag_data = clean_data(country_count_tag_data,country_data)
	# new_file_list = ["ausTags_top3.csv","brazilTags_top3.csv","canTags_top3.csv","chinaTags_top3.csv","franceTags_top3.csv","gerTags_top3.csv","polTags_top3.csv","russiaTags_top3.csv","ukTags_top3.csv","usTags_top3.csv"]
	# fieldnames = ['#','Game','Players_2_weeks','Hours_2_weeks','Players_total','Hours_total','Share','Tag','top3_tag']

	# for file_name in new_file_list:
	# 	with open('Country_Top3_Tag_Data/'+file_name, 'w') as csvfile:
			
	# 		writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
	# 		writer.writeheader()

	# 		file_country = file_name.replace("Tags_top3.csv","")

	# 		new_data = new_country_tag_data[file_country]['data']
	# 		country_top3 = new_country_tag_data[file_country]['top3_tag']
	# 		for i in range(len(new_data)):
	# 			game_row = new_data[i]
	# 			game_row['top3_tag'] = country_top3
	# 			new_data[i] = game_row
	# 		for game in new_data:
	# 			writer.writerow(game)

	with open('country_top3_tags.json','w') as fp:
		json.dump(new_country_tag_data,fp)











