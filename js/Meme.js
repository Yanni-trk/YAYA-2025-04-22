class Meme {
    id = undefined;
    titre = '';
    text = '';
    x = 100;
    y = 20;
    fontWeight = '500';
    fontSize = 100;
    underline = false; 
    italic = false; 
    imageId = -1;
    color = '#00000';

    save(){
        const adr=`${RES_ADR}/images${undefined!==this.id?`/`+this.id:''}`;
        fetch(adr,{
            method:'POST',
            header: {"Content-Type" : "application/json"},
            body:JSON.stringify(this)

        })
       

    }
}