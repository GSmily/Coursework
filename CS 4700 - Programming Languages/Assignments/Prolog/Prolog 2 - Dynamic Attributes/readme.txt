Gavin Browning
A01887359
Prolog 2 - Dynamic Attributes

The only function I don't have checked (that should be) is transfer.
In the current state you can transfer any disk to any pylon without 
following the rules for Towers of Hanoi.

Checked Commands:
look(Location). 	 Can only look at player location.
study(Object).		 Can only study at player location.
inventory.		 Looks at player's inventory.
move(Room).		 Can only move to connected rooms.
take(Item).		 Can only take items in player location.
put(Item).		 Puts item in players current location.

Unchecked Commands:
u_look(Location). 	 Looks at any location.
u_study(Object).	 Study any location.
u_move(Room).		 Moves player to any room.
u_take(Item).		 Takes item from any location.
u_put(Item, Location).	 Puts item from inventory to any location.
transfer(Disk, pylon_a). Moves Disk to pylon_a.
transfer(Disk, pylon_b). Moves Disk to pylon_b.
transfer(Disk, pylon_c). Moves Disk to pylon_c.