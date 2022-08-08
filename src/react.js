window.addEventListener('touchstart', function(event) {
    // some logic
    event.preventDefault(); // <-- that should not be used in passive
    // some other magic
});