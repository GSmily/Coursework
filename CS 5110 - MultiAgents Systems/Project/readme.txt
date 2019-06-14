Gavin Browning
A01887359

I saved all the data I collected in the Data folder

Objective of the code:
	To simulate urban environments with a variety of electric vehicles and charging stations using pygame and to maximize
	revenue of the charging stations using 4 different methodologies:

	(1) static pricing
	(2) dynamic close pricing
	(3) dynamic cheap pricing
	(4) dynamic close and cheap pricing

How to run the code:
	In function run_game(), change the variable city_scape to be 1 or 2 depending on what city scap you wish to simulate
	Change the method_used variable to be "Static", "Dynamic_Close", "Dynamic_Cheap", or "Dynamic_Close_Cheap" depending on what method you wish to use
	Change time in the for _ in range(FPS * time) loop to be how long you wish the program to run (in seconds)
	A plot is shown at the end of the program showing the Charger Revenue per frame
	If you wish to save the plots produced you can uncomment plt.savefig and plt.close()

	View the output to see:
	City scape #
	Method used
	Charger 1's (Red) Total Revenue
	Charger 2's (Purple) Total Revenue
	Charger 3's (Green) Total Revenue
	Total Revenue

	When ready run main down at the bottom of the program