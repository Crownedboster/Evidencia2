create database SistemaTickets;

use SistemaTickets;

create table Categorias(
cateID int not null auto_increment,
cateNombre varchar(50) not null,
primary key(cateID)
);

create table Personal(
personaID int not null auto_increment,
personaNom varchar(50) not null,
personaApe varchar(80) not null,
personaTel varchar(10) null,
personaDir varchar(150) null,
primary key(personaID)
);

create table Tickets(
ticketID int not null auto_increment,
ticketNom varchar(50) not null,
ticketDescrip varchar(100) null,
ticketPrioridad varchar(1) not null,
personaID int not null,
cateID int not null,
foreign key (personaID) references Personal(personaID),
foreign key (cateID) references Categorias(cateID),
ticketEsta varchar(3) not null,
primary key(ticketID)
);