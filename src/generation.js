/*
  function start() {
    console.log("start")
    // --- Usage ---

    const chatMessages = [
        { role: "system", content: "You are a travel agent." },
        { role: "user", content: "Suggest a 3-day itinerary for Rome." },
    ];
    let result = postChatCompletion(chatMessages, { model: "mistral", seed: 500 });
  } */

async function postChatCompletion(messages, options = {}) {
  const url = "https://text.pollinations.ai/openai";
  const payload = {
    model: options.model || "deepseek-r1",
    messages: messages,
    seed: options.seed,
    private: options.private,
    referrer: options.referrer || "WebApp", // Optional
  };

  console.log("Sending POST request to:", url, payload);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return errorText + ". NOTE TO USER: if you get a Content Policy Violated error it means your request broke OpenAI's rules which I cant do anything abt at the moment"
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    console.log("Assistant:", result.choices[0].message.content);
    // console.log("Full response:", result);
    return result.choices[0].message.content; // Return the full response object
  } catch (error) {
    console.error("Error posting chat completion:", error);
  }
}

async function start() {
  console.log("start");

  const system = window.system;

  var user_description,
    element = document.getElementById("user_description");
  if (element != null) {
    user_description = element.value;
  } else {
    user_description = null;
  }

  var outputDiv,
    element2 = document.getElementById("output");
  if (element != null) {
    outputDiv = element2
  } else {
    outputDiv = null;
  }

  const chatMessages = [
    {
      role: "system",
      content: system
    },
    {
      role: "user",
      content:
        "I need you to generate a roast for someone. Here is how I would describe them: " +
        user_description + " (Absolutely NO racism, hate speech, ableism, etc at all allowed)"
    },
  ]; 
  outputDiv.textContent = "loading and packing..."

  function delayedFunction() {
     outputDiv.textContent = "pls be patient..."
  }
  
  setTimeout(delayedFunction, 1000); //im gonna be honest i got the delayed part off google AI
  random_seed = Math.floor(Math.random()*500);
  var roast = await postChatCompletion(chatMessages, { model: "deepseek-reasoning", seed: random_seed });
  roast = roast.split('---')[0]
  var thinkerrorcheck = roast.includes("<think>")
  if(thinkerrorcheck) {
    roast = "ERROR: AI included reasoning text. As of now, I dont know how to prevent this but I'm working on it. For now, just click the start button again."
  }
  outputDiv.textContent = roast

}
