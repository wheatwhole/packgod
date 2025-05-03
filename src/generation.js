/* async function postChatCompletion(messages, options = {}) {
    const url = "https://text.pollinations.ai/openai";
    const payload = {
      model: options.model || "openai",
      messages: messages,
      seed: options.seed,
      private: options.private,
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
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }
  
      const result = await response.json();
      console.log("Assistant:", result.choices[0].message.content);
      // console.log("Full response:", result);
      return result; // Return the full response object
    } catch (error) {
      console.error("Error posting chat completion:", error);
    }
  }
  
  function start() {
    console.log("start")
    // --- Usage ---

    const chatMessages = [
        { role: "system", content: "You are a travel agent." },
        { role: "user", content: "Suggest a 3-day itinerary for Rome." },
    ];
    let result = postChatCompletion(chatMessages, { model: "mistral", seed: 500 });
  } */
async function streamChatCompletion(messages, options = {}, onChunkReceived) {
  const url = "https://text.pollinations.ai/openai";
  const payload = {
    model: options.model || "openai",
    messages: messages,
    seed: options.seed,
    stream: true, // Enable streaming
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    console.log("Starting stream...");

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("Stream finished.");
        break;
      }

      buffer += decoder.decode(value, {
        stream: true,
      });

      // Process buffer line by line (SSE format: data: {...}\n\n)
      const lines = buffer.split("\n\n");
      buffer = lines.pop(); // Keep the potentially incomplete last line

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataStr = line.substring(6).trim();
          if (dataStr === "[DONE]") {
            console.log("Received [DONE] marker.");
            continue; // Or handle end of stream signal
          }
          try {
            const chunk = JSON.parse(dataStr);
            const content = chunk?.choices?.[0]?.delta?.content;
            if (content && onChunkReceived) {
              onChunkReceived(content); // Callback to handle the text chunk
            }
          } catch (e) {
            console.error("Failed to parse stream chunk:", dataStr, e);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error during streaming chat completion:", error);
  }
}

function start() {
  console.log("start");

  const system = window.system;
  var user_description,
  element = document.getElementById("user_description");
  if (element != null) {
    user_description = element.value;
  } else {
    user_description = null;
  }

  const streamMessages = [
    {
      role: "user",
      content:
        "I need you to generate a roast for someone. Here is how I would describe them: " +
        user_description,
    },
    { role: "system", content: system },
  ];

  // Example callback to display chunks in a div
  const outputDiv = document.getElementById("result");

  let current = "";
  function handleChunk(textChunk) {
    current += textChunk;
    outputDiv.textContent = current;
  }

  var resuult = streamChatCompletion(
    streamMessages,
    { model: "openai" },
    handleChunk
  );

  var i = 0;
  var speed = 50;

  console.log("Resuult:", resuult);
}
