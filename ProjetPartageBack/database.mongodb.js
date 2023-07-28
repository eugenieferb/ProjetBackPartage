use('Partage');

db.users.insertMany([

            {name:'Ruby',
            role:'roleUser',
            address:'Paris'},

            {name:'Sombra',
            role:'roleUser',
            address:'Hong-kong'},

            {name:'Tracer',
            role:'roleUser',
            address:'New-York'},

            {name:'Genji',
            role:'roleUser',
            address:'Los Angeles'}

        ]);

db.annonces.insertMany([

    {name:'Voiture de location',
        description:'Belle voiture Zoe 100% ecolo',
        status:'En cours',
        type:'voiture',
        owner: {
            name:'Sombra',
            address:'Hong-Kong',
        }
    },

    {name:'Chat de location',
    description:'Ouginak',
    status:'Emprunté',
    type:'chat',
    owner: {
        name:'Ruby',
        address:'Paris',
    }
},
    {name:'DVD harry potter',
    description:'DVD harry potter all saga',
    status:'Emprunté',
    type:'dvd',
    owner: {
        name:'Genji',
        address:'Los Angeles',
        }
    },

    ]);

db.emprunts.insertMany([

    {message:'Je suis intéressée par votre annonce',
        duree:'2mois',
    },
 
    {message:'Je souhaiterai en savoir plus',
        duree:'2semaines',
    },
    ]);