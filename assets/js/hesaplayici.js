 let gelirGiderForm = document.querySelector('.form-group');
 let temizleButton = document.querySelector('.temizle');

 let gelirListesi = document.querySelector('.gelirListesi');
 let giderListesi = document.querySelector('.giderListesi');
 let sonucListesi = document.querySelector('.sonucListesi');

 let girilenDegerler = [];

//  EĞER LOCALSTORAGE İÇİNDE KAYITLI BİR VERİ VARSA SAYFAYA YAZDIRIR
 if(typeof localStorage.girilenDegerler !== 'undefined') {
    girilenDegerler = JSON.parse(localStorage.girilenDegerler);
    render();
}

 function handleSubmitForm(e) {
    e.preventDefault();
    
    let formdata = new FormData(gelirGiderForm);
    let formobj = Object.fromEntries(formdata);
    if(formobj.gelir === '') {
        formobj.gelir = 0;
    }
    if(formobj.gider === '') {
        formobj.gider = 0;
    }
    girilenDegerler.push(formobj);
    
    gelirGiderForm.reset();
    console.log(girilenDegerler);

    save();
    render();
}

gelirGiderForm.addEventListener('submit', handleSubmitForm);

// LOCALSTORAGE İÇİNE KAYDETME
function save() {
    localStorage.girilenDegerler = JSON.stringify(girilenDegerler);
}

// GELİRLERİ HTML TARAFINDA YAZDIRMA
function render() {
    let gelirToplam = 0;
    let giderToplam = 0;

    gelirListesi.innerHTML = ''
    for(let i = 0; i < girilenDegerler.length; i++) {
        gelirToplam += parseInt(girilenDegerler[i].gelir);
        gelirListesi.innerHTML += `<li>${girilenDegerler[i].gelirName} : ${girilenDegerler[i].gelir} </li> `
    }
    
    giderListesi.innerHTML = ''
    for(let i = 0; i < girilenDegerler.length; i++) {
        giderToplam += parseInt(girilenDegerler[i].gider);
        giderListesi.innerHTML += `<li>${girilenDegerler[i].giderName} : ${girilenDegerler[i].gider} </li> `
    }

    
    let sonuc = (gelirToplam - giderToplam);
    sonucListesi.innerHTML = `<li> ${sonuc} </li> `
    


    console.log(gelirToplam);
    console.log(giderToplam);
}
// LİSTEYİ SIFIRLAMAK İÇİN GEREKEN KOD
function reset() {
    localStorage.clear();

    girilenDegerler = [];
    render();
}
temizleButton.addEventListener('click', reset);