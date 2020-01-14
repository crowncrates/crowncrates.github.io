// Set the bg to the appropriate position in case of refresh
scroll();

// Apply slow background scroll listener
function scroll() {
	document.body.setAttribute("style", "background-position: 0px " + (document.documentElement.scrollTop / -4) + "px;");
}
window.onscroll = scroll;

// Different footer if page isn't long enough
if (document.body.scrollHeight > window.innerHeight) {
	document.getElementById("footer").removeAttribute("class");
	document.getElementById("footer-content").setAttribute("class", "wrapper");
} else {
	document.getElementById("footer").setAttribute("class", "wrapper");
	document.getElementById("footer-content").removeAttribute("class");
}