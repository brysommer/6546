const db = 

{  bio: {
    name: '22',
    surname: 'Dudar'
    }
}

function validation () {
    if(typeof(db.bio.name) == 'string') {
    console.log('string');
    } else {
        console.log('number')
    }
}
validation();   


