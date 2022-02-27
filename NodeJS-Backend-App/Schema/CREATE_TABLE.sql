CREATE TABLE UserAccount (
    ID SERIAL PRIMARY KEY,
    User_Name varchar(255),
    Pass_Word varchar(255),
    Email varchar(255),
    Phone varchar(10),
	birth_date date
);

CREATE TABLE Follow (
    ID SERIAL PRIMARY KEY,
    Following_User_ID int NOT NULL,
	UserAccount_ID int NOT NULL,
	FOREIGN KEY (Following_User_ID) REFERENCES UserAccount(ID),
	FOREIGN KEY (UserAccount_ID) REFERENCES UserAccount(ID)
);

CREATE TABLE MessageChat (
    ID SERIAL PRIMARY KEY,
	ContentText text,
	Add_Date date,
    From_User_ID int NOT NULL,
	UserAccount_ID int NOT NULL,
	FOREIGN KEY (From_User_ID) REFERENCES UserAccount(ID),
	FOREIGN KEY (UserAccount_ID) REFERENCES UserAccount(ID)
);

CREATE TABLE FoodMenu (
    ID SERIAL PRIMARY KEY,
	Food_Name varchar(255),
	Food_Detail text,
	Add_Date date,
	UserAccount_ID int NOT NULL,
	FOREIGN KEY (UserAccount_ID) REFERENCES UserAccount(ID)
);

CREATE TABLE ImageFood (
    ID SERIAL PRIMARY KEY,
	Food_Img varchar(255),
	FoodMenu_ID int NOT NULL,
	UserAccount_ID int NOT NULL,
	FOREIGN KEY (FoodMenu_ID) REFERENCES FoodMenu(ID),
	FOREIGN KEY (UserAccount_ID) REFERENCES UserAccount(ID)
);

CREATE TABLE ReviewFood (
    ID SERIAL PRIMARY KEY,
	Review_Detail Text,
	Rating float,
	Review_Date date,
	FoodMenu_ID int NOT NULL,
	UserAccount_ID int NOT NULL,
	FOREIGN KEY (FoodMenu_ID) REFERENCES FoodMenu(ID),
	FOREIGN KEY (UserAccount_ID) REFERENCES UserAccount(ID)
);

CREATE TABLE ShareFood (
    ID SERIAL PRIMARY KEY,
	Share_Date date,
	FoodMenu_ID int NOT NULL,
	UserAccount_ID int NOT NULL,
	FOREIGN KEY (FoodMenu_ID) REFERENCES FoodMenu(ID),
	FOREIGN KEY (UserAccount_ID) REFERENCES UserAccount(ID)
);