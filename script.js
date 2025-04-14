// Function to get a random element from an array
function getRandomName(names) {
  return names[Math.floor(Math.random() * names.length)];
}

// Replacement name lists
const longTrumpNames = [
  "Toupee Fiasco",
  "Berder King",
  "Agent Orange",
  "Peter Grifter",
  "🍊 Julius Caesar",
  "Pumpkin King",
  "Donny DollHands",
  "Squirrel Top",
  "Dick Tater",
];

const shortTrumpNames = [
  "Wig",
  "Twitler",
  "Orangina",
  "Whimpy",
  "McManiac",
  "Dollhands",
];

const muskNames = {
  full: ["Lex Loser", "Space Karen", "Apartheid Clyde", "Muskrat"],
  short: ["Cocaine Boer", "Melon", "Ego", "X Æ A-12's Dad"],
};

// Recursive text walker
function walkAndReplace(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue;

    text = text.replace(/Donald (J\.? )?Trump/gi, () =>
      getRandomName(longTrumpNames)
    );
    text = text.replace(/Trump/gi, () => getRandomName(shortTrumpNames));
    text = text.replace(/Elon (R\.? )?Musk/gi, () =>
      getRandomName(muskNames.full)
    );
    text = text.replace(/Musk/gi, () => getRandomName(muskNames.short));

    node.nodeValue = text;
  } else if (
    node.nodeType === Node.ELEMENT_NODE &&
    node.nodeName !== "SCRIPT" &&
    node.nodeName !== "STYLE" &&
    node.nodeName !== "TEXTAREA" &&
    node.nodeName !== "INPUT"
  ) {
    for (let child of node.childNodes) {
      walkAndReplace(child);
    }
  }
}

// Main function
function replaceNames() {
  walkAndReplace(document.body);
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", replaceNames);

// Handle dynamic content with throttling
let throttleTimeout;
const observer = new MutationObserver(() => {
  clearTimeout(throttleTimeout);
  throttleTimeout = setTimeout(replaceNames, 300);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
