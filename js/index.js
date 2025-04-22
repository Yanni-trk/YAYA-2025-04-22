
function loadJs() {
    var jsLoaded = document.querySelector('#js-loaded');
    jsLoaded.innerHTML = "JS OK";
    jsLoaded.style.backgroundColor = "cornflowerblue";
}
loadJs();

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

  