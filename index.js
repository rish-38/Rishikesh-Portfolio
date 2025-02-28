// Optimized Blotter.js for better mobile and lower-end device support
function createBlotter() {
    if (!window.Blotter) {
        // If Blotter.js fails to load or isn't supported
        displayFallbackText();
        return;
    }

    let vw = window.innerWidth;
    let textSize = vw > 1200 ? 320 : vw > 768 ? 180 : 70;
    let padding = vw > 1200 ? 60 : vw > 768 ? 30 : 15;

    var text = new Blotter.Text("Rish.", {
        family: "'Poppins', serif",
        size: textSize,
        weight: 900,
        paddingLeft: padding,
        paddingRight: padding,
        fill: "#4B73D3"
    });

    var material = new Blotter.LiquidDistortMaterial();
    material.uniforms.uSpeed.value = .15; // Slightly reduced for performance
    material.uniforms.uVolatility.value = .08; // Lower volatility for better stability
    material.uniforms.uSeed.value = 0.8;

    let blotter = new Blotter(material, { texts: text });
    let scope = blotter.forText(text);

    let elem = document.getElementById("showcase");
    if (elem) {
        elem.innerHTML = "";
        scope.appendTo(elem);
    }
}

// Fallback function to display the text when Blotter.js isn't working
function displayFallbackText() {
    let elem = document.getElementById("showcase");
    if (elem) {
        elem.innerHTML = '<h1 style="font-family: \'Poppins\', serif; font-size: 70px; font-weight: 900; color: #4B73D3; padding-left: 15px; padding-right: 15px;">Rish.</h1>';
    }
}

// Throttle resize event for performance
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createBlotter, 200);
});

// Initialize on load
createBlotter();

// Tabs functionality
const tabs = document.querySelectorAll('.tabs');
const all_content = document.querySelectorAll('.all_content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');
        all_content.forEach(content => content.classList.remove('active'));
        all_content[index].classList.add('active');
    });
});

// Profile image effect
const blocks = document.querySelectorAll(".block");
const resetDuration = 300;

blocks.forEach(block => {
    let timeOutId;
    block.addEventListener("mouseover", () => {
        clearTimeout(timeOutId);
        block.classList.add("active");
        timeOutId = setTimeout(() => {
            block.classList.remove("active");
        }, resetDuration);
    });
});

// WhatsApp message send functionality
document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById("w-send");
    const inputField = document.getElementById("w-input");
    const phoneNumber = "9136294212";

    function sendMessage() {
        const message = encodeURIComponent(inputField.value);
        if (message.trim() !== "") {
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappURL, "_blank");
        } else {
            alert("Please enter a message before sending.");
        }
    }

    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});