let currentState = greeting;

let userContext = {
  wantsTest: null,
  name: null
};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = greeting;  
  userContext = { wantsTest: null, name: null };
}

// --- STATES ---

function greeting() {
  currentState = understandingIntent;
  return [
    "Hey 👋 I’m your Rapid Test Assistant.",
    "How can I help you today?"
  ];
}

function understandingIntent(sInput) {
  let input = sInput.toLowerCase();

  if (
    input.includes("test") || 
    input.includes("kit") || 
    input.includes("covid") ||
    input.includes("book") ||
    input.includes("reserve")
  ) {
    userContext.wantsTest = true;
    currentState = askName;
    return [
      "Got it — you’re looking to book a rapid test.",
      "Can I get your name?"
    ];
  }

  if (input.startsWith("y")) {
    userContext.wantsTest = true;
    currentState = askName;
    return [
      "Perfect 👍",
      "Let’s get that booked.",
      "Can I grab your name?"
    ];
  }

  if (input.includes("no")) {
    return [
      "No worries 😊",
      "If you need anything later, just let me know!"
    ];
  }

  return [
    "Hmm, I might’ve misunderstood 😅",
    "Are you trying to book a rapid test kit?"
  ];
}

function askName(sInput) {
  userContext.name = sInput;
  currentState = confirmReservation;

  return [
    `Nice to meet you, ${userContext.name}!`,
    "Do you want me to reserve a kit for you now?"
  ];
}

function confirmReservation(sInput) {
  let input = sInput.toLowerCase();

  if (input.startsWith('y')) {
    currentState = done;

    let d = new Date();
    d.setMinutes(d.getMinutes() + 120);

    return [
      "You're all set ✅",
      `Your rapid test has been reserved, ${userContext.name}.`,
      `Pick it up at 123 Tidy St., Acton before ${d.toTimeString()}`
    ];
  }

  currentState = done;

  return [
    "All good!",
    "Let me know if you change your mind 😊"
  ];
}

function done() {
  return [
    "If you need anything else, just ask!"
  ];
}