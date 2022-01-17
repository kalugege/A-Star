function removeN(niz, n) {
    for (let i = niz.length - 1; i >= 0; i--) {
        if (niz[i] == n){
            niz.splice(i, 1)
        }
    }
}
function heuristika(a,b)
{
    let daljina = abs(a.i-b.i)+abs(a.j-b.j);
    return daljina;
}
const kol = 25;
const red = 25;
const grid = new Array();
let open = [];
let closed = [];
let pocetak;
let kraj;
let sirina;
let visina;
let put=[];


class Tacka {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 999999999999999;
        this.h = 0;
        this.komse = [];
        this.prethodni;
        this.prepreka=false;
        if(random(1)<0.3)
        this.prepreka=true;
        this.show = function (boja) {
            fill(boja);
            if(this.prepreka)
            fill(0);
            stroke(1);
            rect(this.i * sirina, this.j * visina, sirina, visina);
        };
        this.dodaj = function(grid) {
            let i = this.i;
            let j = this.j;
                 if (i < kol - 1)
                this.komse.push(grid[i + 1][j]);
            if (i > 0)
                this.komse.push(grid[i - 1][j]);
            if (j < red - 1)
                this.komse.push(grid[i][j + 1]);
            if (j > 0)
               this.komse.push(grid[i][j - 1]);
               
            };
    }
}


function setup() {
    createCanvas(400, 400);
    sirina = width / kol;
    visina = height / red;

    // console.log(red, typeof red)
    // console.log(width, height, red, kol, sirina, visina);
    for (let i = 0; i < kol; i++) {
        grid[i] = [red];

    }
    for (let i = 0; i < kol; i++) {
        for (let j = 0; j < red; j++) {
            grid[i][j] = new Tacka(i, j);

        }
    }
    for (let i = 0; i < kol; i++) {
        for (let j = 0; j < red; j++) {
            grid[i][j].dodaj(grid);

        }
    }
    pocetak = grid[0][0];
    kraj = grid[kol - 1][red - 1];
    pocetak.prepreka= false;
    kraj.prepreka=false;
    open.push(pocetak);

}

function draw() {
  
      
      if (open.length > 0) {
        
        let flag = 0;
        for (let i = 0; i < open.length; i++) {
            if (open[i].f < open[flag].f)
                flag = i;
                
        }
          var current = open[flag];
            
        if (current === kraj)
        {   
            
            noLoop();
            console.log("resi");
        }
        
        removeN(open,current);
        closed.push(current);
        
     
        let k = current.komse;
        for (let i = 0; i < k.length; i++) {
              let tmp = k[i];
            if (!closed.includes(tmp) && !tmp.prepreka) {
                let tmpG = current.g + 1;
                if (open.includes(tmp)) {
                    if (tmpG < tmp.g)
                        tmp.g = tmpG;
                }else{
                    tmp.g = tmpG;
                    open.push(tmp);
                }
                tmp.h = heuristika(tmp,kraj);
                tmp.f = tmp.g + tmp.h;
                tmp.prethodni = current;
            }
        }
    } else {
        console.log("nema resenja");
        var nema=true;
        noLoop();
    }
    for (let i = 0; i < kol; i++) {
        for (let j = 0; j < red; j++) {
            grid[i][j].show(color(255));
        }
    }
    for(let i=0;i<open.length;i++)
    {
        open[i].show(color(0,255,0));
    }
    for(let i=0;i<closed.length;i++)
    {
        closed[i].show(color(255,0,0));
    }
    if(!nema){
             put =[];
            let i = current;
            put.push(i);
            while(i.prethodni)
            {
                put.push(i.prethodni);
                i = i.prethodni;
            }    
        }
    for(let i=0;i<put.length;i++)
    {
        put[i].show(color(0,0,255));
    }

    
}