var isInSwappablePreview = false;
var isPortraitMode = false;
if (window.innerWidth < window.innerHeight) {
	isPortraitMode = true;
}

function fadeIn(fadeObj) {
	fadeObj.style.opacity = 0;
	function fadeStep() {
		fadeObj.style.opacity = 0.05 + +fadeObj.style.opacity;
		if (fadeObj.style.opacity < 1) {
			(window.requestAnimationFrame(fadeStep));
		}
	};
	fadeStep();
}

// Add onclick listeners to all the reward rows on the page
for (var i = 0; i < document.getElementsByClassName("reward-row").length; i++) {

	var rewardRows = document.getElementsByClassName("reward-row");
	var rewardRow = rewardRows[i];

	function showRewardPreviewImage() {

		isInSwappablePreview = true;
		var container = document.getElementById("reward-preview-container");
		var rewardImage = document.getElementById("canvas");

		var rewardId = this.getAttribute("data-reward-id");
		rewardImage.setAttribute("data-reward-id", rewardId);

		if (window.innerWidth >= window.innerHeight) {
			rewardImage.src = "images/crate rewards/panels/" + rewardId + ".jpg";
			rewardImage.setAttribute("style", "border: 1px solid;");
		} else {
			rewardImage.src = "images/crate rewards/cards/" + rewardId + ".png";
			// border: none; already by default
		}
		rewardImage.alt = this.getAttribute("data-img-alt");
		container.setAttribute("style", "display: inline-block;");
		fadeIn(container);
	}
	rewardRow.onclick = showRewardPreviewImage;
}

// Add onclick listeners to all the generic previews
for (var i = 0; i < document.getElementsByClassName("generic-preview").length; i++) {

	var genericRows = document.getElementsByClassName("generic-preview");
	var genericRow = genericRows[i];

	function showGenericPreviewImage() {
		var container = document.getElementById("reward-preview-container");
		var genericPreviewImage = document.getElementById("generic-canvas");

		genericPreviewImage.src = this.getAttribute("data-img-src");
		genericPreviewImage.alt = this.getAttribute("data-img-alt");

		container.setAttribute("style", "display: inline-block;");
		fadeIn(container);
	}
	genericRow.onclick = showGenericPreviewImage;
}

// Swap the image from a panel to a card if we enter portrait mode
function swapPanelAndCard() {
	if (!isInSwappablePreview) {
		return;
	}

	if (isPortraitMode && window.innerWidth >= window.innerHeight) {
		isPortraitMode = false;
		var rewardImage = document.getElementById("canvas");
		rewardImage.src = "images/crate rewards/panels/" + rewardImage.getAttribute("data-reward-id") + ".jpg";
		rewardImage.setAttribute("style", "border: 1px solid;");
		fadeIn(rewardImage);

	} else if (!isPortraitMode && window.innerWidth < window.innerHeight) {
		isPortraitMode = true;
		var rewardImage = document.getElementById("canvas");
		rewardImage.src = "images/crate rewards/cards/" + rewardImage.getAttribute("data-reward-id") + ".png";
		rewardImage.removeAttribute("style");
		fadeIn(rewardImage);
	}
}
window.onresize = swapPanelAndCard;

// Hide the image preview if we click anywhere in the container
function hidePreview() {
	isInSwappablePreview = false;
	var container = document.getElementById("reward-preview-container");
	var rewardImage = document.getElementById("canvas");
	var genericPreviewImage = document.getElementById("generic-canvas");

	container.removeAttribute("style");

	if (rewardImage != null) {
		rewardImage.src = "images/misc/loading.png";
		rewardImage.alt = "Loading...";
		rewardImage.removeAttribute("style");
		rewardImage.removeAttribute("data-reward-id");
	}

	if (genericPreviewImage != null) {
		genericPreviewImage.src = "images/misc/loading.png";
		genericPreviewImage.alt = "Loading...";
		genericPreviewImage.removeAttribute("style");
		genericPreviewImage.removeAttribute("data-reward-id");
	}
}
document.getElementById("reward-preview-container").onclick = hidePreview;