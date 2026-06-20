const typingText =
document.getElementById("typing-text");

const words = [
    "Web Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Informatics Students"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord =
    words[wordIndex];

    if (!deleting) {

        typingText.textContent =
        currentWord.substring(
            0,
            charIndex + 1
        );

        charIndex++;

        if (
            charIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingText.textContent =
        currentWord.substring(
            0,
            charIndex - 1
        );

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >= words.length
            ) {

                wordIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        typeEffect();

        const cursor =
        document.createElement("span");

        cursor.innerHTML = "|";

        cursor.classList.add(
            "typing-cursor"
        );

        typingText.after(cursor);

        setInterval(() => {

            cursor.style.opacity =
                cursor.style.opacity === "0"
                    ? "1"
                    : "0";

        }, 500);
    }
);