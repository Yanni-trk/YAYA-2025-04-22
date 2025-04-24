function loadJs(evt) {

    console.log(evt);
    const jsLoaded = document.querySelector('#js-loaded');
    jsLoaded.innerHTML = "JS OK";
    jsLoaded.style.backgroundColor = "cornflowerblue";
    jsLoaded.style.color ="tomato";
    jsLoaded.remove();
    //loadEditorView();

}

  


//loadHomeView ()
function loadHomeView () {
  fetch("/vues/home.html")
  .then(r=>r.text())
  .then((h) => {
    document.querySelector("main").innerHTML += h;
  
  });
  
  }

//loadEditorView ()
function loadEditorView () {
fetch("/vues/editor.html")
.then(r=>r.text())
.then((h) => {
  document.querySelector("main").innerHTML += h;
  loadEditor();

});

}
document.addEventListener('DOMContentLoaded',loadJs);


function onSubmit() {
    const div = document.createElement('div');

    div.className = 'auto-alert';
    div.textContent = "Validé";
    document.body.appendChild(div);

    setTimeout(() => {
      div.style.opacity = '0';
      div.remove();
    }, 2000);
  }

  