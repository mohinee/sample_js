window.onload = () => {
    let button = document.getElementById('say-hi');
    button.addEventListener("click", (e) => {
        let name = document.getElementById('name').value;
        name = name[0].toUpperCase() + name.slice(1);
        document.getElementById('sample-text').textContent = "Hello new friend, " + name + ". I am your browser.";
    });
}